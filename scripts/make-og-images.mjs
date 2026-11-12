// Draws one 1200x630 share image per blog post into public/og/<slug>.jpg and
// records which posts have one in src/data/ogImages.js.
//
// This is NOT part of the build: it needs Playwright and the two brand fonts,
// which are not project dependencies. Run it by hand after adding a post:
//
//   FONT_DIR=/path/with/node_modules node scripts/make-og-images.mjs
//
// where FONT_DIR has @fontsource/cormorant-garamond and
// @fontsource-variable/bricolage-grotesque installed. A post without an image
// simply falls back to the site-wide share image, so nothing breaks if this is
// skipped. Existing images are left alone unless --force is passed (a changed
// image needs a new file name anyway, because the CDN keeps old bytes).
import { createRequire } from 'node:module'
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { blogPosts } from '../src/data/blogPosts.js'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = join(ROOT, 'public', 'og')
const FONT_DIR = process.env.FONT_DIR
if (!FONT_DIR) throw new Error('Set FONT_DIR to a folder whose node_modules has the two @fontsource packages.')
const force = process.argv.includes('--force')

const b64 = (file) => readFileSync(file).toString('base64')
const font = (pkg, file) => b64(join(FONT_DIR, 'node_modules', pkg, 'files', file))
const logo = b64(join(ROOT, 'public', 'logo-mci-192.webp'))
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

const html = (post) => `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:BrandSerif;font-weight:500;src:url(data:font/woff2;base64,${font('@fontsource/cormorant-garamond', 'cormorant-garamond-latin-500-normal.woff2')})}
@font-face{font-family:BrandSans;font-weight:100 900;src:url(data:font/woff2;base64,${font('@fontsource-variable/bricolage-grotesque', 'bricolage-grotesque-latin-wght-normal.woff2')})}
*{margin:0;box-sizing:border-box}
body{width:1200px;height:630px;background:#07121a;color:#f3eee3;font-family:BrandSans;display:flex;flex-direction:column;justify-content:space-between;padding:64px 72px 56px;border-top:6px solid #d9b85f}
.eyebrow{display:flex;align-items:center;gap:16px;font-size:22px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:#62c6d5}
.eyebrow::before{content:'';width:44px;height:2px;background:#62c6d5}
h1{font-family:BrandSerif;font-weight:500;line-height:1.04;letter-spacing:-.01em;max-width:1040px}
.foot{display:flex;align-items:center;justify-content:space-between;padding-top:28px;border-top:1px solid rgba(236,227,205,.26);font-size:24px;color:#c3c9c7}
.brand{display:flex;align-items:center;gap:20px;color:#f3eee3;font-weight:600}
.brand img{width:64px;height:65px}
.gold{color:#d9b85f}
</style></head><body>
<p class="eyebrow">${esc(post.category)}</p>
<h1 style="font-size:${post.title.length > 70 ? 62 : post.title.length > 48 ? 72 : 84}px">${esc(post.title)}</h1>
<div class="foot"><span class="brand"><img src="data:image/webp;base64,${logo}" alt="">MCI Eyelashes</span><span>Eyelash factory in <span class="gold">Purbalingga, Indonesia</span></span></div>
</body></html>`

mkdirSync(OUT, { recursive: true })
const require = createRequire(import.meta.url)
const { chromium } = require('playwright')
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } })
let made = 0
for (const post of blogPosts) {
  const file = join(OUT, `${post.slug}.jpg`)
  if (existsSync(file) && !force) continue
  await page.setContent(html(post), { waitUntil: 'load' })
  await page.evaluate(() => document.fonts.ready)
  await page.screenshot({ path: file, type: 'jpeg', quality: 86 })
  made++
}
await browser.close()

const have = new Set(readdirSync(OUT).filter((f) => f.endsWith('.jpg')).map((f) => f.slice(0, -4)))
const slugs = blogPosts.map((p) => p.slug).filter((s) => have.has(s))
writeFileSync(
  join(ROOT, 'src', 'data', 'ogImages.js'),
  `// Written by scripts/make-og-images.mjs. Posts listed here have their own share\n// image at /og/<slug>.jpg; any other post uses the site-wide one.\nconst WITH_IMAGE = new Set(${JSON.stringify(slugs, null, 2)})\n\nexport const ogImageFor = (slug, baseUrl) =>\n  WITH_IMAGE.has(slug) ? \`\${baseUrl}/og/\${slug}.jpg\` : \`\${baseUrl}/hero-lashes.jpg\`\n`,
)
console.log(`share images: ${made} drawn, ${slugs.length} of ${blogPosts.length} posts covered`)
