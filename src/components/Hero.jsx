import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

const MARQUEE_ITEMS = [
  'Premium Wholesale Lashes', 'ISO 9001 Certified', '200+ Styles',
  'Private Label Available', 'Ships to 50+ Countries', 'MOQ 100 Pairs',
  'CE Certified', 'OEM Manufacturing', '24h Quote Reply', 'Cruelty Free Options',
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS]
  const stats = [
    { number: '200+', label: 'Styles' },
    { number: '5',    label: 'Collections' },
    { number: '100',  label: 'MOQ Pairs' },
    { number: '24h',  label: 'Quote Reply' },
  ]

  const stats = [
    { number: '200+', label: 'Styles' },
    { number: '5',    label: 'Collections' },
    { number: '100',  label: 'MOQ Pairs' },
    { number: '24h',  label: 'Quote Reply' },
  ]

  return (
    <>
      {/* Hero */}
      <section id="hero" className="hero-section" ref={ref} style={{ marginTop: '-70px' }}>
        {/* Background */}
        <div className="hero-bg-grid" />
        <div className="hero-orb" style={{ width: '900px', height: '900px', top: '-280px', right: '-200px', background: 'radial-gradient(circle, rgba(72,184,202,.085) 0%, transparent 65%)', filter: 'blur(1px)' }} />
        <div className="hero-orb" style={{ width: '500px', height: '500px', bottom: '-100px', left: '28%', background: 'radial-gradient(circle, rgba(45,151,169,.06) 0%, transparent 70%)' }} />

        {/* Lash illustration */}
        <div className="lash-illustration">
          <svg viewBox="0 0 600 700" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%', position: 'absolute', top: 0, right: 0 }}>
            <defs>
              <radialGradient id="lashGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#48B8CA" stopOpacity=".18"/>
                <stop offset="100%" stopColor="#48B8CA" stopOpacity="0"/>
              </radialGradient>
              <filter id="softBlur"><feGaussianBlur stdDeviation="2.5"/></filter>
            </defs>
            <ellipse cx="320" cy="360" rx="220" ry="240" fill="url(#lashGlow)"/>
            <path d="M 60 370 Q 320 290 560 370" stroke="#48B8CA" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity=".55"/>
            {/* Upper lashes */}
            {[
              ['M 96 363 Q 80 310 72 272', '50'],
              ['M 130 350 Q 118 294 114 254', '55'],
              ['M 170 337 Q 162 278 161 236', '60'],
              ['M 215 324 Q 212 262 214 218', '65'],
              ['M 265 315 Q 266 252 270 206', '70'],
              ['M 320 312 Q 322 248 326 200', '75'],
              ['M 375 315 Q 380 252 387 204', '70'],
              ['M 425 324 Q 434 262 442 218', '65'],
              ['M 468 337 Q 480 278 490 236', '60'],
              ['M 505 350 Q 520 294 528 254', '55'],
              ['M 534 363 Q 550 310 556 272', '50'],
            ].map(([d, op], i) => (
              <path key={i} d={d} stroke="#79CFDD" strokeWidth={i === 5 ? 1.3 : 1.1} fill="none" strokeLinecap="round" opacity={parseFloat(op)/100}/>
            ))}
            {/* Tip glows */}
            {[
              [72,272,2,'40'],
              [114,254,2.2,'45'],
              [161,236,2.4,'50'],
              [214,218,2.6,'55'],
              [270,206,2.8,'60'],
              [326,200,3,'65'],
              [387,204,2.8,'60'],
              [442,218,2.6,'55'],
              [490,236,2.4,'50'],
              [528,254,2.2,'45'],
              [556,272,2,'40'],
            ].map(([cx,cy,r,op],i) => (
              <circle key={i} cx={cx} cy={cy} r={r} fill={i===5?'#48B8CA':'#79CFDD'} opacity={parseFloat(op)/100} filter="url(#softBlur)"/>
            ))}
            {/* Lower lashes */}
            {[[120,378,448],[185,375,446],[260,372,444],[320,371,443],[380,372,444],[455,375,446],[510,378,448]].map(([x1,y1,y2],i)=>(
              <path key={i} d={`M ${x1} ${y1} Q ${x1+(i<3?-4:i>3?4:0)} ${(y1+y2)/2} ${x1+(i<3?-5:i>3?5:0)} ${y2}`} stroke="rgba(72,184,202,.22)" strokeWidth="1" fill="none" strokeLinecap="round"/>
            ))}
            {/* Floating product card */}
            <rect x="360" y="80" width="188" height="140" fill="rgba(17,31,44,.88)" stroke="rgba(72,184,202,.22)" strokeWidth="1"/>
            <text x="376" y="104" fontFamily="Montserrat,sans-serif" fontSize="8" fill="#48B8CA" letterSpacing="2" fontWeight="600">01 · BESTSELLER</text>
            <line x1="376" y1="112" x2="532" y2="112" stroke="rgba(72,184,202,.15)" strokeWidth="1"/>
            <text x="376" y="132" fontFamily="Cormorant Garamond,serif" fontSize="20" fill="white" fontWeight="300">Soft Touch</text>
            <text x="376" y="152" fontFamily="Cormorant Garamond,serif" fontSize="20" fill="white" fontWeight="300">Lashes</text>
            <text x="376" y="172" fontFamily="Montserrat,sans-serif" fontSize="8.5" fill="rgba(255,255,255,.38)" fontWeight="300">60+ styles · Korean fiber</text>
            <text x="376" y="188" fontFamily="Montserrat,sans-serif" fontSize="8.5" fill="rgba(255,255,255,.38)" fontWeight="300">Tapered-end technology</text>
            <text x="376" y="206" fontFamily="Montserrat,sans-serif" fontSize="8" fill="#48B8CA" letterSpacing="2" fontWeight="600">MOQ 100 PAIRS</text>
            {/* 5-star badge */}
            <rect x="420" y="490" width="90" height="72" fill="#48B8CA"/>
            <text x="465" y="522" fontFamily="Cormorant Garamond,serif" fontSize="24" fill="white" textAnchor="middle" fontWeight="400">5★</text>
            <text x="465" y="540" fontFamily="Montserrat,sans-serif" fontSize="7" fill="rgba(255,255,255,.85)" textAnchor="middle" letterSpacing="2" fontWeight="700">TOP RATED</text>
            {/* 50+ countries badge */}
            <rect x="98" y="475" width="110" height="68" fill="rgba(14,28,39,.96)" stroke="rgba(72,184,202,.18)" strokeWidth="1"/>
            <text x="153" y="505" fontFamily="Cormorant Garamond,serif" fontSize="28" fill="#79CFDD" textAnchor="middle" fontWeight="300">50+</text>
            <text x="153" y="523" fontFamily="Montserrat,sans-serif" fontSize="7.5" fill="rgba(255,255,255,.3)" textAnchor="middle" letterSpacing="2">COUNTRIES</text>
          </svg>
        </div>

        {/* Left gradient overlay */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(100deg, rgba(10,23,32,.98) 38%, rgba(10,23,32,.55) 65%, rgba(10,23,32,.1) 100%)', pointerEvents: 'none' }} />

        {/* Content */}
        <motion.div style={{ opacity, width: '100%', position: 'relative', zIndex: 5 }}>
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
                <motion.a href="#products" className="btn-primary" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>View Products →</motion.a>
                <motion.a href="#contact" className="btn-outline" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>Request Wholesale</motion.a>
              </motion.div>
              <motion.div className="hero-stats" {...fadeUp(0.85)}>
                {stats.map(({ number, label }) => (
                  <div key={label}>
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
