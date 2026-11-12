// Tells Bing and the other IndexNow search engines which pages changed, so they
// re-crawl within minutes rather than days. Google does not use IndexNow.
//
// NOT part of the build. Run by hand after a release is live:
//
//   node scripts/indexnow.mjs            every URL in the sitemap
//   node scripts/indexnow.mjs /catalogue /blog/some-post     only these paths
//
// The key below is not a secret: IndexNow proves ownership by finding the same
// key in public/<key>.txt on the live site.
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const HOST = 'www.mci-eyelashes.com'
const KEY = 'c2366cc05d19b2e7f532018dc1c6db42'
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

const fromSitemap = () =>
  [...readFileSync(join(ROOT, 'public', 'sitemap.xml'), 'utf8').matchAll(/<loc>(https:\/\/www\.mci-eyelashes\.com[^<]*)<\/loc>/g)]
    .map((m) => m[1])
    .filter((u) => !/\.(webp|jpg|png)$/.test(u))

const args = process.argv.slice(2)
const urlList = args.length ? args.map((p) => `https://${HOST}${p}`) : fromSitemap()

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
})
console.log(`IndexNow: ${urlList.length} URLs sent, answer ${res.status} ${res.statusText}`)
if (!res.ok && res.status !== 202) process.exitCode = 1
