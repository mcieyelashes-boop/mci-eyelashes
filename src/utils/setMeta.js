// setMeta — updates <head> meta tags in-place for SPA navigation.
// Works by finding existing elements (set in index.html) and mutating their attributes.

const BASE_URL = 'https://www.mci-eyelashes.com'

function setAttr(selector, attrKey, value) {
  const el = document.querySelector(selector)
  if (el && value) el.setAttribute(attrKey, value)
}

export function setMeta({ title, description, canonical, ogTitle, ogDescription, ogUrl, ogImage, twitterTitle, twitterDescription }) {
  if (title)            document.title = title
  if (description)      setAttr('meta[name="description"]',        'content',  description)
  if (canonical)        setAttr('link[rel="canonical"]',           'href',     canonical)
  if (ogTitle)          setAttr('meta[property="og:title"]',       'content',  ogTitle)
  if (ogDescription)    setAttr('meta[property="og:description"]', 'content',  ogDescription)
  if (ogUrl)            setAttr('meta[property="og:url"]',         'content',  ogUrl)
  if (ogImage)          setAttr('meta[property="og:image"]',       'content',  ogImage)
  if (twitterTitle)     setAttr('meta[name="twitter:title"]',      'content',  twitterTitle)
  if (twitterDescription) setAttr('meta[name="twitter:description"]', 'content', twitterDescription)
}

// Default homepage values — used to restore on route leave
export const HOME_META = {
  title:               'MCI Eyelashes | Premium Wholesale Eyelash Manufacturer & OEM Supplier',
  description:         'MCI Eyelashes is a premium wholesale eyelash manufacturer supplying mink, silk, synthetic, and volume lashes to salons, distributors, and beauty brands in 50+ countries. Private label & OEM services available.',
  canonical:           `${BASE_URL}/`,
  ogTitle:             'MCI Eyelashes | Premium Wholesale Eyelash Manufacturer & OEM Supplier',
  ogDescription:       'Supplying premium handcrafted eyelashes to salons, distributors, and beauty brands worldwide. 500+ global partners across 50+ countries. Private label & OEM services.',
  ogUrl:               `${BASE_URL}/`,
  ogImage:             `${BASE_URL}/hero-lashes.jpg`,
  twitterTitle:        'MCI Eyelashes | Premium Wholesale Eyelash Manufacturer & OEM Supplier',
  twitterDescription:  'Supplying premium handcrafted eyelashes to salons, distributors, and beauty brands worldwide. Private label & OEM services with competitive wholesale pricing.',
}
