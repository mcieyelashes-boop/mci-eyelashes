import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const services = [
  {
    name: 'Classic Lashes',
    description: 'One extension per natural lash for a clean, polished look. Perfect for everyday elegance.',
    price: 'From $80',
    duration: '90 min',
    tag: 'Natural',
  },
  {
    name: 'Volume Lashes',
    description: 'Multiple ultra-fine extensions fanned out for a full, dramatic effect that lasts.',
    price: 'From $120',
    duration: '120 min',
    tag: 'Popular',
  },
  {
    name: 'Hybrid Lashes',
    description: 'The perfect blend of classic and volume for a textured, wispy appearance.',
    price: 'From $100',
    duration: '105 min',
    tag: 'Bestseller',
  },
  {
    name: 'Mega Volume',
    description: 'Maximum drama with the most voluminous fans — bold, striking, unforgettable.',
    price: 'From $150',
    duration: '150 min',
    tag: 'Glamour',
  },
  {
    name: 'Lash Lift & Tint',
    description: 'Curl and darken your natural lashes for a mascara-free, low-maintenance look.',
    price: 'From $60',
    duration: '60 min',
    tag: 'No Extensions',
  },
  {
    name: 'Infills / Touch Up',
    description: 'Maintain the fullness of your lashes every 2–3 weeks to keep them looking fresh.',
    price: 'From $50',
    duration: '60 min',
    tag: 'Maintenance',
  },
]

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export default function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="services" style={{ background: 'var(--dark)' }}>
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          ref={ref}
          style={{ marginBottom: '70px' }}
        >
          <p className="section-label">What We Offer</p>
          <h2 className="section-title">
            Our <span>Services</span>
          </h2>
          <p className="section-subtitle">
            Every set is handcrafted by our certified lash artists using only the finest materials for lasting beauty.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1px',
            background: 'var(--border)',
          }}
        >
          {services.map((service) => (
            <ServiceCard key={service.name} service={service} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function ServiceCard({ service }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ backgroundColor: 'rgba(201,168,76,0.04)' }}
      style={{
        background: 'var(--dark)',
        padding: '40px 36px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        cursor: 'default',
        transition: 'background 0.3s',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Tag */}
      <span style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        fontSize: '9px',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        color: 'var(--gold)',
        border: '1px solid var(--border)',
        padding: '4px 10px',
      }}>
        {service.tag}
      </span>

      <h3 style={{
        fontFamily: 'Cormorant Garamond, serif',
        fontSize: '28px',
        color: 'var(--white)',
        fontWeight: 400,
      }}>
        {service.name}
      </h3>

      <p style={{ fontSize: '13px', color: 'var(--gray)', lineHeight: 1.7 }}>
        {service.description}
      </p>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 'auto',
        paddingTop: '20px',
        borderTop: '1px solid var(--border)',
      }}>
        <span style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: '24px',
          color: 'var(--gold)',
          fontWeight: 400,
        }}>
          {service.price}
        </span>
        <span style={{ fontSize: '11px', color: 'var(--gray)', letterSpacing: '1px' }}>
          {service.duration}
        </span>
      </div>
    </motion.div>
  )
}
