import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const galleryImages = [
  {
    label: '01 / Ocean',
    title: 'Japanese Cyber Beauty',
    text: 'Beach light, pearl chrome, and clean premium lash detail.',
    image: '/gallery-1.png',
  },
  {
    label: '02 / Cyber Rain',
    title: 'Korean Neon Beauty',
    text: 'Rain, city glow, and futuristic makeup for a bolder campaign mood.',
    image: '/gallery-2.png',
  },
  {
    label: '03 / Alpine',
    title: 'Redhead Snow Beauty',
    text: 'Cold mountain light with sharp lashes and porcelain chrome.',
    image: '/gallery-3.png',
  },
  {
    label: '04 / Desert',
    title: 'British Desert Beauty',
    text: 'Right-angle portrait energy in a warm private-label campaign world.',
    image: '/gallery-4.png',
  },
  {
    label: '05 / Volcanic',
    title: 'Spanish Ember Beauty',
    text: 'A dramatic launch visual with ember light and robotic elegance.',
    image: '/gallery-5.png',
  },
]

export default function Gallery() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="gallery" className="brand-gallery-section">
      <div className="container">
        <motion.div
          ref={ref}
          className="brand-gallery-header"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="section-label">Campaign Gallery</p>
          <div>
            <h2 className="section-title">Five Worlds, <span className="accent-light">One MCI</span> Beauty Language</h2>
            <p className="section-subtitle">
              A futuristic gallery made from your generated campaign images, arranged from left to right as 1, 2, 3, 4, 5.
            </p>
          </div>
          <motion.a href="#contact" className="btn-outline" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
            Request Samples
          </motion.a>
        </motion.div>

        <div className="brand-gallery-grid">
          {galleryImages.map((item, index) => (
            <motion.article
              key={item.label}
              className="brand-gallery-card"
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <img src={item.image} alt={`${item.title} for MCI Eyelashes`} loading="lazy" />
              <div className="brand-gallery-overlay">
                <p>{item.label}</p>
                <h3>{item.title}</h3>
                <span>{item.text}</span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
