import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

// Free Pexels beauty/lash photos — high-res, crop-to-fit
const PX = 'https://images.pexels.com/photos'
const items = [
  {
    id: 1, label: 'Soft Touch',    sub: 'Natural & Defined',
    span: 'tall',
    img: `${PX}/3762802/pexels-photo-3762802.jpeg?auto=compress&cs=tinysrgb&w=600&h=900&fit=crop`,
  },
  {
    id: 2, label: 'Volume Set',    sub: 'Full & Dramatic',
    span: 'normal',
    img: `${PX}/1820716/pexels-photo-1820716.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop`,
  },
  {
    id: 3, label: 'Mega Volume',   sub: 'Bold & Striking',
    span: 'normal',
    img: `${PX}/2395253/pexels-photo-2395253.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop`,
  },
  {
    id: 4, label: '3D Luxe',       sub: 'Wispy & Textured',
    span: 'wide',
    img: `${PX}/3373736/pexels-photo-3373736.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop`,
  },
  {
    id: 5, label: 'Faux Mink',     sub: 'Cruelty-Free Luxury',
    span: 'normal',
    img: `${PX}/4622947/pexels-photo-4622947.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop`,
  },
  {
    id: 6, label: 'Human Hair',    sub: 'Ultra Natural',
    span: 'tall',
    img: `${PX}/3985141/pexels-photo-3985141.jpeg?auto=compress&cs=tinysrgb&w=600&h=900&fit=crop`,
  },
  {
    id: 7, label: 'Under Lashes',  sub: 'Lower Lash Specialty',
    span: 'normal',
    img: `${PX}/4373751/pexels-photo-4373751.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop`,
  },
  {
    id: 8, label: 'Private Label', sub: 'Your Brand, Our Craft',
    span: 'wide',
    img: `${PX}/6476776/pexels-photo-6476776.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop`,
  },
]

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.96, y: 20 },
  show:   { opacity: 1, scale: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

function GalleryItem({ item }) {
  const [hovered, setHovered] = useState(false)
  const height  = item.span === 'tall'   ? '440px' : item.span === 'wide' ? '200px' : '280px'
  const colSpan = item.span === 'wide'   ? 'span 2' : 'span 1'

  return (
    <motion.div
      variants={itemVariants}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        gridColumn: colSpan,
        height,
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        borderRadius: '2px',
        background: '#0e2535',
      }}
    >
      {/* Photo */}
      <motion.img
        src={item.img}
        alt={`${item.label} eyelash collection — MCI Eyelashes`}
        loading="lazy"
        animate={{ scale: hovered ? 1.06 : 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />

      {/* Shimmer top line */}
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, zIndex: 3,
          height: '3px',
          background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.8), transparent)',
          transformOrigin: 'left',
        }}
      />

      {/* Corner accents */}
      {[
        { top: '14px',    left: '14px',  borderTop: '1.5px solid', borderLeft: '1.5px solid' },
        { bottom: '14px', right: '14px', borderBottom: '1.5px solid', borderRight: '1.5px solid' },
      ].map((style, i) => (
        <motion.div
          key={i}
          animate={{ opacity: hovered ? 0.9 : 0.3, width: hovered ? '28px' : '18px', height: hovered ? '28px' : '18px' }}
          transition={{ duration: 0.4 }}
          style={{ position: 'absolute', width: '18px', height: '18px', borderColor: 'rgba(255,255,255,0.8)', zIndex: 3, ...style }}
        />
      ))}

      {/* Always-visible dark gradient base */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(to top, rgba(10,23,32,0.55) 0%, transparent 55%)',
      }} />

      {/* Hover overlay */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.35 }}
        style={{
          position: 'absolute', inset: 0, zIndex: 2,
          background: 'linear-gradient(to top, rgba(10,23,32,0.82) 0%, rgba(10,23,32,0.2) 60%, transparent 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '28px 24px',
        }}
      >
        <motion.p
          animate={{ y: hovered ? 0 : 14, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3, delay: 0.05 }}
          style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '24px', color: '#fff', fontStyle: 'italic', marginBottom: '4px' }}
        >
          {item.label}
        </motion.p>
        <motion.p
          animate={{ y: hovered ? 0 : 14, opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          style={{ fontSize: '10px', color: 'rgba(121,207,221,0.9)', letterSpacing: '2px', textTransform: 'uppercase' }}
        >
          {item.sub}
        </motion.p>
      </motion.div>

      {/* Default label (visible when not hovered) */}
      <motion.div
        animate={{ opacity: hovered ? 0 : 1 }}
        transition={{ duration: 0.25 }}
        style={{
          position: 'absolute', bottom: '16px', left: '18px', zIndex: 2,
          fontSize: '11px', letterSpacing: '2px', color: 'rgba(255,255,255,0.8)',
          textTransform: 'uppercase', fontFamily: 'Montserrat, sans-serif', fontWeight: 600,
        }}
      >
        {item.label}
      </motion.div>
    </motion.div>
  )
}

export default function Gallery() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="gallery" style={{ background: 'var(--navy-light)' }}>
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: '70px' }}
        >
          <p className="section-label">Our Work</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px' }}>
            <div>
              <h2 className="section-title">The <span>Gallery</span></h2>
              <p className="section-subtitle">
                Real results from real products. Each set showcases the precision and artistry in every MCI lash.
              </p>
            </div>
            <motion.a href="#contact" className="btn-outline" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              Request Samples
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}
          className="gallery-grid"
        >
          {items.map(item => (
            <GalleryItem key={item.id} item={item} />
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .gallery-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 540px) {
          .gallery-grid { grid-template-columns: 1fr !important; }
          .gallery-grid > div { grid-column: span 1 !important; }
        }
      `}</style>
    </section>
  )
}
