import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { installLinkTracking } from './utils/track'

installLinkTracking()

const container = document.getElementById('root')
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// Pages rendered from the real React tree at build time (home, /catalogue)
// carry data-ssr and are hydrated in place. The blog and landing pages are
// hand-built static HTML that only stands in for the app until it loads, so
// React replaces it instead of trying to match it.
if (container.hasAttribute('data-ssr')) {
  hydrateRoot(container, app)
} else {
  createRoot(container).render(app)
}
