import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const testimonials = [
  { name: 'Sarah Mitchell', role: 'Owner, Luxe Lash Studio', country: 'United States', text: 'MCI Eyelashes has been our supplier for 3 years. The consistency in quality and the speed of delivery is unmatched. Our clients notice the difference immediately.', stars: 5 },
  { name: 'Emma Dubois', role: 'Beauty Distributor', country: 'France', text: "We've tried dozens of lash manufacturers. MCI is simply in a different league — premium product, exceptional packaging, and they truly care about your business.", stars: 5 },
  { name: 'Yuki Tanaka', role: 'CEO, Sakura Beauty Co.', country: 'Japan', text: 'Our private label lashes from MCI have become our top-selling product. The custom packaging quality exceeded every expectation. Highly recommend.', stars: 5 },
  { name: 'Natalia Kovács', role: 'Lash Artist & Educator', country: 'Hungary', text: 'As someone who teaches lash application, I need products I can trust. MCI delivers perfect curl consistency and incredible softness every single time.', stars: 5 },
  { name: 'Amara Osei', role: 'Beauty Brand Founder', country: 'Ghana', text: 'Starting our beauty brand with MCI was the best decision. Their OEM team guided us through every step. Now we ship our own branded lashes across Africa.', stars: 5 },
  { name: 'Priya Sharma', role: 'Salon Chain Director', country: 'India', text: 'MCI supplies our 12 salon locations. The quality is perfectly consistent across every batch — that reliability is everything when you\'re scaling a business.', stars: 5 },
  { name: 'Sophie van Berg', role: 'Online Beauty Retailer', country: 'Netherlands', text: 'Fast shipping to Europe, beautiful packaging, and a product my customers keep re-ordering. MCI Eyelashes is the backbone of our lash category.', stars: 5 },
  { name: 'Isabella Costa', role: 'Aesthetics Trainer', country: 'Brazil', text: 'I recommend MCI to every student I train. The lash quality teaches proper technique and the clients love the results. A true professional-grade product.', stars: 5 },
]

const allTestimonials = [...testimonials, ...testimonials]

function TestimonialCard({ item }) {
  return (
    <div style={{
      width: '360px', flexShrink: 0,
      background: 'var(--white)',
      border: '1px solid var(--border-soft)',
      padding: '36px 32px',
      display: 'flex', flexDirection: 'column',
      position: 'relative', overflow: 'hidden',
      boxShadow: '0 2px 20px rgba(13,30,42,0.05)',
    }}>
      {/* Quote mark */}
      <div style={{
        position: 'absolute', top: '12px', right: '20px',
        fontFamily: 'Cormorant Garamond, serif', fontSize: '80px',
        color: 'rgba(72,184,202,0.08)', lineHeight: 1,
        pointerEvents: 'none', userSelect: 'none',
      }}>"</div>

      {/* Stars */}
      <div style={{ display: 'flex', gap: '3px', marginBottom: '16px' }}>
        {Array.from({ length: item.stars }).map((_, i) => (
          <span key={i} style={{ color: 'var(--teal)', fontSize: '14px' }}>★</span>
        ))}
      </div>

      <p style={{
        fontSize: '14px', color: 'var(--text-mid)', lineHeight: 1.85,
        marginBottom: '28px', fontStyle: 'italic', flex: 1,
      }}>
        "{item.text}"
      </p>

      <div style={{
        display: 'flex', alignItems: 'center', gap: '14px',
        paddingTop: '20px', borderTop: '1px solid var(--border-soft)',
      }}>
        <div style={{
          width: '40px', height: '40px', borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(72,184,202,0.25), rgba(72,184,202,0.08))',
          border: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          fontFamily: 'Cormorant Garamond, serif', fontSize: '16px', color: 'var(--teal-dark)', fontWeight: 500,
        }}>
          {item.name[0]}
        </div>
        <div>
          <p style={{ fontSize: '13px', color: 'var(--text-dark)', fontWeight: 500, marginBottom: '2px' }}>{item.name}</p>
          <p style={{ fontSize: '10px', color: 'var(--text-light)', letterSpacing: '0.5px' }}>
            {item.role} · {item.country}
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
    <section id="testimonials" style={{ background: 'var(--off-white)', overflow: 'hidden' }}>
      <div className="container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: '70px', textAlign: 'center' }}
        >
          <p className="section-label" style={{ justifyContent: 'center' }}>Client Love</p>
          <h2 className="section-title">
            Trusted by <span>Beauty Professionals</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Join 500+ salons, distributors, and beauty brands who rely on MCI for their lash supply.
          </p>
        </motion.div>
      </div>

      {/* Row 1 — forward */}
      <div style={{
        maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        marginBottom: '16px',
      }}>
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          style={{ display: 'flex', gap: '16px', width: 'max-content' }}
        >
          {allTestimonials.map((item, i) => (
            <TestimonialCard key={`r1-${i}`} item={item} />
          ))}
        </motion.div>
      </div>

      {/* Row 2 — reverse */}
      <div style={{
        maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
      }}>
        <motion.div
          animate={{ x: ['-50%', '0%'] }}
          transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
          style={{ display: 'flex', gap: '16px', width: 'max-content' }}
        >
          {[...allTestimonials].reverse().map((item, i) => (
            <TestimonialCard key={`r2-${i}`} item={item} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
