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
