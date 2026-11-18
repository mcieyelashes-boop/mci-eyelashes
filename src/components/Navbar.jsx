import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const links = [
  { label: 'Collections', href: '/#products' },
  { label: 'About',       href: '/#about' },
  { label: 'Catalogue',   href: '/catalogue', isRoute: true },
  { label: 'Guides',      href: '/blog', isRoute: true },
  { label: 'Contact',     href: '/#contact' },
]

const NAV_OFFSET = 70

function scrollToId(id) {
  const el = document.getElementById(id)
  if (!el) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET
  window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' })
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // The phone menu is a native popover: the browser opens it from the button,
  // closes it on Escape or a tap outside, and returns focus. This only mirrors
  // its state so the header can style itself while it is open.
  useEffect(() => {
    const menu = menuRef.current
    if (!menu) return
    const onToggle = (e) => setMenuOpen(e.newState === 'open')
    menu.addEventListener('toggle', onToggle)
    return () => menu.removeEventListener('toggle', onToggle)
  }, [])

  const closeMenu = () => {
    const menu = menuRef.current
    if (menu?.matches?.(':is(:popover-open, .\\:popover-open)')) menu.hidePopover()
  }

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
    closeMenu()
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
        to={link.href}
        className={className}
        aria-current={location.pathname.startsWith(link.href) ? 'page' : undefined}
        onClick={closeMenu}
      >
        {link.label}
      </Link>
    ) : (
      <a href={link.href} className={className} onClick={(e) => handleHash(e, link.href)}>
        {link.label}
      </a>
    )

  return (
    <header className={`navbar${scrolled ? ' scrolled' : ''}${menuOpen ? ' menu-open' : ''}`}>
      {/* Every page puts id="content" and tabIndex={-1} on its <h1>. Targeting the
          heading rather than <main> keeps the focus start point at the top of the content. */}
      <a href="#content" className="skip-link visually-hidden">Skip to main content</a>

      <div className="nav-inner">
        {/* The owner's gold monogram with no wordmark beside it. logo-mci-192.webp is
            the owner's public/logo-mci.png scaled down, with the grey checkerboard that
            was baked into that file removed (owner approved the correction). */}
        <Link to="/" className="nav-logo" aria-label="MCI Eyelashes home" onClick={closeMenu}>
          <img src="/logo-mci-192.webp" alt="MCI Eyelashes" width="192" height="196" />
        </Link>

        <nav className="nav-links" aria-label="Primary">
          <ul role="list">
            {links.map((link) => <li key={link.label}>{renderLink(link, 'nav-link')}</li>)}
          </ul>
        </nav>

        <a href="/#contact" className="btn btn--sm nav-cta" onClick={(e) => handleHash(e, '/#contact')}>
          Request Wholesale
        </a>

        {/* Shown below 860px instead of the inline links. The popover lists the
            same five links, so only one of the two navigations is visible at a time. */}
        <button
          type="button"
          className="nav-menu-button"
          popoverTarget="site-menu"
          aria-controls="site-menu"
        >
          <span className="ham" aria-hidden="true">
            <span className="ham-line" />
            <span className="ham-line" />
            <span className="ham-line" />
          </span>
          <span>Menu</span>
        </button>
      </div>

      <nav id="site-menu" ref={menuRef} className="nav-mobile-menu" popover="auto" aria-label="Menu">
        <ul role="list">
          {links.map((link) => <li key={link.label}>{renderLink(link, 'nav-mobile-link')}</li>)}
        </ul>
        <a href="/#contact" className="btn" onClick={(e) => handleHash(e, '/#contact')}>
          Request Wholesale
        </a>
      </nav>
    </header>
  )
}
