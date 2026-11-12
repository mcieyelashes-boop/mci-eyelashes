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
    a: 'Yes: samples of our existing catalog styles are free. You cover the shipping cost. Reach out via WhatsApp or email to arrange yours.',
  },
  {
    q: 'How long does production take?',
    a: 'For orders of 100 pairs: 5 working days. For larger orders, production time varies. Contact us for an exact timeline before you order.',
  },
  {
    q: 'Are you a factory or a reseller?',
    a: 'Direct factory, based in Purbalingga, Indonesia. We welcome live video calls to our production floor. Just ask.',
  },
  {
    q: 'Do you offer private label or custom packaging?',
    a: 'Yes. We can customise curl, length, material, and packaging. Send us a WhatsApp message or email to discuss your requirements.',
  },
]

export default function FAQ() {
  return (
    <section id="faq" className="section section--alt">
      <div className="container">
        <div className="faq-grid">
          <header className="faq-head">
            <p className="eyebrow">Common Questions</p>
            <h2 className="title">Wholesale <em>FAQ</em></h2>
            <p className="lede">Everything you need to know before placing your first order.</p>
            <a href="mailto:denis@mci-eyelashes.com" className="arrow-link">Ask a Question</a>
          </header>

          <div className="faq-list">
            {faqs.map((faq, i) => (
              <details key={faq.q} className="faq-item" open={i === 0}>
                <summary>{faq.q}</summary>
                <p>{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
