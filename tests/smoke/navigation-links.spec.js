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

const ROUTES = ['home', 'courses', 'course-python', 'm-python-first-programs', 'm-python-collections', 'course-java', 'course-git', 'course-discrete', 'course-dsa', 'm-java-basics', 'm-git-basics-workflow', 'm-discrete-graph-theory', 'practice', 'playground', 'plan', 'notes', 'glossary', 'roadmap'];

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

    test('a beginner lands on the path and starts with Python', async ({ page }) => {
        await mockApi(page);
        await page.goto('/index.html#home');
        await expect(page.locator('.path .path-step')).toHaveCount(8);
        await expect(page.locator('.path-step').first()).toContainText('Python');
        await page.locator('.hero-actions .btn').first().click();
        await expect(page).toHaveURL(/#course-python$/);
        await page.locator('.hero-actions .btn').first().click();
        await expect(page).toHaveURL(/#m-python-first-programs$/);
        await page.locator('.tab[data-tab="examples"]').click();
        await page.locator('[data-action="try-it"]').click();
        await expect(page).toHaveURL(/#playground$/);
        await expect(page.locator('#pg-code')).toHaveValue(/print\(/);
        await expect(page.locator('[data-action="pg-lang"][aria-pressed="true"]')).toHaveText(/Python/);
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

    test('Git examples are terminal sessions with a video for every topic', async ({ page }) => {
        await mockApi(page);
        await page.goto('/index.html#m-git-basics-workflow');
        await page.locator('.tab[data-tab="examples"]').click();
        await expect(page.locator('.code-bar .lang[data-code-lang]')).toHaveText(['Terminal']);
        const chips = page.locator('.chips .chip');
        const count = await chips.count();
        expect(count).toBe(8);
        for (let i = 1; i < count; i += 1) {
            await chips.nth(i).click();
            await expect(page.locator('pre.term')).toContainText('$ git ');
            await expect(page.locator('.watch a.vid')).toHaveAttribute('href', /youtube\.com\/watch/);
        }
    });

    test('sidebar keeps courses collapsed and opens the one you are in', async ({ page }) => {
        await mockApi(page);
        await page.goto('/index.html#home');
        await expect(page.locator('#sidebar .side-course.open')).toHaveCount(0);
        await page.goto('/index.html#m-generics');
        await expect(page.locator('#sidebar .side-course.open .cs-txt b')).toHaveText(['Java']);
        await expect(page.locator('#sidebar .side-unit[open] .un')).toHaveText(['2. Object-Oriented Java']);
        await page.locator('#sidebar .side-toggle[data-v="git"]').click();
        await page.goto('/index.html#practice');
        await expect(page.locator('#sidebar .side-course.open .cs-txt b')).toHaveText(['Git']);
    });

    test('search finds a module and opens it', async ({ page }) => {
        await mockApi(page);
        await page.goto('/index.html');
        await page.locator('#search-input').fill('jdbc');
        await page.locator('#search-results .result[href^="#m-"]').first().click();
        await expect(page).toHaveURL(/#m-jdbc-basics$/);
    });
});
