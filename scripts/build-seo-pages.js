const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const DEFAULT_OUTPUT_DIR = 'dist';
const OUTPUT_DIR = path.resolve(ROOT, process.env.BUILD_OUT_DIR || DEFAULT_OUTPUT_DIR);
const SITE_URL = 'https://eddyarriaga00.github.io/CS-Course-Atlas';
const { loadCatalog } = require('./lib/catalog');
const MODULES_DIR = path.join(OUTPUT_DIR, 'modules');
const GOOGLE_SITE_VERIFICATION_TOKEN = String(process.env.GOOGLE_SITE_VERIFICATION_TOKEN || '').trim();
const STATIC_COPY_EXCLUDES = new Set([
    '.git',
    '.github',
    '.gitignore',
    '.playwright-cli',
    'backups',
    'CHANGELOG.md',
    'dist',
    'docs',
    'node_modules',
    'output',
    'package-lock.json',
    'package.json',
    'README.md',
    'render.yaml',
    'scripts',
    'server',
    'tailwind.config.cjs',
    'tests',
    'test-results',
    'playwright.config.js'
]);

const CATEGORY_ROUTE_MAP = {
    dsa: '/dsa',
    java: '/java',
    git: '/git',
    assembly: '/assembly',
    discrete: '/discrete-math',
    python: '/python',
    cli: '/command-line'
};

const CATEGORY_LABEL_MAP = {
    dsa: 'Data Structures and Algorithms',
    java: 'Java',
    git: 'Git',
    assembly: 'Assembly',
    discrete: 'Discrete Math',
    python: 'Python',
    cli: 'Command Line & Linux'
};

const ROUTE_PAGES = [
    {
        route: '/home',
        filename: 'home.html',
        title: 'CS Course Atlas Home | Beginner-Friendly Computer Science Learning',
        description: 'Start CS Course Atlas with beginner onboarding, guided paths, and links to tracks, modules, and study tools.',
        heading: 'CS Course Atlas Home',
        lead: 'Beginner-first CS learning with guided paths, course tracks, and interactive practice tools.',
        moduleCategory: 'all'
    },
    {
        route: '/tracks',
        filename: 'tracks.html',
        title: 'Course Tracks | CS Course Atlas',
        description: 'Browse all CS Course Atlas course tracks including DSA, Java, Git, Assembly, and Discrete Math.',
        heading: 'Course Tracks',
        lead: 'Choose a track and follow module pages in sequence.',
        moduleCategory: 'all'
    },
    {
        route: '/dsa',
        filename: 'dsa.html',
        title: 'DSA Track | CS Course Atlas',
        description: 'Explore Data Structures and Algorithms modules with direct links to crawlable module pages and interactive practice.',
        heading: 'Data Structures and Algorithms Track',
        lead: 'Interview-focused DSA learning with clear module progression.',
        moduleCategory: 'dsa'
    },
    {
        route: '/java',
        filename: 'java.html',
        title: 'Java Track | CS Course Atlas',
        description: 'Learn Java fundamentals, OOP, collections, concurrency, and practical workflows with crawlable module pages.',
        heading: 'Java Track',
        lead: 'Core Java modules from basics to advanced practice.',
        moduleCategory: 'java'
    },
    {
        route: '/git',
        filename: 'git.html',
        title: 'Git Track | CS Course Atlas',
        description: 'Build reliable Git and version control workflows with focused CS Course Atlas module pages.',
        heading: 'Git Track',
        lead: 'Version control fundamentals for students and teams.',
        moduleCategory: 'git'
    },
    {
        route: '/assembly',
        filename: 'assembly.html',
        title: 'Assembly Track | CS Course Atlas',
        description: 'Study assembly registers, memory, control flow, and low-level reasoning through dedicated module pages.',
        heading: 'Assembly Track',
        lead: 'Low-level computing foundations for CS students.',
        moduleCategory: 'assembly'
    },
    {
        route: '/discrete-math',
        filename: 'discrete-math.html',
        title: 'Discrete Math Track | CS Course Atlas',
        description: 'Learn discrete math topics for CS, including logic, proofs, sets, relations, and combinatorics.',
        heading: 'Discrete Math Track',
        lead: 'Math foundations that support algorithms and systems courses.',
        moduleCategory: 'discrete'
    },
    {
        route: '/python',
        filename: 'python.html',
        title: 'Intro to Programming with Python | CS Course Atlas',
        description: 'A first programming course in Python: variables, decisions, loops, functions, lists and dictionaries, with runnable examples.',
        heading: 'Intro to Programming with Python',
        lead: 'A true first course for complete beginners.',
        moduleCategory: 'python'
    },
    {
        route: '/command-line',
        filename: 'command-line.html',
        title: 'Command Line & Linux | CS Course Atlas',
        description: 'Learn the terminal from zero: files and folders, grep and pipes, permissions and PATH, and shell scripts, with real recorded sessions.',
        heading: 'Command Line & Linux',
        lead: 'The terminal skills every other course assumes.',
        moduleCategory: 'cli'
    },
    {
        route: '/flashcards',
        filename: 'flashcards.html',
        title: 'Flashcards | CS Course Atlas',
        description: 'Use CS Course Atlas flashcards for quick review and memory reinforcement across CS topics.',
        heading: 'Flashcards',
        lead: 'Rapid review mode for concepts and definitions.',
        moduleCategory: 'all'
    },
    {
        route: '/quizzes',
        filename: 'quizzes.html',
        title: 'Interactive Quizzes | CS Course Atlas',
        description: 'Practice with interactive quizzes and interview-style question sets in CS Course Atlas.',
        heading: 'Interactive Quizzes',
        lead: 'Check understanding and strengthen problem-solving patterns.',
        moduleCategory: 'all'
    },
    {
        route: '/playground',
        filename: 'playground.html',
        title: 'Code Playground | CS Course Atlas',
        description: 'Run and test code examples in the CS Course Atlas playground while learning core CS concepts.',
        heading: 'Code Playground',
        lead: 'Hands-on experimentation across supported languages.',
        moduleCategory: 'all'
    },
    {
        route: '/notes',
        filename: 'notes.html',
        title: 'Notes and Library | CS Course Atlas',
        description: 'Create notes, revisit references, and organize your CS learning workflow with CS Course Atlas tools.',
        heading: 'Notes and Library',
        lead: 'Capture key ideas and retain concepts over time.',
        moduleCategory: 'all'
    },
    {
        route: '/support',
        filename: 'support.html',
        title: 'Support and Contact | CS Course Atlas',
        description: 'Contact support, share feedback, and help keep CS Course Atlas updated and free for students.',
        heading: 'Support and Contact',
        lead: 'Send feedback and keep the platform improving.',
        moduleCategory: 'all'
    },
    {
        route: '/about',
        filename: 'about.html',
        title: 'About CS Course Atlas | Creator, Scope, and Updates',
        description: 'Learn who built CS Course Atlas, what it supports now, what is in progress, and where to follow updates.',
        heading: 'About CS Course Atlas',
        lead: 'Project credibility, roadmap visibility, and direct links to updates.',
        moduleCategory: 'all'
    }
];

