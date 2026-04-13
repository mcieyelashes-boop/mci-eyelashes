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
  { title: 'Precision Craft', desc: 'Every lash placed and inspected by artisans with 10+ years of experience.' },
  { title: 'Premium Materials', desc: 'Only certified, cruelty-free fibers from trusted global suppliers.' },
  { title: 'Scalable Supply', desc: 'From boutique orders to full container loads — we scale with you.' },
  { title: 'Global Reach', desc: 'Insured international shipping to 50+ countries with full tracking.' },
]

const certifications = ['ISO 9001', 'CE Certified', 'Cruelty-Free', 'FDA Compliant', 'PETA Approved']

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" style={{ background: 'var(--navy)', position: 'relative', overflow: 'hidden' }} ref={ref}>
      {/* Background glow */}
      <div style={{
        position: 'absolute', top: '-200px', right: '-200px',
        width: '600px', height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(72,184,202,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-150px', left: '-150px',
        width: '400px', height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(72,184,202,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '100px', alignItems: 'center' }}
          className="about-grid"
        >
          {/* Left — Visual */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'relative' }}
          >
            <div style={{
              width: '100%',
              aspectRatio: '3/4',
              background: 'linear-gradient(145deg, rgba(72,184,202,0.12) 0%, rgba(45,151,169,0.08) 50%, rgba(13,30,42,0.5) 100%)',
              border: '1px solid rgba(72,184,202,0.15)',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Corner brackets */}
              {[
                { top: '20px', left: '20px', borderTop: '1px solid', borderLeft: '1px solid' },
                { top: '20px', right: '20px', borderTop: '1px solid', borderRight: '1px solid' },
                { bottom: '20px', left: '20px', borderBottom: '1px solid', borderLeft: '1px solid' },
                { bottom: '20px', right: '20px', borderBottom: '1px solid', borderRight: '1px solid' },
              ].map((style, i) => (
                <div key={i} style={{ position: 'absolute', width: '40px', height: '40px', borderColor: 'rgba(72,184,202,0.3)', ...style }} />
              ))}

              {/* Center brand */}
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
                <motion.p
                  animate={{ opacity: [0.06, 0.12, 0.06] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '100px', color: 'var(--teal)', fontStyle: 'italic', lineHeight: 1, letterSpacing: '8px' }}
                >
                  MCI
                </motion.p>
                <div style={{ width: '80px', height: '1px', background: 'rgba(72,184,202,0.2)' }} />
                <p style={{ fontSize: '10px', letterSpacing: '5px', color: 'rgba(72,184,202,0.35)', textTransform: 'uppercase' }}>
                  Est. 2015
                </p>
              </div>

              {/* Certifications */}
              <div style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                background: 'rgba(13,30,42,0.85)',
                padding: '16px 20px',
                borderTop: '1px solid rgba(72,184,202,0.1)',
              }}>
                <p style={{ fontSize: '9px', letterSpacing: '2px', color: 'var(--teal)', textTransform: 'uppercase', marginBottom: '10px', opacity: 0.7 }}>
                  Certifications
                </p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {certifications.map(cert => (
                    <span key={cert} style={{
                      fontSize: '9px', color: 'rgba(255,255,255,0.4)',
                      border: '1px solid rgba(255,255,255,0.08)', padding: '4px 10px', letterSpacing: '1px',
                    }}>
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute', top: '30px', right: '-30px',
                background: 'var(--teal)',
                color: '#fff',
                padding: '20px',
                width: '100px', height: '100px',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '2px',
                boxShadow: '0 12px 40px rgba(72,184,202,0.35)',
              }}
            >
              <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '32px', fontWeight: 500, lineHeight: 1 }}>5★</span>
              <span style={{ fontSize: '7px', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 700 }}>Rated</span>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
              style={{
                position: 'absolute', bottom: '80px', left: '-24px',
                background: 'var(--navy-light)',
                border: '1px solid rgba(72,184,202,0.2)',
                padding: '20px 24px',
                boxShadow: '0 8px 30px rgba(13,30,42,0.4)',
              }}
            >
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '32px', color: 'var(--teal)', lineHeight: 1, marginBottom: '4px' }}>10+</p>
              <p style={{ fontSize: '9px', letterSpacing: '2px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>
                Years in Business
              </p>
            </motion.div>
          </motion.div>

          {/* Right — Text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.95, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="section-label section-label--light">Our Story</p>
            <h2 className="section-title section-title--light">
              Built on <span style={{ color: 'var(--teal-light)', fontStyle: 'italic' }}>Passion</span><br />& Precision
            </h2>

            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.95, marginBottom: '18px' }}>
              Founded in 2015, MCI Eyelashes began with a single mission: to manufacture the world's finest eyelashes and make them accessible to beauty professionals everywhere.
            </p>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: 1.95, marginBottom: '48px' }}>
              Today we supply over 500 salons, distributors, and beauty brands across 50+ countries. Our state-of-the-art facility combines traditional craftsmanship with modern quality control to deliver products that exceed industry standards.
            </p>

            {/* Values */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '50px' }}>
              {values.map(({ title, desc }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.35 + i * 0.1 }}
                  style={{ borderLeft: '2px solid rgba(72,184,202,0.4)', paddingLeft: '16px' }}
                >
                  <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '20px', color: '#fff', fontWeight: 400, marginBottom: '6px' }}>
                    {title}
                  </p>
                  <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', lineHeight: 1.7 }}>{desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Counters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.7 }}
              style={{
                display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px',
                paddingTop: '36px', borderTop: '1px solid rgba(72,184,202,0.12)',
              }}
            >
              {[
                { target: 500, suffix: '+', label: 'Global Partners' },
                { target: 50, suffix: '+', label: 'Countries' },
                { target: 10, suffix: 'M+', label: 'Units Shipped' },
              ].map(({ target, suffix, label }) => (
                <div key={label}>
                  <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '40px', color: 'var(--teal)', fontWeight: 300, lineHeight: 1, marginBottom: '6px' }}>
                    <AnimatedCounter target={target} suffix={suffix} />
                  </p>
                  <p style={{ fontSize: '10px', letterSpacing: '2px', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase' }}>
                    {label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 60px !important; }
        }
      `}</style>
    </section>
  )
}
