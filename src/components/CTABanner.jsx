import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function CTABanner() {
  return (
    <section className="cta-banner">
      {/* background glow */}
      <div className="cta-banner-glow" />
      <div className="container">
        <motion.div
          className="cta-banner-inner"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="cta-banner-left">
            <p className="section-label light">Ready to Start?</p>
            <h2 className="cta-banner-title">
              Get Your Wholesale<br />
              <em>Price Sheet Today</em>
            </h2>
            <p className="cta-banner-sub">
              Our team responds within 24 hours with pricing, MOQ details, and a full product catalog tailored to your market and order volume.
            </p>
          </div>
          <div className="cta-banner-actions">
            <motion.a
              href="#contact"
              className="btn-primary"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Request Wholesale Pricing →
            </motion.a>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              <Link to="/catalogue" className="btn-outline">View Full Catalogue</Link>
            </motion.div>
            <div className="cta-trust-signals">
              <span className="cta-trust-item">✓ No commitment required</span>
              <span className="cta-trust-item">✓ 24h response</span>
              <span className="cta-trust-item">✓ MOQ from 100 pairs</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
