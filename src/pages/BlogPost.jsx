import { useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { blogPosts } from '../data/blogPosts'
import { renderBody } from '../utils/renderMarkdown'

export default function BlogPost() {
  const { slug } = useParams()
  const post = blogPosts.find(p => p.slug === slug)

  useEffect(() => {
    if (post) {
      window.scrollTo(0, 0)
      document.title = `${post.title} | MCI Eyelashes Blog`

      // Inject BlogPosting JSON-LD
      const existing = document.getElementById('blog-ld')
      if (existing) existing.remove()
      const script = document.createElement('script')
      script.id = 'blog-ld'
      script.type = 'application/ld+json'
      script.text = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.metaDescription,
        datePublished: post.date,
        dateModified: post.date,
        author: { '@type': 'Organization', name: 'MCI Eyelashes' },
        publisher: {
          '@type': 'Organization',
          name: 'MCI Eyelashes',
          logo: { '@type': 'ImageObject', url: 'https://www.mci-eyelashes.com/favicon.svg' },
        },
        mainEntityOfPage: { '@type': 'WebPage', '@id': `https://www.mci-eyelashes.com/blog/${post.slug}` },
        ...(post.faq && {
          mainEntity: post.faq.map(({ q, a }) => ({
            '@type': 'Question',
            name: q,
            acceptedAnswer: { '@type': 'Answer', text: a },
          })),
        }),
      })
      document.head.appendChild(script)
    }
    return () => {
      const el = document.getElementById('blog-ld')
      if (el) el.remove()
    }
  }, [post])

  if (!post) return <Navigate to="/blog" replace />

  const otherPosts = blogPosts.filter(p => p.slug !== slug).slice(0, 2)

  return (
    <>
      {/* Hero */}
      <section style={{
        background: 'var(--navy)',
        paddingTop: '140px',
        paddingBottom: '80px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '-150px', right: '-100px',
          width: '500px', height: '500px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(72,184,202,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div className="container">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '28px' }}
          >
            <Link to="/" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', letterSpacing: '1px' }}>Home</Link>
            <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '11px' }}>›</span>
            <Link to="/blog" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)', letterSpacing: '1px' }}>Blog</Link>
            <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '11px' }}>›</span>
            <span style={{ fontSize: '11px', color: 'var(--teal-light)', letterSpacing: '1px' }}>{post.category}</span>
          </motion.div>

          {/* Meta */}
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap' }}
          >
            <span style={{
              fontSize: '9px', letterSpacing: '2.5px', textTransform: 'uppercase',
              color: 'var(--teal-dark)', border: '1px solid var(--teal)',
              padding: '5px 12px', fontWeight: 600,
            }}>
              {post.category}
            </span>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>
              {new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>{post.readTime}</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.1 }}
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(32px, 4.5vw, 64px)',
              color: '#fff', fontWeight: 300, lineHeight: 1.1,
              maxWidth: '800px',
            }}
          >
            {post.title}
          </motion.h1>
        </div>
      </section>

      {/* Article body */}
      <section style={{ background: 'var(--white)', padding: '80px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '80px', alignItems: 'start' }}
            className="blog-layout"
          >
            {/* Main content */}
            <article>
              {/* Lead */}
              <p style={{
                fontSize: '16px', color: 'var(--text-mid)', lineHeight: 2,
                borderLeft: '3px solid var(--teal)',
                paddingLeft: '24px', marginBottom: '56px',
                fontFamily: 'Cormorant Garamond, serif',
                fontStyle: 'italic',
              }}>
                {post.excerpt}
              </p>

              {/* Sections */}
              {post.sections.map((section, i) => (
                <div key={i} style={{ marginBottom: '52px' }}>
                  <h2 style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: 'clamp(22px, 2.5vw, 32px)',
                    color: 'var(--text-dark)', fontWeight: 400,
                    marginBottom: '20px', lineHeight: 1.2,
                  }}>
                    {section.heading}
                  </h2>
                  <div>{renderBody(section.body)}</div>
                </div>
              ))}

              {/* FAQ */}
              {post.faq && (
                <div style={{ marginTop: '64px', paddingTop: '48px', borderTop: '1px solid var(--border-soft)' }}>
                  <h2 style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: 'clamp(22px, 2.5vw, 32px)',
                    color: 'var(--text-dark)', marginBottom: '32px',
                  }}>
                    Frequently Asked Questions
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                    {post.faq.map(({ q, a }, i) => (
                      <div key={i} style={{
                        padding: '24px 0',
                        borderBottom: '1px solid var(--border-soft)',
                      }}>
                        <p style={{
                          fontFamily: 'Cormorant Garamond, serif',
                          fontSize: '18px', color: 'var(--text-dark)',
                          fontWeight: 500, marginBottom: '10px', lineHeight: 1.3,
                        }}>
                          {q}
                        </p>
                        <p style={{ fontSize: '13px', color: 'var(--text-mid)', lineHeight: 1.85 }}>
                          {a}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </article>

            {/* Sidebar */}
            <aside style={{ position: 'sticky', top: '110px' }} className="blog-sidebar">
              {/* CTA card */}
              <div style={{
                background: 'var(--navy)',
                padding: '32px 28px',
                marginBottom: '24px',
              }}>
                <p style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: '14px' }}>
                  Wholesale Inquiry
                </p>
                <p style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '22px', color: '#fff', lineHeight: 1.3, marginBottom: '12px',
                }}>
                  Ready to order wholesale?
                </p>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)', lineHeight: 1.7, marginBottom: '24px' }}>
                  Get a catalog, pricing sheet, and sample kit — our team responds within 24 hours.
                </p>
                <Link
                  to="/#contact"
                  style={{
                    display: 'block', textAlign: 'center',
                    padding: '14px 20px',
                    background: 'var(--teal)',
                    color: '#fff',
                    fontSize: '10px', letterSpacing: '2.5px',
                    textTransform: 'uppercase', fontWeight: 600,
                    fontFamily: 'Montserrat, sans-serif',
                  }}
                >
                  Get Wholesale Pricing →
                </Link>
              </div>

              {/* More articles */}
              <div>
                <p style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--teal-dark)', marginBottom: '16px', fontWeight: 600 }}>
                  More Guides
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                  {otherPosts.map(other => (
                    <Link
                      key={other.slug}
                      to={`/blog/${other.slug}`}
                      style={{
                        display: 'block', padding: '16px 0',
                        borderBottom: '1px solid var(--border-soft)',
                      }}
                    >
                      <span style={{ fontSize: '9px', color: 'var(--teal-dark)', letterSpacing: '1.5px', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                        {other.category}
                      </span>
                      <span style={{ fontSize: '13px', color: 'var(--text-dark)', lineHeight: 1.4, fontFamily: 'Cormorant Garamond, serif', fontSize: '16px' }}>
                        {other.title}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .blog-layout { grid-template-columns: 1fr !important; }
          .blog-sidebar { position: static !important; }
        }
      `}</style>
    </>
  )
}
