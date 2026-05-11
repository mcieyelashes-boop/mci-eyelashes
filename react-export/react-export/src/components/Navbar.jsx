import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'Products',  href: '/#products' },
  { label: 'Catalogue', href: '/catalogue', isRoute: true },
  { label: 'About',     href: '/#about' },
  { label: 'Blog',      href: '/blog', isRoute: true },
  { label: 'Contact',   href: '/#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location])

  const handleNav = (href) => {
    setMenuOpen(false)
    if (href.startsWith('/#')) {
      const id = href.slice(2)
      setTimeout(() => {
        const el = document.getElementById(id)
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 70
          window.scrollTo({ top, behavior: 'smooth' })
        }
      }, 100)
    }
  }

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        {/* Logo */}
        <Link to="/" className="nav-logo">
          <img src="/logo-light.svg" alt="MCI Eyelashes" />
        </Link>

        {/* Desktop links */}
        <nav className="nav-links">
          {links.map(link => (
            link.isRoute
              ? <Link key={link.label} to={link.href} className="nav-link">{link.label}</Link>
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
                ? <Link key={link.label} to={link.href} className="nav-mobile-link">{link.label}</Link>
                : <button key={link.label} className="nav-mobile-link" onClick={() => handleNav(link.href)}>{link.label}</button>
            ))}
            <button className="nav-mobile-cta" onClick={() => handleNav('/#contact')}>Request Wholesale</button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
