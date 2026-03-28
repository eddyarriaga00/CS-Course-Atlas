const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const DEFAULT_OUTPUT_DIR = 'dist';
const OUTPUT_DIR = path.resolve(ROOT, process.env.BUILD_OUT_DIR || DEFAULT_OUTPUT_DIR);
const SITE_URL = 'https://eddyarriaga00.github.io/CS-Course-Atlas';
const SOURCE_JS = path.join(ROOT, 'js', 'script.js');
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
    'tailwind.config.cjs'
]);

const CATEGORY_ROUTE_MAP = {
    dsa: '/dsa',
    java: '/java',
    git: '/git',
    assembly: '/assembly',
    discrete: '/discrete-math'
};

const CATEGORY_LABEL_MAP = {
    dsa: 'Data Structures and Algorithms',
    java: 'Java',
    git: 'Git',
    assembly: 'Assembly',
    discrete: 'Discrete Math'
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

function parseModuleCategoryMap(source) {
    const map = new Map();
    const match = source.match(/const MODULE_CATEGORY_BY_ID = \{([\s\S]*?)\n\};/m);
    if (!match) return map;
    const block = match[1];
    const pattern = /'([^']+)':\s*'([^']+)'/g;
    let capture = pattern.exec(block);
    while (capture) {
        map.set(capture[1], capture[2]);
        capture = pattern.exec(block);
    }
    return map;
}

function parseModuleSequence(source) {
    const output = [];
    const match = source.match(/const MODULE_LEARNING_SEQUENCE = \[([\s\S]*?)\];/m);
    if (!match) return output;
    const block = match[1];
    const pattern = /'([^']+)'/g;
    let capture = pattern.exec(block);
    while (capture) {
        output.push(capture[1]);
        capture = pattern.exec(block);
    }
    return output;
}

