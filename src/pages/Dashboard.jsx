import { useState, useEffect, useCallback, useRef } from 'react'
import { useDashboard } from '../hooks/useDashboard'

// ── constants ────────────────────────────────────────────────────────────────

const GOAL_DATE  = new Date('2026-05-09T23:59:59')
const START_DATE = new Date('2026-04-25')

const PLAN = [
  { week: 1, days: 'Apr 25–26', action: 'LinkedIn warm-up — visit 30 profiles, like posts',    result: '3–5 replies',    key: 'linkedin_warmup' },
  { week: 1, days: 'Apr 27–29', action: 'Send 30 LinkedIn DMs (3 templates, 10/day)',           result: '3–5 replies',    key: 'linkedin_dms'   },
  { week: 1, days: 'Apr 30–May 2', action: 'Monitor replies, schedule discovery calls',        result: '2–3 calls',      key: 'calls_booked'   },
  { week: 2, days: 'May 3–5',   action: 'Execute discovery calls (15-min script)',             result: '1–2 orders',     key: 'calls_done'     },
  { week: 2, days: 'May 6–9',   action: 'Ship samples, negotiate terms, close',               result: '1st deal',       key: 'deal_closed'    },
]

const DM_DAYS = [
  { date: 'Apr 27', key: 'dm_apr27' },
  { date: 'Apr 28', key: 'dm_apr28' },
  { date: 'Apr 29', key: 'dm_apr29' },
]

const PIPELINE_STAGES = [
  { label: 'Contacted',    key: 'p_contacted',  color: '#48B8CA' },
  { label: 'Replied',      key: 'p_replied',    color: '#2D97A9' },
  { label: 'Call Booked',  key: 'p_call_booked',color: '#1A7A8A' },
  { label: 'Proposal',     key: 'p_proposal',   color: '#0D6070' },
  { label: 'Deal Closed',  key: 'p_closed',     color: '#0D1E2A' },
]

const ASSETS = [
  { label: 'Warm Email Sequences',  desc: '3 segments · 3 emails each · warm contacts only',           tag: 'Email',  file: '.agents/marketing/warm-email-sequences.md'  },
  { label: 'Homepage CRO Audit',    desc: '10 findings · 4 A/B tests · prioritised fix list',          tag: 'Audit',  file: '.agents/marketing/homepage-cro-audit.md'    },
  { label: 'Cold Email Sequences',  desc: '3 B2B sequences · 5 touches · Salon / Brand / Distributor', tag: 'Email',  file: '.agents/marketing/cold-email-sequences.md'  },
  { label: 'HubSpot CRM',           desc: '1,536 contacts · automation active',                        tag: 'CRM',    file: null },
]

// ── shimmer ──────────────────────────────────────────────────────────────────

function injectShimmer() {
  if (document.getElementById('mci-shimmer')) return
  const s = document.createElement('style')
  s.id = 'mci-shimmer'
  s.textContent = `
    @keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}
    @keyframes spin{to{transform:rotate(360deg)}}
  `
  document.head.appendChild(s)
}

// ── primitives ────────────────────────────────────────────────────────────────

function SkeletonBar({ width = 70, height = 28 }) {
  injectShimmer()
  return (
    <div style={{
      width, height, borderRadius: 4,
      backgroundImage: 'linear-gradient(90deg,#e8f0f2 25%,#d0e0e5 50%,#e8f0f2 75%)',
      backgroundSize: '200% 100%',
      animation: 'shimmer 1.5s infinite linear',
      display: 'inline-block',
    }} />
  )
}

function ProgressBar({ value, max, color = 'var(--teal)', height = 6, mb = 8 }) {
  const pct = Math.min(100, max > 0 ? Math.round((value / max) * 100) : 0)
  return (
    <div style={{ height, background: 'var(--light)', borderRadius: 99, overflow: 'hidden', marginBottom: mb }}>
      <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: 99, transition: 'width .4s ease' }} />
    </div>
  )
}

