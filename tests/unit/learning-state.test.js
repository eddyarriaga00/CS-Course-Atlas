const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '../../js/script.js'), 'utf8');
function loadFunctions(names, context) {
    vm.createContext(context);
    for (const name of names) {
        const start = source.indexOf(`function ${name}(`);
        assert.ok(start >= 0, `Missing function ${name}`);
        const end = source.indexOf('\n}\n', start) + 2;
        vm.runInContext(source.slice(start, end), context);
    }
    return context;
}
function quizContext() {
    const context = {
        appState: { currentQuiz: {
            moduleId: 'test', questions: [
                { options: ['a', 'b'], correct: 0 },
                { options: ['c', 'd'], correct: 1 }
            ], answers: [null, null], currentQuestion: 0, showResults: false
        } },
        document: { querySelector: () => ({ focus() {} }) },
        renderQuiz() {}, hasAuthenticatedInsightsAccess: () => true,
        markQuizCompleted() {}, saves: 0,
        saveQuizResult() { context.saves++; }, showToast() {}
    };
    return loadFunctions(['answerQuestion', 'nextQuestion', 'prevQuestion', 'restartQuiz'], context);
}

test('unanswered questions cannot be skipped', () => {
    const c = quizContext();
    c.nextQuestion();
    assert.equal(c.appState.currentQuiz.currentQuestion, 0);
});
test('invalid answers are ignored', () => {
    const c = quizContext();
    for (const answer of [-1, 2, 0.5, '0', null]) c.answerQuestion(answer);
    assert.equal(c.appState.currentQuiz.answers[0], null);
});
test('quiz submits exactly once and cannot change after submission', () => {
    const c = quizContext();
    c.answerQuestion(0); c.nextQuestion(); c.answerQuestion(1); c.nextQuestion();
    assert.equal(c.appState.currentQuiz.score, 2);
    c.nextQuestion(); c.answerQuestion(0); c.prevQuestion();
    assert.equal(c.saves, 1);
    assert.equal(c.appState.currentQuiz.currentQuestion, 1);
    assert.equal(c.appState.currentQuiz.answers[1], 1);
    c.restartQuiz();
    assert.equal(c.appState.currentQuiz.showResults, false);
    assert.equal(c.appState.currentQuiz.currentQuestion, 0);
    assert.ok(c.appState.currentQuiz.answers.every(a => a === null));
});
test('storage reports success, quota errors, and disallowed writes honestly', () => {
    const c = loadFunctions(['safeSetItem'], {
        shouldAllowLocalStorageAccess: () => true, safeRemoveItem() {},
        window: { localStorage: { setItem() {} } }
    });
    assert.equal(c.safeSetItem('notes', 'text'), true);
    c.window.localStorage.setItem = () => { throw Error('Quota exceeded'); };
    assert.equal(c.safeSetItem('notes', 'text'), false);
    c.shouldAllowLocalStorageAccess = () => false;
    assert.equal(c.safeSetItem('notes', 'text'), false);
});
test('notes are saved during the input event, before a navigation can cancel timers', () => {
    const events = {};
    const input = { value: '', addEventListener: (event, fn) => { events[event] = fn; } };
    let stored;
    const c = loadFunctions(['initNotes', 'saveNotesDraft'], {
        document: { getElementById: id => id === 'notes-input' ? input : null },
        notesDraft: '', hasAuthenticatedInsightsAccess: () => true,
        updateNotesSaveStatus() {}, STORAGE_KEYS: { NOTES: 'notes' },
        safeSetItem(key, value) { stored = value; return true; }, queueUserStateSync() {}
    });
    c.initNotes(); input.value = 'Latest edit'; events.input();
    assert.equal(stored, 'Latest edit');
    assert.equal(c.notesDraft, 'Latest edit');
});
test('save status distinguishes guest, local save, and failed persistence in both languages', () => {
    const status = {};
    const c = loadFunctions(['updateNotesSaveStatus'], {
        document: { getElementById: () => status }, appState: { language: 'en' },
        hasAuthenticatedInsightsAccess: () => false
    });
    assert.match(c.updateNotesSaveStatus(false), /Session only/);
    c.hasAuthenticatedInsightsAccess = () => true;
    assert.match(c.updateNotesSaveStatus(true), /Saved on this device/);
    assert.match(c.updateNotesSaveStatus(false), /Could not save/);
    c.appState.language = 'es';
    assert.match(c.updateNotesSaveStatus(true), /Guardado/);
});

