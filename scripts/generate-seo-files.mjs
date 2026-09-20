// Generates public/sitemap.xml and public/llms.txt from the same data that
// renders the pages (landingPages.js, blogPosts.js), so a new page can never
// exist without being listed, and a listed URL can never be a dead one.
//
// It runs before vite build (see package.json) and the outputs are committed,
// so a diff shows exactly which URLs a change added.
//
// Deliberately absent from the sitemap: #anchor URLs (Google ignores the
// fragment, so they were just duplicates of "/"), changefreq and priority
// (Google ignores both), and lastmod for pages with no honest date -- Google
// stops trusting lastmod once it is wrong, so it is only written where there
// is a real date (blog posts).
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { landingPages } from '../src/data/landingPages.js'
import { blogPosts } from '../src/data/blogPosts.js'
import { BASE_URL, escapeHtml } from './prerender-shared.mjs'

const PUBLIC = join(dirname(fileURLToPath(import.meta.url)), '..', 'public')

const latestPost = blogPosts.map((p) => p.date).sort().at(-1)

const urls = [
  { path: '/' },
  { path: '/catalogue' },
  { path: '/blog', lastmod: latestPost },
  ...landingPages.map((p) => ({ path: `/${p.slug}` })),
  ...blogPosts.map((p) => ({ path: `/blog/${p.slug}`, lastmod: p.date })),
]

const seen = new Set()
for (const { path } of urls) {
  if (path.includes('#')) throw new Error(`sitemap URL must not contain a fragment: ${path}`)
  if (seen.has(path)) throw new Error(`duplicate sitemap URL: ${path}`)
  seen.add(path)
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    ({ path, lastmod }) =>
      `  <url>\n    <loc>${escapeHtml(BASE_URL + path)}</loc>${lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : ''}\n  </url>`,
  )
  .join('\n')}
</urlset>
`
writeFileSync(join(PUBLIC, 'sitemap.xml'), sitemap)

// llms.txt (https://llmstxt.org). A proposal, not a standard: no search engine
// has confirmed it reads this file. It costs nothing and helps any agent that
// does, so it is generated, but nobody should expect ranking from it.
// Every fact below is owner-confirmed; do not add one that is not.
const llms = `# MCI Eyelashes

> MCI Eyelashes is a direct eyelash manufacturer based in Purbalingga, Central Java, Indonesia. It makes mink, silk, synthetic and human-hair eyelashes for salons, distributors and beauty brands worldwide, and offers OEM and private label manufacturing.

Key facts:
- Minimum order: 100 pairs per style, styles can be mixed and matched.
- Samples: free on existing catalogue styles; the buyer pays shipping only.
- Production: 5 working days for 100-pair orders.
- Private label: custom curl, length, material and packaging.
- Factory verification: live video call to the production floor on request.
- Contact: denis@mci-eyelashes.com, WhatsApp +62 812-3237-8987.

## Manufacturing and services
${landingPages.map((p) => `- [${p.h1}](${BASE_URL}/${p.slug}): ${p.metaDescription}`).join('\n')}

## Catalogue
- [Product Catalogue](${BASE_URL}/catalogue): wholesale eyelash collections and style codes.

## Guides
${blogPosts.map((p) => `- [${p.title}](${BASE_URL}/blog/${p.slug}): ${p.metaDescription}`).join('\n')}
`
writeFileSync(join(PUBLIC, 'llms.txt'), llms)

console.log(`Wrote sitemap.xml (${urls.length} URLs) and llms.txt`)
