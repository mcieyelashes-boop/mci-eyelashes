import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

// Only the five collections in the product photo catalogues. Do not add a
// collection here unless the owner confirms MCI sells it.
const products = [
  { id: '01', name: 'Soft Touch Lashes', tagline: '50+ Years Heritage', badge: 'Bestseller', skus: 'IBC 1044 to IBC 3016', desc: 'The industry standard for over 50 years. Ultra lightweight and comfortable for all-day wear, ideal for daily use and professional applications.', specs: ['Natural · Wispy · Volume series', 'Korean synthetic fiber', 'Tapered-end technology', '60+ styles available'], moq: '100 pairs' },
  { id: '02', name: '3D Luxe Lashes', tagline: 'Premium Volume', badge: 'Premium', skus: 'IBC 6002 to IBC 6184', desc: 'Multi-layer 3D construction for extraordinary depth and volume. Perfect for bridal, editorial, and clients who want maximum impact.', specs: ['Multi-layer 3D construction', '29 styles available', 'Bridal · editorial · events', 'High drama finish'], moq: '100 pairs' },
  { id: '03', name: 'Faux Mink', tagline: 'Protein Silk · Ethical Luxury', badge: 'Cruelty Free', skus: 'FM 20-002 to FM 22-199', desc: 'Protein silk technology delivers the look of genuine mink without animal products. Ultra-soft, lightweight drape for vegan salons.', specs: ['100% cruelty free', 'Protein silk fiber', 'Mink-like softness', '100% vegan'], moq: '100 pairs' },
  { id: '04', name: 'Human Hair Classic', tagline: '100% Sterilized · Most Natural', badge: 'Ultra Natural', skus: 'IBC 1042 to IBC 1256', desc: 'The absolute most natural look. 100% sterilized human hair that blends seamlessly with existing lashes.', specs: ['100% sterilized human hair', 'Hand-inspected before dispatch', 'Most natural appearance', 'Premium salon grade'], moq: '100 pairs' },
  { id: '05', name: 'Under Lashes', tagline: 'Lower Lash Line Specialty', badge: 'Specialty', skus: 'IBC 1052-U to IBC 6098-U', desc: 'Designed specifically for the lower lash line. A unique upsell for your salon with 18 distinct styles.', specs: ['Lower lash line design', 'Tapered-End technology', '18 styles available', 'Unique upsell'], moq: '100 pairs' },
]

