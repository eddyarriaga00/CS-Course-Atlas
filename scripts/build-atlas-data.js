// Builds data/atlas-data.json, the single data file the site loads, from the course sources:
// js/course-curriculum.js, js/course-examples.js, the module
// catalog in data/module-catalog.json and the vetted YouTube links in data/course-videos.json.
// Run: npm run build:data (also part of npm run build:site).
const fs = require('fs'), vm = require('vm'), path = require('path');
const ROOT = path.resolve(__dirname, '..');
const load = (f, key) => { const sb = { window: {} }; vm.runInNewContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), sb); return sb.window[key]; };
const cur = load('js/course-curriculum.js', 'COURSE_CURRICULUM');
const ex = load('js/course-examples.js', 'COURSE_EXAMPLES').modules;
const { modules: catalog, PUBLISHED_TRACKS } = require('./lib/catalog').loadCatalog();
const byId = Object.fromEntries(catalog.map((m) => [m.id, m]));

const TRACK_META = {
  python: { title: { en: 'Intro to Programming with Python', es: 'Introducción a la programación con Python' }, icon: 'Py', level: 'beginner',
    blurb: { en: 'A true first course: print, variables, decisions, loops, functions, lists and dictionaries, all in runnable Python.', es: 'Un verdadero primer curso: print, variables, decisiones, ciclos, funciones, listas y diccionarios, todo en Python ejecutable.' } },
  cli: { title: { en: 'Command Line & Linux', es: 'Línea de comandos y Linux' }, icon: '$_', level: 'beginner',
    blurb: { en: 'Move around the file system, search and combine text with pipes, handle permissions and PATH, and automate with shell scripts.', es: 'Muévete por el sistema de archivos, busca y combina texto con tuberías, maneja permisos y PATH, y automatiza con scripts de shell.' } },
  web: { title: { en: 'Web Basics: HTML, CSS & JavaScript', es: 'Web básica: HTML, CSS y JavaScript' }, icon: '</>', level: 'beginner',
    blurb: { en: 'Build real pages and see them live: structure with HTML, style with CSS, interactivity with JavaScript, then publish your site.', es: 'Construye páginas reales y míralas en vivo: estructura con HTML, estilo con CSS, interactividad con JavaScript y luego publica tu sitio.' } },
  sql: { title: { en: 'SQL & Databases', es: 'SQL y bases de datos' }, icon: 'DB', level: 'beginner',
    blurb: { en: 'Store and query data with real SQLite: SELECT and WHERE, grouping and totals, joins across tables, and designing a database that keeps data correct.', es: 'Guarda y consulta datos con SQLite real: SELECT y WHERE, agrupar y totalizar, joins entre tablas y diseñar una base de datos que mantenga los datos correctos.' } },
  'how-computers-work': { title: { en: 'How Computers Work', es: 'Cómo funcionan las computadoras' }, icon: '01', level: 'beginner',
    blurb: { en: 'Bits and bytes, how text, images and sound become numbers, logic gates up to a working CPU, and what the OS and the internet do with your code.', es: 'Bits y bytes, cómo el texto, las imágenes y el sonido se vuelven números, de las compuertas lógicas a una CPU y qué hacen el SO e internet con tu código.' } },
  cybersecurity: { title: { en: 'Cybersecurity Fundamentals', es: 'Fundamentos de ciberseguridad' }, icon: '🛡', level: 'beginner',
    blurb: { en: 'Passwords and two-factor login, encryption from Caesar to HTTPS, how phishing, SQL injection and XSS work, and the habits that stop them.', es: 'Contraseñas e inicio de sesión en dos pasos, cifrado de César a HTTPS, cómo funcionan el phishing, la inyección SQL y el XSS, y los hábitos que los detienen.' } },
  ai: { title: { en: 'AI Fundamentals', es: 'Fundamentos de inteligencia artificial' }, icon: 'AI', level: 'beginner',
    blurb: { en: 'What AI really is, models you build in plain Python, a neural network trained from scratch, and how language models work and how to use them well.', es: 'Qué es realmente la IA, modelos que construyes en Python puro, una red neuronal entrenada desde cero, y cómo funcionan los modelos de lenguaje y cómo usarlos bien.' } },
  java: { title: { en: 'Java', es: 'Java' }, icon: 'J', level: 'beginner',
    blurb: { en: 'From variables and objects to collections, streams, testing, JDBC and the JVM.', es: 'De variables y objetos a colecciones, streams, pruebas, JDBC y la JVM.' } },
  dsa: { title: { en: 'Data Structures & Algorithms', es: 'Estructuras de datos y algoritmos' }, icon: 'A', level: 'intermediate',
    blurb: { en: 'Arrays to graphs, sorting to dynamic programming, with complexity analysis throughout.', es: 'De arreglos a grafos, de ordenamiento a programación dinámica, con análisis de complejidad.' } },
  discrete: { title: { en: 'Discrete Math', es: 'Matemáticas discretas' }, icon: '∑', level: 'beginner',
    blurb: { en: 'Logic and proofs, sets and relations, counting, probability and graph theory.', es: 'Lógica y demostraciones, conjuntos y relaciones, conteo, probabilidad y teoría de grafos.' } },
  git: { title: { en: 'Git', es: 'Git' }, icon: 'G', level: 'beginner',
    blurb: { en: 'How Git really stores your work, and the branching workflow teams use every day.', es: 'Cómo Git guarda realmente tu trabajo y el flujo de ramas que los equipos usan a diario.' } },
  assembly: { title: { en: 'x86-64 Assembly', es: 'Ensamblador x86-64' }, icon: '⚙', level: 'intermediate',
    blurb: { en: 'Registers, memory, calls and the stack: what your high-level code turns into.', es: 'Registros, memoria, llamadas y la pila: en qué se convierte tu código de alto nivel.' } }
};
const ORDER = ['python', 'cli', 'web', 'sql', 'how-computers-work', 'cybersecurity', 'ai', 'java', 'discrete', 'git', 'dsa', 'assembly'];
// Courses not written yet, beginner-friendly first. Shown as cards on the Courses page.
const P = (id, icon, level, en, es, blurbEn, blurbEs) => ({ id, icon, level, title: { en, es }, blurb: { en: blurbEn, es: blurbEs } });
const PLANNED = [
  P('networks', '⇄', 'intermediate', 'Computer Networks', 'Redes de computadoras', 'From packets to the web: IP, TCP and UDP, DNS, HTTP and what happens when you open a website.', 'De los paquetes a la web: IP, TCP y UDP, DNS, HTTP y qué pasa cuando abres un sitio web.'),
  P('os', 'OS', 'intermediate', 'Operating Systems', 'Sistemas operativos', 'Processes and threads, scheduling, memory management, file systems and concurrency.', 'Procesos e hilos, planificación, gestión de memoria, sistemas de archivos y concurrencia.'),
  P('cpp', 'C+', 'intermediate', 'C++', 'C++', 'Pointers, memory, classes and the standard library, for performance-minded programming.', 'Punteros, memoria, clases y la biblioteca estándar, para programar pensando en el rendimiento.'),
  P('architecture', '▣', 'intermediate', 'Computer Architecture', 'Arquitectura de computadoras', 'Logic gates to pipelines: how hardware executes instructions and why caches matter.', 'De las compuertas lógicas al pipeline: cómo el hardware ejecuta instrucciones y por qué importan las cachés.'),
  P('statistics', 'σ', 'intermediate', 'Statistics for CS', 'Estadística para computación', 'Distributions, sampling, testing and the statistics behind experiments and machine learning.', 'Distribuciones, muestreo, pruebas y la estadística detrás de los experimentos y el aprendizaje automático.'),
  P('theory', 'λ', 'advanced', 'Theory of Computation', 'Teoría de la computación', 'Automata, grammars, Turing machines and the limits of what computers can solve.', 'Autómatas, gramáticas, máquinas de Turing y los límites de lo que las computadoras pueden resolver.')
];

