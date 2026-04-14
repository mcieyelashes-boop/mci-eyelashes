// Lightweight markdown renderer for blog post bodies.
// Handles: paragraphs, **bold**, tables, bullet lists, numbered lists.

function parseBold(text) {
  const parts = text.split(/\*\*(.*?)\*\*/g)
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i} style={{ fontWeight: 600, color: 'var(--text-dark)' }}>{part}</strong> : part
  )
}

function renderTable(lines) {
  const rows = lines.filter(l => l.startsWith('|') && !l.match(/^\|[-| ]+\|$/))
  const [header, ...body] = rows
  const cols = header.split('|').slice(1, -1).map(c => c.trim())

  return (
    <div style={{ overflowX: 'auto', margin: '28px 0' }}>
      <table style={{
        width: '100%', borderCollapse: 'collapse',
        fontSize: '13px', fontFamily: 'Montserrat, sans-serif',
      }}>
        <thead>
          <tr>
            {cols.map((col, i) => (
              <th key={i} style={{
                textAlign: 'left', padding: '12px 16px',
                background: 'var(--off-white)',
                borderBottom: '2px solid var(--teal)',
                fontSize: '10px', letterSpacing: '1.5px',
                textTransform: 'uppercase', color: 'var(--teal-dark)', fontWeight: 600,
              }}>
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((row, ri) => {
            const cells = row.split('|').slice(1, -1).map(c => c.trim())
            return (
              <tr key={ri} style={{ borderBottom: '1px solid var(--border-soft)' }}>
                {cells.map((cell, ci) => (
                  <td key={ci} style={{
                    padding: '12px 16px', color: 'var(--text-mid)',
                    verticalAlign: 'top',
                  }}>
                    {parseBold(cell)}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export function renderBody(body) {
  const lines = body.split('\n')
  const elements = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // Table
    if (line.startsWith('|')) {
      const tableLines = []
      while (i < lines.length && lines[i].startsWith('|')) {
        tableLines.push(lines[i])
        i++
      }
      elements.push(<div key={i}>{renderTable(tableLines)}</div>)
      continue
    }

    // Bullet list
    if (line.startsWith('- ')) {
      const items = []
      while (i < lines.length && lines[i].startsWith('- ')) {
        items.push(lines[i].slice(2))
        i++
      }
      elements.push(
        <ul key={i} style={{ margin: '16px 0 16px 0', paddingLeft: '0', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {items.map((item, j) => (
            <li key={j} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', fontSize: '14px', color: 'var(--text-mid)', lineHeight: 1.8 }}>
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--teal)', flexShrink: 0, marginTop: '9px' }} />
              <span>{parseBold(item)}</span>
            </li>
          ))}
        </ul>
      )
      continue
    }

    // Numbered list
    if (/^\d+\. /.test(line)) {
      const items = []
      while (i < lines.length && /^\d+\. /.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\. /, ''))
        i++
      }
      elements.push(
        <ol key={i} style={{ margin: '16px 0', paddingLeft: '0', listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', counterReset: 'step' }}>
          {items.map((item, j) => (
            <li key={j} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', fontSize: '14px', color: 'var(--text-mid)', lineHeight: 1.8 }}>
              <span style={{
                minWidth: '26px', height: '26px', borderRadius: '50%',
                background: 'var(--off-white)', border: '1px solid var(--teal)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '11px', color: 'var(--teal-dark)', fontWeight: 600, flexShrink: 0,
              }}>
                {j + 1}
              </span>
              <span style={{ paddingTop: '2px' }}>{parseBold(item)}</span>
            </li>
          ))}
        </ol>
      )
      continue
    }

    // Empty line — skip
    if (line.trim() === '') {
      i++
      continue
    }

    // Regular paragraph
    elements.push(
      <p key={i} style={{ fontSize: '14px', color: 'var(--text-mid)', lineHeight: 1.9, marginBottom: '16px' }}>
        {parseBold(line)}
      </p>
    )
    i++
  }

  return elements
}
