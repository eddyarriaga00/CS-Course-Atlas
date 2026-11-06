#!/usr/bin/env node
import fs from 'fs';
import vm from 'vm';
import path from 'path';
import https from 'https';

const ROOT = process.cwd();
const SCRIPT_PATH = path.join(ROOT, 'js', 'script.js');
const OUT_PATH = path.join(ROOT, 'js', 'spanish-localization.js');
const PRIMARY_CACHE_PATH = path.join(ROOT, '.translation-cache-es.json');
const FALLBACK_CACHE_PATH = path.join(ROOT, 'scripts', 'translation-cache-es.cache.json');

function resolveCachePath() {
  const envPath = String(process.env.TRANSLATION_CACHE_PATH || '').trim();
  if (envPath) {
    return path.isAbsolute(envPath) ? envPath : path.join(ROOT, envPath);
  }

  for (const candidate of [PRIMARY_CACHE_PATH, FALLBACK_CACHE_PATH]) {
    try {
      fs.mkdirSync(path.dirname(candidate), { recursive: true });
      const fd = fs.openSync(candidate, 'a');
      fs.closeSync(fd);
      return candidate;
    } catch {
      // Try next candidate.
    }
  }

  return FALLBACK_CACHE_PATH;
}

let CACHE_PATH = resolveCachePath();

function extract(src, start, end) {
  const s = src.indexOf(start);
  const e = src.indexOf(end, s);
  if (s < 0 || e < 0) throw new Error(`Could not extract section: ${start}`);
  return src.slice(s, e);
}

function loadData() {
  const src = fs.readFileSync(SCRIPT_PATH, 'utf8');
  const script = [
    extract(src, 'const MODULE_CATEGORY_BY_ID = {', 'const MODULE_LEARNING_SEQUENCE = ['),
    extract(src, 'const baseFlashcards = [', '// Glossary Data'),
    extract(src, 'const glossaryTerms = [', 'const glossaryCategories = ['),
    extract(src, 'const quizData = {', 'const modules = ['),
    extract(src, 'const modules = [', 'const INTERVIEW_EXAMPLES = ['),
    extract(src, 'const INTERVIEW_EXAMPLES = [', 'const NOTES_LIBRARY = ['),
    extract(src, 'const NOTES_LIBRARY = [', 'function initAccount()'),
    '({baseFlashcards,glossaryTerms,quizData,modules,INTERVIEW_EXAMPLES,NOTES_LIBRARY,dailyChallenges,studyTips})'
  ].join('\n');
  return vm.runInNewContext(script, {});
}

