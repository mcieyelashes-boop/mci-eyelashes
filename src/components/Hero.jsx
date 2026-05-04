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

const COLLECTIONS = [
  { id:'01', name:'Soft Touch',  sub:'60+ styles · Korean fiber',   color:'#48B8CA', x: 55, y: 18, z: 0,   rot:-8  },
  { id:'02', name:'3D Luxe',     sub:'20 styles · Multi-layer fan', color:'#79CFDD', x: 72, y: 44, z:-30,  rot: 5  },
  { id:'03', name:'Faux Mink',   sub:'30 styles · Protein silk',    color:'#2D97A9', x: 42, y: 65, z:-55,  rot:-4  },
  { id:'04', name:'Human Hair',  sub:'15 styles · Ultra natural',   color:'#48B8CA', x: 68, y: 72, z:-80,  rot: 9  },
  { id:'05', name:'Under Lash',  sub:'10 styles · Lower lash',      color:'#79CFDD', x: 50, y: 88, z:-110, rot:-6  },
]

const STATS = [
  { number:'200+', label:'Styles' },
  { number:'5',    label:'Collections' },
  { number:'100',  label:'MOQ Pairs' },
  { number:'24h',  label:'Quote Reply' },
]

const LASH_PATHS = [
  'M 0 50 Q 40 5  90 0',
  'M 0 50 Q 45 8  95 2',
  'M 0 50 Q 35 12 85 8',
  'M 0 50 Q 42 3  88 -4',
  'M 0 50 Q 50 10 100 5',
  'M 0 50 Q 38 6  92 1',
  'M 0 50 Q 44 14 94 10',
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
  const springX = useSpring(mouseX, { stiffness: 60, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 60, damping: 20 })

  const handleMouseMove = (e) => {
    const { width, height, left, top } = sectionRef.current.getBoundingClientRect()
    mouseX.set((e.clientX - left - width  / 2) / (width  / 2))
    mouseY.set((e.clientY - top  - height / 2) / (height / 2))
  }
  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0) }

  /* Parallax layer builders */
  const px = (strength) => useTransform(springX, [-1, 1], [-strength, strength])
  const py = (strength) => useTransform(springY, [-1, 1], [-strength, strength])

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
        {/* ── Ambient background glows ── */}
        <motion.div style={{ x: px(18), y: py(14) }} className="hero-orb"
          animate={{ scale: [1, 1.12, 1], opacity: [.07, .11, .07] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          css-hack="ignore"
          s={{ width:'800px', height:'800px', top:'-260px', right:'8%',
               background:'radial-gradient(circle, rgba(72,184,202,.1) 0%, transparent 65%)',
               position:'absolute', borderRadius:'50%', pointerEvents:'none' }}
        />
        <div className="hero-orb" style={{ width:'500px',height:'500px',bottom:'-80px',left:'25%',background:'radial-gradient(circle,rgba(45,151,169,.055) 0%,transparent 70%)',position:'absolute',borderRadius:'50%',pointerEvents:'none' }} />

        {/* ── Dot grid ── */}
        <div className="hero-dot-grid" />

        {/* ── 3D Floating collection scene ── */}
        <div className="hero-scene">
          {/* Glowing center orb */}
          <motion.div
            className="hero-scene-orb"
            animate={{ scale: [1, 1.08, 1], opacity: [.55, .75, .55] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ x: px(20), y: py(16) }}
          />

          {/* Lash stroke decorations */}
          {LASH_PATHS.map((d, i) => (
            <motion.svg
              key={i}
              viewBox="0 0 100 55"
              className="hero-lash-deco"
              style={{
                position: 'absolute',
                width:  `${60 + i * 14}px`,
                opacity: 0.08 + i * 0.025,
                left:   `${28 + i * 8}%`,
                top:    `${10 + i * 10}%`,
                x: px(8 + i * 3),
                y: py(6 + i * 2),
              }}
              initial={{ opacity: 0, pathLength: 0 }}
              animate={{ opacity: 0.08 + i * 0.025 }}
              transition={{ duration: 1.5, delay: 0.1 * i }}
            >
              <motion.path
                d={d}
                stroke="#48B8CA"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.8, delay: 0.3 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              />
            </motion.svg>
          ))}

          {/* Collection cards floating in 3D space */}
          {COLLECTIONS.map((col, i) => (
            <motion.div
              key={col.id}
              className="hero-col-card"
              style={{
                left: `${col.x}%`,
                top:  `${col.y}%`,
                x: px(14 + i * 5),
                y: py(10 + i * 4),
                '--card-color': col.color,
              }}
              initial={{ opacity: 0, scale: 0.7, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0,
                rotateZ: [col.rot, col.rot + 1.5, col.rot],
              }}
              transition={{
                opacity: { duration: 0.7, delay: 0.4 + i * 0.15, ease: [0.22,1,.36,1] },
                scale:   { duration: 0.7, delay: 0.4 + i * 0.15, ease: [0.22,1,.36,1] },
                y:       { duration: 0.7, delay: 0.4 + i * 0.15, ease: [0.22,1,.36,1] },
                rotateZ: { duration: 5 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 },
              }}
              whileHover={{ scale: 1.08, zIndex: 10 }}
            >
              <span className="hero-col-id">{col.id}</span>
              <span className="hero-col-name">{col.name}</span>
              <span className="hero-col-sub">{col.sub}</span>
              <div className="hero-col-bar" />
            </motion.div>
          ))}

          {/* Floating stat badge — top right */}
          <motion.div
            className="hero-scene-badge"
            style={{ x: px(-22), y: py(14), top: '12%', right: '4%' }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 1.2, ease: [0.22,1,.36,1] }}
          >
            <span className="hero-badge-num">5★</span>
            <span className="hero-badge-lbl">TOP RATED</span>
          </motion.div>

          {/* Floating stat badge — bottom */}
          <motion.div
            className="hero-scene-badge glass"
            style={{ x: px(18), y: py(-12), bottom: '14%', right: '18%' }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 1.35, ease: [0.22,1,.36,1] }}
          >
            <span className="hero-badge-num">50+</span>
            <span className="hero-badge-lbl">COUNTRIES</span>
          </motion.div>
        </div>

        {/* ── Left fade ── */}
        <div className="hero-fade-left" />

        {/* ── Text content (scroll fade + parallax) ── */}
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
