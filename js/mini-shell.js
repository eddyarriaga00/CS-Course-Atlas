/*
 * A small Bash-like shell over an in-memory filesystem, for the Command Line challenges.
 * It runs entirely in the page: nothing touches a real computer. scripts/verify_challenges.js
 * runs every challenge solution here AND in real Bash and requires the same files, permissions
 * and output, so what learners see matches a real terminal for these commands.
 *
 * Supported: pwd cd ls mkdir touch echo printf cat cp mv rm rmdir head tail wc sort uniq grep
 * chmod export unset true false bash/sh/./script, NAME=value, $VAR ${VAR} $1.. $@ $? ~, globs
 * (* ? [..]), quotes, pipes |, redirects > >> <, ; && || and one-level `for NAME in ...; do ...; done`.
 */
(function (root) {
  const HOME = '/home/learner';

  function createShell() {
    const fs = new Map([['/', { dir: true, mode: 0o755 }], ['/home', { dir: true, mode: 0o755 }], [HOME, { dir: true, mode: 0o755 }]]);
    const sh = { fs, cwd: HOME, vars: { HOME, PWD: HOME, USER: 'learner' }, args: [], status: 0, steps: 0 };
    return sh;
  }

  /* ---------- paths ---------- */
  function norm(sh, p) {
    const parts = (p.startsWith('/') ? p : sh.cwd + '/' + p).split('/');
    const out = [];
    for (const part of parts) {
      if (!part || part === '.') continue;
      if (part === '..') out.pop(); else out.push(part);
    }
    return '/' + out.join('/');
  }
  const parent = (p) => (p.lastIndexOf('/') <= 0 ? '/' : p.slice(0, p.lastIndexOf('/')));
  const base = (p) => p.slice(p.lastIndexOf('/') + 1);
  const children = (sh, dir) => [...sh.fs.keys()].filter((k) => k !== dir && parent(k) === dir).map(base).sort(cmpC);
  const cmpC = (a, b) => (a < b ? -1 : a > b ? 1 : 0);

  /* ---------- tokenizer ---------- */
  // Words are lists of segments { t: text, q: 0 (bare) | 1 (single) | 2 (double) } so expansion can
  // happen when the command runs (a variable may be set earlier on the same line).
  function tokenize(src) {
    const toks = [];
    let i = 0, line = 1, word = null;
    const push = () => { if (word) { toks.push({ w: word, line }); word = null; } };
    const seg = (t, q) => { word = word || []; const last = word[word.length - 1]; if (last && last.q === q) last.t += t; else word.push({ t, q }); };
    while (i < src.length) {
      const c = src[i];
      if (c === '\n') { push(); toks.push({ op: ';', nl: true, line }); line++; i++; continue; }
      if (c === ' ' || c === '\t') { push(); i++; continue; }
      if (c === '#' && !word) { while (i < src.length && src[i] !== '\n') i++; continue; }
      if (c === '\\' && src[i + 1] === '\n') { i += 2; line++; continue; }
      if (c === '\\') { seg(src[i + 1] || '', 1); i += 2; continue; }
      if (c === "'") { const j = src.indexOf("'", i + 1); if (j < 0) throw new Error('unexpected EOF while looking for matching `\''); seg(src.slice(i + 1, j), 1); i = j + 1; continue; }
      if (c === '"') {
        let j = i + 1, t = '';
        while (j < src.length && src[j] !== '"') { if (src[j] === '\\' && '"\\$`'.includes(src[j + 1])) { t += '\\' + src[j + 1]; j += 2; } else t += src[j++]; }
        if (j >= src.length) throw new Error('unexpected EOF while looking for matching `"\'');
        seg(t, 2); word = word || []; if (!t) word.push({ t: '', q: 2 }); i = j + 1; continue;
      }
      const two = src.slice(i, i + 2);
      if (['&&', '||', '>>'].includes(two)) { push(); toks.push({ op: two, line }); i += 2; continue; }
      if ('|;<>'.includes(c)) { push(); toks.push({ op: c, line }); i++; continue; }
      if (c === '&') throw new Error('background jobs (&) are not supported here');
      seg(c, 0); i++;
    }
    push();
    return toks;
  }

  /* ---------- parser ---------- */
  const isWord = (tok, w) => tok && tok.w && tok.w.length === 1 && tok.w[0].q === 0 && tok.w[0].t === w;
  function parse(toks) {
    let p = 0;
    const skipSeps = () => { while (toks[p] && toks[p].op === ';') p++; };
    function list(stop) {
      const items = [];
      skipSeps();
      while (p < toks.length && !(stop && stop.some((s) => isWord(toks[p], s)))) {
        const startLine = toks[p].line;
        let node = statement(), joinOp = null;
        const chain = [{ node, op: null }];
        while (toks[p] && (toks[p].op === '&&' || toks[p].op === '||')) { joinOp = toks[p++].op; skipNl(); chain.push({ node: statement(), op: joinOp }); }
        const endLine = toks[p - 1] ? toks[p - 1].line : startLine;
        items.push({ chain, startLine, endLine });
        if (toks[p] && toks[p].op === ';') skipSeps(); else if (p < toks.length && !(stop && stop.some((s) => isWord(toks[p], s)))) throw new Error('syntax error near unexpected token `' + (toks[p].op || wordText(toks[p].w)) + "'");
      }
      return items;
    }
    const skipNl = () => { while (toks[p] && toks[p].nl) p++; };
    function statement() {
      if (isWord(toks[p], 'for')) {
        p++;
        const name = toks[p] && toks[p].w ? wordText(toks[p++].w) : null;
        if (!name || !isWord(toks[p], 'in')) throw new Error("syntax error near `for': expected `for NAME in WORDS; do ...; done'");
        p++;
        const words = [];
        while (toks[p] && toks[p].w && !isWord(toks[p], 'do')) words.push(toks[p++].w);
        skipSeps();
        if (!isWord(toks[p], 'do')) throw new Error("syntax error: expected `do'");
        p++;
        const body = list(['done']);
        if (!isWord(toks[p], 'done')) throw new Error("syntax error: expected `done'");
        p++;
        return { for: name, words, body };
      }
      const cmds = [command()];
      while (toks[p] && toks[p].op === '|') { p++; skipNl(); cmds.push(command()); }
      return { pipe: cmds };
    }
    function command() {
      const words = [], redirs = [];
      while (toks[p] && (toks[p].w || ['>', '>>', '<'].includes(toks[p].op))) {
        if (toks[p].op) { const op = toks[p++].op; if (!toks[p] || !toks[p].w) throw new Error('syntax error near unexpected token `newline\''); redirs.push({ op, w: toks[p++].w }); }
        else words.push(toks[p++].w);
      }
      if (!words.length && !redirs.length) throw new Error('syntax error near unexpected token `' + (toks[p] ? toks[p].op || wordText(toks[p].w) : 'newline') + "'");
      return { words, redirs };
    }
    const items = list(null);
    return items;
  }
  const wordText = (w) => w.map((s) => s.t).join('');

  /* ---------- expansion ---------- */
  function expandVars(sh, text) {
    return text.replace(/\\([\\"$`])|\$(\{(\w+)\}|(\w+)|([?@#]))/g, (m, esc, _b, braced, plain, special) => {
      if (esc) return esc;
      const name = braced || plain || special;
      if (name === '?') return String(sh.status);
      if (name === '@') return sh.args.join(' ');
      if (name === '#') return String(sh.args.length);
      if (/^\d+$/.test(name)) return sh.args[Number(name) - 1] || '';
      return sh.vars[name] != null ? sh.vars[name] : '';
    });
  }
  function globToRe(g) {
    let re = '';
    for (let i = 0; i < g.length; i++) {
      const c = g[i];
      if (c === '*') re += '[^/]*'; else if (c === '?') re += '[^/]'; else if (c === '[') { const j = g.indexOf(']', i + 1); if (j > i) { re += '[' + g.slice(i + 1, j).replace(/^!/, '^') + ']'; i = j; } else re += '\\['; } else re += c.replace(/[.+^${}()|\\]/g, '\\$&');
    }
    return new RegExp('^' + re + '$');
  }
  // Returns the list of fields a word expands to (globs can give several; "$x" stays one).
  function expandWord(sh, w) {
    let text = '', pattern = '', globbing = false, split = false;
    w.forEach((s, i) => {
      let t = s.q === 1 ? s.t : expandVars(sh, s.t);
      if (s.q === 0 && i === 0 && (t === '~' || t.startsWith('~/'))) t = HOME + t.slice(1);
      if (s.q === 0 && s.t.includes('$')) split = true;
      text += t;
      if (s.q === 0 && /[*?[]/.test(t)) { globbing = true; pattern += t; } else pattern += t.replace(/[*?[]/g, '\\$&');
    });
    if (globbing) {
      const dirPart = pattern.includes('/') ? pattern.slice(0, pattern.lastIndexOf('/') + 1) : '';
      const filePat = pattern.slice(dirPart.length);
      const dir = norm(sh, dirPart.replace(/\\(.)/g, '$1') || '.');
      const re = globToRe(filePat);
      const hits = sh.fs.has(dir) && sh.fs.get(dir).dir ? children(sh, dir).filter((n) => !n.startsWith('.') && re.test(n)).map((n) => dirPart.replace(/\\(.)/g, '$1') + n) : [];
      if (hits.length) return hits;
    }
    if (split) return text.split(/\s+/).filter(Boolean);
    return [text];
  }

  /* ---------- filesystem helpers ---------- */
  const isDir = (sh, p) => sh.fs.has(p) && sh.fs.get(p).dir;
  const isFile = (sh, p) => sh.fs.has(p) && !sh.fs.get(p).dir;
  function writeFile(sh, p, data, append) {
    if (isDir(sh, p)) throw new Error(`${base(p)}: Is a directory`);
    if (!isDir(sh, parent(p))) throw new Error(`${base(p)}: No such file or directory`);
    const old = sh.fs.get(p);
    sh.fs.set(p, { data: append && old ? old.data + data : data, mode: old ? old.mode : 0o644 });
  }
  function copyTree(sh, from, to) {
    for (const [k, v] of [...sh.fs.entries()]) if (k === from || k.startsWith(from + '/')) sh.fs.set(to + k.slice(from.length), { ...v });
  }
  function removeTree(sh, p) { for (const k of [...sh.fs.keys()]) if (k === p || k.startsWith(p + '/')) sh.fs.delete(k); }

  /* ---------- commands ---------- */
  const q = (s) => `‘${s}’`;
  function flags(args, allowed) {
    const f = {}, rest = [];
    let opts = true;
    for (let i = 0; i < args.length; i++) {
      const a = args[i];
      if (opts && a === '--') { opts = false; continue; }
      if (opts && /^-\d+$/.test(a) && allowed.includes('n')) { f.n = a.slice(1); continue; }
      if (opts && a.length > 1 && a[0] === '-') {
        for (let j = 1; j < a.length; j++) {
          const c = a[j];
          if (!allowed.includes(c)) throw new Error(`invalid option -- '${c}'`);
          if (c === 'n' && allowed.includes('n:')) { f.n = a.slice(j + 1) || args[++i]; break; }
          f[c] = true;
        }
      } else rest.push(a);
    }
    return [f, rest];
  }
  const lines = (s) => (s === '' ? [] : s.replace(/\n$/, '').split('\n'));
  const joinLines = (ls) => (ls.length ? ls.join('\n') + '\n' : '');
  function readInputs(sh, files, stdin, name) {
    if (!files.length) return [{ name: null, data: stdin }];
    return files.map((f) => {
      const p = norm(sh, f);
      if (isDir(sh, p)) return { name: f, err: `${name}: ${f}: Is a directory` };
      if (!isFile(sh, p)) return { name: f, err: `${name}: ${f}: No such file or directory` };
      return { name: f, data: sh.fs.get(p).data };
    });
  }
  function bre(pattern, icase) {
    // grep's basic regular expressions: + ? ( ) { } | are literal unless escaped.
    let re = '';
    for (let i = 0; i < pattern.length; i++) {
      const c = pattern[i];
      if (c === '\\' && i + 1 < pattern.length) { const n = pattern[++i]; re += '+?(){}|'.includes(n) ? n : '\\' + n; } else re += '+?(){}|'.includes(c) ? '\\' + c : c;
    }
    return new RegExp(re, icase ? 'i' : '');
  }

  const CMDS = {
    pwd: (sh) => ({ out: sh.cwd + '\n' }),
    cd(sh, args) {
      const target = norm(sh, args[0] == null ? HOME : args[0] === '-' ? sh.vars.OLDPWD || sh.cwd : args[0]);
      if (!isDir(sh, target)) return { err: `bash: cd: ${args[0]}: ${sh.fs.has(target) ? 'Not a directory' : 'No such file or directory'}\n`, code: 1 };
      sh.vars.OLDPWD = sh.cwd; sh.cwd = target; sh.vars.PWD = target; return {};
    },
    ls(sh, args) {
      const [f, paths] = flags(args, ['a', '1', 'A', 'F']);
      const show = (dir) => children(sh, dir).filter((n) => f.a || f.A || !n.startsWith('.')).map((n) => n + (f.F && isDir(sh, dir + (dir === '/' ? '' : '/') + n) ? '/' : ''));
      if (!paths.length) return { out: joinLines(f.a ? ['.', '..', ...show(sh.cwd)] : show(sh.cwd)) };
      let out = '', err = '', code = 0;
      const files = paths.filter((x) => isFile(sh, norm(sh, x))).sort(cmpC), dirs = paths.filter((x) => isDir(sh, norm(sh, x))).sort(cmpC);
      paths.filter((x) => !sh.fs.has(norm(sh, x))).forEach((x) => { err += `ls: cannot access '${x}': No such file or directory\n`; code = 2; });
      out += joinLines(files);
      dirs.forEach((d, i) => { if (paths.length > 1) out += (files.length || i ? '\n' : '') + d + ':\n'; out += joinLines(show(norm(sh, d))); });
      return { out, err, code };
    },
    mkdir(sh, args) {
      const [f, paths] = flags(args, ['p', 'v']);
      let err = '', code = 0;
      for (const x of paths) {
        const p = norm(sh, x);
        if (f.p) { const parts = p.split('/').filter(Boolean); let cur = ''; for (const part of parts) { cur += '/' + part; if (isFile(sh, cur)) { err += `mkdir: cannot create directory ${q(x)}: Not a directory\n`; code = 1; break; } if (!sh.fs.has(cur)) sh.fs.set(cur, { dir: true, mode: 0o755 }); } continue; }
        if (sh.fs.has(p)) { err += `mkdir: cannot create directory ${q(x)}: File exists\n`; code = 1; continue; }
        if (!isDir(sh, parent(p))) { err += `mkdir: cannot create directory ${q(x)}: No such file or directory\n`; code = 1; continue; }
        sh.fs.set(p, { dir: true, mode: 0o755 });
      }
      return { err, code };
    },
    touch(sh, args) {
      let err = '', code = 0;
      for (const x of args) { const p = norm(sh, x); if (sh.fs.has(p)) continue; if (!isDir(sh, parent(p))) { err += `touch: cannot touch ${q(x)}: No such file or directory\n`; code = 1; continue; } sh.fs.set(p, { data: '', mode: 0o644 }); }
      return { err, code };
    },
    echo(sh, args) { let nl = true; if (args[0] === '-n') { nl = false; args = args.slice(1); } return { out: args.join(' ') + (nl ? '\n' : '') }; },
    printf(sh, args) {
      if (!args.length) return { err: 'printf: usage: printf format [arguments]\n', code: 2 };
      const fmt = args[0], rest = args.slice(1);
      let out = '', k = 0;
      do {
        out += fmt.replace(/\\([nt\\])|%([sd%])/g, (m, e, spec) => {
          if (e) return e === 'n' ? '\n' : e === 't' ? '\t' : '\\';
          if (spec === '%') return '%';
          const v = rest[k++]; return spec === 'd' ? String(parseInt(v || '0', 10) || 0) : v == null ? '' : v;
        });
      } while (k < rest.length && /%[sd]/.test(fmt));
      return { out };
    },
    cat(sh, args, stdin) {
      const [, files] = flags(args, ['n']);
      let out = '', err = '', code = 0;
      for (const r of readInputs(sh, files, stdin, 'cat')) { if (r.err) { err += r.err + '\n'; code = 1; } else out += r.data; }
      return { out, err, code };
    },
    cp(sh, args) {
      const [f, paths] = flags(args, ['r', 'R', 'v']);
      if (paths.length < 2) return { err: 'cp: missing destination file operand\n', code: 1 };
      const dest = norm(sh, paths[paths.length - 1]), srcs = paths.slice(0, -1);
      let err = '', code = 0;
      if (srcs.length > 1 && !isDir(sh, dest)) return { err: `cp: target ${q(paths[paths.length - 1])}${sh.fs.has(dest) ? ' is not a directory' : ': No such file or directory'}\n`, code: 1 };
      for (const s of srcs) {
        const sp = norm(sh, s);
        if (!sh.fs.has(sp)) { err += `cp: cannot stat ${q(s)}: No such file or directory\n`; code = 1; continue; }
        const to = isDir(sh, dest) ? dest + '/' + base(sp) : dest;
        if (isDir(sh, sp)) { if (!(f.r || f.R)) { err += `cp: -r not specified; omitting directory ${q(s)}\n`; code = 1; continue; } copyTree(sh, sp, to); continue; }
        try { writeFile(sh, to, sh.fs.get(sp).data); } catch (e) { err += `cp: cannot create regular file ${q(paths[paths.length - 1])}: No such file or directory\n`; code = 1; }
      }
      return { err, code };
    },
    mv(sh, args) {
      const [, paths] = flags(args, ['v', 'f', 'i']);
      if (paths.length < 2) return { err: 'mv: missing destination file operand\n', code: 1 };
      const dest = norm(sh, paths[paths.length - 1]), srcs = paths.slice(0, -1);
      let err = '', code = 0;
      if (srcs.length > 1 && !isDir(sh, dest)) return { err: `mv: target ${q(paths[paths.length - 1])}${sh.fs.has(dest) ? ' is not a directory' : ': No such file or directory'}\n`, code: 1 };
      for (const s of srcs) {
        const sp = norm(sh, s);
        if (!sh.fs.has(sp)) { err += `mv: cannot stat ${q(s)}: No such file or directory\n`; code = 1; continue; }
        const to = isDir(sh, dest) ? dest + '/' + base(sp) : dest;
        if (to === sp) continue;
        if (!isDir(sh, parent(to))) { err += `mv: cannot move ${q(s)} to ${q(paths[paths.length - 1])}: No such file or directory\n`; code = 1; continue; }
        if (to.startsWith(sp + '/')) { err += `mv: cannot move ${q(s)} to a subdirectory of itself\n`; code = 1; continue; }
        removeTree(sh, to); copyTree(sh, sp, to); removeTree(sh, sp);
      }
      return { err, code };
    },
    rm(sh, args) {
      const [f, paths] = flags(args, ['r', 'R', 'f', 'v', 'i']);
      let err = '', code = 0;
      for (const x of paths) {
        const p = norm(sh, x);
        if (!sh.fs.has(p)) { if (!f.f) { err += `rm: cannot remove ${q(x)}: No such file or directory\n`; code = 1; } continue; }
        if (isDir(sh, p) && !(f.r || f.R)) { err += `rm: cannot remove ${q(x)}: Is a directory\n`; code = 1; continue; }
        if (p === HOME || HOME.startsWith(p + '/') || p === '/') { err += `rm: refusing to remove ${q(x)} here\n`; code = 1; continue; }
        removeTree(sh, p);
      }
      return { err, code };
    },
    rmdir(sh, args) {
      let err = '', code = 0;
      for (const x of args) { const p = norm(sh, x); if (!isDir(sh, p)) { err += `rmdir: failed to remove ${q(x)}: No such file or directory\n`; code = 1; } else if (children(sh, p).length) { err += `rmdir: failed to remove ${q(x)}: Directory not empty\n`; code = 1; } else sh.fs.delete(p); }
      return { err, code };
    },
    head: (sh, args, stdin) => headTail(sh, args, stdin, 'head'),
    tail: (sh, args, stdin) => headTail(sh, args, stdin, 'tail'),
    wc(sh, args, stdin) {
      const [f, files] = flags(args, ['l', 'w', 'c']);
      const pick = ['l', 'w', 'c'].filter((k) => f[k]);
      const which = pick.length ? pick : ['l', 'w', 'c'];
      const count = (d) => ({ l: (d.match(/\n/g) || []).length, w: d.split(/\s+/).filter(Boolean).length, c: new TextEncoder().encode(d).length });
      const rs = readInputs(sh, files, stdin, 'wc');
      let err = '', code = 0;
      const rows = rs.filter((r) => { if (r.err) { err += r.err + '\n'; code = 1; } return !r.err; }).map((r) => ({ name: r.name, n: count(r.data) }));
      if (rows.length > 1) rows.push({ name: 'total', n: rows.reduce((t, r) => ({ l: t.l + r.n.l, w: t.w + r.n.w, c: t.c + r.n.c }), { l: 0, w: 0, c: 0 }) });
      const width = which.length === 1 && rows.length === 1 ? 1 : files.length ? Math.max(1, String(rows.reduce((m, r) => Math.max(m, r.n.c), 0)).length) : 7;
      const out = rows.map((r) => which.map((k) => String(r.n[k]).padStart(width)).join(' ') + (r.name ? ' ' + r.name : '')).join('\n');
      return { out: out ? out + '\n' : '', err, code };
    },
    sort(sh, args, stdin) {
      const [f, files] = flags(args, ['r', 'n', 'u']);
      let all = [];
      for (const r of readInputs(sh, files, stdin, 'sort')) { if (r.err) return { err: r.err.replace('sort: ', 'sort: cannot read: ') + '\n', code: 2 }; all = all.concat(lines(r.data)); }
      const num = (s) => { const m = s.match(/^\s*(-?\d+(\.\d+)?)/); return m ? parseFloat(m[1]) : 0; };
      all.sort((a, b) => (f.n ? num(a) - num(b) || cmpC(a, b) : cmpC(a, b)));
      if (f.r) all.reverse();
      if (f.u) all = all.filter((x, i) => i === 0 || (f.n ? num(x) !== num(all[i - 1]) : x !== all[i - 1]));
      return { out: joinLines(all) };
    },
    uniq(sh, args, stdin) {
      const [f, files] = flags(args, ['c', 'd', 'u']);
      const r = readInputs(sh, files.slice(0, 1), stdin, 'uniq')[0];
      if (r.err) return { err: r.err + '\n', code: 1 };
      const groups = [];
      for (const l of lines(r.data)) { const g = groups[groups.length - 1]; if (g && g.l === l) g.n++; else groups.push({ l, n: 1 }); }
      return { out: joinLines(groups.filter((g) => (!f.d || g.n > 1) && (!f.u || g.n === 1)).map((g) => (f.c ? String(g.n).padStart(7) + ' ' : '') + g.l)) };
    },
    grep(sh, args, stdin) {
      const [f, rest] = flags(args, ['i', 'v', 'c', 'n', 'w', 'E']);
      if (!rest.length) return { err: 'Usage: grep [OPTION]... PATTERNS [FILE]...\n', code: 2 };
      const [pattern, ...files] = rest;
      let re;
      try { re = f.E ? new RegExp(pattern, f.i ? 'i' : '') : bre(pattern, f.i); } catch (e) { return { err: 'grep: Invalid regular expression\n', code: 2 }; }
      if (f.w) re = new RegExp('(^|[^\\w])(' + re.source + ')([^\\w]|$)', re.flags);
      let out = '', err = '', any = false;
      const multi = files.length > 1;
      for (const r of readInputs(sh, files, stdin, 'grep')) {
        if (r.err) { err += r.err + '\n'; continue; }
        let n = 0;
        lines(r.data).forEach((l, i) => { if (re.test(l) !== !!f.v) { n++; any = true; if (!f.c) out += (multi ? r.name + ':' : '') + (f.n ? i + 1 + ':' : '') + l + '\n'; } });
        if (f.c) out += (multi ? r.name + ':' : '') + n + '\n';
      }
      return { out, err, code: err ? 2 : any ? 0 : 1 };
    },
    chmod(sh, args) {
      if (args.length < 2) return { err: 'chmod: missing operand\n', code: 1 };
      const [mode, ...paths] = args;
      let err = '', code = 0;
      for (const x of paths) {
        const p = norm(sh, x), node = sh.fs.get(p);
        if (!node) { err += `chmod: cannot access ${q(x)}: No such file or directory\n`; code = 1; continue; }
        if (/^[0-7]{3,4}$/.test(mode)) { node.mode = parseInt(mode, 8) & 0o777; continue; }
        let m = node.mode;
        for (const part of mode.split(',')) {
          const mm = part.match(/^([ugoa]*)([+\-=])([rwx]*)$/);
          if (!mm) return { err: `chmod: invalid mode: ${q(mode)}\n`, code: 1 };
          const who = mm[1] || 'a', bits = (mm[3].includes('r') ? 4 : 0) | (mm[3].includes('w') ? 2 : 0) | (mm[3].includes('x') ? 1 : 0);
          let mask = 0, val = 0;
          for (const [w, sh2] of [['u', 6], ['g', 3], ['o', 0]]) if (who.includes(w) || who.includes('a')) { mask |= 7 << sh2; val |= bits << sh2; }
          // Without u/g/o, + and - follow the umask (022): "+w" only adds the owner's write bit.
          if (!mm[1] && mm[2] !== '=') val &= ~0o022;
          m = mm[2] === '+' ? m | val : mm[2] === '-' ? m & ~val : (m & ~mask) | val;
        }
        node.mode = m;
      }
      return { err, code };
    },
    export(sh, args) { for (const a of args) { const i = a.indexOf('='); if (i > 0) sh.vars[a.slice(0, i)] = a.slice(i + 1); } return {}; },
    unset(sh, args) { for (const a of args) delete sh.vars[a]; return {}; },
    true: () => ({}),
    false: () => ({ code: 1 }),
    bash: (sh, args) => runScriptFile(sh, args[0], args.slice(1), 'bash'),
    sh: (sh, args) => runScriptFile(sh, args[0], args.slice(1), 'sh'),
  };
  function headTail(sh, args, stdin, name) {
    const [f, files] = flags(args, ['n', 'n:']);
    const n = f.n != null ? parseInt(f.n, 10) : 10;
    if (Number.isNaN(n)) return { err: `${name}: invalid number of lines: ${q(f.n)}\n`, code: 1 };
    let out = '', err = '', code = 0;
    const rs = readInputs(sh, files, stdin, name);
    rs.forEach((r, i) => {
      if (r.err) { err += `${name}: cannot open ${q(r.name)} for reading: No such file or directory\n`; code = 1; return; }
      if (rs.length > 1) out += (i ? '\n' : '') + `==> ${r.name} <==\n`;
      const ls = lines(r.data);
      out += joinLines(name === 'head' ? ls.slice(0, n) : n ? ls.slice(-n) : []);
    });
    return { out, err, code };
  }
  function runScriptFile(sh, file, args, how) {
    if (!file) return { err: `${how}: reading scripts from standard input is not supported here\n`, code: 2 };
    const p = norm(sh, file);
    if (!isFile(sh, p)) return { err: `${how}: ${file}: No such file or directory\n`, code: 127 };
    // A script runs in a child shell: its cd and variables do not leak back.
    const saved = { cwd: sh.cwd, vars: { ...sh.vars }, args: sh.args };
    sh.args = args;
    let res;
    try { res = runSource(sh, sh.fs.get(p).data, null); } catch (e) { res = { out: '', err: `${file}: ${e.message}\n`, code: 2 }; }
    sh.cwd = saved.cwd; sh.vars = saved.vars; sh.args = saved.args;
    return { out: res.out, err: res.err, code: res.code };
  }

  /* ---------- execution ---------- */
  function runCommand(sh, cmd, stdin) {
    if (++sh.steps > 5000) throw new Error('too many steps');
    let fields = [];
    for (const w of cmd.words) fields = fields.concat(expandWord(sh, w));
    // NAME=value words before the command (or alone) set variables.
    while (fields.length && /^[A-Za-z_]\w*=/.test(fields[0]) && cmd.words.length) {
      const a = fields.shift(), i = a.indexOf('=');
      sh.vars[a.slice(0, i)] = a.slice(i + 1);
    }
    let input = stdin, outFile = null, append = false, redirErr = '';
    for (const r of cmd.redirs) {
      const target = expandWord(sh, r.w)[0], p = norm(sh, target);
      if (r.op === '<') { if (!isFile(sh, p)) { return { out: '', err: `bash: ${target}: No such file or directory\n`, code: 1 }; } input = sh.fs.get(p).data; }
      else {
        if (isDir(sh, p)) return { out: '', err: `bash: ${target}: Is a directory\n`, code: 1 };
        if (!isDir(sh, parent(p))) return { out: '', err: `bash: ${target}: No such file or directory\n`, code: 1 };
        outFile = p; append = r.op === '>>';
        if (!append || !sh.fs.has(p)) writeFile(sh, p, '', false);
      }
    }
    let res = { out: '', err: redirErr, code: 0 };
    if (fields.length) {
      const name = fields[0], args = fields.slice(1);
      let fn = Object.prototype.hasOwnProperty.call(CMDS, name) ? CMDS[name] : null;
      if (!fn && name.includes('/')) {
        const p = norm(sh, name);
        if (!sh.fs.has(p)) res = { err: `bash: ${name}: No such file or directory\n`, code: 127 };
        else if (isDir(sh, p)) res = { err: `bash: ${name}: Is a directory\n`, code: 126 };
        else if (!(sh.fs.get(p).mode & 0o100)) res = { err: `bash: ${name}: Permission denied\n`, code: 126 };
        else res = runScriptFile(sh, name, args, 'bash');
      } else if (!fn) res = { err: `${name}: command not found\n`, code: 127 };
      else {
        try { res = fn(sh, args, input == null ? '' : input) || {}; } catch (e) { res = { err: `${name}: ${e.message}\n`, code: 1 }; }
      }
    }
    const out = res.out || '';
    if (outFile) { writeFile(sh, outFile, out, true); return { out: '', err: res.err || '', code: res.code || 0 }; }
    return { out, err: res.err || '', code: res.code || 0 };
  }
  function runStatement(sh, st) {
    if (st.for) {
      let words = [];
      for (const w of st.words) words = words.concat(expandWord(sh, w));
      let out = '', err = '', code = 0;
      for (const v of words) { sh.vars[st.for] = v; const r = runItems(sh, st.body); out += r.out; err += r.err; code = r.code; }
      return { out, err, code };
    }
    let input = null, err = '', last = { out: '', code: 0 };
    for (const c of st.pipe) { last = runCommand(sh, c, input); err += last.err; input = last.out; }
    return { out: last.out, err, code: last.code };
  }
  function runChain(sh, item) {
    let out = '', err = '', code = 0;
    for (const { node, op } of item.chain) {
      if (op === '&&' && code !== 0) continue;
      if (op === '||' && code === 0) continue;
      const r = runStatement(sh, node);
      out += r.out; err += r.err; code = r.code; sh.status = code;
    }
    return { out, err, code };
  }
  function runItems(sh, items) {
    let out = '', err = '', code = 0;
    for (const it of items) { const r = runChain(sh, it); out += r.out; err += r.err; code = r.code; }
    return { out, err, code };
  }
  // Runs source text. With `transcript` (an array), records each top-level command and what it printed.
  function runSource(sh, src, transcript) {
    const items = parse(tokenize(src));
    const srcLines = src.split('\n');
    let out = '', err = '', code = 0;
    for (const it of items) {
      const r = runChain(sh, it);
      out += r.out; err += r.err; code = r.code;
      if (!transcript) continue;
      const prev = transcript[transcript.length - 1];
      // Several commands on one line (a; b) show as that one line.
      if (prev && prev.startLine === it.startLine) { prev.out += r.out; prev.err += r.err; prev.endLine = Math.max(prev.endLine, it.endLine); }
      else transcript.push({ cmd: '', startLine: it.startLine, endLine: it.endLine, out: r.out, err: r.err });
    }
    if (transcript) transcript.forEach((x) => { x.cmd = srcLines.slice(x.startLine - 1, x.endLine).join('\n').trim(); });
    return { out, err, code };
  }

  // Everything under the home folder, as sorted lines: "dir/", "file [mode]: content".
  function snapshot(sh) {
    return [...sh.fs.keys()].filter((k) => k.startsWith(HOME + '/')).sort(cmpC).map((k) => {
      const v = sh.fs.get(k), rel = k.slice(HOME.length + 1);
      return v.dir ? { path: rel + '/', mode: v.mode.toString(8) } : { path: rel, mode: v.mode.toString(8), data: v.data };
    });
  }
  // Runs setup + learner code; returns the transcript, final snapshot and stdout of the learner part.
  function runChallengeShell(setup, code) {
    const sh = createShell();
    if (setup) runSource(sh, setup, null);
    sh.cwd = HOME; sh.vars.PWD = HOME; sh.status = 0; sh.steps = 0;
    const transcript = [];
    let out = '', error = null;
    try { out = runSource(sh, code, transcript).out; } catch (e) { error = e.message; }
    return { transcript, out, files: snapshot(sh), error, cwd: sh.cwd };
  }

  // Grades a command-line challenge: the learner's commands must leave the home folder like the
  // solution does (same paths, permissions and contents) and, when ch.output is set, print the same.
  // ch.loose lists files whose contents may differ (only "exists" and "owner can run it" are compared).
  function gradeShell(ch, code) {
    const want = runChallengeShell(ch.setup || '', ch.solution), got = runChallengeShell(ch.setup || '', code);
    const loose = new Set(ch.loose || []);
    const wm = new Map(want.files.map((f) => [f.path, f])), gm = new Map(got.files.map((f) => [f.path, f]));
    const problems = [];
    for (const [p, f] of wm) {
      const g = gm.get(p);
      if (!g) { problems.push({ k: 'missing', p }); continue; }
      if (loose.has(p)) { if ((parseInt(f.mode, 8) & 0o100) !== (parseInt(g.mode, 8) & 0o100)) problems.push({ k: (parseInt(f.mode, 8) & 0o100) ? 'notExec' : 'exec', p }); continue; }
      if (f.data !== g.data) problems.push({ k: 'content', p, want: f.data, got: g.data });
      if (f.mode !== g.mode) problems.push({ k: 'mode', p, want: f.mode, got: g.mode });
    }
    for (const p of gm.keys()) if (!wm.has(p)) problems.push({ k: 'extra', p });
    const outputOk = !ch.output || got.out === want.out;
    return { ok: !got.error && !problems.length && outputOk, problems, outputOk, wantOut: want.out, got, want };
  }

  const api = { createShell, runSource, snapshot, runChallengeShell, gradeShell, HOME };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.MiniShell = api;
})(typeof self !== 'undefined' ? self : this);
