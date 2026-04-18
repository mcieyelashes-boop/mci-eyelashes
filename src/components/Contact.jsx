import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const inquiryTypes = ['Product Inquiry', 'Wholesale Order', 'Private Label / OEM', 'Sample Request', 'Partnership', 'Other']

const contactDetails = [
  {
    label: 'Email',
    value: 'denis@mci-eyelashes.com',
    href: 'mailto:denis@mci-eyelashes.com',
    icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="4" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><path d="M2 6l7 5 7-5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
  },
  {
    label: 'WhatsApp',
    value: 'Chat via WhatsApp',
    href: 'https://wa.me/6281234567890',
    icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.2"/><path d="M6 9.5c.5 1 1.5 2 3 2.5l1-1.5c.5.2 1 .3 1.5.3.5-1-.5-1.5-1-1.5-.3 0-.5-.2-.3-.5.8-1 .3-2.5-1-2.5C7.5 6.3 5.5 8 6 9.5z" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/></svg>
  },
  {
    label: 'Location',
    value: 'Purbalingga, Central Java, Indonesia',
    href: '#',
    icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2a5 5 0 0 1 5 5c0 3.5-5 9-5 9S4 10.5 4 7a5 5 0 0 1 5-5z" stroke="currentColor" strokeWidth="1.2"/><circle cx="9" cy="7" r="1.5" stroke="currentColor" strokeWidth="1.2"/></svg>
  },
  {
    label: 'Response Time',
    value: 'Within 24 hours',
    href: '#',
    icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.2"/><path d="M9 5v4l2.5 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
  },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [form, setForm] = useState({ name: '', company: '', email: '', type: '', message: '' })
  const [status, setStatus] = useState('idle')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const subject = encodeURIComponent(`${form.type || 'Wholesale Inquiry'} — ${form.company || form.name}`)
      const body = encodeURIComponent(
        `Hi Denis,\n\nName: ${form.name}\nCompany: ${form.company}\nEmail: ${form.email}\nInquiry type: ${form.type}\n\n${form.message}\n\nBest regards,\n${form.name}`
      )
      window.location.href = `mailto:denis@mci-eyelashes.com?subject=${subject}&body=${body}`
      setTimeout(() => setStatus('sent'), 500)
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" ref={ref} className="contact-section">
      <div className="contact-inner">
        <motion.div
          className="contact-header"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-eyebrow">Get in Touch</span>
          <h2 className="section-title">Start Your <em>Wholesale</em> Partnership</h2>
          <p className="section-desc">
            MOQ from 100 pairs. Private label from 500 units. Worldwide shipping 7–14 days.
            We respond to all inquiries within 24 hours.
          </p>
        </motion.div>

        <div className="contact-grid">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <div className="contact-details">
              {contactDetails.map((item) => (
                <a key={item.label} href={item.href} className="contact-detail-item">
                  <span className="contact-detail-icon">{item.icon}</span>
                  <div>
                    <div className="contact-detail-label">{item.label}</div>
                    <div className="contact-detail-value">{item.value}</div>
                  </div>
                </a>
              ))}
            </div>

            <div className="contact-tiers">
              <div className="tier-card">
                <div className="tier-moq">100<span>+ pairs</span></div>
                <div className="tier-label">Starter</div>
                <div className="tier-desc">Standard wholesale pricing, mix & match styles</div>
              </div>
              <div className="tier-card tier-featured">
                <div className="tier-moq">500<span>+ pairs</span></div>
                <div className="tier-label">Growth — 10% off</div>
                <div className="tier-desc">Private label available, priority processing</div>
              </div>
              <div className="tier-card">
                <div className="tier-moq">1,000<span>+ pairs</span></div>
                <div className="tier-label">Scale — 20% off</div>
                <div className="tier-desc">Full branding, net terms, free shipping</div>
              </div>
            </div>
          </motion.div>

          <motion.form
            className="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="form-row">
              <div className="form-group">
                <label>Your Name *</label>
                <input required placeholder="Sarah Chen" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
              </div>
              <div className="form-group">
                <label>Company</label>
                <input placeholder="The Lash Lounge NYC" value={form.company} onChange={e => setForm({...form, company: e.target.value})} />
              </div>
            </div>
            <div className="form-group">
              <label>Email *</label>
              <input required type="email" placeholder="buyer@yourbusiness.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Inquiry Type</label>
              <select value={form.type} onChange={e => setForm({...form, type: e.target.value})}>
                <option value="">Select type...</option>
                {inquiryTypes.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Message *</label>
              <textarea required rows={4} placeholder="Tell us about your order — collections interested in, estimated quantity, destination country..." value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
            </div>
            <AnimatePresence mode="wait">
              {status === 'sent' ? (
                <motion.div key="sent" className="form-success" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  ✓ Opening your email client — we'll reply within 24 hours!
                </motion.div>
              ) : (
                <motion.button key="btn" type="submit" className="btn-submit" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Opening...' : 'Send Inquiry →'}
                </motion.button>
              )}
            </AnimatePresence>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
