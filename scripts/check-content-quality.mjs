// Content quality gate for landing pages and blog posts.
//
//   node scripts/check-content-quality.mjs            check (exit 1 on errors in NEW content)
//   node scripts/check-content-quality.mjs --all      also list every finding on older content
//   node scripts/check-content-quality.mjs --strict   hold older content to the same bar
//   node scripts/check-content-quality.mjs --write-baseline   record today's pages as "older"
//
// "Older" content is whatever is listed in specs/content-baseline.json. It is
// reported as debt but never blocks a build; anything not in the baseline is
// new and must pass with zero errors. The rules live in content-quality/rules.mjs.

import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { landingPages } from '../src/data/landingPages.js'
import { blogPosts } from '../src/data/blogPosts.js'
import { headingFindings, rhythmFindings, textFindings, wordCount } from './content-quality/rules.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const BASELINE = join(ROOT, 'specs', 'content-baseline.json')
const QUEUE = join(ROOT, 'specs', 'seo-content-queue.md')
const FACTS = join(ROOT, 'specs', 'confirmed-facts.json')
const args = new Set(process.argv.slice(2))

const FLOOR = { landing: 500, article: 600 }
const TITLE = [20, 65]
const DESCRIPTION = [70, 165]
const LINK = /\[([^\]]+)\]\((\/[^)\s]*)\)/g

const pathFor = (page) => (page.kind === 'article' ? `/blog/${page.slug}` : `/${page.slug}`)

function landingUnits(p) {
  const body = [
    ...p.sections.flatMap((s) => [s.heading && { where: `heading "${s.heading}"`, text: s.heading, heading: true }, ...s.paragraphs.map((t, i) => ({ where: `${s.heading}, paragraph ${i + 1}`, text: t })), ...(s.list ?? []).map((t, i) => ({ where: `${s.heading}, list item ${i + 1}`, text: t }))]),
    ...p.faq.flatMap((f, i) => [{ where: `FAQ ${i + 1} question`, text: f.q, faq: 'q' }, { where: `FAQ ${i + 1} answer`, text: f.a, faq: 'a' }]),
  ].filter(Boolean)
  const meta = [
    { where: 'title', text: p.title },
    { where: 'meta description', text: p.metaDescription },
    { where: 'h1', text: p.h1 },
    { where: 'intro', text: p.intro },
    ...p.factSheet.map((f) => ({ where: `fact "${f.label}"`, text: f.value })),
  ]
  return { meta, body, intro: p.intro }
}

function articleUnits(p) {
  const body = [
    ...p.sections.flatMap((s) => [{ where: `heading "${s.heading}"`, text: s.heading, heading: true }, { where: `section "${s.heading}"`, text: s.body }]),
    ...p.faq.flatMap((f, i) => [{ where: `FAQ ${i + 1} question`, text: f.q, faq: 'q' }, { where: `FAQ ${i + 1} answer`, text: f.a, faq: 'a' }]),
  ]
  const meta = [
    { where: 'title', text: p.title },
    { where: 'meta description', text: p.metaDescription },
    { where: 'excerpt', text: p.excerpt },
  ]
  return { meta, body, intro: p.excerpt }
}

function loadPages() {
  const landing = landingPages.map((p) => ({ ...p, kind: 'landing', ...landingUnits(p) }))
  const articles = blogPosts.map((p) => ({ ...p, kind: 'article', ...articleUnits(p) }))
  return [...landing, ...articles].map((p) => ({ ...p, path: pathFor(p), text: p.body.filter((u) => !u.heading).map((u) => u.text).join('\n') }))
}

