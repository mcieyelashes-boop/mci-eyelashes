import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 36 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 120])
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08])
  const smoothY = useSpring(y, { damping: 20, stiffness: 80 })
  const smoothScale = useSpring(scale, { damping: 20, stiffness: 80 })

  return (
    <section
      id="hero"
      ref={ref}
      style={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        padding: 0,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Parallax background image */}
      <motion.div
        style={{
          position: 'absolute',
          inset: '-10%',
          y: smoothY,
          scale: smoothScale,
          backgroundImage: `url(/hero-lashes.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          /* Fallback gradient if image not yet placed */
          background: `url(/hero-lashes.jpg) center/cover no-repeat,
            linear-gradient(135deg, #B8E6EE 0%, #7DCFDD 30%, #48B8CA 60%, #1A7A8A 100%)`,
        }}
      />

      {/* Left gradient — for text readability */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `linear-gradient(
          105deg,
          rgba(13,30,42,0.82) 0%,
          rgba(13,30,42,0.65) 45%,
          rgba(13,30,42,0.15) 70%,
          transparent 100%
        )`,
        pointerEvents: 'none',
      }} />

      {/* Top vignette for navbar */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '180px',
        background: 'linear-gradient(to bottom, rgba(13,30,42,0.5) 0%, transparent 100%)',
        pointerEvents: 'none',
      }} />

      {/* Bottom fade to white */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '200px',
        background: 'linear-gradient(to top, rgba(246,250,251,1) 0%, rgba(246,250,251,0.3) 60%, transparent 100%)',
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <motion.div style={{ opacity, width: '100%', position: 'relative', zIndex: 2 }}>
        <div className="container">
          <div style={{
            maxWidth: '620px',
            paddingTop: '120px',
            paddingBottom: '120px',
          }}>
            <motion.p
              className="section-label"
              {...fadeUp(0.2)}
              style={{
                fontSize: '10px',
                letterSpacing: '5px',
                textTransform: 'uppercase',
                color: 'var(--teal-light)',
                marginBottom: '18px',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
              }}
            >
              <span style={{ display: 'inline-block', width: '30px', height: '1px', background: 'var(--teal-light)', opacity: 0.7 }} />
              Premium Lash Manufacturer
            </motion.p>

            <motion.h1
              {...fadeUp(0.35)}
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(52px, 7vw, 108px)',
                lineHeight: 0.95,
                color: '#fff',
                fontWeight: 300,
                marginBottom: '6px',
              }}
            >
              World-Class
            </motion.h1>
            <motion.h1
              {...fadeUp(0.45)}
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(52px, 7vw, 108px)',
                lineHeight: 0.95,
                color: 'var(--teal-light)',
                fontStyle: 'italic',
                fontWeight: 300,
                marginBottom: '6px',
              }}
            >
              Eyelash
            </motion.h1>
            <motion.h1
              {...fadeUp(0.55)}
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(52px, 7vw, 108px)',
                lineHeight: 0.95,
                color: '#fff',
                fontWeight: 300,
                marginBottom: '42px',
              }}
            >
              Manufacturer
            </motion.h1>

            <motion.p
              {...fadeUp(0.65)}
              style={{
                fontSize: '14px',
                color: 'rgba(255,255,255,0.65)',
                lineHeight: 2,
                maxWidth: '440px',
                letterSpacing: '0.3px',
                marginBottom: '52px',
              }}
            >
              Supplying premium handcrafted eyelashes to salons, distributors,
              and beauty brands worldwide. Private label & OEM services available
              with competitive wholesale pricing.
            </motion.p>

            <motion.div
              {...fadeUp(0.75)}
              style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}
            >
              <motion.a
                href="#products"
                className="btn-primary"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{ background: 'var(--teal)', color: '#fff' }}
              >
                View Products
                <span className="btn-arrow">→</span>
              </motion.a>
              <motion.a
                href="#contact"
                className="btn-outline--light btn-outline"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Request Wholesale
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div
              {...fadeUp(0.9)}
              style={{
                display: 'flex',
                gap: '40px',
                marginTop: '72px',
                paddingTop: '36px',
                borderTop: '1px solid rgba(255,255,255,0.15)',
                flexWrap: 'wrap',
              }}
            >
              {[
                { number: '500+', label: 'Global Partners' },
                { number: '50+', label: 'Countries' },
                { number: '15+', label: 'Product Lines' },
                { number: '10M+', label: 'Units Shipped' },
              ].map(({ number, label }) => (
                <div key={label}>
                  <p style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: 'clamp(28px, 4vw, 46px)',
                    color: 'var(--teal-light)',
                    fontWeight: 300,
                    lineHeight: 1,
                    marginBottom: '6px',
                  }}>{number}</p>
                  <p style={{
                    fontSize: '9px',
                    letterSpacing: '2px',
                    color: 'rgba(255,255,255,0.4)',
                    textTransform: 'uppercase',
                  }}>
                    {label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        style={{
          position: 'absolute',
          bottom: '80px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px',
          zIndex: 3,
        }}
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: '1px', height: '55px',
            background: 'linear-gradient(to bottom, rgba(121,207,221,0.8), transparent)',
          }}
        />
        <span style={{
          fontSize: '8px',
          letterSpacing: '3px',
          color: 'rgba(255,255,255,0.3)',
          textTransform: 'uppercase',
        }}>
          Scroll
        </span>
      </motion.div>
    </section>
  )
}
