// Text rules for the content quality gate. Each rule looks at one piece of text
// and returns findings. Pure: no file access, so it can be tested on its own.
//
// The rules come from two places: the "no invented facts" rule in CLAUDE.md,
// and the anti-slop copywriting patterns (empty vocabulary, rhythm tells,
// filler, fake authority). A finding is { rule, severity, text } where severity
// is 'error' (blocks new content) or 'warn' (worth a look).

const PHRASES = [
  ['empty vocabulary', /\b(unlock(s|ed|ing)?( the)? power|elevat(e|es|ed|ing)\b|seamless(ly)?|cutting[- ]edge|state[- ]of[- ]the[- ]art|game[- ]?chang(er|ing)|revolutioni[sz]|delve|testament to|tapestry|robust|leverag(e|es|ed|ing)|empower(s|ed|ing)?|next[- ]level|best[- ]in[- ]class|unparalleled|second to none|world[- ]class|industry[- ]leading|one[- ]stop|look no further)/i],
  ['authority trope', /\b(at its core|the real question is|what really matters|the heart of the matter|fundamentally)\b/i],
  ['signposting', /\b(let'?s dive|here'?s what you need to know|in this (article|guide|post) (we|you)('ll| will)|without further ado|buckle up)\b/i],
  ['fake candor', /(\bhonestly\?|\blet'?s be honest\b|\bhere'?s the thing\b|\breal talk\b)/i],
  ['filler', /\b(in order to|due to the fact that|it is important to note|it'?s important to note|it'?s worth noting|it is worth noting|at this point in time)\b/i],
  ['generic cta', /\b(get started today|learn more today|contact us today|don'?t hesitate|do not hesitate|feel free to)\b/i],
  ['chatbot closer', /\b(i hope this helps|let me know if)\b/i],
  ['inflation', /\b(a new era|pivotal moment|the future of|ushering in|in today'?s (fast[- ]paced|competitive|digital) )/i],
]

// A claim about the business that only the owner can supply.
const CLAIMS = [
  ['currency', /(\$\s?\d|\bUSD\b|\bIDR\b|\bRp\.?\s?\d|€\s?\d|£\s?\d)/i, 'a price or currency figure'],
  ['percentage', /\b\d[\d.,]*\s?%/, 'a percentage'],
  ['track record', /\b\d[\d,.]*\+?\s*(years?|clients?|customers?|brands?|countries|employees|workers|staff|machines|artisans|orders)\b/i, 'a track-record number'],
  ['founding', /\b(since|established|founded)\b.{0,20}\b(19|20)\d\d\b/i, 'a founding date'],
  ['certification', /\b(ISO\s?\d*|CE[- ]marked|FDA|GMP|SGS|MSDS|BPOM|SNI|halal[- ]certified)\b/, 'a certification'],
  ['superlative', /\b(largest|biggest|#1|number one|most trusted|top[- ]rated|leading (eyelash )?manufacturer)\b/i, 'a ranking claim'],
]

const EMOJI = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u
const DASH = /[—–]|\s--\s|&mdash;|&ndash;/
const NEGATIVE_PARALLEL = /\bnot (just|only|merely)\b[^.!?]{0,90}\b(but|it'?s|it is|also)\b/i
const CAPS_RUN = /\b[A-Z]{4,}(\s+[A-Z]{4,}){2,}\b/
const GENERIC_HEADING = /^(introduction|conclusion|final thoughts|in summary|summary|why choose us|about us|overview|wrapping up|the bottom line|key takeaways)$/i

export const sentences = (text) =>
  text
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean)

export const wordCount = (text) => (text.replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').match(/[A-Za-z0-9'’-]+/g) ?? []).length

function phraseFindings(text) {
  const out = []
  for (const [rule, re] of PHRASES) {
    const m = text.match(re)
    if (m) out.push({ rule, severity: 'error', text: `"${m[0].trim()}"` })
  }
  return out
}

function claimFindings(text, allowed = []) {
  const out = []
  for (const phrase of allowed) text = text.split(phrase).join(' ')
  for (const [rule, re, label] of CLAIMS) {
    const m = text.match(re)
    if (!m) continue
    // A worked example may use made-up numbers if it says so.
    const illustrative = /\b(for example|for instance|illustrative|hypothetical|say you)\b/i.test(text)
    if (illustrative && (rule === 'currency' || rule === 'percentage')) continue
    out.push({ rule: `unconfirmed ${rule}`, severity: 'error', text: `${label}: "${m[0].trim()}". Only the owner can confirm this.` })
  }
  return out
}

function styleFindings(text) {
  const out = []
  if (DASH.test(text)) out.push({ rule: 'dash', severity: 'error', text: 'Contains an em dash, en dash or double hyphen. Use a period, comma or colon.' })
  if (EMOJI.test(text)) out.push({ rule: 'emoji', severity: 'error', text: 'Contains an emoji.' })
  const neg = text.match(NEGATIVE_PARALLEL)
  if (neg) out.push({ rule: 'negative parallelism', severity: 'error', text: `"${neg[0].slice(0, 70)}"` })
  if (CAPS_RUN.test(text)) out.push({ rule: 'all-caps emphasis', severity: 'error', text: 'Three or more ALL-CAPS words in a row.' })
  return out
}

/** All findings for one paragraph, answer or heading. */
export function textFindings(text, allowed = []) {
  return [...phraseFindings(text), ...claimFindings(text, allowed), ...styleFindings(text)]
}

export function headingFindings(heading) {
  return GENERIC_HEADING.test(heading.trim())
    ? [{ rule: 'generic heading', severity: 'error', text: `"${heading}" says nothing about what follows.` }]
    : []
}

/** Rhythm tells, judged over a whole page body. */
export function rhythmFindings(body) {
  const out = []
  const list = sentences(body)
  const lengths = list.map((s) => wordCount(s))

  let run = 0
  for (const n of lengths) {
    run = n <= 5 ? run + 1 : 0
    if (run === 3) {
      out.push({ rule: 'staccato', severity: 'warn', text: 'Three very short sentences in a row.' })
      break
    }
  }

  if (lengths.length >= 15) {
    const mean = lengths.reduce((a, b) => a + b, 0) / lengths.length
    const sd = Math.sqrt(lengths.reduce((a, b) => a + (b - mean) ** 2, 0) / lengths.length)
    if (sd < 4.5) out.push({ rule: 'even cadence', severity: 'warn', text: `Sentence lengths barely vary (spread ${sd.toFixed(1)} words). Mix short and long.` })
  }

  const triads = (body.match(/\b[\w'’-]+, [\w'’-]+,? and [\w'’-]+\b/g) ?? []).length
  if (triads > 6) out.push({ rule: 'rule of three', severity: 'warn', text: `${triads} "A, B, and C" lists. Real lists are as long as the content.` })

  const openers = new Map()
  for (const s of list) {
    const key = s.split(/\s+/).slice(0, 3).join(' ').toLowerCase()
    openers.set(key, (openers.get(key) ?? 0) + 1)
  }
  const [worst, count] = [...openers].sort((a, b) => b[1] - a[1])[0] ?? ['', 0]
  if (count >= 5) out.push({ rule: 'repeated opener', severity: 'warn', text: `${count} sentences start with "${worst}".` })

  const bold = (body.match(/\*\*/g) ?? []).length / 2
  if (bold > 8) out.push({ rule: 'bold overuse', severity: 'warn', text: `${Math.round(bold)} bold phrases.` })

  const quotes = (body.match(/["“”]/g) ?? []).length / 2
  if (quotes > 6) out.push({ rule: 'quote marks', severity: 'warn', text: `${Math.round(quotes)} quoted phrases. Quote only real speech or titles.` })
  return out
}
