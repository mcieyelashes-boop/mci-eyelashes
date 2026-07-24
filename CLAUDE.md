# MCI Eyelashes — company website

Real business site (B2B wholesale eyelash **manufacturer**, not a salon). React 19 + Vite SPA, repo `mcieyelashes-boop/mci-eyelashes`, auto-deploys to Vercel → production domain `www.mci-eyelashes.com` (DNS at Domainesia).

Rules learned the hard way here:

1. **All business claims come from the owner.** MOQ, prices, client counts, certifications, testimonials — never invent or "improve" them. The site once shipped with fabricated offer numbers that had to be stripped (commit `f379b33`). Unknown value → visible placeholder + ask.
2. **Brand assets**: the navbar/favicon logo is the gold MCI monogram (`public/logo-mci.png`) with NO wordmark text next to it. Don't regenerate logos; use the owner's file exactly.
3. **Changed static assets need a new filename** — Vercel CDN serves old bytes for a re-used name (that's why it's `logo-mci.png`, not `logo.png`).
4. **A fix isn't done until the change is visible on `www.mci-eyelashes.com`** in a fresh load — pushing to GitHub is not proof; check the production deployment actually promoted.
5. Design direction the owner approved: dark luxury, gold + teal/navy accents, minimal — and the splash/hero (robot image, full-bleed, head never cropped) stays unless the owner asks.
