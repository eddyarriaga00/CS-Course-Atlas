const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const SITE_URL = 'https://eddyarriaga00.github.io/CS-Course-Atlas';
const SOURCE_JS = path.join(ROOT, 'js', 'script.js');
const MODULES_DIR = path.join(ROOT, 'modules');

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
            --bg: #080d1b;
            --panel: #11172a;
            --muted: #a5b4fc;
            --text: #e2e8f0;
            --accent: #60a5fa;
            --accent-soft: rgba(96, 165, 250, 0.16);
            --line: rgba(148, 163, 184, 0.22);
        }
        * { box-sizing: border-box; }
        body {
            margin: 0;
            font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
            background: radial-gradient(circle at top, #172554 0%, var(--bg) 45%);
            color: var(--text);
            line-height: 1.6;
        }
        .shell {
            max-width: 980px;
            margin: 0 auto;
            padding: 1rem 1rem 2rem;
        }
        .top-nav {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-bottom: 1rem;
        }
        .top-nav a {
            text-decoration: none;
            color: var(--text);
            border: 1px solid var(--line);
            padding: 0.4rem 0.65rem;
            border-radius: 0.6rem;
            background: rgba(15, 23, 42, 0.55);
            font-size: 0.82rem;
        }
        .hero {
            border: 1px solid var(--line);
            background: linear-gradient(145deg, rgba(17, 24, 39, 0.9), rgba(30, 41, 59, 0.7));
            border-radius: 1rem;
            padding: 1rem 1.1rem;
        }
        h1 { margin: 0; font-size: clamp(1.5rem, 2.8vw, 2rem); color: #c7d2fe; }
        h2 { margin: 1.2rem 0 0.5rem; font-size: 1.08rem; color: #bfdbfe; }
        p { margin: 0.45rem 0; }
        .cta-row {
            margin-top: 0.8rem;
            display: flex;
            flex-wrap: wrap;
            gap: 0.55rem;
        }
        .cta {
            display: inline-flex;
            align-items: center;
            gap: 0.35rem;
            text-decoration: none;
            color: #f8fafc;
            background: var(--accent-soft);
            border: 1px solid rgba(147, 197, 253, 0.45);
            border-radius: 0.65rem;
            padding: 0.46rem 0.75rem;
            font-size: 0.84rem;
            font-weight: 600;
        }
        ul {
            margin: 0.35rem 0 0;
            padding-left: 1.05rem;
        }
        li { margin: 0.26rem 0; }
        a { color: #bae6fd; }
        .panel {
            margin-top: 1rem;
            border: 1px solid var(--line);
            border-radius: 0.95rem;
            padding: 0.95rem 1rem;
            background: var(--panel);
        }
        .meta { color: #cbd5e1; font-size: 0.9rem; }
        .module-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: 0.75rem;
        }
        .module-card {
            border: 1px solid var(--line);
            border-radius: 0.8rem;
            padding: 0.65rem 0.75rem;
            background: rgba(15, 23, 42, 0.55);
        }
        .module-card h3 {
            margin: 0;
            font-size: 0.95rem;
            color: #dbeafe;
        }
        .module-card p {
            margin-top: 0.28rem;
            font-size: 0.83rem;
            color: #cbd5e1;
        }
        .footer {
            margin-top: 1.2rem;
            font-size: 0.83rem;
            color: #cbd5e1;
        }
    `;
}

function headTemplate({ title, description, canonicalPath }) {
    const canonical = toAbsolute(canonicalPath);
    const safeTitle = escapeHtml(title);
    const safeDescription = escapeHtml(truncateDescription(description));
    return `
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${safeTitle}</title>
        <meta name="description" content="${safeDescription}">
        <meta name="robots" content="index,follow,max-image-preview:large">
        <meta name="google-site-verification" content="REPLACE_WITH_GOOGLE_SEARCH_CONSOLE_TOKEN">
        <link rel="canonical" href="${canonical}">
        <meta property="og:type" content="website">
        <meta property="og:site_name" content="CS Course Atlas">
        <meta property="og:title" content="${safeTitle}">
        <meta property="og:description" content="${safeDescription}">
        <meta property="og:url" content="${canonical}">
        <meta property="twitter:card" content="summary_large_image">
        <meta property="twitter:title" content="${safeTitle}">
        <meta property="twitter:description" content="${safeDescription}">
        <style>${baseStyles()}</style>
    </head>`;
}

function routePageHtml(routeConfig, modules) {
    const moduleLinks = routeConfig.moduleCategory === 'all'
        ? modules.slice(0, 12)
        : modules.filter((item) => item.category === routeConfig.moduleCategory);
    const moduleCards = moduleLinks.map((item) => `
        <article class="module-card">
            <h3><a href="modules/${encodeURIComponent(item.id)}.html">${escapeHtml(item.title)}</a></h3>
            <p>${escapeHtml(truncateDescription(item.description, 118))}</p>
        </article>`).join('');

    const appHref = `index.html?route=${encodeURIComponent(routeConfig.route)}`;
    return `<!DOCTYPE html>
<html lang="en">
${headTemplate({
    title: routeConfig.title,
    description: routeConfig.description,
    canonicalPath: `/${routeConfig.filename}`
})}
<body>
    <div class="shell">
        <nav class="top-nav" aria-label="Primary route pages">
            <a href="index.html">Interactive App</a>
            <a href="home.html">Home</a>
            <a href="tracks.html">Tracks</a>
            <a href="dsa.html">DSA</a>
            <a href="java.html">Java</a>
            <a href="git.html">Git</a>
            <a href="assembly.html">Assembly</a>
            <a href="discrete-math.html">Discrete Math</a>
            <a href="modules/index.html">Module Directory</a>
        </nav>
        <header class="hero">
            <h1>${escapeHtml(routeConfig.heading)}</h1>
            <p class="meta">${escapeHtml(routeConfig.lead)}</p>
            <div class="cta-row">
                <a class="cta" href="${appHref}">Open Interactive View</a>
                <a class="cta" href="modules/index.html">Browse Module Pages</a>
                <a class="cta" href="sitemap.xml">View Sitemap</a>
            </div>
        </header>
        <section class="panel">
            <h2>Module Pages Linked To This Track</h2>
            <div class="module-grid">
                ${moduleCards || '<p class="meta">No module pages available for this route yet.</p>'}
            </div>
        </section>
        <footer class="footer">
            <p>CS Course Atlas route landing page. For full interaction, open the app link above.</p>
        </footer>
    </div>
</body>
</html>`;
}

function moduleIndexHtml(groupedModules) {
    const sections = Object.keys(groupedModules).map((category) => {
        const list = groupedModules[category] || [];
        const links = list.map((item) => `
            <li>
                <a href="${encodeURIComponent(item.id)}.html">${escapeHtml(item.title)}</a>
                <span class="meta">(${escapeHtml(item.difficulty)})</span>
            </li>`).join('');
        return `<section class="panel">
            <h2>${escapeHtml(CATEGORY_LABEL_MAP[category] || category)}</h2>
            <ul>${links}</ul>
        </section>`;
    }).join('');

    return `<!DOCTYPE html>
<html lang="en">
${headTemplate({
    title: 'Module Directory | CS Course Atlas',
    description: 'Browse crawlable module pages across DSA, Java, Git, Assembly, and Discrete Math.',
    canonicalPath: '/modules/index.html'
})}
<body>
    <div class="shell">
        <nav class="top-nav" aria-label="Directory navigation">
            <a href="../index.html">Interactive App</a>
            <a href="../tracks.html">Track Pages</a>
            <a href="../sitemap.xml">Sitemap</a>
        </nav>
        <header class="hero">
            <h1>CS Course Atlas Module Directory</h1>
            <p class="meta">Crawlable module pages with direct links to interactive practice.</p>
            <div class="cta-row">
                <a class="cta" href="../index.html?route=%2Ftracks">Open Interactive Track View</a>
                <a class="cta" href="../home.html">Go to Home Landing Page</a>
            </div>
        </header>
        ${sections}
    </div>
</body>
</html>`;
}

function modulePageHtml(module, allModules, indexById) {
    const category = module.category;
    const route = CATEGORY_ROUTE_MAP[category] || '/tracks';
    const categoryLabel = CATEGORY_LABEL_MAP[category] || 'Course Track';
    const currentIndex = indexById.get(module.id);
    const previous = currentIndex > 0 ? allModules[currentIndex - 1] : null;
    const next = currentIndex < allModules.length - 1 ? allModules[currentIndex + 1] : null;
    const related = allModules.filter((item) => item.category === category && item.id !== module.id).slice(0, 6);

    const prevLink = previous
        ? `<li><a href="${encodeURIComponent(previous.id)}.html">Previous: ${escapeHtml(previous.title)}</a></li>`
        : '';
    const nextLink = next
        ? `<li><a href="${encodeURIComponent(next.id)}.html">Next: ${escapeHtml(next.title)}</a></li>`
        : '';
    const relatedLinks = related.map((item) => `<li><a href="${encodeURIComponent(item.id)}.html">${escapeHtml(item.title)}</a></li>`).join('');

    const appLink = `../index.html?route=${encodeURIComponent(route)}&module=${encodeURIComponent(module.id)}`;
    const trackPage = `${route.replace(/^\//, '')}.html`;
    return `<!DOCTYPE html>
<html lang="en">
${headTemplate({
    title: `${module.title} Module | CS Course Atlas`,
    description: module.description,
    canonicalPath: `/modules/${module.id}.html`
})}
<body>
    <div class="shell">
        <nav class="top-nav" aria-label="Module page navigation">
            <a href="../index.html">Interactive App</a>
            <a href="../${trackPage}">${escapeHtml(categoryLabel)} Track Page</a>
            <a href="index.html">Module Directory</a>
            <a href="../sitemap.xml">Sitemap</a>
        </nav>
        <header class="hero">
            <h1>${escapeHtml(module.title)}</h1>
            <p class="meta">${escapeHtml(module.description)}</p>
            <div class="cta-row">
                <a class="cta" href="${appLink}">Open This Module in Interactive App</a>
                <a class="cta" href="../${trackPage}">View ${escapeHtml(categoryLabel)} Track Landing Page</a>
            </div>
        </header>
        <section class="panel">
            <h2>Module Details</h2>
            <p><strong>Track:</strong> ${escapeHtml(categoryLabel)}</p>
            <p><strong>Difficulty:</strong> ${escapeHtml(module.difficulty)}</p>
        </section>
        <section class="panel">
            <h2>Continue Learning</h2>
            <ul>
                ${prevLink}
                ${nextLink}
            </ul>
        </section>
        <section class="panel">
            <h2>Related ${escapeHtml(categoryLabel)} Modules</h2>
            <ul>${relatedLinks || '<li>No related modules found.</li>'}</ul>
        </section>
        <footer class="footer">
            <p>This crawlable module page is paired with an interactive in-app version.</p>
        </footer>
    </div>
</body>
</html>`;
}

function generateSitemap(routePages, modules) {
    const today = new Date().toISOString().slice(0, 10);
    const paths = new Set([
        '/',
        '/index.html',
        ...routePages.map((item) => `/${item.filename}`),
        '/privacy-policy.html',
        '/terms-of-use.html',
        '/contact-support.html',
        '/donations-refunds.html',
        '/modules/index.html',
        ...modules.map((item) => `/modules/${item.id}.html`)
    ]);
    const entries = Array.from(paths).sort().map((pathname) => `  <url>
    <loc>${toAbsolute(pathname)}</loc>
    <lastmod>${today}</lastmod>
  </url>`).join('\n');
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;
}

function generateRobots() {
    return `User-agent: *
Allow: /

Sitemap: ${toAbsolute('/sitemap.xml')}
`;
}

function main() {
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
        writeFile(path.join(ROOT, routeConfig.filename), html);
    });

    writeFile(path.join(MODULES_DIR, 'index.html'), moduleIndexHtml(grouped));
    modules.forEach((module) => {
        const html = modulePageHtml(module, modules, indexById);
        writeFile(path.join(MODULES_DIR, `${module.id}.html`), html);
    });

    writeFile(path.join(ROOT, 'sitemap.xml'), generateSitemap(ROUTE_PAGES, modules));
    writeFile(path.join(ROOT, 'robots.txt'), generateRobots());

    console.log(`Generated ${ROUTE_PAGES.length} route pages and ${modules.length} module pages.`);
}

main();
