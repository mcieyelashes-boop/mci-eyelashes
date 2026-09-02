// Shared helpers for build-time static prerendering (see prerender-blog.mjs
// for the full rationale: AI crawlers and many bots don't execute JS, so
// content-heavy routes get real static HTML in addition to the SPA bundle).
export const BASE_URL = 'https://www.mci-eyelashes.com'

export function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

// Pulls the hashed script/link/modulepreload tags Vite injected into the
// real build, so every prerendered page loads the exact same app bundle.
export function getAssetTags(distIndexHtml) {
  return [...distIndexHtml.matchAll(/<(script|link)[^>]+(?:src|href)="\/assets\/[^"]+"[^>]*>(?:<\/script>)?/g)]
    .map((m) => m[0])
    .join('\n    ')
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

export function renderPage({ title, description, canonical, ogTitle, ogDescription, ogImage, ogType = 'website', jsonLd, bodyHtml, assetTags }) {
  return `<!doctype html>
<html lang="en">
  <head>${HEAD_STATIC}
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <link rel="canonical" href="${canonical}" />
    <meta property="og:type" content="${ogType}" />
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
