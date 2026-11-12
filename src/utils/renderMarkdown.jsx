// Lightweight markdown renderer for blog post bodies.
// Handles: paragraphs, **bold**, [text](url) links, tables, bullet lists, numbered lists.
// It emits plain elements; the look comes from the .prose rules in index.css.

import { Link } from 'react-router-dom'

function parseInline(text) {
  // Split on **bold** and [text](url) patterns
  const parts = text.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g)
  return parts.map((part, i) => {
    if (/^\*\*(.*)\*\*$/.test(part)) {
      return <strong key={i}>{part.slice(2, -2)}</strong>
    }
    const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/)
    if (linkMatch) {
      const [, label, href] = linkMatch
      if (href.startsWith('/')) {
        return <Link key={i} to={href}>{label}</Link>
      }
      return <a key={i} href={href} target="_blank" rel="noopener noreferrer">{label}</a>
    }
    return part
  })
}

function renderTable(lines) {
  const rows = lines.filter(l => l.startsWith('|') && !l.match(/^\|[-| ]+\|$/))
  const [header, ...body] = rows
  const cols = header.split('|').slice(1, -1).map(c => c.trim())

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            {cols.map((col, i) => <th key={i} scope="col">{col}</th>)}
          </tr>
        </thead>
        <tbody>
          {body.map((row, ri) => {
            const cells = row.split('|').slice(1, -1).map(c => c.trim())
            return (
              <tr key={ri}>
                {cells.map((cell, ci) => <td key={ci}>{parseInline(cell)}</td>)}
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
        <ul key={i}>
          {items.map((item, j) => <li key={j}>{parseInline(item)}</li>)}
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
        <ol key={i}>
          {items.map((item, j) => <li key={j}>{parseInline(item)}</li>)}
        </ol>
      )
      continue
    }

    // Empty line: skip
    if (line.trim() === '') {
      i++
      continue
    }

    // Regular paragraph
    elements.push(<p key={i}>{parseInline(line)}</p>)
    i++
  }

  return elements
}
