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

const ROUTES = ['home', 'courses', 'course-python', 'm-python-first-programs', 'm-python-collections', 'course-cli', 'm-cli-files-folders', 'm-cli-shell-scripts', 'course-web', 'm-web-html', 'm-web-project', 'course-sql', 'm-sql-joins', 'course-how-computers-work', 'm-hcw-hardware', 'course-cybersecurity', 'm-sec-attacks', 'course-ai', 'm-ai-neural', 'm-ai-language', 'course-networks', 'm-net-ip', 'm-net-web', 'course-java', 'course-git', 'course-discrete', 'course-dsa', 'm-java-basics', 'm-git-basics-workflow', 'm-discrete-graph-theory', 'practice', 'quizzes', 'flashcards', 'challenges', 'playground', 'plan', 'notes', 'glossary', 'roadmap'];

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
        await expect(page.locator('.path-stage')).toHaveCount(3);
        await expect(page.locator('.path-tile')).toHaveCount(9);
        await expect(page.locator('.path-tile').first()).toContainText('Python');
        // The catalog groups every course by subject; picking a subject shows its courses as full cards.
        await expect(page.locator('.cat-group')).toHaveCount(6);
        const total = await page.locator('.cat-tile').count();
        await expect(page.locator('[data-action="home-cat"][data-v="all"] .chip-n')).toHaveText(String(total));
        await page.locator('[data-action="home-cat"][data-v="languages"]').click();
        await expect(page.locator('.cat-group')).toHaveCount(0);
        await expect(page.locator('#catalog ~ .courses .card').first()).toContainText('Python');
        await page.locator('[data-action="home-cat"][data-v="all"]').click();
        await expect(page.locator('.cat-group')).toHaveCount(6);
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
        await expect(page.locator('a.hub-card')).toHaveCount(4);
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
        await page.route('**/data/lessons/m-sql-joins.json*', async (route) => { await new Promise((r) => setTimeout(r, 800)); await route.continue(); });
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

    test('command-line challenges run in the practice terminal', async ({ page }) => {
        await mockApi(page);
        await page.goto('/index.html#m-cli-files-folders');
        await page.locator('.tab[data-tab="challenges"]').click();
        await expect(page.locator('[data-shell-setup="1"]')).toContainText('junk.tmp');
        await page.locator('#ch-code-1').fill('cd downloads\nmkdir texts\nmv *.txt texts/');
        await page.locator('[data-action="ch-run"][data-i="1"]').click();
        await expect(page.locator('#ch-res-1')).toContainText('should not be there');
        await page.locator('#ch-code-1').fill('cd downloads\nmkdir texts\nmv *.txt texts/\nrm -r old');
        await page.locator('[data-action="ch-run"][data-i="1"]').click();
        await expect(page.locator('#ch-res-1 .ch-status.ok')).toBeVisible();
        await expect(page.locator('#ch-1')).toHaveClass(/solved/);
    });

    test('git challenges grade the repository state', async ({ page }) => {
        await mockApi(page);
        await page.goto('/index.html#m-git-basics-workflow');
        await page.locator('.tab[data-tab="challenges"]').click();
        await expect(page.locator('[data-shell-setup="1"]')).toContainText('Git repository on branch main');
        await page.locator('#ch-code-1').fill('cd project\ngit add .\ngit commit -m "Update README"');
        await page.locator('[data-action="ch-run"][data-i="1"]').click();
        await expect(page.locator('#ch-res-1')).toContainText('Files committed on main');
        await page.locator('#ch-code-1').fill('cd project\ngit add README.md\ngit commit -m "Update README"');
        await page.locator('[data-action="ch-run"][data-i="1"]').click();
        await expect(page.locator('#ch-res-1 .ch-status.ok')).toBeVisible();
    });

    test('each course has a printable cheat sheet', async ({ page }) => {
        await mockApi(page);
        await page.goto('/index.html#course-sql');
        await page.locator('.course-links a[href="#sheet-sql"]').click();
        await expect(page.locator('#main h1')).toHaveText('SQL & Databases: cheat sheet');
        await expect(page.locator('.sheet-mod')).toHaveCount(4);
        await expect(page.locator('.sheet-mod').first()).toContainText('Key takeaways');
    });

    test('java predict-the-output challenges check the typed answer', async ({ page }) => {
        await mockApi(page);
        await page.goto('/index.html#m-control-flow');
        await page.locator('.tab[data-tab="challenges"]').click();
        await expect(page.locator('#ch-2 .ch-program')).toContainText('switch (day)');
        await page.locator('#ch-code-2').fill('Tue');
        await page.locator('[data-action="ch-run"][data-i="2"]').click();
        await expect(page.locator('#ch-res-2')).toContainText('You wrote 1 line; the program prints 2.');
        await page.locator('#ch-code-2').fill('Tue\nWed  \n');
        await page.locator('[data-action="ch-run"][data-i="2"]').click();
        await expect(page.locator('#ch-2')).toHaveClass(/solved/);
    });

    test('a quiz can be retried with only the missed questions', async ({ page }) => {
        await mockApi(page);
        await page.goto('/index.html#quizzes');
        await expect(page.locator('.option').first()).toBeVisible();
        for (let i = 0; i < 5; i += 1) {
            const right = await page.evaluate(() => roundItems(state.quiz)[state.quiz.i].correct);
            await page.locator('.option').nth(i < 3 ? right : (right + 1) % 4).click();
            await page.locator('[data-action="quiz-next"]').click();
        }
        await expect(page.locator('[data-action="quiz-missed"]')).toHaveText('Retry the 2 I missed');
        await page.locator('[data-action="quiz-missed"]').click();
        await expect(page.locator('.quiz-top')).toContainText('Question 1 of 2');
    });

    test('progress can be backed up to a file and restored', async ({ page }) => {
        await mockApi(page);
        await page.goto('/index.html#m-python-first-programs');
        await page.locator('[data-action="toggle-done"]').click();
        await page.locator('.side-foot [data-action="backup"]').click();
        const [download] = await Promise.all([page.waitForEvent('download'), page.locator('[data-action="backup-download"]').click()]);
        const file = await download.path();
        await page.evaluate(() => { localStorage.clear(); });
        await page.reload();
        await page.locator('.side-foot [data-action="backup"]').click();
        const [chooser] = await Promise.all([page.waitForEvent('filechooser'), page.locator('[data-action="backup-restore"]').click()]);
        await chooser.setFiles(file);
        await expect(page.locator('#backup-msg')).toContainText('Restored. 1 new');
    });

    test('a whole course can be reviewed as one quiz', async ({ page }) => {
        await mockApi(page);
        await page.goto('/index.html#course-sql');
        await page.locator('[data-action="go-quiz"][data-id="course:sql"]').click();
        await expect(page.locator('.quiz-top')).toContainText('SQL & Databases: whole course');
        await expect(page.locator('.quiz-top')).toContainText('of 15');
        await expect(page.locator('.q-from')).toContainText('SQL & Databases');
    });

    test('a module page downloads only its own lesson file', async ({ page }) => {
        await mockApi(page);
        const lessons = [];
        page.on('request', (r) => { const u = r.url(); if (u.includes('/data/lessons/')) lessons.push(u.split('/').pop().split('?')[0]); });
        await page.goto('/index.html#m-oop-basics');
        await expect(page.locator('#main h1')).toHaveText('Object-Oriented Programming');
        await page.locator('.tab[data-tab="quiz"]').click();
        await expect(page.locator('.quiz')).toBeVisible();
        expect(lessons).toContain('m-oop-basics.json');
        expect(lessons).not.toContain('java.json');
    });

    test('notes written in a lesson show up on the Notes page', async ({ page }) => {
        await mockApi(page);
        await page.goto('/index.html#m-python-functions');
        await page.locator('#mod-note').fill('return ends the function');
        await expect(page.locator('#mod-note-status')).toContainText('Saved');
        await page.goto('/index.html#notes');
        await page.locator('[data-action="note-pick"][data-id="python-functions"]').click();
        await expect(page.locator('#note-text')).toHaveValue('return ends the function');
    });

    test('guess first hides example output until revealed', async ({ page }) => {
        await mockApi(page);
        await page.goto('/index.html#m-java-basics');
        await page.locator('.tab[data-tab="examples"]').click();
        await page.locator('.predict-toggle input').check();
        await expect(page.locator('.output .veil')).toBeVisible();
        await page.locator('[data-action="reveal-output"]').click();
        await expect(page.locator('.output pre')).toBeVisible();
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
        await expect(page.locator('.challenge')).toHaveCount(4);
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
