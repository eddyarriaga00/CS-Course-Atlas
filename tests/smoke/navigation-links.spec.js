const { test, expect } = require('@playwright/test');
const { mockAuthAndProfileApi } = require('./helpers/auth-mocks');

const CRITICAL_PAGES = [
    '/index.html',
    '/manifest.webmanifest',
    '/privacy-policy.html',
    '/terms-of-use.html',
    '/contact-support.html',
    '/donations-refunds.html',
    '/.well-known/security.txt',
    '/sitemap.xml'
];

test.describe('Critical Navigation Links', () => {
    test('critical pages return non-error HTTP responses', async ({ request }) => {
        for (const pagePath of CRITICAL_PAGES) {
            const response = await request.get(pagePath);
            expect(response.ok(), `Expected successful response for ${pagePath}`).toBeTruthy();
        }
    });

    test('footer XML sitemap link opens correctly from homepage', async ({ page }) => {
        await mockAuthAndProfileApi(page, { authenticated: false });
        await page.goto('/index.html');
        await page.locator('#main-footer a.footer-link[href="sitemap.xml"]').first().click();

        await expect(page).toHaveURL(/\/sitemap\.xml$/);
        await expect(page.locator('body')).toContainText('<urlset');
    });
});
