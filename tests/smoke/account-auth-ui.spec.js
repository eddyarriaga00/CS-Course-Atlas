const { test, expect } = require('@playwright/test');
const { mockAuthAndProfileApi } = require('./helpers/auth-mocks');

test.describe('Account Modal Auth States', () => {
    test('renders launch success checklist on home for first-time guest sessions', async ({ page }) => {
        await mockAuthAndProfileApi(page, { authenticated: false });
        await page.goto('/index.html');

        await expect(page.locator('#home-success-checklist-section')).toBeVisible();
        await expect(page.locator('#success-checklist-items article')).toHaveCount(4);
        await expect(page.locator('#success-checklist-progress-pill')).toContainText(/0\s*\/\s*4/i);
    });

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
        await expect(page.locator('#account-auth-retry-session')).toBeVisible();
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
        await expect(page.locator('#account-auth-retry-session')).toBeHidden();
    });

    test('profile settings back button navigates smoothly between panels and overview', async ({ page }) => {
        await mockAuthAndProfileApi(page, { authenticated: true });
        await page.goto('/index.html');
        await page.click('#account-btn');

        await expect(page.locator('#account-auth-state-pill')).toHaveText(/Session Active/i, { timeout: 10000 });
        await page.click('#account-auth-hero-manage');

        await expect(page.locator('#account-profile-panel-nav')).toBeVisible();
        await expect(page.locator('#account-profile-back-label')).toHaveText(/Back to Overview/i);

        await page.click('#account-profile-open-security');
        await expect(page.locator('#account-profile-panel-title')).toHaveText(/Security Settings/i);
        await expect(page.locator('#account-profile-back-label')).toHaveText(/Back to Profile/i);

        await page.click('#account-profile-back-btn');
        await expect(page.locator('#account-profile-open-profile')).toHaveAttribute('aria-pressed', 'true');
        await expect(page.locator('#account-profile-panel-title')).toHaveText(/Edit Profile/i);

        await page.click('#account-profile-back-btn');
        await expect(page.locator('#account-profile-content')).toBeHidden();
    });

    test('keeps mobile profile controls equivalent to desktop panels', async ({ page }) => {
        await page.setViewportSize({ width: 390, height: 844 });
        await mockAuthAndProfileApi(page, { authenticated: true });
        await page.goto('/index.html');
        await page.click('#account-btn');

        await expect(page.locator('#account-auth-state-pill')).toHaveText(/Session Active/i, { timeout: 10000 });
        await expect(page.locator('#account-profile-open-profile')).toBeVisible();
        await expect(page.locator('#account-profile-open-security')).toBeVisible();
        await expect(page.locator('#account-profile-open-danger')).toBeVisible();

        await page.click('#account-auth-hero-manage');
        await expect(page.locator('#account-profile-content')).toBeVisible();
        await expect(page.locator('#account-profile-back-btn')).toBeVisible();
        await expect(page.locator('#account-username')).toBeVisible();
        await expect(page.locator('#account-goal')).toBeVisible();
        await expect(page.locator('#save-account')).toBeVisible();

        await page.click('#account-profile-open-security');
        await expect(page.locator('#account-email')).toBeVisible();
        await expect(page.locator('#account-email-request-pin')).toBeVisible();
        await expect(page.locator('#account-current-password')).toBeVisible();
        await expect(page.locator('#account-password-update')).toBeVisible();

        await page.click('#account-profile-open-danger');
        await expect(page.locator('#account-delete-password')).toBeVisible();
        await expect(page.locator('#account-delete-confirm')).toBeVisible();
        await expect(page.locator('#account-delete-account')).toBeVisible();
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

    test('does not render undefined text in auth status during initial session checks', async ({ page }) => {
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

        await page.click('#account-btn');
        await expect(page.locator('#account-auth-status')).not.toContainText(/undefined/i);
        await expect(page.locator('#account-btn-label-desktop')).not.toContainText(/undefined/i);
    });
});
