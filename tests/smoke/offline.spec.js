const { test, expect } = require('@playwright/test');
const { mockApi } = require('./helpers/api-mock');

test.describe('Offline', () => {
    test.use({ serviceWorkers: 'allow' });

    test('the app and lessons you opened still load without a connection', async ({ page, context }) => {
        await mockApi(page);
        await page.goto('/index.html#m-python-functions');
        await expect(page.locator('#main h1')).toHaveText('Functions');
        await page.evaluate(async () => { await navigator.serviceWorker.ready; });
        // The first visit installs the worker; reload once so it controls the page and caches what it fetches.
        await page.reload();
        await expect(page.locator('#main h1')).toHaveText('Functions');
        await expect.poll(() => page.evaluate(() => !!navigator.serviceWorker.controller)).toBe(true);

        await context.setOffline(true);
        await page.reload();
        await expect(page.locator('#main h1')).toHaveText('Functions');
        await page.locator('.tab[data-tab="quiz"]').click();
        await expect(page.locator('.quiz')).toBeVisible();
        await context.setOffline(false);
    });
});
