import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { HOME_META } from '../utils/setMeta'

export default function NotFound() {
  const { pathname } = useLocation()

  // Update document title
  useEffect(() => {
    const robots = document.querySelector('meta[name="robots"]')
    const previousRobots = robots?.getAttribute('content')
    document.title = '404 - Page Not Found | MCI Eyelashes'
    robots?.setAttribute('content', 'noindex, nofollow')
    return () => {
      document.title = HOME_META.title
      if (robots && previousRobots) robots.setAttribute('content', previousRobots)
    }
  }, [])

  return (
    <main className="notfound">
      <div className="container container--narrow">
        <p className="notfound-num" aria-hidden="true">404</p>
        <p className="eyebrow">Page Not Found</p>
        <h1>This page doesn't exist</h1>
        <p className="lede">
          The URL <code>{pathname}</code> could not be found. It may have moved, been deleted, or never existed.
        </p>

        <div className="btn-row">
          <Link to="/" className="btn">Back to Home</Link>
          <Link to="/#contact" className="btn-ghost">Contact Us</Link>
        </div>

        <nav className="notfound-links" aria-label="Quick links">
          {[
            { label: 'Collections', href: '/#products' },
            { label: 'Catalogue', href: '/catalogue' },
            { label: 'Blog', href: '/blog' },
            { label: 'Contact', href: '/#contact' },
          ].map(({ label, href }) => (
            <Link key={label} to={href} className="text-link">{label}</Link>
          ))}
        </nav>
      </div>
    </main>
  )
}