function loadHtmlPhrases() {
  const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  const phrases = new Set();
  const textRegex = />\s*([^<]*[A-Za-zÁÉÍÓÚáéíóúÑñ][^<]*)\s*</g;
  let m;
  while ((m = textRegex.exec(html))) {
    const t = m[1].replace(/\s+/g, ' ').trim();
    if (!t) continue;
    if (t.includes('window.tailwind')) continue;
    if (/^https?:\/\//.test(t)) continue;
    phrases.add(t);
  }
  const placeholderRegex = /(?:placeholder|title|aria-label)="([^"]*[A-Za-z][^"]*)"/g;
  while ((m = placeholderRegex.exec(html))) {
    const t = m[1].trim();
    if (t) phrases.add(t);
  }
  return phrases;
}

function loadUiJsPhrases(src) {
  const phrases = new Set();
  const regex = /showToast\((['`"])([\s\S]*?)\1\s*,|confirm\((['`"])([\s\S]*?)\3\)|setStatus\((['`"])([\s\S]*?)\5/g;
  let m;
  while ((m = regex.exec(src))) {
    const t = (m[2] || m[4] || m[6] || '').trim();
    if (t) phrases.add(t);
  }
  [
    'Showing {filtered} of {total} modules',
    'No active session',
    'Choose a module above',
    'Question',
    'Answer',
    'Click to reveal answer',
    'Click to hide answer',
    'Pick an answer to continue.',
    'Answer selected.',
    'Previous',
    'Next',
    'Finish',
    'Quiz Complete!',
    'You scored {score} out of {total}',
    'Your answer:',
    'Correct answer:',
    'Explanation:',
    'Retake Quiz',
    'Close',
    'Complete this module and pass its quiz to unlock its flashcards.',
    'All Modules (mix)',
    '(Complete quiz to unlock)',
    'No quizzes available',
    'No questions available for this module yet.',
    '{answered} answered • {total} total',
    'Card {current} of {total}',
    '{total} card session • {deck} cards in deck',
    'Synced {time}',
    '{goal} modules/wk',
    'Lifetime {minutes}',
    'Longest streak: {days} days',
    'Longest streak: {days} day',
    '{days}-day streak',
    '{days} day',
    '{days} days',
    'Getting started',
    'On track',
    'Momentum unlocked',
    'Log a focus session to start building momentum.',
    'All modules complete—spend time on flashcards or mentor a friend.',
    'Goal complete! Review & reinforce.',
    'Edit plan',
    'Personalize',
    'Active',
    'Not configured',
    'Set up'
  ].forEach(v => phrases.add(v));
  return phrases;
}

function isLikelyNaturalLanguage(str) {
  if (!str) return false;
  const t = str.trim();
  if (!t) return false;
  if (/^[\w.\-\/\\]+$/.test(t) && !/[A-Za-z]{3,}\s+[A-Za-z]{3,}/.test(t)) return false;
  if (/^[A-Za-z_][A-Za-z0-9_]*$/.test(t)) return false;
  if (/\b(class|public|static|void|int|String|return|if|for|while|def|function|const|let|var|System\.out|printf|cout|import|from|new)\b/.test(t) && !/\s/.test(t)) return false;
  return /[A-Za-z]/.test(t);
}

function collectCodeTranslatables(modules) {
  const codeStrings = new Set();
  for (const module of modules) {
    const examples = module.codeExamples || (module.codeExample ? { java: module.codeExample } : null);
    if (!examples) continue;
    for (const code of Object.values(examples)) {
      if (typeof code !== 'string') continue;
      const lines = code.split('\n');
      for (const line of lines) {
        const commentIdx = line.indexOf('//');
        if (commentIdx >= 0) {
          const comment = line.slice(commentIdx + 2).trim();
          if (isLikelyNaturalLanguage(comment)) codeStrings.add(comment);
        }
        const pyCommentIdx = line.indexOf('#');
        if (pyCommentIdx >= 0 && (commentIdx < 0 || pyCommentIdx < commentIdx)) {
          const comment = line.slice(pyCommentIdx + 1).trim();
          if (isLikelyNaturalLanguage(comment)) codeStrings.add(comment);
        }
        const literals = [...line.matchAll(/"([^"\\]*(?:\\.[^"\\]*)*)"|'([^'\\]*(?:\\.[^'\\]*)*)'/g)];
        for (const lit of literals) {
          const value = (lit[1] || lit[2] || '').trim();
          if (!isLikelyNaturalLanguage(value)) continue;
          if (/^\s*[A-Za-z_][A-Za-z0-9_]*\s*$/.test(value)) continue;
          codeStrings.add(value);
        }
      }

      for (const match of code.matchAll(/\/\*([\s\S]*?)\*\//g)) {
        const body = String(match[1] || '');
        body.split('\n').forEach((commentLine) => {
          const cleaned = commentLine.replace(/^\s*\*+\s?/, '').trim();
          if (isLikelyNaturalLanguage(cleaned)) codeStrings.add(cleaned);
        });
      }
    }
  }
  return codeStrings;
}

function mergeSets(...sets) {
  const out = new Set();
  for (const s of sets) for (const item of s) out.add(item);
  return out;
}

function loadCache() {
  if (!fs.existsSync(CACHE_PATH)) return {};
  try {
    return JSON.parse(fs.readFileSync(CACHE_PATH, 'utf8'));
  } catch {
    return {};
  }
}

function saveCache(cache) {
  try {
    fs.writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2));
  } catch (error) {
    if (CACHE_PATH !== FALLBACK_CACHE_PATH) {
      CACHE_PATH = FALLBACK_CACHE_PATH;
      fs.mkdirSync(path.dirname(CACHE_PATH), { recursive: true });
      fs.writeFileSync(CACHE_PATH, JSON.stringify(cache, null, 2));
      return;
    }
    throw error;
  }
}

function translateSingle(text) {
  const q = encodeURIComponent(text);
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=es&dt=t&q=${q}`;
  return new Promise((resolve, reject) => {
    https.get(url, res => {
      let raw = '';
      res.on('data', chunk => { raw += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(raw || '[]');
          const translated = (parsed?.[0] || []).map(part => part?.[0] || '').join('');
          resolve(translated || text);
        } catch (err) {
          reject(err);
        }
      });
    }).on('error', reject);
  });
}

async function translateAll(uniqueStrings, cache) {
  const pending = uniqueStrings.filter(s => !cache[s]);
  let done = 0;
  const limit = 8;
  const queue = [...pending];
  let saveQueue = Promise.resolve();

  const enqueueCacheSave = () => {
    saveQueue = saveQueue.then(() => {
      saveCache(cache);
    });
    return saveQueue;
  };

  async function worker() {
    while (queue.length) {
      const text = queue.shift();
      try {
        const translated = await translateSingle(text);
        cache[text] = translated;
      } catch {
        cache[text] = text;
      }
      done += 1;
      if (done % 25 === 0 || done === pending.length) {
        process.stdout.write(`\rTranslated ${done}/${pending.length}`);
        await enqueueCacheSave();
      }
    }
  }

  await Promise.all(Array.from({ length: Math.min(limit, queue.length || 1) }, worker));
  await saveQueue;
  process.stdout.write('\n');
  saveCache(cache);
}

function tr(cache, text) {
  const source = String(text ?? '');
  if (Object.prototype.hasOwnProperty.call(cache, source)) {
    return cache[source];
  }
  const trimmed = source.trim();
  if (!trimmed) return source;
  if (!Object.prototype.hasOwnProperty.call(cache, trimmed)) {
    return source;
  }
  const translated = cache[trimmed];
  const leading = source.match(/^\s*/)?.[0] || '';
  const trailing = source.match(/\s*$/)?.[0] || '';
  return `${leading}${translated}${trailing}`;
}

function translateCodePreservingSyntax(code, cache) {
  const blockCommentTranslated = String(code || '').replace(/\/\*([\s\S]*?)\*\//g, (match, body) => {
    const translatedBody = String(body || '')
      .split('\n')
      .map((commentLine) => {
        const markerMatch = commentLine.match(/^(\s*\*?\s?)(.*)$/);
        if (!markerMatch) return commentLine;
        const marker = markerMatch[1] || '';
        const text = String(markerMatch[2] || '');
        const translated = tr(cache, text);
        return `${marker}${translated}`;
      })
      .join('\n');
    return `/*${translatedBody}*/`;
  });

  const lines = blockCommentTranslated.split('\n');
  return lines.map((line) => {
    let out = line;
    const trimmed = out.trim();
    const isCppDirective = /^#\s*(include|define|if|ifdef|ifndef|endif|pragma|import)\b/i.test(trimmed);

    const transformComment = (marker) => {
      const idx = out.indexOf(marker);
      if (idx >= 0) {
        const head = out.slice(0, idx + marker.length);
        const body = out.slice(idx + marker.length).trim();
        if (isLikelyNaturalLanguage(body)) {
          out = `${head} ${tr(cache, body)}`;
        }
      }
    };

    transformComment('//');
    if (!out.includes('//') && !isCppDirective) {
      const hashIdx = out.indexOf('#');
      if (hashIdx >= 0) {
        const head = out.slice(0, hashIdx + 1);
        const body = out.slice(hashIdx + 1).trim();
        if (isLikelyNaturalLanguage(body)) {
          out = `${head} ${tr(cache, body)}`;
        }
      }
    }

    out = out.replace(/"([^"\\]*(?:\\.[^"\\]*)*)"|'([^'\\]*(?:\\.[^'\\]*)*)'/g, (match, g1, g2) => {
      const value = (g1 || g2 || '');
      const quote = match[0];
      if (!isLikelyNaturalLanguage(value)) return match;
      const translated = tr(cache, value);
      return `${quote}${translated}${quote}`;
    });

    return out;
  }).join('\n');
}

function translateStructuredValue(value, cache) {
  if (typeof value === 'string') return tr(cache, value);
  if (Array.isArray(value)) return value.map((item) => translateStructuredValue(item, cache));
  if (!value || typeof value !== 'object') return value;
  const next = {};
  Object.entries(value).forEach(([key, nested]) => {
    next[key] = translateStructuredValue(nested, cache);
  });
  return next;
}

function buildContentI18n(data, cache) {
  const modules = {};
  for (const module of data.modules) {
    const translatedCodeExamples = {};
    Object.entries(module.codeExamples || {}).forEach(([lang, snippet]) => {
      if (typeof snippet === 'string') {
        translatedCodeExamples[lang] = translateCodePreservingSyntax(snippet, cache);
      }
    });

    const translatedResources = (module.resources || []).map((resource) => {
      if (typeof resource === 'string') return tr(cache, resource);
      if (!resource || typeof resource !== 'object') return resource;
      return {
        ...resource,
        text: tr(cache, resource.text || resource.url || '')
      };
    });

    const localized = {
      title: tr(cache, module.title),
      description: tr(cache, module.description),
      topics: (module.topics || []).map(topic => tr(cache, topic)),
      explanation: tr(cache, module.explanation),
      resources: translatedResources,
      codeExamples: translatedCodeExamples,
      expectedOutputs: translateStructuredValue(module.expectedOutputs || {}, cache),
      codeExampleSets: (module.codeExampleSets || []).map((setItem) => ({
        id: setItem?.id,
        title: translateStructuredValue(setItem?.title || '', cache),
        description: translateStructuredValue(setItem?.description || '', cache),
        deepExplanation: translateStructuredValue(setItem?.deepExplanation || '', cache),
        codeExamples: Object.entries(setItem?.codeExamples || {}).reduce((acc, [lang, snippet]) => {
          if (typeof snippet === 'string') {
            acc[lang] = translateCodePreservingSyntax(snippet, cache);
          }
          return acc;
        }, {}),
        expectedOutputs: translateStructuredValue(setItem?.expectedOutputs || {}, cache)
      }))
    };

    modules[module.id] = localized;
  }

  const quizData = {};
  for (const [moduleId, payload] of Object.entries(data.quizData)) {
    quizData[moduleId] = {
      parts: (payload.parts || []).map(part => ({
        questions: (part.questions || []).map(q => ({
          id: q.id,
          question: tr(cache, q.question),
          options: (q.options || []).map(option => tr(cache, option)),
          correct: q.correct,
          explanation: tr(cache, q.explanation)
        }))
      }))
    };
  }

  const glossary = {};
  data.glossaryTerms.forEach((term, idx) => {
    glossary[String(idx)] = {
      term: tr(cache, term.term),
      definition: tr(cache, term.definition),
      category: tr(cache, term.category)
    };
  });

  const flashcards = {};
  data.baseFlashcards.forEach(card => {
    flashcards[String(card.id)] = {
      question: tr(cache, card.question),
      answer: tr(cache, card.answer)
    };
  });

  const dailyChallenges = {};
  data.dailyChallenges.forEach(challenge => {
    dailyChallenges[challenge.id] = {
      title: tr(cache, challenge.title),
      description: tr(cache, challenge.description),
      steps: (challenge.steps || []).map(step => tr(cache, step))
    };
  });

  const studyTips = {};
  data.studyTips.forEach((tip, idx) => {
    studyTips[String(idx)] = tr(cache, tip);
  });

  const interviewExamples = {};
  data.INTERVIEW_EXAMPLES.forEach(example => {
    interviewExamples[example.id] = {
      title: tr(cache, example.title),
      difficulty: tr(cache, example.difficulty),
      tags: (example.tags || []).map(tag => tr(cache, tag)),
      prompt: tr(cache, example.prompt),
      notes: tr(cache, example.notes),
      language: tr(cache, example.language || 'Java')
    };
  });

  const notesLibrary = {};
  data.NOTES_LIBRARY.forEach(note => {
    notesLibrary[note.id] = {
      title: tr(cache, note.title || ''),
      description: tr(cache, note.description || ''),
      category: tr(cache, note.category || ''),
      level: tr(cache, note.level || '')
    };
  });

  return {
    modules,
    quizData,
    glossary,
    flashcards,
    dailyChallenges,
    studyTips,
    interviewExamples,
    notesLibrary
  };
}

function buildLiteralMap(allStrings, cache) {
  const literals = {};
  for (const text of allStrings) {
    literals[text] = tr(cache, text);
  }
  return literals;
}

async function main() {
  const src = fs.readFileSync(SCRIPT_PATH, 'utf8');
  const data = loadData();

  const datasetStrings = new Set();
  const add = (s) => { if (typeof s === 'string' && s.trim()) datasetStrings.add(s.trim()); };

  data.baseFlashcards.forEach(f => { add(f.question); add(f.answer); });
  data.glossaryTerms.forEach(g => { add(g.term); add(g.definition); add(g.category); });
  Object.values(data.quizData).forEach(q => q.parts?.forEach(p => p.questions?.forEach(qq => {
    add(qq.question);
    (qq.options || []).forEach(add);
    add(qq.explanation);
  })));
  data.modules.forEach(m => {
    add(m.title); add(m.description); add(m.explanation);
    (m.topics || []).forEach(add);
    (m.resources || []).forEach(r => add(typeof r === 'string' ? r : (r?.text || r?.url || '')));
  });
  data.INTERVIEW_EXAMPLES.forEach(e => {
    add(e.title); add(e.difficulty); add(e.prompt); add(e.notes); add(e.language || 'Java');
    (e.tags || []).forEach(add);
  });
  data.NOTES_LIBRARY.forEach(n => {
    add(n.title || ''); add(n.description || ''); add(n.category || ''); add(n.level || '');
  });
  data.dailyChallenges.forEach(c => {
    add(c.title); add(c.description); (c.steps || []).forEach(add);
  });
  data.studyTips.forEach(add);

  const codeStrings = collectCodeTranslatables(data.modules);
  const htmlPhrases = loadHtmlPhrases();
  const uiPhrases = loadUiJsPhrases(src);
  const allStrings = mergeSets(datasetStrings, codeStrings, htmlPhrases, uiPhrases);

  console.log(`Unique strings to translate: ${allStrings.size}`);

  const cache = loadCache();
  await translateAll([...allStrings], cache);

  const payload = {
    content: buildContentI18n(data, cache),
    literals: buildLiteralMap(allStrings, cache)
  };

  const output = `window.SPANISH_LOCALIZATION = ${JSON.stringify(payload, null, 2)};\n`;
  fs.writeFileSync(OUT_PATH, output, 'utf8');
  console.log(`Wrote ${OUT_PATH}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