// The recommended order for someone starting from zero. Each step is a course id
// (a live track or a planned course) and the reason it comes at that point.
const S = (id, en, es) => ({ id, why: { en, es } });
const PATH = [
  S('python', 'Your first programming language: learn to think in small, clear steps.', 'Tu primer lenguaje de programación: aprende a pensar en pasos pequeños y claros.'),
  S('cli', 'The terminal every other course uses: files, folders, commands and scripts.', 'La terminal que usan todos los demás cursos: archivos, carpetas, comandos y scripts.'),
  S('git', 'Save every version of your work and share it, like every software team does.', 'Guarda cada versión de tu trabajo y compártela, como hace todo equipo de software.'),
  S('web', 'Turn code into something people can open: pages with HTML, CSS and JavaScript.', 'Convierte código en algo que la gente puede abrir: páginas con HTML, CSS y JavaScript.'),
  S('sql', 'Almost every app stores data. Learn to save it and ask it questions.', 'Casi toda app guarda datos. Aprende a guardarlos y a hacerles preguntas.'),
  S('how-computers-work', 'What is really going on underneath: bits, memory and the CPU.', 'Lo que pasa realmente por debajo: bits, memoria y la CPU.'),
  S('cybersecurity', 'Keep yourself and the things you build safe.', 'Mantén seguros a ti y a lo que construyes.'),
  S('ai', 'Understand the AI tools you use every day, and build a tiny model yourself.', 'Entiende las herramientas de IA que usas cada día y construye tú mismo un modelo pequeño.'),
  S('discrete', 'The math of computer science: logic, counting and graphs, ready for algorithms.', 'Las matemáticas de la computación: lógica, conteo y grafos, listas para algoritmos.')
];
// After the beginner path: the courses that build on it, in order.
const NEXT = ['java', 'dsa', 'networks', 'os', 'cpp', 'assembly', 'architecture', 'statistics', 'theory'];
const known = new Set([...ORDER, ...PLANNED.map((p) => p.id)]);
for (const id of [...PATH.map((s) => s.id), ...NEXT]) if (!known.has(id)) throw new Error(`path step ${id} is not a course`);