const GENERATED_ROOT_FILENAMES = new Set([
    ...ROUTE_PAGES.map((page) => page.filename),
    'robots.txt',
    'sitemap.html',
    'sitemap.xml',
    'sitemap.xsl'
]);

function isSamePath(left, right) {
    return path.resolve(left) === path.resolve(right);
}

function prepareOutputDirectory() {
    if (isSamePath(OUTPUT_DIR, ROOT)) return;
    fs.rmSync(OUTPUT_DIR, { recursive: true, force: true });
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function copyStaticSourceFiles() {
    if (isSamePath(OUTPUT_DIR, ROOT)) return;
    const entries = fs.readdirSync(ROOT, { withFileTypes: true });
    entries.forEach((entry) => {
        const name = entry.name;
        if (STATIC_COPY_EXCLUDES.has(name)) return;
        if (name === 'modules') return;
        if (entry.isFile() && GENERATED_ROOT_FILENAMES.has(name)) return;

        const sourcePath = path.join(ROOT, name);
        if (isSamePath(sourcePath, OUTPUT_DIR)) return;
        const destinationPath = path.join(OUTPUT_DIR, name);

        if (entry.isDirectory()) {
            fs.cpSync(sourcePath, destinationPath, { recursive: true });
            return;
        }

        if (entry.isFile()) {
            fs.mkdirSync(path.dirname(destinationPath), { recursive: true });
            fs.copyFileSync(sourcePath, destinationPath);
        }
    });
}

function escapeHtml(value) {
    return String(value || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function writeFile(filePath, contents) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, contents, 'utf8');
}

function toAbsolute(pathname) {
    const normalized = String(pathname || '/').startsWith('/') ? pathname : `/${pathname}`;
    return `${SITE_URL}${normalized}`;
}

function toRelative(pathname) {
    if (pathname === '/') return 'index.html';
    return String(pathname || '/').replace(/^\//, '');
}

function truncateDescription(value, max = 155) {
    const text = String(value || '').replace(/\s+/g, ' ').trim();
    if (!text) return '';
    if (text.length <= max) return text;
    return `${text.slice(0, Math.max(0, max - 3)).trimEnd()}...`;
}

function baseStyles() {
    // Same tokens and type as css/atlas.css so these pages read as part of the site.
    return `
:root { --bg: #f7f7f8; --surface: #fff; --surface-2: #f1f1f4; --border: #e4e4e9; --text: #17171c; --text-2: #55555f; --text-3: #85858f;
  --accent: #4f46e5; --accent-soft: #eef0ff; --accent-text: #3730a3; --on-accent: #fff; --java: #e76f00; color-scheme: light; }
@media (prefers-color-scheme: dark) { :root { --bg: #0d0d12; --surface: #15151c; --surface-2: #1d1d26; --border: #2a2a35; --text: #ececf1; --text-2: #b4b4c0; --text-3: #85859a;
  --accent: #8b85ff; --accent-soft: #23214a; --accent-text: #c7c4ff; --on-accent: #0d0d12; color-scheme: dark; } }
* { box-sizing: border-box; }
body { margin: 0; background: var(--bg); color: var(--text); font: 16px/1.65 "Instrument Sans", system-ui, -apple-system, "Segoe UI", sans-serif; -webkit-font-smoothing: antialiased; }
a { color: var(--accent); }
code { font: .86em "JetBrains Mono", ui-monospace, Menlo, Consolas, monospace; background: var(--surface-2); border: 1px solid var(--border); padding: 1px 5px; border-radius: 5px; color: var(--text); overflow-wrap: anywhere; }
.seo-page { min-height: 100vh; }
.shell { width: min(100% - 32px, 980px); margin: 0 auto; }
.top-nav { position: sticky; top: 0; z-index: 5; background: color-mix(in srgb, var(--bg) 88%, transparent); backdrop-filter: blur(10px); border-bottom: 1px solid var(--border); }
.top-nav-inner { width: min(100% - 32px, 980px); margin: 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 10px 18px; padding: 10px 0; flex-wrap: wrap; }
.brand-badge { display: inline-flex; align-items: center; gap: 10px; font-weight: 700; color: var(--text); text-decoration: none; font-size: 15px; }
.brand-icon { display: grid; place-items: center; width: 28px; height: 28px; border-radius: 8px; background: var(--accent); color: var(--on-accent); font-size: 0; }
.brand-icon::before { content: "\\25C6"; font-size: 13px; }
.nav-links { display: flex; gap: 4px; flex-wrap: wrap; align-items: center; }
.nav-links a, .back-control { padding: 6px 10px; border-radius: 8px; font: 500 13.5px inherit; font-family: inherit; color: var(--text-2); text-decoration: none; background: none; border: 0; cursor: pointer; }
.nav-links a:hover, .back-control:hover { background: var(--surface-2); color: var(--text); }
main.shell { padding: 36px 0 64px; display: grid; gap: 16px; }
.hero { padding: 30px 0 10px; }
.hero-kicker { font-size: 12px; font-weight: 600; letter-spacing: .06em; text-transform: uppercase; color: var(--text-3); margin: 0 0 6px; }
.hero h1 { font-size: clamp(32px, 5.5vw, 46px); line-height: 1.08; letter-spacing: -.028em; margin: 0 0 12px; }
.hero p { color: var(--text-2); font-size: 18px; margin: 0; max-width: 70ch; }
.hero-meta-row, .module-meta-row { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 16px; }
.chip { display: inline-flex; align-items: center; font-size: 12.5px; font-weight: 600; padding: 3px 10px; border-radius: 999px; background: var(--surface-2); color: var(--text-2); }
.cta-row { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 22px; }
.cta { display: inline-flex; align-items: center; justify-content: center; height: 42px; padding: 0 16px; border-radius: 10px; font-weight: 600; font-size: 14.5px; text-decoration: none; border: 1px solid var(--border); background: var(--surface); color: var(--text); }
.cta:first-child { background: var(--accent); border-color: var(--accent); color: var(--on-accent); }
.panel { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; padding: 22px 24px; }
.panel h2 { font-size: 20px; letter-spacing: -.01em; margin: 0 0 10px; }
.panel h2:not(:first-child) { margin-top: 26px; }
.panel p, .panel li, .meta { color: var(--text-2); }
.panel ul, .panel ol { padding-left: 22px; margin: 0; }
.panel li { margin: 5px 0; }
.meta { font-size: 14px; }
.module-grid, .detail-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 260px), 1fr)); gap: 12px; }
.module-card, .detail-card { border: 1px solid var(--border); border-radius: 12px; padding: 14px 16px; background: var(--bg); }
.module-card h3, .detail-card h3 { font-size: 15.5px; margin: 0 0 4px; }
.module-card p { font-size: 14px; margin: 0; color: var(--text-2); }
.detail-card b, .detail-card strong { display: block; }
.module-link { color: var(--text); text-decoration: none; font-weight: 600; }
.module-link:hover { color: var(--accent); }
.link-list { list-style: none; padding: 0 !important; }
.glossary-list { display: grid; gap: 10px; margin: 0; }
.glossary-list dt { font-weight: 700; }
.glossary-list dd { margin: 0 0 6px; color: var(--text-2); }
.table-wrap { overflow-x: auto; }
table { border-collapse: collapse; width: 100%; font-size: 14px; }
th, td { text-align: left; padding: 8px 10px; border-bottom: 1px solid var(--border); }
.footer { border-top: 1px solid var(--border); padding: 20px 0 40px; color: var(--text-3); font-size: 13px; }
.footer a { color: var(--text-2); }
@media (max-width: 640px) { .panel { padding: 18px; } .hero p { font-size: 16.5px; } .nav-links a:not([href$="index.html"]), .back-control { display: none; } .nav-links a[href$="modules/index.html"], .nav-links a[href="index.html"]:not(:first-of-type) { display: none; } }
`;
}

function headTemplate({ title, description, canonicalPath, assetPrefix = '' }) {
    const normalizedAssetPrefix = String(assetPrefix || '').replace(/\\/g, '/');
    const cssPrefix = normalizedAssetPrefix && !normalizedAssetPrefix.endsWith('/')
        ? `${normalizedAssetPrefix}/`
        : normalizedAssetPrefix;
    const canonical = toAbsolute(canonicalPath);
    const safeTitle = escapeHtml(title);
    const safeDescription = escapeHtml(truncateDescription(description));
    const verificationMetaTag = GOOGLE_SITE_VERIFICATION_TOKEN
        ? `\n        <meta name="google-site-verification" content="${escapeHtml(GOOGLE_SITE_VERIFICATION_TOKEN)}">`
        : '';
    return `
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${safeTitle}</title>
        <meta name="description" content="${safeDescription}">
        <meta name="robots" content="index,follow,max-image-preview:large">
        <meta name="theme-color" content="#4f46e5">
        <meta name="application-name" content="CS Course Atlas">
        <meta name="apple-mobile-web-app-title" content="CS Course Atlas">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
        ${verificationMetaTag}
        <link rel="canonical" href="${canonical}">
        <meta property="og:type" content="website">
        <meta property="og:site_name" content="CS Course Atlas">
        <meta property="og:title" content="${safeTitle}">
        <meta property="og:description" content="${safeDescription}">
        <meta property="og:url" content="${canonical}">
        <meta property="twitter:card" content="summary_large_image">
        <meta property="twitter:title" content="${safeTitle}">
        <meta property="twitter:description" content="${safeDescription}">
        <link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'%3E%3Crect width='32' height='32' rx='8' fill='%234f46e5'/%3E%3Cpath d='M16 6l9 10-9 10-9-10z' fill='white'/%3E%3C/svg%3E">
        <link rel="manifest" href="${cssPrefix}manifest.webmanifest">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Instrument+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet">
        <style>${baseStyles()}</style>
    </head>`;
}

function backControlMarkup(fallbackHref) {
    return `<button type="button" class="back-control" data-back-fallback="${escapeHtml(fallbackHref)}">&#8592; Back</button>`;
}

function backControlScript() {
    return `<script>
    (() => {
        const controls = document.querySelectorAll('[data-back-fallback]');
        controls.forEach((control) => {
            control.addEventListener('click', (event) => {
                event.preventDefault();
                const fallback = control.getAttribute('data-back-fallback') || 'index.html';
                let hasSameOriginReferrer = false;
                try {
                    hasSameOriginReferrer =
                        Boolean(document.referrer) &&
                        new URL(document.referrer).origin === window.location.origin;
                } catch (error) {
                    hasSameOriginReferrer = false;
                }
                if (hasSameOriginReferrer && window.history.length > 1) {
                    window.history.back();
                    return;
                }
                window.location.href = fallback;
            });
        });
    })();
    </script>`;
}

// Set in main() from PUBLISHED_TRACKS; null means every track is published.
let publishedTrackSet = null;

function trackNavLinks() {
    return [['dsa', 'dsa.html', 'DSA'], ['java', 'java.html', 'Java'], ['git', 'git.html', 'Git'],
        ['assembly', 'assembly.html', 'Assembly'], ['discrete', 'discrete-math.html', 'Discrete Math'],
        ['python', 'python.html', 'Python'], ['cli', 'command-line.html', 'Command Line']]
        .filter(([category]) => !publishedTrackSet || publishedTrackSet.has(category))
        .map(([, href, label]) => `<a href="${href}">${label}</a>`)
        .join('\n                    ');
}

function routePageHtml(routeConfig, modules) {
    const moduleLinks = routeConfig.moduleCategory === 'all'
        ? modules.slice(0, 12)
        : modules.filter((item) => item.category === routeConfig.moduleCategory);
    const routeLabel = routeConfig.moduleCategory === 'all'
        ? 'All Tracks'
        : (CATEGORY_LABEL_MAP[routeConfig.moduleCategory] || routeConfig.heading);
    const moduleCards = moduleLinks.map((item) => `
        <article class="module-card">
            <div class="module-meta-row">
                <span class="chip">${escapeHtml(CATEGORY_LABEL_MAP[item.category] || 'Track')}</span>
                <span class="chip">${escapeHtml(item.difficulty || 'mixed')}</span>
            </div>
            <h3><a href="modules/${encodeURIComponent(item.id)}.html">${escapeHtml(item.title)}</a></h3>
            <p>${escapeHtml(truncateDescription(item.description, 118))}</p>
            <a class="module-link" href="modules/${encodeURIComponent(item.id)}.html">Open Module Page</a>
        </article>`).join('');

    const appHref = `index.html?route=${encodeURIComponent(routeConfig.route)}`;
    return `<!DOCTYPE html>
<html lang="en">
${headTemplate({
    title: routeConfig.title,
    description: routeConfig.description,
    canonicalPath: `/${routeConfig.filename}`,
    assetPrefix: ''
})}
<body class="seo-page">
    <div class="shell">
        <nav class="top-nav" aria-label="Primary route pages">
            <div class="top-nav-inner">
                <a class="brand-badge" href="index.html">
                    <span class="brand-icon">&#x1F9ED;</span>
                    <span>CS Course Atlas</span>
                </a>
                <div class="nav-links">
                    ${backControlMarkup(appHref)}
                    <a href="index.html">Open the app</a>
                    <a href="home.html">Home</a>
                    <a href="tracks.html">Tracks</a>
                    ${trackNavLinks()}
                    <a href="modules/index.html">Module Directory</a>
                    <a href="sitemap.html">Sitemap</a>
                </div>
            </div>
        </nav>
        <header class="hero">
            <p class="hero-kicker">CS Course Atlas</p>
            <h1>${escapeHtml(routeConfig.heading)}</h1>
            <p class="meta">${escapeHtml(routeConfig.lead)}</p>
            <div class="hero-meta-row">
                <span class="chip">Track Focus: ${escapeHtml(routeLabel)}</span>
                <span class="chip">${moduleLinks.length} Linked Module Pages</span>
            </div>
            <div class="cta-row">
                <a class="cta" href="${appHref}">Open the app</a>
                <a class="cta" href="modules/index.html">Browse Module Pages</a>
            </div>
        </header>
        <section class="panel">
            <h2>${escapeHtml(routeLabel)} Module Pages</h2>
            <div class="module-grid">
                ${moduleCards || '<p class="meta">No module pages available for this route yet.</p>'}
            </div>
        </section>
        <footer class="footer">
            <p>This route page is optimized for search indexing and mobile reading. Use Interactive App for full progress tracking and tools.</p>
        </footer>
    </div>
    ${backControlScript()}
</body>
</html>`;
}

function moduleIndexHtml(groupedModules) {
    const totalModules = Object.values(groupedModules).reduce((sum, list) => sum + (Array.isArray(list) ? list.length : 0), 0);
    const trackCount = Object.keys(groupedModules).length;
    const sections = Object.keys(groupedModules).map((category) => {
        const list = groupedModules[category] || [];
        const cards = list.map((item) => `
            <article class="module-card">
                <div class="module-meta-row">
                    <span class="chip">${escapeHtml(CATEGORY_LABEL_MAP[category] || category)}</span>
                    <span class="chip">${escapeHtml(item.difficulty || 'mixed')}</span>
                </div>
                <h3><a href="${encodeURIComponent(item.id)}.html">${escapeHtml(item.title)}</a></h3>
                <p>${escapeHtml(truncateDescription(item.description, 115))}</p>
                <a class="module-link" href="${encodeURIComponent(item.id)}.html">Open Module Page</a>
            </article>`).join('');
        return `<section class="panel">
            <h2>${escapeHtml(CATEGORY_LABEL_MAP[category] || category)}</h2>
            <div class="module-grid">${cards}</div>
        </section>`;
    }).join('');

    return `<!DOCTYPE html>
<html lang="en">
${headTemplate({
    title: 'Module Directory | CS Course Atlas',
    description: 'Browse crawlable module pages across DSA, Java, Git, Assembly, and Discrete Math.',
    canonicalPath: '/modules/index.html',
    assetPrefix: '../'
})}
<body class="seo-page">
    <div class="shell">
        <nav class="top-nav" aria-label="Directory navigation">
            <div class="top-nav-inner">
                <a class="brand-badge" href="../index.html">
                    <span class="brand-icon">&#x1F9ED;</span>
                    <span>CS Course Atlas</span>
                </a>
                <div class="nav-links">
                    ${backControlMarkup('../tracks.html')}
                    <a href="../index.html">Open the app</a>
                    <a href="../tracks.html">Track Pages</a>
                    <a href="../sitemap.html">Sitemap</a>
                </div>
            </div>
        </nav>
        <header class="hero">
            <p class="hero-kicker">CS Course Atlas</p>
            <h1>CS Course Atlas Module Directory</h1>
            <p class="meta">Every published module, each with a summary and a link to open it in the app.</p>
            <div class="hero-meta-row">
                <span class="chip">${totalModules} Modules Indexed</span>
                <span class="chip">${trackCount} Track Categories</span>
            </div>
            <div class="cta-row">
                <a class="cta" href="../index.html?route=%2Ftracks">Open the app</a>
                <a class="cta" href="../home.html">Go to Home Landing Page</a>
                <a class="cta" href="../sitemap.html">Open Sitemap</a>
            </div>
        </header>
        ${sections}
        <footer class="footer">
            <p>This directory mirrors core course tracks with mobile-friendly crawlable links for every module.</p>
        </footer>
    </div>
    ${backControlScript()}
</body>
</html>`;
}

function loadCourseCurriculum() {
    const curriculumPath = path.join(ROOT, 'js', 'course-curriculum.js');
    if (!fs.existsSync(curriculumPath)) return { tracks: {}, modules: {} };
    const sandbox = { window: {} };
    require('vm').runInNewContext(fs.readFileSync(curriculumPath, 'utf8'), sandbox);
    return sandbox.window.COURSE_CURRICULUM || { tracks: {}, modules: {} };
}

function findCurriculumUnit(curriculum, moduleId) {
    for (const units of Object.values(curriculum.tracks || {})) {
        const index = (units || []).findIndex((unit) => (unit.modules || []).includes(moduleId));
        if (index >= 0) return { unit: units[index], number: index + 1, count: units.length };
    }
    return null;
}

const en = (value) => (value && typeof value === 'object' ? (value.en || '') : '');
const enList = (value) => (value && Array.isArray(value.en) ? value.en : []);
// Course text marks code with backticks; show it as <code>.
const richText = (value) => escapeHtml(value).replace(/`([^`]+)`/g, '<code>$1</code>');
const paragraphs = (value) => String(value || '').split(/\n\n+/).map((block) => `<p>${richText(block)}</p>`).join('');
const listMarkup = (items) => items.length
    ? `<ul>${items.map((item) => `<li>${richText(item)}</li>`).join('')}</ul>`
    : '';

function moduleCurriculumSections(module, allModules, curriculum) {
    const entry = curriculum.modules?.[module.id];
    if (!entry) return '';
    const titleById = new Map(allModules.map((item) => [item.id, item.title]));
    const prerequisites = (entry.prerequisites || [])
        .filter((id) => titleById.has(id))
        .map((id) => `<li><a href="${encodeURIComponent(id)}.html">${escapeHtml(titleById.get(id))}</a></li>`)
        .join('');
    const glossary = (entry.definitions || [])
        .map((definition) => `<dt>${escapeHtml(en(definition.term))}</dt><dd>${richText(en(definition.definition))}</dd>`)
        .join('');
    const resources = (entry.resources || [])
        .filter((resource) => /^https:\/\//.test(String(resource.url || '')))
        .map((resource) => `<li><a href="${escapeHtml(resource.url)}" rel="noopener" target="_blank">${escapeHtml(en(resource.label))}</a></li>`)
        .join('');
    return `
        <section class="panel">
            <h2>Why It Matters</h2>
            ${paragraphs(en(entry.whyItMatters))}
            ${prerequisites ? `<h3>Before You Start</h3><ul class="link-list">${prerequisites}</ul>` : ''}
        </section>
        <section class="panel">
            <h2>What You Will Learn</h2>
            ${listMarkup(enList(entry.objectives))}
            <h3>Key Takeaways</h3>
            ${listMarkup(enList(entry.keyTakeaways))}
        </section>
        ${glossary ? `<section class="panel"><h2>Glossary</h2><dl class="glossary-list">${glossary}</dl></section>` : ''}
        <section class="panel">
            <h2>Common Mistakes</h2>
            ${listMarkup(enList(entry.pitfalls))}
            <h3>Practice</h3>
            ${listMarkup(enList(entry.practice))}
        </section>
        ${resources ? `<section class="panel"><h2>Further Reading</h2><ul class="link-list">${resources}</ul></section>` : ''}`;
}

function modulePageHtml(module, allModules, indexById, curriculum = { tracks: {}, modules: {} }) {
    const category = module.category;
    const route = CATEGORY_ROUTE_MAP[category] || '/tracks';
    const categoryLabel = CATEGORY_LABEL_MAP[category] || 'Course Track';
    const trackModuleCount = allModules.filter((item) => item.category === category).length;
    const trackModules = allModules.filter((item) => item.category === category);
    const trackIndex = trackModules.findIndex((item) => item.id === module.id);
    const previous = trackIndex > 0 ? trackModules[trackIndex - 1] : null;
    const next = trackIndex >= 0 && trackIndex < trackModules.length - 1 ? trackModules[trackIndex + 1] : null;
    const unitInfo = findCurriculumUnit(curriculum, module.id);
    const unitModuleIds = new Set(unitInfo ? unitInfo.unit.modules : []);
    const related = trackModules
        .filter((item) => item.id !== module.id)
        .sort((a, b) => Number(unitModuleIds.has(b.id)) - Number(unitModuleIds.has(a.id)))
        .slice(0, 6);
    const curriculumEntry = curriculum.modules?.[module.id];

    const prevLink = previous
        ? `<li><a href="${encodeURIComponent(previous.id)}.html">Previous: ${escapeHtml(previous.title)}</a></li>`
        : '';
    const nextLink = next
        ? `<li><a href="${encodeURIComponent(next.id)}.html">Next: ${escapeHtml(next.title)}</a></li>`
        : '';
    const appLink = `../index.html?route=${encodeURIComponent(route)}&module=${encodeURIComponent(module.id)}`;
    const trackPage = `${route.replace(/^\//, '')}.html`;
    const relatedCards = related.map((item) => `
        <article class="module-card">
            <div class="module-meta-row">
                <span class="chip">${escapeHtml(categoryLabel)}</span>
                <span class="chip">${escapeHtml(item.difficulty || 'mixed')}</span>
            </div>
            <h3><a href="${encodeURIComponent(item.id)}.html">${escapeHtml(item.title)}</a></h3>
            <p>${escapeHtml(truncateDescription(item.description, 112))}</p>
            <a class="module-link" href="${encodeURIComponent(item.id)}.html">Open Related Module</a>
        </article>`).join('');
    return `<!DOCTYPE html>
<html lang="en">
${headTemplate({
    title: `${module.title} Module | CS Course Atlas`,
    description: module.description,
    canonicalPath: `/modules/${module.id}.html`,
    assetPrefix: '../'
})}
<body class="seo-page">
    <div class="shell">
        <nav class="top-nav" aria-label="Module page navigation">
            <div class="top-nav-inner">
                <a class="brand-badge" href="../index.html">
                    <span class="brand-icon">&#x1F9ED;</span>
                    <span>CS Course Atlas</span>
                </a>
                <div class="nav-links">
                    ${backControlMarkup(`../${trackPage}`)}
                    <a href="../index.html">Open the app</a>
                    <a href="../${trackPage}">${escapeHtml(categoryLabel)} Track Page</a>
                    <a href="index.html">Module Directory</a>
                    <a href="../sitemap.html">Sitemap</a>
                </div>
            </div>
        </nav>
        <header class="hero">
            <p class="hero-kicker">${escapeHtml(categoryLabel)} course${unitInfo ? ` · Unit ${unitInfo.number}` : ''}</p>
            <h1>${escapeHtml(module.title)}</h1>
            <p class="meta">${richText(module.description)}</p>
            <div class="hero-meta-row">
                <span class="chip">Track: ${escapeHtml(categoryLabel)}</span>
                <span class="chip">Difficulty: ${escapeHtml(module.difficulty || 'mixed')}</span>
                ${unitInfo ? `<span class="chip">Unit ${unitInfo.number} of ${unitInfo.count}: ${escapeHtml(en(unitInfo.unit.title))}</span>` : ''}
                ${curriculumEntry?.minutes ? `<span class="chip">About ${curriculumEntry.minutes} min</span>` : ''}
            </div>
            <div class="cta-row">
                <a class="cta" href="${appLink}">Open this module</a>
                <a class="cta" href="../${trackPage}">${escapeHtml(categoryLabel)} course overview</a>
            </div>
        </header>
        ${moduleCurriculumSections(module, allModules, curriculum)}
        <section class="panel">
            <h2>Continue Learning</h2>
            <ul class="link-list">
                ${prevLink}
                ${nextLink}
                <li><a href="index.html">Open full module directory</a></li>
                <li><a href="../${trackPage}">Return to ${escapeHtml(categoryLabel)} track landing page</a></li>
            </ul>
        </section>
        <section class="panel">
            <h2>Related ${escapeHtml(categoryLabel)} Modules</h2>
            <div class="module-grid">${relatedCards || '<p class="meta">No related modules found.</p>'}</div>
        </section>
        <footer class="footer">
            <p>This crawlable module page is paired with an interactive in-app version for quizzes, flashcards, and progress sync.</p>
        </footer>
    </div>
    ${backControlScript()}
</body>
</html>`;
}

function buildSitemapEntries(routePages, modules) {
    const entries = new Map();
    const register = (pathname, label, section, priority = '0.7', changefreq = 'weekly') => {
        if (!entries.has(pathname)) {
            entries.set(pathname, { pathname, label, section, priority, changefreq });
        }
    };

    register('/', 'Root', 'Core', '1.0', 'weekly');
    register('/index.html', 'Interactive App', 'Core', '1.0', 'daily');
    register('/sitemap.html', 'Sitemap', 'Core', '0.6', 'weekly');
    register('/sitemap.xml', 'XML Sitemap', 'Core', '0.6', 'weekly');
    register('/privacy-policy.html', 'Privacy Policy', 'Trust', '0.5', 'monthly');
    register('/terms-of-use.html', 'Terms of Use', 'Trust', '0.5', 'monthly');
    register('/contact-support.html', 'Contact / Support', 'Trust', '0.5', 'monthly');
    register('/donations-refunds.html', 'Donations & Refunds', 'Trust', '0.5', 'monthly');
    register('/modules/index.html', 'Module Directory', 'Modules', '0.9', 'weekly');

    routePages.forEach((item) => {
        register(`/${item.filename}`, item.heading, 'Routes', item.route === '/home' || item.route === '/tracks' ? '0.9' : '0.8', 'weekly');
    });
    modules.forEach((item) => {
        register(`/modules/${item.id}.html`, item.title, 'Modules', '0.7', 'weekly');
    });

    return Array.from(entries.values()).sort((a, b) => a.pathname.localeCompare(b.pathname));
}

function generateSitemap(entries) {
    const today = new Date().toISOString().slice(0, 10);
    const urlEntries = entries.map((entry) => `  <url>
    <loc>${toAbsolute(entry.pathname)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('\n');
    return `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`;
}

function sitemapPageHtml(entries) {
    const sections = entries.reduce((acc, entry) => {
        if (!acc[entry.section]) acc[entry.section] = [];
        acc[entry.section].push(entry);
        return acc;
    }, {});
    const order = ['Core', 'Routes', 'Modules', 'Trust'];
    const blocks = order.map((section) => {
        const list = sections[section] || [];
        if (!list.length) return '';
        const cards = list.map((entry) => `
            <article class="module-card">
                <div class="module-meta-row">
                    <span class="chip">${escapeHtml(entry.changefreq)}</span>
                    <span class="chip">Priority ${escapeHtml(entry.priority)}</span>
                </div>
                <h3><a href="${escapeHtml(toRelative(entry.pathname))}">${escapeHtml(entry.label)}</a></h3>
                <p>${escapeHtml(entry.pathname)}</p>
                <a class="module-link" href="${escapeHtml(toRelative(entry.pathname))}">Open Page</a>
            </article>`).join('');
        return `<section class="panel">
            <h2>${escapeHtml(section)} Pages</h2>
            <div class="module-grid">${cards}</div>
        </section>`;
    }).join('');

    return `<!DOCTYPE html>
<html lang="en">
${headTemplate({
    title: 'Sitemap | CS Course Atlas',
    description: 'Human-readable sitemap for CS Course Atlas route pages, module pages, and trust pages.',
    canonicalPath: '/sitemap.html',
    assetPrefix: ''
})}
<body class="seo-page">
    <div class="shell">
        <nav class="top-nav" aria-label="Sitemap navigation">
            <div class="top-nav-inner">
                <a class="brand-badge" href="index.html">
                    <span class="brand-icon">&#x1F9ED;</span>
                    <span>CS Course Atlas</span>
                </a>
                <div class="nav-links">
                    ${backControlMarkup('tracks.html')}
                    <a href="index.html">Open the app</a>
                    <a href="tracks.html">Track Pages</a>
                    <a href="modules/index.html">Module Directory</a>
                    <a href="sitemap.xml">XML Sitemap</a>
                </div>
            </div>
        </nav>
        <header class="hero">
            <p class="hero-kicker">Crawlable Site Index</p>
            <h1>CS Course Atlas Sitemap</h1>
            <p class="meta">Human-readable page index for route pages, modules, and trust content.</p>
            <div class="hero-meta-row">
                <span class="chip">${entries.length} URLs Indexed</span>
                <span class="chip">Auto-generated from module + route maps</span>
            </div>
            <div class="cta-row">
                <a class="cta" href="sitemap.xml">Open XML Sitemap</a>
                <a class="cta" href="tracks.html">Open Track Pages</a>
                <a class="cta" href="modules/index.html">Open Module Directory</a>
            </div>
        </header>
        ${blocks}
        <footer class="footer">
            <p>${entries.length} indexed URLs generated automatically with mobile-friendly crawlable links.</p>
        </footer>
    </div>
    ${backControlScript()}
</body>
</html>`;
}

function generateSitemapXsl() {
    return `<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9">
    <xsl:output method="html" encoding="UTF-8" indent="yes" />
    <xsl:template match="/">
        <html lang="en">
            <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>CS Course Atlas XML Sitemap</title>
                <style>
                    * { box-sizing: border-box; }
                    body {
                        margin: 0;
                        min-height: 100vh;
                        font-family: 'Pixelify Sans', 'Silkscreen', 'DotGothic16', monospace;
                        background:
                            radial-gradient(circle at 7% -10%, rgba(37, 99, 235, 0.28), transparent 42%),
                            radial-gradient(circle at 95% -14%, rgba(124, 58, 237, 0.26), transparent 44%),
                            linear-gradient(180deg, #030712 0%, #0f172a 58%, #111827 100%);
                        color: #e2e8f0;
                    }
                    .shell { max-width: 1180px; margin: 0 auto; padding: 0.95rem; }
                    .top {
                        border: 1px solid rgba(165, 180, 252, 0.42);
                        border-radius: 1rem;
                        background: linear-gradient(95deg, #2563eb, #4f46e5, #7c3aed);
                        padding: 0.6rem 0.72rem;
                        margin-bottom: 0.85rem;
                    }
                    .top a {
                        color: #f8fafc;
                        text-decoration: none;
                        border: 1px solid rgba(255, 255, 255, 0.25);
                        border-radius: 999px;
                        padding: 0.38rem 0.62rem;
                        background: rgba(15, 23, 42, 0.45);
                        display: inline-block;
                        margin-right: 0.38rem;
                        margin-bottom: 0.34rem;
                        font-size: 0.8rem;
                    }
                    .hero {
                        border: 1px solid rgba(148, 163, 184, 0.3);
                        border-radius: 1rem;
                        background: rgba(15, 23, 42, 0.84);
                        padding: 0.9rem 0.95rem;
                    }
                    h1 { margin: 0; color: #e0e7ff; line-height: 1.2; font-size: clamp(1.25rem, 3.2vw, 1.9rem); }
                    p { color: #cbd5e1; margin: 0.4rem 0 0; }
                    .table-wrap {
                        margin-top: 0.82rem;
                        border: 1px solid rgba(148, 163, 184, 0.28);
                        border-radius: 0.88rem;
                        overflow: auto;
                        background: rgba(15, 23, 42, 0.72);
                    }
                    a { color: #bfdbfe; }
                    table { width: 100%; min-width: 640px; border-collapse: collapse; }
                    th, td { text-align: left; padding: 0.52rem 0.62rem; border-bottom: 1px solid rgba(148, 163, 184, 0.26); }
                    th { color: #c7d2fe; background: rgba(30, 41, 59, 0.78); position: sticky; top: 0; }
                    td { color: #dbeafe; }
                    @media (max-width: 640px) {
                        .shell { padding: 0.7rem 0.62rem; }
                        .top { padding: 0.54rem 0.56rem; border-radius: 0.88rem; margin-bottom: 0.68rem; }
                        .top a { font-size: 0.74rem; padding: 0.34rem 0.56rem; }
                        .hero { padding: 0.8rem 0.8rem 0.84rem; border-radius: 0.9rem; }
                    }
                </style>
            </head>
            <body>
                <div class="shell">
                    <nav class="top">
                        <a href="index.html">Open the app</a>
                        <a href="tracks.html">Track Pages</a>
                        <a href="modules/index.html">Module Directory</a>
                        <a href="sitemap.html">HTML Sitemap</a>
                    </nav>
                    <section class="hero">
                        <h1>CS Course Atlas XML Sitemap</h1>
                        <p>Styled XML sitemap view with mobile-friendly scrolling.</p>
                    </section>
                    <div class="table-wrap">
                        <table>
                            <thead>
                                <tr>
                                    <th>URL</th>
                                    <th>Last Modified</th>
                                    <th>Change Frequency</th>
                                    <th>Priority</th>
                                </tr>
                            </thead>
                            <tbody>
                                <xsl:for-each select="s:urlset/s:url">
                                    <tr>
                                        <td><a href="{s:loc}"><xsl:value-of select="s:loc" /></a></td>
                                        <td><xsl:value-of select="s:lastmod" /></td>
                                        <td><xsl:value-of select="s:changefreq" /></td>
                                        <td><xsl:value-of select="s:priority" /></td>
                                    </tr>
                                </xsl:for-each>
                            </tbody>
                        </table>
                    </div>
                </div>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
`;
}

function generateRobots() {
    return `User-agent: *
Allow: /

Sitemap: ${toAbsolute('/sitemap.xml')}
`;
}

function main() {
    prepareOutputDirectory();
    copyStaticSourceFiles();

    const catalog = loadCatalog();
    const curriculum = loadCourseCurriculum();
    const sequence = catalog.MODULE_LEARNING_SEQUENCE;
    const metadataById = new Map(catalog.modules.map((module) => [module.id, module]));

    const modules = sequence.map((id) => {
        const { title, description, difficulty } = metadataById.get(id);
        return { id, title, description, difficulty, category: catalog.MODULE_CATEGORY_BY_ID[id] || 'dsa' };
    });

    // Only publish pages for tracks listed in publishedTracks in data/module-catalog.json.
    const publishedTracks = new Set(catalog.PUBLISHED_TRACKS);
    const isPublished = (category) => publishedTracks.has(category);
    publishedTrackSet = publishedTracks;
    for (let index = modules.length - 1; index >= 0; index -= 1) {
        if (!isPublished(modules[index].category)) modules.splice(index, 1);
    }
    const routePages = ROUTE_PAGES.filter((page) => page.moduleCategory === 'all' || isPublished(page.moduleCategory));

    modules.sort((a, b) => sequence.indexOf(a.id) - sequence.indexOf(b.id));
    const indexById = new Map(modules.map((item, index) => [item.id, index]));
    const grouped = modules.reduce((acc, item) => {
        if (!acc[item.category]) acc[item.category] = [];
        acc[item.category].push(item);
        return acc;
    }, {});

    routePages.forEach((routeConfig) => {
        const html = routePageHtml(routeConfig, modules);
        writeFile(path.join(OUTPUT_DIR, routeConfig.filename), html);
    });

    writeFile(path.join(MODULES_DIR, 'index.html'), moduleIndexHtml(grouped));
    modules.forEach((module) => {
        const html = modulePageHtml(module, modules, indexById, curriculum);
        writeFile(path.join(MODULES_DIR, `${module.id}.html`), html);
    });

    const sitemapEntries = buildSitemapEntries(routePages, modules);
    writeFile(path.join(OUTPUT_DIR, 'sitemap.html'), sitemapPageHtml(sitemapEntries));
    writeFile(path.join(OUTPUT_DIR, 'sitemap.xml'), generateSitemap(sitemapEntries));
    writeFile(path.join(OUTPUT_DIR, 'sitemap.xsl'), generateSitemapXsl());
    writeFile(path.join(OUTPUT_DIR, 'robots.txt'), generateRobots());

    console.log(
        `Generated ${routePages.length} route pages, ${modules.length} module pages, and sitemap assets in ${OUTPUT_DIR}.`
    );
}

main();
