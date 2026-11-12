const steps = [
  {
    number: '01',
    title: 'Design Brief',
    description: 'We translate your market, price point, and brand direction into lash styles, fibers, tray formats, and packaging requirements.',
  },
  {
    number: '02',
    title: 'Sample Build',
    description: 'Prototype sets are prepared for approval so you can confirm curl, density, band feel, packaging, and retail presentation before production.',
  },
  {
    number: '03',
    title: 'Precision Production',
    description: 'Approved styles move into controlled manufacturing with batch checks for curl consistency, fiber placement, hygiene, and packaging finish.',
  },
  {
    number: '04',
    title: 'Global Launch',
    description: 'Finished orders are packed, documented, and shipped with tracking so your shelves, salons, or online store can launch on schedule.',
  },
]

export default function Process() {
  return (
    <section id="process" className="section section--alt">
      <div className="container">
        <header className="section-head">
          <div>
            <p className="eyebrow">Production Flow</p>
            <h2 className="title">From Vision To <em>Launch-Ready Lashes</em></h2>
          </div>
          <p className="lede">
            A cleaner path from concept to repeatable wholesale supply, built for private-label beauty brands.
          </p>
        </header>

        <ol className="steps">
          {steps.map((step) => (
            <li key={step.number} className="step">
              <p className="step-num" aria-hidden="true">{step.number}</p>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>

        <div className="closing-row">
          <div>
            <p>Launch a private-label line with <em>one factory-direct team.</em></p>
            <small>Samples, packaging, production, quality checks, and global shipping handled in one workflow.</small>
          </div>
          <a href="#contact" className="btn">Start Your Order</a>
        </div>
      </div>
    </section>
  )
}
