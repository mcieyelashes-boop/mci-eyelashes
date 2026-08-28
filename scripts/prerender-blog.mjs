// Post-build static prerender for /blog and /blog/:slug.
//
// Why: the app is a client-rendered Vite SPA. AI crawlers (GPTBot, ClaudeBot,
// PerplexityBot, etc.) and many search bots fetch raw HTML and do NOT execute
// JavaScript, so blog articles — the main SEO/GEO content play — were
// invisible to them (per-post meta + JSON-LD were only ever injected client-side
// via useEffect in src/pages/BlogPost.jsx). This script writes real static
// HTML files into dist/ after `vite build` so those bots see full content,
// while human visitors still get the exact same hashed JS/CSS bundle and the
// SPA takes over the moment it loads (see main.jsx: createRoot().render(),
// no hydrateRoot, so replacing the prerendered markup is safe).
//
// Output lands at dist/blog.html and dist/blog/<slug>.html — paired with
// "cleanUrls": true in vercel.json so /blog and /blog/<slug> serve them
// directly. Vercel serves matching static files before applying the SPA
// rewrite, so these never fall through to index.html.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { blogPosts } from '../src/data/blogPosts.js'
import { AUTHOR } from '../src/data/author.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const DIST = join(ROOT, 'dist')
const BASE_URL = 'https://www.mci-eyelashes.com'

const distIndexHtml = readFileSync(join(DIST, 'index.html'), 'utf-8')

