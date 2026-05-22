import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ANALYSIS_STAGES = [
  { label: 'Extracting video frames & audio',  duration: 1400 },
  { label: 'Running multimodal brain encoder', duration: 1800 },
  { label: 'Mapping cortical fMRI responses',  duration: 1600 },
  { label: 'Computing virality prediction',    duration: 900  },
]

const BRAIN_REGIONS = [
  { key: 'visual',   label: 'Visual Cortex (V1–V4)', desc: 'Visual attention & salience' },
  { key: 'auditory', label: 'Auditory Cortex',        desc: 'Audio engagement & recall' },
  { key: 'limbic',   label: 'Limbic System',           desc: 'Emotional arousal & resonance' },
  { key: 'pfc',      label: 'Prefrontal Cortex',      desc: 'Memorability & brand recall' },
  { key: 'motor',    label: 'Motor Cortex',            desc: 'Action impulse (urge to share)' },
]

const HISTORY_KEY = 'avs_history'
const MAX_HISTORY = 8

// ── Pure helpers ────────────────────────────────────────────

function hashString(str) {
  let h = 5381
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) + h) + str.charCodeAt(i)
    h = h & h
  }
  return Math.abs(h)
}

function generateScores(seed) {
  const s = hashString(seed || String(Date.now()))
  const rng = (offset) => 45 + (hashString(String(s + offset)) % 46)
  const regions = {}
  BRAIN_REGIONS.forEach((r, i) => { regions[r.key] = rng(i * 137) })
  const overall = Math.round(Object.values(regions).reduce((a, b) => a + b, 0) / BRAIN_REGIONS.length)
  return { regions, overall }
}

function viralityLabel(score) {
  if (score >= 80) return { text: 'Excellent', color: '#48B8CA' }
  if (score >= 65) return { text: 'Strong',    color: '#79CFDD' }
  if (score >= 50) return { text: 'Moderate',  color: '#D4A843' }
  return                 { text: 'Low',         color: '#e06060' }
}

async function fetchScores(url, file) {
  const apiBase = import.meta.env.VITE_VIRALITY_API_URL
  if (!apiBase) {
    return { ...generateScores(url || file?.name || String(Date.now())), model: 'mock' }
  }
  const fd = new FormData()
  file ? fd.append('file', file) : fd.append('url', url)
  const res = await fetch(`${apiBase}/api/analyze`, { method: 'POST', body: fd })
  if (!res.ok) throw new Error(`API returned ${res.status} — check your backend`)
  const data = await res.json()
  return { ...data, model: data.model || 'tribev2' }
}

function loadHistory() {
  try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]') }
  catch { return [] }
}

// ── Sub-components ──────────────────────────────────────────

function CircleGauge({ score, size = 180, gradId = 'gaugeGrad' }) {
  const r = (size - 16) / 2
  const circ = 2 * Math.PI * r
  const dash = (score / 100) * circ
  const { text, color } = viralityLabel(score)

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#48B8CA" />
            <stop offset="100%" stopColor="#79CFDD" />
          </linearGradient>
        </defs>
        <circle cx={size/2} cy={size/2} r={r} fill="none"
          stroke="rgba(72,184,202,0.12)" strokeWidth={9} />
        <motion.circle
          cx={size/2} cy={size/2} r={r} fill="none"
          stroke={`url(#${gradId})`} strokeWidth={9} strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: circ - dash }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        />
      </svg>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
      }}>
        <motion.span className="avs-gauge-score"
          style={{ fontSize: size < 160 ? '2.2rem' : '3rem' }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >{score}</motion.span>
        <span className="avs-gauge-label" style={{ color }}>{text}</span>
      </div>
    </div>
  )
}

