const { test, expect } = require('@playwright/test');
const { mockApi } = require('./helpers/api-mock');

const CRITICAL_PAGES = [
    '/index.html',
    '/data/atlas-data.json',
    '/css/atlas.css',
    '/js/atlas.js',
    '/manifest.webmanifest',
    '/privacy-policy.html',
    '/terms-of-use.html',
    '/contact-support.html',
    '/donations-refunds.html',
    '/.well-known/security.txt',
    '/sitemap.xml'
];

const ROUTES = ['home', 'courses', 'course-java', 'course-dsa', 'm-java-basics', 'practice', 'playground', 'plan', 'notes', 'glossary', 'roadmap'];

test.describe('Navigation', () => {
    test('critical pages return non-error HTTP responses', async ({ request }) => {
        for (const pagePath of CRITICAL_PAGES) {
            const response = await request.get(pagePath);
            expect(response.ok(), `Expected successful response for ${pagePath}`).toBeTruthy();
        }
    });

    test('every page renders without errors or sideways scrolling', async ({ page }) => {
        const errors = [];
        page.on('pageerror', (error) => errors.push(error.message));
        await mockApi(page);
        for (const width of [1366, 390]) {
            await page.setViewportSize({ width, height: 900 });
            for (const route of ROUTES) {
                await page.goto(`/index.html#${route}`);
                await expect(page.locator('#main section h1').first()).toBeVisible();
                const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
                expect(overflow, `${route} at ${width}px`).toBe(false);
            }
        }
        expect(errors).toEqual([]);
    });

    test('links from the generated pages open the right module', async ({ page }) => {
        await mockApi(page);
        await page.goto('/index.html?route=%2Fjava&module=collections-framework');
        await expect(page).toHaveURL(/#m-collections-framework$/);
        await expect(page.locator('#main h1')).toHaveText('Java Collections Framework');
    });

    test('every Java example has a video link under it', async ({ page }) => {
        await mockApi(page);
        await page.goto('/index.html#m-generics');
        await page.locator('.tab[data-tab="examples"]').click();
        const chips = page.locator('.chips .chip');
        const count = await chips.count();
        for (let i = 1; i < count; i += 1) {
            await chips.nth(i).click();
            await expect(page.locator('.watch a.vid')).toHaveAttribute('href', /youtube\.com/);
        }
    });

    test('search finds a module and opens it', async ({ page }) => {
        await mockApi(page);
        await page.goto('/index.html');
        await page.locator('#search-input').fill('jdbc');
        await page.locator('#search-results .result[href^="#m-"]').first().click();
        await expect(page).toHaveURL(/#m-jdbc-basics$/);
    });
});
