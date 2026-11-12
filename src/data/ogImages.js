// Written by scripts/make-og-images.mjs. Posts listed here have their own share
// image at /og/<slug>.jpg; any other post uses the site-wide one.
const WITH_IMAGE = new Set([
  "mink-vs-silk-lashes-wholesale-guide",
  "how-to-start-lash-business",
  "private-label-eyelashes-oem-guide",
  "wholesale-eyelash-pricing-guide",
  "3d-vs-5d-volume-lashes-guide",
  "how-to-choose-eyelash-manufacturer",
  "eyelash-packaging-guide",
  "eyelash-business-mistakes",
  "eyelash-extension-supplies-wholesale",
  "custom-eyelash-packaging-wholesale",
  "false-eyelashes-market-trends-2026",
  "import-eyelashes-from-indonesia-guide",
  "eyelash-curl-types-explained",
  "eyelash-band-types-explained",
  "how-handmade-eyelashes-are-made",
  "what-moq-should-a-new-lash-brand-order",
  "eyelash-manufacturer-vs-wholesaler-vs-distributor",
  "which-eyelash-material-has-best-margin",
  "eyelash-supplier-red-flags"
])

export const ogImageFor = (slug, baseUrl) =>
  WITH_IMAGE.has(slug) ? `${baseUrl}/og/${slug}.jpg` : `${baseUrl}/hero-lashes.jpg`
