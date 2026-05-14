import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const galleryImages = [
  {
    image: '/gallery-1.png',
    alt: 'Japanese robot beauty campaign on the ocean',
  },
  {
    image: '/gallery-2.png',
    alt: 'Korean robot beauty campaign in cyberpunk rain',
  },
  {
    image: '/gallery-3.png',
    alt: 'Redhead robot beauty campaign in snowy mountains',
  },
  {
    image: '/gallery-4.png',
    alt: 'British robot beauty campaign in the desert',
  },
  {
    image: '/gallery-5.png',
    alt: 'Spanish robot beauty campaign near a volcano',
  },
]

export default function Gallery() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="gallery" className="brand-gallery-section">
      <div className="brand-gallery-shell" ref={ref}>
        <div className="brand-gallery-grid" aria-label="MCI Eyelashes campaign gallery">
          {galleryImages.map((item, index) => (
            <motion.article
              key={item.image}
              className={`brand-gallery-card brand-gallery-card--${index + 1}`}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <img src={item.image} alt={item.alt} loading="lazy" />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
