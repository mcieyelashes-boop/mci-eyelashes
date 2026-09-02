// Post-build static prerender for commercial landing pages (src/data/landingPages.js),
// e.g. /eyelashes-factory-indonesia. Same rationale as prerender-blog.mjs —
// these are the highest-priority pages for both SEO ranking and GEO (AI
// assistant) citation, so they need real static HTML, not client-only JS.
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { landingPages } from '../src/data/landingPages.js'
import { BASE_URL, escapeHtml, getAssetTags, renderPage } from './prerender-shared.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const DIST = join(ROOT, 'dist')

const distIndexHtml = readFileSync(join(DIST, 'index.html'), 'utf-8')
const assetTags = getAssetTags(distIndexHtml)

function jsonLd(page, url) {
  return [
    {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': url,
          name: page.h1,
          description: page.metaDescription,
          isPartOf: { '@type': 'WebSite', name: 'MCI Eyelashes', url: BASE_URL },
        },
        {
          '@type': 'FAQPage',
          mainEntity: page.faq.map(({ q, a }) => ({
            '@type': 'Question',
            name: q,
            acceptedAnswer: { '@type': 'Answer', text: a },
          })),
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
            { '@type': 'ListItem', position: 2, name: page.breadcrumbName, item: url },
          ],
        },
      ],
    },
  ]
}

function inline(text) {
  return escapeHtml(text).replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
}

function bodyHtml(page) {
  return `
    <main>
      <nav><a href="/">Home</a> &rsaquo; <span>${escapeHtml(page.breadcrumbName)}</span></nav>
      <h1>${escapeHtml(page.h1)}</h1>
      <p>${escapeHtml(page.intro)}</p>
      <h2>MCI Factory at a Glance</h2>
      <dl>
        ${page.factSheet.map(({ label, value }) => `<dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd>`).join('\n        ')}
      </dl>
      ${page.sections
        .map(
          (s) => `
      <h2>${escapeHtml(s.heading)}</h2>
      ${s.paragraphs.map((p) => `<p>${inline(p)}</p>`).join('\n      ')}
      ${s.list ? `<ul>${s.list.map((i) => `<li>${escapeHtml(i)}</li>`).join('')}</ul>` : ''}`
        )
        .join('\n')}
      <h2>Frequently Asked Questions</h2>
      ${page.faq.map(({ q, a }) => `<h3>${escapeHtml(q)}</h3><p>${escapeHtml(a)}</p>`).join('\n')}
    </main>`
}

for (const page of landingPages) {
  const url = `${BASE_URL}/${page.slug}`
  writeFileSync(
    join(DIST, `${page.slug}.html`),
    renderPage({
      title: page.title,
      description: page.metaDescription,
      canonical: url,
      ogTitle: page.title,
      ogDescription: page.metaDescription,
      ogImage: `${BASE_URL}/hero-lashes.jpg`,
      jsonLd: jsonLd(page, url),
      bodyHtml: bodyHtml(page),
      assetTags,
    })
  )
}

console.log(`Prerendered ${landingPages.length} landing page(s) into dist/`)
