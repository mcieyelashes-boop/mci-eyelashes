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

// Default homepage values — used to restore on route leave.
// MUST stay in sync with the same tags in index.html, otherwise returning to
// the homepage from a sub-route silently restores stale copy.
// Only owner-confirmed figures belong here: MOQ 100 pairs/style, free catalog
// samples (buyer pays shipping), 5 working days production on 100-pair orders.
export const HOME_META = {
  title:               'MCI Eyelashes | Wholesale Lash Manufacturer, MOQ 100 Pairs',
  description:         'Direct lash factory in Purbalingga, Indonesia. Mink, silk, synthetic and volume lashes from 100 pairs per style — free catalog samples, 5-day production, private label.',
  canonical:           `${BASE_URL}/`,
  ogTitle:             'MCI Eyelashes | Wholesale Lash Manufacturer — MOQ 100 Pairs, Free Samples',
  ogDescription:       'Factory-direct from Purbalingga, Indonesia — no middleman markup. Order from 100 pairs per style, get free samples on catalog styles, and ship in 5 working days. Private label and OEM available.',
  ogUrl:               `${BASE_URL}/`,
  ogImage:             `${BASE_URL}/hero-lashes.jpg`,
  twitterTitle:        'MCI Eyelashes | Wholesale Lash Manufacturer — MOQ 100 Pairs, Free Samples',
  twitterDescription:  'Factory-direct lashes from Purbalingga, Indonesia. From 100 pairs per style, free catalog samples, 5-day production, private label available.',
}
