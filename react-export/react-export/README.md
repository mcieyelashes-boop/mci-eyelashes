# MCI Eyelashes — React Export
## New Design System 2025

This folder contains updated React source files for the `mcieyelashes-boop/mci-eyelashes` repo.

---

## Files Changed

| File | What changed |
|---|---|
| `src/index.css` | Full rewrite — dark luxury theme, all component styles |
| `src/App.jsx` | Updated imports, cleaner route structure |
| `src/components/Navbar.jsx` | New dark navbar, logo image, mobile menu |
| `src/components/Hero.jsx` | New hero with SVG lash illustration + marquee |
| `src/components/Products.jsx` | Dark theme, refined panel design |
| `src/components/About.jsx` | Dark section, floating badges, animated counters |
| `src/components/Services.jsx` | Dark grid with hover accent animations |
| `src/components/Testimonials.jsx` | Dark cards, auto-scroll marquee |
| `src/components/Contact.jsx` | Dark form panel, wholesale tiers |
| `src/components/Footer.jsx` | Dark footer with logo image |
| `public/logo.svg` | **NEW** — MCI brand logo (dark backgrounds) |
| `public/logo-light.svg` | **NEW** — MCI brand logo (light backgrounds) |

**Unchanged** (keep existing files):
- `src/components/Process.jsx`
- `src/components/Gallery.jsx`
- `src/components/FAQ.jsx`
- `src/components/Booking.jsx`
- `src/pages/Catalogue.jsx`
- `src/pages/BlogList.jsx`
- `src/pages/BlogPost.jsx`
- `src/data/blogPosts.js`
- `src/utils/`
- `src/main.jsx`
- `index.html`
- `vite.config.js`
- `package.json`

---

## How to Apply

```bash
# 1. Clone your repo (if you haven't already)
git clone https://github.com/mcieyelashes-boop/mci-eyelashes
cd mci-eyelashes

# 2. Create a new branch for the redesign
git checkout -b feat/design-system-2025

# 3. Copy files from this folder into your repo
#    (replace the src/ files and add public/ logos)
cp react-export/src/index.css          src/index.css
cp react-export/src/App.jsx            src/App.jsx
cp react-export/src/components/*.jsx   src/components/
cp react-export/public/logo.svg        public/logo.svg
cp react-export/public/logo-light.svg  public/logo-light.svg

# 4. Install deps (if needed) and run dev server to verify
npm install
npm run dev

# 5. When happy, commit and push
git add .
git commit -m "feat: apply MCI Design System 2025 — dark luxury theme, new logo, hero illustration"
git push origin feat/design-system-2025

# 6. Open a Pull Request on GitHub to merge into master
```

---

## Hero Photo

When you have your hero photo (`/hero-lashes.jpg`), place it in `public/` and update `Hero.jsx`:

```jsx
// In Hero.jsx, replace the lash-illustration div with:
<div style={{
  position: 'absolute', inset: 0,
  backgroundImage: 'url(/hero-lashes.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}} />
```

---

## Notes

- The design uses **zero border-radius** throughout (sharp corners only)
- Fonts load from Google Fonts — already in `index.html` via `<link>` tags
- All animations use Framer Motion (already installed in your repo)
- The `--ease-mci` CSS variable = `cubic-bezier(0.22, 1, 0.36, 1)` — used everywhere
