import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  // Disable parallax on mobile to prevent crop
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const y       = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 0 : 80])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const scale   = useTransform(scrollYProgress, [0, 1], [1, isMobile ? 1 : 1.06])
  const smoothY = useSpring(y, { damping: 20, stiffness: 80 })
  const smoothScale = useSpring(scale, { damping: 20, stiffness: 80 })

  const stats = [
    { number: '200+', label: 'Styles' },
    { number: '5',    label: 'Collections' },
    { number: '100',  label: 'MOQ Pairs' },
    { number: '24h',  label: 'Quote Reply' },
  ]

  return (
    <section
      id="hero"
      ref={ref}
      style={{
        minHeight: '100svh', marginTop: '-64px', paddingTop: '64px',
        position: 'relative',
        overflow: 'hidden',
        padding: 0,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Background image — no negative inset on mobile */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          y: smoothY,
          scale: smoothScale,
          backgroundImage: `url(/hero-lashes.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `linear-gradient(
          110deg,
          rgba(13,30,42,0.85) 0%,
          rgba(13,30,42,0.60) 50%,
          rgba(13,30,42,0.20) 80%,
          transparent 100%
        )`,
        pointerEvents: 'none',
      }} />

      {/* Bottom fade */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '160px',
        background: 'linear-gradient(to top, rgba(246,250,251,1) 0%, transparent 100%)',
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <motion.div style={{ opacity, width: '100%', position: 'relative', zIndex: 2 }}>
        <div className="container">
          <div className="hero-content">

            <motion.p className="hero-eyebrow" {...fadeUp(0.2)}>
              <span className="hero-eyebrow-line" />
              Premium Wholesale Lashes
            </motion.p>

            <h1 className="hero-title">
              <motion.span {...fadeUp(0.3)} style={{ color: '#fff', display: 'block' }}>
                World-Class
              </motion.span>
              <motion.span {...fadeUp(0.4)} style={{ color: 'var(--teal-light)', fontStyle: 'italic', display: 'block' }}>
                Eyelash
              </motion.span>
              <motion.span {...fadeUp(0.5)} style={{ color: '#fff', display: 'block' }}>
                Manufacturer
              </motion.span>
            </h1>

            <motion.p className="hero-desc" {...fadeUp(0.6)}>
              Supplying premium handcrafted eyelashes to salons, distributors,
              and beauty brands worldwide. Private label & OEM services available
              with competitive wholesale pricing.
            </motion.p>

            <motion.div className="hero-cta-group" {...fadeUp(0.7)}>
              <motion.a
                href="#products"
                className="btn-primary hero-btn-primary"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                View Products <span>→</span>
              </motion.a>
              <motion.a
                href="#contact"
                className="btn-outline hero-btn-outline"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Request Wholesale
              </motion.a>
            </motion.div>

            {/* Stats — 2x2 on mobile, 4 col on desktop */}
            <motion.div className="hero-stats" {...fadeUp(0.85)}>
              {stats.map(({ number, label }) => (
                <div key={label} className="hero-stat">
                  <p className="hero-stat-num">{number}</p>
                  <p className="hero-stat-label">{label}</p>
                </div>
              ))}
            </motion.div>

          </div>
        </div>
      </motion.div>
    </section>
  )
}
