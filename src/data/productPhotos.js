// Real product photos (lashes on white, from the owner's catalogue photo library)
// for the landing pages. Only codes whose collection is the same in
// src/pages/Catalogue.jsx and in the catalogue PDF are used here.

const COLLECTIONS = {
  soft: {
    name: 'Soft Touch Lashes',
    material: 'Korean Synthetic / Human Hair',
    photos: [
      {
        code: 'IBC 1044',
        collection: 'Soft Touch Lashes',
        src: '/products/ibc-1044.webp',
        width: 1025,
        height: 401
      },
      {
        code: 'IBC 1059',
        collection: 'Soft Touch Lashes',
        src: '/products/ibc-1059.webp',
        width: 1025,
        height: 401
      },
      {
        code: 'IBC 1075',
        collection: 'Soft Touch Lashes',
        src: '/products/ibc-1075.webp',
        width: 1025,
        height: 401
      },
      {
        code: 'IBC 1089',
        collection: 'Soft Touch Lashes',
        src: '/products/ibc-1089.webp',
        width: 1025,
        height: 401
      },
      {
        code: 'IBC 1102',
        collection: 'Soft Touch Lashes',
        src: '/products/ibc-1102.webp',
        width: 1025,
        height: 401
      },
      {
        code: 'IBC 3001',
        collection: 'Soft Touch Lashes',
        src: '/products/ibc-3001.webp',
        width: 1025,
        height: 401
      }
    ]
  },
  threeD: {
    name: '3D Luxe Lashes',
    material: 'Multi-Layer Synthetic',
    photos: [
      {
        code: 'IBC 6002',
        collection: '3D Luxe Lashes',
        src: '/products/ibc-6002.webp',
        width: 738,
        height: 288
      },
      {
        code: 'IBC 6020',
        collection: '3D Luxe Lashes',
        src: '/products/ibc-6020.webp',
        width: 738,
        height: 288
      },
      {
        code: 'IBC 6076',
        collection: '3D Luxe Lashes',
        src: '/products/ibc-6076.webp',
        width: 737,
        height: 288
      },
      {
        code: 'IBC 6081',
        collection: '3D Luxe Lashes',
        src: '/products/ibc-6081.webp',
        width: 736,
        height: 288
      },
      {
        code: 'IBC 6143',
        collection: '3D Luxe Lashes',
        src: '/products/ibc-6143.webp',
        width: 737,
        height: 288
      },
      {
        code: 'IBC 6163',
        collection: '3D Luxe Lashes',
        src: '/products/ibc-6163.webp',
        width: 736,
        height: 288
      }
    ]
  },
  faux: {
    name: 'Faux Mink - Protein Silk',
    material: 'Protein Silk Fiber',
    photos: [
      {
        code: 'FM 20-002',
        collection: 'Faux Mink - Protein Silk',
        src: '/products/fm-20-002.webp',
        width: 737,
        height: 288
      },
      {
        code: 'FM 21-032',
        collection: 'Faux Mink - Protein Silk',
        src: '/products/fm-21-032.webp',
        width: 737,
        height: 288
      },
      {
        code: 'FM 22-075',
        collection: 'Faux Mink - Protein Silk',
        src: '/products/fm-22-075.webp',
        width: 736,
        height: 288
      },
      {
        code: 'FM 22-083',
        collection: 'Faux Mink - Protein Silk',
        src: '/products/fm-22-083.webp',
        width: 737,
        height: 288
      },
      {
        code: 'FM 22-154',
        collection: 'Faux Mink - Protein Silk',
        src: '/products/fm-22-154.webp',
        width: 736,
        height: 288
      },
      {
        code: 'FM 20-018',
        collection: 'Faux Mink - Protein Silk',
        src: '/products/fm-20-018.webp',
        width: 727,
        height: 284
      }
    ]
  },
  human: {
    name: 'Classic - Human Hair',
    material: '100% Sterilized Human Hair',
    photos: [
      {
        code: 'IBC 1042',
        collection: 'Classic - Human Hair',
        src: '/products/ibc-1042.webp',
        width: 736,
        height: 288
      },
      {
        code: 'IBC 1199',
        collection: 'Classic - Human Hair',
        src: '/products/ibc-1199.webp',
        width: 736,
        height: 288
      },
      {
        code: 'IBC 1174',
        collection: 'Classic - Human Hair',
        src: '/products/ibc-1174.webp',
        width: 737,
        height: 288
      },
      {
        code: 'IBC 1181',
        collection: 'Classic - Human Hair',
        src: '/products/ibc-1181.webp',
        width: 737,
        height: 288
      },
      {
        code: 'IBC 1204',
        collection: 'Classic - Human Hair',
        src: '/products/ibc-1204.webp',
        width: 736,
        height: 288
      },
      {
        code: 'IBC 1211',
        collection: 'Classic - Human Hair',
        src: '/products/ibc-1211.webp',
        width: 736,
        height: 288
      }
    ]
  }
}

const MIXED = [{code:'IBC 1044',collection:'Soft Touch Lashes',src:'/products/ibc-1044.webp',width:1025,height:401},
  {code:'IBC 1042',collection:'Classic - Human Hair',src:'/products/ibc-1042.webp',width:736,height:288},
  {code:'FM 22-075',collection:'Faux Mink - Protein Silk',src:'/products/fm-22-075.webp',width:736,height:288},
  {code:'IBC 6020',collection:'3D Luxe Lashes',src:'/products/ibc-6020.webp',width:738,height:288}]

// Which photos each landing page shows. Collection pages show their own
// collection and describe it as a Product; general pages show one style from
// each collection.
const BY_SLUG = {
  'soft-touch-lashes-wholesale': COLLECTIONS.soft,
  '3d-luxe-volume-lashes-wholesale': COLLECTIONS.threeD,
  'faux-mink-lashes-wholesale': COLLECTIONS.faux,
  'human-hair-lashes-wholesale': COLLECTIONS.human,
}

const MIXED_SLUGS = new Set([
  'wholesale-eyelashes',
  'handmade-eyelashes',
  'private-label-eyelashes',
  'eyelash-oem-indonesia',
  'custom-eyelashes',
  'eyelash-samples-catalogue-request',
  'eyelash-manufacturer-indonesia',
  'low-moq-eyelash-manufacturer',
])

/** The photos to show on a landing page, or [] when it has none. */
export function photosFor(slug) {
  if (BY_SLUG[slug]) return BY_SLUG[slug].photos
  return MIXED_SLUGS.has(slug) ? MIXED : []
}

/** Alt text that says what the photo shows. */
export const photoAlt = (p) => `${p.code} strip lashes from the ${p.collection} collection, on a white background`

/** schema.org Product for a collection page, or null for any other page. */
export function productSchema(slug, pageUrl, baseUrl) {
  const c = BY_SLUG[slug]
  if (!c) return null
  return {
    '@type': 'Product',
    '@id': `${pageUrl}#product`,
    name: c.name,
    category: 'False eyelashes',
    material: c.material,
    image: c.photos.map((p) => `${baseUrl}${p.src}`),
    brand: { '@type': 'Brand', name: 'MCI Eyelashes' },
    manufacturer: { '@type': 'Organization', name: 'MCI Eyelashes', url: baseUrl },
    countryOfOrigin: 'ID',
  }
}
