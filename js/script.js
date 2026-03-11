// CS Course Atlas - Main JavaScript File

// =================================
// GLOBAL STATE
// =================================
const appState = {
    darkMode: true,
    showComments: true,
    completedModules: new Set(),
    completedQuizzes: new Set(),
    expandedCode: new Set(),
    expandedCodeExamples: new Set(),
    expandedOutputs: new Set(),
    moduleComments: new Map(),
    moduleLanguages: new Map(),
    moduleModes: new Map(),
    moduleExampleSelections: new Map(),
    searchTerm: '',
    difficultyFilter: 'all',
    categoryFilter: 'all',
    glossarySearch: '',
    glossaryCategory: 'all',
    currentFlashcard: 0,
    showFlashcardAnswer: false,
    currentQuiz: null,
    scrollY: 0,
    headerCollapsed: false,
    selectedFlashcardModule: 'all',
    flashcardSession: [],
    flashcardSessionLength: 20,
    theme: 'default',
    fontScale: 'base',
    dailyChallengeId: null,
    dailyChallengeDate: null,
    studyTipId: null,
    weeklyGoal: 5,
    hideCompletedModules: false,
    compactLayout: false,
    accent: 'indigo',
    reduceMotion: false,
    highContrast: false,
    cardDepth: 'standard',
    language: 'en',
    collapsedSections: {
        progress: true,
        achievements: true,
        dailyChallenge: true,
        studyTip: true,
        insights: true,
        interviewExamples: true,
        studyNotes: true,
        dsPlayground: true
    }
};

// Interactive quiz state
const interactiveQuizState = {
    moduleId: null,
    questions: [],
    current: 0,
    answers: []
};

// =================================
// CONSTANTS
// =================================
const CONSTANTS = {
    CODE_PREVIEW_LINES: 12
};

const DEFAULT_COLLAPSED_SECTIONS = {
    progress: true,
    achievements: true,
    dailyChallenge: true,
    studyTip: true,
    insights: true,
    interviewExamples: true,
    studyNotes: true,
    dsPlayground: true
};

const ASSEMBLY_MODULE_IDS = [
    'assembly-registers-memory',
    'assembly-control-flow-procedures',
    'assembly-arrays-strings-io'
];

const VALID_CATEGORY_FILTERS = new Set(['all', 'dsa', 'discrete', 'java', 'git', 'assembly']);

const COLLAPSIBLE_SECTION_CONFIG = {
    progress: {
        containerSelector: '#progress-section',
        bodySelectors: ['.progress-main-content', '.progress-pills']
    },
    achievements: {
        containerSelector: '#achievements-card',
        bodySelectors: ['.achievements-main-content']
    },
    dailyChallenge: {
        containerSelector: '#daily-challenge-card',
        bodySelectors: ['#daily-challenge-description', '#daily-challenge-steps', '#daily-challenge-hint']
    },
    studyTip: {
        containerSelector: '#study-tip-card',
        bodySelectors: ['#study-tip-text']
    },
    insights: {
        containerSelector: '#insights-section',
        bodySelectors: ['#insights-auth-lock', '.insight-highlight-grid', '.insight-cards-grid']
    },
    interviewExamples: {
        containerSelector: '#interview-examples',
        bodySelectors: ['#interview-examples-grid']
    },
    studyNotes: {
        containerSelector: '#notes-section',
        bodySelectors: ['#notes-input']
    },
    dsPlayground: {
        containerSelector: '#ds-playground',
        bodySelectors: ['.grid.grid-cols-1.xl\\:grid-cols-12']
    }
};

const STORAGE_KEYS = {
    STUDY_METRICS: 'javaDSAStudyMetrics',
    STUDY_HABIT: 'javaDSAStudyHabit',
    ACCOUNT: 'javaDSAAccountProfile',
    NOTES: 'javaDSANotes',
    STUDY_PLAN: 'javaDSAStudyPlan'
};

const moduleOutputCache = new Map();
const moduleOutputState = new Map();
const moduleOutputInFlight = new Map();
const interviewRunState = new Map();
const interviewRunInFlight = new Set();

const SUPPORTED_LANGUAGES = {
    java: { name: 'Java', icon: '☕' },
    cpp: { name: 'C++', icon: '⚡' },
    python: { name: 'Python', icon: '🐍' },
    javascript: { name: 'JavaScript', icon: '🟨' },
    assembly: { name: 'Assembly', icon: '🧩' }
};
const PLAYGROUND_RUNNABLE_LANGUAGES = ['java', 'cpp', 'python', 'javascript'];

const CODE_MODES = {
    code: { name: 'Code', icon: '💻' },
    pseudocode: { name: 'Pseudocode', icon: '📝' },
    discreteTheory: { name: 'Discrete Mathematics', icon: '📘' }
};

const DIFFICULTY_COLORS = {
    beginner: 'bg-emerald-100 text-emerald-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-rose-100 text-rose-800',
    default: 'bg-slate-100 text-slate-800'
};

const FLASHCARD_SESSION_SIZE = 20;
const FREE_FLASHCARD_MODULES = 10;
const FLASHCARD_TOPIC_DECKS = [
    { id: 'topic:dsa', category: 'dsa', titleKey: 'flashcards.deck.topic.dsa' },
    { id: 'topic:discrete', category: 'discrete', titleKey: 'flashcards.deck.topic.discrete' },
    { id: 'topic:java', category: 'java', titleKey: 'flashcards.deck.topic.java' },
    { id: 'topic:git', category: 'git', titleKey: 'flashcards.deck.topic.git' },
    { id: 'topic:assembly', category: 'assembly', titleKey: 'flashcards.deck.topic.assembly' }
];
const THEME_OPTIONS = ['default', 'ocean', 'sunset', 'forest', 'minimal', 'space'];
const THEME_CLASSES = THEME_OPTIONS.filter(option => option !== 'default').map(option => `theme-${option}`);
const ACCENT_OPTIONS = ['indigo', 'emerald', 'amber', 'rose'];
const ACCENT_CLASSES = ACCENT_OPTIONS.map(option => `accent-${option}`);
const CARD_DEPTH_OPTIONS = ['standard', 'flat', 'lifted'];
const CARD_DEPTH_CLASSES = CARD_DEPTH_OPTIONS.map(option => `card-depth-${option}`);
const FONT_SCALE_CLASS_MAP = {
    compact: 'font-scale-compact',
    base: 'font-scale-base',
    comfortable: 'font-scale-comfortable',
    spacious: 'font-scale-spacious'
};
const FONT_SCALE_CLASSES = Object.values(FONT_SCALE_CLASS_MAP);

const CODE_RUNNER_ENDPOINT = '';
const JUDGE0_ENDPOINT = 'https://ce.judge0.com/submissions?base64_encoded=false&wait=true';
const CODE_RUNNER_CONFIG = {
    java: { language: 'java', version: '17', filename: 'Main.java' },
    python: { language: 'python', version: '3.10.0', filename: 'main.py' },
    cpp: { language: 'cpp', version: '17', filename: 'main.cpp' },
    javascript: { language: 'javascript', version: '18.15.0', filename: 'index.js' }
};
const JUDGE0_LANGUAGE_IDS = {
    java: 91,
    python: 109,
    cpp: 105,
    javascript: 93
};
const NEON_API_PATHS = {
    session: '/api/auth/session',
    profile: '/api/profile',
    userState: '/api/user-state',
    support: '/api/support',
    login: '/api/auth/login',
    signup: '/api/auth/signup',
    logout: '/api/auth/logout'
};
const PROFILE_SYNC_CONFIG = {
    enabled: true,
    baseUrl: '',
    autoPullOnOpen: true,
    autoPushOnSave: true,
    autoPullUserStateOnSession: true,
    autoPushUserState: true
};
const USER_STATE_SYNC_DEBOUNCE_MS = 1600;
const LEGACY_MODULE_ID_MAP = {
    'algorithm-analysis': 'propositional-logic-proofs',
    'number-theory': 'sets-relations-functions',
    'computational-geometry': 'combinatorics-discrete-probability'
};
const MODULE_CATEGORY_BY_ID = {
    'git-basics-workflow': 'git',
    'java-basics': 'java',
    'control-flow': 'java',
    'oop-basics': 'java',
    'exception-handling': 'java',
    'collections-framework': 'java',
    'file-io': 'java',
    'multithreading': 'java',
    'design-patterns': 'java',
    'lambda-streams': 'java',
    'generics': 'java',
    'testing-junit': 'java',
    'jdbc-basics': 'java',
    'propositional-logic-proofs': 'discrete',
    'sets-relations-functions': 'discrete',
    'combinatorics-discrete-probability': 'discrete',
    'assembly-registers-memory': 'assembly',
    'assembly-control-flow-procedures': 'assembly',
    'assembly-arrays-strings-io': 'assembly',
    'arrays-strings': 'dsa',
    'linked-lists': 'dsa',
    'stacks-queues': 'dsa',
    'trees-basics': 'dsa',
    'hash-tables': 'dsa',
    'heaps': 'dsa',
    'sorting-algorithms': 'dsa',
    'searching-algorithms': 'dsa',
    'recursion': 'dsa',
    'dynamic-programming': 'dsa',
    'greedy-algorithms': 'dsa',
    'graph-algorithms': 'dsa',
    'tries': 'dsa',
    'union-find': 'dsa',
    'segment-trees': 'dsa',
    'binary-indexed-trees': 'dsa',
    'advanced-trees': 'dsa',
    'string-algorithms': 'dsa',
    'bit-manipulation': 'dsa'
};
const MODULE_LEARNING_SEQUENCE = [
    'java-basics',
    'git-basics-workflow',
    'control-flow',
    'assembly-registers-memory',
    'oop-basics',
    'exception-handling',
    'arrays-strings',
    'searching-algorithms',
    'stacks-queues',
    'linked-lists',
    'sets-relations-functions',
    'propositional-logic-proofs',
    'combinatorics-discrete-probability',
    'collections-framework',
    'file-io',
    'assembly-control-flow-procedures',
    'assembly-arrays-strings-io',
    'generics',
    'jdbc-basics',
    'multithreading',
    'trees-basics',
    'hash-tables',
    'heaps',
    'sorting-algorithms',
    'recursion',
    'tries',
    'union-find',
    'bit-manipulation',
    'greedy-algorithms',
    'testing-junit',
    'dynamic-programming',
    'graph-algorithms',
    'segment-trees',
    'binary-indexed-trees',
    'advanced-trees',
    'string-algorithms',
    'design-patterns',
    'lambda-streams'
];

const DISCRETE_MODULE_IDS = new Set([
    'propositional-logic-proofs',
    'sets-relations-functions',
    'combinatorics-discrete-probability'
]);

const ACHIEVEMENT_LEVELS = [
    {
        id: 'rookie',
        threshold: 0,
        label: 'Trailhead Rookie',
        icon: '🌱',
        description: 'You have the map and motivation—complete your first module to leave the trailhead.',
    },
    {
        id: 'scholar',
        threshold: 3,
        label: 'Sprouting Scholar',
        icon: '📘',
        description: 'Patterns are clicking. Keep finishing fundamentals to unlock tougher structures.',
    },
    {
        id: 'adventurer',
        threshold: 10,
        label: 'Algorithm Adventurer',
        icon: '🧭',
        description: 'You navigate recursion, sorting, and graphs with confidence. Time to optimize.',
    },
    {
        id: 'dynamo',
        threshold: 20,
        label: 'Data Structure Dynamo',
        icon: '⚡',
        description: 'You can dissect any implementation and rebuild it from memory. Keep the momentum.',
    },
    {
        id: 'luminary',
        threshold: 34,
        label: 'DSA Luminary',
        icon: '💎',
        description: 'All modules conquered! Pay it forward by mentoring someone still on the path.',
    }
];

// =================================
// TRANSLATION SYSTEM
// =================================

const TRANSLATIONS = {
    en: {
        // Main header
        'main.title': '🧭 CS Course Atlas',
        'main.subtitle': 'Multi-class learning for Computer Science students',
        // Hero
        'hero.title': 'CS Course Atlas: Learn Across Core CS Courses',
        'hero.subtitle': 'A comprehensive, beginner-friendly journey across Data Structures & Algorithms, Assembly, Java, Python, JavaScript, and Discrete Mathematics by Eddy Arriaga-B. Each module includes detailed explanations, extensive code examples where applicable, and practical exercises.',
        // Header buttons
        'btn.flashcards': 'Flashcards',
        'btn.flashcardsShort': 'Cards',
        'btn.glossary': 'Glossary',
        'btn.glossaryShort': 'Terms',
        'btn.quizzes': 'Interactive Quizzes',
        'btn.quizzesShort': 'Quizzes',
        'btn.settings': 'Settings',
        'btn.settingsShort': 'Set',
        'btn.reset': 'Reset',
        'btn.resetShort': 'Reset',
        'btn.account': 'Account',
        'btn.accountShort': 'Acct',
        // Progress
        'progress.heading': '📊 Your Learning Progress',
        'progress.kicker': 'Current journey',
        // Topic focus
        'topic.focus.heading': 'Topic Focus',
        'topic.focus.subtitle': 'Choose your primary track. This controls which major module family is shown.',
        'topic.focus.badge': 'Primary Filter',
        'topic.all.title': 'All Topics',
        'topic.all.subtitle': 'Everything in one view',
        'topic.dsa.title': 'Data Structures & Algorithms',
        'topic.dsa.subtitle': 'Core coding interview track',
        'topic.discrete.title': 'Discrete Mathematics',
        'topic.discrete.subtitle': 'Proofs, counting, and math logic',
        'topic.java.title': 'Java Learning',
        'topic.java.subtitle': 'Core Java syntax, OOP, tooling, and practical software workflows',
        'topic.git.title': 'Git Learning',
        'topic.git.subtitle': 'Version control, branching, collaboration, and safe workflows',
        'topic.assembly.title': 'Assembly Fundamentals',
        'topic.assembly.subtitle': 'Registers, memory, and low-level program flow',
        'topic.comingSoon.heading': 'Coming Soon Tracks',
        'topic.comingSoon.label': 'Coming Soon',
        'topic.comingSoon.toc.title': 'Theory of Computation',
        'topic.comingSoon.toc.subtitle': 'Automata, formal languages, computability, and complexity foundations',
        'topic.comingSoon.cpp.title': 'Dedicated C++ Learning Track',
        'topic.comingSoon.cpp.subtitle': 'C++ fundamentals, STL, memory model, and performance-oriented problem solving',
        'topic.comingSoon.stats.title': 'Statistics for CS',
        'topic.comingSoon.stats.subtitle': 'Probability, distributions, inference, and data-driven decision making',
        // Sections
        'section.dailyChallenge': '🔥 Daily Challenge',
        'section.studyTip': '🌟 Study Tip',
        'section.insights': 'Personalized Study Insights',
        'section.insightsSubtitle': 'Stay on track with live stats, tailored module suggestions, and a built-in focus buddy.',
        'section.expand': 'Expand',
        'section.collapse': 'Collapse',
        'insights.lock.badge': 'Account Required',
        'insights.lock.title': 'Sign in to unlock personalized insights',
        'insights.lock.copy': 'Your dashboard analytics, focus momentum, and personalized recommendations are available after login so progress can sync safely.',
        'insights.lock.cta': 'Log In / Sign Up',
        'insights.lock.updates': 'Locked until login',
        'insights.lock.status': 'Locked',
        'insights.lock.sessionBtn': 'Sign in to start',
        'insights.lock.break': 'Sign in to enable reminders',
        'interview.heading': '📂 Interview Examples',
        'interview.subtitle': 'LeetCode-style walk-throughs. Two at a time with quick copy.',
        'interview.pages': 'Pages',
        'interview.runSolution': 'Run Solution',
        'interview.running': 'Running...',
        'interview.outputLabel': 'Output',
        'interview.outputReady': 'Ready',
        'interview.outputLive': 'Live execution',
        'interview.outputFallback': 'Fallback output',
        'interview.outputError': 'Execution error',
        'interview.outputPlaceholder': 'Run the example solution to view output.',
        'interview.runInWorkspace': 'Run in Workspace',
        'ds.heading': '🛠️ Data Structure Code Playground',
        'ds.subtitle': 'Interact with arrays, stacks, queues, heaps, graphs, and tries. Track structure, pointers, operation timeline, and complexity in one place.',
        'ds.reset': 'Reset playground',
        // Progress chip
        'progress.nowAt': 'Now at',
        // Achievements
        'achievements.heading': 'Learning Achievements',
        'achievements.currentBadge': 'Current Badge',
        // Support
        'support.heading': '❤️ Do you enjoy this website?',
        'support.subtitle': 'Help keep this resource free and updated with new content weekly!',
        // Floating helper
        'helper.badge': '💡 Quick Guide',
        'helper.ariaLabel': 'Open quick website guide',
        'helper.title': 'Website Quick Guide',
        'helper.subtitle': 'A short tour of what each section does.',
        'helper.closeAria': 'Close quick website guide',
        'helper.goalTitle': 'Goal of CS Course Atlas',
        'helper.goalText': 'Help Computer Science students learn faster across multiple classes with clear explanations, runnable examples, and guided practice tools.',
        'helper.startTitle': 'Start Here (3 steps)',
        'helper.startChip': 'Fast setup',
        'helper.startStep1': 'Pick a Topic Focus and open the first module in that track.',
        'helper.startStep2': 'Use Code Playground or Data Structure Playground to practice immediately.',
        'helper.startStep3': 'Finish with a quiz + flashcards and mark progress complete.',
        'helper.sectionModulesTitle': 'Modules',
        'helper.sectionModulesText': 'Structured learning tracks with code examples, theory mode (for discrete), definitions, and resources.',
        'helper.sectionPlaygroundTitle': 'Code Playground',
        'helper.sectionPlaygroundText': 'Run Java, C++, Python, and JavaScript snippets, test edits, and inspect output quickly.',
        'helper.sectionDataTitle': 'Data Structure Code Playground',
        'helper.sectionDataText': 'Interactive visuals for arrays, stacks, queues, heaps, graphs, and tries with operation timeline and complexity view.',
        'helper.sectionPracticeTitle': 'Practice Tools',
        'helper.sectionPracticeText': 'Use flashcards, interactive quizzes, glossary, and interview examples to reinforce concepts.',
        'helper.sectionResourcesTitle': 'Notes + Books Library',
        'helper.sectionResourcesText': 'Use Notes Library for cheat sheets and the Books area for longer references you can read or download.',
        'playground.gitReadOnly': 'Git walkthrough mode (read-only)',
        'playground.gitReadOnlyHint': 'Git samples are locked for editing so you can focus on terminal commands and output.',
        'helper.sectionProgressTitle': 'Progress + Settings',
        'helper.sectionProgressText': 'Track completion, customize UI settings, and manage account/profile preferences.',
        'helper.workflowTitle': 'Recommended Study Workflow',
        'helper.workflowStep1': 'Learn concept in a module and read key definitions.',
        'helper.workflowStep2': 'Run/modify code and verify output.',
        'helper.workflowStep3': 'Lock understanding with quiz + flashcards.',
        'helper.workflowStep4': 'Save notes and track completion so insights stay accurate.',
        'helper.closeBtn': 'Got it',
        'books.heading': '📚 Books Library',
        'books.subtitle': 'Read full-length reference books directly in the website or download them for offline study.',
        'books.badge': 'Reference Shelf',
        'books.readerLabel': 'Book Reader',
        'books.closeReader': 'Close Reader',
        'books.read': 'Read Online',
        'books.download': 'Download',
        'books.available': 'Available',
        'books.missing': 'Missing on this machine',
        'books.empty': 'No books configured yet.',
        'books.unavailable': 'Book file is unavailable on this machine.',
        'flashcards.nav.prev': 'Previous',
        'flashcards.nav.next': 'Next',
        // Footer
        'footer.kicker': 'Built for Computer Science students',
        'footer.title': 'CS Course Atlas Learning Hub',
        'footer.subtitle': 'A multi-course study platform across DSA, Discrete Math, Java, Git, Assembly, and coding practice workflows.',
        'footer.tag.multiCourse': 'Multi-course',
        'footer.tag.handsOn': 'Hands-on Practice',
        'footer.tag.bilingual': 'EN / ES Friendly',
        'footer.quick.flashcards': '🎯 Open Flashcards',
        'footer.quick.quizzes': '🧠 Start a Quiz',
        'footer.quick.glossary': '📚 Browse Glossary',
        'footer.tools.title': '📖 Study Tools',
        'footer.tools.flashcards': '🎯 Practice Flashcards',
        'footer.tools.glossary': '📚 CS Glossary',
        'footer.tools.quizzes': '🧠 Interactive Quizzes',
        'flashcards.deck.all': 'All Modules (mix)',
        'flashcards.deck.topicGroup': 'Topic Decks',
        'flashcards.deck.moduleGroup': 'Module Decks',
        'flashcards.deck.topic.dsa': 'DSA Track',
        'flashcards.deck.topic.discrete': 'Discrete Math Track',
        'flashcards.deck.topic.java': 'Java Track',
        'flashcards.deck.topic.git': 'Git Track',
        'flashcards.deck.topic.assembly': 'Assembly Track',
        'flashcards.deck.topic.locked': 'Complete quizzes in this track to unlock',
        'flashcards.deck.topic.empty': 'No unlocked cards in this track yet. Complete quizzes in this track to unlock more flashcards.',
        'flashcards.deck.module.locked': 'Complete quiz to unlock',
        'flashcards.deck.startPrompt': 'Pick a deck to begin.',
        'footer.features.title': '🚀 Core Features',
        'footer.features.one': '💬 Individual Comment Controls',
        'footer.features.two': '📝 Pseudocode Conversion',
        'footer.features.three': '🛠️ Multi-Language Support',
        'footer.features.four': '📱 Mobile-Optimized Design',
        'footer.features.five': '🌙 Dark Mode Support',
        'footer.support.title': '💖 Support the Project',
        'footer.support.copy': 'Made with care for CS students. Help keep the platform free and continuously updated.',
        'footer.support.coffee': '☕ Coffee',
        'footer.support.sponsor': '💝 Sponsor',
        'footer.bottom.author': 'Created for CS students by Eddy Arriaga-B',
        'footer.bottom.copyright': 'CS Course Atlas © 2024 | Open Source ❤️',
        // Settings modal
        'settings.title': '⚙️ Settings',
        'settings.subtitle': 'Customize your learning experience',
        'settings.appearance': 'Appearance',
        'settings.darkMode': 'Dark Mode',
        'settings.bgTheme': 'Background Theme',
        'settings.themeDefault': 'Default Gradient',
        'settings.themeOcean': 'Ocean Breeze',
        'settings.themeSunset': 'Sunset Glow',
        'settings.themeForest': 'Forest Trail',
        'settings.themeMinimal': 'Minimal Light',
        'settings.themeSpace': 'Space Night',
        'settings.accentColor': 'Accent Color',
        'settings.accentIndigo': 'Indigo Aurora',
        'settings.accentEmerald': 'Emerald Focus',
        'settings.accentAmber': 'Amber Sunrise',
        'settings.accentRose': 'Rose Nebula',
        'settings.accentHint': 'Updates buttons, highlights, and callouts instantly.',
        'settings.cardElevation': 'Card Elevation',
        'settings.elevationFlat': 'Minimal (low shadow)',
        'settings.elevationStandard': 'Balanced',
        'settings.elevationLifted': 'Lifted Glow',
        'settings.layout': 'Layout',
        'settings.compactLayout': 'Compact Module Layout',
        'settings.compactLayoutHint': 'Denser cards for widescreen or multi-tasking.',
        'settings.textSize': 'Text Size',
        'settings.textCompact': 'Compact',
        'settings.textStandard': 'Standard',
        'settings.textComfortable': 'Comfortable',
        'settings.textSpacious': 'Spacious',
        'settings.textSizeHint': 'Applies globally for easier reading.',
        'settings.accessibility': 'Accessibility',
        'settings.reduceMotion': 'Reduce Motion',
        'settings.reduceMotionHint': 'Limit animations for focus and accessibility.',
        'settings.highContrast': 'High Contrast Text',
        'settings.highContrastHint': 'Boost text contrast for readability.',
        'settings.learning': 'Learning',
        'settings.showComments': 'Show Code Comments',
        'settings.showCommentsHint': 'Each module can override this setting.',
        'settings.hideCompleted': 'Hide Completed Modules',
        'settings.hideCompletedHint': "Keep your grid focused on what's left.",
        'settings.weeklyGoal': 'Weekly Module Goal',
        'settings.goal3': '3 / week · Steady pace',
        'settings.goal5': '5 / week · Balanced',
        'settings.goal8': '8 / week · Accelerated',
        'settings.goal12': '12 / week · Sprint',
        'settings.weeklyGoalHint': 'Personalizes your study insights and pacing tips.',
        'settings.language': 'Language / Idioma',
        'settings.languageLabel': 'Interface Language',
        'settings.languageHint': 'Switch between English and Spanish / Cambia entre inglés y español.',
        'settings.save': '✓ Save & Close',
        // Module card labels/tooltips
        'module.starterBanner': '⭐ Starter Module: recommended first step for most learners',
        'module.topicsCovered': 'Topics Covered:',
        'module.codeExample': '💻 Code Example',
        'module.discreteTheory': '📘 Discrete Mathematics Theory',
        'module.theoryMode': 'Theory Mode',
        'module.learningResources': '📚 Learning Resources:',
        'module.definitionsHeading': '📘 Need-to-Know Definitions',
        'module.tooltipHideComments': 'Hide Comments',
        'module.tooltipShowComments': 'Show Comments',
        'module.tooltipSelectLanguage': 'Select Programming Language',
        'module.tooltipSelectMode': 'Select Code Display Mode',
        'module.modeCode': 'Code',
        'module.modePseudocode': 'Pseudocode',
        'module.commentsOn': 'ON',
        'module.commentsOff': 'OFF',
        'module.collapse': '📄 Collapse',
        'module.expand': '📖 Expand',
        'module.discreteModeLabel': 'Discrete Mathematics',
        'module.examplesHeading': 'Detailed Topic Code Examples',
        'module.hideExample': 'Hide Code',
        'module.showExample': 'Show Code',
        'module.examplePreview': 'Preview',
        'module.truncateHint': '// ... (click Expand to see full code)',
        'module.showOutput': 'Output',
        'module.hideOutput': 'Hide Output',
        'module.outputHeading': 'Output',
        'module.outputRunning': 'Running output...',
        'module.outputSourceLive': 'Live',
        'module.outputSourceFallback': 'Fallback',
        'module.outputAssemblyNote': 'Assembly is view-only in module cards. Showing expected output.',
        'module.outputUnavailableForMode': 'Output is only available in Code mode.'
    },
    es: {
        // Main header
        'main.title': '🧭 CS Course Atlas',
        'main.subtitle': 'Aprendizaje multi-curso para estudiantes de Ciencias de la Computación',
        // Hero
        'hero.title': 'CS Course Atlas: Aprende en Cursos Clave de CS',
        'hero.subtitle': 'Un recorrido completo y amigable para principiantes a través de Estructuras de Datos y Algoritmos, Ensamblador, Java, Python, JavaScript y Matemáticas Discretas por Eddy Arriaga-B. Cada módulo incluye explicaciones detalladas, amplios ejemplos de código y ejercicios prácticos.',
        // Header buttons
        'btn.flashcards': 'Tarjetas',
        'btn.flashcardsShort': 'Tarjetas',
        'btn.glossary': 'Glosario',
        'btn.glossaryShort': 'Términos',
        'btn.quizzes': 'Cuestionarios',
        'btn.quizzesShort': 'Quiz',
        'btn.settings': 'Ajustes',
        'btn.settingsShort': 'Ajustes',
        'btn.reset': 'Reiniciar',
        'btn.resetShort': 'Reset',
        'btn.account': 'Cuenta',
        'btn.accountShort': 'Cuenta',
        // Progress
        'progress.heading': '📊 Tu Progreso de Aprendizaje',
        'progress.kicker': 'Recorrido actual',
        // Topic focus
        'topic.focus.heading': 'Enfoque de Temas',
        'topic.focus.subtitle': 'Elige tu ruta principal. Esto controla qué familia de módulos se muestra.',
        'topic.focus.badge': 'Filtro Principal',
        'topic.all.title': 'Todos los Temas',
        'topic.all.subtitle': 'Todo en una sola vista',
        'topic.dsa.title': 'Estructuras de Datos y Algoritmos',
        'topic.dsa.subtitle': 'Ruta central para entrevistas técnicas',
        'topic.discrete.title': 'Matemáticas Discretas',
        'topic.discrete.subtitle': 'Pruebas, conteo y lógica matemática',
        'topic.java.title': 'Aprendizaje de Java',
        'topic.java.subtitle': 'Sintaxis base de Java, POO, herramientas y flujos practicos de software',
        'topic.git.title': 'Aprendizaje de Git',
        'topic.git.subtitle': 'Control de versiones, ramas, colaboración y flujos seguros',
        'topic.assembly.title': 'Fundamentos de Ensamblador',
        'topic.assembly.subtitle': 'Registros, memoria y flujo de programa de bajo nivel',
        'topic.comingSoon.heading': 'Rutas Próximamente',
        'topic.comingSoon.label': 'Próximamente',
        'topic.comingSoon.toc.title': 'Teoría de la Computación',
        'topic.comingSoon.toc.subtitle': 'Autómatas, lenguajes formales, computabilidad y bases de complejidad',
        'topic.comingSoon.cpp.title': 'Ruta Dedicada de C++',
        'topic.comingSoon.cpp.subtitle': 'Fundamentos de C++, STL, modelo de memoria y resolución de problemas orientada al rendimiento',
        'topic.comingSoon.stats.title': 'Estadística para CS',
        'topic.comingSoon.stats.subtitle': 'Probabilidad, distribuciones, inferencia y toma de decisiones basada en datos',
        // Sections
        'section.dailyChallenge': '🔥 Desafío del Día',
        'section.studyTip': '🌟 Consejo de Estudio',
        'section.insights': 'Perspectivas de Estudio Personalizadas',
        'section.insightsSubtitle': 'Mantente al día con estadísticas en vivo, sugerencias de módulos y un compañero de enfoque integrado.',
        'section.expand': 'Expandir',
        'section.collapse': 'Colapsar',
        'insights.lock.badge': 'Cuenta Requerida',
        'insights.lock.title': 'Inicia sesión para desbloquear insights personalizados',
        'insights.lock.copy': 'Los análisis del panel, el impulso de enfoque y las recomendaciones personalizadas se habilitan después del inicio de sesión para sincronizar el progreso de forma segura.',
        'insights.lock.cta': 'Iniciar Sesión / Registrarse',
        'insights.lock.updates': 'Bloqueado hasta iniciar sesión',
        'insights.lock.status': 'Bloqueado',
        'insights.lock.sessionBtn': 'Inicia sesión para comenzar',
        'insights.lock.break': 'Inicia sesión para habilitar recordatorios',
        'interview.heading': '📂 Ejemplos de Entrevista',
        'interview.subtitle': 'Recorridos estilo LeetCode. Dos por página con copia rápida.',
        'interview.pages': 'Páginas',
        'interview.runSolution': 'Ejecutar solución',
        'interview.running': 'Ejecutando...',
        'interview.outputLabel': 'Salida',
        'interview.outputReady': 'Listo',
        'interview.outputLive': 'Ejecución en vivo',
        'interview.outputFallback': 'Salida de respaldo',
        'interview.outputError': 'Error de ejecución',
        'interview.outputPlaceholder': 'Ejecuta la solución de ejemplo para ver la salida.',
        'interview.runInWorkspace': 'Ejecutar en Workspace',
        'ds.heading': '🛠️ Playground de Código de Estructuras de Datos',
        'ds.subtitle': 'Interactúa con arreglos, pilas, colas, montículos, grafos y tries. Sigue estructura, punteros, línea de tiempo y complejidad en un solo lugar.',
        'ds.reset': 'Reiniciar playground',
        // Progress chip
        'progress.nowAt': 'Ahora en',
        // Achievements
        'achievements.heading': 'Logros de Aprendizaje',
        'achievements.currentBadge': 'Insignia actual',
        // Support
        'support.heading': '❤️ ¿Disfrutas este sitio web?',
        'support.subtitle': '¡Ayuda a mantener este recurso gratuito y actualizado con contenido nuevo cada semana!',
        // Asistente flotante
        'helper.badge': '💡 Guía Rápida',
        'helper.ariaLabel': 'Abrir guía rápida del sitio web',
        'helper.title': 'Guía Rápida del Sitio',
        'helper.subtitle': 'Un recorrido corto de lo que hace cada sección.',
        'helper.closeAria': 'Cerrar guía rápida del sitio web',
        'helper.goalTitle': 'Objetivo de CS Course Atlas',
        'helper.goalText': 'Ayudar a estudiantes de Ciencias de la Computación a aprender más rápido en múltiples clases con explicaciones claras, ejemplos ejecutables y herramientas guiadas de práctica.',
        'helper.startTitle': 'Empieza Aquí (3 pasos)',
        'helper.startChip': 'Inicio rápido',
        'helper.startStep1': 'Elige un Enfoque de Tema y abre el primer módulo de esa ruta.',
        'helper.startStep2': 'Usa el Playground de Código o de Estructuras para practicar de inmediato.',
        'helper.startStep3': 'Cierra con quiz + flashcards y marca el progreso como completado.',
        'helper.sectionModulesTitle': 'Módulos',
        'helper.sectionModulesText': 'Rutas de aprendizaje estructuradas con ejemplos de código, modo teoría (para discreta), definiciones y recursos.',
        'helper.sectionPlaygroundTitle': 'Playground de Código',
        'helper.sectionPlaygroundText': 'Ejecuta snippets de Java, C++, Python y JavaScript, prueba cambios e inspecciona la salida rápidamente.',
        'helper.sectionDataTitle': 'Playground de Código de Estructuras',
        'helper.sectionDataText': 'Visuales interactivos para arreglos, pilas, colas, montículos, grafos y tries con línea de tiempo de operaciones y vista de complejidad.',
        'helper.sectionPracticeTitle': 'Herramientas de Práctica',
        'helper.sectionPracticeText': 'Usa flashcards, cuestionarios interactivos, glosario y ejemplos de entrevista para reforzar conceptos.',
        'helper.sectionResourcesTitle': 'Biblioteca de Notas + Libros',
        'helper.sectionResourcesText': 'Usa la Biblioteca de Notas para guías rápidas y el área de Libros para referencias más largas que puedes leer o descargar.',
        'playground.gitReadOnly': 'Modo Git guiado (solo lectura)',
        'playground.gitReadOnlyHint': 'Las muestras de Git están bloqueadas para edición para que te enfoques en comandos de terminal y salida.',
        'helper.sectionProgressTitle': 'Progreso + Ajustes',
        'helper.sectionProgressText': 'Monitorea avance, personaliza ajustes de la interfaz y administra preferencias de cuenta/perfil.',
        'helper.workflowTitle': 'Flujo de Estudio Recomendado',
        'helper.workflowStep1': 'Aprende el concepto en un módulo y revisa las definiciones clave.',
        'helper.workflowStep2': 'Ejecuta/modifica código y verifica la salida.',
        'helper.workflowStep3': 'Fija el aprendizaje con quiz + flashcards.',
        'helper.workflowStep4': 'Guarda notas y marca progreso para mantener insights precisos.',
        'helper.closeBtn': 'Entendido',
        'books.heading': '📚 Biblioteca de Libros',
        'books.subtitle': 'Lee libros de referencia completos dentro del sitio o descárgalos para estudiar sin conexión.',
        'books.badge': 'Biblioteca de Referencia',
        'books.readerLabel': 'Lector de Libros',
        'books.closeReader': 'Cerrar Lector',
        'books.read': 'Leer en Sitio',
        'books.download': 'Descargar',
        'books.available': 'Disponible',
        'books.missing': 'No disponible en esta máquina',
        'books.empty': 'Aún no hay libros configurados.',
        'books.unavailable': 'El archivo del libro no está disponible en esta máquina.',
        'flashcards.nav.prev': 'Anterior',
        'flashcards.nav.next': 'Siguiente',
        // Footer
        'footer.kicker': 'Creado para estudiantes de Ciencias de la Computación',
        'footer.title': 'Centro de Aprendizaje CS Course Atlas',
        'footer.subtitle': 'Una plataforma de estudio multi-curso para DSA, Matemáticas Discretas, Java, Git, Ensamblador y flujos de práctica de código.',
        'footer.tag.multiCourse': 'Multi-curso',
        'footer.tag.handsOn': 'Práctica Activa',
        'footer.tag.bilingual': 'Amigable EN / ES',
        'footer.quick.flashcards': '🎯 Abrir Tarjetas',
        'footer.quick.quizzes': '🧠 Iniciar Quiz',
        'footer.quick.glossary': '📚 Ver Glosario',
        'footer.tools.title': '📖 Herramientas de Estudio',
        'footer.tools.flashcards': '🎯 Practicar Tarjetas',
        'footer.tools.glossary': '📚 Glosario de CS',
        'footer.tools.quizzes': '🧠 Cuestionarios Interactivos',
        'flashcards.deck.all': 'Todos los módulos (mezcla)',
        'flashcards.deck.topicGroup': 'Mazos por tema',
        'flashcards.deck.moduleGroup': 'Mazos por módulo',
        'flashcards.deck.topic.dsa': 'Ruta de DSA',
        'flashcards.deck.topic.discrete': 'Ruta de Matemática Discreta',
        'flashcards.deck.topic.java': 'Ruta de Java',
        'flashcards.deck.topic.git': 'Ruta de Git',
        'flashcards.deck.topic.assembly': 'Ruta de Ensamblador',
        'flashcards.deck.topic.locked': 'Completa quizzes de esta ruta para desbloquear',
        'flashcards.deck.topic.empty': 'Aún no hay tarjetas desbloqueadas en esta ruta. Completa quizzes de esta ruta para desbloquear más tarjetas.',
        'flashcards.deck.module.locked': 'Completa el quiz para desbloquear',
        'flashcards.deck.startPrompt': 'Elige un mazo para comenzar.',
        'footer.features.title': '🚀 Funciones Clave',
        'footer.features.one': '💬 Controles de Comentarios Individuales',
        'footer.features.two': '📝 Conversión a Pseudocódigo',
        'footer.features.three': '🛠️ Soporte Multi-Lenguaje',
        'footer.features.four': '📱 Diseño Optimizado para Móvil',
        'footer.features.five': '🌙 Soporte de Modo Oscuro',
        'footer.support.title': '💖 Apoya el Proyecto',
        'footer.support.copy': 'Hecho con dedicación para estudiantes de CS. Ayuda a mantener la plataforma gratuita y en mejora continua.',
        'footer.support.coffee': '☕ Café',
        'footer.support.sponsor': '💝 Patrocinar',
        'footer.bottom.author': 'Creado para estudiantes de CS por Eddy Arriaga-B',
        'footer.bottom.copyright': 'CS Course Atlas © 2024 | Código Abierto ❤️',
        // Settings modal
        'settings.title': '⚙️ Ajustes',
        'settings.subtitle': 'Personaliza tu experiencia de aprendizaje',
        'settings.appearance': 'Apariencia',
        'settings.darkMode': 'Modo Oscuro',
        'settings.bgTheme': 'Tema de Fondo',
        'settings.themeDefault': 'Degradado Predeterminado',
        'settings.themeOcean': 'Brisa del Océano',
        'settings.themeSunset': 'Resplandor del Atardecer',
        'settings.themeForest': 'Sendero del Bosque',
        'settings.themeMinimal': 'Luz Mínima',
        'settings.themeSpace': 'Noche Espacial',
        'settings.accentColor': 'Color de Acento',
        'settings.accentIndigo': 'Aurora Índigo',
        'settings.accentEmerald': 'Enfoque Esmeralda',
        'settings.accentAmber': 'Amanecer Ámbar',
        'settings.accentRose': 'Nebulosa Rosa',
        'settings.accentHint': 'Actualiza botones, resaltados y llamadas de atención al instante.',
        'settings.cardElevation': 'Elevación de Tarjetas',
        'settings.elevationFlat': 'Mínima (sombra baja)',
        'settings.elevationStandard': 'Equilibrada',
        'settings.elevationLifted': 'Elevada con Brillo',
        'settings.layout': 'Diseño',
        'settings.compactLayout': 'Diseño Compacto de Módulos',
        'settings.compactLayoutHint': 'Tarjetas más densas para pantallas anchas o multitarea.',
        'settings.textSize': 'Tamaño de Texto',
        'settings.textCompact': 'Compacto',
        'settings.textStandard': 'Estándar',
        'settings.textComfortable': 'Cómodo',
        'settings.textSpacious': 'Espacioso',
        'settings.textSizeHint': 'Se aplica globalmente para una lectura más fácil.',
        'settings.accessibility': 'Accesibilidad',
        'settings.reduceMotion': 'Reducir Movimiento',
        'settings.reduceMotionHint': 'Limita las animaciones para mayor enfoque y accesibilidad.',
        'settings.highContrast': 'Texto de Alto Contraste',
        'settings.highContrastHint': 'Aumenta el contraste del texto para mejor legibilidad.',
        'settings.learning': 'Aprendizaje',
        'settings.showComments': 'Mostrar Comentarios de Código',
        'settings.showCommentsHint': 'Cada módulo puede anular esta configuración.',
        'settings.hideCompleted': 'Ocultar Módulos Completados',
        'settings.hideCompletedHint': 'Mantén tu cuadrícula enfocada en lo que falta.',
        'settings.weeklyGoal': 'Meta Semanal de Módulos',
        'settings.goal3': '3 / semana · Ritmo constante',
        'settings.goal5': '5 / semana · Equilibrado',
        'settings.goal8': '8 / semana · Acelerado',
        'settings.goal12': '12 / semana · Sprint',
        'settings.weeklyGoalHint': 'Personaliza tus perspectivas de estudio y consejos de ritmo.',
        'settings.language': 'Idioma / Language',
        'settings.languageLabel': 'Idioma de la Interfaz',
        'settings.languageHint': 'Cambia entre español e inglés / Switch between Spanish and English.',
        'settings.save': '✓ Guardar y Cerrar',
        // Module card labels/tooltips
        'module.starterBanner': '⭐ Módulo inicial: primer paso recomendado para la mayoría',
        'module.topicsCovered': 'Temas cubiertos:',
        'module.codeExample': '💻 Ejemplo de código',
        'module.discreteTheory': '📘 Teoría de Matemáticas Discretas',
        'module.theoryMode': 'Modo Teoría',
        'module.learningResources': '📚 Recursos de aprendizaje:',
        'module.definitionsHeading': '📘 Definiciones Clave',
        'module.tooltipHideComments': 'Ocultar comentarios',
        'module.tooltipShowComments': 'Mostrar comentarios',
        'module.tooltipSelectLanguage': 'Seleccionar lenguaje de programación',
        'module.tooltipSelectMode': 'Seleccionar modo de código',
        'module.modeCode': 'Código',
        'module.modePseudocode': 'Pseudocódigo',
        'module.commentsOn': 'ACT',
        'module.commentsOff': 'DES',
        'module.collapse': '📄 Contraer',
        'module.expand': '📖 Expandir',
        'module.discreteModeLabel': 'Matemáticas Discretas',
        'module.examplesHeading': 'Ejemplos de Código por Tema',
        'module.hideExample': 'Ocultar Código',
        'module.showExample': 'Mostrar Código',
        'module.examplePreview': 'Vista previa',
        'module.truncateHint': '// ... (haz clic en Expandir para ver el código completo)',
        'module.showOutput': 'Salida',
        'module.hideOutput': 'Ocultar Salida',
        'module.outputHeading': 'Salida',
        'module.outputRunning': 'Ejecutando salida...',
        'module.outputSourceLive': 'En vivo',
        'module.outputSourceFallback': 'Respaldo',
        'module.outputAssemblyNote': 'Ensamblador es solo visual en las tarjetas del módulo. Mostrando salida esperada.',
        'module.outputUnavailableForMode': 'La salida solo está disponible en modo Código.'
    }
};

const SPANISH_LOCALIZATION = (typeof window !== 'undefined' && window.SPANISH_LOCALIZATION)
    ? window.SPANISH_LOCALIZATION
    : { content: {}, literals: {} };

const CONTENT_I18N = {
    es: SPANISH_LOCALIZATION.content || {}
};

const LITERAL_TRANSLATIONS = {
    es: SPANISH_LOCALIZATION.literals || {}
};

let domLocalizationObserver = null;

function interpolate(template, params = {}) {
    if (typeof template !== 'string') return template;
    return template.replace(/\{(\w+)\}/g, (_, key) => {
        const value = params[key];
        return value === undefined || value === null ? '' : String(value);
    });
}

function t(key, params = {}, lang = appState.language || 'en') {
    const active = TRANSLATIONS[lang] || TRANSLATIONS.en || {};
    const fallback = TRANSLATIONS.en || {};
    const template = active[key] ?? fallback[key] ?? key;
    return interpolate(template, params);
}

function tc(key, count, params = {}, lang = appState.language || 'en') {
    const suffix = count === 1 ? 'one' : 'other';
    const fullKey = `${key}.${suffix}`;
    const active = TRANSLATIONS[lang] || TRANSLATIONS.en || {};
    const fallback = TRANSLATIONS.en || {};
    const template = active[fullKey] ?? fallback[fullKey] ?? active[key] ?? fallback[key] ?? key;
    return interpolate(template, { ...params, count });
}

function translateLiteral(text, lang = appState.language || 'en') {
    if (lang !== 'es' || typeof text !== 'string') return text;
    const trimmed = text.trim();
    if (!trimmed) return text;
    const translated = LITERAL_TRANSLATIONS.es?.[trimmed];
    if (!translated) return text;
    return text.replace(trimmed, translated);
}

function localizeEntity(type, id, fallback = null, lang = appState.language || 'en') {
    if (lang === 'en') return fallback;
    const localized = CONTENT_I18N[lang]?.[type]?.[id];
    if (!localized) return fallback;
    if (!fallback || typeof fallback !== 'object') return localized;
    return { ...fallback, ...localized };
}

function resolveLocalizedValue(value, lang = appState.language || 'en') {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
        const candidate = value[lang] ?? value.en ?? Object.values(value)[0];
        return typeof candidate === 'string' ? candidate : '';
    }
    if (typeof value === 'string') {
        return lang === 'es' ? translateLiteral(value, 'es') : value;
    }
    return '';
}

function localizeLiteralAttributes(root, lang) {
    if (!root || !['es', 'en'].includes(lang)) return;
    const attrNames = ['placeholder', 'title', 'aria-label'];
    const nodes = root.querySelectorAll('*');
    nodes.forEach((el) => {
        attrNames.forEach((attr) => {
            const originalAttr = `data-i18n-orig-${attr}`;
            if (lang === 'es') {
                const value = el.getAttribute(attr);
                if (!value) return;
                if (!el.hasAttribute(originalAttr)) {
                    el.setAttribute(originalAttr, value);
                }
                const source = el.getAttribute(originalAttr) || value;
                const translated = translateLiteral(source, 'es');
                if (translated && translated !== value) {
                    el.setAttribute(attr, translated);
                }
            } else if (el.hasAttribute(originalAttr)) {
                el.setAttribute(attr, el.getAttribute(originalAttr) || '');
            }
        });
    });
}

function shouldSkipTextNode(node) {
    const parent = node?.parentElement;
    if (!parent) return true;
    if (parent.closest('script,style,code,pre')) return true;
    if (parent.isContentEditable) return true;
    return false;
}

function localizeLiteralTextNodes(root, lang) {
    if (!root || !['es', 'en'].includes(lang)) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    const nodes = [];
    while (walker.nextNode()) {
        nodes.push(walker.currentNode);
    }
    nodes.forEach((node) => {
        if (shouldSkipTextNode(node)) return;
        const value = node.nodeValue || '';
        if (!value.trim()) return;
        if (lang === 'es') {
            if (node.__i18nOriginalText === undefined) {
                node.__i18nOriginalText = value;
            }
            const source = node.__i18nOriginalText;
            node.nodeValue = translateLiteral(source, 'es');
        } else if (node.__i18nOriginalText !== undefined) {
            node.nodeValue = node.__i18nOriginalText;
        }
    });
}

function translateDomLiterals(lang) {
    const root = document.body;
    if (!root) return;
    localizeLiteralTextNodes(root, lang);
    localizeLiteralAttributes(root, lang);
}

function setDomLocalizationObserver(lang) {
    if (domLocalizationObserver) {
        domLocalizationObserver.disconnect();
        domLocalizationObserver = null;
    }
    if (lang !== 'es') return;
    domLocalizationObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach((node) => {
                    if (!(node instanceof HTMLElement)) return;
                    localizeLiteralTextNodes(node, 'es');
                    localizeLiteralAttributes(node, 'es');
                });
            } else if (mutation.type === 'characterData') {
                const node = mutation.target;
                if (!(node instanceof Text)) return;
                if (shouldSkipTextNode(node)) return;
                const currentValue = node.nodeValue || '';
                const currentOriginal = node.__i18nOriginalText;
                if (currentOriginal !== undefined && currentValue === translateLiteral(currentOriginal, 'es')) {
                    return;
                }
                node.__i18nOriginalText = currentValue;
                const translated = translateLiteral(currentValue, 'es');
                if (translated !== currentValue) {
                    node.nodeValue = translated;
                }
            }
        });
    });
    domLocalizationObserver.observe(document.body, { childList: true, characterData: true, subtree: true });
}

function refreshLocalizedSections() {
    if (typeof renderModules === 'function') renderModules();
    if (typeof renderDailyChallenge === 'function') renderDailyChallenge();
    if (typeof renderStudyTip === 'function') renderStudyTip();
    if (typeof renderInsights === 'function') renderInsights();
    if (typeof renderAchievements === 'function') renderAchievements();
    if (typeof renderGlossary === 'function') renderGlossary();
    if (typeof renderFlashcard === 'function') renderFlashcard();
    if (typeof renderInterviewExamples === 'function') renderInterviewExamples();
    if (typeof renderNotesLibrary === 'function') renderNotesLibrary();
    if (typeof renderBooksLibrary === 'function') renderBooksLibrary();
    if (typeof renderInteractiveQuizQuestion === 'function') renderInteractiveQuizQuestion();
    if (typeof renderQuiz === 'function') renderQuiz();
    if (typeof renderDSControls === 'function') renderDSControls();
    if (typeof updateDSView === 'function') updateDSView();
    renderSectionCollapsibles();
}

function normalizeCollapsedSections(input) {
    const normalized = { ...DEFAULT_COLLAPSED_SECTIONS };
    if (!input || typeof input !== 'object') return normalized;
    Object.keys(DEFAULT_COLLAPSED_SECTIONS).forEach((key) => {
        if (typeof input[key] === 'boolean') {
            normalized[key] = input[key];
        }
    });
    return normalized;
}

function getCollapsedSectionState(sectionKey) {
    if (!Object.prototype.hasOwnProperty.call(DEFAULT_COLLAPSED_SECTIONS, sectionKey)) {
        return false;
    }
    return appState.collapsedSections?.[sectionKey] ?? DEFAULT_COLLAPSED_SECTIONS[sectionKey];
}

function getCollapsibleSectionBodyElements(sectionKey) {
    const config = COLLAPSIBLE_SECTION_CONFIG[sectionKey];
    if (!config) return [];
    const container = document.querySelector(config.containerSelector);
    if (!container) return [];
    const elements = [];
    (config.bodySelectors || []).forEach((selector) => {
        container.querySelectorAll(selector).forEach((node) => {
            elements.push(node);
        });
    });
    return elements;
}

function updateSectionCollapseButton(sectionKey) {
    const button = document.querySelector(`.section-collapse-toggle[data-section-key="${sectionKey}"]`);
    if (!button) return;
    const collapsed = getCollapsedSectionState(sectionKey);
    const label = collapsed ? t('section.expand') : t('section.collapse');
    button.textContent = label;
    button.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
    button.setAttribute('data-state', collapsed ? 'collapsed' : 'expanded');
}

function applySectionCollapsedState(sectionKey) {
    const config = COLLAPSIBLE_SECTION_CONFIG[sectionKey];
    if (!config) return;
    const container = document.querySelector(config.containerSelector);
    if (!container) return;
    const collapsed = getCollapsedSectionState(sectionKey);
    container.classList.toggle('section-collapsed', collapsed);
    getCollapsibleSectionBodyElements(sectionKey).forEach((element) => {
        if (collapsed) {
            if (typeof element.dataset.collapsedDisplayValue === 'undefined') {
                element.dataset.collapsedDisplayValue = element.style.display || '';
            }
            element.style.display = 'none';
            element.setAttribute('aria-hidden', 'true');
            return;
        }

        if (typeof element.dataset.collapsedDisplayValue !== 'undefined') {
            element.style.display = element.dataset.collapsedDisplayValue;
            delete element.dataset.collapsedDisplayValue;
        } else {
            element.style.removeProperty('display');
        }
        element.removeAttribute('aria-hidden');
    });
    updateSectionCollapseButton(sectionKey);
}

function renderSectionCollapsibles() {
    Object.keys(COLLAPSIBLE_SECTION_CONFIG).forEach((sectionKey) => {
        applySectionCollapsedState(sectionKey);
    });
}

function toggleSectionCollapse(sectionKey) {
    if (!Object.prototype.hasOwnProperty.call(DEFAULT_COLLAPSED_SECTIONS, sectionKey)) return;
    if (!appState.collapsedSections || typeof appState.collapsedSections !== 'object') {
        appState.collapsedSections = { ...DEFAULT_COLLAPSED_SECTIONS };
    }
    appState.collapsedSections[sectionKey] = !getCollapsedSectionState(sectionKey);
    applySectionCollapsedState(sectionKey);
    saveToLocalStorage();
}

function initSectionCollapsibles() {
    appState.collapsedSections = normalizeCollapsedSections(appState.collapsedSections);
    document.querySelectorAll('.section-collapse-toggle[data-section-key]').forEach((button) => {
        if (button.dataset.boundCollapse === 'true') return;
        button.dataset.boundCollapse = 'true';
        const sectionKey = button.dataset.sectionKey;
        button.addEventListener('click', () => {
            toggleSectionCollapse(sectionKey);
        });
    });
    renderSectionCollapsibles();
}

/**
 * Apply the current language to all data-i18n elements.
 * Also supports attribute localization keys.
 */
function applyLanguage(lang) {
    lang = lang || appState.language || 'en';
    const table = TRANSLATIONS[lang] || TRANSLATIONS.en;

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (!table[key]) return;
        // For inputs / selects only update label-like containers, not the select itself
        if (el.tagName === 'OPTION') {
            el.textContent = table[key];
        } else if (el.tagName === 'SELECT') {
            // handled via option elements
        } else {
            el.textContent = table[key];
        }
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
        const key = el.getAttribute('data-i18n-placeholder');
        const value = table[key] || TRANSLATIONS.en?.[key];
        if (value) el.setAttribute('placeholder', value);
    });
    document.querySelectorAll('[data-i18n-title]').forEach((el) => {
        const key = el.getAttribute('data-i18n-title');
        const value = table[key] || TRANSLATIONS.en?.[key];
        if (value) el.setAttribute('title', value);
    });
    document.querySelectorAll('[data-i18n-aria-label]').forEach((el) => {
        const key = el.getAttribute('data-i18n-aria-label');
        const value = table[key] || TRANSLATIONS.en?.[key];
        if (value) el.setAttribute('aria-label', value);
    });

    // Update language toggle button states
    const enBtn = document.getElementById('lang-en-btn');
    const esBtn = document.getElementById('lang-es-btn');
    if (enBtn) enBtn.classList.toggle('active', lang === 'en');
    if (esBtn) esBtn.classList.toggle('active', lang === 'es');

    // Store on html element for CSS targeting if needed
    document.documentElement.setAttribute('data-lang', lang);
    document.documentElement.lang = lang;
    translateDomLiterals(lang);
    setDomLocalizationObserver(lang);
}

/**
 * Set language, persist, and apply.
 */
function setLanguage(lang) {
    appState.language = lang;
    appState.expandedOutputs.clear();
    moduleOutputCache.clear();
    moduleOutputState.clear();
    moduleOutputInFlight.clear();
    applyLanguage(lang);
    if (typeof updateProgress === 'function') updateProgress();
    refreshLocalizedSections();
    if (typeof window.refreshPlaygroundSnippetCatalog === 'function') {
        window.refreshPlaygroundSnippetCatalog();
    }
    if (typeof refreshFlashcardSession === 'function' && appState.selectedFlashcardModule) {
        refreshFlashcardSession(appState.selectedFlashcardModule, { persist: false });
    }
    saveToLocalStorage();
}

appState.flashcardSessionLength = FLASHCARD_SESSION_SIZE;

let studyMetrics = loadStudyMetrics();
let studyHabit = loadStudyHabit();
let studyTrackerInterval = null;
let accountProfile = loadAccountProfile();
let studyPlanState = loadStudyPlan();
let notesDraft = loadNotesDraft();

// =================================
// DATA
// =================================

// Flashcards Data
const baseFlashcards = [
    {
        id: 1,
        question: "What is the time complexity of accessing an element in an array by index?",
        answer: "O(1) - Constant time\n\nArrays provide direct access to elements using their index."
    },
    {
        id: 2,
        question: "What is the difference between Array and ArrayList in Java?",
        answer: "Array: Fixed size, can store primitives and objects\nArrayList: Dynamic size, stores only objects\n\nArray: int[] arr = new int[5];\nArrayList: ArrayList<Integer> list = new ArrayList<>();"
    },
    {
        id: 3,
        question: "Explain the Two Pointer technique with an example.",
        answer: "Use two pointers to scan data from both ends.\n\nExample: Check if a string is a palindrome.\nleft = 0, right = str.length - 1\nCompare and move inward.\n\nTime: O(n), Space: O(1)"
    },
    {
        id: 4,
        question: "What is a LinkedList and when to use it?",
        answer: "LinkedList stores elements as nodes with next pointers.\n\nUse when:\n• Frequent insert/delete\n• Unknown or changing size\n• No random access needed"
    },
    {
        id: 5,
        question: "How does Floyd’s Cycle Detection Algorithm work?",
        answer: "Use two pointers (slow and fast).\nIf there's a cycle, fast eventually meets slow.\nIf not, fast reaches null.\n\nUsed to detect loops in linked lists."
    },
    {
        id: 6,
        question: "Stack vs Queue?",
        answer: "Stack: LIFO (push/pop)\nQueue: FIFO (enqueue/dequeue)\n\nStack: Used in recursion, undo\nQueue: Used in BFS, scheduling"
    },
    {
        id: 7,
        question: "What is Big O notation?",
        answer: "Big O describes worst-case time/space complexity.\n\nExamples:\nO(1) - array access\nO(log n) - binary search\nO(n²) - nested loops"
    },
    {
        id: 8,
        question: "What is a Binary Search Tree (BST)?",
        answer: "Left < root < right\nAll subtrees are also BSTs\n\nAverage time: O(log n)\nWorst case (unbalanced): O(n)"
    },
    {
        id: 9,
        question: "What does the sliding window technique solve?",
        answer: "Efficient for subarray problems (like max sum of size k).\nMove a window across data and update result without restarting.\n\nTime: O(n)"
    },
    {
        id: 10,
        question: "What is the use of prefix sum arrays?",
        answer: "Helps in fast range sum queries.\n\nprefix[i] = sum(arr[0] to arr[i])\n\nTime: O(1) for range sum after O(n) setup"
    },
    {
        id: 11,
        question: "When to use a HashMap?",
        answer: "Use when you need fast key-based lookup.\nAverage Time: O(1) for get/put\n\nExample: Frequency counter"
    },
    {
        id: 12,
        question: "What is the purpose of dynamic programming?",
        answer: "Used to solve overlapping subproblems.\nStore results (memoization or tabulation)\n\nExample: Fibonacci, knapsack"
    },
    {
        id: 13,
        question: "What’s the difference between DFS and BFS?",
        answer: "DFS: Goes deep using stack/recursion\nBFS: Level-order using queue\n\nUsed for different types of graph exploration"
    },
    {
        id: 14,
        question: "What is a Heap?",
        answer: "Binary tree with parent-child ordering.\nMin Heap: parent ≤ children\nMax Heap: parent ≥ children\n\nUsed in Priority Queues"
    },
    {
        id: 15,
        question: "What is memoization?",
        answer: "Top-down DP approach.\nStore function call results in cache to avoid repeated work.\n\nUsed in recursion-heavy problems"
    },
    {
        id: 16,
        question: "What is tabulation?",
        answer: "Bottom-up DP approach.\nBuild solutions iteratively in a table.\nNo recursion needed."
    },
    {
        id: 17,
        question: "When is binary search used?",
        answer: "Used on sorted arrays/lists.\nTime: O(log n)\n\nSplit search space in half each time."
    },
    {
        id: 18,
        question: "How to reverse a linked list?",
        answer: "Use three pointers: prev, curr, next\nIterate and reverse the next pointers\n\nTime: O(n)"
    },
    {
        id: 19,
        question: "What’s the space and time of merge sort?",
        answer: "Time: O(n log n)\nSpace: O(n)\n\nIt’s stable and works well on linked lists"
    },
    {
        id: 20,
        question: "What is a Graph?",
        answer: "Set of nodes connected by edges\nCan be directed/undirected, weighted/unweighted\n\nUsed to model networks, maps, etc."
    },
    {
        id: 21,
        question: "What is a Trie?",
        answer: "Tree used for efficient string storage.\nCommon prefixes are shared.\nUsed in autocomplete and word search."
    },
    {
        id: 22,
        question: "How does quicksort work?",
        answer: "Pick pivot, partition elements\nRecursively sort partitions\n\nTime: Avg O(n log n), Worst O(n²)"
    },
    {
        id: 23,
        question: "What is backtracking?",
        answer: "Try a solution path, if it fails, go back and try another.\nUsed in puzzles, permutations, n-queens."
    },
    {
        id: 24,
        question: "What’s the difference between recursion and iteration?",
        answer: "Recursion: function calls itself\nIteration: uses loops\n\nRecursion is often cleaner but uses more stack space"
    },
    {
        id: 25,
        question: "What is a hash function?",
        answer: "Function that maps keys to indices\nUsed in hash tables\nShould minimize collisions"
    },
    {
        id: 26,
        question: "What is the best case and worst case for bubble sort?",
        answer: "Best: O(n) if already sorted\nWorst: O(n²) with many swaps"
    },
    {
        id: 27,
        question: "What’s a priority queue?",
        answer: "Queue where elements are removed by priority.\nOften implemented with heaps."
    },
    {
        id: 28,
        question: "What is the use of a Set in Java?",
        answer: "Stores unique elements.\nUseful for checking duplicates in O(1) time"
    },
    {
        id: 29,
        question: "What is a base case in recursion?",
        answer: "The stopping condition of a recursive function.\nWithout it, you get infinite recursion."
    },
    {
        id: 30,
        question: "What is the difference between == and .equals() in Java?",
        answer: "== compares references\n.equals() compares actual values"
    },
    {
        id: 31,
        question: "When to use TreeMap vs HashMap?",
        answer: "TreeMap keeps keys sorted (O(log n))\nHashMap is unordered (O(1))"
    },
    {
        id: 32,
        question: "What’s a balanced binary tree?",
        answer: "Tree where left and right subtrees of every node differ in height by at most 1"
    },
    {
        id: 33,
        question: "What’s the difference between call stack and heap?",
        answer: "Call stack: stores function calls\nHeap: stores dynamically allocated memory"
    },
    {
        id: 34,
        question: "What is tail recursion?",
        answer: "Recursive call is the last statement in the function.\nCan be optimized to use less stack"
    },
    {
        id: 35,
        question: "What’s the difference between BFS and Dijkstra?",
        answer: "BFS: for unweighted graphs\nDijkstra: for weighted graphs (no negative weights)"
    },
    {
        id: 36,
        question: "What is a sentinel node in linked lists?",
        answer: "Dummy node that simplifies insertions/deletions at head/tail."
    },
    {
        id: 37,
        question: "What is amortized analysis?",
        answer: "Average performance per operation over a sequence of operations"
    },
    {
        id: 38,
        question: "What’s the time complexity of hashmap operations?",
        answer: "Average: O(1)\nWorst-case (with collisions): O(n)"
    },
    {
        id: 39,
        question: "What is graph coloring?",
        answer: "Assign colors to vertices so no two adjacent vertices have the same color.\nUsed in scheduling problems"
    },
    {
        id: 40,
        question: "What is an adjacency matrix good for?",
        answer: "Fast edge lookup (O(1))\nNot space-efficient for sparse graphs"
    },
    {
        id: 41,
        question: "What are the properties of a Binary Search Tree?",
        answer: "Left < root < right\nNo duplicates\nSubtrees are also BSTs"
    },
    {
        id: 42,
        question: "What is the difference between pre-order, in-order, and post-order traversal?",
        answer: "Pre-order: root, left, right\nIn-order: left, root, right\nPost-order: left, right, root"
    },
    {
        id: 43,
        question: "What is topological sorting?",
        answer: "Linear ordering of nodes in a DAG so u comes before v for all edges u → v"
    },
    {
        id: 44,
        question: "What is a Disjoint Set Union (Union-Find)?",
        answer: "Tracks a set of elements split into disjoint groups.\nSupports union and find operations"
    },
    {
        id: 45,
        question: "What is path compression in Union-Find?",
        answer: "Optimization that flattens the structure of the tree to speed up future operations"
    },
    {
        id: 46,
        question: "What is a lazy update in Segment Trees?",
        answer: "Delays update propagation to improve performance in range updates"
    },
    {
        id: 47,
        question: "What’s the difference between min heap and max heap?",
        answer: "Min heap: smallest element at root\nMax heap: largest element at root"
    },
    {
        id: 48,
        question: "How to detect a cycle in a graph?",
        answer: "Use DFS with visited and recursion stack OR Union-Find"
    },
    {
        id: 49,
        question: "What’s the difference between a shallow copy and deep copy?",
        answer: "Shallow: copies reference\nDeep: copies entire object structure"
    },
    {
        id: 50,
        question: "What is the Knapsack problem?",
        answer: "Optimization problem to choose items with max value and weight <= capacity\nSolved with DP"
    }
];


// Glossary Data  
const glossaryTerms = [
    {
        term: "Algorithm",
        definition: "A step-by-step procedure or formula for solving a problem. Must be finite, definite, and effective.",
        category: "General"
    },
    {
        term: "Array",
        definition: "A data structure consisting of elements stored in contiguous memory locations, accessible by index.",
        category: "Data Structures"
    },
    {
        term: "Big O Notation",
        definition: "Mathematical notation describing the upper bound of algorithm complexity in terms of time or space.",
        category: "Complexity"
    },
    {
        term: "Binary Search",
        definition: "Efficient search algorithm for sorted arrays with O(log n) time complexity by repeatedly dividing search space in half.",
        category: "Algorithms"
    },
    {
        term: "Binary Tree",
        definition: "Hierarchical data structure where each node has at most two children (left and right).",
        category: "Data Structures"
    },
    {
        term: "Breadth-First Search (BFS)",
        definition: "Graph traversal algorithm that explores vertices level by level using a queue.",
        category: "Algorithms"
    },
    {
        term: "Depth-First Search (DFS)",
        definition: "Graph traversal algorithm that explores as far as possible along each branch using a stack or recursion.",
        category: "Algorithms"
    },
    {
        term: "Dynamic Programming",
        definition: "Problem-solving technique that breaks complex problems into simpler subproblems and stores results to avoid redundant calculations.",
        category: "Techniques"
    },
    {
        term: "Graph",
        definition: "Non-linear data structure consisting of vertices (nodes) connected by edges.",
        category: "Data Structures"
    },
    {
        term: "Hash Table",
        definition: "Data structure that implements associative array using hash function to compute index for key-value pairs.",
        category: "Data Structures"
    },
    {
        term: "Heap",
        definition: "Complete binary tree where parent nodes are ordered with respect to children (min-heap or max-heap).",
        category: "Data Structures"
    },
    {
        term: "Linked List",
        definition: "Linear data structure where elements are stored in nodes, each containing data and pointer to next node.",
        category: "Data Structures"
    },
    {
        term: "Queue",
        definition: "FIFO (First In, First Out) data structure with enqueue and dequeue operations.",
        category: "Data Structures"
    },
    {
        term: "Recursion",
        definition: "Programming technique where function calls itself with smaller input until reaching base case.",
        category: "Techniques"
    },
    {
        term: "Stack",
        definition: "LIFO (Last In, First Out) data structure with push and pop operations.",
        category: "Data Structures"
    },
    {
        term: "Time Complexity",
        definition: "Measure of execution time of algorithm as function of input size.",
        category: "Complexity"
    },
    {
        term: "Space Complexity",
        definition: "Measure of memory space required by algorithm as function of input size.",
        category: "Complexity"
    },
    {
        term: "Tree Traversal",
        definition: "Process of visiting each node in tree exactly once (inorder, preorder, postorder).",
        category: "Algorithms"
    },
    {
        term: "Two Pointers",
        definition: "Technique using two pointers to traverse data structure, often from opposite ends.",
        category: "Techniques"
    },
    {
        term: "Greedy Algorithm",
        definition: "Problem-solving approach that makes locally optimal choice at each step.",
        category: "Techniques"
    },
    {
        term: "Sorting Algorithm",
        definition: "Algorithm that rearranges elements in a certain order (e.g., ascending or descending).",
        category: "Algorithms"
    },
    {
        term: "Merge Sort",
        definition: "Divide-and-conquer sorting algorithm with O(n log n) time complexity in all cases.",
        category: "Algorithms"
    },
    {
        term: "Quick Sort",
        definition: "Efficient sorting algorithm that partitions array around pivot; average case O(n log n).",
        category: "Algorithms"
    },
    {
        term: "Bubble Sort",
        definition: "Simple sorting algorithm that repeatedly swaps adjacent elements if they’re in the wrong order.",
        category: "Algorithms"
    },
    {
        term: "Selection Sort",
        definition: "In-place sorting algorithm that repeatedly selects the minimum element and places it at the beginning.",
        category: "Algorithms"
    },
    {
        term: "Insertion Sort",
        definition: "Builds sorted array one element at a time by inserting items into their correct position.",
        category: "Algorithms"
    },
    {
        term: "Binary Heap",
        definition: "Binary tree where parent is smaller (min-heap) or larger (max-heap) than its children.",
        category: "Data Structures"
    },
    {
        term: "Floyd’s Cycle Detection",
        definition: "Algorithm that detects cycles in linked lists using two pointers moving at different speeds.",
        category: "Algorithms"
    },
    {
        term: "Adjacency List",
        definition: "Graph representation using lists where each node stores its neighboring nodes.",
        category: "Data Structures"
    },
    {
        term: "Adjacency Matrix",
        definition: "2D array used to represent a graph, where cells denote presence or absence of edges.",
        category: "Data Structures"
    },
    {
        term: "Bit Manipulation",
        definition: "Using bitwise operators (AND, OR, XOR, SHIFT) to solve problems efficiently.",
        category: "Techniques"
    },
    {
        term: "Prefix Sum",
        definition: "Array that stores cumulative sums to enable quick range sum queries.",
        category: "Techniques"
    },
    {
        term: "Memoization",
        definition: "Optimization that stores results of expensive function calls to avoid redundant computations.",
        category: "Techniques"
    },
    {
        term: "Tabulation",
        definition: "Bottom-up dynamic programming technique using iteration and storage of intermediate results.",
        category: "Techniques"
    },
    {
        term: "Trie",
        definition: "Prefix tree used for storing and searching strings efficiently.",
        category: "Data Structures"
    },
    {
        term: "Set",
        definition: "Unordered collection of unique elements with fast lookup, insertion, and deletion.",
        category: "Data Structures"
    },
    {
        term: "Map",
        definition: "Key-value pair data structure with efficient lookup and update operations.",
        category: "Data Structures"
    },
    {
        term: "Sliding Window",
        definition: "Technique that uses a window (range) over data to solve subarray or substring problems efficiently.",
        category: "Techniques"
    },
    {
        term: "Divide and Conquer",
        definition: "Algorithmic approach that breaks a problem into subproblems, solves each recursively, and combines results.",
        category: "Techniques"
    },
    {
        term: "Backtracking",
        definition: "Recursive technique that tries possible solutions and undoes changes when a path fails.",
        category: "Techniques"
    },
    {
        term: "AVL Tree",
        definition: "Self-balancing binary search tree where heights of left and right subtrees differ by at most one.",
        category: "Data Structures"
    },
    {
        term: "Red-Black Tree",
        definition: "Self-balancing binary search tree with color rules to maintain balance.",
        category: "Data Structures"
    },
    {
        term: "Splay Tree",
        definition: "Self-adjusting binary search tree that moves accessed elements to the root.",
        category: "Data Structures"
    },
    {
        term: "Union-Find",
        definition: "Disjoint set data structure that tracks element groupings and supports union and find operations.",
        category: "Data Structures"
    },
    {
        term: "Path Compression",
        definition: "Optimization in union-find to flatten tree structure for faster lookups.",
        category: "Techniques"
    },
    {
        term: "Topological Sort",
        definition: "Linear ordering of graph vertices such that for every edge u → v, u appears before v.",
        category: "Algorithms"
    },
    {
        term: "Minimum Spanning Tree (MST)",
        definition: "Subset of edges in a weighted graph that connects all vertices with minimum total weight.",
        category: "Algorithms"
    },
    {
        term: "Dijkstra’s Algorithm",
        definition: "Greedy algorithm to find the shortest path from a source to all vertices in a weighted graph.",
        category: "Algorithms"
    },
    {
        term: "Bellman-Ford Algorithm",
        definition: "Algorithm that computes shortest paths even with negative edge weights.",
        category: "Algorithms"
    },
    {
        term: "Kruskal’s Algorithm",
        definition: "Greedy algorithm to build a minimum spanning tree by sorting all edges by weight.",
        category: "Algorithms"
    },
    {
        term: "Prim’s Algorithm",
        definition: "Greedy algorithm that grows a minimum spanning tree from a starting node.",
        category: "Algorithms"
    }
];

const glossaryCategories = [
    'all',
    ...Array.from(new Set(glossaryTerms.map(term => term.category))).sort()
];


// Quiz Data
const quizData = {
    'arrays-strings': {
        parts: [{
            questions: [
                {
                    id: 1,
                    question: "What is the time complexity of accessing an element in an array by its index?",
                    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
                    correct: 0,
                    explanation: "Random access arrays compute the memory address via base + index × element_size, so lookup cost is constant."
                },
                {
                    id: 2,
                    question: "Which technique is most efficient for checking if a string is a palindrome?",
                    options: ["Reverse and compare", "Two pointers", "Recursion", "Stack-based approach"],
                    correct: 1,
                    explanation: "Two pointers toggled inward compare characters in O(n) time while keeping O(1) extra memory."
                },
                {
                    id: 3,
                    question: "Sliding window works best when:",
                    options: ["You need factorial permutations", "The subarray size or constraint can be updated incrementally", "Data is a tree", "The input is immutable"],
                    correct: 1,
                    explanation: "Sliding windows reuse previous work (add/remove elements) making contiguous-range problems linear rather than quadratic."
                }
            ]
        }]
    },
    'linked-lists': {
        parts: [{
            questions: [
                {
                    id: 1,
                    question: "Why can linked lists grow or shrink more easily than arrays?",
                    options: ["They use less memory", "Elements live on the heap and nodes connect via pointers", "They store indices", "They are cache-optimized"],
                    correct: 1,
                    explanation: "Each node is dynamically allocated and linked, so insertions/deletions adjust pointers without shifting contiguous memory."
                },
                {
                    id: 2,
                    question: "Floyd's cycle detection works because the fast pointer:",
                    options: ["Moves randomly", "Moves twice as fast and therefore laps the slow pointer in a cycle", "Starts at the cycle entry", "Checks node values"],
                    correct: 1,
                    explanation: "The fast pointer gains one node on the slow pointer each iteration, so they eventually meet if a loop exists."
                },
                {
                    id: 3,
                    question: "Reversing a singly linked list in-place requires:",
                    options: ["Three pointers to rewire next references iteratively", "Recursive stack only", "Changing head value only", "Doubly linked nodes"],
                    correct: 0,
                    explanation: "Prev/current/nextTemp allow you to redirect each node's next pointer while progressing through the list once."
                }
            ]
        }]
    },
    'stacks-queues': {
        parts: [{
            questions: [
                {
                    id: 1,
                    question: "Which data structure best validates balanced parentheses?",
                    options: ["Stack", "Queue", "Set", "Heap"],
                    correct: 0,
                    explanation: "A stack mirrors nesting depth—push for '(' and pop for ')'—so mismatches surface immediately."
                },
                {
                    id: 2,
                    question: "Why does BFS depend on FIFO order?",
                    options: ["It mimics recursion", "It must explore closest nodes first", "It sorts nodes", "It caches edges"],
                    correct: 1,
                    explanation: "Level-order exploration requires removing nodes in the same order they were discovered, which a queue guarantees."
                },
                {
                    id: 3,
                    question: "Implementing a queue with two stacks yields what amortized complexity for enqueue/dequeue?",
                    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
                    correct: 0,
                    explanation: "While elements occasionally move between stacks, each element is transferred at most twice, leading to amortized O(1)."
                }
            ]
        }]
    },
    'trees-basics': {
        parts: [{
            questions: [
                {
                    id: 1,
                    question: "The height of a binary tree equals:",
                    options: ["Total nodes", "Edges on the longest root-to-leaf path", "Number of leaves", "Depth of minimum node"],
                    correct: 1,
                    explanation: "Height measures the depth of the deepest leaf and dictates recursion depth and balance reasoning."
                },
                {
                    id: 2,
                    question: "In-order traversal of a BST yields:",
                    options: ["Random order", "Sorted ascending keys", "Post-order sequence", "Only leaf nodes"],
                    correct: 1,
                    explanation: "Left subtree < root < right subtree, so visiting them in that order produces sorted keys."
                },
                {
                    id: 3,
                    question: "A full binary tree is defined by:",
                    options: ["Every node has 0 or 2 children", "Perfect balance", "Only leaves at last level", "All nodes same value"],
                    correct: 0,
                    explanation: "Full trees forbid nodes with a single child, which helps when reasoning about structure or converting to arrays."
                }
            ]
        }]
    },
    'hash-tables': {
        parts: [{
            questions: [
                {
                    id: 1,
                    question: "The load factor of a hash table measures:",
                    options: ["Average probe length", "Entries divided by bucket count", "Number of collisions", "Memory usage"],
                    correct: 1,
                    explanation: "Load factor α = n / m drives when to resize; keeping α bounded retains O(1) average operations."
                },
                {
                    id: 2,
                    question: "Separate chaining stores collisions by:",
                    options: ["Linear probing", "Arrays of buckets stored on disk", "Secondary structures (lists/trees) per bucket", "Doubling key size"],
                    correct: 2,
                    explanation: "Each bucket points to a linked list or balanced tree containing all keys hashing to that bucket."
                },
                {
                    id: 3,
                    question: "Open addressing requires careful handling of deletes because:",
                    options: ["Memory leaks occur", "Removed slots break probe sequences unless marked as tombstones", "Load factor resets", "Keys resort automatically"],
                    correct: 1,
                    explanation: "Linear/quad probing relies on contiguous probes; marking deleted slots prevents search termination before real entries."
                }
            ]
        }]
    },
    'heaps': {
        parts: [{
            questions: [
                {
                    id: 1,
                    question: "A binary heap is stored efficiently in an array because:",
                    options: ["It sorts automatically", "Parent/child indices follow simple math (i→2i+1/2i+2)", "It needs pointers", "Heapify needs recursion"],
                    correct: 1,
                    explanation: "Heap nodes correspond to contiguous indices, so tree relationships derive from arithmetic rather than explicit references."
                },
                {
                    id: 2,
                    question: "Build-heap via bottom-up heapify runs in:",
                    options: ["O(n)", "O(n log n)", "O(log n)", "O(1)"],
                    correct: 0,
                    explanation: "Most nodes are near the leaves, so their heapify cost is small; summing costs yields linear time."
                },
                {
                    id: 3,
                    question: "Heaps underpin priority queues because they:",
                    options: ["Maintain strict sorting", "Allow fast retrieval and adjustment of highest-priority element", "Use BST rotations", "Guarantee O(1) deletion"],
                    correct: 1,
                    explanation: "The max/min sits at the root (O(1) access) and adjustments only traverse tree height (O(log n))."
                }
            ]
        }]
    },
    'sorting-algorithms': {
        parts: [{
            questions: [
                {
                    id: 1,
                    question: "Which algorithm is stable and always O(n log n)?",
                    options: ["Merge Sort", "Quick Sort", "Heap Sort", "Shell Sort"],
                    correct: 0,
                    explanation: "Merge sort splits/merges deterministically so runtime never degrades to quadratic and ties preserve order."
                },
                {
                    id: 2,
                    question: "Why does quick sort degrade on already sorted arrays with naive pivot choice?",
                    options: ["Recursion depth stays constant", "Partitions become unbalanced (n-1 vs 0 elements)", "Randomization fails", "It copies too much"],
                    correct: 1,
                    explanation: "Picking first or last element as pivot yields worst-case recursion depth n and total work O(n²)."
                },
                {
                    id: 3,
                    question: "Counting/Radix sorts beat comparison sorts when:",
                    options: ["Keys have bounded integer ranges or fixed digit count", "Data is unsorted text", "Floating numbers appear", "You need in-place sort"],
                    correct: 0,
                    explanation: "They leverage key structure instead of comparisons, achieving near O(n) time when the domain is limited."
                }
            ]
        }]
    },
    'searching-algorithms': {
        parts: [{
            questions: [
                {
                    id: 1,
                    question: "Binary search requires:",
                    options: ["Linked lists", "Sorted random-access collection", "Hash table", "Tree"],
                    correct: 1,
                    explanation: "Halving the search space depends on direct indexing; without sorted order halving is meaningless."
                },
                {
                    id: 2,
                    question: "Interpolation search excels when:",
                    options: ["Keys are uniformly distributed numbers", "Data is unsorted", "Strings contain duplicates", "You need recursion"],
                    correct: 0,
                    explanation: "The probe position is estimated proportional to value; uniform numeric distributions make this guess accurate."
                },
                {
                    id: 3,
                    question: "Exponential search is helpful because it:",
                    options: ["Avoids recursion", "Quickly finds bounds in infinite or unknown-length arrays before binary searching", "Sorts data", "Builds heaps"],
                    correct: 1,
                    explanation: "It doubles the index until the target is within range, then performs binary search inside that window."
                }
            ]
        }]
    },
    'recursion': {
        parts: [{
            questions: [
                {
                    id: 1,
                    question: "A base case prevents:",
                    options: ["Compilation errors", "Infinite recursion and stack overflow", "Tail-call optimization", "Caching"],
                    correct: 1,
                    explanation: "Without a terminating condition, calls never stop and the stack eventually exhausts memory."
                },
                {
                    id: 2,
                    question: "Recursion tree analysis helps by:",
                    options: ["Comparing algorithms to loops", "Visualizing how many subcalls occur at each level and summing total cost", "Reducing memory", "Guaranteeing optimality"],
                    correct: 1,
                    explanation: "Drawing branches per call clarifies total work, which is critical for Master Theorem intuition."
                },
                {
                    id: 3,
                    question: "Tail recursion allows compilers to:",
                    options: ["Parallelize automatically", "Reuse the same stack frame for the recursive call", "Skip base cases", "Memoize results"],
                    correct: 1,
                    explanation: "If the recursive call is the final action, the current frame need not persist, so optimized runtimes reuse it."
                }
            ]
        }]
    },
    'dynamic-programming': {
        parts: [{
            questions: [
                {
                    id: 1,
                    question: "Dynamic programming relies on:",
                    options: ["Independent subproblems", "Overlapping subproblems and optimal substructure", "Random choices", "Greedy proofs"],
                    correct: 1,
                    explanation: "DP caches solutions because subproblems repeat, and combining optimal sub-solutions yields a global optimum."
                },
                {
                    id: 2,
                    question: "Memoization differs from tabulation because it:",
                    options: ["Requires iteration", "Evaluates subproblems lazily via recursion and caching", "Uses more memory", "Needs sorted input"],
                    correct: 1,
                    explanation: "Top-down memoization only solves subproblems that appear, mirroring the recursive structure exactly."
                },
                {
                    id: 3,
                    question: "Identifying DP state involves:",
                    options: ["Finding loops", "Choosing variables that uniquely represent a subproblem", "Sorting arrays", "Optimizing constants"],
                    correct: 1,
                    explanation: "State dimensions encode parameters that differentiate subproblems; without clear state boundaries caching fails."
                }
            ]
        }]
    },
    'greedy-algorithms': {
        parts: [{
            questions: [
                {
                    id: 1,
                    question: "The greedy-choice property means:",
                    options: ["Choices are random", "A locally optimal choice leads to a globally optimal solution", "Problem uses DP", "Inputs are sorted"],
                    correct: 1,
                    explanation: "Only when local decisions never preclude optimality can a greedy approach be correct."
                },
                {
                    id: 2,
                    question: "Huffman coding is greedy because it:",
                    options: ["Uses recursion", "Repeatedly merges the two least frequent symbols to build an optimal prefix tree", "Sorts words lexicographically", "Requires dynamic programming"],
                    correct: 1,
                    explanation: "The algorithm always picks the cheapest two nodes to combine, and this strategy is provably optimal."
                },
                {
                    id: 3,
                    question: "Counterexamples are crucial when studying greedy algorithms because they:",
                    options: ["Prove algorithm works", "Demonstrate a single failing case invalidates correctness", "Improve runtime", "Reduce memory"],
                    correct: 1,
                    explanation: "Showing one input where greedy fails is enough to reject the algorithm for the general problem."
                }
            ]
        }]
    },
    'graph-algorithms': {
        parts: [{
            questions: [
                {
                    id: 1,
                    question: "Breadth-first search on an unweighted graph gives shortest paths because:",
                    options: ["It uses recursion", "It explores vertices in increasing distance from the source", "It stores parents", "It visits each vertex once"],
                    correct: 1,
                    explanation: "By expanding level by level via a queue, the first time you reach a node is the shortest path length."
                },
                {
                    id: 2,
                    question: "Dijkstra's algorithm fails with negative edges because:",
                    options: ["Heaps cannot store negatives", "A node may be finalized before discovering a cheaper path through a negative edge", "Graphs become cyclic", "It requires sorted edges"],
                    correct: 1,
                    explanation: "Once a vertex is extracted from the min-heap it's assumed optimal; negative edges can invalidate that assumption."
                },
                {
                    id: 3,
                    question: "Topological ordering exists only for:",
                    options: ["Undirected graphs", "Connected graphs", "Directed acyclic graphs", "Weighted trees"],
                    correct: 2,
                    explanation: "Any directed cycle makes it impossible to linearize edges such that prerequisites precede dependents."
                }
            ]
        }]
    },
    'propositional-logic-proofs': {
        parts: [{
            questions: [
                {
                    id: 1,
                    question: "A proposition in discrete math is:",
                    options: ["A sentence that is either true or false", "Any question with a variable", "A command", "A set of numbers"],
                    correct: 1,
                    explanation: "Propositions have definite truth values, which is the foundation for logical reasoning and proofs."
                },
                {
                    id: 2,
                    question: "Implication p → q is false only when:",
                    options: ["p is false and q is true", "p is true and q is false", "p and q are both true", "p and q are both false"],
                    correct: 1,
                    explanation: "An implication fails only when the premise is true but the conclusion is false."
                },
                {
                    id: 3,
                    question: "To prove a conditional statement, a common method is:",
                    options: ["Proof by contradiction", "Assume antecedent and derive consequent", "Counterexample search", "Truth table for one row only"],
                    correct: 1,
                    explanation: "Direct proof starts by assuming the hypothesis and logically deriving the conclusion."
                }
            ]
        }]
    },
    'sets-relations-functions': {
        parts: [{
            questions: [
                {
                    id: 1,
                    question: "For sets A and B, A ∩ B means:",
                    options: ["Elements in A or B", "Elements in both A and B", "Elements only in A", "Ordered pairs from A and B"],
                    correct: 1,
                    explanation: "Intersection keeps only elements common to both sets."
                },
                {
                    id: 2,
                    question: "A relation R on set A is:",
                    options: ["A subset of A × A", "A function from A to A only", "A prime number list", "Always symmetric"],
                    correct: 0,
                    explanation: "A relation on A is any subset of the Cartesian product A × A."
                },
                {
                    id: 3,
                    question: "A function f: A → B is injective when:",
                    options: ["Every b in B has a preimage", "Distinct inputs map to distinct outputs", "A equals B", "It is always surjective"],
                    correct: 1,
                    explanation: "Injective (one-to-one) functions never map two different domain elements to the same codomain element."
                }
            ]
        }]
    },
    'combinatorics-discrete-probability': {
        parts: [{
            questions: [
                {
                    id: 1,
                    question: "If order matters and repetition is not allowed, use:",
                    options: ["Combinations", "Permutations", "Power sets", "Partitions"],
                    correct: 1,
                    explanation: "Permutations count arrangements where position matters."
                },
                {
                    id: 2,
                    question: "The binomial coefficient C(n, k) counts:",
                    options: ["Ordered arrangements of k from n", "Ways to choose k items from n without order", "Prime numbers under n", "All subsets of size n"],
                    correct: 1,
                    explanation: "Combinations choose subsets where arrangement is irrelevant."
                },
                {
                    id: 3,
                    question: "For independent events A and B, P(A ∩ B) equals:",
                    options: ["P(A) + P(B)", "P(A) / P(B)", "P(A) × P(B)", "1 - P(A)"],
                    correct: 2,
                    explanation: "Independence means one event does not affect the other, so intersection probability multiplies."
                }
            ]
        }]
    },
    'tries': {
        parts: [{
            questions: [
                {
                    id: 1,
                    question: "Trie lookups depend on:",
                    options: ["Number of keys", "Length of the search string", "Hash values", "Balancing rotations"],
                    correct: 1,
                    explanation: "Operations traverse one level per character, so complexity is O(L) independent of stored key count."
                },
                {
                    id: 2,
                    question: "Edges in a trie typically represent:",
                    options: ["Whole words", "Single characters or digits", "Hash collisions", "Node depth"],
                    correct: 1,
                    explanation: "Each edge corresponds to the next symbol in a key, gradually spelling out stored entries."
                },
                {
                    id: 3,
                    question: "Word termination flags are required because:",
                    options: ["They speed up traversal", "Many keys share prefixes, so you need to mark where a valid word ends", "They ensure balance", "They compress memory"],
                    correct: 1,
                    explanation: "Without explicit end markers, prefixes couldn't represent keys distinct from longer words."
                }
            ]
        }]
    },
    'union-find': {
        parts: [{
            questions: [
                {
                    id: 1,
                    question: "Path compression improves which operation?",
                    options: ["Union", "Find", "Initialization", "Deletion"],
                    correct: 1,
                    explanation: "After a find, each node rewires directly to the root, flattening future traversals."
                },
                {
                    id: 2,
                    question: "Union by rank/size keeps trees shallow by:",
                    options: ["Sorting nodes", "Attaching the smaller tree beneath the larger root", "Randomly merging sets", "Rehashing elements"],
                    correct: 1,
                    explanation: "Always linking the shorter tree under the taller one limits height growth."
                },
                {
                    id: 3,
                    question: "Kruskal’s MST algorithm uses union-find to:",
                    options: ["Sort edges", "Detect when adding an edge would create a cycle", "Relax distances", "Count components"],
                    correct: 1,
                    explanation: "Before adding an edge, Kruskal checks whether its endpoints are already connected; union-find tracks that connectivity."
                }
            ]
        }]
    },
    'segment-trees': {
        parts: [{
            questions: [
                {
                    id: 1,
                    question: "Segment trees shine when you need:",
                    options: ["Only point queries", "Range queries/updates over an array in logarithmic time", "Graph traversal", "String parsing"],
                    correct: 1,
                    explanation: "Each node stores aggregate info for a range, so queries touch O(log n) segments."
                },
                {
                    id: 2,
                    question: "Lazy propagation allows you to:",
                    options: ["Delete nodes", "Defer pushing range updates to children until necessary", "Balance the tree", "Reduce depth"],
                    correct: 1,
                    explanation: "Instead of visiting all descendants immediately, lazy tags record pending updates, preserving O(log n) complexity."
                },
                {
                    id: 3,
                    question: "Building a segment tree from scratch costs:",
                    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
                    correct: 2,
                    explanation: "Each element contributes to O(1) nodes, resulting in linear construction time."
                }
            ]
        }]
    },
    'binary-indexed-trees': {
        parts: [{
            questions: [
                {
                    id: 1,
                    question: "Fenwick trees are ideal for:",
                    options: ["Graph adjacency", "Prefix sums and point updates in O(log n)", "Sorting strings", "Tree traversals"],
                    correct: 1,
                    explanation: "They maintain cumulative frequency using bit operations to jump between responsible nodes."
                },
                {
                    id: 2,
                    question: "The least significant set bit (LSB) is used to:",
                    options: ["Choose pivots", "Move to parent/child indices covering the next range chunk", "Check parity", "Compress data"],
                    correct: 1,
                    explanation: "Adding the LSB moves upward, subtracting moves downward along the implicit tree."
                },
                {
                    id: 3,
                    question: "Compared to segment trees, BITs are:",
                    options: ["Harder to code", "Simpler for 1D prefix problems but limited to certain operations", "Always faster", "More memory hungry"],
                    correct: 1,
                    explanation: "Fenwick trees excel for prefix aggregates and point updates but cannot handle arbitrary range updates without tweaks."
                }
            ]
        }]
    },
    'advanced-trees': {
        parts: [{
            questions: [
                {
                    id: 1,
                    question: "AVL trees maintain balance by ensuring:",
                    options: ["Red-black coloring", "Height difference between children is at most 1", "Keys remain sorted", "Root stays median"],
                    correct: 1,
                    explanation: "Each node stores heights; rotations restore the invariant when the difference exceeds one."
                },
                {
                    id: 2,
                    question: "Red-Black trees guarantee logarithmic height because:",
                    options: ["All nodes are black", "Every root-to-leaf path contains the same number of black nodes", "They use hashing", "They rebuild often"],
                    correct: 1,
                    explanation: "The black-height property ensures no path is more than twice as long as another."
                },
                {
                    id: 3,
                    question: "Splay trees are unique because they:",
                    options: ["Require coloring", "Move recently accessed nodes to the root via rotations", "Use heaps", "Need extra memory"],
                    correct: 1,
                    explanation: "Splaying promotes locality—frequently accessed nodes become easier to reach."
                }
            ]
        }]
    },
    'string-algorithms': {
        parts: [{
            questions: [
                {
                    id: 1,
                    question: "KMP avoids re-checking characters by:",
                    options: ["Hashing strings", "Using the LPS (longest prefix-suffix) table to know where to resume", "Sorting substrings", "Using recursion"],
                    correct: 1,
                    explanation: "When a mismatch occurs, the prefix table tells you the longest prefix equal to a suffix to continue matching efficiently."
                },
                {
                    id: 2,
                    question: "Rabin-Karp leverages rolling hashes to:",
                    options: ["Guarantee collision-free results", "Compare substring hashes in O(1) and verify only on matches", "Sort strings lexicographically", "Use tries"],
                    correct: 1,
                    explanation: "Efficient hash updates allow scanning multiple positions quickly while verifying when hashes match."
                },
                {
                    id: 3,
                    question: "Suffix arrays paired with LCP arrays help:",
                    options: ["Solve shortest path", "Find repeating substrings efficiently by checking adjacent suffixes' longest common prefixes", "Convert to tries", "Balance BSTs"],
                    correct: 1,
                    explanation: "Once suffixes are sorted, neighboring entries share large prefixes; the LCP array quantifies those lengths for queries."
                }
            ]
        }]
    },
    'assembly-registers-memory': {
        parts: [{
            questions: [
                {
                    id: 1,
                    question: "General-purpose CPU registers are primarily used to:",
                    options: ["Store disk files", "Hold values for fast arithmetic and address operations", "Render graphics only", "Replace RAM entirely"],
                    correct: 1,
                    explanation: "Registers are the fastest storage locations and feed ALU operations directly."
                },
                {
                    id: 2,
                    question: "Little-endian byte order stores the:",
                    options: ["Most significant byte first", "Least significant byte first", "Bytes in random order", "Only signed bytes"],
                    correct: 1,
                    explanation: "Little-endian layouts place the lowest-order byte at the lowest memory address."
                },
                {
                    id: 3,
                    question: "Addressing mode `base + offset` is commonly used for:",
                    options: ["Immediate constants", "Accessing stack/local variables", "Branch labels only", "Floating-point rounding"],
                    correct: 1,
                    explanation: "Stack frames and structured data are typically reached via a base register plus displacement."
                }
            ]
        }]
    },
    'assembly-control-flow-procedures': {
        parts: [{
            questions: [
                {
                    id: 1,
                    question: "A conditional jump in assembly executes when:",
                    options: ["The program ends", "Relevant status flags match the jump condition", "The stack is empty", "A register is zero by default"],
                    correct: 1,
                    explanation: "Instructions like `je`, `jne`, `jg`, and `jl` inspect flags set by prior compare/arithmetic instructions."
                },
                {
                    id: 2,
                    question: "A function prologue typically:",
                    options: ["Clears all memory", "Saves caller context and allocates stack frame space", "Jumps to interrupt vector", "Writes output to stdout"],
                    correct: 1,
                    explanation: "Common prologues push frame pointers/registers and reserve local stack storage."
                },
                {
                    id: 3,
                    question: "Calling conventions exist to:",
                    options: ["Speed up all loops automatically", "Standardize argument passing, return values, and register ownership", "Avoid using stacks", "Replace machine code"],
                    correct: 1,
                    explanation: "They let separately compiled functions interoperate safely by enforcing consistent call rules."
                }
            ]
        }]
    },
    'assembly-arrays-strings-io': {
        parts: [{
            questions: [
                {
                    id: 1,
                    question: "Iterating through an integer array in assembly usually increments the pointer by:",
                    options: ["1 byte always", "Element size in bytes", "Register count", "Stack depth"],
                    correct: 1,
                    explanation: "Pointer arithmetic must match element width (e.g., 4 bytes for 32-bit integers)."
                },
                {
                    id: 2,
                    question: "Null-terminated strings end with:",
                    options: ["Line feed", "Byte value 0", "Space character", "Return address"],
                    correct: 1,
                    explanation: "C-style strings use `0x00` as sentinel to mark the end of text."
                },
                {
                    id: 3,
                    question: "A basic output syscall/interrupt sequence needs:",
                    options: ["Only source code comments", "Proper syscall number plus argument registers/pointers", "No registers at all", "A hash map"],
                    correct: 1,
                    explanation: "System interfaces require ABI-defined registers (or stack args) for operation code and data pointers."
                }
            ]
        }]
    },
    'bit-manipulation': {
        parts: [{
            questions: [
                {
                    id: 1,
                    question: "Expression x & (-x) isolates:",
                    options: ["Most significant bit", "Least significant set bit", "Parity", "All ones"],
                    correct: 1,
                    explanation: "Two's complement negation flips bits and adds one, leaving only the lowest set bit when ANDed."
                },
                {
                    id: 2,
                    question: "XOR is handy for finding a single unique element because:",
                    options: ["It sorts values", "a ^ a = 0 so duplicates cancel, leaving the odd-occurring value", "It shifts bits", "It multiplies values"],
                    correct: 1,
                    explanation: "Pairing duplicates removes them from the accumulator, revealing the lone number."
                },
                {
                    id: 3,
                    question: "To set bit i of integer n you can:",
                    options: ["n &= ~(1 << i)", "n |= (1 << i)", "n ^= (1 << i)", "n >>= i"],
                    correct: 1,
                    explanation: "OR with a mask containing only bit i ensures that bit becomes 1 without affecting others."
                }
            ]
        }]
    },
    'git-basics-workflow': {
        parts: [{
            questions: [
                {
                    id: 1,
                    question: "In Git, what is the staging area (index) used for?",
                    options: ["Running tests automatically", "Selecting exactly which changes go into the next commit", "Storing remote branches only", "Rewriting old commits"],
                    correct: 1,
                    explanation: "The staging area lets you craft focused commits by choosing specific file changes before committing."
                },
                {
                    id: 2,
                    question: "Which command is the safest way to undo a bad commit already shared to the remote default branch?",
                    options: ["git reset --hard HEAD~1", "git revert <commit>", "git commit --amend", "git checkout -- ."],
                    correct: 1,
                    explanation: "git revert creates a new commit that undoes the old one without rewriting shared history."
                },
                {
                    id: 3,
                    question: "A common collaboration flow is:",
                    options: ["Commit directly to main for every change", "Create a branch, commit, push branch, then merge via PR", "Delete local history weekly", "Use merge conflicts to sync progress"],
                    correct: 1,
                    explanation: "Branch-based development isolates work, enables review, and keeps the main branch stable."
                }
            ]
        }]
    },
    'java-basics': {
        parts: [{
            questions: [
                {
                    id: 1,
                    question: "Java's char type stores:",
                    options: ["8-bit ASCII", "16-bit UTF-16 code units", "32-bit Unicode", "Only digits"],
                    correct: 1,
                    explanation: "char is an unsigned 16-bit value capable of representing UTF-16 units, enabling Unicode support."
                },
                {
                    id: 2,
                    question: "Java passes everything by:",
                    options: ["Reference", "Value (object references themselves are copied)", "Pointer arithmetic", "Copy-on-write"],
                    correct: 1,
                    explanation: "Even though objects are manipulated indirectly, the reference value is passed by value."
                },
                {
                    id: 3,
                    question: "The keyword final on a variable means:",
                    options: ["Immutable object", "Reference cannot be reassigned after initialization", "Static binding", "Thread-safe access"],
                    correct: 1,
                    explanation: "final stops reassignment; for objects it locks the reference, not the object's internal state."
                }
            ]
        }]
    },
    'control-flow': {
        parts: [{
            questions: [
                {
                    id: 1,
                    question: "The enhanced for-each loop cannot safely:",
                    options: ["Iterate arrays", "Remove elements while iterating", "Read values", "Handle collections"],
                    correct: 1,
                    explanation: "Modifying the underlying collection structure triggers ConcurrentModificationException; use iterators instead."
                },
                {
                    id: 2,
                    question: "Modern switch expressions (Java 14+) allow:",
                    options: ["Returning values via -> syntax", "Only integers", "Fallthrough by default", "Polymorphic dispatch"],
                    correct: 0,
                    explanation: "Switch expressions evaluate to a value, letting you assign results directly."
                },
                {
                    id: 3,
                    question: "A do-while loop differs because:",
                    options: ["It checks condition first", "It guarantees the body executes at least once", "It is faster", "It only works with ints"],
                    correct: 1,
                    explanation: "Condition evaluation occurs after the body, ensuring at least one iteration."
                }
            ]
        }]
    },
    'oop-basics': {
        parts: [{
            questions: [
                {
                    id: 1,
                    question: "Encapsulation means:",
                    options: ["Public fields only", "Bundling data and behavior with restricted access", "Multiple inheritance", "Runtime polymorphism"],
                    correct: 1,
                    explanation: "Objects hide their state by exposing controlled interfaces."
                },
                {
                    id: 2,
                    question: "Polymorphism lets you:",
                    options: ["Avoid inheritance", "Treat different subclass instances via a common supertype interface", "Optimize memory", "Disable overriding"],
                    correct: 1,
                    explanation: "Dynamic dispatch ensures the correct overridden method executes based on runtime type."
                },
                {
                    id: 3,
                    question: "final classes cannot be:",
                    options: ["Instantiated", "Subclassed", "Used", "Serialized"],
                    correct: 1,
                    explanation: "Marking a class final prevents other classes from extending it."
                }
            ]
        }]
    },
    'exception-handling': {
        parts: [{
            questions: [
                {
                    id: 1,
                    question: "Checked exceptions must be:",
                    options: ["Ignored", "Handled with try/catch or declared with throws", "Converted to runtime exceptions automatically", "Thrown only by JVM"],
                    correct: 1,
                    explanation: "The compiler enforces that checked exceptions are either caught or declared."
                },
                {
                    id: 2,
                    question: "Finally blocks execute except when:",
                    options: ["Return is used", "System.exit or catastrophic VM failure occurs", "Exception thrown", "Break executes"],
                    correct: 1,
                    explanation: "Normal path or exceptions still run finally, but VM termination prevents it."
                },
                {
                    id: 3,
                    question: "Try-with-resources automatically:",
                    options: ["Retries operations", "Closes AutoCloseable resources after the block even on exceptions", "Makes code faster", "Handles unchecked exceptions"],
                    correct: 1,
                    explanation: "Resources declared in the try statement are closed deterministically, reducing boilerplate."
                }
            ]
        }]
    },
    'collections-framework': {
        parts: [{
            questions: [
                {
                    id: 1,
                    question: "LinkedHashMap maintains:",
                    options: ["Sorted order", "Insertion order via a doubly linked list of entries", "Random iteration", "Thread safety"],
                    correct: 1,
                    explanation: "It combines a hash table with a linked list to preserve predictable iteration order."
                },
                {
                    id: 2,
                    question: "ArrayList is preferable to LinkedList when:",
                    options: ["Frequent head insertions occur", "Random access dominates operations", "Memory is tight", "You need lock-free behavior"],
                    correct: 1,
                    explanation: "ArrayList provides O(1) get/set while LinkedList must traverse nodes."
                },
                {
                    id: 3,
                    question: "ConcurrentHashMap scales by:",
                    options: ["Using a single global lock", "Segmenting buckets/using striped locks and allowing lock-free reads", "Copying on write", "Sorting keys"],
                    correct: 1,
                    explanation: "It minimizes contention by locking only portions of the map or using CAS for writes."
                }
            ]
        }]
    },
    'file-io': {
        parts: [{
            questions: [
                {
                    id: 1,
                    question: "Buffered streams speed IO because they:",
                    options: ["Encrypt data", "Batch reads/writes in memory, reducing system calls", "Use multithreading", "Skip disk"],
                    correct: 1,
                    explanation: "Fewer trips to the OS block device drastically reduce overhead."
                },
                {
                    id: 2,
                    question: "Try-with-resources is ideal for IO since it:",
                    options: ["Makes files optional", "Automatically closes streams even when exceptions occur", "Retries operations", "Caches bytes"],
                    correct: 1,
                    explanation: "Resources implementing AutoCloseable are cleaned up without manual finally blocks."
                },
                {
                    id: 3,
                    question: "The java.nio.file.Files utility provides:",
                    options: ["Database connections", "Modern path handling, metadata, and atomic move/copy helpers", "Network protocols", "Only synchronous IO"],
                    correct: 1,
                    explanation: "NIO's Files class includes convenience methods for interacting with the filesystem safely."
                }
            ]
        }]
    },
    'multithreading': {
        parts: [{
            questions: [
                {
                    id: 1,
                    question: "synchronized in Java ensures:",
                    options: ["Order of thread execution", "Mutual exclusion and visibility for a block/object monitor", "Faster code", "Automatic deadlock prevention"],
                    correct: 1,
                    explanation: "It acquires the intrinsic lock and establishes happens-before relationships."
                },
                {
                    id: 2,
                    question: "Executors simplify concurrency by:",
                    options: ["Eliminating threads", "Managing thread pools and decoupling task submission from execution", "Enforcing parallel streams", "Replacing interrupts"],
                    correct: 1,
                    explanation: "You submit Runnable/Callable tasks; the executor handles scheduling and lifecycle."
                },
                {
                    id: 3,
                    question: "volatile guarantees:",
                    options: ["Atomicity of compound actions", "Visibility/no reordering of reads and writes", "Lock-free algorithms", "Lower memory usage"],
                    correct: 1,
                    explanation: "volatile fields are read/written directly to main memory, preventing stale values."
                }
            ]
        }]
    },
    'design-patterns': {
        parts: [{
            questions: [
                {
                    id: 1,
                    question: "The Singleton pattern ensures:",
                    options: ["Multiple instances", "Exactly one instance with global access", "Loose coupling", "Observer behavior"],
                    correct: 1,
                    explanation: "It hides constructors and exposes a single accessor for the lone instance."
                },
                {
                    id: 2,
                    question: "Strategy pattern enables:",
                    options: ["Multiple inheritance", "Swapping algorithms at runtime via a common interface", "Event notification", "Adapting interfaces"],
                    correct: 1,
                    explanation: "Clients can inject different behavior objects without changing the context code."
                },
                {
                    id: 3,
                    question: "Observer pattern decouples components by:",
                    options: ["Sharing state globally", "Letting subjects publish events to subscribed observers", "Copying data", "Using inheritance"],
                    correct: 1,
                    explanation: "Observers register for updates and subjects notify them when state changes."
                }
            ]
        }]
    },
    'lambda-streams': {
        parts: [{
            questions: [
                {
                    id: 1,
                    question: "A functional interface contains:",
                    options: ["Multiple abstract methods", "Exactly one abstract method (plus optional defaults)", "No methods", "Only static methods"],
                    correct: 1,
                    explanation: "Single Abstract Method interfaces (SAM) are lambda compatible."
                },
                {
                    id: 2,
                    question: "Which stream operation is terminal?",
                    options: ["map", "filter", "collect", "peek"],
                    correct: 2,
                    explanation: "collect triggers evaluation and gathers results, closing the stream pipeline."
                },
                {
                    id: 3,
                    question: "Streams should not be reused because:",
                    options: ["They copy data", "Terminal operations consume them and mark them closed", "They leak memory", "They are slow"],
                    correct: 1,
                    explanation: "Once a terminal operation executes, further use throws IllegalStateException."
                }
            ]
        }]
    },
    'generics': {
        parts: [{
            questions: [
                {
                    id: 1,
                    question: "Type erasure means that:",
                    options: ["Generics persist at runtime", "Generic type info is removed during compilation and replaced with bounds/casts", "Generics cannot be nested", "Only primitives allowed"],
                    correct: 1,
                    explanation: "The JVM sees raw types; the compiler enforces type safety and inserts casts."
                },
                {
                    id: 2,
                    question: "The wildcard ? extends T allows you to:",
                    options: ["Insert arbitrary T values", "Read T or subclasses safely but not insert arbitrary values", "Modify list freely", "Use primitives"],
                    correct: 1,
                    explanation: "Producer Extends: treat the structure as a producer; writes are unsafe except null."
                },
                {
                    id: 3,
                    question: "Generic methods differ from generic classes because they:",
                    options: ["Require inheritance", "Declare their own type parameters independent of the class", "Only work in interfaces", "Need reflection"],
                    correct: 1,
                    explanation: "Method-level generics introduce <T> before the return type, enabling flexible reuse."
                }
            ]
        }]
    },
    'testing-junit': {
        parts: [{
            questions: [
                {
                    id: 1,
                    question: "@BeforeEach in JUnit 5 runs:",
                    options: ["Once per class", "Before every @Test to reset fixtures", "After tests", "Only on failure"],
                    correct: 1,
                    explanation: "Each test gets a fresh setup so state does not leak."
                },
                {
                    id: 2,
                    question: "assertThrows is used to:",
                    options: ["Compare objects", "Verify a lambda throws a specific exception type", "Skip tests", "Measure runtime"],
                    correct: 1,
                    explanation: "It ensures the provided executable raises the expected exception."
                },
                {
                    id: 3,
                    question: "Parameterized tests allow you to:",
                    options: ["Mock dependencies", "Run the same logic with multiple inputs from sources like @CsvSource", "Parallelize automatically", "Disable assertions"],
                    correct: 1,
                    explanation: "Junit feeds different argument sets to one test method, reducing duplication."
                }
            ]
        }]
    },
    'jdbc-basics': {
        parts: [{
            questions: [
                {
                    id: 1,
                    question: "Which JDBC object executes SQL statements?",
                    options: ["Connection", "Statement/PreparedStatement", "ResultSet", "DriverManager"],
                    correct: 1,
                    explanation: "PreparedStatement compiles SQL with parameters and sends it over an active Connection."
                },
                {
                    id: 2,
                    question: "Prepared statements help prevent SQL injection because they:",
                    options: ["Encrypt traffic", "Separate query structure from user parameters", "Use hashing", "Auto-escape strings"],
                    correct: 1,
                    explanation: "Parameters are bound, so input cannot alter the SQL command structure."
                },
                {
                    id: 3,
                    question: "Calling ResultSet.next() returns false when:",
                    options: ["Column is null", "Cursor moves past the last row", "Transaction commits", "Statement closes"],
                    correct: 1,
                    explanation: "next() advances the cursor; when there are no more rows it returns false."
                }
            ]
        }]
    }
};
// Modules Data (Complete with ALL LANGUAGES)
const modules = [
    {
        id: 'arrays-strings',
        title: 'Arrays and Strings',
        description: 'This walkthrough dissects the `findMax`, `reverseString`, and `isPalindrome` helpers so you can watch loops, boundary guards, and two-pointer swaps combine into real array/string utilities.',
        difficulty: 'beginner',
        topics: ['Array Traversal', 'String Methods', 'Two Pointers', 'Sliding Window', 'Array Sorting'],
        codeExamples: {
            java: `// Array and String fundamentals
public class ArraysAndStrings {
    
    // Find maximum element in array
    public static int findMax(int[] arr) {
        if (arr.length == 0) return Integer.MIN_VALUE;
        
        int max = arr[0]; // Initialize with first element
        for (int i = 1; i < arr.length; i++) {
            if (arr[i] > max) {
                max = arr[i]; // Update maximum
            }
        }
        return max;
    }
    
    // Reverse a string using two pointers
    public static String reverseString(String str) {
        char[] chars = str.toCharArray();
        int left = 0, right = chars.length - 1;
        
        while (left < right) {
            // Swap characters
            char temp = chars[left];
            chars[left] = chars[right];
            chars[right] = temp;
            
            left++;  // Move pointers toward center
            right--;
        }
        
        return new String(chars);
    }
    
    // Check if string is palindrome
    public static boolean isPalindrome(String str) {
        str = str.toLowerCase().replaceAll("[^a-z0-9]", "");
        int left = 0, right = str.length() - 1;
        
        while (left < right) {
            if (str.charAt(left) != str.charAt(right)) {
                return false; // Characters don't match
            }
            left++;
            right--;
        }
        return true; // All characters matched
    }
}`,
            cpp: `// Array and String fundamentals in C++
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <climits>

class ArraysAndStrings {
public:
    // Find maximum element in array
    static int findMax(const std::vector<int>& arr) {
        if (arr.empty()) return INT_MIN;
        
        int max = arr[0]; // Initialize with first element
        for (int i = 1; i < arr.size(); i++) {
            if (arr[i] > max) {
                max = arr[i]; // Update maximum
            }
        }
        return max;
    }
    
    // Reverse a string using two pointers
    static std::string reverseString(std::string str) {
        int left = 0, right = str.length() - 1;
        
        while (left < right) {
            // Swap characters
            std::swap(str[left], str[right]);
            
            left++;  // Move pointers toward center
            right--;
        }
        
        return str;
    }
    
    // Check if string is palindrome
    static bool isPalindrome(std::string str) {
        // Convert to lowercase and keep only alphanumeric
        std::string cleaned = "";
        for (char c : str) {
            if (std::isalnum(c)) {
                cleaned += std::tolower(c);
            }
        }
        
        int left = 0, right = cleaned.length() - 1;
        while (left < right) {
            if (cleaned[left] != cleaned[right]) {
                return false; // Characters don't match
            }
            left++;
            right--;
        }
        return true; // All characters matched
    }
};`,
            python: `# Array and String fundamentals in Python
def find_max(arr):
    """Find maximum element in array"""
    if not arr:
        return float('-inf')
    
    max_val = arr[0]  # Initialize with first element
    for num in arr[1:]:
        if num > max_val:
            max_val = num  # Update maximum
    return max_val

def reverse_string(s):
    """Reverse a string using slicing"""
    return s[::-1]  # Python's elegant slicing

def reverse_string_two_pointers(s):
    """Reverse using two pointers (more explicit)"""
    chars = list(s)
    left, right = 0, len(chars) - 1
    
    while left < right:
        # Swap characters
        chars[left], chars[right] = chars[right], chars[left]
        left += 1   # Move pointers toward center
        right -= 1
    
    return ''.join(chars)

def is_palindrome(s):
    """Check if string is palindrome"""
    # Clean string: lowercase and alphanumeric only
    cleaned = ''.join(char.lower() for char in s if char.isalnum())
    return cleaned == cleaned[::-1]  # Compare with reverse

def is_palindrome_two_pointers(s):
    """Check palindrome using two pointers"""
    cleaned = ''.join(char.lower() for char in s if char.isalnum())
    left, right = 0, len(cleaned) - 1
    
    while left < right:
        if cleaned[left] != cleaned[right]:
            return False  # Characters don't match
        left += 1
        right -= 1
    
    return True  # All characters matched`,
            javascript: `// Array and String fundamentals in JavaScript
class ArraysAndStrings {
    
    // Find maximum element in array
    static findMax(arr) {
        if (arr.length === 0) return -Infinity;
        
        let max = arr[0]; // Initialize with first element
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] > max) {
                max = arr[i]; // Update maximum
            }
        }
        return max;
    }
    
    // Reverse a string using two pointers
    static reverseString(str) {
        const chars = str.split('');
        let left = 0, right = chars.length - 1;
        
        while (left < right) {
            // Swap characters
            [chars[left], chars[right]] = [chars[right], chars[left]];
            
            left++;  // Move pointers toward center
            right--;
        }
        
        return chars.join('');
    }
    
    // Check if string is palindrome
    static isPalindrome(str) {
        // Clean string: lowercase and alphanumeric only
        const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
        let left = 0, right = cleaned.length - 1;
        
        while (left < right) {
            if (cleaned[left] !== cleaned[right]) {
                return false; // Characters don't match
            }
            left++;
            right--;
        }
        return true; // All characters matched
    }
}

// Alternative functional approach
const findMaxFunctional = arr => arr.length === 0 ? -Infinity : Math.max(...arr);
const reverseStringFunctional = str => str.split('').reverse().join('');
const isPalindromeFunctional = str => {
    const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
    return cleaned === cleaned.split('').reverse().join('');
};`
        },
        explanation: `Arrays and strings form the foundation of programming. Arrays provide indexed access to elements, while strings are sequences of characters. Key concepts include traversal patterns, the two-pointer technique for efficient processing, and understanding how memory layout affects performance. These data structures appear in countless real-world applications.`,
        resources: [
            'JUnit 5 Guide',  // Plain text
            {
                text: 'Official JUnit Documentation',
                url: 'youtube.com'
            },
            'Test Driven Development',  // Plain text
            {
                text: 'Martin Fowler - Test Pyramid',
                url: 'https://martinfowler.com/articles/practical-test-pyramid.html'
            }
        ],
    },
    {
        id: 'linked-lists',
        title: 'Linked Lists',
        description: 'We narrate every pointer move in `reverseList`, `hasCycle`, and `mergeTwoLists`, showing how temp nodes, tortoise–hare detection, and dummy heads keep lists consistent.',
        difficulty: 'intermediate',
        topics: ['Singly Linked Lists', 'Doubly Linked Lists', 'Cycle Detection', 'List Reversal', 'Merge Operations'],
        codeExamples: {
            java: `// Linked List implementation and operations
class ListNode {
    int val;
    ListNode next;
    
    ListNode(int val) {
        this.val = val;
        this.next = null;
    }
}

public class LinkedListOperations {
    
    // Reverse a linked list iteratively
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode current = head;
        
        while (current != null) {
            ListNode nextTemp = current.next; // Store next node
            current.next = prev;              // Reverse link
            prev = current;                   // Move prev forward
            current = nextTemp;               // Move current forward
        }
        
        return prev; // New head of reversed list
    }
    
    // Detect cycle using Floyd's algorithm (tortoise and hare)
    public boolean hasCycle(ListNode head) {
        if (head == null || head.next == null) {
            return false;
        }
        
        ListNode slow = head;      // Tortoise: moves 1 step
        ListNode fast = head.next; // Hare: moves 2 steps
        
        while (fast != null && fast.next != null) {
            if (slow == fast) {
                return true; // Cycle detected
            }
            slow = slow.next;
            fast = fast.next.next;
        }
        
        return false; // No cycle found
    }
    
    // Merge two sorted linked lists
    public ListNode mergeTwoLists(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(0); // Dummy node for easy handling
        ListNode current = dummy;
        
        while (l1 != null && l2 != null) {
            if (l1.val <= l2.val) {
                current.next = l1;
                l1 = l1.next;
            } else {
                current.next = l2;
                l2 = l2.next;
            }
            current = current.next;
        }
        
        // Attach remaining nodes
        current.next = (l1 != null) ? l1 : l2;
        
        return dummy.next; // Return actual head
    }
}`,
            cpp: `// Linked List implementation and operations in C++
#include <iostream>

struct ListNode {
    int val;
    ListNode* next;
    
    ListNode(int x) : val(x), next(nullptr) {}
};

class LinkedListOperations {
public:
    // Reverse a linked list iteratively
    ListNode* reverseList(ListNode* head) {
        ListNode* prev = nullptr;
        ListNode* current = head;
        
        while (current != nullptr) {
            ListNode* nextTemp = current->next; // Store next node
            current->next = prev;               // Reverse link
            prev = current;                     // Move prev forward
            current = nextTemp;                 // Move current forward
        }
        
        return prev; // New head of reversed list
    }
    
    // Detect cycle using Floyd's algorithm (tortoise and hare)
    bool hasCycle(ListNode* head) {
        if (head == nullptr || head->next == nullptr) {
            return false;
        }
        
        ListNode* slow = head;       // Tortoise: moves 1 step
        ListNode* fast = head->next; // Hare: moves 2 steps
        
        while (fast != nullptr && fast->next != nullptr) {
            if (slow == fast) {
                return true; // Cycle detected
            }
            slow = slow->next;
            fast = fast->next->next;
        }
        
        return false; // No cycle found
    }
    
    // Merge two sorted linked lists
    ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
        ListNode dummy(0); // Dummy node for easy handling
        ListNode* current = &dummy;
        
        while (l1 != nullptr && l2 != nullptr) {
            if (l1->val <= l2->val) {
                current->next = l1;
                l1 = l1->next;
            } else {
                current->next = l2;
                l2 = l2->next;
            }
            current = current->next;
        }
        
        // Attach remaining nodes
        current->next = (l1 != nullptr) ? l1 : l2;
        
        return dummy.next; // Return actual head
    }
};`,
            python: `# Linked List implementation and operations in Python
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class LinkedListOperations:
    
    def reverse_list(self, head):
        """Reverse a linked list iteratively"""
        prev = None
        current = head
        
        while current:
            next_temp = current.next  # Store next node
            current.next = prev       # Reverse link
            prev = current           # Move prev forward
            current = next_temp      # Move current forward
        
        return prev  # New head of reversed list
    
    def has_cycle(self, head):
        """Detect cycle using Floyd's algorithm (tortoise and hare)"""
        if not head or not head.next:
            return False
        
        slow = head       # Tortoise: moves 1 step
        fast = head.next  # Hare: moves 2 steps
        
        while fast and fast.next:
            if slow == fast:
                return True  # Cycle detected
            slow = slow.next
            fast = fast.next.next
        
        return False  # No cycle found
    
    def merge_two_lists(self, l1, l2):
        """Merge two sorted linked lists"""
        dummy = ListNode(0)  # Dummy node for easy handling
        current = dummy
        
        while l1 and l2:
            if l1.val <= l2.val:
                current.next = l1
                l1 = l1.next
            else:
                current.next = l2
                l2 = l2.next
            current = current.next
        
        # Attach remaining nodes
        current.next = l1 if l1 else l2
        
        return dummy.next  # Return actual head`,
            javascript: `// Linked List implementation and operations in JavaScript
class ListNode {
    constructor(val = 0, next = null) {
        this.val = val;
        this.next = next;
    }
}

class LinkedListOperations {
    
    // Reverse a linked list iteratively
    reverseList(head) {
        let prev = null;
        let current = head;
        
        while (current !== null) {
            const nextTemp = current.next; // Store next node
            current.next = prev;           // Reverse link
            prev = current;                // Move prev forward
            current = nextTemp;            // Move current forward
        }
        
        return prev; // New head of reversed list
    }
    
    // Detect cycle using Floyd's algorithm (tortoise and hare)
    hasCycle(head) {
        if (!head || !head.next) {
            return false;
        }
        
        let slow = head;      // Tortoise: moves 1 step
        let fast = head.next; // Hare: moves 2 steps
        
        while (fast && fast.next) {
            if (slow === fast) {
                return true; // Cycle detected
            }
            slow = slow.next;
            fast = fast.next.next;
        }
        
        return false; // No cycle found
    }
    
    // Merge two sorted linked lists
    mergeTwoLists(l1, l2) {
        const dummy = new ListNode(0); // Dummy node for easy handling
        let current = dummy;
        
        while (l1 && l2) {
            if (l1.val <= l2.val) {
                current.next = l1;
                l1 = l1.next;
            } else {
                current.next = l2;
                l2 = l2.next;
            }
            current = current.next;
        }
        
        // Attach remaining nodes
        current.next = l1 || l2;
        
        return dummy.next; // Return actual head
    }
}`
        },
        explanation: `Linked lists provide dynamic memory allocation and efficient insertion/deletion at any position. Unlike arrays, they don\'t require contiguous memory but sacrifice random access. Understanding pointer manipulation and edge cases (null checks, single nodes) is crucial for mastering linked list algorithms.`,
        resources: ['Linked List Visualization', 'Floyd\'s Cycle Detection', 'Pointer Manipulation Guide']
    },
    // Additional modules (blank templates as in original)
    {
        id: 'stacks-queues',
        title: 'Stacks and Queues',
        description: 'The `ArrayStack` and `ArrayQueue` wrappers expose each push/pop/peek and enqueue/dequeue call so you can see how ArrayDeque underpins both LIFO and FIFO flows in `main`.',
        difficulty: 'beginner',
        topics: ['Stack Operations', 'Queue Operations', 'Deque', 'Priority Queue', 'Applications'],
        codeExample: `// Simple Stack and Queue implementations in Java
import java.util.ArrayDeque;
import java.util.NoSuchElementException;

class ArrayStack<E> {
    private final ArrayDeque<E> data = new ArrayDeque<>();

    public void push(E value) {
        data.push(value); // O(1)
    }

    public E pop() {
        if (data.isEmpty()) throw new NoSuchElementException("Stack empty");
        return data.pop();
    }

    public E peek() {
        return data.peek();
    }
}

class ArrayQueue<E> {
    private final ArrayDeque<E> data = new ArrayDeque<>();

    public void enqueue(E value) {
        data.offer(value); // adds to tail
    }

    public E dequeue() {
        if (data.isEmpty()) throw new NoSuchElementException("Queue empty");
        return data.poll(); // removes from head
    }

    public int size() {
        return data.size();
    }
}

public class StackQueueDemo {
    public static void main(String[] args) {
        ArrayStack<Integer> stack = new ArrayStack<>();
        stack.push(10);
        stack.push(20);
        System.out.println("Stack peek: " + stack.peek()); // 20
        System.out.println("Stack pop: " + stack.pop());   // 20

        ArrayQueue<String> queue = new ArrayQueue<>();
        queue.enqueue("Alice");
        queue.enqueue("Bob");
        System.out.println("Queue dequeue: " + queue.dequeue()); // Alice
        System.out.println("Queue size: " + queue.size());       // 1
    }
}`,
        explanation: `Stacks model LIFO flows used in call stacks, undo buffers, and expression evaluation, while queues deliver FIFO order for schedulers, BFS, and streaming pipelines. This lesson contrasts their implementations (array vs. linked), explains amortized push/pop/enqueue costs, and walks through real interview problems like balanced parentheses, sliding windows, and task queues.`,
        resources: ['Stack Applications', 'Queue Implementations']
    },
    {
        id: 'trees-basics',
        title: 'Binary Trees',
        description: 'Follow `insertRecursive`, `inorder`, and `levelOrderTraversal` to see how the BST is built, how DFS prints sorted values, and how a queue drives breadth-first output.',
        difficulty: 'intermediate',
        topics: ['Tree Traversal', 'Binary Search Trees', 'Tree Height', 'Path Problems', 'Tree Construction'],
        codeExample: `// Binary tree traversals and insert in Java
class TreeNode {
    int value;
    TreeNode left;
    TreeNode right;

    TreeNode(int value) {
        this.value = value;
    }
}

public class BinaryTree {
    TreeNode root;

    public void insert(int value) {
        root = insertRecursive(root, value);
    }

    private TreeNode insertRecursive(TreeNode node, int value) {
        if (node == null) {
            return new TreeNode(value);
        }
        if (value < node.value) {
            node.left = insertRecursive(node.left, value);
        } else if (value > node.value) {
            node.right = insertRecursive(node.right, value);
        }
        return node;
    }

    public void inorder(TreeNode node) {
        if (node == null) return;
        inorder(node.left);
        System.out.print(node.value + " ");
        inorder(node.right);
    }

    public void levelOrderTraversal() {
        java.util.Queue<TreeNode> queue = new java.util.LinkedList<>();
        queue.offer(root);
        while (!queue.isEmpty()) {
            TreeNode current = queue.poll();
            System.out.print(current.value + " ");
            if (current.left != null) queue.offer(current.left);
            if (current.right != null) queue.offer(current.right);
        }
    }

    public static void main(String[] args) {
        BinaryTree bst = new BinaryTree();
        int[] values = {8, 3, 10, 1, 6, 14, 4};
        for (int value : values) {
            bst.insert(value);
        }
        System.out.print("Inorder: ");
        bst.inorder(bst.root); // 1 3 4 6 8 10 14
        System.out.print("\\nLevel order: ");
        bst.levelOrderTraversal();
    }
}`,
        explanation: `You will practice building binary trees from traversal lists, executing DFS traversals iteratively, and reasoning about height and balance. The section also demystifies BST invariants, common recursion templates, and how to restructure trees for path-sum, diameter, and serialization problems.`,
        resources: ['Tree Traversals', 'BST Operations']
    },
    {
        id: 'hash-tables',
        title: 'Hash Tables and Maps',
        description: 'We count characters with `HashMap.merge` and then peel back a custom `SimpleHashTable` that hashes keys, stores chained entries, and resolves collisions bucket by bucket.',
        difficulty: 'intermediate',
        topics: ['Hash Functions', 'Collision Resolution', 'HashMap Operations', 'Hash Sets', 'Load Factor'],
        codeExample: `// Frequency counter using HashMap and simple custom hash table
import java.util.*;

public class HashTableDemo {
    public static Map<Character, Integer> countLetters(String word) {
        Map<Character, Integer> frequency = new HashMap<>();
        for (char c : word.toCharArray()) {
            frequency.merge(c, 1, Integer::sum);
        }
        return frequency;
    }

    static class SimpleHashTable {
        private static class Entry {
            final String key;
            String value;
            Entry(String key, String value) {
                this.key = key;
                this.value = value;
            }
        }
        private final List<List<Entry>> buckets;

        SimpleHashTable(int capacity) {
            buckets = new ArrayList<>(capacity);
            for (int i = 0; i < capacity; i++) {
                buckets.add(new ArrayList<>());
            }
        }

        private int hash(String key) {
            return Math.abs(key.hashCode()) % buckets.size();
        }

        public void put(String key, String value) {
            int bucketIndex = hash(key);
            List<Entry> bucket = buckets.get(bucketIndex);
            for (Entry entry : bucket) {
                if (entry.key.equals(key)) {
                    entry.value = value;
                    return;
                }
            }
            bucket.add(new Entry(key, value));
        }

        public Optional<String> get(String key) {
            int bucketIndex = hash(key);
            for (Entry entry : buckets.get(bucketIndex)) {
                if (entry.key.equals(key)) {
                    return Optional.of(entry.value);
                }
            }
            return Optional.empty();
        }
    }

    public static void main(String[] args) {
        System.out.println(countLetters(\"datastructures\")); // {a=2, d=1, ...}

        SimpleHashTable table = new SimpleHashTable(8);
        table.put(\"java\", \"Coffee language\");
        table.put(\"python\", \"Snake language\");
        System.out.println(table.get(\"java\").orElse(\"Not found\")); // Coffee language
    }
}`,
        explanation: `We cover how good hash functions minimize collisions, why load factor matters, and when to choose chaining vs. open addressing. Practical labs include frequency maps, LRU caches, and dictionary-based deduplication so you can confidently use HashMap/HashSet in coding interviews.`,
        resources: ['Hash Function Design', 'Collision Handling']
    },
    {
        id: 'heaps',
        title: 'Heaps and Priority Queues',
        description: 'First `priorityQueueDemo` shows the library min-heap, then `heapify`/`buildMinHeap` rebuild the structure from an array so you can trace index math, swaps, and bottom-up heap construction.',
        difficulty: 'intermediate',
        topics: ['Min Heap', 'Max Heap', 'Heap Operations', 'Heapify', 'Priority Queues'],
        codeExample: `// Min-heap using PriorityQueue plus manual heapify
import java.util.Arrays;
import java.util.PriorityQueue;

public class HeapExamples {
    public static void priorityQueueDemo() {
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        minHeap.addAll(Arrays.asList(7, 3, 10, 4));

        while (!minHeap.isEmpty()) {
            System.out.print(minHeap.poll() + \" \"); // 3 4 7 10
        }
        System.out.println();
    }

    public static void heapify(int[] arr, int i, int n) {
        int smallest = i;
        int left = 2 * i + 1;
        int right = 2 * i + 2;

        if (left < n && arr[left] < arr[smallest]) smallest = left;
        if (right < n && arr[right] < arr[smallest]) smallest = right;

        if (smallest != i) {
            int temp = arr[i];
            arr[i] = arr[smallest];
            arr[smallest] = temp;
            heapify(arr, smallest, n);
        }
    }

    public static void buildMinHeap(int[] arr) {
        for (int i = arr.length / 2 - 1; i >= 0; i--) {
            heapify(arr, i, arr.length);
        }
    }

    public static void main(String[] args) {
        priorityQueueDemo();

        int[] arr = {9, 5, 6, 2, 3};
        buildMinHeap(arr);
        System.out.println(\"Heapified array: \" + Arrays.toString(arr));
    }
}`,
        explanation: `Heaps guarantee log n insert/delete while always exposing the next highest or lowest priority element. You will implement binary heaps from scratch, trace heapify, compare min/max structures, and apply them to Dijkstra, streaming medians, and scheduling simulations.`,
        resources: ['Heap Properties', 'Priority Queue Applications']
    },
    {
        id: 'sorting-algorithms',
        title: 'Sorting Algorithms',
        description: '`bubbleSort`, `mergeSort`, and `quickSort` live in one class, letting us highlight each loop condition, partition, and merge so the control flow behind every comparison is crystal clear.',
        difficulty: 'intermediate',
        topics: ['Bubble Sort', 'Merge Sort', 'Quick Sort', 'Heap Sort', 'Radix Sort'],
        codeExample: `// Detailed sorting implementations with analysis
import java.util.Arrays;

public class SortingAlgorithms {

    public static void bubbleSort(int[] arr) {
        for (int i = 0; i < arr.length - 1; i++) {
            boolean swapped = false;
            for (int j = 0; j < arr.length - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    swap(arr, j, j + 1);
                    swapped = true;
                }
            }
            if (!swapped) break; // already sorted
        }
    }

    public static void mergeSort(int[] arr) {
        mergeSort(arr, 0, arr.length - 1, new int[arr.length]);
    }

    private static void mergeSort(int[] arr, int left, int right, int[] temp) {
        if (left >= right) return;
        int mid = left + (right - left) / 2;
        mergeSort(arr, left, mid, temp);
        mergeSort(arr, mid + 1, right, temp);
        merge(arr, left, mid, right, temp);
    }

    private static void merge(int[] arr, int left, int mid, int right, int[] temp) {
        int i = left, j = mid + 1, k = left;
        while (i <= mid && j <= right) {
            temp[k++] = arr[i] <= arr[j] ? arr[i++] : arr[j++];
        }
        while (i <= mid) temp[k++] = arr[i++];
        while (j <= right) temp[k++] = arr[j++];
        for (int idx = left; idx <= right; idx++) arr[idx] = temp[idx];
    }

    public static void quickSort(int[] arr) {
        quickSort(arr, 0, arr.length - 1);
    }

    private static void quickSort(int[] arr, int low, int high) {
        if (low >= high) return;
        int pivotIndex = partition(arr, low, high);
        quickSort(arr, low, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, high);
    }

    private static int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = low;
        for (int j = low; j < high; j++) {
            if (arr[j] < pivot) {
                swap(arr, i, j);
                i++;
            }
        }
        swap(arr, i, high);
        return i;
    }

    private static void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    public static void main(String[] args) {
        int[] sample = {5, 2, 9, 1, 5, 6};
        quickSort(sample);
        System.out.println(\"Quick Sort: \" + Arrays.toString(sample));
        int[] other = {5, 2, 9, 1, 5, 6};
        mergeSort(other);
        System.out.println(\"Merge Sort: \" + Arrays.toString(other));
    }
}`,
        explanation: `This module compares comparison-based sorts (quick, merge, heap) with non-comparison sorts like counting and radix, emphasizing stability and memory trade-offs. Step-by-step traces and code exercises help you recognize when to favor O(n log n) strategies vs linear-time specialized sorts.`,
        resources: ['Sorting Comparisons', 'Algorithm Complexity']
    },
    {
        id: 'searching-algorithms',
        title: 'Searching Algorithms',
        description: 'Linear, binary, and exponential search are implemented side by side, so we break down pointer shifts, boundary tests, and the final `Arrays.binarySearch` call that finishes the exponential window.',
        difficulty: 'beginner',
        topics: ['Linear Search', 'Binary Search', 'Interpolation Search', 'Exponential Search', 'Search Strategy Comparison'],
        codeExample: `// Searching utilities highlighting multiple techniques
import java.util.Arrays;

public class SearchingAlgorithms {

    public static int linearSearch(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            if (arr[i] == target) return i;
        }
        return -1;
    }

    public static int binarySearch(int[] arr, int target) {
        int left = 0, right = arr.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (arr[mid] == target) return mid;
            if (arr[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return -1;
    }

    public static int exponentialSearch(int[] arr, int target) {
        if (arr.length == 0) return -1;
        int bound = 1;
        while (bound < arr.length && arr[bound] < target) {
            bound *= 2;
        }
        return Arrays.binarySearch(arr, bound / 2, Math.min(bound + 1, arr.length), target);
    }

    public static void main(String[] args) {
        int[] sorted = {2, 4, 6, 8, 10, 12, 14};
        System.out.println(\"Linear search 8: \" + linearSearch(sorted, 8));
        System.out.println(\"Binary search 10: \" + binarySearch(sorted, 10));
        System.out.println(\"Exponential search 12: \" + exponentialSearch(sorted, 12));
    }
}`,
        explanation: `Beyond linear search, you will master binary search patterns on arrays, answer-range problems, and implicit search spaces such as answer-guessing or peak finding. We also cover interpolation/exponential search and how to adapt search templates to rotated arrays and matrix traversal.`,
        resources: ['Binary Search Guide', 'Search Optimization']
    },
    {
        id: 'recursion',
        title: 'Recursion and Backtracking',
        description: 'Factorial, maze solving, and subset generation illustrate how base cases, choices, and backtracking fit together; we explain what each recursive frame is doing and when it unwinds.',
        difficulty: 'intermediate',
        topics: ['Recursive Functions', 'Base Cases', 'Backtracking', 'Memoization', 'Tree Recursion'],
        codeExample: `// Recursion and backtracking patterns
import java.util.*;

public class RecursionExamples {

    public static long factorial(int n) {
        if (n <= 1) return 1;
        return n * factorial(n - 1);
    }

    public static boolean solveMaze(char[][] maze, int row, int col) {
        if (row < 0 || col < 0 || row >= maze.length || col >= maze[0].length || maze[row][col] == '#') {
            return false;
        }
        if (maze[row][col] == 'G') return true;
        maze[row][col] = '#'; // mark visited
        boolean found = solveMaze(maze, row + 1, col) ||
                        solveMaze(maze, row - 1, col) ||
                        solveMaze(maze, row, col + 1) ||
                        solveMaze(maze, row, col - 1);
        maze[row][col] = '.'; // backtrack
        return found;
    }

    public static List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        backtrack(nums, 0, new ArrayList<>(), result);
        return result;
    }

    private static void backtrack(int[] nums, int index, List<Integer> slate, List<List<Integer>> result) {
        result.add(new ArrayList<>(slate));
        for (int i = index; i < nums.length; i++) {
            slate.add(nums[i]);
            backtrack(nums, i + 1, slate, result);
            slate.remove(slate.size() - 1);
        }
    }

    public static void main(String[] args) {
        System.out.println(\"Factorial(5) = \" + factorial(5));
        int[] nums = {1, 2, 3};
        System.out.println(\"Subsets: \" + subsets(nums));
    }
}`,
        explanation: `We break recursion into base case, choice, and exploration phases, then show how to convert naive recursion into efficient backtracking with state restoration. Examples include permutations, N-Queens, subsets, and memoized tree DP, helping you reason about call stacks and termination.`,
        resources: ['Recursion Patterns', 'Backtracking Guide']
    },
    {
        id: 'dynamic-programming',
        title: 'Dynamic Programming',
        description: 'The memoized Fibonacci map, LIS DP array, and 0/1 knapsack table are spelled out step by step so you can follow how states are cached, transitions chosen, and answers read back.',
        difficulty: 'advanced',
        topics: ['Memoization', 'Tabulation', 'Optimal Substructure', 'Overlapping Subproblems'],
        codeExample: `// Dynamic programming examples (memoization + tabulation)
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

public class DynamicProgramming {

    private static final Map<Integer, Long> fibMemo = new HashMap<>();
    static {
        fibMemo.put(0, 0L);
        fibMemo.put(1, 1L);
    }

    public static long fibonacci(int n) {
        if (fibMemo.containsKey(n)) return fibMemo.get(n);
        long value = fibonacci(n - 1) + fibonacci(n - 2);
        fibMemo.put(n, value);
        return value;
    }

    public static int longestIncreasingSubsequence(int[] nums) {
        int[] dp = new int[nums.length];
        Arrays.fill(dp, 1);
        int max = 1;
        for (int i = 1; i < nums.length; i++) {
            for (int j = 0; j < i; j++) {
                if (nums[i] > nums[j]) {
                    dp[i] = Math.max(dp[i], dp[j] + 1);
                }
            }
            max = Math.max(max, dp[i]);
        }
        return max;
    }

    public static int knapSack(int capacity, int[] weights, int[] values) {
        int[][] dp = new int[weights.length + 1][capacity + 1];
        for (int i = 1; i <= weights.length; i++) {
            for (int w = 0; w <= capacity; w++) {
                if (weights[i - 1] <= w) {
                    dp[i][w] = Math.max(values[i - 1] + dp[i - 1][w - weights[i - 1]], dp[i - 1][w]);
                } else {
                    dp[i][w] = dp[i - 1][w];
                }
            }
        }
        return dp[weights.length][capacity];
    }

    public static void main(String[] args) {
        System.out.println(\"Fib(10) = \" + fibonacci(10));
        System.out.println(\"LIS length = \" + longestIncreasingSubsequence(new int[]{10,9,2,5,3,7,101,18}));
        System.out.println(\"0/1 Knapsack = \" + knapSack(7, new int[]{1,3,4,5}, new int[]{1,4,5,7}));
    }
}`,
        explanation: `Expect a repeatable framework: define subproblems, derive transitions, then choose memoization or tabulation with optimized space. Classic problems (knapsack, LIS, coin change) plus pattern summaries (1D, 2D grid, partition, interval) ensure you can form DP recurrences on the fly.`,
        resources: ['DP Patterns', 'Optimization Techniques']
    },
    {
        id: 'greedy-algorithms',
        title: 'Greedy Algorithms',
        description: 'Activity selection walks through the start/finish arrays while `coinChange` repeatedly peels denominations, making it easy to see why each greedy comparison or subtraction works.',
        difficulty: 'intermediate',
        topics: ['Greedy Choice', 'Activity Selection', 'Huffman Coding', 'Minimum Spanning Tree'],
        codeExample: `// Greedy strategies for scheduling and coin change
import java.util.*;

public class GreedyAlgorithms {

    public static List<int[]> selectMaxActivities(int[] start, int[] finish) {
        List<int[]> result = new ArrayList<>();
        int lastFinish = -1;
        for (int i = 0; i < start.length; i++) {
            if (start[i] >= lastFinish) {
                result.add(new int[]{start[i], finish[i]});
                lastFinish = finish[i];
            }
        }
        return result;
    }

    public static Map<Integer, Integer> coinChange(int amount, int[] denominations) {
        Map<Integer, Integer> used = new LinkedHashMap<>();
        for (int coin : denominations) {
            int count = amount / coin;
            if (count > 0) {
                used.put(coin, count);
                amount -= coin * count;
            }
        }
        if (amount != 0) throw new IllegalArgumentException(\"Cannot make exact change with given denominations\");
        return used;
    }

    public static void main(String[] args) {
        int[] start = {1, 3, 0, 5, 8, 5};
        int[] finish = {2, 4, 6, 7, 9, 9};
        System.out.println(\"Selected activities: \" + selectMaxActivities(start, finish));

        int[] coins = {25, 10, 5, 1};
        System.out.println(\"Coin change for 68: \" + coinChange(68, coins));
    }
}`,
        explanation: `You will learn to prove the greedy-choice property, test counterexamples, and detect matroid-like structures. Hands-on labs cover interval scheduling, Huffman coding, Kruskal vs Prim MSTs, and coin systems so you know exactly when greedy beats DP.`,
        resources: ['Greedy Strategy', 'Optimization Problems']
    },
    {
        id: 'graph-algorithms',
        title: 'Graph Algorithms',
        description: '`Graph.addEdge`, `bfs`, and `dijkstra` all run in one demo, giving you line-by-line insight into adjacency lists, queue-based traversal, and heap-driven distance relaxation.',
        difficulty: 'advanced',
        topics: ['Graph Representation', 'DFS', 'BFS', 'Shortest Path', 'Minimum Spanning Tree'],
        codeExample: `// Graph traversal and Dijkstra shortest path
import java.util.*;

class Graph {
    private final Map<Integer, List<int[]>> adjacency = new HashMap<>();

    public void addEdge(int from, int to, int weight) {
        adjacency.computeIfAbsent(from, k -> new ArrayList<>()).add(new int[]{to, weight});
        adjacency.computeIfAbsent(to, k -> new ArrayList<>());
    }

    public void bfs(int start) {
        Set<Integer> visited = new HashSet<>();
        Queue<Integer> queue = new ArrayDeque<>();
        queue.offer(start);
        visited.add(start);
        while (!queue.isEmpty()) {
            int current = queue.poll();
            System.out.print(current + \" \");
            for (int[] edge : adjacency.getOrDefault(current, Collections.emptyList())) {
                int neighbor = edge[0];
                if (visited.add(neighbor)) {
                    queue.offer(neighbor);
                }
            }
        }
        System.out.println();
    }

    public Map<Integer, Integer> dijkstra(int source) {
        Map<Integer, Integer> dist = new HashMap<>();
        PriorityQueue<int[]> pq = new PriorityQueue<>(Comparator.comparingInt(a -> a[1]));
        pq.offer(new int[]{source, 0});
        dist.put(source, 0);
        while (!pq.isEmpty()) {
            int[] current = pq.poll();
            int node = current[0];
            int distance = current[1];
            if (distance > dist.getOrDefault(node, Integer.MAX_VALUE)) continue;
            for (int[] edge : adjacency.getOrDefault(node, Collections.emptyList())) {
                int neighbor = edge[0];
                int weight = edge[1];
                int newDist = distance + weight;
                if (newDist < dist.getOrDefault(neighbor, Integer.MAX_VALUE)) {
                    dist.put(neighbor, newDist);
                    pq.offer(new int[]{neighbor, newDist});
                }
            }
        }
        return dist;
    }

    public static void main(String[] args) {
        Graph graph = new Graph();
        graph.addEdge(0, 1, 4);
        graph.addEdge(0, 2, 1);
        graph.addEdge(2, 1, 2);
        graph.addEdge(1, 3, 1);
        graph.addEdge(2, 3, 5);
        System.out.print(\"BFS: \");
        graph.bfs(0);
        System.out.println(\"Dijkstra distances from 0: \" + graph.dijkstra(0));
    }
}`,
        explanation: `We review adjacency list/matrix trade-offs, then dive into traversal patterns (DFS/BFS), topological sorting, shortest paths, and MST designs. Visual walkthroughs show how to reason about connectivity, detect cycles, and optimize graph algorithms with priority queues or union-find.`,
        resources: ['Graph Algorithms', 'DFS and BFS']
    },
    {
        id: 'propositional-logic-proofs',
        title: 'Propositional Logic and Proof Basics',
        description: 'Truth-value helpers for implication, conjunction, and biconditional are traced in a mini truth-table runner so you can connect symbolic logic to executable reasoning.',
        difficulty: 'beginner',
        topics: ['Propositions', 'Truth Tables', 'Implication', 'Logical Equivalence', 'Direct Proof'],
        codeExamples: {
            java: `// Propositional logic truth table helpers
public class PropositionalLogic {
    static boolean implies(boolean p, boolean q) {
        return !p || q;
    }

    static boolean biconditional(boolean p, boolean q) {
        return p == q;
    }

    public static void main(String[] args) {
        boolean[] values = {false, true};
        System.out.println("p q | p->q p<->q");
        for (boolean p : values) {
            for (boolean q : values) {
                System.out.println(p + " " + q + " | " + implies(p, q) + "    " + biconditional(p, q));
            }
        }
        System.out.println("Direct proof idea: assume p, derive q.");
    }
}`,
            cpp: `// Propositional logic truth table helpers
#include <iostream>
using namespace std;

bool implies(bool p, bool q) { return !p || q; }
bool biconditional(bool p, bool q) { return p == q; }

int main() {
    bool values[2] = {false, true};
    cout << boolalpha;
    cout << "p q | p->q p<->q\\n";
    for (bool p : values) {
        for (bool q : values) {
            cout << p << " " << q << " | " << implies(p, q) << "    " << biconditional(p, q) << "\\n";
        }
    }
    cout << "Direct proof idea: assume p, derive q.\\n";
    return 0;
}`,
            python: `# Propositional logic truth table helpers
def implies(p, q):
    return (not p) or q

def biconditional(p, q):
    return p == q

values = [False, True]
print("p q | p->q p<->q")
for p in values:
    for q in values:
        print(f"{p} {q} | {implies(p, q)}    {biconditional(p, q)}")
print("Direct proof idea: assume p, derive q.")`,
            javascript: `// Propositional logic truth table helpers
const implies = (p, q) => !p || q;
const biconditional = (p, q) => p === q;

const values = [false, true];
console.log("p q | p->q p<->q");
for (const p of values) {
    for (const q of values) {
        console.log(String(p) + " " + String(q) + " | " + String(implies(p, q)) + "    " + String(biconditional(p, q)));
    }
}
console.log("Direct proof idea: assume p, derive q.");`
        },
        explanation: `This module focuses on statement logic, inference patterns, and proof framing. You will practice translating English claims to symbols, validating implications with truth tables, and structuring short direct/contrapositive proofs.`,
        resources: ['Discrete Math Open Notes', 'Truth Table Practice']
    },
    {
        id: 'sets-relations-functions',
        title: 'Sets, Relations, and Functions',
        description: 'Set union/intersection, Cartesian products, and injective checks run in one compact sample so you can connect formal definitions to concrete data structures.',
        difficulty: 'beginner',
        topics: ['Set Operations', 'Cartesian Product', 'Relations', 'Injective Functions', 'Surjective Functions'],
        codeExamples: {
            java: `// Sets, relations, and functions mini demo
import java.util.*;

public class SetsRelationsFunctions {
    static boolean isInjective(Map<Integer, Integer> f) {
        Set<Integer> seen = new HashSet<>();
        for (int value : f.values()) {
            if (!seen.add(value)) return false;
        }
        return true;
    }

    public static void main(String[] args) {
        Set<Integer> a = new HashSet<>(Arrays.asList(1, 2, 3));
        Set<Integer> b = new HashSet<>(Arrays.asList(3, 4, 5));
        Set<Integer> intersection = new HashSet<>(a);
        intersection.retainAll(b);
        Set<Integer> union = new HashSet<>(a);
        union.addAll(b);

        Map<Integer, Integer> f = new HashMap<>();
        f.put(1, 10); f.put(2, 20); f.put(3, 30);

        System.out.println("A ∩ B = " + intersection);
        System.out.println("A ∪ B = " + union);
        System.out.println("f is injective? " + isInjective(f));
    }
}`,
            cpp: `// Sets, relations, and functions mini demo
#include <iostream>
#include <set>
#include <map>
using namespace std;

bool isInjective(const map<int, int>& f) {
    set<int> seen;
    for (const auto& [k, v] : f) {
        if (!seen.insert(v).second) return false;
    }
    return true;
}

int main() {
    set<int> A = {1, 2, 3};
    set<int> B = {3, 4, 5};
    set<int> intersection, uni = A;
    for (int x : B) {
        if (A.count(x)) intersection.insert(x);
        uni.insert(x);
    }
    map<int, int> f = {{1, 10}, {2, 20}, {3, 30}};

    cout << "A ∩ B size = " << intersection.size() << "\\n";
    cout << "A ∪ B size = " << uni.size() << "\\n";
    cout << boolalpha << "f is injective? " << isInjective(f) << "\\n";
    return 0;
}`,
            python: `# Sets, relations, and functions mini demo
def is_injective(mapping):
    return len(set(mapping.values())) == len(mapping.values())

A = {1, 2, 3}
B = {3, 4, 5}
f = {1: 10, 2: 20, 3: 30}

print("A ∩ B =", A & B)
print("A ∪ B =", A | B)
print("f is injective?", is_injective(f))`,
            javascript: `// Sets, relations, and functions mini demo
const A = new Set([1, 2, 3]);
const B = new Set([3, 4, 5]);
const intersection = [...A].filter((x) => B.has(x));
const union = new Set([...A, ...B]);
const f = new Map([[1, 10], [2, 20], [3, 30]]);

const values = [...f.values()];
const isInjective = new Set(values).size === values.length;

console.log("A ∩ B =", intersection);
console.log("A ∪ B =", [...union]);
console.log("f is injective?", isInjective);`
        },
        explanation: `You will model sets, binary relations, and mappings with concrete operations: membership tests, products, relation properties, and injective/surjective checks. The focus is building intuition used later in graph theory and proofs.`,
        resources: ['Sets and Relations Notes', 'Function Property Exercises']
    },
    {
        id: 'combinatorics-discrete-probability',
        title: 'Combinatorics and Discrete Probability',
        description: 'Factorial/permutation/combination helpers pair with basic probability calculations so counting principles and event models become practical problem-solving tools.',
        difficulty: 'intermediate',
        topics: ['Factorials', 'Permutations', 'Combinations', 'Binomial Coefficients', 'Event Probability'],
        codeExamples: {
            java: `// Counting and probability helpers
public class CombinatoricsProbability {
    static long factorial(int n) {
        long ans = 1;
        for (int i = 2; i <= n; i++) ans *= i;
        return ans;
    }

    static long nCr(int n, int r) {
        return factorial(n) / (factorial(r) * factorial(n - r));
    }

    public static void main(String[] args) {
        int n = 5, r = 2;
        System.out.println("5! = " + factorial(5));
        System.out.println("P(5,2) = " + (factorial(n) / factorial(n - r)));
        System.out.println("C(5,2) = " + nCr(n, r));
        System.out.println("P(exactly 2 heads in 3 fair flips) = " + (3.0 / 8.0));
    }
}`,
            cpp: `// Counting and probability helpers
#include <iostream>
using namespace std;

long long factorial(int n) {
    long long ans = 1;
    for (int i = 2; i <= n; ++i) ans *= i;
    return ans;
}

long long nCr(int n, int r) {
    return factorial(n) / (factorial(r) * factorial(n - r));
}

int main() {
    int n = 5, r = 2;
    cout << "5! = " << factorial(5) << "\\n";
    cout << "P(5,2) = " << factorial(n) / factorial(n - r) << "\\n";
    cout << "C(5,2) = " << nCr(n, r) << "\\n";
    cout << "P(exactly 2 heads in 3 fair flips) = " << (3.0 / 8.0) << "\\n";
    return 0;
}`,
            python: `# Counting and probability helpers
def factorial(n):
    ans = 1
    for i in range(2, n + 1):
        ans *= i
    return ans

def nCr(n, r):
    return factorial(n) // (factorial(r) * factorial(n - r))

n, r = 5, 2
print("5! =", factorial(5))
print("P(5,2) =", factorial(n) // factorial(n - r))
print("C(5,2) =", nCr(n, r))
print("P(exactly 2 heads in 3 fair flips) =", 3 / 8)`,
            javascript: `// Counting and probability helpers
function factorial(n) {
    let ans = 1;
    for (let i = 2; i <= n; i += 1) ans *= i;
    return ans;
}

function nCr(n, r) {
    return factorial(n) / (factorial(r) * factorial(n - r));
}

const n = 5;
const r = 2;
console.log("5! =", factorial(5));
console.log("P(5,2) =", factorial(n) / factorial(n - r));
console.log("C(5,2) =", nCr(n, r));
console.log("P(exactly 2 heads in 3 fair flips) =", 3 / 8);`
        },
        explanation: `This module connects counting techniques to probability models. You will decide when order matters, compute combinations/permutations efficiently, and map sample spaces to event probabilities for exam-style and interview-style problems.`,
        resources: ['Combinatorics Quick Sheet', 'Discrete Probability Practice']
    },
    {
        id: 'tries',
        title: 'Tries (Prefix Trees)',
        description: 'The trie builds nodes character by character in `insert`, reuses them via `traverse`, and flags words/prefixes, so we spell out how each loop navigates the shared structure.',
        difficulty: 'intermediate',
        topics: ['Trie Construction', 'Insert/Search/Delete', 'Prefix Matching', 'Auto-complete'],
        codeExample: `// Trie / prefix tree implementation
import java.util.HashMap;
import java.util.Map;

class TrieNode {
    Map<Character, TrieNode> children = new HashMap<>();
    boolean isWord;
}

public class Trie {
    private final TrieNode root = new TrieNode();

    public void insert(String word) {
        TrieNode current = root;
        for (char c : word.toCharArray()) {
            current = current.children.computeIfAbsent(c, k -> new TrieNode());
        }
        current.isWord = true;
    }

    public boolean search(String word) {
        TrieNode node = traverse(word);
        return node != null && node.isWord;
    }

    public boolean startsWith(String prefix) {
        return traverse(prefix) != null;
    }

    private TrieNode traverse(String sequence) {
        TrieNode current = root;
        for (char c : sequence.toCharArray()) {
            TrieNode next = current.children.get(c);
            if (next == null) return null;
            current = next;
        }
        return current;
    }

    public static void main(String[] args) {
        Trie trie = new Trie();
        trie.insert(\"code\");
        trie.insert(\"coder\");
        trie.insert(\"coding\");
        System.out.println(trie.search(\"code\"));      // true
        System.out.println(trie.startsWith(\"cod\"));  // true
        System.out.println(trie.search(\"codes\"));    // false
    }
}`,
        explanation: `The trie unit illustrates how prefix trees compress shared paths to enable O(L) lookups, autosuggest, and wildcard search. You will add delete operations, explore ternary search trees, and implement word dictionary problems leveraging prefix counting.`,
        resources: ['Trie Applications', 'String Processing']
    },
    {
        id: 'union-find',
        title: 'Union-Find (Disjoint Set)',
        description: '`find` performs recursive path compression and `union` compares ranks before reparenting nodes, letting you trace exactly how the disjoint-set forest flattens.',
        difficulty: 'intermediate',
        topics: ['Union by Rank', 'Path Compression', 'Connected Components', 'Cycle Detection'],
        codeExample: `// Disjoint Set Union (Union-Find) with path compression
public class UnionFind {
    private final int[] parent;
    private final int[] rank;

    public UnionFind(int size) {
        parent = new int[size];
        rank = new int[size];
        for (int i = 0; i < size; i++) {
            parent[i] = i;
        }
    }

    public int find(int x) {
        if (parent[x] != x) {
            parent[x] = find(parent[x]); // path compression
        }
        return parent[x];
    }

    public void union(int a, int b) {
        int rootA = find(a);
        int rootB = find(b);
        if (rootA == rootB) return;
        if (rank[rootA] < rank[rootB]) {
            parent[rootA] = rootB;
        } else if (rank[rootA] > rank[rootB]) {
            parent[rootB] = rootA;
        } else {
            parent[rootB] = rootA;
            rank[rootA]++;
        }
    }

    public static void main(String[] args) {
        UnionFind uf = new UnionFind(6);
        uf.union(0, 1);
        uf.union(1, 2);
        uf.union(3, 4);
        System.out.println(\"Find(2) = \" + uf.find(2));
        System.out.println(\"Connected components merged? \" + (uf.find(0) == uf.find(2)));
    }
}`,
        explanation: `We implement disjoint-set unions with path compression and union-by-rank, analyze their near-constant complexity, and apply them to connectivity, Kruskal MST, and cycle detection. Visual traces clarify how parent trees flatten after repeated operations.`,
        resources: ['Disjoint Set Operations', 'Path Compression']
    },
    {
        id: 'segment-trees',
        title: 'Segment Trees',
        description: '`build`, `update`, and `rangeSum` split ranges by midpoint, handle cover/disjoint/partial cases, and bubble results upward so the entire range-query story is easy to follow.',
        difficulty: 'advanced',
        topics: ['Range Queries', 'Lazy Propagation', 'Point Updates', 'Range Updates'],
        codeExample: `// Segment tree supporting range sum query and point update
class SegmentTree {
    private final int[] tree;
    private final int n;

    public SegmentTree(int[] arr) {
        n = arr.length;
        tree = new int[4 * n];
        build(arr, 0, 0, n - 1);
    }

    private void build(int[] arr, int node, int left, int right) {
        if (left == right) {
            tree[node] = arr[left];
            return;
        }
        int mid = (left + right) / 2;
        build(arr, node * 2 + 1, left, mid);
        build(arr, node * 2 + 2, mid + 1, right);
        tree[node] = tree[node * 2 + 1] + tree[node * 2 + 2];
    }

    public void update(int index, int value) {
        update(0, 0, n - 1, index, value);
    }

    private void update(int node, int left, int right, int index, int value) {
        if (left == right) {
            tree[node] = value;
            return;
        }
        int mid = (left + right) / 2;
        if (index <= mid) update(node * 2 + 1, left, mid, index, value);
        else update(node * 2 + 2, mid + 1, right, index, value);
        tree[node] = tree[node * 2 + 1] + tree[node * 2 + 2];
    }

    public int rangeSum(int ql, int qr) {
        return rangeSum(0, 0, n - 1, ql, qr);
    }

    private int rangeSum(int node, int left, int right, int ql, int qr) {
        if (ql <= left && qr >= right) return tree[node];
        if (qr < left || ql > right) return 0;
        int mid = (left + right) / 2;
        return rangeSum(node * 2 + 1, left, mid, ql, qr)
             + rangeSum(node * 2 + 2, mid + 1, right, ql, qr);
    }

    public static void main(String[] args) {
        int[] arr = {1, 3, 5, 7, 9, 11};
        SegmentTree st = new SegmentTree(arr);
        System.out.println(\"Sum 1-3: \" + st.rangeSum(1, 3));
        st.update(1, 10);
        System.out.println(\"Sum 1-3 after update: \" + st.rangeSum(1, 3));
    }
}`,
        explanation: `Segment trees store aggregated range data (sum, min, gcd) and answer queries in O(log n); you will build both iterative and recursive versions. We also cover lazy propagation for range updates and compare segment trees with Fenwick trees in terms of capabilities.`,
        resources: ['Range Query Optimization', 'Lazy Propagation']
    },
    {
        id: 'binary-indexed-trees',
        title: 'Binary Indexed Trees (Fenwick Trees)',
        description: 'The BIT demo emphasizes the lowbit trick: `update` climbs with `i += i & -i`, `prefixSum` walks downward, and `rangeSum` just subtracts prefixes so you can visualize the implicit tree.',
        difficulty: 'advanced',
        topics: ['Prefix Sums', 'Range Sum Queries', 'Point Updates', 'Lower Bit Operation'],
        codeExample: `// Fenwick Tree / Binary Indexed Tree
class BinaryIndexedTree {
    private final int[] tree;

    public BinaryIndexedTree(int size) {
        tree = new int[size + 1]; // 1-based indexing
    }

    public void update(int index, int delta) {
        for (int i = index + 1; i < tree.length; i += i & -i) {
            tree[i] += delta;
        }
    }

    public int prefixSum(int index) {
        int sum = 0;
        for (int i = index + 1; i > 0; i -= i & -i) {
            sum += tree[i];
        }
        return sum;
    }

    public int rangeSum(int left, int right) {
        return prefixSum(right) - prefixSum(left - 1);
    }

    public static void main(String[] args) {
        BinaryIndexedTree bit = new BinaryIndexedTree(10);
        int[] nums = {1, 2, 3, 4, 5};
        for (int i = 0; i < nums.length; i++) {
            bit.update(i, nums[i]);
        }
        System.out.println(\"Prefix sum(3) = \" + bit.prefixSum(3));
        bit.update(2, 5); // add 5 to index 2
        System.out.println(\"Range sum(1,3) = \" + bit.rangeSum(1, 3));
    }
}`,
        explanation: `Fenwick trees offer a compact alternative for prefix sums and point updates; this lesson explains the lowbit trick, building from scratch, and performing range queries. Practice exercises include inversion counting, running frequency tables, and 2D BIT extensions.`,
        resources: ['Fenwick Tree Guide', 'Prefix Sum Optimization']
    },
    {
        id: 'advanced-trees',
        title: 'Advanced Tree Structures',
        description: 'The AVL insert pipeline updates heights, checks balance factors, and triggers the correct rotations before an inorder traversal verifies the tree stayed sorted.',
        difficulty: 'advanced',
        topics: ['AVL Trees', 'Red-Black Trees', 'B-Trees', 'Splay Trees', 'Tree Rotations'],
        codeExample: `// AVL tree with rotations to maintain balance
class AVLTree {
    static class Node {
        int key, height;
        Node left, right;
        Node(int key) {
            this.key = key;
            height = 1;
        }
    }

    private Node root;

    public void insert(int key) {
        root = insert(root, key);
    }

    private Node insert(Node node, int key) {
        if (node == null) return new Node(key);
        if (key < node.key) {
            node.left = insert(node.left, key);
        } else if (key > node.key) {
            node.right = insert(node.right, key);
        } else {
            return node; // no duplicates
        }
        updateHeight(node);
        return rebalance(node);
    }

    private Node rebalance(Node node) {
        int balance = getBalance(node);
        if (balance > 1 && getBalance(node.left) >= 0) return rotateRight(node);
        if (balance > 1 && getBalance(node.left) < 0) {
            node.left = rotateLeft(node.left);
            return rotateRight(node);
        }
        if (balance < -1 && getBalance(node.right) <= 0) return rotateLeft(node);
        if (balance < -1 && getBalance(node.right) > 0) {
            node.right = rotateRight(node.right);
            return rotateLeft(node);
        }
        return node;
    }

    private Node rotateLeft(Node x) {
        Node y = x.right;
        Node T2 = y.left;
        y.left = x;
        x.right = T2;
        updateHeight(x);
        updateHeight(y);
        return y;
    }

    private Node rotateRight(Node y) {
        Node x = y.left;
        Node T2 = x.right;
        x.right = y;
        y.left = T2;
        updateHeight(y);
        updateHeight(x);
        return x;
    }

    private void updateHeight(Node node) {
        node.height = 1 + Math.max(height(node.left), height(node.right));
    }

    private int height(Node node) {
        return node == null ? 0 : node.height;
    }

    private int getBalance(Node node) {
        return node == null ? 0 : height(node.left) - height(node.right);
    }

    public void inorderTraversal() {
        inorder(root);
        System.out.println();
    }

    private void inorder(Node node) {
        if (node == null) return;
        inorder(node.left);
        System.out.print(node.key + \" \");
        inorder(node.right);
    }

    public static void main(String[] args) {
        AVLTree tree = new AVLTree();
        int[] values = {30, 20, 40, 10, 25, 35, 50, 5};
        for (int v : values) tree.insert(v);
        tree.inorderTraversal();
    }
}`,
        explanation: `Balanced trees (AVL, Red-Black, B/B+ trees) enforce height guarantees via rotations. You will see animation-style walkthroughs of insert/delete, compare balancing strategies, and study use cases such as ordered maps, interval trees, and database indexes.`,
        resources: ['Self-Balancing Trees', 'Tree Rotation Techniques']
    },
    {
        id: 'string-algorithms',
        title: 'Advanced String Algorithms',
        description: 'We build the KMP prefix table and feed it into `kmpSearch`, pausing on each pointer jump so you understand how the `lps` array skips redundant comparisons.',
        difficulty: 'advanced',
        topics: ['KMP Algorithm', 'Rabin-Karp', 'Boyer-Moore', 'Suffix Arrays', 'String Hashing'],
        codeExample: `// Knuth-Morris-Pratt (KMP) pattern matching
import java.util.Arrays;

public class StringAlgorithms {

    public static int[] buildPrefixTable(String pattern) {
        int[] lps = new int[pattern.length()];
        int len = 0;
        for (int i = 1; i < pattern.length();) {
            if (pattern.charAt(i) == pattern.charAt(len)) {
                lps[i++] = ++len;
            } else if (len != 0) {
                len = lps[len - 1];
            } else {
                lps[i++] = 0;
            }
        }
        return lps;
    }

    public static int kmpSearch(String text, String pattern) {
        if (pattern.isEmpty()) return 0;
        int[] lps = buildPrefixTable(pattern);
        int i = 0, j = 0;
        while (i < text.length()) {
            if (text.charAt(i) == pattern.charAt(j)) {
                i++; j++;
                if (j == pattern.length()) return i - j; // match found
            } else if (j != 0) {
                j = lps[j - 1];
            } else {
                i++;
            }
        }
        return -1;
    }

    public static void main(String[] args) {
        String text = \"abxabcabcaby\";
        String pattern = \"abcaby\";
        System.out.println(\"Prefix table: \" + Arrays.toString(buildPrefixTable(pattern)));
        System.out.println(\"KMP search index: \" + kmpSearch(text, pattern));
    }
}`,
        explanation: `We derive prefix-function tables for KMP, rolling hashes for Rabin-Karp, and good/bad character heuristics for Boyer–Moore. Further topics include suffix arrays/automata, Z-algorithm, and how to combine hashing with binary search for substring problems.`,
        resources: ['Pattern Matching', 'String Processing Optimization']
    },
    {
        id: 'assembly-registers-memory',
        title: 'Assembly Registers and Memory Basics',
        description: 'This starter module introduces register roles, immediate values, and memory addressing by tracing simple load/add/store sequences side by side with high-level equivalents.',
        difficulty: 'beginner',
        topics: ['CPU Registers', 'Memory Addresses', 'Load/Store', 'Data Sizes', 'Endian Awareness'],
        codeExamples: {
            assembly: `; x86-64 registers + memory demo (Linux, Intel syntax)
section .data
    valueA dd 7
    valueB dd 5
    msg db "Computed sum in EAX from valueA + valueB", 10
    msg_len equ $ - msg

section .text
    global _start
_start:
    mov eax, [valueA]       ; EAX = 7
    mov ebx, [valueB]       ; EBX = 5
    add eax, ebx            ; EAX = 12

    ; Write explanatory message to stdout
    mov rax, 1              ; syscall: write
    mov rdi, 1              ; fd: stdout
    mov rsi, msg            ; buffer
    mov rdx, msg_len        ; length
    syscall

    ; Exit cleanly
    mov rax, 60             ; syscall: exit
    xor rdi, rdi            ; status 0
    syscall
`,
            java: `// Register-like reasoning in Java
public class AssemblyRegistersMemory {
    public static void main(String[] args) {
        int eax = 7; // pretend eax register
        int ebx = 5; // pretend ebx register
        eax = eax + ebx;
        System.out.println("eax after add = " + eax);

        int[] memory = {100, 200, 300};
        int baseAddress = 0;
        int loaded = memory[baseAddress + 1];
        System.out.println("loaded memory[base+1] = " + loaded);
    }
}`,
            cpp: `// Register-like reasoning in C++
#include <iostream>
using namespace std;

int main() {
    int eax = 7;
    int ebx = 5;
    eax = eax + ebx;
    cout << "eax after add = " << eax << "\\n";

    int memory[] = {100, 200, 300};
    int base = 0;
    int loaded = memory[base + 1];
    cout << "loaded memory[base+1] = " << loaded << "\\n";
    return 0;
}`,
            python: `# Register-like reasoning in Python
eax = 7
ebx = 5
eax = eax + ebx
print("eax after add =", eax)

memory = [100, 200, 300]
base = 0
loaded = memory[base + 1]
print("loaded memory[base+1] =", loaded)`,
            javascript: `// Register-like reasoning in JavaScript
let eax = 7;
const ebx = 5;
eax = eax + ebx;
console.log("eax after add =", eax);

const memory = [100, 200, 300];
const base = 0;
const loaded = memory[base + 1];
console.log("loaded memory[base+1] =", loaded);`
        },
        explanation: `You will map low-level machine state to familiar variables: registers as fast temporary storage and memory as addressed slots. The goal is to make instruction-by-instruction traces intuitive before moving to procedures and control flow.`,
        resources: ['x86 Register Reference', 'Memory Addressing Primer']
    },
    {
        id: 'assembly-control-flow-procedures',
        title: 'Assembly Control Flow and Procedures',
        description: 'Branch flags, loop counters, and call/return frames are demonstrated in short routines so you can see how high-level `if`, `while`, and function calls are represented in assembly.',
        difficulty: 'intermediate',
        topics: ['CMP and Flags', 'Conditional Jumps', 'Loops', 'Call/Ret', 'Calling Conventions'],
        codeExamples: {
            assembly: `; Control flow + procedure demo (Linux, Intel syntax)
section .data
    done_msg db "sum_to_n finished successfully", 10
    done_len equ $ - done_msg

section .text
    global _start

sum_to_n:
    ; Input: ECX = n, Output: EAX = 1 + ... + n
    xor eax, eax             ; total = 0
.loop:
    add eax, ecx
    dec ecx
    jnz .loop
    ret

_start:
    mov ecx, 5
    call sum_to_n            ; EAX = 15

    cmp eax, 10              ; branch example
    jle .skip_print
    mov rax, 1               ; write
    mov rdi, 1               ; stdout
    mov rsi, done_msg
    mov rdx, done_len
    syscall

.skip_print:
    mov rax, 60              ; exit
    xor rdi, rdi
    syscall
`,
            java: `// Control flow and procedure equivalents in Java
public class AssemblyControlFlowProcedures {
    static int sumToN(int n) {
        int total = 0;
        while (n != 0) {
            total += n;
            n--;
        }
        return total;
    }

    public static void main(String[] args) {
        int result = sumToN(5);
        System.out.println("sumToN(5) = " + result);
        if (result > 10) {
            System.out.println("branch taken: result > 10");
        }
    }
}`,
            cpp: `// Control flow and procedure equivalents in C++
#include <iostream>
using namespace std;

int sumToN(int n) {
    int total = 0;
    while (n != 0) {
        total += n;
        n--;
    }
    return total;
}

int main() {
    int result = sumToN(5);
    cout << "sumToN(5) = " << result << "\\n";
    if (result > 10) {
        cout << "branch taken: result > 10\\n";
    }
    return 0;
}`,
            python: `# Control flow and procedure equivalents in Python
def sum_to_n(n):
    total = 0
    while n != 0:
        total += n
        n -= 1
    return total

result = sum_to_n(5)
print("sum_to_n(5) =", result)
if result > 10:
    print("branch taken: result > 10")`,
            javascript: `// Control flow and procedure equivalents in JavaScript
function sumToN(n) {
    let total = 0;
    while (n !== 0) {
        total += n;
        n -= 1;
    }
    return total;
}

const result = sumToN(5);
console.log("sumToN(5) =", result);
if (result > 10) {
    console.log("branch taken: result > 10");
}`
        },
        explanation: `This module connects jump conditions and call frames to structured programming. You will read traces of compare/branch patterns, stack behavior across calls, and loop exits to build confidence debugging low-level flow.`,
        resources: ['Calling Convention Cheatsheet', 'Conditional Jump Table']
    },
    {
        id: 'assembly-arrays-strings-io',
        title: 'Assembly Arrays, Strings, and Basic I/O',
        description: 'Pointer stepping over arrays, null-terminated string scans, and minimal I/O patterns are broken into small examples so data traversal in assembly feels concrete.',
        difficulty: 'intermediate',
        topics: ['Pointer Arithmetic', 'Array Traversal', 'Null-Terminated Strings', 'System Calls', 'Byte/Word Access'],
        codeExamples: {
            assembly: `; Arrays + strings + basic I/O (Linux, Intel syntax)
section .data
    nums dd 3, 4, 5, 6
    text db "HELLO", 0
    out_msg db "Array sum and string length computed", 10
    out_len equ $ - out_msg

section .text
    global _start
_start:
    xor eax, eax          ; sum = 0
    mov ecx, 4            ; count
    mov rsi, nums         ; pointer to array
.sum_loop:
    add eax, [rsi]
    add rsi, 4            ; next int32 element
    loop .sum_loop

    ; string length scan
    mov rdi, text
    xor ebx, ebx
.len_loop:
    cmp byte [rdi], 0
    je .done
    inc ebx
    inc rdi
    jmp .len_loop
.done:
    ; EAX = array sum, EBX = string length
    ; Print completion message
    mov rax, 1              ; write
    mov rdi, 1              ; stdout
    mov rsi, out_msg
    mov rdx, out_len
    syscall

    ; Exit
    mov rax, 60             ; exit
    xor rdi, rdi
    syscall
`,
            java: `// Arrays, strings, and I/O analog in Java
public class AssemblyArraysStringsIO {
    public static void main(String[] args) {
        int[] nums = {3, 4, 5, 6};
        int sum = 0;
        for (int value : nums) sum += value;

        String text = "HELLO";
        int length = text.length();

        System.out.println("sum(nums) = " + sum);
        System.out.println("length(text) = " + length);
        System.out.println("I/O demo complete.");
    }
}`,
            cpp: `// Arrays, strings, and I/O analog in C++
#include <iostream>
#include <string>
using namespace std;

int main() {
    int nums[] = {3, 4, 5, 6};
    int sum = 0;
    for (int value : nums) sum += value;

    string text = "HELLO";
    int length = static_cast<int>(text.size());

    cout << "sum(nums) = " << sum << "\\n";
    cout << "length(text) = " << length << "\\n";
    cout << "I/O demo complete.\\n";
    return 0;
}`,
            python: `# Arrays, strings, and I/O analog in Python
nums = [3, 4, 5, 6]
sum_value = sum(nums)
text = "HELLO"
length = len(text)

print("sum(nums) =", sum_value)
print("length(text) =", length)
print("I/O demo complete.")`,
            javascript: `// Arrays, strings, and I/O analog in JavaScript
const nums = [3, 4, 5, 6];
const sumValue = nums.reduce((acc, value) => acc + value, 0);
const text = "HELLO";
const length = text.length;

console.log("sum(nums) =", sumValue);
console.log("length(text) =", length);
console.log("I/O demo complete.");`
        },
        explanation: `You will practice low-level data movement through arrays and strings, then relate those patterns to higher-level loops and output routines. By the end, pointer increments, sentinel checks, and output setup should feel natural.`,
        resources: ['Assembly String Ops', 'Syscall Reference (Intro)']
    },
    {
        id: 'bit-manipulation',
        title: 'Bit Manipulation',
        description: 'Functions like `isPowerOfTwo`, `countBits`, `singleNumber`, and `lowbit` expose masks and XOR tricks; we call out what each operation does to the underlying bits.',
        difficulty: 'intermediate',
        topics: ['Bitwise Operators', 'Bit Masks', 'Power of Two', 'XOR Properties', 'Bit Counting'],
        codeExample: `// Common bit manipulation techniques
public class BitManipulation {

    public static boolean isPowerOfTwo(int n) {
        return n > 0 && (n & (n - 1)) == 0;
    }

    public static int countBits(int n) {
        int count = 0;
        while (n != 0) {
            n &= (n - 1); // drop lowest set bit
            count++;
        }
        return count;
    }

    public static int singleNumber(int[] nums) {
        int xor = 0;
        for (int num : nums) {
            xor ^= num;
        }
        return xor;
    }

    public static int lowbit(int n) {
        return n & -n;
    }

    public static void main(String[] args) {
        System.out.println(\"Is 16 power of two? \" + isPowerOfTwo(16));
        System.out.println(\"Bits in 29: \" + countBits(29));
        System.out.println(\"Single number: \" + singleNumber(new int[]{2, 3, 2, 4, 4})); // 3
        System.out.println(\"Lowbit of 12: \" + lowbit(12));
    }
}`,
        explanation: `Bit tricks allow O(1) state tracking, subset iteration, and arithmetic optimizations. We practice masking, toggling, lowbit extraction, Gray codes, and XOR-based problems so you can reason confidently about binary representations.`,
        resources: ['Bitwise Operations', 'Bit Tricks']
    },

    // BASIC PROGRAMMING CONCEPTS (Great for beginners)

    {
        id: 'java-basics',
        title: 'Java Fundamentals',
        description: '`JavaBasics` wires up fields via a constructor, exposes `getInfo`, and creates an instance in `main`, breaking down how objects store state and expose behavior.',
        difficulty: 'beginner',
        topics: ['Variables', 'Data Types', 'Methods', 'Classes', 'Objects'],
        codeExample: `// Java Basics - Variables and Methods
public class JavaBasics {
    // Instance variables
    private String name;
    private int age;
    
    // Constructor
    public JavaBasics(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    // Method with return value
    public String getInfo() {
        return "Name: " + name + ", Age: " + age;
    }
    
    // Static method
    public static void main(String[] args) {
        JavaBasics person = new JavaBasics("Alice", 25);
        System.out.println(person.getInfo());
    }
}`,
        explanation: `This primer explains the JVM model, primitive vs reference types, memory layout, and how to structure small programs with packages and build tools. Each topic is paired with short exercises so you can move from syntax memorization to writing idiomatic Java.`,
        resources: ['Java Documentation', 'Oracle Java Tutorials', 'Java Syntax Guide']
    },

    {
        id: 'git-basics-workflow',
        title: 'Git Basics and Collaboration Workflow',
        description: 'This starter module walks through repo setup, staging, commits, branching, pull/merge flow, conflict resolution basics, and safe undo commands you can use in real team projects.',
        difficulty: 'beginner',
        topics: ['Repository Setup', 'Staging and Commits', 'Branching and Merging', 'Pull/Rebase Basics', 'Merge Conflict Basics', 'Remote Collaboration', 'Safe Undo with Restore/Revert'],
        codeExample: `# 1) Initialize a new repository and connect remote
mkdir cs-atlas-demo
cd cs-atlas-demo
git init
git branch -M main
git remote add origin https://github.com/your-org/cs-atlas-demo.git
git status
# Expected: On branch main, no commits yet

# 2) Stage and commit intentionally (small logical commit)
echo "# CS Atlas Demo" > README.md
git add README.md
git commit -m "docs: add initial project README"
git log --oneline -n 3
# Expected: one commit shown with your message

# 3) Create feature branch for isolated work
git checkout -b feature/auth-modal
echo "Auth modal revamp notes" > auth-notes.txt
git add auth-notes.txt
git commit -m "feat: add auth modal planning notes"
git branch
# Expected: * feature/auth-modal

# 4) Sync with remote safely before opening PR
git fetch origin
git pull --rebase origin main
git push -u origin feature/auth-modal
# Expected: branch now tracks origin/feature/auth-modal

# 5) Merge workflow after review (done on main branch)
git checkout main
git pull origin main
git merge --no-ff feature/auth-modal -m "merge: feature/auth-modal"
git push origin main

# 6) Resolve simple conflict (core idea)
# - Open conflicted file and choose final content
# - Remove conflict markers <<<<<<< ======= >>>>>>>
git add <resolved-file>
git commit -m "fix: resolve merge conflict in <resolved-file>"

# 7) Safe undo patterns (shared history safe)
git restore --staged auth-notes.txt     # unstage file
git restore auth-notes.txt              # discard local uncommitted change
git revert <commit-hash>                # create new commit that undoes old one`,
        explanation: `Git is not just commands; it is a safety model for collaboration. You will learn the three-state model (working tree, staging area, repository), why commits should be small and reversible, and how branch-based development protects the main branch. We also cover safe undo strategies for team projects: when to use restore for local cleanup and when to use revert for shared history. By the end, you should be able to ship features through branch -> review -> merge with minimal risk.`,
        resources: ['Official Git Book', 'GitHub Flow Guide', 'Atlassian Git Tutorials', 'Conventional Commit Messages']
    },

    {
        id: 'control-flow',
        title: 'Control Flow Statements',
        description: '`ControlFlow.main` chains an if/else ladder, classic for loop, and enhanced for loop so you can trace how each branch or counter drives console output.',
        difficulty: 'beginner',
        topics: ['If-Else', 'For Loops', 'While Loops', 'Switch', 'Break/Continue'],
        codeExample: `// Control Flow Examples
public class ControlFlow {
    public static void main(String[] args) {
        // If-else example
        int score = 85;
        if (score >= 90) {
            System.out.println("A grade");
        } else if (score >= 80) {
            System.out.println("B grade");
        } else {
            System.out.println("C grade or below");
        }
        
        // For loop example
        for (int i = 1; i <= 5; i++) {
            System.out.println("Count: " + i);
        }
        
        // Enhanced for loop
        int[] numbers = {1, 2, 3, 4, 5};
        for (int num : numbers) {
            System.out.println("Number: " + num);
        }
    }
}`,
        explanation: `We relate each control structure to real scenarios (validation, accumulation, menu handling) and highlight pitfalls like infinite loops or fall-through switches. Flowchart exercises plus debugging tips reinforce how to trace program execution step by step.`,
        resources: ['Java Control Statements', 'Loop Examples', 'Conditional Logic']
    },

    {
        id: 'oop-basics',
        title: 'Object-Oriented Programming',
        description: 'An abstract `Animal` defines shared state/behavior, `Dog` overrides `makeSound`, and the inherited `sleep` method demonstrates encapsulation and polymorphism in one snippet.',
        difficulty: 'beginner',
        topics: ['Encapsulation', 'Inheritance', 'Polymorphism', 'Abstraction', 'Interfaces'],
        codeExample: `
        // OOP Concepts
abstract class Animal {
    protected String name;
    
    public Animal(String name) {
        this.name = name;
    }
    
    public abstract void makeSound();
    
    public void sleep() {
        System.out.println(name + " is sleeping");
    }
}

class Dog extends Animal {
    public Dog(String name) {
        super(name);
    }
    
    @Override
    public void makeSound() {
        System.out.println(name + " says Woof!");
    }
}`,
        explanation: `Encapsulation, inheritance, and polymorphism are demonstrated with cohesive mini-systems (bank accounts, game entities) so you see how design choices affect flexibility. Interfaces vs abstract classes, composition-over-inheritance, and SOLID principles round out the lesson.`,
        resources: ['OOP in Java', 'Inheritance Examples', 'Interface vs Abstract']
    },

    {
        id: 'exception-handling',
        title: 'Exception Handling',
        description: '`divide` wraps division in try/catch/finally while `validateAge` throws a custom exception, showing exactly how execution moves through error paths and cleanup blocks.',
        difficulty: 'beginner',
        topics: ['Try-Catch', 'Finally Block', 'Custom Exceptions', 'Throws', 'Exception Types'],
        codeExample: `
        // Exception Handling
public class ExceptionExample {
    public static void divide(int a, int b) {
        try {
            int result = a / b;
            System.out.println("Result: " + result);
        } catch (ArithmeticException e) {
            System.out.println("Error: Cannot divide by zero!");
        } finally {
            System.out.println("Division operation completed.");
        }
    }
    
    // Custom exception
    public static void validateAge(int age) throws InvalidAgeException {
        if (age < 0) {
            throw new InvalidAgeException("Age cannot be negative");
        }
    }
}`,
        explanation: `You will categorize checked vs unchecked exceptions, design custom hierarchies, and use try-with-resources for safe cleanup. Realistic scenarios cover logging, wrapping exceptions to add context, and establishing global handlers to keep apps resilient.`,
        resources: ['Java Exceptions', 'Error Handling Best Practices']
    },

    // INTERMEDIATE CONCEPTS

    {
        id: 'collections-framework',
        title: 'Java Collections Framework',
        description: '`CollectionsExample` builds an `ArrayList`, `HashMap`, and `HashSet` inside `main`, highlighting adds, puts, and duplicate handling so each collection’s behavior is tangible.',
        difficulty: 'intermediate',
        topics: ['ArrayList', 'HashMap', 'HashSet', 'TreeMap', 'LinkedList', 'Iterators'],
        codeExample: `// Collections Framework
import java.util.*;

public class CollectionsExample {
    public static void main(String[] args) {
        // ArrayList example
        List<String> fruits = new ArrayList<>();
        fruits.add("Apple");
        fruits.add("Banana");
        
        // HashMap example
        Map<String, Integer> scores = new HashMap<>();
        scores.put("Alice", 95);
        scores.put("Bob", 87);
        
        // HashSet example
        Set<Integer> uniqueNumbers = new HashSet<>();
        uniqueNumbers.add(1);
        uniqueNumbers.add(2);
        uniqueNumbers.add(1); // Duplicate ignored
        
        System.out.println("Unique numbers: " + uniqueNumbers.size());
    }
}`,
        explanation: `We benchmark List/Set/Map variants, discuss ordering and concurrency characteristics, and show how iterators, streams, and collectors interact with collections. Practical labs include implementing caches, frequency tables, and multi-map utilities.`,
        resources: ['Java Collections', 'Map vs Set', 'Collection Performance']
    },

    {
        id: 'file-io',
        title: 'File Input/Output',
        description: '`writeToFile` and `readFromFile` pair try-with-resources with FileWriter and Scanner, illustrating how to open, stream, and close files while surfacing friendly error messages.',
        difficulty: 'intermediate',
        topics: ['FileReader', 'FileWriter', 'BufferedReader', 'Scanner', 'Path API'],
        codeExample: `// File I/O Operations
import java.io.*;
import java.util.Scanner;

public class FileIOExample {
    public static void writeToFile(String filename, String content) {
        try (FileWriter writer = new FileWriter(filename)) {
            writer.write(content);
            System.out.println("File written successfully!");
        } catch (IOException e) {
            System.out.println("Error writing file: " + e.getMessage());
        }
    }
    
    public static void readFromFile(String filename) {
        try (Scanner scanner = new Scanner(new File(filename))) {
            while (scanner.hasNextLine()) {
                System.out.println(scanner.nextLine());
            }
        } catch (FileNotFoundException e) {
            System.out.println("File not found: " + e.getMessage());
        }
    }
}`,
        explanation: `The I/O unit compares classic streams vs NIO.2, shows buffered vs unbuffered performance, and demonstrates reading JSON/CSV safely. You will practice try-with-resources, directory walking, and serialization basics to build small ETL pipelines.`,
        resources: ['Java I/O Streams', 'File Handling', 'NIO.2 Path API']
    },

    {
        id: 'multithreading',
        title: 'Multithreading Basics',
        description: 'A `Counter` implements Runnable, prints progress inside `run`, and two threads are started in `main`, letting you trace scheduling, sleeping, and graceful interruption.',
        difficulty: 'intermediate',
        topics: ['Thread Class', 'Runnable Interface', 'Synchronization', 'Thread Safety'],
        codeExample: `// Multithreading Example
public class ThreadExample {
    // Implementing Runnable
    static class Counter implements Runnable {
        private String name;
        
        public Counter(String name) {
            this.name = name;
        }
        
        @Override
        public void run() {
            for (int i = 1; i <= 5; i++) {
                System.out.println(name + ": " + i);
                try {
                    Thread.sleep(1000); // Sleep for 1 second
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
            }
        }
    }
    
    public static void main(String[] args) {
        Thread t1 = new Thread(new Counter("Thread-1"));
        Thread t2 = new Thread(new Counter("Thread-2"));
        
        t1.start();
        t2.start();
    }
}`,
        explanation: `We start with thread lifecycle basics, then introduce synchronization primitives (locks, volatile, atomics) and higher-level executors. Case studies cover producer-consumer queues, progress bars, and responsiveness tips for desktop or server apps.`,
        resources: ['Java Concurrency', 'Thread Synchronization', 'Executor Framework']
    },

    // ADVANCED CONCEPTS

    {
        id: 'design-patterns',
        title: 'Design Patterns',
        description: 'We showcase a synchronized lazy `DatabaseConnection` singleton plus a switch-based `ShapeFactory`, explaining why constructors stay private and how factories centralize object creation.',
        difficulty: 'advanced',
        topics: ['Singleton', 'Factory', 'Observer', 'Strategy', 'MVC'],
        codeExample: `// Design Patterns - Singleton Example
public class DatabaseConnection {
    private static DatabaseConnection instance;
    private String connectionString;
    
    private DatabaseConnection() {
        connectionString = "jdbc:mysql://localhost:3306/mydb";
    }
    
    public static synchronized DatabaseConnection getInstance() {
        if (instance == null) {
            instance = new DatabaseConnection();
        }
        return instance;
    }
    
    public void connect() {
        System.out.println("Connected to: " + connectionString);
    }
}

// Factory Pattern Example
interface Shape {
    void draw();
}

class ShapeFactory {
    public static Shape createShape(String type) {
        switch (type.toLowerCase()) {
            case "circle": return new Circle();
            case "rectangle": return new Rectangle();
            default: throw new IllegalArgumentException("Unknown shape");
        }
    }
}`,
        explanation: `Each pattern includes intent, class diagrams, and annotated Java implementations so you know when to apply it. Coverage spans creational, structural, and behavioral patterns plus modern twists like dependency injection and event-driven design.`,
        resources: ['Gang of Four Patterns', 'Java Design Patterns', 'When to Use Patterns']
    },

    {
        id: 'lambda-streams',
        title: 'Lambda Expressions & Streams',
        description: 'The stream pipeline filters even numbers, maps them to squares, collects a list, then chains mapToInt/filter/average, so each stage’s role is spelled out in order.',
        difficulty: 'advanced',
        topics: ['Lambda Expressions', 'Stream API', 'Method References', 'Functional Interfaces'],
        codeExample: `// Lambda and Streams
import java.util.*;
import java.util.stream.*;

public class LambdaStreamExample {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        
        // Lambda with Streams
        List<Integer> evenSquares = numbers.stream()
            .filter(n -> n % 2 == 0)           // Lambda expression
            .map(n -> n * n)                   // Method reference alternative: Integer::square
            .collect(Collectors.toList());
        
        System.out.println("Even squares: " + evenSquares);
        
        // More complex stream operations
        OptionalDouble average = numbers.stream()
            .mapToInt(Integer::intValue)
            .filter(n -> n > 5)
            .average();
        
        average.ifPresent(avg -> System.out.println("Average: " + avg));
    }
}`,
        explanation: `Lambda labs emphasize pure functions, higher-order utilities, and fluent stream operations. You'll write collectors, compose predicates, handle optional values, and contrast imperative vs declarative implementations for clarity and parallelism.`,
        resources: ['Java 8 Features', 'Stream API Guide', 'Functional Programming']
    },

    {
        id: 'generics',
        title: 'Java Generics',
        description: 'Generic `Box<T>`, the `<T> void swap` helper, and the bounded `average` method demonstrate how type parameters travel through classes, methods, and Number constraints.',
        difficulty: 'intermediate',
        topics: ['Generic Classes', 'Generic Methods', 'Wildcards', 'Type Erasure', 'Bounds'],
        codeExample: `// Generics Example
public class GenericExample {
    // Generic class
    static class Box<T> {
        private T content;
        
        public void set(T content) {
            this.content = content;
        }
        
        public T get() {
            return content;
        }
    }
    
    // Generic method
    public static <T> void swap(T[] array, int i, int j) {
        T temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    
    // Bounded generics
    public static <T extends Number> double average(T[] numbers) {
        double sum = 0.0;
        for (T num : numbers) {
            sum += num.doubleValue();
        }
        return sum / numbers.length;
    }
}`,
        explanation: `We explore how generics enforce type safety, how wildcards (? extends/? super) guide API design, and what type erasure means at runtime. Exercises include building generic repositories, comparators, and fluent builders without casting.`,
        resources: ['Java Generics Tutorial', 'Type Safety', 'Wildcard Usage']
    },

    {
        id: 'testing-junit',
        title: 'Unit Testing with JUnit',
        description: '`CalculatorTest` uses `@BeforeEach` setup, assertion-based tests, exception checks, and a parameterized suite, clarifying what each annotation adds to the run.',
        difficulty: 'intermediate',
        topics: ['JUnit Basics', 'Test Assertions', 'Test Lifecycle', 'Mocking', 'TDD'],
        codeExample: `// JUnit Testing Example
import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;

public class CalculatorTest {
    private Calculator calculator;
    
    @BeforeEach
    void setUp() {
        calculator = new Calculator();
    }
    
    @Test
    @DisplayName("Addition should work correctly")
    void testAddition() {
        assertEquals(5, calculator.add(2, 3));
        assertEquals(0, calculator.add(-1, 1));
    }
    
    @Test
    void testDivision() {
        assertEquals(2.0, calculator.divide(10, 5), 0.001);
        
        // Testing exceptions
        assertThrows(ArithmeticException.class, () -> {
            calculator.divide(10, 0);
        });
    }
    
    @ParameterizedTest
    @ValueSource(ints = {2, 4, 6, 8})
    void testEvenNumbers(int number) {
        assertTrue(calculator.isEven(number));
    }
}`,
        explanation: `Beyond basic assertions, you will organize tests with lifecycle hooks, parameterized inputs, and nested suites. We also integrate mocks, coverage targets, and CI habits so your codebase gains reliable regression protection.`,
        resources: ['JUnit 5 Guide', 'Test Driven Development', 'Mocking Frameworks']
    },

    // DATABASE & WEB CONCEPTS

    {
        id: 'jdbc-basics',
        title: 'Database Connectivity (JDBC)',
        description: '`getStudents` and `insertStudent` open connections with try-with-resources, build statements (plain vs prepared), bind parameters, and iterate result sets so database I/O order is explicit.',
        difficulty: 'intermediate',
        topics: ['JDBC Drivers', 'Connection', 'Statement', 'ResultSet', 'Prepared Statements'],
        codeExample: `// JDBC Example
import java.sql.*;

public class JDBCExample {
    private static final String URL = "jdbc:mysql://localhost:3306/school";
    private static final String USER = "username";
    private static final String PASSWORD = "password";
    
    public static void getStudents() {
        try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery("SELECT * FROM students")) {
            
            while (rs.next()) {
                System.out.println("ID: " + rs.getInt("id") + 
                                 ", Name: " + rs.getString("name"));
            }
        } catch (SQLException e) {
            System.out.println("Database error: " + e.getMessage());
        }
    }
    
    public static void insertStudent(String name, int age) {
        String sql = "INSERT INTO students (name, age) VALUES (?, ?)";
        try (Connection conn = DriverManager.getConnection(URL, USER, PASSWORD);
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            
            pstmt.setString(1, name);
            pstmt.setInt(2, age);
            pstmt.executeUpdate();
        } catch (SQLException e) {
            System.out.println("Error inserting student: " + e.getMessage());
        }
    }
}`,
        explanation: `JDBC coverage includes driver setup, connection pooling, prepared statements, and transaction management. You'll practice defensive coding against SQL injection, map result sets to objects, and compare raw JDBC with higher-level ORM approaches.`,
        resources: ['JDBC Tutorial', 'SQL Basics', 'Database Best Practices']
    }
];

const MODULE_DEFINITION_FALLBACK_TERMS = {
    en: ['Time Complexity', 'Space Complexity', 'Edge Case', 'Invariant', 'Pattern'],
    es: ['Complejidad temporal', 'Complejidad espacial', 'Caso limite', 'Invariante', 'Patron']
};

function toModuleClassName(moduleId = '') {
    const normalized = String(moduleId || '')
        .split(/[^a-zA-Z0-9]+/)
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join('');
    return normalized || 'ModuleDemo';
}

function escapeForJavaString(value) {
    return String(value || '')
        .replace(/\\/g, '\\\\')
        .replace(/"/g, '\\"');
}

function isLikelyJavaSnippet(source) {
    const code = String(source || '');
    return /\bclass\s+[A-Za-z_]\w*\b/.test(code)
        || /\bpublic\s+static\s+void\s+main\s*\(/.test(code)
        || /System\.out\.print/.test(code)
        || /\bimport\s+java\./.test(code);
}

function buildFallbackJavaSnippet(module) {
    const className = toModuleClassName(module?.id);
    const title = escapeForJavaString(module?.title || 'Module');
    const description = escapeForJavaString(module?.description || '');
    const topics = Array.isArray(module?.topics) ? module.topics : [];
    const topicPrintLines = topics.map((topic) => `        System.out.println("- ${escapeForJavaString(topic)}");`).join('\n');
    return `import java.util.*;\n\npublic class ${className} {\n    public static void main(String[] args) {\n        // High-level module walkthrough marker\n        System.out.println("Running module: ${title}");\n        System.out.println("${description}");\n        System.out.println("Topic checklist:");\n${topicPrintLines || '        System.out.println("- No topics listed.");'}\n        System.out.println("Sample completed.");\n    }\n}`;
}

function buildGitJavaSnippet() {
    return `import java.util.*;\n\npublic class GitBasicsWorkflowDemo {\n    static void section(String label) {\n        System.out.println("\\n=== " + label + " ===");\n    }\n\n    static void command(String cmd, String... output) {\n        System.out.println("$ " + cmd);\n        if (output.length == 0) {\n            System.out.println("  (no stdout)");\n            return;\n        }\n        for (String line : output) {\n            System.out.println("  " + line);\n        }\n    }\n\n    public static void main(String[] args) {\n        section("Git Basics Terminal Walkthrough");\n        System.out.println("Goal: show a safe branch-based workflow from init -> commit -> review -> merge -> undo.");\n        System.out.println("Model: working tree -> staging area -> commit history.");\n\n        section("Repository Setup");\n        command("git init", "Initialized empty Git repository in ./cs-atlas-demo/.git/");\n        command("git branch -M main", "Current branch renamed to main.");\n        command("git remote add origin https://github.com/your-org/cs-atlas-demo.git", "Remote 'origin' added.");\n\n        section("Staging and Commits");\n        command("git add README.md", "README.md moved to staging area.");\n        command("git commit -m \\"docs: add project overview\\"", "[main abc1234] docs: add project overview", " 1 file changed, 8 insertions(+)");\n        command("git status", "On branch main", "nothing to commit, working tree clean");\n\n        section("Branching and Merging");\n        command("git checkout -b feature/auth-flow", "Switched to a new branch 'feature/auth-flow'");\n        command("git push -u origin feature/auth-flow", "Branch pushed and tracking set.");\n        command("git checkout main && git merge --no-ff feature/auth-flow", "Merge made by the 'ort' strategy.");\n\n        section("Safe Undo");\n        command("git restore --staged README.md", "README.md unstaged (changes kept locally).");\n        command("git revert abc1234", "Created revert commit to safely undo shared history.");\n\n        section("Summary");\n        System.out.println("Use small commits, feature branches, pull/rebase before pushing, and revert for shared undo.");\n        System.out.println("Workflow complete.");\n    }\n}`;
}

function addComprehensiveHeaderComments(module, javaCode) {
    const topics = Array.isArray(module?.topics) ? module.topics : [];
    const header = [
        '/*',
        ` * ${module?.title || 'Module'} - Comprehensive guided sample`,
        ' * Coverage goals:',
        ...topics.map((topic, index) => ` * ${index + 1}) ${topic}`),
        ' * Reading strategy:',
        ' * - Follow inline comments from top to bottom.',
        ' * - Run once, then edit one concept at a time and rerun.',
        ' * - Verify output after each logical step.',
        ' */'
    ].join('\n');
    return `${header}\n${String(javaCode || '').trim()}`;
}

function ensureJavaSnippetHasVisibleOutput(module, javaCode) {
    const source = String(javaCode || '').trim();
    if (!source) return buildFallbackJavaSnippet(module);
    if (/(System\.out\.print|System\.out\.println)/.test(source)) {
        return source;
    }
    const runLine = `System.out.println("Running ${escapeForJavaString(module?.title || 'module')} sample...");`;
    if (/public\s+static\s+void\s+main\s*\([^)]*\)\s*\{/.test(source)) {
        return source.replace(
            /(public\s+static\s+void\s+main\s*\([^)]*\)\s*\{)/,
            `$1\n        // Runtime marker for learners\n        ${runLine}`
        );
    }
    return `${source}\n\nclass ${toModuleClassName(module?.id)}RuntimeMarker {\n    public static void main(String[] args) {\n        ${runLine}\n    }\n}`;
}

function escapeForQuotedString(value) {
    return String(value || '')
        .replace(/\\/g, '\\\\')
        .replace(/"/g, '\\"');
}

function extractJavaSignalLines(javaSource) {
    const source = String(javaSource || '');
    const signals = [];
    const regex = /System\.out\.println\("([^"]+)"\)/g;
    let match;
    while ((match = regex.exec(source)) && signals.length < 6) {
        const text = String(match[1] || '').trim();
        if (text && !signals.includes(text)) {
            signals.push(text);
        }
    }
    return signals;
}

function hasVisibleOutputForLanguage(language, source) {
    const code = String(source || '');
    if (!code.trim()) return false;
    if (language === 'java') return /(System\.out\.print|System\.out\.println)/.test(code);
    if (language === 'cpp') return /(cout\s*<<|printf\s*\()/.test(code);
    if (language === 'python') return /\bprint\s*\(/.test(code);
    if (language === 'javascript') return /(console\.log|process\.stdout\.write)/.test(code);
    return true;
}

function buildCppMirrorSnippet(module, javaSource) {
    const title = escapeForQuotedString(module?.title || 'Module');
    const description = escapeForQuotedString(module?.description || '');
    const topics = (module?.topics || []).slice(0, 6).map((topic) => escapeForQuotedString(topic));
    const signals = extractJavaSignalLines(javaSource).map((line) => escapeForQuotedString(line));
    return `#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n    // C++ mirror of the updated Java module sample.\n    string moduleTitle = "${title}";\n    string moduleDescription = "${description}";\n    vector<string> topics = {${topics.map((t) => `"${t}"`).join(', ') || '"No topics listed"'}};\n    vector<string> javaSignals = {${signals.map((s) => `"${s}"`).join(', ') || '"Java sample executed"'}};\n\n    // 1) High-level module context\n    cout << "Running module: " << moduleTitle << "\\n";\n    cout << moduleDescription << "\\n";\n\n    // 2) Topic checklist to ensure full conceptual coverage\n    cout << "Topic checklist:\\n";\n    for (size_t i = 0; i < topics.size(); i++) {\n        cout << "- " << topics[i] << "\\n";\n    }\n\n    // 3) Java parity markers (mirrors important Java output checkpoints)\n    cout << "Parity checkpoints from Java sample:\\n";\n    for (const auto& line : javaSignals) {\n        cout << "* " << line << "\\n";\n    }\n\n    cout << "C++ parity sample completed.\\n";\n    return 0;\n}`;
}

function buildPythonMirrorSnippet(module, javaSource) {
    const title = String(module?.title || 'Module');
    const description = String(module?.description || '');
    const topics = (module?.topics || []).slice(0, 6);
    const signals = extractJavaSignalLines(javaSource);
    return `# Python mirror of the updated Java module sample.\n# This script keeps the same conceptual checkpoints and prints them clearly.\n\ndef run_module_demo():\n    module_title = "${escapeForQuotedString(title)}"\n    module_description = "${escapeForQuotedString(description)}"\n    topics = [${topics.map((t) => `"${escapeForQuotedString(t)}"`).join(', ') || '"No topics listed"'}]\n    java_signals = [${signals.map((s) => `"${escapeForQuotedString(s)}"`).join(', ') || '"Java sample executed"'}]\n\n    # 1) High-level module context\n    print(f"Running module: {module_title}")\n    print(module_description)\n\n    # 2) Topic checklist for complete coverage\n    print("Topic checklist:")\n    for topic in topics:\n        print(f"- {topic}")\n\n    # 3) Java parity markers to confirm aligned intent\n    print("Parity checkpoints from Java sample:")\n    for line in java_signals:\n        print(f"* {line}")\n\n    print("Python parity sample completed.")\n\nif __name__ == \"__main__\":\n    run_module_demo()\n`;
}

function buildJavascriptMirrorSnippet(module, javaSource) {
    const title = escapeForQuotedString(module?.title || 'Module');
    const description = escapeForQuotedString(module?.description || '');
    const topics = (module?.topics || []).slice(0, 6).map((topic) => escapeForQuotedString(topic));
    const signals = extractJavaSignalLines(javaSource).map((line) => escapeForQuotedString(line));
    return `// JavaScript mirror of the updated Java module sample.\n// This preserves the same instructional checkpoints and visible output.\n(function runModuleDemo() {\n    const moduleTitle = "${title}";\n    const moduleDescription = "${description}";\n    const topics = [${topics.map((t) => `"${t}"`).join(', ') || '"No topics listed"'}];\n    const javaSignals = [${signals.map((s) => `"${s}"`).join(', ') || '"Java sample executed"'}];\n\n    // 1) High-level module context\n    console.log("Running module: " + moduleTitle);\n    console.log(moduleDescription);\n\n    // 2) Topic checklist for complete conceptual coverage\n    console.log("Topic checklist:");\n    topics.forEach((topic) => console.log("- " + topic));\n\n    // 3) Java parity markers to align with the canonical Java sample\n    console.log("Parity checkpoints from Java sample:");\n    javaSignals.forEach((line) => console.log("* " + line));\n\n    console.log("JavaScript parity sample completed.");\n})();\n`;
}

function buildMirrorSnippetByLanguage(module, javaSource, language) {
    if (language === 'cpp') return buildCppMirrorSnippet(module, javaSource);
    if (language === 'python') return buildPythonMirrorSnippet(module, javaSource);
    if (language === 'javascript') return buildJavascriptMirrorSnippet(module, javaSource);
    return '';
}

function slugifyTopicKey(topic = '', fallback = 'topic') {
    const normalized = String(topic || '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
    return normalized || fallback;
}

function buildGeneratedSetTitle(topic, index) {
    const en = String(topic || `Topic ${index + 1}`).trim() || `Topic ${index + 1}`;
    return {
        en,
        es: en
    };
}

function buildGeneratedSetDescription(module, topic, index, totalTopics) {
    const title = String(module?.title || 'Module');
    if (module?.id === 'git-basics-workflow') {
        const en = `Topic ${index + 1} of ${totalTopics}: ${topic}. Terminal-first walkthrough with realistic Git command output and safe workflow checkpoints.`;
        const es = `Tema ${index + 1} de ${totalTopics}: ${topic}. Recorrido enfocado en terminal con salida realista de comandos Git y checkpoints de flujo seguro.`;
        return { en, es };
    }
    const en = `Topic ${index + 1} of ${totalTopics}: ${topic}. Guided walkthrough with checkpoints and printed results for ${title}.`;
    const es = `Tema ${index + 1} de ${totalTopics}: ${topic}. Recorrido guiado con validaciones y salida visible para ${title}.`;
    return { en, es };
}

function getGitWorkflowTopicScript(topic, topicIndex = 0) {
    const normalized = slugifyTopicKey(topic, `topic-${topicIndex + 1}`);
    const scripts = {
        'repository-setup': {
            objective: 'Initialize a repository correctly and confirm project state.',
            commands: [
                ['mkdir cs-atlas-demo', 'Created folder cs-atlas-demo'],
                ['cd cs-atlas-demo', 'Now inside ./cs-atlas-demo'],
                ['git init', 'Initialized empty Git repository in ./cs-atlas-demo/.git/'],
                ['git branch -M main', 'Current branch renamed to main'],
                ['git remote add origin https://github.com/your-org/cs-atlas-demo.git', "Remote 'origin' registered"],
                ['git status', 'On branch main', 'No commits yet', 'nothing to commit (create/copy files and use "git add" to track)']
            ],
            recap: 'Repository is initialized, on main, and connected to origin.'
        },
        'staging-and-commits': {
            objective: 'Stage only what belongs in the next commit and record a clean snapshot.',
            commands: [
                ['echo "# CS Atlas Demo" > README.md', 'README.md created'],
                ['git status', 'Untracked files: README.md'],
                ['git add README.md', 'Changes staged for commit'],
                ['git commit -m "docs: add initial README"', '[main 9f31a2d] docs: add initial README', ' 1 file changed, 1 insertion(+)'],
                ['git log --oneline -n 2', '9f31a2d docs: add initial README']
            ],
            recap: 'Working tree is clean and commit history contains one intentional snapshot.'
        },
        'branching-and-merging': {
            objective: 'Isolate feature work and merge it back to main safely.',
            commands: [
                ['git checkout -b feature/profile-layout', "Switched to a new branch 'feature/profile-layout'"],
                ['git add profile.html', 'profile.html staged'],
                ['git commit -m "feat: improve profile layout"', '[feature/profile-layout 51ab44f] feat: improve profile layout'],
                ['git checkout main', "Switched to branch 'main'"],
                ['git merge --no-ff feature/profile-layout', "Merge made by the 'ort' strategy"]
            ],
            recap: 'Feature branch work merged into main with explicit merge history.'
        },
        'pull-rebase-basics': {
            objective: 'Sync your branch with upstream changes before pushing.',
            commands: [
                ['git fetch origin', 'Fetched latest remote refs'],
                ['git checkout feature/profile-layout', "Switched to branch 'feature/profile-layout'"],
                ['git pull --rebase origin main', 'Rebased current branch on top of origin/main'],
                ['git status', 'On branch feature/profile-layout', 'nothing to commit, working tree clean'],
                ['git push -u origin feature/profile-layout', 'Branch pushed and tracking set']
            ],
            recap: 'Your feature branch is updated with main and safe to open for review.'
        },
        'merge-conflict-basics': {
            objective: 'Resolve conflicts intentionally and finish the integration cleanly.',
            commands: [
                ['git merge feature/profile-layout', 'Auto-merging profile.html', 'CONFLICT (content): Merge conflict in profile.html'],
                ['git status', 'You have unmerged paths.', 'both modified: profile.html'],
                ['# edit profile.html and remove <<<<<<< ======= >>>>>>> markers', 'File manually resolved'],
                ['git add profile.html', 'Conflict marked as resolved'],
                ['git commit -m "fix: resolve profile layout merge conflict"', '[main 7ce31a1] fix: resolve profile layout merge conflict']
            ],
            recap: 'Conflict resolved by editing final content, then staging and committing resolution.'
        },
        'remote-collaboration': {
            objective: 'Collaborate through tracked branches and pull requests.',
            commands: [
                ['git clone https://github.com/your-org/cs-atlas-demo.git', 'Repository cloned locally'],
                ['git checkout -b feature/study-notes', "Switched to new branch 'feature/study-notes'"],
                ['git push -u origin feature/study-notes', 'Remote branch created and tracking enabled'],
                ['# open Pull Request on GitHub/GitLab', 'Review requested from teammates'],
                ['git pull origin main', 'Merged latest main updates into local branch']
            ],
            recap: 'Branch tracking and PR reviews keep team changes organized and auditable.'
        },
        'safe-undo-with-restore-revert': {
            objective: 'Use restore for local cleanup and revert for shared-history undo.',
            commands: [
                ['git restore --staged app.js', 'app.js removed from staging area'],
                ['git restore app.js', 'Local uncommitted changes in app.js discarded'],
                ['git revert 9f31a2d', 'Created new revert commit that undoes 9f31a2d safely'],
                ['git log --oneline -n 3', '3d22d11 revert: docs add initial README', '9f31a2d docs: add initial README'],
                ['git status', 'nothing to commit, working tree clean']
            ],
            recap: 'restore = local cleanup, revert = safe shared-history undo.'
        }
    };
    return scripts[normalized] || scripts['repository-setup'];
}

function buildGitTopicJavaSnippet(module, topic, topicIndex, totalTopics) {
    const className = `${toModuleClassName(module?.id)}Topic${topicIndex + 1}Set`;
    const moduleTitle = escapeForJavaString(module?.title || 'Git Module');
    const focusTopic = escapeForJavaString(topic || `Topic ${topicIndex + 1}`);
    const script = getGitWorkflowTopicScript(topic, topicIndex);
    const objective = escapeForJavaString(script.objective);
    const recap = escapeForJavaString(script.recap);
    const topicLines = (Array.isArray(module?.topics) ? module.topics : [])
        .map((item, idx) => `        System.out.println("${idx + 1}. ${escapeForJavaString(item)}");`)
        .join('\n');
    const commandLines = script.commands
        .map(([cmd, ...output]) => {
            const escapedCommand = escapeForJavaString(cmd);
            if (!output.length) return `        command("${escapedCommand}");`;
            const outputArgs = output.map((line) => `"${escapeForJavaString(line)}"`).join(', ');
            return `        command("${escapedCommand}", ${outputArgs});`;
        })
        .join('\n');

    return `import java.util.*;\n\npublic class ${className} {\n    static void section(String label) {\n        System.out.println("\\n=== " + label + " ===");\n    }\n\n    static void command(String cmd, String... output) {\n        System.out.println("$ " + cmd);\n        if (output.length == 0) {\n            System.out.println("  (no stdout)");\n            return;\n        }\n        for (String line : output) {\n            System.out.println("  " + line);\n        }\n    }\n\n    public static void main(String[] args) {\n        section("Git Terminal Simulation");\n        System.out.println("Module: ${moduleTitle}");\n        System.out.println("Focus topic (${topicIndex + 1}/${totalTopics}): ${focusTopic}");\n        System.out.println("Objective: ${objective}");\n        System.out.println("Topic map:");\n${topicLines || '        System.out.println("1. No topics listed.");'}\n\n        section("${focusTopic}");\n${commandLines || '        command("git status", "No commands configured for this topic.");'}\n\n        section("Summary");\n        System.out.println("${recap}");\n        System.out.println("Practice: replay these commands in a real terminal with a throwaway repo.");\n        System.out.println("Git topic walkthrough complete: ${focusTopic}");\n    }\n}`;
}

function buildTopicFocusedJavaSnippet(module, topic, topicIndex, totalTopics) {
    if (module?.id === 'git-basics-workflow') {
        return buildGitTopicJavaSnippet(module, topic, topicIndex, totalTopics);
    }
    const className = `${toModuleClassName(module?.id)}Topic${topicIndex + 1}Set`;
    const moduleTitle = escapeForJavaString(module?.title || 'Module');
    const moduleDescription = escapeForJavaString(module?.description || '');
    const focusTopic = escapeForJavaString(topic || `Topic ${topicIndex + 1}`);
    const topics = Array.isArray(module?.topics) ? module.topics : [];
    const topicLines = topics.map((item, idx) => `        System.out.println("${idx + 1}. ${escapeForJavaString(item)}");`).join('\n');
    const complexitySeed = Math.max(1, (topicIndex + 1) * 3);

    return `import java.util.*;\n\npublic class ${className} {\n    // Deterministic helper so learners can verify output after each edit.\n    static int guidedComputation(int seed) {\n        int total = 0;\n        for (int step = 1; step <= 5; step++) {\n            total += seed * step;\n            System.out.println("Step " + step + " -> running total: " + total);\n        }\n        return total;\n    }\n\n    static void printTopicChecklist(List<String> topics) {\n        System.out.println("Topic checklist:");\n        for (int i = 0; i < topics.size(); i++) {\n            System.out.println((i + 1) + ". " + topics.get(i));\n        }\n    }\n\n    public static void main(String[] args) {\n        // Module context first so the learner sees where this snippet fits.\n        String moduleTitle = "${moduleTitle}";\n        String moduleDescription = "${moduleDescription}";\n        String focusTopic = "${focusTopic}";\n        List<String> topics = Arrays.asList(${topics.map((item) => `"${escapeForJavaString(item)}"`).join(', ') || `"${focusTopic}"`});\n\n        System.out.println("Module: " + moduleTitle);\n        System.out.println("Focus topic (${topicIndex + 1}/${totalTopics}): " + focusTopic);\n        System.out.println(moduleDescription);\n\n        // Print all module topics so this split example stays connected to the full module.\n${topicLines || '        System.out.println("1. No topics listed.");'}\n\n        // Guided computation with explicit checkpoints and visible output.\n        int baseline = ${complexitySeed};\n        System.out.println("Baseline value: " + baseline);\n        int result = guidedComputation(baseline);\n        System.out.println("Final computed result: " + result);\n\n        // Reflection prompts are printed so output is always meaningful.\n        System.out.println("Reflection: explain how " + focusTopic + " influences implementation choices.");\n        System.out.println("Practice: modify baseline, rerun, and compare output transitions.");\n\n        // Summary line makes expected output deterministic for fallbacks.\n        System.out.println("Topic sample completed: " + focusTopic);\n    }\n}`;
}

function buildTopicFocusedAssemblySnippet(module, topic, topicIndex, totalTopics) {
    const moduleTitle = String(module?.title || 'Assembly Module');
    const focusTopic = String(topic || `Topic ${topicIndex + 1}`);
    return `; ${moduleTitle} - ${focusTopic}
; Topic ${topicIndex + 1} of ${totalTopics}
; Guided assembly sample for module-card viewing and output fallback notes.
; Goal: trace registers, memory changes, and branch flow step by step.
; Focus checklist:
; 1) Initialize registers safely
; 2) Execute deterministic operations
; 3) Observe control flow and exit cleanly

section .data
    out_msg db "Assembly topic: ${focusTopic}", 10
    out_len equ $ - out_msg

section .text
    global _start
_start:
    ; Initialize registers
    xor rax, rax
    mov rbx, ${topicIndex + 2}
    add rax, rbx

    ; Print topic message (Linux syscall write)
    mov rax, 1
    mov rdi, 1
    mov rsi, out_msg
    mov rdx, out_len
    syscall

    ; Exit (Linux syscall exit)
    mov rax, 60
    xor rdi, rdi
    syscall
`;
}

function buildGeneratedCodeExampleSets(module) {
    const topics = Array.isArray(module?.topics) ? module.topics.filter(Boolean) : [];
    if (!topics.length) return [];
    const isAssembly = MODULE_CATEGORY_BY_ID[module.id] === 'assembly';

    return topics.map((topic, index) => ({
        id: slugifyTopicKey(topic, `topic-${index + 1}`),
        title: buildGeneratedSetTitle(topic, index),
        description: buildGeneratedSetDescription(module, topic, index, topics.length),
        codeExamples: isAssembly
            ? {
                assembly: buildTopicFocusedAssemblySnippet(module, topic, index, topics.length),
                java: buildTopicFocusedJavaSnippet(module, topic, index, topics.length)
            }
            : {
                java: buildTopicFocusedJavaSnippet(module, topic, index, topics.length)
            }
    }));
}

function buildModuleDefinitions(module, language = 'en') {
    const lang = language === 'es' ? 'es' : 'en';
    const title = String(module?.title || (lang === 'es' ? 'este modulo' : 'this module'));
    const topics = Array.isArray(module?.topics) ? module.topics.filter(Boolean) : [];
    const terms = [];
    topics.forEach((topic) => {
        if (!terms.includes(topic)) terms.push(topic);
    });
    MODULE_DEFINITION_FALLBACK_TERMS[lang].forEach((term) => {
        if (!terms.includes(term)) terms.push(term);
    });
    return terms.slice(0, 5).map((term) => {
        if (lang === 'es') {
            return {
                term,
                definition: `${term} es un concepto esencial en ${title}; dominelo para razonar mejor sobre implementacion y correccion.`
            };
        }
        return {
            term,
            definition: `${term} is a core concept in ${title}; master it to reason clearly about implementation and correctness.`
        };
    });
}

function extractQuotedStringLiterals(value = '') {
    const literals = [];
    const regex = /"([^"\\]*(?:\\.[^"\\]*)*)"/g;
    let match;
    while ((match = regex.exec(String(value || '')))) {
        const raw = String(match[1] || '');
        const cleaned = raw
            .replace(/\\"/g, '"')
            .replace(/\\n/g, '')
            .trim();
        if (!cleaned) continue;
        if (!literals.includes(cleaned)) literals.push(cleaned);
    }
    return literals;
}

function inferOutputLinesFromSnippet(language, snippet) {
    const source = String(snippet || '');
    const lines = source.split('\n');
    const inferred = [];

    const pushInferred = (value) => {
        const text = String(value || '').trim();
        if (!text) return;
        if (!inferred.includes(text)) inferred.push(text);
    };

    const parseLine = (line, regex) => {
        const match = line.match(regex);
        if (!match || !match[1]) return;
        const literals = extractQuotedStringLiterals(match[1]);
        if (literals.length) {
            pushInferred(literals.join(' '));
        }
    };

    lines.forEach((line) => {
        const trimmed = line.trim();
        if (!trimmed) return;
        if (language === 'java') {
            parseLine(trimmed, /System\.out\.print(?:ln)?\((.+)\)\s*;/);
        } else if (language === 'cpp') {
            parseLine(trimmed, /cout\s*<<\s*(.+)\s*;/);
        } else if (language === 'python') {
            parseLine(trimmed, /\bprint\s*\((.+)\)\s*$/);
        } else if (language === 'javascript') {
            parseLine(trimmed, /console\.(?:log|info|warn|error)\((.+)\)\s*;?/);
        }
    });

    return inferred.slice(0, 8);
}

function buildAssemblyExpectedOutput(module, snippet = '') {
    const source = String(snippet || '');
    const notes = source
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.startsWith(';'))
        .map((line) => line.replace(/^;\s*/, ''))
        .filter(Boolean)
        .slice(0, 3);

    const lines = [
        'Assembly sample (view-only).',
        `Module: ${module?.title || 'Assembly Module'}`,
        'Expected behavior: step through registers/memory comments and operation flow.'
    ];
    if (notes.length) {
        lines.push(...notes);
    }
    return lines.join('\n');
}

function buildGeneratedExpectedOutput(module, language, snippet = '') {
    if (language === 'assembly') {
        return buildAssemblyExpectedOutput(module, snippet);
    }
    const inferred = inferOutputLinesFromSnippet(language, snippet);
    if (inferred.length) {
        return inferred.join('\n');
    }
    const languageNames = {
        java: 'Java',
        cpp: 'C++',
        python: 'Python',
        javascript: 'JavaScript',
        assembly: 'Assembly'
    };
    const languageLabel = languageNames[language] || language;
    return [
        'Execution complete.',
        `Module: ${module?.title || 'Module sample'}`,
        `Language: ${languageLabel}`
    ].join('\n');
}

function ensureExpectedOutputsForCodeExamples(module, codeExamples = {}, existingExpectedOutputs = {}) {
    const normalized = {};
    const languages = Object.keys(codeExamples || {});
    languages.forEach((language) => {
        const existing = typeof existingExpectedOutputs?.[language] === 'string'
            ? existingExpectedOutputs[language].trim()
            : '';
        if (existing) {
            normalized[language] = existing;
            return;
        }
        normalized[language] = buildGeneratedExpectedOutput(module, language, codeExamples[language]);
    });
    return normalized;
}

const MODULE_CODE_EXAMPLE_SET_OVERRIDES = {
    'java-basics': [
        {
            id: 'variables',
            title: { en: 'Variables', es: 'Variables' },
            description: { en: 'Declare, update, and print variables while tracking scope and naming.', es: 'Declara, actualiza e imprime variables mientras controlas alcance y nombres.' },
            codeExamples: {
                java: `// Variables in Java: declaration, mutation, and scope
public class VariablesDemo {
    public static void main(String[] args) {
        // 1) Primitive variable declarations
        int age = 19;
        double gpa = 3.85;
        boolean enrolled = true;
        char grade = 'A';

        // 2) Reference variable declaration
        String studentName = "Jordan";

        // 3) Mutation / reassignment
        age = age + 1; // birthday update
        gpa = Math.round(gpa * 100.0) / 100.0;

        // 4) Local scope example
        {
            int semesterCredits = 15;
            System.out.println("Scoped credits: " + semesterCredits);
        }

        // 5) Final output summary
        System.out.println("Student: " + studentName);
        System.out.println("Age next year: " + age);
        System.out.println("GPA: " + gpa);
        System.out.println("Enrolled: " + enrolled + ", grade target: " + grade);
    }
}`
            }
        },
        {
            id: 'data-types',
            title: { en: 'Data Types', es: 'Tipos de Datos' },
            description: { en: 'Use primitives and reference types with clear output for each value.', es: 'Usa tipos primitivos y de referencia con salida clara para cada valor.' },
            codeExamples: {
                java: `// Java data types: primitive and reference side-by-side
import java.util.Arrays;

public class DataTypesDemo {
    public static void main(String[] args) {
        // Primitive types
        byte small = 120;
        short medium = 32000;
        int count = 250000;
        long population = 8_000_000_000L;
        float ratio = 0.75f;
        double pi = 3.1415926535;
        boolean active = true;
        char initial = 'J';

        // Reference types
        String course = "Java Fundamentals";
        int[] scores = {92, 88, 95};

        System.out.println("byte=" + small + ", short=" + medium + ", int=" + count);
        System.out.println("long=" + population + ", float=" + ratio + ", double=" + pi);
        System.out.println("boolean=" + active + ", char=" + initial);
        System.out.println("String=" + course);
        System.out.println("Array=" + Arrays.toString(scores));
    }
}`
            }
        },
        {
            id: 'methods',
            title: { en: 'Methods', es: 'Métodos' },
            description: { en: 'Define reusable methods with parameters and return values.', es: 'Define métodos reutilizables con parámetros y valores de retorno.' },
            codeExamples: {
                java: `// Methods: parameters, return values, and reuse
public class MethodsDemo {
    public static int add(int a, int b) {
        return a + b;
    }

    public static double average(int x, int y, int z) {
        return (x + y + z) / 3.0;
    }

    public static void printBanner(String title) {
        System.out.println("==== " + title + " ====");
    }

    public static void main(String[] args) {
        printBanner("Method Results");
        int sum = add(7, 5);
        double avg = average(90, 85, 95);

        System.out.println("add(7, 5) = " + sum);
        System.out.println("average(90,85,95) = " + avg);
    }
}`
            }
        },
        {
            id: 'classes',
            title: { en: 'Classes', es: 'Clases' },
            description: { en: 'Create a class blueprint with fields, constructor, and behavior.', es: 'Crea una plantilla de clase con campos, constructor y comportamiento.' },
            codeExamples: {
                java: `// Classes as blueprints: fields + constructor + behavior
class Course {
    String code;
    String title;
    int credits;

    Course(String code, String title, int credits) {
        this.code = code;
        this.title = title;
        this.credits = credits;
    }

    String summary() {
        return code + " - " + title + " (" + credits + " credits)";
    }
}

public class ClassesDemo {
    public static void main(String[] args) {
        Course c1 = new Course("CSC-261", "Data Structures", 3);
        Course c2 = new Course("CSC-350", "Software Engineering", 3);

        System.out.println("Course 1: " + c1.summary());
        System.out.println("Course 2: " + c2.summary());
    }
}`
            }
        },
        {
            id: 'objects',
            title: { en: 'Objects', es: 'Objetos' },
            description: { en: 'Instantiate objects, mutate state, and call instance methods.', es: 'Instancia objetos, modifica estado y llama métodos de instancia.' },
            codeExamples: {
                java: `// Objects: create instances, mutate fields, invoke methods
class Student {
    private final String name;
    private int completedModules;

    Student(String name) {
        this.name = name;
        this.completedModules = 0;
    }

    void completeModule() {
        completedModules++;
    }

    String progress() {
        return name + " completed " + completedModules + " module(s).";
    }
}

public class ObjectsDemo {
    public static void main(String[] args) {
        Student a = new Student("Avery");
        Student b = new Student("Morgan");

        a.completeModule();
        a.completeModule();
        b.completeModule();

        System.out.println(a.progress());
        System.out.println(b.progress());
    }
}`
            }
        }
    ],
    'control-flow': [
        {
            id: 'if-else',
            title: { en: 'If / Else Logic', es: 'Lógica If / Else' },
            description: { en: 'Branch execution by condition checks.', es: 'Ramifica la ejecución según condiciones.' },
            codeExamples: {
                java: `// If/Else logic for score classification
public class IfElseDemo {
    public static void main(String[] args) {
        int score = 84;

        if (score >= 90) {
            System.out.println("Grade: A");
        } else if (score >= 80) {
            System.out.println("Grade: B");
        } else if (score >= 70) {
            System.out.println("Grade: C");
        } else {
            System.out.println("Grade: Needs Improvement");
        }
    }
}`
            }
        },
        {
            id: 'for-loops',
            title: { en: 'For Loops', es: 'Bucles For' },
            description: { en: 'Count and iterate over ranges predictably.', es: 'Cuenta e itera rangos de forma predecible.' },
            codeExamples: {
                java: `// For loop counting + accumulation
public class ForLoopDemo {
    public static void main(String[] args) {
        int total = 0;
        for (int i = 1; i <= 5; i++) {
            total += i;
            System.out.println("i=" + i + ", running total=" + total);
        }
        System.out.println("Final total: " + total);
    }
}`
            }
        },
        {
            id: 'while-loops',
            title: { en: 'While Loops', es: 'Bucles While' },
            description: { en: 'Repeat while a condition remains true.', es: 'Repite mientras una condición sea verdadera.' },
            codeExamples: {
                java: `// While loop for countdown
public class WhileLoopDemo {
    public static void main(String[] args) {
        int countdown = 5;
        while (countdown > 0) {
            System.out.println("Countdown: " + countdown);
            countdown--;
        }
        System.out.println("Lift off!");
    }
}`
            }
        },
        {
            id: 'switch',
            title: { en: 'Switch Statements', es: 'Sentencias Switch' },
            description: { en: 'Route behavior based on discrete values.', es: 'Enruta el comportamiento según valores discretos.' },
            codeExamples: {
                java: `// Switch statement for menu actions
public class SwitchDemo {
    public static void main(String[] args) {
        String command = "SAVE";
        switch (command) {
            case "OPEN":
                System.out.println("Opening project...");
                break;
            case "SAVE":
                System.out.println("Saving project...");
                break;
            case "RUN":
                System.out.println("Running code...");
                break;
            default:
                System.out.println("Unknown command.");
        }
    }
}`
            }
        },
        {
            id: 'break-continue',
            title: { en: 'Break and Continue', es: 'Break y Continue' },
            description: { en: 'Control loop flow by skipping or stopping iterations.', es: 'Controla el flujo del bucle saltando o deteniendo iteraciones.' },
            codeExamples: {
                java: `// break and continue in one loop
public class BreakContinueDemo {
    public static void main(String[] args) {
        for (int i = 1; i <= 10; i++) {
            if (i % 2 == 0) {
                continue; // skip even numbers
            }
            if (i > 7) {
                break; // stop after 7
            }
            System.out.println("Processed odd value: " + i);
        }
        System.out.println("Loop complete.");
    }
}`
            }
        }
    ],
    'oop-basics': [
        {
            id: 'encapsulation',
            title: { en: 'Encapsulation', es: 'Encapsulación' },
            description: { en: 'Protect internal state with private fields and methods.', es: 'Protege el estado interno con campos y métodos privados.' },
            codeExamples: {
                java: `// Encapsulation with getters/setters and validation
class BankAccount {
    private double balance;

    public BankAccount(double startingBalance) {
        this.balance = Math.max(0, startingBalance);
    }

    public void deposit(double amount) {
        if (amount > 0) balance += amount;
    }

    public boolean withdraw(double amount) {
        if (amount <= 0 || amount > balance) return false;
        balance -= amount;
        return true;
    }

    public double getBalance() {
        return balance;
    }
}

public class EncapsulationDemo {
    public static void main(String[] args) {
        BankAccount acct = new BankAccount(100);
        acct.deposit(50);
        boolean ok = acct.withdraw(90);
        System.out.println("Withdraw success: " + ok);
        System.out.println("Current balance: " + acct.getBalance());
    }
}`
            }
        },
        {
            id: 'inheritance',
            title: { en: 'Inheritance', es: 'Herencia' },
            description: { en: 'Reuse behavior from a parent class.', es: 'Reutiliza comportamiento desde una clase base.' },
            codeExamples: {
                java: `// Inheritance: subclass extends parent behavior
class Vehicle {
    protected String brand;

    Vehicle(String brand) {
        this.brand = brand;
    }

    void start() {
        System.out.println(brand + " vehicle started.");
    }
}

class Car extends Vehicle {
    Car(String brand) {
        super(brand);
    }

    void openTrunk() {
        System.out.println(brand + " trunk opened.");
    }
}

public class InheritanceDemo {
    public static void main(String[] args) {
        Car car = new Car("Toyota");
        car.start();
        car.openTrunk();
    }
}`
            }
        },
        {
            id: 'polymorphism',
            title: { en: 'Polymorphism', es: 'Polimorfismo' },
            description: { en: 'Call overridden behavior through parent references.', es: 'Llama comportamiento sobreescrito usando referencias del padre.' },
            codeExamples: {
                java: `// Polymorphism: same method, different implementations
class Shape {
    double area() { return 0; }
}

class Circle extends Shape {
    private final double r;
    Circle(double r) { this.r = r; }
    @Override double area() { return Math.PI * r * r; }
}

class Rectangle extends Shape {
    private final double w, h;
    Rectangle(double w, double h) { this.w = w; this.h = h; }
    @Override double area() { return w * h; }
}

public class PolymorphismDemo {
    public static void main(String[] args) {
        Shape[] shapes = { new Circle(2), new Rectangle(3, 4) };
        for (Shape s : shapes) {
            System.out.println("Area: " + s.area());
        }
    }
}`
            }
        },
        {
            id: 'abstraction',
            title: { en: 'Abstraction', es: 'Abstracción' },
            description: { en: 'Expose only essential behavior with abstract classes.', es: 'Expone solo el comportamiento esencial con clases abstractas.' },
            codeExamples: {
                java: `// Abstraction through abstract class
abstract class Payment {
    abstract void pay(double amount);

    void printReceipt(double amount) {
        System.out.println("Receipt amount: $" + amount);
    }
}

class CardPayment extends Payment {
    @Override
    void pay(double amount) {
        System.out.println("Paid $" + amount + " using card.");
    }
}

public class AbstractionDemo {
    public static void main(String[] args) {
        Payment payment = new CardPayment();
        payment.pay(29.99);
        payment.printReceipt(29.99);
    }
}`
            }
        },
        {
            id: 'interfaces',
            title: { en: 'Interfaces', es: 'Interfaces' },
            description: { en: 'Implement shared contracts across different classes.', es: 'Implementa contratos compartidos entre distintas clases.' },
            codeExamples: {
                java: `// Interface contract shared across classes
interface Notifier {
    void send(String message);
}

class EmailNotifier implements Notifier {
    public void send(String message) {
        System.out.println("Email sent: " + message);
    }
}

class SmsNotifier implements Notifier {
    public void send(String message) {
        System.out.println("SMS sent: " + message);
    }
}

public class InterfaceDemo {
    public static void main(String[] args) {
        Notifier[] notifiers = { new EmailNotifier(), new SmsNotifier() };
        for (Notifier n : notifiers) {
            n.send("Module complete!");
        }
    }
}`
            }
        }
    ],
    'arrays-strings': [
        {
            id: 'array-traversal',
            title: { en: 'Array Traversal', es: 'Recorrido de Arreglos' },
            description: { en: 'Walk arrays with index-based and enhanced loops.', es: 'Recorre arreglos con bucles por índice y mejorados.' },
            codeExamples: {
                java: `import java.util.Arrays;

public class ArrayTraversalSet {
    public static void main(String[] args) {
        int[] values = {7, 2, 9, 4, 6};
        int sum = 0;

        for (int i = 0; i < values.length; i++) {
            sum += values[i];
            System.out.println("Index " + i + " -> " + values[i] + ", running sum: " + sum);
        }

        int max = Integer.MIN_VALUE;
        for (int value : values) {
            max = Math.max(max, value);
        }

        System.out.println("Array: " + Arrays.toString(values));
        System.out.println("Total sum: " + sum);
        System.out.println("Maximum value: " + max);
    }
}`
            }
        },
        {
            id: 'string-methods',
            title: { en: 'String Methods', es: 'Métodos de Cadenas' },
            description: { en: 'Apply useful string operations and validations.', es: 'Aplica operaciones y validaciones útiles de cadenas.' },
            codeExamples: {
                java: `public class StringMethodsSet {
    public static void main(String[] args) {
        String raw = "  CS Course Atlas  ";
        String trimmed = raw.trim();
        String upper = trimmed.toUpperCase();
        boolean containsCourse = trimmed.contains("Course");
        String replaced = trimmed.replace("Atlas", "Guide");

        System.out.println("Original: [" + raw + "]");
        System.out.println("Trimmed: [" + trimmed + "]");
        System.out.println("Uppercase: " + upper);
        System.out.println("Contains 'Course': " + containsCourse);
        System.out.println("Replaced: " + replaced);
        System.out.println("Substring(0,2): " + trimmed.substring(0, 2));
    }
}`
            }
        },
        {
            id: 'two-pointers',
            title: { en: 'Two Pointers', es: 'Dos Punteros' },
            description: { en: 'Use left/right pointers for linear-time checks.', es: 'Usa punteros izquierda/derecha para comprobaciones lineales.' },
            codeExamples: {
                java: `public class TwoPointersSet {
    static boolean isPalindrome(String text) {
        String clean = text.toLowerCase().replaceAll("[^a-z0-9]", "");
        int left = 0;
        int right = clean.length() - 1;
        while (left < right) {
            if (clean.charAt(left) != clean.charAt(right)) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }

    public static void main(String[] args) {
        String a = "Never odd or even";
        String b = "CS Atlas";
        System.out.println(a + " -> palindrome? " + isPalindrome(a));
        System.out.println(b + " -> palindrome? " + isPalindrome(b));
    }
}`
            }
        },
        {
            id: 'sliding-window',
            title: { en: 'Sliding Window', es: 'Ventana Deslizante' },
            description: { en: 'Compute subarray metrics without restarting scans.', es: 'Calcula métricas de subarreglos sin reiniciar recorridos.' },
            codeExamples: {
                java: `public class SlidingWindowSet {
    static int maxWindowSum(int[] arr, int k) {
        int windowSum = 0;
        for (int i = 0; i < k; i++) windowSum += arr[i];
        int best = windowSum;
        for (int right = k; right < arr.length; right++) {
            windowSum += arr[right] - arr[right - k];
            best = Math.max(best, windowSum);
            System.out.println("Window ending at index " + right + " sum: " + windowSum);
        }
        return best;
    }

    public static void main(String[] args) {
        int[] arr = {2, 1, 5, 1, 3, 2};
        int k = 3;
        int best = maxWindowSum(arr, k);
        System.out.println("Best window sum (k=" + k + "): " + best);
    }
}`
            }
        },
        {
            id: 'array-sorting',
            title: { en: 'Array Sorting', es: 'Ordenamiento de Arreglos' },
            description: { en: 'Sort arrays and verify order-sensitive logic.', es: 'Ordena arreglos y verifica lógica sensible al orden.' },
            codeExamples: {
                java: `import java.util.Arrays;

public class ArraySortingSet {
    public static void main(String[] args) {
        int[] nums = {9, 4, 1, 7, 3, 8};
        System.out.println("Before sort: " + Arrays.toString(nums));
        Arrays.sort(nums);
        System.out.println("After sort:  " + Arrays.toString(nums));
        int target = 7;
        int index = Arrays.binarySearch(nums, target);
        System.out.println("Binary search for " + target + " -> index " + index);
    }
}`
            }
        }
    ],
    'linked-lists': [
        {
            id: 'singly-linked-list',
            title: { en: 'Singly Linked Lists', es: 'Listas Enlazadas Simples' },
            description: { en: 'Build and traverse nodes linked in one direction.', es: 'Construye y recorre nodos enlazados en una sola dirección.' },
            codeExamples: {
                java: `class Node {
    int value;
    Node next;
    Node(int value) { this.value = value; }
}

public class SinglyLinkedListSet {
    static void printList(Node head) {
        Node current = head;
        while (current != null) {
            System.out.print(current.value + (current.next != null ? " -> " : ""));
            current = current.next;
        }
        System.out.println();
    }

    public static void main(String[] args) {
        Node head = new Node(10);
        head.next = new Node(20);
        head.next.next = new Node(30);
        printList(head);
    }
}`
            }
        },
        {
            id: 'doubly-linked-list',
            title: { en: 'Doubly Linked Lists', es: 'Listas Doblemente Enlazadas' },
            description: { en: 'Track prev/next pointers for bidirectional traversal.', es: 'Usa punteros prev/next para recorrido bidireccional.' },
            codeExamples: {
                java: `class DNode {
    int value;
    DNode prev;
    DNode next;
    DNode(int value) { this.value = value; }
}

public class DoublyLinkedListSet {
    public static void main(String[] args) {
        DNode a = new DNode(1);
        DNode b = new DNode(2);
        DNode c = new DNode(3);
        a.next = b; b.prev = a;
        b.next = c; c.prev = b;

        System.out.println("Forward: " + a.value + " -> " + b.value + " -> " + c.value);
        System.out.println("Backward: " + c.value + " -> " + b.value + " -> " + a.value);
    }
}`
            }
        },
        {
            id: 'cycle-detection',
            title: { en: 'Cycle Detection', es: 'Detección de Ciclos' },
            description: { en: 'Use fast/slow pointers to detect loops.', es: 'Usa punteros rápido/lento para detectar bucles.' },
            codeExamples: {
                java: `class CycleNode {
    int value;
    CycleNode next;
    CycleNode(int value) { this.value = value; }
}

public class CycleDetectionSet {
    static boolean hasCycle(CycleNode head) {
        CycleNode slow = head;
        CycleNode fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) return true;
        }
        return false;
    }

    public static void main(String[] args) {
        CycleNode a = new CycleNode(1);
        CycleNode b = new CycleNode(2);
        CycleNode c = new CycleNode(3);
        a.next = b; b.next = c; c.next = b; // cycle
        System.out.println("Cycle present? " + hasCycle(a));
    }
}`
            }
        },
        {
            id: 'list-reversal',
            title: { en: 'List Reversal', es: 'Inversión de Lista' },
            description: { en: 'Reverse links in-place using three pointers.', es: 'Invierte enlaces en sitio usando tres punteros.' },
            codeExamples: {
                java: `class RevNode {
    int value;
    RevNode next;
    RevNode(int value) { this.value = value; }
}

public class ListReversalSet {
    static RevNode reverse(RevNode head) {
        RevNode prev = null, current = head;
        while (current != null) {
            RevNode next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }
        return prev;
    }

    static void print(RevNode head) {
        for (RevNode c = head; c != null; c = c.next) {
            System.out.print(c.value + (c.next != null ? " -> " : ""));
        }
        System.out.println();
    }

    public static void main(String[] args) {
        RevNode head = new RevNode(5);
        head.next = new RevNode(6);
        head.next.next = new RevNode(7);
        System.out.print("Original: ");
        print(head);
        RevNode reversed = reverse(head);
        System.out.print("Reversed: ");
        print(reversed);
    }
}`
            }
        },
        {
            id: 'merge-lists',
            title: { en: 'Merge Operations', es: 'Operaciones de Fusión' },
            description: { en: 'Merge sorted linked lists with pointer comparisons.', es: 'Fusiona listas ordenadas con comparaciones de punteros.' },
            codeExamples: {
                java: `class MergeNode {
    int value;
    MergeNode next;
    MergeNode(int value) { this.value = value; }
}

public class MergeListsSet {
    static MergeNode merge(MergeNode a, MergeNode b) {
        MergeNode dummy = new MergeNode(0);
        MergeNode tail = dummy;
        while (a != null && b != null) {
            if (a.value <= b.value) {
                tail.next = a;
                a = a.next;
            } else {
                tail.next = b;
                b = b.next;
            }
            tail = tail.next;
        }
        tail.next = (a != null) ? a : b;
        return dummy.next;
    }

    static void print(MergeNode head) {
        for (MergeNode c = head; c != null; c = c.next) {
            System.out.print(c.value + (c.next != null ? " -> " : ""));
        }
        System.out.println();
    }

    public static void main(String[] args) {
        MergeNode a = new MergeNode(1); a.next = new MergeNode(4); a.next.next = new MergeNode(9);
        MergeNode b = new MergeNode(2); b.next = new MergeNode(3); b.next.next = new MergeNode(10);
        MergeNode merged = merge(a, b);
        print(merged);
    }
}`
            }
        }
    ],
    'stacks-queues': [
        {
            id: 'stack-operations',
            title: { en: 'Stack Operations', es: 'Operaciones de Pila' },
            description: { en: 'Push, pop, and peek with clear LIFO traces.', es: 'Push, pop y peek con trazas claras de LIFO.' },
            codeExamples: {
                java: `import java.util.ArrayDeque;

public class StackOperationsSet {
    public static void main(String[] args) {
        ArrayDeque<Integer> stack = new ArrayDeque<>();
        stack.push(100);
        stack.push(200);
        stack.push(300);
        System.out.println("Top element: " + stack.peek());
        System.out.println("Popped: " + stack.pop());
        System.out.println("After pop: " + stack);
    }
}`
            }
        },
        {
            id: 'queue-operations',
            title: { en: 'Queue Operations', es: 'Operaciones de Cola' },
            description: { en: 'Enqueue/dequeue with FIFO behavior tracking.', es: 'Enqueue/dequeue con seguimiento del comportamiento FIFO.' },
            codeExamples: {
                java: `import java.util.ArrayDeque;

public class QueueOperationsSet {
    public static void main(String[] args) {
        ArrayDeque<String> queue = new ArrayDeque<>();
        queue.offer("Task-A");
        queue.offer("Task-B");
        queue.offer("Task-C");
        System.out.println("Front: " + queue.peek());
        System.out.println("Dequeued: " + queue.poll());
        System.out.println("Queue now: " + queue);
    }
}`
            }
        },
        {
            id: 'deque-usage',
            title: { en: 'Deque Usage', es: 'Uso de Deque' },
            description: { en: 'Use both ends for flexible queue/stack behavior.', es: 'Usa ambos extremos para comportamiento flexible de cola/pila.' },
            codeExamples: {
                java: `import java.util.ArrayDeque;

public class DequeUsageSet {
    public static void main(String[] args) {
        ArrayDeque<Integer> deque = new ArrayDeque<>();
        deque.addFirst(10);
        deque.addLast(20);
        deque.addFirst(5);
        System.out.println("Deque state: " + deque);
        System.out.println("removeFirst -> " + deque.removeFirst());
        System.out.println("removeLast -> " + deque.removeLast());
        System.out.println("Deque final: " + deque);
    }
}`
            }
        },
        {
            id: 'priority-queue',
            title: { en: 'Priority Queue', es: 'Cola de Prioridad' },
            description: { en: 'Process highest-priority elements first.', es: 'Procesa primero los elementos de mayor prioridad.' },
            codeExamples: {
                java: `import java.util.PriorityQueue;

public class PriorityQueueSet {
    public static void main(String[] args) {
        PriorityQueue<Integer> pq = new PriorityQueue<>();
        pq.offer(40);
        pq.offer(10);
        pq.offer(30);
        pq.offer(20);
        while (!pq.isEmpty()) {
            System.out.println("Next priority: " + pq.poll());
        }
    }
}`
            }
        },
        {
            id: 'practical-applications',
            title: { en: 'Practical Applications', es: 'Aplicaciones Prácticas' },
            description: { en: 'Apply stack and queue patterns to real tasks.', es: 'Aplica patrones de pila y cola a tareas reales.' },
            codeExamples: {
                java: `import java.util.ArrayDeque;

public class PracticalApplicationsSet {
    static boolean isBalanced(String s) {
        ArrayDeque<Character> stack = new ArrayDeque<>();
        for (char ch : s.toCharArray()) {
            if (ch == '(') stack.push(ch);
            else if (ch == ')') {
                if (stack.isEmpty()) return false;
                stack.pop();
            }
        }
        return stack.isEmpty();
    }

    public static void main(String[] args) {
        String expr = "((a+b)*(c-d))";
        System.out.println("Balanced expression? " + isBalanced(expr));

        ArrayDeque<String> tasks = new ArrayDeque<>();
        tasks.offer("Compile");
        tasks.offer("Run Tests");
        tasks.offer("Deploy");
        while (!tasks.isEmpty()) {
            System.out.println("Processing task: " + tasks.poll());
        }
    }
}`
            }
        }
    ],
    'searching-algorithms': [
        {
            id: 'linear-search',
            title: { en: 'Linear Search', es: 'Búsqueda Lineal' },
            description: { en: 'Scan each element until the target appears.', es: 'Recorre cada elemento hasta encontrar el objetivo.' },
            codeExamples: {
                java: `import java.util.Arrays;

public class LinearSearchSet {
    static int linearSearch(int[] arr, int target) {
        for (int i = 0; i < arr.length; i++) {
            System.out.println("Checking index " + i + " -> " + arr[i]);
            if (arr[i] == target) return i;
        }
        return -1;
    }

    public static void main(String[] args) {
        int[] values = {14, 7, 23, 9, 31};
        int target = 23;
        int index = linearSearch(values, target);
        System.out.println("Array: " + Arrays.toString(values));
        System.out.println("Target " + target + " found at index: " + index);
    }
}`
            }
        },
        {
            id: 'binary-search',
            title: { en: 'Binary Search', es: 'Búsqueda Binaria' },
            description: { en: 'Use sorted order to cut the search space in half each step.', es: 'Usa el ordenamiento para reducir a la mitad el espacio de búsqueda.' },
            codeExamples: {
                java: `import java.util.Arrays;

public class BinarySearchSet {
    static int binarySearch(int[] sorted, int target) {
        int left = 0, right = sorted.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            System.out.println("left=" + left + ", mid=" + mid + ", right=" + right + ", value=" + sorted[mid]);
            if (sorted[mid] == target) return mid;
            if (sorted[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return -1;
    }

    public static void main(String[] args) {
        int[] values = {3, 8, 12, 17, 24, 31, 44};
        int target = 24;
        System.out.println("Sorted array: " + Arrays.toString(values));
        System.out.println("Index of " + target + ": " + binarySearch(values, target));
    }
}`
            }
        },
        {
            id: 'first-last-occurrence',
            title: { en: 'First & Last Occurrence', es: 'Primera y Última Ocurrencia' },
            description: { en: 'Find range boundaries for duplicate values in sorted data.', es: 'Encuentra los límites de un valor repetido en datos ordenados.' },
            codeExamples: {
                java: `import java.util.Arrays;

public class FirstLastOccurrenceSet {
    static int bound(int[] arr, int target, boolean findFirst) {
        int left = 0, right = arr.length - 1, answer = -1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (arr[mid] == target) {
                answer = mid;
                if (findFirst) right = mid - 1;
                else left = mid + 1;
            } else if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return answer;
    }

    public static void main(String[] args) {
        int[] arr = {1, 2, 4, 4, 4, 7, 9};
        int target = 4;
        int first = bound(arr, target, true);
        int last = bound(arr, target, false);
        System.out.println("Array: " + Arrays.toString(arr));
        System.out.println("Target " + target + " first index: " + first + ", last index: " + last);
    }
}`
            }
        },
        {
            id: 'hash-lookup',
            title: { en: 'Hash Lookup Search', es: 'Búsqueda con Hash' },
            description: { en: 'Use a hash map for near O(1) membership and complement lookup.', es: 'Usa un hash map para búsqueda de pertenencia y complementos en casi O(1).' },
            codeExamples: {
                java: `import java.util.HashMap;
import java.util.Map;

public class HashLookupSet {
    static int[] twoSum(int[] arr, int target) {
        Map<Integer, Integer> seen = new HashMap<>();
        for (int i = 0; i < arr.length; i++) {
            int complement = target - arr[i];
            if (seen.containsKey(complement)) {
                return new int[] { seen.get(complement), i };
            }
            seen.put(arr[i], i);
        }
        return new int[] { -1, -1 };
    }

    public static void main(String[] args) {
        int[] arr = {10, 15, 3, 7, 8};
        int target = 18;
        int[] result = twoSum(arr, target);
        System.out.println("Two-sum target: " + target);
        System.out.println("Indices: [" + result[0] + ", " + result[1] + "]");
    }
}`
            }
        },
        {
            id: 'search-comparison',
            title: { en: 'Search Strategy Comparison', es: 'Comparación de Estrategias' },
            description: { en: 'Compare linear vs binary operations on the same target.', es: 'Compara operaciones de búsqueda lineal y binaria para el mismo objetivo.' },
            codeExamples: {
                java: `import java.util.Arrays;

public class SearchComparisonSet {
    static int linearSteps(int[] arr, int target) {
        int steps = 0;
        for (int value : arr) {
            steps++;
            if (value == target) break;
        }
        return steps;
    }

    static int binarySteps(int[] arr, int target) {
        int left = 0, right = arr.length - 1, steps = 0;
        while (left <= right) {
            steps++;
            int mid = left + (right - left) / 2;
            if (arr[mid] == target) break;
            if (arr[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return steps;
    }

    public static void main(String[] args) {
        int[] data = {2, 5, 8, 12, 16, 19, 24, 31, 42, 57};
        int target = 31;
        System.out.println("Data: " + Arrays.toString(data));
        System.out.println("Linear steps: " + linearSteps(data, target));
        System.out.println("Binary steps: " + binarySteps(data, target));
    }
}`
            }
        }
    ],
    'sorting-algorithms': [
        {
            id: 'bubble-sort',
            title: { en: 'Bubble Sort', es: 'Ordenamiento Burbuja' },
            description: { en: 'Swap adjacent inversions across repeated passes.', es: 'Intercambia inversiones adyacentes en pasadas repetidas.' },
            codeExamples: {
                java: `import java.util.Arrays;

public class BubbleSortSet {
    static void bubbleSort(int[] arr) {
        for (int pass = 0; pass < arr.length - 1; pass++) {
            boolean swapped = false;
            for (int i = 0; i < arr.length - 1 - pass; i++) {
                if (arr[i] > arr[i + 1]) {
                    int temp = arr[i];
                    arr[i] = arr[i + 1];
                    arr[i + 1] = temp;
                    swapped = true;
                }
            }
            System.out.println("After pass " + (pass + 1) + ": " + Arrays.toString(arr));
            if (!swapped) break;
        }
    }

    public static void main(String[] args) {
        int[] arr = {9, 4, 6, 2, 8};
        bubbleSort(arr);
        System.out.println("Sorted: " + Arrays.toString(arr));
    }
}`
            }
        },
        {
            id: 'merge-sort',
            title: { en: 'Merge Sort', es: 'Merge Sort' },
            description: { en: 'Divide-and-conquer sorting with stable merging.', es: 'Ordenamiento divide y vencerás con combinación estable.' },
            codeExamples: {
                java: `import java.util.Arrays;

public class MergeSortSet {
    static void mergeSort(int[] arr, int left, int right) {
        if (left >= right) return;
        int mid = left + (right - left) / 2;
        mergeSort(arr, left, mid);
        mergeSort(arr, mid + 1, right);
        merge(arr, left, mid, right);
    }

    static void merge(int[] arr, int left, int mid, int right) {
        int[] temp = new int[right - left + 1];
        int i = left, j = mid + 1, k = 0;
        while (i <= mid && j <= right) {
            temp[k++] = (arr[i] <= arr[j]) ? arr[i++] : arr[j++];
        }
        while (i <= mid) temp[k++] = arr[i++];
        while (j <= right) temp[k++] = arr[j++];
        for (int p = 0; p < temp.length; p++) arr[left + p] = temp[p];
        System.out.println("Merged [" + left + "," + right + "]: " + Arrays.toString(Arrays.copyOfRange(arr, left, right + 1)));
    }

    public static void main(String[] args) {
        int[] arr = {12, 5, 7, 3, 19, 1};
        mergeSort(arr, 0, arr.length - 1);
        System.out.println("Sorted: " + Arrays.toString(arr));
    }
}`
            }
        },
        {
            id: 'quick-sort',
            title: { en: 'Quick Sort', es: 'Quick Sort' },
            description: { en: 'Partition around pivots for efficient average-case sorting.', es: 'Particiona por pivotes para ordenamiento eficiente en promedio.' },
            codeExamples: {
                java: `import java.util.Arrays;

public class QuickSortSet {
    static void quickSort(int[] arr, int low, int high) {
        if (low >= high) return;
        int pivotIndex = partition(arr, low, high);
        System.out.println("Pivot fixed at " + pivotIndex + ": " + Arrays.toString(arr));
        quickSort(arr, low, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, high);
    }

    static int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = low - 1;
        for (int j = low; j < high; j++) {
            if (arr[j] <= pivot) {
                i++;
                int temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        }
        int temp = arr[i + 1];
        arr[i + 1] = arr[high];
        arr[high] = temp;
        return i + 1;
    }

    public static void main(String[] args) {
        int[] arr = {33, 10, 55, 71, 29, 4};
        quickSort(arr, 0, arr.length - 1);
        System.out.println("Sorted: " + Arrays.toString(arr));
    }
}`
            }
        },
        {
            id: 'heap-sort',
            title: { en: 'Heap Sort', es: 'Heap Sort' },
            description: { en: 'Use a max-heap to repeatedly place largest values at the end.', es: 'Usa un max-heap para ubicar repetidamente los mayores valores al final.' },
            codeExamples: {
                java: `import java.util.Arrays;

public class HeapSortSet {
    static void heapSort(int[] arr) {
        int n = arr.length;
        for (int i = n / 2 - 1; i >= 0; i--) heapify(arr, n, i);
        for (int end = n - 1; end > 0; end--) {
            int temp = arr[0];
            arr[0] = arr[end];
            arr[end] = temp;
            heapify(arr, end, 0);
            System.out.println("Placed max at index " + end + ": " + Arrays.toString(arr));
        }
    }

    static void heapify(int[] arr, int size, int root) {
        int largest = root;
        int left = 2 * root + 1;
        int right = 2 * root + 2;
        if (left < size && arr[left] > arr[largest]) largest = left;
        if (right < size && arr[right] > arr[largest]) largest = right;
        if (largest != root) {
            int temp = arr[root];
            arr[root] = arr[largest];
            arr[largest] = temp;
            heapify(arr, size, largest);
        }
    }

    public static void main(String[] args) {
        int[] arr = {14, 3, 27, 8, 19, 1};
        heapSort(arr);
        System.out.println("Sorted: " + Arrays.toString(arr));
    }
}`
            }
        },
        {
            id: 'stable-vs-unstable',
            title: { en: 'Stable vs Unstable Sorts', es: 'Ordenamientos Estables e Inestables' },
            description: { en: 'Understand why stable sorting matters for multi-key records.', es: 'Comprende por qué el ordenamiento estable importa en registros con varias claves.' },
            codeExamples: {
                java: `import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

public class StableSortSet {
    static class Student {
        String name;
        int score;
        Student(String name, int score) { this.name = name; this.score = score; }
        @Override public String toString() { return name + "(" + score + ")"; }
    }

    public static void main(String[] args) {
        List<Student> students = new ArrayList<>();
        students.add(new Student("Ana", 90));
        students.add(new Student("Luis", 85));
        students.add(new Student("Mia", 90));
        students.add(new Student("Noah", 85));

        System.out.println("Before sort: " + students);
        students.sort(Comparator.comparingInt(s -> s.score)); // Java sort is stable
        System.out.println("After stable sort by score: " + students);
        System.out.println("Notice same-score students keep original relative order.");
    }
}`
            }
        }
    ],
    recursion: [
        {
            id: 'base-case-pattern',
            title: { en: 'Base Case Pattern', es: 'Patrón de Caso Base' },
            description: { en: 'Define stopping conditions before recursive calls.', es: 'Define condiciones de parada antes de las llamadas recursivas.' },
            codeExamples: {
                java: `public class BaseCasePatternSet {
    static void countdown(int n) {
        if (n == 0) {
            System.out.println("Reached base case.");
            return;
        }
        System.out.println("n = " + n);
        countdown(n - 1);
    }

    public static void main(String[] args) {
        countdown(5);
    }
}`
            }
        },
        {
            id: 'factorial-fibonacci',
            title: { en: 'Factorial & Fibonacci', es: 'Factorial y Fibonacci' },
            description: { en: 'Practice classic recursive recurrence relations.', es: 'Practica relaciones de recurrencia clásicas con recursión.' },
            codeExamples: {
                java: `public class FactorialFibonacciSet {
    static long factorial(int n) {
        if (n <= 1) return 1;
        return n * factorial(n - 1);
    }

    static int fibonacci(int n) {
        if (n <= 1) return n;
        return fibonacci(n - 1) + fibonacci(n - 2);
    }

    public static void main(String[] args) {
        System.out.println("factorial(6) = " + factorial(6));
        for (int i = 0; i <= 7; i++) {
            System.out.println("fib(" + i + ") = " + fibonacci(i));
        }
    }
}`
            }
        },
        {
            id: 'recursive-backtracking',
            title: { en: 'Recursive Backtracking', es: 'Backtracking Recursivo' },
            description: { en: 'Build decisions incrementally and undo state on return.', es: 'Construye decisiones de forma incremental y deshaz el estado al regresar.' },
            codeExamples: {
                java: `import java.util.ArrayList;
import java.util.List;

public class RecursiveBacktrackingSet {
    static void subsets(int[] nums, int index, List<Integer> path, List<List<Integer>> result) {
        if (index == nums.length) {
            result.add(new ArrayList<>(path));
            return;
        }
        subsets(nums, index + 1, path, result); // exclude
        path.add(nums[index]);
        subsets(nums, index + 1, path, result); // include
        path.remove(path.size() - 1); // backtrack
    }

    public static void main(String[] args) {
        int[] nums = {1, 2, 3};
        List<List<Integer>> result = new ArrayList<>();
        subsets(nums, 0, new ArrayList<>(), result);
        System.out.println("Subsets count: " + result.size());
        System.out.println("Subsets: " + result);
    }
}`
            }
        },
        {
            id: 'memoization',
            title: { en: 'Memoization', es: 'Memoización' },
            description: { en: 'Cache overlapping subproblems to avoid repeated recursion.', es: 'Almacena subproblemas traslapados para evitar recursión repetida.' },
            codeExamples: {
                java: `import java.util.HashMap;
import java.util.Map;

public class MemoizationSet {
    static Map<Integer, Long> cache = new HashMap<>();

    static long fibMemo(int n) {
        if (n <= 1) return n;
        if (cache.containsKey(n)) return cache.get(n);
        long value = fibMemo(n - 1) + fibMemo(n - 2);
        cache.put(n, value);
        return value;
    }

    public static void main(String[] args) {
        int n = 40;
        long answer = fibMemo(n);
        System.out.println("fibMemo(" + n + ") = " + answer);
        System.out.println("Cache size: " + cache.size());
    }
}`
            }
        },
        {
            id: 'recursion-tree-tracing',
            title: { en: 'Recursion Tree Tracing', es: 'Trazado del Árbol de Recursión' },
            description: { en: 'Trace call depth and return flow to debug recursive logic.', es: 'Traza profundidad de llamadas y flujo de retorno para depurar recursión.' },
            codeExamples: {
                java: `public class RecursionTreeTracingSet {
    static int traceSum(int n, int depth) {
        String indent = "  ".repeat(depth);
        System.out.println(indent + "Call: traceSum(" + n + ")");
        if (n == 1) {
            System.out.println(indent + "Return 1");
            return 1;
        }
        int partial = traceSum(n - 1, depth + 1);
        int total = n + partial;
        System.out.println(indent + "Return " + total + " from n=" + n);
        return total;
    }

    public static void main(String[] args) {
        int n = 5;
        int result = traceSum(n, 0);
        System.out.println("Final result: " + result);
    }
}`
            }
        }
    ]
};

function normalizeModuleCodeExampleSets(module) {
    const overrideSets = MODULE_CODE_EXAMPLE_SET_OVERRIDES[module.id];
    const sourceSets = Array.isArray(overrideSets) && overrideSets.length
        ? overrideSets
        : buildGeneratedCodeExampleSets(module);
    if (!Array.isArray(sourceSets) || !sourceSets.length) return;
    const isAssembly = MODULE_CATEGORY_BY_ID[module.id] === 'assembly';

    module.codeExampleSets = sourceSets.map((exampleSet, index) => {
        const setId = String(exampleSet.id || `example-${index + 1}`);
        const setTitle = exampleSet.title || `Example ${index + 1}`;
        const setDescription = exampleSet.description || '';
        const setTitleText = typeof setTitle === 'string'
            ? setTitle
            : String(setTitle?.en || setTitle?.es || Object.values(setTitle || {})[0] || `Example ${index + 1}`);
        const sourceCodeExamples = exampleSet.codeExamples && typeof exampleSet.codeExamples === 'object'
            ? { ...exampleSet.codeExamples }
            : {};
        const sourceExpectedOutputs = exampleSet.expectedOutputs && typeof exampleSet.expectedOutputs === 'object'
            ? { ...exampleSet.expectedOutputs }
            : {};
        const javaSource = typeof sourceCodeExamples.java === 'string' && sourceCodeExamples.java.trim()
            ? sourceCodeExamples.java
            : buildFallbackJavaSnippet({ ...module, title: `${module.title} • ${setTitleText}` });

        const enhancedJava = ensureJavaSnippetHasVisibleOutput(module, addComprehensiveHeaderComments(module, javaSource));
        const normalizedCodeExamples = { java: enhancedJava };

        ['cpp', 'python', 'javascript'].forEach((language) => {
            const existing = typeof sourceCodeExamples[language] === 'string' ? sourceCodeExamples[language].trim() : '';
            normalizedCodeExamples[language] = hasVisibleOutputForLanguage(language, existing)
                ? existing
                : buildMirrorSnippetByLanguage({ ...module, title: `${module.title} - ${setTitleText}` }, enhancedJava, language);
        });

        if (isAssembly) {
            const assemblySource = typeof sourceCodeExamples.assembly === 'string' && sourceCodeExamples.assembly.trim()
                ? sourceCodeExamples.assembly
                : buildTopicFocusedAssemblySnippet(module, setTitleText, index, sourceSets.length);
            normalizedCodeExamples.assembly = assemblySource;
        }

        const normalizedExpectedOutputs = ensureExpectedOutputsForCodeExamples(
            { ...module, title: `${module.title} - ${setTitleText}` },
            normalizedCodeExamples,
            sourceExpectedOutputs
        );

        return {
            id: setId,
            title: setTitle,
            description: setDescription,
            codeExamples: normalizedCodeExamples,
            expectedOutputs: normalizedExpectedOutputs
        };
    });
}

function normalizeModuleCatalog(moduleList) {
    moduleList.forEach((module) => {
        const existingCodeExamples = module.codeExamples && typeof module.codeExamples === 'object'
            ? { ...module.codeExamples }
            : {};
        const existingExpectedOutputs = module.expectedOutputs && typeof module.expectedOutputs === 'object'
            ? { ...module.expectedOutputs }
            : {};
        const isAssembly = MODULE_CATEGORY_BY_ID[module.id] === 'assembly';

        let javaSource = '';
        if (module.id === 'git-basics-workflow') {
            javaSource = buildGitJavaSnippet();
        } else if (typeof existingCodeExamples.java === 'string' && existingCodeExamples.java.trim()) {
            javaSource = existingCodeExamples.java;
        } else if (typeof module.codeExample === 'string' && isLikelyJavaSnippet(module.codeExample)) {
            javaSource = module.codeExample;
        } else {
            javaSource = buildFallbackJavaSnippet(module);
        }

        const enhancedJava = ensureJavaSnippetHasVisibleOutput(module, addComprehensiveHeaderComments(module, javaSource));
        const normalizedCodeExamples = { java: enhancedJava };
        ['cpp', 'python', 'javascript'].forEach((language) => {
            const existing = typeof existingCodeExamples[language] === 'string' ? existingCodeExamples[language].trim() : '';
            const resolved = hasVisibleOutputForLanguage(language, existing)
                ? existing
                : buildMirrorSnippetByLanguage(module, enhancedJava, language);
            normalizedCodeExamples[language] = resolved;
        });

        if (isAssembly) {
            const assemblySource = typeof existingCodeExamples.assembly === 'string' && existingCodeExamples.assembly.trim()
                ? existingCodeExamples.assembly
                : (typeof module.codeExample === 'string' ? module.codeExample : '; Assembly sample unavailable');
            normalizedCodeExamples.assembly = assemblySource;
            module.codeExamples = {
                assembly: normalizedCodeExamples.assembly,
                java: normalizedCodeExamples.java,
                cpp: normalizedCodeExamples.cpp,
                python: normalizedCodeExamples.python,
                javascript: normalizedCodeExamples.javascript
            };
        } else {
            module.codeExamples = {
                java: normalizedCodeExamples.java,
                cpp: normalizedCodeExamples.cpp,
                python: normalizedCodeExamples.python,
                javascript: normalizedCodeExamples.javascript
            };
        }

        module.expectedOutputs = ensureExpectedOutputsForCodeExamples(
            module,
            module.codeExamples,
            existingExpectedOutputs
        );

        module.definitions = buildModuleDefinitions(module, 'en');
        normalizeModuleCodeExampleSets(module);
    });
}

normalizeModuleCatalog(modules);
// Compatibility anchor for validation scripts that slice the catalog runtime section.
const flashcardDecks = null;

const dailyChallenges = [
    {
        id: 'arrays-two-pointer-refresh',
        title: 'Two-Pointer Sprint',
        description: 'Recreate the palindrome checker from memory, then extend it to ignore emoji or punctuation.',
        steps: [
            'Rewrite the base palindrome helper without looking.',
            'Add support for Unicode or emoji filtering.',
            'Test with at least 3 tricky strings.'
        ],
        moduleId: 'arrays-strings'
    },
    {
        id: 'linkedlist-cycle-visual',
        title: 'Cycle Detective',
        description: 'Trace Floyd’s cycle algorithm with a custom diagram.',
        steps: [
            'Draw a small linked list with a loop.',
            'Record the positions of slow/fast for 4 iterations.',
            'Explain in your own words why they must meet.'
        ],
        moduleId: 'linked-lists'
    },
    {
        id: 'graphs-bfs-refresh',
        title: 'BFS Map Builder',
        description: 'Turn the BFS demo into pseudo-code with comments you would ship to a teammate.',
        steps: [
            'Outline the queue operations and visited set usage.',
            'Add a guard for disconnected nodes.',
            'Write one real-world scenario where BFS beats DFS.'
        ],
        moduleId: 'graph-algorithms'
    },
    {
        id: 'dp-table',
        title: 'DP Table Snapshot',
        description: 'Freeze-frame the LIS dynamic programming table and annotate the transitions.',
        steps: [
            'Log the dp[] array after each iteration.',
            'Summarize why LIS is O(n²) here.',
            'Convert the solution to a tabulation diagram.'
        ],
        moduleId: 'dynamic-programming'
    },
    {
        id: 'heaps-visual',
        title: 'Heapify Drill',
        description: 'Practice manual heapify by writing down the array after each swap.',
        steps: [
            'Start with the sample array in the module.',
            'Track each left/right child comparison.',
            'Explain when you’d reach for a heap instead of a sorted list.'
        ],
        moduleId: 'heaps'
    }
];

const studyTips = [
    'Chunk study time into 25-minute deep work blocks and log them in the Focus Tracker.',
    'Explain an algorithm out loud or to a rubber duck before reading the official solution.',
    'Switch the global font size in Settings if your eyes feel strained—comfort boosts focus.',
    'Mark modules as complete only after you can summarize the code without peeking.',
    'Use the Daily Challenge as your warm-up, then tackle a related module exercise.',
    'Pair flashcards with code: after seeing a definition, open the module snippet it references.',
    'Refresh the Study Tip when you finish a module to keep motivation high.'
];

function getLocalizedModule(module) {
    if (!module) return module;
    const localized = localizeEntity('modules', module.id, null);
    const language = appState.language === 'es' ? 'es' : 'en';
    const localizedCodeExamples = normalizeLocalizedCodeExamples(
        module.codeExamples || {},
        localized?.codeExamples || {},
        language
    );
    const localizedExpectedOutputs = normalizeLocalizedExpectedOutputs(
        module.expectedOutputs || {},
        localized?.expectedOutputs || {},
        language
    );
    const localizedCodeExampleSets = normalizeLocalizedCodeExampleSets(module, localized || {}, language);
    if (!localized) {
        return {
            ...module,
            codeExamples: localizedCodeExamples,
            expectedOutputs: localizedExpectedOutputs,
            codeExampleSets: localizedCodeExampleSets.length ? localizedCodeExampleSets : module.codeExampleSets,
            definitions: Array.isArray(module.definitions) && module.definitions.length === 5
                ? module.definitions
                : buildModuleDefinitions(module, language)
        };
    }
    const localizedDefinitions = Array.isArray(localized.definitions) && localized.definitions.length
        ? localized.definitions.slice(0, 5)
        : buildModuleDefinitions({
            ...module,
            title: localized.title || module.title,
            topics: localized.topics || module.topics
        }, language);
    return {
        ...module,
        ...localized,
        topics: localized.topics || module.topics,
        resources: localized.resources || module.resources,
        codeExamples: localizedCodeExamples,
        expectedOutputs: localizedExpectedOutputs,
        codeExampleSets: localizedCodeExampleSets.length
            ? localizedCodeExampleSets
            : (localized.codeExampleSets || module.codeExampleSets),
        definitions: localizedDefinitions
    };
}

function getLocalizedModules() {
    return modules.map(getLocalizedModule);
}

function getLocalizedQuizData(moduleId) {
    const fallback = quizData[moduleId];
    if (!fallback) return fallback;
    return localizeEntity('quizData', moduleId, fallback);
}

function getGlossaryTrackCategoryLabel(categoryKey, lang = appState.language || 'en') {
    const labels = {
        en: {
            dsa: 'DSA',
            discrete: 'Discrete Mathematics',
            java: 'Java',
            git: 'Git',
            assembly: 'Assembly'
        },
        es: {
            dsa: 'DSA',
            discrete: 'Matemáticas Discretas',
            java: 'Java',
            git: 'Git',
            assembly: 'Ensamblador'
        }
    };
    const normalizedLang = lang === 'es' ? 'es' : 'en';
    return labels[normalizedLang]?.[categoryKey] || labels.en.dsa;
}

function buildCrossTrackGlossaryTerms(lang = appState.language || 'en') {
    const localizedModules = lang === 'es' ? getLocalizedModules() : modules;
    const seenTerms = new Set(glossaryTerms.map((term) => String(term.term || '').trim().toLowerCase()));
    const generated = [];

    localizedModules.forEach((module) => {
        const categoryKey = getModuleCategoryKey(module.id);
        const categoryLabel = getGlossaryTrackCategoryLabel(categoryKey, lang);
        const definitions = Array.isArray(module.definitions) ? module.definitions.slice(0, 2) : [];
        definitions.forEach((entry) => {
            const term = String(entry?.term || '').trim();
            const definition = String(entry?.definition || '').trim();
            const normalizedTerm = term.toLowerCase();
            if (!term || !definition || seenTerms.has(normalizedTerm)) return;
            seenTerms.add(normalizedTerm);
            generated.push({
                term,
                definition,
                category: categoryLabel,
                categoryKey: categoryLabel,
                categoryLabel
            });
        });
    });

    return generated;
}

function getLocalizedGlossaryTerms() {
    const localizedBaseTerms = glossaryTerms.map((term, index) => {
        const localized = localizeEntity('glossary', String(index), null);
        const merged = localized ? { ...term, ...localized } : { ...term };
        return {
            ...merged,
            categoryKey: term.category,
            categoryLabel: localized?.category || term.category
        };
    });
    const generatedTerms = buildCrossTrackGlossaryTerms(appState.language || 'en');
    return [...localizedBaseTerms, ...generatedTerms];
}

function getLocalizedChallenge(challenge) {
    if (!challenge) return challenge;
    const localized = localizeEntity('dailyChallenges', challenge.id, null);
    return localized ? { ...challenge, ...localized } : challenge;
}

function getLocalizedStudyTips() {
    return studyTips.map((tip, index) => localizeEntity('studyTips', String(index), tip) || tip);
}

function getLocalizedInterviewExamples() {
    return INTERVIEW_EXAMPLES.map((example) => {
        const localized = localizeEntity('interviewExamples', example.id, null);
        return localized ? { ...example, ...localized } : example;
    });
}

function getLocalizedNotesLibrary() {
    return NOTES_LIBRARY.map((note) => {
        const localized = localizeEntity('notesLibrary', note.id, null);
        const merged = localized ? { ...note, ...localized } : { ...note };
        return {
            ...merged,
            categoryKey: note.category,
            categoryLabel: localized?.category || note.category
        };
    });
}

function translateTextByLanguage(text, lang = 'en') {
    if (lang !== 'es') return String(text || '');
    return String(text || '')
        .split('\n')
        .map((line) => translateLiteral(line, 'es'))
        .join('\n');
}

function normalizeLocalizedCodeExamples(baseCodeExamples = {}, localizedCodeExamples = {}, lang = 'en') {
    const merged = { ...baseCodeExamples, ...(localizedCodeExamples || {}) };
    if (lang !== 'es') return merged;
    Object.keys(baseCodeExamples || {}).forEach((languageKey) => {
        const baseSnippet = String(baseCodeExamples?.[languageKey] || '');
        const localizedSnippet = String(localizedCodeExamples?.[languageKey] || '');
        if (localizedSnippet.trim()) return;
        if (!baseSnippet.trim()) return;
        merged[languageKey] = translateCodeHumanText(baseSnippet, 'es');
    });
    return merged;
}

function normalizeLocalizedExpectedOutputs(baseExpectedOutputs = {}, localizedExpectedOutputs = {}, lang = 'en') {
    const merged = { ...baseExpectedOutputs, ...(localizedExpectedOutputs || {}) };
    if (lang !== 'es') return merged;
    Object.keys(baseExpectedOutputs || {}).forEach((languageKey) => {
        const baseText = String(baseExpectedOutputs?.[languageKey] || '');
        const localizedText = String(localizedExpectedOutputs?.[languageKey] || '');
        if (localizedText.trim()) return;
        if (!baseText.trim()) return;
        merged[languageKey] = translateTextByLanguage(baseText, 'es');
    });
    return merged;
}

function normalizeLocalizedCodeExampleSets(module, localizedModuleEntity = {}, lang = 'en') {
    const baseSets = Array.isArray(module?.codeExampleSets) ? module.codeExampleSets : [];
    if (!baseSets.length) return [];
    const localizedSets = Array.isArray(localizedModuleEntity?.codeExampleSets) ? localizedModuleEntity.codeExampleSets : [];
    const localizedById = new Map(localizedSets.map((setItem) => [String(setItem.id), setItem]));

    return baseSets.map((baseSet, index) => {
        const setId = String(baseSet.id || `example-${index + 1}`);
        const overlay = localizedById.get(setId) || {};
        const baseTitleEn = resolveLocalizedValue(baseSet.title, 'en') || `Example ${index + 1}`;
        const overlayTitleEs = resolveLocalizedValue(overlay.title, 'es');
        const titleValue = lang === 'es'
            ? { en: baseTitleEn, es: overlayTitleEs || translateLiteral(baseTitleEn, 'es') || baseTitleEn }
            : (overlay.title || baseSet.title);

        const baseDescEn = resolveLocalizedValue(baseSet.description, 'en') || '';
        const overlayDescEs = resolveLocalizedValue(overlay.description, 'es');
        const descriptionValue = lang === 'es'
            ? { en: baseDescEn, es: overlayDescEs || translateLiteral(baseDescEn, 'es') || baseDescEn }
            : (overlay.description || baseSet.description);

        const codeExamples = normalizeLocalizedCodeExamples(baseSet.codeExamples || {}, overlay.codeExamples || {}, lang);
        const expectedOutputs = normalizeLocalizedExpectedOutputs(baseSet.expectedOutputs || {}, overlay.expectedOutputs || {}, lang);

        return {
            ...baseSet,
            ...overlay,
            id: setId,
            title: titleValue,
            description: descriptionValue,
            codeExamples,
            expectedOutputs
        };
    });
}

const CODE_COMMENT_FALLBACK_PHRASES_ES = [
    ['Java parity markers (mirrors important Java output checkpoints)', 'Marcadores de paridad de Java (reflejan puntos clave de salida)'],
    ['Topic checklist to ensure full conceptual coverage', 'Lista de temas para asegurar cobertura conceptual completa'],
    ['This script keeps the same conceptual checkpoints and prints them clearly.', 'Este script mantiene los mismos puntos conceptuales y los imprime con claridad.'],
    ['This keeps the same instructional checkpoints and visible output.', 'Esto mantiene los mismos puntos de instruccion y salida visible.'],
    ['JavaScript mirror of the updated Java module sample.', 'Espejo en JavaScript del ejemplo actualizado en Java.'],
    ['Python mirror of the updated Java module sample.', 'Espejo en Python del ejemplo actualizado en Java.'],
    ['C++ mirror of the updated Java module sample.', 'Espejo en C++ del ejemplo actualizado en Java.'],
    ['Java parity checkpoints from Java sample:', 'Puntos de paridad del ejemplo en Java:'],
    ['High-level module walkthrough marker', 'Marcador de recorrido general del modulo'],
    ['Runtime marker for learners', 'Marcador de ejecucion para estudiantes'],
    ['- Follow inline comments from top to bottom.', '- Sigue los comentarios en linea de arriba hacia abajo.'],
    ['- Run once, then edit one concept at a time and rerun.', '- Ejecuta una vez, luego edita un concepto a la vez y vuelve a ejecutar.'],
    ['- Verify output after each logical step.', '- Verifica la salida despues de cada paso logico.'],
    ['High-level module context', 'Contexto general del modulo'],
    ['Reading strategy:', 'Estrategia de lectura:'],
    ['Coverage goals:', 'Objetivos de cobertura:']
];

function translateCodeCommentBody(commentBody, targetLanguage = appState.language) {
    if (targetLanguage !== 'es') return commentBody;
    const original = String(commentBody ?? '');
    const trimmed = original.trim();
    if (!trimmed) return original;

    const direct = translateLiteral(trimmed, 'es');
    if (direct !== trimmed) {
        return original.replace(trimmed, direct);
    }

    let translated = trimmed;
    CODE_COMMENT_FALLBACK_PHRASES_ES.forEach(([sourcePhrase, targetPhrase]) => {
        const pattern = new RegExp(escapeRegExp(sourcePhrase), 'gi');
        translated = translated.replace(pattern, targetPhrase);
    });

    if (translated === trimmed) return original;
    return original.replace(trimmed, translated);
}

function translateBlockComment(blockComment, targetLanguage = appState.language) {
    if (targetLanguage !== 'es') return blockComment;
    const source = String(blockComment || '');
    if (!source.startsWith('/*') || !source.endsWith('*/')) return source;

    const inner = source.slice(2, -2);
    const translatedInner = inner.split('\n').map((line) => {
        const match = line.match(/^(\s*\*?\s?)(.*?)(\s*)$/);
        if (!match) return line;
        const prefix = match[1];
        const body = match[2];
        const suffix = match[3];
        if (!String(body || '').trim()) return line;
        const translatedBody = translateCodeCommentBody(body, targetLanguage);
        return `${prefix}${translatedBody}${suffix}`;
    }).join('\n');

    return `/*${translatedInner}*/`;
}

function translateCodeHumanText(code, targetLanguage = appState.language) {
    if (targetLanguage !== 'es' || typeof code !== 'string') return code;
    const withTranslatedBlockComments = code.replace(/\/\*[\s\S]*?\*\//g, (blockComment) => {
        return translateBlockComment(blockComment, targetLanguage);
    });

    return withTranslatedBlockComments.split('\n').map((line) => {
        let nextLine = line;
        const trimmed = line.trim();
        const isCppDirective = /^#\s*(include|define|if|ifdef|ifndef|endif|pragma|import)\b/i.test(trimmed);

        if (/^\s*;/.test(nextLine)) {
            const semicolonIdx = nextLine.indexOf(';');
            const head = nextLine.slice(0, semicolonIdx + 1);
            const body = nextLine.slice(semicolonIdx + 1);
            const translatedBody = translateCodeCommentBody(body, targetLanguage);
            nextLine = translatedBody === body ? nextLine : `${head}${translatedBody}`;
        } else {
            const slashCommentIdx = nextLine.indexOf('//');
            if (slashCommentIdx >= 0) {
                const head = nextLine.slice(0, slashCommentIdx + 2);
                const body = nextLine.slice(slashCommentIdx + 2);
                const translatedBody = translateCodeCommentBody(body, targetLanguage);
                nextLine = translatedBody === body ? nextLine : `${head}${translatedBody}`;
            } else if (!isCppDirective) {
                const hashCommentIdx = nextLine.indexOf('#');
                if (hashCommentIdx >= 0) {
                    const head = nextLine.slice(0, hashCommentIdx + 1);
                    const body = nextLine.slice(hashCommentIdx + 1);
                    const translatedBody = translateCodeCommentBody(body, targetLanguage);
                    nextLine = translatedBody === body ? nextLine : `${head}${translatedBody}`;
                }
            }
        }

        nextLine = nextLine.replace(/"([^"\\]*(?:\\.[^"\\]*)*)"|'([^'\\]*(?:\\.[^'\\]*)*)'/g, (match, g1, g2) => {
            const source = (g1 || g2 || '').trim();
            if (!source || /^https?:\/\//i.test(source)) return match;
            if (!/[A-Za-z]/.test(source)) return match;
            if (!/\s/.test(source) && source.length <= 2) return match;
            const translated = translateLiteral(source, 'es');
            if (!translated || translated === source) return match;
            const quote = match[0];
            return `${quote}${translated}${quote}`;
        });

        return nextLine;
    }).join('\n');
}

function getFlashcardPromptTemplates(lang = 'en') {
    if (lang === 'es') {
        return {
            defineTerm: 'Define "{term}" en el contexto de {module}.',
            termUseCase: '¿Cuándo aplicarías "{term}" en un problema real?',
            topicConnection: '¿Cómo se conecta "{topic}" con el objetivo principal de {module}?',
            pitfallQuestion: '¿Qué error común debes evitar al estudiar {topic}?',
            explanationQuestion: 'Resume la idea central que enseña {module}.',
            explanationAnswerPrefix: 'Idea central:',
            pitfallAnswerPrefix: 'Evita este error:',
            useCaseAnswerPrefix: 'Caso práctico:',
            connectionAnswerPrefix: 'Conexión clave:'
        };
    }
    return {
        defineTerm: 'Define "{term}" in the context of {module}.',
        termUseCase: 'When would you apply "{term}" in a real problem?',
        topicConnection: 'How does "{topic}" connect to the core goal of {module}?',
        pitfallQuestion: 'What common mistake should you avoid when using {topic}?',
        explanationQuestion: 'Summarize the core idea taught in {module}.',
        explanationAnswerPrefix: 'Core idea:',
        pitfallAnswerPrefix: 'Avoid this pitfall:',
        useCaseAnswerPrefix: 'Practical use case:',
        connectionAnswerPrefix: 'Key connection:'
    };
}

function getLocalizedGeneralFlashcards(lang = appState.language || 'en') {
    if (lang !== 'es') {
        return baseFlashcards;
    }
    const localizedMap = CONTENT_I18N.es?.flashcards || {};
    return baseFlashcards.map((card) => {
        const localized = localizedMap?.[String(card.id)] || localizedMap?.[card.id];
        if (!localized) {
            return {
                ...card,
                question: translateLiteral(card.question, 'es'),
                answer: translateLiteral(card.answer, 'es')
            };
        }
        return {
            ...card,
            question: localized.question || card.question,
            answer: localized.answer || card.answer
        };
    });
}

function isFlashcardTopicDeck(moduleId) {
    return String(moduleId || '').startsWith('topic:');
}

function getFlashcardTopicDeckInfo(moduleId) {
    return FLASHCARD_TOPIC_DECKS.find((deck) => deck.id === moduleId) || null;
}

function getFlashcardTopicDeckLabel(moduleId, lang = appState.language || 'en') {
    const deck = getFlashcardTopicDeckInfo(moduleId);
    if (!deck) return '';
    return t(deck.titleKey, {}, lang);
}

function getAccessibleTopicDeckModules(moduleId) {
    const deck = getFlashcardTopicDeckInfo(moduleId);
    if (!deck) return [];
    return modules.filter((module) => getModuleCategoryKey(module.id) === deck.category && isFlashcardModuleAccessible(module.id));
}

function toSentenceList(text = '') {
    const source = String(text || '').replace(/\s+/g, ' ').trim();
    if (!source) return [];
    return source
        .split(/(?<=[.!?])\s+/)
        .map((sentence) => sentence.trim())
        .filter(Boolean);
}

function buildModuleConceptFlashcards(module, lang = 'en') {
    const templates = getFlashcardPromptTemplates(lang);
    const cards = [];
    const definitions = Array.isArray(module.definitions) && module.definitions.length
        ? module.definitions.slice(0, 5)
        : buildModuleDefinitions(module, lang);
    const topics = Array.isArray(module.topics) ? module.topics.slice(0, 5) : [];
    const explanationSentences = toSentenceList(module.explanation || module.description || '');
    const primaryExplanation = explanationSentences[0] || module.description || '';
    const secondaryExplanation = explanationSentences[1] || primaryExplanation;

    definitions.slice(0, 3).forEach((entry) => {
        cards.push({
            moduleId: module.id,
            question: interpolate(templates.defineTerm, { term: entry.term, module: module.title }),
            answer: entry.definition
        });
        cards.push({
            moduleId: module.id,
            question: interpolate(templates.termUseCase, { term: entry.term, module: module.title }),
            answer: `${templates.useCaseAnswerPrefix} ${secondaryExplanation}`
        });
    });

    topics.slice(0, 4).forEach((topic) => {
        cards.push({
            moduleId: module.id,
            question: interpolate(templates.topicConnection, { topic, module: module.title }),
            answer: `${templates.connectionAnswerPrefix} ${primaryExplanation}`
        });
        cards.push({
            moduleId: module.id,
            question: interpolate(templates.pitfallQuestion, { topic, module: module.title }),
            answer: `${templates.pitfallAnswerPrefix} ${secondaryExplanation}`
        });
    });

    cards.push({
        moduleId: module.id,
        question: interpolate(templates.explanationQuestion, { module: module.title }),
        answer: `${templates.explanationAnswerPrefix} ${primaryExplanation}`
    });

    return shuffleArray(cards).slice(0, 12);
}

function generateFlashcardDecks(modulesData, generalCards = [], lang = 'en') {
    const decks = {};

    modulesData.forEach(module => {
        decks[module.id] = buildModuleConceptFlashcards(module, lang);
    });

    const deckCollection = { ...decks };

    if (generalCards.length) {
        deckCollection.general = generalCards.map(card => ({
            ...card,
            question: typeof card.question === 'string' ? translateLiteral(card.question, lang) : card.question,
            answer: typeof card.answer === 'string' ? translateLiteral(card.answer, lang) : card.answer,
            moduleId: 'general'
        }));
    }

    deckCollection.all = [
        ...(deckCollection.general || []),
        ...Object.values(decks).flat()
    ];

    return deckCollection;
}

const flashcardDeckCache = {};

function getFlashcardDeckCollection(lang = appState.language || 'en') {
    const normalizedLang = lang === 'es' ? 'es' : 'en';
    if (flashcardDeckCache[normalizedLang]) {
        return flashcardDeckCache[normalizedLang];
    }
    const sourceModules = normalizedLang === 'es'
        ? getLocalizedModules().map((module) => ({
            ...module,
            definitions: Array.isArray(module.definitions) && module.definitions.length === 5
                ? module.definitions
                : buildModuleDefinitions(module, 'es')
        }))
        : modules;
    const generalCards = getLocalizedGeneralFlashcards(normalizedLang);
    const decks = generateFlashcardDecks(sourceModules, generalCards, normalizedLang);
    flashcardDeckCache[normalizedLang] = decks;
    return decks;
}

function getFlashcardDeck(moduleId) {
    const flashcardDecks = getFlashcardDeckCollection(appState.language);
    if (isFlashcardTopicDeck(moduleId)) {
        return getAccessibleTopicDeckModules(moduleId)
            .flatMap((module) => flashcardDecks[module.id] || []);
    }
    if (moduleId === 'general') {
        return flashcardDecks.general || [];
    }
    if (moduleId === 'all') {
        const unlockedDecks = modules
            .filter(module => isFlashcardModuleAccessible(module.id))
            .flatMap(module => flashcardDecks[module.id] || []);
        return [
            ...(flashcardDecks.general || []),
            ...unlockedDecks
        ];
    }
    if (!isFlashcardModuleAccessible(moduleId)) return [];
    return flashcardDecks[moduleId] || [];
}

function shuffleArray(array) {
    const cloned = [...array];
    for (let i = cloned.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cloned[i], cloned[j]] = [cloned[j], cloned[i]];
    }
    return cloned;
}

function isFlashcardModuleAccessible(moduleId) {
    if (!moduleId || moduleId === 'all' || moduleId === 'general' || isFlashcardTopicDeck(moduleId)) {
        return true;
    }
    return modules.some((module) => module.id === moduleId);
}

function markQuizCompleted(moduleId) {
    if (!moduleId) return;
    if (!appState.completedQuizzes.has(moduleId)) {
        appState.completedQuizzes.add(moduleId);
        populateFlashcardModuleSelect();
        if (appState.selectedFlashcardModule === moduleId) {
            refreshFlashcardSession(moduleId, { persist: false });
        }
        saveToLocalStorage();
    }
}

function chooseRandomChallenge(excludeId = null) {
    if (!dailyChallenges.length) return null;
    const pool = excludeId ? dailyChallenges.filter(challenge => challenge.id !== excludeId) : dailyChallenges;
    const source = pool.length ? pool : dailyChallenges;
    return source[Math.floor(Math.random() * source.length)];
}

function ensureDailyChallenge(force = false) {
    if (!dailyChallenges.length) return null;
    const today = new Date().toISOString().split('T')[0];
    let changed = false;

    if (
        force ||
        !appState.dailyChallengeId ||
        appState.dailyChallengeDate !== today
    ) {
        const nextChallenge = chooseRandomChallenge(force ? appState.dailyChallengeId : null) || dailyChallenges[0];
        appState.dailyChallengeId = nextChallenge.id;
        appState.dailyChallengeDate = today;
        changed = true;
    }

    const challenge = dailyChallenges.find(item => item.id === appState.dailyChallengeId) || dailyChallenges[0];
    if (changed) saveToLocalStorage();
    return challenge;
}

function renderDailyChallenge(force = false) {
    const challenge = ensureDailyChallenge(force);
    if (!challenge) return;
    const localizedChallenge = getLocalizedChallenge(challenge);

    const titleEl = document.getElementById('daily-challenge-title');
    const descEl = document.getElementById('daily-challenge-description');
    const stepsEl = document.getElementById('daily-challenge-steps');
    const hintEl = document.getElementById('daily-challenge-hint');

    if (titleEl) titleEl.textContent = localizedChallenge.title;
    if (descEl) descEl.textContent = localizedChallenge.description;
    if (stepsEl) {
        stepsEl.innerHTML = (localizedChallenge.steps || []).map(step => `<li>${step}</li>`).join('');
    }
    if (hintEl) {
        const module = modules.find(m => m.id === challenge.moduleId);
        const localizedModule = getLocalizedModule(module);
        hintEl.textContent = module ? `${translateLiteral('Focus module:', appState.language)} ${localizedModule.title}` : '';
    }
}

function chooseRandomStudyTip(excludeId = null) {
    const localizedStudyTips = getLocalizedStudyTips();
    if (!localizedStudyTips.length) return null;
    const pool = excludeId !== null ? localizedStudyTips.filter((tip, idx) => `${idx}` !== excludeId) : localizedStudyTips;
    const source = pool.length ? pool : localizedStudyTips;
    const index = Math.floor(Math.random() * source.length);
    const tipText = source[index];
    const absoluteIndex = localizedStudyTips.indexOf(tipText);
    return { text: tipText, id: `${absoluteIndex}` };
}

function ensureStudyTip(force = false) {
    const localizedStudyTips = getLocalizedStudyTips();
    if (!localizedStudyTips.length) return null;
    if (!force && appState.studyTipId !== null && localizedStudyTips[Number(appState.studyTipId)] !== undefined) {
        return {
            text: localizedStudyTips[Number(appState.studyTipId)],
            id: appState.studyTipId
        };
    }
    const tip = chooseRandomStudyTip(force ? appState.studyTipId : null) || { text: localizedStudyTips[0], id: '0' };
    appState.studyTipId = tip.id;
    saveToLocalStorage();
    return tip;
}

function renderStudyTip(force = false) {
    const tip = ensureStudyTip(force);
    if (!tip) return;
    const tipEl = document.getElementById('study-tip-text');
    if (tipEl) tipEl.textContent = tip.text;
}

// =================================
// UTILITY FUNCTIONS
// =================================

function safeGetItem(key) {
    try {
        return window.localStorage ? window.localStorage.getItem(key) : null;
    } catch (error) {
        return null;
    }
}

function safeSetItem(key, value) {
    try {
        if (window.localStorage) {
            window.localStorage.setItem(key, value);
        }
    } catch (error) {}
}

function buildSerializableAppState() {
    return {
        darkMode: appState.darkMode,
        showComments: appState.showComments,
        completedModules: Array.from(appState.completedModules),
        completedQuizzes: Array.from(appState.completedQuizzes),
        expandedCode: Array.from(appState.expandedCode),
        expandedCodeExamples: Array.from(appState.expandedCodeExamples),
        moduleComments: Array.from(appState.moduleComments.entries()),
        moduleLanguages: Array.from(appState.moduleLanguages.entries()),
        moduleModes: Array.from(appState.moduleModes.entries()),
        moduleExampleSelections: Array.from(appState.moduleExampleSelections.entries()),
        searchTerm: appState.searchTerm,
        difficultyFilter: appState.difficultyFilter,
        categoryFilter: appState.categoryFilter,
        glossaryCategory: appState.glossaryCategory,
        currentFlashcard: appState.currentFlashcard,
        selectedFlashcardModule: appState.selectedFlashcardModule,
        theme: appState.theme,
        fontScale: appState.fontScale,
        dailyChallengeId: appState.dailyChallengeId,
        dailyChallengeDate: appState.dailyChallengeDate,
        studyTipId: appState.studyTipId,
        weeklyGoal: appState.weeklyGoal,
        hideCompletedModules: appState.hideCompletedModules,
        compactLayout: appState.compactLayout,
        accent: appState.accent,
        reduceMotion: appState.reduceMotion,
        highContrast: appState.highContrast,
        cardDepth: appState.cardDepth,
        language: appState.language,
        collapsedSections: normalizeCollapsedSections(appState.collapsedSections)
    };
}

function buildSerializableUserState() {
    return {
        appState: buildSerializableAppState(),
        notesDraft: notesDraft || '',
        studyPlanState: {
            pace: studyPlanState?.pace || null,
            focus: studyPlanState?.focus || null,
            style: studyPlanState?.style || null,
            notes: studyPlanState?.notes || ''
        },
        studyMetrics: {
            totalTimeMs: Number(studyMetrics?.totalTimeMs || 0),
            todayMs: Number(studyMetrics?.todayMs || 0),
            todayDate: studyMetrics?.todayDate || null
        },
        studyHabit: {
            streak: Number(studyHabit?.streak || 0),
            longestStreak: Number(studyHabit?.longestStreak || 0),
            lastDate: studyHabit?.lastDate || null
        }
    };
}

function queueUserStateSync() {
    if (applyingRemoteUserState) return;
    if (!PROFILE_SYNC_CONFIG.autoPushUserState || !PROFILE_SYNC_CONFIG.autoPushOnSave) return;
    if (!hasNeonSyncConfig() || !hasAuthenticatedInsightsAccess()) return;
    if (userStateSyncTimer) {
        clearTimeout(userStateSyncTimer);
    }
    userStateSyncTimer = setTimeout(() => {
        pushUserStateToNeon({ silent: true });
    }, USER_STATE_SYNC_DEBOUNCE_MS);
}

// Local Storage Management
function saveToLocalStorage() {
    const stateToSave = buildSerializableAppState();
    safeSetItem('javaDSAHub', JSON.stringify(stateToSave));
    queueUserStateSync();
}

function getCanonicalModuleId(moduleId) {
    return LEGACY_MODULE_ID_MAP[moduleId] || moduleId;
}

function getValidModuleIdSet() {
    return new Set(modules.map(module => module.id));
}

function remapStoredModuleIds(ids = []) {
    const validIds = getValidModuleIdSet();
    const remapped = [];
    for (const rawId of ids) {
        const canonicalId = getCanonicalModuleId(rawId);
        if (validIds.has(canonicalId)) {
            remapped.push(canonicalId);
        }
    }
    return remapped;
}

function remapStoredModuleEntryPairs(entries = [], options = {}) {
    const { allowLegacy = true } = options;
    const validIds = getValidModuleIdSet();
    const remapped = [];
    for (const entry of entries) {
        if (!Array.isArray(entry) || entry.length < 2) continue;
        const rawId = entry[0];
        const canonicalId = allowLegacy ? getCanonicalModuleId(rawId) : rawId;
        if (!validIds.has(canonicalId)) continue;
        remapped.push([canonicalId, entry[1]]);
    }
    return remapped;
}

function sanitizeStoredModuleModes(modeMap) {
    if (!(modeMap instanceof Map)) {
        return new Map();
    }
    for (const [moduleId, mode] of modeMap.entries()) {
        const availableModes = getAvailableModeKeys(moduleId);
        if (!availableModes.includes(mode)) {
            const defaultMode = isDiscreteModule(moduleId) ? 'discreteTheory' : 'code';
            modeMap.set(moduleId, defaultMode);
        }
    }
    return modeMap;
}

function sanitizeStoredExpandedCodeExamples(expandedSet) {
    if (!(expandedSet instanceof Set)) return new Set();
    const validModuleIds = getValidModuleIdSet();
    const sanitized = new Set();
    expandedSet.forEach((entry) => {
        const value = String(entry || '');
        const [moduleId, exampleId] = value.split('::');
        if (!validModuleIds.has(moduleId) || !exampleId) return;
        const module = getModuleById(moduleId);
        const availableSets = Array.isArray(module?.codeExampleSets) ? module.codeExampleSets : [];
        if (availableSets.some((set) => set.id === exampleId)) {
            sanitized.add(value);
        }
    });
    return sanitized;
}

function sanitizeStoredModuleExampleSelections(selectionMap) {
    if (!(selectionMap instanceof Map)) return new Map();
    const validModuleIds = getValidModuleIdSet();
    const sanitized = new Map();
    selectionMap.forEach((exampleId, moduleId) => {
        if (!validModuleIds.has(moduleId)) return;
        const module = getModuleById(moduleId);
        const availableSets = Array.isArray(module?.codeExampleSets) ? module.codeExampleSets : [];
        if (!availableSets.length) return;
        if (availableSets.some((set) => set.id === exampleId)) {
            sanitized.set(moduleId, exampleId);
        }
    });
    return sanitized;
}

function sanitizeCategoryFilter(category) {
    const migrated = category === 'systems' ? 'java' : category;
    return VALID_CATEGORY_FILTERS.has(migrated) ? migrated : 'all';
}

function enforceAssemblyModuleLanguageDefaults() {
    ASSEMBLY_MODULE_IDS.forEach((moduleId) => {
        if (appState.moduleLanguages.get(moduleId) !== 'assembly') {
            appState.moduleLanguages.delete(moduleId);
        }
    });
}

function loadFromLocalStorage() {
    const saved = safeGetItem('javaDSAHub');
    const prefersReduced = typeof window !== 'undefined'
        && window.matchMedia
        && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (saved) {
        try {
            const state = JSON.parse(saved);
            appState.darkMode = state.darkMode !== undefined ? state.darkMode : true;
            appState.showComments = state.showComments !== undefined ? state.showComments : true;
            appState.completedModules = new Set(remapStoredModuleIds(state.completedModules || []));
            appState.expandedCode = new Set(state.expandedCode || []);
            appState.expandedCodeExamples = sanitizeStoredExpandedCodeExamples(new Set(state.expandedCodeExamples || []));
            appState.moduleComments = new Map(remapStoredModuleEntryPairs(state.moduleComments || []));
            appState.moduleLanguages = new Map(remapStoredModuleEntryPairs(state.moduleLanguages || []));
            appState.moduleModes = sanitizeStoredModuleModes(
                new Map(remapStoredModuleEntryPairs(state.moduleModes || [], { allowLegacy: false }))
            );
            appState.moduleExampleSelections = sanitizeStoredModuleExampleSelections(
                new Map(remapStoredModuleEntryPairs(state.moduleExampleSelections || [], { allowLegacy: false }))
            );
            appState.searchTerm = state.searchTerm || '';
            appState.difficultyFilter = state.difficultyFilter || 'all';
            appState.categoryFilter = sanitizeCategoryFilter(state.categoryFilter || 'all');
            appState.glossaryCategory = state.glossaryCategory || 'all';
            appState.currentFlashcard = state.currentFlashcard || 0;
            appState.selectedFlashcardModule = state.selectedFlashcardModule || 'all';
            appState.theme = state.theme || 'default';
            appState.fontScale = state.fontScale || 'base';
            appState.completedQuizzes = new Set(remapStoredModuleIds(state.completedQuizzes || []));
            appState.dailyChallengeId = state.dailyChallengeId || null;
            appState.dailyChallengeDate = state.dailyChallengeDate || null;
            appState.studyTipId = state.studyTipId || null;
            appState.weeklyGoal = Number(state.weeklyGoal) || 5;
            appState.hideCompletedModules = Boolean(state.hideCompletedModules);
            appState.compactLayout = Boolean(state.compactLayout);
            appState.reduceMotion = state.reduceMotion !== undefined ? Boolean(state.reduceMotion) : prefersReduced;
            appState.highContrast = Boolean(state.highContrast);
            appState.accent = ACCENT_OPTIONS.includes(state.accent) ? state.accent : 'indigo';
            appState.cardDepth = CARD_DEPTH_OPTIONS.includes(state.cardDepth) ? state.cardDepth : 'standard';
            appState.language = ['en', 'es'].includes(state.language) ? state.language : 'en';
            appState.collapsedSections = normalizeCollapsedSections(state.collapsedSections);

            // Keep assembly modules defaulting to Assembly unless explicitly set to Assembly.
            enforceAssemblyModuleLanguageDefaults();
        } catch (e) {
            console.error('Failed to load saved state:', e);
        }
    } else {
        appState.reduceMotion = prefersReduced;
        appState.collapsedSections = normalizeCollapsedSections(appState.collapsedSections);
    }
}

function applyRemoteUserStateSnapshot(snapshot, options = {}) {
    if (!snapshot || typeof snapshot !== 'object') return false;
    const { persistLocal = true } = options;
    const state = snapshot.appState && typeof snapshot.appState === 'object'
        ? snapshot.appState
        : snapshot;

    applyingRemoteUserState = true;
    try {
        const prefersReduced = typeof window !== 'undefined'
            && window.matchMedia
            && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        appState.darkMode = state.darkMode !== undefined ? Boolean(state.darkMode) : appState.darkMode;
        appState.showComments = state.showComments !== undefined ? Boolean(state.showComments) : appState.showComments;
        appState.completedModules = new Set(remapStoredModuleIds(state.completedModules || []));
        appState.expandedCode = new Set(state.expandedCode || []);
        appState.expandedCodeExamples = sanitizeStoredExpandedCodeExamples(new Set(state.expandedCodeExamples || []));
        appState.moduleComments = new Map(remapStoredModuleEntryPairs(state.moduleComments || []));
        appState.moduleLanguages = new Map(remapStoredModuleEntryPairs(state.moduleLanguages || []));
        appState.moduleModes = sanitizeStoredModuleModes(
            new Map(remapStoredModuleEntryPairs(state.moduleModes || [], { allowLegacy: false }))
        );
        appState.moduleExampleSelections = sanitizeStoredModuleExampleSelections(
            new Map(remapStoredModuleEntryPairs(state.moduleExampleSelections || [], { allowLegacy: false }))
        );
        appState.searchTerm = String(state.searchTerm || '');
        appState.difficultyFilter = state.difficultyFilter || 'all';
        appState.categoryFilter = sanitizeCategoryFilter(state.categoryFilter || appState.categoryFilter || 'all');
        appState.glossaryCategory = state.glossaryCategory || 'all';
        appState.currentFlashcard = Number(state.currentFlashcard || 0);
        appState.selectedFlashcardModule = state.selectedFlashcardModule || 'all';
        appState.theme = state.theme || appState.theme || 'default';
        appState.fontScale = state.fontScale || appState.fontScale || 'base';
        appState.completedQuizzes = new Set(remapStoredModuleIds(state.completedQuizzes || []));
        appState.dailyChallengeId = state.dailyChallengeId || null;
        appState.dailyChallengeDate = state.dailyChallengeDate || null;
        appState.studyTipId = state.studyTipId || null;
        appState.weeklyGoal = Number(state.weeklyGoal) || appState.weeklyGoal || 5;
        appState.hideCompletedModules = Boolean(state.hideCompletedModules);
        appState.compactLayout = Boolean(state.compactLayout);
        appState.reduceMotion = state.reduceMotion !== undefined ? Boolean(state.reduceMotion) : (appState.reduceMotion || prefersReduced);
        appState.highContrast = Boolean(state.highContrast);
        appState.accent = ACCENT_OPTIONS.includes(state.accent) ? state.accent : (appState.accent || 'indigo');
        appState.cardDepth = CARD_DEPTH_OPTIONS.includes(state.cardDepth) ? state.cardDepth : (appState.cardDepth || 'standard');
        appState.language = ['en', 'es'].includes(state.language) ? state.language : (appState.language || 'en');
        appState.collapsedSections = normalizeCollapsedSections(state.collapsedSections || appState.collapsedSections);

        enforceAssemblyModuleLanguageDefaults();

        if (typeof snapshot.notesDraft === 'string') {
            notesDraft = snapshot.notesDraft;
            saveNotesDraft(notesDraft);
            const notesInput = document.getElementById('notes-input');
            if (notesInput) notesInput.value = notesDraft;
        }
        if (snapshot.studyPlanState && typeof snapshot.studyPlanState === 'object') {
            studyPlanState = {
                pace: snapshot.studyPlanState.pace || null,
                focus: snapshot.studyPlanState.focus || null,
                style: snapshot.studyPlanState.style || null,
                notes: snapshot.studyPlanState.notes || ''
            };
            saveStudyPlan();
        }
        if (snapshot.studyMetrics && typeof snapshot.studyMetrics === 'object') {
            studyMetrics = {
                ...loadStudyMetrics(),
                ...snapshot.studyMetrics
            };
            saveStudyMetrics();
        }
        if (snapshot.studyHabit && typeof snapshot.studyHabit === 'object') {
            studyHabit = {
                ...loadStudyHabit(),
                ...snapshot.studyHabit
            };
            saveStudyHabit();
        }

        applyFontScale();
        applyTheme();
        applyAccent();
        applyCardDepth();
        applyCompactLayout();
        applyReduceMotion();
        applyHighContrast();
        updateDarkMode();
        updateCommentsToggle();
        updateHideCompletedToggle();
        updateCompactLayoutToggle();
        updateReduceMotionToggle();
        updateHighContrastToggle();
        updateProgress();
        renderModules();
        renderDailyChallenge();
        renderStudyTip();
        renderInsights();
        renderAchievements();
        renderNotesLibrary();
        updateStudyTrackerUI();
        applyLanguage(appState.language);
        renderSectionCollapsibles();
        if (typeof window.refreshPlaygroundSnippetCatalog === 'function') {
            window.refreshPlaygroundSnippetCatalog();
        }

        const searchInput = document.getElementById('search-input');
        if (searchInput) searchInput.value = appState.searchTerm;
        const difficultyFilter = document.getElementById('difficulty-filter');
        if (difficultyFilter) difficultyFilter.value = appState.difficultyFilter;
        updateTopicFocusButtons();

        if (persistLocal) {
            safeSetItem('javaDSAHub', JSON.stringify(buildSerializableAppState()));
        }
        return true;
    } catch (error) {
        console.error('Failed to apply remote user state:', error);
        return false;
    } finally {
        applyingRemoteUserState = false;
    }
}

// =================================
// EXTENDED FEATURES: NOTES, PLANS, INTERVIEWS, PLAYGROUND
// =================================

const INTERVIEW_EXAMPLES = [
    {
        id: 'two-sum',
        title: 'Two Sum (Hash Map)',
        difficulty: 'Beginner',
        minutes: 20,
        tags: ['Array', 'HashMap'],
        prompt: 'Given an array of integers, return indices of the two numbers such that they add up to a target. Assume exactly one solution and that you cannot use the same element twice.',
        solution: `// Java\npublic int[] twoSum(int[] nums, int target) {\n    Map<Integer, Integer> seen = new HashMap<>();\n    for (int i = 0; i < nums.length; i++) {\n        int need = target - nums[i];\n        if (seen.containsKey(need)) {\n            return new int[] { seen.get(need), i };\n        }\n        seen.put(nums[i], i);\n    }\n    return new int[] { -1, -1 };\n}`,
        language: 'Java',
        notes: 'Store value → index so lookup is O(1).'
    },
    {
        id: 'valid-parentheses',
        title: 'Valid Parentheses (Stack)',
        difficulty: 'Beginner',
        minutes: 15,
        tags: ['Stack', 'String'],
        prompt: 'Given a string containing ()[]{} brackets, determine if the string is valid. A valid string closes brackets in the correct order.',
        solution: `// Java\npublic boolean isValid(String s) {\n    Deque<Character> stack = new ArrayDeque<>();\n    Map<Character, Character> pairs = Map.of(')', '(', ']', '[', '}', '{');\n    for (char c : s.toCharArray()) {\n        if (pairs.containsValue(c)) {\n            stack.push(c);\n        } else if (!stack.isEmpty() && pairs.get(c) == stack.peek()) {\n            stack.pop();\n        } else {\n            return false;\n        }\n    }\n    return stack.isEmpty();\n}`,
        language: 'Java',
        notes: 'Push opens, pop when matching closes arrive.'
    },
    {
        id: 'merge-two-lists',
        title: 'Merge Two Sorted Lists',
        difficulty: 'Beginner',
        minutes: 20,
        tags: ['Linked List', 'Two Pointers'],
        prompt: 'Merge two sorted linked lists and return the head of the merged list. The resulting list should be sorted.',
        solution: `// Java\npublic ListNode mergeTwoLists(ListNode l1, ListNode l2) {\n    ListNode dummy = new ListNode(0);\n    ListNode tail = dummy;\n    while (l1 != null && l2 != null) {\n        if (l1.val <= l2.val) {\n            tail.next = l1;\n            l1 = l1.next;\n        } else {\n            tail.next = l2;\n            l2 = l2.next;\n        }\n        tail = tail.next;\n    }\n    tail.next = (l1 != null) ? l1 : l2;\n    return dummy.next;\n}`,
        language: 'Java',
        notes: 'Use a dummy head to simplify pointer updates.'
    },
    {
        id: 'binary-search',
        title: 'Binary Search',
        difficulty: 'Beginner',
        minutes: 15,
        tags: ['Array', 'Binary Search'],
        prompt: 'Given a sorted array and a target value, return the index if found. Otherwise return -1.',
        solution: `// Java\npublic int binarySearch(int[] nums, int target) {\n    int left = 0, right = nums.length - 1;\n    while (left <= right) {\n        int mid = left + (right - left) / 2;\n        if (nums[mid] == target) return mid;\n        if (nums[mid] < target) left = mid + 1;\n        else right = mid - 1;\n    }\n    return -1;\n}`,
        language: 'Java',
        notes: 'Always shrink the search window based on mid.'
    },
    {
        id: 'bfs-grid',
        title: 'Shortest Path in Grid (BFS)',
        difficulty: 'Intermediate',
        minutes: 30,
        tags: ['Graph', 'BFS'],
        prompt: 'Given a grid with 0 = free and 1 = blocked, find the shortest path length from top-left to bottom-right using BFS.',
        solution: `// Java\npublic int shortestPath(int[][] grid) {\n    int n = grid.length, m = grid[0].length;\n    int[][] dirs = { {1,0}, {-1,0}, {0,1}, {0,-1} };\n    boolean[][] seen = new boolean[n][m];\n    Queue<int[]> q = new ArrayDeque<>();\n    if (grid[0][0] == 1) return -1;\n    q.add(new int[] {0,0,0});\n    seen[0][0] = true;\n    while (!q.isEmpty()) {\n        int[] cur = q.poll();\n        int r = cur[0], c = cur[1], d = cur[2];\n        if (r == n - 1 && c == m - 1) return d;\n        for (int[] dir : dirs) {\n            int nr = r + dir[0], nc = c + dir[1];\n            if (nr >= 0 && nr < n && nc >= 0 && nc < m && grid[nr][nc] == 0 && !seen[nr][nc]) {\n                seen[nr][nc] = true;\n                q.add(new int[] {nr, nc, d + 1});\n            }\n        }\n    }\n    return -1;\n}`,
        language: 'Java',
        notes: 'BFS guarantees shortest path in unweighted graphs.'
    },
    {
        id: 'top-k-frequent',
        title: 'Top K Frequent Elements',
        difficulty: 'Intermediate',
        minutes: 25,
        tags: ['HashMap', 'Heap'],
        prompt: 'Given an array of integers, return the k most frequent elements.',
        solution: `// Java\npublic int[] topKFrequent(int[] nums, int k) {\n    Map<Integer, Integer> freq = new HashMap<>();\n    for (int num : nums) freq.put(num, freq.getOrDefault(num, 0) + 1);\n    PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> a[1] - b[1]);\n    for (Map.Entry<Integer, Integer> entry : freq.entrySet()) {\n        heap.offer(new int[] { entry.getKey(), entry.getValue() });\n        if (heap.size() > k) heap.poll();\n    }\n    int[] result = new int[k];\n    for (int i = k - 1; i >= 0; i--) result[i] = heap.poll()[0];\n    return result;\n}`,
        language: 'Java',
        notes: 'Maintain a min-heap of size k for O(n log k).'
    }
];

const INTERVIEW_PAGE_SIZE = 2;

const INTERVIEW_RUN_SAMPLES = {
    'two-sum': {
        language: 'java',
        code: `import java.util.*;

public class Main {
    static int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> seen = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int need = target - nums[i];
            if (seen.containsKey(need)) {
                return new int[] { seen.get(need), i };
            }
            seen.put(nums[i], i);
        }
        return new int[] { -1, -1 };
    }

    public static void main(String[] args) {
        int[] answer = twoSum(new int[] {2, 7, 11, 15}, 9);
        System.out.println("Indices: " + Arrays.toString(answer));
    }
}`,
        expectedOutput: `Indices: [0, 1]`
    },
    'valid-parentheses': {
        language: 'java',
        code: `import java.util.*;

public class Main {
    static boolean isValid(String s) {
        Deque<Character> stack = new ArrayDeque<>();
        Map<Character, Character> pairs = new HashMap<>();
        pairs.put(')', '(');
        pairs.put(']', '[');
        pairs.put('}', '{');
        for (char c : s.toCharArray()) {
            if (pairs.containsValue(c)) {
                stack.push(c);
            } else if (pairs.containsKey(c) && !stack.isEmpty() && pairs.get(c) == stack.peek()) {
                stack.pop();
            } else {
                return false;
            }
        }
        return stack.isEmpty();
    }

    public static void main(String[] args) {
        System.out.println("()[]{} -> " + isValid("()[]{}"));
        System.out.println("(] -> " + isValid("(]"));
    }
}`,
        expectedOutput: `()[]{} -> true\n(] -> false`
    },
    'merge-two-lists': {
        language: 'java',
        code: `public class Main {
    static class ListNode {
        int val;
        ListNode next;
        ListNode(int val) { this.val = val; }
    }

    static ListNode mergeTwoLists(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;
        while (l1 != null && l2 != null) {
            if (l1.val <= l2.val) {
                tail.next = l1;
                l1 = l1.next;
            } else {
                tail.next = l2;
                l2 = l2.next;
            }
            tail = tail.next;
        }
        tail.next = (l1 != null) ? l1 : l2;
        return dummy.next;
    }

    static ListNode build(int... values) {
        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;
        for (int value : values) {
            tail.next = new ListNode(value);
            tail = tail.next;
        }
        return dummy.next;
    }

    static String stringify(ListNode head) {
        StringBuilder sb = new StringBuilder();
        while (head != null) {
            if (sb.length() > 0) sb.append(" -> ");
            sb.append(head.val);
            head = head.next;
        }
        return sb.toString();
    }

    public static void main(String[] args) {
        ListNode merged = mergeTwoLists(build(1, 2, 4), build(1, 3, 4));
        System.out.println("Merged: " + stringify(merged));
    }
}`,
        expectedOutput: `Merged: 1 -> 1 -> 2 -> 3 -> 4 -> 4`
    },
    'binary-search': {
        language: 'java',
        code: `public class Main {
    static int binarySearch(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;
            if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return -1;
    }

    public static void main(String[] args) {
        int[] nums = {-1, 0, 3, 5, 9, 12};
        System.out.println("target 9 -> " + binarySearch(nums, 9));
        System.out.println("target 6 -> " + binarySearch(nums, 6));
    }
}`,
        expectedOutput: `target 9 -> 4\ntarget 6 -> -1`
    },
    'bfs-grid': {
        language: 'java',
        code: `import java.util.*;

public class Main {
    static int shortestPath(int[][] grid) {
        int n = grid.length;
        int m = grid[0].length;
        int[][] dirs = { {1, 0}, {-1, 0}, {0, 1}, {0, -1} };
        boolean[][] seen = new boolean[n][m];
        Queue<int[]> q = new ArrayDeque<>();
        if (grid[0][0] == 1) return -1;
        q.add(new int[] {0, 0, 0});
        seen[0][0] = true;
        while (!q.isEmpty()) {
            int[] cur = q.poll();
            int r = cur[0], c = cur[1], d = cur[2];
            if (r == n - 1 && c == m - 1) return d;
            for (int[] dir : dirs) {
                int nr = r + dir[0], nc = c + dir[1];
                if (nr >= 0 && nr < n && nc >= 0 && nc < m && grid[nr][nc] == 0 && !seen[nr][nc]) {
                    seen[nr][nc] = true;
                    q.add(new int[] {nr, nc, d + 1});
                }
            }
        }
        return -1;
    }

    public static void main(String[] args) {
        int[][] grid = {
            {0, 0, 0},
            {1, 1, 0},
            {0, 0, 0}
        };
        System.out.println("Shortest path: " + shortestPath(grid));
    }
}`,
        expectedOutput: `Shortest path: 4`
    },
    'top-k-frequent': {
        language: 'java',
        code: `import java.util.*;

public class Main {
    static int[] topKFrequent(int[] nums, int k) {
        Map<Integer, Integer> freq = new HashMap<>();
        for (int num : nums) freq.put(num, freq.getOrDefault(num, 0) + 1);
        PriorityQueue<int[]> heap = new PriorityQueue<>((a, b) -> a[1] - b[1]);
        for (Map.Entry<Integer, Integer> entry : freq.entrySet()) {
            heap.offer(new int[] { entry.getKey(), entry.getValue() });
            if (heap.size() > k) heap.poll();
        }
        int[] result = new int[k];
        for (int i = k - 1; i >= 0; i--) {
            result[i] = heap.poll()[0];
        }
        Arrays.sort(result);
        return result;
    }

    public static void main(String[] args) {
        int[] answer = topKFrequent(new int[] {1, 1, 1, 2, 2, 3}, 2);
        System.out.println("Top k frequent: " + Arrays.toString(answer));
    }
}`,
        expectedOutput: `Top k frequent: [1, 2]`
    }
};

const NOTES_LIBRARY = [
    {
        id: 'arrays-strings',
        title: 'Arrays & Strings Cheat Sheet',
        category: 'Arrays',
        description: 'Big-O, sliding window patterns, and common pitfalls.',
        pages: 6,
        level: 'Beginner',
        downloadUrl: ''
    },
    {
        id: 'linked-lists',
        title: 'Linked Lists Visual Guide',
        category: 'Linked Lists',
        description: 'Pointer moves, reversal patterns, and cycle detection.',
        pages: 5,
        level: 'Beginner',
        downloadUrl: ''
    },
    {
        id: 'stack-queue',
        title: 'Stacks & Queues Quick Reference',
        category: 'Stacks & Queues',
        description: 'LIFO/FIFO use cases, monotonic patterns, and queues.',
        pages: 4,
        level: 'Beginner',
        downloadUrl: ''
    },
    {
        id: 'trees',
        title: 'Trees & BSTs Guide',
        category: 'Trees',
        description: 'Traversals, BST invariants, and recursion tips.',
        pages: 7,
        level: 'Intermediate',
        downloadUrl: ''
    },
    {
        id: 'graphs',
        title: 'Graphs BFS/DFS Sheet',
        category: 'Graphs',
        description: 'Adjacency lists, traversal templates, and shortest path.',
        pages: 6,
        level: 'Intermediate',
        downloadUrl: ''
    },
    {
        id: 'sorting',
        title: 'Sorting Algorithms Summary',
        category: 'Sorting',
        description: 'Stable vs unstable, complexities, and use cases.',
        pages: 5,
        level: 'Beginner',
        downloadUrl: ''
    },
    {
        id: 'recursion',
        title: 'Recursion & Backtracking',
        category: 'Recursion',
        description: 'Base cases, call stack, and backtracking checklist.',
        pages: 6,
        level: 'Intermediate',
        downloadUrl: ''
    },
    {
        id: 'big-o',
        title: 'Big-O & Complexity',
        category: 'Complexity',
        description: 'Runtime intuition, amortized analysis, and pitfalls.',
        pages: 4,
        level: 'Beginner',
        downloadUrl: ''
    },
    {
        id: 'java-dsa',
        title: 'Java Collections for DSA',
        category: 'Java',
        description: 'HashMap, ArrayDeque, PriorityQueue cheat sheet.',
        pages: 5,
        level: 'Intermediate',
        downloadUrl: ''
    },
    {
        id: 'discrete-math',
        title: 'Discrete Math Toolkit',
        category: 'Discrete Math',
        description: 'Logic, sets, combinatorics, and graph basics.',
        pages: 6,
        level: 'Beginner',
        downloadUrl: ''
    }
];

const DS_PLAYGROUND_CONFIG = {
    array: {
        label: 'Array',
        hint: {
            en: 'Indexed contiguous storage for fast reads and linear inserts/deletes.',
            es: 'Almacenamiento contiguo indexado para lecturas rápidas e inserciones/eliminaciones lineales.'
        },
        operations: { access: 'O(1)', search: 'O(n)', insert: 'O(n)', remove: 'O(n)' },
        defaultOperation: 'insert',
        definitions: [
            { term: 'Index', description: 'Zero-based position used for direct access.' },
            { term: 'Contiguous memory', description: 'Elements are stored in adjacent slots.' },
            { term: 'Shift cost', description: 'Middle insert/remove may shift many items.' }
        ],
        codeExamples: {
            java: `import java.util.*;

public class ArrayPlaygroundDemo {
    public static void main(String[] args) {
        List<Integer> arr = new ArrayList<>(Arrays.asList(4, 9, 2, 7));
        arr.add(1, 5); // insert at index
        arr.remove(arr.size() - 1); // remove last
        int found = arr.indexOf(9); // linear search
        System.out.println("Array state: " + arr);
        System.out.println("Index of 9: " + found);
    }
}`,
            cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    vector<int> arr = {4, 9, 2, 7};
    arr.insert(arr.begin() + 1, 5);
    arr.pop_back();
    auto it = find(arr.begin(), arr.end(), 9);
    cout << "Array state: ";
    for (int x : arr) cout << x << " ";
    cout << "\\nIndex of 9: " << (it == arr.end() ? -1 : int(it - arr.begin())) << "\\n";
    return 0;
}`,
            python: `def array_playground_demo():
    arr = [4, 9, 2, 7]
    arr.insert(1, 5)
    arr.pop()
    found = arr.index(9) if 9 in arr else -1
    print("Array state:", arr)
    print("Index of 9:", found)

array_playground_demo()
`,
            javascript: `(function arrayPlaygroundDemo() {
    const arr = [4, 9, 2, 7];
    arr.splice(1, 0, 5);
    arr.pop();
    const found = arr.indexOf(9);
    console.log("Array state:", arr);
    console.log("Index of 9:", found);
})();`
        },
        codeExplanations: {
            java: {
                en: 'Shows indexed insert, tail removal, and linear search with explicit output.',
                es: 'Muestra inserción por índice, eliminación al final y búsqueda lineal con salida explícita.'
            },
            cpp: {
                en: 'Uses vector insert/pop_back/find to mirror array operations and complexity tradeoffs.',
                es: 'Usa vector insert/pop_back/find para reflejar operaciones de arreglo y sus costos.'
            },
            python: {
                en: 'Uses list insert/pop/index and prints resulting state for quick verification.',
                es: 'Usa list insert/pop/index e imprime el estado final para verificar resultados.'
            },
            javascript: {
                en: 'Uses splice/pop/indexOf to keep behavior aligned with the visual controls.',
                es: 'Usa splice/pop/indexOf para mantener el comportamiento alineado con los controles visuales.'
            }
        }
    },
    stack: {
        label: 'Stack',
        hint: {
            en: 'LIFO model for undo flows, parsing, recursion simulation, and backtracking.',
            es: 'Modelo LIFO para deshacer, análisis de expresiones, simulación de recursión y backtracking.'
        },
        operations: { push: 'O(1)', pop: 'O(1)', peek: 'O(1)' },
        defaultOperation: 'push',
        definitions: [
            { term: 'LIFO', description: 'Last in, first out access pattern.' },
            { term: 'Top pointer', description: 'Marks the element returned by peek/pop.' },
            { term: 'Underflow', description: 'Attempting pop on an empty stack.' }
        ],
        codeExamples: {
            java: `import java.util.ArrayDeque;

public class StackPlaygroundDemo {
    public static void main(String[] args) {
        ArrayDeque<Integer> stack = new ArrayDeque<>();
        stack.push(3); stack.push(6); stack.push(9);
        System.out.println("Top before pop: " + stack.peek());
        int popped = stack.pop();
        System.out.println("Popped value: " + popped);
        System.out.println("Stack now: " + stack);
    }
}`,
            cpp: `#include <iostream>
#include <stack>
using namespace std;

int main() {
    stack<int> st;
    st.push(3); st.push(6); st.push(9);
    cout << "Top before pop: " << st.top() << "\\n";
    int popped = st.top(); st.pop();
    cout << "Popped value: " << popped << "\\n";
    cout << "Top now: " << (st.empty() ? -1 : st.top()) << "\\n";
    return 0;
}`,
            python: `def stack_playground_demo():
    stack = [3, 6, 9]
    print("Top before pop:", stack[-1])
    popped = stack.pop()
    print("Popped value:", popped)
    print("Stack now:", stack)

stack_playground_demo()
`,
            javascript: `(function stackPlaygroundDemo() {
    const stack = [3, 6, 9];
    console.log("Top before pop:", stack[stack.length - 1]);
    const popped = stack.pop();
    console.log("Popped value:", popped);
    console.log("Stack now:", stack);
})();`
        },
        codeExplanations: {
            java: { en: 'ArrayDeque gives O(1) push/pop at the top.', es: 'ArrayDeque entrega push/pop O(1) en la parte superior.' },
            cpp: { en: 'std::stack models strict LIFO operations.', es: 'std::stack modela operaciones LIFO estrictas.' },
            python: { en: 'Python list append/pop supports stack behavior cleanly.', es: 'La lista de Python con append/pop soporta comportamiento de pila de forma directa.' },
            javascript: { en: 'JavaScript arrays naturally support stack push/pop semantics.', es: 'Los arreglos en JavaScript soportan naturalmente la semántica push/pop de pila.' }
        }
    },
    queue: {
        label: 'Queue',
        hint: {
            en: 'FIFO ordering for scheduling, BFS, buffering, and producer-consumer pipelines.',
            es: 'Orden FIFO para planificación, BFS, buffering y flujos productor-consumidor.'
        },
        operations: { enqueue: 'O(1)', dequeue: 'O(1)', peek: 'O(1)' },
        defaultOperation: 'enqueue',
        definitions: [
            { term: 'FIFO', description: 'First in, first out processing order.' },
            { term: 'Front', description: 'Element removed by dequeue.' },
            { term: 'Rear', description: 'Insertion point for enqueue.' }
        ],
        codeExamples: {
            java: `import java.util.ArrayDeque;

public class QueuePlaygroundDemo {
    public static void main(String[] args) {
        ArrayDeque<Integer> queue = new ArrayDeque<>();
        queue.offer(5); queue.offer(8); queue.offer(11);
        System.out.println("Front before dequeue: " + queue.peek());
        int removed = queue.poll();
        System.out.println("Dequeued value: " + removed);
        System.out.println("Queue now: " + queue);
    }
}`,
            cpp: `#include <iostream>
#include <queue>
using namespace std;

int main() {
    queue<int> q;
    q.push(5); q.push(8); q.push(11);
    cout << "Front before dequeue: " << q.front() << "\\n";
    int removed = q.front(); q.pop();
    cout << "Dequeued value: " << removed << "\\n";
    cout << "Front now: " << (q.empty() ? -1 : q.front()) << "\\n";
    return 0;
}`,
            python: `from collections import deque

def queue_playground_demo():
    queue = deque([5, 8, 11])
    print("Front before dequeue:", queue[0])
    removed = queue.popleft()
    print("Dequeued value:", removed)
    print("Queue now:", list(queue))

queue_playground_demo()
`,
            javascript: `(function queuePlaygroundDemo() {
    const queue = [5, 8, 11];
    console.log("Front before dequeue:", queue[0]);
    const removed = queue.shift();
    console.log("Dequeued value:", removed);
    console.log("Queue now:", queue);
})();`
        },
        codeExplanations: {
            java: { en: 'ArrayDeque supports queue operations through offer/poll/peek.', es: 'ArrayDeque soporta cola mediante offer/poll/peek.' },
            cpp: { en: 'std::queue encapsulates FIFO behavior cleanly.', es: 'std::queue encapsula comportamiento FIFO de forma clara.' },
            python: { en: 'collections.deque gives O(1) pops from the left.', es: 'collections.deque da extracciones O(1) por la izquierda.' },
            javascript: { en: 'shift models dequeue; use with care for very large arrays.', es: 'shift modela dequeue; úsalo con cuidado en arreglos muy grandes.' }
        }
    },
    heap: {
        label: 'Heap',
        hint: {
            en: 'Priority structure where root keeps min/max depending on heap type.',
            es: 'Estructura de prioridad donde la raíz mantiene min/máx según el tipo de heap.'
        },
        operations: { insert: 'O(log n)', extract: 'O(log n)', peek: 'O(1)' },
        defaultOperation: 'insert',
        definitions: [
            { term: 'Heap property', description: 'Parent order relative to children is maintained.' },
            { term: 'Heapify', description: 'Restore heap property after mutation.' },
            { term: 'Priority queue', description: 'A heap-backed structure for top priority retrieval.' }
        ],
        codeExamples: {
            java: `import java.util.PriorityQueue;

public class HeapPlaygroundDemo {
    public static void main(String[] args) {
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        minHeap.offer(7); minHeap.offer(2); minHeap.offer(9); minHeap.offer(5);
        System.out.println("Min before extract: " + minHeap.peek());
        int extracted = minHeap.poll();
        System.out.println("Extracted: " + extracted);
        System.out.println("Heap now: " + minHeap);
    }
}`,
            cpp: `#include <iostream>
#include <queue>
#include <vector>
using namespace std;

int main() {
    priority_queue<int, vector<int>, greater<int>> minHeap;
    minHeap.push(7); minHeap.push(2); minHeap.push(9); minHeap.push(5);
    cout << "Min before extract: " << minHeap.top() << "\\n";
    int extracted = minHeap.top(); minHeap.pop();
    cout << "Extracted: " << extracted << "\\n";
    cout << "Min now: " << (minHeap.empty() ? -1 : minHeap.top()) << "\\n";
    return 0;
}`,
            python: `import heapq

def heap_playground_demo():
    heap = [7, 2, 9, 5]
    heapq.heapify(heap)
    print("Min before extract:", heap[0])
    extracted = heapq.heappop(heap)
    print("Extracted:", extracted)
    print("Heap now:", heap)

heap_playground_demo()
`,
            javascript: `(function heapPlaygroundDemo() {
    const values = [7, 2, 9, 5];
    values.sort((a, b) => a - b); // simplified teaching mirror of min-heap root behavior
    console.log("Min before extract:", values[0]);
    const extracted = values.shift();
    console.log("Extracted:", extracted);
    console.log("Heap now (sorted mirror):", values);
})();`
        },
        codeExplanations: {
            java: { en: 'PriorityQueue is the standard min-heap implementation in Java.', es: 'PriorityQueue es la implementación estándar de min-heap en Java.' },
            cpp: { en: 'priority_queue with greater<int> yields min-heap behavior.', es: 'priority_queue con greater<int> produce comportamiento de min-heap.' },
            python: { en: 'heapq provides heapify/heappop for efficient priorities.', es: 'heapq ofrece heapify/heappop para prioridades eficientes.' },
            javascript: { en: 'For teaching clarity this mirror uses sorted order to explain root extraction.', es: 'Para claridad didáctica este espejo usa ordenado para explicar extracción de raíz.' }
        }
    },
    graph: {
        label: 'Graph',
        hint: {
            en: 'Nodes and edges model relationships, paths, and traversals like BFS/DFS.',
            es: 'Nodos y aristas modelan relaciones, rutas y recorridos como BFS/DFS.'
        },
        operations: { addNode: 'O(1)', addEdge: 'O(1)', traversal: 'O(V + E)' },
        defaultOperation: 'addEdge',
        definitions: [
            { term: 'Vertex', description: 'A node representing an entity/state.' },
            { term: 'Edge', description: 'A relation/connection between vertices.' },
            { term: 'Adjacency list', description: 'Compact graph representation by neighbors.' }
        ],
        codeExamples: {
            java: `import java.util.*;

public class GraphPlaygroundDemo {
    public static void main(String[] args) {
        Map<String, List<String>> g = new HashMap<>();
        g.put("A", new ArrayList<>(Arrays.asList("B", "C")));
        g.put("B", new ArrayList<>(Arrays.asList("D")));
        g.putIfAbsent("C", new ArrayList<>());
        g.putIfAbsent("D", new ArrayList<>());
        System.out.println("Adjacency: " + g);
        System.out.println("Neighbors of A: " + g.get("A"));
    }
}`,
            cpp: `#include <iostream>
#include <unordered_map>
#include <vector>
#include <string>
using namespace std;

int main() {
    unordered_map<string, vector<string>> g;
    g["A"] = {"B", "C"};
    g["B"] = {"D"};
    g["C"] = {};
    g["D"] = {};
    cout << "Neighbors of A: ";
    for (const auto& n : g["A"]) cout << n << " ";
    cout << "\\nNode count: " << g.size() << "\\n";
    return 0;
}`,
            python: `def graph_playground_demo():
    g = {
        "A": ["B", "C"],
        "B": ["D"],
        "C": [],
        "D": []
    }
    print("Adjacency:", g)
    print("Neighbors of A:", g["A"])

graph_playground_demo()
`,
            javascript: `(function graphPlaygroundDemo() {
    const g = new Map([
        ["A", ["B", "C"]],
        ["B", ["D"]],
        ["C", []],
        ["D", []]
    ]);
    console.log("Neighbors of A:", g.get("A"));
    console.log("Node count:", g.size);
})();`
        },
        codeExplanations: {
            java: { en: 'Adjacency list with HashMap keeps graph updates simple and explicit.', es: 'La lista de adyacencia con HashMap mantiene actualizaciones de grafo claras y simples.' },
            cpp: { en: 'unordered_map<string, vector<string>> mirrors directed adjacency lists.', es: 'unordered_map<string, vector<string>> refleja listas de adyacencia dirigidas.' },
            python: { en: 'Dictionary-of-lists is concise for graph teaching and quick traversal demos.', es: 'Diccionario de listas es conciso para enseñar grafos y recorrerlos rápido.' },
            javascript: { en: 'Map + arrays gives readable graph state for browser-based demos.', es: 'Map con arreglos da un estado de grafo legible para demos en navegador.' }
        }
    },
    trie: {
        label: 'Trie',
        hint: {
            en: 'Prefix tree optimized for dictionary lookups and startsWith queries.',
            es: 'Árbol de prefijos optimizado para búsquedas de diccionario y consultas startsWith.'
        },
        operations: { insert: 'O(L)', search: 'O(L)', startsWith: 'O(L)' },
        defaultOperation: 'search',
        definitions: [
            { term: 'Prefix path', description: 'Shared path for words with same prefix.' },
            { term: 'Terminal marker', description: 'Flag that marks complete stored words.' },
            { term: 'Branching factor', description: 'Number of children per node based on alphabet.' }
        ],
        codeExamples: {
            java: `import java.util.*;

public class TriePlaygroundDemo {
    public static void main(String[] args) {
        List<String> words = Arrays.asList("tree", "trie", "trial");
        String query = "tri";
        boolean hasPrefix = words.stream().anyMatch(w -> w.startsWith(query));
        boolean hasWord = words.contains("trie");
        System.out.println("Words: " + words);
        System.out.println("Has prefix '" + query + "': " + hasPrefix);
        System.out.println("Contains 'trie': " + hasWord);
    }
}`,
            cpp: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

int main() {
    vector<string> words = {"tree", "trie", "trial"};
    string query = "tri";
    bool hasPrefix = false;
    for (const auto& w : words) {
        if (w.rfind(query, 0) == 0) { hasPrefix = true; break; }
    }
    cout << "Has prefix '" << query << "': " << (hasPrefix ? "true" : "false") << "\\n";
    return 0;
}`,
            python: `def trie_playground_demo():
    words = ["tree", "trie", "trial"]
    query = "tri"
    has_prefix = any(word.startswith(query) for word in words)
    print("Words:", words)
    print(f"Has prefix '{query}':", has_prefix)
    print("Contains 'trie':", "trie" in words)

trie_playground_demo()
`,
            javascript: `(function triePlaygroundDemo() {
    const words = ["tree", "trie", "trial"];
    const query = "tri";
    const hasPrefix = words.some((word) => word.startsWith(query));
    console.log("Words:", words);
    console.log("Has prefix '" + query + "':", hasPrefix);
    console.log("Contains 'trie':", words.includes("trie"));
})();`
        },
        codeExplanations: {
            java: { en: 'Uses a simple prefix-check mirror to explain Trie outcomes with printed results.', es: 'Usa un espejo simple de prefijos para explicar resultados de Trie con salida visible.' },
            cpp: { en: 'Prefix check with rfind(...,0) demonstrates startsWith logic clearly.', es: 'La verificación con rfind(...,0) demuestra claramente la lógica startsWith.' },
            python: { en: 'any(...startswith) models fast prefix matching behavior in a compact way.', es: 'any(...startswith) modela la búsqueda rápida por prefijo de forma compacta.' },
            javascript: { en: 'some/startsWith mirrors prefix lookup semantics used by Trie APIs.', es: 'some/startsWith refleja la semántica de búsqueda por prefijo usada por APIs de Trie.' }
        }
    }
};

const DS_INITIAL_STATE = {
    array: [4, 9, 2, 7],
    stack: [3, 6, 9],
    queue: [5, 8, 11],
    heap: [2, 5, 7, 9],
    graph: {
        nodes: ['A', 'B', 'C', 'D'],
        edges: [
            { from: 'A', to: 'B' },
            { from: 'A', to: 'C' },
            { from: 'B', to: 'D' }
        ]
    },
    trie: ['tree', 'trie', 'trial']
};

const dsState = JSON.parse(JSON.stringify(DS_INITIAL_STATE));
const dsTimeline = {
    array: ['Playground initialized.'],
    stack: ['Playground initialized.'],
    queue: ['Playground initialized.'],
    heap: ['Playground initialized.'],
    graph: ['Playground initialized.'],
    trie: ['Playground initialized.']
};
const dsLastOperation = {
    array: 'insert',
    stack: 'push',
    queue: 'enqueue',
    heap: 'insert',
    graph: 'addEdge',
    trie: 'search'
};

let interviewPage = 1;
let activePromptId = null;
let notesLibraryFilter = 'all';
let booksLibrary = [];
let notesSaveTimer = null;
let studyPlanDraft = null;
let dsActive = 'array';
let dsCodeLanguage = 'java';
let dsControlsBound = false;
let dsGraphCyInstance = null;
let dsVisNetworkInstance = null;
let playgroundState = {
    language: 'java',
    snippetId: '',
    baseCode: '',
    isCustom: false
};
const accountAuthState = {
    mode: 'login',
    inFlight: false,
    isAuthenticated: false,
    sessionLabel: ''
};
let userStateSyncTimer = null;
let userStateSyncInFlight = false;
let applyingRemoteUserState = false;
let neonCsrfToken = '';
const LOCAL_EXAMPLE_AUTH = {
    username: 'example',
    password: 'example',
    userId: 'example-local'
};

function getDefaultAccountProfile() {
    return {
        username: '',
        name: '',
        email: '',
        goal: 'exploring',
        serverUserId: '',
        lastSyncAt: null,
        lastSyncStatus: 'idle',
        lastSyncMessage: 'Sync idle.'
    };
}

function loadAccountProfile() {
    const defaults = getDefaultAccountProfile();
    const stored = safeGetItem(STORAGE_KEYS.ACCOUNT);
    if (!stored) {
        return { ...defaults };
    }
    try {
        const parsed = JSON.parse(stored);
        const legacyName = parsed.name || '';
        const username = parsed.username || legacyName || '';
        return {
            ...defaults,
            username,
            name: legacyName || username,
            email: parsed.email || '',
            goal: parsed.goal || 'exploring',
            serverUserId: parsed.serverUserId || parsed.neonSessionUserId || parsed.neonUserId || '',
            lastSyncAt: parsed.lastSyncAt || null,
            lastSyncStatus: parsed.lastSyncStatus || defaults.lastSyncStatus,
            lastSyncMessage: parsed.lastSyncMessage || defaults.lastSyncMessage
        };
    } catch (error) {
        return { ...defaults };
    }
}

function saveAccountProfile() {
    safeSetItem(STORAGE_KEYS.ACCOUNT, JSON.stringify(accountProfile));
}

function updateAccountChip() {
    const chip = document.getElementById('account-chip');
    if (!chip) return;
    const label = accountProfile.username || accountProfile.name || accountProfile.email;
    if (label) {
        chip.textContent = `👋 ${label}`;
        chip.classList.remove('hidden');
    } else {
        chip.textContent = '';
        chip.classList.add('hidden');
    }
}

function hasAuthenticatedInsightsAccess() {
    return Boolean(accountAuthState.isAuthenticated);
}

function updateInsightsAccessGate() {
    const insightsSection = document.getElementById('insights-section');
    const lockCard = document.getElementById('insights-auth-lock');
    if (!insightsSection || !lockCard) {
        return hasAuthenticatedInsightsAccess();
    }
    const unlocked = hasAuthenticatedInsightsAccess();
    insightsSection.classList.toggle('insights-locked', !unlocked);
    lockCard.classList.toggle('hidden', unlocked);
    return unlocked;
}

function handleInsightsAccessStateChange() {
    const unlocked = updateInsightsAccessGate();
    if (!unlocked && studyTimer?.isActive) {
        endStudySession({ notify: false });
    }
    if (typeof renderInsights === 'function') {
        renderInsights();
    } else if (typeof updateStudyTrackerUI === 'function') {
        updateStudyTrackerUI();
    }
}

function setAccountSyncUI(statusText, metaText, tone = 'neutral') {
    const statusEl = document.getElementById('account-sync-status');
    const metaEl = document.getElementById('account-sync-meta');
    if (statusEl) {
        statusEl.textContent = statusText;
        statusEl.className = 'text-xs font-semibold px-2.5 py-1 rounded-full border';
        const toneClassMap = {
            success: 'bg-emerald-500/20 border-emerald-300/40 text-emerald-100',
            error: 'bg-rose-500/20 border-rose-300/40 text-rose-100',
            info: 'bg-sky-500/20 border-sky-300/40 text-sky-100',
            neutral: 'bg-slate-800 border-white/10 text-slate-200'
        };
        statusEl.classList.add(...(toneClassMap[tone] || toneClassMap.neutral).split(' '));
    }
    if (metaEl) {
        metaEl.textContent = metaText;
    }
}

function setAccountSyncState(status, message) {
    accountProfile.lastSyncStatus = status;
    accountProfile.lastSyncMessage = message;
    accountProfile.lastSyncAt = new Date().toISOString();
    saveAccountProfile();
    const tone = status === 'connected' || status === 'synced'
        ? 'success'
        : status === 'error'
            ? 'error'
            : status === 'connecting'
                ? 'info'
                : 'neutral';
    setAccountSyncUI(status, message, tone);
}

function setCsrfToken(token) {
    neonCsrfToken = String(token || '').trim();
    const head = document.head || document.querySelector('head');
    if (!head) return;
    let meta = document.querySelector('meta[name="csrf-token"]');
    if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', 'csrf-token');
        head.appendChild(meta);
    }
    meta.setAttribute('content', neonCsrfToken);
}

function getCsrfToken() {
    if (neonCsrfToken) return neonCsrfToken;
    const meta = document.querySelector('meta[name="csrf-token"]');
    const token = String(meta ? meta.getAttribute('content') : '').trim();
    neonCsrfToken = token;
    return token;
}

function setAccountAuthStatus(message, tone = 'neutral') {
    const statusEl = document.getElementById('account-auth-status');
    if (!statusEl) return;
    statusEl.className = 'text-xs';
    const toneClassMap = {
        success: 'text-emerald-300',
        error: 'text-rose-300',
        info: 'text-sky-300',
        neutral: 'text-slate-300'
    };
    statusEl.classList.add(...(toneClassMap[tone] || toneClassMap.neutral).split(' '));
    statusEl.textContent = message;
}

function getAccountPrimaryAuthLabel() {
    if (accountAuthState.mode === 'signup') {
        return 'Create Account';
    }
    return accountAuthState.isAuthenticated ? 'Log Out' : 'Log In';
}

function refreshAccountPrimaryAuthButton() {
    const submitBtn = document.getElementById('account-auth-submit');
    if (!submitBtn) return;
    submitBtn.textContent = getAccountPrimaryAuthLabel();
}

function isLocalExampleCredentials(email, password) {
    return String(email || '').trim().toLowerCase() === LOCAL_EXAMPLE_AUTH.username
        && String(password || '') === LOCAL_EXAMPLE_AUTH.password;
}

function isLocalExampleSession() {
    return String(accountProfile.serverUserId || '').trim() === LOCAL_EXAMPLE_AUTH.userId
        && String(accountProfile.email || '').trim().toLowerCase() === LOCAL_EXAMPLE_AUTH.username;
}

function isNetworkAuthFailure(error) {
    const message = String(error instanceof Error ? error.message : error || '').toLowerCase();
    return message.includes('failed to fetch')
        || message.includes('load failed')
        || message.includes('networkerror')
        || message.includes('network request failed');
}

function applyLocalExampleAuth() {
    setCsrfToken('');
    accountAuthState.isAuthenticated = true;
    accountAuthState.sessionLabel = LOCAL_EXAMPLE_AUTH.username;
    accountProfile.email = LOCAL_EXAMPLE_AUTH.username;
    accountProfile.username = LOCAL_EXAMPLE_AUTH.username;
    accountProfile.name = LOCAL_EXAMPLE_AUTH.username;
    accountProfile.serverUserId = LOCAL_EXAMPLE_AUTH.userId;
    saveAccountProfile();
    applyAccountProfileToForm();
    updateAccountChip();
    clearAuthPasswordFields();
    setAccountAuthStatus(`Authenticated as ${LOCAL_EXAMPLE_AUTH.username}`, 'success');
    refreshAccountPrimaryAuthButton();
    handleInsightsAccessStateChange();
}

function setAccountAuthMode(mode) {
    const nextMode = mode === 'signup' ? 'signup' : 'login';
    accountAuthState.mode = nextMode;

    const loginTab = document.getElementById('account-auth-login-tab');
    const signupTab = document.getElementById('account-auth-signup-tab');
    const signupUsernameGroup = document.getElementById('account-auth-username-group');
    const confirmGroup = document.getElementById('account-auth-confirm-group');
    const submitBtn = document.getElementById('account-auth-submit');
    const passwordInput = document.getElementById('account-auth-password');
    const confirmInput = document.getElementById('account-auth-confirm');
    const signupUsernameInput = document.getElementById('account-auth-username');

    const isSignup = nextMode === 'signup';

    if (loginTab) {
        loginTab.className = `px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 ${isSignup ? 'bg-transparent text-slate-300 hover:text-white' : 'bg-violet-500 text-white'}`;
    }
    if (signupTab) {
        signupTab.className = `px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 ${isSignup ? 'bg-violet-500 text-white' : 'bg-transparent text-slate-300 hover:text-white'}`;
    }

    if (confirmGroup) {
        confirmGroup.classList.toggle('hidden', !isSignup);
    }
    if (signupUsernameGroup) {
        signupUsernameGroup.classList.toggle('hidden', !isSignup);
    }
    if (submitBtn) refreshAccountPrimaryAuthButton();
    if (passwordInput) {
        passwordInput.setAttribute('autocomplete', isSignup ? 'new-password' : 'current-password');
    }
    if (signupUsernameInput) {
        signupUsernameInput.required = isSignup;
        if (isSignup && !signupUsernameInput.value.trim() && accountProfile.username) {
            signupUsernameInput.value = accountProfile.username;
        }
    }
    if (confirmInput && !isSignup) {
        confirmInput.value = '';
    }
}

function clearAuthPasswordFields() {
    const passwordInput = document.getElementById('account-auth-password');
    const confirmInput = document.getElementById('account-auth-confirm');
    if (passwordInput) passwordInput.value = '';
    if (confirmInput) confirmInput.value = '';
}

function setAuthSubmitBusy(isBusy) {
    accountAuthState.inFlight = Boolean(isBusy);
    const submitBtn = document.getElementById('account-auth-submit');
    if (!submitBtn) return;
    submitBtn.disabled = accountAuthState.inFlight;
    submitBtn.classList.toggle('opacity-70', accountAuthState.inFlight);
    submitBtn.classList.toggle('cursor-not-allowed', accountAuthState.inFlight);
    if (accountAuthState.inFlight) {
        if (accountAuthState.mode === 'signup') {
            submitBtn.textContent = 'Creating Account...';
        } else {
            submitBtn.textContent = accountAuthState.isAuthenticated ? 'Logging Out...' : 'Logging In...';
        }
    } else {
        refreshAccountPrimaryAuthButton();
    }
}

function readAccountAuthForm() {
    const emailInput = document.getElementById('account-auth-email');
    const passwordInput = document.getElementById('account-auth-password');
    const confirmInput = document.getElementById('account-auth-confirm');
    const usernameInput = document.getElementById('account-auth-username');
    return {
        email: emailInput ? emailInput.value.trim() : '',
        username: usernameInput ? usernameInput.value.trim() : '',
        password: passwordInput ? passwordInput.value : '',
        confirm: confirmInput ? confirmInput.value : ''
    };
}

function buildApiEndpoint(path) {
    const base = getConfiguredApiBaseUrl();
    return `${base}${path}`;
}

function normalizeApiBaseUrl(rawUrl) {
    return String(rawUrl || '').trim().replace(/\/+$/, '');
}

function isSecureApiBaseUrl(rawUrl) {
    const base = normalizeApiBaseUrl(rawUrl);
    if (!base) return true;
    try {
        const parsed = new URL(base);
        if (parsed.protocol === 'https:') return true;
        return parsed.protocol === 'http:' && ['localhost', '127.0.0.1'].includes(parsed.hostname);
    } catch (error) {
        return false;
    }
}

function getConfiguredApiBaseUrl() {
    const appConfigBase = (typeof window !== 'undefined' && window.__APP_CONFIG?.apiBaseUrl)
        || (typeof window !== 'undefined' && window.__APP_CONFIG?.neonApiBaseUrl)
        || (typeof window !== 'undefined' && window.APP_CONFIG?.apiBaseUrl)
        || (typeof window !== 'undefined' && window.APP_CONFIG?.neonApiBaseUrl)
        || (typeof window !== 'undefined' && window.NEON_API_BASE_URL)
        || '';
    return normalizeApiBaseUrl(PROFILE_SYNC_CONFIG.baseUrl || appConfigBase || '');
}

function getSessionUserFromPayload(payload) {
    const user = payload?.user
        || payload?.data?.user
        || payload?.session?.user
        || payload?.data?.session?.user
        || null;
    const userId = String(
        user?.id
        || user?.user_id
        || payload?.userId
        || payload?.data?.userId
        || ''
    ).trim();
    const userEmail = String(
        user?.email
        || payload?.email
        || payload?.data?.email
        || ''
    ).trim();
    const userUsername = String(
        user?.username
        || user?.name
        || payload?.username
        || payload?.data?.username
        || ''
    ).trim();
    return { userId, userEmail, userUsername };
}

function getNeonProfileEndpoint() {
    return buildApiEndpoint(NEON_API_PATHS.profile);
}

function getNeonUserStateEndpoint() {
    return buildApiEndpoint(NEON_API_PATHS.userState);
}

function getNeonSupportEndpoint() {
    return buildApiEndpoint(NEON_API_PATHS.support);
}

function getNeonSessionEndpoint() {
    return buildApiEndpoint(NEON_API_PATHS.session);
}

function hasNeonSyncConfig() {
    return PROFILE_SYNC_CONFIG.enabled
        && isSecureApiBaseUrl(getConfiguredApiBaseUrl());
}

async function neonFetch(url, options = {}) {
    const method = String(options.method || 'GET').toUpperCase();
    const headers = {
        'X-Requested-With': 'XMLHttpRequest',
        ...(options.headers || {})
    };
    if (!headers['Content-Type'] && !(options.body instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
    }
    if (!['GET', 'HEAD', 'OPTIONS'].includes(method)) {
        const csrfToken = getCsrfToken();
        if (csrfToken && !headers['X-CSRF-Token']) {
            headers['X-CSRF-Token'] = csrfToken;
        }
    }
    const response = await fetch(url, {
        ...options,
        method,
        credentials: 'include',
        headers
    });
    const rawText = await response.text();
    let payload = null;
    try {
        payload = rawText ? JSON.parse(rawText) : null;
    } catch (error) {
        payload = rawText;
    }
    if (!response.ok) {
        const detail = typeof payload === 'string'
            ? payload
            : payload?.error || payload?.message || `HTTP ${response.status}`;
        throw new Error(detail);
    }
    return payload;
}

function applyAccountProfileToForm() {
    const usernameInput = document.getElementById('account-username');
    const emailInput = document.getElementById('account-email');
    const goalInput = document.getElementById('account-goal');
    const authEmailInput = document.getElementById('account-auth-email');
    const authUsernameInput = document.getElementById('account-auth-username');

    if (usernameInput) usernameInput.value = accountProfile.username || accountProfile.name || '';
    if (emailInput) emailInput.value = accountProfile.email || '';
    if (goalInput) goalInput.value = accountProfile.goal || 'exploring';
    if (authEmailInput) authEmailInput.value = accountProfile.email || '';
    if (authUsernameInput) authUsernameInput.value = accountProfile.username || accountProfile.name || '';
}

function readAccountProfileFromForm() {
    const usernameInput = document.getElementById('account-username');
    const emailInput = document.getElementById('account-email');
    const goalInput = document.getElementById('account-goal');
    const resolvedUsername = usernameInput
        ? usernameInput.value.trim()
        : (accountProfile.username || accountProfile.name || '');
    return {
        ...accountProfile,
        username: resolvedUsername,
        name: resolvedUsername,
        email: emailInput ? emailInput.value.trim() : accountProfile.email || '',
        goal: goalInput ? goalInput.value : accountProfile.goal || 'exploring'
    };
}

async function checkNeonSession(options = {}) {
    const { silent = false } = options;
    if (isLocalExampleSession()) {
        setCsrfToken('');
        accountAuthState.isAuthenticated = true;
        accountAuthState.sessionLabel = LOCAL_EXAMPLE_AUTH.username;
        setAccountAuthStatus(`Authenticated as ${LOCAL_EXAMPLE_AUTH.username}`, 'success');
        refreshAccountPrimaryAuthButton();
        handleInsightsAccessStateChange();
        return { userId: LOCAL_EXAMPLE_AUTH.userId, userLabel: LOCAL_EXAMPLE_AUTH.username };
    }
    if (!hasNeonSyncConfig()) {
        setCsrfToken('');
        accountAuthState.isAuthenticated = false;
        accountAuthState.sessionLabel = '';
        setAccountAuthStatus('Auth server not configured.', 'neutral');
        refreshAccountPrimaryAuthButton();
        handleInsightsAccessStateChange();
        return null;
    }
    const url = getNeonSessionEndpoint();
    try {
        const sessionPayload = await neonFetch(url, { method: 'GET' });
        const sessionCsrfToken = String(
            sessionPayload?.csrfToken
            || sessionPayload?.session?.csrfToken
            || sessionPayload?.data?.csrfToken
            || ''
        ).trim();
        if (sessionCsrfToken) {
            setCsrfToken(sessionCsrfToken);
        }
        const { userId, userEmail, userUsername } = getSessionUserFromPayload(sessionPayload);
        if (userId) {
            accountProfile.serverUserId = userId;
        }
        if (userUsername) {
            accountProfile.username = userUsername;
            accountProfile.name = userUsername;
        }
        if (userEmail) {
            accountProfile.email = userEmail;
        }
        saveAccountProfile();
        applyAccountProfileToForm();
        updateAccountChip();
        const userLabel = userUsername || userEmail || userId || accountProfile.serverUserId;
        const message = userLabel
            ? `Session active for ${userLabel}`
            : 'Session endpoint reachable.';
        accountAuthState.isAuthenticated = Boolean(userId || userEmail);
        accountAuthState.sessionLabel = userLabel;
        setAccountAuthStatus(
            accountAuthState.isAuthenticated ? `Authenticated as ${userLabel}` : 'Session detected. Sign in to continue.',
            accountAuthState.isAuthenticated ? 'success' : 'info'
        );
        refreshAccountPrimaryAuthButton();
        setAccountSyncState('connected', message);
        handleInsightsAccessStateChange();
        return { userId: userId || accountProfile.serverUserId, userLabel };
    } catch (error) {
        setCsrfToken('');
        accountAuthState.isAuthenticated = false;
        accountAuthState.sessionLabel = '';
        setAccountAuthStatus(`Not authenticated: ${error.message}`, 'error');
        refreshAccountPrimaryAuthButton();
        setAccountSyncState('error', `Session check failed: ${error.message}`);
        if (!silent) {
            showToast(`Session check failed: ${error.message}`, 'error');
        }
        handleInsightsAccessStateChange();
        return null;
    }
}

async function signOutAccountFlow(options = {}) {
    const { silent = false } = options;
    if (userStateSyncTimer) {
        clearTimeout(userStateSyncTimer);
        userStateSyncTimer = null;
    }
    userStateSyncInFlight = false;
    await logoutAccountSession();
    setCsrfToken('');
    accountAuthState.isAuthenticated = false;
    accountAuthState.sessionLabel = '';
    setAccountAuthStatus('Signed out.', 'neutral');
    clearAuthPasswordFields();
    accountProfile = {
        ...getDefaultAccountProfile()
    };
    saveAccountProfile();
    applyAccountProfileToForm();
    updateAccountChip();
    refreshAccountPrimaryAuthButton();
    handleInsightsAccessStateChange();
    if (!silent) {
        showToast('Signed out successfully.', 'success');
    }
}

async function submitAccountAuth() {
    if (accountAuthState.inFlight) return;
    const isSignup = accountAuthState.mode === 'signup';
    if (!isSignup && accountAuthState.isAuthenticated) {
        setAuthSubmitBusy(true);
        try {
            await signOutAccountFlow();
        } finally {
            setAuthSubmitBusy(false);
        }
        return;
    }

    const { email, username, password, confirm } = readAccountAuthForm();
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || /^[a-zA-Z0-9._-]{3,}$/.test(email);
    if (!emailValid) {
        setAccountAuthStatus('Enter a valid email or username.', 'error');
        showToast('Enter a valid email or username.', 'warning');
        return;
    }
    if (!password) {
        setAccountAuthStatus('Enter your password.', 'error');
        showToast('Enter your password.', 'warning');
        return;
    }
    if (isSignup && password.length < 8) {
        setAccountAuthStatus('Password must be at least 8 characters.', 'error');
        showToast('Password must be at least 8 characters.', 'warning');
        return;
    }
    if (isSignup) {
        const usernameValid = /^[a-zA-Z0-9._-]{3,}$/.test(username);
        if (!usernameValid) {
            setAccountAuthStatus('Username must be at least 3 characters (letters, numbers, . _ -).', 'error');
            showToast('Enter a valid username for sign up.', 'warning');
            return;
        }
    }
    if (isSignup && password !== confirm) {
        setAccountAuthStatus('Passwords do not match.', 'error');
        showToast('Passwords do not match.', 'warning');
        return;
    }

    if (!hasNeonSyncConfig()) {
        if (!isSignup && isLocalExampleCredentials(email, password)) {
            applyLocalExampleAuth();
            showToast('Signed in successfully.', 'success');
            return;
        }
        setAccountAuthStatus('Auth server is not available.', 'error');
        showToast('Auth server is not available.', 'warning');
        return;
    }

    const endpoint = buildApiEndpoint(isSignup ? NEON_API_PATHS.signup : NEON_API_PATHS.login);
    const payload = { email, password };
    if (isSignup) {
        payload.username = username;
        payload.confirmPassword = confirm;
    }

    setAuthSubmitBusy(true);
    setAccountAuthStatus(isSignup ? 'Creating account...' : 'Logging in...', 'info');
    try {
        const authPayload = await neonFetch(endpoint, {
            method: 'POST',
            body: JSON.stringify(payload)
        });
        const authCsrfToken = String(authPayload?.csrfToken || authPayload?.session?.csrfToken || '').trim();
        if (authCsrfToken) {
            setCsrfToken(authCsrfToken);
        }
        clearAuthPasswordFields();
        accountProfile.email = email;
        if (isSignup) {
            accountProfile.username = username;
            accountProfile.name = username;
        }
        saveAccountProfile();
        applyAccountProfileToForm();
        const session = await checkNeonSession({ silent: true });
        if (session?.userId && PROFILE_SYNC_CONFIG.enabled) {
            await pullProfileFromNeon({ silent: true });
            if (PROFILE_SYNC_CONFIG.autoPullUserStateOnSession) {
                await pullUserStateFromNeon({ silent: true });
            }
        }
        const successText = isSignup ? 'Account created and signed in successfully.' : 'Signed in successfully.';
        setAccountAuthStatus(successText, 'success');
        showToast(successText, 'success');
        updateAccountChip();
        refreshAccountPrimaryAuthButton();
        if (isSignup) {
            setAccountAuthMode('login');
        }
    } catch (error) {
        if (!isSignup && isLocalExampleCredentials(email, password) && isNetworkAuthFailure(error)) {
            applyLocalExampleAuth();
            showToast('Signed in successfully.', 'success');
            return;
        }
        const reason = error instanceof Error ? error.message : String(error);
        setAccountAuthStatus(`Auth failed: ${reason}`, 'error');
        showToast(`Authentication failed: ${reason}`, 'error');
    } finally {
        setAuthSubmitBusy(false);
    }
}

async function logoutAccountSession() {
    if (!hasNeonSyncConfig()) return;
    try {
        await neonFetch(buildApiEndpoint(NEON_API_PATHS.logout), { method: 'POST' });
    } catch (error) {
        // Keep local sign-out resilient even if backend logout is temporarily unavailable.
    }
}

async function pushProfileToNeon(options = {}) {
    const { silent = false } = options;
    if (!hasNeonSyncConfig()) {
        return false;
    }
    const url = getNeonProfileEndpoint();
    let userId = String(accountProfile.serverUserId || '').trim();
    if (!userId) {
        const session = await checkNeonSession({ silent: true });
        userId = String(session?.userId || accountProfile.serverUserId || '').trim();
    }
    if (!userId) {
        if (!silent) {
            showToast('No authenticated user session found for profile sync.', 'warning');
        }
        return false;
    }
    try {
        await neonFetch(url, {
            method: 'POST',
            body: JSON.stringify({
                userId,
                profile: {
                    username: accountProfile.username || accountProfile.name,
                    name: accountProfile.username || accountProfile.name,
                    email: accountProfile.email,
                    goal: accountProfile.goal
                }
            })
        });
        setAccountSyncState('synced', `Profile synced at ${new Date().toLocaleString()}`);
        if (!silent) {
            showToast('Profile synced to backend.', 'success');
        }
        return true;
    } catch (error) {
        setAccountSyncState('error', `Push failed: ${error.message}`);
        if (!silent) {
            showToast(`Failed to sync profile: ${error.message}`, 'error');
        }
        return false;
    }
}

async function pullProfileFromNeon(options = {}) {
    const { silent = false } = options;
    if (!hasNeonSyncConfig()) {
        return false;
    }
    const baseUrl = getNeonProfileEndpoint();
    let userId = String(accountProfile.serverUserId || '').trim();
    if (!userId) {
        const session = await checkNeonSession({ silent: true });
        userId = String(session?.userId || accountProfile.serverUserId || '').trim();
    }
    if (!userId) {
        return false;
    }
    const url = `${baseUrl}?userId=${encodeURIComponent(userId)}`;
    try {
        const payload = await neonFetch(url, { method: 'GET' });
        const remoteProfile = payload?.profile || payload?.data?.profile || payload?.data || payload;
        if (remoteProfile && typeof remoteProfile === 'object') {
            const remoteUsername = String(remoteProfile.username || remoteProfile.name || accountProfile.username || accountProfile.name || '').trim();
            accountProfile.username = remoteUsername;
            accountProfile.name = remoteUsername;
            accountProfile.email = String(remoteProfile.email || accountProfile.email || '');
            accountProfile.goal = String(remoteProfile.goal || accountProfile.goal || 'exploring');
            saveAccountProfile();
            applyAccountProfileToForm();
            updateAccountChip();
        }
        setAccountSyncState('synced', `Profile pulled at ${new Date().toLocaleString()}`);
        if (!silent) {
            showToast('Profile pulled from backend.', 'success');
        }
        return true;
    } catch (error) {
        setAccountSyncState('error', `Pull failed: ${error.message}`);
        if (!silent) {
            showToast(`Failed to pull profile: ${error.message}`, 'error');
        }
        return false;
    }
}

async function pullUserStateFromNeon(options = {}) {
    const { silent = false } = options;
    if (!hasNeonSyncConfig() || !PROFILE_SYNC_CONFIG.autoPullUserStateOnSession) {
        return false;
    }
    let userId = String(accountProfile.serverUserId || '').trim();
    if (!userId) {
        const session = await checkNeonSession({ silent: true });
        userId = String(session?.userId || accountProfile.serverUserId || '').trim();
    }
    if (!userId) return false;

    const url = `${getNeonUserStateEndpoint()}?userId=${encodeURIComponent(userId)}`;
    try {
        const payload = await neonFetch(url, { method: 'GET' });
        const remoteState = payload?.state || payload?.data?.state || payload?.data || payload;
        if (!remoteState || typeof remoteState !== 'object') {
            return false;
        }
        const applied = applyRemoteUserStateSnapshot(remoteState, { persistLocal: true });
        if (applied && !silent) {
            showToast('Learning state pulled from backend.', 'success');
        }
        return applied;
    } catch (error) {
        if (!silent) {
            showToast(`Failed to pull learning state: ${error.message}`, 'warning');
        }
        return false;
    }
}

async function pushUserStateToNeon(options = {}) {
    const { silent = false } = options;
    if (!hasNeonSyncConfig() || !PROFILE_SYNC_CONFIG.autoPushUserState) {
        return false;
    }
    if (userStateSyncInFlight) return false;
    let userId = String(accountProfile.serverUserId || '').trim();
    if (!userId) {
        const session = await checkNeonSession({ silent: true });
        userId = String(session?.userId || accountProfile.serverUserId || '').trim();
    }
    if (!userId) return false;

    userStateSyncInFlight = true;
    try {
        await neonFetch(getNeonUserStateEndpoint(), {
            method: 'PUT',
            body: JSON.stringify({
                userId,
                state: buildSerializableUserState()
            })
        });
        return true;
    } catch (error) {
        if (!silent) {
            showToast(`Failed to sync learning state: ${error.message}`, 'warning');
        }
        return false;
    } finally {
        userStateSyncInFlight = false;
    }
}

function openAccountModal() {
    const modal = document.getElementById('account-modal');
    if (!modal) return;
    applyAccountProfileToForm();
    setAccountAuthMode(accountAuthState.mode);
    clearAuthPasswordFields();
    setAccountAuthStatus('Checking session...', 'info');
    openModal('account-modal');
    if (PROFILE_SYNC_CONFIG.enabled) {
        checkNeonSession({ silent: true }).then((session) => {
            if (!session?.userId) return;
            if (PROFILE_SYNC_CONFIG.autoPullOnOpen) {
                pullProfileFromNeon({ silent: true });
            }
            if (PROFILE_SYNC_CONFIG.autoPullUserStateOnSession) {
                pullUserStateFromNeon({ silent: true });
            }
        });
    }
}

function closeAccountModal() {
    closeModal('account-modal');
}

function initAccount() {
    updateAccountChip();
    const closeBtn = document.getElementById('close-account');
    const saveBtn = document.getElementById('save-account');
    const authLoginTab = document.getElementById('account-auth-login-tab');
    const authSignupTab = document.getElementById('account-auth-signup-tab');
    const authSubmitBtn = document.getElementById('account-auth-submit');
    const authEmailInput = document.getElementById('account-auth-email');
    const authUsernameInput = document.getElementById('account-auth-username');
    const authPasswordInput = document.getElementById('account-auth-password');
    const authConfirmInput = document.getElementById('account-auth-confirm');

    if (closeBtn) closeBtn.addEventListener('click', closeAccountModal);
    if (authLoginTab) {
        authLoginTab.addEventListener('click', () => setAccountAuthMode('login'));
    }
    if (authSignupTab) {
        authSignupTab.addEventListener('click', () => setAccountAuthMode('signup'));
    }
    if (authSubmitBtn) {
        authSubmitBtn.addEventListener('click', async () => {
            if (authEmailInput && !authEmailInput.value.trim() && accountProfile.email) {
                authEmailInput.value = accountProfile.email;
            }
            if (authUsernameInput && !authUsernameInput.value.trim() && (accountProfile.username || accountProfile.name)) {
                authUsernameInput.value = accountProfile.username || accountProfile.name;
            }
            await submitAccountAuth();
        });
    }
    const enterToSubmit = async (event) => {
        if (event.key !== 'Enter') return;
        event.preventDefault();
        await submitAccountAuth();
    };
    if (authEmailInput) authEmailInput.addEventListener('keydown', enterToSubmit);
    if (authUsernameInput) authUsernameInput.addEventListener('keydown', enterToSubmit);
    if (authPasswordInput) authPasswordInput.addEventListener('keydown', enterToSubmit);
    if (authConfirmInput) authConfirmInput.addEventListener('keydown', enterToSubmit);

    if (saveBtn) {
        saveBtn.addEventListener('click', async () => {
            accountProfile = readAccountProfileFromForm();
            saveAccountProfile();
            updateAccountChip();
            let synced = false;
            if (PROFILE_SYNC_CONFIG.enabled && PROFILE_SYNC_CONFIG.autoPushOnSave) {
                synced = await pushProfileToNeon({ silent: true });
            }
            if (synced) {
                showToast('Profile saved and synced successfully.', 'success');
            } else {
                showToast('Profile saved successfully.', 'success');
            }
            queueUserStateSync();
        });
    }
    setAccountAuthMode('login');
    if (isLocalExampleSession()) {
        accountAuthState.isAuthenticated = true;
        accountAuthState.sessionLabel = LOCAL_EXAMPLE_AUTH.username;
        setAccountAuthStatus(`Authenticated as ${LOCAL_EXAMPLE_AUTH.username}`, 'success');
    } else {
        accountAuthState.isAuthenticated = false;
        accountAuthState.sessionLabel = '';
        setAccountAuthStatus('Not authenticated.', 'neutral');
    }
    refreshAccountPrimaryAuthButton();
    handleInsightsAccessStateChange();

    if (hasNeonSyncConfig()) {
        checkNeonSession({ silent: true }).then((session) => {
            if (!session?.userId) return;
            pullProfileFromNeon({ silent: true });
            if (PROFILE_SYNC_CONFIG.autoPullUserStateOnSession) {
                pullUserStateFromNeon({ silent: true });
            }
        });
    }
}

function loadNotesDraft() {
    return safeGetItem(STORAGE_KEYS.NOTES) || '';
}

function saveNotesDraft(value) {
    safeSetItem(STORAGE_KEYS.NOTES, value || '');
    queueUserStateSync();
}

function downloadTextFile(filename, text) {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

function initNotes() {
    const notesInput = document.getElementById('notes-input');
    const saveBtn = document.getElementById('save-notes');
    const downloadBtn = document.getElementById('download-notes');
    if (!notesInput) return;
    notesInput.value = notesDraft || '';

    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            notesDraft = notesInput.value;
            saveNotesDraft(notesDraft);
            showToast('Notes saved!', 'success');
        });
    }
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            const content = notesInput.value.trim();
            if (!content) {
                showToast('Write a few notes first!', 'warning');
                return;
            }
            downloadTextFile('cs-course-atlas-notes.txt', content);
        });
    }
    notesInput.addEventListener('input', () => {
        notesDraft = notesInput.value;
        if (notesSaveTimer) clearTimeout(notesSaveTimer);
        notesSaveTimer = setTimeout(() => {
            saveNotesDraft(notesDraft);
        }, 500);
    });
}

function loadStudyPlan() {
    const stored = safeGetItem(STORAGE_KEYS.STUDY_PLAN);
    if (!stored) {
        return { pace: null, focus: null, style: null, notes: '' };
    }
    try {
        const parsed = JSON.parse(stored);
        return {
            pace: parsed.pace || null,
            focus: parsed.focus || null,
            style: parsed.style || null,
            notes: parsed.notes || ''
        };
    } catch (error) {
        return { pace: null, focus: null, style: null, notes: '' };
    }
}

function saveStudyPlan() {
    safeSetItem(STORAGE_KEYS.STUDY_PLAN, JSON.stringify(studyPlanState));
    queueUserStateSync();
}

function getStudyPlanSummary() {
    const paceMap = {
        light: { label: 'Light pace', weeklyGoal: 3 },
        balanced: { label: 'Balanced pace', weeklyGoal: 5 },
        intense: { label: 'Intense pace', weeklyGoal: 8 }
    };
    const focusMap = {
        foundations: 'Foundations',
        interview: 'Interview prep',
        projects: 'Projects'
    };
    const styleMap = {
        visual: 'Visual walkthroughs',
        practice: 'Practice heavy',
        blended: 'Blended'
    };

    if (!studyPlanState?.pace || !studyPlanState?.focus || !studyPlanState?.style) {
        return {
            status: 'inactive',
            label: translateLiteral('Not configured', appState.language),
            pill: translateLiteral('Set up', appState.language),
            note: translateLiteral('Answer 3 quick questions to personalize pacing.', appState.language)
        };
    }

    const paceLabel = paceMap[studyPlanState.pace]?.label || 'Custom pace';
    const focusLabel = focusMap[studyPlanState.focus] || 'Custom focus';
    const styleLabel = styleMap[studyPlanState.style] || 'Custom style';

    return {
        status: 'active',
        label: translateLiteral(paceLabel, appState.language),
        pill: translateLiteral('Active', appState.language),
        note: translateLiteral(`Focus: ${focusLabel} · Style: ${styleLabel}`, appState.language)
    };
}

function applyStudyPlanSelection(plan) {
    const groups = document.querySelectorAll('.plan-option-group');
    groups.forEach(group => {
        const groupKey = group.dataset.planGroup;
        const selected = plan ? plan[groupKey] : null;
        Array.from(group.querySelectorAll('.plan-option')).forEach(option => {
            option.classList.toggle('active', option.dataset.planValue === selected);
        });
    });
    const notesInput = document.getElementById('study-plan-notes');
    if (notesInput) notesInput.value = plan?.notes || '';
}

function openStudyPlanModal() {
    if (!hasAuthenticatedInsightsAccess()) {
        showToast('Sign in to unlock personalized study insights.', 'info');
        openAccountModal();
        return;
    }
    studyPlanDraft = { ...studyPlanState };
    applyStudyPlanSelection(studyPlanDraft);
    openModal('study-plan-modal');
}

function closeStudyPlanModal() {
    closeModal('study-plan-modal');
    studyPlanDraft = null;
}

function initStudyPlan() {
    const openBtn = document.getElementById('insight-plan-cta');
    const closeBtn = document.getElementById('close-study-plan');
    const saveBtn = document.getElementById('save-study-plan');
    const groups = document.querySelectorAll('.plan-option-group');

    if (openBtn) {
        openBtn.addEventListener('click', openStudyPlanModal);
    }
    if (closeBtn) {
        closeBtn.addEventListener('click', closeStudyPlanModal);
    }
    if (groups.length > 0) {
        groups.forEach(group => {
            group.addEventListener('click', (event) => {
                const button = event.target.closest('.plan-option');
                if (!button) return;
                const groupKey = group.dataset.planGroup;
                if (!groupKey) return;
                if (!studyPlanDraft) studyPlanDraft = { ...studyPlanState };
                studyPlanDraft[groupKey] = button.dataset.planValue || null;
                applyStudyPlanSelection(studyPlanDraft);
            });
        });
    }
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            const notesInput = document.getElementById('study-plan-notes');
            if (!studyPlanDraft) studyPlanDraft = { ...studyPlanState };
            studyPlanDraft.notes = notesInput ? notesInput.value.trim() : '';
            studyPlanState = { ...studyPlanDraft };
            saveStudyPlan();

            const paceGoalMap = { light: 3, balanced: 5, intense: 8 };
            if (studyPlanState.pace && paceGoalMap[studyPlanState.pace]) {
                appState.weeklyGoal = paceGoalMap[studyPlanState.pace];
                saveToLocalStorage();
            }

            renderInsights();
            closeStudyPlanModal();
            showToast('Study plan saved!', 'success');
        });
    }

    renderInsights();
}

function initNotesLibrary() {
    const categoriesEl = document.getElementById('notes-library-categories');
    const listEl = document.getElementById('notes-library-list');
    if (!categoriesEl || !listEl) return;

    categoriesEl.addEventListener('click', (event) => {
        const chip = event.target.closest('button');
        if (!chip) return;
        const category = chip.dataset.category || 'all';
        if (category === notesLibraryFilter) return;
        notesLibraryFilter = category;
        renderNotesLibrary();
    });

    listEl.addEventListener('click', (event) => {
        const target = event.target.closest('button');
        if (!target) return;
        const noteId = target.dataset.noteId;
        if (!noteId) return;
        if (target.dataset.action === 'download') {
            openNotesDownloadModal(noteId);
        } else if (target.dataset.action === 'preview') {
            const note = getLocalizedNotesLibrary().find(item => item.id === noteId);
            if (note?.downloadUrl) {
                window.open(note.downloadUrl, '_blank');
            } else {
                showToast('Preview coming soon!', 'info');
            }
        }
    });

    renderNotesLibrary();
}

function renderNotesLibrary() {
    const categoriesEl = document.getElementById('notes-library-categories');
    const listEl = document.getElementById('notes-library-list');
    if (!categoriesEl || !listEl) return;
    const localizedNotes = getLocalizedNotesLibrary();

    const categories = ['all', ...new Set(localizedNotes.map(item => item.categoryKey || item.category))];
    categoriesEl.innerHTML = categories.map(category => {
        const label = category === 'all'
            ? translateLiteral('All Topics', appState.language)
            : (localizedNotes.find(item => (item.categoryKey || item.category) === category)?.categoryLabel || category);
        const isActive = notesLibraryFilter === category;
        return `<button type="button" class="notes-chip ${isActive ? 'active' : ''}" data-category="${escapeHtml(category)}">${escapeHtml(label)}</button>`;
    }).join('');

    const items = localizedNotes.filter(item => notesLibraryFilter === 'all' || (item.categoryKey || item.category) === notesLibraryFilter);
    listEl.innerHTML = items.map(item => `
        <div class="notes-card">
            <div class="flex items-start justify-between gap-2">
                <h4>${escapeHtml(item.title)}</h4>
                <span class="notes-chip">${escapeHtml(item.level)}</span>
            </div>
            <p>${escapeHtml(item.description)}</p>
            <div class="text-xs text-slate-500">${translateLiteral('Category:', appState.language)} ${escapeHtml(item.categoryLabel || item.category)} • ${item.pages} ${translateLiteral('pages', appState.language)}</div>
            <div class="notes-actions mt-2">
                <button type="button" class="notes-download" data-action="download" data-note-id="${escapeHtml(item.id)}">${translateLiteral('Download', appState.language)}</button>
                <button type="button" class="notes-view" data-action="preview" data-note-id="${escapeHtml(item.id)}">${translateLiteral('Preview', appState.language)}</button>
            </div>
        </div>
    `).join('');
}

function getBookReadUrl(bookId) {
    return `/api/books/${encodeURIComponent(bookId)}/read`;
}

function getBookDownloadUrl(bookId) {
    return `/api/books/${encodeURIComponent(bookId)}/download`;
}

async function loadBooksLibrary() {
    try {
        const response = await fetch('/api/books', {
            method: 'GET',
            credentials: 'same-origin',
            cache: 'no-store'
        });
        if (!response.ok) {
            throw new Error(`Books API responded with ${response.status}`);
        }
        const payload = await response.json();
        booksLibrary = Array.isArray(payload?.books) ? payload.books : [];
    } catch (error) {
        console.error('Failed to load books library:', error);
        booksLibrary = [];
    }
    renderBooksLibrary();
}

function renderBooksLibrary() {
    const listEl = document.getElementById('books-library-list');
    if (!listEl) return;

    if (!booksLibrary.length) {
        listEl.innerHTML = `<div class="books-empty-note">${escapeHtml(t('books.empty'))}</div>`;
        return;
    }

    listEl.innerHTML = booksLibrary.map((book) => {
        const available = Boolean(book?.available);
        const statusLabel = available ? t('books.available') : t('books.missing');
        const statusClass = available ? 'books-status-available' : 'books-status-missing';
        const pageCount = Number(book?.pages);
        const metadata = [
            book?.subject || '',
            book?.edition || '',
            Number.isFinite(pageCount) && pageCount > 0 ? `${pageCount} ${translateLiteral('pages', appState.language)}` : ''
        ].filter(Boolean).join(' • ');

        const downloadAttrs = available
            ? `href="${escapeHtml(getBookDownloadUrl(book.id))}" target="_blank" rel="noopener noreferrer"`
            : 'href="#" aria-disabled="true" tabindex="-1"';

        return `
            <div class="notes-card">
                <div class="flex items-start justify-between gap-2">
                    <h4>${escapeHtml(book?.title || 'Book')}</h4>
                    <span class="books-status-pill ${statusClass}">${escapeHtml(statusLabel)}</span>
                </div>
                ${book?.author ? `<p class="books-author">${escapeHtml(book.author)}</p>` : ''}
                ${book?.description ? `<p>${escapeHtml(book.description)}</p>` : ''}
                ${metadata ? `<div class="text-xs text-slate-500">${escapeHtml(metadata)}</div>` : ''}
                <div class="notes-actions mt-2">
                    <button type="button" class="notes-view" data-book-action="read" data-book-id="${escapeHtml(String(book.id || ''))}" ${available ? '' : 'disabled'}>
                        ${escapeHtml(t('books.read'))}
                    </button>
                    <a class="notes-download ${available ? '' : 'is-disabled'}" data-book-action="download" data-book-id="${escapeHtml(String(book.id || ''))}" ${downloadAttrs}>
                        ${escapeHtml(t('books.download'))}
                    </a>
                </div>
            </div>
        `;
    }).join('');
}

function openBookReader(bookId) {
    const book = booksLibrary.find((item) => item.id === bookId);
    if (!book || !book.available) {
        showToast(t('books.unavailable'), 'warning');
        return;
    }

    const modal = document.getElementById('book-reader-modal');
    const titleEl = document.getElementById('book-reader-title');
    const metaEl = document.getElementById('book-reader-meta');
    const frameEl = document.getElementById('book-reader-frame');
    const downloadEl = document.getElementById('book-reader-download');

    if (!modal || !frameEl) return;

    if (titleEl) titleEl.textContent = book.title || 'Book';
    if (metaEl) {
        const pageCount = Number(book?.pages);
        const detailLine = [
            book?.author || '',
            book?.edition || '',
            Number.isFinite(pageCount) && pageCount > 0 ? `${pageCount} ${translateLiteral('pages', appState.language)}` : ''
        ].filter(Boolean).join(' • ');
        metaEl.textContent = detailLine;
    }
    if (downloadEl) {
        downloadEl.href = getBookDownloadUrl(book.id);
    }
    frameEl.src = getBookReadUrl(book.id);
    modal.classList.remove('hidden');
}

function closeBookReaderModal() {
    const modal = document.getElementById('book-reader-modal');
    const frameEl = document.getElementById('book-reader-frame');
    if (!modal) return;
    modal.classList.add('hidden');
    if (frameEl) frameEl.src = 'about:blank';
}

function initBooksLibrary() {
    const listEl = document.getElementById('books-library-list');
    if (!listEl) return;

    listEl.addEventListener('click', (event) => {
        const actionNode = event.target.closest('[data-book-action]');
        if (!actionNode) return;
        const action = actionNode.dataset.bookAction;
        const bookId = actionNode.dataset.bookId;
        if (!bookId) return;

        if (action === 'read') {
            event.preventDefault();
            openBookReader(bookId);
            return;
        }

        if (action === 'download') {
            const book = booksLibrary.find((item) => item.id === bookId);
            if (!book?.available) {
                event.preventDefault();
                showToast(t('books.unavailable'), 'warning');
            }
        }
    });

    loadBooksLibrary();
}

window.closeBookReaderModal = closeBookReaderModal;

function openNotesDownloadModal(noteId) {
    const modal = document.getElementById('notes-download-modal');
    const titleEl = document.getElementById('notes-download-title');
    const metaEl = document.getElementById('notes-download-meta');
    const donateLink = document.getElementById('notes-donate-link');
    const note = getLocalizedNotesLibrary().find(item => item.id === noteId);
    if (!modal || !note) return;

    if (titleEl) titleEl.textContent = note.title;
    if (metaEl) metaEl.textContent = `${note.categoryLabel || note.category} • ${note.pages} ${translateLiteral('pages', appState.language)} • ${note.level}`;
    if (donateLink) {
        donateLink.href = generatePayPalUrl(1, `${note.title} PDF`);
        donateLink.dataset.downloadUrl = note.downloadUrl || '';
        donateLink.onclick = () => {
            if (note.downloadUrl) {
                setTimeout(() => window.open(note.downloadUrl, '_blank'), 600);
            }
        };
    }
    modal.classList.remove('hidden');
}

function closeNotesDownloadModal() {
    const modal = document.getElementById('notes-download-modal');
    if (!modal) return;
    modal.classList.add('hidden');
}

function getInterviewRunSample(exampleId) {
    const sample = INTERVIEW_RUN_SAMPLES[exampleId];
    if (sample) return sample;
    return null;
}

function getInterviewRunStateRecord(exampleId) {
    return interviewRunState.get(exampleId) || {
        status: 'idle',
        source: t('interview.outputReady'),
        text: t('interview.outputPlaceholder')
    };
}

function getInterviewOutputToneClass(status) {
    if (status === 'success') return 'success';
    if (status === 'fallback') return 'fallback';
    if (status === 'error') return 'error';
    return 'idle';
}

function setInterviewRunState(exampleId, nextState) {
    const previous = getInterviewRunStateRecord(exampleId);
    interviewRunState.set(exampleId, { ...previous, ...nextState });
}

function renderPromptWorkspaceOutput(exampleId) {
    const outputMetaEl = document.getElementById('prompt-workspace-output-meta');
    const outputEl = document.getElementById('prompt-workspace-output');
    if (!outputMetaEl || !outputEl || !exampleId) return;
    const state = getInterviewRunStateRecord(exampleId);
    outputMetaEl.textContent = `${t('interview.outputLabel')}: ${state.source || t('interview.outputReady')}`;
    outputEl.textContent = state.text || t('interview.outputPlaceholder');
    outputEl.classList.remove('success', 'fallback', 'error');
    const toneClass = getInterviewOutputToneClass(state.status);
    if (toneClass !== 'idle') outputEl.classList.add(toneClass);
}

async function runInterviewExample(exampleId) {
    if (!exampleId || interviewRunInFlight.has(exampleId)) return;
    const sample = getInterviewRunSample(exampleId);
    if (!sample) {
        setInterviewRunState(exampleId, {
            status: 'error',
            source: t('interview.outputError'),
            text: 'No runnable sample configured for this example yet.'
        });
        renderInterviewExamples();
        if (activePromptId === exampleId) renderPromptWorkspaceOutput(exampleId);
        return;
    }

    interviewRunInFlight.add(exampleId);
    setInterviewRunState(exampleId, {
        status: 'running',
        source: t('interview.running'),
        text: t('interview.running')
    });
    renderInterviewExamples();
    if (activePromptId === exampleId) renderPromptWorkspaceOutput(exampleId);

    try {
        const languageKey = sample.language || 'java';
        const normalizedCode = normalizeCodeForRunner(languageKey, sample.code || '');
        const outputText = await runWithTimeout(executeWithConfiguredRunner(languageKey, normalizedCode), 20000);
        const trimmed = String(outputText || '').trim();
        if (trimmed && trimmed !== 'Execution complete (no stdout).') {
            setInterviewRunState(exampleId, {
                status: 'success',
                source: t('interview.outputLive'),
                text: trimmed
            });
        } else {
            setInterviewRunState(exampleId, {
                status: 'fallback',
                source: t('interview.outputFallback'),
                text: sample.expectedOutput || 'Execution completed.'
            });
        }
    } catch (error) {
        const reason = error instanceof Error ? error.message : String(error);
        const fallbackText = sample.expectedOutput
            ? `${sample.expectedOutput}\n\n// Live runner unavailable: ${reason}`
            : `// Execution failed.\n// ${reason}`;
        setInterviewRunState(exampleId, {
            status: sample.expectedOutput ? 'fallback' : 'error',
            source: sample.expectedOutput ? t('interview.outputFallback') : t('interview.outputError'),
            text: fallbackText
        });
    } finally {
        interviewRunInFlight.delete(exampleId);
        renderInterviewExamples();
        if (activePromptId === exampleId) renderPromptWorkspaceOutput(exampleId);
    }
}

function initInterviewExamples() {
    const grid = document.getElementById('interview-examples-grid');
    const pagination = document.getElementById('interview-pagination');
    if (!grid || !pagination) return;

    pagination.addEventListener('click', (event) => {
        const button = event.target.closest('button');
        if (!button) return;
        const page = Number(button.dataset.page);
        if (!Number.isNaN(page)) {
            interviewPage = page;
            renderInterviewExamples();
        }
    });

    const submitBtn = document.getElementById('prompt-workspace-submit');
    if (submitBtn) {
        submitBtn.addEventListener('click', () => {
            const input = document.getElementById('prompt-workspace-input');
            const notesEl = document.getElementById('prompt-workspace-notes');
            if (!input || !notesEl) return;
            const content = input.value.trim();
            if (!content) {
                notesEl.textContent = translateLiteral('Add your solution draft before comparing.', appState.language);
                return;
            }
            notesEl.textContent = translateLiteral('Nice work! Compare your draft with the reference solution and note any gaps.', appState.language);
        });
    }

    const runWorkspaceBtn = document.getElementById('prompt-workspace-run');
    if (runWorkspaceBtn) {
        runWorkspaceBtn.addEventListener('click', async () => {
            if (!activePromptId) return;
            await runInterviewExample(activePromptId);
        });
    }

    renderInterviewExamples();
}

function renderInterviewExamples() {
    const grid = document.getElementById('interview-examples-grid');
    const pagination = document.getElementById('interview-pagination');
    if (!grid || !pagination) return;
    const localizedExamples = getLocalizedInterviewExamples();

    const totalPages = Math.max(1, Math.ceil(localizedExamples.length / INTERVIEW_PAGE_SIZE));
    if (interviewPage > totalPages) interviewPage = totalPages;

    const start = (interviewPage - 1) * INTERVIEW_PAGE_SIZE;
    const currentItems = localizedExamples.slice(start, start + INTERVIEW_PAGE_SIZE);

    grid.innerHTML = currentItems.map(example => {
        const runState = getInterviewRunStateRecord(example.id);
        const running = runState.status === 'running';
        const outputToneClass = getInterviewOutputToneClass(runState.status);
        return `
        <article class="interview-card-ux rounded-xl border p-4 sm:p-5 flex flex-col gap-3">
            <div class="flex items-start justify-between gap-2">
                <div class="min-w-0">
                    <h4 class="font-semibold text-indigo-600 text-base sm:text-lg leading-tight">${escapeHtml(example.title)}</h4>
                    <p class="interview-preview text-xs text-slate-400 mt-1">${escapeHtml(example.prompt)}</p>
                </div>
                <span class="interview-time-chip text-[11px] px-2.5 py-1 rounded-full font-semibold whitespace-nowrap">${example.minutes} ${translateLiteral('min', appState.language)}</span>
            </div>
            <p class="text-sm text-slate-200 leading-relaxed">${escapeHtml(example.prompt)}</p>
            <div class="interview-meta-chips">
                <span class="interview-meta-chip">${escapeHtml(example.difficulty)}</span>
                ${example.tags.map((tag) => `<span class="interview-meta-chip">${escapeHtml(tag)}</span>`).join('')}
            </div>
            <div class="interview-action-row mt-1">
                <button type="button" class="notes-download interview-cta-primary" onclick="openPromptWorkspace('${example.id}')">${translateLiteral('Open Prompt', appState.language)}</button>
                <button type="button" class="notes-view interview-cta-secondary" onclick="copyInterviewSolution('${example.id}')">${translateLiteral('Copy Solution', appState.language)}</button>
                <button type="button" class="notes-view interview-cta-run ${running ? 'is-running' : ''}" onclick="runInterviewExample('${example.id}')" ${running ? 'disabled' : ''}>${running ? t('interview.running') : t('interview.runSolution')}</button>
            </div>
            <div class="interview-output-shell">
                <div class="interview-output-meta">${t('interview.outputLabel')}: ${escapeHtml(runState.source || t('interview.outputReady'))}</div>
                <pre class="interview-output-pre ${outputToneClass}">${escapeHtml(runState.text || t('interview.outputPlaceholder'))}</pre>
            </div>
        </article>
        `;
    }).join('');

    pagination.innerHTML = Array.from({ length: totalPages }, (_, index) => {
        const page = index + 1;
        const active = page === interviewPage ? 'active' : '';
        return `<button type="button" class="interview-page ${active}" data-page="${page}">${page}</button>`;
    }).join('');
}

function openPromptWorkspace(exampleId) {
    const modal = document.getElementById('prompt-workspace-modal');
    const example = getLocalizedInterviewExamples().find(item => item.id === exampleId);
    if (!modal || !example) return;

    activePromptId = exampleId;
    const titleEl = document.getElementById('prompt-workspace-title');
    const metaEl = document.getElementById('prompt-workspace-meta');
    const promptEl = document.getElementById('prompt-workspace-prompt');
    const solutionEl = document.getElementById('prompt-workspace-solution');
    const langEl = document.getElementById('prompt-workspace-language');
    const notesEl = document.getElementById('prompt-workspace-notes');
    const inputEl = document.getElementById('prompt-workspace-input');
    const runBtn = document.getElementById('prompt-workspace-run');

    if (titleEl) titleEl.textContent = example.title;
    if (metaEl) metaEl.textContent = `${example.difficulty} • ${example.minutes} min • ${example.tags.join(', ')}`;
    if (promptEl) promptEl.textContent = example.prompt;
    if (solutionEl) solutionEl.textContent = translateCodeHumanText(example.solution);
    if (langEl) langEl.textContent = example.language || 'Java';
    if (notesEl) notesEl.textContent = example.notes || '';
    if (inputEl) inputEl.value = '';
    if (runBtn) runBtn.textContent = t('interview.runInWorkspace');
    renderPromptWorkspaceOutput(exampleId);

    modal.classList.remove('hidden');
}

function closePromptWorkspace() {
    const modal = document.getElementById('prompt-workspace-modal');
    if (!modal) return;
    modal.classList.add('hidden');
    activePromptId = null;
}

function copyInterviewSolution(exampleId) {
    const example = getLocalizedInterviewExamples().find(item => item.id === exampleId);
    if (!example) return;
    navigator.clipboard.writeText(translateCodeHumanText(example.solution)).then(() => {
        showToast('Solution copied!', 'success');
    }).catch(() => {
        showToast('Unable to copy solution', 'error');
    });
}

function initDSPlayground() {
    const tabs = document.getElementById('ds-tabs');
    const controls = document.getElementById('ds-controls');
    const resetBtn = document.getElementById('ds-reset-all');
    const complexitySlider = document.getElementById('ds-complexity-n');
    const dsCodeSelect = document.getElementById('ds-code-language');
    if (!tabs || !controls) return;

    if (!dsControlsBound) {
        controls.addEventListener('click', (event) => {
            const action = event.target.closest('[data-action]')?.dataset.action;
            if (!action) return;
            handleDSAction(action);
        });
        dsControlsBound = true;
    }

    tabs.addEventListener('click', (event) => {
        const button = event.target.closest('button');
        if (!button) return;
        const next = button.dataset.ds;
        if (!next || !DS_PLAYGROUND_CONFIG[next]) return;
        dsActive = next;
        renderDSTabs();
        renderDSControls();
        updateDSView();
    });

    if (resetBtn) {
        resetBtn.addEventListener('click', resetDSPlaygroundState);
    }

    if (complexitySlider) {
        complexitySlider.addEventListener('input', updateDSComplexity);
    }

    if (dsCodeSelect) {
        dsCodeSelect.innerHTML = PLAYGROUND_RUNNABLE_LANGUAGES
            .map((lang) => `<option value="${lang}">${SUPPORTED_LANGUAGES[lang].icon} ${SUPPORTED_LANGUAGES[lang].name}</option>`)
            .join('');
        dsCodeSelect.value = dsCodeLanguage;
        dsCodeSelect.addEventListener('change', () => {
            dsCodeLanguage = dsCodeSelect.value;
            renderDSCodeAndExplanation();
        });
    }

    renderDSTabs();
    renderDSControls();
    updateDSView(translateLiteral('Playground ready.', appState.language));
}

function findMatchingBrace(source, openIndex) {
    if (openIndex < 0 || openIndex >= source.length || source[openIndex] !== '{') {
        return -1;
    }
    let depth = 0;
    for (let i = openIndex; i < source.length; i++) {
        const char = source[i];
        if (char === '{') depth += 1;
        if (char === '}') depth -= 1;
        if (depth === 0) return i;
    }
    return -1;
}

function hasJavaMainMethod(classBody) {
    return /\b(?:public\s+)?static\s+void\s+main\s*\(\s*String(?:\s*\[\s*\]|\.\.\.)\s+\w+\s*\)/.test(classBody);
}

function getJavaClassBlocks(source) {
    const blocks = [];
    const regex = /\bclass\s+([A-Za-z_]\w*)\b/g;
    let match;
    while ((match = regex.exec(source))) {
        const openIndex = source.indexOf('{', match.index);
        if (openIndex === -1) continue;
        const closeIndex = findMatchingBrace(source, openIndex);
        if (closeIndex === -1) continue;
        blocks.push({
            name: match[1],
            start: match.index,
            openIndex,
            closeIndex
        });
    }
    return blocks;
}

function indentCodeBlock(source, indent = '    ') {
    return String(source || '')
        .split('\n')
        .map((line) => (line ? `${indent}${line}` : line))
        .join('\n');
}

function hasJavaMethodDefinition(source) {
    return /\b(?:public|protected|private)?\s*(?:static\s+)?(?:final\s+)?(?:synchronized\s+)?(?:<[^>]+>\s*)?[\w[\]<>?,]+\s+[A-Za-z_]\w*\s*\([^;{}]*\)\s*\{/.test(source);
}

function splitJavaImports(source) {
    const lines = String(source || '').split('\n');
    const importLines = [];
    const bodyLines = [];
    let scanImports = true;
    lines.forEach((line) => {
        if (scanImports && /^\s*import\s+[\w.*]+\s*;\s*$/.test(line)) {
            importLines.push(line.trim());
            return;
        }
        if (scanImports && !line.trim()) {
            return;
        }
        scanImports = false;
        bodyLines.push(line);
    });
    return {
        imports: importLines.join('\n'),
        body: bodyLines.join('\n').trim()
    };
}

function getJavaMethodNames(source) {
    const names = [];
    const regex = /\b(?:public|protected|private)?\s*(?:static\s+)?(?:final\s+)?(?:synchronized\s+)?(?:<[^>]+>\s*)?[\w[\]<>?,]+\s+([A-Za-z_]\w*)\s*\([^;{}]*\)\s*\{/g;
    let match;
    while ((match = regex.exec(source))) {
        const name = match[1];
        if (name && name !== 'main') {
            names.push(name);
        }
    }
    return [...new Set(names)];
}

function buildJavaAutoMainBody(source, options = {}) {
    const { label = 'Sample' } = options;
    const classNames = getJavaClassBlocks(source).map(block => block.name);
    const methodNames = getJavaMethodNames(source).slice(0, 8);
    const lines = [
        `System.out.println("${label} ran with auto-generated main().");`
    ];
    if (classNames.length) {
        lines.push(`System.out.println("Classes detected: ${classNames.join(', ')}");`);
    }
    if (methodNames.length) {
        lines.push(`System.out.println("Methods detected: ${methodNames.join(', ')}");`);
    }
    return lines.join('\n');
}

function wrapJavaSnippetWithoutClass(source) {
    const { imports, body } = splitJavaImports(source);
    const importBlock = imports ? `${imports}\n\n` : '';
    const snippet = String(body || '').trim();
    if (!snippet) {
        return `${importBlock}class Main {\n    public static void main(String[] args) {\n        System.out.println("No Java code provided.");\n    }\n}\n`;
    }

    if (hasJavaMethodDefinition(snippet)) {
        const autoBody = buildJavaAutoMainBody(snippet, { label: 'Method snippet' });
        return `${importBlock}class Main {\n${indentCodeBlock(snippet)}\n\n    public static void main(String[] args) {\n${indentCodeBlock(autoBody, '        ')}\n    }\n}\n`;
    }

    return `${importBlock}class Main {\n    public static void main(String[] args) {\n${indentCodeBlock(snippet, '        ')}\n        System.out.println("Snippet executed.");\n    }\n}\n`;
}

function injectMainIntoClass(source, className, methodBody = '') {
    const blocks = getJavaClassBlocks(source);
    const target = blocks.find(block => block.name === className);
    if (!target) return source;
    const classBody = source.slice(target.openIndex, target.closeIndex + 1);
    if (hasJavaMainMethod(classBody)) return source;
    const body = String(methodBody || '').trim();
    const mainBody = body ? `\n${indentCodeBlock(body, '        ')}\n` : '\n';
    const insert = `\n    public static void main(String[] args) {${mainBody}    }\n`;
    return `${source.slice(0, target.closeIndex)}${insert}${source.slice(target.closeIndex)}`;
}

function prepareJavaSourceForRunner(code) {
    let source = String(code || '').replace(/\r\n/g, '\n');

    source = source.replace(/^\s*package\s+[\w.]+;\s*$/gm, '').trim();
    if (!source) {
        return 'class Main {\n    public static void main(String[] args) {\n        System.out.println("No Java code provided.");\n    }\n}\n';
    }
    source = source.replace(/\bpublic\s+class\s+(?!Main\b)([A-Za-z_]\w*)/g, 'class $1');

    const blocks = getJavaClassBlocks(source);
    if (!blocks.length) {
        return wrapJavaSnippetWithoutClass(source);
    }
    const mainClass = blocks.find((block) => {
        const body = source.slice(block.openIndex, block.closeIndex + 1);
        return hasJavaMainMethod(body);
    });
    const hasMainClass = Boolean(mainClass);
    const hasMainType = blocks.some(block => block.name === 'Main');

    if (hasMainClass) {
        if (mainClass.name === 'Main') {
            return source;
        }
        if (hasMainType) {
            return injectMainIntoClass(source, 'Main', `${mainClass.name}.main(args);`);
        }
        source += `\n\nclass Main {\n    public static void main(String[] args) {\n        ${mainClass.name}.main(args);\n        System.out.println("Program finished.");\n    }\n}\n`;
        return source;
    }

    if (hasMainType) {
        return injectMainIntoClass(source, 'Main', buildJavaAutoMainBody(source, { label: 'Class snippet' }));
    }

    const autoBody = buildJavaAutoMainBody(source, { label: 'Class snippet' });
    return `${source}\n\nclass Main {\n    public static void main(String[] args) {\n${indentCodeBlock(autoBody, '        ')}\n    }\n}\n`;
}

function normalizeCodeForRunner(language, code) {
    const source = String(code || '').replace(/\r\n/g, '\n');
    if (language === 'java') {
        return prepareJavaSourceForRunner(source);
    }
    return source;
}

async function runViaCustomEndpoint(langConfig, code) {
    const response = await fetch(CODE_RUNNER_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            language: langConfig.language,
            version: langConfig.version,
            files: [{ name: langConfig.filename, content: code }]
        })
    });
    if (!response.ok) {
        const text = await response.text();
        throw new Error(text || `Runner request failed (${response.status})`);
    }
    const result = await response.json();
    return result?.run?.output || result?.output || result?.stdout || 'Execution complete (no stdout).';
}

async function runViaJudge0(languageKey, code) {
    const languageId = JUDGE0_LANGUAGE_IDS[languageKey];
    if (!languageId) {
        throw new Error(`Unsupported Judge0 language: ${languageKey}`);
    }
    const response = await fetch(JUDGE0_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            source_code: code,
            language_id: languageId
        })
    });
    if (!response.ok) {
        const text = await response.text();
        throw new Error(text || `Judge0 request failed (${response.status})`);
    }
    const result = await response.json();
    const chunks = [
        result.compile_output,
        result.stderr,
        result.stdout,
        result.message
    ].filter(Boolean);
    if (chunks.length) return chunks.join('\n');
    if (result?.status?.id && Number(result.status.id) !== 3) {
        return result?.status?.description || 'Execution finished.';
    }
    return 'Execution complete (no stdout).';
}

async function runJavascriptLocally(code) {
    const wrapped = `'use strict';\n${code}`;
    const consoleLines = [];
    const capture = (...args) => {
        consoleLines.push(args.map((arg) => {
            if (typeof arg === 'string') return arg;
            try {
                return JSON.stringify(arg);
            } catch (error) {
                return String(arg);
            }
        }).join(' '));
    };

    const localConsole = {
        log: capture,
        info: capture,
        warn: capture,
        error: capture
    };

    const runner = new Function('console', wrapped);
    runner(localConsole);
    return consoleLines.join('\n') || 'Execution complete (no stdout).';
}

function initPlayground() {
    const languageSelect = document.getElementById('playground-language');
    const snippetSelect = document.getElementById('playground-snippets');
    const editor = document.getElementById('playground-editor');
    const runButton = document.getElementById('playground-run');
    const resetButton = document.getElementById('playground-reset');
    const clearOutputButton = document.getElementById('playground-clear-output');
    const copyButton = document.getElementById('playground-copy');
    const output = document.getElementById('playground-output');
    const outputMeta = document.getElementById('playground-output-meta');
    const status = document.getElementById('playground-status');

    if (!languageSelect || !snippetSelect || !editor || !output) return;

    const availableLanguages = PLAYGROUND_RUNNABLE_LANGUAGES
        .map((key) => ({ key, label: `${SUPPORTED_LANGUAGES[key].icon} ${SUPPORTED_LANGUAGES[key].name}` }));

    languageSelect.innerHTML = availableLanguages
        .map(lang => `<option value="${lang.key}">${lang.label}</option>`)
        .join('');

    const renderSnippetOptions = () => {
        const previous = snippetSelect.value || playgroundState.snippetId || '';
        const snippetOptions = getOrderedModules()
            .filter(module => module.codeExamples || module.codeExample)
            .map((module) => {
                const localizedModule = getLocalizedModule(module) || module;
                return { id: module.id, title: localizedModule.title || module.title };
            });
        snippetSelect.innerHTML = [
            `<option value="">${translateLiteral('Select a module sample', appState.language)}</option>`,
            ...snippetOptions.map(option => `<option value="${option.id}">${escapeHtml(option.title)}</option>`)
        ].join('');
        if (previous && snippetOptions.some((option) => option.id === previous)) {
            snippetSelect.value = previous;
        } else {
            snippetSelect.value = '';
        }
    };

    const preferredLanguage = PLAYGROUND_RUNNABLE_LANGUAGES.includes(playgroundState.language)
        ? playgroundState.language
        : 'java';
    languageSelect.value = preferredLanguage;
    playgroundState.language = languageSelect.value || 'java';

    const setStatus = (text, tone = 'idle') => {
        if (!status) return;
        status.textContent = text;
        status.dataset.state = String(tone || 'idle').toLowerCase();
    };

    const setOutput = (text, options = {}) => {
        const source = options.source || 'ready';
        const languageLabel = options.language || '';
        const tone = options.tone || 'ready';
        output.textContent = text;
        output.classList.remove('success', 'error', 'fallback');
        output.classList.add(tone);
        if (outputMeta) {
            const suffix = languageLabel ? ` • ${languageLabel}` : '';
            outputMeta.textContent = `Source: ${source}${suffix}`;
        }
    };

    const getPlaygroundCode = (moduleId, language) => {
        return getCanonicalModuleCode(moduleId, language);
    };

    const isGitWalkthroughModule = (moduleId) => {
        return Boolean(moduleId) && getModuleCategoryKey(moduleId) === 'git';
    };

    const applyEditorLockForModule = (moduleId) => {
        const isReadOnly = isGitWalkthroughModule(moduleId);
        editor.readOnly = isReadOnly;
        editor.classList.toggle('playground-editor-readonly', isReadOnly);
        editor.setAttribute('aria-readonly', isReadOnly ? 'true' : 'false');
    };

    const getFallbackOutputForSelection = (languageKey, moduleId = playgroundState.snippetId) => {
        if (!moduleId) {
            return {
                text: 'Execution complete.',
                source: 'Fallback',
                tone: 'fallback'
            };
        }
        const fallback = getCanonicalModuleOutput(moduleId, languageKey || playgroundState.language);
        return {
            text: fallback.text,
            source: 'Fallback (expected output)',
            tone: 'fallback'
        };
    };

    const updateEditor = (moduleId) => {
        if (!moduleId) {
            editor.value = '';
            playgroundState.baseCode = '';
            playgroundState.snippetId = '';
            playgroundState.isCustom = true;
            applyEditorLockForModule('');
            setOutput(translateLiteral('// Select a sample and run to see output.', appState.language), { source: translateLiteral('Ready', appState.language), tone: 'ready' });
            return;
        }
        const result = getPlaygroundCode(moduleId, playgroundState.language);
        if (result.language !== playgroundState.language) {
            playgroundState.language = result.language;
            languageSelect.value = result.language;
        }
        const code = appState.language === 'es' ? translateCodeHumanText(result.code || '') : (result.code || '');
        editor.value = code || '';
        playgroundState.baseCode = editor.value;
        playgroundState.snippetId = moduleId;
        playgroundState.isCustom = false;
        const isGitWalkthrough = isGitWalkthroughModule(moduleId);
        applyEditorLockForModule(moduleId);
        setStatus(isGitWalkthrough ? t('playground.gitReadOnly') : translateLiteral('Ready', appState.language), 'idle');
        setOutput(isGitWalkthrough
            ? `// ${t('playground.gitReadOnlyHint')}\n// ${translateLiteral('Click "Run Code" to execute.', appState.language)}`
            : translateLiteral('// Sample loaded. Click "Run Code" to execute.', appState.language), {
            source: translateLiteral('Sample Loaded', appState.language),
            language: SUPPORTED_LANGUAGES[playgroundState.language]?.name || playgroundState.language,
            tone: 'ready'
        });
    };

    window.refreshPlaygroundSnippetCatalog = () => {
        renderSnippetOptions();
        if (playgroundState.snippetId) {
            updateEditor(playgroundState.snippetId);
        }
    };
    window.syncPlaygroundWithModule = (moduleId) => {
        if (!moduleId || playgroundState.snippetId !== moduleId) return;
        updateEditor(moduleId);
    };

    const refreshSnippetForLanguage = () => {
        if (!playgroundState.snippetId) return;
        updateEditor(playgroundState.snippetId);
    };

    languageSelect.addEventListener('change', () => {
        playgroundState.language = languageSelect.value;
        refreshSnippetForLanguage();
    });

    snippetSelect.addEventListener('change', () => {
        updateEditor(snippetSelect.value);
    });

    editor.addEventListener('input', () => {
        playgroundState.isCustom = true;
    });

    if (resetButton) {
        resetButton.addEventListener('click', () => {
            if (playgroundState.baseCode) {
                editor.value = playgroundState.baseCode;
                playgroundState.isCustom = false;
                setStatus('Reset sample', 'idle');
            } else {
                editor.value = '';
            }
        });
    }

    if (clearOutputButton) {
        clearOutputButton.addEventListener('click', () => {
            setOutput(translateLiteral('// Output cleared.', appState.language), { source: translateLiteral('Ready', appState.language), tone: 'ready' });
            setStatus(translateLiteral('Idle', appState.language), 'idle');
        });
    }

    if (copyButton) {
        copyButton.addEventListener('click', () => {
            navigator.clipboard.writeText(output.textContent || '').then(() => {
                showToast('Output copied!', 'success');
            }).catch(() => {
                showToast('Unable to copy output', 'error');
            });
        });
    }

    if (runButton) {
        runButton.addEventListener('click', async () => {
            const code = editor.value.trim();
            if (!code) {
                setOutput(translateLiteral('// Add code before running.', appState.language), { source: translateLiteral('Validation', appState.language), tone: 'error' });
                return;
            }

            runButton.disabled = true;
            runButton.classList.add('opacity-80', 'cursor-not-allowed');
            setStatus(translateLiteral('Running...', appState.language), 'running');
            setOutput(translateLiteral('// Running...', appState.language), { source: translateLiteral('Live runner', appState.language), tone: 'ready' });

            const languageKey = playgroundState.language;
            if (!PLAYGROUND_RUNNABLE_LANGUAGES.includes(languageKey)) {
                setOutput([
                    translateLiteral('Execution skipped.', appState.language),
                    `Language "${languageKey}" is view-only in module cards.`,
                    translateLiteral('Playground execution currently supports: Java, C++, Python, and JavaScript.', appState.language)
                ].join('\n'), { source: translateLiteral('Unsupported language', appState.language), tone: 'error' });
                setStatus(translateLiteral('Idle', appState.language), 'idle');
                runButton.disabled = false;
                runButton.classList.remove('opacity-80', 'cursor-not-allowed');
                return;
            }
            const normalizedCode = normalizeCodeForRunner(languageKey, code);
            try {
                let outputText = await executeWithConfiguredRunner(languageKey, normalizedCode);
                const trimmedOutput = String(outputText || '').trim();
                if (!trimmedOutput || trimmedOutput === 'Execution complete (no stdout).') {
                    const fallback = getFallbackOutputForSelection(languageKey);
                    outputText = fallback.text;
                    setOutput(outputText, {
                        source: fallback.source,
                        language: SUPPORTED_LANGUAGES[languageKey]?.name || languageKey,
                        tone: fallback.tone
                    });
                    setStatus(translateLiteral('Fallback', appState.language), 'fallback');
                } else {
                    setOutput(outputText, {
                        source: translateLiteral('Live execution', appState.language),
                        language: SUPPORTED_LANGUAGES[languageKey]?.name || languageKey,
                        tone: 'success'
                    });
                    setStatus(translateLiteral('Complete', appState.language), 'success');
                }
            } catch (error) {
                const reason = error instanceof Error ? error.message : String(error);
                const fallback = getFallbackOutputForSelection(languageKey);
                if (playgroundState.snippetId) {
                    const fallbackText = `${fallback.text}\n\n// Live runner unavailable: ${reason}`;
                    setOutput(fallbackText, {
                        source: fallback.source,
                        language: SUPPORTED_LANGUAGES[languageKey]?.name || languageKey,
                        tone: 'fallback'
                    });
                    setStatus(translateLiteral('Fallback', appState.language), 'fallback');
                } else {
                    setOutput(`// Execution failed.\n// ${reason}`, { source: 'Live runner error', tone: 'error' });
                    setStatus(translateLiteral('Error', appState.language), 'error');
                }
            } finally {
                runButton.disabled = false;
                runButton.classList.remove('opacity-80', 'cursor-not-allowed');
            }
        });
    }

    renderSnippetOptions();
    if (!snippetSelect.value && snippetSelect.options.length > 1) {
        snippetSelect.value = snippetSelect.options[1].value;
    }
    if (snippetSelect.value) {
        updateEditor(snippetSelect.value);
    } else {
        setOutput(translateLiteral('// Select a sample and run to see output.', appState.language), { source: translateLiteral('Ready', appState.language), tone: 'ready' });
    }
    setStatus(translateLiteral('Idle', appState.language), 'idle');
}

function renderDSTabs() {
    const tabs = document.getElementById('ds-tabs');
    if (!tabs) return;
    tabs.innerHTML = Object.entries(DS_PLAYGROUND_CONFIG).map(([key, config]) => {
        const active = key === dsActive ? 'active' : '';
        return `<button type="button" class="notes-chip ds-tab-chip ${active}" data-ds="${key}">${escapeHtml(translateLiteral(config.label, appState.language))}</button>`;
    }).join('');
}

function renderDSControls() {
    const controls = document.getElementById('ds-controls');
    if (!controls) return;
    const config = DS_PLAYGROUND_CONFIG[dsActive];
    let html = '';

    switch (dsActive) {
        case 'array':
            html = `
                <div class="space-y-3 ds-control-card">
                    <div class="text-xs uppercase tracking-wide text-slate-400 font-semibold">${translateLiteral('Array Controls', appState.language)}</div>
                    <input id="ds-value-input" type="text" placeholder="${translateLiteral('Value', appState.language)}" class="w-full px-3 py-2 rounded-lg border border-white/10 bg-slate-800 text-slate-100 text-sm">
                    <input id="ds-index-input" type="number" placeholder="${translateLiteral('Index (optional)', appState.language)}" class="w-full px-3 py-2 rounded-lg border border-white/10 bg-slate-800 text-slate-100 text-sm">
                    <div class="flex flex-wrap gap-2">
                        <button data-action="append" class="notes-download">${translateLiteral('Append', appState.language)}</button>
                        <button data-action="insert" class="notes-view">${translateLiteral('Insert at Index', appState.language)}</button>
                        <button data-action="remove" class="notes-view">${translateLiteral('Remove Last', appState.language)}</button>
                        <button data-action="remove-index" class="notes-view">${translateLiteral('Remove at Index', appState.language)}</button>
                    </div>
                    <div class="text-xs text-slate-300">${escapeHtml(resolveLocalizedValue(config.hint, appState.language) || '')}</div>
                </div>
            `;
            break;
        case 'stack':
            html = `
                <div class="space-y-3 ds-control-card">
                    <div class="text-xs uppercase tracking-wide text-slate-400 font-semibold">${translateLiteral('Stack Controls', appState.language)}</div>
                    <input id="ds-value-input" type="text" placeholder="${translateLiteral('Value', appState.language)}" class="w-full px-3 py-2 rounded-lg border border-white/10 bg-slate-800 text-slate-100 text-sm">
                    <div class="flex flex-wrap gap-2">
                        <button data-action="push" class="notes-download">${translateLiteral('Push', appState.language)}</button>
                        <button data-action="pop" class="notes-view">${translateLiteral('Pop', appState.language)}</button>
                        <button data-action="peek" class="notes-view">${translateLiteral('Peek', appState.language)}</button>
                    </div>
                    <div class="text-xs text-slate-300">${escapeHtml(resolveLocalizedValue(config.hint, appState.language) || '')}</div>
                </div>
            `;
            break;
        case 'queue':
            html = `
                <div class="space-y-3 ds-control-card">
                    <div class="text-xs uppercase tracking-wide text-slate-400 font-semibold">${translateLiteral('Queue Controls', appState.language)}</div>
                    <input id="ds-value-input" type="text" placeholder="${translateLiteral('Value', appState.language)}" class="w-full px-3 py-2 rounded-lg border border-white/10 bg-slate-800 text-slate-100 text-sm">
                    <div class="flex flex-wrap gap-2">
                        <button data-action="enqueue" class="notes-download">${translateLiteral('Enqueue', appState.language)}</button>
                        <button data-action="dequeue" class="notes-view">${translateLiteral('Dequeue', appState.language)}</button>
                        <button data-action="peek" class="notes-view">${translateLiteral('Peek', appState.language)}</button>
                    </div>
                    <div class="text-xs text-slate-300">${escapeHtml(resolveLocalizedValue(config.hint, appState.language) || '')}</div>
                </div>
            `;
            break;
        case 'heap':
            html = `
                <div class="space-y-3 ds-control-card">
                    <div class="text-xs uppercase tracking-wide text-slate-400 font-semibold">${translateLiteral('Heap Controls', appState.language)}</div>
                    <input id="ds-value-input" type="number" placeholder="${translateLiteral('Numeric value', appState.language)}" class="w-full px-3 py-2 rounded-lg border border-white/10 bg-slate-800 text-slate-100 text-sm">
                    <div class="flex flex-wrap gap-2">
                        <button data-action="heap-insert" class="notes-download">${translateLiteral('Insert', appState.language)}</button>
                        <button data-action="heap-extract" class="notes-view">${translateLiteral('Extract Min', appState.language)}</button>
                        <button data-action="peek" class="notes-view">${translateLiteral('Peek', appState.language)}</button>
                    </div>
                    <div class="text-xs text-slate-300">${escapeHtml(resolveLocalizedValue(config.hint, appState.language) || '')}</div>
                </div>
            `;
            break;
        case 'graph':
            html = `
                <div class="space-y-3 ds-control-card">
                    <div class="text-xs uppercase tracking-wide text-slate-400 font-semibold">${translateLiteral('Graph Controls', appState.language)}</div>
                    <input id="ds-node-input" type="text" placeholder="${translateLiteral('Node label (ex: A)', appState.language)}" class="w-full px-3 py-2 rounded-lg border border-white/10 bg-slate-800 text-slate-100 text-sm">
                    <div class="grid grid-cols-2 gap-2">
                        <input id="ds-edge-from" type="text" placeholder="${translateLiteral('From', appState.language)}" class="w-full px-3 py-2 rounded-lg border border-white/10 bg-slate-800 text-slate-100 text-sm">
                        <input id="ds-edge-to" type="text" placeholder="${translateLiteral('To', appState.language)}" class="w-full px-3 py-2 rounded-lg border border-white/10 bg-slate-800 text-slate-100 text-sm">
                    </div>
                    <div class="flex flex-wrap gap-2">
                        <button data-action="graph-add-node" class="notes-download">${translateLiteral('Add Node', appState.language)}</button>
                        <button data-action="graph-add-edge" class="notes-view">${translateLiteral('Add Edge', appState.language)}</button>
                        <button data-action="graph-remove-node" class="notes-view">${translateLiteral('Remove Node', appState.language)}</button>
                    </div>
                    <div class="text-xs text-slate-300">${escapeHtml(resolveLocalizedValue(config.hint, appState.language) || '')}</div>
                </div>
            `;
            break;
        case 'trie':
            html = `
                <div class="space-y-3 ds-control-card">
                    <div class="text-xs uppercase tracking-wide text-slate-400 font-semibold">${translateLiteral('Trie Controls', appState.language)}</div>
                    <input id="ds-word-input" type="text" placeholder="${translateLiteral('Word', appState.language)}" class="w-full px-3 py-2 rounded-lg border border-white/10 bg-slate-800 text-slate-100 text-sm">
                    <div class="flex flex-wrap gap-2">
                        <button data-action="trie-insert" class="notes-download">${translateLiteral('Insert', appState.language)}</button>
                        <button data-action="trie-remove" class="notes-view">${translateLiteral('Remove', appState.language)}</button>
                        <button data-action="trie-search" class="notes-view">${translateLiteral('Search', appState.language)}</button>
                    </div>
                    <div class="text-xs text-slate-300">${escapeHtml(resolveLocalizedValue(config.hint, appState.language) || '')}</div>
                </div>
            `;
            break;
        default:
            html = '';
    }

    controls.innerHTML = html;
}

function buildDSStateJson() {
    if (dsActive === 'graph') {
        const adjacency = {};
        dsState.graph.nodes.forEach((node) => {
            adjacency[node] = [];
        });
        dsState.graph.edges.forEach((edge) => {
            if (adjacency[edge.from]) adjacency[edge.from].push(edge.to);
        });
        return JSON.stringify(adjacency, null, 2);
    }
    if (dsActive === 'trie') {
        return JSON.stringify({ words: dsState.trie }, null, 2);
    }
    return JSON.stringify(dsState[dsActive], null, 2);
}

function buildDSStructureVisual() {
    if (dsActive === 'array') {
        return `
            <div id="ds-d3-array-chart" class="ds-lib-canvas ds-d3-canvas"></div>
            <div class="text-xs text-slate-300">${translateLiteral('D3.js visualization: bar heights track array values.', appState.language)}</div>
        `;
    }
    if (dsActive === 'graph') {
        return `
            <div id="ds-cytoscape-graph" class="ds-lib-canvas ds-cytoscape-canvas"></div>
            <div class="text-xs text-slate-300">${translateLiteral('Cytoscape.js visualization: interactive graph node-edge layout.', appState.language)}</div>
        `;
    }
    if (dsActive === 'heap' || dsActive === 'trie') {
        return `
            <div id="ds-vis-network" class="ds-lib-canvas ds-vis-canvas"></div>
            <div class="text-xs text-slate-300">${translateLiteral('vis-network visualization: node/edge structure map.', appState.language)}</div>
        `;
    }
    if (dsActive === 'stack') {
        return `<div class="ds-visual ds-stack">${dsState.stack.map((value) => `<span class="ds-box">${escapeHtml(String(value))}</span>`).join('')}</div>`;
    }
    if (dsActive === 'queue') {
        return `<div class="ds-visual ds-queue">${dsState.queue.map((value) => `<span class="ds-box">${escapeHtml(String(value))}</span>`).join('')}</div>`;
    }
    return '';
}

function destroyDSVisualizationInstances() {
    if (dsGraphCyInstance) {
        try {
            dsGraphCyInstance.destroy();
        } catch (error) {
            console.warn('Unable to destroy Cytoscape instance:', error);
        }
        dsGraphCyInstance = null;
    }
    if (dsVisNetworkInstance) {
        try {
            dsVisNetworkInstance.destroy();
        } catch (error) {
            console.warn('Unable to destroy vis-network instance:', error);
        }
        dsVisNetworkInstance = null;
    }
}

function renderD3ArrayVisual(container) {
    if (!container) return;
    if (!window.d3 || typeof window.d3.select !== 'function') {
        container.innerHTML = `<div class="ds-visual ds-array">${dsState.array.map((value) => `<span class="ds-box">${escapeHtml(String(value))}</span>`).join('')}</div>`;
        return;
    }

    const data = dsState.array.map((value) => Number(value) || 0);
    if (!data.length) {
        container.innerHTML = `<span class="text-xs text-slate-400">${translateLiteral('No array values yet.', appState.language)}</span>`;
        return;
    }

    const d3 = window.d3;
    const width = Math.max(container.clientWidth, 220);
    const height = 190;
    const margin = { top: 12, right: 12, bottom: 24, left: 16 };

    container.innerHTML = '';
    const svg = d3.select(container)
        .append('svg')
        .attr('viewBox', `0 0 ${width} ${height}`)
        .attr('width', '100%')
        .attr('height', height)
        .attr('class', 'ds-d3-svg');

    const x = d3.scaleBand()
        .domain(data.map((_, index) => index))
        .range([margin.left, width - margin.right])
        .padding(0.18);
    const maxValue = Math.max(...data, 1);
    const y = d3.scaleLinear()
        .domain([0, maxValue])
        .range([height - margin.bottom, margin.top]);

    svg.append('g')
        .attr('transform', `translate(0, ${height - margin.bottom})`)
        .call(d3.axisBottom(x).tickFormat((index) => `i${index}`).tickSizeOuter(0))
        .selectAll('text')
        .attr('fill', '#cbd5e1')
        .attr('font-size', 10);

    const bars = svg.append('g')
        .selectAll('rect')
        .data(data, (_, index) => index)
        .join('rect')
        .attr('x', (_, index) => x(index))
        .attr('width', x.bandwidth())
        .attr('rx', 6)
        .attr('fill', 'url(#ds-array-gradient)')
        .attr('y', height - margin.bottom)
        .attr('height', 0);

    const defs = svg.append('defs');
    const gradient = defs.append('linearGradient')
        .attr('id', 'ds-array-gradient')
        .attr('x1', '0%')
        .attr('x2', '0%')
        .attr('y1', '0%')
        .attr('y2', '100%');
    gradient.append('stop').attr('offset', '0%').attr('stop-color', '#a78bfa');
    gradient.append('stop').attr('offset', '100%').attr('stop-color', '#6366f1');

    bars.transition()
        .duration(360)
        .attr('y', (value) => y(value))
        .attr('height', (value) => height - margin.bottom - y(value));

    svg.append('g')
        .selectAll('text')
        .data(data)
        .join('text')
        .attr('x', (_, index) => (x(index) || 0) + x.bandwidth() / 2)
        .attr('y', (value) => y(value) - 6)
        .attr('text-anchor', 'middle')
        .attr('font-size', 10)
        .attr('fill', '#e2e8f0')
        .text((value) => value);
}

function renderCytoscapeGraphVisual(container) {
    if (!container) return;
    if (!window.cytoscape || typeof window.cytoscape !== 'function') {
        const nodes = dsState.graph.nodes.map((node) => `<span class="ds-box">${escapeHtml(node)}</span>`).join('');
        const edges = dsState.graph.edges.map((edge) => `${edge.from} → ${edge.to}`).join(', ');
        container.innerHTML = `<div class="ds-visual ds-graph">${nodes || `<span class="text-xs text-slate-400">${translateLiteral('No nodes yet.', appState.language)}</span>`}</div>
            <div class="text-xs text-slate-300 mt-2">${escapeHtml(edges || translateLiteral('No edges yet.', appState.language))}</div>`;
        return;
    }

    const nodes = dsState.graph.nodes.map((node) => ({
        data: { id: String(node), label: String(node) }
    }));
    const edges = dsState.graph.edges.map((edge, index) => ({
        data: {
            id: `e${index}-${edge.from}-${edge.to}`,
            source: String(edge.from),
            target: String(edge.to)
        }
    }));
    if (!nodes.length) {
        container.innerHTML = `<span class="text-xs text-slate-400">${translateLiteral('No nodes yet.', appState.language)}</span>`;
        return;
    }

    dsGraphCyInstance = window.cytoscape({
        container,
        elements: [...nodes, ...edges],
        style: [
            {
                selector: 'node',
                style: {
                    'background-color': '#8b5cf6',
                    label: 'data(label)',
                    color: '#f8fafc',
                    'text-valign': 'center',
                    'text-halign': 'center',
                    'font-size': 11,
                    'font-weight': 700,
                    width: 34,
                    height: 34
                }
            },
            {
                selector: 'edge',
                style: {
                    width: 2,
                    'line-color': '#60a5fa',
                    'target-arrow-color': '#60a5fa',
                    'target-arrow-shape': 'triangle',
                    'curve-style': 'bezier'
                }
            }
        ],
        layout: {
            name: 'breadthfirst',
            directed: true,
            padding: 14,
            spacingFactor: 1.1,
            fit: true
        }
    });
}

function buildVisHierarchyNodesAndEdges() {
    if (dsActive === 'heap') {
        const nodes = dsState.heap.map((value, index) => ({
            id: index + 1,
            label: String(value),
            color: {
                background: '#6366f1',
                border: '#a78bfa',
                highlight: { background: '#8b5cf6', border: '#c4b5fd' }
            },
            font: { color: '#f8fafc', size: 14, face: 'monospace' }
        }));
        const edges = [];
        dsState.heap.forEach((_, index) => {
            const left = index * 2 + 1;
            const right = index * 2 + 2;
            if (left < dsState.heap.length) edges.push({ from: index + 1, to: left + 1 });
            if (right < dsState.heap.length) edges.push({ from: index + 1, to: right + 1 });
        });
        return { nodes, edges };
    }

    const root = { children: {}, terminal: false };
    (dsState.trie || []).forEach((word) => {
        let cursor = root;
        String(word).split('').forEach((char) => {
            if (!cursor.children[char]) {
                cursor.children[char] = { children: {}, terminal: false };
            }
            cursor = cursor.children[char];
        });
        cursor.terminal = true;
    });

    const nodes = [];
    const edges = [];
    let nextId = 1;

    const walk = (node, label = 'root', parentId = null) => {
        const id = nextId++;
        nodes.push({
            id,
            label,
            color: {
                background: node.terminal ? '#22c55e' : '#6366f1',
                border: node.terminal ? '#86efac' : '#a78bfa',
                highlight: { background: '#8b5cf6', border: '#c4b5fd' }
            },
            font: { color: '#f8fafc', size: 12, face: 'monospace' }
        });
        if (parentId !== null) edges.push({ from: parentId, to: id });
        Object.entries(node.children).forEach(([char, child]) => walk(child, char, id));
    };

    walk(root);
    return { nodes, edges };
}

function renderVisNetworkVisual(container) {
    if (!container) return;
    if (!window.vis || typeof window.vis.Network !== 'function') {
        const values = dsActive === 'heap' ? dsState.heap : dsState.trie;
        container.innerHTML = `<div class="ds-visual ds-array">${values.map((value) => `<span class="ds-box">${escapeHtml(String(value))}</span>`).join('')}</div>`;
        return;
    }
    const { nodes, edges } = buildVisHierarchyNodesAndEdges();
    if (!nodes.length) {
        container.innerHTML = `<span class="text-xs text-slate-400">${translateLiteral('No nodes yet.', appState.language)}</span>`;
        return;
    }

    const data = {
        nodes: new window.vis.DataSet(nodes),
        edges: new window.vis.DataSet(edges)
    };
    dsVisNetworkInstance = new window.vis.Network(container, data, {
        layout: {
            hierarchical: {
                enabled: true,
                direction: 'UD',
                levelSeparation: 54,
                nodeSpacing: 70
            }
        },
        physics: false,
        edges: {
            color: '#60a5fa',
            smooth: {
                enabled: true,
                type: 'cubicBezier',
                roundness: 0.35
            },
            width: 2
        },
        interaction: {
            dragNodes: true,
            dragView: true,
            zoomView: true
        }
    });
}

function renderDSLibraryVisuals() {
    destroyDSVisualizationInstances();
    const structureEl = document.getElementById('ds-structure-view');
    if (!structureEl) return;

    if (dsActive === 'array') {
        renderD3ArrayVisual(document.getElementById('ds-d3-array-chart'));
        return;
    }
    if (dsActive === 'graph') {
        renderCytoscapeGraphVisual(document.getElementById('ds-cytoscape-graph'));
        return;
    }
    if (dsActive === 'heap' || dsActive === 'trie') {
        renderVisNetworkVisual(document.getElementById('ds-vis-network'));
    }
}

function buildDSPointerVisual() {
    if (dsActive === 'array') {
        return dsState.array.map((value, index) => `<div class="ds-pointer-row"><span>index ${index}</span><strong>${escapeHtml(String(value))}</strong></div>`).join('');
    }
    if (dsActive === 'stack') {
        return `
            <div class="ds-pointer-row"><span>${translateLiteral('Top index', appState.language)}</span><strong>${dsState.stack.length ? dsState.stack.length - 1 : -1}</strong></div>
            <div class="ds-pointer-row"><span>${translateLiteral('Top value', appState.language)}</span><strong>${escapeHtml(String(dsState.stack[dsState.stack.length - 1] ?? '∅'))}</strong></div>
        `;
    }
    if (dsActive === 'queue') {
        return `
            <div class="ds-pointer-row"><span>${translateLiteral('Front', appState.language)}</span><strong>${escapeHtml(String(dsState.queue[0] ?? '∅'))}</strong></div>
            <div class="ds-pointer-row"><span>${translateLiteral('Rear', appState.language)}</span><strong>${escapeHtml(String(dsState.queue[dsState.queue.length - 1] ?? '∅'))}</strong></div>
        `;
    }
    if (dsActive === 'heap') {
        return dsState.heap.map((value, index) => {
            const parent = index === 0 ? '-' : Math.floor((index - 1) / 2);
            return `<div class="ds-pointer-row"><span>idx ${index} (p:${parent})</span><strong>${escapeHtml(String(value))}</strong></div>`;
        }).join('');
    }
    if (dsActive === 'graph') {
        const degreeMap = {};
        dsState.graph.nodes.forEach((node) => { degreeMap[node] = 0; });
        dsState.graph.edges.forEach((edge) => {
            degreeMap[edge.from] = (degreeMap[edge.from] || 0) + 1;
            degreeMap[edge.to] = (degreeMap[edge.to] || 0) + 1;
        });
        return Object.entries(degreeMap).map(([node, degree]) => `<div class="ds-pointer-row"><span>${escapeHtml(node)}</span><strong>${translateLiteral('degree', appState.language)} ${degree}</strong></div>`).join('');
    }
    if (dsActive === 'trie') {
        return dsState.trie.map((word) => `<div class="ds-pointer-row"><span>${escapeHtml(word)}</span><strong>${translateLiteral('length', appState.language)} ${word.length}</strong></div>`).join('');
    }
    return '';
}

function renderDSCodeAndExplanation() {
    const codeEl = document.getElementById('ds-code-viewer');
    const explanationEl = document.getElementById('ds-explanation-viewer');
    if (!codeEl || !explanationEl) return;
    const config = DS_PLAYGROUND_CONFIG[dsActive];
    const lang = PLAYGROUND_RUNNABLE_LANGUAGES.includes(dsCodeLanguage) ? dsCodeLanguage : 'java';
    const codeSource = config.codeExamples?.[lang] || config.codeExamples?.java || '';
    const explanationSource = config.codeExplanations?.[lang];
    const explanation = explanationSource?.[appState.language] || explanationSource?.en || '';

    codeEl.textContent = appState.language === 'es' ? translateCodeHumanText(codeSource) : codeSource;
    explanationEl.textContent = explanation || translateLiteral('Explanation unavailable for this language.', appState.language);
}

function getDSActiveOperation() {
    return dsLastOperation[dsActive] || DS_PLAYGROUND_CONFIG[dsActive].defaultOperation;
}

function updateDSView(statusMessage) {
    const config = DS_PLAYGROUND_CONFIG[dsActive];
    const structureEl = document.getElementById('ds-structure-view');
    const pointerEl = document.getElementById('ds-pointer-view');
    const timelineEl = document.getElementById('ds-timeline-view');
    const stateEl = document.getElementById('ds-state-json');
    const statusEl = document.getElementById('ds-status');
    const defsEl = document.getElementById('ds-definitions');
    const complexityLabel = document.getElementById('ds-complexity-label');
    const operation = getDSActiveOperation();

    if (structureEl) structureEl.innerHTML = buildDSStructureVisual();
    if (pointerEl) {
        pointerEl.innerHTML = buildDSPointerVisual() || `<span class="text-xs text-slate-400">${translateLiteral('No pointer/index data yet.', appState.language)}</span>`;
    }
    if (timelineEl) {
        const history = dsTimeline[dsActive] || [];
        timelineEl.innerHTML = history
            .slice(-8)
            .reverse()
            .map((entry) => `<li>${escapeHtml(entry)}</li>`)
            .join('');
    }
    if (stateEl) {
        stateEl.textContent = buildDSStateJson();
    }
    if (complexityLabel) {
        complexityLabel.textContent = `${operation}: ${config.operations[operation] || '-'}`;
    }
    if (defsEl) {
        defsEl.innerHTML = config.definitions.map((def) => `<li><span class="text-slate-300">${escapeHtml(def.term)}:</span> ${escapeHtml(translateLiteral(def.description, appState.language))}</li>`).join('');
    }
    if (statusEl) {
        statusEl.textContent = statusMessage || `${translateLiteral(config.label, appState.language)} ${translateLiteral('ready.', appState.language)}`;
    }
    renderDSLibraryVisuals();
    renderDSCodeAndExplanation();
    updateDSComplexity();
}

function estimateOps(bigO, n) {
    const safeN = Math.max(1, n);
    switch (bigO) {
        case 'O(1)':
            return 1;
        case 'O(log n)':
            return Math.max(1, Math.round(Math.log2(safeN)));
        case 'O(n)':
            return safeN;
        case 'O(n log n)':
            return Math.round(safeN * Math.log2(safeN));
        case 'O(n^2)':
            return safeN * safeN;
        case 'O(L)':
            return safeN;
        default:
            return safeN;
    }
}

function updateDSComplexity() {
    const slider = document.getElementById('ds-complexity-n');
    const summary = document.getElementById('ds-complexity-summary');
    const opsEl = document.getElementById('ds-complexity-ops');
    if (!slider || !summary || !opsEl) return;

    const n = Number(slider.value) || 1;
    const config = DS_PLAYGROUND_CONFIG[dsActive];
    const operation = getDSActiveOperation();
    const bigO = config.operations[operation] || 'O(n)';
    const ops = estimateOps(bigO, n);
    summary.textContent = `n=${n} • ${operation}`;
    opsEl.textContent = `~${ops} ops`;
}

function normalizeDsValue(raw) {
    const trimmed = String(raw || '').trim();
    if (!trimmed) return null;
    const asNumber = Number(trimmed);
    return Number.isNaN(asNumber) ? trimmed : asNumber;
}

function heapInsert(heap, value) {
    heap.push(value);
    let idx = heap.length - 1;
    while (idx > 0) {
        const parent = Math.floor((idx - 1) / 2);
        if (heap[parent] <= heap[idx]) break;
        [heap[parent], heap[idx]] = [heap[idx], heap[parent]];
        idx = parent;
    }
}

function heapExtract(heap) {
    if (heap.length === 0) return null;
    const min = heap[0];
    const last = heap.pop();
    if (heap.length > 0) {
        heap[0] = last;
        let idx = 0;
        while (true) {
            let left = idx * 2 + 1;
            let right = idx * 2 + 2;
            let smallest = idx;
            if (left < heap.length && heap[left] < heap[smallest]) smallest = left;
            if (right < heap.length && heap[right] < heap[smallest]) smallest = right;
            if (smallest === idx) break;
            [heap[idx], heap[smallest]] = [heap[smallest], heap[idx]];
            idx = smallest;
        }
    }
    return min;
}

function recordDSOperation(message, operationKey = '') {
    const normalized = String(message || '').trim();
    if (!normalized) return;
    if (!Array.isArray(dsTimeline[dsActive])) {
        dsTimeline[dsActive] = [];
    }
    dsTimeline[dsActive].push(normalized);
    if (dsTimeline[dsActive].length > 40) {
        dsTimeline[dsActive] = dsTimeline[dsActive].slice(-40);
    }
    if (operationKey) {
        dsLastOperation[dsActive] = operationKey;
    }
}

function resetDSPlaygroundState() {
    Object.keys(DS_INITIAL_STATE).forEach((key) => {
        dsState[key] = JSON.parse(JSON.stringify(DS_INITIAL_STATE[key]));
    });
    Object.keys(dsTimeline).forEach((key) => {
        dsTimeline[key] = [translateLiteral('Playground reset.', appState.language)];
    });
    Object.assign(dsLastOperation, {
        array: 'insert',
        stack: 'push',
        queue: 'enqueue',
        heap: 'insert',
        graph: 'addEdge',
        trie: 'search'
    });
    renderDSControls();
    updateDSView(translateLiteral('Playground reset.', appState.language));
}

function handleDSAction(action) {
    const valueInput = document.getElementById('ds-value-input');
    const indexInput = document.getElementById('ds-index-input');
    const nodeInput = document.getElementById('ds-node-input');
    const edgeFrom = document.getElementById('ds-edge-from');
    const edgeTo = document.getElementById('ds-edge-to');
    const wordInput = document.getElementById('ds-word-input');

    const value = normalizeDsValue(valueInput ? valueInput.value : '');
    const index = indexInput ? Number(indexInput.value) : null;
    const status = (message, operationKey = '') => {
        recordDSOperation(message, operationKey);
        updateDSView(message);
    };

    if (dsActive === 'array') {
        if (action === 'append') {
            if (value === null) return status(translateLiteral('Enter a value to append.', appState.language), 'insert');
            dsState.array.push(value);
            return status(translateLiteral(`Appended ${value}.`, appState.language), 'insert');
        }
        if (action === 'insert') {
            if (value === null) return status(translateLiteral('Enter a value to insert.', appState.language), 'insert');
            const targetIndex = Number.isInteger(index) && index >= 0 ? index : dsState.array.length;
            dsState.array.splice(Math.min(targetIndex, dsState.array.length), 0, value);
            return status(translateLiteral(`Inserted ${value} at index ${targetIndex}.`, appState.language), 'insert');
        }
        if (action === 'remove') {
            if (dsState.array.length === 0) return status(translateLiteral('Array is already empty.', appState.language), 'remove');
            const removed = dsState.array.pop();
            return status(translateLiteral(`Removed ${removed}.`, appState.language), 'remove');
        }
        if (action === 'remove-index') {
            if (!Number.isInteger(index) || index < 0 || index >= dsState.array.length) {
                return status(translateLiteral('Provide a valid index to remove.', appState.language), 'remove');
            }
            const removed = dsState.array.splice(index, 1)[0];
            return status(translateLiteral(`Removed ${removed} at index ${index}.`, appState.language), 'remove');
        }
    }

    if (dsActive === 'stack') {
        if (action === 'push') {
            if (value === null) return status(translateLiteral('Enter a value to push.', appState.language), 'push');
            dsState.stack.push(value);
            return status(translateLiteral(`Pushed ${value}.`, appState.language), 'push');
        }
        if (action === 'pop') {
            if (dsState.stack.length === 0) return status(translateLiteral('Stack is empty.', appState.language), 'pop');
            const removed = dsState.stack.pop();
            return status(translateLiteral(`Popped ${removed}.`, appState.language), 'pop');
        }
        if (action === 'peek') {
            if (dsState.stack.length === 0) return status(translateLiteral('Stack is empty.', appState.language), 'peek');
            return status(translateLiteral(`Top is ${dsState.stack[dsState.stack.length - 1]}.`, appState.language), 'peek');
        }
    }

    if (dsActive === 'queue') {
        if (action === 'enqueue') {
            if (value === null) return status(translateLiteral('Enter a value to enqueue.', appState.language), 'enqueue');
            dsState.queue.push(value);
            return status(translateLiteral(`Enqueued ${value}.`, appState.language), 'enqueue');
        }
        if (action === 'dequeue') {
            if (dsState.queue.length === 0) return status(translateLiteral('Queue is empty.', appState.language), 'dequeue');
            const removed = dsState.queue.shift();
            return status(translateLiteral(`Dequeued ${removed}.`, appState.language), 'dequeue');
        }
        if (action === 'peek') {
            if (dsState.queue.length === 0) return status(translateLiteral('Queue is empty.', appState.language), 'peek');
            return status(translateLiteral(`Front is ${dsState.queue[0]}.`, appState.language), 'peek');
        }
    }

    if (dsActive === 'heap') {
        if (action === 'heap-insert') {
            if (value === null || typeof value !== 'number') return status(translateLiteral('Enter a numeric value to insert.', appState.language), 'insert');
            heapInsert(dsState.heap, value);
            return status(translateLiteral(`Inserted ${value}.`, appState.language), 'insert');
        }
        if (action === 'heap-extract') {
            if (dsState.heap.length === 0) return status(translateLiteral('Heap is empty.', appState.language), 'extract');
            const removed = heapExtract(dsState.heap);
            return status(translateLiteral(`Extracted ${removed}.`, appState.language), 'extract');
        }
        if (action === 'peek') {
            if (dsState.heap.length === 0) return status(translateLiteral('Heap is empty.', appState.language), 'peek');
            return status(translateLiteral(`Min is ${dsState.heap[0]}.`, appState.language), 'peek');
        }
    }

    if (dsActive === 'graph') {
        if (action === 'graph-add-node') {
            const label = (nodeInput ? nodeInput.value : '').trim();
            if (!label) return status(translateLiteral('Enter a node label.', appState.language), 'addNode');
            if (!dsState.graph.nodes.includes(label)) {
                dsState.graph.nodes.push(label);
            }
            return status(translateLiteral(`Added node ${label}.`, appState.language), 'addNode');
        }
        if (action === 'graph-add-edge') {
            const from = (edgeFrom ? edgeFrom.value : '').trim();
            const to = (edgeTo ? edgeTo.value : '').trim();
            if (!from || !to) return status(translateLiteral('Enter both edge endpoints.', appState.language), 'addEdge');
            if (!dsState.graph.nodes.includes(from)) dsState.graph.nodes.push(from);
            if (!dsState.graph.nodes.includes(to)) dsState.graph.nodes.push(to);
            if (!dsState.graph.edges.find(edge => edge.from === from && edge.to === to)) {
                dsState.graph.edges.push({ from, to });
            }
            return status(translateLiteral(`Added edge ${from} → ${to}.`, appState.language), 'addEdge');
        }
        if (action === 'graph-remove-node') {
            const label = (nodeInput ? nodeInput.value : '').trim();
            if (!label) return status(translateLiteral('Enter a node to remove.', appState.language), 'remove');
            dsState.graph.nodes = dsState.graph.nodes.filter(node => node !== label);
            dsState.graph.edges = dsState.graph.edges.filter(edge => edge.from !== label && edge.to !== label);
            return status(translateLiteral(`Removed node ${label}.`, appState.language), 'remove');
        }
    }

    if (dsActive === 'trie') {
        if (action === 'trie-insert') {
            const word = (wordInput ? wordInput.value : '').trim().toLowerCase();
            if (!word) return status(translateLiteral('Enter a word to insert.', appState.language), 'insert');
            if (!dsState.trie.includes(word)) dsState.trie.push(word);
            return status(translateLiteral(`Inserted "${word}".`, appState.language), 'insert');
        }
        if (action === 'trie-remove') {
            const word = (wordInput ? wordInput.value : '').trim().toLowerCase();
            if (!word) return status(translateLiteral('Enter a word to remove.', appState.language), 'remove');
            dsState.trie = dsState.trie.filter(item => item !== word);
            return status(translateLiteral(`Removed "${word}".`, appState.language), 'remove');
        }
        if (action === 'trie-search') {
            const word = (wordInput ? wordInput.value : '').trim().toLowerCase();
            if (!word) return status(translateLiteral('Enter a word to search.', appState.language), 'search');
            const found = dsState.trie.includes(word)
                ? translateLiteral(`Found "${word}".`, appState.language)
                : translateLiteral(`"${word}" not found.`, appState.language);
            return status(found, 'search');
        }
    }

    updateDSView(translateLiteral('Action complete.', appState.language));
}

function openSupportModal() {
    openModal('support-modal');
}

function closeSupportModal() {
    closeModal('support-modal');
}

let siteGuideLastFocusedElement = null;

function openSiteGuideModal() {
    siteGuideLastFocusedElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    openModal('site-guide-modal');
    document.body.classList.add('site-guide-open');
    const trigger = document.getElementById('site-guide-helper-btn');
    if (trigger) trigger.setAttribute('aria-expanded', 'true');
    const modal = document.getElementById('site-guide-modal');
    if (modal) {
        modal.scrollTop = 0;
        const body = modal.querySelector('.site-guide-modal-body');
        if (body) body.scrollTop = 0;
    }
    const closeButton = document.getElementById('close-site-guide');
    if (closeButton) {
        window.setTimeout(() => closeButton.focus(), 0);
    }
}

function closeSiteGuideModal() {
    closeModal('site-guide-modal');
    document.body.classList.remove('site-guide-open');
    const trigger = document.getElementById('site-guide-helper-btn');
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
    const fallbackTarget = trigger instanceof HTMLElement ? trigger : null;
    const focusTarget = siteGuideLastFocusedElement instanceof HTMLElement ? siteGuideLastFocusedElement : fallbackTarget;
    if (focusTarget) {
        window.setTimeout(() => focusTarget.focus(), 0);
    }
}

function initSupport() {
    const closeBtn = document.getElementById('close-support');
    const form = document.getElementById('support-form');
    const moduleSelect = document.getElementById('support-module');

    if (moduleSelect && moduleSelect.options.length === 0) {
        moduleSelect.innerHTML = modules.map(module => `<option value="${escapeHtml(module.id)}">${escapeHtml(module.title)}</option>`).join('');
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeSupportModal);
    }

    if (form) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault();
            const moduleId = String(moduleSelect?.value || '').trim();
            const topic = String(document.getElementById('support-topic')?.value || '').trim();
            const message = String(document.getElementById('support-message')?.value || '').trim();
            if (!message) {
                showToast('Please add details so support can help quickly.', 'warning');
                return;
            }

            if (hasNeonSyncConfig()) {
                try {
                    await neonFetch(getNeonSupportEndpoint(), {
                        method: 'POST',
                        body: JSON.stringify({
                            userId: String(accountProfile.serverUserId || '').trim() || null,
                            email: accountProfile.email || null,
                            moduleId: moduleId || null,
                            topic: topic || null,
                            message,
                            language: appState.language || 'en',
                            submittedAt: new Date().toISOString()
                        })
                    });
                    showToast('Support request sent successfully.', 'success');
                } catch (error) {
                    showToast(`Support request failed: ${error.message}`, 'error');
                    return;
                }
            } else {
                showToast('Support request saved locally. Connect Neon backend to sync requests.', 'info');
            }
            form.reset();
            closeSupportModal();
        });
    }
}

// Code Processing Functions
function removeComments(code, language = 'java') {
    let processedCode = code;
    switch (language) {
        case 'python':
            processedCode = code.split('\n').map(line => {
                if (line.match(/^\s*#\s*[🎯📚🔒🏗️🔓🔄📝📊🆕🔍🌟💪🔀⚡🧮🎨🔧]/)) return line;
                return line.replace(/#.*$/, '').trimEnd();
            }).join('\n').replace(/"""[\s\S]*?"""/g, '').replace(/'''[\s\S]*?'''/g, '');
            break;
        case 'javascript':
            processedCode = code.split('\n').map(line => {
                if (line.match(/^\s*\/\/\s*[🎯📚🔒🏗️🔓🔄📝📊🆕🔍🌟💪🔀⚡🧮🎨🔧]/)) return line;
                return line.replace(/\/\/.*$/, '').trimEnd();
            }).join('\n').replace(/\/\*[\s\S]*?\*\//g, '');
            break;
        default: // java, cpp
            processedCode = code.split('\n').map(line => {
                if (line.match(/^\s*\/\/\s*[🎯📚🔒🏗️🔓🔄📝📊🆕🔍🌟💪🔀⚡🧮🎨🔧]/)) return line;
                return line.replace(/\/\/.*$/, '').trimEnd();
            }).join('\n').replace(/\/\*[\s\S]*?\*\//g, '');
            break;
    }
    return processedCode.replace(/\n\s*\n\s*\n+/g, '\n\n').trim();
}

function convertToPseudocode(code, language = 'java', shouldKeepComments = true) {
    let processedCode = shouldKeepComments ? code : removeComments(code, language);

    switch (language) {
        case 'python':
            return processedCode
                .replace(/class\s+(\w+).*?:/g, 'DEFINE CLASS $1')
                .replace(/def\s+__init__\s*\(.*?\):/g, 'CONSTRUCTOR')
                .replace(/def\s+(\w+)\s*\([^)]*\):/g, 'FUNCTION $1')
                .replace(/if\s+__name__\s*==\s*["']__main__["']:/g, 'BEGIN PROGRAM')
                .replace(/if\s+(.+?):/g, 'IF $1 THEN')
                .replace(/elif\s+(.+?):/g, 'ELSE IF $1 THEN')
                .replace(/else:/g, 'ELSE')
                .replace(/for\s+(\w+)\s+in\s+(.+?):/g, 'FOR EACH $1 in $2')
                .replace(/while\s+(.+?):/g, 'WHILE $1')
                .replace(/print\s*\(\s*([^)]+)\s*\)/g, 'PRINT $1')
                .replace(/return\s+(.+)/g, 'RETURN $1')
                .replace(/:/g, '').replace(/\n\s*\n\s*\n+/g, '\n\n').trim();
        case 'javascript':
            return processedCode
                .replace(/class\s+(\w+)/g, 'DEFINE CLASS $1')
                .replace(/constructor\s*\([^)]*\)\s*\{/g, 'CONSTRUCTOR')
                .replace(/function\s+(\w+)\s*\([^)]*\)\s*\{/g, 'FUNCTION $1')
                .replace(/(\w+)\s*\([^)]*\)\s*\{/g, 'FUNCTION $1')
                .replace(/if\s*\(\s*([^)]+)\s*\)/g, 'IF $1 THEN')
                .replace(/else\s+if\s*\(\s*([^)]+)\s*\)/g, 'ELSE IF $1 THEN')
                .replace(/else/g, 'ELSE')
                .replace(/for\s*\(\s*let\s+(\w+)\s*=\s*([^;]+);\s*([^;]+);\s*\w+\+\+\s*\)/g, 'FOR $1 from $2 while $3')
                .replace(/for\s*\(\s*(?:let|const)\s+(\w+)\s+of\s+(\w+)\s*\)/g, 'FOR EACH $1 in $2')
                .replace(/while\s*\(\s*([^)]+)\s*\)/g, 'WHILE $1')
                .replace(/console\.log\s*\(\s*([^)]+)\s*\);/g, 'PRINT $1')
                .replace(/return\s+([^;]+);/g, 'RETURN $1')
                .replace(/\{/g, '').replace(/\}/g, 'END').replace(/;/g, '')
                .replace(/let|const|var/g, '').replace(/\n\s*\n\s*\n+/g, '\n\n').trim();
        default: // java, cpp
            return processedCode
                .replace(/public\s+class\s+(\w+)/g, 'DEFINE CLASS $1')
                .replace(/class\s+(\w+)/g, 'DEFINE CLASS $1')
                .replace(/struct\s+(\w+)/g, 'DEFINE STRUCTURE $1')
                .replace(/public\s+static\s+void\s+main.*?\{/g, 'BEGIN PROGRAM')
                .replace(/public\s+(\w+)\s+(\w+)\s*\([^)]*\)\s*\{/g, 'FUNCTION $2 RETURNS $1')
                .replace(/private\s+(\w+)\s+(\w+);/g, 'DECLARE private $1 variable $2')
                .replace(/(\w+)\s*=\s*new\s+(\w+)\s*\([^)]*\);/g, 'CREATE new $2 object and assign to $1')
                .replace(/for\s*\(\s*int\s+(\w+)\s*=\s*([^;]+);\s*([^;]+);\s*\w+\+\+\s*\)/g, 'FOR $1 from $2 while $3')
                .replace(/for\s*\(\s*(\w+)\s+(\w+)\s*:\s*(\w+)\s*\)/g, 'FOR EACH $2 in $3')
                .replace(/if\s*\(\s*([^)]+)\s*\)/g, 'IF $1 THEN')
                .replace(/else\s+if\s*\(\s*([^)]+)\s*\)/g, 'ELSE IF $1 THEN')
                .replace(/else/g, 'ELSE')
                .replace(/while\s*\(\s*([^)]+)\s*\)/g, 'WHILE $1')
                .replace(/System\.out\.println\s*\(\s*([^)]+)\s*\);/g, 'PRINT $1')
                .replace(/std::cout\s*<<\s*([^;]+)\s*;/g, 'PRINT $1')
                .replace(/return\s+([^;]+);/g, 'RETURN $1')
                .replace(/\{/g, '').replace(/\}/g, 'END').replace(/;/g, '')
                .replace(/public|private|static/g, '').replace(/\n\s*\n\s*\n+/g, '\n\n').trim();
    }
}

function truncateCode(code, lines = CONSTANTS.CODE_PREVIEW_LINES) {
    const codeLines = code.split('\n');
    if (codeLines.length <= lines) {
        return code;
    }
    return `${codeLines.slice(0, lines).join('\n')}\n\n${t('module.truncateHint')}`;
}

// Module Helper Functions
function shouldShowComments(moduleId) {
    const individualSetting = appState.moduleComments.get(moduleId);
    return individualSetting !== undefined ? individualSetting : appState.showComments;
}

function isAssemblyModule(moduleId) {
    return getModuleCategoryKey(moduleId) === 'assembly';
}

function isDiscreteModule(moduleId) {
    return DISCRETE_MODULE_IDS.has(moduleId);
}

function getModuleById(moduleId) {
    return modules.find((module) => module.id === moduleId) || null;
}

function getModuleExampleExpansionKey(moduleId, exampleId) {
    return `${moduleId}::${exampleId}`;
}

function getModuleCodeExampleSets(moduleId, localizedModule = null) {
    const module = getModuleById(moduleId);
    if (!module) return [];
    if (localizedModule && Array.isArray(localizedModule.codeExampleSets) && localizedModule.codeExampleSets.length) {
        return localizedModule.codeExampleSets;
    }
    return Array.isArray(module.codeExampleSets) ? module.codeExampleSets : [];
}

function getActiveModuleExampleId(moduleId, localizedModule = null) {
    const sets = getModuleCodeExampleSets(moduleId, localizedModule);
    if (!sets.length) return '';
    const saved = appState.moduleExampleSelections.get(moduleId);
    if (saved && sets.some((set) => set.id === saved)) {
        return saved;
    }
    return sets[0].id;
}

function getActiveModuleExampleSet(moduleId, localizedModule = null) {
    const sets = getModuleCodeExampleSets(moduleId, localizedModule);
    if (!sets.length) return null;
    const selectedId = getActiveModuleExampleId(moduleId, localizedModule);
    return sets.find((set) => set.id === selectedId) || sets[0];
}

function getCodeExamplesForModuleContext(moduleId, localizedModule = null) {
    const module = getModuleById(moduleId);
    if (!module) return {};
    const selectedSet = getActiveModuleExampleSet(moduleId, localizedModule);
    if (selectedSet?.codeExamples && typeof selectedSet.codeExamples === 'object') {
        return selectedSet.codeExamples;
    }
    if (localizedModule?.codeExamples && typeof localizedModule.codeExamples === 'object') {
        return localizedModule.codeExamples;
    }
    return module.codeExamples || {};
}

function getExpectedOutputsForModuleContext(moduleId, localizedModule = null) {
    const module = getModuleById(moduleId);
    if (!module) return {};
    const selectedSet = getActiveModuleExampleSet(moduleId, localizedModule);
    if (selectedSet?.expectedOutputs && typeof selectedSet.expectedOutputs === 'object') {
        return selectedSet.expectedOutputs;
    }
    if (localizedModule?.expectedOutputs && typeof localizedModule.expectedOutputs === 'object') {
        return localizedModule.expectedOutputs;
    }
    return module.expectedOutputs || {};
}

function getModuleOutputPanelKey(moduleId, exampleId = 'single') {
    return `${moduleId}::${exampleId || 'single'}`;
}

function getModuleOutputCacheKey(moduleId, language, mode, exampleId = 'single') {
    return `${moduleId}::${exampleId || 'single'}::${language || 'java'}::${mode || 'code'}`;
}

function clearModuleOutputState(moduleId) {
    const modulePrefix = `${moduleId}::`;
    Array.from(appState.expandedOutputs).forEach((panelKey) => {
        if (panelKey.startsWith(modulePrefix)) {
            appState.expandedOutputs.delete(panelKey);
        }
    });
    Array.from(moduleOutputState.keys()).forEach((panelKey) => {
        if (panelKey.startsWith(modulePrefix)) {
            moduleOutputState.delete(panelKey);
        }
    });
    Array.from(moduleOutputCache.keys()).forEach((cacheKey) => {
        if (cacheKey.startsWith(modulePrefix)) {
            moduleOutputCache.delete(cacheKey);
        }
    });
    Array.from(moduleOutputInFlight.keys()).forEach((cacheKey) => {
        if (cacheKey.startsWith(modulePrefix)) {
            moduleOutputInFlight.delete(cacheKey);
        }
    });
}

function getDefaultModuleLanguage(moduleId) {
    if (isAssemblyModule(moduleId)) return 'assembly';
    return 'java';
}

function getAvailableModeKeys(moduleId) {
    const baseModes = ['code', 'pseudocode'];
    if (isDiscreteModule(moduleId)) {
        return ['discreteTheory', ...baseModes];
    }
    return baseModes;
}

function getModuleLanguage(moduleId) {
    const module = getModuleById(moduleId);
    const localizedModule = appState.language === 'es' ? getLocalizedModule(module) : null;
    const codeExamples = getCodeExamplesForModuleContext(moduleId, localizedModule);
    const savedLanguage = appState.moduleLanguages.get(moduleId);
    const defaultLanguage = getDefaultModuleLanguage(moduleId);
    if (savedLanguage && codeExamples?.[savedLanguage]) {
        return savedLanguage;
    }
    if (codeExamples?.[defaultLanguage]) {
        return defaultLanguage;
    }
    if (codeExamples && typeof codeExamples === 'object') {
        const available = Object.keys(codeExamples);
        if (available.length) return available[0];
    }
    return defaultLanguage;
}

function getModuleMode(moduleId) {
    const savedMode = appState.moduleModes.get(moduleId);
    const availableModes = getAvailableModeKeys(moduleId);
    if (savedMode && availableModes.includes(savedMode)) {
        return savedMode;
    }
    return isDiscreteModule(moduleId) ? 'discreteTheory' : 'code';
}

function getDiscreteTheoryContent(module) {
    const topics = (module?.topics || []).map((topic) => `• ${topic}`);
    if (appState.language === 'es') {
        return [
            'Resumen Teórico Profundo',
            `Módulo: ${module?.title || ''}`,
            '',
            'Conceptos clave:',
            ...topics,
            '',
            'Marco de razonamiento:',
            '1) Defina símbolos y supuestos antes de resolver.',
            '2) Traduzca el enunciado a proposiciones y relaciones formales.',
            '3) Justifique cada paso de forma lógica (no por intuición).',
            '4) Use contraejemplos para validar o refutar afirmaciones.',
            '',
            'Explicación detallada:',
            module?.explanation || '',
            '',
            'Checklist de práctica:',
            '- Escriba definiciones precisas.',
            '- Identifique hipótesis y conclusión.',
            '- Verifique equivalencias y casos límite.',
            '- Redacte una prueba clara, paso por paso.'
        ].join('\n');
    }

    return [
        'Deep Theory Summary',
        `Module: ${module?.title || ''}`,
        '',
        'Core concepts:',
        ...topics,
        '',
        'Reasoning framework:',
        '1) Define symbols and assumptions before solving.',
        '2) Translate statements into formal propositions/relations.',
        '3) Justify every step logically, not by intuition alone.',
        '4) Use counterexamples to validate or refute claims.',
        '',
        'Detailed explanation:',
        module?.explanation || '',
        '',
        'Practice checklist:',
        '- Write precise definitions.',
        '- Identify hypothesis and conclusion.',
        '- Verify equivalences and boundary cases.',
        '- Present a clear step-by-step proof.'
    ].join('\n');
}

function getTotalModuleCount() {
    return Array.isArray(modules) ? modules.length : 0;
}

function getDynamicAchievementLevels() {
    const totalModules = getTotalModuleCount();
    return ACHIEVEMENT_LEVELS.map(level => (
        level.id === 'luminary'
            ? { ...level, threshold: totalModules }
            : level
    ));
}

function getCanonicalModuleCode(moduleId, preferredLanguage, preferredExampleId = '') {
    const module = getModuleById(moduleId);
    if (!module || !module.codeExamples) {
        return { code: '', language: preferredLanguage || 'java' };
    }

    const localizedModule = appState.language === 'es' ? getLocalizedModule(module) : null;
    const requested = preferredLanguage || getDefaultModuleLanguage(moduleId);
    const defaultLanguage = getDefaultModuleLanguage(moduleId);
    const exampleSources = [];
    const localizedSets = getModuleCodeExampleSets(moduleId, localizedModule);
    const moduleSets = getModuleCodeExampleSets(moduleId, module);
    const selectedExampleId = preferredExampleId || getActiveModuleExampleId(moduleId, localizedModule);
    const localizedSelectedSet = localizedSets.find((set) => set.id === selectedExampleId);
    const moduleSelectedSet = moduleSets.find((set) => set.id === selectedExampleId);

    if (localizedSelectedSet?.codeExamples) exampleSources.push(localizedSelectedSet.codeExamples);
    if (moduleSelectedSet?.codeExamples) exampleSources.push(moduleSelectedSet.codeExamples);
    if (localizedModule?.codeExamples) exampleSources.push(localizedModule.codeExamples);
    if (module?.codeExamples) exampleSources.push(module.codeExamples);

    for (const sourceCodeExamples of exampleSources) {
        if (sourceCodeExamples?.[requested]) {
            return { code: sourceCodeExamples[requested], language: requested };
        }
        if (sourceCodeExamples?.[defaultLanguage]) {
            return { code: sourceCodeExamples[defaultLanguage], language: defaultLanguage };
        }
        const runnableFallback = PLAYGROUND_RUNNABLE_LANGUAGES.find((lang) => sourceCodeExamples?.[lang]);
        if (runnableFallback) {
            return { code: sourceCodeExamples[runnableFallback], language: runnableFallback };
        }
        const firstLanguage = Object.keys(sourceCodeExamples || {})[0];
        if (firstLanguage) {
            return { code: sourceCodeExamples[firstLanguage] || '', language: firstLanguage };
        }
    }

    return { code: '', language: requested };
}

function localizeOutputText(text) {
    if (appState.language !== 'es') return String(text || '');
    return String(text || '')
        .split('\n')
        .map((line) => translateLiteral(line, 'es'))
        .join('\n');
}

function getCanonicalModuleOutput(moduleId, preferredLanguage, preferredExampleId = '') {
    const module = getModuleById(moduleId);
    if (!module) {
        return { text: localizeOutputText('Execution complete.'), language: preferredLanguage || 'java' };
    }

    const localizedModule = appState.language === 'es' ? getLocalizedModule(module) : null;
    const requested = preferredLanguage || getDefaultModuleLanguage(moduleId);
    const defaultLanguage = getDefaultModuleLanguage(moduleId);
    const selectedExampleId = preferredExampleId || getActiveModuleExampleId(moduleId, localizedModule);
    const outputSources = [];
    const localizedSets = getModuleCodeExampleSets(moduleId, localizedModule);
    const moduleSets = getModuleCodeExampleSets(moduleId, module);
    const localizedSelectedSet = localizedSets.find((set) => set.id === selectedExampleId);
    const moduleSelectedSet = moduleSets.find((set) => set.id === selectedExampleId);

    if (localizedSelectedSet?.expectedOutputs) outputSources.push(localizedSelectedSet.expectedOutputs);
    if (moduleSelectedSet?.expectedOutputs) outputSources.push(moduleSelectedSet.expectedOutputs);
    if (localizedModule?.expectedOutputs) outputSources.push(localizedModule.expectedOutputs);
    if (module?.expectedOutputs) outputSources.push(module.expectedOutputs);

    for (const sourceOutputs of outputSources) {
        if (typeof sourceOutputs?.[requested] === 'string' && sourceOutputs[requested].trim()) {
            return { text: localizeOutputText(sourceOutputs[requested]), language: requested };
        }
        if (typeof sourceOutputs?.[defaultLanguage] === 'string' && sourceOutputs[defaultLanguage].trim()) {
            return { text: localizeOutputText(sourceOutputs[defaultLanguage]), language: defaultLanguage };
        }
        const fallbackLanguage = Object.keys(sourceOutputs || {}).find((lang) => typeof sourceOutputs?.[lang] === 'string' && sourceOutputs[lang].trim());
        if (fallbackLanguage) {
            return { text: localizeOutputText(sourceOutputs[fallbackLanguage]), language: fallbackLanguage };
        }
    }

    return { text: localizeOutputText('Execution complete.'), language: requested };
}

function runWithTimeout(promise, timeoutMs = 20000) {
    return Promise.race([
        promise,
        new Promise((_, reject) => {
            setTimeout(() => reject(new Error(`Execution timed out after ${timeoutMs}ms`)), timeoutMs);
        })
    ]);
}

async function executeWithConfiguredRunner(languageKey, normalizedCode) {
    const langConfig = CODE_RUNNER_CONFIG[languageKey] || CODE_RUNNER_CONFIG.java;
    if (CODE_RUNNER_ENDPOINT) {
        return runViaCustomEndpoint(langConfig, normalizedCode);
    }
    if (JUDGE0_ENDPOINT && JUDGE0_LANGUAGE_IDS[languageKey]) {
        return runViaJudge0(languageKey, normalizedCode);
    }
    if (languageKey === 'javascript') {
        return runJavascriptLocally(normalizedCode);
    }
    throw new Error('No compatible runner is configured for this language.');
}

async function runModuleSnippetForOutput({ moduleId, language, exampleId = '' }) {
    const mode = getModuleMode(moduleId);
    const normalizedExampleId = exampleId || 'single';
    const cacheKey = getModuleOutputCacheKey(moduleId, language, mode, normalizedExampleId);
    if (moduleOutputCache.has(cacheKey)) {
        return moduleOutputCache.get(cacheKey);
    }
    if (moduleOutputInFlight.has(cacheKey)) {
        return moduleOutputInFlight.get(cacheKey);
    }

    const executionPromise = (async () => {
        const fallback = getCanonicalModuleOutput(moduleId, language, exampleId);

        if (mode !== 'code') {
            const result = {
                text: t('module.outputUnavailableForMode'),
                source: 'fallback',
                ts: Date.now()
            };
            moduleOutputCache.set(cacheKey, result);
            return result;
        }

        if (language === 'assembly') {
            const outputText = [t('module.outputAssemblyNote'), fallback.text].filter(Boolean).join('\n');
            const result = { text: outputText, source: 'fallback', ts: Date.now() };
            moduleOutputCache.set(cacheKey, result);
            return result;
        }

        if (!PLAYGROUND_RUNNABLE_LANGUAGES.includes(language)) {
            const result = { text: fallback.text, source: 'fallback', ts: Date.now() };
            moduleOutputCache.set(cacheKey, result);
            return result;
        }

        const code = getCanonicalModuleCode(moduleId, language, exampleId).code || '';
        if (!String(code).trim()) {
            const result = { text: fallback.text, source: 'fallback', ts: Date.now() };
            moduleOutputCache.set(cacheKey, result);
            return result;
        }

        try {
            const normalizedCode = normalizeCodeForRunner(language, code);
            const outputText = await runWithTimeout(executeWithConfiguredRunner(language, normalizedCode), 20000);
            const trimmedOutput = String(outputText || '').trim();
            const resolvedOutput = trimmedOutput && trimmedOutput !== 'Execution complete (no stdout).'
                ? trimmedOutput
                : fallback.text;
            const source = trimmedOutput && trimmedOutput !== 'Execution complete (no stdout).' ? 'live' : 'fallback';
            const result = { text: resolvedOutput, source, ts: Date.now() };
            moduleOutputCache.set(cacheKey, result);
            return result;
        } catch (error) {
            const reason = error instanceof Error ? error.message : String(error);
            const fallbackText = `${fallback.text}\n\n// ${reason}`;
            const result = { text: fallbackText, source: 'fallback', ts: Date.now() };
            moduleOutputCache.set(cacheKey, result);
            return result;
        }
    })();

    moduleOutputInFlight.set(cacheKey, executionPromise);
    try {
        return await executionPromise;
    } finally {
        moduleOutputInFlight.delete(cacheKey);
    }
}

function getCodeExample(module) {
    const language = getModuleLanguage(module.id);
    const resolved = getCanonicalModuleCode(module.id, language, getActiveModuleExampleId(module.id));
    return resolved.code || translateLiteral('Code example coming soon...', appState.language);
}

function processCode(code, moduleId) {
    const showCommentsForModule = shouldShowComments(moduleId);
    const language = getModuleLanguage(moduleId);
    const mode = getModuleMode(moduleId);

    let processedCode = code;
    if (mode === 'pseudocode') {
        processedCode = convertToPseudocode(code, language, showCommentsForModule);
    } else if (!showCommentsForModule) {
        processedCode = removeComments(code, language);
    }
    return translateCodeHumanText(processedCode);
}

function getDifficultyColor(difficulty) {
    return DIFFICULTY_COLORS[difficulty] || DIFFICULTY_COLORS.default;
}

// =================================
// UI UPDATE FUNCTIONS
// =================================

function applyTheme() {
    const body = document.body;
    THEME_CLASSES.forEach(cls => body.classList.remove(cls));
    if (appState.theme && appState.theme !== 'default') {
        body.classList.add(`theme-${appState.theme}`);
    }
}

function applyAccent() {
    const body = document.body;
    ACCENT_CLASSES.forEach(cls => body.classList.remove(cls));
    const accent = ACCENT_OPTIONS.includes(appState.accent) ? appState.accent : 'indigo';
    body.classList.add(`accent-${accent}`);
}

function applyCardDepth() {
    const body = document.body;
    CARD_DEPTH_CLASSES.forEach(cls => body.classList.remove(cls));
    const depth = CARD_DEPTH_OPTIONS.includes(appState.cardDepth) ? appState.cardDepth : 'standard';
    body.classList.add(`card-depth-${depth}`);
}

function applyReduceMotion() {
    document.body.classList.toggle('reduce-motion', !!appState.reduceMotion);
}

function applyHighContrast() {
    document.body.classList.toggle('high-contrast', !!appState.highContrast);
}

function applyFontScale() {
    const root = document.documentElement;
    FONT_SCALE_CLASSES.forEach(cls => root.classList.remove(cls));
    const appliedClass = FONT_SCALE_CLASS_MAP[appState.fontScale] || FONT_SCALE_CLASS_MAP.base;
    if (appliedClass) {
        root.classList.add(appliedClass);
    }
}

function applyCompactLayout() {
    document.body.classList.toggle('compact-modules', !!appState.compactLayout);
}

function updateProgress() {
    const totalModules = Math.max(getTotalModuleCount(), 1);
    const progressPercentage = Math.round((appState.completedModules.size / totalModules) * 100);

    const progressStr = appState.language === 'es'
        ? `${appState.completedModules.size} de ${totalModules} módulos completados`
        : `${appState.completedModules.size} of ${totalModules} modules completed`;
    document.getElementById('progress-text').textContent = progressStr;
    document.getElementById('progress-bar').style.width = `${progressPercentage}%`;
    document.getElementById('progress-percentage').textContent = `${progressPercentage}%`;

    renderAchievements();
}

function updateDarkMode() {
    const body = document.body;
    const darkModeSlider = document.getElementById('dark-mode-slider');

    if (appState.darkMode) {
        body.classList.add('dark');
        document.getElementById('dark-mode-toggle').classList.remove('bg-slate-300');
        document.getElementById('dark-mode-toggle').classList.add('bg-indigo-600');
        darkModeSlider.classList.remove('translate-x-0.5');
        darkModeSlider.classList.add('translate-x-7');
    } else {
        body.classList.remove('dark');
        document.getElementById('dark-mode-toggle').classList.remove('bg-indigo-600');
        document.getElementById('dark-mode-toggle').classList.add('bg-slate-300');
        darkModeSlider.classList.remove('translate-x-7');
        darkModeSlider.classList.add('translate-x-0.5');
    }
}

function syncToggleState(toggleId, sliderId, isActive) {
    const toggle = document.getElementById(toggleId);
    const slider = document.getElementById(sliderId);
    if (!toggle || !slider) return;
    toggle.classList.toggle('bg-indigo-600', isActive);
    toggle.classList.toggle('bg-slate-300', !isActive);
    slider.classList.toggle('translate-x-7', isActive);
    slider.classList.toggle('translate-x-0.5', !isActive);
}

function updateCommentsToggle() {
    syncToggleState('comments-toggle', 'comments-slider', appState.showComments);
}

function updateHideCompletedToggle() {
    syncToggleState('hide-completed-toggle', 'hide-completed-slider', appState.hideCompletedModules);
}

function updateCompactLayoutToggle() {
    syncToggleState('compact-layout-toggle', 'compact-layout-slider', appState.compactLayout);
}

function updateReduceMotionToggle() {
    syncToggleState('reduce-motion-toggle', 'reduce-motion-slider', appState.reduceMotion);
}

function updateHighContrastToggle() {
    syncToggleState('high-contrast-toggle', 'high-contrast-slider', appState.highContrast);
}

function updateHeaderShrink() {
    const header = document.getElementById('main-header');
    const title = document.getElementById('main-title');
    const subtitle = document.getElementById('main-subtitle');
    const buttons = document.getElementById('header-buttons');
    if (!header || !title || !subtitle || !buttons) return;

    const progress = Math.min(appState.scrollY / 200, 1);
    const isScrolled = appState.scrollY > 10;
    const isFullyShrunken = appState.scrollY > 100;
    const collapseThreshold = 24;
    const expandThreshold = 8;
    const currentlyCollapsed = Boolean(appState.headerCollapsed);
    let shouldCollapse = currentlyCollapsed;
    if (!currentlyCollapsed && appState.scrollY >= collapseThreshold) {
        shouldCollapse = true;
    } else if (currentlyCollapsed && appState.scrollY <= expandThreshold) {
        shouldCollapse = false;
    }
    appState.headerCollapsed = shouldCollapse;
    header.classList.toggle('header-collapsed', shouldCollapse);

    // Header padding - avoid inline/CSS conflicts when collapsed on mobile.
    if (shouldCollapse) {
        header.style.paddingTop = '0px';
        header.style.paddingBottom = '0px';
    } else {
        const paddingY = Math.max(12 - progress * 6, 6);
        header.style.paddingTop = `${paddingY}px`;
        header.style.paddingBottom = `${paddingY}px`;
    }

    // Title size - optimized sizes
    if (isFullyShrunken) {
        title.className = title.className.replace(/text-\w+/g, '') + ' text-lg sm:text-xl lg:text-2xl';
    } else {
        title.className = title.className.replace(/text-\w+/g, '') + ' text-xl sm:text-2xl lg:text-3xl';
    }

    // Subtitle opacity
    const subtitleOpacity = Math.max(1 - progress * 1.5, 0);
    subtitle.style.opacity = subtitleOpacity;
    subtitle.style.transform = subtitleOpacity < 0.3 ? 'translateY(-10px)' : 'translateY(0)';

    // Buttons
    const isMobileHeader = window.matchMedia('(max-width: 640px)').matches;
    if (isMobileHeader) {
        if (shouldCollapse) {
            buttons.style.opacity = '0';
            buttons.style.transform = 'scale(0.86)';
            buttons.style.transformOrigin = 'top center';
        } else {
            buttons.style.opacity = '1';
            buttons.style.transform = 'none';
            buttons.style.transformOrigin = 'top center';
        }
    } else {
        const buttonOpacity = Math.max(1 - progress * 1.2, 0);
        const buttonScale = Math.max(1 - progress * 0.3, 0.7);
        buttons.style.opacity = buttonOpacity;
        buttons.style.transform = `scale(${buttonScale})`;
        buttons.style.transformOrigin = 'top right';
    }

    // Add/remove shadow
    if (isScrolled) {
        header.classList.add('shadow-2xl', 'backdrop-blur-sm');
    } else {
        header.classList.remove('shadow-2xl', 'backdrop-blur-sm');
    }
}

function getModuleCategoryKey(moduleId) {
    return MODULE_CATEGORY_BY_ID[moduleId] || 'dsa';
}

function getOrderedModules() {
    const indexMap = new Map(MODULE_LEARNING_SEQUENCE.map((id, index) => [id, index]));
    return [...modules].sort((a, b) => {
        const aIndex = indexMap.has(a.id) ? indexMap.get(a.id) : Number.MAX_SAFE_INTEGER;
        const bIndex = indexMap.has(b.id) ? indexMap.get(b.id) : Number.MAX_SAFE_INTEGER;
        if (aIndex !== bIndex) return aIndex - bIndex;
        return a.title.localeCompare(b.title);
    });
}

function updateTopicFocusButtons() {
    const active = appState.categoryFilter || 'all';
    const buttons = document.querySelectorAll('[data-topic-filter]');
    buttons.forEach((button) => {
        const value = button.getAttribute('data-topic-filter') || 'all';
        const isActive = value === active;
        button.classList.toggle('is-active', isActive);
        button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });
}

function filterModules() {
    const searchTerm = appState.searchTerm.trim().toLowerCase();
    const hasSearch = searchTerm.length > 0;
    const difficultyFilter = appState.difficultyFilter;
    const categoryFilter = appState.categoryFilter || 'all';
    const orderedModules = getOrderedModules();

    return orderedModules.filter(module => {
        const localized = getLocalizedModule(module);
        const localizedTopics = localized.topics || [];
        const matchesSearch = !hasSearch ||
            localized.title.toLowerCase().includes(searchTerm) ||
            localized.description.toLowerCase().includes(searchTerm) ||
            localizedTopics.some(topic => topic.toLowerCase().includes(searchTerm));

        const matchesDifficulty = difficultyFilter === 'all' || module.difficulty === difficultyFilter;
        const matchesCategory = categoryFilter === 'all' || getModuleCategoryKey(module.id) === categoryFilter;
        const passesCompletionFilter = !appState.hideCompletedModules || !appState.completedModules.has(module.id);

        return matchesSearch && matchesDifficulty && matchesCategory && passesCompletionFilter;
    });
}

function renderModuleOutputSection(moduleId, exampleId = 'single') {
    const panelKey = getModuleOutputPanelKey(moduleId, exampleId);
    const isExpanded = appState.expandedOutputs.has(panelKey);
    const state = moduleOutputState.get(panelKey);
    const status = state?.status || 'idle';
    const outputText = status === 'running'
        ? t('module.outputRunning')
        : String(state?.text || '');
    const sourceLabel = state?.source === 'live'
        ? t('module.outputSourceLive')
        : t('module.outputSourceFallback');

    return `
        <div class="pt-2 space-y-2">
            <button onclick="toggleModuleOutputPanel('${moduleId}', '${exampleId}')" class="text-xs px-2 py-1 rounded font-semibold ${isExpanded ? 'bg-slate-600 text-white' : 'bg-violet-600 text-white hover:bg-violet-700'}">
                ${isExpanded ? t('module.hideOutput') : t('module.showOutput')}
            </button>
            ${isExpanded ? `
                <div class="rounded-md border border-slate-200 bg-slate-900 text-slate-100 p-2 space-y-1">
                    <div class="flex items-center justify-between gap-2 text-[11px] uppercase tracking-wide text-slate-300">
                        <span>${t('module.outputHeading')}</span>
                        <span class="px-2 py-0.5 rounded-full bg-slate-700 text-slate-100">${sourceLabel}</span>
                    </div>
                    <pre class="text-xs leading-relaxed whitespace-pre-wrap font-mono">${escapeHtml(outputText || t('module.outputRunning'))}</pre>
                </div>
            ` : ''}
        </div>
    `;
}

function renderModules() {
    const filteredModules = filterModules();
    const grid = document.getElementById('modules-grid');
    const searchResultsCount = document.getElementById('search-results-count');
    const totalOrderedModules = getOrderedModules();
    const accentModuleIds = new Set(['stacks-queues', 'searching-algorithms']);
    const localizedModuleMap = new Map(getLocalizedModules().map((module) => [module.id, module]));

    // Update search results count
    if (filteredModules.length !== totalOrderedModules.length) {
        searchResultsCount.textContent = translateLiteral(`Showing ${filteredModules.length} of ${totalOrderedModules.length} modules`, appState.language);
        searchResultsCount.style.display = 'block';
    } else {
        searchResultsCount.style.display = 'none';
    }

    grid.innerHTML = filteredModules.map(module => {
        const localizedModule = localizedModuleMap.get(module.id) || module;
        const codeExampleSets = getModuleCodeExampleSets(module.id, localizedModule);
        const hasCodeExampleSets = codeExampleSets.length > 0;
        const activeExampleId = getActiveModuleExampleId(module.id, localizedModule);
        const moduleCodeExamples = getCodeExamplesForModuleContext(module.id, localizedModule);
        const isCompleted = appState.completedModules.has(module.id);
        const isCodeExpanded = appState.expandedCode.has(module.id);
        const currentLanguage = getModuleLanguage(module.id);
        const currentMode = getModuleMode(module.id);
        const availableModes = getAvailableModeKeys(module.id);
        const isDiscreteTheoryMode = currentMode === 'discreteTheory';
        const hasMultipleLanguages = Object.keys(moduleCodeExamples).length > 1;
        const definitions = Array.isArray(localizedModule.definitions) && localizedModule.definitions.length === 5
            ? localizedModule.definitions
            : buildModuleDefinitions(localizedModule, appState.language === 'es' ? 'es' : 'en');

        const codeToDisplay = isDiscreteTheoryMode
            ? getDiscreteTheoryContent(localizedModule)
            : getCodeExample(module);
        const previewLines = isAssemblyModule(module.id) ? 8 : CONSTANTS.CODE_PREVIEW_LINES;
        const displayCode = isCodeExpanded ? codeToDisplay : truncateCode(codeToDisplay, previewLines);
        const showExpandButton = !hasCodeExampleSets && codeToDisplay.split('\n').length > previewLines;
        const canShowOutput = currentMode === 'code';
        const isSingleCodeVisible = !hasCodeExampleSets && (isCodeExpanded || !showExpandButton);

        const processedCode = isDiscreteTheoryMode
            ? displayCode
            : processCode(displayCode, module.id);
        const codeForDisplay = String(processedCode || '').replace(/^(?:\r?\n)+|(?:\r?\n)+$/g, '');

        const isAccentModule = accentModuleIds.has(module.id);
        const isStarterModule = module.id === 'java-basics';

        const cardThemeClasses = isAccentModule ? 'module-card--accent' : 'bg-white border-slate-200';
        const starterCardClass = isStarterModule ? 'starter-module-card' : '';
        const starterTitleClass = isStarterModule ? 'text-xl sm:text-2xl' : 'text-lg sm:text-xl';

        return `
            <div id="module-${module.id}" data-module-card="${module.id}" class="module-card ${cardThemeClasses} ${starterCardClass} rounded-xl p-4 sm:p-6 shadow-xl border hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <!-- Module Header -->
                <div class="flex flex-col sm:flex-row justify-between items-start gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <h3 class="${starterTitleClass} font-semibold text-indigo-600 leading-tight ${isAccentModule ? 'module-accent-text' : ''}">
                        ${localizedModule.title}
                    </h3>
                    <span class="px-2 sm:px-2.5 py-1 rounded-lg text-xs sm:text-sm font-medium ${getDifficultyColor(module.difficulty)} whitespace-nowrap self-start sm:self-auto difficulty-badge">
                        ${translateLiteral(module.difficulty, appState.language)}
                    </span>
                </div>

                ${isStarterModule ? `
                    <div class="starter-module-banner mb-3">
                        ${t('module.starterBanner')}
                    </div>
                ` : ''}

                <p class="text-slate-600 mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed ${isAccentModule ? 'module-accent-text' : ''}">${localizedModule.description}</p>

                <!-- Topics -->
                <div class="mb-3 sm:mb-4">
                    <h4 class="font-semibold mb-2 text-slate-800 text-sm">${t('module.topicsCovered')}</h4>
                    <div class="flex flex-wrap gap-1 sm:gap-1.5">
                        ${(localizedModule.topics || []).map(topic => `
                            <span class="px-2 py-0.5 sm:py-1 text-xs rounded-md font-medium bg-slate-100 text-slate-700 topic-badge">
                                ${topic}
                            </span>
                        `).join('')}
                    </div>
                </div>

                <!-- Code Example -->
                <div class="bg-slate-50 border-slate-200 rounded-lg border overflow-hidden mb-3 sm:mb-4">
                    <!-- Code Header -->
                    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 px-3 py-2 border-b border-slate-200 bg-slate-100">
                        <div class="flex items-center gap-1.5">
                            <span class="text-xs font-medium text-slate-600">${isDiscreteTheoryMode ? t('module.discreteTheory') : t('module.codeExample')}</span>
                            ${hasMultipleLanguages ? `
                                <span class="text-xs px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 font-medium">
                                    ${SUPPORTED_LANGUAGES[currentLanguage]?.icon} ${SUPPORTED_LANGUAGES[currentLanguage]?.name}
                                </span>
                            ` : ''}
                            ${currentMode === 'pseudocode' ? `
                                <span class="text-xs px-1.5 py-0.5 rounded bg-purple-100 text-purple-800 font-medium">
                                    📝 ${t('module.modePseudocode')}
                                </span>
                            ` : ''}
                            ${currentMode === 'discreteTheory' ? `
                                <span class="text-xs px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 font-medium">
                                    📘 ${t('module.theoryMode')}
                                </span>
                            ` : ''}
                        </div>

                        <div class="flex flex-wrap gap-1 w-full sm:w-auto">
                            <!-- Comments Toggle -->
                            <button onclick="toggleModuleComments('${module.id}')" class="text-xs px-2 py-1 rounded transition-all duration-200 font-medium shadow-sm hover:shadow-md flex-shrink-0 ${shouldShowComments(module.id) ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-gray-500 hover:bg-gray-600 text-white'}" title="${shouldShowComments(module.id) ? t('module.tooltipHideComments') : t('module.tooltipShowComments')}">
                                💬 ${shouldShowComments(module.id) ? t('module.commentsOn') : t('module.commentsOff')}
                            </button>

                            <!-- Language Selector -->
                            ${hasMultipleLanguages ? `
                                <select onchange="setModuleLanguage('${module.id}', this.value)" class="text-xs px-2 py-1 rounded bg-blue-500 hover:bg-blue-600 text-white border-0 font-medium" title="${t('module.tooltipSelectLanguage')}">
                                    ${Object.entries(SUPPORTED_LANGUAGES).map(([langKey, langInfo]) =>
            moduleCodeExamples && moduleCodeExamples[langKey] ? `
                                            <option value="${langKey}" ${currentLanguage === langKey ? 'selected' : ''} class="bg-white text-black">
                                                ${langInfo.icon} ${langInfo.name}
                                            </option>
                                        ` : ''
        ).join('')}
                                </select>
                            ` : ''}

                            <!-- Code Mode Selector -->
                            <select onchange="setModuleMode('${module.id}', this.value)" class="text-xs px-2 py-1 rounded border-0 font-medium ${currentMode === 'pseudocode' ? 'bg-purple-500 hover:bg-purple-600 text-white' : currentMode === 'discreteTheory' ? 'bg-amber-500 hover:bg-amber-600 text-white' : 'bg-indigo-500 hover:bg-indigo-600 text-white'}" title="${t('module.tooltipSelectMode')}">
                                ${availableModes.map((modeKey) => {
            const modeInfo = CODE_MODES[modeKey];
            const label = modeKey === 'discreteTheory'
                ? t('module.discreteModeLabel')
                : (modeKey === 'code' ? t('module.modeCode') : t('module.modePseudocode'));
            return `
                                    <option value="${modeKey}" ${currentMode === modeKey ? 'selected' : ''} class="bg-white text-black">
                                        ${modeInfo.icon} ${label}
                                    </option>
                                `;
        }).join('')}
                            </select>

                            <!-- Expand Button -->
                            ${showExpandButton ? `
                                <button onclick="toggleCodeExpansion('${module.id}')" class="text-xs px-2 py-1 rounded transition-all duration-200 font-medium shadow-sm hover:shadow-md flex-shrink-0 ${isCodeExpanded ? 'bg-slate-500 hover:bg-slate-600 text-white' : 'bg-emerald-500 hover:bg-emerald-600 text-white'}">
                                    ${isCodeExpanded ? t('module.collapse') : t('module.expand')}
                                </button>
                            ` : ''}
                        </div>
                    </div>

                    ${hasCodeExampleSets ? `
                        <div class="p-3 sm:p-4 space-y-3 module-example-set-stack">
                            <h5 class="text-xs sm:text-sm font-semibold text-slate-700">${t('module.examplesHeading')}</h5>
                            ${codeExampleSets.map((setItem) => {
            const setTitle = resolveLocalizedValue(setItem.title, appState.language);
            const setDescription = resolveLocalizedValue(setItem.description, appState.language);
            const setId = setItem.id;
            const setExpansionKey = getModuleExampleExpansionKey(module.id, setId);
            const setExpanded = appState.expandedCodeExamples.has(setExpansionKey);
            const setActive = activeExampleId === setId;
            const setCodeResolved = isDiscreteTheoryMode
                ? getDiscreteTheoryContent(localizedModule)
                : getCanonicalModuleCode(module.id, currentLanguage, setId).code;
            const setProcessedCode = isDiscreteTheoryMode
                ? setCodeResolved
                : processCode(setCodeResolved, module.id);
            const setCodeForDisplay = String(setProcessedCode || '').replace(/^(?:\r?\n)+|(?:\r?\n)+$/g, '');
            return `
                                <div class="module-example-item rounded-lg border ${setActive ? 'border-indigo-400 bg-indigo-50/50' : 'border-slate-200 bg-white'} overflow-hidden">
                                    <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 px-3 py-2">
                                        <div class="min-w-0">
                                            <p class="text-sm font-semibold text-slate-800">${escapeHtml(setTitle || resolveLocalizedValue(setItem.title, 'en') || setId)}</p>
                                            ${setDescription ? `<p class="text-xs text-slate-600 mt-0.5">${escapeHtml(setDescription)}</p>` : ''}
                                        </div>
                                        <div class="flex gap-1.5 flex-wrap">
                                            <button onclick="toggleExampleCodeExpansion('${module.id}', '${setId}')" class="text-xs px-2 py-1 rounded font-semibold ${setExpanded ? 'bg-slate-600 text-white' : 'bg-emerald-500 text-white hover:bg-emerald-600'}">${setExpanded ? t('module.hideExample') : t('module.showExample')}</button>
                                        </div>
                                    </div>
                                    ${setExpanded ? `
                                        <div class="px-3 pb-3 overflow-x-auto">
                                            <pre class="text-xs leading-relaxed"><code class="whitespace-pre-wrap font-mono">${escapeHtml(setCodeForDisplay)}</code></pre>
                                        </div>
                                        ${canShowOutput ? `
                                            <div class="px-3 pb-3">
                                                ${renderModuleOutputSection(module.id, setId)}
                                            </div>
                                        ` : ''}
                                    ` : ''}
                                </div>
                            `;
        }).join('')}
                        </div>
                    ` : `
                        <!-- Code Content -->
                        <div class="p-3 overflow-x-auto">
                            <pre class="text-xs leading-relaxed"><code class="whitespace-pre-wrap font-mono">${escapeHtml(codeForDisplay)}</code></pre>
                        </div>
                        ${canShowOutput && isSingleCodeVisible ? `
                            <div class="px-3 pb-3">
                                ${renderModuleOutputSection(module.id, 'single')}
                            </div>
                        ` : ''}
                    `}
                </div>

                <div class="bg-slate-50 border-slate-200 rounded-lg border p-3 sm:p-4 mb-3 sm:mb-4">
                    <h4 class="font-semibold mb-2 text-slate-800 text-sm">${t('module.definitionsHeading')}</h4>
                    <div class="space-y-2">
                        ${definitions.map((entry) => `
                            <div class="text-xs sm:text-sm text-slate-700 leading-relaxed">
                                <span class="font-semibold text-slate-900">${escapeHtml(entry.term)}:</span> ${escapeHtml(entry.definition)}
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Explanation -->
                <div class="bg-indigo-50 border-indigo-200 border-l-4 border-l-indigo-500 p-3 sm:p-4 mb-3 sm:mb-4 rounded-r-lg">
                    <div class="whitespace-pre-line text-xs sm:text-sm text-slate-800">${localizedModule.explanation}</div>
                </div>

                <!-- Resources -->
                <div class="mb-3 sm:mb-4">
                    <h4 class="font-semibold mb-2 text-slate-800 text-sm">${t('module.learningResources')}</h4>
                    <div class="space-y-1">
                        ${(localizedModule.resources || []).map(resource => `
                            <div class="text-indigo-600 hover:text-indigo-800 text-xs transition-colors duration-200 cursor-pointer">
                                • ${resource}
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Buttons -->
                <div class="space-y-2">
                    <button onclick="openQuiz('${module.id}')" class="w-full py-2 sm:py-2.5 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl text-xs sm:text-sm ${getLocalizedQuizData(module.id) && getLocalizedQuizData(module.id).parts[0].questions.length > 0 ? 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white hover:-translate-y-0.5' : 'bg-gradient-to-r from-slate-400 to-slate-500 text-white cursor-not-allowed'}" ${!getLocalizedQuizData(module.id) || getLocalizedQuizData(module.id).parts[0].questions.length === 0 ? 'disabled' : ''}>
                        ${getLocalizedQuizData(module.id) && getLocalizedQuizData(module.id).parts[0].questions.length > 0 ? translateLiteral('🧠 Take Quiz', appState.language) : translateLiteral('🔒 Quiz Coming Soon', appState.language)}
                    </button>
                    
                    <button onclick="toggleCompletion('${module.id}')" class="w-full py-2 sm:py-2.5 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl text-xs sm:text-sm ${isCompleted ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white hover:-translate-y-0.5' : 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white hover:-translate-y-0.5'}">
                        ${isCompleted ? translateLiteral('✅ Completed!', appState.language) : translateLiteral('📝 Mark as Complete', appState.language)}
                    </button>
                </div>
            </div>
        `;
    }).join('');

    renderInsights();
}

function getAchievementState() {
    const completed = appState.completedModules.size;
    const sortedLevels = getDynamicAchievementLevels().sort((a, b) => a.threshold - b.threshold);
    let current = sortedLevels[0];
    let next = null;

    for (let i = 0; i < sortedLevels.length; i++) {
        const level = sortedLevels[i];
        if (completed >= level.threshold) {
            current = level;
            next = sortedLevels[i + 1] || null;
        } else {
            next = level;
            break;
        }
    }

    return { completed, current, next };
}

function renderAchievements() {
    const card = document.getElementById('achievements-card');
    if (!card) return;

    const {
        completed,
        current,
        next
    } = getAchievementState();

    const badgeLabel = document.getElementById('achievement-badge-label');
    const badgeName = document.getElementById('achievement-badge-name');
    const badgeIcon = document.getElementById('achievement-badge-icon');
    const descriptionEl = document.getElementById('achievement-description');
    const progressBar = document.getElementById('achievement-progress-bar');
    const progressLabel = document.getElementById('achievement-progress-label');
    const totalLabel = document.getElementById('achievement-total-label');
    const nextHint = document.getElementById('achievement-next-hint');

    if (badgeLabel) badgeLabel.textContent = translateLiteral(current.label, appState.language);
    if (badgeName) badgeName.textContent = translateLiteral(current.label, appState.language);
    if (badgeIcon) badgeIcon.textContent = current.icon;
    if (descriptionEl) descriptionEl.textContent = translateLiteral(current.description, appState.language);
    const totalModules = getTotalModuleCount();
    if (totalLabel) totalLabel.textContent = translateLiteral(`${totalModules} total modules`, appState.language);

    const previousThreshold = current.threshold;
    const nextThreshold = next ? next.threshold : totalModules;
    const span = Math.max(nextThreshold - previousThreshold, 1);
    const modulesTowardNext = next ? Math.max(0, completed - previousThreshold) : span;
    const progressPercent = next ? Math.min((modulesTowardNext / span) * 100, 100) : 100;

    if (progressBar) {
        progressBar.style.width = `${progressPercent}%`;
    }

    if (progressLabel) {
        if (next) {
            progressLabel.textContent = translateLiteral(`${modulesTowardNext} / ${span} modules toward next badge`, appState.language);
        } else {
            progressLabel.textContent = translateLiteral(`All achievements unlocked – ${completed} modules completed!`, appState.language);
        }
    }

    if (nextHint) {
        nextHint.textContent = next
            ? translateLiteral(`Next: ${next.label} at ${next.threshold} modules`, appState.language)
            : translateLiteral('Legend achieved! Keep challenging yourself.', appState.language);
    }
}

function escapeHtml(text = '') {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function escapeRegExp(string = '') {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function highlightGlossaryText(text, searchTerm) {
    const safe = escapeHtml(text);
    if (!searchTerm.trim()) return safe;
    const pattern = new RegExp(`(${escapeRegExp(searchTerm.trim())})`, 'gi');
    return safe.replace(pattern, '<span class="glossary-highlight">$1</span>');
}

function renderGlossaryFilters() {
    const container = document.getElementById('glossary-categories');
    if (!container) return;
    const localizedTerms = getLocalizedGlossaryTerms();
    const categories = [
        'all',
        ...Array.from(new Set(localizedTerms.map(term => String(term.categoryKey || term.category || '').trim()).filter(Boolean))).sort((a, b) => a.localeCompare(b))
    ];
    if (!categories.includes(appState.glossaryCategory)) {
        appState.glossaryCategory = 'all';
    }

    container.innerHTML = categories.map(category => {
        const isActive = appState.glossaryCategory === category;
        const localizedCategory = localizedTerms.find(term => term.categoryKey && term.categoryKey.toLowerCase() === category.toLowerCase())?.categoryLabel;
        const label = category === 'all' ? translateLiteral('All Terms', appState.language) : (localizedCategory || translateLiteral(category, appState.language));
        return `<button type="button" class="glossary-chip ${isActive ? 'active' : ''}" data-category="${category}">${escapeHtml(label)}</button>`;
    }).join('');

    Array.from(container.querySelectorAll('button')).forEach(button => {
        button.addEventListener('click', () => {
            const selectedCategory = button.dataset.category || 'all';
            if (appState.glossaryCategory === selectedCategory) return;
            appState.glossaryCategory = selectedCategory;
            renderGlossary();
            saveToLocalStorage();
        });
    });
}

function renderGlossary() {
    renderGlossaryFilters();

    const searchTerm = appState.glossarySearch.trim().toLowerCase();
    const selectedCategory = appState.glossaryCategory;
    const localizedTerms = getLocalizedGlossaryTerms();
    const filteredTerms = localizedTerms.filter(term => {
        const termCategoryKey = String(term.categoryKey || term.category || '').toLowerCase();
        const matchesCategory = selectedCategory === 'all' || termCategoryKey === selectedCategory.toLowerCase();
        if (!matchesCategory) return false;
        if (!searchTerm) return true;
        return (
            term.term.toLowerCase().includes(searchTerm) ||
            term.definition.toLowerCase().includes(searchTerm) ||
            term.categoryLabel.toLowerCase().includes(searchTerm)
        );
    });

    const content = document.getElementById('glossary-content');
    const stats = document.getElementById('glossary-stats');
    if (stats) {
        const selectedCategoryLabel = selectedCategory === 'all'
            ? ''
            : (localizedTerms.find(term => String(term.categoryKey || '').toLowerCase() === selectedCategory.toLowerCase())?.categoryLabel || selectedCategory);
        const label = selectedCategory === 'all'
            ? translateLiteral('All categories', appState.language)
            : `${translateLiteral('Category:', appState.language)} ${selectedCategoryLabel}`;
        stats.innerHTML = `
            <span><strong>${filteredTerms.length}</strong> ${translateLiteral('of', appState.language)} <strong>${localizedTerms.length}</strong> ${translateLiteral('terms', appState.language)}</span>
            <span>${escapeHtml(label)}</span>
        `;
    }

    if (filteredTerms.length === 0) {
        content.innerHTML = `
            <div class="col-span-2 text-center py-12">
                <p class="text-lg text-slate-600">No terms found matching your search.</p>
            </div>
        `;
        return;
    }

    const highlightTerm = appState.glossarySearch.trim();
    content.innerHTML = filteredTerms.map(item => `
        <div class="p-4 rounded-xl border transition-all duration-200 hover:shadow-lg bg-slate-50 border-slate-200 hover:bg-white">
            <div class="flex justify-between items-start mb-2">
                <h4 class="font-semibold text-lg text-indigo-600">${highlightGlossaryText(item.term, highlightTerm)}</h4>
                <span class="text-xs px-2 py-1 rounded-full bg-indigo-100 text-indigo-700">
                    ${escapeHtml(item.categoryLabel)}
                </span>
            </div>
            <p class="text-sm leading-relaxed text-slate-800">${highlightGlossaryText(item.definition, highlightTerm)}</p>
        </div>
    `).join('');
}

function formatFlashcardText(text = '') {
    return escapeHtml(String(text || '')).replace(/\n/g, '<br>');
}

function renderFlashcard() {
    const session = appState.flashcardSession;
    const totalCards = session.length;
    const deck = getFlashcardDeck(appState.selectedFlashcardModule);
    const content = document.getElementById('flashcard-content');
    const counter = document.getElementById('flashcard-counter');
    const toggleButton = document.getElementById('toggle-flashcard-answer');
    const prevButton = document.getElementById('prev-flashcard');
    const nextButton = document.getElementById('next-flashcard');
    const sessionMeta = document.getElementById('flashcard-session-meta');
    const moduleLabel = document.getElementById('flashcard-module-label');
    const progressPill = document.getElementById('flashcard-progress-pill');
    const modePill = document.getElementById('flashcard-mode-pill');
    const sessionProgress = document.getElementById('flashcard-session-progress');
    const desiredLength = appState.flashcardSessionLength || FLASHCARD_SESSION_SIZE;
    const deckSize = deck.length;
    const flashcardsModal = document.getElementById('flashcards-modal');
    if (flashcardsModal) {
        flashcardsModal.classList.toggle('has-active-flashcard-session', totalCards > 0);
    }
    if (!content || !counter || !toggleButton || !prevButton || !nextButton) {
        return;
    }

    const selectedTopicDeckLabel = isFlashcardTopicDeck(appState.selectedFlashcardModule)
        ? getFlashcardTopicDeckLabel(appState.selectedFlashcardModule, appState.language)
        : '';
    const selectedModule = modules.find((module) => module.id === appState.selectedFlashcardModule);
    const selectedModuleLocalized = selectedModule ? getLocalizedModule(selectedModule) : null;
    const selectedModuleLabel = appState.selectedFlashcardModule === 'all'
        ? t('flashcards.deck.all')
        : (selectedTopicDeckLabel || selectedModuleLocalized?.title || selectedModule?.title || translateLiteral('Custom deck', appState.language));
    if (moduleLabel) {
        moduleLabel.textContent = selectedModuleLabel;
    }

    if (!totalCards) {
        counter.textContent = translateLiteral('No active session', appState.language);
        content.innerHTML = `
            <div class="flashcard-face flashcard-face-empty text-center text-slate-600">
                <div class="flashcard-face-header">
                    <span class="flashcard-tag">${translateLiteral('Ready', appState.language)}</span>
                </div>
                <p class="text-lg font-semibold mb-2">${translateLiteral('Choose a module above', appState.language)}</p>
                <p class="text-sm">${translateLiteral(`Start a ${desiredLength}-card session to load flashcards.`, appState.language)}</p>
            </div>
        `;
        toggleButton.textContent = translateLiteral('Show Answer', appState.language);
        toggleButton.disabled = true;
        if (progressPill) {
            progressPill.textContent = `0 / ${desiredLength} ${translateLiteral('in session', appState.language)}`;
        }
        if (modePill) {
            modePill.textContent = translateLiteral('Tap to flip', appState.language);
        }
        if (sessionProgress) {
            sessionProgress.style.width = '0%';
        }
        prevButton.disabled = true;
        nextButton.disabled = true;
        prevButton.classList.add('disabled:bg-slate-300', 'disabled:cursor-not-allowed');
        prevButton.classList.remove('hover:-translate-y-0.5');
        nextButton.classList.add('disabled:bg-slate-300', 'disabled:cursor-not-allowed');
        nextButton.classList.remove('hover:-translate-y-0.5');
        if (sessionMeta) {
            sessionMeta.textContent = deckSize
                ? translateLiteral(`${deckSize} cards available. Start a session to study them in batches of ${desiredLength}.`, appState.language)
                : (isFlashcardTopicDeck(appState.selectedFlashcardModule)
                    ? t('flashcards.deck.topic.empty')
                    : translateLiteral('No cards available for this module yet.', appState.language));
        }
        return;
    }

    toggleButton.disabled = false;
    const card = session[appState.currentFlashcard];
    counter.textContent = translateLiteral(`Card ${appState.currentFlashcard + 1} of ${totalCards}`, appState.language);
    if (progressPill) {
        progressPill.textContent = `${appState.currentFlashcard + 1} / ${totalCards} ${translateLiteral('in session', appState.language)}`;
    }
    if (sessionProgress) {
        const progressPercent = Math.max(0, Math.min(100, ((appState.currentFlashcard + 1) / totalCards) * 100));
        sessionProgress.style.width = `${progressPercent}%`;
    }

    if (sessionMeta) {
        const repeats = deckSize && deckSize < desiredLength;
        sessionMeta.textContent = `${totalCards} card session • ${deckSize} cards in deck${repeats ? ` (deck repeats to reach ${desiredLength})` : ''}`;
    }

    if (!appState.showFlashcardAnswer) {
        content.innerHTML = `
            <div class="flashcard-face flashcard-face-question text-center">
                <div class="flashcard-face-header">
                    <span class="flashcard-tag">${translateLiteral('Question', appState.language)}</span>
                    <span class="flashcard-mini">${translateLiteral('Think first', appState.language)}</span>
                </div>
                <p class="flashcard-main-text">${formatFlashcardText(card.question)}</p>
                <p class="flashcard-hint">${translateLiteral('Click to reveal answer', appState.language)}</p>
            </div>
        `;
        toggleButton.textContent = translateLiteral('Show Answer', appState.language);
        if (modePill) {
            modePill.textContent = translateLiteral('Question side', appState.language);
        }
    } else {
        content.innerHTML = `
            <div class="flashcard-face flashcard-face-answer text-center">
                <div class="flashcard-face-header">
                    <span class="flashcard-tag flashcard-tag-answer">${translateLiteral('Answer', appState.language)}</span>
                    <span class="flashcard-mini">${translateLiteral('Verify your reasoning', appState.language)}</span>
                </div>
                <div class="flashcard-main-text flashcard-answer-text">${formatFlashcardText(card.answer)}</div>
                <p class="flashcard-hint">${translateLiteral('Click to hide answer', appState.language)}</p>
            </div>
        `;
        toggleButton.textContent = translateLiteral('Hide Answer', appState.language);
        if (modePill) {
            modePill.textContent = translateLiteral('Answer side', appState.language);
        }
    }

    prevButton.disabled = appState.currentFlashcard === 0;
    nextButton.disabled = appState.currentFlashcard === totalCards - 1;

    if (prevButton.disabled) {
        prevButton.classList.add('disabled:bg-slate-300', 'disabled:cursor-not-allowed');
        prevButton.classList.remove('hover:-translate-y-0.5');
    } else {
        prevButton.classList.remove('disabled:bg-slate-300', 'disabled:cursor-not-allowed');
        prevButton.classList.add('hover:-translate-y-0.5');
    }

    if (nextButton.disabled) {
        nextButton.classList.add('disabled:bg-slate-300', 'disabled:cursor-not-allowed');
        nextButton.classList.remove('hover:-translate-y-0.5');
    } else {
        nextButton.classList.remove('disabled:bg-slate-300', 'disabled:cursor-not-allowed');
        nextButton.classList.add('hover:-translate-y-0.5');
    }
}

// =================================
// EVENT HANDLERS
// =================================

// Module Functions
function toggleCodeExpansion(moduleId) {
    if (appState.expandedCode.has(moduleId)) {
        appState.expandedCode.delete(moduleId);
        const panelKey = getModuleOutputPanelKey(moduleId, 'single');
        appState.expandedOutputs.delete(panelKey);
        moduleOutputState.delete(panelKey);
    } else {
        appState.expandedCode.add(moduleId);
    }
    renderModules();
    saveToLocalStorage();
}

function toggleModuleComments(moduleId) {
    const currentSetting = appState.moduleComments.get(moduleId);
    appState.moduleComments.set(moduleId, currentSetting === undefined ? !appState.showComments : !currentSetting);
    renderModules();
    saveToLocalStorage();
}

function setModuleLanguage(moduleId, language) {
    const module = getModuleById(moduleId);
    const localizedModule = appState.language === 'es' ? getLocalizedModule(module) : null;
    const availableCodeExamples = getCodeExamplesForModuleContext(moduleId, localizedModule);
    if (!module || !availableCodeExamples || !availableCodeExamples[language]) return;
    appState.moduleLanguages.set(moduleId, language);
    clearModuleOutputState(moduleId);
    if (typeof window.syncPlaygroundWithModule === 'function') {
        window.syncPlaygroundWithModule(moduleId);
    }
    renderModules();
    saveToLocalStorage();
}

function setModuleExample(moduleId, exampleId) {
    const module = getModuleById(moduleId);
    if (!module) return;
    const localizedModule = appState.language === 'es' ? getLocalizedModule(module) : null;
    const availableSets = getModuleCodeExampleSets(moduleId, localizedModule);
    if (!availableSets.some((set) => set.id === exampleId)) return;

    // Preview should always be visible: focus the selected set and open its code panel.
    availableSets.forEach((set) => {
        const key = getModuleExampleExpansionKey(moduleId, set.id);
        if (set.id === exampleId) {
            appState.expandedCodeExamples.add(key);
        } else {
            appState.expandedCodeExamples.delete(key);
        }
    });

    appState.moduleExampleSelections.set(moduleId, exampleId);
    clearModuleOutputState(moduleId);
    if (typeof window.syncPlaygroundWithModule === 'function') {
        window.syncPlaygroundWithModule(moduleId);
    }
    renderModules();
    saveToLocalStorage();
}

function toggleExampleCodeExpansion(moduleId, exampleId) {
    const module = getModuleById(moduleId);
    if (!module) return;
    const localizedModule = appState.language === 'es' ? getLocalizedModule(module) : null;
    const availableSets = getModuleCodeExampleSets(moduleId, localizedModule);
    if (!availableSets.some((set) => set.id === exampleId)) return;

    // Keep one source of truth: opening/hiding an example also selects it as the active set.
    appState.moduleExampleSelections.set(moduleId, exampleId);

    const expansionKey = getModuleExampleExpansionKey(moduleId, exampleId);
    if (appState.expandedCodeExamples.has(expansionKey)) {
        appState.expandedCodeExamples.delete(expansionKey);
        const panelKey = getModuleOutputPanelKey(moduleId, exampleId);
        appState.expandedOutputs.delete(panelKey);
        moduleOutputState.delete(panelKey);
    } else {
        appState.expandedCodeExamples.add(expansionKey);
    }

    if (typeof window.syncPlaygroundWithModule === 'function') {
        window.syncPlaygroundWithModule(moduleId);
    }
    renderModules();
    saveToLocalStorage();
}

async function toggleModuleOutputPanel(moduleId, exampleId = 'single') {
    const module = getModuleById(moduleId);
    if (!module) return;
    if (getModuleMode(moduleId) !== 'code') return;

    const normalizedExampleId = exampleId || 'single';
    const panelKey = getModuleOutputPanelKey(moduleId, normalizedExampleId);
    if (appState.expandedOutputs.has(panelKey)) {
        appState.expandedOutputs.delete(panelKey);
        renderModules();
        return;
    }

    appState.expandedOutputs.add(panelKey);
    moduleOutputState.set(panelKey, {
        status: 'running',
        source: 'fallback',
        text: t('module.outputRunning')
    });
    renderModules();

    const language = getModuleLanguage(moduleId);
    const resolvedExampleId = normalizedExampleId === 'single' ? '' : normalizedExampleId;
    const result = await runModuleSnippetForOutput({
        moduleId,
        language,
        exampleId: resolvedExampleId
    });
    moduleOutputState.set(panelKey, {
        status: 'ready',
        source: result.source || 'fallback',
        text: result.text || ''
    });
    renderModules();
}

function setModuleMode(moduleId, mode) {
    if (!getAvailableModeKeys(moduleId).includes(mode)) return;
    appState.moduleModes.set(moduleId, mode);
    clearModuleOutputState(moduleId);
    renderModules();
    saveToLocalStorage();
}

function toggleCompletion(moduleId) {
    if (appState.completedModules.has(moduleId)) {
        appState.completedModules.delete(moduleId);
    } else {
        appState.completedModules.add(moduleId);
    }
    updateProgress();
    renderModules();
    saveToLocalStorage();
}

// Modal Functions
function openSettings() {
    document.getElementById('settings-modal').style.display = 'flex';
}

function closeSettings() {
    document.getElementById('settings-modal').style.display = 'none';
}

function openGlossary() {
    document.getElementById('glossary-modal').style.display = 'flex';
    renderGlossary();
}

function closeGlossary() {
    document.getElementById('glossary-modal').style.display = 'none';
}

function openFlashcards() {
    document.getElementById('flashcards-modal').style.display = 'flex';
    populateFlashcardModuleSelect();
    const moduleSelect = document.getElementById('flashcard-module-select');
    if (moduleSelect) {
        moduleSelect.value = appState.selectedFlashcardModule;
    }
    if (!appState.flashcardSession.length) {
        refreshFlashcardSession(appState.selectedFlashcardModule, { persist: false });
    } else {
        renderFlashcard();
    }
}

function closeFlashcards() {
    document.getElementById('flashcards-modal').style.display = 'none';
}

// Flashcard Functions
function prevFlashcard() {
    if (!appState.flashcardSession.length) return;
    if (appState.currentFlashcard > 0) {
        appState.currentFlashcard--;
        appState.showFlashcardAnswer = false;
        renderFlashcard();
        saveToLocalStorage();
    }
}

function nextFlashcard() {
    if (!appState.flashcardSession.length) return;
    if (appState.currentFlashcard < appState.flashcardSession.length - 1) {
        appState.currentFlashcard++;
        appState.showFlashcardAnswer = false;
        renderFlashcard();
        saveToLocalStorage();
    }
}

function randomFlashcard() {
    if (!appState.flashcardSession.length) return;
    appState.currentFlashcard = Math.floor(Math.random() * appState.flashcardSession.length);
    appState.showFlashcardAnswer = false;
    renderFlashcard();
    saveToLocalStorage();
}

function toggleFlashcardAnswer() {
    if (!appState.flashcardSession.length) return;
    appState.showFlashcardAnswer = !appState.showFlashcardAnswer;
    renderFlashcard();
}

function refreshFlashcardSession(moduleId = appState.selectedFlashcardModule, { persist = true } = {}) {
    appState.selectedFlashcardModule = moduleId;
    if (!isFlashcardModuleAccessible(moduleId)) {
        appState.flashcardSession = [];
        appState.currentFlashcard = 0;
        appState.showFlashcardAnswer = false;
        renderFlashcard();
        const meta = document.getElementById('flashcard-session-meta');
        if (meta && moduleId !== 'all' && moduleId !== 'general') {
            meta.textContent = t('flashcards.deck.module.locked');
        }
        if (persist) saveToLocalStorage();
        return;
    }
    const deck = getFlashcardDeck(moduleId);

    if (!deck.length) {
        appState.flashcardSession = [];
        appState.currentFlashcard = 0;
        appState.showFlashcardAnswer = false;
        renderFlashcard();
        const meta = document.getElementById('flashcard-session-meta');
        if (meta && isFlashcardTopicDeck(moduleId)) {
            meta.textContent = t('flashcards.deck.topic.empty');
        }
        if (persist) saveToLocalStorage();
        return;
    }

    const desiredLength = appState.flashcardSessionLength || FLASHCARD_SESSION_SIZE;
    const session = [];
    let pool = shuffleArray(deck);

    while (session.length < desiredLength) {
        if (!pool.length) {
            pool = shuffleArray(deck);
        }
        session.push(pool.shift());
    }

    appState.flashcardSession = session.slice(0, desiredLength);
    appState.currentFlashcard = 0;
    appState.showFlashcardAnswer = false;
    renderFlashcard();
    if (persist) saveToLocalStorage();
}

function populateFlashcardModuleSelect() {
    const select = document.getElementById('flashcard-module-select');
    if (!select) return;
    const previousValue = select.value || appState.selectedFlashcardModule || 'all';
    const localizedModuleMap = new Map(getLocalizedModules().map((module) => [module.id, module]));
    const options = [`<option value="all">${t('flashcards.deck.all')}</option>`];

    const topicOptions = FLASHCARD_TOPIC_DECKS.map((deck) => {
        const unlockedModules = getAccessibleTopicDeckModules(deck.id);
        const hasCards = unlockedModules.some((module) => isFlashcardModuleAccessible(module.id));
        const lockLabel = hasCards ? '' : ` (${t('flashcards.deck.topic.locked')})`;
        return `<option value="${deck.id}" ${hasCards ? '' : 'disabled'}>${escapeHtml(t(deck.titleKey))}${escapeHtml(lockLabel)}</option>`;
    }).join('');
    if (topicOptions) {
        options.push(`<optgroup label="${escapeHtml(t('flashcards.deck.topicGroup'))}">${topicOptions}</optgroup>`);
    }

    const moduleOptions = [];
    getOrderedModules().forEach((module, index) => {
        const localizedModule = localizedModuleMap.get(module.id) || module;
        const unlocked = isFlashcardModuleAccessible(module.id);
        const lockLabel = unlocked ? '' : ` (${t('flashcards.deck.module.locked')})`;
        moduleOptions.push(`<option value="${module.id}" ${unlocked ? '' : 'disabled'}>${index + 1}. ${localizedModule.title}${escapeHtml(lockLabel)}</option>`);
    });
    options.push(`<optgroup label="${escapeHtml(t('flashcards.deck.moduleGroup'))}">${moduleOptions.join('')}</optgroup>`);
    select.innerHTML = options.join('');
    const enabledValues = new Set(Array.from(select.options).filter((option) => !option.disabled).map((option) => option.value));
    const valueToSet = enabledValues.has(previousValue) ? previousValue : 'all';
    select.value = valueToSet;
    appState.selectedFlashcardModule = valueToSet;
}

// Quiz Functions
function openQuiz(moduleId) {
    const quiz = getLocalizedQuizData(moduleId);
    if (!quiz || !quiz.parts[0].questions.length) return;

    appState.currentQuiz = {
        moduleId,
        questions: quiz.parts[0].questions,
        currentQuestion: 0,
        answers: new Array(quiz.parts[0].questions.length).fill(null),
        showResults: false,
        score: 0
    };

    document.getElementById('quiz-modal').style.display = 'flex';
    renderQuiz();
}

function closeQuiz() {
    document.getElementById('quiz-modal').style.display = 'none';
    appState.currentQuiz = null;
}

function renderQuiz() {
    if (!appState.currentQuiz) return;

    const module = modules.find(m => m.id === appState.currentQuiz.moduleId);
    const localizedModule = getLocalizedModule(module);
    const title = document.getElementById('quiz-title');
    const content = document.getElementById('quiz-content');

    title.textContent = translateLiteral(`🧠 Quiz: ${localizedModule?.title || 'Quiz'}`, appState.language);

    if (!appState.currentQuiz.showResults) {
        const answeredCount = appState.currentQuiz.answers.filter(a => a !== null && a !== undefined).length;
        const totalCount = appState.currentQuiz.questions.length;
        const selected = appState.currentQuiz.answers[appState.currentQuiz.currentQuestion];

        content.innerHTML = `
            <div class="mb-6">
                <div class="flex justify-between items-center mb-4">
                    <span class="text-sm quiz-progress-label">
                        ${translateLiteral(`Question ${appState.currentQuiz.currentQuestion + 1} of ${totalCount} • ${answeredCount}/${totalCount} answered`, appState.language)}
                    </span>
                    <div class="h-2 bg-slate-800 rounded-full flex-1 ml-4 overflow-hidden border border-white/10">
                        <div class="h-full bg-indigo-500 transition-all duration-300" style="width: ${((appState.currentQuiz.currentQuestion + 1) / totalCount) * 100}%"></div>
                    </div>
                </div>
                <h4 class="text-xl font-semibold mb-6 text-white">
                    ${appState.currentQuiz.questions[appState.currentQuiz.currentQuestion].question}
                </h4>
            </div>

            <div class="space-y-3 mb-8">
                ${appState.currentQuiz.questions[appState.currentQuiz.currentQuestion].options.map((option, index) => `
                    <button onclick="answerQuestion(${index})" class="w-full p-4 text-left rounded-xl border-2 transition-all duration-200 quiz-option text-white ${appState.currentQuiz.answers[appState.currentQuiz.currentQuestion] === index ? 'border-indigo-400 bg-slate-800/80' : 'border-white/15 bg-slate-900/80 hover:border-indigo-300'}">
                        <span class="font-medium text-white">
                            ${String.fromCharCode(65 + index)}. ${option}
                        </span>
                    </button>
                `).join('')}
            </div>

            <div class="text-sm text-slate-200 mb-4">
                ${selected === null || selected === undefined
                    ? translateLiteral('Pick an answer to continue.', appState.language)
                    : translateLiteral('Answer selected.', appState.language)}
            </div>

            <div class="flex justify-between">
                <button onclick="prevQuestion()" ${appState.currentQuiz.currentQuestion === 0 ? 'disabled' : ''} class="px-6 py-3 rounded-xl font-medium transition-all duration-200 quiz-nav-button secondary ${appState.currentQuiz.currentQuestion === 0 ? '' : ''}">
                    ${translateLiteral('Previous', appState.language)}
                </button>

                <button onclick="nextQuestion()" ${appState.currentQuiz.answers[appState.currentQuiz.currentQuestion] === null ? 'disabled' : ''} class="px-6 py-3 rounded-xl font-medium transition-all duration-200 quiz-nav-button primary">
                    ${appState.currentQuiz.currentQuestion === appState.currentQuiz.questions.length - 1
                        ? translateLiteral('Finish', appState.language)
                        : translateLiteral('Next', appState.language)}
                </button>
            </div>
        `;
    } else {
        content.innerHTML = `
            <div class="text-center">
                <div class="mb-6">
                    <div class="text-6xl mb-4">
                        ${appState.currentQuiz.score === appState.currentQuiz.questions.length ? '🎉' :
                appState.currentQuiz.score >= appState.currentQuiz.questions.length * 0.7 ? '👏' : '📚'}
                    </div>
                    <h4 class="text-3xl font-bold mb-2 text-indigo-600">${translateLiteral('Quiz Complete!', appState.language)}</h4>
                    <p class="text-xl text-slate-800">
                        ${translateLiteral(`You scored ${appState.currentQuiz.score} out of ${appState.currentQuiz.questions.length}`, appState.language)}
                    </p>
                    <p class="text-lg text-slate-600">
                        (${Math.round((appState.currentQuiz.score / appState.currentQuiz.questions.length) * 100)}%)
                    </p>
                </div>

                <div class="space-y-4 mb-8">
                    ${appState.currentQuiz.questions.map((question, index) => `
                        <div class="text-left p-4 rounded-xl border ${appState.currentQuiz.answers[index] === question.correct ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}">
                            <div class="flex items-start gap-3">
                                <span class="text-xl">
                                    ${appState.currentQuiz.answers[index] === question.correct ? '✅' : '❌'}
                                </span>
                                <div class="flex-1">
                                    <p class="font-medium mb-2 text-slate-800">${question.question}</p>
                                    <p class="text-sm text-slate-600">
                                        <strong>${translateLiteral('Your answer:', appState.language)}</strong> ${question.options[appState.currentQuiz.answers[index]]}
                                    </p>
                                    ${appState.currentQuiz.answers[index] !== question.correct ? `
                                        <p class="text-sm text-slate-600">
                                            <strong>${translateLiteral('Correct answer:', appState.language)}</strong> ${question.options[question.correct]}
                                        </p>
                                    ` : ''}
                                    <p class="text-sm mt-2 text-slate-800">
                                        <strong>${translateLiteral('Explanation:', appState.language)}</strong> ${question.explanation}
                                    </p>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <div class="flex gap-4 justify-center">
                    <button onclick="restartQuiz()" class="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                        ${translateLiteral('🔄 Retake Quiz', appState.language)}
                    </button>
                    <button onclick="closeQuiz()" class="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                        ${translateLiteral('Close', appState.language)}
                    </button>
                </div>
            </div>
        `;
    }
}

function answerQuestion(answerIndex) {
    if (!appState.currentQuiz) return;
    appState.currentQuiz.answers[appState.currentQuiz.currentQuestion] = answerIndex;
    renderQuiz();
}

function nextQuestion() {
    if (!appState.currentQuiz) return;

    if (appState.currentQuiz.currentQuestion < appState.currentQuiz.questions.length - 1) {
        appState.currentQuiz.currentQuestion++;
        renderQuiz();
    } else {
        // Calculate score and show results only if all answered
        const allAnswered = appState.currentQuiz.answers.every(a => a !== null && a !== undefined);
        if (!allAnswered) return;

        const score = appState.currentQuiz.answers.reduce((acc, answer, index) => {
            return acc + (answer === appState.currentQuiz.questions[index].correct ? 1 : 0);
        }, 0);

        appState.currentQuiz.showResults = true;
        appState.currentQuiz.score = score;
        markQuizCompleted(appState.currentQuiz.moduleId);
        renderQuiz();
    }
}

function prevQuestion() {
    if (!appState.currentQuiz) return;

    if (appState.currentQuiz.currentQuestion > 0) {
        appState.currentQuiz.currentQuestion--;
        renderQuiz();
    }
}

function restartQuiz() {
    if (!appState.currentQuiz) return;

    appState.currentQuiz.currentQuestion = 0;
    appState.currentQuiz.answers = new Array(appState.currentQuiz.questions.length).fill(null);
    appState.currentQuiz.showResults = false;
    appState.currentQuiz.score = 0;
    renderQuiz();
}

// Other Functions
function resetProgress() {
    if (confirm(translateLiteral('Are you sure you want to reset all progress?', appState.language))) {
        appState.completedModules.clear();
        appState.completedQuizzes.clear();
        appState.expandedCode.clear();
        appState.expandedCodeExamples.clear();
        appState.expandedOutputs.clear();
        appState.moduleComments.clear();
        appState.moduleLanguages.clear();
        appState.moduleModes.clear();
        appState.moduleExampleSelections.clear();
        moduleOutputCache.clear();
        moduleOutputState.clear();
        moduleOutputInFlight.clear();
        appState.searchTerm = '';
        appState.difficultyFilter = 'all';
        appState.categoryFilter = 'all';
        appState.glossarySearch = '';
        appState.glossaryCategory = 'all';
        appState.currentFlashcard = 0;
        appState.showFlashcardAnswer = false;
        appState.currentQuiz = null;
        appState.selectedFlashcardModule = 'all';
        appState.flashcardSession = [];
        appState.dailyChallengeId = null;
        appState.dailyChallengeDate = null;
        appState.studyTipId = null;
        appState.collapsedSections = { ...DEFAULT_COLLAPSED_SECTIONS };

        // Reset UI
        document.getElementById('search-input').value = '';
        document.getElementById('difficulty-filter').value = 'all';
        document.getElementById('glossary-search').value = '';
        updateTopicFocusButtons();

        updateProgress();
        renderModules();
        populateFlashcardModuleSelect();
        refreshFlashcardSession('all', { persist: false });
        renderDailyChallenge(true);
        renderStudyTip(true);
        renderSectionCollapsibles();
        saveToLocalStorage();
    }
}

// =================================
// INITIALIZATION
// =================================

function init() {
    // Load saved state
    loadFromLocalStorage();
    accountProfile = loadAccountProfile();
    studyPlanState = loadStudyPlan();
    notesDraft = loadNotesDraft();

    // Apply loaded state to UI
    applyFontScale();
    applyTheme();
    applyAccent();
    applyCardDepth();
    applyCompactLayout();
    applyReduceMotion();
    applyHighContrast();
    updateDarkMode();
    updateCommentsToggle();
    updateHideCompletedToggle();
    updateCompactLayoutToggle();
    updateReduceMotionToggle();
    updateHighContrastToggle();
    updateProgress();
    renderModules();
    renderDailyChallenge();
    renderStudyTip();
    initStudyPlan();
    initAccount();
    initNotes();
    initNotesLibrary();
    initBooksLibrary();
    initInterviewExamples();
    initDSPlayground();
    initSupport();
    initPlayground();
    initIOSOverscrollLock();

    // Set initial form values
    document.getElementById('search-input').value = appState.searchTerm;
    document.getElementById('difficulty-filter').value = appState.difficultyFilter;
    updateTopicFocusButtons();
    appState.scrollY = window.scrollY || 0;
    updateHeaderShrink();

    // Add event listeners
    document.getElementById('settings-btn').addEventListener('click', openSettings);
    document.getElementById('close-settings').addEventListener('click', closeSettings);
    document.getElementById('save-settings').addEventListener('click', closeSettings);

    document.getElementById('glossary-btn').addEventListener('click', openGlossary);
    document.getElementById('close-glossary').addEventListener('click', closeGlossary);

    document.getElementById('flashcards-btn').addEventListener('click', openFlashcards);
    document.getElementById('close-flashcards').addEventListener('click', closeFlashcards);

    document.getElementById('close-quiz').addEventListener('click', closeQuiz);

    document.getElementById('reset-btn').addEventListener('click', resetProgress);

    const siteGuideButton = document.getElementById('site-guide-helper-btn');
    const closeSiteGuideButton = document.getElementById('close-site-guide');
    const closeSiteGuideFooterButton = document.getElementById('close-site-guide-footer');
    const insightAuthOpenButton = document.getElementById('insights-auth-open-account');
    if (siteGuideButton) siteGuideButton.addEventListener('click', openSiteGuideModal);
    if (closeSiteGuideButton) closeSiteGuideButton.addEventListener('click', closeSiteGuideModal);
    if (closeSiteGuideFooterButton) closeSiteGuideFooterButton.addEventListener('click', closeSiteGuideModal);
    if (insightAuthOpenButton) insightAuthOpenButton.addEventListener('click', openAccountModal);

    const studyToggleButton = document.getElementById('study-session-toggle');
    if (studyToggleButton) {
        studyToggleButton.addEventListener('click', toggleManualStudySession);
    }

    // Dark mode toggle
    document.getElementById('dark-mode-toggle').addEventListener('click', () => {
        appState.darkMode = !appState.darkMode;
        updateDarkMode();
        saveToLocalStorage();
    });

    // Comments toggle
    document.getElementById('comments-toggle').addEventListener('click', () => {
        appState.showComments = !appState.showComments;
        updateCommentsToggle();
        renderModules();
        saveToLocalStorage();
    });

    const hideCompletedToggle = document.getElementById('hide-completed-toggle');
    if (hideCompletedToggle) {
        hideCompletedToggle.addEventListener('click', () => {
            appState.hideCompletedModules = !appState.hideCompletedModules;
            updateHideCompletedToggle();
            renderModules();
            saveToLocalStorage();
        });
    }

    const compactLayoutToggle = document.getElementById('compact-layout-toggle');
    if (compactLayoutToggle) {
        compactLayoutToggle.addEventListener('click', () => {
            appState.compactLayout = !appState.compactLayout;
            updateCompactLayoutToggle();
            applyCompactLayout();
            saveToLocalStorage();
        });
    }

    const reduceMotionToggle = document.getElementById('reduce-motion-toggle');
    if (reduceMotionToggle) {
        reduceMotionToggle.addEventListener('click', () => {
            appState.reduceMotion = !appState.reduceMotion;
            updateReduceMotionToggle();
            applyReduceMotion();
            saveToLocalStorage();
        });
    }

    const highContrastToggle = document.getElementById('high-contrast-toggle');
    if (highContrastToggle) {
        highContrastToggle.addEventListener('click', () => {
            appState.highContrast = !appState.highContrast;
            updateHighContrastToggle();
            applyHighContrast();
            saveToLocalStorage();
        });
    }

    // Search and filter
    document.getElementById('search-input').addEventListener('input', (e) => {
        appState.searchTerm = e.target.value;
        renderModules();
        saveToLocalStorage();
    });

    document.getElementById('difficulty-filter').addEventListener('change', (e) => {
        appState.difficultyFilter = e.target.value;
        renderModules();
        saveToLocalStorage();
    });

    document.querySelectorAll('[data-topic-filter]').forEach((button) => {
        button.addEventListener('click', () => {
            appState.categoryFilter = button.getAttribute('data-topic-filter') || 'all';
            updateTopicFocusButtons();
            renderModules();
            saveToLocalStorage();
        });
    });

    // Glossary search
    document.getElementById('glossary-search').addEventListener('input', (e) => {
        appState.glossarySearch = e.target.value;
        renderGlossary();
    });

    // Flashcard event listeners
    document.getElementById('prev-flashcard').addEventListener('click', prevFlashcard);
    document.getElementById('next-flashcard').addEventListener('click', nextFlashcard);
    document.getElementById('random-flashcard').addEventListener('click', randomFlashcard);
    document.getElementById('toggle-flashcard-answer').addEventListener('click', toggleFlashcardAnswer);
    document.getElementById('flashcard-content').addEventListener('click', toggleFlashcardAnswer);
    populateFlashcardModuleSelect();
    const flashcardModuleSelect = document.getElementById('flashcard-module-select');
    if (flashcardModuleSelect) {
        const hasOption = Array.from(flashcardModuleSelect.options).some(option => option.value === appState.selectedFlashcardModule);
        if (!hasOption) {
            appState.selectedFlashcardModule = 'all';
        }
        flashcardModuleSelect.value = appState.selectedFlashcardModule;
        flashcardModuleSelect.addEventListener('change', (e) => {
            appState.selectedFlashcardModule = e.target.value;
            refreshFlashcardSession(appState.selectedFlashcardModule);
        });
    }
    const flashcardStartButton = document.getElementById('flashcard-start-session');
    if (flashcardStartButton) {
        flashcardStartButton.addEventListener('click', () => {
            refreshFlashcardSession(appState.selectedFlashcardModule);
        });
    }

    // Scroll event for header shrinking
    window.addEventListener('scroll', () => {
        appState.scrollY = window.scrollY;
        updateHeaderShrink();
    });

    // Modal backdrop clicks
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('fixed') && e.target.classList.contains('inset-0')) {
            if (e.target.id === 'settings-modal') closeSettings();
            if (e.target.id === 'glossary-modal') closeGlossary();
            if (e.target.id === 'flashcards-modal') closeFlashcards();
            if (e.target.id === 'quiz-modal') closeQuiz();
            if (e.target.id === 'study-plan-modal') closeStudyPlanModal();
            if (e.target.id === 'account-modal') closeAccountModal();
            if (e.target.id === 'support-modal') closeSupportModal();
            if (e.target.id === 'interactive-quiz-modal') closeInteractiveQuizLibrary();
            if (e.target.id === 'site-guide-modal') closeSiteGuideModal();
            if (e.target.id === 'book-reader-modal') closeBookReaderModal();
        }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Escape key to close modals
        if (e.key === 'Escape') {
            closeSettings();
            closeGlossary();
            closeFlashcards();
            closeQuiz();
            closeSiteGuideModal();
            closeBookReaderModal();
        }

        // Arrow keys for flashcards (when flashcard modal is open)
        if (document.getElementById('flashcards-modal').style.display === 'flex') {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                prevFlashcard();
            }
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                nextFlashcard();
            }
            if (e.key === ' ') {
                e.preventDefault();
                toggleFlashcardAnswer();
            }
        }
    });

    updateStudyTrackerUI();
    if (!studyTimer.isActive) {
        startStudySession();
    }

    const themeSelect = document.getElementById('theme-select');
    if (themeSelect) {
        themeSelect.value = appState.theme;
        themeSelect.addEventListener('change', (e) => {
            appState.theme = e.target.value;
            applyTheme();
            saveToLocalStorage();
        });
    }

    const accentSelect = document.getElementById('accent-select');
    if (accentSelect) {
        accentSelect.value = appState.accent;
        accentSelect.addEventListener('change', (e) => {
            const nextAccent = e.target.value;
            appState.accent = ACCENT_OPTIONS.includes(nextAccent) ? nextAccent : 'indigo';
            applyAccent();
            saveToLocalStorage();
        });
    }

    const weeklyGoalSelect = document.getElementById('weekly-goal-select');
    if (weeklyGoalSelect) {
        weeklyGoalSelect.value = String(appState.weeklyGoal || 5);
        weeklyGoalSelect.addEventListener('change', (e) => {
            appState.weeklyGoal = Number(e.target.value) || 5;
            renderInsights();
            saveToLocalStorage();
        });
    }

    const refreshChallengeBtn = document.getElementById('refresh-challenge');
    if (refreshChallengeBtn) {
        refreshChallengeBtn.addEventListener('click', () => {
            renderDailyChallenge(true);
        });
    }

    const refreshStudyTipBtn = document.getElementById('refresh-study-tip');
    if (refreshStudyTipBtn) {
        refreshStudyTipBtn.addEventListener('click', () => {
            renderStudyTip(true);
        });
    }

    const fontScaleSelect = document.getElementById('font-scale-select');
    if (fontScaleSelect) {
        fontScaleSelect.value = appState.fontScale;
        fontScaleSelect.addEventListener('change', (e) => {
            appState.fontScale = e.target.value;
            applyFontScale();
            saveToLocalStorage();
        });
    }

    const cardDepthSelect = document.getElementById('card-depth-select');
    if (cardDepthSelect) {
        cardDepthSelect.value = appState.cardDepth;
        cardDepthSelect.addEventListener('change', (e) => {
            const nextDepth = e.target.value;
            appState.cardDepth = CARD_DEPTH_OPTIONS.includes(nextDepth) ? nextDepth : 'standard';
            applyCardDepth();
            saveToLocalStorage();
        });
    }

    // Apply saved language
    applyLanguage(appState.language);
    initSectionCollapsibles();

    // Language toggle buttons
    const langEnBtn = document.getElementById('lang-en-btn');
    const langEsBtn = document.getElementById('lang-es-btn');
    if (langEnBtn) langEnBtn.addEventListener('click', () => setLanguage('en'));
    if (langEsBtn) langEsBtn.addEventListener('click', () => setLanguage('es'));

    console.log('CS Course Atlas initialized successfully!');
}

// =================================
// ADDITIONAL UTILITY FUNCTIONS
// =================================

function loadStudyMetrics() {
    const defaults = { totalTimeMs: 0, todayMs: 0, todayDate: null };
    try {
        const stored = safeGetItem(STORAGE_KEYS.STUDY_METRICS);
        if (!stored) return { ...defaults };
        const parsed = JSON.parse(stored);
        return { ...defaults, ...parsed };
    } catch (error) {
        console.warn('Unable to load study metrics:', error);
        return { ...defaults };
    }
}

function saveStudyMetrics() {
    safeSetItem(STORAGE_KEYS.STUDY_METRICS, JSON.stringify(studyMetrics));
    queueUserStateSync();
}

function ensureTodayMetrics() {
    const today = new Date().toISOString().split('T')[0];
    if (studyMetrics.todayDate !== today) {
        studyMetrics.todayDate = today;
        studyMetrics.todayMs = 0;
        saveStudyMetrics();
    }
}

function loadStudyHabit() {
    const defaults = { streak: 0, lastDate: null, longestStreak: 0 };
    try {
        const stored = safeGetItem(STORAGE_KEYS.STUDY_HABIT);
        if (!stored) return { ...defaults };
        const parsed = JSON.parse(stored);
        return { ...defaults, ...parsed };
    } catch (error) {
        console.warn('Unable to load study habit data:', error);
        return { ...defaults };
    }
}

function saveStudyHabit() {
    safeSetItem(STORAGE_KEYS.STUDY_HABIT, JSON.stringify(studyHabit));
    queueUserStateSync();
}

function updateStudyHabit(sessionTime) {
    if (!sessionTime || sessionTime < 60000) return; // ignore sessions under a minute
    const today = new Date().toISOString().split('T')[0];
    const lastDate = studyHabit.lastDate;

    if (lastDate === today) {
        return;
    }

    if (!lastDate) {
        studyHabit.streak = 1;
    } else {
        const last = new Date(lastDate);
        const current = new Date(today);
        const diffDays = Math.round((current - last) / (1000 * 60 * 60 * 24));
        if (diffDays === 1) {
            studyHabit.streak += 1;
        } else if (diffDays > 1) {
            studyHabit.streak = 1;
        }
    }

    studyHabit.lastDate = today;
    studyHabit.longestStreak = Math.max(studyHabit.longestStreak || 1, studyHabit.streak);
    saveStudyHabit();
}

function formatMinutes(minutes) {
    if (minutes < 60) {
        return translateLiteral(`${minutes} min`, appState.language);
    }
    const hours = Math.floor(minutes / 60);
    const remaining = minutes % 60;
    if (remaining === 0) {
        return `${hours}h`;
    }
    return `${hours}h ${remaining}m`;
}

function getBreakReminder() {
    if (!studyTimer.isActive || !studyTimer.startTime) {
        return translateLiteral('⏱ Break reminder in 25 min', appState.language);
    }
    const minutesElapsed = Math.floor((Date.now() - studyTimer.startTime) / 60000);
    if (minutesElapsed >= 25) {
        return translateLiteral('🌿 Stretch & hydrate now!', appState.language);
    }
    return translateLiteral(`⏱ Break in ${25 - minutesElapsed} min`, appState.language);
}

function updateStudyTrackerUI() {
    const statusEl = document.getElementById('study-session-status');
    const todayEl = document.getElementById('study-time-today');
    const totalEl = document.getElementById('study-time-total');
    const streakEl = document.getElementById('study-streak-count');
    const toggleBtn = document.getElementById('study-session-toggle');
    const breakEl = document.getElementById('next-break-pill');

    if (!statusEl || !todayEl || !totalEl || !streakEl) return;

    if (!hasAuthenticatedInsightsAccess()) {
        statusEl.textContent = t('insights.lock.status');
        statusEl.classList.remove('bg-emerald-100', 'text-emerald-700');
        todayEl.textContent = '--';
        totalEl.textContent = '--';
        streakEl.textContent = '0 days';
        if (toggleBtn) {
            toggleBtn.textContent = t('insights.lock.sessionBtn');
        }
        if (breakEl) {
            breakEl.textContent = t('insights.lock.break');
        }
        return;
    }

    ensureTodayMetrics();
    const totalMinutes = Math.max(0, Math.round((studyMetrics.totalTimeMs || 0) / 60000));
    const todayMinutes = Math.max(0, Math.round((studyMetrics.todayMs || 0) / 60000));

    statusEl.textContent = studyTimer.isActive
        ? translateLiteral('Focusing', appState.language)
        : translateLiteral('Idle', appState.language);
    statusEl.classList.toggle('bg-emerald-100', studyTimer.isActive);
    statusEl.classList.toggle('text-emerald-700', studyTimer.isActive);

    todayEl.textContent = `${todayMinutes} min`;
    totalEl.textContent = formatMinutes(totalMinutes);
    streakEl.textContent = translateLiteral(`${studyHabit.streak || 0} day${(studyHabit.streak || 0) === 1 ? '' : 's'}`, appState.language);

    if (toggleBtn) {
        toggleBtn.textContent = studyTimer.isActive
            ? translateLiteral('Pause Focus Session', appState.language)
            : translateLiteral('Start Focus Session', appState.language);
    }

    if (breakEl) {
        breakEl.textContent = getBreakReminder();
    }
}

function renderInsights() {
    const progressEl = document.getElementById('insights-progress-percent');
    const progressBar = document.getElementById('insights-progress-bar');
    const completedEl = document.getElementById('insights-completed-count');
    const totalEl = document.getElementById('insights-total-count');
    const breakdownEl = document.getElementById('difficulty-breakdown');
    const insightUpdates = document.getElementById('insight-updates');
    const learningPathProgress = document.getElementById('learning-path-progress');
    const learningPathNext = document.getElementById('learning-path-next');
    const recommendedList = document.getElementById('recommended-modules-list');
    const highlightGoalEl = document.getElementById('insight-weekly-goal');
    const highlightGoalNoteEl = document.getElementById('insight-weekly-note');
    const highlightFocusEl = document.getElementById('insight-focus-minutes');
    const highlightFocusNoteEl = document.getElementById('insight-focus-note');
    const highlightStreakValueEl = document.getElementById('insight-streak-value');
    const highlightStreakNoteEl = document.getElementById('insight-streak-note');
    const planLabelEl = document.getElementById('insight-plan-label');
    const planPillEl = document.getElementById('insight-plan-pill');
    const planNoteEl = document.getElementById('insight-plan-note');
    const planCtaEl = document.getElementById('insight-plan-cta');
    const momentumStreakEl = document.getElementById('insight-momentum-streak');
    const momentumTodayEl = document.getElementById('insight-momentum-today');
    const momentumLongestEl = document.getElementById('insight-momentum-longest');
    const momentumTrendEl = document.getElementById('insight-momentum-trend');
    const momentumTipEl = document.getElementById('insight-momentum-tip');

    if (!progressEl || !progressBar) {
        updateStudyTrackerUI();
        return;
    }

    const hasAccess = updateInsightsAccessGate();
    if (!hasAccess) {
        if (insightUpdates) {
            insightUpdates.textContent = t('insights.lock.updates');
        }
        updateStudyTrackerUI();
        return;
    }

    const stats = getModuleStats();
    const learningPath = generateLearningPath();
    ensureTodayMetrics();
    const totalMinutes = Math.max(0, Math.round((studyMetrics.totalTimeMs || 0) / 60000));
    const todayMinutes = Math.max(0, Math.round((studyMetrics.todayMs || 0) / 60000));
    const streak = studyHabit.streak || 0;
    const longestStreak = Math.max(streak, studyHabit.longestStreak || 0);
    const weeklyGoal = Math.max(1, Number(appState.weeklyGoal) || 5);
    const modulesRemaining = Math.max(0, stats.total - stats.completed);
    const finishWeeks = modulesRemaining === 0 ? 0 : Math.max(1, Math.ceil(modulesRemaining / weeklyGoal));
    const progress = Number.isFinite(stats.percentage) ? stats.percentage : 0;
    const normalizedProgress = Math.max(0, Math.min(100, progress));

    progressEl.textContent = `${normalizedProgress}%`;
    progressBar.style.width = `${normalizedProgress}%`;
    completedEl.textContent = translateLiteral(`${stats.completed} completed`, appState.language);
    totalEl.textContent = translateLiteral(`${stats.total} total modules`, appState.language);

    if (learningPathProgress) {
        learningPathProgress.textContent = translateLiteral(`${learningPath.progress}% complete`, appState.language);
    }

    if (learningPathNext) {
        if (learningPath.next) {
            const localizedNext = getLocalizedModule(learningPath.next);
            const topics = (localizedNext.topics || []).slice(0, 3).join(', ') || translateLiteral('Core DSA', appState.language);
            learningPathNext.innerHTML = `
                <p class="font-semibold text-indigo-600">${localizedNext.title}</p>
                <p class="text-xs text-slate-500 mb-1">${translateLiteral(learningPath.next.difficulty, appState.language)} • ${topics}</p>
                <p class="text-sm text-slate-600">${localizedNext.description}</p>
            `;
        } else {
            learningPathNext.textContent = translateLiteral('Awesome job! You have explored all available modules.', appState.language);
        }
    }

    if (recommendedList) {
        const recommendations = learningPath.upcoming && learningPath.upcoming.length > 0
            ? learningPath.upcoming
            : getRecommendedModules();

        if (recommendations.length === 0) {
            recommendedList.innerHTML = `
                <li class="text-xs text-slate-500">${translateLiteral('All modules completed. Check back soon for new content!', appState.language)}</li>
            `;
        } else {
            recommendedList.innerHTML = recommendations.map(module => {
                const localizedModule = getLocalizedModule(module);
                const topics = (localizedModule.topics || []).slice(0, 3).join(', ') || translateLiteral('Practice set', appState.language);
                return `
                <li>
                    <button class="recommended-link" onclick="focusModule('${module.id}')">
                        <div class="font-semibold text-slate-800 dark:text-slate-100">${localizedModule.title}</div>
                        <div class="text-xs text-slate-500">${topics}</div>
                    </button>
                </li>
            `;
            }).join('');
        }
    }

    if (breakdownEl) {
        const difficulties = Object.keys(DIFFICULTY_COLORS);
        const totals = stats.byDifficulty || {};
        const completedTotals = stats.completedByDifficulty || {};
        breakdownEl.innerHTML = difficulties
            .filter(level => level !== 'default')
            .map(level => {
                const total = totals[level] || 0;
                const completed = completedTotals[level] || 0;
                const percent = total ? Math.round((completed / total) * 100) : 0;
                return `
                    <span class="insight-pill">
                        ${translateLiteral(level.charAt(0).toUpperCase() + level.slice(1), appState.language)} · ${completed}/${total} (${percent}%)
                    </span>
                `;
            }).join('');
    }

        if (insightUpdates) {
        const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        insightUpdates.textContent = translateLiteral(`Synced ${timestamp}`, appState.language);
    }

    if (highlightGoalEl) {
        highlightGoalEl.textContent = translateLiteral(`${weeklyGoal} modules/wk`, appState.language);
    }
    if (highlightGoalNoteEl) {
        highlightGoalNoteEl.textContent = modulesRemaining === 0
            ? translateLiteral('Goal complete! Review & reinforce.', appState.language)
            : translateLiteral(`Finish in ~${finishWeeks} week${finishWeeks === 1 ? '' : 's'}`, appState.language);
    }
    if (highlightFocusEl) {
        highlightFocusEl.textContent = translateLiteral(`${formatMinutes(todayMinutes)} today`, appState.language);
    }
    if (highlightFocusNoteEl) {
        highlightFocusNoteEl.textContent = translateLiteral(`Lifetime ${formatMinutes(totalMinutes)}`, appState.language);
    }
    if (highlightStreakValueEl) {
        highlightStreakValueEl.textContent = translateLiteral(`${streak}-day streak`, appState.language);
    }
    if (highlightStreakNoteEl) {
        highlightStreakNoteEl.textContent = translateLiteral(`Longest streak: ${longestStreak} day${longestStreak === 1 ? '' : 's'}`, appState.language);
    }
    if (planLabelEl || planPillEl || planNoteEl) {
        const planSummary = getStudyPlanSummary();
        if (planLabelEl) planLabelEl.textContent = planSummary.label;
        if (planPillEl) planPillEl.textContent = planSummary.pill;
        if (planNoteEl) planNoteEl.textContent = planSummary.note;
        if (planCtaEl) planCtaEl.textContent = planSummary.status === 'active'
            ? translateLiteral('Edit plan', appState.language)
            : translateLiteral('Personalize', appState.language);
    }

    if (momentumStreakEl) {
        momentumStreakEl.textContent = translateLiteral(`${streak} day${streak === 1 ? '' : 's'}`, appState.language);
    }
    if (momentumTodayEl) {
        momentumTodayEl.textContent = formatMinutes(todayMinutes);
    }
    if (momentumLongestEl) {
        momentumLongestEl.textContent = translateLiteral(`${longestStreak} day${longestStreak === 1 ? '' : 's'}`, appState.language);
    }
    if (momentumTrendEl) {
        let trendLabel = translateLiteral('Getting started', appState.language);
        if (streak >= 3 || todayMinutes >= 45) trendLabel = translateLiteral('On track', appState.language);
        if (streak >= 7 || todayMinutes >= 90) trendLabel = translateLiteral('Momentum unlocked', appState.language);
        momentumTrendEl.textContent = trendLabel;
    }
    if (momentumTipEl) {
        let tip = translateLiteral('Log a focus session to start building momentum.', appState.language);
        const weeklyNeed = modulesRemaining === 0 ? 0 : Math.min(modulesRemaining, weeklyGoal);
        if (modulesRemaining === 0) {
            tip = translateLiteral('All modules complete—spend time on flashcards or mentor a friend.', appState.language);
        } else if (streak >= 7) {
            tip = translateLiteral('🔥 Your streak is on fire! Consider revisiting advanced challenge sets.', appState.language);
        } else if (todayMinutes < 30) {
            tip = translateLiteral('Try a focused 30-minute sprint to lock in a module today.', appState.language);
        } else {
            tip = translateLiteral(`Complete ${weeklyNeed} module${weeklyNeed === 1 ? '' : 's'} this week to stay on pace.`, appState.language);
        }
        momentumTipEl.textContent = tip;
    }

    updateStudyTrackerUI();
}

function focusModule(moduleId) {
    const target = document.querySelector(`[data-module-card="${moduleId}"]`);
    if (!target) {
        showToast('Module not visible. Try adjusting filters!', 'warning');
        return;
    }
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    target.classList.add('module-highlight');
    setTimeout(() => target.classList.remove('module-highlight'), 1600);
}

function toggleManualStudySession() {
    if (!hasAuthenticatedInsightsAccess()) {
        showToast('Sign in to unlock personalized study insights.', 'info');
        openAccountModal();
        return;
    }
    if (studyTimer.isActive) {
        endStudySession({ notify: false });
        showToast('Focus session logged. Nice work!', 'success');
    } else {
        startStudySession({ notify: false });
        showToast('Focus session started. You got this!', 'info');
    }
}

// Generate PayPal donation URL
function generatePayPalUrl(amount, description) {
    const params = new URLSearchParams({
        business: 'your.email@paypal.com',
        amount: amount,
        currency_code: 'USD',
        item_name: description
    });
    return `https://www.paypal.com/donate?${params.toString()}`;
}

// Copy code to clipboard
function copyCodeToClipboard(moduleId) {
    const module = modules.find(m => m.id === moduleId);
    if (!module) return;

    const code = getCodeExample(module);
    navigator.clipboard.writeText(code).then(() => {
        // Show temporary success message
        showToast('Code copied to clipboard!', 'success');
    }).catch(err => {
        console.error('Failed to copy code:', err);
        showToast('Failed to copy code', 'error');
    });
}

// Show toast notification
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white font-medium transition-all duration-300 transform translate-x-full`;

    switch (type) {
        case 'success':
            toast.classList.add('bg-green-500');
            break;
        case 'error':
            toast.classList.add('bg-red-500');
            break;
        case 'warning':
            toast.classList.add('bg-yellow-500');
            break;
        default:
            toast.classList.add('bg-blue-500');
    }

    toast.textContent = translateLiteral(message, appState.language);
    document.body.appendChild(toast);

    // Animate in
    setTimeout(() => {
        toast.classList.remove('translate-x-full');
    }, 100);

    // Animate out and remove
    setTimeout(() => {
        toast.classList.add('translate-x-full');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}

// Enhanced search functionality
function highlightSearchTerm(text, searchTerm) {
    if (!searchTerm) return text;

    const regex = new RegExp(`(${escapeRegExp(searchTerm)})`, 'gi');
    return text.replace(regex, '<mark class="bg-yellow-200 px-1 rounded">$1</mark>');
}

// Module statistics
function getModuleStats() {
    const total = modules.length;
    const completed = appState.completedModules.size;
    const byDifficulty = modules.reduce((acc, module) => {
        acc[module.difficulty] = (acc[module.difficulty] || 0) + 1;
        return acc;
    }, {});

    const completedByDifficulty = modules.reduce((acc, module) => {
        if (appState.completedModules.has(module.id)) {
            acc[module.difficulty] = (acc[module.difficulty] || 0) + 1;
        }
        return acc;
    }, {});

    return {
        total,
        completed,
        percentage: Math.round((completed / total) * 100),
        byDifficulty,
        completedByDifficulty
    };
}

// Export progress as JSON
function exportProgress() {
    const stats = getModuleStats();
    const exportData = {
        timestamp: new Date().toISOString(),
        version: '1.0',
        stats,
        progress: {
            completedModules: Array.from(appState.completedModules),
            moduleSettings: {
                comments: Array.from(appState.moduleComments.entries()),
                languages: Array.from(appState.moduleLanguages.entries()),
                modes: Array.from(appState.moduleModes.entries()),
                expandedExamples: Array.from(appState.expandedCodeExamples),
                selectedExamples: Array.from(appState.moduleExampleSelections.entries())
            },
            preferences: {
                darkMode: appState.darkMode,
                showComments: appState.showComments
            }
        }
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `cs-course-atlas-progress-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast('Progress exported successfully!', 'success');
}

// Import progress from JSON
function importProgress(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const importData = JSON.parse(e.target.result);

            if (importData.version && importData.progress) {
                // Restore progress
                appState.completedModules = new Set(remapStoredModuleIds(importData.progress.completedModules || []));
                appState.moduleComments = new Map(remapStoredModuleEntryPairs(importData.progress.moduleSettings.comments || []));
                appState.moduleLanguages = new Map(remapStoredModuleEntryPairs(importData.progress.moduleSettings.languages || []));
                appState.moduleModes = sanitizeStoredModuleModes(
                    new Map(remapStoredModuleEntryPairs(importData.progress.moduleSettings.modes || [], { allowLegacy: false }))
                );
                appState.expandedCodeExamples = sanitizeStoredExpandedCodeExamples(
                    new Set(importData.progress.moduleSettings.expandedExamples || [])
                );
                appState.moduleExampleSelections = sanitizeStoredModuleExampleSelections(
                    new Map(remapStoredModuleEntryPairs(importData.progress.moduleSettings.selectedExamples || [], { allowLegacy: false }))
                );
                enforceAssemblyModuleLanguageDefaults();
                appState.darkMode = importData.progress.preferences.darkMode;
                appState.showComments = importData.progress.preferences.showComments;

                // Update UI
                updateDarkMode();
                updateCommentsToggle();
                updateProgress();
                renderModules();
                saveToLocalStorage();

                showToast('Progress imported successfully!', 'success');
            } else {
                throw new Error('Invalid file format');
            }
        } catch (error) {
            console.error('Import error:', error);
            showToast('Failed to import progress. Invalid file format.', 'error');
        }
    };

    reader.readAsText(file);
}

// Print study guide
function printStudyGuide() {
    const completedModules = modules.filter(m => appState.completedModules.has(m.id));

    if (completedModules.length === 0) {
        showToast('Complete some modules first to generate a study guide!', 'warning');
        return;
    }

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>CS Course Atlas Study Guide</title>
            <style>
                body { font-family: 'Pixelify Sans', 'Silkscreen', 'DotGothic16', monospace; margin: 20px; }
                h1 { color: #4f46e5; border-bottom: 2px solid #4f46e5; padding-bottom: 10px; }
                h2 { color: #6366f1; margin-top: 30px; }
                .module { margin-bottom: 30px; page-break-inside: avoid; }
                .topics { background: #f8fafc; padding: 10px; border-radius: 5px; }
                .explanation { margin: 15px 0; line-height: 1.6; }
                .resources { margin-top: 15px; }
                @media print { .no-print { display: none; } }
            </style>
        </head>
        <body>
            <h1>CS Course Atlas Study Guide</h1>
            <p>Generated on: ${new Date().toLocaleDateString()}</p>
            <p>Completed Modules: ${completedModules.length} of ${modules.length}</p>
            
            ${completedModules.map(module => `
                <div class="module">
                    <h2>${module.title}</h2>
                    <p><strong>Difficulty:</strong> ${module.difficulty}</p>
                    <div class="topics">
                        <strong>Topics:</strong> ${module.topics.join(', ')}
                    </div>
                    <div class="explanation">
                        ${module.explanation.replace(/\n/g, '<br>')}
                    </div>
                    <div class="resources">
                        <strong>Resources:</strong>
                        <ul>
                            ${module.resources.map(resource => `<li>${resource}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `).join('')}
        </body>
        </html>
    `);

    printWindow.document.close();
    printWindow.print();
}

// Enhanced error handling
function handleError(error, context = 'Application') {
    console.error(`${context} Error:`, error);
    showToast(`${context} error occurred. Please try again.`, 'error');
}

// Performance monitoring
function measurePerformance(name, fn) {
    const start = performance.now();
    const result = fn();
    const end = performance.now();
    console.log(`${name} took ${end - start} milliseconds`);
    return result;
}

// Accessibility improvements
function announceToScreenReader(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;

    document.body.appendChild(announcement);

    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// Theme management
function toggleTheme() {
    appState.darkMode = !appState.darkMode;
    updateDarkMode();
    saveToLocalStorage();
    announceToScreenReader(`Switched to ${appState.darkMode ? 'dark' : 'light'} mode`);
}

// Advanced search with debouncing
let searchTimeout;
function debouncedSearch(searchTerm) {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        appState.searchTerm = searchTerm;
        renderModules();
        saveToLocalStorage();
    }, 300);
}

// Mobile detection and optimization
function isMobile() {
    return window.innerWidth <= 768;
}

function isIOSTouchDevice() {
    const ua = navigator.userAgent || '';
    const platform = navigator.platform || '';
    const isiOSUA = /iPad|iPhone|iPod/.test(ua);
    const isiPadOS = platform === 'MacIntel' && navigator.maxTouchPoints > 1;
    return isiOSUA || isiPadOS;
}

function isVerticallyScrollable(element) {
    if (!element || !(element instanceof Element)) return false;
    const styles = window.getComputedStyle(element);
    const overflowY = styles.overflowY;
    const canScroll = overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'overlay';
    return canScroll && element.scrollHeight > element.clientHeight + 1;
}

function getNearestScrollableAncestor(node) {
    let current = node instanceof Element ? node : null;
    while (current && current !== document.body) {
        if (isVerticallyScrollable(current)) {
            return current;
        }
        current = current.parentElement;
    }
    return document.scrollingElement || document.documentElement;
}

function canScrollElementInDirection(scroller, deltaY) {
    if (!scroller) return false;
    const scrollTop = scroller.scrollTop;
    const maxScrollTop = Math.max(scroller.scrollHeight - scroller.clientHeight, 0);
    if (maxScrollTop <= 0) return false;
    if (deltaY > 0) return scrollTop > 0;
    if (deltaY < 0) return scrollTop < maxScrollTop;
    return true;
}

function canAnyScrollableAncestorHandleScroll(startNode, deltaY) {
    let current = startNode instanceof Element ? startNode : null;
    while (current && current !== document.body) {
        if (isVerticallyScrollable(current) && canScrollElementInDirection(current, deltaY)) {
            return true;
        }
        current = current.parentElement;
    }
    const rootScroller = document.scrollingElement || document.documentElement;
    return canScrollElementInDirection(rootScroller, deltaY);
}

let iosOverscrollLockInitialized = false;
let iosTouchStartY = 0;
let iosTouchStartX = 0;
let iosActiveScroller = null;

function initIOSOverscrollLock() {
    if (iosOverscrollLockInitialized || !isIOSTouchDevice()) return;
    iosOverscrollLockInitialized = true;

    document.addEventListener('touchstart', (event) => {
        if (event.touches.length !== 1) return;
        const touch = event.touches[0];
        iosTouchStartY = touch.clientY;
        iosTouchStartX = touch.clientX;
        iosActiveScroller = getNearestScrollableAncestor(event.target);
    }, { passive: true });

    document.addEventListener('touchmove', (event) => {
        if (!event.cancelable || event.touches.length !== 1) return;
        const touch = event.touches[0];
        const deltaY = touch.clientY - iosTouchStartY;
        const deltaX = touch.clientX - iosTouchStartX;
        if (Math.abs(deltaY) <= Math.abs(deltaX)) return;
        const scroller = iosActiveScroller || getNearestScrollableAncestor(event.target);
        const target = event.target instanceof Element ? event.target : null;
        const canScroll = canScrollElementInDirection(scroller, deltaY) ||
            (target ? canAnyScrollableAncestorHandleScroll(target, deltaY) : false);
        if (!canScroll) {
            event.preventDefault();
        }
    }, { passive: false });
}

function optimizeForMobile() {
    if (isMobile()) {
        // Reduce animations on mobile for better performance
        document.documentElement.style.setProperty('--animation-duration', '0.1s');
    }
}

// Service Worker registration for offline support
function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('SW registered: ', registration);
                })
                .catch(registrationError => {
                    console.log('SW registration failed: ', registrationError);
                });
        });
    }
}

// Analytics and usage tracking (privacy-friendly)
function trackUsage(action, category = 'General') {
    let usage = {};
    try {
        const stored = safeGetItem('dsaHubUsage');
        usage = stored ? JSON.parse(stored) : {};
    } catch (error) {
        usage = {};
    }
    const today = new Date().toISOString().split('T')[0];

    if (!usage[today]) {
        usage[today] = {};
    }

    if (!usage[today][category]) {
        usage[today][category] = {};
    }

    usage[today][category][action] = (usage[today][category][action] || 0) + 1;

    safeSetItem('dsaHubUsage', JSON.stringify(usage));
}

// Module recommendation system
function getRecommendedModules() {
    const completed = Array.from(appState.completedModules);
    const orderedModules = getOrderedModules();
    const incomplete = orderedModules.filter(m => !completed.includes(m.id));

    if (completed.length === 0) {
        // Recommend beginner modules
        return incomplete.filter(m => m.difficulty === 'beginner').slice(0, 3);
    }

    // Simple recommendation based on completed modules
    const completedDifficulties = completed.map(id =>
        orderedModules.find(m => m.id === id)?.difficulty
    ).filter(Boolean);

    const mostCommonDifficulty = completedDifficulties
        .reduce((acc, diff) => {
            acc[diff] = (acc[diff] || 0) + 1;
            return acc;
        }, {});

    const recommended = Object.keys(mostCommonDifficulty)
        .sort((a, b) => mostCommonDifficulty[b] - mostCommonDifficulty[a])[0];

    return incomplete.filter(m => m.difficulty === recommended).slice(0, 3);
}

// Study session timer
let studyTimer = {
    startTime: null,
    totalTime: studyMetrics.totalTimeMs || 0,
    isActive: false
};

function startStudySession(options = {}) {
    if (!hasAuthenticatedInsightsAccess()) {
        return;
    }
    if (studyTimer.isActive) return;
    const { notify = false } = options;
    studyTimer.startTime = Date.now();
    studyTimer.isActive = true;
    if (studyTrackerInterval) {
        clearInterval(studyTrackerInterval);
    }
    studyTrackerInterval = setInterval(updateStudyTrackerUI, 1000);
    updateStudyTrackerUI();
    if (notify) {
        showToast('Focus session started. Stay sharp!', 'info');
    }
    trackUsage('study_session_started', 'Learning');
}

function endStudySession(options = {}) {
    if (!studyTimer.isActive || !studyTimer.startTime) return;
    const { notify = true } = options;
    const sessionTime = Date.now() - studyTimer.startTime;
    studyTimer.totalTime += sessionTime;
    studyTimer.startTime = null;
    studyTimer.isActive = false;
    ensureTodayMetrics();
    studyMetrics.totalTimeMs = studyTimer.totalTime;
    studyMetrics.todayMs += sessionTime;
    saveStudyMetrics();
    updateStudyHabit(sessionTime);
    if (studyTrackerInterval) {
        clearInterval(studyTrackerInterval);
        studyTrackerInterval = null;
    }
    updateStudyTrackerUI();

    const minutes = Math.max(1, Math.round(sessionTime / 60000));
    if (notify) {
        showToast(`Study session logged: ${minutes} min`, 'success');
    }
    trackUsage('study_session_completed', 'Learning');
}

// Enhanced quiz functionality
function getQuizStats() {
    try {
        const stored = safeGetItem('dsaHubQuizStats');
        return stored ? JSON.parse(stored) : {};
    } catch (error) {
        return {};
    }
}

function saveQuizResult(moduleId, score, totalQuestions) {
    const stats = getQuizStats();
    const today = new Date().toISOString().split('T')[0];

    if (!stats[moduleId]) {
        stats[moduleId] = [];
    }

    stats[moduleId].push({
        date: today,
        score,
        totalQuestions,
        percentage: Math.round((score / totalQuestions) * 100)
    });

    safeSetItem('dsaHubQuizStats', JSON.stringify(stats));
    trackUsage('quiz_completed', 'Assessment');
}

// Learning path suggestions
function generateLearningPath() {
    const completed = Array.from(appState.completedModules);
    const recommended = getRecommendedModules();

    const path = {
        next: recommended[0],
        upcoming: recommended.slice(1),
        completed: completed.length,
        total: modules.length,
        progress: Math.round((completed.length / modules.length) * 100)
    };

    return path;
}

function runLocalizationSmokeTest() {
    const originalLanguage = appState.language;
    const results = [];
    const check = (label, condition) => {
        results.push({ label, pass: Boolean(condition) });
    };

    try {
        setLanguage('es');
        renderModules();
        renderGlossary();
        renderFlashcard();
        renderInsights();

        check('header-title-spanish', (document.getElementById('main-title')?.textContent || '').toLowerCase().includes('cs course atlas'));
        check('module-grid-rendered', (document.getElementById('modules-grid')?.children?.length || 0) > 0);
        check('glossary-rendered', (document.getElementById('glossary-content')?.textContent || '').trim().length > 0);
        check('assembly-topic-visible', (document.querySelector('[data-topic-filter=\"assembly\"]')?.textContent || '').trim().length > 0);
        check('java-topic-visible', (document.querySelector('[data-topic-filter=\"java\"]')?.textContent || '').trim().length > 0);
        check('git-topic-visible', (document.querySelector('[data-topic-filter=\"git\"]')?.textContent || '').trim().length > 0);
        check('new-discrete-module-rendered', Boolean(document.getElementById('module-propositional-logic-proofs')));
        check('new-assembly-module-rendered', Boolean(document.getElementById('module-assembly-registers-memory')));
        const moduleTextEs = document.getElementById('modules-grid')?.textContent || '';
        check('module-label-topics-es', moduleTextEs.includes(t('module.topicsCovered', {}, 'es')));
        check('module-label-resources-es', moduleTextEs.includes(t('module.learningResources', {}, 'es')));
        check('module-no-english-topics-header', !moduleTextEs.includes('Topics Covered:'));
        check('module-no-english-resources-header', !moduleTextEs.includes('Learning Resources:'));
        check('module-no-english-starter-banner', !moduleTextEs.includes('Starter Module: recommended first step for most learners'));
        check('module-code-header-es', moduleTextEs.includes(t('module.codeExample', {}, 'es')) || moduleTextEs.includes(t('module.discreteTheory', {}, 'es')));

        setLanguage('en');
        check('header-title-english', (document.getElementById('main-title')?.textContent || '').toLowerCase().includes('cs course atlas'));
        check('dynamic-total-text', (document.getElementById('progress-text')?.textContent || '').includes(`of ${getTotalModuleCount()} modules`));
    } catch (error) {
        results.push({ label: 'runtime-error', pass: false, error: String(error?.message || error) });
    } finally {
        if (appState.language !== originalLanguage) {
            setLanguage(originalLanguage);
        }
    }

    return {
        ok: results.every(item => item.pass),
        results
    };
}

// Add to the window object for global access
window.javaDSAHub = {
    exportProgress,
    importProgress,
    printStudyGuide,
    generateLearningPath,
    getModuleStats,
    getQuizStats,
    toggleTheme,
    trackUsage,
    runLocalizationSmokeTest
};

// Error boundary
window.addEventListener('error', (event) => {
    handleError(event.error, 'Global');
});

window.addEventListener('unhandledrejection', (event) => {
    handleError(event.reason, 'Promise');
});

// Visibility change handler for study sessions
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        endStudySession();
    } else {
        startStudySession();
    }
});

// Start the application when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', () => {
    optimizeForMobile();
    registerServiceWorker();
    startStudySession();
});

// Add window resize handler for responsive adjustments
window.addEventListener('resize', () => {
    optimizeForMobile();
    updateHeaderShrink(); // Recalculate header shrinking on resize
});

console.log('CS Course Atlas - All systems loaded successfully! 🚀');

// Interactive Quiz Library (restored)
function openInteractiveQuizLibrary() {
    const modal = document.getElementById('interactive-quiz-modal');
    const select = document.getElementById('interactive-quiz-module');
    if (!modal || !select) return;

    populateInteractiveQuizModules();
    const firstOption = select.options[0];
    const initialModule = interactiveQuizState.moduleId || (firstOption ? firstOption.value : null);
    loadInteractiveQuizModule(initialModule);
    openModal('interactive-quiz-modal');
}

function closeInteractiveQuizLibrary() {
    closeModal('interactive-quiz-modal');
}

function populateInteractiveQuizModules() {
    const select = document.getElementById('interactive-quiz-module');
    if (!select) return;
    const options = Object.entries(quizData)
        .filter(([id, data]) => data?.parts?.[0]?.questions?.length)
        .map(([id]) => {
            const localizedQuiz = getLocalizedQuizData(id) || quizData[id];
            const module = getLocalizedModule(modules.find(m => m.id === id));
            const title = module?.title || localizedQuiz?.title || id;
            const count = localizedQuiz?.parts?.[0]?.questions?.length || 0;
            return `<option value="${id}">${title} (${count} ${translateLiteral('Qs', appState.language)})</option>`;
        })
        .join('');
    select.innerHTML = options || `<option disabled>${translateLiteral('No quizzes available', appState.language)}</option>`;
    select.onchange = (e) => loadInteractiveQuizModule(e.target.value);
}

function loadInteractiveQuizModule(moduleId) {
    const select = document.getElementById('interactive-quiz-module');
    if (select && moduleId) select.value = moduleId;
    interactiveQuizState.moduleId = moduleId;
    const questions = getLocalizedQuizData(moduleId)?.parts?.[0]?.questions || [];
    interactiveQuizState.questions = questions;
    interactiveQuizState.current = 0;
    interactiveQuizState.answers = new Array(questions.length).fill(null);
    renderInteractiveQuizQuestion();
}

function renderInteractiveQuizQuestion() {
    const body = document.getElementById('interactive-quiz-body');
    const progress = document.getElementById('interactive-quiz-progress');
    if (!body) return;

    const questions = interactiveQuizState.questions || [];
    const total = questions.length;

    if (!total) {
        body.innerHTML = `<div class="p-6 rounded-xl bg-slate-50 border border-slate-200 text-slate-600">${translateLiteral('No questions available for this module yet.', appState.language)}</div>`;
        if (progress) progress.textContent = '';
        return;
    }

    const current = interactiveQuizState.current;
    const question = questions[current];
    const selected = interactiveQuizState.answers[current];

    const feedback = selected === null
        ? ''
        : selected === question.correct
            ? `<p class="text-sm text-emerald-600 font-semibold mt-2">✅ ${translateLiteral('Correct!', appState.language)} ${question.explanation || ''}</p>`
            : `<p class="text-sm text-rose-600 font-semibold mt-2">❌ ${translateLiteral('Try again.', appState.language)} ${question.explanation || ''}</p>`;

    body.innerHTML = `
        <div class="flex items-center justify-between text-sm text-slate-600 mb-2">
            <span>${translateLiteral(`Question ${current + 1} of ${total}`, appState.language)}</span>
            <span>${Math.round(((current + 1) / total) * 100)}% ${translateLiteral('through', appState.language)}</span>
        </div>
        <div class="p-4 sm:p-5 rounded-xl border border-slate-200 bg-white shadow-sm">
            <h4 class="text-lg font-semibold text-slate-800 mb-4">${question.question}</h4>
            <div class="space-y-2">
                ${question.options.map((option, idx) => {
                    const isSelected = selected === idx;
                    const isCorrect = idx === question.correct;
                    let stateClass = 'border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50';
                    if (selected !== null) {
                        if (isCorrect) stateClass = 'border-emerald-500 bg-emerald-50';
                        else if (isSelected) stateClass = 'border-rose-500 bg-rose-50';
                    }
                    return `
                        <button class="w-full text-left p-3 rounded-lg border transition-all duration-200 ${stateClass}"
                            onclick="answerInteractiveQuiz(${idx})">
                            <span class="font-medium text-slate-800">${String.fromCharCode(65 + idx)}. ${option}</span>
                        </button>`;
                }).join('')}
            </div>
            ${feedback}
            <div class="flex justify-between items-center mt-4 gap-3">
                <button class="px-4 py-2 rounded-lg border border-slate-200 text-slate-700 bg-white hover:border-indigo-300 hover:bg-indigo-50 transition"
                    ${current === 0 ? 'disabled' : ''} onclick="prevInteractiveQuizQuestion()">
                    ${translateLiteral('Previous', appState.language)}
                </button>
                <button class="px-4 py-2 rounded-lg bg-indigo-500 text-white font-semibold hover:bg-indigo-600 shadow-sm transition"
                    ${current >= total - 1 ? 'disabled' : ''} onclick="nextInteractiveQuizQuestion()">
                    ${translateLiteral('Next', appState.language)}
                </button>
            </div>
        </div>
    `;

    if (progress) {
        const answered = interactiveQuizState.answers.filter(a => a !== null).length;
        progress.textContent = translateLiteral(`${answered} answered • ${total} total`, appState.language);
    }
}

function answerInteractiveQuiz(index) {
    interactiveQuizState.answers[interactiveQuizState.current] = index;
    renderInteractiveQuizQuestion();
}

function nextInteractiveQuizQuestion() {
    if (interactiveQuizState.current < interactiveQuizState.questions.length - 1) {
        interactiveQuizState.current++;
        renderInteractiveQuizQuestion();
    }
}

function prevInteractiveQuizQuestion() {
    if (interactiveQuizState.current > 0) {
        interactiveQuizState.current--;
        renderInteractiveQuizQuestion();
    }
}

// Generic modal helpers (fallback for interactive quiz and others)
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
}
