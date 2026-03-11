#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = process.cwd();
const SCRIPT_PATH = path.join(ROOT, 'js', 'script.js');
const SPANISH_PATH = path.join(ROOT, 'js', 'spanish-localization.js');
const REMOVED_IDS = ['algorithm-analysis', 'number-theory', 'computational-geometry'];

function extract(src, start, end) {
    const s = src.indexOf(start);
    const e = src.indexOf(end, s);
    if (s < 0 || e < 0) throw new Error(`Could not extract section between "${start}" and "${end}"`);
    return src.slice(s, e);
}

function loadBaseData() {
    const src = fs.readFileSync(SCRIPT_PATH, 'utf8');
    const categoryMatch = src.match(/const MODULE_CATEGORY_BY_ID = \{([\s\S]*?)\n\};/);
    const sequenceMatch = src.match(/const MODULE_LEARNING_SEQUENCE = \[([\s\S]*?)\n\];/);
    const quizMatch = src.match(/const quizData = \{([\s\S]*?)\n\};/);
    const modulesMatch = src.match(/const modules = \[([\s\S]*?)\n\];/);
    if (!categoryMatch || !sequenceMatch || !quizMatch || !modulesMatch) {
        throw new Error('Could not parse module catalog structures from script.js');
    }
    const script = [
        `const MODULE_CATEGORY_BY_ID = {${categoryMatch[1]}\n};`,
        `const MODULE_LEARNING_SEQUENCE = [${sequenceMatch[1]}\n];`,
        `const quizData = {${quizMatch[1]}\n};`,
        `const modules = [${modulesMatch[1]}\n];`,
        '({ MODULE_CATEGORY_BY_ID, MODULE_LEARNING_SEQUENCE, quizData, modules })'
    ].join('\n');
    return vm.runInNewContext(script, {});
}

function loadSpanishContent() {
    const src = fs.readFileSync(SPANISH_PATH, 'utf8');
    const sandbox = { window: {} };
    vm.runInNewContext(src, sandbox);
    return sandbox.window?.SPANISH_LOCALIZATION?.content || {};
}

function unique(items) {
    return [...new Set(items)];
}

function checkQuizStructure(moduleId, quizEntry, errors) {
    if (!quizEntry || !Array.isArray(quizEntry.parts) || quizEntry.parts.length === 0) {
        errors.push(`Quiz for ${moduleId} is missing parts.`);
        return;
    }
    quizEntry.parts.forEach((part, partIndex) => {
        if (!Array.isArray(part.questions) || part.questions.length === 0) {
            errors.push(`Quiz ${moduleId} part ${partIndex + 1} has no questions.`);
            return;
        }
        part.questions.forEach((question, questionIndex) => {
            const options = Array.isArray(question.options) ? question.options : [];
            const correct = Number(question.correct);
            if (options.length < 2) {
                errors.push(`Quiz ${moduleId} part ${partIndex + 1} question ${questionIndex + 1} needs at least 2 options.`);
            }
            if (!Number.isInteger(correct) || correct < 0 || correct >= options.length) {
                errors.push(`Quiz ${moduleId} part ${partIndex + 1} question ${questionIndex + 1} has invalid correct index.`);
            }
        });
    });
}

