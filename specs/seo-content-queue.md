# SEO/GEO Content Queue — 20 new pages, max 2/week

Source: owner's SEO/GEO blueprint (2026-09-02), content strategy section 20.
Goal: 10 new commercial landing pages + 10 new educational blog posts, on
top of the 8 commercial pages and 13 blog posts already live. Published at
most 2 items per week via a scheduled weekly agent run, so publish velocity
doesn't look like a spam burst to Google.

## Rules for every item (non-negotiable, from CLAUDE.md)

- Only owner-confirmed facts: Purbalingga factory, MOQ 100 pairs/style
  (mix & match), 5 working days production on 100-pair orders, free samples
  on catalog styles (buyer covers shipping), private label (custom curl/
  length/material/packaging), OEM, live factory video call, materials =
  Mink/Silk/Synthetic/Human Hair, and the 5 real Catalogue.jsx collections
  (Soft Touch, 3D Luxe, Faux Mink–Protein Silk, Classic Human Hair, Under
  Lashes) with their real `material`/`moq`/`badge` fields.
- No invented prices, employee counts, factory size, certifications, or
  process steps beyond what's already in the codebase.
- Each item must take a genuinely distinct angle from every existing page
  (8 commercial + 13 blog + each other) — check for overlap before writing.
- Commercial pages: add to `src/data/landingPages.js`, route in `src/App.jsx`,
  rewrite in `vercel.json`, entry in `public/sitemap.xml`, at least one
  inbound link (footer or a related page/post) and one outbound cross-link.
- Educational pages: add to `src/data/blogPosts.js`, entry in
  `public/sitemap.xml`, at least one inbound link from a related commercial
  or blog page.
- Before marking an item done: `vite build` clean, prerender scripts run
  clean, 0 console errors on the new route (local preview), no mobile
  (375px) horizontal overflow, then commit + push + verify the live URL
  returns 200 with the right `<title>` before checking it off here.

## Weekly agent instructions

Each run: pick the next 1–2 `pending` items below (commercial/educational
mix is fine, no fixed ratio per week), build them per the rules above, then
edit this file to mark them `done` with the date and commit that edit too.
If fewer than 2 pending items remain, do just those and note the queue is
empty — don't invent extra items beyond this list without asking the owner.

## Commercial (10) — target: `src/data/landingPages.js`

| # | Status | Slug | Primary keyword | Angle |
|---|--------|------|------------------|-------|
| C1 | done (2026-09-07) | `soft-touch-lashes-wholesale` | soft touch lashes wholesale | Product page for the real "Soft Touch Lashes" catalogue collection (Korean Synthetic/Human Hair, Bestseller) |
| C2 | pending | `3d-luxe-volume-lashes-wholesale` | 3D volume lashes wholesale | Product page for the real "3D Luxe Lashes" collection (Multi-Layer Synthetic, Premium) |
| C3 | pending | `faux-mink-lashes-wholesale` | faux mink lashes wholesale | Product page for the real "Faux Mink — Protein Silk" collection (Cruelty Free) |
| C4 | pending | `human-hair-lashes-wholesale` | human hair lashes wholesale | Product page for the real "Classic — Human Hair" collection (100% Sterilized) |
| C5 | pending | `under-lashes-wholesale` | under lashes wholesale | Product page for the real "Under Lashes" collection — low-competition longtail, unique category |
| C6 | pending | `low-moq-eyelash-manufacturer` | low MOQ eyelash manufacturer | The strategic positioning/moat page from blueprint §24 — "factory-direct + low MOQ + private label" as MCI's differentiator vs. Royal Korindah/Bio Takara scale |
| C7 | pending | `eyelash-distributor-indonesia` | eyelash distributor Indonesia | Persona page for distributors/resellers specifically (recurring bulk orders, mixed-style pallets) vs. brand builders |
| C8 | pending | `eyelash-manufacturer-for-new-brands` | eyelash manufacturer for new brands | Persona page for first-time lash brand founders — low MOQ entry point, sample-first path |
| C9 | pending | `eyelash-samples-catalogue-request` | eyelash sample request | Dedicated conversion page for the free-sample + catalogue-request intent (currently only a CTA block, not its own indexable page) |
| C10 | pending | `eyelash-manufacturer-export-shipping` | eyelash manufacturer export | Company-capability page: worldwide export, shipping methods, what buyers need to know before their first international order (distinct from the blog's buyer-education import guide) |

## Educational (10) — target: `src/data/blogPosts.js`

| # | Status | Slug | Primary keyword | Angle |
|---|--------|------|------------------|-------|
| E1 | pending | `how-handmade-eyelashes-are-made` | how are eyelashes made | General industry education on handmade lash construction — framed as industry knowledge, not a claimed exact MCI internal process |
| E2 | pending | `private-label-eyelash-cost-guide` | private label eyelash manufacturing cost | What drives private label cost (MOQ, material, packaging, customization) — factors/framework, not invented price figures |
| E3 | pending | `what-moq-should-a-new-lash-brand-order` | what MOQ for new lash brand | Decision guide for first-time brand founders on order size |
| E4 | pending | `how-to-start-a-private-label-lash-brand` | how to start a private label lash brand | Step-by-step distinct from existing general `how-to-start-lash-business` post — private-label-specific path |
| E5 | pending | `which-eyelash-material-has-best-margin` | eyelash resale profit margin | Material comparison from a resale-profitability angle (distinct from existing mink-vs-silk texture/durability post) |
| E6 | pending | `eyelash-manufacturer-vs-wholesaler-vs-distributor` | eyelash manufacturer vs distributor | Clarifies supply-chain roles, links to the new distributor/new-brand persona commercial pages |
| E7 | pending | `eyelash-supplier-red-flags` | how to vet an eyelash supplier | Buyer-protection angle: MOQ/lead-time terms to watch for, distinct from existing `how-to-choose-eyelash-manufacturer` |
| E8 | done (2026-09-07) | `eyelash-curl-types-explained` | eyelash curl types | Technical reference: J/B/C/D/CC/U curl guide for spec'ing custom/private-label orders |
| E9 | pending | `eyelash-band-types-explained` | eyelash band types | Technical reference: cotton vs silk vs clear band, complements curl guide |
| E10 | pending | `how-to-calculate-wholesale-lash-profit-margin` | wholesale eyelash profit margin calculator | Worked example using generic/illustrative numbers only (no fabricated real MCI pricing) |

## Log

- 2026-09-02 — Queue created. 0/20 done.
- 2026-09-07 — Built C1 (`soft-touch-lashes-wholesale` landing page) and E8 (`eyelash-curl-types-explained` blog post). 2/20 done.
