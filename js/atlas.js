const UI = {
  en: {
    signIn: 'Sign in', search: 'Search courses, modules, terms', home: 'Home', courses: 'Courses', allCourses: 'All courses', practice: 'Practice', account: 'Account', profile: 'Profile',
    flashcards: 'Flashcards', quizzes: 'Quizzes', playground: 'Playground', notes: 'Notes', support: 'Support', more: 'More', otherCourses: 'Other courses',
    soon: 'Soon', comingSoon: 'Coming soon', available: 'Available', modules: 'modules', moduleLower: 'module', units: 'units', unitsTitle: 'Units', unit: 'Unit', hours: 'hours', min: 'min', module: 'Module', term: 'Term',
    heroTitle: 'Computer science, one clear course at a time.',
    heroLead: 'Two courses are ready: Java, with lessons and real code in four languages, and Git, taught through real terminal sessions. Each has practice, quizzes and videos. DSA, Discrete Math and Assembly are on the way.',
    startJava: 'Start the Java course', browse: 'Browse courses', continueTitle: 'Continue where you left off', continueBtn: 'Continue', startBtn: 'Start',
    ofModules: (a, b) => `${a} of ${b} modules complete`, courseDone: 'Course complete. Nice work.',
    coursesTitle: 'Courses', coursesLead: 'Each course is a sequence of units and modules. Java and Git are fully available; the others are being written now.',
    plannedTitle: 'Planned after that', javaTrack: 'Java course', studyTools: 'Study tools',
    toolFlash: 'Spaced review of the key terms.', toolQuiz: 'Check yourself after each module.', toolPlay: 'Run Java, C++, Python and JS.', toolNotes: 'Your notes, saved per module.',
    notifyMe: 'Notify me when it opens', notified: 'Saved: it will show up here when it opens',
    soonNotice: 'This course is being written. The outline below is final; lessons, examples and quizzes are not published yet.',
    totalTime: 'total', difficulty: { beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' },
    topics: 'topics', examples4: 'Examples in 4 languages', overview: 'Overview', examples: 'Examples', terms: 'Terms', quiz: 'Quiz',
    why: 'Why it matters', objectives: 'By the end you can', before: 'Before you start', pitfalls: 'Common mistakes', takeaways: 'Key takeaways', resources: 'Further reading',
    prereq: 'Builds on', seeExamples: 'See the examples →', fullProgram: 'Full program', output: 'Output', copy: 'Copy', copied: 'Copied', explanation: 'What’s happening',
    practiceProblems: 'Practice problems', selfCheck: 'Check yourself', selfCheckHint: 'Answer out loud first, then check the lesson and examples.',
    markDone: 'Mark module complete', marked: 'Completed ✓', unmarked: 'Marked as not complete', prev: '← Previous', next: 'Next →',
    question: (a, b) => `Question ${a} of ${b}`, correct: 'Correct.', notQuite: 'Not quite.', nextQ: 'Next question', finish: 'See score', retry: 'Try again',
    scoreText: (a, b) => `${a} of ${b} correct`, again: 'Again', gotIt: 'Got it', tapFlip: 'Tap to see the definition', cardOf: (a, b) => `Card ${a} of ${b}`,
    practiceLead: 'Check what stuck. Quizzes give instant feedback; flashcards drill the terms from each module.', pickModule: 'Module',
    editProfile: 'Edit profile', signOut: 'Sign out', modulesComplete: 'Modules complete', streak: 'Study streak', days: 'days', quizAvg: 'Quiz average', across: 'across 4 quizzes',
    timeStudied: 'Time studied', thisMonth: 'this month', yourCourses: 'Your courses', progressUnit: (c) => `${c} progress by unit`, recent: 'Recent activity', prefs: 'Preferences',
    language: 'Language', languageSub: 'Lessons, quizzes and menus', theme: 'Theme', themeSub: 'Follows your device by default', system: 'System', light: 'Light', dark: 'Dark',
    exLang: 'Example language', exLangSub: 'Shown first in every code example', goal: 'Daily goal', goalSub: 'Used for your streak',
    comments: 'Show code comments', commentsSub: 'Inline explanations in examples', weekly: 'Weekly progress email', weeklySub: 'A short summary every Monday',
    methods: 'Sign-in methods', emailPw: 'Email and password', emailPwSub: 'Add a password to sign in without Google', setUp: 'Set up', connected: 'Connected',
    deleteTitle: 'Delete account', deleteText: 'Permanently removes your profile, progress and notes. This can’t be undone.', deleteBtn: 'Delete my account',
    signinTitle: 'Sign in', signinSub: 'Save your progress and pick up on any device.', google: 'Continue with Google', orEmail: 'or use email', email: 'Email', password: 'Password',
    forgot: 'Forgot password?', newHere: 'New here?', create: 'Create an account', legal: 'By continuing you agree to the <a href="terms-of-use.html">Terms of Use</a> and <a href="privacy-policy.html">Privacy Policy</a>.',
    noResults: 'No matches', today: 'Today', yesterday: 'Yesterday', daysAgo: (n) => `${n} days ago`, completed: 'Completed', reviewed: 'Reviewed 12 flashcards', notFound: 'That page doesn’t exist.',
    glossary: 'Glossary', roadmap: 'Roadmap', whatsComing: 'What’s coming', tryIt: 'Try it ▸', run: 'Run ▸', reset: 'Reset', running: 'Running…',
    pgLead: 'Write and run code right here. JavaScript runs in your browser; Java, Python and C++ will run on the CS Course Atlas server.',
    pgServer: 'Running this language needs the code server, which is on the roadmap. Here is the output this example prints:', pgServerNoExpected: 'Running this language needs the code server, which is on the roadmap. Switch to JavaScript to run code now.',
    pgDone: (ms) => `Finished in ${ms} ms`, pgTimeout: 'Stopped after 3 seconds (infinite loop?)', pgEmpty: '(no output)', pgLoaded: (m) => `Loaded from ${m}`,
    notesLeadIn: 'One page of notes per module, saved to your account and synced to every device you sign in on.', notesLead: 'One page of notes per module, saved on this device. With an account they sync everywhere.', notePlaceholder: 'What clicked? What confused you? Write it in your own words.',
    savedDevice: 'Saved on this device', notesFor: 'Notes for', words: 'words',
    glossaryLead: (n) => `${n} terms from the published courses, each linked to the module that teaches it.`, filterTerms: 'Filter terms', all: 'All', fromModule: (m) => `From ${m} →`,
    roadmapLead: 'Where CS Course Atlas is going. Vote for what you want next.', live: 'Live', building: 'In progress', planned: 'Planned', vote: '▲ Vote', voted: '▲ Voted',
    achievements: 'Achievements', earned: (a, b) => `${a} of ${b} earned`,
    studyPlan: 'Study plan', planLead: 'Pick a course and how much time you have; we lay out the rest of it week by week.', hoursWeek: 'Hours per week', startOn: 'Start on', finishBy: 'Finish by', weeksLeft: 'weeks', modulesLeft: 'modules left', weekN: (n) => `Week ${n}`, thisWeek: 'This week', planHome: (d, c) => `At your pace you’ll finish ${c} by <b>${d}</b>.`, editPlan: 'Edit plan', allDone: 'Every module of this course is complete. Time for the next one.', addCalendar: 'Add to calendar', reminders: 'Weekly reminder', 
    videos: 'Videos', fullSeries: 'Full video series', courseSeries: 'Full course series', watchTopic: 'Watch a video on this topic', watchWait: 'Watch while you wait', videosLead: 'A full series for the module, then one video per topic. All from university or well-known teaching channels; they open on YouTube.', videoCount: (n) => `${n} videos`, onYoutube: 'YouTube', fullSession: 'Full session', week1: 'week', coursesReady: 'courses ready', course: 'Course', trackCourse: (c) => `${c} course`, terminalExamples: 'Real terminal sessions', terminalHint: 'Run this in an empty folder. Lines starting with $ are what you type; the rest is what Git printed when we ran the session with real Git. Copy gives you just the commands.', terminalOut: 'Terminal', report: 'Report a problem with this module', programs: 'programs', languagesWord: 'languages', waitLead: 'Series that cover these modules, each listed once.',
    signedInWith: (p) => `Signed in with ${p}`, syncedAt: (tm) => `Progress synced at ${tm}`, syncPending: 'Syncing progress…', day: 'day', acrossN: (n) => `across ${n} ${n === 1 ? 'quiz' : 'quizzes'}`, noQuizYet: 'No quizzes taken yet',
    modulesWithNotes: 'modules with notes', noActivity: 'Complete a module, take a quiz or write a note and it shows up here.', typeDelete: 'Type DELETE to confirm', deleteViaSupport: 'Ask support to delete it',
    privacy: 'Privacy', terms: 'Terms', contact: 'Contact', checkingSession: 'Checking your account…', emailOrUser: 'Email or username', username: 'Username', confirmPw: 'Confirm password',
    haveAccount: 'Have an account?', pwMismatch: 'The passwords don’t match.', working: 'One moment…', signinFailed: 'Sign-in didn’t complete. Please try again.', welcome: (n) => (n ? `Signed in as ${n}` : 'Signed in'),
    serverSlow: 'The server is waking up. Try again in a few seconds.', signedOut: 'Signed out', accountDeleted: 'Your account was deleted', savedAccount: 'Saved to your account'
  },
  es: {
    signIn: 'Iniciar sesión', search: 'Busca cursos, módulos, términos', home: 'Inicio', courses: 'Cursos', allCourses: 'Todos los cursos', practice: 'Práctica', account: 'Cuenta', profile: 'Perfil',
    flashcards: 'Tarjetas', quizzes: 'Cuestionarios', playground: 'Editor', notes: 'Notas', support: 'Soporte', more: 'Más', otherCourses: 'Otros cursos',
    soon: 'Pronto', comingSoon: 'Próximamente', available: 'Disponible', modules: 'módulos', moduleLower: 'módulo', units: 'unidades', unitsTitle: 'Unidades', unit: 'Unidad', hours: 'horas', min: 'min', module: 'Módulo', term: 'Término',
    heroTitle: 'Ciencias de la computación, un curso claro a la vez.',
    heroLead: 'Ya hay dos cursos listos: Java, con lecciones y código real en cuatro lenguajes, y Git, enseñado con sesiones reales de terminal. Ambos tienen práctica, cuestionarios y videos. Pronto llegan DSA, Matemáticas discretas y Ensamblador.',
    startJava: 'Empezar el curso de Java', browse: 'Ver cursos', continueTitle: 'Continúa donde te quedaste', continueBtn: 'Continuar', startBtn: 'Empezar',
    ofModules: (a, b) => `${a} de ${b} módulos completados`, courseDone: 'Curso completado. ¡Buen trabajo!',
    coursesTitle: 'Cursos', coursesLead: 'Cada curso es una secuencia de unidades y módulos. Java y Git están completos; los demás se están escribiendo.',
    plannedTitle: 'Planeados después', javaTrack: 'Curso de Java', studyTools: 'Herramientas de estudio',
    toolFlash: 'Repaso espaciado de los términos clave.', toolQuiz: 'Ponte a prueba después de cada módulo.', toolPlay: 'Ejecuta Java, C++, Python y JS.', toolNotes: 'Tus notas, guardadas por módulo.',
    notifyMe: 'Avísame cuando abra', notified: 'Guardado: aparecerá aquí cuando abra',
    soonNotice: 'Este curso se está escribiendo. El temario de abajo es definitivo; las lecciones, ejemplos y cuestionarios aún no se publican.',
    totalTime: 'en total', difficulty: { beginner: 'Principiante', intermediate: 'Intermedio', advanced: 'Avanzado' },
    topics: 'temas', examples4: 'Ejemplos en 4 lenguajes', overview: 'Resumen', examples: 'Ejemplos', terms: 'Términos', quiz: 'Cuestionario',
    why: 'Por qué importa', objectives: 'Al terminar podrás', before: 'Antes de empezar', pitfalls: 'Errores comunes', takeaways: 'Ideas clave', resources: 'Lecturas recomendadas',
    prereq: 'Se basa en', seeExamples: 'Ver los ejemplos →', fullProgram: 'Programa completo', output: 'Salida', copy: 'Copiar', copied: 'Copiado', explanation: 'Qué está pasando',
    practiceProblems: 'Ejercicios', selfCheck: 'Ponte a prueba', selfCheckHint: 'Responde primero en voz alta y luego revisa la lección y los ejemplos.',
    markDone: 'Marcar módulo como completado', marked: 'Completado ✓', unmarked: 'Marcado como no completado', prev: '← Anterior', next: 'Siguiente →',
    question: (a, b) => `Pregunta ${a} de ${b}`, correct: 'Correcto.', notQuite: 'No exactamente.', nextQ: 'Siguiente pregunta', finish: 'Ver resultado', retry: 'Intentar de nuevo',
    scoreText: (a, b) => `${a} de ${b} correctas`, again: 'Otra vez', gotIt: 'Lo sé', tapFlip: 'Toca para ver la definición', cardOf: (a, b) => `Tarjeta ${a} de ${b}`,
    practiceLead: 'Comprueba qué aprendiste. Los cuestionarios corrigen al instante; las tarjetas repasan los términos de cada módulo.', pickModule: 'Módulo',
    editProfile: 'Editar perfil', signOut: 'Cerrar sesión', modulesComplete: 'Módulos completados', streak: 'Racha de estudio', days: 'días', quizAvg: 'Promedio en cuestionarios', across: 'en 4 cuestionarios',
    timeStudied: 'Tiempo de estudio', thisMonth: 'este mes', yourCourses: 'Tus cursos', progressUnit: (c) => `Progreso en ${c} por unidad`, recent: 'Actividad reciente', prefs: 'Preferencias',
    language: 'Idioma', languageSub: 'Lecciones, cuestionarios y menús', theme: 'Tema', themeSub: 'Sigue a tu dispositivo por defecto', system: 'Sistema', light: 'Claro', dark: 'Oscuro',
    exLang: 'Lenguaje de los ejemplos', exLangSub: 'Se muestra primero en cada ejemplo', goal: 'Meta diaria', goalSub: 'Se usa para tu racha',
    comments: 'Mostrar comentarios en el código', commentsSub: 'Explicaciones dentro de los ejemplos', weekly: 'Correo semanal de progreso', weeklySub: 'Un resumen breve cada lunes',
    methods: 'Métodos de inicio de sesión', emailPw: 'Correo y contraseña', emailPwSub: 'Agrega una contraseña para entrar sin Google', setUp: 'Configurar', connected: 'Conectado',
    deleteTitle: 'Eliminar cuenta', deleteText: 'Elimina para siempre tu perfil, tu progreso y tus notas. No se puede deshacer.', deleteBtn: 'Eliminar mi cuenta',
    signinTitle: 'Iniciar sesión', signinSub: 'Guarda tu progreso y continúa en cualquier dispositivo.', google: 'Continuar con Google', orEmail: 'o usa tu correo', email: 'Correo', password: 'Contraseña',
    forgot: '¿Olvidaste tu contraseña?', newHere: '¿Eres nuevo?', create: 'Crear una cuenta', legal: 'Al continuar aceptas los <a href="terms-of-use.html">Términos de uso</a> y la <a href="privacy-policy.html">Política de privacidad</a>.',
    noResults: 'Sin resultados', today: 'Hoy', yesterday: 'Ayer', daysAgo: (n) => `Hace ${n} días`, completed: 'Completaste', reviewed: 'Repasaste 12 tarjetas', notFound: 'Esa página no existe.',
    glossary: 'Glosario', roadmap: 'Hoja de ruta', whatsComing: 'Lo que viene', tryIt: 'Probar ▸', run: 'Ejecutar ▸', reset: 'Restablecer', running: 'Ejecutando…',
    pgLead: 'Escribe y ejecuta código aquí mismo. JavaScript corre en tu navegador; Java, Python y C++ correrán en el servidor de CS Course Atlas.',
    pgServer: 'Ejecutar este lenguaje requiere el servidor de código, que está en la hoja de ruta. Esta es la salida que imprime el ejemplo:', pgServerNoExpected: 'Ejecutar este lenguaje requiere el servidor de código, que está en la hoja de ruta. Cambia a JavaScript para ejecutar código ahora.',
    pgDone: (ms) => `Terminó en ${ms} ms`, pgTimeout: 'Detenido después de 3 segundos (¿bucle infinito?)', pgEmpty: '(sin salida)', pgLoaded: (m) => `Cargado desde ${m}`,
    notesLeadIn: 'Una página de notas por módulo, guardada en tu cuenta y sincronizada en cada dispositivo donde inicies sesión.', notesLead: 'Una página de notas por módulo, guardada en este dispositivo. Con una cuenta se sincronizan en todas partes.', notePlaceholder: '¿Qué entendiste? ¿Qué te confundió? Escríbelo con tus palabras.',
    savedDevice: 'Guardado en este dispositivo', notesFor: 'Notas de', words: 'palabras',
    glossaryLead: (n) => `${n} términos de los cursos publicados, cada uno enlazado al módulo que lo enseña.`, filterTerms: 'Filtrar términos', all: 'Todos', fromModule: (m) => `De ${m} →`,
    roadmapLead: 'Hacia dónde va CS Course Atlas. Vota por lo que quieres primero.', live: 'Disponible', building: 'En progreso', planned: 'Planeado', vote: '▲ Votar', voted: '▲ Votado',
    achievements: 'Logros', earned: (a, b) => `${a} de ${b} obtenidos`,
    studyPlan: 'Plan de estudio', planLead: 'Elige un curso y cuánto tiempo tienes; organizamos el resto semana a semana.', hoursWeek: 'Horas por semana', startOn: 'Empezar el', finishBy: 'Terminas el', weeksLeft: 'semanas', modulesLeft: 'módulos restantes', weekN: (n) => `Semana ${n}`, thisWeek: 'Esta semana', planHome: (d, c) => `A tu ritmo terminarás ${c} el <b>${d}</b>.`, editPlan: 'Editar plan', allDone: 'Completaste todos los módulos de este curso. Es hora del siguiente.', addCalendar: 'Agregar al calendario', reminders: 'Recordatorio semanal', 
    videos: 'Videos', fullSeries: 'Serie completa de videos', courseSeries: 'Serie completa del curso', watchTopic: 'Mira un video sobre este tema', watchWait: 'Mira mientras esperas', videosLead: 'Una serie completa del módulo y un video por tema. Todos de canales universitarios o de enseñanza reconocidos; se abren en YouTube (en inglés).', videoCount: (n) => `${n} videos`, onYoutube: 'YouTube', fullSession: 'Sesión completa', week1: 'semana', coursesReady: 'cursos listos', course: 'Curso', trackCourse: (c) => `Curso de ${c}`, terminalExamples: 'Sesiones reales de terminal', terminalHint: 'Ejecútalo en una carpeta vacía. Las líneas que empiezan con $ son lo que escribes; el resto es lo que Git imprimió al ejecutar la sesión con Git real. Copiar te da solo los comandos.', terminalOut: 'Terminal', report: 'Reportar un problema con este módulo', programs: 'programas', languagesWord: 'lenguajes', waitLead: 'Series que cubren estos módulos, cada una una sola vez.',
    signedInWith: (p) => `Sesión iniciada con ${p}`, syncedAt: (tm) => `Progreso sincronizado a las ${tm}`, syncPending: 'Sincronizando progreso…', day: 'día', acrossN: (n) => `en ${n} ${n === 1 ? 'cuestionario' : 'cuestionarios'}`, noQuizYet: 'Aún no haces cuestionarios',
    modulesWithNotes: 'módulos con notas', noActivity: 'Completa un módulo, haz un cuestionario o escribe una nota y aparecerá aquí.', typeDelete: 'Escribe DELETE para confirmar', deleteViaSupport: 'Pide a soporte que la elimine',
    privacy: 'Privacidad', terms: 'Términos', contact: 'Contacto', checkingSession: 'Revisando tu cuenta…', emailOrUser: 'Correo o usuario', username: 'Usuario', confirmPw: 'Confirmar contraseña',
    haveAccount: '¿Ya tienes cuenta?', pwMismatch: 'Las contraseñas no coinciden.', working: 'Un momento…', signinFailed: 'No se completó el inicio de sesión. Inténtalo de nuevo.', welcome: (n) => (n ? `Sesión iniciada como ${n}` : 'Sesión iniciada'),
    serverSlow: 'El servidor se está activando. Inténtalo en unos segundos.', signedOut: 'Sesión cerrada', accountDeleted: 'Tu cuenta fue eliminada', savedAccount: 'Guardado en tu cuenta'
  }
};
const store = {
  get(key, fallback) { try { const v = localStorage.getItem('atlas-' + key); return v == null ? fallback : JSON.parse(v); } catch (e) { return fallback; } },
  set(key, value) { try { localStorage.setItem('atlas-' + key, JSON.stringify(value)); } catch (e) { /* storage unavailable: keep in memory */ } }
};
const state = {
  lang: store.get('lang', (navigator.language || '').toLowerCase().startsWith('es') ? 'es' : 'en'), user: null, authReady: false, syncedAt: null, done: new Set(store.get('done', [])),
  codeLang: store.get('codeLang', 'java'), notified: new Set(store.get('notified', [])), tab: 'overview', exIndex: 0, quiz: null, flash: null, practiceModule: null,
  notes: store.get('notes', {}), aces: new Set(store.get('aces', [])), langsSeen: new Set(store.get('langsSeen', ['java'])), votes: new Set(store.get('votes', [])),
  plan: store.get('plan', { hours: 4, start: new Date().toISOString().slice(0, 10) }), quizBest: store.get('quizBest', {}), activity: store.get('activity', []), pg: null, noteModule: null, glossLetter: 'all', glossQuery: ''
};
let DATA = null;
const $ = (s, r = document) => r.querySelector(s);
const t = (k, ...a) => { const v = UI[state.lang][k] ?? UI.en[k]; return typeof v === 'function' ? v(...a) : v; };
const L = (o) => o == null ? '' : typeof o === 'string' ? o : (o[state.lang] ?? o.en ?? '');
const LL = (o) => (o && (o[state.lang] || o.en)) || [];
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const fmt = (s) => esc(s).replace(/`([^`]+)`/g, '<code class="ic">$1</code>');
function rich(text) {
  return String(text || '').split(/\n\n+/).map((block) => {
    let html = '', list = [];
    const flush = () => { if (list.length) { html += '<ul>' + list.map((li) => `<li>${fmt(li)}</li>`).join('') + '</ul>'; list = []; } };
    block.split('\n').forEach((line) => { if (/^\s*-\s+/.test(line)) list.push(line.replace(/^\s*-\s+/, '')); else { flush(); if (line.trim()) html += `<p>${fmt(line)}</p>`; } });
    flush();
    return html;
  }).join('');
}
const LANGS = [['java', 'Java'], ['cpp', 'C++'], ['python', 'Python'], ['javascript', 'JavaScript']];
const track = (id) => DATA.tracks.find((x) => x.id === id);
const trackIds = (tid) => (track(tid) ? track(tid).units.flatMap((u) => u.modules) : []);
const liveTracks = () => DATA.tracks.filter((x) => x.status === 'available');
const liveIds = () => liveTracks().flatMap((x) => trackIds(x.id));
const javaIds = () => trackIds('java');
// The course the learner is working in: the one they opened last, else the first available one.
function currentTrack() { const id = store.get('lastTrack', null); return track(id)?.status === 'available' ? id : liveTracks()[0].id; }
function routeTrack(route) {
  if (route.startsWith('m-')) return DATA.modules[route.slice(2)]?.track || currentTrack();
  if (route.startsWith('course-') && track(route.slice(7))?.status === 'available') return route.slice(7);
  return currentTrack();
}
const LANG_LABEL = { java: 'Java', cpp: 'C++', python: 'Python', javascript: 'JavaScript', assembly: 'Assembly', bash: 'Terminal' };
const exampleLangs = (ex) => Object.keys(LANG_LABEL).filter((k) => ex.code && ex.code[k]);
// Selects lessons/quizzes grouped by course.
const moduleOptions = (selected) => liveTracks().map((tr) => `<optgroup label="${esc(L(tr.title))}">${trackIds(tr.id).map((m) => `<option value="${m}" ${m === selected ? 'selected' : ''}>${esc(moduleTitle(m))}</option>`).join('')}</optgroup>`).join('');
const moduleTitle = (id) => L(DATA.modules[id]?.title) || id;
// Everything that belongs to the learner, in one plain object: saved locally and, when signed in, to the account.
const progressSnapshot = () => ({ done: [...state.done], codeLang: state.codeLang, notified: [...state.notified], notes: state.notes, aces: [...state.aces],
  langsSeen: [...state.langsSeen], votes: [...state.votes], plan: state.plan, quizBest: state.quizBest, activity: state.activity.slice(-200), lang: state.lang });
const save = () => { const snap = progressSnapshot(); Object.entries(snap).forEach(([k, v]) => store.set(k, v)); scheduleSync(); };
function logActivity(kind, id, extra) { state.activity.push({ kind, id, at: Date.now(), ...(extra || {}) }); if (state.activity.length > 200) state.activity.splice(0, state.activity.length - 200); }
function toast(msg) { const el = $('#toast'); el.textContent = msg; el.hidden = false; clearTimeout(toast.timer); toast.timer = setTimeout(() => { el.hidden = true; }, 1800); }
function nextModule(tid = currentTrack()) { return trackIds(tid).find((id) => !state.done.has(id)) || null; }
function trackStats(tr) {
  const ids = tr.units.flatMap((u) => u.modules);
  const minutes = ids.reduce((s, id) => s + (DATA.modules[id]?.minutes || 0), 0);
  return { count: ids.length, units: tr.units.length, hours: Math.round(minutes / 60), done: ids.filter((id) => state.done.has(id)).length };
}
const pct = (a, b) => (b ? Math.round(100 * a / b) : 0);
function dot(id) { return `<span class="dot ${state.done.has(id) ? 'done' : id === nextModule(DATA.modules[id]?.track) ? 'next' : ''}"></span>`; }

/* ---------- Chrome: sidebar, bottom nav, dialog ---------- */
function renderChrome(route) {
  document.documentElement.lang = state.lang;
  document.body.classList.toggle('signed-in', Boolean(state.user));
  const av = $('.avatar.sm'); if (av) av.textContent = state.user ? initials(state.user) : '';
  $('#search-input').placeholder = t('search');
  $('#lang-btn').textContent = state.lang === 'en' ? 'ES' : 'EN';
  $('#lang-btn').setAttribute('aria-label', state.lang === 'en' ? 'Cambiar a español' : 'Switch to English');
  $('#signin-open').textContent = t('signIn');
  const active = routeTrack(route);
  const is = (r) => (route === r ? ' active' : '');
  $('#sidebar').innerHTML = `
    <a class="nav-item${is('home')}" href="#home"><span class="ico">⌂</span>${t('home')}</a>
    <a class="nav-item${is('courses')}" href="#courses"><span class="ico">▦</span>${t('allCourses')}</a>
    <div class="nav-label">${t('yourCourses')}</div>
    ${liveTracks().map((tr) => { const ts = trackStats(tr), open = tr.id === active;
      return `<a class="course-switch${open ? ' open' : ''}" href="#course-${tr.id}"><span class="cmark" data-track="${tr.id}">${esc(tr.icon)}</span><span><b>${esc(L(tr.title))}</b><span>${t('ofModules', ts.done, ts.count)}</span></span></a>`
        + (open ? tr.units.map((u, i) => `<div class="unit-name">${i + 1}. ${esc(L(u.title))}</div>` + u.modules.map((id) =>
          `<a class="mod-link${route === 'm-' + id ? ' active' : ''}" href="#m-${id}">${dot(id)}${esc(moduleTitle(id))}</a>`).join('')).join('') : ''); }).join('')}
    <div class="nav-label">${t('otherCourses')}</div>
    ${DATA.tracks.filter((x) => x.status !== 'available').map((x) => `<a class="nav-item${is('course-' + x.id)}" href="#course-${x.id}"><span class="ico">${esc(x.icon)}</span>${esc(L(x.title))}<span class="tag">${t('soon')}</span></a>`).join('')}
    <div class="nav-label">${t('practice')}</div>
    <a class="nav-item${is('practice')}" href="#practice"><span class="ico">✓</span>${t('quizzes')} · ${t('flashcards')}</a>
    <a class="nav-item${is('playground')}" href="#playground"><span class="ico">›_</span>${t('playground')}</a>
    <a class="nav-item${is('plan')}" href="#plan"><span class="ico">▤</span>${t('studyPlan')}</a>
    <a class="nav-item${is('notes')}" href="#notes"><span class="ico">✎</span>${t('notes')}</a>
    <a class="nav-item${is('glossary')}" href="#glossary"><span class="ico">Aa</span>${t('glossary')}</a>
    <div class="nav-label">${t('account')}</div>
    <a class="nav-item${is('profile')}" href="#profile"><span class="ico">◯</span>${t('profile')}</a>
    <a class="nav-item${is('roadmap')}" href="#roadmap"><span class="ico">↗</span>${t('whatsComing')}</a>
    <a class="nav-item" href="contact-support.html"><span class="ico">?</span>${t('support')}</a>
    <div class="side-foot"><a href="privacy-policy.html">${t('privacy')}</a><a href="terms-of-use.html">${t('terms')}</a><a href="contact-support.html">${t('contact')}</a></div>`;
  const tab = (href, ico, label, on) => `<a href="#${href}" class="${on ? 'active' : ''}"><span class="ico">${ico}</span>${label}</a>`;
  $('#bottom-nav').innerHTML = tab('home', '⌂', t('home'), route === 'home')
    + tab('courses', '▦', t('courses'), route === 'courses' || route.startsWith('course-') || route.startsWith('m-'))
    + tab('practice', '✓', t('practice'), route === 'practice') + tab('profile', '◯', t('account'), route === 'profile');
  if ($('#signin').open) renderSignIn();
}

/* ---------- Views ---------- */
function courseCard(tr, big) {
  const s = trackStats(tr), live = tr.status === 'available';
  return `<a class="card course${live ? ' live' : ''}" href="#course-${tr.id}">
    <div class="course-top"><span class="cicon" data-track="${tr.id}">${esc(tr.icon)}</span><div style="min-width:0"><h3>${esc(L(tr.title))}</h3><div class="muted">${s.units} ${t('units')} · ${s.count} ${t('modules')}${s.hours ? ` · ≈ ${s.hours} ${t('hours')}` : ''}</div></div></div>
    <p>${esc(L(tr.blurb))}</p>
    ${live ? `<div class="progress${s.done === s.count ? ' done' : ''}"><span style="width:${pct(s.done, s.count)}%"></span></div>
      <div class="facts"><span class="pill ok">${t('available')}</span><span class="muted">${t('ofModules', s.done, s.count)}</span></div>`
      : `<div class="facts"><span class="pill soon">${t('comingSoon')}</span>${big && state.notified.has(tr.id) ? `<span class="muted">${t('notified')}</span>` : ''}</div>`}
  </a>`;
}
function unitCards(tr, live) {
  return `<div class="units">${tr.units.map((u, i) => `<div class="card unit"><div class="unit-top"><h3>${t('unit')} ${i + 1} · ${esc(L(u.title))}</h3><span class="pill">${u.modules.length} ${u.modules.length === 1 ? t('moduleLower') : t('modules')}</span></div><ul>` +
    u.modules.map((id) => (live
      ? `<li><a href="#m-${id}">${dot(id)}${esc(moduleTitle(id))}<span class="mins">${DATA.modules[id].minutes || ''} ${t('min')}</span></a></li>`
      : `<li><div><span class="dot"></span>${esc(moduleTitle(id))}<span class="mins">${t('soon')}</span></div></li>`)).join('') + '</ul></div>').join('')}</div>`;
}
function viewHome() {
  const cur = track(currentTrack()), s = trackStats(cur), next = nextModule(cur.id), live = liveIds();
  return `<section class="wrap">
    <div class="hero"><div class="hero-text"><h1>${t('heroTitle')}</h1><p class="lead">${t('heroLead')}</p>
      <div class="hero-actions"><a class="btn" href="#course-java">${t('startJava')}</a><a class="btn btn-ghost" href="#courses">${t('browse')}</a></div>
      <div class="hero-facts"><span><b>${liveTracks().length}</b> ${t('coursesReady')}</span><span><b>${live.length}</b> ${t('modules')}</span><span><b>${live.reduce((n, id) => n + DATA.full[id].examples.sets.length + 1, 0)}</b> ${t('examples').toLowerCase()}</span><span><b>EN · ES</b></span></div></div>
      ${heroArt()}</div>
    <a class="card continue" href="${next ? '#m-' + next : '#course-' + cur.id}"><div class="info"><div class="muted">${t('continueTitle')}</div>
      <h3 style="margin-top:2px">${next ? esc(L(cur.title)) + ' · ' + esc(moduleTitle(next)) : t('courseDone')}</h3>
      <div class="progress"><span style="width:${pct(s.done, s.count)}%"></span></div><div class="muted" style="margin-top:6px">${t('ofModules', s.done, s.count)}</div></div>
      <span class="btn">${s.done ? t('continueBtn') : t('startBtn')}</span></a>
    ${(() => { const p = buildPlan(); return p.finish ? `<div class="card plan-home"><span class="cicon" style="width:34px;height:34px;font-size:15px">▤</span><div class="info">${t('planHome', fmtDate(p.finish, { month: 'long', day: 'numeric' }), L(track(planTrack()).title))}</div><a class="btn btn-ghost btn-sm" href="#plan">${t('editPlan')}</a></div>` : ''; })()}
    <div class="section-head"><h2>${t('coursesTitle')}</h2><a class="muted" href="#courses">${t('allCourses')} →</a></div>
    <div class="courses">${DATA.tracks.map((tr) => courseCard(tr)).join('')}</div>
    <div class="section-head"><h2>${t('trackCourse', L(cur.title))}</h2><span class="muted">≈ ${s.hours} ${t('hours')} ${t('totalTime')}</span></div>
    ${unitCards(cur, true)}
    <div class="section-head"><h2>${t('studyTools')}</h2></div>
    <div class="tools">
      <a class="card tool" href="#practice"><div class="ico">▤</div><h3>${t('flashcards')}</h3><p>${t('toolFlash')}</p></a>
      <a class="card tool" href="#practice"><div class="ico">✓</div><h3>${t('quizzes')}</h3><p>${t('toolQuiz')}</p></a>
      <a class="card tool" href="#playground"><div class="ico">›_</div><h3>${t('playground')}</h3><p>${t('toolPlay')}</p></a>
      <a class="card tool" href="#notes"><div class="ico">✎</div><h3>${t('notes')}</h3><p>${t('toolNotes')}</p></a>
    </div></section>`;
}
function heroArt() {
  return `<div class="hero-art" aria-hidden="true"><div class="win"><div class="win-bar"><i></i><i></i><i></i><span>Grades.java</span></div>
