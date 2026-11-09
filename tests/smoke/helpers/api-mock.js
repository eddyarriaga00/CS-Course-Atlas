// Stands in for the Render API so the smoke tests run against the static site alone.
const USER = { id: 1, email: 'ana@example.com', username: 'ana', name: 'Ana Ruiz', authProvider: 'password' };

async function mockApi(page, { remoteState = null } = {}) {
    const calls = { puts: [], exchanged: null };
    let signedIn = false;
    await page.route('**/api/**', async (route) => {
        const request = route.request();
        const pathname = new URL(request.url()).pathname;
        const json = (body, status = 200) => route.fulfill({ status, contentType: 'application/json', body: JSON.stringify(body) });
        if (pathname.endsWith('/auth/oauth/providers')) return json({ ok: true, providers: { google: { enabled: true } } });
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

module.exports = { mockApi, USER };
