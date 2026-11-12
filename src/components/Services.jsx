// Owner-confirmed facts only (MOQ 100 pairs/style, 5-day production on
// 100-pair orders, free catalog samples). This file previously stated
// concrete MOQ/lead-time numbers for these six services — 500 units,
// 1,000 units, "5-7 business days," "7-10 business days" — that were never
// confirmed and contradicted the hedged language already used in
// FactoryProof.jsx, Contact.jsx, and FAQ.jsx. Do not reintroduce a specific
// number here without owner confirmation matching every other section.
// November 2026: the owner confirmed the 100-pair minimum covers private label
// too. Packaging minimums and lead times are still unconfirmed.
const services = [
  { id: '01', name: 'Bulk Wholesale', tag: 'Ready to Ship', desc: 'Order from 230+ styles across 4 collections. Mix and match styles to reach the 100-pair minimum.', highlights: ['230+ styles', 'MOQ 100 pairs', '5-day production'], featured: true },
  { id: '02', name: 'Sample Program', tag: 'Try First', desc: 'Test quality before committing to bulk. Free samples on existing catalog styles. You cover shipping only.', highlights: ['Free catalog samples', 'You cover shipping', 'All collections'] },
  { id: '03', name: 'Private Label', tag: 'Most Popular', desc: 'Your brand on our premium lashes, custom labels, inserts, and packaging. Full artwork support included.', highlights: ['Custom branding', 'MOQ 100 pairs', 'Artwork support'] },
  { id: '04', name: 'OEM Manufacturing', tag: 'Custom', desc: 'Bring your own lash design or work with our team to engineer entirely new styles, materials, and specifications.', highlights: ['Custom designs', 'Material sourcing', 'Prototype samples'] },
  { id: '05', name: 'Custom Packaging', tag: 'Brand Ready', desc: 'Full packaging design service for branded boxes, trays, inserts, and gift sets. Contact us for minimum runs and lead time.', highlights: ['Box and insert design', 'Contact us for MOQ', 'Gift set options'] },
  { id: '06', name: 'Express Production', tag: 'Fast Track', desc: 'Need it sooner than 5 days? Contact us with your order size and deadline and we will confirm what is possible.', highlights: ['Contact us for timeline', 'Priority slot', 'QC inspection'] },
]

export default function Services() {
  return (
    <section id="services" className="section">
      <div className="container">
        <header className="section-head">
          <div>
            <p className="eyebrow">Factory Capabilities</p>
            <h2 className="title">Everything Your <em>Lash Brand Needs</em></h2>
          </div>
          <p className="lede">
            From ready-to-ship wholesale styles to full private-label programs, MCI supports every stage from first sample to repeat production.
          </p>
        </header>

        <ul className="services">
          {services.map((s) => (
            <li key={s.name} className={`service${s.featured ? ' service--featured' : ''}`}>
              <span className="service-num">{s.id}</span>
              <div className="service-name-cell">
                {s.featured && <span className="service-flag">Start Here</span>}
                <h3 className="service-name">{s.name}</h3>
                <span className="service-tag">{s.tag}</span>
              </div>
              <p className="service-desc">{s.desc}</p>
              <ul className="service-points">
                {s.highlights.map((h) => <li key={h}>{h}</li>)}
              </ul>
              <a href="#contact" className="arrow-link" aria-label={`Get a quote for ${s.name}`}>Get Quote</a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
