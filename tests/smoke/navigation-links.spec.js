const { test, expect } = require('@playwright/test');
const { mockApi } = require('./helpers/api-mock');

const CRITICAL_PAGES = [
    '/index.html',
    '/data/atlas-data.json',
    '/data/lessons/java.json',
    '/data/lessons/python.json',
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

const ROUTES = ['home', 'courses', 'course-python', 'm-python-first-programs', 'm-python-collections', 'course-cli', 'm-cli-files-folders', 'm-cli-shell-scripts', 'course-web', 'm-web-html', 'm-web-project', 'course-sql', 'm-sql-joins', 'course-how-computers-work', 'm-hcw-hardware', 'course-cybersecurity', 'm-sec-attacks', 'course-ai', 'm-ai-neural', 'm-ai-language', 'course-java', 'course-git', 'course-discrete', 'course-dsa', 'm-java-basics', 'm-git-basics-workflow', 'm-discrete-graph-theory', 'practice', 'quizzes', 'flashcards', 'challenges', 'playground', 'plan', 'notes', 'glossary', 'roadmap'];

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
        await expect(page.locator('.path .path-step')).toHaveCount(9);
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

    test('web examples show a live preview and open in the playground', async ({ page }) => {
        await mockApi(page);
        await page.goto('/index.html#m-web-javascript');
        await page.locator('.tab[data-tab="examples"]').click();
        await page.locator('.chips .chip').nth(3).click();
        const preview = page.frameLocator('iframe.web-preview');
        await expect(preview.locator('#counter')).toHaveText('Clicked 2 times');
        await preview.locator('#counter').click();
        await expect(preview.locator('#counter')).toHaveText('Clicked 3 times');
        await page.locator('[data-action="try-it"]').click();
        await expect(page).toHaveURL(/#playground$/);
        await page.locator('[data-action="pg-run"]').click();
        await expect(page.frameLocator('#pg-frame').locator('#counter')).toHaveText('Clicked 2 times');
    });

    test('quizzes and flashcards are separate pages and remember known cards', async ({ page }) => {
        await mockApi(page);
        await page.goto('/index.html#practice');
        await expect(page.locator('a.hub-card')).toHaveCount(3);
        await page.locator('a.hub-card[href="#flashcards"]').click();
        await expect(page).toHaveURL(/#flashcards$/);
        await expect(page.locator('.deck-known')).toContainText('0 of');
        await page.keyboard.press('ArrowRight');
        await expect(page.locator('.deck-known')).toContainText('1 of');
        await page.reload();
        await expect(page.locator('.deck-known')).toContainText('1 of');
        await page.locator('.nav-item[href="#quizzes"]').click();
        await expect(page).toHaveURL(/#quizzes$/);
        await page.locator('.board-row').nth(2).click();
        await expect(page.locator('.board-row.active')).toHaveCount(1);
        await page.locator('.option').first().click();
        await expect(page.locator('.feedback')).toBeVisible();
    });

    test('module pages show a loading state while their lessons download', async ({ page }) => {
        await mockApi(page);
        await page.route('**/data/lessons/sql.json*', async (route) => { await new Promise((r) => setTimeout(r, 800)); await route.continue(); });
        await page.goto('/index.html#m-sql-joins');
        await expect(page.locator('#main .loading')).toBeVisible();
        await expect(page.locator('#main h1')).toHaveText('Combining Tables');
    });

    test('flashcards you know come back for review when they are due', async ({ page }) => {
        await mockApi(page);
        await page.goto('/index.html#flashcards');
        await page.locator('#flash-module').selectOption('python-first-programs');
        await page.locator('[data-action="flash-next"]').click();
        await page.locator('[data-action="flash-again"]').click();
        // Pretend two days went by.
        await page.evaluate(() => { const k = Object.keys(localStorage).find((x) => x.endsWith('cardBox')); const v = JSON.parse(localStorage.getItem(k)); Object.values(v).forEach((c) => { c.due -= 2; }); localStorage.setItem(k, JSON.stringify(v)); });
        await page.goto('/index.html#home');
        await page.reload();
        await expect(page.locator('.due-home')).toContainText('2 cards to review');
        await page.locator('.due-home [data-action="go-flash"]').click();
        await expect(page.locator('#flash-module')).toHaveValue('due');
        await page.locator('[data-action="flash-next"]').click();
        await page.locator('[data-action="flash-next"]').click();
        await expect(page.locator('.due-empty')).toContainText('Review done for today');
    });

    test('finishing a course unlocks a printable certificate', async ({ page }) => {
        await mockApi(page);
        await page.goto('/index.html#course-git');
        await expect(page.locator('.cert-card')).toContainText('0 / 2 quizzes passed');
        await page.evaluate(() => {
            localStorage.setItem('atlas-done', JSON.stringify(['git-basics-workflow', 'git-branching-merging']));
            localStorage.setItem('atlas-quizBest', JSON.stringify({ 'git-basics-workflow': 0.8, 'git-branching-merging': 0.4 }));
        });
        await page.reload();
        await expect(page.locator('.cert-card')).toContainText('1 / 2 quizzes passed');
        await page.evaluate(() => localStorage.setItem('atlas-quizBest', JSON.stringify({ 'git-basics-workflow': 0.8, 'git-branching-merging': 1 })));
        await page.reload();
        await page.locator('.cert-card a').click();
        await expect(page).toHaveURL(/#cert-git$/);
        await page.locator('#cert-name').fill('Ana Ruiz');
        await expect(page.locator('.certificate')).toContainText('Ana Ruiz');
        await expect(page.locator('.certificate')).toContainText('90% average quiz score');
    });

    test('timed quizzes count running out of time as a miss', async ({ page }) => {
        await mockApi(page);
        await page.goto('/index.html#quizzes');
        await page.locator('[data-action="quiz-timed"]').click();
        await expect(page.locator('#q-timer')).toBeVisible();
        await page.evaluate(() => { state.quiz.deadline = Date.now() + 200; });
        await expect(page.locator('.feedback')).toContainText('Time’s up');
        await page.locator('[data-action="quiz-next"]').click();
        await expect(page.locator('#q-timer b')).toHaveText(/^(29|30)$/);
    });

    test('a shared playground link opens the same code', async ({ page }) => {
        await mockApi(page);
        const code = 'name = "José 🎉"\nprint(name)\n';
        const enc = Buffer.from(code, 'utf8').toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
        await page.goto('/index.html#code/python/' + enc);
        await expect(page).toHaveURL(/#playground$/);
        await expect(page.locator('#pg-code')).toHaveValue(code);
        await expect(page.locator('[data-action="pg-lang"][aria-pressed="true"]')).toHaveText('Python');
    });

    test('mixed review quizzes across completed modules', async ({ page }) => {
        await mockApi(page);
        await page.goto('/index.html#m-python-first-programs');
        await page.locator('[data-action="toggle-done"]').click();
        await page.goto('/index.html#quizzes');
        await page.locator('#quiz-module').selectOption('mix');
        await expect(page.locator('.q-from')).toContainText('Your First Python Programs');
        for (let i = 0; i < 5; i += 1) {
            await page.locator('.option').first().click();
            await page.locator('[data-action="quiz-next"]').click();
        }
        await expect(page.locator('.score')).toContainText('/5');
    });

    test('python modules have challenges with an editor that keeps drafts', async ({ page }) => {
        await mockApi(page);
        await page.goto('/index.html#m-python-collections');
        await page.locator('.tab[data-tab="challenges"]').click();
        await expect(page.locator('.challenge')).toHaveCount(2);
        await page.locator('#ch-code-0').fill('def word_counts(text):\n    return {}\n');
        await page.reload();
        await page.locator('.tab[data-tab="challenges"]').click();
        await expect(page.locator('#ch-code-0')).toHaveValue(/return \{\}/);
        await page.locator('[data-action="ch-reset"][data-i="0"]').click();
        await expect(page.locator('#ch-code-0')).toHaveValue(/counts = \{\}/);
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