function parseModuleMetadata(source) {
    const map = new Map();
    const pattern = /id:\s*'((?:\\'|[^'])+)'\s*,\s*title:\s*'((?:\\'|[^'])+)'\s*,\s*description:\s*'((?:\\'|[^'])+)'\s*,\s*difficulty:\s*'((?:\\'|[^'])+)'/g;
    let capture = pattern.exec(source);
    while (capture) {
        const id = capture[1].replace(/\\'/g, "'");
        const title = capture[2].replace(/\\'/g, "'");
        const description = capture[3].replace(/\\'/g, "'");
        const difficulty = capture[4].replace(/\\'/g, "'");
        map.set(id, { id, title, description, difficulty });
        capture = pattern.exec(source);
    }
    return map;
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
    return `
        :root {
            color-scheme: dark;
            --seo-bg-top: #030712;
            --seo-bg-base: #0f172a;
            --seo-bg-bottom: #111827;
            --seo-panel: rgba(15, 23, 42, 0.8);
            --seo-panel-soft: rgba(30, 41, 59, 0.78);
            --seo-border: rgba(148, 163, 184, 0.28);
            --seo-border-strong: rgba(129, 140, 248, 0.66);
            --seo-text: #e2e8f0;
            --seo-muted: #cbd5e1;
            --seo-link: #bfdbfe;
            --seo-link-hover: #e0e7ff;
            --seo-brand-a: #2563eb;
            --seo-brand-b: #4f46e5;
            --seo-brand-c: #7c3aed;
            --seo-btn-grad-a: rgba(59, 130, 246, 0.28);
            --seo-btn-grad-b: rgba(124, 58, 237, 0.26);
        }
        * { box-sizing: border-box; }
        body.seo-page {
            margin: 0;
            min-height: 100vh;
            font-family: "Pixelify Sans", "Silkscreen", "DotGothic16", monospace;
            background:
                radial-gradient(circle at 6% -10%, rgba(37, 99, 235, 0.3), transparent 45%),
                radial-gradient(circle at 98% -10%, rgba(124, 58, 237, 0.28), transparent 48%),
                linear-gradient(180deg, var(--seo-bg-top) 0%, var(--seo-bg-base) 56%, var(--seo-bg-bottom) 100%);
            color: var(--seo-text);
            line-height: 1.6;
        }
        body.seo-page::before {
            content: "";
            position: fixed;
            inset: 0;
            pointer-events: none;
            background:
                radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1), transparent 28%),
                radial-gradient(circle at 80% 10%, rgba(99, 102, 241, 0.08), transparent 30%);
            z-index: -1;
        }
        .shell {
            max-width: 1240px;
            margin: 0 auto;
            padding: 1rem 1rem max(2.2rem, env(safe-area-inset-bottom));
        }
        .top-nav {
            margin-bottom: 0.95rem;
            border: 1px solid rgba(165, 180, 252, 0.45);
            border-radius: 1rem;
            background: linear-gradient(95deg, var(--seo-brand-a), var(--seo-brand-b), var(--seo-brand-c));
            box-shadow: 0 18px 36px rgba(2, 6, 23, 0.34);
            padding: 0.72rem 0.8rem;
        }
        .top-nav-inner {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 0.7rem;
        }
        .brand-badge {
            display: inline-flex;
            align-items: center;
            gap: 0.45rem;
            padding: 0.38rem 0.62rem;
            border-radius: 999px;
            border: 1px solid rgba(255, 255, 255, 0.24);
            background: rgba(15, 23, 42, 0.46);
            color: #f8fafc;
            font-size: 0.77rem;
            white-space: nowrap;
        }
        .brand-badge .brand-icon {
            font-size: 0.95rem;
            line-height: 1;
        }
        .nav-links {
            display: flex;
            align-items: center;
            justify-content: flex-end;
            gap: 0.48rem;
            flex-wrap: wrap;
        }
        .nav-links a,
        .nav-links button {
            -webkit-appearance: none;
            appearance: none;
            text-decoration: none;
            color: #f8fafc;
            border: 1px solid rgba(255, 255, 255, 0.24);
            padding: 0.46rem 0.76rem;
            border-radius: 999px;
            background: rgba(15, 23, 42, 0.45);
            font-size: 0.79rem;
            font-weight: 700;
            line-height: 1.15;
            cursor: pointer;
            transition: background-color 140ms ease, border-color 140ms ease, transform 140ms ease;
            min-height: 2.3rem;
            white-space: nowrap;
        }
        .nav-links a:hover,
        .nav-links button:hover {
            background: rgba(15, 23, 42, 0.68);
            border-color: var(--seo-border-strong);
            transform: translateY(-1px);
        }
        .nav-links a:focus-visible,
        .nav-links button:focus-visible {
            outline: 2px solid #93c5fd;
            outline-offset: 2px;
        }
        .nav-links .back-control {
            background: linear-gradient(120deg, rgba(15, 23, 42, 0.76), rgba(30, 41, 59, 0.72));
            border-color: rgba(191, 219, 254, 0.68);
        }
        .hero {
            border: 1px solid var(--seo-border);
            background: linear-gradient(145deg, rgba(15, 23, 42, 0.9), rgba(30, 41, 59, 0.76));
            border-radius: 1rem;
            padding: 1rem 1.05rem;
            box-shadow: 0 20px 44px rgba(2, 6, 23, 0.38);
        }
        .hero-kicker {
            margin: 0;
            font-size: 0.74rem;
            text-transform: uppercase;
            letter-spacing: 0.07em;
            color: #bfdbfe;
            opacity: 0.96;
        }
        h1 { margin: 0.3rem 0 0; font-size: clamp(1.45rem, 3.3vw, 2.08rem); color: #e0e7ff; line-height: 1.16; }
        h2 { margin: 1rem 0 0.5rem; font-size: 1.03rem; color: #c7d2fe; line-height: 1.3; }
        p { margin: 0.45rem 0; color: var(--seo-muted); }
        .hero-meta-row {
            margin-top: 0.55rem;
            display: flex;
            flex-wrap: wrap;
            gap: 0.45rem;
        }
        .chip {
            display: inline-flex;
            align-items: center;
            border-radius: 999px;
            border: 1px solid rgba(148, 163, 184, 0.35);
            background: rgba(15, 23, 42, 0.55);
            color: #dbeafe;
            font-size: 0.74rem;
            line-height: 1;
            padding: 0.34rem 0.58rem;
            white-space: nowrap;
        }
        .cta-row {
            margin-top: 0.8rem;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
            gap: 0.55rem;
        }
        .cta {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 0.35rem;
            text-decoration: none;
            color: #f8fafc;
            background: linear-gradient(120deg, rgba(59, 130, 246, 0.36), rgba(124, 58, 237, 0.35));
            border: 1px solid rgba(129, 140, 248, 0.52);
            border-radius: 0.75rem;
            padding: 0.58rem 0.75rem;
            font-size: 0.8rem;
            font-weight: 700;
            transition: background-color 140ms ease, border-color 140ms ease, transform 140ms ease;
            min-height: 2.6rem;
            text-align: center;
        }
        .cta:hover {
            background: linear-gradient(120deg, rgba(37, 99, 235, 0.45), rgba(109, 40, 217, 0.4));
            border-color: rgba(165, 180, 252, 0.66);
            transform: translateY(-1px);
        }
        ul {
            margin: 0.45rem 0 0;
            padding-left: 1.2rem;
            list-style: disc;
        }
        li { margin: 0.26rem 0; }
        a { color: var(--seo-link); }
        a:hover { color: var(--seo-link-hover); }
        .panel {
            margin-top: 1rem;
            border: 1px solid var(--seo-border);
            border-radius: 0.95rem;
            padding: 0.88rem 0.92rem;
            background: linear-gradient(160deg, var(--seo-panel), var(--seo-panel-soft));
            box-shadow: 0 14px 32px rgba(2, 6, 23, 0.22);
        }
        .meta { color: var(--seo-muted); font-size: 0.9rem; }
        .module-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 0.75rem;
        }
        .module-card {
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 0.8rem;
            padding: 0.66rem 0.72rem 0.72rem;
            background: rgba(15, 23, 42, 0.58);
            display: flex;
            flex-direction: column;
            gap: 0.4rem;
        }
        .module-card h3 {
            margin: 0;
            font-size: 0.95rem;
            color: #dbeafe;
            line-height: 1.3;
        }
        .module-card p {
            margin: 0;
            font-size: 0.83rem;
            color: #cbd5e1;
            flex: 1 1 auto;
        }
        .module-meta-row {
            display: flex;
            flex-wrap: wrap;
            gap: 0.34rem;
        }
        .module-link {
            align-self: flex-start;
            display: inline-flex;
            align-items: center;
            gap: 0.3rem;
            margin-top: 0.12rem;
            text-decoration: none;
            color: #e2e8f0;
            border: 1px solid rgba(148, 163, 184, 0.34);
            background: rgba(30, 41, 59, 0.62);
            border-radius: 0.58rem;
            padding: 0.35rem 0.52rem;
            font-size: 0.74rem;
            font-weight: 700;
            min-height: 2rem;
        }
        .module-link:hover {
            border-color: rgba(191, 219, 254, 0.7);
            background: rgba(51, 65, 85, 0.7);
        }
        .detail-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
            gap: 0.62rem;
        }
        .detail-card {
            border: 1px solid rgba(148, 163, 184, 0.32);
            border-radius: 0.76rem;
            padding: 0.6rem 0.65rem;
            background: rgba(15, 23, 42, 0.5);
        }
        .detail-card strong {
            display: block;
            color: #c7d2fe;
            font-size: 0.75rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        .detail-card span {
            display: block;
            margin-top: 0.22rem;
            color: #e2e8f0;
            font-size: 0.9rem;
        }
        .link-list {
            margin: 0;
            padding-left: 1.05rem;
        }
        .link-list li {
            margin: 0.35rem 0;
        }
        .footer {
            margin-top: 1.2rem;
            font-size: 0.8rem;
            color: var(--seo-muted);
        }
        @media (max-width: 640px) {
            .shell { padding: 0.72rem 0.66rem max(1.4rem, env(safe-area-inset-bottom)); }
            .top-nav {
                padding: 0.58rem 0.58rem 0.56rem;
                border-radius: 0.88rem;
                margin-bottom: 0.72rem;
            }
            .top-nav-inner {
                flex-direction: column;
                align-items: stretch;
                gap: 0.52rem;
            }
            .brand-badge {
                justify-content: center;
                width: 100%;
            }
            .nav-links {
                flex-wrap: nowrap;
                overflow-x: auto;
                padding-bottom: 0.16rem;
                justify-content: flex-start;
                -webkit-overflow-scrolling: touch;
                scrollbar-width: thin;
            }
            .nav-links a,
            .nav-links button {
                font-size: 0.74rem;
                padding: 0.46rem 0.68rem;
                min-height: 2.18rem;
            }
            .hero {
                padding: 0.86rem 0.86rem 0.9rem;
                border-radius: 0.92rem;
            }
            .hero-kicker {
                font-size: 0.69rem;
            }
            h1 {
                font-size: clamp(1.22rem, 6.2vw, 1.56rem);
            }
            .cta-row {
                grid-template-columns: 1fr;
                gap: 0.46rem;
            }
            .cta {
                width: 100%;
                min-height: 2.48rem;
                font-size: 0.76rem;
            }
            .panel {
                margin-top: 0.76rem;
                padding: 0.78rem 0.78rem 0.82rem;
                border-radius: 0.88rem;
            }
            .module-grid,
            .detail-grid {
                grid-template-columns: 1fr;
                gap: 0.58rem;
            }
            .module-card {
                padding: 0.62rem 0.62rem 0.66rem;
            }
        }
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
        <link rel="icon" href="data:,">
        <link rel="stylesheet" href="${cssPrefix}css/tailwind.css">
        <link rel="stylesheet" href="${cssPrefix}css/styles.css">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=DotGothic16&family=Pixelify+Sans:wght@400&family=Silkscreen:wght@400&display=swap" rel="stylesheet">
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
                <div class="brand-badge">
                    <span class="brand-icon">&#x1F9ED;</span>
                    <span>CS Course Atlas</span>
                </div>
                <div class="nav-links">
                    ${backControlMarkup(appHref)}
                    <a href="index.html">Interactive App</a>
                    <a href="home.html">Home</a>
                    <a href="tracks.html">Tracks</a>
                    <a href="dsa.html">DSA</a>
                    <a href="java.html">Java</a>
                    <a href="git.html">Git</a>
                    <a href="assembly.html">Assembly</a>
                    <a href="discrete-math.html">Discrete Math</a>
                    <a href="modules/index.html">Module Directory</a>
                    <a href="sitemap.html">Sitemap</a>
                </div>
            </div>
        </nav>
        <header class="hero">
            <p class="hero-kicker">Crawlable Learning Route</p>
            <h1>${escapeHtml(routeConfig.heading)}</h1>
            <p class="meta">${escapeHtml(routeConfig.lead)}</p>
            <div class="hero-meta-row">
                <span class="chip">Track Focus: ${escapeHtml(routeLabel)}</span>
                <span class="chip">${moduleLinks.length} Linked Module Pages</span>
            </div>
            <div class="cta-row">
                <a class="cta" href="${appHref}">Open Interactive View</a>
                <a class="cta" href="modules/index.html">Browse Module Pages</a>
                <a class="cta" href="sitemap.html">Open Sitemap Page</a>
                <a class="cta" href="sitemap.xml">XML Sitemap</a>
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
                <div class="brand-badge">
                    <span class="brand-icon">&#x1F9ED;</span>
                    <span>CS Course Atlas</span>
                </div>
                <div class="nav-links">
                    ${backControlMarkup('../tracks.html')}
                    <a href="../index.html">Interactive App</a>
                    <a href="../tracks.html">Track Pages</a>
                    <a href="../sitemap.html">Sitemap</a>
                    <a href="../sitemap.xml">XML</a>
                </div>
            </div>
        </nav>
        <header class="hero">
            <p class="hero-kicker">Crawlable Module Hub</p>
            <h1>CS Course Atlas Module Directory</h1>
            <p class="meta">Crawlable module pages with direct links to interactive practice.</p>
            <div class="hero-meta-row">
                <span class="chip">${totalModules} Modules Indexed</span>
                <span class="chip">${trackCount} Track Categories</span>
            </div>
            <div class="cta-row">
                <a class="cta" href="../index.html?route=%2Ftracks">Open Interactive Track View</a>
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

function modulePageHtml(module, allModules, indexById) {
    const category = module.category;
    const route = CATEGORY_ROUTE_MAP[category] || '/tracks';
    const categoryLabel = CATEGORY_LABEL_MAP[category] || 'Course Track';
    const currentIndex = indexById.get(module.id);
    const moduleNumber = Number.isFinite(currentIndex) ? currentIndex + 1 : 1;
    const trackModuleCount = allModules.filter((item) => item.category === category).length;
    const previous = currentIndex > 0 ? allModules[currentIndex - 1] : null;
    const next = currentIndex < allModules.length - 1 ? allModules[currentIndex + 1] : null;
    const related = allModules.filter((item) => item.category === category && item.id !== module.id).slice(0, 6);

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
                <div class="brand-badge">
                    <span class="brand-icon">&#x1F9ED;</span>
                    <span>CS Course Atlas</span>
                </div>
                <div class="nav-links">
                    ${backControlMarkup(`../${trackPage}`)}
                    <a href="../index.html">Interactive App</a>
                    <a href="../${trackPage}">${escapeHtml(categoryLabel)} Track Page</a>
                    <a href="index.html">Module Directory</a>
                    <a href="../sitemap.html">Sitemap</a>
                    <a href="../sitemap.xml">XML</a>
                </div>
            </div>
        </nav>
        <header class="hero">
            <p class="hero-kicker">Crawlable Module Page</p>
            <h1>${escapeHtml(module.title)}</h1>
            <p class="meta">${escapeHtml(module.description)}</p>
            <div class="hero-meta-row">
                <span class="chip">Track: ${escapeHtml(categoryLabel)}</span>
                <span class="chip">Difficulty: ${escapeHtml(module.difficulty || 'mixed')}</span>
            </div>
            <div class="cta-row">
                <a class="cta" href="${appLink}">Open This Module in Interactive App</a>
                <a class="cta" href="../${trackPage}">View ${escapeHtml(categoryLabel)} Track Landing Page</a>
                <a class="cta" href="../sitemap.html">Open Sitemap</a>
            </div>
        </header>
        <section class="panel">
            <h2>Module Snapshot</h2>
            <div class="detail-grid">
                <div class="detail-card">
                    <strong>Track</strong>
                    <span>${escapeHtml(categoryLabel)}</span>
                </div>
                <div class="detail-card">
                    <strong>Difficulty</strong>
                    <span>${escapeHtml(module.difficulty || 'mixed')}</span>
                </div>
                <div class="detail-card">
                    <strong>Global Position</strong>
                    <span>${moduleNumber} of ${allModules.length}</span>
                </div>
                <div class="detail-card">
                    <strong>Track Size</strong>
                    <span>${trackModuleCount} modules</span>
                </div>
            </div>
        </section>
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
                <div class="brand-badge">
                    <span class="brand-icon">&#x1F9ED;</span>
                    <span>CS Course Atlas</span>
                </div>
                <div class="nav-links">
                    ${backControlMarkup('tracks.html')}
                    <a href="index.html">Interactive App</a>
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
                        <a href="index.html">Interactive App</a>
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

    const source = fs.readFileSync(SOURCE_JS, 'utf8');
    const categoryMap = parseModuleCategoryMap(source);
    const sequence = parseModuleSequence(source);
    const metadataMap = parseModuleMetadata(source);

    const modules = sequence.map((id) => {
        const metadata = metadataMap.get(id);
        const category = categoryMap.get(id) || 'dsa';
        if (!metadata) {
            return {
                id,
                title: id.replace(/-/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase()),
                description: `Study ${id.replace(/-/g, ' ')} in CS Course Atlas.`,
                difficulty: 'mixed',
                category
            };
        }
        return {
            ...metadata,
            category
        };
    });

    modules.sort((a, b) => sequence.indexOf(a.id) - sequence.indexOf(b.id));
    const indexById = new Map(modules.map((item, index) => [item.id, index]));
    const grouped = modules.reduce((acc, item) => {
        if (!acc[item.category]) acc[item.category] = [];
        acc[item.category].push(item);
        return acc;
    }, {});

    ROUTE_PAGES.forEach((routeConfig) => {
        const html = routePageHtml(routeConfig, modules);
        writeFile(path.join(OUTPUT_DIR, routeConfig.filename), html);
    });

    writeFile(path.join(MODULES_DIR, 'index.html'), moduleIndexHtml(grouped));
    modules.forEach((module) => {
        const html = modulePageHtml(module, modules, indexById);
        writeFile(path.join(MODULES_DIR, `${module.id}.html`), html);
    });

    const sitemapEntries = buildSitemapEntries(ROUTE_PAGES, modules);
    writeFile(path.join(OUTPUT_DIR, 'sitemap.html'), sitemapPageHtml(sitemapEntries));
    writeFile(path.join(OUTPUT_DIR, 'sitemap.xml'), generateSitemap(sitemapEntries));
    writeFile(path.join(OUTPUT_DIR, 'sitemap.xsl'), generateSitemapXsl());
    writeFile(path.join(OUTPUT_DIR, 'robots.txt'), generateRobots());

    console.log(
        `Generated ${ROUTE_PAGES.length} route pages, ${modules.length} module pages, and sitemap assets in ${OUTPUT_DIR}.`
    );
}

main();
