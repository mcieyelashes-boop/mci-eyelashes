import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', country: '', volume: '', message: '' })
  const update = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const tiers = [
    { moq: '100',   label: 'Starter',     desc: 'Perfect for independent salons. Mix & match across all collections.' },
    { moq: '500+',  label: 'Wholesale',   desc: 'Volume pricing, priority processing, and private label eligibility.', featured: true },
    { moq: '1,000+',label: 'Distributor', desc: 'Dedicated account manager, custom packaging, container rates.' },
  ]
  const details = [
    { label: 'Email',     value: 'hello@mci-eyelashes.com' },
    { label: 'Location',  value: 'Purbalingga, Indonesia' },
    { label: 'Response',  value: 'Within 24 hours' },
    { label: 'Languages', value: 'English · Indonesian' },
  ]

  return (
    <section id="contact" className="contact-section" ref={ref}>
      <div className="contact-glow" />
      <div className="container">
        <motion.div style={{ marginBottom: '52px' }} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <p className="section-label">Get In Touch</p>
          <h2 className="section-title">Start Your <span className="accent-light">Wholesale</span> Partnership</h2>
          <p className="section-desc">Our team responds within 24 hours with a full product catalog, wholesale price sheet, and MOQ details tailored to your requirements.</p>
        </motion.div>

        <div className="contact-grid">
          {/* Left */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.1 }}>
            <div className="contact-details">
              {details.map(d => (
                <div key={d.label} className="contact-detail-item">
                  <div className="contact-detail-label">{d.label}</div>
                  <div className="contact-detail-value">{d.value}</div>
                </div>
              ))}
            </div>
            <div className="contact-tiers">
              {tiers.map(t => (
                <div key={t.label} className={`tier-card${t.featured ? ' tier-featured' : ''}`}>
                  <p className="tier-moq" style={{ fontFamily: "'Cormorant Garamond',serif" }}>{t.moq}</p>
                  <p className="tier-label">{t.label}</p>
                  <p className="tier-desc">{t.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.15 }}>
            <div className="contact-form">
              {sent ? (
                <div style={{ textAlign: 'center', padding: '48px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
                  <p style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '54px', color: '#48B8CA', lineHeight: 1 }}>✓</p>
                  <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: '32px', color: '#fff', fontWeight: 400 }}>Inquiry Sent</h3>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,.48)', lineHeight: 1.8, fontWeight: 300, maxWidth: '280px' }}>Thank you! Our team will respond within 24 hours with your personalized wholesale package.</p>
                  <div className="form-success">hello@mci-eyelashes.com</div>
                </div>
              ) : (
                <form onSubmit={e => { e.preventDefault(); setSent(true); }}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>First Name</label>
                      <input value={form.firstName} onChange={update('firstName')} placeholder="Jane" />
                    </div>
                    <div className="form-group">
                      <label>Last Name</label>
                      <input value={form.lastName} onChange={update('lastName')} placeholder="Smith" />
                    </div>
                  </div>
                  <label>Business Email</label>
                  <input type="email" value={form.email} onChange={update('email')} placeholder="jane@salon.com" />
                  <label>Country</label>
                  <input value={form.country} onChange={update('country')} placeholder="United States" />
                  <label>Monthly Volume</label>
                  <select value={form.volume} onChange={update('volume')}>
                    <option value="">Select order range</option>
                    <option>100–300 pairs</option>
                    <option>300–500 pairs</option>
                    <option>500–1,000 pairs</option>
                    <option>1,000+ pairs</option>
                  </select>
                  <label>Message</label>
                  <textarea rows={3} value={form.message} onChange={update('message')} placeholder="Tell us about your wholesale needs..." />
                  <button type="submit" className="btn-submit">Send Inquiry →</button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
