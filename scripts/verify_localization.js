#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = process.cwd();
const SCRIPT_PATH = path.join(ROOT, 'js', 'script.js');
const INDEX_PATH = path.join(ROOT, 'index.html');
const SPANISH_PATH = path.join(ROOT, 'js', 'spanish-localization.js');

function extract(src, start, end) {
  const s = src.indexOf(start);
  const e = src.indexOf(end, s);
  if (s < 0 || e < 0) throw new Error(`Unable to extract block: ${start}`);
  return src.slice(s, e);
}

function loadBaseData() {
  const src = fs.readFileSync(SCRIPT_PATH, 'utf8');
  const block = [
    extract(src, 'const MODULE_CATEGORY_BY_ID = {', '\nconst MODULE_LEARNING_SEQUENCE = ['),
    extract(src, 'const TRANSLATIONS = {', '\nconst SPANISH_LOCALIZATION ='),
    extract(src, 'const baseFlashcards = [', '// Glossary Data'),
    extract(src, 'const glossaryTerms = [', 'const glossaryCategories = ['),
    extract(src, 'const quizData = {', 'const modules = ['),
    extract(src, 'const modules = [', 'const INTERVIEW_EXAMPLES = ['),
    extract(src, 'const INTERVIEW_EXAMPLES = [', 'const NOTES_LIBRARY = ['),
    extract(src, 'const NOTES_LIBRARY = [', 'function initAccount()'),
    '({ TRANSLATIONS, baseFlashcards, glossaryTerms, quizData, modules, INTERVIEW_EXAMPLES, NOTES_LIBRARY, dailyChallenges, studyTips })'
  ].join('\n');
  return vm.runInNewContext(block, {});
}

function loadSpanishLocalization() {
  const raw = fs.readFileSync(SPANISH_PATH, 'utf8');
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(raw, sandbox);
  return sandbox.window.SPANISH_LOCALIZATION || { content: {}, literals: {} };
}

function compareArrays(base, localized, context) {
  if (base.length !== localized.length) {
    return `${context}: length mismatch (${base.length} vs ${localized.length})`;
  }
  return null;
}

function verifyTranslationKeyCoverage(baseTranslations) {
  const html = fs.readFileSync(INDEX_PATH, 'utf8');
  const keys = [...html.matchAll(/data-i18n="([^"]+)"/g)].map(m => m[1]);
  const unique = [...new Set(keys)];
  const missingEn = unique.filter(key => !(key in baseTranslations.en));
  const missingEs = unique.filter(key => !(key in baseTranslations.es));
  return { missingEn, missingEs, total: unique.length };
}

function main() {
  const errors = [];
  const base = loadBaseData();
  const spanish = loadSpanishLocalization();
  const content = spanish.content || {};

  const keyCoverage = verifyTranslationKeyCoverage(base.TRANSLATIONS);
  if (keyCoverage.missingEn.length) errors.push(`Missing EN translation keys: ${keyCoverage.missingEn.join(', ')}`);
  if (keyCoverage.missingEs.length) errors.push(`Missing ES translation keys: ${keyCoverage.missingEs.join(', ')}`);

  const moduleIds = base.modules.map(m => m.id);
  const localizedModuleIds = Object.keys(content.modules || {});
  if (moduleIds.length !== localizedModuleIds.length) {
    errors.push(`Module count mismatch (${moduleIds.length} vs ${localizedModuleIds.length})`);
  }
  moduleIds.forEach((id) => {
    const original = base.modules.find(m => m.id === id);
    const localized = content.modules?.[id];
    if (!localized) {
      errors.push(`Missing localized module: ${id}`);
      return;
    }
    ['title', 'description', 'explanation'].forEach((field) => {
      if (!localized[field]) errors.push(`Module ${id} missing field: ${field}`);
    });
    const topicMismatch = compareArrays(original.topics || [], localized.topics || [], `Module ${id} topics`);
    if (topicMismatch) errors.push(topicMismatch);
    const resourceMismatch = compareArrays(original.resources || [], localized.resources || [], `Module ${id} resources`);
    if (resourceMismatch) errors.push(resourceMismatch);
  });

  const quizIds = Object.keys(base.quizData || {});
  quizIds.forEach((id) => {
    const original = base.quizData[id];
    const localized = content.quizData?.[id];
    if (!localized) {
      errors.push(`Missing localized quiz data: ${id}`);
      return;
    }
    const originalQuestions = original?.parts?.[0]?.questions || [];
    const localizedQuestions = localized?.parts?.[0]?.questions || [];
    const mismatch = compareArrays(originalQuestions, localizedQuestions, `Quiz ${id} questions`);
    if (mismatch) errors.push(mismatch);
    originalQuestions.forEach((question, index) => {
      const lq = localizedQuestions[index];
      if (!lq) return;
      if (question.correct !== lq.correct) {
        errors.push(`Quiz ${id} question ${index + 1} correct index changed`);
      }
      const optionMismatch = compareArrays(question.options || [], lq.options || [], `Quiz ${id} question ${index + 1} options`);
      if (optionMismatch) errors.push(optionMismatch);
    });
  });

  if ((base.glossaryTerms || []).length !== Object.keys(content.glossary || {}).length) {
    errors.push('Glossary count mismatch');
  }

  if ((base.baseFlashcards || []).length !== Object.keys(content.flashcards || {}).length) {
    errors.push('Flashcard count mismatch');
  }

  if ((base.dailyChallenges || []).length !== Object.keys(content.dailyChallenges || {}).length) {
    errors.push('Daily challenge count mismatch');
  }

  if ((base.studyTips || []).length !== Object.keys(content.studyTips || {}).length) {
    errors.push('Study tip count mismatch');
  }

  if ((base.INTERVIEW_EXAMPLES || []).length !== Object.keys(content.interviewExamples || {}).length) {
    errors.push('Interview examples count mismatch');
  }

  if ((base.NOTES_LIBRARY || []).length !== Object.keys(content.notesLibrary || {}).length) {
    errors.push('Notes library count mismatch');
  }

  if (errors.length) {
    console.error('Localization verification failed:');
    errors.forEach(err => console.error(`- ${err}`));
    process.exit(1);
  }

  console.log('Localization verification passed.');
  console.log(`- data-i18n keys: ${keyCoverage.total}`);
  console.log(`- modules: ${moduleIds.length}`);
  console.log(`- quizzes: ${quizIds.length}`);
  console.log(`- glossary terms: ${base.glossaryTerms.length}`);
  console.log(`- flashcards: ${base.baseFlashcards.length}`);
}

main();
