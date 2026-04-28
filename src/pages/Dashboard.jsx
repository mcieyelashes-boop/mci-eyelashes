import { useState, useEffect } from 'react'

// ── constants ────────────────────────────────────────────────────────────────

const GOAL_DATE = new Date('2026-05-09T23:59:59')
const START_DATE = new Date('2026-04-25')

const PLAN = [
  {
    week: 1,
    days: 'Apr 25–26',
    action: 'LinkedIn warm-up — visit 30 profiles, like posts',
    result: 'Ambient presence',
    key: 'linkedin_warmup',
  },
  {
    week: 1,
    days: 'Apr 27–29',
    action: 'Send 30 LinkedIn DMs (3 templates, 10/day)',
    result: '3–5 replies',
    key: 'linkedin_dms',
  },
  {
    week: 1,
    days: 'Apr 30–May 2',
    action: 'Monitor replies, schedule discovery calls',
    result: '2–3 calls booked',
    key: 'calls_booked',
  },
  {
    week: 2,
    days: 'May 3–5',
    action: 'Execute discovery calls (15-min script)',
    result: '1–2 trial orders',
    key: 'calls_done',
  },
  {
    week: 2,
    days: 'May 6–9',
    action: 'Ship samples, negotiate terms, close',
    result: '1st deal closed',
    key: 'deal_closed',
  },
]

const DM_DAYS = [
  { date: 'Apr 27', key: 'dm_apr27' },
  { date: 'Apr 28', key: 'dm_apr28' },
  { date: 'Apr 29', key: 'dm_apr29' },
]

const PIPELINE_STAGES = [
  { label: 'Contacted', key: 'p_contacted', color: '#48B8CA' },
  { label: 'Replied', key: 'p_replied', color: '#2D97A9' },
  { label: 'Call Booked', key: 'p_call_booked', color: '#1A7A8A' },
  { label: 'Proposal Sent', key: 'p_proposal', color: '#0D5F6E' },
  { label: 'Deal Closed', key: 'p_closed', color: '#0A4A56' },
]

const STORAGE_KEY = 'mci_dashboard_v1'

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}
  } catch {
    return {}
  }
}

