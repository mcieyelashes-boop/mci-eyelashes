import { useState, useEffect, useCallback } from 'react'

const REFRESH_INTERVAL = 5 * 60 * 1000 // 5 minutes
const STORAGE_KEY = 'mci_dash_v2'

function loadLocal() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {} } catch { return {} }
}

function saveLocal(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

async function apiFetch(path) {
  try {
    const res = await fetch(path)
    const json = await res.json()
    if (json.error) return { data: null, error: json.error }
    return { data: json.data, error: null }
  } catch (e) {
    return { data: null, error: e.message }
  }
}

export function useDashboard() {
  const [local, setLocalRaw] = useState(loadLocal)
  const [live, setLive] = useState({
    contacts: { loading: true, data: null, error: null },
    deals:    { loading: true, data: null, error: null },
    pipeline: { loading: true, data: null, error: null },
    activity: { loading: true, data: null, error: null },
    gmail:    { loading: true, data: null, error: null },
  })
  const [lastRefresh, setLastRefresh] = useState(null)

  const setLocal = useCallback((updater) => {
    setLocalRaw(prev => {
      const next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater }
      saveLocal(next)
      return next
    })
  }, [])

  const fetchLive = useCallback(async () => {
    // fire all in parallel
    const [contacts, deals, pipeline, activity, gmail] = await Promise.all([
      apiFetch('/api/hubspot?resource=contacts'),
      apiFetch('/api/hubspot?resource=deals'),
      apiFetch('/api/hubspot?resource=pipeline'),
      apiFetch('/api/hubspot?resource=activity'),
      apiFetch('/api/gmail?resource=stats'),
    ])
    setLive({
      contacts: { loading: false, ...contacts },
      deals:    { loading: false, ...deals },
      pipeline: { loading: false, ...pipeline },
      activity: { loading: false, ...activity },
      gmail:    { loading: false, ...gmail },
    })
    setLastRefresh(new Date())
  }, [])

  useEffect(() => {
    fetchLive()
    const id = setInterval(fetchLive, REFRESH_INTERVAL)
    return () => clearInterval(id)
  }, [fetchLive])

  return { live, local, setLocal, refresh: fetchLive, lastRefresh }
}