function NumberInput({ label, value, onChange, max, min = 0 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border-soft)' }}>
      <span style={{ fontSize: 12, color: 'var(--text-mid)' }}>{label}</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <button onClick={() => onChange(Math.max(min, value - 1))} style={S.numBtn}>−</button>
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--navy)', minWidth: 44, textAlign: 'center' }}>
          {value}{max != null ? `/${max}` : ''}
        </span>
        <button onClick={() => onChange(max != null ? Math.min(max, value + 1) : value + 1)} style={S.numBtn}>+</button>
      </div>
    </div>
  )
}

function Checkbox({ checked, onChange, label }) {
  return (
    <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer' }}>
      <input type="checkbox" checked={checked} onChange={onChange} style={{ display: 'none' }} />
      <span style={{
        width: 18, height: 18, borderRadius: 4, flexShrink: 0, marginTop: 1,
        border: checked ? '1.5px solid var(--teal)' : '1.5px solid var(--border)',
        background: checked ? 'var(--teal)' : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#fff', fontSize: 11, transition: 'all .15s',
      }}>{checked ? '✓' : ''}</span>
      <span style={{ fontSize: 12, color: 'var(--text-dark)', lineHeight: 1.5, opacity: checked ? 0.4 : 1, textDecoration: checked ? 'line-through' : 'none', transition: 'all .15s' }}>
        {label}
      </span>
    </label>
  )
}

function StageBadge({ stage }) {
  const found = PIPELINE_STAGES.find(s => s.label === stage)
  const color  = found?.color ?? 'var(--teal)'
  return (
    <span style={{
      fontSize: 9, fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase',
      padding: '2px 8px', borderRadius: 99, border: `1px solid ${color}`,
      color, background: color + '18',
    }}>{stage ?? '—'}</span>
  )
}

function StatusBadge({ status }) {
  const map = { 'on-track': ['On Track', '#48B8CA'], 'at-risk': ['At Risk', '#D97706'], 'behind': ['Behind', '#DC2626'] }
  const [label, color] = map[status] ?? ['—', 'var(--text-light)']
  return (
    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', padding: '5px 14px', borderRadius: 99, background: color, color: '#fff' }}>
      {label}
    </span>
  )
}

function DelivBadge({ rate }) {
  const [label, color] = rate >= 80 ? ['Good', '#48B8CA'] : rate >= 50 ? ['Fair', '#D97706'] : ['Poor', '#DC2626']
  return <span style={{ fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 99, background: color, color: '#fff', letterSpacing: '0.5px' }}>{label}</span>
}

function Card({ children, style }) {
  return <div style={{ background: '#fff', borderRadius: 12, padding: '22px 24px', border: '1px solid var(--border-soft)', ...style }}>{children}</div>
}

function CardHeader({ title, right }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18, flexWrap: 'wrap', gap: 8 }}>
      <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.3px', color: 'var(--navy)' }}>{title}</span>
      {right}
    </div>
  )
}

function Pill({ children, color = 'var(--teal-dark)', bg = 'var(--light)' }) {
  return (
    <span style={{ fontSize: 10, fontWeight: 600, padding: '3px 10px', borderRadius: 99, background: bg, color, letterSpacing: '0.3px' }}>
      {children}
    </span>
  )
}

// ── helpers ───────────────────────────────────────────────────────────────────

function daysUntil(d) { return Math.max(0, Math.ceil((d - Date.now()) / 86400000)) }
function relTime(d) {
  if (!d) return null
  const mins = Math.floor((Date.now() - d) / 60000)
  if (mins < 1) return 'Just now'
  if (mins < 60) return `${mins} min ago`
  return `${Math.floor(mins / 60)}h ago`
}
function fmtUSD(n) {
  if (n == null) return null
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
}
function initials(name) {
  return (name || '?').split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase()
}
function timeAgo(iso) {
  if (!iso) return '—'
  const d = Math.floor((Date.now() - new Date(iso)) / 86400000)
  return d === 0 ? 'Today' : d === 1 ? 'Yesterday' : `${d} days ago`
}

