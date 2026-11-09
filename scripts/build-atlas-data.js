// Builds data/atlas-data.json, the single data file the site loads, from the course sources:
// js/course-curriculum.js, js/course-examples.js, the module
// catalog in data/module-catalog.json and the vetted YouTube links in data/course-videos.json.
// Run: npm run build:data (also part of npm run build:site).
const fs = require('fs'), vm = require('vm'), path = require('path');
const ROOT = path.resolve(__dirname, '..');
const load = (f, key) => { const sb = { window: {} }; vm.runInNewContext(fs.readFileSync(path.join(ROOT, f), 'utf8'), sb); return sb.window[key]; };
const cur = load('js/course-curriculum.js', 'COURSE_CURRICULUM');
const ex = load('js/course-examples.js', 'COURSE_EXAMPLES').modules;
const catalog = require('./lib/catalog').loadCatalog().modules;
const byId = Object.fromEntries(catalog.map((m) => [m.id, m]));

const TRACK_META = {
  java: { title: { en: 'Java', es: 'Java' }, status: 'available', icon: 'J',
    blurb: { en: 'From variables and objects to collections, streams, testing, JDBC and the JVM.', es: 'De variables y objetos a colecciones, streams, pruebas, JDBC y la JVM.' } },
  dsa: { title: { en: 'Data Structures & Algorithms', es: 'Estructuras de datos y algoritmos' }, status: 'soon', icon: 'A',
    blurb: { en: 'Arrays to graphs, sorting to dynamic programming, with complexity analysis throughout.', es: 'De arreglos a grafos, de ordenamiento a programación dinámica, con análisis de complejidad.' } },
  discrete: { title: { en: 'Discrete Math', es: 'Matemáticas discretas' }, status: 'soon', icon: '∑',
    blurb: { en: 'Logic and proofs, sets and relations, counting, probability and graph theory.', es: 'Lógica y demostraciones, conjuntos y relaciones, conteo, probabilidad y teoría de grafos.' } },
  git: { title: { en: 'Git', es: 'Git' }, status: 'soon', icon: 'G',
    blurb: { en: 'How Git really stores your work, and the branching workflow teams use every day.', es: 'Cómo Git guarda realmente tu trabajo y el flujo de ramas que los equipos usan a diario.' } },
  assembly: { title: { en: 'x86-64 Assembly', es: 'Ensamblador x86-64' }, status: 'soon', icon: '⚙',
    blurb: { en: 'Registers, memory, calls and the stack: what your high-level code turns into.', es: 'Registros, memoria, llamadas y la pila: en qué se convierte tu código de alto nivel.' } }
};
const ORDER = ['java', 'dsa', 'discrete', 'git', 'assembly'];
const PLANNED = [
  ['Theory of Computation', 'Teoría de la computación'], ['C++', 'C++'], ['Operating Systems', 'Sistemas operativos'],
  ['Computer Networks', 'Redes de computadoras'], ['Computer Architecture', 'Arquitectura de computadoras'], ['Statistics for CS', 'Estadística para computación']
].map(([en, esT]) => ({ en, es: esT }));

const tracks = ORDER.map((id) => ({ id, ...TRACK_META[id], units: cur.tracks[id].map((u) => ({ id: u.id, title: u.title, modules: u.modules })) }));
const modules = {};
for (const t of tracks) for (const u of t.units) for (const id of u.modules) {
  const m = byId[id];
  modules[id] = { track: t.id, title: { en: m.title, es: m.es.title }, description: { en: m.description, es: m.es.description },
    difficulty: m.difficulty, topics: m.topics, minutes: cur.modules[id]?.minutes || null };
}
const java = {};
for (const id of tracks[0].units.flatMap((u) => u.modules)) {
  const c = cur.modules[id], e = ex[id];
  const strip = (x) => ({ code: x.code, output: x.output });
  java[id] = {
    prerequisites: c.prerequisites, whyItMatters: c.whyItMatters, objectives: c.objectives, skillsNeeded: c.skillsNeeded,
    keyTakeaways: c.keyTakeaways, pitfalls: c.pitfalls, practice: c.practice, selfCheck: c.selfCheck,
    definitions: c.definitions, resources: c.resources, quiz: c.quiz,
    examples: { main: strip(e.main), sets: e.sets.map((s) => ({ topic: s.topic, title: s.title, description: s.description, explanation: s.explanation, ...strip(s) })) }
  };
}
const videos = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/course-videos.json'), 'utf8'));
const out = { tracks, planned: PLANNED, modules, java, videos };
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
console.log('wrote data/atlas-data.json:', Math.round(fs.statSync(file).size / 1024), 'KB;', Object.keys(modules).length, 'modules,', Object.keys(java).length, 'full Java modules');
