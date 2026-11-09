#!/usr/bin/env node
/*
 * Compiles and runs every course code example and checks its output.
 *
 * Data: js/course-examples.js (window.COURSE_EXAMPLES) or a JSON file with the
 * same `modules` shape. For each module: `main` and every entry of `sets` has
 * `code` (java/cpp/python/javascript and, for the assembly track, assembly)
 * and `output` (expected stdout per language, recorded with --write). The Git track uses
 * `bash` instead: a terminal session run with real git in an empty folder, recorded as a
 * transcript ("$ command" then its output).
 *
 * Usage:
 *   node scripts/run_course_examples.js                 # verify js/course-examples.js
 *   node scripts/run_course_examples.js --file x.json   # verify a JSON batch
 *   node scripts/run_course_examples.js --module heaps  # only some modules (repeatable)
 *   node scripts/run_course_examples.js --write         # record actual stdout as expected output
 *   node scripts/run_course_examples.js --jobs 8
 *
 * Checks: every program compiles, exits 0 within the timeout and prints something;
 * recorded outputs match; java/cpp/python/javascript print the same thing unless the
 * example sets `outputsMayDiffer` (e.g. hash iteration order).
 * Toolchain: java (17+), g++, python3, node, nasm + ld/gcc, bash + git.
 */
const fs = require('fs');
const os = require('os');
const path = require('path');
const vm = require('vm');
const { spawnSync, spawn } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const DEFAULT_DATA = path.join(ROOT, 'js', 'course-examples.js');
const RUNNABLE = ['java', 'cpp', 'python', 'javascript', 'assembly', 'bash'];
const PARITY_LANGS = ['java', 'cpp', 'python', 'javascript'];
const TIMEOUT_MS = 30000;

function parseArgs(argv) {
    const args = { file: DEFAULT_DATA, modules: [], write: false, jobs: Math.max(2, Math.min(8, os.cpus().length)) };
    for (let i = 0; i < argv.length; i += 1) {
        const arg = argv[i];
        if (arg === '--file') args.file = path.resolve(argv[++i]);
        else if (arg === '--module') args.modules.push(argv[++i]);
        else if (arg === '--write') args.write = true;
        else if (arg === '--jobs') args.jobs = Number(argv[++i]) || args.jobs;
        else throw new Error(`Unknown argument: ${arg}`);
    }
    return args;
}

function loadData(file) {
    const text = fs.readFileSync(file, 'utf8');
    if (file.endsWith('.json')) return { kind: 'json', data: JSON.parse(text) };
    const sandbox = { window: {} };
    vm.runInNewContext(text, sandbox);
    if (!sandbox.window.COURSE_EXAMPLES) throw new Error(`${file} did not define window.COURSE_EXAMPLES`);
    return { kind: 'js', data: sandbox.window.COURSE_EXAMPLES, header: text.slice(0, text.indexOf('window.COURSE_EXAMPLES')) };
}

function saveData(file, loaded) {
    if (loaded.kind === 'json') {
        fs.writeFileSync(file, `${JSON.stringify(loaded.data, null, 2)}\n`);
    } else {
        fs.writeFileSync(file, `${loaded.header}window.COURSE_EXAMPLES = ${JSON.stringify(loaded.data, null, 2)};\n`);
    }
}

function normalizeOutput(text) {
    return String(text || '')
        .replace(/\r\n/g, '\n')
        .split('\n')
        // A bare \r (git's progress counters) overwrites the line, so keep what a terminal would show last.
        .map((line) => line.split('\r').filter((part) => part.trim()).pop() || '')
        .map((line) => line.replace(/\s+$/, ''))
        .join('\n')
        .replace(/\n+$/, '');
}

function run(command, args, options = {}) {
    return new Promise((resolve) => {
        const env = options.env ? { PATH: process.env.PATH, ...options.env } : { ...process.env, JAVA_TOOL_OPTIONS: '' };
        const child = spawn(command, args, { cwd: options.cwd, env });
        let stdout = '';
        let stderr = '';
        const timer = setTimeout(() => child.kill('SIGKILL'), TIMEOUT_MS);
        child.stdout.on('data', (chunk) => { stdout += chunk; if (stdout.length > 200000) child.kill('SIGKILL'); });
        child.stderr.on('data', (chunk) => { stderr += chunk; });
        child.on('close', (code, signal) => {
            clearTimeout(timer);
            resolve({ code, signal, stdout, stderr: stderr.replace(/^Picked up JAVA_TOOL_OPTIONS.*\n?/gm, '') });
        });
        child.on('error', (error) => { clearTimeout(timer); resolve({ code: -1, stdout, stderr: String(error) }); });
    });
}

