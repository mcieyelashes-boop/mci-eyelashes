import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const services = ['Classic Lashes', 'Volume Lashes', 'Hybrid Lashes', 'Mega Volume', 'Lash Lift & Tint', 'Infills / Touch Up']

export default function Booking() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', date: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const inputStyle = {
    width: '100%',
    padding: '16px 20px',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid var(--border)',
    color: 'var(--cream)',
    fontSize: '13px',
    fontFamily: 'Montserrat, sans-serif',
    fontWeight: 300,
    outline: 'none',
    transition: 'border-color 0.3s',
  }

  return (
    <section id="booking" style={{ background: 'var(--black)' }} ref={ref}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.6fr',
          gap: '80px',
          alignItems: 'start',
        }}
          className="booking-grid"
        >
          {/* Left info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="section-label">Get In Touch</p>
            <h2 className="section-title">
              Book Your <span>Appointment</span>
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--gray)', lineHeight: 1.9, marginBottom: '50px' }}>
              Ready for a transformation? Fill out the form and we'll confirm your appointment within 24 hours.
            </p>

            {/* Contact details */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              {[
                { label: 'Phone', value: '+1 (555) 123-4567' },
                { label: 'Email', value: 'hello@mcieyelashes.com' },
                { label: 'Location', value: '123 Beauty Lane, Suite 10\nNew York, NY 10001' },
                { label: 'Hours', value: 'Mon – Sat: 9am – 7pm\nSun: 10am – 5pm' },
              ].map(({ label, value }) => (
                <div key={label} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    border: '1px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <div style={{ width: '6px', height: '6px', background: 'var(--gold)', borderRadius: '50%' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: '10px', letterSpacing: '2px', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '6px' }}>
                      {label}
                    </p>
                    <p style={{ fontSize: '13px', color: 'var(--gray)', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: 'var(--card)',
              padding: '48px',
              border: '1px solid var(--border)',
            }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: 'center', padding: '40px 0' }}
              >
                <div style={{
                  width: '60px',
                  height: '60px',
                  border: '1px solid var(--gold)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 24px',
                }}>
                  <span style={{ color: 'var(--gold)', fontSize: '24px' }}>✓</span>
                </div>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '32px', color: 'var(--white)', marginBottom: '12px' }}>
                  Request Sent!
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--gray)', lineHeight: 1.7 }}>
                  Thank you, {form.name}. We'll confirm your appointment within 24 hours.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ fontSize: '10px', letterSpacing: '2px', color: 'var(--gold)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                      Name *
                    </label>
                    <input
                      required
                      style={inputStyle}
                      placeholder="Your name"
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      onFocus={e => e.target.style.borderColor = 'var(--gold)'}
                      onBlur={e => e.target.style.borderColor = 'var(--border)'}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '10px', letterSpacing: '2px', color: 'var(--gold)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                      Email *
                    </label>
                    <input
                      required
                      type="email"
                      style={inputStyle}
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      onFocus={e => e.target.style.borderColor = 'var(--gold)'}
                      onBlur={e => e.target.style.borderColor = 'var(--border)'}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ fontSize: '10px', letterSpacing: '2px', color: 'var(--gold)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                      Phone
                    </label>
                    <input
                      style={inputStyle}
                      placeholder="+1 (555) 000-0000"
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      onFocus={e => e.target.style.borderColor = 'var(--gold)'}
                      onBlur={e => e.target.style.borderColor = 'var(--border)'}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '10px', letterSpacing: '2px', color: 'var(--gold)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                      Date *
                    </label>
                    <input
                      required
                      type="date"
                      style={{ ...inputStyle, colorScheme: 'dark' }}
                      value={form.date}
                      onChange={e => setForm({ ...form, date: e.target.value })}
                      onFocus={e => e.target.style.borderColor = 'var(--gold)'}
                      onBlur={e => e.target.style.borderColor = 'var(--border)'}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '10px', letterSpacing: '2px', color: 'var(--gold)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                    Service *
                  </label>
                  <select
                    required
                    style={{ ...inputStyle, cursor: 'pointer' }}
                    value={form.service}
                    onChange={e => setForm({ ...form, service: e.target.value })}
                    onFocus={e => e.target.style.borderColor = 'var(--gold)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border)'}
                  >
                    <option value="" style={{ background: '#111' }}>Select a service</option>
                    {services.map(s => (
                      <option key={s} value={s} style={{ background: '#111' }}>{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '10px', letterSpacing: '2px', color: 'var(--gold)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                    Notes
                  </label>
                  <textarea
                    rows={4}
                    style={{ ...inputStyle, resize: 'vertical' }}
                    placeholder="Any special requests or questions..."
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    onFocus={e => e.target.style.borderColor = 'var(--gold)'}
                    onBlur={e => e.target.style.borderColor = 'var(--border)'}
                  />
                </div>

                <motion.button
                  type="submit"
                  className="btn-primary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{ marginTop: '8px', justifyContent: 'center' }}
                >
                  Request Appointment
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .booking-grid { grid-template-columns: 1fr !important; gap: 50px !important; }
        }
      `}</style>
    </section>
  )
}
