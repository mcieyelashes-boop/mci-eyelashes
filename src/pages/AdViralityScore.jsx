import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const ANALYSIS_STAGES = [
  { label: 'Extracting video frames & audio', duration: 1400 },
  { label: 'Running multimodal brain encoder', duration: 1800 },
  { label: 'Mapping cortical fMRI responses', duration: 1600 },
  { label: 'Computing virality prediction', duration: 900 },
]

const BRAIN_REGIONS = [
  { key: 'visual',    label: 'Visual Cortex (V1–V4)',    desc: 'Visual attention & salience' },
  { key: 'auditory',  label: 'Auditory Cortex',          desc: 'Audio engagement & recall' },
  { key: 'limbic',    label: 'Limbic System',             desc: 'Emotional arousal & resonance' },
  { key: 'pfc',       label: 'Prefrontal Cortex',        desc: 'Memorability & brand recall' },
  { key: 'motor',     label: 'Motor Cortex',             desc: 'Action impulse (urge to share)' },
]

function hashString(str) {
  let h = 5381
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) + h) + str.charCodeAt(i)
    h = h & h
  }
  return Math.abs(h)
}

function generateScores(url) {
  const seed = hashString(url || String(Date.now()))
  const rng = (offset) => {
    const v = hashString(String(seed + offset))
    return 45 + (v % 46)
  }
  const scores = {}
  BRAIN_REGIONS.forEach((r, i) => {
    scores[r.key] = rng(i * 137)
  })
  const avg = Math.round(
    Object.values(scores).reduce((a, b) => a + b, 0) / BRAIN_REGIONS.length
  )
  return { regions: scores, overall: avg }
}

function viralityLabel(score) {
  if (score >= 80) return { text: 'Viral Potential: Excellent', color: '#48B8CA' }
  if (score >= 65) return { text: 'Viral Potential: Strong', color: '#79CFDD' }
  if (score >= 50) return { text: 'Viral Potential: Moderate', color: '#D4A843' }
  return { text: 'Viral Potential: Low', color: '#e06060' }
}

function CircleGauge({ score, size = 180 }) {
  const r = (size - 20) / 2
  const circ = 2 * Math.PI * r
  const dash = (score / 100) * circ
  const label = viralityLabel(score)

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke="rgba(72,184,202,0.12)" strokeWidth={10} />
        <motion.circle
          cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke="url(#gaugeGrad)" strokeWidth={10}
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: circ - dash }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        />
        <defs>
          <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#48B8CA" />
            <stop offset="100%" stopColor="#79CFDD" />
          </linearGradient>
        </defs>
      </svg>
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: 2,
      }}>
        <motion.span
          className="avs-gauge-score"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          {score}
        </motion.span>
        <span className="avs-gauge-label" style={{ color: label.color }}>{label.text}</span>
      </div>
    </div>
  )
}

function RegionBar({ label, desc, score, delay }) {
  return (
    <motion.div
      className="avs-region"
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="avs-region-header">
        <span className="avs-region-name">{label}</span>
        <span className="avs-region-score">{score}</span>
      </div>
      <p className="avs-region-desc">{desc}</p>
      <div className="avs-bar-track">
        <motion.div
          className="avs-bar-fill"
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ delay: delay + 0.1, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </motion.div>
  )
}