async function runProgram(language, source, workDir) {
    fs.mkdirSync(workDir, { recursive: true });
    if (language === 'java') {
        const className = (source.match(/public\s+(?:final\s+)?class\s+(\w+)/) || source.match(/^\s*class\s+(\w+)/m) || [])[1] || 'Main';
        const file = path.join(workDir, `${className}.java`);
        fs.writeFileSync(file, source);
        return run('java', ['-Xss8m', file], { cwd: workDir });
    }
    if (language === 'cpp') {
        const file = path.join(workDir, 'main.cpp');
        const binary = path.join(workDir, 'main');
        fs.writeFileSync(file, source);
        const compiled = await run('g++', ['-std=c++17', '-O1', '-Wall', '-o', binary, file], { cwd: workDir });
        if (compiled.code !== 0) return { ...compiled, phase: 'compile' };
        return run(binary, [], { cwd: workDir });
    }
    if (language === 'python') {
        const file = path.join(workDir, 'main.py');
        fs.writeFileSync(file, source);
        return run('python3', [file], { cwd: workDir });
    }
    if (language === 'javascript') {
        const file = path.join(workDir, 'main.js');
        fs.writeFileSync(file, source);
        return run('node', [file], { cwd: workDir });
    }
    if (language === 'assembly') {
        const file = path.join(workDir, 'main.asm');
        const object = path.join(workDir, 'main.o');
        const binary = path.join(workDir, 'main');
        fs.writeFileSync(file, source);
        const assembled = await run('nasm', ['-f', 'elf64', '-o', object, file], { cwd: workDir });
        if (assembled.code !== 0) return { ...assembled, phase: 'assemble' };
        const usesLibc = /\bglobal\s+main\b/.test(source);
        const linked = usesLibc
            ? await run('gcc', ['-no-pie', '-o', binary, object], { cwd: workDir })
            : await run('ld', ['-o', binary, object], { cwd: workDir });
        if (linked.code !== 0) return { ...linked, phase: 'link' };
        return run(binary, [], { cwd: workDir });
    }
    if (language === 'bash') {
        // Terminal sessions (Git course): run in an empty folder with a throwaway HOME and a fixed
        // identity and clock, so commit hashes and output are the same on every machine.
        const home = path.join(workDir, 'home');
        fs.mkdirSync(home, { recursive: true });
        fs.writeFileSync(path.join(home, '.gitconfig'), GIT_CONFIG);
        const sessionDir = path.join(workDir, 'session');
        fs.mkdirSync(sessionDir, { recursive: true });
        const file = path.join(workDir, 'session.sh');
        fs.writeFileSync(file, transcriptScript(source));
        return run('bash', ['--noprofile', '--norc', file], { cwd: sessionDir, env: { HOME: home, GIT_CONFIG_NOSYSTEM: '1', ...FIXED_GIT_CLOCK, LANG: 'C', LC_ALL: 'C', TERM: 'dumb' } });
    }
    return { code: -1, stdout: '', stderr: `unsupported language ${language}` };
}

const GIT_CONFIG = `[user]
\tname = Ana Ruiz
\temail = ana@example.com
[init]
\tdefaultBranch = main
[advice]
\tdetachedHead = false
\tskippedCherryPicks = false
\tstatusHints = false
\tresolveConflict = false
\tmergeConflict = false
[color]
\tui = false
[core]
\tpager = cat
[pull]
\trebase = false
`;
const FIXED_GIT_CLOCK = {
    GIT_AUTHOR_DATE: '2026-01-05T10:00:00Z',
    GIT_COMMITTER_DATE: '2026-01-05T10:00:00Z'
};

