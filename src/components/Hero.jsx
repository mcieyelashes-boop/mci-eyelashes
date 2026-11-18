import { Link } from 'react-router-dom'

// The four terms the owner has confirmed. MCI does not own a factory: the
// lashes are made by partner workshops in Purbalingga that MCI manages (owner,
// November 2026). Never write 'factory direct', 'own floor' or 'in-house'.
// The four terms: They are stated here once, in full,
// so the sections below do not have to keep repeating them.
const terms = [
  { term: 'Minimum order', value: '100 pairs', note: 'Per style. Mix and match styles to reach it.' },
  { term: 'Production',    value: '5 working days', note: 'On a 100-pair order.' },
  { term: 'Samples',       value: 'Free', note: 'On existing catalog styles. You cover shipping.' },
  { term: 'Made in',       value: 'Purbalingga', note: 'By partner workshops in Central Java, Indonesia, that we manage.' },
]

export default function Hero() {
  return (
    <>
      <section id="hero" className="hero">
        {/* Phones get a crop of the same picture (its right-hand part, where the
            head is) at well under half the weight. The breakpoint must match the
            object-position rule for .hero-media img in index.css. */}
        <picture className="hero-media">
          <source media="(max-width: 760px)" srcSet="/hero-cinematic-phone.webp" width="860" height="807" />
          <img
            src="/hero-cinematic.webp"
            alt="MCI Eyelashes campaign: a robot woman with long lashes rising from the sea at sunset"
            width="1672"
            height="941"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
      </section>

      <section className="intro">
        <div className="container">
          <div className="intro-grid">
            <div>
              <p className="eyebrow">Purbalingga, Indonesia</p>
              <h1 id="content" tabIndex={-1}>
                Eyelashes Made in Purbalingga, Indonesia
                <em>Wholesale, OEM &amp; Private Label</em>
              </h1>
            </div>
            <div>
              <p className="lede">
                For salons, distributors, and private-label founders. Pick a style, request a free sample, and order with one contact from sample to shipment.
              </p>
              <div className="btn-row">
                <a href="#contact" className="btn">Request Wholesale Pricing</a>
                <Link to="/catalogue" className="btn-ghost">View Catalogue</Link>
              </div>
            </div>
          </div>

          <dl className="ledger">
            {terms.map(({ term, value, note }) => (
              <div key={term} className="ledger-item">
                <dt className="ledger-term">{term}</dt>
                <dd>
                  <p className="ledger-value">{value}</p>
                  <p className="ledger-note">{note}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  )
}
