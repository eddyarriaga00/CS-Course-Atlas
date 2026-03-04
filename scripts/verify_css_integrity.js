#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const CSS_PATH = path.join(ROOT, 'css', 'styles.css');

function countOccurrences(source, pattern) {
    const matches = source.match(pattern);
    return matches ? matches.length : 0;
}

function main() {
    const css = fs.readFileSync(CSS_PATH, 'utf8');
    const errors = [];

    const criticalSelectorChecks = [
        { name: '#main-header.header-collapsed #header-buttons', pattern: /#main-header\.header-collapsed\s+#header-buttons\s*\{/g, expected: 1 },
        { name: '#settings-modal .modal-panel', pattern: /#settings-modal\s+\.modal-panel\s*\{/g, min: 2 },
        { name: '.settings-modal-body', pattern: /\.settings-modal-body\s*\{/g, min: 2 },
        { name: '.settings-modal-footer', pattern: /\.settings-modal-footer\s*\{/g, min: 2 },
        { name: '.topic-focus-btn', pattern: /\.topic-focus-btn\s*\{/g, expected: 1 }
    ];

    criticalSelectorChecks.forEach(({ name, pattern, expected, min }) => {
        const count = countOccurrences(css, pattern);
        if (typeof expected === 'number' && count !== expected) {
            errors.push(`Expected ${expected} occurrence(s) of ${name}, found ${count}.`);
        }
        if (typeof min === 'number' && count < min) {
            errors.push(`Expected at least ${min} occurrence(s) of ${name}, found ${count}.`);
        }
    });

    const requiredSafeAreaPatterns = [
        /viewport-fit=cover/,
        /env\(safe-area-inset-top\)/,
        /env\(safe-area-inset-bottom\)/,
        /height:\s*100dvh;/,
        /position:\s*sticky;\s*\n\s*bottom:\s*0;/
    ];
    const indexHtml = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
    requiredSafeAreaPatterns.forEach((pattern) => {
        const source = pattern.source.includes('viewport-fit') ? indexHtml : css;
        if (!pattern.test(source)) {
            errors.push(`Missing required mobile safe-area rule: ${pattern}`);
        }
    });

    const forbiddenBroadOverrides = [
        /(^|\n)\s*button\s*\{[^}]*!important[^}]*\}/m,
        /(^|\n)\s*select\s*,\s*input\[type="text"\]\s*,\s*textarea\s*\{[^}]*!important[^}]*\}/m
    ];
    forbiddenBroadOverrides.forEach((pattern) => {
        if (pattern.test(css)) {
            errors.push(`Found forbidden broad !important override: ${pattern}`);
        }
    });

    const requiredScopedRules = [
        /#main-header\s+button\s*,[\s\S]*#main-content\s+button\s*,[\s\S]*\.modal-panel\s+button\s*,[\s\S]*\.prompt-modal-panel\s+button\s*\{/,
        /#main-content\s+select\s*,[\s\S]*#main-content\s+input\[type="text"\][\s\S]*\.modal-panel\s+select[\s\S]*\.prompt-modal-panel\s+textarea\s*\{/
    ];
    requiredScopedRules.forEach((pattern) => {
        if (!pattern.test(css)) {
            errors.push(`Missing required scoped selector override: ${pattern}`);
        }
    });

    if (errors.length) {
        console.error('CSS integrity verification failed:');
        errors.forEach((error) => console.error(`- ${error}`));
        process.exit(1);
    }

    console.log('CSS integrity verification passed.');
    console.log('- canonical mobile header + settings selectors: OK');
    console.log('- iPhone safe-area layout rules: OK');
    console.log('- no broad global !important selector overrides: OK');
}

main();
