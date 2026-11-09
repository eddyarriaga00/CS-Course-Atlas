const { test, expect } = require('@playwright/test');
const { mockApi } = require('./helpers/api-mock');

test.describe('Accounts', () => {
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
