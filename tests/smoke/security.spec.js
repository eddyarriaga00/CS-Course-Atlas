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