// ── section components ────────────────────────────────────────────────────────

function HeaderBar({ daysLeft, status, lastRefresh, onRefresh, refreshing }) {
  const [rel, setRel] = useState(() => relTime(lastRefresh))
  useEffect(() => {
    setRel(relTime(lastRefresh))
    const id = setInterval(() => setRel(relTime(lastRefresh)), 60000)
    return () => clearInterval(id)
  }, [lastRefresh])

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28, flexWrap: 'wrap', gap: 20 }}>
      <div>
        <div style={{ fontSize: 10, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: 6, fontWeight: 500 }}>
          MCI Eyelashes
        </div>
        <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(24px,3vw,38px)', fontWeight: 300, color: 'var(--navy)', marginBottom: 8 }}>
          Marketing Dashboard
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <StatusBadge status={status} />
          <span style={{ fontSize: 11, color: 'var(--text-light)' }}>Goal: First B2B deal by May 9</span>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 10, color: 'var(--text-light)', marginBottom: 4 }}>
            {rel ? `Refreshed ${rel}` : 'Not yet refreshed'}
          </div>
          <button
            onClick={onRefresh}
            disabled={refreshing}
            style={{ ...S.numBtn, padding: '6px 14px', fontSize: 10, letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 600, opacity: refreshing ? 0.6 : 1 }}
          >
            {refreshing ? '↻ Loading…' : '↻ Refresh'}
          </button>
        </div>
        <div style={{ background: 'var(--navy)', borderRadius: 12, padding: '18px 24px', textAlign: 'center', minWidth: 100 }}>
          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 46, fontWeight: 300, color: 'var(--teal-light)', lineHeight: 1 }}>{daysLeft}</div>
          <div style={{ fontSize: 9, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.45)', marginTop: 4 }}>days left</div>
        </div>
      </div>
    </div>
  )
}

function KpiRow({ live, emailReplied }) {
  const { contacts, deals, gmail } = live
  const cards = [
    { label: 'HubSpot Contacts',   value: contacts.data?.total,         sub: 'Total in CRM',         accent: 'var(--teal)',      loading: contacts.loading, error: !!contacts.error },
    { label: 'New This Month',      value: contacts.data?.addedLast30Days, sub: 'Last 30 days',        accent: 'var(--teal-dark)', loading: contacts.loading, error: !!contacts.error },
    { label: 'Open Deals',          value: deals.data?.openCount,        sub: 'Active pipeline',       accent: 'var(--teal-deep)', loading: deals.loading,    error: !!deals.error },
    { label: 'Pipeline Value',      value: fmtUSD(deals.data?.totalValue), sub: 'Weighted value',      accent: '#0D6070',          loading: deals.loading,    error: !!deals.error },
    { label: 'Emails Delivered',    value: '56',                         sub: 'of 90 sent (62%)',      accent: 'var(--teal)',      loading: false,            error: false },
    { label: 'Replies Received',    value: emailReplied,                  sub: 'Update below',         accent: 'var(--navy)',      loading: false,            error: false },
  ]
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(155px,1fr))', gap: 14, marginBottom: 20 }}>
      {cards.map(({ label, value, sub, accent, loading, error }) => (
        <div key={label} style={{ background: '#fff', borderRadius: 12, padding: '18px 20px', border: '1px solid var(--border-soft)', textAlign: 'center' }}>
          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 36, fontWeight: 300, color: accent, lineHeight: 1, marginBottom: 6 }}>
            {loading ? <SkeletonBar width={70} height={32} /> : error ? <span style={{ color: 'var(--text-light)', fontSize: 28 }}>—</span> : value ?? '—'}
          </div>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-dark)', marginBottom: 3 }}>{label}</div>
          <div style={{ fontSize: 10, color: 'var(--text-light)' }}>{error ? 'unavailable' : sub}</div>
        </div>
      ))}
    </div>
  )
}

