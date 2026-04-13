import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const inquiryTypes = ['Product Inquiry', 'Wholesale Order', 'Private Label / OEM', 'Sample Request', 'Partnership', 'Other']

const contactDetails = [
  { label: 'Email', value: 'hello@mci-eyelashes.com', href: 'mailto:hello@mci-eyelashes.com',
    icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2" y="4" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><path d="M2 6l7 5 7-5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg> },
  { label: 'WhatsApp', value: '+1 (555) 123-4567', href: '#',
    icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.2"/><path d="M5.5 6.5c.5 2 2.5 5 6 6l.5-2-1.5-.5-.5 1c-1.5-.5-3-2-3.5-3.5l1-.5-.5-1.5-1.5.5z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round"/></svg> },
  { label: 'Website', value: 'www.mci-eyelashes.com', href: 'https://www.mci-eyelashes.com',
    icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.2"/><path d="M2 9h14M9 1.5c-2.5 2.5-2.5 13 0 15M9 1.5c2.5 2.5 2.5 13 0 15" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg> },
  { label: 'Instagram', value: '@mcieyelashes', href: '#',
    icon: <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><rect x="2.5" y="2.5" width="13" height="13" rx="3.5" stroke="currentColor" strokeWidth="1.2"/><circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="1.2"/><circle cx="13" cy="5" r="0.8" fill="currentColor"/></svg> },
]

const inputBase = {
  width: '100%',
  padding: '16px 20px',
  background: 'var(--off-white)',
  border: '1px solid var(--border-soft)',
  color: 'var(--text-dark)',
  fontSize: '13px',
  fontFamily: 'Montserrat, sans-serif',
  fontWeight: 300,
  outline: 'none',
  transition: 'border-color 0.3s, background 0.3s',
}

const labelBase = {
  fontSize: '10px',
  letterSpacing: '2.5px',
  color: 'var(--teal-dark)',
  textTransform: 'uppercase',
  display: 'block',
  marginBottom: '10px',
  fontWeight: 500,
}

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', company: '', inquiry: '', message: '' })
  const set = (f) => (e) => setForm(p => ({ ...p, [f]: e.target.value }))
  const focus = (e) => { e.target.style.borderColor = 'var(--teal)'; e.target.style.background = 'rgba(72,184,202,0.04)' }
  const blur = (e) => { e.target.style.borderColor = 'var(--border-soft)'; e.target.style.background = 'var(--off-white)' }

  return (
    <section id="contact" style={{ background: 'var(--white)' }} ref={ref}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.7fr', gap: '90px', alignItems: 'start' }}
          className="contact-grid"
        >
          {/* Left info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="section-label">Get In Touch</p>
            <h2 className="section-title">
              Start a <span>Wholesale</span> Conversation
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--text-mid)', lineHeight: 1.9, marginBottom: '56px', maxWidth: '340px' }}>
              Whether you need a catalog, sample kit, or a full wholesale order — our team responds within 24 hours.
            </p>

            {/* Contact details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '26px' }}>
              {contactDetails.map(({ label, value, href, icon }) => (
                <motion.a
                  key={label}
                  href={href}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.25 }}
                  style={{ display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer' }}
                >
                  <div
                    style={{
                      width: '44px', height: '44px',
                      border: '1px solid var(--border)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'var(--teal-dark)', flexShrink: 0,
                      transition: 'background 0.3s, border-color 0.3s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(72,184,202,0.08)'; e.currentTarget.style.borderColor = 'var(--teal)' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'var(--border)' }}
                  >
                    {icon}
                  </div>
                  <div>
                    <p style={{ fontSize: '9px', letterSpacing: '2px', color: 'var(--teal-dark)', textTransform: 'uppercase', marginBottom: '4px', opacity: 0.8 }}>
                      {label}
                    </p>
                    <p style={{ fontSize: '13px', color: 'var(--text-mid)' }}>{value}</p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Lead time */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
              style={{
                marginTop: '50px', padding: '20px 24px',
                border: '1px solid var(--border)',
                background: 'rgba(72,184,202,0.04)',
              }}
            >
              <p style={{ fontSize: '11px', letterSpacing: '2px', color: 'var(--teal-dark)', textTransform: 'uppercase', marginBottom: '8px' }}>
                Typical Lead Time
              </p>
              <p style={{ fontSize: '13px', color: 'var(--text-mid)', lineHeight: 1.7 }}>
                Standard orders: <span style={{ color: 'var(--text-dark)', fontWeight: 500 }}>7–14 business days</span><br />
                Custom OEM orders: <span style={{ color: 'var(--text-dark)', fontWeight: 500 }}>21–35 business days</span>
              </p>
            </motion.div>
          </motion.div>

          {/* Right form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: 'var(--white)',
              border: '1px solid var(--border-soft)',
              padding: '52px 48px',
              boxShadow: '0 4px 40px rgba(13,30,42,0.06)',
              position: 'relative', overflow: 'hidden',
            }}
          >
            {/* Teal top accent */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0,
              height: '3px',
              background: 'linear-gradient(to right, var(--teal), var(--teal-dark))',
            }} />

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ textAlign: 'center', padding: '60px 0' }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                      width: '70px', height: '70px',
                      border: '1px solid var(--teal)',
                      borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      margin: '0 auto 28px',
                      background: 'rgba(72,184,202,0.08)',
                    }}
                  >
                    <span style={{ color: 'var(--teal)', fontSize: '28px' }}>✓</span>
                  </motion.div>
                  <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '36px', color: 'var(--text-dark)', fontWeight: 400, marginBottom: '14px' }}>
                    Message Sent!
                  </h3>
                  <p style={{ fontSize: '14px', color: 'var(--text-mid)', lineHeight: 1.8 }}>
                    Thank you, <strong>{form.name}</strong>.<br />Our team will respond within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }}
                  style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
                >
                  <div>
                    <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '28px', color: 'var(--text-dark)', fontWeight: 400, marginBottom: '6px' }}>
                      Wholesale Inquiry
                    </h3>
                    <p style={{ fontSize: '12px', color: 'var(--text-light)', marginBottom: '8px' }}>
                      Fill out the form and our wholesale team will be in touch promptly.
                    </p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={labelBase}>Full Name *</label>
                      <input required style={inputBase} placeholder="Jane Smith" value={form.name} onChange={set('name')} onFocus={focus} onBlur={blur} />
                    </div>
                    <div>
                      <label style={labelBase}>Email *</label>
                      <input required type="email" style={inputBase} placeholder="jane@company.com" value={form.email} onChange={set('email')} onFocus={focus} onBlur={blur} />
                    </div>
                  </div>

                  <div>
                    <label style={labelBase}>Company / Business Name</label>
                    <input style={inputBase} placeholder="Your salon or brand name" value={form.company} onChange={set('company')} onFocus={focus} onBlur={blur} />
                  </div>

                  <div>
                    <label style={labelBase}>Inquiry Type *</label>
                    <select required style={{ ...inputBase, appearance: 'none', cursor: 'pointer' }} value={form.inquiry} onChange={set('inquiry')} onFocus={focus} onBlur={blur}>
                      <option value="" disabled>Select inquiry type...</option>
                      {inquiryTypes.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>

                  <div>
                    <label style={labelBase}>Message *</label>
                    <textarea
                      required
                      style={{ ...inputBase, minHeight: '120px', resize: 'vertical' }}
                      placeholder="Tell us about your needs — product types, quantities, any special requirements..."
                      value={form.message}
                      onChange={set('message')}
                      onFocus={focus}
                      onBlur={blur}
                    />
                  </div>

                  <motion.button
                    type="submit"
                    className="btn-primary"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    style={{ alignSelf: 'flex-start', marginTop: '8px' }}
                  >
                    Send Inquiry <span className="btn-arrow">→</span>
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .contact-grid { grid-template-columns: 1fr !important; gap: 60px !important; } }
        @media (max-width: 600px) {
          .contact-grid > div:last-child { padding: 36px 24px !important; }
          .contact-grid form > div:first-of-type { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
