// Commercial "money pages" for entity/topical authority (SEO + GEO).
// Each entry is rendered by src/pages/LandingPage.jsx and also prerendered
// to static HTML by scripts/prerender-landing.mjs. Only owner-confirmed
// facts go in factSheet/sections: see CLAUDE.md rule on fabricated content.
export const landingPages = [
  {
    slug: 'eyelash-manufacturer-indonesia',
    title: 'Eyelash Manufacturer Indonesia: Sourcing Guide | MCI Eyelashes',
    metaDescription: 'Sourcing lashes from an eyelash manufacturer in Indonesia: why buyers choose Indonesian factories, how to vet one, MOQ, lead time and shipping.',
    h1: 'Eyelash Manufacturer Indonesia: How to Source and What to Check',
    breadcrumbName: 'Eyelash Manufacturer Indonesia',
    intro: 'Indonesia has an established eyelash manufacturing industry, and Purbalingga in Central Java is one of its hubs. This page is for buyers deciding whether to source from an Indonesian factory: why buyers do it, how to tell a good manufacturer from an average one, and what minimums, lead times and shipping look like. MCI Eyelashes is one of those manufacturers, so we use our own terms as the worked example.',
    factSheet: [
      { label: 'Country', value: 'Indonesia' },
      { label: 'Factory location', value: 'Purbalingga, Central Java' },
      { label: 'Supplies', value: 'Salons, distributors, beauty brands, wholesalers' },
      { label: 'MOQ', value: '100 pairs per style, mix & match allowed' },
      { label: 'Production', value: '5 working days for 100-pair orders' },
      { label: 'Shipping', value: 'Worldwide, 7-14 days' },
      { label: 'Verification', value: 'Live video call to the production floor' },
    ],
    sections: [
      {
        heading: 'Why buyers source eyelashes from Indonesia',
        paragraphs: [
          'Indonesia is known for handmade strip lashes, made by experienced hands with consistency from batch to batch. Many factories export, so they are used to working with buyers abroad.',
          'The practical reasons buyers give are simple. You can deal with the manufacturer directly instead of a trading company, which removes a middleman margin and puts you in touch with the people making your order. Many factories work with brands that are still growing, so minimums are within reach. And curl, length, material and packaging can be built to your brief.',
          'None of that makes every Indonesian factory good. The next section is how to check the one you are talking to.',
        ],
      },
      {
        heading: 'How to tell a strong manufacturer from an average one',
        paragraphs: ['Ask these before you pay anything:'],
        list: [
          'Can I see the factory? A real manufacturer will do a video call from the production floor or send production photos. If they refuse, walk away.',
          'Can I have samples first? A manufacturer confident in its product sends samples before a bulk order.',
          'What is the minimum, and can styles be mixed? The answer should be per style and in writing.',
          'How long does production take, and do you meet it? Ask for the lead time in writing.',
          'What documents can you provide for my market? Ask for copies you can check, not logos on a website.',
          'Will you answer in clear English? Slow or evasive replies before an order predict service after it.',
        ],
      },
      {
        heading: 'What MCI Eyelashes makes',
        paragraphs: [
          'We make handmade lashes in mink, silk, synthetic and human hair, organized in five collections: Soft Touch, 3D Luxe, Faux Mink - Protein Silk, Classic - Human Hair, and Under Lashes. You can browse them in the [product catalogue](/catalogue) or read about how they are made on our [handmade eyelashes](/handmade-eyelashes) page.',
          'If you want a design of your own, we produce [OEM](/eyelash-oem-indonesia) on existing styles and develop [private label](/private-label-eyelashes) lashes to your own specification.',
        ],
      },
      {
        heading: 'Minimums, lead time and shipping from Indonesia',
        paragraphs: [
          'Minimums and prices differ by factory, style and material, so give every supplier the same brief and compare like with like. At MCI the minimum is 100 pairs per style, and you can mix styles in one order to reach it. Production for a 100-pair order takes 5 working days. Larger orders vary, so ask for a timeline before you order.',
          'For shipping, express courier is the fastest way to receive samples and first orders, air freight suits mid-size orders where speed still matters, and sea freight suits large orders where cost per unit matters most. Our catalogue lists worldwide shipping at 7 to 14 days. For customs, duties and paperwork, read our guide to [importing eyelashes from Indonesia](/blog/import-eyelashes-from-indonesia-guide).',
        ],
      },
      {
        heading: 'Who we manufacture for',
        paragraphs: [
          'We supply lash artists and salons buying for their own studio, distributors reselling wholesale, and beauty brands building a private label or OEM line. A first order can be small: one style from several collections, 100 pairs each, mixed in one shipment.',
          'For our standard terms in one place, see [wholesale eyelashes](/wholesale-eyelashes). If you want to know more about the town where we work, read about our [factory in Purbalingga](/eyelash-manufacturer-purbalingga).',
        ],
      },
      {
        heading: 'A first order, step by step',
        list: [
          'Send an inquiry by email or WhatsApp with the product type, the order size and your country. We reply within 24 hours with the catalogue and price sheet.',
          'Ask for samples. Samples on existing catalog styles are free, and you cover the shipping.',
          'Ask for a live video call to the production floor if you want to see the factory before you pay.',
          'Place the order at 100 pairs per style, mixing styles as you like.',
          'Production takes 5 working days for a 100-pair order, then the order ships to you.',
        ],
        paragraphs: ['This is the route most first-time buyers take with us:'],
      },
    ],
    faq: [
      { q: 'Is MCI Eyelashes based in Indonesia?', a: 'Yes. MCI Eyelashes is a direct factory in Purbalingga, Central Java, Indonesia, supplying buyers worldwide.' },
      { q: 'Why source eyelashes from an Indonesian manufacturer?', a: 'Buyers choose Indonesia for handmade lashes, direct contact with the factory instead of a trading company, minimums that suit growing brands, and room to customize the product.' },
      { q: 'What is the minimum order for an Indonesian eyelash manufacturer like MCI?', a: 'At MCI the minimum is 100 pairs per style, and you can mix and match styles within one order. Other factories set their own minimums, so ask each one in writing.' },
      { q: 'How long does shipping from Indonesia take?', a: 'It depends on the method and your destination. Express courier is fastest, sea freight is slowest. Our catalogue lists worldwide shipping at 7 to 14 days.' },
      { q: 'Can I verify that MCI is a real factory before ordering?', a: 'Yes. We welcome a live video call to our production floor in Purbalingga before you send any money.' },
      { q: 'What materials does MCI manufacture in?', a: 'We manufacture handmade lashes in four materials (mink, silk, synthetic, human hair) across five collections in our product catalogue.' },
    ],
  },
  {
    slug: 'private-label-eyelashes',
    title: 'Private Label Eyelashes Manufacturer | MCI Eyelashes',
    metaDescription: 'MCI Eyelashes offers private label eyelash manufacturing with custom curl, length, material, and packaging, MOQ 100 pairs per style, factory direct from Indonesia.',
    h1: 'Private Label Eyelashes',
    breadcrumbName: 'Private Label Eyelashes',
    intro: 'MCI Eyelashes develops private label eyelashes for beauty brands, custom curl, length, material, and packaging, produced factory-direct in Purbalingga, Indonesia, from a 100-pair minimum per style.',
    factSheet: [
      { label: 'Service', value: 'Private label eyelash manufacturing' },
      { label: 'MOQ', value: '100 pairs per style' },
      { label: 'Customizable', value: 'Curl, length, material, packaging' },
      { label: 'Location', value: 'Purbalingga, Central Java, Indonesia' },
      { label: 'Samples', value: 'Free on existing catalog styles: buyer covers shipping' },
      { label: 'Verification', value: 'Live production-floor video call' },
    ],
    sections: [
      {
        heading: 'What Private Label Eyelash Manufacturing Means',
        paragraphs: [
          'Private label means the lash is developed and packaged specifically for your brand rather than sold from our existing catalog. That includes custom curl, custom length, custom material blend, and custom packaging design, so the finished product carries your brand identity, not ours.',
        ],
      },
      {
        heading: 'What Can Be Customized',
        paragraphs: [
          'MCI Eyelashes takes private label requests on:',
        ],
        list: [
          'Curl style and intensity',
          'Lash length and taper',
          'Material: mink, silk, synthetic, or human hair',
          'Band style and tray design',
          'Retail packaging and branding',
        ],
      },
      {
        heading: 'MOQ and Getting Started',
        paragraphs: [
          'Private label orders use the same 100-pair-per-style minimum as our standard wholesale terms. New brands typically start with a smaller private label run to validate the design before scaling volume. Contact us with your specification (curl, length, material, and packaging direction), for a quote and production timeline.',
        ],
      },
      {
        heading: 'Private Label vs. OEM',
        paragraphs: [
          'Private label involves developing a new design specifically for your brand, while OEM applies your branding to an existing catalog style, a faster route if you don’t need a custom design from scratch. See our [OEM eyelash manufacturing](/eyelash-oem-indonesia) page for that option.',
        ],
      },
    ],
    faq: [
      { q: 'What is the MOQ for private label eyelashes at MCI?', a: '100 pairs per style, the same as our standard wholesale terms.' },
      { q: 'Can I customize the curl and length?', a: 'Yes: curl style, length, and material are all customizable for private label orders.' },
      { q: 'Can I customize the packaging?', a: 'Yes, private label orders can include custom packaging design and branding.' },
      { q: 'What is the difference between private label and OEM at MCI?', a: 'Private label develops a new design for your brand; OEM applies your branding to an existing catalog style.' },
      { q: 'How do I start a private label order?', a: 'Contact us with your curl, length, material, and packaging requirements for a quote and timeline.' },
    ],
  },
  {
    slug: 'eyelash-oem-indonesia',
    title: 'Eyelash OEM Manufacturer Indonesia | MCI Eyelashes',
    metaDescription: 'MCI Eyelashes offers OEM eyelash manufacturing in Indonesia. Your branding on our existing catalog styles, MOQ 100 pairs, 5 working days production.',
    h1: 'Eyelash OEM Manufacturer Indonesia',
    breadcrumbName: 'Eyelash OEM Indonesia',
    intro: 'MCI Eyelashes offers OEM eyelash manufacturing from our Purbalingga, Indonesia factory, producing our existing catalog styles under your brand, with a 100-pair MOQ and 5 working days production.',
    factSheet: [
      { label: 'Service', value: 'OEM eyelash manufacturing' },
      { label: 'MOQ', value: '100 pairs per style' },
      { label: 'Production', value: '5 working days for 100-pair orders' },
      { label: 'Location', value: 'Purbalingga, Central Java, Indonesia' },
      { label: 'Materials', value: 'Mink, Silk, Synthetic, Human Hair' },
      { label: 'Packaging', value: 'Custom branding available' },
    ],
    sections: [
      {
        heading: 'What OEM Eyelash Manufacturing Means',
        paragraphs: [
          'OEM (original equipment manufacturing) means we produce one of our existing catalog styles and pack it under your brand name and packaging, without developing a new lash design from scratch. It’s the faster route to launching a branded lash product.',
        ],
      },
      {
        heading: 'How It Works',
        paragraphs: [
          'Choose a style from our existing mink, silk, synthetic, or human hair catalog, confirm your branding and packaging, and place your order at the standard 100-pair-per-style minimum. Production takes 5 working days for standard 100-pair orders.',
        ],
      },
      {
        heading: 'OEM vs. Private Label',
        paragraphs: [
          'OEM uses an existing MCI design under your brand, the quickest path to a branded product. If you need a custom curl, length, or material developed specifically for your brand, that’s [private label manufacturing](/private-label-eyelashes), which we also offer.',
        ],
      },
      {
        heading: 'Getting Started with OEM',
        paragraphs: [
          'Request our catalog and pricing sheet, pick your styles, and send your branding requirements. We welcome a live video call to our production floor before you commit to an order.',
        ],
      },
    ],
    faq: [
      { q: 'What does OEM mean for eyelash manufacturing?', a: 'OEM means producing an existing catalog style under your own brand and packaging, rather than developing a new design.' },
      { q: 'What is the MOQ for OEM orders at MCI?', a: 'The minimum order for OEM production is 100 pairs per style.' },
      { q: 'How long does OEM production take?', a: 'OEM production takes 5 working days for a standard 100-pair order.' },
      { q: 'Can I put my own branding on MCI’s existing styles?', a: 'Yes: that’s exactly what our OEM service covers.' },
      { q: 'Is OEM cheaper or faster than private label?', a: 'OEM is typically faster since it uses an existing design; private label takes longer because the lash itself is developed for your brand.' },
    ],
  },
  {
    slug: 'custom-eyelashes',
    title: 'Custom Eyelashes Manufacturer | MCI Eyelashes',
    metaDescription: 'MCI Eyelashes manufactures custom eyelashes: curl, length, material, and packaging built to your specification, factory direct from Indonesia, MOQ 100 pairs.',
    h1: 'Custom Eyelashes Manufacturer',
    breadcrumbName: 'Custom Eyelashes',
    intro: 'MCI Eyelashes manufactures custom eyelashes to a buyer’s specification (curl, length, material, and packaging), factory direct from Purbalingga, Indonesia.',
    factSheet: [
      { label: 'Customizable', value: 'Curl, length, material, packaging' },
      { label: 'MOQ', value: '100 pairs per style' },
      { label: 'Materials', value: 'Mink, Silk, Synthetic, Human Hair' },
      { label: 'Location', value: 'Purbalingga, Central Java, Indonesia' },
      { label: 'Production', value: '5 working days for 100-pair orders' },
    ],
    sections: [
      {
        heading: 'What Can Be Customized',
        paragraphs: ['MCI Eyelashes takes custom specification across four dimensions:'],
        list: [
          'Curl: from natural to dramatic',
          'Length: per-style and mixed-length designs',
          'Material: mink, silk, synthetic, or human hair',
          'Packaging: tray design and branding',
        ],
      },
      {
        heading: 'Who Orders Custom Eyelashes',
        paragraphs: [
          'Custom orders typically come from beauty brands building a private label line, distributors targeting a specific market segment, or salons that want a signature style not in a standard catalog. The process is the same as our [private label service](/private-label-eyelashes), see that page for how customization requests are handled end to end.',
        ],
      },
      {
        heading: 'MOQ for Custom Orders',
        paragraphs: [
          'Custom eyelashes use the same 100-pair-per-style minimum as our standard wholesale terms. Larger custom orders and packaging lead times vary, contact us with your specification for an exact quote.',
        ],
      },
    ],
    faq: [
      { q: 'What can I customize when ordering eyelashes from MCI?', a: 'You can customize the curl, length, material, and packaging.' },
      { q: 'What is the MOQ for custom eyelashes?', a: 'The minimum order for custom eyelashes is 100 pairs per style.' },
      { q: 'Is custom eyelash manufacturing the same as private label?', a: 'Yes: custom specification is handled through our private label service.' },
      { q: 'How do I request a custom eyelash design?', a: 'Contact us with your curl, length, material, and packaging requirements for a quote.' },
    ],
  },
  {
    slug: 'wholesale-eyelashes',
    title: 'Wholesale Eyelashes Supplier | MCI Eyelashes',
    metaDescription: 'MCI Eyelashes supplies wholesale eyelashes factory-direct from Indonesia, mink, silk, synthetic, and human hair lashes, MOQ 100 pairs per style, mix and match.',
    h1: 'Wholesale Eyelashes Supplier',
    breadcrumbName: 'Wholesale Eyelashes',
    intro: 'MCI Eyelashes supplies wholesale eyelashes factory-direct from Purbalingga, Indonesia, mink, silk, synthetic, and human hair styles, with a 100-pair MOQ per style and mix-and-match ordering.',
    factSheet: [
      { label: 'MOQ', value: '100 pairs per style, mix & match allowed' },
      { label: 'Production', value: '5 working days for 100-pair orders' },
      { label: 'Samples', value: 'Free on existing catalog styles: buyer covers shipping' },
      { label: 'Materials', value: 'Mink, Silk, Synthetic, Human Hair' },
      { label: 'Buyers', value: 'Salons, distributors, beauty brands' },
    ],
    sections: [
      {
        heading: 'Buying Wholesale from MCI Eyelashes',
        paragraphs: [
          'Wholesale ordering means buying from our existing catalog at factory-direct pricing, no private label development or custom packaging required, though both are available if you want them later. It’s the simplest way to stock lashes for a salon or start reselling as a distributor.',
        ],
      },
      {
        heading: 'MOQ and Mixing Styles',
        paragraphs: [
          'The minimum order is 100 pairs per style, and you can mix and match styles within a single order to reach that minimum, you’re not required to order 100 pairs of one single style.',
        ],
      },
      {
        heading: 'Samples Before You Order',
        paragraphs: [
          'Samples on existing catalog styles are free. You only cover shipping. This lets you check quality before committing to a full wholesale order.',
        ],
      },
      {
        heading: 'Full Catalog',
        paragraphs: [
          'Browse our full range of styles, series, and SKUs on the [product catalogue](/catalogue) page, or request a catalog and price list directly.',
        ],
      },
    ],
    faq: [
      { q: 'What is the minimum wholesale order at MCI Eyelashes?', a: '100 pairs per style, mix and match allowed across styles.' },
      { q: 'Can I get a sample before ordering wholesale?', a: 'Yes, samples on existing catalog styles are free. You cover the shipping cost.' },
      { q: 'How long does a wholesale order take to produce?', a: 'A standard 100-pair wholesale order takes 5 working days to produce.' },
      { q: 'Do I need to order 100 pairs of a single style?', a: 'No. You can mix and match styles within one order to reach the 100-pair minimum.' },
    ],
  },
  {
    slug: 'eyelash-manufacturer-purbalingga',
    title: 'Eyelash Manufacturer in Purbalingga, Indonesia | MCI Eyelashes',
    metaDescription: 'MCI Eyelashes is a direct eyelash manufacturer based in Purbalingga, Central Java, Indonesia, one of the country’s established eyelash production hubs.',
    h1: 'Eyelash Manufacturer in Purbalingga, Indonesia',
    breadcrumbName: 'Eyelash Manufacturer Purbalingga',
    intro: 'Purbalingga, Central Java, is home to a cluster of Indonesian eyelash manufacturers, and MCI Eyelashes is a direct factory operating within that industry.',
    factSheet: [
      { label: 'City', value: 'Purbalingga, Central Java, Indonesia' },
      { label: 'Factory Type', value: 'Direct manufacturer' },
      { label: 'MOQ', value: '100 pairs per style' },
      { label: 'Production', value: '5 working days for 100-pair orders' },
      { label: 'Verification', value: 'Live production-floor video call' },
    ],
    sections: [
      {
        heading: 'Purbalingga as an Eyelash Manufacturing Location',
        paragraphs: [
          'Purbalingga, in Central Java, is one of Indonesia’s established locations for eyelash manufacturing, home to a number of factories in the industry. MCI Eyelashes operates as a direct manufacturer based in this city.',
        ],
      },
      {
        heading: 'MCI Eyelashes in Purbalingga',
        paragraphs: [
          'We produce handmade mink, silk, synthetic, and human hair lashes on our own production floor, supplying salons, distributors, and beauty brands. Buyers are welcome to request a live video call to see the factory before ordering.',
        ],
      },
      {
        heading: 'Ordering from Our Purbalingga Factory',
        paragraphs: [
          'Standard wholesale orders start at 100 pairs per style, mixed and matched across styles, with 5 working days production. [OEM](/eyelash-oem-indonesia) and [private label](/private-label-eyelashes) manufacturing are also available from the same factory.',
        ],
      },
    ],
    faq: [
      { q: 'Where in Indonesia is MCI Eyelashes located?', a: 'MCI Eyelashes is located in Purbalingga, Central Java, Indonesia.' },
      { q: 'Is Purbalingga a known location for eyelash manufacturing?', a: 'Yes. It is home to a cluster of Indonesian eyelash manufacturers, including MCI Eyelashes.' },
      { q: 'Can I visit or verify the Purbalingga factory?', a: 'We offer a live video call to our production floor for buyers who want to verify before ordering; in-person visits can be discussed on request.' },
    ],
  },
  {
    slug: 'handmade-eyelashes',
    title: 'Handmade Eyelashes Manufacturer Indonesia | MCI Eyelashes',
    metaDescription: 'MCI Eyelashes produces handmade eyelashes in Purbalingga, Indonesia, mink, silk, synthetic, and human hair styles, factory direct, MOQ 100 pairs per style.',
    h1: 'Handmade Eyelashes Manufacturer Indonesia',
    breadcrumbName: 'Handmade Eyelashes',
    intro: 'MCI Eyelashes produces handmade eyelashes in Purbalingga, Indonesia, across mink, silk, synthetic, and human hair, factory direct, from a 100-pair minimum per style.',
    factSheet: [
      { label: 'Production Method', value: 'Handmade' },
      { label: 'Location', value: 'Purbalingga, Central Java, Indonesia' },
      { label: 'Materials', value: 'Mink, Silk, Synthetic, Human Hair' },
      { label: 'MOQ', value: '100 pairs per style' },
      { label: 'Reusability', value: 'Mink styles reusable 20-25 times' },
    ],
    sections: [
      {
        heading: 'Handmade Lash Production',
        paragraphs: [
          'MCI Eyelashes produces handmade strip and volume lashes rather than machine-only assembly. Each style is built on our production floor in Purbalingga, Indonesia across mink, silk, synthetic, and human hair. For a general look at how handmade strip lashes are constructed industry-wide, see [how handmade eyelashes are made](/blog/how-handmade-eyelashes-are-made).',
        ],
      },
      {
        heading: 'Materials We Work With',
        paragraphs: ['Handmade construction is used across our core material range:'],
        list: [
          'Mink lashes: ultra-soft, natural taper, reusable 20-25 times',
          'Silk lashes: glossy, dramatic finish',
          'Synthetic lashes: durable, uniform, budget-friendly',
          'Human hair lashes: 100% sterilized, most natural',
        ],
      },
      {
        heading: 'Ordering Handmade Lashes Wholesale',
        paragraphs: [
          'Standard wholesale MOQ is 100 pairs per style, mixed and matched across styles, with 5 working days production. [Private label](/private-label-eyelashes) and [OEM](/eyelash-oem-indonesia) manufacturing are also available on the same handmade styles.',
        ],
      },
    ],
    faq: [
      { q: 'Are MCI Eyelashes handmade or machine-made?', a: 'Handmade: produced on our own production floor in Purbalingga, Indonesia.' },
      { q: 'What materials are the handmade lashes made from?', a: 'Our handmade lashes are made from mink, silk, synthetic, and human hair.' },
      { q: 'How many times can handmade mink lashes be reused?', a: 'Our mink styles are reusable 20-25 times with proper care.' },
      { q: 'What is the MOQ for handmade eyelashes at MCI?', a: '100 pairs per style, mixed and matched across styles.' },
    ],
  },
  {
    slug: 'soft-touch-lashes-wholesale',
    title: 'Soft Touch Lashes Wholesale | MCI Eyelashes',
    metaDescription: 'Wholesale Soft Touch Lashes from MCI Eyelashes, Korean Synthetic and Human Hair, 7 series, 77 SKUs, 100-pair MOQ per style, factory direct from Indonesia.',
    h1: 'Soft Touch Lashes Wholesale',
    breadcrumbName: 'Soft Touch Lashes',
    intro: 'Soft Touch Lashes is MCI Eyelashes’ bestselling collection, the industry standard for over 50 years, built from Korean Synthetic fiber and 100% sterilized Human Hair with tapered technology, available wholesale from a 100-pair MOQ per style.',
    factSheet: [
      { label: 'Collection', value: 'Soft Touch Lashes' },
      { label: 'Status', value: 'Bestseller: industry standard for 50+ years' },
      { label: 'Material', value: 'Korean Synthetic / Human Hair' },
      { label: 'Series', value: '7 series, 77 SKUs' },
      { label: 'MOQ', value: '100 pairs per style: mix & match allowed' },
      { label: 'Samples', value: 'Free on existing catalog styles: buyer covers shipping' },
    ],
    sections: [
      {
        heading: 'What Is the Soft Touch Lashes Collection',
        paragraphs: [
          'Soft Touch Lashes is the industry standard MCI Eyelashes has produced for over 50 years, ultra lightweight and comfortable for all-day wear. The collection is built from High Quality Korean Synthetic Fiber and 100% sterilized Human Hair, with tapered technology used for extra drama on select styles.',
        ],
      },
      {
        heading: 'Seven Series Within Soft Touch',
        paragraphs: [
          'The collection spans 7 series and 77 SKUs total:',
        ],
        list: [
          'Natural Series: 12 SKUs',
          'Wispy Series: 12 SKUs',
          'Volume Series: 12 SKUs',
          'Extended Volume Series: 12 SKUs',
          'Dramatic Series: 12 SKUs',
          'Pro Series: 3 SKUs',
          'Tappered Series: 14 SKUs',
        ],
      },
      {
        heading: 'Materials: Korean Synthetic Fiber & Human Hair',
        paragraphs: [
          'Soft Touch styles are produced in Korean Synthetic fiber and 100% sterilized Human Hair. For the full range of materials MCI works with across every collection, including mink and silk, see our [handmade eyelashes manufacturing](/handmade-eyelashes) page.',
        ],
      },
      {
        heading: 'MOQ, Samples & Ordering',
        paragraphs: [
          'Soft Touch Lashes ship at the standard 100-pair-per-style [wholesale](/wholesale-eyelashes) minimum, and you can mix and match across the 7 series to reach that minimum in one order. Free samples on existing Soft Touch styles are available. You only cover shipping. Browse full SKU listings for all 7 series on the [product catalogue](/catalogue).',
        ],
      },
      {
        heading: 'Private Label on Soft Touch Styles',
        paragraphs: [
          'Soft Touch styles can also be produced as [OEM](/eyelash-oem-indonesia) under your own brand, or developed into a fully [private label](/private-label-eyelashes) lash with custom curl, length, material, and packaging.',
        ],
      },
    ],
    faq: [
      { q: 'What is Soft Touch Lashes?', a: 'Soft Touch Lashes is MCI Eyelashes’ bestselling collection, the industry standard for over 50 years, made from Korean Synthetic fiber and 100% sterilized Human Hair with tapered technology.' },
      { q: 'What is the MOQ for Soft Touch Lashes?', a: '100 pairs per style, and you can mix and match across the 7 Soft Touch series to reach that minimum.' },
      { q: 'How many styles are in the Soft Touch collection?', a: '77 SKUs across 7 series: Natural, Wispy, Volume, Extended Volume, Dramatic, Pro, and Tappered.' },
      { q: 'What materials are Soft Touch Lashes made from?', a: 'Korean Synthetic fiber and 100% sterilized Human Hair.' },
      { q: 'Can I get a sample of Soft Touch Lashes before ordering wholesale?', a: 'Yes: samples on existing Soft Touch catalog styles are free, you only cover shipping.' },
      { q: 'Can Soft Touch styles be private labeled?', a: 'Yes: Soft Touch styles are available for OEM branding or full private label development with custom curl, length, material, and packaging.' },
    ],
  },
  {
    slug: '3d-luxe-volume-lashes-wholesale',
    title: '3D Volume Lashes Wholesale | 3D Luxe Collection | MCI Eyelashes',
    metaDescription: 'Wholesale 3D Luxe volume lashes from MCI Eyelashes, Multi-Layer Synthetic construction, 5 pages of styles, 100-pair MOQ per style, factory direct from Indonesia.',
    h1: '3D Volume Lashes Wholesale',
    breadcrumbName: '3D Luxe Lashes',
    intro: '3D Luxe Lashes is MCI Eyelashes’ premium volume collection, multi-layer construction built from Multi-Layer Synthetic fiber for maximum depth and drama, available wholesale from a 100-pair MOQ per style.',
    factSheet: [
      { label: 'Collection', value: '3D Luxe Lashes' },
      { label: 'Status', value: 'Premium: high demand' },
      { label: 'Material', value: 'Multi-Layer Synthetic' },
      { label: 'Styles', value: '5 pages of styles' },
      { label: 'MOQ', value: '100 pairs per style: mix & match allowed' },
      { label: 'Samples', value: 'Free on existing catalog styles: buyer covers shipping' },
    ],
    sections: [
      {
        heading: 'What Is the 3D Luxe Lashes Collection',
        paragraphs: [
          '3D Luxe Lashes is MCI Eyelashes’ premium volume collection, built using multi-layer 3D construction to create extraordinary depth and fullness beyond what a single-layer strip lash can achieve. The collection is in high demand among buyers looking for a bolder, more dramatic finish than our [Soft Touch](/soft-touch-lashes-wholesale) styles.',
        ],
      },
      {
        heading: 'Multi-Layer Construction',
        paragraphs: [
          '3D Luxe styles are built from Multi-Layer Synthetic fiber, with layers stacked to add volume and dimension across the lash line. This construction is well suited to bridal, editorial, and event looks, and to clients who want a strip lash with maximum visual impact.',
        ],
      },
      {
        heading: 'Styles Within 3D Luxe',
        paragraphs: [
          'The collection spans 5 pages of styles. Full SKU listings for every page are available on the [product catalogue](/catalogue), organized for easy browsing and reordering.',
        ],
      },
      {
        heading: 'Material: Multi-Layer Synthetic',
        paragraphs: [
          '3D Luxe is produced in Multi-Layer Synthetic fiber. For the full range of materials MCI works with across every collection (including mink, silk, and human hair), see our [handmade eyelashes manufacturing](/handmade-eyelashes) page.',
        ],
      },
      {
        heading: 'MOQ, Samples & Ordering',
        paragraphs: [
          '3D Luxe Lashes ship at the standard 100-pair-per-style [wholesale](/wholesale-eyelashes) minimum, and you can mix and match across pages to reach that minimum in one order. Free samples on existing 3D Luxe styles are available. You only cover shipping.',
        ],
      },
      {
        heading: 'Private Label on 3D Luxe Styles',
        paragraphs: [
          '3D Luxe styles can also be produced as [OEM](/eyelash-oem-indonesia) under your own brand, or developed into a fully [private label](/private-label-eyelashes) lash with custom curl, length, material, and packaging.',
        ],
      },
    ],
    faq: [
      { q: 'What is 3D Luxe Lashes?', a: '3D Luxe Lashes is MCI Eyelashes’ premium volume collection, using multi-layer 3D construction in Multi-Layer Synthetic fiber for extra depth and drama.' },
      { q: 'What is the MOQ for 3D Luxe Lashes?', a: '100 pairs per style, and you can mix and match across the collection’s 5 pages of styles to reach that minimum.' },
      { q: 'What material is the 3D Luxe collection made from?', a: 'The 3D Luxe collection is made from Multi-Layer Synthetic fiber.' },
      { q: 'Who is the 3D Luxe collection best suited for?', a: 'Buyers wanting a bolder, more dramatic finish than a standard strip lash, commonly used for bridal, editorial, and event looks.' },
      { q: 'Can I get a sample of 3D Luxe Lashes before ordering wholesale?', a: 'Yes: samples on existing 3D Luxe catalog styles are free, you only cover shipping.' },
      { q: 'Can 3D Luxe styles be private labeled?', a: 'Yes: 3D Luxe styles are available for OEM branding or full private label development with custom curl, length, material, and packaging.' },
    ],
  },
  {
    slug: 'faux-mink-lashes-wholesale',
    title: 'Faux Mink Lashes Wholesale | Cruelty-Free | MCI Eyelashes',
    metaDescription: 'Wholesale faux mink lashes in cruelty-free Protein Silk. Three collections of six styles, 100-pair MOQ per style, free samples, factory direct from Indonesia.',
    h1: 'Faux Mink Lashes Wholesale',
    breadcrumbName: 'Faux Mink Lashes',
    intro: 'Faux Mink - Protein Silk is our cruelty-free collection: Protein Silk fiber made to give the look and feel of genuine mink without animal products. It is sold wholesale from 100 pairs per style, and this page explains who it suits, how to choose your first styles, and how to order.',
    factSheet: [
      { label: 'Collection', value: 'Faux Mink - Protein Silk' },
      { label: 'Status', value: 'Cruelty Free' },
      { label: 'Material', value: 'Protein Silk Fiber' },
      { label: 'Range', value: '3 collections of 6 styles each' },
      { label: 'MOQ', value: '100 pairs per style, mix & match allowed' },
      { label: 'Production', value: '5 working days for 100-pair orders' },
      { label: 'Samples', value: 'Free on existing catalog styles, buyer covers shipping' },
    ],
    sections: [
      {
        heading: 'Who faux mink suits, and who it does not',
        paragraphs: [
          'Faux mink is the right choice when your customers ask for a soft, lightweight lash and also care that no animal product is involved. That describes vegan-minded salons, premium retail shelves, and brands that want a cruelty-free line they can put on the label.',
          'It is not the right choice if a customer specifically asks for real mink. For that, look at our mink styles on the [handmade eyelashes](/handmade-eyelashes) page. If you are unsure which of your customers is which, order samples of both and let a few real clients compare them.',
        ],
      },
      {
        heading: 'What is in the collection',
        paragraphs: [
          'The Faux Mink range has three collections, each with six styles, so eighteen styles in all. They are organized by the look your customer wants on the eye:',
        ],
        list: [
          'Natural Collection, six styles, for an everyday finish that reads as the wearer’s own lashes.',
          'Wispy Collection, six styles, for a lighter, feathered look.',
          'Volume Collection, six styles, for a fuller line with more presence.',
        ],
      },
      {
        heading: 'How to pick your first styles',
        paragraphs: [
          'The minimum is 100 pairs per style, and you can mix styles in one order. That means you do not have to bet on a single look. One style from each collection is a 300-pair first order that covers natural, wispy and volume together.',
          'After the first sales you will see which look your own customers reach for. Reorder those styles, and add the next ones from the same collection. A full style list is available on request, so ask for it once you know the direction you want to go.',
        ],
      },
      {
        heading: 'Test the samples before you commit',
        paragraphs: [
          'Samples on existing catalog styles are free, and you cover the shipping. When they arrive, do more than look at them. Feel the softness of the fiber, check that the band bends easily, and see how the curl sits on a real eye. Put them next to the lashes you sell now, and ask two or three clients which they prefer.',
          'Samples are also the fastest way to decide between faux mink and the other collections, such as [Soft Touch](/soft-touch-lashes-wholesale) or [3D Luxe](/3d-luxe-volume-lashes-wholesale).',
        ],
      },
      {
        heading: 'Wording your cruelty-free claim',
        paragraphs: [
          'The collection is cruelty-free and made without animal-derived material. Describe it that way on your packaging and product pages, in plain words, rather than borrowing a logo or a certification you do not hold.',
          'If your market or your retailer asks for documentation behind a cruelty-free claim, tell us which market you are selling into and we will confirm what we can provide before you commit to an order.',
        ],
      },
      {
        heading: 'Ordering, timing and your own brand',
        paragraphs: [
          'Production for a 100-pair order takes 5 working days, and shipping to your country comes on top of that. Our catalogue lists worldwide shipping at 7 to 14 days. Larger orders vary, so ask us for a timeline before you order.',
          'If you want faux mink under your own name, we can produce it as [OEM](/eyelash-oem-indonesia) on the existing styles, or develop it as [private label](/private-label-eyelashes) with your curl, length and packaging. You can also review the whole range in the [product catalogue](/catalogue), or see the wider [wholesale eyelash terms](/wholesale-eyelashes).',
          'Not sure the factory is real? Ask for a live video call to the production floor before you send any money.',
        ],
      },
    ],
    faq: [
      { q: 'What is Faux Mink - Protein Silk?', a: 'Faux Mink - Protein Silk is our cruelty-free collection. It uses protein silk fiber to give the soft, natural look of genuine mink without animal products.' },
      { q: 'Is Faux Mink actually cruelty-free?', a: 'Yes. Faux Mink styles are made from protein silk fiber, with no animal-derived material in the product.' },
      { q: 'What is the MOQ for Faux Mink Lashes?', a: 'The minimum is 100 pairs per style. You can mix and match styles across the three collections to reach the minimum in one order.' },
      { q: 'How many styles are in the Faux Mink collection?', a: 'There are three collections, Natural, Wispy and Volume, with six styles each. A full style listing is available on request.' },
      { q: 'Can I get a sample of Faux Mink Lashes before ordering wholesale?', a: 'Yes. Samples on existing Faux Mink catalog styles are free, and you only cover the shipping to your address.' },
      { q: 'Which Faux Mink style should a first order start with?', a: 'Start with one style from each collection, which makes a 300-pair order covering natural, wispy and volume looks. Then reorder the styles your own customers choose.' },
      { q: 'Can Faux Mink styles be private labeled?', a: 'Yes. Faux Mink styles can be produced as OEM under your brand, or developed as private label with custom curl, length, material and packaging.' },
      { q: 'How long does a Faux Mink order take to produce?', a: 'Production for a 100-pair order takes 5 working days, before shipping to your country. Larger orders vary, so ask us for a timeline before you order.' },
    ],
  },
]
