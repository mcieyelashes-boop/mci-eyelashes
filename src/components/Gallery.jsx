const galleryImages = [
  { image: '/gallery-1.webp', alt: 'Japanese robot beauty campaign on the ocean' },
  { image: '/gallery-2.webp', alt: 'Korean robot beauty campaign in cyberpunk rain' },
  { image: '/gallery-3.webp', alt: 'Redhead robot beauty campaign in snowy mountains' },
  { image: '/gallery-4.webp', alt: 'British robot beauty campaign in the desert' },
  { image: '/gallery-5.webp', alt: 'Spanish robot beauty campaign near a volcano' },
]

export default function Gallery() {
  return (
    <section id="gallery" className="campaign" aria-label="MCI Eyelashes campaign gallery">
      <div className="campaign-grid">
        {galleryImages.map((item) => (
          <figure key={item.image} className="campaign-card">
            <img src={item.image} alt={item.alt} width="941" height="1672" loading="lazy" decoding="async" />
          </figure>
        ))}
      </div>
    </section>
  )
}
