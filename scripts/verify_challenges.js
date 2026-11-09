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
let count = 0;

function grade(code, tests) {
  const program = `${code}\n__TESTS = ${JSON.stringify(tests)}\n${harness}`;
  const r = spawnSync('python3', ['-c', program], { encoding: 'utf8', timeout: 10000 });
  const line = (r.stdout || '').split('\n').find((l) => l.startsWith('__ATLAS_RESULTS__'));
  if (!line) return { error: (r.stderr || r.stdout || 'no output').trim().split('\n').slice(-2).join(' ') };
  return { results: JSON.parse(line.slice('__ATLAS_RESULTS__'.length)) };
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
    if (!Array.isArray(ch.tests) || ch.tests.length < 3) errors.push(`${where}: needs at least 3 tests`);
    const sol = grade(ch.solution, ch.tests);
    if (sol.error) errors.push(`${where}: solution crashed: ${sol.error}`);
    else sol.results.filter((r) => !r.ok).forEach((r) => errors.push(`${where}: solution fails ${r.call}: got ${r.got}, want ${r.want}`));
    const start = grade(ch.starter, ch.tests);
    if (!start.error && start.results.every((r) => r.ok)) errors.push(`${where}: starter already passes every test`);
  }
}
if (errors.length) {
  console.error(`Challenge verification failed (${errors.length}):`);
  errors.forEach((e) => console.error('- ' + e));
  process.exit(1);
}
console.log(`Challenge verification passed: ${count} challenges, every solution passes and every starter fails.`);
