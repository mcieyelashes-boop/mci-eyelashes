import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Design Brief',
    description: 'We translate your market, price point, and brand direction into lash styles, fibers, tray formats, and packaging requirements.',
  },
  {
    number: '02',
    title: 'Sample Build',
    description: 'Prototype sets are prepared for approval so you can confirm curl, density, band feel, packaging, and retail presentation before production.',
  },
  {
    number: '03',
    title: 'Precision Production',
    description: 'Approved styles move into controlled manufacturing with batch checks for curl consistency, fiber placement, hygiene, and packaging finish.',
  },
  {
    number: '04',
    title: 'Global Launch',
    description: 'Finished orders are packed, documented, and shipped with tracking so your shelves, salons, or online store can launch on schedule.',
  },
]

export default function Process() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="process" className="process-section">
      <div className="container">
        <motion.div
          ref={ref}
          className="process-header"
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="section-label light">Production Flow</p>
          <h2 className="section-title">
            From Vision To <span className="accent-light">Launch-Ready Lashes</span>
          </h2>
          <p className="section-subtitle">
            A cleaner path from concept to repeatable wholesale supply, built for private-label beauty brands.
          </p>
        </motion.div>

        <div className="process-flow">
          {steps.map((step, i) => (
            <motion.article
              key={step.number}
              className="process-card"
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="process-number">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </motion.article>
          ))}
        </div>

        <motion.div
          className="process-banner"
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <p>Launch a private-label line with <span>one factory-direct team.</span></p>
            <small>Samples, packaging, production, quality checks, and global shipping handled in one workflow.</small>
          </div>
          <a href="#contact" className="btn-primary">Start Your Order</a>
        </motion.div>
      </div>
    </section>
  )
}
