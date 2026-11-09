const { test, expect } = require('@playwright/test');
const { mockApi, RECOVERY_CODES } = require('./helpers/api-mock');

test.describe('Accounts', () => {
    test('sign-up shows recovery codes once, and a code resets a forgotten password', async ({ page }) => {
        const calls = await mockApi(page);
        await page.goto('/index.html');
        await page.locator('#signin-open').click();
        await page.locator('.auth-tab[data-v="signup"]').click();
        await page.locator('#si-email').fill('ana@example.com');
        await page.locator('#si-user').fill('ana');
        await page.locator('#si-pass').fill('correct-horse');
        await page.locator('#si-pass2').fill('correct-horse');
        await page.locator('#signin-submit').click();
        const dialog = page.locator('#rc-dialog');
        await expect(dialog).toBeVisible();
        await expect(dialog.locator('.rc-codes code')).toHaveText(RECOVERY_CODES);
        await page.keyboard.press('Escape');
        await expect(dialog).toBeVisible(); // only closes on purpose
        await dialog.locator('[data-rc="done"]').click();
        await expect(dialog).toBeHidden();

        await page.goto('/index.html#profile');
        await expect(page.locator('#rc-left')).toHaveText('7 of 8 codes left.');
        await page.locator('[data-action="sign-out"]').click();

        await page.locator('#signin-open').click();
        await page.locator('[data-action="signin-mode"][data-v="recover"]').click();
        await expect(page.locator('#signin-title')).toHaveText('Reset your password');
        await page.locator('#si-email').fill('ana');
        await page.locator('#si-code').fill('wrong-code-0000');
        await page.locator('#si-pass').fill('new-password-1');
        await page.locator('#si-pass2').fill('new-password-1');
        await page.locator('#signin-submit').click();
        await expect(page.locator('#signin-error')).toContainText('does not match');
        await expect(page.locator('#si-email')).toHaveValue('ana');
        await page.locator('#si-code').fill(RECOVERY_CODES[0].toLowerCase().replace(/-/g, ' '));
        await page.locator('#si-pass').fill('new-password-1');
        await page.locator('#si-pass2').fill('new-password-1');
        await page.locator('#signin-submit').click();
        await expect(page.locator('body')).toHaveClass(/signed-in/);
        await expect(page.locator('#toast')).toContainText('Password reset');
        expect(calls.recovered.newPassword).toBe('new-password-1');
    });

    test('profile asks signed-out visitors to sign in', async ({ page }) => {
        await mockApi(page);
        await page.goto('/index.html#profile');
        await expect(page.locator('#signin')).toBeVisible();
        await expect(page.locator('#signin-open')).toBeVisible();
    });

    test('email sign-in shows errors, then signs in, syncs and signs out', async ({ page }) => {
        const calls = await mockApi(page, { remoteState: { legacyKey: 1, atlas: { done: ['oop-basics'] } } });
        await page.goto('/index.html');
        await page.locator('#signin-open').click();
        await page.locator('#si-email').fill('ana');
        await page.locator('#si-pass').fill('wrong');
        await page.locator('#signin-submit').click();
        await expect(page.locator('#signin-error')).toHaveText('Invalid credentials.');
        await expect(page.locator('#si-email')).toHaveValue('ana');

        await page.locator('#si-pass').fill('correct-horse');
        await page.locator('#signin-submit').click();
        await expect(page.locator('body')).toHaveClass(/signed-in/);
        expect(await page.evaluate(() => JSON.parse(localStorage.getItem('atlas-session')))).toBe('login-token');
        await expect.poll(() => calls.puts.length).toBeGreaterThan(0);
        const sent = calls.puts.at(-1).state;
        expect(sent.legacyKey).toBe(1);
        expect(sent.atlas.done).toContain('oop-basics');

        await page.goto('/index.html#profile');
        await expect(page.locator('.profile-id h1')).toHaveText('Ana Ruiz');
        // The four stat cards are links to the matching pages.
        const stats = page.locator('.stats a.stat-link');
        await expect(stats).toHaveCount(4);
        await expect(stats.nth(0)).toHaveAttribute('href', /^#(m-|course-)/);
        for (const [i, hash] of [[1, '#plan'], [2, '#quizzes'], [3, '#notes']]) await expect(stats.nth(i)).toHaveAttribute('href', hash);
        await stats.nth(2).click();
        await expect(page).toHaveURL(/#quizzes$/);
        await page.goto('/index.html#profile');
        await stats.nth(0).click();
        await expect(page).toHaveURL(/#m-oop-basics|#m-|#course-/);
        await page.goto('/index.html#profile');
        await page.locator('[data-action="sign-out"]').click();
        await expect(page.locator('body')).not.toHaveClass(/signed-in/);
        await expect(page).toHaveURL(/#home$/);
    });

    test('a slow server reply does not erase what someone is typing in the sign-up form', async ({ page }) => {
        await page.route('**/api/**', async (route) => {
            await new Promise((resolve) => setTimeout(resolve, 1500)); // a sleeping Render server
            await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ ok: true, authenticated: false, providers: { google: { enabled: true } } }) });
        });
        await page.goto('/index.html');
        await page.locator('#signin-open').click();
        await page.locator('.auth-tab[data-v="signup"]').click();
        await page.locator('#si-email').fill('slow@example.com');
        await page.locator('#si-user').fill('slowpoke');
        await page.waitForTimeout(2500);
        await expect(page.locator('#si-email')).toHaveValue('slow@example.com');
        await expect(page.locator('#si-user')).toHaveValue('slowpoke');
    });

    test('Google sign-in return exchanges the ticket and stays signed in after reload', async ({ page }) => {
        const calls = await mockApi(page);
        await page.goto('/index.html?oauth=success&oauth_provider=google&oauth_ticket=T1#m-generics');
        await expect(page.locator('body')).toHaveClass(/signed-in/);
        expect(calls.exchanged).toEqual({ ticket: 'T1' });
        await expect(page).toHaveURL(/index\.html#m-generics$/);
        await page.reload();
        await expect(page.locator('body')).toHaveClass(/signed-in/);
    });
});
