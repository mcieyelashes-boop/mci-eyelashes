import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const TRUST = [
  { icon: '✦', text: 'No commitment required' },
  { icon: '✦', text: '24h response guarantee' },
  { icon: '✦', text: 'MOQ from 100 pairs' },
  { icon: '✦', text: 'Ships to 50+ countries' },
]

export default function CTABanner() {
  return (
    <section className="cta-banner">
      {/* Layered background glows */}
      <div className="cta-banner-glow cta-banner-glow--1" />
      <div className="cta-banner-glow cta-banner-glow--2" />

      {/* Decorative corner lines */}
      <div className="cta-corner cta-corner--tl" />
      <div className="cta-corner cta-corner--br" />

      <div className="container">
        <motion.div
          className="cta-banner-inner"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Left: copy */}
          <div className="cta-banner-left">
            <motion.p
              className="section-label light"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Ready to Start?
            </motion.p>
            <motion.h2
              className="cta-banner-title"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Get Your Wholesale<br />
              <em>Price Sheet Today</em>
            </motion.h2>
            <motion.p
              className="cta-banner-sub"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.35 }}
            >
              Our team responds within 24 hours with pricing, MOQ details, and a full
              product catalog tailored to your market and order volume.
            </motion.p>

            {/* Trust signals grid */}
            <motion.div
              className="cta-trust-grid"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.45 }}
            >
              {TRUST.map(({ icon, text }) => (
                <div key={text} className="cta-trust-pill">
                  <span className="cta-trust-icon">{icon}</span>
                  <span>{text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: actions */}
          <motion.div
            className="cta-banner-actions"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.3 }}
          >
            {/* Decorative stat block */}
            <div className="cta-stat-block">
              <div className="cta-stat">
                <span className="cta-stat-num">24h</span>
                <span className="cta-stat-label">Quote Reply</span>
              </div>
              <div className="cta-stat-divider" />
              <div className="cta-stat">
                <span className="cta-stat-num">500+</span>
                <span className="cta-stat-label">Global Partners</span>
              </div>
              <div className="cta-stat-divider" />
              <div className="cta-stat">
                <span className="cta-stat-num">50+</span>
                <span className="cta-stat-label">Countries</span>
              </div>
            </div>

            <motion.a
              href="#contact"
              className="btn-primary cta-btn-primary"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Request Wholesale Pricing →
            </motion.a>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              <Link to="/catalogue" className="btn-outline cta-btn-outline">
                View Full Catalogue
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
