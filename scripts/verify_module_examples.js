#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = process.cwd();
const SCRIPT_PATH = path.join(ROOT, 'js', 'script.js');
const INDEX_PATH = path.join(ROOT, 'index.html');

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
        '({ modules, MODULE_CATEGORY_BY_ID, buildModuleDefinitions })'
    ].join('\n');

    try {
        return vm.runInNewContext(runtimeScript, {});
    } catch (error) {
        fail(`Failed to evaluate module runtime block: ${error.message}`);
    }
}

function main() {
    const source = fs.readFileSync(SCRIPT_PATH, 'utf8');
    const { modules, MODULE_CATEGORY_BY_ID, buildModuleDefinitions } = loadRuntimeModuleData();
    const errors = [];

    if (!Array.isArray(modules) || modules.length === 0) {
        errors.push('No modules were loaded from runtime module catalog.');
    }

    modules.forEach((module) => {
        const category = MODULE_CATEGORY_BY_ID[module.id] || 'dsa';
        const codeExamples = module.codeExamples || {};
        const definitions = Array.isArray(module.definitions) ? module.definitions : [];
        const requiredRunnables = ['java', 'cpp', 'python', 'javascript'];
        const requiredSetLanguages = category === 'assembly'
            ? ['assembly', ...requiredRunnables]
            : requiredRunnables;
        const moduleSets = Array.isArray(module.codeExampleSets) ? module.codeExampleSets : [];
        const expectedSetCount = Array.isArray(module.topics) ? module.topics.length : 0;

        if (category === 'assembly') {
            if (!String(codeExamples.assembly || '').trim()) {
                errors.push(`Assembly module "${module.id}" is missing codeExamples.assembly`);
            }
            requiredRunnables.forEach((lang) => {
                if (!String(codeExamples[lang] || '').trim()) {
                    errors.push(`Assembly module "${module.id}" is missing codeExamples.${lang}`);
                }
            });
        } else {
            requiredRunnables.forEach((lang) => {
                if (!String(codeExamples[lang] || '').trim()) {
                    errors.push(`Module "${module.id}" is missing codeExamples.${lang}`);
                }
            });
        }

        const outputRegexByLanguage = {
            java: /(System\.out\.print|System\.out\.println)/,
            cpp: /(cout\s*<<|printf\s*\()/,
            python: /\bprint\s*\(/,
            javascript: /(console\.log|process\.stdout\.write)/
        };
        requiredRunnables.forEach((lang) => {
            const source = String(codeExamples[lang] || '');
            if (source.trim() && !outputRegexByLanguage[lang].test(source)) {
                errors.push(`Module "${module.id}" ${lang} sample appears to have no visible stdout.`);
            }
        });

        if (moduleSets.length !== expectedSetCount) {
            errors.push(`Module "${module.id}" must have ${expectedSetCount} codeExampleSets (found ${moduleSets.length}).`);
        }

        const setIds = new Set();
        moduleSets.forEach((setItem, setIndex) => {
            const setId = String(setItem?.id || '').trim();
            if (!setId) {
                errors.push(`Module "${module.id}" has a set without a stable id at index ${setIndex}.`);
            } else if (setIds.has(setId)) {
                errors.push(`Module "${module.id}" has duplicate set id "${setId}".`);
            } else {
                setIds.add(setId);
            }

            const titleValue = setItem?.title;
            const hasTitle = typeof titleValue === 'string'
                ? !!titleValue.trim()
                : !!(titleValue && typeof titleValue === 'object' && (titleValue.en || titleValue.es));
            if (!hasTitle) {
                errors.push(`Module "${module.id}" set "${setId || setIndex}" is missing title.`);
            }

            const descValue = setItem?.description;
            const hasDescription = typeof descValue === 'string'
                ? !!descValue.trim()
                : !!(descValue && typeof descValue === 'object' && (descValue.en || descValue.es));
            if (!hasDescription) {
                errors.push(`Module "${module.id}" set "${setId || setIndex}" is missing description.`);
            }

            const deepExplanationValue = setItem?.deepExplanation;
            const hasDeepExplanation = typeof deepExplanationValue === 'string'
                ? !!deepExplanationValue.trim()
                : !!(
                    deepExplanationValue
                    && typeof deepExplanationValue === 'object'
                    && (
                        String(deepExplanationValue.en || '').trim()
                        || String(deepExplanationValue.es || '').trim()
                    )
                );
            if (!hasDeepExplanation) {
                errors.push(`Module "${module.id}" set "${setId || setIndex}" is missing deepExplanation.`);
            }

            const setCodeExamples = setItem?.codeExamples || {};
            requiredSetLanguages.forEach((lang) => {
                if (!String(setCodeExamples[lang] || '').trim()) {
                    errors.push(`Module "${module.id}" set "${setId || setIndex}" missing codeExamples.${lang}`);
                }
            });
            requiredRunnables.forEach((lang) => {
                const code = String(setCodeExamples[lang] || '');
                if (code.trim() && !outputRegexByLanguage[lang].test(code)) {
                    errors.push(`Module "${module.id}" set "${setId || setIndex}" ${lang} sample appears to have no visible stdout.`);
                }
            });

            const setExpectedOutputs = setItem?.expectedOutputs || {};
            requiredSetLanguages.forEach((lang) => {
                if (!String(setExpectedOutputs[lang] || '').trim()) {
                    errors.push(`Module "${module.id}" set "${setId || setIndex}" missing expectedOutputs.${lang}`);
                }
            });
        });

        if (definitions.length !== 5) {
            errors.push(`Module "${module.id}" must have exactly 5 definitions (found ${definitions.length}).`);
        } else {
            definitions.forEach((entry, index) => {
                if (!entry || !String(entry.term || '').trim() || !String(entry.definition || '').trim()) {
                    errors.push(`Module "${module.id}" has invalid definition at index ${index}.`);
                }
            });
        }

        if (typeof buildModuleDefinitions !== 'function') {
            errors.push('buildModuleDefinitions helper is not available.');
        } else {
            const esDefs = buildModuleDefinitions(module, 'es');
            if (!Array.isArray(esDefs) || esDefs.length !== 5) {
                errors.push(`Module "${module.id}" Spanish definition fallback did not produce 5 entries.`);
            }
        }
    });

    const categoryValues = new Set(Object.values(MODULE_CATEGORY_BY_ID));
    ['dsa', 'discrete', 'java', 'git', 'assembly'].forEach((expected) => {
        if (!categoryValues.has(expected)) {
            errors.push(`Category mapping is missing expected category key: ${expected}`);
        }
    });
    if (categoryValues.has('systems')) {
        errors.push('Stale "systems" category key still present in MODULE_CATEGORY_BY_ID.');
    }

    const html = fs.readFileSync(INDEX_PATH, 'utf8');
    const topicFilters = [...html.matchAll(/data-topic-filter="([^"]+)"/g)].map((match) => match[1]);
    const uniqueFilters = new Set(topicFilters);
    ['all', 'dsa', 'discrete', 'java', 'git', 'assembly'].forEach((filterKey) => {
        if (!uniqueFilters.has(filterKey)) {
            errors.push(`Missing topic filter button for "${filterKey}" in index.html`);
        }
    });
    if (uniqueFilters.has('systems')) {
        errors.push('Stale topic filter "systems" still exists in index.html');
    }

    if (source.includes('Add custom System.out.println(...) lines to show algorithm results.')) {
        errors.push('Coaching prompt string still exists in script.js');
    }
    if (source.includes('No explicit print/output lines were found.')) {
        errors.push('No-output coaching string still exists in script.js');
    }
    if (source.includes('Tip: add System.out.println(...)')) {
        errors.push('Tip coaching string still exists in script.js');
    }

    if (errors.length) {
        console.error('Module example verification failed:');
        errors.forEach((error) => console.error(`- ${error}`));
        process.exit(1);
    }

    console.log('Module example verification passed.');
    console.log(`- modules: ${modules.length}`);
    console.log('- java/cpp/python/javascript parity: OK');
    console.log('- assembly + runnable parity: OK');
    console.log('- full codeExampleSets coverage: OK');
    console.log('- topic-level deep explanations: OK');
    console.log('- definitions (5 each): OK');
    console.log('- topic filter/category split (java+git): OK');
    console.log('- no coaching output prompts: OK');
}

main();
