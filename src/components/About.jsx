import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

function AnimatedCounter({ target, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  useEffect(() => {
    if (!inView) return
    const start = Date.now()
    const timer = setInterval(() => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(ease * target))
      if (progress >= 1) clearInterval(timer)
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target, duration])
  return <span ref={ref}>{count}{suffix}</span>
}

const values = [
  { title: 'Precision Craft', desc: 'Every lash inspected by artisans with 10+ years of experience.' },
  { title: 'Premium Materials', desc: 'Only certified, cruelty-free fibers from trusted global suppliers.' },
  { title: 'Scalable Supply', desc: 'From boutique orders to full container loads, we scale with you.' },
  { title: 'Global Reach', desc: 'Insured international shipping to 50+ countries with full tracking.' },
]
const certifications = ['ISO 9001', 'CE Certified', 'Cruelty-Free', 'FDA Compliant', 'PETA Approved']

export default function About() {
  const ref = useRef(null)
  useInView(ref, { once: true, margin: '-80px' })
  return (
    <section id="about" className="about-section" ref={ref}>
      <div className="about-glow" style={{ width: '600px', height: '600px', top: '-200px', right: '-180px' }} />
      <div className="about-glow" style={{ width: '380px', height: '380px', bottom: '-140px', left: '-120px' }} />
      <div className="container">
        <div className="about-grid">
          <motion.div initial={false} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} style={{ position: 'relative' }}>
            <div className="about-visual">
              <div className="about-center">
                <motion.p className="about-mci-bg" animate={{ opacity: [0.06, 0.12, 0.06] }} transition={{ duration: 4, repeat: Infinity }}>MCI</motion.p>
                <div style={{ width: '56px', height: '1px', background: 'rgba(72,184,202,.18)' }} />
                <p style={{ fontSize: '10px', letterSpacing: '5px', color: 'rgba(72,184,202,.28)', textTransform: 'uppercase', fontFamily: "'Montserrat',sans-serif" }}>Est. 2015</p>
              </div>
              <div className="about-certs">
                <p style={{ fontSize: '9px', letterSpacing: '2px', color: '#48B8CA', textTransform: 'uppercase', marginBottom: '8px', opacity: .65, fontFamily: "'Montserrat',sans-serif" }}>Certifications</p>
                <div>{certifications.map(c => <span key={c} className="cert-tag">{c}</span>)}</div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={false} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}>
            <p className="section-label light">Manufacturing Identity</p>
            <h2 className="section-title">Beauty Supply With <span className="accent-light">Future Discipline</span></h2>
            <p className="section-subtitle" style={{ marginBottom: '16px' }}>MCI Eyelashes helps salons, distributors, and founders build lash products that feel premium from first sample to final packaging.</p>
            <p className="section-subtitle" style={{ marginBottom: '44px' }}>Today we support 500+ beauty partners across 50+ countries with repeatable quality, OEM flexibility, and factory-direct pricing.</p>
            <div className="values-grid">
              {values.map(({ title, desc }, i) => (
                <motion.div key={title} className="value-item" initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}>
                  <p className="value-title">{title}</p>
                  <p className="value-desc">{desc}</p>
                </motion.div>
              ))}
            </div>
            <div className="about-stats-grid">
              {[{ target: 500, suffix: '+', label: 'Global Partners' }, { target: 50, suffix: '+', label: 'Countries' }, { target: 10, suffix: 'M+', label: 'Units Shipped' }].map(({ target, suffix, label }) => (
                <div key={label}>
                  <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '40px', color: '#48B8CA', fontWeight: 300, lineHeight: 1, marginBottom: '5px' }}>
                    <AnimatedCounter target={target} suffix={suffix} />
                  </p>
                  <p className="about-stat-lbl" style={{ fontSize: '10px', letterSpacing: '2px', color: 'rgba(255,255,255,.28)', textTransform: 'uppercase' }}>{label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
