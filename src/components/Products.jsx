import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const products = [
  {
    id: '01',
    name: 'Soft Touch Lashes',
    tagline: '50+ Years Heritage',
    description: 'The industry standard for over 50 years. Ultra lightweight and comfortable for all-day wear — ideal for daily use and professional applications. Made from high-quality Korean synthetic fiber.',
    specs: ['Natural · Wispy · Volume series', 'Korean synthetic fiber', 'Tappered-end technology', '60+ styles available'],
    moq: 'MOQ: 100 pairs',
    badge: 'Bestseller',
    skus: 'IBC 1044 – IBC 3016',
  },
  {
    id: '02',
    name: '3D Luxe Lashes',
    tagline: 'Premium Volume',
    description: 'Multi-layer 3D construction for extraordinary depth and volume. Perfect for bridal, editorial, events, and clients who want maximum impact with a premium feel.',
    specs: ['Multi-layer 3D construction', '40+ styles available', '5 volume series', 'High drama finish'],
    moq: 'MOQ: 100 pairs',
    badge: 'Premium',
    skus: 'BC 6000 – BC 6168',
  },
  {
    id: '03',
    name: 'Faux Mink — Protein Silk',
    tagline: 'Ethical Luxury',
    description: 'The look and feel of genuine mink without animal products. Protein silk technology gives each lash an incredibly soft, lightweight drape — ideal for eco-conscious brands.',
    specs: ['100% cruelty free', 'Protein silk technology', 'Mink-like softness', 'Vegan certified'],
    moq: 'MOQ: 100 pairs',
    badge: 'Cruelty Free',
    skus: 'FM Series',
  },
  {
    id: '04',
    name: 'Classic — Human Hair',
    tagline: 'Most Natural Look',
    description: 'For clients who demand the absolute most natural look. 100% sterilized human hair that blends seamlessly. Every batch meets international cosmetic safety standards.',
    specs: ['100% sterilized human hair', 'International safety certified', 'Most natural appearance', 'Premium salon grade'],
    moq: 'MOQ: 100 pairs',
    badge: 'Ultra Natural',
    skus: 'CH Series',
  },
  {
    id: '05',
    name: 'Under Lashes',
    tagline: 'Complete the Look',
    description: 'A rare specialty designed for the lower lash line. Soft Touch Tapered-End technology creates the most natural under-eye framing. A unique product that sets your salon apart.',
    specs: ['Lower lash line design', 'Tapered-End technology', '18 styles available', 'Unique upsell opportunity'],
    moq: 'MOQ: 100 pairs',
    badge: 'Specialty',
    skus: 'IBC 1052-U – IBC 6098-U',
  },
]

export default function Products() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [active, setActive] = useState(0)

  return (
    <section id="products" ref={ref} className="products-section">
      <div className="products-inner">
        <motion.div
          className="products-header"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="section-eyebrow">Our Collections</span>
          <h2 className="section-title">Five <em>Collections</em></h2>
          <p className="section-desc">
            200+ SKUs across 5 professional collections — from everyday natural to bold 3D volume.
            Mix & match styles within the same order.
          </p>
        </motion.div>

        <div className="products-tabs">
          {products.map((p, i) => (
            <button
              key={p.id}
              className={`product-tab ${active === i ? 'active' : ''}`}
              onClick={() => setActive(i)}
            >
              {p.name}
            </button>
          ))}
        </div>

        <motion.div
          key={active}
          className="product-panel"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="product-panel-header">
            <div className="product-panel-num">{products[active].id}</div>
            <div>
              <div className="product-panel-name">{products[active].name}</div>
              <div className="product-panel-tagline">{products[active].tagline}</div>
            </div>
            <div className="product-panel-badges">
              <span className="product-badge">{products[active].badge}</span>
              <span className="product-badge product-badge-gold">{products[active].skus}</span>
            </div>
          </div>
          <div className="product-panel-body">
            <div className="product-panel-desc">
              <p>{products[active].description}</p>
              <ul className="product-specs-list">
                {products[active].specs.map(s => <li key={s}>{s}</li>)}
              </ul>
              <div className="product-moq">{products[active].moq} · Mix & match allowed</div>
              <a
                href={`mailto:denis@mci-eyelashes.com?subject=Inquiry: ${products[active].name}&body=Hi Denis,%0D%0A%0D%0AI'm interested in ${products[active].name} (${products[active].skus}).%0D%0A%0D%0ACompany:%0D%0AEstimated quantity:%0D%0ADestination country:%0D%0A%0D%0AThank you`}
                className="product-cta"
              >
                Request Quote →
              </a>
            </div>
            <div className="product-panel-visual">
              <div className="product-visual-card">
                <div className="product-visual-num">{products[active].id}</div>
                <div className="product-visual-name">{products[active].name}</div>
                <div className="product-visual-grid">
                  {products[active].specs.map((s, i) => (
                    <div key={i} className="product-visual-spec">
                      <span className="spec-dot">—</span>
                      {s}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
