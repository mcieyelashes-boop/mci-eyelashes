import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'Products',  href: '/#products' },
  { label: 'Gallery',   href: '/#gallery' },
  { label: 'Catalogue', href: '/catalogue', isRoute: true },
  { label: 'Contact',   href: '/#contact' },
]

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false)
  const [menuOpen,   setMenuOpen]   = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const id = location.hash.slice(1)
      setTimeout(() => {
        const el = document.getElementById(id)
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 70
          window.scrollTo({ top, behavior: 'smooth' })
        }
      }, 80)
    }
  }, [location.pathname, location.hash])

  const handleNav = (href) => {
    setMenuOpen(false)
    if (href.startsWith('/#')) {
      const id = href.slice(2)
      if (location.pathname !== '/') {
        navigate(`/#${id}`)
        return
      }
      const el = document.getElementById(id)
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 70
        window.scrollTo({ top, behavior: 'smooth' })
      }
    }
  }

  return (
    <motion.header
      className={`navbar ${scrolled ? 'scrolled' : ''} ${isHome ? 'navbar--home' : ''}`}
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="nav-inner">
        {/* Logo */}
        <Link to="/" className="nav-logo">
          <img src="/brand-mark.svg" alt="" aria-hidden="true" />
          <span className="nav-logo-text">
            <span className="nav-logo-name">MCI</span>
            <span className="nav-logo-sub">Eyelashes</span>
          </span>
        </Link>

        {/* Desktop links */}
        <nav className="nav-links">
          {links.map(link => (
            link.isRoute
              ? <Link key={link.label} to={link.href} className="nav-link" onClick={() => setMenuOpen(false)}>{link.label}</Link>
              : <button key={link.label} className="nav-link" onClick={() => handleNav(link.href)}>{link.label}</button>
          ))}
        </nav>

        <button className="nav-cta" onClick={() => handleNav('/#contact')}>Request Wholesale</button>

        {/* Hamburger */}
        <button className="nav-hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <span className={`ham-line ${menuOpen ? 'open' : ''}`} />
          <span className={`ham-line ${menuOpen ? 'open' : ''}`} />
          <span className={`ham-line ${menuOpen ? 'open' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="nav-mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {links.map(link => (
              link.isRoute
                ? <Link key={link.label} to={link.href} className="nav-mobile-link" onClick={() => setMenuOpen(false)}>{link.label}</Link>
                : <button key={link.label} className="nav-mobile-link" onClick={() => handleNav(link.href)}>{link.label}</button>
            ))}
            <button className="nav-mobile-cta" onClick={() => handleNav('/#contact')}>Request Wholesale</button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
