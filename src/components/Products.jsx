import { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

const products = [
  { id: '01', name: 'Soft Touch Lashes', tagline: '50+ Years Heritage', badge: 'Bestseller', skus: 'IBC 1044 - IBC 3016', desc: 'The industry standard for over 50 years. Ultra lightweight and comfortable for all-day wear, ideal for daily use and professional applications.', specs: ['Natural / wispy / volume series', 'Korean synthetic fiber', 'Tapered-end technology', '60+ styles available'], moq: '100 pairs' },
  { id: '02', name: '3D Luxe Lashes', tagline: 'Premium Volume', badge: 'Premium', skus: 'BC 6000 - BC 6168', desc: 'Multi-layer 3D construction for extraordinary depth and volume. Perfect for bridal, editorial, and clients who want maximum impact.', specs: ['Multi-layer 3D construction', '40+ styles available', '5 volume series', 'High drama finish'], moq: '100 pairs' },
  { id: '03', name: 'Faux Mink', tagline: 'Protein Silk / Ethical Luxury', badge: 'Cruelty Free', skus: 'FM Series', desc: 'Protein silk technology delivers the look of genuine mink without animal products. Ultra-soft, lightweight drape for vegan salons.', specs: ['100% cruelty free', 'Protein silk fiber', 'Mink-like softness', 'Vegan certified'], moq: '100 pairs' },
  { id: '04', name: 'Human Hair Classic', tagline: '100% Sterilized / Most Natural', badge: 'Ultra Natural', skus: 'CH Series', desc: 'The absolute most natural look. 100% sterilized human hair that blends seamlessly with existing lashes.', specs: ['100% sterilized human hair', 'International safety certified', 'Most natural appearance', 'Premium salon grade'], moq: '100 pairs' },
  { id: '05', name: 'Under Lashes', tagline: 'Lower Lash Line Specialty', badge: 'Specialty', skus: 'IBC 1052-U - IBC 6098-U', desc: 'Designed specifically for the lower lash line. A unique upsell for your salon with 18 distinct styles.', specs: ['Lower lash line design', 'Tapered-end technology', '18 styles available', 'Unique upsell'], moq: '100 pairs' },
  { id: '06', name: 'Wispy Cloud Lashes', tagline: 'Featherlight / Airy Texture', badge: 'New Arrival', skus: 'WC 2001 - WC 2048', desc: 'Inspired by soft cloud formations, these wispy lashes blend individual spikes with fluffy base layers for an effortlessly romantic look adored by influencers.', specs: ['Featherlight wispy spikes', 'Gradient density design', '48 styles available', 'Trending globally'], moq: '100 pairs' },
  { id: '07', name: 'Cat Eye Series', tagline: 'Elongated / Sultry Lift', badge: 'Trending', skus: 'CE 3100 - CE 3165', desc: 'Expertly lengthened at the outer corners to create the coveted feline lift. Loved by makeup artists for red-carpet and editorial looks.', specs: ['Extended outer corner design', 'Subtle to bold lift options', '65 styles available', 'MUA favourite'], moq: '100 pairs' },
  { id: '08', name: 'Magnetic Lashes', tagline: 'No Glue / Reusable 30x', badge: 'Innovative', skus: 'MG 5000 - MG 5040', desc: 'Revolutionary nano-magnet technology with no adhesive needed. Snap on in seconds, remove cleanly, and reuse up to 30 times. Perfect for retail and private label.', specs: ['Nano-magnet technology', 'Reusable up to 30x wear', '40 styles available', 'Glue-free application'], moq: '200 pairs' },
  { id: '09', name: 'Bridal Couture', tagline: 'Handcrafted / Once-in-a-Lifetime', badge: 'Luxury', skus: 'BR 8001 - BR 8025', desc: 'Each pair is hand-assembled by master artisans for the ultimate bridal occasion. Crystal-accented options available. A prestige tier that commands premium retail price.', specs: ['Hand-assembled by artisans', 'Crystal accent options', '25 exclusive styles', 'Premium packaging included'], moq: '50 pairs' },
  { id: '10', name: 'Active & Waterproof', tagline: 'Sweat-Proof / All-Day Lock', badge: 'Sport Line', skus: 'AW 4010 - AW 4035', desc: 'Medical-grade band with hydrophobic fiber coating withstands sweat, swimming, and humidity. Built for the active lifestyle without sacrificing glam.', specs: ['Hydrophobic nano coating', 'Flexible sport band', '35 styles available', 'Water & sweat resistant'], moq: '100 pairs' },
]

export default function Products() {
  const ref = useRef(null)
  useInView(ref, { once: true, margin: '-80px' })
  const [active, setActive] = useState(0)
  const p = products[active]

  return (
    <section id="products" className="prod-section" style={{ padding: '120px 0' }}>
      <div className="prod-inner">
        <motion.div className="prod-header" initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} ref={ref}>
          <p className="section-label">Product Architecture</p>
          <h2 className="section-title">Lash Systems <span className="accent-light">For Tomorrow's Brands</span></h2>
          <p className="prod-subtitle">A focused wholesale matrix for salons, distributors, and private-label founders. Choose the finish, define the packaging, approve samples, then scale through one factory-direct partner.</p>
        </motion.div>

        <div className="prod-tabs-wrap">
          <div className="prod-tabs">
            {products.map((prod, i) => (
              <button key={prod.id} className={`prod-tab${active === i ? ' active' : ''}`} onClick={() => setActive(i)}>
                <span className="prod-tab-id">{prod.id}</span>
                <span className="prod-tab-name">{prod.name}</span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}>
            <div className="prod-panel-bar">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span className="prod-badge">{p.badge}</span>
                <span className="prod-sku-range">{p.skus}</span>
              </div>
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,.08)', letterSpacing: '.2em' }}>{p.id}</span>
            </div>
            <div className="prod-panel-body">
              <div className="prod-info">
                <h3 className="prod-name">{p.name}</h3>
                <p className="prod-tagline">{p.tagline}</p>
                <p className="prod-desc">{p.desc}</p>
                <ul className="prod-specs">
                  {p.specs.map(s => <li key={s}><span className="prod-spec-dot">-</span>{s}</li>)}
                </ul>
                <div className="prod-moq">
                  <span className="prod-moq-label">Min. Order</span>
                  <span className="prod-moq-val">{p.moq} - Mix & match allowed</span>
                </div>
                <a href="#contact" className="prod-cta">Request Quote</a>
              </div>
              <div className="prod-visual">
                <div className="prod-visual-inner">
                  <div className="prod-visual-num">{p.id}</div>
                  <div className="prod-visual-name">{p.name}</div>
                  <div className="prod-visual-divider" />
                  {p.specs.map(s => (
                    <div key={s} className="prod-visual-spec"><span>-</span>{s}</div>
                  ))}
                  <div className="prod-visual-moq">MOQ {p.moq}</div>
                </div>
              </div>
            </div>
            <div className="prod-dots">
              {products.map((_, i) => (
                <button key={i} className={`prod-dot${active === i ? ' active' : ''}`} onClick={() => setActive(i)} aria-label={`Collection ${i + 1}`} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="prod-bottom">
          <span>OEM design support - Private label packaging - Sample kits before production</span>
          <a href="#contact" className="prod-bottom-link">Build your lash line</a>
        </div>
      </div>
    </section>
  )
}
