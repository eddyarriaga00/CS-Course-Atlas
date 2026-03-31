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
        await page.click('#account-btn');

        await expect(page.locator('#account-auth-state-pill')).toHaveText(/Session Active/i, { timeout: 10000 });
        await expect(page.locator('#account-auth-provider-pill')).toContainText(/Google/i);
        await expect(page.locator('#account-auth-interactive-fields')).toBeHidden();
        await expect(page.locator('#account-auth-signed-in-note')).toBeVisible();
        await expect(page.locator('#account-auth-signed-in-user')).toContainText(/Eddy/i);
        await expect(page.locator('#account-auth-hero-logout')).toBeVisible();
        await expect(page.locator('#account-profile-auth-required-note')).toBeHidden();
    });

    test('does not get stuck in checking state when session refresh fails', async ({ page }) => {
        await page.route('**/api/**', async (route) => {
            const { pathname } = new URL(route.request().url());
            if (pathname.endsWith('/api/auth/session')) {
                await route.fulfill({
                    status: 503,
                    contentType: 'application/json',
                    body: JSON.stringify({ error: 'Service temporarily unavailable' })
                });
                return;
            }
            if (pathname.endsWith('/api/auth/oauth/providers')) {
                await route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify({
                        providers: {
                            google: { enabled: true },
                            github: { enabled: true }
                        }
                    })
                });
                return;
            }
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: '{}'
            });
        });

        await page.goto('/index.html');
        await page.click('#account-btn');

        await expect(page.locator('#account-auth-state-pill')).toHaveText(/Not Signed In/i, { timeout: 7000 });
        await expect(page.locator('#account-auth-interactive-fields')).toBeVisible();
    });

    test('does not render undefined text while checking session on initial load', async ({ page }) => {
        await page.route('**/api/**', async (route) => {
            const { pathname } = new URL(route.request().url());
            if (pathname.endsWith('/api/auth/session')) {
                await new Promise((resolve) => setTimeout(resolve, 1200));
                await route.fulfill({
                    status: 401,
                    contentType: 'application/json',
                    body: JSON.stringify({ error: 'Not authenticated' })
                });
                return;
            }
            if (pathname.endsWith('/api/auth/oauth/providers')) {
                await route.fulfill({
                    status: 200,
                    contentType: 'application/json',
                    body: JSON.stringify({
                        providers: {
                            google: { enabled: true },
                            github: { enabled: true }
                        }
                    })
                });
                return;
            }
            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: '{}'
            });
        });

        await page.goto('/index.html');

        const accountChip = page.locator('#account-chip');
        await expect(accountChip).toContainText(/Checking session/i);
        await expect(accountChip).not.toContainText(/undefined/i);
        await expect(page.locator('#account-btn-label-desktop')).not.toContainText(/undefined/i);
    });
});