// A track is "available" (fully written, shown with lessons) when it is listed in publishedTracks.
const tracks = ORDER.map((id) => ({ id, ...TRACK_META[id], status: PUBLISHED_TRACKS.includes(id) ? 'available' : 'soon', units: cur.tracks[id].map((u) => ({ id: u.id, title: u.title, modules: u.modules })) }));
const modules = {};
for (const t of tracks) for (const u of t.units) for (const id of u.modules) {
  const m = byId[id];
  modules[id] = { track: t.id, title: { en: m.title, es: m.es.title }, description: { en: m.description, es: m.es.description },
    difficulty: m.difficulty, topics: m.topics, minutes: cur.modules[id]?.minutes || null };
}
// Full lesson content for every module of an available track.
const full = {};
for (const id of tracks.filter((t) => t.status === 'available').flatMap((t) => t.units.flatMap((u) => u.modules))) {
  const c = cur.modules[id], e = ex[id];
  const strip = (x) => ({ code: x.code, output: x.output });
  full[id] = {
    prerequisites: c.prerequisites, whyItMatters: c.whyItMatters, objectives: c.objectives, skillsNeeded: c.skillsNeeded,
    keyTakeaways: c.keyTakeaways, pitfalls: c.pitfalls, practice: c.practice, selfCheck: c.selfCheck,
    definitions: c.definitions, resources: c.resources, quiz: c.quiz,
    examples: { main: strip(e.main), sets: e.sets.map((s) => ({ topic: s.topic, title: s.title, description: s.description, explanation: s.explanation, ...strip(s) })) }
  };
}
const videos = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/course-videos.json'), 'utf8'));
// Auto-graded challenges (verified by scripts/verify_challenges.js) ride along with their module's lessons.
const challenges = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/challenges.json'), 'utf8'));
for (const [id, list] of Object.entries(challenges)) if (full[id]) full[id].challenges = list;
const harness = fs.readFileSync(path.join(ROOT, 'scripts/lib/challenge_harness.py'), 'utf8');
const webChecks = fs.readFileSync(path.join(ROOT, 'scripts/lib/web_checks.js'), 'utf8');
// Java challenge tests and the loop guard, shared with scripts/verify_challenges.js.
const javaTools = fs.readFileSync(path.join(ROOT, 'scripts/lib/java_tools.js'), 'utf8');
// Guided projects: the small index (titles, course, step count) rides in atlas-data.json; the steps load on demand
// from data/projects.json, cache-busted by its hash.
const projectsFile = fs.readFileSync(path.join(ROOT, 'data/projects.json'), 'utf8');
const projectsSrc = JSON.parse(projectsFile).projects || [];
for (const pr of projectsSrc) if (!TRACK_META[pr.track]) throw new Error(`project ${pr.id}: unknown course ${pr.track}`);
const projects = projectsSrc.map((pr) => ({ id: pr.id, track: pr.track, icon: pr.icon, level: pr.level, minutes: pr.minutes, title: pr.title, blurb: pr.blurb, steps: pr.steps.length, lang: pr.steps[0].lang || 'python' }));
const projectsVersion = require('crypto').createHash('sha1').update(projectsFile).digest('hex').slice(0, 10);
// Courses being written carry their final outline so their page can show the syllabus.
const outlines = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/course-outlines.json'), 'utf8'));
for (const p of PLANNED) if (outlines[p.id]) p.outline = outlines[p.id];
// The site loads a small index first (data/atlas-data.json) and each course's full lessons
// on demand (data/lessons/<track>.json), so the first page needs a fraction of the data.
const crypto = require('crypto');
const lessonFiles = {};
for (const t of tracks.filter((x) => x.status === 'available')) {
  const part = {};
  for (const id of t.units.flatMap((u) => u.modules)) {
    part[id] = full[id];
    // Each module also gets its own small file, so a module page downloads only that module.
    const one = JSON.stringify(full[id]);
    lessonFiles['m-' + id] = one;
    modules[id].lessons = crypto.createHash('sha1').update(one).digest('hex').slice(0, 10);
    modules[id].counts = { examples: full[id].examples.sets.length + 1, terms: (full[id].definitions || []).length, quiz: (full[id].quiz || []).length, challenges: (full[id].challenges || []).length };
  }
  const json = JSON.stringify(part);
  lessonFiles[t.id] = json;
  t.lessons = crypto.createHash('sha1').update(json).digest('hex').slice(0, 10);   // cache-busting version
}
// The command-line simulator is a separate file loaded on demand; its hash busts caches when it changes.
const shellVersion = require('crypto').createHash('sha1').update(fs.readFileSync(path.join(ROOT, 'js/mini-shell.js'))).digest('hex').slice(0, 10);
// A compact search list (term names and challenge titles of live courses) so search works without downloading every lesson.
const search = { terms: [], challenges: [] };
for (const t of tracks.filter((x) => x.status === 'available')) for (const id of t.units.flatMap((u) => u.modules)) {
  (full[id].definitions || []).forEach((d) => search.terms.push([id, d.term.en, d.term.es]));
  (full[id].challenges || []).forEach((c, i) => search.challenges.push([id, i, c.title.en, c.title.es]));
}
const searchJson = JSON.stringify(search);
// The glossary needs only the terms, not whole lessons: one small file with every live module's definitions.
const glossary = {};
for (const t of tracks.filter((x) => x.status === 'available')) for (const id of t.units.flatMap((u) => u.modules)) glossary[id] = full[id].definitions || [];
const glossaryJson = JSON.stringify(glossary);
const glossaryVersion = crypto.createHash('sha1').update(glossaryJson).digest('hex').slice(0, 10);
const searchVersion = crypto.createHash('sha1').update(searchJson).digest('hex').slice(0, 10);
const out = { tracks, planned: PLANNED, path: PATH, next: NEXT, modules, videos, harness, webChecks, javaTools, projects, projectsVersion, shellVersion, searchVersion, glossaryVersion };
const file = path.join(ROOT, 'data/atlas-data.json');
const lessonDir = path.join(ROOT, 'data/lessons');
const json = JSON.stringify(out);
const expected = { [file]: json, [path.join(ROOT, 'data/search.json')]: searchJson, [path.join(ROOT, 'data/glossary.json')]: glossaryJson, ...Object.fromEntries(Object.entries(lessonFiles).map(([id, body]) => [path.join(lessonDir, id + '.json'), body])) };
if (process.argv.includes('--check')) {
  // CI guard: the committed data files must match their sources.
  const stale = Object.entries(expected).filter(([f, body]) => !fs.existsSync(f) || fs.readFileSync(f, 'utf8') !== body).map(([f]) => path.relative(ROOT, f));
  const extra = fs.existsSync(lessonDir) ? fs.readdirSync(lessonDir).map((f) => path.join(lessonDir, f)).filter((f) => !(f in expected)).map((f) => path.relative(ROOT, f)) : [];
  if (stale.length || extra.length) { console.error('Course data is out of date (' + [...stale, ...extra].join(', ') + '). Run: npm run build:data'); process.exit(1); }
  console.log('data/atlas-data.json and data/lessons/ are up to date');
  process.exit(0);
}
fs.mkdirSync(lessonDir, { recursive: true });
for (const f of fs.readdirSync(lessonDir)) if (!(path.join(lessonDir, f) in expected)) fs.unlinkSync(path.join(lessonDir, f));
for (const [f, body] of Object.entries(expected)) fs.writeFileSync(f, body);
console.log('wrote data/atlas-data.json:', Math.round(json.length / 1024), 'KB index;', Object.keys(lessonFiles).length, 'lesson files (courses and single modules),',
  Math.round(Object.values(lessonFiles).reduce((n, b) => n + b.length, 0) / 1024), 'KB;', Object.keys(modules).length, 'modules,', Object.keys(full).length, 'with full lessons');
