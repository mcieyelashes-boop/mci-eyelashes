import { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const products = [
  {
    id: '01',
    name: 'Soft Touch Lashes',
    tagline: '50+ Years Heritage',
    description: 'The industry standard for over 50 years. Ultra lightweight and comfortable for all-day wear — ideal for daily use and professional applications.',
    specs: ['Natural · Wispy · Volume series', 'Korean synthetic fiber', 'Tappered-end technology', '60+ styles available'],
    moq: '100 pairs',
    badge: 'Bestseller',
    skus: 'IBC 1044 – IBC 3016',
    color: 'var(--teal)',
  },
  {
    id: '02',
    name: '3D Luxe Lashes',
    tagline: 'Premium Volume',
    description: 'Multi-layer 3D construction for extraordinary depth and volume. Perfect for bridal, editorial, and clients who want maximum impact.',
    specs: ['Multi-layer 3D construction', '40+ styles available', '5 volume series', 'High drama finish'],
    moq: '100 pairs',
    badge: 'Premium',
    skus: 'BC 6000 – BC 6168',
    color: 'var(--teal-dark)',
  },
  {
    id: '03',
    name: 'Faux Mink',
    tagline: 'Protein Silk · Ethical Luxury',
    description: 'Protein silk technology delivers the look of genuine mink without animal products. Ultra-soft, lightweight drape for vegan salons.',
    specs: ['100% cruelty free', 'Protein silk fiber', 'Mink-like softness', 'Vegan certified'],
    moq: '100 pairs',
    badge: 'Cruelty Free',
    skus: 'FM Series',
    color: 'var(--teal)',
  },
  {
    id: '04',
    name: 'Human Hair Classic',
    tagline: '100% Sterilized · Most Natural',
    description: 'The absolute most natural look. 100% sterilized human hair that blends seamlessly. Meets international cosmetic safety standards.',
    specs: ['100% sterilized human hair', 'International safety certified', 'Most natural appearance', 'Premium salon grade'],
    moq: '100 pairs',
    badge: 'Ultra Natural',
    skus: 'CH Series',
    color: 'var(--teal-dark)',
  },
  {
    id: '05',
    name: 'Under Lashes',
    tagline: 'Lower Lash Line Specialty',
    description: 'Designed specifically for the lower lash line. Tapered-End technology creates natural under-eye framing — a unique upsell for your salon.',
    specs: ['Lower lash line design', 'Tapered-End technology', '18 styles available', 'Unique upsell'],
    moq: '100 pairs',
    badge: 'Specialty',
    skus: 'IBC 1052-U – IBC 6098-U',
    color: 'var(--teal)',
  },
]

export default function Products() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [active, setActive] = useState(0)

  return (
    <section id="products" ref={ref} className="prod-section">
      <div className="prod-inner">

        {/* Header */}
        <motion.div
          className="prod-header"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-label">Our Collections</span>
          <h2 className="section-title">Five <span>Collections</span></h2>
          <p className="prod-subtitle">
            200+ SKUs across 5 professional collections — from everyday natural to bold 3D volume.
            Mix & match styles within the same order.
          </p>
        </motion.div>

        {/* Tab buttons — horizontal scroll on mobile */}
        <div className="prod-tabs-wrap">
          <div className="prod-tabs">
            {products.map((p, i) => (
              <button
                key={p.id}
                className={`prod-tab ${active === i ? 'active' : ''}`}
                onClick={() => setActive(i)}
              >
                <span className="prod-tab-id">{p.id}</span>
                <span className="prod-tab-name">{p.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Active panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="prod-panel"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
          >
            {/* Panel top bar */}
            <div className="prod-panel-bar">
              <div className="prod-panel-bar-left">
                <span className="prod-badge">{products[active].badge}</span>
                <span className="prod-sku-range">{products[active].skus}</span>
              </div>
              <span className="prod-panel-num">{products[active].id}</span>
            </div>

            {/* Panel body */}
            <div className="prod-panel-body">
              {/* Left: info */}
              <div className="prod-info">
                <h3 className="prod-name">{products[active].name}</h3>
                <p className="prod-tagline">{products[active].tagline}</p>
                <p className="prod-desc">{products[active].description}</p>

                <ul className="prod-specs">
                  {products[active].specs.map(s => (
                    <li key={s}>
                      <span className="prod-spec-dot">—</span>
                      {s}
                    </li>
                  ))}
                </ul>

                <div className="prod-moq">
                  <span className="prod-moq-label">Min. Order</span>
                  <span className="prod-moq-val">{products[active].moq} · Mix & match allowed</span>
                </div>

                <a
                  href={`mailto:denis@mci-eyelashes.com?subject=Quote: ${products[active].name}&body=Hi Denis,%0D%0A%0D%0AInterested in: ${products[active].name} (${products[active].skus})%0D%0A%0D%0ACompany:%0D%0AQty:%0D%0ACountry:%0D%0A%0D%0AThanks`}
                  className="prod-cta"
                >
                  Request Quote →
                </a>
              </div>

              {/* Right: visual card */}
              <div className="prod-visual">
                <div className="prod-visual-inner">
                  <div className="prod-visual-num">{products[active].id}</div>
                  <div className="prod-visual-name">{products[active].name}</div>
                  <div className="prod-visual-divider" />
                  {products[active].specs.map(s => (
                    <div key={s} className="prod-visual-spec">
                      <span>—</span> {s}
                    </div>
                  ))}
                  <div className="prod-visual-moq">MOQ {products[active].moq}</div>
                </div>
              </div>
            </div>

            {/* Pagination dots */}
            <div className="prod-dots">
              {products.map((_, i) => (
                <button
                  key={i}
                  className={`prod-dot ${active === i ? 'active' : ''}`}
                  onClick={() => setActive(i)}
                  aria-label={`Collection ${i + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom CTA strip */}
        <motion.div
          className="prod-bottom"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <span>Private label from 500 units · Worldwide shipping 7–14 days</span>
          <a href="/#contact" className="prod-bottom-link">View all pricing →</a>
        </motion.div>

      </div>
    </section>
  )
}
