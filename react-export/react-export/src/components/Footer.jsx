import { Link } from 'react-router-dom'

const footerLinks = {
  Collections: ['Soft Touch Lashes', '3D Luxe Lashes', 'Faux Mink — Protein Silk', 'Classic Human Hair', 'Under Lashes'],
  Company:     ['About Us', 'Manufacturing Process', 'Gallery', 'Testimonials'],
  Support:     ['Wholesale Inquiry', 'Sample Request', 'Shipping & Lead Times', 'FAQ'],
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">
            <img src="/logo-light.svg" alt="MCI Eyelashes" />
          </div>
          <p className="footer-tagline">
            Premium wholesale eyelash collections for salons, spas, and distributors worldwide. MOQ 100 pairs. Private label from 500 units.
          </p>
          <div className="footer-contact">
            <a href="mailto:denis@mci-eyelashes.com">denis@mci-eyelashes.com</a>
            <span>·</span>
            <span>Purbalingga, Indonesia</span>
          </div>
        </div>
        <div className="footer-links">
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <div className="footer-link-title">{group}</div>
              {links.map(link => (
                <a key={link} href="/#contact" className="footer-link">{link}</a>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2025 MCI Eyelashes · Purbalingga, Central Java, Indonesia</span>
        <span>Worldwide wholesale · mci-eyelashes.com</span>
      </div>
    </footer>
  )
}
