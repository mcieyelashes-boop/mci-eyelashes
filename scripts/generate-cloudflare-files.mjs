// Writes dist/_headers and dist/_redirects for Cloudflare Pages from vercel.json,
// so the site's redirects and security headers live in one place and the same
// build can be hosted on either service.
//
// Runs at the end of `npm run build`. What Cloudflare Pages already does by itself
// is skipped here: it serves /page from page.html, redirects /page.html to /page,
// and answers unknown URLs with 404.html and a 404 status.
//
// PAGES_HOSTS (optional, comma separated, e.g. "mci-eyelashes.pages.dev") marks the
// project's own *.pages.dev addresses noindex, so search engines only index
// www.mci-eyelashes.com.
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join, relative } from 'node:path'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = join(ROOT, 'dist')
const vercel = JSON.parse(readFileSync(join(ROOT, 'vercel.json'), 'utf8'))

// ── _redirects ──────────────────────────────────────────────────────────────
const redirects = []
for (const r of vercel.redirects) {
  if (r.has) continue // host-based (the old *.vercel.app address): not needed off Vercel
  if (r.source.endsWith('.html')) continue // Pages strips .html itself
  if (/[:(*]/.test(r.source)) throw new Error(`Pattern redirect needs translating by hand: ${r.source}`)
  redirects.push(`${r.source} ${r.destination} ${r.permanent ? 301 : 302}`)
}
writeFileSync(join(DIST, '_redirects'), redirects.join('\n') + '\n')

// ── _headers ────────────────────────────────────────────────────────────────
const files = []
const walk = (dir) => {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) walk(p)
    else files.push('/' + relative(DIST, p).split('\\').join('/'))
  }
}
walk(DIST)

// Vercel's source patterns, translated to the paths Pages understands.
const IMAGE = /\.(?:jpg|jpeg|png|svg|webp|ico|gif)$/
const pathsFor = (source) => {
  if (source === '/(.*)') return ['/*']
  if (source === '/assets/(.*)') return ['/assets/*']
  if (source === '/fonts/(.*)') return ['/fonts/*']
  if (source.startsWith('/:file(')) {
    // Images anywhere: a folder that holds only images gets one rule, others are listed.
    const images = files.filter((f) => IMAGE.test(f))
    const byDir = new Map()
    for (const f of images) {
      const dir = f.slice(0, f.lastIndexOf('/') + 1)
      byDir.set(dir, [...(byDir.get(dir) || []), f])
    }
    const out = []
    for (const [dir, list] of byDir) {
      const onlyImages = dir !== '/' && files.filter((f) => f.startsWith(dir)).every((f) => IMAGE.test(f))
      out.push(...(onlyImages ? [`${dir}*`] : list))
    }
    return out
  }
  if (!/[:(*]/.test(source)) return [source]
  throw new Error(`Header pattern needs translating by hand: ${source}`)
}

const blocks = []
for (const h of vercel.headers) {
  for (const path of pathsFor(h.source)) {
    blocks.push([path, ...h.headers.map(({ key, value }) => `  ${key}: ${value}`)].join('\n'))
  }
}
for (const host of (process.env.PAGES_HOSTS || 'mci-eyelashes.pages.dev').split(',').map((s) => s.trim()).filter(Boolean)) {
  blocks.push(`https://${host}/*\n  X-Robots-Tag: noindex`)
  blocks.push(`https://:preview.${host}/*\n  X-Robots-Tag: noindex`)
}
if (blocks.length > 100) throw new Error(`_headers has ${blocks.length} rules; Cloudflare Pages allows 100`)
writeFileSync(join(DIST, '_headers'), blocks.join('\n\n') + '\n')

console.log(`Cloudflare Pages files: ${redirects.length} redirects, ${blocks.length} header rules`)
