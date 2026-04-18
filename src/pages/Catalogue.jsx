import { useEffect, useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { setMeta } from '../utils/setMeta'

const CATALOGUE_META = {
  title: 'Product Catalogue — MCI Eyelashes Wholesale',
  description: 'Browse 200+ wholesale eyelash styles across 5 collections: Soft Touch, 3D Luxe, Faux Mink, Human Hair, Under Lashes. MOQ 100 pairs.',
  canonical: 'https://mci-eyelashes.vercel.app/catalogue',
}

// ─── DATA ────────────────────────────────────────────────────────────────────
const collections = [
  {
    id: '01',
    key: 'soft',
    name: 'Soft Touch Lashes',
    tagline: 'Natural · Wispy · Volume · Tappered',
    badge: 'Bestseller',
    heritage: '50+ Years',
    material: 'Korean Synthetic / Human Hair',
    moq: '100 pairs',
    desc: 'The industry standard for over 50 years. Ultra lightweight and comfortable for all-day wear. High Quality Korean Synthetic Fiber and 100% sterilized Human Hair with tapered technology for extra drama.',
    series: [
      {
        name: 'Natural Series',
        skus: ['IBC 1044','IBC 1045','IBC 1046','IBC 1047','IBC 1048','IBC 1050','IBC 1051','IBC 1052','IBC 1053','IBC 1054','IBC 1055','IBC 1056'],
      },
      {
        name: 'Wispy Series',
        skus: ['IBC 1059','IBC 1061','IBC 1062','IBC 1066','IBC 1067','IBC 1068','IBC 1069','IBC 1070','IBC 1071','IBC 1072','IBC 1073','IBC 1074'],
      },
      {
        name: 'Volume Series',
        skus: ['IBC 1075','IBC 1076','IBC 1077','IBC 1079','IBC 1080','IBC 1081','IBC 1082','IBC 1083','IBC 1084','IBC 1085','IBC 1086','IBC 1087'],
      },
      {
        name: 'Extended Volume',
        skus: ['IBC 1088','IBC 1089','IBC 1090','IBC 1091','IBC 1092','IBC 1093','IBC 1094','IBC 1096','IBC 1097','IBC 1099','IBC 1100','IBC 1101'],
      },
      {
        name: 'Dramatic Series',
        skus: ['IBC 1102','IBC 1103','IBC 1104','IBC 1105','IBC 1106','IBC 1107','IBC 1109','IBC 1110','IBC 1114','IBC 1115','IBC 1117','IBC 1118'],
      },
      {
        name: 'Pro Series',
        skus: ['IBC 1119','IBC 1120','IBC 1121'],
      },
      {
        name: 'Tappered Series',
        skus: ['IBC 3001','IBC 3002','IBC 3003','IBC 3004','IBC 3005','IBC 3006','IBC 3007','IBC 3009','IBC 3010','IBC 3011','IBC 3013','IBC 3014','IBC 3015','IBC 3016'],
      },
    ],
  },
  {
    id: '02',
    key: '3d',
    name: '3D Luxe Lashes',
    tagline: 'Premium Volume · Multi-Layer',
    badge: 'Premium',
    heritage: 'High Demand',
    material: 'Multi-Layer Synthetic',
    moq: '100 pairs',
    desc: 'Multi-layer 3D construction creates extraordinary depth and volume. Perfect for bridal, editorial, events, and clients who want maximum impact.',
    series: [
      {
        name: 'Page 01',
        skus: ['BC 6000','BC 6005','BC 6020','BC 6070','BC 6072','BC 6077'],
      },
      {
        name: 'Page 02',
        skus: ['BC 6071','BC 6074','BC 6075','BC 6077','BC 6078','BC 6079'],
      },
      {
        name: 'Page 03',
        skus: ['BC 6080','BC 6086','BC 6110','BC 6120','BC 6111','BC 6112'],
      },
      {
        name: 'Page 04',
        skus: ['BC 6120','BC 6140','BC 6145','BC 6146','BC 6149','BC 6160'],
      },
      {
        name: 'Page 05',
        skus: ['BC 6160','BC 6161','BC 6165','BC 6168'],
      },
    ],
  },
  {
    id: '03',
    key: 'faux',
    name: 'Faux Mink — Protein Silk',
    tagline: 'Cruelty Free · Ultra-Soft',
    badge: 'Cruelty Free',
    heritage: 'Ethical Luxury',
    material: 'Protein Silk Fiber',
    moq: '100 pairs',
    desc: 'The look and feel of genuine mink without animal products. Protein silk technology delivers ultra-soft, lightweight drape. Ideal for vegan salons and premium retail.',
    series: [
      {
        name: 'Natural Collection',
        skus: ['FM Natural 01','FM Natural 02','FM Natural 03','FM Natural 04','FM Natural 05','FM Natural 06'],
      },
      {
        name: 'Wispy Collection',
        skus: ['FM Wispy 01','FM Wispy 02','FM Wispy 03','FM Wispy 04','FM Wispy 05','FM Wispy 06'],
      },
      {
        name: 'Volume Collection',
        skus: ['FM Volume 01','FM Volume 02','FM Volume 03','FM Volume 04','FM Volume 05','FM Volume 06'],
      },
    ],
    note: 'Full SKU listing available on request. Contact us for complete Faux Mink catalogue.',
  },
  {
    id: '04',
    key: 'human',
    name: 'Classic — Human Hair',
    tagline: '100% Sterilized · Most Natural',
    badge: 'Ultra Natural',
    heritage: 'Premium Grade',
    material: '100% Sterilized Human Hair',
    moq: '100 pairs',
    desc: 'For the absolute most natural look. 100% sterilized human hair that blends seamlessly. Every batch meets international cosmetic safety standards.',
    series: [
      {
        name: 'Natural Series',
        skus: ['CH Natural 01','CH Natural 02','CH Natural 03','CH Natural 04','CH Natural 05','CH Natural 06'],
      },
      {
        name: 'Wispy Series',
        skus: ['CH Wispy 01','CH Wispy 02','CH Wispy 03','CH Wispy 04','CH Wispy 05','CH Wispy 06'],
      },
      {
        name: 'Volume Series',
        skus: ['CH Volume 01','CH Volume 02','CH Volume 03','CH Volume 04','CH Volume 05','CH Volume 06'],
      },
    ],
    note: 'Full SKU listing available on request. Contact us for complete Human Hair catalogue.',
  },
  {
    id: '05',
    key: 'under',
    name: 'Under Lashes',
    tagline: 'Lower Lash Line · Tapered-End Tech',
    badge: 'Specialty',
    heritage: 'Unique Category',
    material: 'Soft Touch Tapered-End',
    moq: '100 pairs',
    desc: 'Designed specifically for the lower lash line. Soft Touch Tapered-End technology creates natural under-eye framing. A unique product that opens an additional retail opportunity.',
    series: [
      {
        name: 'Under Lash Series',
        skus: ['IBC 1052-U','IBC 6082-U','IBC 6083-U','IBC 6084-U','IBC 6085-U','IBC 6086-U','IBC 6087-U','IBC 6088-U','IBC 6089-U','IBC 6090-U','IBC 6091-U','IBC 6092-U','IBC 6093-U','IBC 6094-U','IBC 6095-U','IBC 6096-U','IBC 6097-U','IBC 6098-U'],
      },
    ],
  },
]

const tiers = [
  { moq: '100+', label: 'Starter', discount: 'Standard', perks: ['Mix & match styles', 'All 5 collections', 'Standard packaging', '7–14 day shipping'] },
  { moq: '500+', label: 'Growth', discount: '10% off', perks: ['Private label option', 'Custom packaging', 'Priority processing', 'Free samples'], featured: true },
  { moq: '1,000+', label: 'Scale', discount: '20% off', perks: ['Full brand identity', 'Custom design', 'Net payment terms', 'Free shipping routes'] },
]

// ─── COMPONENTS ──────────────────────────────────────────────────────────────
function SkuGrid({ skus }) {
  return (
    <div className="cat-sku-grid">
      {skus.map(sku => (
        <div key={sku} className="cat-sku-item">
          <span className="cat-sku-code">{sku}</span>
        </div>
      ))}
    </div>
  )
}

function CollectionPanel({ col }) {
  const [openSeries, setOpenSeries] = useState(null)
  const totalSkus = col.series.reduce((a, s) => a + s.skus.length, 0)

  return (
    <div className="cat-panel">
      {/* Header */}
      <div className="cat-panel-head">
        <div className="cat-panel-num">{col.id}</div>
        <div className="cat-panel-info">
          <h2 className="cat-panel-name">{col.name}</h2>
          <p className="cat-panel-tagline">{col.tagline}</p>
        </div>
        <div className="cat-panel-meta">
          <span className="cat-badge cat-badge-teal">{col.badge}</span>
          <span className="cat-badge cat-badge-outline">{col.heritage}</span>
        </div>
      </div>

      {/* Body */}
      <div className="cat-panel-body">
        <div className="cat-panel-left">
          <p className="cat-panel-desc">{col.desc}</p>
          <div className="cat-specs">
            <div className="cat-spec-row"><span>Material</span><strong>{col.material}</strong></div>
            <div className="cat-spec-row"><span>MOQ</span><strong>{col.moq} — mix & match allowed</strong></div>
            <div className="cat-spec-row"><span>Total styles</span><strong>{totalSkus} SKUs across {col.series.length} series</strong></div>
            <div className="cat-spec-row"><span>Shipping</span><strong>7–14 business days worldwide</strong></div>
          </div>
          {col.note && (
            <div className="cat-note">{col.note}</div>
          )}
          <a
            href={`mailto:denis@mci-eyelashes.com?subject=Catalogue Inquiry: ${col.name}&body=Hi Denis,%0D%0A%0D%0AI'm interested in ${col.name}.%0D%0A%0D%0ACompany:%0D%0AEstimated quantity:%0D%0AStyles interested in:%0D%0ADestination:%0D%0A%0D%0AThank you`}
            className="cat-cta"
          >
            Request Quote for This Collection →
          </a>
        </div>

        <div className="cat-panel-right">
          <div className="cat-series-label">Available Styles — {totalSkus} SKUs</div>
          {col.series.map((series, i) => (
            <div key={series.name} className="cat-series">
              <button
                className={`cat-series-toggle ${openSeries === i ? 'open' : ''}`}
                onClick={() => setOpenSeries(openSeries === i ? null : i)}
              >
                <span>{series.name}</span>
                <span className="cat-series-count">{series.skus.length} styles</span>
                <span className="cat-series-arrow">{openSeries === i ? '−' : '+'}</span>
              </button>
              <AnimatePresence>
                {openSeries === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <SkuGrid skus={series.skus} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function Catalogue() {
  const [activeCol, setActiveCol] = useState(0)
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true })

  useEffect(() => {
    setMeta(CATALOGUE_META)
    window.scrollTo(0, 0)
  }, [])

  return (
    <main className="cat-page">
      {/* Hero */}
      <section className="cat-hero" ref={headerRef}>
        <motion.div
          className="cat-hero-inner"
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="cat-eyebrow">Wholesale Catalogue 2025</span>
          <h1 className="cat-title">Product <em>Catalogue</em></h1>
          <p className="cat-subtitle">
            200+ styles across 5 professional collections.<br />
            MOQ 100 pairs · Private label from 500 units · Worldwide shipping 7–14 days.
          </p>
          <div className="cat-hero-stats">
            <div className="cat-stat"><span>5</span>Collections</div>
            <div className="cat-stat"><span>200+</span>Styles</div>
            <div className="cat-stat"><span>100</span>Min. Order</div>
            <div className="cat-stat"><span>24h</span>Quote Reply</div>
          </div>
          <a
            href="mailto:denis@mci-eyelashes.com?subject=Wholesale Catalogue Inquiry&body=Hi Denis,%0D%0A%0D%0AI'd like to request a quote.%0D%0A%0D%0ACompany:%0D%0ACountry:%0D%0ACollections interested in:%0D%0AEstimated quantity:%0D%0A%0D%0AThank you"
            className="cat-hero-cta"
          >
            Request a Quote
          </a>
        </motion.div>
      </section>

      {/* Collection tabs */}
      <div className="cat-tabs-wrap">
        <div className="cat-tabs">
          {collections.map((col, i) => (
            <button
              key={col.key}
              className={`cat-tab ${activeCol === i ? 'active' : ''}`}
              onClick={() => setActiveCol(i)}
            >
              <span className="cat-tab-num">{col.id}</span>
              <span className="cat-tab-name">{col.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Active collection */}
      <div className="cat-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCol}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
          >
            <CollectionPanel col={collections[activeCol]} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Pricing tiers */}
      <section className="cat-pricing">
        <div className="cat-pricing-inner">
          <div className="cat-eyebrow" style={{ justifyContent: 'center' }}>Wholesale Pricing</div>
          <h2 className="cat-pricing-title">Volume <em>Tiers</em></h2>
          <div className="cat-pricing-grid">
            {tiers.map(t => (
              <div key={t.label} className={`cat-tier ${t.featured ? 'featured' : ''}`}>
                <div className="cat-tier-moq">{t.moq} <span>pairs</span></div>
                <div className="cat-tier-label">{t.label}</div>
                <div className="cat-tier-discount">{t.discount}</div>
                <ul className="cat-tier-perks">
                  {t.perks.map(p => <li key={p}>{p}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <p className="cat-pricing-note">
            All prices quoted per pair. Final pricing on request based on collection, style mix, and volume.
            <a href="mailto:denis@mci-eyelashes.com?subject=Wholesale Pricing Inquiry"> Request price list →</a>
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="cat-final-cta">
        <div className="cat-final-inner">
          <h2>Ready to <em>Order?</em></h2>
          <p>Send us your selection and estimated quantity — we'll reply with a full quotation within 24 hours.</p>
          <div className="cat-final-btns">
            <a
              href="mailto:denis@mci-eyelashes.com?subject=Wholesale Order Inquiry&body=Hi Denis,%0D%0A%0D%0AI would like to place a wholesale order.%0D%0A%0D%0ACompany:%0D%0ACountry:%0D%0ACollections:%0D%0AQuantity:%0D%0A%0D%0AThank you"
              className="cat-cta-primary"
            >
              Request a Quote
            </a>
            <a
              href="mailto:denis@mci-eyelashes.com?subject=Sample Request — MCI Eyelashes"
              className="cat-cta-secondary"
            >
              Request Samples
            </a>
          </div>
          <div className="cat-final-contact">
            <span>📧 denis@mci-eyelashes.com</span>
            <span>📍 Purbalingga, Central Java, Indonesia</span>
            <span>🚚 Worldwide shipping 7–14 days</span>
          </div>
        </div>
      </section>
    </main>
  )
}
