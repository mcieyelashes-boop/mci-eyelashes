import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// Owner-confirmed claims only. Partner counts, country counts, and units-shipped
// figures were fabricated and have been removed — do not reintroduce them.
const values = [
  { title: 'Factory Direct', desc: 'You buy straight from our production floor in Purbalingga, Indonesia. No trading company in between.' },
  { title: 'Material Choice', desc: 'Korean synthetic fiber, protein silk, and sterilized human hair — you pick what fits your market.' },
  { title: 'Low-Risk Start', desc: 'Begin at 100 pairs per style, mix and match styles, then scale as your orders grow.' },
  { title: 'Open Door', desc: 'Ask for a live video call and we will show you the floor while your order is being made.' },
]
// Certification claims (ISO 9001, CE, FDA, PETA) removed pending proof of the
// actual certificates. Do not re-add any of them until the owner supplies
// scanned documents — false compliance claims carry legal risk in export
// markets, unlike ordinary marketing copy.
const certifications = []

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
                <p style={{ fontSize: '10px', letterSpacing: '5px', color: 'rgba(72,184,202,.28)', textTransform: 'uppercase', fontFamily: "'Bricolage Grotesque',sans-serif" }}>Est. 2015</p>
              </div>
              {certifications.length > 0 && (
                <div className="about-certs">
                  <p style={{ fontSize: '9px', letterSpacing: '2px', color: '#48B8CA', textTransform: 'uppercase', marginBottom: '8px', opacity: .65, fontFamily: "'Bricolage Grotesque',sans-serif" }}>Certifications</p>
                  <div>{certifications.map(c => <span key={c} className="cert-tag">{c}</span>)}</div>
                </div>
              )}
            </div>
          </motion.div>

          <motion.div initial={false} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}>
            <p className="section-label light">Manufacturing Identity</p>
            <h2 className="section-title">Beauty Supply With <span className="accent-light">Future Discipline</span></h2>
            <p className="section-subtitle" style={{ marginBottom: '16px' }}>MCI Eyelashes helps salons, distributors, and founders build lash products that feel premium from first sample to final packaging.</p>
            <p className="section-subtitle" style={{ marginBottom: '44px' }}>We produce in-house in Purbalingga, Indonesia — so you get factory-direct pricing, OEM flexibility, and the option to watch your order being made.</p>
            <div className="values-grid">
              {values.map(({ title, desc }, i) => (
                <motion.div key={title} className="value-item" initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}>
                  <p className="value-title">{title}</p>
                  <p className="value-desc">{desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
