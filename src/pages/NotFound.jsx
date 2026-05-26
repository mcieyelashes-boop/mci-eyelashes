import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function NotFound() {
  const { pathname } = useLocation()

  // Update document title
  useEffect(() => {
    const robots = document.querySelector('meta[name="robots"]')
    const previousRobots = robots?.getAttribute('content')
    document.title = '404 - Page Not Found | MCI Eyelashes'
    robots?.setAttribute('content', 'noindex, nofollow')
    return () => {
      document.title = 'MCI Eyelashes'
      if (robots && previousRobots) robots.setAttribute('content', previousRobots)
    }
  }, [])

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--navy)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 24px',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Glow orbs */}
      <div style={{
        position: 'absolute',
        width: '480px', height: '480px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(72,184,202,0.06) 0%, transparent 70%)',
        top: '10%', left: '-120px',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        width: '380px', height: '380px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(72,184,202,0.04) 0%, transparent 70%)',
        bottom: '10%', right: '-80px',
        pointerEvents: 'none',
      }} />

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        style={{ textAlign: 'center', maxWidth: '540px', position: 'relative', zIndex: 1 }}
      >
        {/* 404 number */}
        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(96px, 18vw, 160px)',
            fontWeight: 300,
            color: 'rgba(72,184,202,0.12)',
            lineHeight: 1,
            letterSpacing: '-4px',
            marginBottom: '-12px',
            userSelect: 'none',
          }}
        >
          404
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            height: '1px',
            background: 'linear-gradient(to right, transparent, rgba(72,184,202,0.3), transparent)',
            margin: '0 auto 32px',
            maxWidth: '200px',
          }}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 0.25 }}
          style={{
            fontSize: '10px',
            letterSpacing: '4px',
            textTransform: 'uppercase',
            color: 'var(--teal)',
            fontFamily: "'Montserrat', sans-serif",
            marginBottom: '16px',
          }}
        >
          Page Not Found
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(28px, 5vw, 42px)',
            fontWeight: 400,
            color: '#fff',
            lineHeight: 1.2,
            marginBottom: '16px',
          }}
        >
          This page doesn't exist
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.38 }}
          style={{
            fontSize: '14px',
            color: 'rgba(255,255,255,0.4)',
            lineHeight: 1.7,
            marginBottom: '8px',
          }}
        >
          The URL <code style={{
            fontFamily: 'monospace',
            background: 'rgba(72,184,202,0.08)',
            border: '1px solid rgba(72,184,202,0.15)',
            borderRadius: '4px',
            padding: '2px 7px',
            fontSize: '12px',
            color: 'rgba(72,184,202,0.7)',
          }}>{pathname}</code> could not be found.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.42 }}
          style={{
            fontSize: '14px',
            color: 'rgba(255,255,255,0.35)',
            marginBottom: '44px',
          }}
        >
          It may have moved, been deleted, or never existed.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <Link
            to="/"
            className="btn-primary"
            style={{ textDecoration: 'none' }}
          >
            ← Back to Home
          </Link>

          <a
            href="#contact"
            onClick={e => { e.preventDefault(); window.location.href = '/#contact' }}
            className="btn-outline"
          >
            Contact Us
          </a>
        </motion.div>

        {/* Quick links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{ marginTop: '52px' }}
        >
          <p style={{
            fontSize: '11px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.2)',
            marginBottom: '16px',
            fontFamily: "'Montserrat', sans-serif",
          }}>
            Quick Links
          </p>
          <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { label: 'Products', href: '/#products' },
              { label: 'Catalogue', href: '/catalogue' },
              { label: 'Blog',     href: '/blog' },
              { label: 'Contact',  href: '/#contact' },
            ].map(({ label, href }) => (
              <Link
                key={label}
                to={href}
                style={{
                  fontSize: '13px',
                  color: 'rgba(72,184,202,0.6)',
                  textDecoration: 'none',
                  fontFamily: "'Montserrat', sans-serif",
                  letterSpacing: '0.5px',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.target.style.color = 'rgba(72,184,202,1)'}
                onMouseLeave={e => e.target.style.color = 'rgba(72,184,202,0.6)'}
              >
                {label}
              </Link>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