// Pull the hashed script/link/modulepreload tags Vite injected into the real
// build, so every prerendered page loads the exact same app bundle.
const assetTags = [...distIndexHtml.matchAll(/<(script|link)[^>]+(?:src|href)="\/assets\/[^"]+"[^>]*>(?:<\/script>)?/g)]
  .map((m) => m[0])
  .join('\n    ')

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

// Minimal markdown-ish -> HTML converter for the subset actually used in
// blogPosts.js body strings: **bold**, "- " bullets, "1. " numbered lists,
// pipe tables, [text](url) links, and blank-line paragraphs.
function bodyToHtml(body) {
  const inline = (s) =>
    escapeHtml(s)
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')

  const blocks = body.trim().split(/\n\n+/)
  return blocks
    .map((block) => {
      const lines = block.split('\n').filter(Boolean)
      if (lines.every((l) => /^\s*-\s/.test(l))) {
        return `<ul>${lines.map((l) => `<li>${inline(l.replace(/^\s*-\s/, ''))}</li>`).join('')}</ul>`
      }
      if (lines.every((l) => /^\s*\d+\.\s/.test(l))) {
        return `<ol>${lines.map((l) => `<li>${inline(l.replace(/^\s*\d+\.\s/, ''))}</li>`).join('')}</ol>`
      }
      if (lines[0]?.startsWith('|')) {
        const rows = lines.filter((l) => !/^\|[\s-]+\|$/.test(l)).map((l) => l.split('|').filter((c) => c.trim() !== ''))
        const [head, ...body2] = rows
        return `<table><thead><tr>${head.map((c) => `<th>${inline(c.trim())}</th>`).join('')}</tr></thead><tbody>${body2
          .map((r) => `<tr>${r.map((c) => `<td>${inline(c.trim())}</td>`).join('')}</tr>`)
          .join('')}</tbody></table>`
      }
      return `<p>${inline(lines.join(' '))}</p>`
    })
    .join('\n')
}

const HEAD_STATIC = `
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-L2FC465XD9"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-L2FC465XD9');
    </script>
    <meta name="google-site-verification" content="amo9mKdHSCmbAfa8L6DbxlFgYyMDStnf9riYJrLIOEM" />
    <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg?v=3" />
    <link rel="alternate icon" type="image/png" href="/favicon-180.png?v=3" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png?v=3" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Montserrat:wght@300;400;500;600;700&display=swap" />
    <meta name="theme-color" content="#0a1720" />
    <script type="application/ld+json">${JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'MCI Eyelashes',
      url: BASE_URL,
      logo: `${BASE_URL}/favicon.svg`,
    })}</script>`

function page({ title, description, canonical, ogTitle, ogDescription, ogImage, jsonLd, bodyHtml }) {
  return `<!doctype html>
<html lang="en">
  <head>${HEAD_STATIC}
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <link rel="canonical" href="${canonical}" />
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="MCI Eyelashes" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:title" content="${escapeHtml(ogTitle)}" />
    <meta property="og:description" content="${escapeHtml(ogDescription)}" />
    <meta property="og:image" content="${ogImage}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(ogTitle)}" />
    <meta name="twitter:description" content="${escapeHtml(ogDescription)}" />
    <meta name="twitter:image" content="${ogImage}" />
    ${jsonLd.map((obj) => `<script type="application/ld+json">${JSON.stringify(obj)}</script>`).join('\n    ')}
    ${assetTags}
  </head>
  <body>
    <div id="root">${bodyHtml}</div>
  </body>
</html>
`
}

function postJsonLd(post, url) {
  return [
    {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BlogPosting',
          '@id': url,
          headline: post.title,
          description: post.metaDescription,
          datePublished: post.date,
          dateModified: post.date,
          author: {
            '@type': 'Person',
            name: AUTHOR.name,
            jobTitle: AUTHOR.jobTitle,
            url: AUTHOR.url,
            worksFor: { '@type': 'Organization', name: 'MCI Eyelashes', url: BASE_URL },
          },
          publisher: {
            '@type': 'Organization',
            name: 'MCI Eyelashes',
            logo: { '@type': 'ImageObject', url: `${BASE_URL}/favicon.svg` },
          },
          mainEntityOfPage: { '@type': 'WebPage', '@id': url },
          ...(post.faq && {
            mainEntity: post.faq.map(({ q, a }) => ({
              '@type': 'Question',
              name: q,
              acceptedAnswer: { '@type': 'Answer', text: a },
            })),
          }),
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: `${BASE_URL}/` },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE_URL}/blog` },
            { '@type': 'ListItem', position: 3, name: post.title, item: url },
          ],
        },
      ],
    },
  ]
}

function postBodyHtml(post) {
  return `
    <article>
      <nav><a href="/">Home</a> &rsaquo; <a href="/blog">Blog</a> &rsaquo; <span>${escapeHtml(post.category)}</span></nav>
      <p>${escapeHtml(post.category)} &middot; ${new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} &middot; ${escapeHtml(post.readTime)} &middot; By ${escapeHtml(AUTHOR.name)}, ${escapeHtml(AUTHOR.jobTitle)}</p>
      <h1>${escapeHtml(post.title)}</h1>
      <p><em>${escapeHtml(post.excerpt)}</em></p>
      ${post.sections.map((s) => `<h2>${escapeHtml(s.heading)}</h2>\n${bodyToHtml(s.body)}`).join('\n')}
      ${
        post.faq
          ? `<h2>Frequently Asked Questions</h2>${post.faq
              .map(({ q, a }) => `<h3>${escapeHtml(q)}</h3><p>${escapeHtml(a)}</p>`)
              .join('\n')}`
          : ''
      }
    </article>`
}

function listBodyHtml() {
  return `
    <main>
      <h1>Wholesale Lash Industry Guides</h1>
      <p>Expert guides for wholesale lash buyers, salon owners, and beauty entrepreneurs.</p>
      <ul>
        ${blogPosts
          .map(
            (p) =>
              `<li><a href="/blog/${p.slug}"><h2>${escapeHtml(p.title)}</h2></a><p>${escapeHtml(p.excerpt)}</p></li>`
          )
          .join('\n        ')}
      </ul>
    </main>`
}

// Blog list
mkdirSync(join(DIST, 'blog'), { recursive: true })
writeFileSync(
  join(DIST, 'blog.html'),
  page({
    title: 'Blog | MCI Eyelashes — Wholesale Lash Industry Guides',
    description:
      'Expert guides for wholesale lash buyers, salon owners, and beauty entrepreneurs — from MOQ and pricing to private label manufacturing and brand building.',
    canonical: `${BASE_URL}/blog`,
    ogTitle: 'Wholesale Lash Industry Guides | MCI Eyelashes Blog',
    ogDescription: 'Practical guides on starting a lash business, choosing a manufacturer, private label OEM, pricing strategy, and more.',
    ogImage: `${BASE_URL}/hero-lashes.jpg`,
    jsonLd: [],
    bodyHtml: listBodyHtml(),
  })
)

// Each post
for (const post of blogPosts) {
  const url = `${BASE_URL}/blog/${post.slug}`
  writeFileSync(
    join(DIST, 'blog', `${post.slug}.html`),
    page({
      title: `${post.title} | MCI Eyelashes Blog`,
      description: post.metaDescription,
      canonical: url,
      ogTitle: post.title,
      ogDescription: post.metaDescription,
      ogImage: `${BASE_URL}/hero-lashes.jpg`,
      jsonLd: postJsonLd(post, url),
      bodyHtml: postBodyHtml(post),
    })
  )
}

console.log(`Prerendered ${blogPosts.length} blog posts + blog list into dist/`)
