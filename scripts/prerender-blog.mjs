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
// Output lands at dist/blog.html and dist/blog/<slug>.html, matched by
// explicit rewrites in vercel.json ahead of the SPA catch-all.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { blogPosts } from '../src/data/blogPosts.js'
import { AUTHOR } from '../src/data/author.js'
import { BASE_URL, escapeHtml, getAssetTags, renderPage } from './prerender-shared.mjs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const DIST = join(ROOT, 'dist')

const distIndexHtml = readFileSync(join(DIST, 'index.html'), 'utf-8')
const assetTags = getAssetTags(distIndexHtml)

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
  renderPage({
    title: 'Blog | MCI Eyelashes — Wholesale Lash Industry Guides',
    description:
      'Expert guides for wholesale lash buyers, salon owners, and beauty entrepreneurs — from MOQ and pricing to private label manufacturing and brand building.',
    canonical: `${BASE_URL}/blog`,
    ogTitle: 'Wholesale Lash Industry Guides | MCI Eyelashes Blog',
    ogDescription: 'Practical guides on starting a lash business, choosing a manufacturer, private label OEM, pricing strategy, and more.',
    ogImage: `${BASE_URL}/hero-lashes.jpg`,
    jsonLd: [],
    bodyHtml: listBodyHtml(),
    assetTags,
  })
)

// Each post
for (const post of blogPosts) {
  const url = `${BASE_URL}/blog/${post.slug}`
  writeFileSync(
    join(DIST, 'blog', `${post.slug}.html`),
    renderPage({
      title: `${post.title} | MCI Eyelashes Blog`,
      description: post.metaDescription,
      canonical: url,
      ogTitle: post.title,
      ogDescription: post.metaDescription,
      ogImage: `${BASE_URL}/hero-lashes.jpg`,
      ogType: 'article',
      jsonLd: postJsonLd(post, url),
      bodyHtml: postBodyHtml(post),
      assetTags,
    })
  )
}

console.log(`Prerendered ${blogPosts.length} blog posts + blog list into dist/`)