// Turns a session script into one that prints each command (as typed, after "$ ") before running
// it, so the recorded output reads like a terminal. A block is one line, a line continued with a
// trailing backslash, or a command with a here-document. Comment and blank lines are not echoed.
function transcriptScript(source) {
    const lines = String(source).replace(/\r\n/g, '\n').split('\n');
    const out = ['exec 2>&1'];
    for (let i = 0; i < lines.length; i += 1) {
        const line = lines[i];
        if (!line.trim() || /^\s*#/.test(line)) continue;
        const block = [line];
        const heredoc = line.match(/<<-?\s*['"]?(\w+)['"]?/);
        if (heredoc) {
            while (i + 1 < lines.length) { i += 1; block.push(lines[i]); if (lines[i].trim() === heredoc[1]) break; }
        } else {
            while (/\\$/.test(block[block.length - 1]) && i + 1 < lines.length) { i += 1; block.push(lines[i]); }
        }
        const shown = block.map((text, index) => (index === 0 ? `$ ${text}` : text)).join('\n');
        out.push(`printf '%s\\n' ${shellQuote(shown)}`, block.join('\n'));
    }
    return `${out.join('\n')}\n`;
}

function shellQuote(text) {
    return `'${String(text).replace(/'/g, `'\\''`)}'`;
}

function collectJobs(data, selectedModules) {
    const jobs = [];
    for (const [moduleId, entry] of Object.entries(data.modules || {})) {
        if (selectedModules.length && !selectedModules.includes(moduleId)) continue;
        const examples = [];
        if (entry.main) examples.push({ label: `${moduleId} main`, example: entry.main });
        (entry.sets || []).forEach((set, index) => examples.push({ label: `${moduleId} set ${index + 1} (${set.topic})`, example: set }));
        for (const { label, example } of examples) {
            for (const language of RUNNABLE) {
                if (typeof example.code?.[language] === 'string' && example.code[language].trim()) {
                    jobs.push({ moduleId, label, example, language });
                }
            }
        }
    }
    return jobs;
}

async function main() {
    const args = parseArgs(process.argv.slice(2));
    for (const [tool, flag] of [['java', '-version'], ['g++', '--version'], ['python3', '--version'], ['node', '--version'], ['nasm', '-v'], ['git', '--version']]) {
        if (spawnSync(tool, [flag]).status !== 0) {
            console.error(`Missing required tool: ${tool}`);
            process.exit(2);
        }
    }
    const loaded = loadData(args.file);
    const jobs = collectJobs(loaded.data, args.modules);
    const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'course-examples-'));
    const failures = [];
    let done = 0;
    let next = 0;

    async function worker(workerIndex) {
        while (next < jobs.length) {
            const job = jobs[next++];
            const workDir = path.join(tempRoot, `w${workerIndex}-${done}-${job.language}`);
            const result = await runProgram(job.language, job.example.code[job.language], workDir);
            fs.rmSync(workDir, { recursive: true, force: true });
            done += 1;
            const actual = normalizeOutput(result.stdout);
            if (result.code !== 0 || result.signal) {
                failures.push(`${job.label} [${job.language}] ${result.phase || 'run'} failed (exit ${result.code}${result.signal ? `, ${result.signal}` : ''}):\n${String(result.stderr || result.stdout).trim().split('\n').slice(0, 12).join('\n')}`);
                continue;
            }
            if (!actual) {
                failures.push(`${job.label} [${job.language}] printed nothing`);
                continue;
            }
            job.example.output = job.example.output || {};
            if (args.write) {
                job.example.output[job.language] = actual;
            } else if (normalizeOutput(job.example.output[job.language]) !== actual) {
                failures.push(`${job.label} [${job.language}] output differs from recorded expected output (re-run with --write if the change is intended)`);
            }
            job.actual = actual;
        }
    }

    console.log(`Running ${jobs.length} programs with ${args.jobs} workers...`);
    await Promise.all(Array.from({ length: args.jobs }, (_, index) => worker(index)));
    fs.rmSync(tempRoot, { recursive: true, force: true });

    // Cross-language parity: the four high-level languages should print the same lines.
    const byExample = new Map();
    for (const job of jobs) {
        if (!PARITY_LANGS.includes(job.language) || job.actual === undefined) continue;
        if (!byExample.has(job.example)) byExample.set(job.example, { label: job.label, outputs: {} });
        byExample.get(job.example).outputs[job.language] = job.actual;
    }
    for (const [example, info] of byExample) {
        if (example.outputsMayDiffer) continue;
        const distinct = new Set(Object.values(info.outputs));
        if (distinct.size > 1) {
            const langs = Object.entries(info.outputs).map(([lang, out]) => `  ${lang}: ${out.split('\n').slice(0, 3).join(' | ')}`).join('\n');
            failures.push(`${info.label}: languages print different output (set outputsMayDiffer with a reason if intentional)\n${langs}`);
        }
    }

    if (args.write && !failures.some((failure) => / failed | printed nothing/.test(failure))) {
        saveData(args.file, loaded);
        console.log(`Recorded outputs written to ${path.relative(process.cwd(), args.file)}`);
    }
    if (failures.length) {
        console.error(`\n${failures.length} problem(s):`);
        failures.forEach((failure) => console.error(`- ${failure}`));
        process.exit(1);
    }
    console.log(`All ${jobs.length} programs ran successfully${args.write ? '' : ' and matched their expected output'}.`);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
