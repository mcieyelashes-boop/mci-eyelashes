import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const links = [
  { label: 'Collections', href: '/#products' },
  { label: 'Factory',     href: '/#about' },
  { label: 'Catalogue',   href: '/catalogue', isRoute: true },
  { label: 'Guides',      href: '/blog', isRoute: true },
  { label: 'Contact',     href: '/#contact' },
]

const NAV_OFFSET = 70

function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET
  window.scrollTo({ top, behavior: 'smooth' })
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Arriving on the home page with a hash (from another page) scrolls to it.
  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const id = location.hash.slice(1)
      const t = setTimeout(() => scrollToId(id), 80)
      return () => clearTimeout(t)
    }
  }, [location.pathname, location.hash])

  const handleHash = (e, href) => {
    e.preventDefault()
    setMenuOpen(false)
    const id = href.slice(2)
    if (location.pathname !== '/') {
      navigate(`/#${id}`)
      return
    }
    scrollToId(id)
  }

  const renderLink = (link, className) =>
    link.isRoute ? (
      <Link
        key={link.label}
        to={link.href}
        className={className}
        aria-current={location.pathname.startsWith(link.href) ? 'page' : undefined}
        onClick={() => setMenuOpen(false)}
      >
        {link.label}
      </Link>
    ) : (
      <a key={link.label} href={link.href} className={className} onClick={(e) => handleHash(e, link.href)}>
        {link.label}
      </a>
    )

  return (
    <header className={`navbar${scrolled ? ' scrolled' : ''}${menuOpen ? ' menu-open' : ''}`}>
      <div className="nav-inner">
        {/* The owner's gold monogram, used exactly as supplied, with no wordmark beside it. */}
        <Link to="/" className="nav-logo" aria-label="MCI Eyelashes home" onClick={() => setMenuOpen(false)}>
          <img src="/logo-mci.png" alt="MCI Eyelashes" width="422" height="430" />
        </Link>

        <nav className="nav-links" aria-label="Main">
          {links.map((link) => renderLink(link, 'nav-link'))}
        </nav>

        <a href="/#contact" className="btn btn--sm nav-cta" onClick={(e) => handleHash(e, '/#contact')}>
          Request Wholesale
        </a>

        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span className="ham-line" />
          <span className="ham-line" />
          <span className="ham-line" />
        </button>
      </div>

      {menuOpen && (
        <nav className="nav-mobile-menu" aria-label="Mobile">
          {links.map((link) => renderLink(link, 'nav-mobile-link'))}
          <a href="/#contact" className="btn" onClick={(e) => handleHash(e, '/#contact')}>
            Request Wholesale
          </a>
        </nav>
      )}
    </header>
  )
}
