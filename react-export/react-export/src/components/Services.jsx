import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const services = [
  { name: 'Classic Lashes',      tag: 'Natural',       price: 'From $80',  dur: '90 min',  desc: 'One extension per natural lash for a clean, polished look. Perfect for everyday elegance.' },
  { name: 'Volume Lashes',       tag: 'Popular',       price: 'From $120', dur: '120 min', desc: 'Multiple ultra-fine extensions fanned out for a full, dramatic effect that lasts.' },
  { name: 'Hybrid Lashes',       tag: 'Bestseller',    price: 'From $100', dur: '105 min', desc: 'The perfect blend of classic and volume for a textured, wispy appearance.' },
  { name: 'Mega Volume',         tag: 'Glamour',       price: 'From $150', dur: '150 min', desc: 'Maximum drama with the most voluminous fans — bold, striking, unforgettable.' },
  { name: 'Lash Lift & Tint',    tag: 'No Extensions', price: 'From $60',  dur: '60 min',  desc: 'Curl and darken your natural lashes for a mascara-free, low-maintenance look.' },
  { name: 'Infills / Touch Up',  tag: 'Maintenance',   price: 'From $50',  dur: '60 min',  desc: 'Maintain the fullness of your lashes every 2–3 weeks to keep them looking fresh.' },
]

export default function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <section id="services" className="services-section" ref={ref}>
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }} style={{ marginBottom: 0 }}>
          <p className="section-label">What We Offer</p>
          <h2 className="section-title">Our <span className="accent-light">Services</span></h2>
        </motion.div>
        <motion.div
          className="services-grid"
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
        >
          {services.map(s => (
            <motion.div key={s.name} className="service-card" variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } }}>
              <span className="service-tag">{s.tag}</span>
              <h3 className="service-name">{s.name}</h3>
              <p className="service-desc">{s.desc}</p>
              <div className="service-footer">
                <span className="service-price">{s.price}</span>
                <span className="service-duration">{s.dur}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