<pre><span class="k">var</span> scores = List.<span class="f">of</span>(<span class="n">72</span>, <span class="n">95</span>, <span class="n">88</span>);
<span class="k">double</span> avg = scores.<span class="f">stream</span>()
    .<span class="f">mapToInt</span>(Integer::intValue)
    .<span class="f">average</span>().<span class="f">orElse</span>(<span class="n">0</span>);
System.out.<span class="f">printf</span>(<span class="s">"avg %.1f%n"</span>, avg);</pre>
    <div class="win-out"><span>${t('output')}</span>avg 85.0</div></div>
    <div class="float-card fc-1"><span class="tick-c">✓</span><div><b>${t('quiz')} · Streams</b><small>5 / 5</small></div></div>
    <div class="float-card fc-2"><span class="play-c">▶</span><div><b>${t('watchTopic')}</b><small>Java Brains</small></div></div></div>`;
}
function viewCourses() {
  return `<section class="wrap"><h1>${t('coursesTitle')}</h1><p class="lead">${t('coursesLead')}</p>
    <div class="courses" style="margin-top:24px">${DATA.tracks.map((tr) => courseCard(tr, true)).join('')}</div>
    <div class="section-head"><h2>${t('plannedTitle')}</h2></div>
    <div class="planned">${DATA.planned.map((p) => `<span>${esc(L(p))}</span>`).join('')}</div></section>`;
}
function viewCourse(id) {
  const tr = track(id); if (!tr) return viewMissing();
  const s = trackStats(tr), live = tr.status === 'available', next = live ? nextModule(id) : null;
  if (live) store.set('lastTrack', id);
  return `<section class="wrap">
    <div class="crumbs"><a href="#courses">${t('courses')}</a><span>/</span><span style="color:var(--text)">${esc(L(tr.title))}</span></div>
    <div class="course-hero" style="margin-top:12px"><span class="cicon" data-track="${tr.id}">${esc(tr.icon)}</span>
      <div style="min-width:0;flex:1"><h1 style="margin-top:0">${esc(L(tr.title))}</h1><p class="lead">${esc(L(tr.blurb))}</p></div></div>
    <div class="course-stats"><div><b>${s.units}</b><span>${t('units')}</span></div><div><b>${s.count}</b><span>${t('modules')}</span></div>${s.hours ? `<div><b>≈ ${s.hours}</b><span>${t('hours')}</span></div>` : ''}${live ? `<div><b>${s.done}/${s.count}</b><span>${t('modulesComplete').toLowerCase()}</span></div>` : ''}</div>
    ${live ? `<div class="hero-actions"><a class="btn" href="#m-${next || trackIds(id)[0]}">${s.done ? t('continueBtn') : t('startBtn')}${next ? ': ' + esc(moduleTitle(next)) : ''}</a></div>`
      : `<div class="notice"><span class="pill soon">${t('comingSoon')}</span><p>${t('soonNotice')}</p><button class="btn btn-sm${state.notified.has(id) ? ' btn-ghost' : ''}" data-action="notify" data-id="${id}" ${state.notified.has(id) ? 'disabled' : ''}>${state.notified.has(id) ? t('notified') : t('notifyMe')}</button></div>`}
    ${DATA.videos?.courses?.[id] ? `<div class="section-head"><h2>${t('courseSeries')}</h2></div>${vidCard(DATA.videos.courses[id], true)}` : ''}
    <div class="section-head"><h2>${t('unitsTitle')}</h2></div>
    ${unitCards(tr, live)}
    ${!live && DATA.videos ? `<div class="section-head"><h2>${t('watchWait')}</h2></div><p class="muted" style="margin:-6px 0 14px">${t('waitLead')}</p><div class="vids grid-vids">${waitGroups(tr).map((g) => `<div class="wait-card card"><div class="wait-mods">${g.mods.map((m) => `<span>${esc(moduleTitle(m))}</span>`).join('')}</div>${vidCard(g.v, true)}</div>`).join('')}</div>` : ''}</section>`;
}
// A recorded terminal session: lines starting with "$ " are what you type, the rest is what Git prints.
function transcriptHtml(text) {
  return String(text).split('\n').map((line) => (line.startsWith('$ ') ? `<span class="t-cmd"><span class="t-ps">$</span> ${esc(line.slice(2))}</span>` : `<span class="t-out">${esc(line)}</span>`)).join('\n');
}
function viewMissing() { return `<section class="wrap"><h1>${t('notFound')}</h1><a class="btn" href="#home">${t('home')}</a></section>`; }

function viewModule(id) {
  const meta = DATA.modules[id], c = DATA.full[id];
  if (!meta) return viewMissing();
  if (!c) return viewCourse(meta.track);
  const tr = track(meta.track), unit = tr.units.find((u) => u.modules.includes(id)), ids = trackIds(tr.id), idx = ids.indexOf(id);
  store.set('lastTrack', tr.id);
  const terminal = exampleLangs(c.examples.main).includes('bash');
  const sets = c.examples.sets;
  const tabs = [['overview', t('overview')], ['examples', t('examples'), sets.length + 1], ['terms', t('terms'), (c.definitions || []).length], ['practice', t('practice'), LL(c.practice).length], ['quiz', t('quiz'), (c.quiz || []).length], ['videos', t('videos'), Object.keys(modVideos(id)?.topics || {}).length + (seriesFor(id) ? 1 : 0)]];
  let body;
  if (state.tab === 'overview') {
    body = `<div class="grid-2"><div>
      <div class="block prose"><h2>${t('why')}</h2>${rich(L(c.whyItMatters))}</div>
      <div class="block"><h2>${t('objectives')}</h2><ul class="checklist">${LL(c.objectives).map((o) => `<li class="card"><span class="tick"></span><span>${fmt(o)}</span></li>`).join('')}</ul></div>
      <div class="block prose"><h2>${t('before')}</h2>${(c.prerequisites || []).length ? `<p>${t('prereq')}: ${c.prerequisites.map((p) => (DATA.full[p] ? `<a style="color:var(--accent);font-weight:600" href="#m-${p}">${esc(moduleTitle(p))}</a>` : `<b>${esc(moduleTitle(p))}</b>`)).join(', ')}</p>` : ''}<ul>${LL(c.skillsNeeded).map((x) => `<li>${fmt(x)}</li>`).join('')}</ul></div>
      <div class="block"><h2>${t('pitfalls')}</h2><ul class="pitfalls">${LL(c.pitfalls).map((x) => `<li>${fmt(x)}</li>`).join('')}</ul></div>
    </div><aside class="card aside"><h3>${t('takeaways')}</h3><ol>${LL(c.keyTakeaways).map((x) => `<li>${fmt(x)}</li>`).join('')}</ol>
      <button class="btn" data-tab="examples" style="width:100%">${t('seeExamples')}</button>
      ${seriesFor(id) ? `<div class="sep"></div><h3>${t('fullSeries')}</h3>${vidCard(seriesFor(id), true)}` : ''}
      <div class="sep"></div><h3>${t('resources')}</h3><div class="res">${(c.resources || []).map((r) => `<a href="${esc(r.url)}" target="_blank" rel="noopener">${esc(L(r.label))} ↗</a>`).join('')}</div></aside></div>`;
  } else if (state.tab === 'examples') {
    const ex = state.exIndex === 0 ? c.examples.main : sets[state.exIndex - 1];
    const langs = exampleLangs(ex), lang = langs.includes(state.codeLang) ? state.codeLang : langs[0];
    const code = ex.code[lang], out = (ex.output && ex.output[lang]) || '';
    body = `<div class="chips" role="group" aria-label="${t('examples')}">${[terminal ? t('fullSession') : t('fullProgram'), ...sets.map((s) => L(s.title) || s.topic)].map((label, i) => `<button class="chip" data-ex="${i}" aria-pressed="${i === state.exIndex}">${esc(label)}</button>`).join('')}</div>
      <div class="ex-head"><h2>${state.exIndex === 0 ? (terminal ? t('fullSession') : t('fullProgram')) : esc(L(ex.title))}</h2><p>${fmt(L(state.exIndex === 0 ? meta.description : ex.description))}</p></div>
      ${lang === 'bash' ? `<p class="term-hint">${t('terminalHint')}</p>` : ''}
      <div class="code-card"><div class="code-bar">${langs.map((k) => `<button class="lang" data-code-lang="${k}" aria-pressed="${k === lang}">${LANG_LABEL[k]}</button>`).join('')}<button class="lang copy" data-action="copy">${t('copy')}</button>${lang === 'bash' ? '' : `<button class="lang run" data-action="try-it" data-id="${id}">${t('tryIt')}</button>`}</div>
        ${lang === 'bash' ? `<code id="code-block" hidden>${esc(code)}</code><pre class="code term">${transcriptHtml(out)}</pre>`
          : `<pre class="code"><code id="code-block" class="language-${lang}">${esc(code)}</code></pre>
        <div class="output"><div class="output-label">${t('output')}</div><pre>${esc(out)}</pre></div>`}</div>
      ${state.exIndex > 0 ? `<div class="card explain prose"><h3>${t('explanation')}</h3>${rich(L(ex.explanation))}</div>` : ''}
      ${(() => { const v = state.exIndex === 0 ? null : modVideos(id)?.topics[ex.topic]; const list = v ? null : seriesFor(id);
        return v || list ? `<div class="watch"><div class="watch-label">${v ? t('watchTopic') : t('fullSeries')}</div>${v ? vidCard(v) : vidCard(list, true)}</div>` : ''; })()}`;
  } else if (state.tab === 'terms') {
    body = `<div class="terms">${(c.definitions || []).map((d) => `<div class="card term"><h3>${esc(L(d.term))}</h3><p>${fmt(L(d.definition))}</p></div>`).join('')}</div>`;
  } else if (state.tab === 'practice') {
    body = `<div class="block"><h2>${t('practiceProblems')}</h2><ol class="numbered">${LL(c.practice).map((x) => `<li class="card"><span>${fmt(x)}</span></li>`).join('')}</ol></div>
      <div class="block"><h2>${t('selfCheck')}</h2>${LL(c.selfCheck).map((q) => `<details class="card check"><summary>${fmt(q)}</summary><p>${t('selfCheckHint')}</p></details>`).join('')}</div>`;
  } else if (state.tab === 'videos') {
    const mv = modVideos(id) || { series: null, topics: {} };
    body = `<p class="prose" style="color:var(--text-2);margin:0 0 16px">${t('videosLead')}</p>
      ${seriesFor(id) ? `<div class="vid-topic">${t('fullSeries')}</div>${vidCard(seriesFor(id), true)}` : ''}
      ${meta.topics.map((tp) => mv.topics[tp] ? `<div class="vid-topic">${esc(tp)}</div>${vidCard(mv.topics[tp])}` : '').join('')}`;
  } else {
    body = `<div style="max-width:720px">${quizHtml(id)}</div>`;
  }
  const done = state.done.has(id);
  return `<section class="wrap">
    <div class="crumbs"><a href="#course-${tr.id}">${esc(L(tr.title))}</a><span>/</span><span>${esc(L(unit.title))}</span><span>/</span><span style="color:var(--text)">${esc(moduleTitle(id))}</span></div>
    <h1>${esc(moduleTitle(id))}</h1><p class="lead">${fmt(L(meta.description))}</p>
    <div class="mod-meta"><span class="pill">${t('difficulty')[meta.difficulty] || meta.difficulty}</span>${meta.minutes ? `<span class="pill">≈ ${meta.minutes} ${t('min')}</span>` : ''}<span class="pill">${meta.topics.length} ${t('topics')}</span><span class="pill ok">${terminal ? t('terminalExamples') : t('examples4')}</span>${done ? `<span class="pill accent">${t('marked')}</span>` : ''}</div>
    <div class="tabs" role="tablist">${tabs.map(([k, label, n]) => `<button class="tab" role="tab" data-tab="${k}" aria-selected="${state.tab === k}">${label}${n ? `<span class="count">${n}</span>` : ''}</button>`).join('')}</div>
    ${body}
    <div class="mod-foot"><button class="btn${done ? ' btn-ghost' : ''}" data-action="toggle-done" data-id="${id}">${done ? t('marked') : t('markDone')}</button>
      <a class="report" href="contact-support.html?module=${id}">${t('report')}</a>
      <div class="pn">${idx > 0 ? `<a class="btn btn-ghost" href="#m-${ids[idx - 1]}">${t('prev')}</a>` : ''}${idx < ids.length - 1 ? `<a class="btn btn-ghost" href="#m-${ids[idx + 1]}">${t('next')}</a>` : ''}</div></div>
  </section>`;
}

function quizHtml(id) {
  const qs = DATA.full[id].quiz || [];
  if (!state.quiz || state.quiz.id !== id) state.quiz = { id, i: 0, picked: null, score: 0, finished: false };
  const q = state.quiz;
  if (q.finished) {
    return `<div class="card quiz"><div class="quiz-top"><span>${t('quiz')} · ${esc(moduleTitle(id))}</span></div><div class="score"><b>${q.score}/${qs.length}</b><span class="muted">${t('scoreText', q.score, qs.length)}</span></div>
      <div class="quiz-actions" style="justify-content:center"><button class="btn" data-action="quiz-retry">${t('retry')}</button></div></div>`;
  }
  const item = qs[q.i], opts = LL(item.options);
  return `<div class="card quiz"><div class="quiz-top"><span>${t('quiz')} · ${esc(moduleTitle(id))}</span><span>${t('question', q.i + 1, qs.length)}</span></div>
    <div class="progress"><span style="width:${pct(q.i, qs.length)}%"></span></div>
    <h2>${fmt(L(item.question))}</h2>
    <div class="options">${opts.map((o, i) => {
      const cls = q.picked == null ? '' : i === item.correct ? ' right' : i === q.picked ? ' wrong' : '';
      return `<button class="option${cls}" data-action="quiz-pick" data-i="${i}" ${q.picked != null ? 'disabled' : ''}><span class="key">${'ABCDEF'[i]}</span><span>${fmt(o)}</span></button>`;
    }).join('')}</div>
    ${q.picked != null ? `<div class="feedback"><b style="color:${q.picked === item.correct ? 'var(--success)' : 'var(--danger)'}">${q.picked === item.correct ? t('correct') : t('notQuite')}</b> ${fmt(L(item.explanation))}</div>
      <div class="quiz-actions"><button class="btn" data-action="quiz-next">${q.i < qs.length - 1 ? t('nextQ') : t('finish')}</button></div>` : ''}</div>`;
}
function flashHtml(id) {
  const cards = DATA.full[id].definitions || [];
  if (!state.flash || state.flash.id !== id) state.flash = { id, i: 0, flipped: false };
  const f = state.flash, card = cards[f.i];
  return `<div class="flash${f.flipped ? ' flipped' : ''}" id="flash" role="button" tabindex="0" aria-label="${t('tapFlip')}" data-action="flip">
      <div class="flash-inner"><div class="flash-face"><div><div class="muted" style="margin-bottom:8px">${t('cardOf', f.i + 1, cards.length)}</div><h3>${esc(L(card.term))}</h3><p class="muted" style="margin-top:10px">${t('tapFlip')}</p></div></div>
      <div class="flash-face back"><p>${fmt(L(card.definition))}</p></div></div></div>
    <div class="flash-controls"><button class="btn btn-ghost" data-action="flash-again">${t('again')}</button><button class="btn" data-action="flash-next">${t('gotIt')}</button></div>`;
}
function viewPractice() {
  const ids = liveIds();
  if (!state.practiceModule) state.practiceModule = nextModule() || ids[0];
  const id = state.practiceModule;
  return `<section class="wrap"><h1>${t('practice')}</h1><p class="lead">${t('practiceLead')}</p>
    <div class="toolbar"><label class="muted" for="practice-module">${t('pickModule')}</label><select class="select" id="practice-module">${moduleOptions(id)}</select></div>
    <div class="split"><div>${quizHtml(id)}</div><div>${flashHtml(id)}</div></div></section>`;
}
const initials = (u) => (String(u?.name || u?.username || u?.email || '?').trim().split(/[\s@._-]+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join('') || '?').toUpperCase();
const dayKey = (ms) => { const d = new Date(ms); return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`; };
function activeDays() { return new Set(state.activity.map((a) => dayKey(a.at))); }
function streakDays() {
  const days = activeDays(); let n = 0; const d = new Date();
  if (!days.has(dayKey(d))) d.setDate(d.getDate() - 1); // a streak survives until the end of today
  while (days.has(dayKey(d))) { n += 1; d.setDate(d.getDate() - 1); }
  return n;
}
function quizAverage() { const v = Object.values(state.quizBest); return v.length ? { avg: Math.round(100 * v.reduce((s, x) => s + x, 0) / v.length), n: v.length } : null; }
function relDay(ms) { const days = Math.round((new Date().setHours(0, 0, 0, 0) - new Date(ms).setHours(0, 0, 0, 0)) / 864e5); return days <= 0 ? t('today') : days === 1 ? t('yesterday') : t('daysAgo', days); }
function viewProfile() {
  const u = state.user, liveAll = liveIds(), s = { count: liveAll.length, done: liveAll.filter((m) => state.done.has(m)).length }, qa = quizAverage(), streak = streakDays(), days = activeDays();
  const seg = (opts, cur, action) => `<div class="seg">${opts.map(([v, label]) => `<button aria-pressed="${v === cur}" data-action="${action}" data-v="${v}">${label}</button>`).join('')}</div>`;
  const theme = document.documentElement.dataset.theme || 'system';
  const provider = { google: 'Google', github: 'GitHub', password: t('emailPw') }[u.authProvider] || u.authProvider || t('emailPw');
  const week = Array.from({ length: 7 }, (_, i) => { const d = new Date(); d.setDate(d.getDate() - 6 + i); return days.has(dayKey(d)); });
  const notesCount = Object.values(state.notes).filter((x) => x && x.trim()).length;
  const ach = achievements(), recent = state.activity.slice(-6).reverse();
  const actLine = (a) => a.kind === 'done' ? `<span class="kind">✓</span><span>${t('completed')} <b style="color:var(--text)">${esc(moduleTitle(a.id))}</b></span>`
    : a.kind === 'quiz' ? `<span class="kind">%</span><span>${t('quiz')}: ${esc(moduleTitle(a.id))} · ${a.score}/${a.n}</span>`
    : `<span class="kind">✎</span><span>${t('notes')}: ${esc(moduleTitle(a.id))}</span>`;
  return `<section class="wrap">
    <div class="card profile-head">${u.avatarUrl ? `<img class="avatar" src="${esc(u.avatarUrl)}" alt="" referrerpolicy="no-referrer">` : `<div class="avatar" aria-hidden="true">${esc(initials(u))}</div>`}
      <div class="profile-id"><h1>${esc(u.name || u.username || u.email)}</h1><div class="muted">${[u.username ? '@' + u.username : '', u.email].filter(Boolean).map(esc).join(' · ')}</div>
        <div class="badges"><span class="pill${u.authProvider === 'google' ? ' google' : ''}">${t('signedInWith', provider)}</span><span class="pill sync" id="sync-pill">${syncLabel()}</span></div></div>
      <div class="profile-actions"><button class="btn btn-ghost" data-action="sign-out">${t('signOut')}</button></div></div>
    <div class="stats">
      <div class="card stat"><div class="label">${t('modulesComplete')}</div><div class="value">${s.done} / ${s.count}</div><div class="progress"><span style="width:${pct(s.done, s.count)}%"></span></div></div>
      <div class="card stat"><div class="label">${t('streak')}</div><div class="value">${streak} ${streak === 1 ? t('day') : t('days')}</div><div class="week">${week.map((on) => `<span${on ? ' class="on"' : ''}></span>`).join('')}</div></div>
      <div class="card stat"><div class="label">${t('quizAvg')}</div><div class="value">${qa ? qa.avg + '%' : '—'}</div><div class="muted">${qa ? t('acrossN', qa.n) : t('noQuizYet')}</div></div>
      <div class="card stat"><div class="label">${t('notes')}</div><div class="value">${notesCount}</div><div class="muted">${t('modulesWithNotes')}</div></div></div>
    <div class="split"><div class="stack">
      <div class="card panel"><h2>${t('yourCourses')}</h2><div class="unit-progress">${DATA.tracks.map((tr) => { const ts = trackStats(tr), live = tr.status === 'available';
        return `<a href="#course-${tr.id}"><div class="row-top"><span>${esc(L(tr.title))}</span><span>${live ? `${ts.done} / ${ts.count}` : t('comingSoon')}</span></div><div class="progress${live && ts.done === ts.count ? ' done' : ''}"><span style="width:${live ? pct(ts.done, ts.count) : 0}%"></span></div></a>`; }).join('')}</div></div>
      ${liveTracks().map((tr) => `<div class="card panel"><h2>${t('progressUnit', L(tr.title))}</h2><div class="unit-progress">${tr.units.map((un, i) => { const d = un.modules.filter((m) => state.done.has(m)).length;
        return `<div><div class="row-top"><span>${i + 1} · ${esc(L(un.title))}</span><span>${d} / ${un.modules.length}</span></div><div class="progress${d === un.modules.length ? ' done' : ''}"><span style="width:${pct(d, un.modules.length)}%"></span></div></div>`; }).join('')}</div></div>`).join('')}
      <div class="card panel"><h2>${t('prefs')}</h2><div>
        <div class="setting"><div class="txt"><b>${t('language')}</b><span>${t('languageSub')}</span></div>${seg([['en', 'English'], ['es', 'Español']], state.lang, 'set-lang')}</div>
        <div class="setting"><div class="txt"><b>${t('theme')}</b><span>${t('themeSub')}</span></div>${seg([['system', t('system')], ['light', t('light')], ['dark', t('dark')]], theme, 'set-theme')}</div>
        <div class="setting"><div class="txt"><b>${t('exLang')}</b><span>${t('exLangSub')}</span></div><select class="select" id="pref-code-lang" aria-label="${t('exLang')}">${LANGS.map(([k, label]) => `<option value="${k}" ${k === state.codeLang ? 'selected' : ''}>${label}</option>`).join('')}</select></div>
      </div></div></div>
    <div class="stack">
      <div class="card panel"><h2 style="display:flex;justify-content:space-between;gap:10px">${t('achievements')}<span class="muted" style="font-weight:500">${t('earned', ach.filter((x) => x[3]).length, ach.length)}</span></h2>
        <div class="badges-grid">${ach.map(([ico, name, how, got]) => `<div class="badge${got ? ' earned' : ''}"><span class="medal">${ico}</span><b>${esc(name)}</b><span>${esc(how)}</span></div>`).join('')}</div></div>
      <div class="card panel"><h2>${t('recent')}</h2>${recent.length ? `<ul class="activity">${recent.map((a) => `<li>${actLine(a)}<span class="when">${relDay(a.at)}</span></li>`).join('')}</ul>` : `<p class="muted" style="margin:0">${t('noActivity')}</p>`}</div>
      <div class="card panel danger"><h2>${t('deleteTitle')}</h2><p class="muted" style="margin:0 0 12px;font-size:13.5px">${t('deleteText')}</p>
        ${u.authProvider === 'password' ? `<form id="delete-form" class="stack" style="gap:10px"><div class="field"><label for="del-pass">${t('password')}</label><input class="input" id="del-pass" type="password" autocomplete="current-password" required></div>
          <div class="field"><label for="del-confirm">${t('typeDelete')}</label><input class="input" id="del-confirm" autocomplete="off" required></div><button class="btn btn-danger" type="submit">${t('deleteBtn')}</button><div class="form-error" id="delete-error" role="alert"></div></form>`
        : `<a class="btn btn-danger" href="contact-support.html">${t('deleteViaSupport')}</a>`}</div>
    </div></div></section>`;
}

