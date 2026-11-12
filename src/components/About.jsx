// Owner-confirmed claims only. Partner counts, country counts, units-shipped
// figures and certification claims (ISO 9001, CE, FDA, PETA) were removed and
// must not come back until the owner supplies proof: false compliance claims
// carry legal risk in export markets.
const materials = [
  { label: 'Fiber', name: 'Korean synthetic' },
  { label: 'Silk', name: 'Protein silk' },
  { label: 'Hair', name: 'Sterilized human hair' },
]

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <div className="about-grid">
          <div className="about-photo">
            <img
              src="/product-packaging-square.webp"
              alt="White and gold eyelash packaging boxes with a clear tray holding a pair of MCI Eyelashes lashes"
              width="1254"
              height="1254"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="about-copy">
            <p className="eyebrow">The Factory</p>
            <h2 className="title">Made In-House In <em>Purbalingga</em></h2>
            <p className="lede">
              MCI Eyelashes helps salons, distributors, and founders build lash products that feel premium from first sample to final packaging.
            </p>
            <p className="lede">
              We produce in-house in Purbalingga, Indonesia, so you get factory-direct pricing, OEM flexibility, and the option to watch your order being made.
            </p>

            <dl className="materials" aria-label="Materials you can choose">
              {materials.map(({ label, name }) => (
                <div key={name} className="material">
                  <dt><span>{label}</span></dt>
                  <dd><strong>{name}</strong></dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
