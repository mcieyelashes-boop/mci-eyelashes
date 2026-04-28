import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'

const links = [
  { label: 'Products', href: '/#products' },
  { label: 'Catalogue', href: '/catalogue', isRoute: true },
  { label: 'Process', href: '/#process' },
  { label: 'Gallery', href: '/#gallery' },
  { label: 'About', href: '/#about' },
  { label: 'Blog', href: '/blog', isRoute: true },
  { label: 'Contact', href: '/#contact' },
  { label: 'Dashboard', href: '/dashboard', isRoute: true },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const textColor = scrolled ? 'var(--text-mid)' : 'rgba(255,255,255,0.75)'
  const textHover = scrolled ? 'var(--teal-dark)' : 'var(--teal-light)'
  const logoColor = scrolled ? 'var(--text-dark)' : '#fff'
  const logoSub = scrolled ? 'var(--teal-dark)' : 'var(--teal-light)'

  return (
    <motion.nav
      aria-label="Main navigation"
      initial={{ y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        padding: scrolled ? '14px 48px' : '22px 48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'background 0.5s ease, padding 0.4s ease, box-shadow 0.4s ease',
        background: scrolled ? 'rgba(255,255,255,0.97)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        boxShadow: scrolled ? '0 1px 0 rgba(72,184,202,0.12), 0 4px 24px rgba(13,30,42,0.06)' : 'none',
      }}
    >
      {/* Logo */}
      <motion.a href="#" aria-label="MCI Eyelashes — back to top" style={{ display: 'flex', flexDirection: 'column', gap: '2px', flexShrink: 0 }}>
        <span style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: '24px',
          fontWeight: 500,
          color: logoColor,
          letterSpacing: '5px',
          textTransform: 'uppercase',
          lineHeight: 1,
          transition: 'color 0.4s',
        }}>MCI</span>
        <span style={{
          fontSize: '8px',
          letterSpacing: '6px',
          color: logoSub,
          textTransform: 'uppercase',
          fontWeight: 400,
          transition: 'color 0.4s',
        }}>Eyelashes</span>
      </motion.a>

      {/* Desktop Links */}
      <ul className="desktop-nav" style={{ display: 'flex', gap: '44px', listStyle: 'none', alignItems: 'center' }}>
        {links.map(({ label, href, isRoute }) => (
          <li key={label} style={{ position: 'relative' }}>
            {isRoute ? (
              <Link
                to={href}
                onMouseEnter={() => setActiveLink(label)}
                onMouseLeave={() => setActiveLink('')}
                style={{
                  fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase',
                  color: activeLink === label ? textHover : textColor,
                  transition: 'color 0.3s', fontWeight: 500,
                  display: 'block', paddingBottom: '4px',
                }}
              >
                {label}
                <motion.div
                  animate={{ scaleX: activeLink === label ? 1 : 0, opacity: activeLink === label ? 1 : 0 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px',
                    background: scrolled ? 'var(--teal)' : 'var(--teal-light)',
                    transformOrigin: 'left',
                  }}
                />
              </Link>
            ) : (
              <a
                href={href}
                onMouseEnter={() => setActiveLink(label)}
                onMouseLeave={() => setActiveLink('')}
                style={{
                  fontSize: '10px', letterSpacing: '3px', textTransform: 'uppercase',
                  color: activeLink === label ? textHover : textColor,
                  transition: 'color 0.3s', fontWeight: 500,
                  display: 'block', paddingBottom: '4px',
                }}
              >
                {label}
                <motion.div
                  animate={{ scaleX: activeLink === label ? 1 : 0, opacity: activeLink === label ? 1 : 0 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px',
                    background: scrolled ? 'var(--teal)' : 'var(--teal-light)',
                    transformOrigin: 'left',
                  }}
                />
              </a>
            )}
          </li>
        ))}
        <li>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '12px 26px',
              fontSize: '10px',
              letterSpacing: '2.5px',
              textTransform: 'uppercase',
              fontWeight: 600,
              fontFamily: 'Montserrat, sans-serif',
              background: scrolled ? 'var(--teal)' : 'rgba(255,255,255,0.15)',
              color: scrolled ? '#fff' : '#fff',
              border: scrolled ? 'none' : '1px solid rgba(255,255,255,0.3)',
              transition: 'background 0.4s, border-color 0.4s',
              backdropFilter: scrolled ? 'none' : 'blur(8px)',
            }}
          >
            Wholesale
          </motion.a>
        </li>
      </ul>

      {/* Mobile Hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="mobile-menu-btn"
        aria-label="Toggle menu"
        style={{ display: 'none', background: 'none', border: 'none', flexDirection: 'column', gap: '6px', cursor: 'pointer', padding: '4px' }}
      >
        {[0, 1, 2].map(i => (
          <motion.span
            key={i}
            animate={{
              rotate: menuOpen ? (i === 0 ? 45 : i === 2 ? -45 : 0) : 0,
              y: menuOpen ? (i === 0 ? 9 : i === 2 ? -9 : 0) : 0,
              opacity: menuOpen && i === 1 ? 0 : 1,
              width: menuOpen && i === 1 ? '0px' : i === 1 ? '16px' : '22px',
            }}
            style={{
              display: 'block',
              height: '1px',
              background: scrolled ? 'var(--navy)' : '#fff',
              transformOrigin: 'center',
              transition: 'background 0.4s',
            }}
          />
        ))}
      </button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'fixed',
              top: '60px', left: 0, right: 0,
              background: 'rgba(255,255,255,0.98)',
              backdropFilter: 'blur(20px)',
              padding: '32px 24px 40px',
              display: 'flex',
              flexDirection: 'column',
              borderBottom: '1px solid var(--border)',
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(13,30,42,0.1)',
            }}
          >
            {links.map(({ label, href, isRoute }, i) => (
              isRoute ? (
                <Link
                  key={label}
                  to={href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase',
                    color: 'var(--text-dark)', fontWeight: 500,
                    padding: '16px 0', borderBottom: '1px solid var(--border-soft)',
                    display: 'block',
                  }}
                >
                  {label}
                </Link>
              ) : (
                <motion.a
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  style={{
                    fontSize: '11px', letterSpacing: '3px', textTransform: 'uppercase',
                    color: 'var(--text-dark)', fontWeight: 500,
                    padding: '16px 0', borderBottom: '1px solid var(--border-soft)',
                    display: 'block',
                  }}
                >
                  {label}
                </motion.a>
              )
            ))}
            <motion.a
              href="#contact"
              className="btn-primary"
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              style={{ marginTop: '28px', width: 'fit-content', fontSize: '10px' }}
            >
              Request Wholesale
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
        @media (max-width: 540px) {
          nav { padding-left: 24px !important; padding-right: 24px !important; }
        }
      `}</style>
    </motion.nav>
  )
}
