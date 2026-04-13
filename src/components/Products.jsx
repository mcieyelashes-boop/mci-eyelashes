import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const products = [
  {
    id: '01',
    name: 'Mink Lashes',
    tagline: 'Effortless Luxury',
    description: 'Hand-picked from the finest Siberian mink, our signature mink lashes deliver unmatched softness, natural curl, and an ultra-lightweight feel.',
    specs: ['Ultra-soft texture', 'Natural taper', 'Reusable 20–25x', 'Cruelty-free sourcing'],
    moq: 'MOQ: 50 units',
    badge: 'Bestseller',
  },
  {
    id: '02',
    name: 'Silk Lashes',
    tagline: 'Sleek & Dramatic',
    description: 'Our premium silk fiber lashes offer a glossy, dramatic finish with consistent curl retention — perfect for volume and hybrid application.',
    specs: ['High gloss finish', 'Consistent curl', 'Multiple thickness options', 'Vegan & cruelty-free'],
    moq: 'MOQ: 50 units',
    badge: 'Popular',
  },
  {
    id: '03',
    name: 'Synthetic Lashes',
    tagline: 'Bold & Precise',
    description: 'Engineered for bold looks and perfect uniformity. Our synthetic line offers the most affordable option without compromising quality.',
    specs: ['Bold, defined look', 'Uniform thickness', 'Durable & resilient', 'Budget-friendly MOQ'],
    moq: 'MOQ: 100 units',
    badge: 'Value',
  },
  {
    id: '04',
    name: '3D / 5D Volume',
    tagline: 'Maximum Fullness',
    description: 'Pre-fanned multi-layer fans crafted for maximum volume application. Each fan is hand-made with precise weight distribution.',
    specs: ['3D, 4D & 5D fans', 'Ultra-lightweight', 'Perfect symmetry', 'Easy pick & apply'],
    moq: 'MOQ: 30 units',
    badge: 'Premium',
  },
  {
    id: '05',
    name: 'Colored Collection',
    tagline: 'Express Yourself',
    description: 'Vibrant, fade-resistant colored lashes for editorial, fashion, and special occasion applications. 20+ shades available.',
    specs: ['20+ vibrant shades', 'Fade-resistant dye', 'Mix & match packs', 'Seasonal collections'],
    moq: 'MOQ: 50 units',
    badge: 'Trending',
  },
  {
    id: '06',
    name: 'OEM / Private Label',
    tagline: 'Your Brand, Our Craft',
    description: 'Full white-label manufacturing and private label services. Custom packaging, branding, and formulations built for your business.',
    specs: ['Custom packaging', 'Brand logo printing', 'Flexible MOQ', 'Dedicated account manager'],
    moq: 'MOQ: Negotiable',
    badge: 'Custom',
  },
]

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } },
}

function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      variants={cardVariants}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? 'rgba(72,184,202,0.05)' : 'var(--white)',
        border: '1px solid',
        borderColor: hovered ? 'var(--teal)' : 'var(--border-soft)',
        padding: '44px 40px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        transition: 'background 0.4s, border-color 0.4s, box-shadow 0.4s',
        boxShadow: hovered ? '0 16px 60px rgba(72,184,202,0.12)' : '0 1px 3px rgba(13,30,42,0.04)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Number + Badge */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <span style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: '13px',
          color: hovered ? 'var(--teal)' : 'rgba(72,184,202,0.3)',
          letterSpacing: '2px',
          transition: 'color 0.3s',
        }}>
          {product.id}
        </span>
        <span style={{
          fontSize: '9px',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: hovered ? 'var(--teal-dark)' : 'var(--text-light)',
          border: '1px solid',
          borderColor: hovered ? 'var(--teal)' : 'var(--border-soft)',
          padding: '4px 12px',
          transition: 'all 0.3s',
        }}>
          {product.badge}
        </span>
      </div>

      {/* Title */}
      <div>
        <h3 style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(24px, 2.5vw, 32px)',
          color: 'var(--text-dark)',
          fontWeight: 400,
          lineHeight: 1,
          marginBottom: '6px',
        }}>
          {product.name}
        </h3>
        <p style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: '15px',
          color: 'var(--teal-dark)',
          fontStyle: 'italic',
        }}>
          {product.tagline}
        </p>
      </div>

      {/* Description */}
      <p style={{ fontSize: '13px', color: 'var(--text-mid)', lineHeight: 1.8 }}>
        {product.description}
      </p>

      {/* Specs */}
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {product.specs.map(spec => (
          <li key={spec} style={{
            fontSize: '12px',
            color: 'var(--text-mid)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
          }}>
            <span style={{
              width: '5px', height: '5px',
              borderRadius: '50%',
              background: hovered ? 'var(--teal)' : 'var(--teal-light)',
              flexShrink: 0,
              transition: 'background 0.3s',
            }} />
            {spec}
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div style={{
        marginTop: 'auto',
        paddingTop: '24px',
        borderTop: '1px solid var(--border-soft)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <span style={{ fontSize: '10px', color: 'var(--text-light)', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
          {product.moq}
        </span>
        <motion.a
          href="#contact"
          animate={{
            color: hovered ? 'var(--teal-dark)' : 'var(--text-light)',
            borderColor: hovered ? 'var(--teal)' : 'var(--border-soft)',
          }}
          transition={{ duration: 0.3 }}
          style={{
            fontSize: '10px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            fontWeight: 600,
            fontFamily: 'Montserrat, sans-serif',
            border: '1px solid',
            padding: '8px 18px',
            display: 'inline-block',
          }}
        >
          Inquire →
        </motion.a>
      </div>

      {/* Bottom teal line on hover */}
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: '2px',
          background: 'linear-gradient(to right, var(--teal), var(--teal-dark))',
          transformOrigin: 'left',
        }}
      />
    </motion.div>
  )
}

export default function Products() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="products" style={{ background: 'var(--white)' }}>
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: '80px' }}
        >
          <p className="section-label">Product Catalog</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px' }}>
            <div>
              <h2 className="section-title">
                Our <span>Collections</span>
              </h2>
              <p className="section-subtitle">
                Every product is crafted with surgical precision, premium materials, and rigorously tested before reaching your hands.
              </p>
            </div>
            <motion.a
              href="#contact"
              className="btn-outline"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              Get Full Catalog
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '20px',
          }}
          className="products-grid"
        >
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .products-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
