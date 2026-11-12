import { Link } from 'react-router-dom'

// The four terms the owner has confirmed. They are stated here once, in full,
// so the sections below do not have to keep repeating them.
const terms = [
  { term: 'Minimum order', value: '100 pairs', note: 'Per style. Mix and match styles to reach it.' },
  { term: 'Production',    value: '5 working days', note: 'On a 100-pair order.' },
  { term: 'Samples',       value: 'Free', note: 'On existing catalog styles. You cover shipping.' },
  { term: 'Supply',        value: 'Factory direct', note: 'Made in Purbalingga, Indonesia. No trading company.' },
]

export default function Hero() {
  return (
    <>
      <section id="hero" className="hero" aria-label="MCI Eyelashes campaign image">
        <div className="hero-media">
          <img
            src="/hero-cinematic.webp"
            alt="MCI Eyelashes campaign: a robot woman with long lashes rising from the sea at sunset"
            width="1672"
            height="941"
            fetchPriority="high"
            decoding="async"
          />
        </div>
      </section>

      <section className="intro" aria-labelledby="intro-title">
        <div className="container">
          <div className="intro-grid">
            <div>
              <p className="eyebrow">Purbalingga, Indonesia</p>
              <h1 id="intro-title">
                Eyelashes Factory Indonesia
                <em>OEM &amp; Private Label Manufacturer</em>
              </h1>
            </div>
            <div>
              <p className="lede">
                For salons, distributors, and private-label founders. Pick a style, request a free sample, and order direct from the factory.
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
