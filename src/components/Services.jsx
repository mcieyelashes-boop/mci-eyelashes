import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const services = [
  {
    id: '01',
    name: 'Private Label',
    tag: 'Most Popular',
    desc: 'Your brand on our premium lashes. Custom labels, inserts, and packaging from 500 units. Full artwork support included.',
    highlights: ['Custom branding', 'From 500 units', 'Artwork support'],
  },
  {
    id: '02',
    name: 'OEM Manufacturing',
    tag: 'Custom',
    desc: 'Bring your own lash design or work with our team to engineer entirely new styles, materials, and specifications.',
    highlights: ['Custom designs', 'Material sourcing', 'Prototype samples'],
  },
  {
    id: '03',
    name: 'Bulk Wholesale',
    tag: 'Ready to Ship',
    desc: 'Order from 200+ in-stock styles across 5 collections. Mix and match. MOQ 100 pairs. Ships within 5–7 business days.',
    highlights: ['200+ styles', 'MOQ 100 pairs', '5–7 day shipping'],
  },
  {
    id: '04',
    name: 'Sample Program',
    tag: 'Try First',
    desc: 'Test quality before committing to bulk. Curated sample kits available for new wholesale partners with fast turnaround.',
    highlights: ['Quality assurance', 'Fast turnaround', 'All collections'],
  },
  {
    id: '05',
    name: 'Custom Packaging',
    tag: 'Brand Ready',
    desc: 'Full packaging design service — branded boxes, trays, inserts, and gift sets. Minimum runs from 1,000 units.',
    highlights: ['Box & insert design', 'From 1,000 units', 'Gift set options'],
  },
  {
    id: '06',
    name: 'Express Production',
    tag: 'Fast Track',
    desc: 'Rush orders fulfilled in 7–10 business days. Priority manufacturing slot with dedicated quality inspection.',
    highlights: ['7–10 day lead time', 'Priority slot', 'QC inspection'],
  },
]

export default function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="services" className="services-section" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: 0 }}
        >
          <p className="section-label">What We Offer</p>
          <h2 className="section-title">Wholesale <span className="accent-light">Services</span></h2>
          <p className="section-subtitle" style={{ marginBottom: 0 }}>
            From ready-to-ship bulk orders to full private label programs — we support every stage of your beauty business.
          </p>
        </motion.div>

        <motion.div
          className="services-grid"
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
        >
          {services.map(s => (
            <motion.div
              key={s.name}
              className="service-card"
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '13px', color: 'rgba(72,184,202,.35)', letterSpacing: '2px' }}>{s.id}</span>
                <span className="service-tag">{s.tag}</span>
              </div>
              <h3 className="service-name">{s.name}</h3>
              <p className="service-desc">{s.desc}</p>
              <ul className="service-highlights">
                {s.highlights.map(h => (
                  <li key={h}><span className="service-highlight-dot">—</span>{h}</li>
                ))}
              </ul>
              <div className="service-footer">
                <a href="#contact" className="service-cta">Get Quote →</a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
