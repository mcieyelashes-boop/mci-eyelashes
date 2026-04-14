import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    q: 'What is the minimum order quantity (MOQ) for wholesale eyelashes?',
    a: 'MOQ starts at 30 units for 3D/5D volume lashes, 50 units for mink, silk, and colored lashes, and 100 units for synthetic lashes. OEM and private label MOQ is negotiable based on packaging complexity.',
  },
  {
    q: 'Does MCI Eyelashes offer private label and OEM services?',
    a: 'Yes. We provide full white-label manufacturing including custom box design, logo printing, lash tray customization, and dedicated account management. Lead time is typically 6–10 weeks from first contact to delivery.',
  },
  {
    q: 'Do you ship internationally?',
    a: 'Yes. MCI Eyelashes ships to 50+ countries worldwide with full tracking and insured international shipping. Standard wholesale orders ship within 3–7 business days of production completion.',
  },
  {
    q: 'Are your lashes cruelty-free and vegan?',
    a: 'Our silk, synthetic, and 3D/5D volume lash lines are 100% vegan and cruelty-free. Mink lashes are sourced through cruelty-free harvesting methods. ISO 9001, CE, and FDA-compliant documentation available for all product lines.',
  },
  {
    q: 'Can I request samples before placing a wholesale order?',
    a: 'Yes. We offer sample kits for qualified wholesale buyers. Contact hello@mci-eyelashes.com with your business details. Sample kits are available for all product lines and are credited toward your first full order.',
  },
  {
    q: 'What certifications do your products carry?',
    a: 'All MCI Eyelashes products are ISO 9001 certified, CE certified, and FDA compliant. PETA-approved cruelty-free certifications are available for applicable product lines. Test reports and MSDS documentation provided upon request.',
  },
  {
    q: 'How do I get wholesale pricing?',
    a: 'Submit an inquiry via the contact form or email hello@mci-eyelashes.com. Our team will respond within 24 hours with a full product catalog, wholesale price sheet, and MOQ details tailored to your requirements.',
  },
  {
    q: 'What is the lead time for custom OEM orders?',
    a: 'Custom OEM and private label orders typically take 6–10 weeks: 1–2 days for inquiry review, 7–14 days for sample production, 7–14 days for packaging design approval, 14–21 days for production, and 5–14 days for shipping depending on destination.',
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
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const half = Math.ceil(faqs.length / 2)

  return (
    <section id="faq" style={{ background: 'var(--off-white)' }} ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
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
              href="mailto:hello@mci-eyelashes.com"
              className="btn-outline"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              Ask a Question →
            </motion.a>
          </div>
        </motion.div>

        {inView && (
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
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .faq-grid { grid-template-columns: 1fr !important; gap: 0 !important; }
        }
      `}</style>
    </section>
  )
}
