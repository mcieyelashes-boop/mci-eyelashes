// Every link previously pointed to the same "/#contact" href regardless of
// label — clicking "Gallery" or "FAQ" from the footer landed on the contact
// form, not Gallery or FAQ. Each link now goes to its actual section.
// Collections all point to #products (individual product tabs aren't
// URL-addressable — that would need a small feature, not a polish fix).
const footerLinks = {
  Collections: [
    { label: 'Soft Touch Lashes',        href: '/#products' },
    { label: '3D Luxe Lashes',           href: '/#products' },
    { label: 'Faux Mink - Protein Silk', href: '/#products' },
    { label: 'Classic Human Hair',       href: '/#products' },
    { label: 'Under Lashes',             href: '/#products' },
  ],
  Company: [
    { label: 'About Us',              href: '/#about' },
    { label: 'Eyelash Factory Indonesia', href: '/eyelashes-factory-indonesia' },
    { label: 'Manufacturing Process', href: '/#process' },
    { label: 'Gallery',               href: '/#gallery' },
    { label: 'Before You Order',      href: '/#before-you-order' },
  ],
  Support: [
    { label: 'Wholesale Inquiry',     href: '/#contact' },
    { label: 'Sample Request',        href: '/#contact' },
    { label: 'Shipping & Lead Times', href: '/#faq' },
    { label: 'FAQ',                   href: '/#faq' },
  ],
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">
            <img src="/brand-mark.svg" alt="" aria-hidden="true" />
            <span className="footer-logo-text">
              <span className="footer-logo-name">MCI</span>
              <span className="footer-logo-sub">Eyelashes</span>
            </span>
          </div>
          <p className="footer-tagline">
            Factory-direct wholesale eyelash collections for salons, spas, and distributors. MOQ 100 pairs per style. Free samples on catalog styles.
          </p>
          <div className="footer-contact">
            <a href="mailto:denis@mci-eyelashes.com">denis@mci-eyelashes.com</a>
            <span>-</span>
            <span>Purbalingga, Indonesia</span>
          </div>
        </div>
        <div className="footer-links">
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <div className="footer-link-title">{group}</div>
              {links.map(({ label, href }) => (
                <a key={label} href={href} className="footer-link">{label}</a>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="footer-bottom">
        <span>Copyright 2025 MCI Eyelashes - Purbalingga, Central Java, Indonesia</span>
        <span>Worldwide wholesale - mci-eyelashes.com</span>
      </div>
    </footer>
  )
}