function queueKeywords() {
  if (!existsSync(QUEUE)) return new Map()
  const rows = readFileSync(QUEUE, 'utf8').matchAll(/^\|\s*[CE]\d+\s*\|[^|]*\|\s*`([^`]+)`\s*\|\s*([^|]+?)\s*\|/gm)
  return new Map([...rows].map((m) => [m[1], m[2].toLowerCase()]))
}

function sourceFilesText() {
  const dir = join(ROOT, 'src', 'components')
  return readdirSync(dir).filter((f) => f.endsWith('.jsx')).map((f) => readFileSync(join(dir, f), 'utf8')).join('\n')
}

const shingles = (text) => {
  const words = text.toLowerCase().replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').match(/[a-z0-9']+/g) ?? []
  const set = new Set()
  for (let i = 0; i + 6 <= words.length; i += 1) set.add(words.slice(i, i + 6).join(' '))
  return set
}

function overlap(a, b) {
  if (!a.size || !b.size) return 0
  let shared = 0
  for (const s of a) if (b.has(s)) shared += 1
  return shared / Math.min(a.size, b.size)
}

function lengthFinding(rule, text, [min, max]) {
  return text.length < min || text.length > max
    ? [{ rule, severity: 'error', text: `${text.length} characters, wanted ${min} to ${max}.` }]
    : []
}

function pageFindings(page, ctx) {
  const out = []
  const add = (list, where) => list.forEach((f) => out.push({ ...f, where: where ?? f.where }))

  add(lengthFinding('title length', page.title, TITLE), 'title')
  add(lengthFinding('description length', page.metaDescription, DESCRIPTION), 'meta description')

  const keyword = ctx.keywords.get(page.slug)
  if (keyword) {
    const missing = keyword.split(/\s+/).filter((w) => w.length > 2 && !page.title.toLowerCase().includes(w.replace(/s$/, '')))
    if (missing.length) out.push({ rule: 'keyword in title', severity: 'error', where: 'title', text: `Title lacks "${missing.join('", "')}" from the target keyword "${keyword}".` })
  }

  for (const unit of [...page.meta, ...page.body]) {
    add(textFindings(unit.text, ctx.allowed), unit.where)
    if (unit.heading) add(headingFindings(unit.text), unit.where)
    if (unit.faq === 'a' && wordCount(unit.text) < 8) out.push({ rule: 'thin answer', severity: 'error', where: unit.where, text: `${wordCount(unit.text)} words. Answer in a full sentence a reader can quote on its own.` })
  }
  add(rhythmFindings(page.text), 'whole page')

  const words = wordCount(page.text)
  if (words < FLOOR[page.kind]) out.push({ rule: 'depth', severity: 'error', where: 'whole page', text: `${words} words, the floor for this kind of page is ${FLOOR[page.kind]}. Add something a buyer can use, not padding.` })
  const minSections = page.kind === 'article' ? 5 : 4
  if (page.sections.length < minSections) out.push({ rule: 'structure', severity: 'error', where: 'whole page', text: `${page.sections.length} sections, wanted at least ${minSections}.` })
  if (page.faq.length < (page.kind === 'article' ? 3 : 4)) out.push({ rule: 'structure', severity: 'error', where: 'FAQ', text: `${page.faq.length} FAQ entries.` })

  for (const q of page.faq) {
    const key = q.q.trim().toLowerCase()
    if ((ctx.questionCount.get(key) ?? 0) > 1) out.push({ rule: 'duplicate question', severity: 'error', where: 'FAQ', text: `"${q.q}" is asked on another page too.` })
  }

  const links = [...[...page.meta, ...page.body].flatMap((u) => [...u.text.matchAll(LINK)].map((m) => m[2].split('#')[0].replace(/\/$/, '') || '/'))]
  for (const target of new Set(links)) {
    if (!ctx.routes.has(target)) out.push({ rule: 'broken link', severity: 'error', where: 'links', text: `${target} is not a page on this site.` })
  }
  if (links.filter((l) => l !== page.path).length < 2) out.push({ rule: 'links out', severity: 'error', where: 'links', text: 'Needs at least two links to other pages on the site.' })
  if (!ctx.inbound(page)) out.push({ rule: 'links in', severity: 'error', where: 'links', text: 'No other page or the footer links here yet.' })

  const mine = ctx.shingles.get(page.path)
  let worst = { score: 0, path: '' }
  for (const [path, theirs] of ctx.shingles) {
    if (path === page.path) continue
    const score = overlap(mine, theirs)
    if (score > worst.score) worst = { score, path }
  }
  if (worst.score > 0.22) out.push({ rule: 'near duplicate', severity: 'error', where: 'whole page', text: `${Math.round(worst.score * 100)}% of its phrasing also appears on ${worst.path}.` })
  else if (worst.score > 0.12) out.push({ rule: 'overlap', severity: 'warn', where: 'whole page', text: `${Math.round(worst.score * 100)}% of its phrasing also appears on ${worst.path}.` })
  return out
}

function buildContext(pages) {
  const routes = new Set(['/', '/catalogue', '/blog', ...pages.map((p) => p.path)])
  const questionCount = new Map()
  for (const p of pages) for (const f of p.faq) questionCount.set(f.q.trim().toLowerCase(), (questionCount.get(f.q.trim().toLowerCase()) ?? 0) + 1)
  const linkTargets = new Map(pages.map((p) => [p.path, new Set([...p.meta, ...p.body].flatMap((u) => [...u.text.matchAll(LINK)].map((m) => m[2].split('#')[0].replace(/\/$/, ''))))]))
  const source = sourceFilesText()
  return {
    routes,
    keywords: queueKeywords(),
    allowed: existsSync(FACTS) ? JSON.parse(readFileSync(FACTS, 'utf8')).allowedPhrases : [],
    questionCount,
    shingles: new Map(pages.map((p) => [p.path, shingles(p.text)])),
    inbound: (page) => [...linkTargets].some(([path, targets]) => path !== page.path && targets.has(page.path)) || source.includes(`"${page.path}"`) || source.includes(`'${page.path}'`) || source.includes(`\`${page.path}\``),
  }
}