function RegionBar({ label, desc, score, compareScore, delay }) {
  return (
    <motion.div className="avs-region"
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="avs-region-header">
        <span className="avs-region-name">{label}</span>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          {compareScore !== undefined && (
            <span className="avs-region-score" style={{ color: '#D4A843', opacity: 0.85 }}>B {compareScore}</span>
          )}
          <span className="avs-region-score">{compareScore !== undefined ? `A ${score}` : score}</span>
        </div>
      </div>
      <p className="avs-region-desc">{desc}</p>
      <div className="avs-bar-track" style={{ position: 'relative' }}>
        <motion.div className="avs-bar-fill"
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ delay: delay + 0.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
        {compareScore !== undefined && (
          <motion.div
            style={{
              position: 'absolute', bottom: 0, left: 0, height: 3,
              background: 'linear-gradient(90deg,#D4A843,#F5DC78)',
              borderRadius: 100,
            }}
            initial={{ width: 0 }}
            animate={{ width: `${compareScore}%` }}
            transition={{ delay: delay + 0.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          />
        )}
      </div>
    </motion.div>
  )
}

function AnalyzingCard({ stageIdx, videoLabel }) {
  return (
    <motion.div className="avs-card avs-card--center"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="avs-brain-icon">
        <svg viewBox="0 0 64 64" fill="none">
          <ellipse cx="32" cy="28" rx="22" ry="18" stroke="#48B8CA" strokeWidth="2.2" strokeLinecap="round"/>
          <path d="M10 28 C10 44 24 52 32 52 C40 52 54 44 54 28" stroke="#48B8CA" strokeWidth="2" strokeLinecap="round"/>
          <path d="M32 10 Q36 18 32 28 Q28 18 32 10Z" fill="rgba(72,184,202,0.15)" stroke="#79CFDD" strokeWidth="1.5"/>
          <path d="M14 22 Q22 20 28 28" stroke="#79CFDD" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M50 22 Q42 20 36 28" stroke="#79CFDD" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="32" cy="28" r="3" fill="#48B8CA">
            <animate attributeName="r" values="3;5;3" dur="1.2s" repeatCount="indefinite"/>
            <animate attributeName="opacity" values="1;0.4;1" dur="1.2s" repeatCount="indefinite"/>
          </circle>
        </svg>
      </div>
      <h2 className="avs-analyzing-title">
        Analyzing{videoLabel ? ` ${videoLabel}` : ''} Brain Responses
      </h2>
      <div className="avs-stages">
        {ANALYSIS_STAGES.map((s, i) => (
          <div key={i} className={`avs-stage ${i < stageIdx ? 'done' : i === stageIdx ? 'active' : ''}`}>
            <span className="avs-stage-dot" />
            <span className="avs-stage-label">{s.label}</span>
            {i < stageIdx && <span className="avs-stage-check">✓</span>}
          </div>
        ))}
      </div>
      <div className="avs-progress-track">
        <motion.div className="avs-progress-fill"
          animate={{ width: `${((stageIdx + 0.5) / ANALYSIS_STAGES.length) * 100}%` }}
          transition={{ duration: 0.6 }}
        />
      </div>
    </motion.div>
  )
}

function InputSection({ inputMode, url, file, onUrl, onFile, isDragOver, onDragOver, onDragLeave, onDrop, fileRef, placeholder, videoTag, onEnter }) {
  return (
    <div>
      {inputMode === 'url' ? (
        <input
          className="avs-input" type="url"
          placeholder={placeholder} value={url}
          onChange={e => onUrl(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && onEnter()}
          style={{ width: '100%' }}
        />
      ) : (
        <div
          className={`avs-dropzone ${isDragOver ? 'avs-dropzone--over' : ''} ${file ? 'avs-dropzone--filled' : ''}`}
          onDragOver={e => { e.preventDefault(); onDragOver() }}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={() => fileRef.current?.click()}
          role="button" tabIndex={0}
          onKeyDown={e => e.key === 'Enter' && fileRef.current?.click()}
        >
          <input ref={fileRef} type="file" accept="video/*" style={{ display: 'none' }}
            onChange={e => { const f = e.target.files[0]; if (f) onFile(f) }} />
          {file ? (
            <>
              <span className="avs-dropzone-icon">🎬</span>
              <span className="avs-dropzone-filename">{file.name}</span>
              <span className="avs-dropzone-size">{(file.size / 1e6).toFixed(1)} MB · click to change</span>
            </>
          ) : (
            <>
              <span className="avs-dropzone-icon">☁</span>
              <span className="avs-dropzone-text">Drop {videoTag} here or click to browse</span>
              <span className="avs-dropzone-sub">MP4, MOV, WebM · any size</span>
            </>
          )}
        </div>
      )}
    </div>
  )
}

function InsightCards({ scores }) {
  const insights = [
    {
      icon: '🧠',
      title: 'Emotional Impact',
      value: scores.regions.limbic >= 65 ? 'High' : scores.regions.limbic >= 50 ? 'Moderate' : 'Low',
      detail: `Limbic score ${scores.regions.limbic}/100 — ${scores.regions.limbic >= 65
        ? 'strong emotional resonance likely drives shares'
        : 'consider adding stronger emotional triggers to increase virality'}`,
    },
    {
      icon: '👁',
      title: 'Visual Hook',
      value: scores.regions.visual >= 65 ? 'Strong' : 'Needs work',
      detail: `Visual cortex score ${scores.regions.visual}/100 — ${scores.regions.visual >= 65
        ? 'high visual salience captures attention fast'
        : 'try bolder visuals or faster cuts within the first 3 seconds'}`,
    },
    {
      icon: '📢',
      title: 'Share Impulse',
      value: scores.regions.motor >= 65 ? 'High' : 'Moderate',
      detail: `Motor cortex score ${scores.regions.motor}/100 — ${scores.regions.motor >= 65
        ? 'strong action impulse predicts high organic share rates'
        : 'add a clear, urgent CTA to boost share intent'}`,
    },
    {
      icon: '💡',
      title: 'Brand Recall',
      value: scores.regions.pfc >= 65 ? 'Strong' : 'Moderate',
      detail: `Prefrontal cortex score ${scores.regions.pfc}/100 — ${scores.regions.pfc >= 65
        ? 'high memorability — viewers will remember your brand'
        : 'add a distinctive brand element or memorable hook early on'}`,
    },
  ]
  return (
    <motion.div className="avs-insights"
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {insights.map((c, i) => (
        <div key={i} className="avs-insight-card">
          <span className="avs-insight-icon">{c.icon}</span>
          <div>
            <div className="avs-insight-row">
              <span className="avs-insight-title">{c.title}</span>
              <span className="avs-insight-value">{c.value}</span>
            </div>
            <p className="avs-insight-detail">{c.detail}</p>
          </div>
        </div>
      ))}
    </motion.div>
  )
}

// ── Main component ───────────────────────────────────────────

export default function AdViralityScore() {
  const [mode,        setMode]        = useState('single')
  const [inputMode,   setInputMode]   = useState('url')
  const [url,         setUrl]         = useState('')
  const [file,        setFile]        = useState(null)
  const [compareUrl,  setCompareUrl]  = useState('')
  const [compareFile, setCompareFile] = useState(null)
  const [phase,       setPhase]       = useState('idle')
  const [analyzeStep, setAnalyzeStep] = useState(0)
  const [stageIdx,    setStageIdx]    = useState(0)
  const [scores,      setScores]      = useState(null)
  const [cmpScores,   setCmpScores]   = useState(null)
  const [error,       setError]       = useState(null)
  const [isDragOver,  setIsDragOver]  = useState(false)
  const [history,     setHistory]     = useState(loadHistory)

  const fileRef    = useRef(null)
  const cmpFileRef = useRef(null)
  const mounted    = useRef(true)
  const apiBase    = import.meta.env.VITE_VIRALITY_API_URL

  useEffect(() => () => { mounted.current = false }, [])

  useEffect(() => {
    try { localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, MAX_HISTORY))) }
    catch {}
  }, [history])

  function addHistory(entry) {
    setHistory(prev => [entry, ...prev].slice(0, MAX_HISTORY))
  }

  function runStageAnim() {
    return new Promise(resolve => {
      if (mounted.current) setStageIdx(0)
      let idx = 0
      const tick = () => {
        if (!mounted.current) return resolve()
        idx++
        if (idx < ANALYSIS_STAGES.length) {
          setStageIdx(idx)
          setTimeout(tick, ANALYSIS_STAGES[idx].duration)
        } else resolve()
      }
      setTimeout(tick, ANALYSIS_STAGES[0].duration)
    })
  }

  async function analyze(overrides = {}) {
    const u  = overrides.u  ?? url
    const f  = overrides.f  ?? file
    const cu = overrides.cu ?? compareUrl
    const cf = overrides.cf ?? compareFile

    if (!mounted.current) return
    setPhase('analyzing')
    setAnalyzeStep(0)
    setScores(null)
    setCmpScores(null)
    setError(null)

    try {
      const [, result] = await Promise.all([runStageAnim(), fetchScores(u, f)])
      if (!mounted.current) return
      addHistory({ id: Date.now(), label: u || f?.name || 'Demo', overall: result.overall, regions: result.regions, model: result.model, ts: Date.now() })
      setScores(result)

      if (mode === 'compare') {
        setAnalyzeStep(1)
        const [, cResult] = await Promise.all([runStageAnim(), fetchScores(cu, cf)])
        if (!mounted.current) return
        addHistory({ id: Date.now() + 1, label: cu || cf?.name || 'Video B', overall: cResult.overall, regions: cResult.regions, model: cResult.model, ts: Date.now() })
        setCmpScores(cResult)
      }

      setPhase('results')
    } catch (e) {
      if (!mounted.current) return
      setError(e.message)
      setPhase('error')
    }
  }

  function reset() {
    setPhase('idle'); setUrl(''); setFile(null)
    setCompareUrl(''); setCompareFile(null)
    setScores(null); setCmpScores(null)
    setStageIdx(0); setError(null); setAnalyzeStep(0)
  }

  function switchMode(m) { setMode(m); reset() }
  function switchInput(m) { setInputMode(m); setFile(null); setCompareFile(null) }

  const canPrimary = inputMode === 'url' ? !!url.trim() : !!file
  const canCompare = inputMode === 'url' ? !!compareUrl.trim() : !!compareFile
  const canAnalyze = mode === 'single' ? canPrimary : (canPrimary && canCompare)

  function handleDrop(e, isCompare) {
    e.preventDefault(); setIsDragOver(false)
    const f = e.dataTransfer.files[0]
    if (f && f.type.startsWith('video/')) isCompare ? setCompareFile(f) : setFile(f)
  }

  const isCompareStep = analyzeStep === 1
  const videoLabel = mode === 'compare' ? (isCompareStep ? 'Video B' : 'Video A') : ''

  return (
    <div className="avs-page">
      {/* ── Header ── */}
      <div className="avs-header">
        <motion.div className="avs-badge"
          initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="avs-badge-dot" />
          Powered by TRIBE v2 · Brain Response AI
          {apiBase && <span className="avs-api-live">LIVE</span>}
        </motion.div>
        <motion.h1 className="avs-title"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          Ad &amp; Video<br />Virality Score
        </motion.h1>
        <motion.p className="avs-subtitle"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.22 }}
        >
          Uses cortical fMRI brain-response modeling to predict how viral your ad or
          video will perform — measuring emotional arousal, visual attention,
          memorability, and share impulse across brain regions.
        </motion.p>

        <motion.div className="avs-mode-tabs"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <button className={`avs-mode-tab ${mode === 'single' ? 'active' : ''}`} onClick={() => switchMode('single')}>Single Video</button>
          <button className={`avs-mode-tab ${mode === 'compare' ? 'active' : ''}`} onClick={() => switchMode('compare')}>Compare Two</button>
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        {/* ── Input ── */}
        {phase === 'idle' && (
          <motion.div key="input"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.45 }}
          >
            <div className="avs-card">
              <div className="avs-input-tabs">
                <button className={`avs-input-tab ${inputMode === 'url' ? 'active' : ''}`} onClick={() => switchInput('url')}>URL</button>
                <button className={`avs-input-tab ${inputMode === 'file' ? 'active' : ''}`} onClick={() => switchInput('file')}>Upload File</button>
              </div>

              {mode === 'single' ? (
                <InputSection
                  inputMode={inputMode} url={url} file={file}
                  onUrl={setUrl} onFile={setFile}
                  isDragOver={isDragOver}
                  onDragOver={() => setIsDragOver(true)}
                  onDragLeave={() => setIsDragOver(false)}
                  onDrop={e => handleDrop(e, false)}
                  fileRef={fileRef}
                  placeholder="https://www.youtube.com/watch?v=..."
                  videoTag="video"
                  onEnter={() => canAnalyze && analyze()}
                />
              ) : (
                <div className="avs-compare-inputs">
                  <div>
                    <p className="avs-compare-label">Video A</p>
                    <InputSection
                      inputMode={inputMode} url={url} file={file}
                      onUrl={setUrl} onFile={setFile}
                      isDragOver={false} onDragOver={() => {}} onDragLeave={() => {}}
                      onDrop={e => handleDrop(e, false)}
                      fileRef={fileRef}
                      placeholder="Video A URL..."
                      videoTag="Video A"
                      onEnter={() => {}}
                    />
                  </div>
                  <div>
                    <p className="avs-compare-label">Video B</p>
                    <InputSection
                      inputMode={inputMode} url={compareUrl} file={compareFile}
                      onUrl={setCompareUrl} onFile={setCompareFile}
                      isDragOver={false} onDragOver={() => {}} onDragLeave={() => {}}
                      onDrop={e => handleDrop(e, true)}
                      fileRef={cmpFileRef}
                      placeholder="Video B URL..."
                      videoTag="Video B"
                      onEnter={() => {}}
                    />
                  </div>
                </div>
              )}

              <div className="avs-card-footer">
                <button className="avs-btn" onClick={() => analyze()} disabled={!canAnalyze}>
                  {mode === 'compare' ? 'Compare Videos' : 'Analyze'}
                </button>
                <button className="avs-btn avs-btn--outline" onClick={() =>
                  analyze(mode === 'single' ? { u: 'demo' } : { u: 'demo-a', cu: 'demo-b' })
                }>
                  Demo
                </button>
              </div>
              <p className="avs-note">
                {apiBase
                  ? 'Connected to TRIBE v2 backend — real fMRI predictions are active.'
                  : 'Scores are simulated. Set VITE_VIRALITY_API_URL to connect a real TRIBE v2 server.'}
              </p>
            </div>
          </motion.div>
        )}

        {/* ── Analyzing ── */}
        {phase === 'analyzing' && (
          <motion.div key={`analyzing-${analyzeStep}`}>
            <AnalyzingCard stageIdx={stageIdx} videoLabel={videoLabel} />
          </motion.div>
        )}

        {/* ── Error ── */}
        {phase === 'error' && (
          <motion.div key="error" className="avs-card avs-card--center"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          >
            <div style={{ fontSize: '2.5rem' }}>⚠️</div>
            <h2 className="avs-analyzing-title">Analysis Failed</h2>
            <p className="avs-note" style={{ color: '#e06060' }}>{error}</p>
            <button className="avs-btn" onClick={reset}>Try Again</button>
          </motion.div>
        )}

        {/* ── Results: Single ── */}
        {phase === 'results' && scores && mode === 'single' && (
          <motion.div key="results-single" className="avs-results"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div className="avs-card avs-card--center"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="avs-section-title">Overall Virality Score</h2>
              {scores.model && <span className="avs-model-tag">{scores.model === 'mock' ? 'Simulated' : 'TRIBE v2 Real'}</span>}
              <CircleGauge score={scores.overall} size={180} />
              <p className="avs-note">Score derived from cortical activation across 5 brain regions</p>
            </motion.div>

            <motion.div className="avs-card"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <h2 className="avs-section-title">Brain Region Breakdown</h2>
              <div className="avs-regions">
                {BRAIN_REGIONS.map((r, i) => (
                  <RegionBar key={r.key} label={r.label} desc={r.desc}
                    score={scores.regions[r.key]} delay={i * 0.1} />
                ))}
              </div>
            </motion.div>

            <InsightCards scores={scores} />

            <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: 40 }}>
              <button className="avs-btn avs-btn--outline" onClick={reset}>Analyze Another</button>
            </div>
          </motion.div>
        )}

        {/* ── Results: Compare ── */}
        {phase === 'results' && scores && cmpScores && mode === 'compare' && (
          <motion.div key="results-compare" className="avs-results"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div className="avs-compare-grid"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            >
              {[
                { label: 'Video A', s: scores,    gradId: 'gaugeGradA', winner: scores.overall >= cmpScores.overall },
                { label: 'Video B', s: cmpScores, gradId: 'gaugeGradB', winner: cmpScores.overall > scores.overall },
              ].map(({ label, s, gradId, winner }) => (
                <div key={label} className={`avs-card avs-compare-panel avs-card--center ${winner ? 'avs-compare-panel--winner' : ''}`}>
                  {winner && <span className="avs-winner-badge">Winner</span>}
                  <h3 className="avs-compare-panel-title">{label}</h3>
                  <CircleGauge score={s.overall} size={140} gradId={gradId} />
                  {s.model && <span className="avs-model-tag">{s.model === 'mock' ? 'Simulated' : 'TRIBE v2'}</span>}
                </div>
              ))}
            </motion.div>

            <motion.div className="avs-card"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <h2 className="avs-section-title">Region Comparison</h2>
              <div className="avs-compare-legend">
                <span className="avs-legend-dot avs-legend-a" /> <span className="avs-legend-label">Video A (teal bar)</span>
                <span className="avs-legend-dot avs-legend-b" style={{ marginLeft: 16 }} /> <span className="avs-legend-label">Video B (gold bar)</span>
              </div>
              <div className="avs-regions">
                {BRAIN_REGIONS.map((r, i) => (
                  <RegionBar key={r.key} label={r.label} desc={r.desc}
                    score={scores.regions[r.key]}
                    compareScore={cmpScores.regions[r.key]}
                    delay={i * 0.1} />
                ))}
              </div>
            </motion.div>

            <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: 40 }}>
              <button className="avs-btn avs-btn--outline" onClick={reset}>Compare Again</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── History ── */}
      <AnimatePresence>
        {history.length > 0 && phase === 'idle' && (
          <motion.div className="avs-history"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.35 }}
          >
            <div className="avs-history-header">
              <span className="avs-history-title">Recent Analyses</span>
              <button className="avs-history-clear" onClick={() => setHistory([])}>Clear all</button>
            </div>
            {history.map(item => (
              <div key={item.id} className="avs-history-item">
                <div className="avs-history-info">
                  <span className="avs-history-label" title={item.label}>
                    {item.label.length > 42 ? item.label.slice(0, 42) + '…' : item.label}
                  </span>
                  <span className="avs-history-time">{new Date(item.ts).toLocaleDateString()}</span>
                </div>
                <div className="avs-history-score-wrap">
                  {item.model === 'mock' && <span className="avs-history-sim">sim</span>}
                  <span className="avs-history-score" style={{ color: viralityLabel(item.overall).color }}>
                    {item.overall}
                  </span>
                  <div className="avs-history-bar-wrap">
                    <div className="avs-history-bar" style={{ width: `${item.overall}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
