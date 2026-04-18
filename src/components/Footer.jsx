import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const footerLinks = {
  Collections: ['Soft Touch Lashes', '3D Luxe Lashes', 'Faux Mink — Protein Silk', 'Classic Human Hair', 'Under Lashes'],
  Company: ['About Us', 'Manufacturing Process', 'Gallery', 'Testimonials'],
  Support: ['Wholesale Inquiry', 'Sample Request', 'Shipping & Lead Times', 'FAQ'],
}

const blogLinks = [
  { label: 'Mink vs Silk Lashes Guide', slug: 'mink-vs-silk-lashes-wholesale-guide' },
  { label: 'How to Start a Lash Business', slug: 'how-to-start-lash-business' },
  { label: 'Private Label OEM Guide', slug: 'private-label-eyelashes-oem-guide' },
  { label: 'Wholesale Pricing Guide', slug: 'wholesale-eyelash-pricing-guide' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">MCI Eyelashes</div>
          <p className="footer-tagline">
            Premium wholesale eyelash collections for salons, spas, and distributors worldwide.
            MOQ 100 pairs. Private label from 500 units.
          </p>
          <div className="footer-contact">
            <a href="mailto:denis@mci-eyelashes.com">denis@mci-eyelashes.com</a>
            <span>·</span>
            <span>Purbalingga, Indonesia</span>
          </div>
        </div>

        <div className="footer-links">
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group} className="footer-link-group">
              <div className="footer-link-title">{group}</div>
              {links.map(link => (
                <a key={link} href="/#contact" className="footer-link">{link}</a>
              ))}
            </div>
          ))}
          <div className="footer-link-group">
            <div className="footer-link-title">Blog</div>
            {blogLinks.map(({ label, slug }) => (
              <Link key={slug} to={`/blog/${slug}`} className="footer-link">{label}</Link>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2025 MCI Eyelashes · Purbalingga, Central Java, Indonesia</span>
        <span>Worldwide wholesale · mci-eyelashes.com</span>
      </div>
    </footer>
  )
}