function loadConstant(name, context) {
    const start = source.indexOf(`const ${name} = `);
    const end = source.indexOf('\n};', start) + 3;
    assert.ok(start >= 0 && end > start, `Missing ${name}`);
    vm.runInContext(source.slice(start, end), context);
}

test('starter definitions explain concepts in both languages without circular placeholders', () => {
    const c = loadFunctions(['buildModuleDefinitions'], {});
    loadConstant('CURATED_MODULE_DEFINITIONS', c);
    for (const id of ['intro-to-coding', 'java-basics', 'java-memory-jvm', 'git-basics-workflow']) {
        const en = c.buildModuleDefinitions({ id }, 'en');
        const es = c.buildModuleDefinitions({ id }, 'es');
        assert.equal(en.length, 5);
        assert.equal(es.length, 5);
        for (let i = 0; i < 5; i++) {
            assert.ok(en[i].definition.length > 80);
            assert.ok(es[i].definition.length > 80);
            assert.notEqual(en[i].definition, es[i].definition);
            assert.doesNotMatch(en[i].definition, /is a core concept/);
        }
        // Callers may adjust a returned entry without changing future decks.
        en[0].definition = 'changed';
        assert.notEqual(c.buildModuleDefinitions({ id }, 'en')[0].definition, 'changed');
    }
});

test('starter plans replace unsuitable generated tasks without changing track order', () => {
    const c = loadFunctions(['getModuleStarterGuide', 'buildModuleLearningPlan'], {
        appState: { language: 'en' }, getModuleCategoryKey: () => 'java',
        getModuleTrackTitle: () => 'Java', estimateModuleStudyMinutes: () => 65,
        t: () => 'generated fallback'
    });
    loadConstant('MODULE_STARTER_GUIDES', c);
    const module = {id:'java-basics', topics:['Variables','Data Types','Methods']};
    const next = {id:'java-memory-jvm', title:'JVM'};
    const tracks = new Map([['java',[module,next]]]);
    const plan = c.buildModuleLearningPlan(module, module, tracks, new Map());
    assert.equal(plan.currentPosition, 1);
    assert.equal(plan.nextModuleTitle, 'JVM');
    assert.match(plan.practicePrompt, /average\(4, 5\) = 4.5/);
    assert.ok(plan.goals.every(goal => goal !== 'generated fallback'));
    c.appState.language = 'es';
    const localized = c.buildModuleLearningPlan(module, module, tracks, new Map());
    assert.match(localized.practicePrompt, /Escribe average/);
    assert.equal(c.getModuleStarterGuide('unknown-module'), null);
});

test('complexity guidance does not misclassify sequential loops or ordinary calls', () => {
    const c = loadFunctions(['buildComplexityInsight'], { appState: { language: 'en' } });
    for (const code of [
        'for (let i=0;i<n;i++) visit(i); for (let j=0;j<n;j++) visit(j);',
        'function add(a,b) { return a+b; } add(1,2);',
        'while (n > 1) n = Math.floor(n / 2);'
    ]) {
        const guidance = c.buildComplexityInsight(code);
        assert.doesNotMatch(guidance, /O\(n\^2\)|Generally O\(n\)|recursion depth/);
        assert.match(guidance, /Sequential loops add costs/);
    }
    c.appState.language = 'es';
    assert.match(c.buildComplexityInsight(''), /ciclos consecutivos suman/);
});
