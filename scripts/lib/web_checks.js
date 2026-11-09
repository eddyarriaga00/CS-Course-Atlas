// Grades an HTML/CSS challenge against a rendered document. Shared by the site (via the course
// index) and scripts/verify_challenges.js, so both judge pages the same way. Each check:
// { sel, label, count?, min?, text?, attr?, style?: { cssProperty: expectedComputedValue } }.
function runWebChecks(doc, win, checks) {
  return checks.map((c) => {
    const els = Array.from(doc.querySelectorAll(c.sel));
    let ok = true;
    let got = els.length + ' found';
    if (c.count != null) ok = els.length === c.count;
    if (c.min != null) ok = ok && els.length >= c.min;
    if (ok && c.text != null) {
      const texts = els.map((e) => e.textContent.trim());
      ok = texts.some((x) => x.toLowerCase().includes(c.text.toLowerCase()));
      if (!ok) got = texts.slice(0, 3).join(' | ') || 'no text';
    }
    if (ok && c.attr) {
      const bad = els.find((e) => !(e.getAttribute(c.attr) || '').trim());
      if (bad) { ok = false; got = '<' + bad.tagName.toLowerCase() + '> without ' + c.attr; }
    }
    if (ok && c.style) {
      for (const prop of Object.keys(c.style)) {
        const value = els.length ? win.getComputedStyle(els[0])[prop] : '(no element)';
        if (value !== c.style[prop]) { ok = false; got = prop.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase()) + ': ' + value; break; }
      }
    }
    return { label: c.label, ok, got };
  });
}
if (typeof module !== 'undefined') module.exports = { runWebChecks };