const PG_SAMPLE = `// JavaScript runs right here in your browser.
// Try changing the numbers, then press Run.
const scores = [72, 95, 88, 61, 79];
const average = scores.reduce((sum, s) => sum + s, 0) / scores.length;
console.log('average:', average.toFixed(2));

const letter = (s) => s >= 90 ? 'A' : s >= 80 ? 'B' : s >= 70 ? 'C' : 'D';
for (const s of scores) console.log(s, '->', letter(s));`;
function viewPlayground() {
  if (!state.pg) state.pg = { lang: 'javascript', code: PG_SAMPLE, expected: '', from: '' };
  const pg = state.pg;
  return `<section class="wrap" style="max-width:1200px"><h1>${t('playground')}</h1><p class="lead">${t('pgLead')}</p>
    <div class="pg" style="margin-top:22px">
      <div class="pg-editor"><div class="code-bar">${LANGS.map(([k, label]) => `<button class="lang" data-action="pg-lang" data-v="${k}" aria-pressed="${k === pg.lang}">${label}</button>`).join('')}
        <button class="lang" data-action="pg-reset" style="margin-left:auto">${t('reset')}</button><button class="lang run" data-action="pg-run">${t('run')}</button></div>
        ${pg.from ? `<div class="pg-from">${esc(t('pgLoaded', pg.from))}</div>` : ''}
        <textarea id="pg-code" wrap="off" spellcheck="false" autocapitalize="off" autocomplete="off" aria-label="Code editor">${esc(pg.code)}</textarea></div>
      <div class="pg-out"><div class="code-bar"><span class="output-label" style="padding:6px 8px">${t('output')}</span><span class="pg-status" id="pg-status"></span></div><pre id="pg-out"><span class="info">${pg.lang === 'javascript' ? 'Ctrl/⌘ + Enter' : ''}</span></pre></div>
    </div></section>`;
}
let pgWorker = null;
function runPlayground() {
  const pg = state.pg, out = $('#pg-out'), status = $('#pg-status');
  pg.code = $('#pg-code').value;
  if (pg.lang !== 'javascript') {
    out.innerHTML = `<span class="info">${esc(pg.expected ? t('pgServer') : t('pgServerNoExpected'))}</span>${pg.expected ? '\n\n' + esc(pg.expected) : ''}`;
    return;
  }
  if (pgWorker) pgWorker.terminate();
  out.textContent = ''; status.textContent = t('running');
  const prelude = "const __f=(v)=>typeof v==='string'?v:(()=>{try{return JSON.stringify(v)}catch(e){return String(v)}})();"
    + "console.log=console.info=console.warn=(...a)=>postMessage({t:'log',v:a.map(__f).join(' ')});console.error=(...a)=>postMessage({t:'err',v:a.map(__f).join(' ')});"
    + "const require=(m)=>{throw new Error('require(\"'+m+'\") is not available in the browser playground')};";
  const url = URL.createObjectURL(new Blob([prelude + '\n' + pg.code + "\n;postMessage({t:'done'});"], { type: 'text/javascript' }));
  const started = performance.now();
  const w = pgWorker = new Worker(url);
  const finish = (msg) => { clearTimeout(timer); w.terminate(); URL.revokeObjectURL(url); if (!out.textContent) out.innerHTML = `<span class="info">${t('pgEmpty')}</span>`; status.textContent = msg; };
  const timer = setTimeout(() => { finish(t('pgTimeout')); }, 3000);
  w.onmessage = (e) => {
    const m = e.data;
    if (m.t === 'done') finish(t('pgDone', Math.round(performance.now() - started)));
    else out.insertAdjacentHTML('beforeend', m.t === 'err' ? `<span class="err">${esc(m.v)}</span>\n` : esc(m.v) + '\n');
  };
  w.onerror = (e) => { e.preventDefault(); out.insertAdjacentHTML('beforeend', `<span class="err">${esc(e.message || 'Error')}</span>\n`); finish(''); };
}
function viewNotes() {
  const ids = liveIds();
  if (!state.noteModule) state.noteModule = nextModule() || ids[0];
  const id = state.noteModule, text = state.notes[id] || '';
  const words = (x) => (x.trim() ? x.trim().split(/\s+/).length : 0);
  return `<section class="wrap"><h1>${t('notes')}</h1><p class="lead">${state.user ? t('notesLeadIn') : t('notesLead')}</p>
    <div class="notes" style="margin-top:22px"><div class="card notes-list">${liveTracks().map((tr) => `<div class="notes-course">${esc(L(tr.title))}</div>` + trackIds(tr.id).map((m) => `<button data-action="note-pick" data-id="${m}" aria-pressed="${m === id}">${dot(m)}<span>${esc(moduleTitle(m))}</span>${state.notes[m] ? `<span class="n">${words(state.notes[m])}</span>` : ''}</button>`).join('')).join('')}</div>
      <div class="card note-editor"><select class="select note-pick" id="note-module" aria-label="${t('module')}">${moduleOptions(id)}</select><div class="row-top"><b>${t('notesFor')} ${esc(moduleTitle(id))}</b><a class="muted" href="#m-${id}">${t('module')} →</a></div>
        <textarea id="note-text" placeholder="${t('notePlaceholder')}">${esc(text)}</textarea>
        <div class="muted" id="note-status">${text ? `${state.user ? t('savedAccount') : t('savedDevice')} · ${words(text)} ${t('words')}` : ''}</div></div></div></section>`;
}
function allTerms() {
  const out = [];
  liveIds().forEach((id) => (DATA.full[id].definitions || []).forEach((d) => out.push({ id, term: L(d.term), def: L(d.definition) })));
  return out.sort((a, b) => a.term.localeCompare(b.term, state.lang));
}
function glossaryGrid() {
  const q = state.glossQuery.toLowerCase();
  const list = allTerms().filter((x) => (state.glossLetter === 'all' || x.term[0].toUpperCase() === state.glossLetter) && (!q || x.term.toLowerCase().includes(q) || x.def.toLowerCase().includes(q)));
  return list.length ? list.map((x) => `<div class="card term"><h3>${esc(x.term)}</h3><p>${fmt(x.def)}</p><a class="from" href="#m-${x.id}">${esc(t('fromModule', moduleTitle(x.id)))}</a></div>`).join('') : `<p class="muted">${t('noResults')}</p>`;
}
function viewGlossary() {
  const terms = allTerms(), have = new Set(terms.map((x) => x.term[0].toUpperCase()));
  return `<section class="wrap"><h1>${t('glossary')}</h1><p class="lead">${t('glossaryLead', terms.length)}</p>
    <div class="toolbar"><input class="input" id="gloss-q" type="search" placeholder="${t('filterTerms')}" value="${esc(state.glossQuery)}" aria-label="${t('filterTerms')}"></div>
    <div class="letters"><button data-action="gloss-letter" data-v="all" aria-pressed="${state.glossLetter === 'all'}">${t('all')}</button>${'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((c) => `<button data-action="gloss-letter" data-v="${c}" aria-pressed="${state.glossLetter === c}" ${have.has(c) ? '' : 'disabled'}>${c}</button>`).join('')}</div>
    <div class="terms" id="gloss-grid">${glossaryGrid()}</div></section>`;
}
const ROADMAP = [
  ['live', 'java', { en: 'Full Java course', es: 'Curso completo de Java' }, { en: '13 modules with lessons, examples in 4 languages, practice and quizzes.', es: '13 módulos con lecciones, ejemplos en 4 lenguajes, práctica y cuestionarios.' }, ['Courses']],
  ['live', 'git', { en: 'Git course', es: 'Curso de Git' }, { en: '2 modules taught through real terminal sessions, each one run with real Git to record its output.', es: '2 módulos enseñados con sesiones reales de terminal, cada una ejecutada con Git real para grabar su salida.' }, ['Courses']],
  ['live', 'bilingual', { en: 'English and Spanish everywhere', es: 'Inglés y español en todo' }, { en: 'Every lesson, quiz and menu in both languages.', es: 'Cada lección, cuestionario y menú en ambos idiomas.' }, ['Access']],
  ['live', 'js-playground', { en: 'JavaScript playground', es: 'Editor de JavaScript' }, { en: 'Run JavaScript in the browser and load any example into it.', es: 'Ejecuta JavaScript en el navegador y carga cualquier ejemplo.' }, ['Tools']],
  ['live', 'sync', { en: 'Accounts and progress sync', es: 'Cuentas y progreso sincronizado' }, { en: 'Google or email sign-in; progress follows you between devices.', es: 'Inicio con Google o correo; tu progreso te sigue entre dispositivos.' }, ['Account']],
  ['building', 'dsa', { en: 'Data Structures & Algorithms course', es: 'Curso de estructuras de datos y algoritmos' }, { en: '22 modules, from arrays to dynamic programming, with complexity analysis.', es: '22 módulos, de arreglos a programación dinámica, con análisis de complejidad.' }, ['Courses']],
  ['building', 'runner', { en: 'Run Java, Python and C++', es: 'Ejecutar Java, Python y C++' }, { en: 'A sandboxed code server so every example and exercise runs in the browser.', es: 'Un servidor aislado para que cada ejemplo y ejercicio se ejecute en el navegador.' }, ['Tools']],
  ['live', 'redesign', { en: 'New design on every device', es: 'Nuevo diseño en todos los dispositivos' }, { en: 'This design: faster, clearer, with a real phone layout and dark mode.', es: 'Este diseño: más rápido, más claro, con versión para teléfono y modo oscuro.' }, ['Design']],
  ['building', 'more-courses', { en: 'Discrete Math and Assembly', es: 'Matemáticas discretas y Ensamblador' }, { en: 'Rewritten to the same standard as Java, one course at a time.', es: 'Reescritos con el mismo nivel que Java, un curso a la vez.' }, ['Courses']],
  ['planned', 'exercises', { en: 'Auto-graded coding exercises', es: 'Ejercicios de código con calificación automática' }, { en: 'Write a solution, run hidden tests, see which cases fail and why.', es: 'Escribe una solución, ejecuta pruebas ocultas y ve qué casos fallan y por qué.' }, ['Practice']],
  ['planned', 'srs', { en: 'Spaced-repetition review', es: 'Repaso con repetición espaciada' }, { en: 'Flashcards and quiz questions come back right before you would forget them.', es: 'Tarjetas y preguntas vuelven justo antes de que las olvides.' }, ['Practice']],
  ['planned', 'visualizers', { en: 'Step-through visualizers', es: 'Visualizadores paso a paso' }, { en: 'Watch the stack, heap, arrays and trees change line by line.', es: 'Mira cómo cambian la pila, el heap, los arreglos y los árboles línea por línea.' }, ['Tools']],
  ['planned', 'tutor', { en: 'Hints from an AI tutor', es: 'Pistas de un tutor con IA' }, { en: 'Ask about any line of an example and get a hint, not the full answer.', es: 'Pregunta por cualquier línea de un ejemplo y recibe una pista, no la respuesta.' }, ['Learning']],
  ['planned', 'certificates', { en: 'Course certificates', es: 'Certificados de curso' }, { en: 'Finish every module and quiz to earn a shareable certificate.', es: 'Completa todos los módulos y cuestionarios para obtener un certificado.' }, ['Account']],
  ['planned', 'classrooms', { en: 'Classrooms for teachers', es: 'Aulas para docentes' }, { en: 'Assign modules, see class progress and quiz results.', es: 'Asigna módulos y ve el progreso y los resultados de la clase.' }, ['Teaching']],
  ['planned', 'interview', { en: 'Interview prep mode', es: 'Modo de preparación para entrevistas' }, { en: 'Timed problem sets that mix topics, like a real technical interview.', es: 'Series de problemas con tiempo que mezclan temas, como una entrevista real.' }, ['Practice']],
  ['planned', 'offline', { en: 'Install and study offline', es: 'Instalar y estudiar sin conexión' }, { en: 'Add the site to your home screen and keep studying without internet.', es: 'Agrega el sitio a tu pantalla de inicio y estudia sin internet.' }, ['Access']],
  ['planned', 'discussions', { en: 'Questions on every module', es: 'Preguntas en cada módulo' }, { en: 'Ask and answer questions under each lesson.', es: 'Haz y responde preguntas debajo de cada lección.' }, ['Community']]
];
function viewRoadmap() {
  const col = (status, label) => { const items = ROADMAP.filter((r) => r[0] === status);
    return `<div class="road-col"><h2><span class="pill ${status === 'live' ? 'ok' : status === 'building' ? 'accent' : ''}">${label}</span><span class="count">${items.length}</span></h2>
      ${items.map(([st, id, title, desc, tags]) => `<div class="card feat"><h3>${esc(L(title))}</h3><p>${esc(L(desc))}</p><div class="tags">${tags.map((x) => `<span class="pill">${esc(x)}</span>`).join('')}</div>
        ${st !== 'live' ? `<button class="vote" data-action="vote" data-id="${id}" aria-pressed="${state.votes.has(id)}">${state.votes.has(id) ? t('voted') : t('vote')}</button>` : ''}</div>`).join('')}</div>`; };
  return `<section class="wrap" style="max-width:1200px"><h1>${t('roadmap')}</h1><p class="lead">${t('roadmapLead')}</p>
    <div class="road" style="margin-top:24px">${col('live', t('live'))}${col('building', t('building'))}${col('planned', t('planned'))}</div></section>`;
}
function achievements() {
  const d = state.done.size, lt = liveTracks();
  const unitDone = lt.some((tr) => tr.units.some((u) => u.modules.every((m) => state.done.has(m))));
  const courseShare = (tr) => trackIds(tr.id).filter((m) => state.done.has(m)).length / trackIds(tr.id).length;
  const en = state.lang === 'en';
  return [
    ['✓', en ? 'First module' : 'Primer módulo', en ? 'Complete any module' : 'Completa un módulo', d >= 1],
    ['◆', en ? 'Unit cleared' : 'Unidad completa', en ? 'Finish a whole unit' : 'Termina una unidad', unitDone],
    ['½', en ? 'Halfway' : 'A la mitad', en ? 'Half of any course' : 'La mitad de un curso', lt.some((tr) => courseShare(tr) >= 0.5)],
    ['★', en ? 'Course graduate' : 'Curso terminado', en ? 'Every module of a course' : 'Todos los módulos de un curso', lt.some((tr) => courseShare(tr) === 1)],
    ['⑂', en ? 'Two courses' : 'Dos cursos', en ? 'Complete a module in two courses' : 'Completa un módulo en dos cursos', lt.filter((tr) => courseShare(tr) > 0).length >= 2],
    ['100', en ? 'Perfect quiz' : 'Cuestionario perfecto', en ? 'Score 5/5 on a quiz' : 'Saca 5/5', state.aces.size >= 1],
    ['4', en ? 'Polyglot' : 'Políglota', en ? 'View code in all 4 languages' : 'Ve código en los 4 lenguajes', state.langsSeen.size >= 4],
    ['✎', en ? 'Note taker' : 'Toma notas', en ? 'Write your first note' : 'Escribe tu primera nota', Object.values(state.notes).some((x) => x && x.trim())],
    ['5', en ? '5-day streak' : 'Racha de 5 días', en ? 'Study 5 days in a row' : 'Estudia 5 días seguidos', streakDays() >= 5]
  ];
}