function main() {
    const errors = [];
    const base = loadBaseData();
    const contentEs = loadSpanishContent();

    const moduleIds = base.modules.map(module => module.id);
    const uniqueModuleIds = unique(moduleIds);
    if (uniqueModuleIds.length !== moduleIds.length) {
        errors.push('Duplicate module IDs found.');
    }

    const categoryMap = base.MODULE_CATEGORY_BY_ID || {};
    const categoryIds = Object.keys(categoryMap);
    const categoryValues = new Set(Object.values(categoryMap));
    ['dsa', 'discrete', 'java', 'git', 'assembly'].forEach((key) => {
        if (!categoryValues.has(key)) {
            errors.push(`Category map missing category value: ${key}`);
        }
    });
    if (categoryValues.has('systems')) {
        errors.push('Category map still contains stale value: systems');
    }
    const missingCategory = moduleIds.filter(id => !categoryMap[id]);
    if (missingCategory.length) {
        errors.push(`Modules missing category mapping: ${missingCategory.join(', ')}`);
    }
    const staleCategory = categoryIds.filter(id => !moduleIds.includes(id));
    if (staleCategory.length) {
        errors.push(`Category map has stale IDs: ${staleCategory.join(', ')}`);
    }

    const sequence = base.MODULE_LEARNING_SEQUENCE || [];
    const uniqueSequence = unique(sequence);
    if (uniqueSequence.length !== sequence.length) {
        errors.push('MODULE_LEARNING_SEQUENCE contains duplicate IDs.');
    }
    const missingInSequence = moduleIds.filter(id => !sequence.includes(id));
    const staleInSequence = sequence.filter(id => !moduleIds.includes(id));
    if (missingInSequence.length) {
        errors.push(`Modules missing from learning sequence: ${missingInSequence.join(', ')}`);
    }
    if (staleInSequence.length) {
        errors.push(`Learning sequence has stale IDs: ${staleInSequence.join(', ')}`);
    }

    const quizData = base.quizData || {};
    const quizIds = Object.keys(quizData);
    const missingQuiz = moduleIds.filter(id => !quizData[id]);
    const staleQuiz = quizIds.filter(id => !moduleIds.includes(id));
    if (missingQuiz.length) {
        errors.push(`Modules missing quizzes: ${missingQuiz.join(', ')}`);
    }
    if (staleQuiz.length) {
        errors.push(`Quiz data has stale IDs: ${staleQuiz.join(', ')}`);
    }
    for (const moduleId of moduleIds) {
        checkQuizStructure(moduleId, quizData[moduleId], errors);
    }

    const modulesEs = contentEs.modules || {};
    const quizEs = contentEs.quizData || {};
    const missingEsModule = moduleIds.filter(id => !modulesEs[id]);
    const missingEsQuiz = moduleIds.filter(id => !quizEs[id]);
    if (missingEsModule.length) {
        errors.push(`Spanish module localization missing IDs: ${missingEsModule.join(', ')}`);
    }
    if (missingEsQuiz.length) {
        errors.push(`Spanish quiz localization missing IDs: ${missingEsQuiz.join(', ')}`);
    }
    const staleEsModule = Object.keys(modulesEs).filter(id => !moduleIds.includes(id));
    const staleEsQuiz = Object.keys(quizEs).filter(id => !moduleIds.includes(id));
    if (staleEsModule.length) {
        errors.push(`Spanish module localization has stale IDs: ${staleEsModule.join(', ')}`);
    }
    if (staleEsQuiz.length) {
        errors.push(`Spanish quiz localization has stale IDs: ${staleEsQuiz.join(', ')}`);
    }

    for (const removedId of REMOVED_IDS) {
        if (moduleIds.includes(removedId)) errors.push(`Removed module ID still present in modules: ${removedId}`);
        if (quizIds.includes(removedId)) errors.push(`Removed module ID still present in quizData: ${removedId}`);
        if (modulesEs[removedId]) errors.push(`Removed module ID still present in Spanish modules localization: ${removedId}`);
        if (quizEs[removedId]) errors.push(`Removed module ID still present in Spanish quiz localization: ${removedId}`);
    }

    if (errors.length) {
        console.error('Catalog integrity verification failed:');
        errors.forEach(error => console.error(`- ${error}`));
        process.exit(1);
    }

    console.log('Catalog integrity verification passed.');
    console.log(`- modules: ${moduleIds.length}`);
    console.log(`- sequence entries: ${sequence.length}`);
    console.log(`- quizzes: ${quizIds.length}`);
    console.log(`- spanish modules localized: ${Object.keys(modulesEs).length}`);
}

main();