function save(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

// ── helpers ──────────────────────────────────────────────────────────────────

function daysUntil(date) {
  const now = new Date()
  const diff = date - now
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}

function pct(val, max) {
  return Math.min(100, Math.round((val / max) * 100))
}

// ── sub-components ───────────────────────────────────────────────────────────

function KpiCard({ label, value, sub, accent }) {
  return (
    <div style={styles.kpiCard}>
      <div style={{ ...styles.kpiValue, color: accent || 'var(--teal)' }}>{value}</div>
      <div style={styles.kpiLabel}>{label}</div>
      {sub && <div style={styles.kpiSub}>{sub}</div>}
    </div>
  )
}

function ProgressBar({ value, max, color }) {
  const p = pct(value, max)
  return (
    <div style={styles.barTrack}>
      <div style={{ ...styles.barFill, width: `${p}%`, background: color || 'var(--teal)' }} />
    </div>
  )
}

function Checkbox({ checked, onChange, label }) {
  return (
    <label style={styles.checkRow}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        style={{ display: 'none' }}
      />
      <span style={{ ...styles.checkBox, ...(checked ? styles.checkBoxChecked : {}) }}>
        {checked && '✓'}
      </span>
      <span style={{ ...styles.checkLabel, opacity: checked ? 0.45 : 1, textDecoration: checked ? 'line-through' : 'none' }}>
        {label}
      </span>
    </label>
  )
}

function NumberInput({ value, onChange, label, max }) {
  return (
    <div style={styles.numRow}>
      <span style={styles.numLabel}>{label}</span>
      <div style={styles.numControls}>
        <button style={styles.numBtn} onClick={() => onChange(Math.max(0, value - 1))}>−</button>
        <span style={styles.numVal}>{value}{max ? `/${max}` : ''}</span>
        <button style={styles.numBtn} onClick={() => onChange(max ? Math.min(max, value + 1) : value + 1)}>+</button>
      </div>
    </div>
  )
}

// ── main component ───────────────────────────────────────────────────────────

export default function Dashboard() {
  const [data, setData] = useState(load)

  function set(key, val) {
    setData(prev => {
      const next = { ...prev, [key]: val }
      save(next)
      return next
    })
  }

  function toggle(key) {
    set(key, !data[key])
  }

  function num(key, fallback = 0) {
    return typeof data[key] === 'number' ? data[key] : fallback
  }

  const daysLeft = daysUntil(GOAL_DATE)
  const totalDays = Math.ceil((GOAL_DATE - START_DATE) / (1000 * 60 * 60 * 24))
  const daysPassed = totalDays - daysLeft
  const timeProgress = pct(daysPassed, totalDays)

  const planDone = PLAN.filter(p => data[p.key]).length
  const planProgress = pct(planDone, PLAN.length)

  const emailLeads = 90
  const emailDelivered = Math.round(emailLeads * 0.62)
  const emailReplied = num('email_replied')
  const emailCalls = num('email_calls')

  const liLinkedinVisited = num('li_visited')
  const liLinkedinLiked = num('li_liked')
  const dmSent = DM_DAYS.reduce((acc, d) => acc + num(d.key), 0)

  const pipelineTotal = num('p_contacted') + num('p_replied') + num('p_call_booked') + num('p_proposal') + num('p_closed')

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <div>
          <div style={styles.eyebrow}>MCI Eyelashes · Marketing Dashboard</div>
          <h1 style={styles.headline}>Close First B2B Deal</h1>
          <p style={styles.subhead}>Goal deadline: May 9, 2026 · $6K–$10K pipeline target</p>
        </div>
        <div style={styles.countdown}>
          <div style={styles.countdownNum}>{daysLeft}</div>
          <div style={styles.countdownLabel}>days left</div>
        </div>
      </div>

      {/* Time progress */}
      <div style={styles.section}>
        <div style={styles.progressHeader}>
          <span style={styles.sectionLabel}>Campaign Progress</span>
          <span style={styles.progressPct}>{timeProgress}% of time elapsed · {planProgress}% of plan complete</span>
        </div>
        <ProgressBar value={daysPassed} max={totalDays} color="var(--teal)" />
        <ProgressBar value={planDone} max={PLAN.length} color="var(--teal-dark)" />
      </div>

      {/* KPI row */}
      <div style={styles.kpiGrid}>
        <KpiCard label="Email Leads Sent" value={emailLeads} sub="62% delivery rate" />
        <KpiCard label="Emails Delivered" value={emailDelivered} sub={`of ${emailLeads} sent`} />
        <KpiCard label="HubSpot Contacts" value="1,536" sub="automation running" accent="var(--teal-dark)" />
        <KpiCard label="LinkedIn DMs Sent" value={dmSent} sub="target: 30" accent="var(--teal-deep)" />
        <KpiCard label="Pipeline Value" value={`$${(num('p_closed') * 3000).toLocaleString() || '0'}`} sub="est. $3K avg per deal" accent="#0A4A56" />
      </div>

      <div style={styles.twoCol}>
        {/* 2-Week Plan */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <span style={styles.cardTitle}>2-Week Execution Plan</span>
            <span style={styles.badge}>{planDone}/{PLAN.length} done</span>
          </div>
          {PLAN.map(item => (
            <div key={item.key} style={styles.planRow}>
              <div style={styles.planWeek}>W{item.week}</div>
              <div style={styles.planBody}>
                <Checkbox
                  checked={!!data[item.key]}
                  onChange={() => toggle(item.key)}
                  label={item.action}
                />
                <div style={styles.planMeta}>{item.days} · Target: {item.result}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

          {/* LinkedIn tracker */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <span style={styles.cardTitle}>LinkedIn Warm-up</span>
              <span style={styles.badge}>{liLinkedinVisited}/30 profiles</span>
            </div>
            <NumberInput label="Profiles visited" value={liLinkedinVisited} max={30} onChange={v => set('li_visited', v)} />
            <ProgressBar value={liLinkedinVisited} max={30} />
            <NumberInput label="Posts liked" value={liLinkedinLiked} max={30} onChange={v => set('li_liked', v)} />
            <ProgressBar value={liLinkedinLiked} max={30} />
          </div>

          {/* DM tracker */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <span style={styles.cardTitle}>LinkedIn DMs</span>
              <span style={styles.badge}>{dmSent}/30 sent</span>
            </div>
            {DM_DAYS.map(d => (
              <NumberInput
                key={d.key}
                label={`${d.date} (target 10)`}
                value={num(d.key)}
                max={15}
                onChange={v => set(d.key, v)}
              />
            ))}
            <ProgressBar value={dmSent} max={30} />
          </div>

          {/* Email campaign */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <span style={styles.cardTitle}>Email Campaign</span>
            </div>
            <div style={styles.statRow}>
              <span>Sent</span><strong>{emailLeads}</strong>
            </div>
            <div style={styles.statRow}>
              <span>Delivered ({Math.round(62)}%)</span><strong>{emailDelivered}</strong>
            </div>
            <NumberInput label="Replied" value={emailReplied} onChange={v => set('email_replied', v)} />
            <NumberInput label="Calls booked" value={emailCalls} onChange={v => set('email_calls', v)} />
            {emailDelivered > 0 && (
              <div style={styles.statRow}>
                <span>Reply rate</span>
                <strong>{emailDelivered > 0 ? `${Math.round((emailReplied / emailDelivered) * 100)}%` : '—'}</strong>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Pipeline */}
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <span style={styles.cardTitle}>Deal Pipeline</span>
          <span style={styles.badge}>{pipelineTotal} total contacts tracked</span>
        </div>
        <div style={styles.pipelineGrid}>
          {PIPELINE_STAGES.map(stage => (
            <div key={stage.key} style={styles.pipelineCol}>
              <div style={{ ...styles.pipelineHeader, background: stage.color }}>{stage.label}</div>
              <NumberInput
                label="Count"
                value={num(stage.key)}
                onChange={v => set(stage.key, v)}
              />
              <ProgressBar value={num(stage.key)} max={Math.max(1, num('p_contacted'))} color={stage.color} />
            </div>
          ))}
        </div>
        {num('p_closed') > 0 && (
          <div style={styles.dealAlert}>
            {num('p_closed')} deal{num('p_closed') > 1 ? 's' : ''} closed · est. ${(num('p_closed') * 3000).toLocaleString()} pipeline value
          </div>
        )}
      </div>

      {/* Assets */}
      <div style={styles.card}>
        <div style={styles.cardHeader}>
          <span style={styles.cardTitle}>Marketing Assets</span>
        </div>
        <div style={styles.assetGrid}>
          {[
            { label: 'Cold Email Sequences', desc: '3 sequences · 5 touches each · Salon / Brand / Distributor', file: '.agents/marketing/cold-email-sequences.md' },
            { label: 'Homepage CRO Audit', desc: '10 findings · 4 A/B tests · prioritised fix list', file: '.agents/marketing/homepage-cro-audit.md' },
            { label: 'Wholesale Nurture Sequence', desc: '5-email lead nurture for inbound wholesale leads', file: '.agents/marketing/wholesale-nurture-sequence.md' },
            { label: 'HubSpot CRM', desc: '1,536 contacts · automation running', file: null },
          ].map(a => (
            <div key={a.label} style={styles.assetCard}>
              <div style={styles.assetDot} />
              <div>
                <div style={styles.assetLabel}>{a.label}</div>
                <div style={styles.assetDesc}>{a.desc}</div>
                {a.file && <div style={styles.assetFile}>{a.file}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.footer}>
        Data saved locally in your browser · Last updated {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
      </div>
    </div>
  )
}

// ── styles ───────────────────────────────────────────────────────────────────

const styles = {
  page: {
    minHeight: '100vh',
    background: 'var(--off-white)',
    padding: '40px 24px 80px',
    maxWidth: '1100px',
    margin: '0 auto',
    fontFamily: 'Montserrat, sans-serif',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '32px',
    flexWrap: 'wrap',
    gap: '20px',
  },
  eyebrow: {
    fontSize: '10px',
    letterSpacing: '3px',
    textTransform: 'uppercase',
    color: 'var(--teal)',
    marginBottom: '8px',
    fontWeight: 500,
  },
  headline: {
    fontFamily: 'Cormorant Garamond, serif',
    fontSize: 'clamp(28px, 4vw, 46px)',
    fontWeight: 300,
    color: 'var(--navy)',
    marginBottom: '6px',
  },
  subhead: {
    fontSize: '13px',
    color: 'var(--text-mid)',
  },
  countdown: {
    background: 'var(--navy)',
    color: '#fff',
    borderRadius: '12px',
    padding: '20px 28px',
    textAlign: 'center',
    minWidth: '110px',
  },
  countdownNum: {
    fontFamily: 'Cormorant Garamond, serif',
    fontSize: '52px',
    fontWeight: 300,
    color: 'var(--teal-light)',
    lineHeight: 1,
  },
  countdownLabel: {
    fontSize: '10px',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.5)',
    marginTop: '4px',
  },
  section: {
    background: '#fff',
    borderRadius: '12px',
    padding: '20px 24px',
    marginBottom: '20px',
    border: '1px solid var(--border-soft)',
  },
  progressHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
    flexWrap: 'wrap',
    gap: '6px',
  },
  sectionLabel: {
    fontSize: '11px',
    letterSpacing: '2px',
    textTransform: 'uppercase',
    color: 'var(--text-mid)',
    fontWeight: 600,
  },
  progressPct: {
    fontSize: '11px',
    color: 'var(--text-light)',
  },
  barTrack: {
    height: '6px',
    background: 'var(--light)',
    borderRadius: '99px',
    overflow: 'hidden',
    marginBottom: '8px',
  },
  barFill: {
    height: '100%',
    borderRadius: '99px',
    transition: 'width 0.4s ease',
  },
  kpiGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
    gap: '16px',
    marginBottom: '20px',
  },
  kpiCard: {
    background: '#fff',
    borderRadius: '12px',
    padding: '20px',
    border: '1px solid var(--border-soft)',
    textAlign: 'center',
  },
  kpiValue: {
    fontFamily: 'Cormorant Garamond, serif',
    fontSize: '36px',
    fontWeight: 300,
    lineHeight: 1,
    color: 'var(--teal)',
    marginBottom: '6px',
  },
  kpiLabel: {
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '0.5px',
    color: 'var(--text-dark)',
    marginBottom: '3px',
  },
  kpiSub: {
    fontSize: '10px',
    color: 'var(--text-light)',
  },
  twoCol: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px',
    marginBottom: '20px',
    alignItems: 'start',
  },
  card: {
    background: '#fff',
    borderRadius: '12px',
    padding: '22px 24px',
    border: '1px solid var(--border-soft)',
    marginBottom: '20px',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '18px',
    flexWrap: 'wrap',
    gap: '8px',
  },
  cardTitle: {
    fontSize: '13px',
    fontWeight: 600,
    letterSpacing: '0.3px',
    color: 'var(--navy)',
  },
  badge: {
    background: 'var(--light)',
    color: 'var(--teal-dark)',
    fontSize: '10px',
    fontWeight: 600,
    padding: '3px 10px',
    borderRadius: '99px',
    letterSpacing: '0.3px',
  },
  planRow: {
    display: 'flex',
    gap: '14px',
    padding: '10px 0',
    borderBottom: '1px solid var(--border-soft)',
    alignItems: 'flex-start',
  },
  planWeek: {
    fontSize: '9px',
    fontWeight: 700,
    letterSpacing: '1px',
    color: 'var(--teal)',
    background: 'var(--light)',
    padding: '3px 7px',
    borderRadius: '4px',
    marginTop: '2px',
    flexShrink: 0,
  },
  planBody: {
    flex: 1,
  },
  planMeta: {
    fontSize: '10px',
    color: 'var(--text-light)',
    marginTop: '4px',
    marginLeft: '28px',
  },
  checkRow: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
    cursor: 'pointer',
  },
  checkBox: {
    width: '18px',
    height: '18px',
    borderRadius: '4px',
    border: '1.5px solid var(--border)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '11px',
    color: '#fff',
    flexShrink: 0,
    marginTop: '1px',
    transition: 'all 0.15s',
  },
  checkBoxChecked: {
    background: 'var(--teal)',
    border: '1.5px solid var(--teal)',
  },
  checkLabel: {
    fontSize: '12px',
    color: 'var(--text-dark)',
    lineHeight: 1.5,
    transition: 'all 0.15s',
  },
  numRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '8px 0',
    borderBottom: '1px solid var(--border-soft)',
  },
  numLabel: {
    fontSize: '12px',
    color: 'var(--text-mid)',
  },
  numControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  numBtn: {
    width: '26px',
    height: '26px',
    border: '1px solid var(--border)',
    borderRadius: '6px',
    background: 'var(--light)',
    cursor: 'pointer',
    fontSize: '15px',
    color: 'var(--teal-dark)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: 1,
  },
  numVal: {
    fontSize: '13px',
    fontWeight: 600,
    color: 'var(--navy)',
    minWidth: '48px',
    textAlign: 'center',
  },
  statRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '7px 0',
    fontSize: '12px',
    color: 'var(--text-mid)',
    borderBottom: '1px solid var(--border-soft)',
  },
  pipelineGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
    gap: '14px',
  },
  pipelineCol: {
    border: '1px solid var(--border-soft)',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  pipelineHeader: {
    padding: '8px 12px',
    fontSize: '10px',
    fontWeight: 700,
    letterSpacing: '0.5px',
    color: '#fff',
    textTransform: 'uppercase',
  },
  dealAlert: {
    marginTop: '16px',
    padding: '12px 16px',
    background: 'var(--light)',
    borderRadius: '8px',
    fontSize: '13px',
    fontWeight: 600,
    color: 'var(--teal-deep)',
    textAlign: 'center',
  },
  assetGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '14px',
  },
  assetCard: {
    display: 'flex',
    gap: '12px',
    padding: '14px',
    background: 'var(--off-white)',
    borderRadius: '8px',
    border: '1px solid var(--border-soft)',
  },
  assetDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: 'var(--teal)',
    flexShrink: 0,
    marginTop: '5px',
  },
  assetLabel: {
    fontSize: '12px',
    fontWeight: 600,
    color: 'var(--navy)',
    marginBottom: '3px',
  },
  assetDesc: {
    fontSize: '11px',
    color: 'var(--text-mid)',
    marginBottom: '4px',
  },
  assetFile: {
    fontSize: '10px',
    color: 'var(--teal-dark)',
    fontFamily: 'monospace',
  },
  footer: {
    textAlign: 'center',
    fontSize: '11px',
    color: 'var(--text-light)',
    marginTop: '16px',
  },
}