function vidCard(v, isList) {
  if (!v) return '';
  const url = isList ? `https://www.youtube.com/playlist?list=${v.id}` : `https://www.youtube.com/watch?v=${v.id}`;
  const meta = [v.channel, isList && v.count ? t('videoCount', v.count) : v.length].filter(Boolean).join(' · ');
  return `<a class="card vid" href="${url}" target="_blank" rel="noopener"><span class="play${isList ? ' list' : ''}">${isList ? '☰' : '▶'}</span><span class="vt"><b>${esc(v.title)}</b><span>${esc(meta)}</span></span><span class="ext">${t('onYoutube')} ↗</span></a>`;
}
function waitGroups(tr) {
  const groups = new Map();
  tr.units.flatMap((u) => u.modules).forEach((m) => { const v = modVideos(m)?.series; if (!v) return; if (!groups.has(v.id)) groups.set(v.id, { v, mods: [] }); groups.get(v.id).mods.push(m); });
  return [...groups.values()];
}
const modVideos = (id) => (DATA.videos && DATA.videos.modules[id]) || null;
// The module's own series, or the whole course's series when the module has none yet.
const seriesFor = (id) => modVideos(id)?.series || DATA.videos?.courses?.[DATA.modules[id]?.track] || null;
const planTrack = () => (track(state.plan.track)?.status === 'available' ? state.plan.track : currentTrack());
function buildPlan() {
  const cap = Math.max(1, Number(state.plan.hours)) * 60, left = trackIds(planTrack()).filter((id) => !state.done.has(id));
  const weeks = []; let cur = { mods: [], used: 0 };
  left.forEach((id) => { const m = DATA.modules[id].minutes || 90; if (cur.mods.length && cur.used + m > cap) { weeks.push(cur); cur = { mods: [], used: 0 }; } cur.mods.push(id); cur.used += m; });
  if (cur.mods.length) weeks.push(cur);
  const start = new Date((state.plan.start || new Date().toISOString().slice(0, 10)) + 'T12:00:00');
  weeks.forEach((w, i) => { w.from = new Date(start.getTime() + i * 7 * 864e5); w.to = new Date(w.from.getTime() + 6 * 864e5); });
  return { weeks, left, finish: weeks.length ? weeks[weeks.length - 1].to : null };
}
const fmtDate = (d, opts = { month: 'short', day: 'numeric' }) => new Intl.DateTimeFormat(state.lang === 'es' ? 'es' : 'en', opts).format(d);
function viewPlan() {
  const p = buildPlan();
  return `<section class="wrap"><h1>${t('studyPlan')}</h1><p class="lead">${t('planLead')}</p>
    <div class="card plan-controls">
      <div class="field"><label for="plan-track">${t('course')}</label><select class="select" id="plan-track">${liveTracks().map((tr) => `<option value="${tr.id}" ${tr.id === planTrack() ? 'selected' : ''}>${esc(L(tr.title))}</option>`).join('')}</select></div>
      <div class="field"><label for="plan-hours">${t('hoursWeek')}</label><select class="select" id="plan-hours">${[2, 3, 4, 6, 8, 10, 15].map((h) => `<option value="${h}" ${Number(state.plan.hours) === h ? 'selected' : ''}>${h} h</option>`).join('')}</select></div>
      <div class="field"><label for="plan-start">${t('startOn')}</label><input class="select" id="plan-start" type="date" value="${state.plan.start}"></div>
      ${p.weeks.length ? `<button class="btn btn-ghost" style="margin-left:auto" data-action="calendar">${t('addCalendar')} ↓</button>` : ''}
    </div>
    ${p.weeks.length ? `<div class="plan-summary"><div><b>${fmtDate(p.finish, { month: 'long', day: 'numeric', year: 'numeric' })}</b><span>${t('finishBy')}</span></div><div><b>${p.weeks.length}</b><span>${p.weeks.length === 1 ? t('week1') : t('weeksLeft')}</span></div><div><b>${p.left.length}</b><span>${t('modulesLeft')}</span></div></div>
    <div class="weeks">${p.weeks.map((w, i) => `<div class="card week-card${i === 0 ? ' now' : ''}"><div class="wk"><b>${i === 0 ? t('thisWeek') : t('weekN', i + 1)}</b><span>${fmtDate(w.from)} – ${fmtDate(w.to)}</span></div>
      <div class="mods">${w.mods.map((m) => `<a href="#m-${m}">${esc(moduleTitle(m))}</a>`).join('')}</div><span class="load">${Math.round(w.used / 6) / 10} h</span></div>`).join('')}</div>`
      : `<div class="notice" style="background:var(--success-soft)"><p>${t('allDone')}</p></div>`}</section>`;
}
/* ---------- Accounts and sync ----------
 * The API lives on Render (js/app-config.js sets the base URL on the public hosts; locally it is
 * the same origin). Browsers often block the API's cookie because it is on another site, so the
 * session token is also kept here and sent as a Bearer header: that is what keeps people signed in.
 * Progress is stored under the `atlas` key of /api/user-state; other keys there are left untouched. */