function report(pages, results, baseline) {
  let blocking = 0
  for (const page of pages) {
    const list = results.get(page.path)
    const older = baseline.has(page.slug)
    const errors = list.filter((f) => f.severity === 'error')
    const warns = list.filter((f) => f.severity === 'warn')
    if (older && !args.has('--all') && !args.has('--strict')) continue
    if (!list.length) {
      console.log(`ok    ${page.path}${older ? '  (older)' : ''}`)
      continue
    }
    console.log(`${errors.length && (!older || args.has('--strict')) ? 'FAIL' : older ? 'debt ' : 'warn '} ${page.path}  ${errors.length} errors, ${warns.length} warnings${older ? '  (older)' : ''}`)
    for (const f of list) console.log(`        ${f.severity === 'error' ? 'x' : '-'} [${f.rule}] ${f.where}: ${f.text}`)
    if (errors.length && (!older || args.has('--strict'))) blocking += errors.length
  }
  return blocking
}

function summaryOfOlder(pages, results, baseline) {
  const older = pages.filter((p) => baseline.has(p.slug))
  const byRule = new Map()
  for (const p of older) for (const f of results.get(p.path)) if (f.severity === 'error') byRule.set(f.rule, (byRule.get(f.rule) ?? 0) + 1)
  const top = [...byRule].sort((a, b) => b[1] - a[1]).slice(0, 6).map(([r, n]) => `${r} x${n}`).join(', ')
  console.log(`\nOlder content (${older.length} pages) is not blocking. Open errors: ${[...byRule.values()].reduce((a, b) => a + b, 0)}${top ? ` (${top})` : ''}. Run with --all to see them.`)
}

function main() {
  const pages = loadPages()
  if (args.has('--write-baseline')) {
    writeFileSync(BASELINE, `${JSON.stringify({ note: 'Pages that existed before the quality gate. They are reported as debt, never blocking.', slugs: pages.map((p) => p.slug).sort() }, null, 2)}\n`)
    console.log(`Baseline written: ${pages.length} pages.`)
    return 0
  }
  const baseline = new Set(existsSync(BASELINE) ? JSON.parse(readFileSync(BASELINE, 'utf8')).slugs : [])
  const ctx = buildContext(pages)
  const results = new Map(pages.map((p) => [p.path, pageFindings(p, ctx)]))
  const blocking = report(pages, results, baseline)
  const fresh = pages.filter((p) => !baseline.has(p.slug)).length
  if (fresh === 0) console.log('No new pages since the baseline.')
  summaryOfOlder(pages, results, baseline)
  console.log(blocking ? `\nBLOCKED: ${blocking} errors in content that must pass.` : '\nContent quality gate passed.')
  return blocking ? 1 : 0
}

process.exit(main())
