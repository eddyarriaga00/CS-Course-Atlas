#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = process.cwd();
const SCRIPT_PATH = path.join(ROOT, 'js', 'script.js');
const SPANISH_PATH = path.join(ROOT, 'js', 'spanish-localization.js');

function fail(errors) {
    console.error('Spanish code example verification failed:');
    errors.forEach((error) => console.error(`- ${error}`));
    process.exit(1);
}

function loadBaseModules() {
    const source = fs.readFileSync(SCRIPT_PATH, 'utf8');
    const categoryMatch = source.match(/const MODULE_CATEGORY_BY_ID = \{([\s\S]*?)\n\};/);
    if (!categoryMatch) {
        throw new Error('Could not parse MODULE_CATEGORY_BY_ID');
    }
    const categoryLiteral = `{${categoryMatch[1]}\n}`;
    const categoryMap = vm.runInNewContext(`(${categoryLiteral})`, {});

    const start = source.indexOf('const modules = [');
    const end = source.indexOf('const flashcardDecks =', start);
    if (start < 0 || end < 0) {
        throw new Error('Could not extract module runtime block');
    }
    const runtimeBlock = source.slice(start, end);
    const runtimeData = vm.runInNewContext(
        `const MODULE_CATEGORY_BY_ID = ${categoryLiteral};\n${runtimeBlock}\n({ modules })`,
        {}
    );
    return {
        categoryMap,
        modules: runtimeData.modules || []
    };
}

function loadSpanishLocalization() {
    const raw = fs.readFileSync(SPANISH_PATH, 'utf8');
    const sandbox = { window: {} };
    vm.createContext(sandbox);
    vm.runInContext(raw, sandbox);
    return sandbox.window.SPANISH_LOCALIZATION || { content: {}, literals: {} };
}

function translateLiteralWithMap(text, literals = {}) {
    const key = String(text || '').trim();
    if (!key) return String(text || '');
    const translated = literals[key];
    if (!translated) return String(text || '');
    return String(text || '').replace(key, translated);
}