const API = (window.__APP_CONFIG && window.__APP_CONFIG.apiBaseUrl) || '';
const auth = { token: store.get('session', ''), csrf: '', providers: null };
async function api(path, opts = {}) {
  const headers = { Accept: 'application/json' };
  if (opts.body) headers['Content-Type'] = 'application/json';
  if (auth.token) headers.Authorization = 'Bearer ' + auth.token;
  if (auth.csrf && opts.method && opts.method !== 'GET') headers['X-CSRF-Token'] = auth.csrf;
  const ctrl = new AbortController(), timer = setTimeout(() => ctrl.abort(), opts.timeout || 45000); // Render can take ~30 s to wake
  try {
    const r = await fetch(API + path, { method: opts.method || 'GET', headers, credentials: 'include', body: opts.body ? JSON.stringify(opts.body) : undefined, signal: ctrl.signal });
    let data = null; try { data = await r.json(); } catch (e) { /* not JSON */ }
    if (!r.ok) { const err = new Error((data && data.error) || `HTTP ${r.status}`); err.status = r.status; throw err; }
    return data || {};
  } finally { clearTimeout(timer); }
}
function applySession(d) {
  if (d && d.authenticated && d.user) {
    state.user = d.user; if (d.csrfToken) auth.csrf = d.csrfToken;
    if (d.sessionToken) { auth.token = d.sessionToken; store.set('session', auth.token); }
    return true;
  }
  return false;
}
function clearSession() { state.user = null; auth.token = ''; auth.csrf = ''; remoteState = null; store.set('session', ''); }
let remoteState = null, syncTimer = null;
function mergeProgress(a) {
  const union = (key) => (a[key] || []).forEach((x) => state[key].add(x));
  ['done', 'notified', 'aces', 'langsSeen', 'votes'].forEach(union);
  Object.entries(a.notes || {}).forEach(([k, v]) => { if (v && !(state.notes[k] || '').trim()) state.notes[k] = v; });
  Object.entries(a.quizBest || {}).forEach(([k, v]) => { state.quizBest[k] = Math.max(v, state.quizBest[k] || 0); });
  const seen = new Set(state.activity.map((x) => `${x.kind}|${x.id}|${x.at}`));
  (a.activity || []).forEach((x) => { if (!seen.has(`${x.kind}|${x.id}|${x.at}`)) state.activity.push(x); });
  state.activity.sort((x, y) => x.at - y.at);
  if (a.plan && !store.get('planTouched', false)) state.plan = a.plan;
  if (a.codeLang && !store.get('codeLangTouched', false)) state.codeLang = a.codeLang;
}
async function pullProgress() {
  try {
    const r = await api('/api/user-state');
    remoteState = r.state && typeof r.state === 'object' && !Array.isArray(r.state) ? r.state : {};
    if (remoteState.atlas) mergeProgress(remoteState.atlas);
    save(); await pushProgress();
  } catch (e) { if (e.status === 401) clearSession(); }
}
function scheduleSync() { if (!state.user) return; clearTimeout(syncTimer); syncTimer = setTimeout(pushProgress, 1200); }
async function pushProgress() {
  if (!state.user) return;
  clearTimeout(syncTimer);
  try {
    await api('/api/user-state', { method: 'PUT', body: { state: { ...(remoteState || {}), atlas: { ...progressSnapshot(), updatedAt: Date.now() } } } });
    state.syncedAt = Date.now();
  } catch (e) { if (e.status === 401) { clearSession(); render(true); } state.syncedAt = null; }
  const pill = $('#sync-pill'); if (pill) pill.textContent = syncLabel();
}
const syncLabel = () => (state.syncedAt ? t('syncedAt', new Intl.DateTimeFormat(state.lang, { hour: 'numeric', minute: '2-digit' }).format(state.syncedAt)) : t('syncPending'));
function startOAuth(provider) {
  const back = location.origin + location.pathname + (location.hash && location.hash !== '#profile' ? location.hash : '#home');
  location.href = `${API}/api/auth/oauth/${provider}/start?returnTo=${encodeURIComponent(back)}`;
}
async function initAuth() {
  const url = new URL(location.href), q = url.searchParams;
  const ticket = q.get('oauth_ticket'), oauth = q.get('oauth');
  if (oauth || ticket) { ['oauth', 'oauth_provider', 'oauth_ticket', 'oauth_error'].forEach((k) => q.delete(k)); history.replaceState(null, '', url.pathname + url.search + url.hash); }
  api('/api/auth/oauth/providers', { timeout: 20000 }).then((r) => { auth.providers = r.providers || null; if ($('#signin').open) renderSignIn(); }).catch(() => {});
  if (ticket) { try { applySession(await api('/api/auth/oauth/exchange-ticket', { method: 'POST', body: { ticket } })); } catch (e) { /* fall back to the cookie below */ } }
  if (!state.user && (auth.token || ticket || oauth || store.get('hadSession', false))) {
    try { if (!applySession(await api('/api/auth/session'))) clearSession(); } catch (e) { if (e.status === 401) clearSession(); }
  }
  state.authReady = true;
  store.set('hadSession', Boolean(state.user));
  if (oauth === 'error' || (oauth === 'success' && !state.user)) toast(t('signinFailed'));
  else if (oauth === 'success') toast(t('welcome', state.user.name || state.user.username || ''));
  if (state.user) await pullProgress();
  render(true);
}
function renderSignIn(err) {
  const signup = state.signinMode === 'signup', g = auth.providers && auth.providers.google;
  $('#signin-form').innerHTML = `
    <div class="signin-top"><h2 id="signin-title">${signup ? t('create') : t('signinTitle')}</h2><button type="button" class="icon-btn" data-action="close-signin" aria-label="Close">✕</button></div>
    <p class="muted" style="margin:-6px 0 0">${t('signinSub')}</p>
    ${g && !g.enabled ? '' : `<button type="button" class="btn-google" data-action="oauth" data-v="google"><b>G</b>${t('google')}</button><div class="or">${t('orEmail')}</div>`}
    <div class="field"><label for="si-email">${signup ? t('email') : t('emailOrUser')}</label><input id="si-email" name="email" type="${signup ? 'email' : 'text'}" autocomplete="${signup ? 'email' : 'username'}" required></div>
    ${signup ? `<div class="field"><label for="si-user">${t('username')}</label><input id="si-user" name="username" autocomplete="username" minlength="3" maxlength="32" pattern="[A-Za-z0-9._\\-]+" required></div>` : ''}
    <div class="field"><label for="si-pass">${t('password')}</label><input id="si-pass" name="password" type="password" autocomplete="${signup ? 'new-password' : 'current-password'}" required></div>
    ${signup ? `<div class="field"><label for="si-pass2">${t('confirmPw')}</label><input id="si-pass2" name="confirm" type="password" autocomplete="new-password" required></div>` : ''}
    <div class="form-error" id="signin-error" role="alert">${err ? esc(err) : ''}</div>
    <button type="submit" class="btn" style="height:44px" id="signin-submit">${signup ? t('create') : t('signIn')}</button>
    <div class="signin-foot">${signup ? `<span>${t('haveAccount')} <a href="#" data-action="signin-mode" data-v="login">${t('signIn')}</a></span>`
      : `<a href="contact-support.html">${t('forgot')}</a><span>${t('newHere')} <a href="#" data-action="signin-mode" data-v="signup">${t('create')}</a></span>`}</div>
    <p class="legal">${t('legal')}</p>`;
}
async function submitSignIn() {
  const signup = state.signinMode === 'signup', v = (id) => ($('#' + id) ? $('#' + id).value : '');
  const btn = $('#signin-submit'), errBox = $('#signin-error');
  if (signup && v('si-pass') !== v('si-pass2')) { errBox.textContent = t('pwMismatch'); return; }
  btn.disabled = true; btn.textContent = t('working'); errBox.textContent = '';
  try {
    const d = signup ? await api('/api/auth/signup', { method: 'POST', body: { email: v('si-email'), username: v('si-user'), password: v('si-pass'), confirmPassword: v('si-pass2') } })
      : await api('/api/auth/login', { method: 'POST', body: { email: v('si-email'), password: v('si-pass') } });
    if (!applySession({ authenticated: true, ...d })) throw new Error(t('signinFailed'));
    store.set('hadSession', true); state.authReady = true;
    $('#signin').close(); toast(t('welcome', state.user.name || state.user.username || ''));
    await pullProgress(); render(true);
  } catch (e) {
    const keep = { 'si-email': v('si-email'), 'si-user': v('si-user') };
    renderSignIn(e.name === 'AbortError' ? t('serverSlow') : e.message || t('signinFailed'));
    Object.entries(keep).forEach(([id, val]) => { if ($('#' + id)) $('#' + id).value = val; });
    if ($('#si-pass')) $('#si-pass').focus();
  }
}
async function signOut() {
  try { await api('/api/auth/logout', { method: 'POST', body: {} }); } catch (e) { /* the local session is cleared either way */ }
  clearSession(); store.set('hadSession', false); location.hash = '#home'; render(); toast(t('signedOut'));
}
async function deleteAccount() {
  const err = $('#delete-error');
  try {
    await api('/api/profile/delete-account', { method: 'POST', body: { currentPassword: $('#del-pass').value, confirmation: $('#del-confirm').value } });
    clearSession(); store.set('hadSession', false); location.hash = '#home'; toast(t('accountDeleted'));
  } catch (e) { err.textContent = e.message; }
}
function downloadPlanCalendar() {
  const p = buildPlan(), stamp = new Date().toISOString().replace(/[-:]/g, '').slice(0, 15) + 'Z';
  const day = (d) => `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`;
  const icsText = (x) => String(x).replace(/[\\,;]/g, (c) => '\\' + c).replace(/\n/g, '\\n');
  const events = p.weeks.map((w, i) => { const end = new Date(w.from.getTime() + 864e5);
    return ['BEGIN:VEVENT', `UID:atlas-${planTrack()}-week-${i + 1}-${day(w.from)}@cscourseatlas`, `DTSTAMP:${stamp}`, `DTSTART;VALUE=DATE:${day(w.from)}`, `DTEND;VALUE=DATE:${day(end)}`,
      `SUMMARY:${icsText(`${L(track(planTrack()).title)} · ${t('weekN', i + 1)}`)}`, `DESCRIPTION:${icsText(w.mods.map(moduleTitle).join('\n'))}`, 'END:VEVENT'].join('\r\n'); });
  const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//CS Course Atlas//Study plan//EN', ...events, 'END:VCALENDAR'].join('\r\n');
  const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([ics], { type: 'text/calendar' })); a.download = `${planTrack()}-study-plan.ics`;
  document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 0);
}
/* ---------- Router ---------- */
let lastRoute = '';
function render(keepScroll) {
  if (!DATA) return;
  let route = location.hash.slice(1) || 'home';
  if (route === 'profile' && !state.user && !state.authReady) { renderChrome(route); $('#main').innerHTML = `<div class="loading">${t('checkingSession')}</div>`; lastRoute = route; return; }
  if (route === 'profile' && !state.user) {
    openSignIn();
    route = lastRoute && lastRoute !== 'profile' ? lastRoute : 'home';
    history.replaceState(null, '', '#' + route);
  }
  if (route !== lastRoute) { state.tab = 'overview'; state.exIndex = 0; }
  const html = route === 'home' ? viewHome() : route === 'courses' ? viewCourses() : route === 'practice' ? viewPractice() : route === 'profile' ? viewProfile() : route === 'playground' ? viewPlayground() : route === 'notes' ? viewNotes() : route === 'glossary' ? viewGlossary() : route === 'roadmap' ? viewRoadmap() : route === 'plan' ? viewPlan()
    : route.startsWith('course-') ? viewCourse(route.slice(7)) : route.startsWith('m-') ? viewModule(route.slice(2)) : viewMissing();
  renderChrome(route);
  $('#main').innerHTML = html;
  const code = $('#code-block'); if (code && !code.hidden && window.hljs) window.hljs.highlightElement(code);
  document.body.classList.remove('drawer-open');
  if (route !== lastRoute && !keepScroll) window.scrollTo(0, 0);
  lastRoute = route;
}
function openSignIn() { const d = $('#signin'); if (!d.open) { state.signinMode = 'login'; renderSignIn(); d.showModal(); } }

