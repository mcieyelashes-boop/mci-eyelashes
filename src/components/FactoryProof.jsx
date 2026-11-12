// ─── Owner-confirmed facts ONLY ──────────────────────────────────────────────
// This section replaced a block of fabricated testimonials (invented names,
// locations, and results like "+40% reorder rate"). Do not reintroduce social
// proof here until the owner supplies real, attributable customer quotes.
//
// Confirmed and safe to state:
//   • Direct factory in Purbalingga, Indonesia — not a trading company
//   • Live video call to the production floor available on request
//   • Free samples on existing catalog styles; buyer covers shipping
//   • MOQ 100 pairs per style, mix and match allowed
//   • 5 working days production on 100-pair orders
// ─────────────────────────────────────────────────────────────────────────────

const proofs = [
  {
    title: 'See the Production Floor',
    desc: 'Book a live video call and we walk you through the factory in Purbalingga, Indonesia, while you watch.',
  },
  {
    title: 'Test Before You Buy',
    desc: 'Samples of any existing catalog style are free. You only cover the shipping.',
  },
  {
    title: 'Start Small',
    desc: 'Minimum order is 100 pairs per style, and you can mix and match styles to reach it.',
  },
  {
    title: 'Know Your Timeline',
    desc: 'A 100-pair order goes into production and ships in 5 working days.',
  },
]

export default function FactoryProof() {
  return (
    <section id="before-you-order" className="section section--alt">
      <div className="container">
        <header className="section-head">
          <div>
            <p className="eyebrow">Before You Order</p>
            <h2 className="title">Check Us Before You <em>Commit</em></h2>
          </div>
          <p className="lede">
            We are a factory, not a trading company. Here is how to verify that yourself, before you spend anything.
          </p>
        </header>

        <ol className="proofs">
          {proofs.map(({ title, desc }) => (
            <li key={title} className="proof">
              <h3>{title}</h3>
              <p>{desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
