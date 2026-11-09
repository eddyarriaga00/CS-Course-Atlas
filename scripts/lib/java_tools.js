// Java tools shared by the site (shipped in data/atlas-data.json as javaTools and loaded with new Function)
// and by scripts/verify_challenges.js, so Java challenges are graded the same way in the browser and in CI.

// Java in the browser shares the page's thread and cannot be interrupted, so before compiling, every braced
// while/for/do loop gets a cheap check that ends the program after 10 seconds instead of freezing the page.
// The scanner skips strings, chars and comments, and inserts on the same line so error line numbers stay right.
function guardJavaLoops(src) {
  let out = '', i = 0;
  const n = src.length;
  while (i < n) {
    const c = src[i], two = src.slice(i, i + 2);
    if (two === '//') { const e = src.indexOf('\n', i); const j = e < 0 ? n : e; out += src.slice(i, j); i = j; continue; }
    if (two === '/*') { const e = src.indexOf('*/', i + 2); const j = e < 0 ? n : e + 2; out += src.slice(i, j); i = j; continue; }
    if (src.startsWith('"""', i)) { const e = src.indexOf('"""', i + 3); const j = e < 0 ? n : e + 3; out += src.slice(i, j); i = j; continue; }
    if (c === '"' || c === "'") { let j = i + 1; while (j < n && src[j] !== c && src[j] !== '\n') j += src[j] === '\\' ? 2 : 1; out += src.slice(i, j + 1); i = j + 1; continue; }
    const m = /^(while|for|do)\b/.exec(src.slice(i, i + 6));
    if (m && !/[\w$]/.test(src[i - 1] || '')) {
      let j = i + m[1].length;
      if (m[1] !== 'do') {
        while (j < n && /\s/.test(src[j])) j++;
        if (src[j] !== '(') { out += src.slice(i, j); i = j; continue; }
        let depth = 0;
        for (; j < n; j++) { if (src[j] === '(') depth++; else if (src[j] === ')' && --depth === 0) { j++; break; } }
      }
      let k = j; while (k < n && /\s/.test(src[k])) k++;
      if (src[k] === '{') { out += src.slice(i, k + 1) + ' AtlasLoopGuard.tick();'; i = k + 1; continue; }
      out += src.slice(i, j); i = j; continue;
    }
    out += c; i++;
  }
  return out + '\nclass AtlasLoopGuard { static final long END = System.currentTimeMillis() + 10000; static int n; static void tick() { if ((++n & 4095) == 0 && System.currentTimeMillis() > END) throw new Error("Stopped after 10 seconds (infinite loop?)"); } }\n';
}

// The AtlasTests class for a Java challenge. Each test is [javaExpression, expected], where expected is how the
// value prints: numbers and booleans as Java prints them, strings in double quotes, chars in single quotes,
// arrays like Arrays.toString / deepToString, lists and maps as their toString(). Each test prints one line:
// "@@ATLAS<TAB>index<TAB>ok|bad<TAB>got" (exceptions count as bad and show as got).
function buildJavaTests(tests) {
  const lit = (x) => JSON.stringify(String(x)).replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
  const checks = tests.map(([call, want], i) => `    check(${i}, () -> ${call}, ${lit(want)});`).join('\n');
  return `import java.util.*;

public class AtlasTests {
    static String show(Object o) {
        if (o == null) return "null";
        if (o instanceof String s) return "\\"" + s + "\\"";
        if (o instanceof Character c) return "'" + c + "'";
        if (o instanceof int[] a) return Arrays.toString(a);
        if (o instanceof long[] a) return Arrays.toString(a);
        if (o instanceof double[] a) return Arrays.toString(a);
        if (o instanceof boolean[] a) return Arrays.toString(a);
        if (o instanceof char[] a) return Arrays.toString(a);
        if (o instanceof Object[] a) return Arrays.deepToString(a);
        return String.valueOf(o);
    }

    static void check(int i, java.util.concurrent.Callable<Object> f, String want) {
        String got;
        try { got = show(f.call()); } catch (Throwable t) { got = String.valueOf(t); }
        System.out.println("@@ATLAS\\t" + i + "\\t" + (got.equals(want) ? "ok" : "bad") + "\\t" + got.replace("\\n", "\\\\n"));
    }

    public static void main(String[] args) {
${checks}
    }
}
`;
}

// Reads the AtlasTests output: test results, plus anything the learner's code printed.
function parseJavaTests(output, tests) {
  const results = tests.map(([call, want]) => ({ call, want, ok: false, got: 'not run' }));
  const printed = [];
  for (const line of String(output).split('\n')) {
    const m = /^@@ATLAS\t(\d+)\t(ok|bad)\t(.*)$/.exec(line);
    if (m && results[+m[1]]) Object.assign(results[+m[1]], { ok: m[2] === 'ok', got: m[3] });
    else if (line.trim()) printed.push(line);
  }
  return { results, printed: printed.join('\n') };
}

if (typeof module !== 'undefined') module.exports = { guardJavaLoops, buildJavaTests, parseJavaTests };
