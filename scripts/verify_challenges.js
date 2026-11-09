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
const MiniShell = require('../js/mini-shell.js');
// Same comparison the site uses for predict-the-output answers: trailing spaces and blank lines at the end do not matter.
const normOut = (x) => x.replace(/\r/g, '').split('\n').map((l) => l.replace(/\s+$/, '')).join('\n').replace(/\n+$/, '');
const MiniShellPredictMatch = (a, b) => normOut(a) === normOut(b);
const os = require('os');
// Runs setup + solution in real Bash inside a throwaway home folder and snapshots it like the simulator does.
function realBash(setup, code) {
  const home = fs.mkdtempSync(path.join(os.tmpdir(), 'atlas-sh-'));
  const gitcfg = path.join(os.tmpdir(), 'atlas-gitconfig-' + process.pid);
  fs.writeFileSync(gitcfg, '[user]\n\tname = Learner\n\temail = learner@example.com\n[init]\n\tdefaultBranch = main\n[advice]\n\tdetachedHead = false\n');
  const env = { PATH: process.env.PATH, HOME: home, LC_ALL: 'C', USER: 'learner', GIT_CONFIG_GLOBAL: gitcfg, GIT_CONFIG_NOSYSTEM: '1', GIT_AUTHOR_DATE: '2026-01-05T10:00:00Z', GIT_COMMITTER_DATE: '2026-01-05T10:00:00Z' };
  const run = (src) => spawnSync('bash', ['--norc', '--noprofile', '-c', 'umask 022; cd "$HOME"; ' + src], { cwd: home, env, encoding: 'utf8', timeout: 10000 });
  const s = run(setup);
  if (s.status !== 0) return { error: 'setup: ' + s.stderr };
  const r = run(code);
  if (r.stderr) return { error: r.stderr };
  const files = [];
  const repos = [];
  const walk = (dir, rel) => fs.readdirSync(dir).sort().forEach((n) => {
    if (n === '.git') { repos.push(rel || '.'); return; }
    const full = path.join(dir, n), st = fs.statSync(full), r2 = rel ? rel + '/' + n : n;
    if (st.isDirectory()) { files.push({ path: r2 + '/', mode: (st.mode & 0o777).toString(8) }); walk(full, r2); }
    else files.push({ path: r2, mode: (st.mode & 0o777).toString(8), data: fs.readFileSync(full, 'utf8') });
  });
  walk(home, '');
  files.sort((a, b) => (a.path.replace(/\/$/, '') < b.path.replace(/\/$/, '') ? -1 : 1));
  // The same Git summary the simulator grades: head, branches (first-parent messages + tracked files), status.
  const git = repos.sort().map((repo) => {
    const g = (...a) => spawnSync('git', a, { cwd: path.join(home, repo === '.' ? '' : repo), env, encoding: 'utf8' }).stdout;
    const lines = (x) => x.split('\n').filter(Boolean);
    const branches = {};
    for (const b of lines(g('for-each-ref', '--format=%(refname:short)', 'refs/heads/')).sort()) branches[b] = { commits: lines(g('log', '--first-parent', '--format=%s', b)), files: lines(g('ls-tree', '-r', '--name-only', b)).sort() };
    return { repo, head: g('branch', '--show-current').trim(), branches, status: g('status', '--short').split('\n').filter(Boolean) };
  });
  fs.rmSync(home, { recursive: true, force: true });
  return { files, git, out: r.stdout.split(home).join(MiniShell.HOME) };
}

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
    if (ch.lang === 'predict') {
      // Predict-the-output: the recorded answer must be exactly what the program prints when really run.
      if (!ch.code || !ch.solution) { errors.push(`${where}: needs code and solution`); continue; }
      if (ch.codeLang !== 'java') { errors.push(`${where}: unsupported codeLang ${ch.codeLang}`); continue; }
      const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'atlas-java-'));
      fs.writeFileSync(path.join(dir, 'Main.java'), ch.code);
      const r = spawnSync('java', ['Main.java'], { cwd: dir, encoding: 'utf8', timeout: 60000 });
      fs.rmSync(dir, { recursive: true, force: true });
      if (r.error || r.status !== 0) errors.push(`${where}: java failed: ${(r.error && r.error.message) || r.stderr.slice(-300)}`);
      else if (r.stdout !== ch.solution) errors.push(`${where}: recorded answer differs from the real output: ${JSON.stringify(r.stdout)}`);
      if (MiniShellPredictMatch(ch.starter || '', ch.solution)) errors.push(`${where}: starter already matches`);
      continue;
    }
    if (ch.lang === 'bash') {
      // Command-line challenges run in js/mini-shell.js on the site. Here the solution must pass there,
      // the starter must fail, and real Bash must end with the same files, permissions and output.
      const sol = MiniShell.gradeShell(ch, ch.solution);
      if (!sol.ok) errors.push(`${where}: solution does not pass in the simulator: ${JSON.stringify(sol.problems)} ${sol.got.error || ''}`);
      if (sol.got.transcript.some((x) => x.err)) errors.push(`${where}: solution prints errors in the simulator: ${sol.got.transcript.map((x) => x.err).join('')}`);
      if (MiniShell.gradeShell(ch, ch.starter).ok) errors.push(`${where}: starter already passes`);
      const real = realBash(ch.setup || '', ch.solution);
      if (real.error) { errors.push(`${where}: real bash failed: ${real.error}`); continue; }
      const sim = sol.want;
      if (JSON.stringify(real.files) !== JSON.stringify(sim.files)) errors.push(`${where}: simulator files differ from real bash:\n  sim:  ${JSON.stringify(sim.files)}\n  bash: ${JSON.stringify(real.files)}`);
      if (JSON.stringify(real.git) !== JSON.stringify(sim.git)) errors.push(`${where}: simulator git state differs from real git:\n  sim:  ${JSON.stringify(sim.git)}\n  git:  ${JSON.stringify(real.git)}`);
      if (ch.output && real.out !== sim.out) errors.push(`${where}: simulator output differs from real bash: ${JSON.stringify(sim.out)} vs ${JSON.stringify(real.out)}`);
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
