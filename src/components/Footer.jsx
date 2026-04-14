import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const footerLinks = {
  Products: ['Mink Lashes', 'Silk Lashes', 'Synthetic Lashes', '3D / 5D Volume', 'Colored Collection', 'Private Label'],
  Company: ['About Us', 'Manufacturing Process', 'Gallery', 'Testimonials', 'Careers'],
  Support: ['Wholesale Inquiry', 'Sample Request', 'Shipping & Lead Times', 'FAQ', 'Returns Policy'],
}

const blogLinks = [
  { label: 'Mink vs Silk Lashes Guide', slug: 'mink-vs-silk-lashes-wholesale-guide' },
  { label: 'How to Start a Lash Business', slug: 'how-to-start-lash-business' },
  { label: 'Private Label OEM Guide', slug: 'private-label-eyelashes-oem-guide' },
  { label: 'Wholesale Pricing Guide', slug: 'wholesale-eyelash-pricing-guide' },
]

const socials = [
  { label: 'IG', href: '#', icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="12" height="12" rx="3.5" stroke="currentColor" strokeWidth="1.2"/><circle cx="8" cy="8" r="2.5" stroke="currentColor" strokeWidth="1.2"/><circle cx="11.5" cy="4.5" r="0.7" fill="currentColor"/></svg> },
  { label: 'TK', href: '#', icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 2c.5 2.5 2 3 4 3v2.5c-1.5 0-3-.5-4-1.5V11a4 4 0 1 1-4-4h.5v2.5H6a1.5 1.5 0 1 0 1.5 1.5V2H10z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"/></svg> },
  { label: 'FB', href: '#', icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2"/><path d="M9 5H7.5C7 5 7 5.5 7 6v1H5.5v2H7v4h2V9h1.5l.5-2H9V6c0-.5 0-1 0-1z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"/></svg> },
]

export default function Footer() {
  return (
    <footer style={{ background: 'var(--navy)', borderTop: '1px solid rgba(72,184,202,0.08)' }}>
      {/* CTA Banner */}
      <div style={{
        background: 'linear-gradient(135deg, var(--teal-dark) 0%, var(--teal) 50%, var(--teal-dark) 100%)',
        padding: '70px 48px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(255,255,255,0.07) 0%, transparent 50%)',
          pointerEvents: 'none',
        }} />

        <p style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(26px, 4vw, 52px)',
          color: '#fff',
          fontWeight: 400, fontStyle: 'italic',
          marginBottom: '10px', position: 'relative',
        }}>
          Ready to elevate your lash business?
        </p>
        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)', letterSpacing: '1px', marginBottom: '36px', position: 'relative' }}>
          Join 500+ beauty businesses that trust MCI Eyelashes
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', position: 'relative' }}>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '16px 40px',
              background: 'var(--navy)',
              color: 'var(--teal-light)',
              fontSize: '11px', letterSpacing: '3px',
              textTransform: 'uppercase', fontWeight: 600,
              fontFamily: 'Montserrat, sans-serif',
            }}
          >
            Request Wholesale
          </motion.a>
          <motion.a
            href="#products"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-flex',
              padding: '16px 40px',
              border: '1px solid rgba(255,255,255,0.35)',
              color: '#fff',
              fontSize: '11px', letterSpacing: '3px',
              textTransform: 'uppercase', fontWeight: 500,
              fontFamily: 'Montserrat, sans-serif',
            }}
          >
            View Products
          </motion.a>
        </div>
      </div>

      {/* Main footer */}
      <div className="container" style={{ padding: '80px 48px 50px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr 1fr', gap: '48px', marginBottom: '60px' }}
          className="footer-grid"
        >
          {/* Brand */}
          <div>
            <div style={{ marginBottom: '24px' }}>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '32px', color: '#fff', letterSpacing: '5px', textTransform: 'uppercase', lineHeight: 1, marginBottom: '4px' }}>
                MCI
              </p>
              <p style={{ fontSize: '9px', letterSpacing: '6px', color: 'var(--teal)', textTransform: 'uppercase' }}>
                Eyelashes
              </p>
            </div>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)', lineHeight: 1.85, maxWidth: '260px', marginBottom: '28px' }}>
              World-class eyelash manufacturer supplying premium products to beauty professionals across 50+ countries since 2015.
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              {socials.map(({ label, href, icon }) => (
                <motion.a
                  key={label} href={href}
                  whileHover={{ scale: 1.1, borderColor: 'var(--teal)', color: 'var(--teal)' }}
                  style={{
                    width: '36px', height: '36px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(255,255,255,0.35)',
                    transition: 'color 0.3s, border-color 0.3s',
                  }}
                >
                  {icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Standard link columns */}
          {Object.entries(footerLinks).map(([title, items]) => (
            <div key={title}>
              <p style={{ fontSize: '10px', letterSpacing: '3px', color: 'var(--teal)', textTransform: 'uppercase', marginBottom: '22px', fontWeight: 500 }}>
                {title}
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '13px' }}>
                {items.map(item => (
                  <li key={item}>
                    <motion.a
                      href="#"
                      whileHover={{ x: 3, color: 'rgba(255,255,255,0.75)' }}
                      style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)', display: 'block', transition: 'color 0.25s' }}
                    >
                      {item}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Blog column */}
          <div>
            <p style={{ fontSize: '10px', letterSpacing: '3px', color: 'var(--teal)', textTransform: 'uppercase', marginBottom: '22px', fontWeight: 500 }}>
              Blog
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '13px' }}>
              {blogLinks.map(({ label, slug }) => (
                <li key={slug}>
                  <Link
                    to={`/blog/${slug}`}
                    style={{ fontSize: '13px', color: 'rgba(255,255,255,0.3)', display: 'block', transition: 'color 0.25s' }}
                    onMouseEnter={e => e.target.style.color = 'rgba(255,255,255,0.75)'}
                    onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.3)'}
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/blog"
                  style={{ fontSize: '11px', color: 'var(--teal)', letterSpacing: '1.5px', textTransform: 'uppercase', display: 'block', marginTop: '4px' }}
                >
                  All Articles →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          paddingTop: '28px',
          borderTop: '1px solid rgba(72,184,202,0.08)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '16px',
        }}>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.18)' }}>
            © {new Date().getFullYear()} MCI Eyelashes. All rights reserved. · www.mci-eyelashes.com
          </p>
          <div style={{ display: 'flex', gap: '28px' }}>
            {['Privacy Policy', 'Terms of Service', 'Shipping Policy'].map(item => (
              <motion.a
                key={item} href="#"
                whileHover={{ color: 'var(--teal)' }}
                style={{ fontSize: '11px', color: 'rgba(255,255,255,0.18)', transition: 'color 0.3s' }}
              >
                {item}
              </motion.a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1000px) { .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 40px !important; } }
        @media (max-width: 540px) { .footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  )
}
