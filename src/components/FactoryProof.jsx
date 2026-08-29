import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// ─── Owner-confirmed facts ONLY ──────────────────────────────────────────────
// This section replaced a block of fabricated testimonials (invented names,
// locations, and results like "+40% reorder rate"). Do not reintroduce social
// proof here until the owner supplies real, attributable customer quotes.
//
// Confirmed and safe to state:
//   • Direct factory in Purbalingga, Indonesia — not a trading company
//   • Live video call to the production floor available on request
//   • Free samples on existing catalog styles; buyer covers shipping
//   • MOQ 100 pairs per style, mix and match allowed
//   • 5 working days production on 100-pair orders
// ─────────────────────────────────────────────────────────────────────────────

const proofs = [
  {
    title: 'See the Production Floor',
    desc: 'Book a live video call and we walk you through the factory in Purbalingga, Indonesia, while you watch.',
  },
  {
    title: 'Test Before You Buy',
    desc: 'Samples of any existing catalog style are free. You only cover the shipping.',
  },
  {
    title: 'Start Small',
    desc: 'Minimum order is 100 pairs per style, and you can mix and match styles to reach it.',
  },
  {
    title: 'Know Your Timeline',
    desc: 'A 100-pair order goes into production and ships in 5 working days.',
  },
]

const stats = [
  { num: '100',  label: 'Pairs Minimum' },
  { num: '5',    label: 'Days Production' },
  { num: 'Free', label: 'Catalog Samples' },
  { num: '0',    label: 'Middlemen' },
]

export default function FactoryProof() {
  const ref = useRef(null)
  useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="before-you-order" ref={ref} className="testimonials-section">
      <div className="container">
        <motion.div initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="section-label light">Before You Order</p>
          <h2 className="section-title">
            Check Us Before You <span className="accent-light">Commit</span>
          </h2>
          <p className="section-subtitle" style={{ marginBottom: '44px' }}>
            We are a factory, not a trading company. Here is how to verify that yourself — before you spend anything.
          </p>
        </motion.div>

        <div className="values-grid">
          {proofs.map(({ title, desc }, i) => (
            <motion.div
              key={title}
              className="value-item"
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }}
            >
              <p className="value-title">{title}</p>
              <p className="value-desc">{desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="t-stats-row">
          {stats.map(({ num, label }) => (
            <div key={label} className="t-stat">
              <p className="t-stat-num" style={{ fontFamily: "'Cormorant Garamond',serif" }}>{num}</p>
              <p className="t-stat-label">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