function translateCodeHumanTextForEs(code, literals = {}) {
    const source = String(code || '');
    if (!source.trim()) return source;
    return source.split('\n').map((line) => {
        let nextLine = line;
        const trimmed = line.trim();
        const isCppDirective = /^#\s*(include|define|if|ifdef|ifndef|endif|pragma|import)\b/i.test(trimmed);

        if (/^\s*;/.test(nextLine)) {
            const semicolonIdx = nextLine.indexOf(';');
            const head = nextLine.slice(0, semicolonIdx + 1);
            const body = nextLine.slice(semicolonIdx + 1).trim();
            const translated = translateLiteralWithMap(body, literals);
            nextLine = translated === body ? nextLine : `${head} ${translated}`;
        } else {
            const slashCommentIdx = nextLine.indexOf('//');
            if (slashCommentIdx >= 0) {
            const head = nextLine.slice(0, slashCommentIdx + 2);
            const body = nextLine.slice(slashCommentIdx + 2).trim();
            const translated = translateLiteralWithMap(body, literals);
            nextLine = translated === body ? nextLine : `${head} ${translated}`;
            } else if (!isCppDirective) {
                const hashCommentIdx = nextLine.indexOf('#');
                if (hashCommentIdx >= 0) {
                    const head = nextLine.slice(0, hashCommentIdx + 1);
                    const body = nextLine.slice(hashCommentIdx + 1).trim();
                    const translated = translateLiteralWithMap(body, literals);
                    nextLine = translated === body ? nextLine : `${head} ${translated}`;
                }
            }
        }

        nextLine = nextLine.replace(/"([^"\\]*(?:\\.[^"\\]*)*)"|'([^'\\]*(?:\\.[^'\\]*)*)'/g, (match, g1, g2) => {
            const sourceText = (g1 || g2 || '').trim();
            if (!sourceText || /^https?:\/\//i.test(sourceText)) return match;
            if (!/[A-Za-z]/.test(sourceText)) return match;
            if (!/\s/.test(sourceText) && sourceText.length <= 2) return match;
            const translated = translateLiteralWithMap(sourceText, literals);
            if (!translated || translated === sourceText) return match;
            const quote = match[0];
            return `${quote}${translated}${quote}`;
        });

        return nextLine;
    }).join('\n');
}

function collectHumanText(code, language) {
    const source = String(code || '');
    const collected = [];

    source.split('\n').forEach((line) => {
        const trimmed = line.trim();
        const slashIdx = line.indexOf('//');
        if (slashIdx >= 0) {
            collected.push(line.slice(slashIdx + 2).trim());
        } else if (language === 'python' && /^\s*#/.test(line) && !/^#\s*(include|define|if|ifdef|ifndef|endif|pragma|import)\b/i.test(trimmed)) {
            collected.push(line.replace(/^\s*#\s?/, '').trim());
        } else if (language === 'assembly' && /^\s*;/.test(line)) {
            collected.push(line.replace(/^\s*;\s?/, '').trim());
        }
    });

    for (const match of source.matchAll(/\/\*([\s\S]*?)\*\//g)) {
        const body = match[1] || '';
        body.split('\n').forEach((line) => {
            const cleaned = line.replace(/^\s*\*+\s?/, '').trim();
            if (cleaned) collected.push(cleaned);
        });
    }

    for (const match of source.matchAll(/"([^"\\]*(?:\\.[^"\\]*)*)"|'([^'\\]*(?:\\.[^'\\]*)*)'/g)) {
        const value = (match[1] || match[2] || '').trim();
        if (!value) continue;
        if (!/[A-Za-z]/.test(value)) continue;
        if (!/\s/.test(value) && value.length <= 2) continue;
        if (/^https?:\/\//i.test(value)) continue;
        collected.push(value);
    }

    return collected.filter(Boolean).join('\n');
}

function main() {
    const errors = [];
    const { modules, categoryMap } = loadBaseModules();
    const spanish = loadSpanishLocalization();
    const localizedModules = spanish.content?.modules || {};
    const literalMap = spanish.literals || {};

    const outputRegexByLanguage = {
        java: /(System\.out\.print|System\.out\.println)/,
        cpp: /(cout\s*<<|printf\s*\()/,
        python: /\bprint\s*\(/,
        javascript: /(console\.log|process\.stdout\.write)/
    };

    const staleEnglishDenylist = [
        'Comprehensive guided sample',
        'Coverage goals:',
        'Reading strategy:',
        'Follow inline comments from top to bottom.',
        'Run once, then edit one concept at a time and rerun.',
        'Verify output after each logical step.',
        'Running module:',
        'Topic checklist:',
        'Parity checkpoints from Java sample:',
        'C++ mirror of the updated Java module sample.',
        'Python mirror of the updated Java module sample.',
        'JavaScript mirror of the updated Java module sample.',
        'Code example coming soon...',
        'Sample completed.',
        'Git learning walkthrough:'
    ];

    modules.forEach((module) => {
        const category = categoryMap[module.id] || 'dsa';
        const requiredLanguages = category === 'assembly'
            ? ['assembly', 'java', 'cpp', 'python', 'javascript']
            : ['java', 'cpp', 'python', 'javascript'];
        const localizedModule = localizedModules[module.id] || {};
        const localizedCodeExamples = localizedModule.codeExamples || {};
        const moduleCodeExamples = module.codeExamples || {};

        requiredLanguages.forEach((language) => {
            const snippet = String(localizedCodeExamples[language] || '').trim()
                ? localizedCodeExamples[language]
                : translateCodeHumanTextForEs(moduleCodeExamples[language] || '', literalMap);
            if (!snippet || typeof snippet !== 'string') {
                errors.push(`Module ${module.id} missing Spanish code example for ${language}`);
                return;
            }

            if (outputRegexByLanguage[language] && !outputRegexByLanguage[language].test(snippet)) {
                errors.push(`Module ${module.id} Spanish ${language} code appears to have no visible output`);
            }

            const humanText = collectHumanText(snippet, language);
            staleEnglishDenylist.forEach((phrase) => {
                if (humanText.includes(phrase)) {
                    errors.push(`Module ${module.id} Spanish ${language} snippet still contains English phrase: ${phrase}`);
                }
            });
        });

        const moduleSets = Array.isArray(module.codeExampleSets) ? module.codeExampleSets : [];
        const localizedSets = Array.isArray(localizedModule.codeExampleSets) ? localizedModule.codeExampleSets : [];
        const localizedSetById = new Map(localizedSets.map((setItem) => [String(setItem.id), setItem]));

        moduleSets.forEach((setItem) => {
            const localizedSet = localizedSetById.get(String(setItem.id)) || {};
            const setCodeExamples = setItem.codeExamples || {};
            const localizedSetCodeExamples = localizedSet.codeExamples || {};

            requiredLanguages.forEach((language) => {
                const snippet = String(localizedSetCodeExamples[language] || '').trim()
                    ? localizedSetCodeExamples[language]
                    : translateCodeHumanTextForEs(setCodeExamples[language] || '', literalMap);

                if (!snippet || typeof snippet !== 'string') {
                    errors.push(`Module ${module.id} set ${setItem.id} missing Spanish code example for ${language}`);
                    return;
                }

                if (outputRegexByLanguage[language] && !outputRegexByLanguage[language].test(snippet)) {
                    errors.push(`Module ${module.id} set ${setItem.id} Spanish ${language} code appears to have no visible output`);
                }
            });
        });
    });

    if (errors.length) {
        fail(errors);
    }

    console.log('Spanish code example verification passed.');
    console.log(`- modules: ${modules.length}`);
}

main();
