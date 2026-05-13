import { motion } from 'framer-motion'

const MARQUEE = [
  'Premium Wholesale Lashes',
  'ISO 9001 Certified',
  '300+ Styles',
  'Private Label Available',
  'Ships to 50+ Countries',
  'MOQ 100 Pairs',
  'CE Certified',
  'OEM Manufacturing',
  '24h Quote Reply',
  'Cruelty Free Options',
  '10 Collections',
  'Magnetic Lashes',
  'Bridal Couture',
  'Sport & Waterproof',
]

const STATS = [
  { number: '300+', label: 'Styles' },
  { number: '10', label: 'Collections' },
  { number: '100', label: 'MOQ Pairs' },
  { number: '24h', label: 'Quote Reply' },
]

const TRUST = [
  'Factory-direct pricing',
  'Private label packaging',
  'Sample kits available',
  'Tracked global shipping',
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] },
})

const doubled = [...MARQUEE, ...MARQUEE]

export default function Hero() {
  return (
    <>
      <section id="hero" className="hero-section">
        <div
          className="hero-orb"
          style={{
            width: '700px',
            height: '700px',
            top: '-200px',
            right: '5%',
            background: 'radial-gradient(circle, rgba(72,184,202,.09) 0%, transparent 65%)',
            position: 'absolute',
            borderRadius: '50%',
            pointerEvents: 'none',
          }}
        />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-dot-grid" />
        <div className="hero-fade-left" />

        <div className="container">
          <div className="hero-layout">
            <div className="hero-content">
              <motion.h2
                className="hero-brand-title"
                initial={{ opacity: 0, y: 48 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              >
                MCI <span className="hero-brand-title-thin">EYELASHES</span>
              </motion.h2>

              <motion.p className="hero-eyebrow" {...fadeUp(0.1)}>
                <span className="hero-eyebrow-line" />
                Future-Ready Wholesale Lashes
              </motion.p>

              <h1 className="hero-title">
                <motion.span className="line-white" {...fadeUp(0.2)}>Beauty</motion.span>
                <motion.span className="line-accent" {...fadeUp(0.33)}>Engineered</motion.span>
                <motion.span className="line-white" {...fadeUp(0.45)}>For Brands</motion.span>
              </h1>

              <motion.p className="hero-desc" {...fadeUp(0.56)}>
                Premium eyelashes for salons, distributors, and beauty labels building the next
                generation of lash products. OEM, private label, and wholesale supply from one maker.
              </motion.p>

              <motion.div className="hero-btns" {...fadeUp(0.68)}>
                <motion.a
                  href="#products"
                  className="btn-primary"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  View Products
                </motion.a>
                <motion.a
                  href="#contact"
                  className="btn-outline"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Request Wholesale
                </motion.a>
              </motion.div>

              <motion.div className="hero-stats" {...fadeUp(0.8)}>
                {STATS.map(({ number, label }) => (
                  <div key={label} className="hero-stat-item">
                    <p className="hero-stat-num">{number}</p>
                    <p className="hero-stat-label">{label}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div
              className="hero-showcase"
              initial={{ opacity: 0, x: 46 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.1, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="hero-quality-card">
                <p className="hero-quality-kicker">Precision made</p>
                <p className="hero-quality-title">
                  Cinematic beauty, factory-direct production, and retail-ready packaging.
                </p>
                <div className="hero-quality-list">
                  {TRUST.map(item => <span key={item}>{item}</span>)}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="marquee-band">
        <div className="marquee-track">
          {doubled.map((item, i) => (
            <span key={`${item}-${i}`} className="marquee-item">
              {item}
              <span className="marquee-dot" />
            </span>
          ))}
        </div>
      </div>
    </>
  )
}
