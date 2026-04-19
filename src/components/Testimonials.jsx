import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'Owner, Luxe Lash Studio',
    country: '🇺🇸 Austin, TX',
    text: 'We switched to MCI 8 months ago after struggling with inconsistent curl retention from our previous supplier. Night and day difference. Our Soft Touch reorder rate with clients is up 40%.',
    stars: 5,
    order: '500 pairs/month · Soft Touch + 3D Luxe',
  },
  {
    name: 'Emma Dubois',
    role: 'Beauty Distributor',
    country: '🇫🇷 Paris, France',
    text: 'I supply 23 salons across France. MCI is the only wholesale partner where I've never had a quality complaint. The 7–10 day shipping to Europe is genuinely impressive.',
    stars: 5,
    order: '1,200 pairs/month · Mixed collections',
  },
  {
    name: 'Yuki Tanaka',
    role: 'CEO, Sakura Beauty Co.',
    country: '🇯🇵 Tokyo, Japan',
    text: 'Our private label launch with MCI exceeded every expectation. Denis guided us through the process personally. Our branded lashes are now our top SKU — 3x reorder in 6 months.',
    stars: 5,
    order: 'Private label · 1,000 units · Human Hair',
  },
  {
    name: 'Amara Osei',
    role: 'Beauty Brand Founder',
    country: '🇬🇭 Accra, Ghana',
    text: 'Starting our beauty brand with MCI was the best decision we made. The Under Lashes collection is unique — none of our competitors stock it. It's become our differentiator.',
    stars: 5,
    order: '300 pairs/month · Under Lashes + Faux Mink',
  },
  {
    name: 'Priya Sharma',
    role: 'Salon Chain Director',
    country: '🇮🇳 Mumbai, India',
    text: 'MCI supplies our 12 salon locations. What I value most is batch consistency — the quality is identical whether I order 100 or 1,000 pairs. That reliability lets me scale confidently.',
    stars: 5,
    order: '800 pairs/month · Soft Touch series',
  },
  {
    name: 'Natalia Kovács',
    role: 'Lash Educator & Artist',
    country: '🇭🇺 Budapest, Hungary',
    text: 'I teach 200+ students per year. MCI lashes are the only ones I recommend for training — the tapered ends make technique correction so much easier to demonstrate.',
    stars: 5,
    order: '150 pairs/month · Soft Touch Natural',
  },
  {
    name: 'Sophie van Berg',
    role: 'Online Beauty Retailer',
    country: '🇳🇱 Amsterdam, Netherlands',
    text: 'Fast shipping to Europe, beautiful packaging, and a product my customers keep re-ordering. 4.9-star rating across 600+ reviews. MCI is the backbone of our lash category.',
    stars: 5,
    order: '400 pairs/month · 3D Luxe + Faux Mink',
  },
  {
    name: 'Isabella Costa',
    role: 'Med Spa Director',
    country: '🇧🇷 São Paulo, Brazil',
    text: 'Our aesthetics clients are discerning. When we switched to MCI Human Hair lashes, we saw a 28% increase in lash service bookings within 2 months. The quality speaks for itself.',
    stars: 5,
    order: '200 pairs/month · Classic Human Hair',
  },
]

const allTestimonials = [...testimonials, ...testimonials]

