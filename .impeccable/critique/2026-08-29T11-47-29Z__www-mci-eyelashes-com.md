---
target: mci-eyelashes.com
total_score: 22
max_score: 32
na_heuristics: 7,10
p0_count: 1
p1_count: 2
timestamp: 2026-08-29T11-47-29Z
slug: www-mci-eyelashes-com
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Form has loading/success/error states; no server-side send confirmation beyond client toast |
| 2 | Match System / Real World | 2 | "Product Architecture"/"Lash Systems" copy is SaaS-speak on a physical product |
| 3 | User Control and Freedom | 3 | Standard nav/back, FAQ toggles independently, no modal traps |
| 4 | Consistency and Standards | 1 | Services.jsx publishes concrete MOQ/lead-time numbers that contradict FactoryProof.jsx, Contact.jsx, and FAQ.jsx on the same page |
| 5 | Error Prevention | 2 | Native required/checkValidity() is good; no proactive email-format nudge |
| 6 | Recognition Rather Than Recall | 3 | Product tabs, FAQ, tier cards all keep key facts visible |
| 7 | Flexibility and Efficiency | n/a | Persuade-mode single-visit landing site |
| 8 | Aesthetic and Minimalist Design | 2 | Same MOQ/lead-time facts repeated across 5 sections |
| 9 | Error Recovery | 3 | Form failure falls back to a direct email address |
| 10 | Help and Documentation | n/a | FAQ substitutes for a help system on this surface type |
| Total | | 22/32 | Acceptable (69%) |

## Design Specificity Verdict

Mostly template-swappable. Navy #0a1720 + teal #48B8CA, Cormorant Garamond italics, glass-blur cards, dot-grid backgrounds, perspective-tilt hover cards — the exact vocabulary of a 2024-2025 AI/SaaS landing page. Real specificity lives in the copy layer (10-product taxonomy, MOQ language, FactoryProof.jsx trust framing) but isn't visually signaled — no product photography referenced in component structure, no material/texture cue.

detect.mjs ran in degraded mode (HTML/CSS parser modules unavailable, contrast/selector checks skipped). Found: side-tab accent border slop in BlogPost.jsx:172; Montserrat flagged as overused font in index.html:53.

## Overall Impression

Copy and structural empathy are better than the visual system deserves. FactoryProof.jsx reasons through a wary overseas buyer's fears well, and most components enforce an honesty discipline in code comments. But Services.jsx breaks that discipline and sits directly downstream of the trust-building section, undoing it within one scroll.

## What's Working

1. FactoryProof.jsx's "verify us before you spend anything" framing maps directly onto a first-time importer's real fears.
2. Honesty-discipline code comments in About.jsx/Contact.jsx/FAQ.jsx mark owner-confirmed vs unconfirmed numbers and refuse to display the latter.
3. Redundant conversion paths: form failure falls back to direct email; sticky WhatsApp button appears early with a pre-filled message.

## Priority Issues

[P0] Services.jsx (lines 62-67) states "from 500 units," "5-7 business days," "1,000 units," "7-10 business days" as confirmed facts, contradicting FactoryProof/Contact/FAQ's explicit UNCONFIRMED guards and the FAQ's own "contact us for larger orders" hedge. Verified directly in source and confirmed live via screenshot. Violates this project's own CLAUDE.md rule against inventing business claims. Fix: reconcile with owner-confirmed numbers or strip to the same hedged language used elsewhere. Suggested: /impeccable clarify, then /impeccable audit.

[P1] Generic AI-SaaS visual system gives zero signal this is a physical-goods factory. Hero.jsx has no component-level text/CTA of its own. Fix: material/texture cue specific to beauty manufacturing; confirm Gallery renders real photography. Suggested: /impeccable typeset, /impeccable colorize.

[P1] Nine sequential list-digestion sections before the form; MOQ/5-day/free-sample facts repeated 4+ times (About, FactoryProof, CTABanner, Contact). Cognitive-load checklist: 4/8 items failed. Fix: canonicalize trust stats in FactoryProof only. Suggested: /impeccable distill.

[P2] Services grid: 6 non-exclusive purchase paths with identical visual weight, no "start here" signal for first-time buyers. Fix: flag one card the way Contact's tier-featured already does. Suggested: /impeccable layout.

[P3] All 7 contact-form fields rely on placeholder-only text (no label/aria-label); nav/CTA elements show no visible focus ring when tabbed. Fix: add real labels and :focus-visible styles. Suggested: /impeccable harden.

## Persona Red Flags

Jordan (First-Timer): Reassured by FactoryProof's "5 working days," then hits Services' "5-7" and "7-10 business days" with no explanation — undercuts trust just built.

Alex (Power User): Hero.jsx has no CTA/price/MOQ of its own; must scroll past a full 100svh hero before any decision-relevant fact appears.

Sam (Accessibility-Dependent): 7 form fields with no accessible name beyond placeholder; no visible focus indicator on tabbed nav/CTA elements.

## Minor Observations

- .nav-logo-sub: .36em letter-spacing on 8px font, likely borderline illegible.
- AnimatedCounter runs a 2000ms setInterval for single/double-digit values (100, 5, 10) — overhead for negligible payoff.
- Footer lists same-page anchors as if separate destinations.
- contact-cert-pill mixes operational facts into a pattern usually reserved for third-party certifications (ISO, CE) — risks misreading as accreditation.
- 4 POST requests to Google Analytics returned HTTP 503 on page load/navigation.

## Questions to Consider

- If every gradient/glow/glass-blur were stripped, would anything left signal "lash factory" vs "dev-tool demo"?
- FactoryProof is the most persuasive section yet buried under Products tabs and a Process diagram — what if it led instead of the hero?
- Six sections repeat "MOQ 100 / 5 days / free samples" — would one repetition be more convincing than six?
