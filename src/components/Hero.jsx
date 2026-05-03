import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const MARQUEE_ITEMS = [
  'Premium Wholesale Lashes', 'ISO 9001 Certified', '200+ Styles',
  'Private Label Available', 'Ships to 50+ Countries', 'MOQ 100 Pairs',
  'CE Certified', 'OEM Manufacturing', '24h Quote Reply', 'Cruelty Free Options',
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, delay, ease: [0.22, 1, 0.36, 1] },
})

const stats = [
  { number: '200+', label: 'Styles' },
  { number: '5',    label: 'Collections' },
  { number: '100',  label: 'MOQ Pairs' },
  { number: '24h',  label: 'Quote Reply' },
]

export default function Hero() {
  const ref = useRef(null)
  const cardRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const opacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])
  const y = useTransform(scrollYProgress, [0, 1], [0, 80])

  // 3D mouse-tracking tilt on the card
  useEffect(() => {
    const card = cardRef.current
    if (!card) return
    const handleMove = (e) => {
      const rect = card.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = (e.clientX - cx) / (rect.width / 2)
      const dy = (e.clientY - cy) / (rect.height / 2)
      card.style.transform = `perspective(1100px) rotateY(${-12 + dx * 6}deg) rotateX(${4 - dy * 4}deg) scale(1.02)`
    }
    const handleLeave = () => {
      card.style.transform = 'perspective(1100px) rotateY(-12deg) rotateX(4deg) scale(1)'
    }
    card.addEventListener('mousemove', handleMove)
    card.addEventListener('mouseleave', handleLeave)
    return () => { card.removeEventListener('mousemove', handleMove); card.removeEventListener('mouseleave', handleLeave) }
  }, [])

  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]

  return (
    <>
      <section id="hero" className="hero-section" ref={ref} style={{ marginTop: '-70px' }}>
        {/* Ambient orbs — no grid cross */}
        <div className="hero-orb" style={{ width: '700px', height: '700px', top: '-200px', right: '5%', background: 'radial-gradient(circle, rgba(72,184,202,.07) 0%, transparent 65%)' }} />
        <div className="hero-orb" style={{ width: '400px', height: '400px', bottom: '0', left: '30%', background: 'radial-gradient(circle, rgba(45,151,169,.05) 0%, transparent 70%)' }} />
        <div className="hero-orb" style={{ width: '300px', height: '300px', top: '20%', left: '-80px', background: 'radial-gradient(circle, rgba(72,184,202,.04) 0%, transparent 65%)' }} />

        {/* Dot grid — subtle, no cross */}
        <div className="hero-dot-grid" />

        {/* 3D Product Card — right side */}
        <div className="hero-3d-wrap">
          <motion.div
            ref={cardRef}
            className="hero-3d-card"
            initial={{ opacity: 0, rotateY: -30, x: 60 }}
            animate={{ opacity: 1, rotateY: -12, x: 0 }}
            transition={{ duration: 1.4, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <img src="/hero-lashes.jpg" alt="Premium MCI Eyelashes" className="hero-3d-img" />
            <div className="hero-3d-overlay" />

            {/* Product tag top-left */}
            <div className="hero-3d-tag">
              <span className="hero-3d-tag-label">01 · BESTSELLER</span>
              <div className="hero-3d-tag-divider" />
              <h3 className="hero-3d-name">Soft Touch Lashes</h3>
              <p className="hero-3d-sub">60+ styles · Korean fiber · Tapered-end tech</p>
              <p className="hero-3d-moq">MOQ 100 PAIRS</p>
            </div>

            {/* Floating badge — 5 star */}
            <motion.div
              className="hero-float star"
              initial={{ opacity: 0, y: 20, scale: .85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1, duration: .7, ease: [0.22, 1, 0.36, 1] }}
              style={{ transform: 'translateZ(30px)' }}
            >
              <span className="hero-float-num">5★</span>
              <span className="hero-float-lbl">TOP RATED</span>
            </motion.div>

            {/* Floating badge — countries */}
            <motion.div
              className="hero-float countries"
              initial={{ opacity: 0, y: -20, scale: .85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1.1, duration: .7, ease: [0.22, 1, 0.36, 1] }}
              style={{ transform: 'translateZ(30px)' }}
            >
              <span className="hero-float-num">50+</span>
              <span className="hero-float-lbl">COUNTRIES</span>
            </motion.div>
          </motion.div>

          {/* 3D shadow plane */}
          <div className="hero-3d-shadow" />
        </div>

        {/* Left gradient fade */}
        <div className="hero-fade-left" />

        {/* Content */}
        <motion.div style={{ opacity, y, width: '100%', position: 'relative', zIndex: 5 }}>
          <div className="container">
            <div className="hero-content">
              <motion.p className="hero-eyebrow" {...fadeUp(0.2)}>
                <span className="hero-eyebrow-line" />Premium Wholesale Lashes
              </motion.p>
              <h1 className="hero-title">
                <motion.span className="line-white" {...fadeUp(0.3)}>World-Class</motion.span>
                <motion.span className="line-accent" {...fadeUp(0.4)}>Eyelash</motion.span>
                <motion.span className="line-white" {...fadeUp(0.5)}>Manufacturer</motion.span>
              </h1>
              <motion.p className="hero-desc" {...fadeUp(0.6)}>
                Supplying premium handcrafted eyelashes to salons, distributors, and beauty brands worldwide. Private label &amp; OEM services with competitive wholesale pricing.
              </motion.p>
              <motion.div className="hero-btns" {...fadeUp(0.7)}>
                <motion.a href="#products" className="btn-primary" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>View Products →</motion.a>
                <motion.a href="#contact" className="btn-outline" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>Request Wholesale</motion.a>
              </motion.div>
              <motion.div className="hero-stats" {...fadeUp(0.85)}>
                {stats.map(({ number, label }) => (
                  <div key={label} className="hero-stat-item">
                    <p className="hero-stat-num">{number}</p>
                    <p className="hero-stat-label">{label}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Marquee */}
      <div className="marquee-band">
        <div className="marquee-track">
          {doubled.map((item, i) => (
            <span key={i} className="marquee-item">
              {item}<span className="marquee-dot" />
            </span>
          ))}
        </div>
      </div>
    </>
  )
}
