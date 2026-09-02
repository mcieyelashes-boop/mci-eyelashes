// Commercial "money pages" for entity/topical authority (SEO + GEO).
// Each entry is rendered by src/pages/LandingPage.jsx and also prerendered
// to static HTML by scripts/prerender-landing.mjs. Only owner-confirmed
// facts go in factSheet/sections — see CLAUDE.md rule on fabricated content.
export const landingPages = [
  {
    slug: 'eyelashes-factory-indonesia',
    title: 'Eyelashes Factory Indonesia | OEM & Private Label Manufacturer | MCI Eyelashes',
    metaDescription: 'MCI Eyelashes is a direct eyelash factory in Purbalingga, Indonesia offering OEM, private label, and custom eyelash manufacturing from 100 pairs per style.',
    h1: 'Eyelashes Factory Indonesia',
    breadcrumbName: 'Eyelashes Factory Indonesia',
    intro: 'MCI Eyelashes is a direct eyelash manufacturer based in Purbalingga, Central Java, Indonesia — producing handmade and custom eyelashes for beauty brands, distributors, salons, and wholesalers worldwide.',
    factSheet: [
      { label: 'Location', value: 'Purbalingga, Central Java, Indonesia' },
      { label: 'MOQ', value: '100 pairs per style' },
      { label: 'Production', value: '5 working days for 100-pair orders' },
      { label: 'OEM', value: 'Available' },
      { label: 'Private Label', value: 'Available — custom curl, length, material, packaging' },
      { label: 'Materials', value: 'Mink, Silk, Synthetic, Human Hair' },
      { label: 'Factory Verification', value: 'Live production-floor video call' },
      { label: 'Samples', value: 'Free on existing catalog styles — buyer covers shipping' },
    ],
    sections: [
      {
        heading: 'Direct Eyelash Manufacturer in Indonesia',
        paragraphs: [
          'MCI Eyelashes is a direct factory, not a trading company or reseller — every order is produced on our own production floor in Purbalingga, Central Java, one of Indonesia’s established eyelash manufacturing hubs. Working directly with the factory means no middleman markup and direct communication with the people making your product.',
          'We supply salons, distributors, and beauty brands building their own eyelash line, from first-time buyers ordering a single style to distributors placing recurring wholesale orders.',
        ],
      },
      {
        heading: 'OEM Eyelash Manufacturing',
        paragraphs: [
          'For brands that want to sell eyelashes under their own name, MCI Eyelashes offers OEM manufacturing on our existing catalog styles — mink, silk, synthetic, human hair, and volume lashes — produced to your specification and packed for your brand.',
        ],
      },
      {
        heading: 'Private Label Eyelashes',
        paragraphs: [
          'Beyond OEM on existing styles, we offer full private label development: custom curl, custom length, custom material blend, and custom packaging design. This is the same wholesale terms as our standard catalog — 100 pairs MOQ per style, mix and match across styles.',
        ],
      },
      {
        heading: 'Our Eyelash Materials',
        paragraphs: [
          'MCI Eyelashes manufactures across four core materials, each suited to a different price point and finish:',
        ],
        list: [
          'Mink lashes — ultra-soft, natural taper, our signature style',
          'Silk lashes — glossy, dramatic finish with consistent curl retention',
          'Synthetic lashes — engineered uniformity at a lower price point',
          'Human hair lashes — 100% sterilized, the most natural blend',
        ],
      },
      {
        heading: 'MOQ & Production Lead Time',
        paragraphs: [
          'Minimum order is 100 pairs per style, and you can mix and match styles within one order to reach that minimum. Standard 100-pair orders take 5 working days to produce. Larger or custom private-label orders vary — contact us for an exact timeline before you order.',
        ],
      },
      {
        heading: 'Custom Packaging',
        paragraphs: [
          'Private label and OEM orders can be packed in custom packaging designed for your brand. Reach out with your brand assets and packaging requirements and we’ll quote design and production together with your lash order.',
        ],
      },
      {
        heading: 'Why Brands Choose MCI Eyelashes',
        paragraphs: [
          'Our position is straightforward: a factory-direct Indonesian manufacturer with one of the lower minimum order quantities in the industry, combined with private label capability and fast production. It’s built for new and growing lash brands that need real customization without committing to a 500+ or 1,000+ pair minimum on their first order.',
        ],
      },
    ],
    faq: [
      {
        q: 'Is MCI Eyelashes a factory or a trading company?',
        a: 'MCI Eyelashes is a direct factory based in Purbalingga, Indonesia — not a trading company or reseller. We welcome a live video call to our production floor before you order.',
      },
      {
        q: 'Where is MCI Eyelashes located?',
        a: 'Purbalingga, Central Java, Indonesia.',
      },
      {
        q: 'What is the MOQ for MCI Eyelashes?',
        a: '100 pairs per style, with mix and match allowed across styles within the same order.',
      },
      {
        q: 'Does MCI Eyelashes offer private label eyelashes?',
        a: 'Yes — custom curl, length, material, and packaging. Contact us with your requirements for a quote.',
      },
      {
        q: 'Does MCI Eyelashes offer OEM manufacturing?',
        a: 'Yes, OEM production is available on our existing catalog styles, packed for your brand.',
      },
      {
        q: 'How long does production take?',
        a: 'Standard 100-pair orders take 5 working days. Larger or custom orders vary — contact us for an exact timeline.',
      },
      {
        q: 'Can buyers verify the factory before ordering?',
        a: 'Yes — we welcome a live video call to our production floor at any time.',
      },
      {
        q: 'Does MCI Eyelashes manufacture for international brands?',
        a: 'Yes, we supply salons, distributors, and beauty brands worldwide.',
      },
    ],
  },
]
