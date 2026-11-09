// Stands in for the Render API so the smoke tests run against the static site alone.
const RECOVERY_CODES = ['K7QM-3XRP-W9TD', 'B4NC-7YHE-2QAZ', 'PX9R-M3TK-UVW5', 'Z8DF-KQ2M-RN7C', 'HC4W-9ZEP-6TYJ', 'Q2XV-NK8B-D5RG', 'TM6A-Y3UW-8FHS', 'G9PE-C7RZ-4MXK'];
const USER = { id: 1, email: 'ana@example.com', username: 'ana', name: 'Ana Ruiz', authProvider: 'password' };

async function mockApi(page, { remoteState = null, emailConfirmation = false, providers = { google: { enabled: true } } } = {}) {
    const calls = { puts: [], exchanged: null };
    let signedIn = false;
    await page.route('**/api/**', async (route) => {
        const request = route.request();
        const pathname = new URL(request.url()).pathname;
        const json = (body, status = 200) => route.fulfill({ status, contentType: 'application/json', body: JSON.stringify(body) });
        if (pathname.endsWith('/auth/oauth/providers')) return json({ ok: true, providers });
        if (pathname.endsWith('/auth/oauth/exchange-ticket')) {
            calls.exchanged = request.postDataJSON();
            signedIn = true;
            return json({ ok: true, authenticated: true, user: { ...USER, authProvider: 'google' }, csrfToken: 'csrf', sessionToken: 'oauth-token' });
        }
        if (pathname.endsWith('/auth/session')) {
            const bearer = request.headers().authorization || '';
            return json(signedIn && bearer ? { authenticated: true, user: USER, csrfToken: 'csrf' } : { authenticated: false });
        }
        if (pathname.endsWith('/auth/login')) {
            if (request.postDataJSON().password !== 'correct-horse') return json({ error: 'Invalid credentials.' }, 401);
            signedIn = true;
            return json({ ok: true, authenticated: true, user: USER, csrfToken: 'csrf', sessionToken: 'login-token' });
        }
        if (pathname.endsWith('/auth/signup')) {
            signedIn = true;
            return json({ ok: true, authenticated: true, user: { ...USER, emailVerified: !emailConfirmation }, emailConfirmation, csrfToken: 'csrf', sessionToken: 'signup-token', recoveryCodes: RECOVERY_CODES, confirmationSent: emailConfirmation });
        }
        if (pathname.endsWith('/auth/email/confirm')) {
            if (request.postDataJSON().code !== '246810') return json({ error: 'That code is wrong or expired. Check the email, or send a new code.' }, 400);
            return json({ ok: true, verified: true });
        }
        if (pathname.endsWith('/auth/email/send-code')) return json({ ok: true, sent: true });
        if (pathname.endsWith('/auth/recover/email')) {
            calls.resetEmail = request.postDataJSON();
            return json({ ok: true, message: 'If that account has a confirmed email, we sent it a 6-digit code.' });
        }
        if (pathname.endsWith('/auth/recover')) {
            const body = request.postDataJSON();
            calls.recovered = body;
            if (String(body.code).toUpperCase().replace(/[^A-Z0-9]/g, '') !== RECOVERY_CODES[0].replace(/-/g, '')) {
                return json({ error: 'That recovery code does not match this account, or it was already used.' }, 400);
            }
            signedIn = true;
            return json({ ok: true, authenticated: true, user: USER, csrfToken: 'csrf', sessionToken: 'recover-token', recoveryCodesLeft: 7 });
        }
        if (pathname.endsWith('/profile/recovery-codes')) return json({ ok: true, left: 7, total: 8 });
        if (pathname.endsWith('/auth/logout')) { signedIn = false; return json({ ok: true }); }
        if (pathname.endsWith('/user-state')) {
            if (request.method() === 'GET') return json({ ok: true, state: remoteState });
            calls.puts.push(request.postDataJSON());
            return json({ ok: true });
        }
        return json({ error: 'Not mocked' }, 404);
    });
    return calls;
}

module.exports = { mockApi, USER, RECOVERY_CODES };
