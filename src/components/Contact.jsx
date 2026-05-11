import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const tiers = [
  { moq: '100',    label: 'Starter',     desc: 'Perfect for independent salons. Mix & match across all collections.' },
  { moq: '500+',   label: 'Wholesale',   desc: 'Volume pricing, priority processing, and private label eligibility.', featured: true },
  { moq: '1,000+', label: 'Distributor', desc: 'Dedicated account manager, custom packaging, container rates.' },
]

const details = [
  { label: 'Email',     value: 'denis@mci-eyelashes.com', href: 'mailto:denis@mci-eyelashes.com' },
  { label: 'WhatsApp',  value: '+62 · Chat Now',          href: 'https://wa.me/6285743531798' },
  { label: 'Location',  value: 'Purbalingga, Indonesia' },
  { label: 'Response',  value: 'Within 24 hours' },
]

const VOLUMES = [
  '100–300 pairs',
  '300–500 pairs',
  '500–1,000 pairs',
  '1,000+ pairs',
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [sent, setSent]   = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '',
    company: '', country: '', volume: '', message: '',
  })

  const update = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    // Simulate network delay, then mark sent
    await new Promise(r => setTimeout(r, 900))
    setLoading(false)
    setSent(true)
  }

  return (
    <section id="contact" className="contact-section" ref={ref}>
      <div className="contact-glow" />
      <div className="contact-glow-2" />
      <div className="container">
        <motion.div
          style={{ marginBottom: '52px' }}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label">Get In Touch</p>
          <h2 className="section-title">Start Your <span className="accent-light">Wholesale</span> Partnership</h2>
          <p className="section-subtitle">
            Our team responds within 24 hours with a full product catalog, wholesale
            price sheet, and MOQ details tailored to your requirements.
          </p>
        </motion.div>

        <div className="contact-grid">

          {/* ── Left column ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            {/* Contact details */}
            <div className="contact-details">
              {details.map(d => (
                <div key={d.label} className="contact-detail-item">
                  <div className="contact-detail-label">{d.label}</div>
                  {d.href
                    ? <a href={d.href} className="contact-detail-value contact-detail-link" target={d.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">{d.value}</a>
                    : <div className="contact-detail-value">{d.value}</div>
                  }
                </div>
              ))}
            </div>

            {/* MOQ tiers */}
            <div className="contact-tiers">
              {tiers.map(t => (
                <div key={t.label} className={`tier-card${t.featured ? ' tier-featured' : ''}`}>
                  <p className="tier-moq" style={{ fontFamily: "'Cormorant Garamond',serif" }}>{t.moq}</p>
                  <p className="tier-label">{t.label}</p>
                  <p className="tier-desc">{t.desc}</p>
                </div>
              ))}
            </div>

            {/* Certifications strip */}
            <div className="contact-certs">
              {['ISO 9001', 'CE Certified', 'FDA Compliant', 'Cruelty Free'].map(c => (
                <span key={c} className="contact-cert-pill">{c}</span>
              ))}
            </div>
          </motion.div>

          {/* ── Form column ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <div className="contact-form">

              {sent ? (
                /* ── Success state ── */
                <motion.div
                  className="form-success-state"
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="form-success-check">✓</div>
                  <h3 className="form-success-title">Inquiry Sent</h3>
                  <p className="form-success-desc">
                    Thank you! Our team will respond within 24 hours with your
                    personalized wholesale package.
                  </p>
                  <div className="form-success-email">denis@mci-eyelashes.com</div>
                  <button className="btn-outline form-reset-btn" onClick={() => { setSent(false); setForm({ firstName:'', lastName:'', email:'', company:'', country:'', volume:'', message:'' }) }}>
                    Send Another Inquiry
                  </button>
                </motion.div>

              ) : (
                /* ── Form ── */
                <form onSubmit={handleSubmit} noValidate>
                  <div className="form-row">
                    <div className="form-group">
                      <label>First Name <span className="form-required">*</span></label>
                      <input required value={form.firstName} onChange={update('firstName')} placeholder="Jane" />
                    </div>
                    <div className="form-group">
                      <label>Last Name <span className="form-required">*</span></label>
                      <input required value={form.lastName} onChange={update('lastName')} placeholder="Smith" />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Business Email <span className="form-required">*</span></label>
                    <input required type="email" value={form.email} onChange={update('email')} placeholder="jane@salon.com" />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Company / Brand</label>
                      <input value={form.company} onChange={update('company')} placeholder="Glam Beauty Co." />
                    </div>
                    <div className="form-group">
                      <label>Country <span className="form-required">*</span></label>
                      <input required value={form.country} onChange={update('country')} placeholder="United States" />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Monthly Volume</label>
                    <select value={form.volume} onChange={update('volume')}>
                      <option value="">Select order range</option>
                      {VOLUMES.map(v => <option key={v}>{v}</option>)}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Message</label>
                    <textarea rows={4} value={form.message} onChange={update('message')} placeholder="Tell us about your wholesale needs — product types, target market, or any custom requirements..." />
                  </div>

                  <button type="submit" className="btn-submit" disabled={loading}>
                    {loading
                      ? <span className="btn-submit-spinner" />
                      : 'Send Inquiry →'
                    }
                  </button>

                  <p className="form-privacy">
                    🔒 Your information is kept private and never shared with third parties.
                  </p>
                </form>
              )}

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
