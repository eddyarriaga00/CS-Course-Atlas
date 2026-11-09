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
const ORDER = ['python', 'cli', 'java', 'discrete', 'git', 'dsa', 'assembly'];
// Courses not written yet, beginner-friendly first. Shown as cards on the Courses page.
const P = (id, icon, level, en, es, blurbEn, blurbEs) => ({ id, icon, level, title: { en, es }, blurb: { en: blurbEn, es: blurbEs } });
const PLANNED = [
  P('cybersecurity', '🛡', 'beginner', 'Cybersecurity Fundamentals', 'Fundamentos de ciberseguridad', 'How attacks work and how to defend: passwords and authentication, phishing, encryption, network security and safe coding.', 'Cómo funcionan los ataques y cómo defenderse: contraseñas y autenticación, phishing, cifrado, seguridad en redes y código seguro.'),
  P('web', '</>', 'beginner', 'Web Basics: HTML, CSS & JavaScript', 'Web básica: HTML, CSS y JavaScript', 'Build and publish real pages: structure with HTML, style with CSS, and make them interactive with JavaScript.', 'Crea y publica páginas reales: estructura con HTML, estilo con CSS e interactividad con JavaScript.'),
  P('sql', 'DB', 'beginner', 'SQL & Databases', 'SQL y bases de datos', 'Store and query data: tables, SELECT and JOIN, keys and relationships, and designing a small database from scratch.', 'Guarda y consulta datos: tablas, SELECT y JOIN, llaves y relaciones, y diseñar una base de datos pequeña desde cero.'),
  P('how-computers-work', '01', 'beginner', 'How Computers Work', 'Cómo funcionan las computadoras', 'Bits and bytes, number systems, memory, the CPU and what happens when a program runs.', 'Bits y bytes, sistemas numéricos, memoria, la CPU y qué pasa cuando se ejecuta un programa.'),
  P('ai', 'AI', 'beginner', 'AI Fundamentals', 'Fundamentos de inteligencia artificial', 'How AI and machine learning actually work: data, models, training and testing, language models, and using AI tools well and safely.', 'Cómo funcionan realmente la IA y el aprendizaje automático: datos, modelos, entrenamiento y prueba, modelos de lenguaje, y usar herramientas de IA bien y con seguridad.'),
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
const out = { tracks, planned: PLANNED, path: PATH, next: NEXT, modules, full, videos };
const file = path.join(ROOT, 'data/atlas-data.json');
const json = JSON.stringify(out);
if (process.argv.includes('--check')) {
  // CI guard: the committed data file must match its sources.
  const current = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
  if (current !== json) { console.error('data/atlas-data.json is out of date. Run: npm run build:data'); process.exit(1); }
  console.log('data/atlas-data.json is up to date');
  process.exit(0);
}
fs.writeFileSync(file, json);
console.log('wrote data/atlas-data.json:', Math.round(fs.statSync(file).size / 1024), 'KB;', Object.keys(modules).length, 'modules,', Object.keys(full).length, 'with full lessons');
