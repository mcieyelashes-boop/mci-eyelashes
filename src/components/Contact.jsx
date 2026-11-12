import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { track, pageRef, reportInquiry, reportWholesaleInquiry } from '../utils/track'

const EJS_SERVICE  = import.meta.env.VITE_EMAILJS_SERVICE_ID  || ''
const EJS_TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || ''
const EJS_KEY      = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  || ''

// Until the three EmailJS values are set on the host the form cannot send, so
// the panel says so and points to email and WhatsApp. Setting them brings the
// form back with no code change.
const FORM_ENABLED = Boolean(EJS_SERVICE && EJS_TEMPLATE && EJS_KEY)

// ─── Order tiers — only the Starter row is fully confirmed ───────────────────
// CONFIRMED:  100 pairs/style MOQ · free sample (buyer pays shipping) · 5-day lead time
// UNCONFIRMED (pending factory reply — DO NOT display specific claims):
//   500+  tier: tiered lead time, volume pricing details
//   1000+ tier: tiered lead time, account manager, packaging terms
// ─────────────────────────────────────────────────────────────────────────────
const tiers = [
  {
    moq:   '100',
    label: 'Starter',
    desc:  'MOQ 100 pairs per style. Free sample for catalog styles. You cover shipping. 5-day production lead time.',
  },
  {
    moq:     '500+',
    label:   'Wholesale',
    // UNCONFIRMED: volume pricing details, priority processing, private label eligibility threshold
    desc:    'Larger volume orders: contact us for lead time and pricing details.',
    featured: true,
  },
  {
    moq:   '1,000+',
    label: 'Distributor',
    // UNCONFIRMED: dedicated account manager, custom packaging terms, container rates
    desc:  'High-volume and distributor enquiries: reach out directly to discuss terms.',
  },
]

const details = [
  { label: 'Email',     value: 'denis@mci-eyelashes.com', href: 'mailto:denis@mci-eyelashes.com' },
  { label: 'WhatsApp',  value: '+62 812-3237-8987',       href: 'https://wa.me/6281232378987' },
  { label: 'Location',  value: 'Purbalingga, Indonesia' },
  { label: 'Response',  value: 'Within 24 hours' },
]

const VOLUMES = [
  '100-300 pairs',
  '300-500 pairs',
  '500-1,000 pairs',
  '1,000+ pairs',
]

const EMPTY_FORM = { firstName: '', lastName: '', email: '', company: '', country: '', volume: '', message: '' }

