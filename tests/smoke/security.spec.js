const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { test, expect } = require('@playwright/test');
const { mockApi } = require('./helpers/api-mock');

const html = fs.readFileSync(path.join(__dirname, '..', '..', 'index.html'), 'utf8');

test.describe('Security policy', () => {
    test('the inline theme script is allowed by its hash', () => {
        const csp = html.match(/http-equiv="Content-Security-Policy" content="([^"]+)"/)[1];
        const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
        expect(scripts.length).toBe(1);
        const hash = crypto.createHash('sha256').update(scripts[0]).digest('base64');
        expect(csp).toContain(`'sha256-${hash}'`);
        expect(csp).not.toContain("script-src 'self' 'unsafe-inline'");
        expect(html).not.toMatch(/\son[a-z]+="/); // inline event handlers would be blocked
    });

    test('the code runner page allows only its own script and the runtime CDN', () => {
        const runner = fs.readFileSync(path.join(__dirname, '..', '..', 'runner.html'), 'utf8');
        const csp = runner.match(/http-equiv="Content-Security-Policy" content="([^"]+)"/)[1];
        const scripts = [...runner.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
        expect(scripts.length).toBe(1);
        expect(csp).toContain(`'sha256-${crypto.createHash('sha256').update(scripts[0]).digest('base64')}'`);
        expect(csp).toContain("default-src 'none'");
        expect(csp).toMatch(/connect-src https:\/\/cdn\.jsdelivr\.net;/); // nothing else: no account server, no other sites
        expect(csp).not.toContain('onrender');
    });

    test('web previews cannot send data anywhere', () => {
        const preview = fs.readFileSync(path.join(__dirname, '..', '..', 'preview.html'), 'utf8');
        const csp = preview.match(/http-equiv="Content-Security-Policy" content="([^"]+)"/)[1];
        for (const rule of ["default-src 'none'", "connect-src 'none'", "form-action 'none'", 'img-src data: blob:']) expect(csp).toContain(rule);
    });

    test('playground code runs in an opaque origin with no network or storage', async ({ page }) => {
        await mockApi(page);
        await page.goto('/index.html#playground');
        await page.locator('[data-action="pg-lang"][data-v="javascript"]').click();
        await page.locator('#pg-code').fill(`
const t = (name, f) => { try { f(); console.log(name + ' allowed'); } catch (e) { console.log(name + ' blocked'); } };
console.log('origin ' + self.origin);
t('api', () => { const x = new XMLHttpRequest(); x.open('GET', 'https://cs-course-atlas-api.onrender.com/api/auth/session', false); x.send(); });
t('storage', () => indexedDB.open('x'));
t('caches', () => { if (typeof caches === 'undefined') throw new Error('none'); });`);
        await page.locator('[data-action="pg-run"]').click();
        await expect(page.locator('#pg-out')).toContainText('caches blocked');
        await expect(page.locator('#pg-out')).toHaveText('origin null\napi blocked\nstorage blocked\ncaches blocked\n');
    });

    test('pages and live web previews run without policy violations', async ({ page }) => {
        const violations = [];
        await page.exposeFunction('reportViolation', (v) => violations.push(v));
        await page.addInitScript(() => document.addEventListener('securitypolicyviolation', (e) => window.reportViolation(`${e.violatedDirective} ${e.blockedURI}`)));
        await mockApi(page);
        for (const hash of ['#home', '#courses', '#practice', '#m-java-basics', '#glossary']) {
            await page.goto('/index.html' + hash);
            await expect(page.locator('#main')).not.toBeEmpty();
        }
        await page.goto('/index.html#m-web-javascript');
        await page.locator('.tab[data-tab="examples"]').click();
        await page.locator('.chips .chip').nth(3).click();
        await expect(page.frameLocator('iframe.web-preview').locator('#counter')).toHaveText('Clicked 2 times');
        await page.goto('/index.html#playground');
        await page.locator('[data-action="pg-lang"][data-v="html"]').click();
        await page.locator('[data-action="pg-run"]').click();
        await expect(page.frameLocator('#pg-frame').locator('body')).not.toBeEmpty();
        expect(violations).toEqual([]);
    });
});
