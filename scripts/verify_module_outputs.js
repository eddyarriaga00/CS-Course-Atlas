#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = process.cwd();
const SCRIPT_PATH = path.join(ROOT, 'js', 'script.js');

function fail(message) {
    console.error(message);
    process.exit(1);
}

function loadRuntimeModuleData() {
    const src = fs.readFileSync(SCRIPT_PATH, 'utf8');
    const categoryMatch = src.match(/const MODULE_CATEGORY_BY_ID = \{([\s\S]*?)\n\};/);
    if (!categoryMatch) {
        fail('Could not parse MODULE_CATEGORY_BY_ID from script.js');
    }

    const start = src.indexOf('const modules = [');
    const end = src.indexOf('const flashcardDecks =', start);
    if (start < 0 || end < 0) {
        fail('Could not extract module catalog runtime section from script.js');
    }
    const catalogRuntimeBlock = src.slice(start, end);

    const runtimeScript = [
        `const MODULE_CATEGORY_BY_ID = {${categoryMatch[1]}\n};`,
        catalogRuntimeBlock,
        '({ modules, MODULE_CATEGORY_BY_ID })'
    ].join('\n');

    try {
        return vm.runInNewContext(runtimeScript, {});
    } catch (error) {
        fail(`Failed to evaluate module runtime block: ${error.message}`);
    }
}

function main() {
    const source = fs.readFileSync(SCRIPT_PATH, 'utf8');
    const { modules, MODULE_CATEGORY_BY_ID } = loadRuntimeModuleData();
    const errors = [];

    if (!Array.isArray(modules) || modules.length === 0) {
        errors.push('No modules were loaded from runtime module catalog.');
    }

    modules.forEach((module) => {
        const category = MODULE_CATEGORY_BY_ID[module.id] || 'dsa';
        const requiredLangs = category === 'assembly'
            ? ['assembly', 'java', 'cpp', 'python', 'javascript']
            : ['java', 'cpp', 'python', 'javascript'];

        const expectedOutputs = module.expectedOutputs || {};
        requiredLangs.forEach((lang) => {
            if (!String(expectedOutputs[lang] || '').trim()) {
                errors.push(`Module "${module.id}" is missing expectedOutputs.${lang}`);
            }
        });

        const sets = Array.isArray(module.codeExampleSets) ? module.codeExampleSets : [];
        sets.forEach((setItem) => {
            const setOutputs = setItem.expectedOutputs || {};
            requiredLangs.forEach((lang) => {
                if (!String(setOutputs[lang] || '').trim()) {
                    errors.push(`Module "${module.id}" set "${setItem.id}" missing expectedOutputs.${lang}`);
                }
            });
        });
    });

    const requiredSourceMarkers = [
        'function getCanonicalModuleOutput(',
        'function runModuleSnippetForOutput(',
        'function toggleModuleOutputPanel(',
        "t('module.showOutput')",
        "t('module.hideOutput')"
    ];
    requiredSourceMarkers.forEach((marker) => {
        if (!source.includes(marker)) {
            errors.push(`Missing module-output runtime marker in script.js: ${marker}`);
        }
    });

    if (errors.length) {
        console.error('Module output verification failed:');
        errors.forEach((error) => console.error(`- ${error}`));
        process.exit(1);
    }

    console.log('Module output verification passed.');
    console.log(`- modules: ${modules.length}`);
    console.log('- expectedOutputs coverage: OK');
    console.log('- module card output runtime wiring: OK');
}

main();
