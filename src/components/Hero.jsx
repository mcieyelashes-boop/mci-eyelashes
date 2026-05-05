import { useRef } from 'react'
import {
  motion,
  useScroll, useTransform,
  useMotionValue, useSpring,
} from 'framer-motion'

/* ── marquee data ── */
const MARQUEE = [
  'Premium Wholesale Lashes','ISO 9001 Certified','200+ Styles',
  'Private Label Available','Ships to 50+ Countries','MOQ 100 Pairs',
  'CE Certified','OEM Manufacturing','24h Quote Reply','Cruelty Free Options',
]

const STATS = [
  { number:'200+', label:'Styles' },
  { number:'5',    label:'Collections' },
  { number:'100',  label:'MOQ Pairs' },
  { number:'24h',  label:'Quote Reply' },
]

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 40 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function Hero() {
  const splashRef = useRef(null)

  /* Mouse parallax */
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 40, damping: 16 })
  const springY = useSpring(mouseY, { stiffness: 40, damping: 16 })

  const handleMouseMove = (e) => {
    const { width, height, left, top } = splashRef.current.getBoundingClientRect()
    mouseX.set((e.clientX - left - width  / 2) / (width  / 2))
    mouseY.set((e.clientY - top  - height / 2) / (height / 2))
  }
  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0) }

  /* 3-D tilt — subtle on full-screen image so edges don't show */
  const rotateY = useTransform(springX, [-1, 1], [-7, 7])
  const rotateX = useTransform(springY, [-1, 1], [4, -4])

  /* Specular light that shifts opposite to tilt */
  const specX = useTransform(springX, [-1, 1], [60, -60])
  const specY = useTransform(springY, [-1, 1], [40, -40])

  const doubled = [...MARQUEE, ...MARQUEE]

  return (
    <>
      {/* ═══════════════════════════════════════════════════════
          PAGE 1 — Full-screen robot image, 3-D motion, tagline
      ═══════════════════════════════════════════════════════ */}
      <section
        ref={splashRef}
        className="hero-splash"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Perspective shell */}
        <div className="hero-splash-perspective">

          {/* Tilting image card — slightly oversized to hide edges during tilt */}
          <motion.div
            className="hero-splash-card"
            style={{ rotateY, rotateX }}
          >
            <img
              src="/robot.jpeg"
              alt=""
              className="hero-splash-img"
              draggable={false}
            />

            {/* Specular sheen moves opposite to tilt */}
            <motion.div
              className="hero-splash-specular"
              style={{ x: specX, y: specY }}
            />

            {/* Dark vignette to ground the image */}
            <div className="hero-splash-vignette" />
          </motion.div>

        </div>

        {/* Tagline — blank for 1s, then glides in */}
        <motion.p
          className="hero-splash-tagline"
          initial={{ opacity: 0, y: 40, filter: 'blur(14px)' }}
          animate={{ opacity: 1, y: 0,  filter: 'blur(0px)'  }}
          transition={{ delay: 1, duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        >
          robot need lashes too
        </motion.p>

        {/* Scroll hint */}
        <motion.div
          className="hero-splash-scroll-hint"
          animate={{ y: [0, 8, 0], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
        >
          <div className="hero-splash-scroll-line" />
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════
          PAGE 2 — Brand content: headline, desc, CTAs, stats
      ═══════════════════════════════════════════════════════ */}
      <section id="hero" className="hero-section" style={{ marginTop: '-70px' }}>

        {/* Ambient glows */}
        <div className="hero-orb" style={{ width:'700px', height:'700px', top:'-200px', right:'5%',
          background:'radial-gradient(circle, rgba(72,184,202,.09) 0%, transparent 65%)',
          position:'absolute', borderRadius:'50%', pointerEvents:'none' }} />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-dot-grid" />
        <div className="hero-fade-left" />

        <motion.div
          style={{ width: '100%', position: 'relative', zIndex: 5 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="container">
            <div className="hero-content">

              {/* MCI EYELASHES — large gold display title */}
              <motion.h2
                className="hero-brand-title"
                initial={{ opacity: 0, y: 48 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
              >
                MCI <span className="hero-brand-title-thin">EYELASHES</span>
              </motion.h2>

              <motion.p className="hero-eyebrow" {...fadeUp(0.1)}>
                <span className="hero-eyebrow-line" />Premium Wholesale Lashes
              </motion.p>

              <h1 className="hero-title">
                <motion.span className="line-white"  {...fadeUp(0.20)}>World-Class</motion.span>
                <motion.span className="line-accent" {...fadeUp(0.33)}>Eyelash</motion.span>
                <motion.span className="line-white"  {...fadeUp(0.45)}>Manufacturer</motion.span>
              </h1>

              <motion.p className="hero-desc" {...fadeUp(0.56)}>
                Supplying premium handcrafted eyelashes to salons, distributors, and beauty
                brands worldwide. Private label &amp; OEM services with competitive wholesale pricing.
              </motion.p>

              <motion.div className="hero-btns" {...fadeUp(0.68)}>
                <motion.a href="#products" className="btn-primary"
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  View Products →
                </motion.a>
                <motion.a href="#contact" className="btn-outline"
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  Request Wholesale
                </motion.a>
              </motion.div>

              <motion.div className="hero-stats" {...fadeUp(0.80)}>
                {STATS.map(({ number, label }) => (
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

      {/* Marquee band */}
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
