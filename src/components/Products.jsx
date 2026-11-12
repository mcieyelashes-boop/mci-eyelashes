import { useState } from 'react'
import { Link } from 'react-router-dom'
import { collectionPhotos, photoAlt } from '../data/productPhotos'

// Only the four collections the owner sells. Under Lashes was removed at the
// owner's request (November 2026). Do not add a collection here unless the
// owner confirms MCI sells it.
const products = [
  { id: '01', photos: 'soft', name: 'Soft Touch Lashes', tagline: '50+ Years Heritage', badge: 'Bestseller', skus: 'IBC 1044 to IBC 3016', desc: 'The industry standard for over 50 years. Ultra lightweight and comfortable for all-day wear, ideal for daily use and professional applications.', specs: ['Natural · Wispy · Volume series', 'Korean synthetic fiber', 'Tapered-end technology', '60+ styles available'], moq: '100 pairs' },
  { id: '02', photos: 'threeD', name: '3D Luxe Lashes', tagline: 'Premium Volume', badge: 'Premium', skus: 'IBC 6002 to IBC 6184', desc: 'Multi-layer 3D construction for extraordinary depth and volume. Perfect for bridal, editorial, and clients who want maximum impact.', specs: ['Multi-layer 3D construction', '29 styles available', 'Bridal · editorial · events', 'High drama finish'], moq: '100 pairs' },
  { id: '03', photos: 'faux', name: 'Faux Mink', tagline: 'Protein Silk · Ethical Luxury', badge: 'Cruelty Free', skus: 'FM 20-002 to FM 22-199', desc: 'Protein silk technology delivers the look of genuine mink without animal products. Ultra-soft, lightweight drape for vegan salons.', specs: ['100% cruelty free', 'Protein silk fiber', 'Mink-like softness', '100% vegan'], moq: '100 pairs' },
  { id: '04', photos: 'human', name: 'Human Hair Classic', tagline: '100% Sterilized · Most Natural', badge: 'Ultra Natural', skus: 'IBC 1042 to IBC 1256', desc: 'The absolute most natural look. 100% sterilized human hair that blends seamlessly with existing lashes.', specs: ['100% sterilized human hair', 'Hand-inspected before dispatch', 'Most natural appearance', 'Premium salon grade'], moq: '100 pairs' },
]

export default function Products() {
  const [active, setActive] = useState(0)
  const p = products[active]
  const photos = p.photos ? collectionPhotos[p.photos] : []

  const onKeyDown = (e) => {
    const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key]
    if (!step) return
    e.preventDefault()
    const next = (active + step + products.length) % products.length
    setActive(next)
    document.getElementById(`collection-tab-${next}`)?.focus()
  }

  return (
    <section id="products" className="section section--rule">
      <div className="container">
        <header className="section-head">
          <div>
            <p className="eyebrow">Our Collections</p>
            <h2 className="title">Four Lash Collections <em>Built to Order</em></h2>
          </div>
          <p className="lede">
            Every style has its own code. These are real lashes from the catalogue, photographed on white.
          </p>
        </header>

        <div className="collections">
          <div className="collection-tabs" role="tablist" aria-label="Lash collections" onKeyDown={onKeyDown}>
            {products.map((prod, i) => (
              <button
                key={prod.id}
                id={`collection-tab-${i}`}
                role="tab"
                aria-selected={active === i}
                aria-controls="collection-panel"
                tabIndex={active === i ? 0 : -1}
                className="collection-tab"
                onClick={() => setActive(i)}
              >
                <span className="collection-tab-num">{prod.id}</span>
                <span className="collection-tab-name">{prod.name}</span>
                <span className="collection-tab-mark" aria-hidden="true">&rarr;</span>
              </button>
            ))}
          </div>

          <div
            key={p.id}
            id="collection-panel"
            role="tabpanel"
            aria-labelledby={`collection-tab-${active}`}
            className="collection-panel"
          >
            {photos.length > 0 ? (
              <div className="plate">
                <div className="plate-grid">
                  {photos.map((photo) => (
                    <figure key={photo.code} className="plate-item">
                      <img src={photo.src} alt={photoAlt(photo)} width={photo.width} height={photo.height} loading="lazy" decoding="async" />
                      <figcaption>{photo.code}</figcaption>
                    </figure>
                  ))}
                </div>
                <div className="plate-foot">
                  <span>{p.name}</span>
                  <span>{p.skus}</span>
                </div>
              </div>
            ) : (
              <div className="plate plate--empty">
                <p>{p.skus}</p>
                <p>
                  Every style code for this collection is listed in the <Link to="/catalogue">product catalogue</Link>.
                </p>
              </div>
            )}

            <div className="collection-body">
              <div>
                <span className="collection-badge">{p.badge}</span>
                <h3 className="collection-name">{p.name}</h3>
                <p className="collection-tagline">{p.tagline}</p>
                <p className="collection-desc">{p.desc}</p>
                <div className="btn-row">
                  <a href="#contact" className="btn">Request Quote</a>
                  <Link to="/catalogue" className="btn-ghost">All Style Codes</Link>
                </div>
              </div>
              <dl className="spec-list">
                {p.specs.map((s) => (
                  <div key={s}><dd>{s}</dd></div>
                ))}
                <div><dt>Style codes</dt><dd>{p.skus}</dd></div>
                <div><dt>Min. order</dt><dd>{p.moq}, mix &amp; match allowed</dd></div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
