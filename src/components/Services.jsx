import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const IconPrivateLabel = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="8" width="18" height="22" rx="1" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M4 13h18" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M8 18h10M8 22h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    <circle cx="24" cy="10" r="5" fill="var(--navy)" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M21.5 10h5M24 7.5v5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
)

const IconOEM = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="10" stroke="currentColor" strokeWidth="1.2"/>
    <circle cx="16" cy="16" r="4" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M16 6v4M16 22v4M6 16h4M22 16h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M9.17 9.17l2.83 2.83M19.99 19.99l2.83 2.83M22.83 9.17l-2.83 2.83M12.01 19.99l-2.83 2.83" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
)

const IconBulk = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 24h24" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    <rect x="6" y="14" width="8" height="10" rx="0.5" stroke="currentColor" strokeWidth="1.2"/>
    <rect x="18" y="10" width="8" height="14" rx="0.5" stroke="currentColor" strokeWidth="1.2"/>
    <rect x="12" y="17" width="6" height="7" rx="0.5" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M5 8l4-4 4 4M19 6l4-4 4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 8V4M23 6V2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
)

const IconSample = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 5h12v6l3 5v9H7V16l3-5V5z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
    <path d="M7 16h18" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M12 5v6M20 5v6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    <circle cx="16" cy="21" r="2.5" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M16 18.5V16" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
)

const IconPackaging = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 4L28 10v12L16 28 4 22V10L16 4z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round"/>
    <path d="M16 4v24M4 10l12 6 12-6" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M10 7l12 6M22 7L10 13" stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.5"/>
  </svg>
)

const IconExpress = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M16 8v8l5 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M6 6l2 2M26 6l-2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    <path d="M5 16H3M29 16h-2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
)

const services = [
  { id: '01', Icon: IconPrivateLabel, name: 'Private Label', tag: 'Most Popular', desc: 'Your brand on our premium lashes. Custom labels, inserts, and packaging from 500 units. Full artwork support included.', highlights: ['Custom branding', 'From 500 units', 'Artwork support'] },
  { id: '02', Icon: IconOEM, name: 'OEM Manufacturing', tag: 'Custom', desc: 'Bring your own lash design or work with our team to engineer entirely new styles, materials, and specifications.', highlights: ['Custom designs', 'Material sourcing', 'Prototype samples'] },
  { id: '03', Icon: IconBulk, name: 'Bulk Wholesale', tag: 'Ready to Ship', desc: 'Order from 200+ in-stock styles across 5 collections. Mix and match. MOQ 100 pairs. Ships within 5-7 business days.', highlights: ['200+ styles', 'MOQ 100 pairs', '5-7 day shipping'] },
  { id: '04', Icon: IconSample, name: 'Sample Program', tag: 'Try First', desc: 'Test quality before committing to bulk. Curated sample kits available for new wholesale partners with fast turnaround.', highlights: ['Quality assurance', 'Fast turnaround', 'All collections'] },
  { id: '05', Icon: IconPackaging, name: 'Custom Packaging', tag: 'Brand Ready', desc: 'Full packaging design service for branded boxes, trays, inserts, and gift sets. Minimum runs from 1,000 units.', highlights: ['Box and insert design', 'From 1,000 units', 'Gift set options'] },
  { id: '06', Icon: IconExpress, name: 'Express Production', tag: 'Fast Track', desc: 'Rush orders fulfilled in 7-10 business days. Priority manufacturing slot with dedicated quality inspection.', highlights: ['7-10 day lead time', 'Priority slot', 'QC inspection'] },
]

export default function Services() {
  const ref = useRef(null)
  useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="services" className="services-section" ref={ref}>
      <div className="container">
        <motion.div initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="services-header">
          <p className="section-label">Factory Capabilities</p>
          <h2 className="section-title">Everything Your <span className="accent-light">Lash Brand Needs</span></h2>
          <p className="section-subtitle">
            From ready-to-ship wholesale styles to full private-label programs, MCI supports every stage from first sample to repeat production.
          </p>
        </motion.div>

        <motion.div className="services-grid" initial={false} animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}>
          {services.map(s => (
            <motion.div key={s.name} className="service-card" variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } }}>
              <div className="service-icon-wrap"><s.Icon /></div>
              <div className="service-header-row">
                <span className="service-id">{s.id}</span>
                <span className="service-tag">{s.tag}</span>
              </div>
              <h3 className="service-name">{s.name}</h3>
              <p className="service-desc">{s.desc}</p>
              <ul className="service-highlights">
                {s.highlights.map(h => <li key={h}><span className="service-highlight-dot">-</span>{h}</li>)}
              </ul>
              <div className="service-footer">
                <a href="#contact" className="service-cta">Get Quote</a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
