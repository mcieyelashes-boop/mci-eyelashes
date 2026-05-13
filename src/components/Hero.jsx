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

const PROOF = [
  '300+ lash styles',
  'MOQ from 100 pairs',
  'Private label ready',
  '24h quote reply',
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
              <motion.p className="hero-eyebrow" {...fadeUp(0.1)}>
                <span className="hero-eyebrow-line" />
                Wholesale OEM and Private Label Eyelashes
              </motion.p>

              <h1 className="hero-title">
                <motion.span className="line-white" {...fadeUp(0.2)}>Lashes Made</motion.span>
                <motion.span className="line-accent" {...fadeUp(0.33)}>For Tomorrow's</motion.span>
                <motion.span className="line-white" {...fadeUp(0.45)}>Beauty Brands</motion.span>
              </h1>

              <motion.p className="hero-desc" {...fadeUp(0.56)}>
                Premium eyelashes for salons, distributors, and beauty labels. Factory-direct
                wholesale, custom packaging, and OEM production from one maker.
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

              <motion.div className="hero-proof" {...fadeUp(0.8)}>
                {PROOF.map(item => (
                  <span key={item}>{item}</span>
                ))}
              </motion.div>
            </div>

            <div className="hero-showcase" aria-hidden="true" />
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
