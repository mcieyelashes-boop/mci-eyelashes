import { useRef } from 'react'
import {
  motion,
  useScroll, useTransform,
  useMotionValue, useSpring,
} from 'framer-motion'

/* ── data ── */
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
  initial:    { opacity: 0, y: 36 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function Hero() {
  const sectionRef = useRef(null)

  /* Scroll fade-out */
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start','end start'] })
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const scrollY       = useTransform(scrollYProgress, [0, 1],   [0, 60])

  /* Mouse parallax */
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 55, damping: 18 })
  const springY = useSpring(mouseY, { stiffness: 55, damping: 18 })

  const handleMouseMove = (e) => {
    const { width, height, left, top } = sectionRef.current.getBoundingClientRect()
    mouseX.set((e.clientX - left - width  / 2) / (width  / 2))
    mouseY.set((e.clientY - top  - height / 2) / (height / 2))
  }
  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0) }

  /* 3-D tilt for robot image — top-level hooks */
  const robotRotateY = useTransform(springX, [-1, 1], [-16, 16])
  const robotRotateX = useTransform(springY, [-1, 1], [10, -10])
  const robotX       = useTransform(springX, [-1, 1], [-12, 12])
  const robotY       = useTransform(springY, [-1, 1], [-8, 8])
  const specX        = useTransform(springX, [-1, 1], [30, -30])
  const specY        = useTransform(springY, [-1, 1], [20, -20])

  /* Ambient parallax helpers */
  const px = (s) => useTransform(springX, [-1, 1], [-s, s])
  const py = (s) => useTransform(springY, [-1, 1], [-s, s])

  const doubled = [...MARQUEE, ...MARQUEE]

  return (
    <>
      <section
        id="hero"
        ref={sectionRef}
        className="hero-section"
        style={{ marginTop: '-70px' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* ── Ambient glows ── */}
        <motion.div
          style={{ x: px(18), y: py(14) }}
          animate={{ scale: [1, 1.12, 1], opacity: [.06, .10, .06] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="hero-orb"
        />
        <div className="hero-orb hero-orb-2" />

        {/* ── Dot grid ── */}
        <div className="hero-dot-grid" />

        {/* ══════════════════════════════════════════
            ROBOT IMAGE — right side, full 3-D stage
        ══════════════════════════════════════════ */}
        <div className="hero-robot-stage">

          {/* Perspective wrapper */}
          <div className="hero-robot-perspective">

            {/* Tilting + floating card */}
            <motion.div
              className="hero-robot-card"
              style={{
                rotateY: robotRotateY,
                rotateX: robotRotateX,
                x: robotX,
                y: robotY,
              }}
              animate={{ y: [0, -18, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            >
              <img
                src="/hero-robot.jpg"
                alt=""
                className="hero-robot-img"
                draggable={false}
              />

              {/* Specular highlight shifts opposite to tilt */}
              <motion.div
                className="hero-robot-specular"
                style={{ x: specX, y: specY }}
              />

              {/* Edge blends */}
              <div className="hero-robot-fade-bottom" />
              <div className="hero-robot-fade-left-edge" />
            </motion.div>

          </div>

          {/* Glow pool beneath */}
          <motion.div
            className="hero-robot-glow-pool"
            animate={{ opacity: [0.5, 0.85, 0.5], scaleX: [1, 1.2, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* ── tagline — enters after 1 s ── */}
          <motion.p
            className="hero-robot-tagline"
            initial={{ opacity: 0, y: 32, filter: 'blur(12px)' }}
            animate={{ opacity: 1, y: 0,  filter: 'blur(0px)'  }}
            transition={{ delay: 1, duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          >
            robot need lashes too
          </motion.p>

        </div>

        {/* ── Left content fade ── */}
        <div className="hero-fade-left" />

        {/* ── Text content ── */}
        <motion.div
          style={{ opacity: scrollOpacity, y: scrollY, width: '100%', position: 'relative', zIndex: 5 }}
        >
          <div className="container">
            <div className="hero-content">
              <motion.p className="hero-eyebrow" {...fadeUp(0.15)}>
                <span className="hero-eyebrow-line" />Premium Wholesale Lashes
              </motion.p>

              <h1 className="hero-title">
                <motion.span className="line-white"  {...fadeUp(0.25)}>World-Class</motion.span>
                <motion.span className="line-accent" {...fadeUp(0.38)}>Eyelash</motion.span>
                <motion.span className="line-white"  {...fadeUp(0.50)}>Manufacturer</motion.span>
              </h1>

              <motion.p className="hero-desc" {...fadeUp(0.62)}>
                Supplying premium handcrafted eyelashes to salons, distributors, and beauty
                brands worldwide. Private label &amp; OEM services with competitive wholesale pricing.
              </motion.p>

              <motion.div className="hero-btns" {...fadeUp(0.74)}>
                <motion.a href="#products" className="btn-primary"
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  View Products →
                </motion.a>
                <motion.a href="#contact" className="btn-outline"
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                  Request Wholesale
                </motion.a>
              </motion.div>

              <motion.div className="hero-stats" {...fadeUp(0.88)}>
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
