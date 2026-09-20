// Post-build static rendering of the pages that come straight from the React
// app: the homepage, /catalogue, and the 404 page.
//
// Why: the site is a client-rendered SPA, so a crawler that does not run
// JavaScript (GPTBot, ClaudeBot, PerplexityBot and most other AI fetchers) got
// an empty <div id="root"> for the homepage and the head of the HOMEPAGE for
// /catalogue -- including its canonical pointing at "/". This renders the real
// component tree to HTML (dist-ssr/entry-server.js, built by
// vite.ssr.config.js) and writes it into the built shell.
//
// Home and /catalogue are marked data-ssr so main.jsx hydrates them in place
// (React reuses the DOM, no flash). The 404 page is deliberately NOT rendered:
// it is served for any unknown URL, so its content would be wrong for all but
// one of them. It only needs the right status (Vercel sets that from the file
// name) and a noindex, and the browser renders the real message.
//
// Fails loudly on purpose: a silent fallback would ship the old empty homepage
// without anyone noticing.
import { readFileSync, rmSync, writeFileSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { dirname, join } from 'node:path'
import { CATALOGUE_META } from '../src/data/pageMeta.js'
import { BASE_URL, escapeHtml } from './prerender-shared.mjs'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = join(ROOT, 'dist')
const ROOT_DIV = '<div id="root"></div>'

const { render } = await import(pathToFileURL(join(ROOT, 'dist-ssr', 'entry-server.js')).href)

const template = readFileSync(join(DIST, 'index.html'), 'utf-8')
if (!template.includes(ROOT_DIV)) {
  throw new Error(
    'dist/index.html has no empty <div id="root"></div> -- it was already prerendered, or the shell changed. Run vite build first.',
  )
}

// Replaces the first match, or fails the build. `replacement` is always a
// function: a plain string would treat "$&" or "$'" inside a page title or
// description as a replacement pattern and silently corrupt the output.
function must(html, pattern, replacement, what) {
  if (!pattern.test(html)) throw new Error(`prerender-routes: could not find ${what} in dist/index.html`)
  return html.replace(pattern, replacement)
}

function withRoot(html, body) {
  return html.replace(ROOT_DIV, () => `<div id="root" data-ssr="1">${body}</div>`)
}

function setContent(html, attr, name, value) {
  const re = new RegExp(`(<meta\\s+${attr}="${name}"\\s+content=")[^"]*(")`)
  return must(html, re, (_, open, close) => open + escapeHtml(value) + close, `<meta ${attr}="${name}">`)
}

function withMeta(html, meta) {
  let out = must(html, /<title>[^<]*<\/title>/, () => `<title>${escapeHtml(meta.title)}</title>`, '<title>')
  out = setContent(out, 'name', 'description', meta.description)
  out = must(out, /(<link rel="canonical" href=")[^"]*(")/, (_, open, close) => open + meta.canonical + close, 'canonical link')
  out = setContent(out, 'property', 'og:title', meta.ogTitle)
  out = setContent(out, 'property', 'og:description', meta.ogDescription)
  out = setContent(out, 'property', 'og:url', meta.ogUrl)
  out = setContent(out, 'property', 'og:image', meta.ogImage)
  out = setContent(out, 'name', 'twitter:title', meta.twitterTitle)
  out = setContent(out, 'name', 'twitter:description', meta.twitterDescription)
  out = setContent(out, 'name', 'twitter:image', meta.ogImage)
  // The shell declares the size and alt text of the homepage's og:image. This
  // page uses a different image, so those would describe the wrong picture.
  out = must(out, /[ \t]*<meta property="og:image:width"[^>]*>\n?/, () => '', 'og:image:width')
  out = must(out, /[ \t]*<meta property="og:image:height"[^>]*>\n?/, () => '', 'og:image:height')
  return setContent(out, 'property', 'og:image:alt', meta.ogImageAlt)
}

// The homepage's shell carries homepage-only structured data (its product list
// and its FAQ). Repeating those on another URL would describe content that is
// not on that page. `types` must all be found: if the shell is ever reformatted
// so a block no longer matches, this fails instead of shipping the homepage's
// FAQ on another URL.
function dropJsonLd(html, types) {
  const dropped = []
  const out = html.replace(/[ \t]*<script type="application\/ld\+json">([\s\S]*?)<\/script>\n?/g, (block, json) => {
    const type = JSON.parse(json)['@type']
    if (!types.includes(type)) return block
    dropped.push(type)
    return ''
  })
  const missing = types.filter((t) => !dropped.includes(t))
  if (missing.length) throw new Error(`prerender-routes: JSON-LD block(s) not found to drop: ${missing.join(', ')}`)
  return out
}

function dropNoscript(html) {
  return html.replace(/[ \t]*<noscript>[\s\S]*?<\/noscript>\n?/, '')
}

function addJsonLd(html, data) {
  return html.replace('</head>', `    <script type="application/ld+json">${JSON.stringify(data)}</script>\n  </head>`)
}

// The shell also preloads the homepage hero image (2 MB) at high priority.
// Only the homepage draws it, so every other page would download it for nothing.
function dropHeroPreload(html) {
  return must(html, /[ \t]*<link rel="preload" as="image" href="\/hero-cinematic\.png"[^>]*>\n?/, '', 'hero image preload')
}

const stripHomeOnly = (html) => dropHeroPreload(dropNoscript(dropJsonLd(html, ['ItemList', 'FAQPage'])))

// Homepage: shell exactly as built, body from the real components.
writeFileSync(join(DIST, 'index.html'), withRoot(template, await render('/')))

// /catalogue
const catalogue = addJsonLd(withMeta(stripHomeOnly(template), CATALOGUE_META), {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
    { '@type': 'ListItem', position: 2, name: 'Catalogue', item: `${BASE_URL}/catalogue` },
  ],
})
writeFileSync(join(DIST, 'catalogue.html'), withRoot(catalogue, await render('/catalogue')))

// 404: served with status 404 by Vercel because of the file name.
let notFound = stripHomeOnly(template)
notFound = must(notFound, /<title>[^<]*<\/title>/, '<title>404 - Page Not Found | MCI Eyelashes</title>', '<title>')
notFound = must(notFound, /(<meta name="robots" content=")[^"]*(")/, '$1noindex, nofollow$2', 'robots meta')
notFound = must(notFound, /[ \t]*<link rel="canonical"[^>]*>\n?/, '', 'canonical link')
writeFileSync(join(DIST, '404.html'), notFound)

// The server bundle was only a build tool. Removing it keeps a stale copy from
// being linted or committed by accident.
rmSync(join(ROOT, 'dist-ssr'), { recursive: true, force: true })

console.log('Prerendered / and /catalogue from the React tree, wrote 404.html')
