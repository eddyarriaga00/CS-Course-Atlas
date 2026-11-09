#!/usr/bin/env node
// Checks data/challenges.json: every challenge belongs to a catalog module, has bilingual text,
// a starter that FAILS its tests and a solution that PASSES all of them (run with python3,
// using the same harness the browser uses: scripts/lib/challenge_harness.py).
const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const ROOT = path.resolve(__dirname, '..');
const { modules } = require('./lib/catalog').loadCatalog();
const harness = fs.readFileSync(path.join(__dirname, 'lib', 'challenge_harness.py'), 'utf8');
const data = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'challenges.json'), 'utf8'));
const errors = [];
const webJobs = [];   // html/css challenges, checked in Chromium after the loop
const vm = require('vm');
// JavaScript challenges: tests are [call, expectedJSON]; run in a fresh sandbox like the browser worker does.
function gradeJs(code, tests) {
  try {
    const ctx = vm.createContext({});
    vm.runInContext(code, ctx, { timeout: 2000 });
    return { results: tests.map(([call, want]) => {
      try { const got = vm.runInContext(call, ctx, { timeout: 2000 }); return { call, ok: JSON.stringify(got) === JSON.stringify(JSON.parse(want)), got: JSON.stringify(got) }; }
      catch (e) { return { call, ok: false, got: String(e) }; }
    }) };
  } catch (e) { return { error: String(e) }; }
}
let count = 0;

function grade(code, tests) {
  const program = `${code}\n__TESTS = ${JSON.stringify(tests)}\n${harness}`;
  const r = spawnSync('python3', ['-c', program], { encoding: 'utf8', timeout: 10000 });
  const line = (r.stdout || '').split('\n').find((l) => l.startsWith('__ATLAS_RESULTS__'));
  if (!line) return { error: (r.stderr || r.stdout || 'no output').trim().split('\n').slice(-2).join(' ') };
  return { results: JSON.parse(line.slice('__ATLAS_RESULTS__'.length)) };
}

function sqlRows(setup, query) {
  const py = `import json, sqlite3, sys\ndb = sqlite3.connect(':memory:')\ndb.executescript(sys.argv[1])\nrows = []\ncur = db.cursor()\nimport re\nbuf = ''\nfor line in sys.argv[2].splitlines():\n    buf += line + '\\n'\n    if sqlite3.complete_statement(buf):\n        cur.execute(buf)\n        if cur.description: rows = cur.fetchall()\n        buf = ''\nprint(json.dumps(rows))`;
  const r = spawnSync('python3', ['-c', py, setup, query], { encoding: 'utf8', timeout: 10000 });
  if (r.status !== 0) return { error: (r.stderr || '').trim().split('\n').pop() };
  return { rows: JSON.parse(r.stdout) };
}

for (const [moduleId, list] of Object.entries(data)) {
  if (moduleId.startsWith('_')) continue;
  if (!modules.some((m) => m.id === moduleId)) { errors.push(`${moduleId}: not a catalog module`); continue; }
  const ids = new Set();
  for (const ch of list) {
    const where = `${moduleId}/${ch.id}`;
    count += 1;
    if (ids.has(ch.id)) errors.push(`${where}: duplicate id`);
    ids.add(ch.id);
    for (const key of ['title', 'prompt', 'hint']) for (const lang of ['en', 'es']) if (!ch[key]?.[lang]?.trim()) errors.push(`${where}: missing ${key}.${lang}`);
    if (ch.lang === 'html' || ch.lang === 'css') {
      if (!Array.isArray(ch.checks) || ch.checks.length < 2) errors.push(`${where}: needs at least 2 checks`);
      webJobs.push({ where, ch });
      continue;
    }
    if (ch.lang === 'js') {
      if (!Array.isArray(ch.tests) || ch.tests.length < 3) errors.push(`${where}: needs at least 3 tests`);
      const sol = gradeJs(ch.solution, ch.tests);
      if (sol.error) errors.push(`${where}: solution crashed: ${sol.error}`);
      else sol.results.filter((r) => !r.ok).forEach((r) => errors.push(`${where}: solution fails ${r.call}: got ${r.got}`));
      const start = gradeJs(ch.starter, ch.tests);
      if (!start.error && start.results.every((r) => r.ok)) errors.push(`${where}: starter already passes every test`);
      continue;
    }
    if (ch.lang === 'sql') {
      // SQL challenges: the learner's last result set must equal the solution's (as sets when unordered).
      const sol = sqlRows(ch.setup, ch.solution);
      if (sol.error) { errors.push(`${where}: solution fails: ${sol.error}`); continue; }
      if (!sol.rows.length) errors.push(`${where}: solution returns no rows`);
      const start = sqlRows(ch.setup, ch.starter);
      if (!start.error && JSON.stringify(start.rows) === JSON.stringify(sol.rows)) errors.push(`${where}: starter already matches`);
      continue;
    }
    if (!Array.isArray(ch.tests) || ch.tests.length < 3) errors.push(`${where}: needs at least 3 tests`);
    const sol = grade(ch.solution, ch.tests);
    if (sol.error) errors.push(`${where}: solution crashed: ${sol.error}`);
    else sol.results.filter((r) => !r.ok).forEach((r) => errors.push(`${where}: solution fails ${r.call}: got ${r.got}, want ${r.want}`));
    const start = grade(ch.starter, ch.tests);
    if (!start.error && start.results.every((r) => r.ok)) errors.push(`${where}: starter already passes every test`);
  }
}
async function checkWeb() {
  if (!webJobs.length) return;
  const { chromium } = require('@playwright/test');
  const { runWebChecks } = require('./lib/web_checks');
  const browser = await chromium.launch();
  const page = await browser.newPage({ javaScriptEnabled: false });
  const grade = async (html, checks) => { await page.setContent(html); return page.evaluate(`(${runWebChecks.toString()})(document, window, ${JSON.stringify(checks)})`); };
  for (const { where, ch } of webJobs) {
    (await grade(ch.solution, ch.checks)).filter((r) => !r.ok).forEach((r) => errors.push(`${where}: solution fails check "${r.label.en}": ${r.got}`));
    if ((await grade(ch.starter, ch.checks)).every((r) => r.ok)) errors.push(`${where}: starter already passes every check`);
  }
  await browser.close();
}

checkWeb().then(() => {
if (errors.length) {
  console.error(`Challenge verification failed (${errors.length}):`);
  errors.forEach((e) => console.error('- ' + e));
  process.exit(1);
}
console.log(`Challenge verification passed: ${count} challenges, every solution passes and every starter fails.`);
});
