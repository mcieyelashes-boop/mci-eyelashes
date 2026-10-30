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
// Must match the <head> in index.html: this is what client-side navigation
// back to the home page restores, so a mismatch shows Google two home titles.
const HOME_TITLE = 'Eyelashes Factory Indonesia: OEM & Private Label | MCI Eyelashes'

export const HOME_META = {
  title:               HOME_TITLE,
  description:         'MCI Eyelashes is an Indonesian eyelash manufacturer in Purbalingga offering OEM, private label, custom eyelashes and wholesale production from 100 pairs per style.',
  canonical:           `${BASE_URL}/`,
  ogTitle:             HOME_TITLE,
  ogDescription:       'MCI Eyelashes is a direct eyelash manufacturer in Purbalingga, Indonesia, producing handmade and custom eyelashes for beauty brands, distributors, salons, and wholesalers worldwide.',
  ogUrl:               `${BASE_URL}/`,
  ogImage:             `${BASE_URL}/hero-lashes.jpg`,
  twitterTitle:        HOME_TITLE,
  twitterDescription:  'MCI Eyelashes is a direct eyelash manufacturer in Purbalingga, Indonesia, OEM, private label, custom eyelashes, wholesale from 100 pairs per style.',
}
