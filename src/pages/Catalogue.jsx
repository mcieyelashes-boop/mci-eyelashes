import { useEffect, useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { setMeta } from '../utils/setMeta'
import { CATALOGUE_META } from '../data/pageMeta'

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
        name: 'IBC 6002 – 6033',
        skus: ['IBC 6002', 'IBC 6005', 'IBC 6008', 'IBC 6017', 'IBC 6020', 'IBC 6033'],
      },
      {
        name: 'IBC 6051 – 6078',
        skus: ['IBC 6051', 'IBC 6073', 'IBC 6074', 'IBC 6076', 'IBC 6077', 'IBC 6078'],
      },
      {
        name: 'IBC 6079 – 6127',
        skus: ['IBC 6079', 'IBC 6080', 'IBC 6081', 'IBC 6109', 'IBC 6113', 'IBC 6127'],
      },
      {
        name: 'IBC 6128 – 6159',
        skus: ['IBC 6128', 'IBC 6143', 'IBC 6144', 'IBC 6149', 'IBC 6150', 'IBC 6159'],
      },
      {
        name: 'IBC 6163 – 6184',
        skus: ['IBC 6163', 'IBC 6166', 'IBC 6178', 'IBC 6180', 'IBC 6184'],
      },
    ],
  },
  {
    id: '03',
    key: 'faux',
    name: 'Faux Mink - Protein Silk',
    tagline: 'Cruelty Free · Ultra-Soft',
    badge: 'Cruelty Free',
    heritage: 'Ethical Luxury',
    material: 'Protein Silk Fiber',
    moq: '100 pairs',
    desc: 'The look and feel of genuine mink without animal products. Protein silk technology delivers ultra-soft, lightweight drape. Ideal for vegan salons and premium retail.',
    series: [
      {
        name: 'FM 20 Series',
        skus: ['FM 20-002', 'FM 20-003', 'FM 20-004', 'FM 20-008', 'FM 20-011', 'FM 20-014', 'FM 20-017', 'FM 20-018', 'FM 20-019', 'FM 20-020', 'FM 20-022', 'FM 20-023', 'FM 20-024', 'FM 20-025', 'FM 20-026', 'FM 20-027', 'FM 20-051'],
      },
      {
        name: 'FM 21 Series',
        skus: ['FM 21-027', 'FM 21-029', 'FM 21-030', 'FM 21-032', 'FM 21-035', 'FM 21-036', 'FM 21-055'],
      },
      {
        name: 'FM 22 Series',
        skus: ['FM 22-065', 'FM 22-070', 'FM 22-073', 'FM 22-074', 'FM 22-075', 'FM 22-076', 'FM 22-077', 'FM 22-078', 'FM 22-079', 'FM 22-080', 'FM 22-081', 'FM 22-082', 'FM 22-083', 'FM 22-084', 'FM 22-090', 'FM 22-100', 'FM 22-110', 'FM 22-112', 'FM 22-134', 'FM 22-150', 'FM 22-152', 'FM 22-154', 'FM 22-155', 'FM 22-156', 'FM 22-157', 'FM 22-198', 'FM 22-199'],
      },
      {
        name: 'C Series',
        skus: ['C2', 'C3', 'C5'],
      },
      {
        name: 'M Series',
        skus: ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8', 'M9'],
      },
      {
        name: 'Named Styles',
        skus: ['DRAMA Q', '811', 'KIKI', 'FIFI', 'TOR 3', 'TOR 4'],
      },
    ],
  },
  {
    id: '04',
    key: 'human',
    name: 'Classic - Human Hair',
    tagline: '100% Sterilized · Most Natural',
    badge: 'Ultra Natural',
    heritage: 'Premium Grade',
    material: '100% Sterilized Human Hair',
    moq: '100 pairs',
    desc: 'For the absolute most natural look. 100% sterilized human hair that blends seamlessly. Every batch meets international cosmetic safety standards.',
    series: [
      {
        name: 'IBC 1042 – 1088',
        skus: ['IBC 1042', 'IBC 1047', 'IBC 1050', 'IBC 1051', 'IBC 1055', 'IBC 1056', 'IBC 1074', 'IBC 1078', 'IBC 1079', 'IBC 1080', 'IBC 1088'],
      },
      {
        name: 'IBC 1090 – 1153',
        skus: ['IBC 1090', 'IBC 1094', 'IBC 1097', 'IBC 1106', 'IBC 1107', 'IBC 1110', 'IBC 1114', 'IBC 1116', 'IBC 1119', 'IBC 1120', 'IBC 1153'],
      },
      {
        name: 'IBC 1171 – 1181',
        skus: ['IBC 1171', 'IBC 1172', 'IBC 1173', 'IBC 1174', 'IBC 1175', 'IBC 1176', 'IBC 1177', 'IBC 1178', 'IBC 1179', 'IBC 1180', 'IBC 1181'],
      },
      {
        name: 'IBC 1182 – 1203',
        skus: ['IBC 1182', 'IBC 1183', 'IBC 1184', 'IBC 1185', 'IBC 1186', 'IBC 1196', 'IBC 1197', 'IBC 1198', 'IBC 1199', 'IBC 1201', 'IBC 1203'],
      },
      {
        name: 'IBC 1204 – 1214',
        skus: ['IBC 1204', 'IBC 1205', 'IBC 1206', 'IBC 1207', 'IBC 1208', 'IBC 1209', 'IBC 1210', 'IBC 1211', 'IBC 1212', 'IBC 1213', 'IBC 1214'],
      },
      {
        name: 'IBC 1215 – 1256',
        skus: ['IBC 1215', 'IBC 1216', 'IBC 1217', 'IBC 1218', 'IBC 1255', 'IBC 1256'],
      },
    ],
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

// Only the Starter row reflects owner-confirmed terms (MOQ 100 pairs per style,
// free catalog samples, 5 working days production). Discount percentages,
// payment terms, and shipping perks for the higher tiers are UNCONFIRMED —
// do not display specific figures until the owner confirms them.
const tiers = [
  { moq: '100+', label: 'Starter', discount: 'Standard', perks: ['Mix & match styles', 'Free catalog samples', '5-day production', 'Private label available'] },
  { moq: '500+', label: 'Growth', discount: 'Ask us', perks: ['Larger volume runs', 'Private label option', 'Custom packaging', 'Contact us for terms'], featured: true },
  { moq: '1,000+', label: 'Scale', discount: 'Ask us', perks: ['High-volume production', 'Full brand identity', 'Custom design', 'Contact us for terms'] },
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
            <div className="cat-spec-row"><span>MOQ</span><strong>{col.moq}: mix & match allowed</strong></div>
            <div className="cat-spec-row"><span>Total styles</span><strong>{totalSkus} SKUs across {col.series.length} series</strong></div>
            <div className="cat-spec-row"><span>Shipping</span><strong>7-14 business days worldwide</strong></div>
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
          <div className="cat-series-label">Available Styles: {totalSkus} SKUs</div>
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
const totalStyles = collections.reduce(
  (sum, col) => sum + new Set(col.series.flatMap((s) => s.skus)).size,
  0,
)

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
            {totalStyles} styles across 5 professional collections.<br />
            MOQ 100 pairs per style, private label included · Worldwide shipping 7-14 days.
          </p>
          <div className="cat-hero-stats">
            <div className="cat-stat"><span>5</span>Collections</div>
            <div className="cat-stat"><span>{totalStyles}</span>Styles</div>
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
          <p>Send us your selection and estimated quantity. We'll reply with a full quotation within 24 hours.</p>
          <div className="cat-final-btns">
            <a
              href="mailto:denis@mci-eyelashes.com?subject=Wholesale Order Inquiry&body=Hi Denis,%0D%0A%0D%0AI would like to place a wholesale order.%0D%0A%0D%0ACompany:%0D%0ACountry:%0D%0ACollections:%0D%0AQuantity:%0D%0A%0D%0AThank you"
              className="cat-cta-primary"
            >
              Request a Quote
            </a>
            <a
              href="mailto:denis@mci-eyelashes.com?subject=Sample Request: MCI Eyelashes"
              className="cat-cta-secondary"
            >
              Request Samples
            </a>
          </div>
          <div className="cat-final-contact">
            <span>📧 denis@mci-eyelashes.com</span>
            <span>📍 Purbalingga, Central Java, Indonesia</span>
            <span>🚚 Worldwide shipping 7-14 days</span>
          </div>
        </div>
      </section>
    </main>
  )
}
