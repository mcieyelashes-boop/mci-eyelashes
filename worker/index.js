// Sends the bare domain to www, the address search engines should index.
// Everything else is the static site in dist/, served by Cloudflare's asset
// server (which also applies dist/_headers and dist/_redirects).
const CANONICAL_HOST = 'www.mci-eyelashes.com'

export default {
  fetch(request, env) {
    const url = new URL(request.url)
    if (url.hostname === 'mci-eyelashes.com') {
      url.hostname = CANONICAL_HOST
      return Response.redirect(url.toString(), 301)
    }
    return env.ASSETS.fetch(request)
  },
}
