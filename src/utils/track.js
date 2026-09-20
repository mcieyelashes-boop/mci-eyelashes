// GA4 event helpers. Analytics must never be able to break the page, so every
// call is guarded: a blocked or not-yet-loaded gtag just means no event.
//
// Nothing personal is sent -- no email address, phone number or message text,
// only what kind of contact was started and from which page. That is also what
// makes the numbers usable: "which page produces inquiries" is the question the
// SEO work has to answer.

export function track(event, params = {}) {
  try {
    if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
    window.gtag('event', event, { page_path: window.location.pathname, ...params })
  } catch {
    // ignore: see above
  }
}

// One delegated listener instead of an onClick on every link, so a page added
// later (for example by the weekly content run) is tracked without anyone
// remembering to wire it.
const LINK_EVENTS = [
  { test: (href) => /^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(href), event: 'whatsapp_click' },
  { test: (href) => href.startsWith('mailto:'), event: 'email_click' },
  { test: (href) => href.startsWith('tel:'), event: 'phone_click' },
]

export function installLinkTracking() {
  document.addEventListener(
    'click',
    (e) => {
      const link = e.target instanceof Element ? e.target.closest('a[href]') : null
      if (!link) return
      const href = link.getAttribute('href') || ''
      const match = LINK_EVENTS.find((l) => l.test(href))
      if (match) track(match.event)
    },
    { capture: true },
  )
}

// Where a contact came from, as plain text that survives into an email or a
// WhatsApp message. "home" for the root, otherwise the path without the slash.
export function pageRef(pathname = window.location.pathname) {
  return pathname === '/' ? 'home' : pathname.replace(/^\//, '')
}
