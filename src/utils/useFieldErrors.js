import { useEffect } from 'react'

// Keeps screen readers in step with the visible field errors on a form, following
// the modern-web-guidance "accessible-error-announcement" guide:
//
// - The error text under a field is shown by CSS (:user-invalid), so it appears
//   only after the visitor has interacted with the field or tried to submit.
// - This sets aria-invalid at that same moment ("false" until then, because
//   Firefox and Safari report an empty required field as invalid from page load).
// - The error is linked through aria-describedby only while it is shown, because
//   described text is read out even when it is hidden.
// - An error that appears when the visitor leaves a field is announced once,
//   through one polite live region, shortly after focus has moved on.
// - On a failed submit the browser moves focus to the first invalid field, which
//   reads its error, so those are not announced a second time.
//
// Each field names its error element with data-error="<id>".
// `formKey` must change whenever the <form> element is replaced (for example after
// "Send another inquiry"), so the listeners are attached to the new form.
export function useFieldErrors(formRef, announcerRef, formKey) {
  useEffect(() => {
    const form = formRef.current
    const announcer = announcerRef.current
    if (!form || !announcer) return undefined

    let timer
    let announcedField = null
    const flagged = new WeakSet()
    const announced = new WeakSet()

    const linkError = (el, shown) => {
      const errorId = el.dataset.error
      if (!errorId) return
      const ids = (el.getAttribute('aria-describedby') || '').split(/\s+/).filter((id) => id && id !== errorId)
      if (shown) ids.push(errorId)
      if (ids.length) el.setAttribute('aria-describedby', ids.join(' '))
      else el.removeAttribute('aria-describedby')
    }

    const spokenText = (node) => {
      const copy = node.cloneNode(true)
      copy.querySelectorAll('[aria-hidden="true"]').forEach((n) => n.remove())
      return copy.textContent.replace(/\s+/g, ' ').trim()
    }

    const announce = (el) => {
      const error = document.getElementById(el.dataset.error)
      if (!error) return
      const label = el.labels?.[0] ? `${spokenText(el.labels[0])}: ` : ''
      clearTimeout(timer)
      announcer.textContent = ''
      announcedField = el
      timer = setTimeout(() => { announcer.textContent = label + spokenText(error) }, 500)
    }

    const sync = (el, shouldAnnounce = false) => {
      if (!el.matches?.('input, select, textarea') || !el.dataset.error) return
      if (el.matches(':user-invalid')) {
        if (shouldAnnounce && !announced.has(el)) {
          announce(el)
          announced.add(el)
        }
        el.setAttribute('aria-invalid', 'true')
        linkError(el, true)
        flagged.add(el)
      } else if (flagged.has(el) || el.getAttribute('aria-invalid') !== 'true') {
        el.setAttribute('aria-invalid', 'false')
        linkError(el, false)
        flagged.delete(el)
        announced.delete(el)
        if (announcedField === el) {
          clearTimeout(timer)
          announcer.textContent = ''
        }
      }
    }

    form.querySelectorAll('input, select, textarea').forEach((el) => sync(el))

    const onBlur = (e) => sync(e.target, true)
    const onInput = (e) => { if (e.target.hasAttribute('aria-invalid')) sync(e.target) }
    const onChange = (e) => sync(e.target, true)
    const onInvalid = (e) => { announced.add(e.target); sync(e.target) }

    form.addEventListener('blur', onBlur, true)
    form.addEventListener('input', onInput)
    form.addEventListener('change', onChange, true)
    form.addEventListener('invalid', onInvalid, true)
    return () => {
      clearTimeout(timer)
      form.removeEventListener('blur', onBlur, true)
      form.removeEventListener('input', onInput)
      form.removeEventListener('change', onChange, true)
      form.removeEventListener('invalid', onInvalid, true)
    }
  }, [formRef, announcerRef, formKey])
}
