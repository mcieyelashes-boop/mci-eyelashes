import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Premium Sourcing',
    description: 'We source exclusively from certified, cruelty-free suppliers. Every raw material undergoes rigorous quality checks before entering our facility.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <circle cx="13" cy="13" r="11" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M7.5 13l4 4 7-8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Expert Crafting',
    description: 'Skilled artisans with 10+ years of experience handcraft each lash set using precision tools and time-tested techniques.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <path d="M4 18L13 5l9 13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7.5 18h11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        <circle cx="13" cy="5" r="1.8" stroke="currentColor" strokeWidth="1.2"/>
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Quality Control',
    description: 'Every batch passes a 7-point inspection: material integrity, curl consistency, length accuracy, hygiene standards, and packaging quality.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <rect x="3.5" y="3.5" width="19" height="19" rx="2.5" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M8.5 13l3.5 3.5 6.5-7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Global Delivery',
    description: 'Fast, reliable worldwide shipping with full tracking. Orders are carefully packaged to arrive in pristine condition, anywhere on the globe.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <circle cx="13" cy="13" r="10.5" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M2.5 13h21M13 2.5c-3.5 3.5-3.5 17 0 21M13 2.5c3.5 3.5 3.5 17 0 21" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
]

export default function Process() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="process" style={{ background: 'var(--off-white)' }}>
      <div className="container">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: '90px', textAlign: 'center' }}
        >
          <p className="section-label" style={{ justifyContent: 'center' }}>How We Work</p>
          <h2 className="section-title" style={{ maxWidth: '600px', margin: '0 auto 16px' }}>
            Our <span>Manufacturing</span> Process
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto', textAlign: 'center' }}>
            From raw materials to your doorstep — every step executed with obsessive attention to detail.
          </p>
        </motion.div>

        {/* Steps */}
        <div style={{ position: 'relative' }}>
          {/* Connecting line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute',
              top: '52px',
              left: '12%', right: '12%',
              height: '1px',
              background: 'linear-gradient(to right, transparent, var(--teal), var(--teal), transparent)',
              opacity: 0.3,
              transformOrigin: 'left',
              pointerEvents: 'none',
            }}
            className="process-line"
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px' }}
            className="process-grid"
          >
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.75, delay: 0.2 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', position: 'relative' }}
              >
                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.08, borderColor: 'var(--teal)' }}
                  transition={{ duration: 0.3 }}
                  style={{
                    width: '64px', height: '64px',
                    border: '1px solid var(--border)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--teal-dark)',
                    marginBottom: '32px',
                    background: 'var(--white)',
                    position: 'relative',
                    zIndex: 1,
                    boxShadow: '0 4px 20px rgba(72,184,202,0.1)',
                    transition: 'border-color 0.3s, box-shadow 0.3s',
                  }}
                >
                  {step.icon}
                  <span style={{
                    position: 'absolute',
                    top: '-8px', right: '-8px',
                    width: '22px', height: '22px',
                    background: 'var(--teal)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '9px',
                    fontWeight: '700',
                    color: '#fff',
                    fontFamily: 'Montserrat, sans-serif',
                  }}>
                    {i + 1}
                  </span>
                </motion.div>

                <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '10px', color: 'rgba(72,184,202,0.4)', letterSpacing: '3px', marginBottom: '10px' }}>
                  {step.number}
                </p>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '26px', color: 'var(--text-dark)', fontWeight: 400, marginBottom: '14px', lineHeight: 1.2 }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-mid)', lineHeight: 1.8 }}>
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{
            marginTop: '100px',
            padding: '60px',
            background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '40px',
            flexWrap: 'wrap',
            borderRadius: '2px',
            boxShadow: '0 20px 80px rgba(13,30,42,0.15)',
          }}
        >
          <div>
            <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(22px, 3vw, 38px)', color: '#fff', fontWeight: 400, marginBottom: '10px' }}>
              ISO-certified facility. <span style={{ color: 'var(--teal-light)', fontStyle: 'italic' }}>Zero compromise</span> on quality.
            </p>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.45)' }}>
              All products meet international safety and quality standards.
            </p>
          </div>
          <motion.a
            href="#contact"
            className="btn-primary"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{ flexShrink: 0 }}
          >
            Start Your Order <span className="btn-arrow">→</span>
          </motion.a>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .process-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .process-line { display: none !important; }
        }
        @media (max-width: 540px) {
          .process-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
