import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

// ─── CONFIRMED offer data only — do NOT add unconfirmed figures ──────────────
// MOQ:          100 pairs per style (mix & match within an order allowed)
// Sample:       FREE for existing catalog styles — buyer pays shipping
// Lead time:    5 working days for 100-pair orders
//
// UNCONFIRMED — pending factory confirmation (DO NOT DISPLAY):
// • Lead time for 500+ pair orders — tiered, awaiting confirmation
// • Lead time for 1,000+ pair orders — awaiting confirmation
// • Custom sample policy (from buyer's reference photo): likely paid,
//   refundable on first order — awaiting confirmation
// • Custom / private-label packaging lead time — awaiting confirmation
// ─────────────────────────────────────────────────────────────────────────────
const faqs = [
  {
    q: 'What is your minimum order quantity?',
    a: '100 pairs per style. You can mix and match styles within the same order to reach the minimum.',
  },
  {
    q: 'Can I get a sample before placing a full order?',
    a: 'Yes — samples of our existing catalog styles are free. You cover the shipping cost. Reach out via WhatsApp or email to arrange yours.',
  },
  {
    q: 'How long does production take?',
    a: 'For orders of 100 pairs: 5 working days. For larger orders, production time varies — contact us for an exact timeline before you order.',
  },
  {
    q: 'Are you a factory or a reseller?',
    a: 'Direct factory, based in Purbalingga, Indonesia. We welcome live video calls to our production floor — just ask.',
  },
  {
    q: 'Do you offer private label or custom packaging?',
    a: 'Yes — we can customise curl, length, material, and packaging. Send us a WhatsApp message or email to discuss your requirements.',
  },
]

function FAQItem({ faq, index }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      style={{ borderBottom: '1px solid var(--border-soft)' }}
    >
      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        style={{
          width: '100%', background: 'none', border: 'none',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '26px 0', cursor: 'pointer', gap: '24px', textAlign: 'left',
        }}
      >
        <span style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(16px, 1.8vw, 20px)',
          color: open ? 'var(--teal-dark)' : 'var(--text-dark)',
          fontWeight: 400, lineHeight: 1.3,
          transition: 'color 0.3s',
        }}>
          {faq.q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25 }}
          style={{
            flexShrink: 0, width: '28px', height: '28px',
            border: '1px solid',
            borderColor: open ? 'var(--teal)' : 'var(--border-soft)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: open ? 'var(--teal)' : 'var(--text-light)',
            fontSize: '18px', lineHeight: 1,
            transition: 'border-color 0.3s, color 0.3s',
          }}
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <p style={{
              fontSize: '14px', color: 'var(--text-mid)',
              lineHeight: 1.9, paddingBottom: '24px',
              maxWidth: '680px',
            }}>
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  const ref = useRef(null)
  useInView(ref, { once: true, margin: '-80px' })
  const half = Math.ceil(faqs.length / 2)

  return (
    <section id="faq" style={{ background: 'var(--navy-mid)' }} ref={ref}>
      <div className="container">
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: '72px' }}
        >
          <p className="section-label">Common Questions</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px' }}>
            <div>
              <h2 className="section-title">
                Wholesale <span>FAQ</span>
              </h2>
              <p className="section-subtitle">
                Everything you need to know before placing your first order.
              </p>
            </div>
            <motion.a
              href="mailto:denis@mci-eyelashes.com"
              className="btn-outline"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              Ask a Question →
            </motion.a>
          </div>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 80px' }} className="faq-grid">
          <div>
            {faqs.slice(0, half).map((faq, i) => (
              <FAQItem key={i} faq={faq} index={i} />
            ))}
          </div>
          <div>
            {faqs.slice(half).map((faq, i) => (
              <FAQItem key={i} faq={faq} index={i + half} />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .faq-grid { grid-template-columns: 1fr !important; gap: 0 !important; }
        }
      `}</style>
    </section>
  )
}
