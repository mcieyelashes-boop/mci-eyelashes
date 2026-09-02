import { useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { landingPages } from '../data/landingPages'
import { setMeta, HOME_META } from '../utils/setMeta'

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
        <Link key={i} to={href} style={{ color: 'var(--teal-light)', textDecoration: 'underline', textDecorationColor: 'rgba(72,184,202,.35)', textUnderlineOffset: '3px' }}>
          {label}
        </Link>
      )
    }
    return part
  })
}

export default function LandingPage({ slug }) {
  const page = landingPages.find(p => p.slug === slug)

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
      script.text = JSON.stringify({
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
      })
      document.head.appendChild(script)
    }

    return () => {
      setMeta(HOME_META)
      const el = document.getElementById('landing-ld')
      if (el) el.remove()
    }
  }, [page])

  if (!page) return <Navigate to="/" replace />

  return (
    <>
      {/* Hero */}
      <section style={{ background: 'var(--navy-mid)', padding: '150px 0 90px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: '-200px', left: '50%', transform: 'translateX(-50%)',
          width: '600px', height: '600px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(72,184,202,.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p style={{ fontSize: '10px', letterSpacing: '.3em', textTransform: 'uppercase', color: 'var(--teal-light)', fontWeight: 600, marginBottom: '20px' }}>
              <Link to="/" style={{ color: 'inherit' }}>Home</Link> &rsaquo; {page.breadcrumbName}
            </p>
            <h1 style={{
              fontFamily: 'Cormorant Garamond, serif', fontWeight: 300,
              fontSize: 'clamp(36px, 5vw, 64px)', color: '#fff', lineHeight: 1.08,
              marginBottom: '24px', maxWidth: '840px', marginLeft: 'auto', marginRight: 'auto',
            }}>
              {page.h1}
            </h1>
            <p style={{
              fontSize: '15px', color: 'var(--text-on-dark-mid)', lineHeight: 1.9,
              maxWidth: '680px', margin: '0 auto',
            }}>
              {page.intro}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Fact sheet */}
      <section style={{ background: 'var(--navy)', padding: '56px 0' }}>
        <div className="container">
          <div style={{
            maxWidth: '960px', margin: '0 auto', background: 'var(--navy-card)',
            border: '1px solid var(--border-dark)', padding: '8px',
          }}>
            <p style={{
              fontSize: '10px', letterSpacing: '.2em', textTransform: 'uppercase',
              color: 'var(--teal)', fontWeight: 600, padding: '18px 24px 6px',
            }}>
              MCI Factory at a Glance
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }} className="landing-fact-grid">
              {page.factSheet.map(({ label, value }) => (
                <div key={label} style={{ padding: '16px 24px', borderTop: '1px solid var(--border-white)' }}>
                  <div style={{ fontSize: '10px', letterSpacing: '.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,.35)', marginBottom: '4px' }}>{label}</div>
                  <div style={{ fontSize: '13px', color: 'rgba(255,255,255,.88)', fontWeight: 500 }}>{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section style={{ background: 'var(--navy)', padding: '20px 0 80px' }}>
        <div className="container">
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>
            {page.sections.map((section, i) => (
              <div key={i} style={{ marginBottom: '48px' }}>
                <h2 style={{
                  fontFamily: 'Cormorant Garamond, serif', fontWeight: 400,
                  fontSize: 'clamp(22px, 2.4vw, 30px)', color: '#fff', marginBottom: '18px',
                }}>
                  {section.heading}
                </h2>
                {section.paragraphs.map((p, j) => (
                  <p key={j} style={{ fontSize: '14px', color: 'var(--text-on-dark-mid)', lineHeight: 1.9, marginBottom: '14px' }}>
                    {parseInline(p)}
                  </p>
                ))}
                {section.list && (
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
                    {section.list.map((item, j) => (
                      <li key={j} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', fontSize: '14px', color: 'var(--text-on-dark-mid)', lineHeight: 1.8 }}>
                        <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--teal)', flexShrink: 0, marginTop: '9px' }} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}

            {/* FAQ */}
            <div style={{ marginTop: '56px', paddingTop: '44px', borderTop: '1px solid var(--border-soft)' }}>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(22px,2.4vw,30px)', color: '#fff', marginBottom: '28px' }}>
                Frequently Asked Questions
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {page.faq.map(({ q, a }, i) => (
                  <div key={i} style={{ padding: '20px 0', borderBottom: '1px solid var(--border-soft)' }}>
                    <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '17px', color: '#fff', fontWeight: 500, marginBottom: '8px' }}>{q}</p>
                    <p style={{ fontSize: '13px', color: 'var(--text-on-dark-mid)', lineHeight: 1.8 }}>{a}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div style={{ marginTop: '56px', textAlign: 'center', padding: '48px 32px', background: 'var(--navy-mid)', border: '1px solid var(--border-dark)' }}>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '24px', color: '#fff', marginBottom: '10px' }}>
                Request Catalogue &amp; Wholesale Price
              </p>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,.4)', marginBottom: '24px' }}>
                Get a catalog, pricing sheet, and sample kit — our team responds within 24 hours.
              </p>
              <Link
                to="/#contact"
                style={{
                  display: 'inline-block', padding: '15px 34px', background: 'var(--teal)',
                  color: 'var(--navy)', fontSize: '11px', letterSpacing: '.16em',
                  textTransform: 'uppercase', fontWeight: 700,
                }}
              >
                Get Wholesale Pricing →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 640px) {
          .landing-fact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}
