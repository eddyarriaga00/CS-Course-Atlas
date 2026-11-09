#!/usr/bin/env node
/*
 * Fast structural check for js/course-examples.js (no compilers needed):
 * - every catalog module has a main example and exactly one example per topic,
 *   in topic order, with the topic string matching the catalog
 * - java/cpp/python/javascript code (+ assembly on the assembly track; only
 *   java/python on the dsa track) and a recorded expected output for every language
 * - English + Spanish title, description and explanation for every topic example
 * - no leftover placeholder/template code
 * Running the programs themselves: node scripts/run_course_examples.js
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const { loadCatalog } = require('./lib/catalog');
const EXAMPLES_PATH = path.join(ROOT, 'js', 'course-examples.js');
const LANGS = ['java', 'cpp', 'python', 'javascript'];
const PLACEHOLDER_PATTERNS = [/compute_running_total|computeRunningTotal|Running total:/, /Focus topic \(\d+\/\d+\)/, /Comprehensive guided sample/];


function loadExamples() {
    const sandbox = { window: {} };
    vm.runInNewContext(fs.readFileSync(EXAMPLES_PATH, 'utf8'), sandbox);
    if (!sandbox.window.COURSE_EXAMPLES) throw new Error('course-examples.js did not define window.COURSE_EXAMPLES');
    return sandbox.window.COURSE_EXAMPLES;
}

const errors = [];
const isText = (value) => typeof value === 'string' && value.trim().length > 0;

function checkCode(where, example, langs) {
    for (const lang of langs) {
        const code = example?.code?.[lang];
        if (!isText(code)) {
            errors.push(`${where}: missing ${lang} code`);
            continue;
        }
        if (PLACEHOLDER_PATTERNS.some((pattern) => pattern.test(code))) errors.push(`${where}: ${lang} code looks like a placeholder/template`);
        if (!isText(example?.output?.[lang])) errors.push(`${where}: missing recorded ${lang} output (run run_course_examples.js --write)`);
    }
}

function checkBilingual(where, value, minLength = 1) {
    for (const lang of ['en', 'es']) {
        if (!isText(value?.[lang])) errors.push(`${where}.${lang}: missing`);
        else if (value[lang].trim().length < minLength) errors.push(`${where}.${lang}: too short (${value[lang].trim().length} chars)`);
    }
}

function main() {
    const { MODULE_CATEGORY_BY_ID, modules } = loadCatalog();
    const data = loadExamples();
    let programCount = 0;
    for (const module of modules) {
        const entry = data.modules?.[module.id];
        // Modules without curated examples fall back to the generated ones at runtime.
        if (!entry) continue;
        const track = MODULE_CATEGORY_BY_ID[module.id];
        // Git and the command line are taught as terminal sessions, Web Basics as live pages, the Python course
        // and the Python-taught courses (How Computers Work, Cybersecurity, AI, Networks) only in Python
        // and Data Structures & Algorithms in Java and Python.
        const langs = track === 'git' || track === 'cli' ? ['bash'] : track === 'web' ? ['html'] : track === 'sql' ? ['sql'] : ['how-computers-work', 'cybersecurity', 'ai', 'networks'].includes(track) ? ['python'] : track === 'python' ? ['python'] : track === 'dsa' ? ['java', 'python'] : track === 'assembly' ? ['assembly', ...LANGS] : LANGS;
        checkCode(`${module.id} main`, entry.main, langs);
        programCount += langs.length;
        const topics = Array.isArray(module.topics) ? module.topics : [];
        const sets = Array.isArray(entry.sets) ? entry.sets : [];
        if (sets.length !== topics.length) errors.push(`${module.id}: ${sets.length} topic examples for ${topics.length} topics`);
        sets.forEach((set, index) => {
            const where = `${module.id} set ${index + 1}`;
            if (set.topic !== topics[index]) errors.push(`${where}: topic "${set.topic}" should be "${topics[index]}"`);
            checkBilingual(`${where}.title`, set.title);
            checkBilingual(`${where}.description`, set.description, 20);
            checkBilingual(`${where}.explanation`, set.explanation, 350);
            checkCode(where, set, langs);
            programCount += langs.length;
        });
    }
    for (const id of Object.keys(data.modules || {})) {
        if (!modules.some((module) => module.id === id)) errors.push(`${id}: examples for a module that is not in the catalog`);
    }
    if (errors.length) {
        console.error(`Course example verification failed (${errors.length} issue${errors.length === 1 ? '' : 's'}):`);
        errors.slice(0, 80).forEach((message) => console.error(`- ${message}`));
        if (errors.length > 80) console.error(`... and ${errors.length - 80} more`);
        process.exit(1);
    }
    console.log('Course example verification passed.');
    console.log(`- ${modules.length} modules, ${programCount} programs with recorded outputs, English + Spanish explanations`);
}

main();
