import { useRef, useState } from 'react'

// A WAI-ARIA tab list where selection follows focus: arrow keys (and Home and End)
// move between tabs and select them, and only the selected tab is in the Tab
// order. Shared by the collection tabs on the home page and the catalogue page.
//
// The modern-web-guidance "tabs" guide prefers the newer `focusgroup` attribute,
// but that needs a polyfill outside Chrome and Edge. This roving tabindex does
// the same job in every browser with no extra download.
export function useTabs(count, idPrefix) {
  const [active, setActive] = useState(0)
  const listRef = useRef(null)

  const tabId = (i) => `${idPrefix}-tab-${i}`
  const panelId = `${idPrefix}-panel`

  const select = (i, { focus = false } = {}) => {
    setActive(i)
    const tab = document.getElementById(tabId(i))
    if (!tab) return
    if (focus) tab.focus({ preventScroll: true })
    // A tab row that scrolls sideways on phones must reveal the selected tab.
    // `container: 'nearest'` keeps the page itself from scrolling.
    tab.scrollIntoView({ block: 'nearest', inline: 'nearest', container: 'nearest' })
  }

  const onKeyDown = (e) => {
    const keys = { ArrowRight: active + 1, ArrowDown: active + 1, ArrowLeft: active - 1, ArrowUp: active - 1, Home: 0, End: count - 1 }
    if (!(e.key in keys)) return
    e.preventDefault()
    select((keys[e.key] + count) % count, { focus: true })
  }

  const listProps = { role: 'tablist', ref: listRef, onKeyDown }
  const tabProps = (i) => ({
    id: tabId(i),
    type: 'button',
    role: 'tab',
    'aria-selected': active === i,
    tabIndex: active === i ? 0 : -1,
    onClick: () => select(i),
  })
  const panelProps = { id: panelId, role: 'tabpanel', 'aria-labelledby': tabId(active) }

  return { active, listProps, tabProps, panelProps }
}