export default function Products() {
  const ref = useRef(null)
  useInView(ref, { once: true, margin: '-80px' })
  const [active, setActive] = useState(0)
  const p = products[active]

  // The tab bar overflows on narrow screens, but a plain
  // overflow-x:auto div has no native click-and-drag scrolling on desktop —
  // only touch/trackpad swipe works. With no visible scrollbar
  // (scrollbar-width:none) and no other cue, mouse users had no way to
  // reach the later tabs at all. This adds a manual grab-to-scroll handler
  // plus fade cues that reflect real scroll position.
  const tabsWrapRef = useRef(null)
  const dragState = useRef({ down: false, startX: 0, startScroll: 0, moved: false })
  const [fade, setFade] = useState({ left: false, right: false })

  const updateFade = useCallback(() => {
    const el = tabsWrapRef.current
    if (!el) return
    setFade({
      left: el.scrollLeft > 4,
      right: el.scrollLeft < el.scrollWidth - el.clientWidth - 4,
    })
  }, [])

  useEffect(() => {
    updateFade()
    window.addEventListener('resize', updateFade)
    return () => window.removeEventListener('resize', updateFade)
  }, [updateFade])

  const onPointerDown = (e) => {
    const el = tabsWrapRef.current
    dragState.current = { down: true, startX: e.clientX, startScroll: el.scrollLeft, moved: false }
    // Can throw (NotFoundError) if the pointer is no longer active by the
    // time this runs — a real edge case on rapid taps, not just a test
    // artifact. Losing capture just means drag-tracking falls back to
    // whatever the browser does natively; it shouldn't crash the handler.
    try { el.setPointerCapture?.(e.pointerId) } catch { /* pointer already gone */ }
    el.style.cursor = 'grabbing'
  }
  const onPointerMove = (e) => {
    const s = dragState.current
    if (!s.down) return
    const dx = e.clientX - s.startX
    if (Math.abs(dx) > 3) s.moved = true
    tabsWrapRef.current.scrollLeft = s.startScroll - dx
  }
  const endDrag = () => {
    dragState.current.down = false
    if (tabsWrapRef.current) tabsWrapRef.current.style.cursor = 'grab'
  }
  // A drag that actually moved the row shouldn't also fire the tab's click.
  // `moved` is consumed here rather than reset in endDrag: it needs to
  // survive from pointerup to the click event that follows it (that's the
  // whole point), but must not leak into a LATER click that never went
  // through a pointerdown at all — a keyboard Enter/Space activation or a
  // screen reader's synthesized click. Clearing it right after reading
  // keeps it scoped to exactly the gesture that set it.
  const onTabClick = (i) => {
    const wasDrag = dragState.current.moved
    dragState.current.moved = false
    if (!wasDrag) setActive(i)
  }

  return (
    <section id="products" className="prod-section" style={{ padding: '120px 0' }}>
      <div className="prod-inner">
        <motion.div className="prod-header" initial={false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} ref={ref}>
          <p className="section-label">Our Collections</p>
          <h2 className="section-title">Ten Lash Collections <span className="accent-light">Built to Order</span></h2>
          <p className="prod-subtitle">For salons, distributors, and private-label founders, pick a style, request a free sample, and order direct from the factory.</p>
        </motion.div>

        <div className="prod-tabs-outer">
          <div
            className="prod-tabs-wrap"
            ref={tabsWrapRef}
            onScroll={updateFade}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerLeave={endDrag}
          >
            <div className="prod-tabs">
              {products.map((prod, i) => (
                <button key={prod.id} className={`prod-tab${active === i ? ' active' : ''}`} onClick={() => onTabClick(i)}>
                  <span className="prod-tab-id">{prod.id}</span>
                  <span className="prod-tab-name">{prod.name}</span>
                </button>
              ))}
            </div>
          </div>
          {fade.left && <div className="prod-tabs-fade left" />}
          {fade.right && <div className="prod-tabs-fade right" />}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}>
            <div className="prod-panel-bar">
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span className="prod-badge">{p.badge}</span>
                <span className="prod-sku-range">{p.skus}</span>
              </div>
              <span style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(255,255,255,.08)', letterSpacing: '.2em' }}>{p.id}</span>
            </div>
            <div className="prod-panel-body">
              <div className="prod-info">
                <h3 className="prod-name">{p.name}</h3>
                <p className="prod-tagline">{p.tagline}</p>
                <p className="prod-desc">{p.desc}</p>
                <ul className="prod-specs">
                  {p.specs.map(s => <li key={s}><span className="prod-spec-dot">-</span>{s}</li>)}
                </ul>
                <div className="prod-moq">
                  <span className="prod-moq-label">Min. Order</span>
                  <span className="prod-moq-val">{p.moq} - Mix & match allowed</span>
                </div>
                <a href="#contact" className="prod-cta">Request Quote</a>
              </div>
              <div className="prod-visual">
                <div className="prod-visual-inner">
                  <div className="prod-visual-num">{p.id}</div>
                  <div className="prod-visual-name">{p.name}</div>
                  <div className="prod-visual-divider" />
                  {p.specs.map(s => (
                    <div key={s} className="prod-visual-spec"><span>-</span>{s}</div>
                  ))}
                  <div className="prod-visual-moq">MOQ {p.moq}</div>
                </div>
              </div>
            </div>
            <div className="prod-dots">
              {products.map((_, i) => (
                <button key={i} className={`prod-dot${active === i ? ' active' : ''}`} onClick={() => setActive(i)} aria-label={`Collection ${i + 1}`} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="prod-bottom">
          <span>OEM design support - Private label packaging - Sample kits before production</span>
          <a href="#contact" className="prod-bottom-link">Build your lash line</a>
        </div>
      </div>
    </section>
  )
}