function PipelineBoard({ live, local, setLocal }) {
  const hubStages = live.pipeline.data?.stages ?? []
  const getHubCount = (label) => hubStages.find(s => s.label === label)?.count ?? 0
  const maxCount = Math.max(1, ...PIPELINE_STAGES.map(s => getHubCount(s.label) + (local[s.key] || 0)))

  return (
    <Card style={{ marginBottom: 20 }}>
      <CardHeader
        title="Deal Pipeline"
        right={<Pill>HubSpot live{live.pipeline.loading ? ' · loading…' : live.pipeline.error ? ' · error' : ''}</Pill>}
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 12 }}>
        {PIPELINE_STAGES.map(({ label, key, color }) => {
          const hubCount  = getHubCount(label)
          const manual    = local[key] || 0
          const total     = hubCount + manual
          return (
            <div key={key} style={{ border: '1px solid var(--border-soft)', borderRadius: 8, overflow: 'hidden' }}>
              <div style={{ background: color, padding: '8px 12px', fontSize: 9, fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase', color: '#fff' }}>
                {label}
              </div>
              <div style={{ padding: '12px 12px 6px' }}>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 36, fontWeight: 300, color, lineHeight: 1, marginBottom: 4 }}>
                  {live.pipeline.loading ? <SkeletonBar width={40} height={32} /> : total}
                </div>
                <div style={{ fontSize: 9, color: 'var(--text-light)', marginBottom: 10 }}>
                  {live.pipeline.loading ? 'loading…' : `${hubCount} HubSpot + ${manual} manual`}
                </div>
                <ProgressBar value={total} max={maxCount} color={color} height={4} mb={0} />
              </div>
              <div style={{ padding: '6px 12px 12px' }}>
                <NumberInput label="Manual" value={manual} onChange={v => setLocal(p => ({ ...p, [key]: v }))} />
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}

function EmailCampaignTracker({ local, setLocal }) {
  const SENT = 90, DELIVERED = 56
  const replied = local.email_replied || 0
  const calls   = local.email_calls   || 0
  const replyRate = DELIVERED > 0 ? ((replied / DELIVERED) * 100).toFixed(1) : '0.0'

  const rows = [
    { label: 'Sent',         value: SENT,      max: SENT,      color: 'var(--teal-light)' },
    { label: 'Delivered',    value: DELIVERED, max: SENT,      color: 'var(--teal)'       },
    { label: 'Replied',      value: replied,   max: DELIVERED, color: 'var(--teal-dark)'  },
    { label: 'Calls Booked', value: calls,     max: replied,   color: 'var(--teal-deep)'  },
  ]

  return (
    <Card>
      <CardHeader title="Email Campaign" right={<DelivBadge rate={62} />} />
      {rows.map(({ label, value, max, color }) => (
        <div key={label} style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--text-mid)', marginBottom: 4 }}>
            <span>{label}</span><span style={{ fontWeight: 600, color: 'var(--navy)' }}>{value}{max && max !== value ? `/${max}` : ''}</span>
          </div>
          <ProgressBar value={value} max={max || 1} color={color} mb={0} />
        </div>
      ))}
      <div style={{ borderTop: '1px solid var(--border-soft)', marginTop: 14, paddingTop: 14 }}>
        <NumberInput label="Replies received" value={replied} onChange={v => setLocal(p => ({ ...p, email_replied: v }))} />
        <NumberInput label="Calls booked"     value={calls}   onChange={v => setLocal(p => ({ ...p, email_calls:   v }))} />
        <div style={{ fontSize: 11, color: 'var(--text-mid)', paddingTop: 10 }}>
          Reply rate: <strong style={{ color: 'var(--navy)' }}>{replyRate}%</strong>
        </div>
      </div>
    </Card>
  )
}

function LinkedInTracker({ local, setLocal }) {
  const visited = local.li_visited || 0
  const liked   = local.li_liked   || 0
  const dmTotal = DM_DAYS.reduce((a, d) => a + (local[d.key] || 0), 0)

  return (
    <Card>
      <CardHeader title="LinkedIn Outreach" right={<Pill>{dmTotal}/30 DMs</Pill>} />
      <div style={{ fontSize: 10, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--teal-dark)', fontWeight: 600, marginBottom: 12 }}>
        Warm-up
      </div>
      <NumberInput label="Profiles visited" value={visited} max={30} onChange={v => setLocal(p => ({ ...p, li_visited: v }))} />
      <ProgressBar value={visited} max={30} mb={12} />
      <NumberInput label="Posts liked" value={liked} max={30} onChange={v => setLocal(p => ({ ...p, li_liked: v }))} />
      <ProgressBar value={liked} max={30} mb={16} />
      <div style={{ fontSize: 10, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--teal-dark)', fontWeight: 600, marginBottom: 12 }}>
        DMs Sent
      </div>
      {DM_DAYS.map(({ date, key }) => (
        <NumberInput key={key} label={`${date} (target 10)`} value={local[key] || 0} max={15} onChange={v => setLocal(p => ({ ...p, [key]: v }))} />
      ))}
      <ProgressBar value={dmTotal} max={30} color="var(--teal-dark)" mb={0} />
    </Card>
  )
}

function PlanChecklist({ local, setLocal }) {
  const done = PLAN.filter(p => local[p.key]).length
  return (
    <Card>
      <CardHeader title="2-Week Execution Plan" right={<Pill>{done}/5 done</Pill>} />
      <ProgressBar value={done} max={5} mb={16} />
      {PLAN.map(item => (
        <div key={item.key} style={{ display: 'flex', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--border-soft)', alignItems: 'flex-start' }}>
          <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '1px', color: item.week === 1 ? 'var(--teal)' : '#fff', background: item.week === 1 ? 'var(--light)' : 'var(--navy)', padding: '3px 7px', borderRadius: 4, flexShrink: 0, marginTop: 2 }}>
            W{item.week}
          </span>
          <div style={{ flex: 1 }}>
            <Checkbox checked={!!local[item.key]} onChange={() => setLocal(p => ({ ...p, [item.key]: !p[item.key] }))} label={item.action} />
            <div style={{ fontSize: 10, color: 'var(--text-light)', marginTop: 4, marginLeft: 28 }}>{item.days} · {item.result}</div>
          </div>
        </div>
      ))}
    </Card>
  )
}

function RecentActivityFeed({ live }) {
  const { loading, error, data } = live.activity
  const contacts = data?.contacts ?? []

  return (
    <Card>
      <CardHeader title="Recent Activity" right={<Pill bg="var(--light)" color="var(--teal-dark)">From HubSpot</Pill>} />
      {loading && Array.from({ length: 5 }).map((_, i) => (
        <div key={i} style={{ height: 52, borderRadius: 6, marginBottom: 8, backgroundImage: 'linear-gradient(90deg,#e8f0f2 25%,#d0e0e5 50%,#e8f0f2 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite linear' }} />
      ))}
      {!loading && error && (
        <div style={{ textAlign: 'center', padding: '24px 0', color: 'var(--text-light)', fontSize: 12 }}>
          <div style={{ fontSize: 22, marginBottom: 8 }}>○</div>
          Could not load contacts — check HUBSPOT_TOKEN env var
        </div>
      )}
      {!loading && !error && contacts.length === 0 && (
        <div style={{ textAlign: 'center', padding: '24px 0', color: 'var(--text-light)', fontSize: 12 }}>No recent activity</div>
      )}
      {!loading && !error && contacts.map(c => (
        <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--border-soft)' }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--light)', color: 'var(--teal-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
            {initials(c.name)}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--navy)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{c.name}</div>
            <div style={{ fontSize: 10, color: 'var(--text-light)' }}>{c.email}</div>
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <StageBadge stage={c.status} />
            <div style={{ fontSize: 9, color: 'var(--text-light)', marginTop: 4 }}>{timeAgo(c.lastTouched)}</div>
          </div>
        </div>
      ))}
    </Card>
  )
}

function AssetsPanel() {
  const tagColor = { Email: 'var(--teal)', Audit: 'var(--teal-dark)', CRM: 'var(--teal-deep)' }
  return (
    <Card style={{ marginBottom: 0 }}>
      <CardHeader title="Marketing Assets" right={<Pill>{ASSETS.length} files</Pill>} />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(230px,1fr))', gap: 12 }}>
        {ASSETS.map(a => (
          <div key={a.label} style={{ background: 'var(--off-white)', borderRadius: 8, padding: 14, border: '1px solid var(--border-soft)' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
              <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase', padding: '2px 8px', borderRadius: 99, background: tagColor[a.tag] || 'var(--teal)', color: '#fff' }}>{a.tag}</span>
            </div>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--navy)', marginBottom: 4 }}>{a.label}</div>
            <div style={{ fontSize: 11, color: 'var(--text-mid)', lineHeight: 1.6, marginBottom: 6 }}>{a.desc}</div>
            {a.file && <div style={{ fontSize: 10, fontFamily: 'monospace', color: 'var(--teal-dark)' }}>{a.file}</div>}
          </div>
        ))}
      </div>
    </Card>
  )
}

// ── main page ─────────────────────────────────────────────────────────────────

export default function Dashboard() {
  const { live, local, setLocal, refresh, lastRefresh } = useDashboard()
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)

  useEffect(() => {
    injectShimmer()
    const onResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const daysLeft   = daysUntil(GOAL_DATE)
  const totalDays  = Math.ceil((GOAL_DATE - START_DATE) / 86400000)
  const daysPassed = totalDays - daysLeft
  const planDone   = PLAN.filter(p => local[p.key]).length
  const refreshing = live.contacts.loading || live.deals.loading

  const status = daysLeft <= 3 ? 'behind'
    : planDone < Math.floor((daysPassed / totalDays) * 5) ? 'at-risk'
    : 'on-track'

  const twoCol = { display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 20, marginBottom: 20, alignItems: 'start' }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--off-white)', padding: '40px 24px 80px', maxWidth: 1200, margin: '0 auto', fontFamily: 'Montserrat, sans-serif' }}>
      <HeaderBar daysLeft={daysLeft} status={status} lastRefresh={lastRefresh} onRefresh={refresh} refreshing={refreshing} />
      <KpiRow live={live} emailReplied={local.email_replied || 0} />
      <PipelineBoard live={live} local={local} setLocal={setLocal} />
      <div style={twoCol}>
        <EmailCampaignTracker local={local} setLocal={setLocal} />
        <LinkedInTracker      local={local} setLocal={setLocal} />
      </div>
      <div style={twoCol}>
        <PlanChecklist        local={local} setLocal={setLocal} />
        <RecentActivityFeed   live={live} />
      </div>
      <AssetsPanel />
      <div style={{ textAlign: 'center', fontSize: 11, color: 'var(--text-light)', marginTop: 24 }}>
        Live data from HubSpot · Manual data saved locally · Auto-refresh every 5 min
      </div>
    </div>
  )
}

// ── shared styles ─────────────────────────────────────────────────────────────

const S = {
  numBtn: {
    width: 26, height: 26, border: '1px solid var(--border)', borderRadius: 6,
    background: 'var(--light)', cursor: 'pointer', fontSize: 15,
    color: 'var(--teal-dark)', display: 'inline-flex', alignItems: 'center',
    justifyContent: 'center', lineHeight: 1, fontFamily: 'Montserrat, sans-serif',
  },
}
