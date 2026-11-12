import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { track, pageRef, reportInquiry, reportWholesaleInquiry } from '../utils/track'

const EJS_SERVICE  = import.meta.env.VITE_EMAILJS_SERVICE_ID  || ''
const EJS_TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || ''
const EJS_KEY      = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  || ''

// How an inquiry reaches the inbox.
//
// 1. If the three EmailJS values are set on the host, EmailJS sends it.
// 2. Otherwise it goes through FormSubmit, a mail relay that needs no account
//    and no keys: the form posts to the address below and FormSubmit forwards
//    it. The very first submission makes FormSubmit email that address an
//    "Activate Form" link. Until the owner clicks it, nothing is forwarded.
//
// Either way the inquiry is also filed in Sales OS the moment the visitor
// presses send (see handleSubmit), so a mail failure cannot lose a lead.
const INBOX = 'denis@mci-eyelashes.com'
const FORMSUBMIT_URL = `https://formsubmit.co/ajax/${INBOX}`
const USE_EMAILJS = Boolean(EJS_SERVICE && EJS_TEMPLATE && EJS_KEY)

async function sendByEmailJS(form) {
  await emailjs.send(EJS_SERVICE, EJS_TEMPLATE, {
    from_name:  `${form.firstName} ${form.lastName}`.trim(),
    from_email: form.email,
    company:    form.company || '-',
    country:    form.country,
    volume:     form.volume  || '-',
    message:    `${form.message || '-'}\n\n[page: ${pageRef()}]`,
    reply_to:   form.email,
    to_name:    'Denis',
  }, EJS_KEY)
}

async function sendByFormSubmit(form) {
  const name = `${form.firstName} ${form.lastName}`.trim()
  const res = await fetch(FORMSUBMIT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      _subject:  `Wholesale inquiry from ${name} (${form.country})`,
      _replyto:  form.email,
      _template: 'table',
      _captcha:  'false',
      Name:      name,
      Email:     form.email,
      Company:   form.company || '-',
      Country:   form.country,
      'Monthly volume': form.volume || '-',
      Message:   form.message || '-',
      Page:      pageRef(),
    }),
  })
  const data = await res.json().catch(() => ({}))
  // FormSubmit answers 200 with success "false" when it refuses a message
  // (for example while the form is still waiting to be activated).
  if (!res.ok || String(data.success) !== 'true') {
    throw new Error(data.message || `FormSubmit answered ${res.status}`)
  }
}

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

// `website` is a honeypot: people never see it, bots fill it in.
const EMPTY_FORM = { firstName: '', lastName: '', email: '', company: '', country: '', volume: '', message: '', website: '' }

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

    // A filled honeypot means a bot. Show it success and send nothing.
    if (form.website) {
      setSent(true)
      return
    }

    setLoading(true)
    // File the lead first, so it is kept even if the email below fails.
    reportWholesaleInquiry(form)

    try {
      await (USE_EMAILJS ? sendByEmailJS(form) : sendByFormSubmit(form))
      setLoading(false)
      setSent(true)
      track('generate_lead', { form: 'wholesale_inquiry', order_range: form.volume || 'not_given' })
      reportInquiry(form.volume)
    } catch (err) {
      console.error('[inquiry]', err)
      setLoading(false)
      setError('We could not send your inquiry just now. Please reach us directly instead:')
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
            {sent ? (
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

                <div className="form-trap" aria-hidden="true">
                  <label htmlFor="cf-website">Website</label>
                  <input id="cf-website" name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={update('website')} />
                </div>

                {error && (
                  <div className="form-error" role="alert">
                    <p>{error}</p>
                    <p>
                      <a className="text-link" href={mailHref}>Email us</a>
                      {' or '}
                      <a className="text-link" href={waHref} target="_blank" rel="noopener noreferrer">WhatsApp us</a>
                    </p>
                  </div>
                )}

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
