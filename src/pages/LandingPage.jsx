import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { landingPages } from '../data/landingPages'
import { photoAlt, photosFor, productSchema } from '../data/productPhotos'
import { setMeta, HOME_META } from '../utils/setMeta'
import NotFound from './NotFound'

const BASE_URL = 'https://www.mci-eyelashes.com'

// Inline [text](/path) links inside paragraph strings, for internal linking
// between landing pages (e.g. "see our OEM eyelash manufacturing page").
function parseInline(text) {
  const parts = text.split(/(\[.*?\]\(.*?\))/g)
  return parts.map((part, i) => {
    const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/)
    if (linkMatch) {
      const [, label, href] = linkMatch
      return (
        <Link key={i} to={href}>
          {label}
        </Link>
      )
    }
    return part
  })
}

export default function LandingPage({ slug: slugProp }) {
  const params = useParams()
  const slug = slugProp ?? params.slug
  const page = landingPages.find(p => p.slug === slug)
  const photos = page ? photosFor(page.slug) : []

  useEffect(() => {
    if (page) {
      window.scrollTo(0, 0)
      const url = `${BASE_URL}/${page.slug}`

      setMeta({
        title:              page.title,
        description:        page.metaDescription,
        canonical:          url,
        ogTitle:             page.title,
        ogDescription:       page.metaDescription,
        ogUrl:               url,
        ogImage:             `${BASE_URL}/hero-lashes.jpg`,
        twitterTitle:        page.title,
        twitterDescription:  page.metaDescription,
      })

      const existing = document.getElementById('landing-ld')
      if (existing) existing.remove()
      const script = document.createElement('script')
      script.id = 'landing-ld'
      script.type = 'application/ld+json'
      const product = productSchema(page.slug, url, BASE_URL)
      script.text = JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          ...(product ? [product] : []),
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
      })
      document.head.appendChild(script)
    }

    return () => {
      setMeta(HOME_META)
      const el = document.getElementById('landing-ld')
      if (el) el.remove()
    }
  }, [page])

  // An unknown single-segment URL (/anything) lands here through the /:slug
  // route. Redirecting to the homepage would tell Google every junk URL is a
  // valid page, so it renders the real 404 page instead.
  if (!page) return <NotFound />

  return (
    <main>
      <section className="page-hero page-hero--long">
        <div className="container container--narrow">
          <p className="eyebrow">
            <Link to="/">Home</Link> <span aria-hidden="true">/</span> {page.breadcrumbName}
          </p>
          <h1>{page.h1}</h1>
          <p className="lede">{page.intro}</p>
          <div className="btn-row">
            <Link to="/#contact" className="btn">Get Wholesale Pricing</Link>
            <Link to="/catalogue" className="btn-ghost">View Catalogue</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container container--narrow">
          <div className="fact-sheet">
            <dl className="fact-grid" aria-label="MCI Factory at a Glance">
              {page.factSheet.map(({ label, value }) => (
                <div key={label} className="fact">
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {photos.length > 0 && (
            <div style={{ marginTop: 'clamp(48px, 6vw, 72px)' }} aria-labelledby="landing-photos">
              <h2 id="landing-photos" className="sub-title">Styles from the catalogue</h2>
              <div className="plate">
                <div className="plate-grid" data-count={photos.length}>
                  {photos.map((p) => (
                    <figure key={p.code} className="plate-item">
                      <img src={p.src} alt={photoAlt(p)} width={p.width} height={p.height} loading="lazy" decoding="async" />
                      <figcaption>{p.code}</figcaption>
                    </figure>
                  ))}
                </div>
              </div>
              <p className="photo-note">
                Every style, with its code, is in the <Link to="/catalogue" className="text-link">product catalogue</Link>.
              </p>
            </div>
          )}

          <div className="prose" style={{ marginTop: 'clamp(48px, 6vw, 72px)' }}>
            {page.sections.map((section, i) => (
              <section key={i}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((p, j) => (
                  <p key={j}>{parseInline(p)}</p>
                ))}
                {section.list && (
                  <ul>
                    {section.list.map((item, j) => (
                      <li key={j}>{parseInline(item)}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          <div style={{ marginTop: 'clamp(48px, 6vw, 72px)' }}>
            <h2 className="sub-title">Frequently Asked Questions</h2>
            <div className="qa-list">
              {page.faq.map(({ q, a }, i) => (
                <div key={i} className="qa">
                  <h3>{q}</h3>
                  <p>{a}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="cta-block">
            <div>
              <p className="cta-title">Request Catalogue &amp; Wholesale Price</p>
              <p>Get a catalog, pricing sheet, and sample kit. Our team responds within 24 hours.</p>
            </div>
            <Link to="/#contact" className="btn">Get Wholesale Pricing</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
