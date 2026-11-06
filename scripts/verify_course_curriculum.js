#!/usr/bin/env node
/*
 * Validates js/course-curriculum.js against the module catalog in js/script.js:
 * - every module has a curriculum entry with the expected fields and counts
 * - English and Spanish are both present for every text field
 * - glossary terms match the module's topics (same order)
 * - quiz questions have 4 options in both languages and a valid answer index
 * - units cover every module exactly once, in the same order as
 *   MODULE_LEARNING_SEQUENCE filtered to that track
 * - every prerequisite exists and appears earlier in MODULE_LEARNING_SEQUENCE
 * - resource URLs are https
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const SCRIPT_PATH = path.join(ROOT, 'js', 'script.js');
const CURRICULUM_PATH = path.join(ROOT, 'js', 'course-curriculum.js');

function loadCatalog() {
    const src = fs.readFileSync(SCRIPT_PATH, 'utf8');
    const categoryMatch = src.match(/const MODULE_CATEGORY_BY_ID = \{([\s\S]*?)\n\};/);
    const sequenceMatch = src.match(/const MODULE_LEARNING_SEQUENCE = \[([\s\S]*?)\n\];/);
    const modulesMatch = src.match(/const modules = \[([\s\S]*?)\n\];/);
    if (!categoryMatch || !sequenceMatch || !modulesMatch) {
        throw new Error('Could not parse module catalog structures from script.js');
    }
    return vm.runInNewContext([
        `const MODULE_CATEGORY_BY_ID = {${categoryMatch[1]}\n};`,
        `const MODULE_LEARNING_SEQUENCE = [${sequenceMatch[1]}\n];`,
        `const modules = [${modulesMatch[1]}\n];`,
        '({ MODULE_CATEGORY_BY_ID, MODULE_LEARNING_SEQUENCE, modules })'
    ].join('\n'), {});
}

function loadCurriculum() {
    const sandbox = { window: {} };
    vm.runInNewContext(fs.readFileSync(CURRICULUM_PATH, 'utf8'), sandbox);
    if (!sandbox.window.COURSE_CURRICULUM) throw new Error('course-curriculum.js did not define window.COURSE_CURRICULUM');
    return sandbox.window.COURSE_CURRICULUM;
}

const errors = [];
const fail = (message) => errors.push(message);
const isText = (value) => typeof value === 'string' && value.trim().length > 0;

function checkText(where, value) {
    if (!value || typeof value !== 'object') return fail(`${where}: missing {en, es}`);
    if (!isText(value.en)) fail(`${where}.en: missing`);
    if (!isText(value.es)) fail(`${where}.es: missing`);
}

function checkList(where, value, min, max = min) {
    if (!value || typeof value !== 'object') return fail(`${where}: missing {en, es}`);
    for (const lang of ['en', 'es']) {
        const list = value[lang];
        if (!Array.isArray(list) || !list.every(isText)) {
            fail(`${where}.${lang}: must be a list of strings`);
        } else if (list.length < min || list.length > max) {
            fail(`${where}.${lang}: expected ${min === max ? min : `${min}-${max}`} items, found ${list.length}`);
        }
    }
    if (Array.isArray(value.en) && Array.isArray(value.es) && value.en.length !== value.es.length) {
        fail(`${where}: en/es lengths differ`);
    }
}

function main() {
    const { MODULE_CATEGORY_BY_ID, MODULE_LEARNING_SEQUENCE, modules } = loadCatalog();
    const curriculum = loadCurriculum();
    const moduleById = new Map(modules.map((module) => [module.id, module]));
    const position = new Map(MODULE_LEARNING_SEQUENCE.map((id, index) => [id, index]));

    if (new Set(MODULE_LEARNING_SEQUENCE).size !== MODULE_LEARNING_SEQUENCE.length) fail('MODULE_LEARNING_SEQUENCE has duplicates');
    for (const id of moduleById.keys()) {
        if (!position.has(id)) fail(`${id}: missing from MODULE_LEARNING_SEQUENCE`);
    }

    // Units: cover each module once, match track + sequence order.
    const seenInUnits = new Set();
    for (const [trackKey, units] of Object.entries(curriculum.tracks || {})) {
        if (!Array.isArray(units) || !units.length) {
            fail(`track ${trackKey}: no units`);
            continue;
        }
        const unitIds = new Set();
        const unitOrder = [];
        units.forEach((unit, index) => {
            const where = `track ${trackKey} unit ${index + 1}`;
            if (!isText(unit.id) || unitIds.has(unit.id)) fail(`${where}: missing or duplicate id`);
            unitIds.add(unit.id);
            checkText(`${where}.title`, unit.title);
            if (!Array.isArray(unit.modules) || !unit.modules.length) fail(`${where}: no modules`);
            (unit.modules || []).forEach((id) => {
                if (!moduleById.has(id)) fail(`${where}: unknown module ${id}`);
                if (seenInUnits.has(id)) fail(`${where}: module ${id} appears in more than one unit`);
                if (MODULE_CATEGORY_BY_ID[id] !== trackKey) fail(`${where}: ${id} belongs to track ${MODULE_CATEGORY_BY_ID[id]}`);
                seenInUnits.add(id);
                unitOrder.push(id);
            });
        });
        const sequenceOrder = MODULE_LEARNING_SEQUENCE.filter((id) => MODULE_CATEGORY_BY_ID[id] === trackKey);
        if (unitOrder.join() !== sequenceOrder.join()) {
            fail(`track ${trackKey}: unit order does not match MODULE_LEARNING_SEQUENCE\n  units:    ${unitOrder.join(', ')}\n  sequence: ${sequenceOrder.join(', ')}`);
        }
    }
    for (const id of moduleById.keys()) {
        if (!seenInUnits.has(id)) fail(`${id}: not assigned to any unit`);
    }

    // Per-module content.
    for (const [id, module] of moduleById) {
        const entry = curriculum.modules?.[id];
        if (!entry) {
            fail(`${id}: no curriculum entry`);
            continue;
        }
        if (!Number.isInteger(entry.minutes) || entry.minutes < 20 || entry.minutes > 180) fail(`${id}.minutes: out of range`);
        checkText(`${id}.whyItMatters`, entry.whyItMatters);
        checkList(`${id}.objectives`, entry.objectives, 3, 5);
        checkList(`${id}.skillsNeeded`, entry.skillsNeeded, 1, 3);
        checkList(`${id}.keyTakeaways`, entry.keyTakeaways, 3, 5);
        checkList(`${id}.pitfalls`, entry.pitfalls, 3, 4);
        checkList(`${id}.practice`, entry.practice, 3, 5);
        checkList(`${id}.selfCheck`, entry.selfCheck, 3, 4);

        (entry.prerequisites || []).forEach((prerequisiteId) => {
            if (!moduleById.has(prerequisiteId)) fail(`${id}.prerequisites: unknown module ${prerequisiteId}`);
            else if (!(position.get(prerequisiteId) < position.get(id))) fail(`${id}.prerequisites: ${prerequisiteId} comes later in the sequence`);
        });

        const topics = Array.isArray(module.topics) ? module.topics : [];
        const definitions = Array.isArray(entry.definitions) ? entry.definitions : [];
        if (definitions.length !== topics.length) fail(`${id}.definitions: ${definitions.length} entries for ${topics.length} topics`);
        definitions.forEach((definition, index) => {
            checkText(`${id}.definitions[${index}].term`, definition.term);
            checkText(`${id}.definitions[${index}].definition`, definition.definition);
            if (topics[index] && definition.term?.en !== topics[index]) {
                fail(`${id}.definitions[${index}]: term "${definition.term?.en}" should match topic "${topics[index]}"`);
            }
        });

        const resources = Array.isArray(entry.resources) ? entry.resources : [];
        if (resources.length < 1 || resources.length > 4) fail(`${id}.resources: expected 1-4, found ${resources.length}`);
        resources.forEach((resource, index) => {
            checkText(`${id}.resources[${index}].label`, resource.label);
            if (!/^https:\/\/[^\s]+$/.test(String(resource.url || ''))) fail(`${id}.resources[${index}].url: not an https URL`);
        });

        const quiz = Array.isArray(entry.quiz) ? entry.quiz : [];
        if (quiz.length < 4) fail(`${id}.quiz: expected at least 4 questions, found ${quiz.length}`);
        quiz.forEach((question, index) => {
            const where = `${id}.quiz[${index}]`;
            checkText(`${where}.question`, question.question);
            checkText(`${where}.explanation`, question.explanation);
            checkList(`${where}.options`, question.options, 4);
            if (!Number.isInteger(question.correct) || question.correct < 0 || question.correct > 3) fail(`${where}.correct: must be 0-3`);
            const englishOptions = question.options?.en || [];
            if (new Set(englishOptions).size !== englishOptions.length) fail(`${where}.options.en: duplicate options`);
        });
    }

    if (errors.length) {
        console.error(`Course curriculum verification failed (${errors.length} issue${errors.length === 1 ? '' : 's'}):`);
        errors.slice(0, 80).forEach((message) => console.error(`- ${message}`));
        if (errors.length > 80) console.error(`... and ${errors.length - 80} more`);
        process.exit(1);
    }
    const quizCount = Object.values(curriculum.modules).reduce((sum, entry) => sum + (entry.quiz?.length || 0), 0);
    console.log('Course curriculum verification passed.');
    console.log(`- ${moduleById.size} modules, ${Object.values(curriculum.tracks).flat().length} units across ${Object.keys(curriculum.tracks).length} tracks`);
    console.log(`- ${quizCount} curated quiz questions; prerequisites and unit order consistent with MODULE_LEARNING_SEQUENCE`);
}

main();