/* ---------- Events ---------- */
document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-action],[data-tab],[data-ex],[data-code-lang]');
  if (!el) return;
  if (el.dataset.tab) { state.tab = el.dataset.tab; render(true); const tabs = $('.tabs'); if (tabs && tabs.getBoundingClientRect().top < 0) tabs.scrollIntoView(); return; }
  if (el.dataset.ex != null) { state.exIndex = Number(el.dataset.ex); render(true); return; }
  if (el.dataset.codeLang) { state.codeLang = el.dataset.codeLang; state.langsSeen.add(el.dataset.codeLang); store.set('codeLangTouched', true); save(); render(true); return; }
  const a = el.dataset.action;
  if (a === 'oauth') startOAuth(el.dataset.v);
  else if (a === 'close-signin') $('#signin').close();
  else if (a === 'signin-mode') { e.preventDefault(); state.signinMode = el.dataset.v; renderSignIn(); $('#si-email').focus(); }
  else if (a === 'sign-out') signOut();
  else if (a === 'calendar') downloadPlanCalendar();
  else if (a === 'toggle-done') { const id = el.dataset.id; if (state.done.has(id)) state.done.delete(id); else { state.done.add(id); logActivity('done', id); } save(); render(true); toast(state.done.has(id) ? t('marked') : t('unmarked')); }
  else if (a === 'notify') { state.notified.add(el.dataset.id); save(); render(true); toast(t('notified')); }
  else if (a === 'copy') {
    const text = $('#code-block')?.textContent || '';
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(() => toast(t('copied')), selectCode); else selectCode();
  }
  else if (a === 'quiz-pick') { const q = state.quiz; q.picked = Number(el.dataset.i); if (q.picked === DATA.full[q.id].quiz[q.i].correct) q.score += 1; render(true); }
  else if (a === 'quiz-next') { const q = state.quiz, n = DATA.full[q.id].quiz.length; if (q.i < n - 1) { q.i += 1; q.picked = null; } else { q.finished = true; if (q.score === n) state.aces.add(q.id); state.quizBest[q.id] = Math.max(q.score / n, state.quizBest[q.id] || 0); logActivity('quiz', q.id, { score: q.score, n }); save(); } render(true); }
  else if (a === 'quiz-retry') { state.quiz = null; render(true); }
  else if (a === 'try-it') { const c = DATA.full[el.dataset.id], ex = state.exIndex === 0 ? c.examples.main : c.examples.sets[state.exIndex - 1];
    state.pg = { lang: state.codeLang, code: ex.code[state.codeLang], expected: ex.output?.[state.codeLang] || '', from: moduleTitle(el.dataset.id) }; location.hash = '#playground'; }
  else if (a === 'pg-run') runPlayground();
  else if (a === 'pg-lang') { state.pg.code = $('#pg-code').value; state.pg.lang = el.dataset.v; render(true); }
  else if (a === 'pg-reset') { state.pg = null; render(true); }
  else if (a === 'note-pick') { state.noteModule = el.dataset.id; render(true); }
  else if (a === 'gloss-letter') { state.glossLetter = el.dataset.v; render(true); }
  else if (a === 'vote') { const id = el.dataset.id; if (state.votes.has(id)) state.votes.delete(id); else state.votes.add(id); save(); render(true); }
  else if (a === 'flip') { state.flash.flipped = !state.flash.flipped; $('#flash').classList.toggle('flipped', state.flash.flipped); }
  else if (a === 'flash-next' || a === 'flash-again') { const n = DATA.full[state.flash.id].definitions.length; state.flash.i = (state.flash.i + 1) % n; state.flash.flipped = false; render(true); }
  else if (a === 'set-lang') { state.lang = el.dataset.v; save(); render(true); }
  else if (a === 'set-theme') { const v = el.dataset.v; if (v === 'system') delete document.documentElement.dataset.theme; else document.documentElement.dataset.theme = v; store.set('theme', v); render(true); }
});
function selectCode() { const r = document.createRange(); r.selectNodeContents($('#code-block')); const s = getSelection(); s.removeAllRanges(); s.addRange(r); }
document.addEventListener('input', (e) => {
  if (e.target.id === 'note-text') { const fresh = !(state.notes[state.noteModule] || '').trim(); state.notes[state.noteModule] = e.target.value; if (fresh && e.target.value.trim()) logActivity('note', state.noteModule); save(); const n = e.target.value.trim() ? e.target.value.trim().split(/\s+/).length : 0; $('#note-status').textContent = n ? `${state.user ? t('savedAccount') : t('savedDevice')} · ${n} ${t('words')}` : ''; }
  if (e.target.id === 'gloss-q') { state.glossQuery = e.target.value; $('#gloss-grid').innerHTML = glossaryGrid(); }
  if (e.target.id === 'pg-code' && state.pg) state.pg.code = e.target.value;
});
document.addEventListener('change', (e) => {
  if (e.target.id === 'practice-module') { state.practiceModule = e.target.value; state.quiz = null; state.flash = null; render(true); }
  if (e.target.id === 'note-module') { state.noteModule = e.target.value; render(true); }
  if (e.target.id === 'pref-code-lang') { state.codeLang = e.target.value; store.set('codeLangTouched', true); save(); }
  if (e.target.id === 'plan-hours' || e.target.id === 'plan-start' || e.target.id === 'plan-track') { state.plan[e.target.id.slice(5)] = e.target.value; store.set('planTouched', true); save(); render(true); }
});
document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); openSearch(); }
  if (e.key === 'Escape') closeSearch();
  if (e.target.id === 'search-input' && ['ArrowDown', 'ArrowUp', 'Enter'].includes(e.key)) {
    const items = [...document.querySelectorAll('#search-results .result[href]')];
    if (!items.length) return;
    e.preventDefault();
    let i = items.findIndex((x) => x.classList.contains('kb'));
    if (e.key === 'Enter') { (items[i] || items[0]).click(); return; }
    items.forEach((x) => x.classList.remove('kb'));
    i = e.key === 'ArrowDown' ? (i + 1) % items.length : (i <= 0 ? items.length - 1 : i - 1);
    items[i].classList.add('kb'); items[i].scrollIntoView({ block: 'nearest' });
  }
  if (e.target.id === 'flash' && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); e.target.click(); }
  if (e.target.id === 'pg-code') {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); runPlayground(); }
    else if (e.key === 'Tab' && !e.shiftKey) { e.preventDefault(); const ta = e.target, st = ta.selectionStart; ta.setRangeText('    ', st, ta.selectionEnd, 'end'); state.pg.code = ta.value; }
  }
});
$('#menu-btn').addEventListener('click', () => document.body.classList.add('drawer-open'));
$('#scrim').addEventListener('click', () => document.body.classList.remove('drawer-open'));
$('#signin-open').addEventListener('click', openSignIn);
document.addEventListener('submit', (e) => {
  if (e.target.id === 'signin-form') { e.preventDefault(); submitSignIn(); }
  if (e.target.id === 'delete-form') { e.preventDefault(); deleteAccount(); }
});
$('#lang-btn').addEventListener('click', () => { state.lang = state.lang === 'en' ? 'es' : 'en'; save(); render(true); });
$('#theme-btn').addEventListener('click', () => {
  const root = document.documentElement;
  const dark = root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  root.dataset.theme = dark ? 'light' : 'dark'; store.set('theme', root.dataset.theme);
  if (location.hash === '#profile') render(true);
});
window.addEventListener('hashchange', () => render());