function TestimonialCard({ item }) {
  return (
    <div style={{
      width: '340px', flexShrink: 0,
      background: 'var(--white)',
      border: '1px solid var(--border-soft)',
      padding: '28px 26px',
      display: 'flex', flexDirection: 'column',
      position: 'relative', overflow: 'hidden',
      boxShadow: '0 2px 16px rgba(13,30,42,0.05)',
    }}>
      <div style={{
        position: 'absolute', top: '10px', right: '16px',
        fontFamily: 'Cormorant Garamond, serif', fontSize: '72px',
        color: 'rgba(72,184,202,0.07)', lineHeight: 1,
        pointerEvents: 'none', userSelect: 'none',
      }}>"</div>

      <div style={{ display: 'flex', gap: '3px', marginBottom: '14px' }}>
        {Array.from({ length: item.stars }).map((_, i) => (
          <span key={i} style={{ color: 'var(--teal)', fontSize: '13px' }}>★</span>
        ))}
      </div>

      <p style={{
        fontSize: '13px', color: 'var(--text-mid)', lineHeight: 1.85,
        marginBottom: '16px', fontStyle: 'italic', flex: 1,
      }}>
        "{item.text}"
      </p>

      {/* Order info badge */}
      <div style={{
        background: 'var(--off-white)',
        borderLeft: '2px solid var(--teal)',
        padding: '6px 10px',
        fontSize: '10px',
        color: 'var(--teal-dark)',
        letterSpacing: '.05em',
        marginBottom: '16px',
        fontWeight: 600,
      }}>
        {item.order}
      </div>

      <div style={{
        display: 'flex', alignItems: 'center', gap: '12px',
        paddingTop: '16px', borderTop: '1px solid var(--border-soft)',
      }}>
        <div style={{
          width: '36px', height: '36px', borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(72,184,202,0.2), rgba(72,184,202,0.06))',
          border: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          fontFamily: 'Cormorant Garamond, serif', fontSize: '15px',
          color: 'var(--teal-dark)', fontWeight: 500,
        }}>
          {item.name[0]}
        </div>
        <div>
          <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-dark)', marginBottom: '2px' }}>
            {item.name}
          </p>
          <p style={{ fontSize: '10px', color: 'var(--text-light)', letterSpacing: '.03em' }}>
            {item.role}
          </p>
          <p style={{ fontSize: '10px', color: 'var(--teal-dark)', marginTop: '1px' }}>
            {item.country}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} style={{ padding: '100px 0', background: 'var(--off-white)', overflow: 'hidden' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ marginBottom: '56px' }}
        >
          <p className="section-label">What Buyers Say</p>
          <h2 className="section-title">Trusted by <span>Salons & Distributors</span> Worldwide</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-mid)', lineHeight: 1.8, maxWidth: '520px', marginTop: '12px' }}>
            From independent lash studios to multi-location salon chains — real results from real wholesale partners.
          </p>
        </motion.div>
      </div>

      {/* Scrolling strip */}
      <div style={{ position: 'relative' }}>
        {/* Fade edges */}
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '80px', background: 'linear-gradient(to right, var(--off-white), transparent)', zIndex: 2, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '80px', background: 'linear-gradient(to left, var(--off-white), transparent)', zIndex: 2, pointerEvents: 'none' }} />

        <motion.div
          style={{ display: 'flex', gap: '20px', width: 'max-content' }}
          animate={{ x: [0, -(340 + 20) * testimonials.length] }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        >
          {allTestimonials.map((item, i) => (
            <TestimonialCard key={i} item={item} />
          ))}
        </motion.div>
      </div>

      {/* Stats row */}
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{
            display: 'flex', gap: '0', marginTop: '56px',
            borderTop: '1px solid var(--border-soft)',
            flexWrap: 'wrap',
          }}
        >
          {[
            { num: '1,456+', label: 'Active contacts' },
            { num: '4.9★', label: 'Average rating' },
            { num: '30+', label: 'Countries served' },
            { num: '100%', label: 'Quality tested' },
          ].map((s, i) => (
            <div key={i} style={{
              flex: '1', minWidth: '140px',
              padding: '28px 0',
              borderRight: i < 3 ? '1px solid var(--border-soft)' : 'none',
              paddingLeft: i > 0 ? '32px' : '0',
              textAlign: i === 0 ? 'left' : 'left',
            }}>
              <p style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(28px, 4vw, 40px)',
                color: 'var(--navy)', fontWeight: 300, lineHeight: 1,
                marginBottom: '6px',
              }}>{s.num}</p>
              <p style={{ fontSize: '10px', letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--text-light)' }}>
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
