// Head metadata for pages that are rendered from real React components.
// Shared by the page itself (setMeta on client-side navigation) and the build
// (scripts/prerender-routes.mjs writes the same values into the static HTML),
// so what a crawler reads and what a browser ends up with cannot disagree.
export const CATALOGUE_META = {
  title: 'Product Catalogue | MCI Eyelashes Wholesale',
  description: 'Browse 200+ wholesale eyelash styles across 5 collections: Soft Touch, 3D Luxe, Faux Mink, Human Hair, Under Lashes. MOQ 100 pairs.',
  canonical: 'https://www.mci-eyelashes.com/catalogue',
  ogTitle: 'Product Catalogue - MCI Eyelashes Wholesale',
  ogDescription: 'Browse 200+ wholesale eyelash styles across premium MCI Eyelashes collections. MOQ 100 pairs, private label and OEM available.',
  ogUrl: 'https://www.mci-eyelashes.com/catalogue',
  ogImage: 'https://www.mci-eyelashes.com/product-packaging-wide.png',
  ogImageAlt: 'White and gold eyelash packaging boxes with a clear tray holding a pair of MCI Eyelashes lashes',
  twitterTitle: 'Product Catalogue - MCI Eyelashes Wholesale',
  twitterDescription: 'Browse 200+ wholesale eyelash styles, OEM options, and private-label ready collections.',
}
