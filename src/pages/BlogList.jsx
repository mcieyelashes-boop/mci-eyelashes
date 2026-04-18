import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { blogPosts } from '../data/blogPosts'
import { setMeta, HOME_META } from '../utils/setMeta'

const BASE_URL = 'https://www.mci-eyelashes.com'

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] } }),
}

export default function BlogList() {
  useEffect(() => {
    window.scrollTo(0, 0)
    setMeta({
      title:              'Blog | MCI Eyelashes — Wholesale Lash Industry Guides',
      description:        'Expert guides for wholesale lash buyers, salon owners, and beauty entrepreneurs — from MOQ and pricing to private label manufacturing and brand building.',
      canonical:          `${BASE_URL}/blog`,
      ogTitle:            'Wholesale Lash Industry Guides | MCI Eyelashes Blog',
      ogDescription:      'Practical guides on starting a lash business, choosing a manufacturer, private label OEM, pricing strategy, and more.',
      ogUrl:              `${BASE_URL}/blog`,
      ogImage:            `${BASE_URL}/hero-lashes.jpg`,
      twitterTitle:       'Wholesale Lash Industry Guides | MCI Eyelashes Blog',
      twitterDescription: 'Expert guides on private label lashes, wholesale pricing, MOQ, and lash business strategy.',
    })
    return () => setMeta(HOME_META)
  }, [])

  return (
    <>
      {/* Hero */}
      <section style={{
        background: 'var(--navy)',
        paddingTop: '160px',
        paddingBottom: '100px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '-200px', right: '-100px',
          width: '600px', height: '600px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(72,184,202,0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div className="container">
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="section-label section-label--light"
          >
            Resources
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(42px, 6vw, 80px)',
              color: '#fff', fontWeight: 300, lineHeight: 1.05,
              marginBottom: '20px',
            }}
          >
            Wholesale Lash<br />
            <span style={{ color: 'var(--teal-light)', fontStyle: 'italic' }}>Industry Guides</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{ fontSize: '14px', color: 'rgba(255,255,255,0.45)', lineHeight: 1.9, maxWidth: '480px' }}
          >
            Practical guides for salon owners, distributors, and beauty entrepreneurs — from pricing and MOQ to private label manufacturing.
          </motion.p>
        </div>
      </section>

      {/* Posts grid */}
      <section style={{ background: 'var(--off-white)', padding: '100px 0' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '24px',
          }}
            className="blog-grid"
          >
            {blogPosts.map((post, i) => (
              <motion.article
                key={post.slug}
                custom={i}
                initial="hidden"
                animate="show"
                variants={cardVariants}
                style={{
                  background: 'var(--white)',
                  border: '1px solid var(--border-soft)',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'box-shadow 0.35s, border-color 0.35s',
                }}
                whileHover={{
                  boxShadow: '0 12px 48px rgba(72,184,202,0.1)',
                  borderColor: 'var(--teal)',
                }}
              >
                {/* Category bar */}
                <div style={{
                  height: '3px',
                  background: 'linear-gradient(to right, var(--teal), var(--teal-dark))',
                }} />

                <div style={{ padding: '36px 36px 32px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  {/* Meta */}
                  <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '20px' }}>
                    <span style={{
                      fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase',
                      color: 'var(--teal-dark)', fontWeight: 600,
                      border: '1px solid var(--teal)',
                      padding: '4px 10px',
                    }}>
                      {post.category}
                    </span>
                    <span style={{ fontSize: '11px', color: 'var(--text-light)' }}>
                      {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: 'clamp(20px, 2vw, 26px)',
                    color: 'var(--text-dark)',
                    fontWeight: 400, lineHeight: 1.2,
                    marginBottom: '16px',
                  }}>
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p style={{
                    fontSize: '13px', color: 'var(--text-mid)',
                    lineHeight: 1.8, marginBottom: '28px', flex: 1,
                  }}>
                    {post.excerpt}
                  </p>

                  {/* Footer */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '20px', borderTop: '1px solid var(--border-soft)' }}>
                    <span style={{ fontSize: '10px', color: 'var(--text-light)', letterSpacing: '1px' }}>
                      {post.readTime}
                    </span>
                    <Link
                      to={`/blog/${post.slug}`}
                      style={{
                        fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase',
                        fontWeight: 600, color: 'var(--teal-dark)',
                        display: 'flex', alignItems: 'center', gap: '6px',
                      }}
                    >
                      Read Guide →
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .blog-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}