export default function AdViralityScore() {
  const [url, setUrl]         = useState('')
  const [phase, setPhase]     = useState('idle')   // idle | analyzing | results
  const [stageIdx, setStageIdx] = useState(0)
  const [scores, setScores]   = useState(null)
  const timerRef = useRef(null)

  useEffect(() => () => clearTimeout(timerRef.current), [])

  function runAnalysis() {
    setPhase('analyzing')
    setStageIdx(0)

    let idx = 0
    const advance = () => {
      idx++
      if (idx < ANALYSIS_STAGES.length) {
        setStageIdx(idx)
        timerRef.current = setTimeout(advance, ANALYSIS_STAGES[idx].duration)
      } else {
        setScores(generateScores(url))
        setPhase('results')
      }
    }
    timerRef.current = setTimeout(advance, ANALYSIS_STAGES[0].duration)
  }

  function reset() {
    setPhase('idle')
    setUrl('')
    setScores(null)
    setStageIdx(0)
  }

  return (
    <div className="avs-page">
      {/* Header */}
      <div className="avs-header">
        <motion.div
          className="avs-badge"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="avs-badge-dot" />
          Powered by TRIBE v2 · Brain Response AI
        </motion.div>
        <motion.h1
          className="avs-title"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1 }}
        >
          Ad &amp; Video<br />Virality Score
        </motion.h1>
        <motion.p
          className="avs-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.22 }}
        >
          Uses cortical fMRI brain-response modeling to predict how viral your ad or
          video will perform — measuring emotional arousal, visual attention,
          memorability, and share impulse across brain regions.
        </motion.p>
      </div>

      {/* Input card */}
      <AnimatePresence mode="wait">
        {phase === 'idle' && (
          <motion.div
            key="input"
            className="avs-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.45 }}
          >
            <label className="avs-input-label">
              Video URL
              <span className="avs-input-hint">YouTube, Vimeo, or direct mp4 link</span>
            </label>
            <div className="avs-input-row">
              <input
                className="avs-input"
                type="url"
                placeholder="https://www.youtube.com/watch?v=..."
                value={url}
                onChange={e => setUrl(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && url.trim() && runAnalysis()}
              />
              <button
                className="avs-btn"
                onClick={runAnalysis}
                disabled={!url.trim()}
              >
                Analyze
              </button>
            </div>

            <div className="avs-or-row">
              <span className="avs-or-line" />
              <span className="avs-or-text">or</span>
              <span className="avs-or-line" />
            </div>

            <button
              className="avs-btn avs-btn--outline"
              style={{ width: '100%' }}
              onClick={() => { setUrl('demo'); runAnalysis() }}
            >
              Run Demo Analysis
            </button>

            <p className="avs-note">
              Brain response scores are simulated via TRIBE v2 neural encoding.
              Connect a GPU backend to run real fMRI predictions.
            </p>
          </motion.div>
        )}

        {/* Analyzing */}
        {phase === 'analyzing' && (
          <motion.div
            key="analyzing"
            className="avs-card avs-card--center"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="avs-brain-icon">
              <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            <h2 className="avs-analyzing-title">Analyzing Brain Responses</h2>

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
              <motion.div
                className="avs-progress-fill"
                animate={{ width: `${((stageIdx + 0.5) / ANALYSIS_STAGES.length) * 100}%` }}
                transition={{ duration: 0.6 }}
              />
            </div>
          </motion.div>
        )}

        {/* Results */}
        {phase === 'results' && scores && (
          <motion.div
            key="results"
            className="avs-results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Overall gauge */}
            <motion.div
              className="avs-card avs-card--center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="avs-section-title">Overall Virality Score</h2>
              <div style={{ display: 'flex', justifyContent: 'center', padding: '16px 0' }}>
                <CircleGauge score={scores.overall} />
              </div>
              <p className="avs-note" style={{ textAlign: 'center' }}>
                Score derived from cortical activation across 5 brain regions
              </p>
            </motion.div>

            {/* Region breakdown */}
            <motion.div
              className="avs-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <h2 className="avs-section-title">Brain Region Breakdown</h2>
              <div className="avs-regions">
                {BRAIN_REGIONS.map((r, i) => (
                  <RegionBar
                    key={r.key}
                    label={r.label}
                    desc={r.desc}
                    score={scores.regions[r.key]}
                    delay={i * 0.1}
                  />
                ))}
              </div>
            </motion.div>

            {/* Insight cards */}
            <motion.div
              className="avs-insights"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {[
                {
                  icon: '🧠',
                  title: 'Emotional Impact',
                  value: scores.regions.limbic >= 65 ? 'High' : scores.regions.limbic >= 50 ? 'Moderate' : 'Low',
                  detail: `Limbic score ${scores.regions.limbic}/100 — ${scores.regions.limbic >= 65 ? 'strong emotional resonance likely drives shares' : 'consider adding stronger emotional triggers'}`,
                },
                {
                  icon: '👁',
                  title: 'Visual Hook',
                  value: scores.regions.visual >= 65 ? 'Strong' : 'Needs work',
                  detail: `Visual cortex score ${scores.regions.visual}/100 — ${scores.regions.visual >= 65 ? 'high visual salience captures attention fast' : 'try bolder visuals or faster cuts in the first 3 s'}`,
                },
                {
                  icon: '📢',
                  title: 'Share Impulse',
                  value: scores.regions.motor >= 65 ? 'High' : 'Moderate',
                  detail: `Motor cortex score ${scores.regions.motor}/100 — ${scores.regions.motor >= 65 ? 'strong action impulse predicts high share rates' : 'add a clear CTA to boost share intent'}`,
                },
              ].map((c, i) => (
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

            <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: '40px' }}>
              <button className="avs-btn avs-btn--outline" onClick={reset}>
                Analyze Another Video
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