export default function Contact() {
  const [sent, setSent]       = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')
  const [form, setForm]       = useState(EMPTY_FORM)

  const update = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!e.currentTarget.checkValidity()) {
      e.currentTarget.reportValidity()
      return
    }

    if (!EJS_SERVICE || !EJS_TEMPLATE || !EJS_KEY) {
      setError('Online form is not configured yet. Please email us directly at denis@mci-eyelashes.com')
      return
    }

    setLoading(true)

    const templateParams = {
      from_name:    `${form.firstName} ${form.lastName}`.trim(),
      from_email:   form.email,
      company:      form.company || '-',
      country:      form.country,
      volume:       form.volume  || '-',
      message:      `${form.message || '-'}\n\n[page: ${pageRef()}]`,
      reply_to:     form.email,
      to_name:      'Denis',
    }

    try {
      await emailjs.send(EJS_SERVICE, EJS_TEMPLATE, templateParams, EJS_KEY)
      setLoading(false)
      setSent(true)
      track('generate_lead', { form: 'wholesale_inquiry', order_range: form.volume || 'not_given' })
      reportInquiry(form.volume)
      reportWholesaleInquiry(form)
    } catch (err) {
      console.error('[EmailJS]', err)
      setLoading(false)
      setError('Something went wrong. Please email us directly at denis@mci-eyelashes.com')
    }
  }

  const handleReset = () => {
    setSent(false)
    setError('')
    setForm(EMPTY_FORM)
  }

  // The tag says which page the visitor was on, so the inquiry can be traced back.
  const page = typeof window === 'undefined' ? 'home' : pageRef()
  const mailHref = `mailto:denis@mci-eyelashes.com?subject=${encodeURIComponent('Wholesale inquiry')}&body=${encodeURIComponent(
    `Hello MCI Eyelashes,\n\nProduct type:\nOrder size:\nCountry:\n\n[page: ${page}]`
  )}`
  const waHref = `https://wa.me/6281232378987?text=${encodeURIComponent(
    `Hello MCI Eyelashes! I'm interested in wholesale eyelash products. Could you send me your catalog and pricing? [ref: ${page}]`
  )}`

  return (
    <section id="contact" className="section section--rule">
      <div className="container">
        <header className="section-head">
          <div>
            <p className="eyebrow">Get In Touch</p>
            <h2 className="title">Start Your <em>Wholesale</em> Partnership</h2>
          </div>
          <p className="lede">
            Our team responds within 24 hours with a full product catalog, wholesale price sheet, and MOQ details tailored to your requirements.
          </p>
        </header>

        <div className="contact-grid">
          <div>
            <dl className="contact-details">
              {details.map((d) => (
                <div key={d.label} className="contact-detail">
                  <dt>{d.label}</dt>
                  <dd>
                    {d.href
                      ? <a href={d.href} target={d.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">{d.value}</a>
                      : d.value}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="tiers">
              <p className="tiers-title">Order size, in pairs</p>
              {tiers.map((t) => (
                <div key={t.label} className="tier">
                  <p className="tier-moq">{t.moq}</p>
                  <div>
                    <p className="tier-label">{t.label}</p>
                    <p className="tier-desc">{t.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="contact-form">
            {!FORM_ENABLED ? (
              <div className="form-state">
                <h3>Online form unavailable</h3>
                <p>
                  Please email or message us on WhatsApp directly. Tell us the product type, order size and your country,
                  and we reply within 24 hours with the catalog and price sheet.
                </p>
                <div className="btn-row">
                  <a className="btn" href={mailHref}>Email us</a>
                  <a className="btn-ghost" href={waHref} target="_blank" rel="noopener noreferrer">WhatsApp us</a>
                </div>
              </div>
            ) : sent ? (
              <div className="form-state" role="status">
                <h3>Inquiry Sent</h3>
                <p>Thank you. Our team will respond within 24 hours with your personalized wholesale package.</p>
                <p className="form-state-mail">denis@mci-eyelashes.com</p>
                <button className="btn-ghost" onClick={handleReset}>Send Another Inquiry</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="cf-firstName">First Name <span className="form-required">*</span></label>
                    <input id="cf-firstName" required autoComplete="given-name" value={form.firstName} onChange={update('firstName')} placeholder="Jane" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cf-lastName">Last Name <span className="form-required">*</span></label>
                    <input id="cf-lastName" required autoComplete="family-name" value={form.lastName} onChange={update('lastName')} placeholder="Smith" />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="cf-email">Business Email <span className="form-required">*</span></label>
                  <input id="cf-email" required type="email" autoComplete="email" value={form.email} onChange={update('email')} placeholder="jane@salon.com" />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="cf-company">Company / Brand</label>
                    <input id="cf-company" autoComplete="organization" value={form.company} onChange={update('company')} placeholder="Glam Beauty Co." />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cf-country">Country <span className="form-required">*</span></label>
                    <input id="cf-country" required autoComplete="country-name" value={form.country} onChange={update('country')} placeholder="United States" />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="cf-volume">Monthly Volume</label>
                  <select id="cf-volume" value={form.volume} onChange={update('volume')}>
                    <option value="">Select order range</option>
                    {VOLUMES.map((v) => <option key={v}>{v}</option>)}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="cf-message">Message</label>
                  <textarea id="cf-message" rows={4} value={form.message} onChange={update('message')} placeholder="Tell us about your wholesale needs: product types, target market, or any custom requirements..." />
                </div>

                {error && <p className="form-error" role="alert">{error}</p>}

                <button type="submit" className="btn btn-submit" disabled={loading}>
                  {loading ? <span className="btn-submit-spinner" aria-label="Sending" /> : 'Send Inquiry'}
                </button>

                <p className="form-privacy">
                  Your information is kept private and never shared with third parties.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
