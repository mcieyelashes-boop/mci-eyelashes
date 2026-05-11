import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const testimonials = [
  { name: 'Sarah Mitchell',  role: 'Owner, Luxe Lash Studio',  country: 'Austin, TX',           text: "We switched to MCI 8 months ago. Night and day difference. Our Soft Touch reorder rate with clients is up 40%.", order: '500 pairs/month · Soft Touch + 3D Luxe', stars: 5 },
  { name: 'Emma Dubois',     role: 'Beauty Distributor',        country: 'Paris, France',         text: "I supply 23 salons across France. MCI is the only wholesale partner where I've never had a quality complaint.", order: '1,200 pairs/month · Mixed collections', stars: 5 },
  { name: 'Yuki Tanaka',     role: 'CEO, Sakura Beauty Co.',    country: 'Tokyo, Japan',          text: "Our private label launch exceeded every expectation. Our branded lashes are now our top SKU — 3x reorder in 6 months.", order: 'Private label · 1,000 units · Human Hair', stars: 5 },
  { name: 'Amara Osei',      role: 'Beauty Brand Founder',      country: 'Accra, Ghana',          text: "The Under Lashes collection is unique — none of our competitors stock it. It's become our differentiator.", order: '300 pairs/month · Under Lashes + Faux Mink', stars: 5 },
  { name: 'Priya Sharma',    role: 'Salon Chain Director',      country: 'Mumbai, India',         text: "MCI supplies our 12 salon locations. Identical quality whether I order 100 or 1,000 pairs. That reliability lets me scale.", order: '800 pairs/month · Soft Touch series', stars: 5 },
  { name: 'Sophie van Berg', role: 'Online Beauty Retailer',    country: 'Amsterdam, Netherlands',text: "Fast shipping to Europe, beautiful packaging, and a product my customers keep re-ordering. 4.9-star rating across 600+ reviews.", order: '400 pairs/month · 3D Luxe + Faux Mink', stars: 5 },
  { name: 'Natalia Kovács',  role: 'Lash Educator & Artist',    country: 'Budapest, Hungary',     text: "I teach 200+ students per year. MCI lashes are the only ones I recommend for training — the tapered ends make technique so easy to demonstrate.", order: '150 pairs/month · Soft Touch Natural', stars: 5 },
  { name: 'Isabella Costa',  role: 'Med Spa Director',          country: 'São Paulo, Brazil',     text: "When we switched to MCI Human Hair lashes, we saw a 28% increase in lash service bookings within 2 months.", order: '200 pairs/month · Classic Human Hair', stars: 5 },
]

const allTestimonials = [...testimonials, ...testimonials]

function TestimonialCard({ item }) {
  return (
    <div className="t-card" style={{ position: 'relative' }}>
      <div className="t-big-quote" style={{ fontFamily: "'Cormorant Garamond',serif" }}>"</div>
      <div className="t-stars">{Array.from({ length: item.stars }).map((_, i) => <span key={i} className="t-star">★</span>)}</div>
      <p className="t-text">"{item.text}"</p>
      <div className="t-order">{item.order}</div>
      <div className="t-footer">
        <div className="t-avatar" style={{ fontFamily: "'Cormorant Garamond',serif" }}>{item.name[0]}</div>
        <div>
          <p className="t-name">{item.name}</p>
          <p className="t-role">{item.role}</p>
          <p className="t-country">{item.country}</p>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <section ref={ref} className="testimonials-section">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <p className="section-label light">What Buyers Say</p>
          <h2 className="section-title">Trusted <span className="accent-light">Worldwide</span></h2>
          <p className="section-subtitle" style={{ marginBottom: 0 }}>From independent studios to multi-location salon chains — real results from real wholesale partners.</p>
        </motion.div>
      </div>

      <div className="t-track-wrap">
        <div className="t-fade left" />
        <div className="t-fade right" />
        <div className="t-track">
          {allTestimonials.map((item, i) => <TestimonialCard key={i} item={item} />)}
        </div>
      </div>

      <div className="container">
        <div className="t-stats-row">
          {[{ num: '1,456+', label: 'Active Contacts' }, { num: '4.9★', label: 'Average Rating' }, { num: '30+', label: 'Countries Served' }, { num: '100%', label: 'Quality Tested' }].map((s, i) => (
            <div key={i} className="t-stat">
              <p className="t-stat-num" style={{ fontFamily: "'Cormorant Garamond',serif" }}>{s.num}</p>
              <p className="t-stat-label">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