/* ---------- Search ---------- */
function openSearch() { $('#search').classList.add('open'); $('#search-input').focus(); }
function closeSearch() { $('#search').classList.remove('open'); $('#search-results').hidden = true; }
$('#search-btn').addEventListener('click', (e) => { e.stopPropagation(); openSearch(); });
$('#search-input').addEventListener('input', (e) => {
  const q = e.target.value.trim().toLowerCase(), box = $('#search-results');
  if (q.length < 2 || !DATA) { box.hidden = true; return; }
  const hits = [];
  DATA.tracks.forEach((tr) => { if (L(tr.title).toLowerCase().includes(q)) hits.push({ kind: t('courses'), label: L(tr.title), href: '#course-' + tr.id, soon: tr.status !== 'available' }); });
  Object.entries(DATA.modules).forEach(([id, m]) => {
    if (L(m.title).toLowerCase().includes(q) || m.topics.some((x) => x.toLowerCase().includes(q))) hits.push({ kind: t('module'), label: L(m.title), href: DATA.full[id] ? '#m-' + id : '#course-' + m.track, soon: !DATA.full[id] });
  });
  Object.entries(DATA.full).forEach(([id, c]) => (c.definitions || []).forEach((d) => { if (L(d.term).toLowerCase().includes(q)) hits.push({ kind: t('term'), label: `${L(d.term)} · ${moduleTitle(id)}`, href: '#m-' + id, tab: 'terms' }); }));
  box.innerHTML = hits.length ? hits.slice(0, 12).map((h) => `<a class="result" href="${h.href}" ${h.tab ? `data-goto-tab="${h.tab}"` : ''}><span class="kind">${esc(h.kind)}</span><span>${esc(h.label)}</span>${h.soon ? `<span class="soon">${t('soon')}</span>` : ''}</a>`).join('') : `<div class="result muted">${t('noResults')}</div>`;
  box.hidden = false;
});
$('#search-results').addEventListener('click', (e) => {
  const r = e.target.closest('.result[href]'); if (!r) return;
  const goto = r.dataset.gotoTab;
  $('#search-input').value = ''; closeSearch();
  if (goto) setTimeout(() => { state.tab = goto; render(true); }, 0);
});
document.addEventListener('click', (e) => { if (!e.target.closest('#search') && !e.target.closest('#search-btn')) closeSearch(); });

/* ---------- Boot ---------- */
// Links from the generated SEO pages use ?route=/java&module=id; turn them into hash routes.
const ROUTE_HASH = { '/home': 'home', '/tracks': 'courses', '/java': 'course-java', '/dsa': 'course-dsa', '/git': 'course-git', '/assembly': 'course-assembly', '/discrete-math': 'course-discrete',
  '/flashcards': 'practice', '/quizzes': 'practice', '/playground': 'playground', '/notes': 'notes', '/support': 'roadmap', '/about': 'roadmap' };
function applyLegacyLink() {
  const url = new URL(location.href), q = url.searchParams, mod = q.get('module'), route = q.get('route');
  if (!mod && !route) return;
  const hash = mod ? 'm-' + mod : ROUTE_HASH[route] || 'home';
  q.delete('module'); q.delete('route');
  history.replaceState(null, '', url.pathname + url.search + '#' + hash);
}
(function boot() {
  applyLegacyLink();
  fetch('data/atlas-data.json').then((r) => { if (!r.ok) throw new Error(String(r.status)); return r.json(); }).then((data) => { DATA = data; render(); initAuth(); })
    .catch(() => { $('#main').innerHTML = '<div class="loading">Could not load the course data. Refresh the page to try again.</div>'; });
})();
