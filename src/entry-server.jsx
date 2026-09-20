import { StaticRouter } from 'react-router-dom'
import { prerender } from 'react-dom/static'
import { AppRoutes } from './App.jsx'

async function streamToString(stream) {
  const reader = stream.getReader()
  const decoder = new TextDecoder()
  let html = ''
  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    html += decoder.decode(value, { stream: true })
  }
  return html + decoder.decode()
}

// Build-time only. Renders the real page tree for one URL to an HTML string.
// prerender() (unlike renderToString) waits for React.lazy pages and the lazy
// FAQ section to resolve, so the string contains the full page, not a spinner.
export async function render(url) {
  const { prelude } = await prerender(
    <StaticRouter location={url}>
      <AppRoutes />
    </StaticRouter>,
    {
      onError(error) {
        throw error
      },
    },
  )
  return streamToString(prelude)
}
