const { test, expect } = require('@playwright/test');
const { mockAuthAndProfileApi } = require('./helpers/auth-mocks');

test.describe('Account Modal Auth States', () => {
    test('renders signed-out login controls by default', async ({ page }) => {
        await mockAuthAndProfileApi(page, { authenticated: false });
        await page.goto('/index.html');
        await page.click('#account-btn');

        await expect(page.locator('#account-modal')).toBeVisible();
        await expect(page.locator('#account-auth-state-pill')).toHaveText(/Not Signed In/i);
        await expect(page.locator('#account-auth-interactive-fields')).toBeVisible();
        await expect(page.locator('#account-auth-signed-in-note')).toBeHidden();
        await expect(page.locator('#account-auth-hero-logout')).toBeHidden();
        await expect(page.locator('#account-auth-status')).toContainText(/Not signed in/i);
    });

    test('switches to signed-in UI when session is authenticated', async ({ page }) => {
        await mockAuthAndProfileApi(page, { authenticated: true });
        await page.goto('/index.html');

        await expect(page.locator('#account-btn-label-desktop')).toHaveText('Logged In');
        await page.click('#account-btn');

        await expect(page.locator('#account-auth-state-pill')).toHaveText(/Session Active/i);
        await expect(page.locator('#account-auth-provider-pill')).toContainText(/Google/i);
        await expect(page.locator('#account-auth-interactive-fields')).toBeHidden();
        await expect(page.locator('#account-auth-signed-in-note')).toBeVisible();
        await expect(page.locator('#account-auth-signed-in-user')).toContainText(/Eddy/i);
        await expect(page.locator('#account-auth-hero-logout')).toBeVisible();
        await expect(page.locator('#account-profile-auth-required-note')).toBeHidden();
    });
});

