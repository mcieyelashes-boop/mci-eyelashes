import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { blogPosts } from '../data/blogPosts'
import { setMeta, HOME_META } from '../utils/setMeta'

const BASE_URL = 'https://www.mci-eyelashes.com'

const fmtDate = (d) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })

export default function BlogList() {
  useEffect(() => {
    window.scrollTo(0, 0)
    setMeta({
      title:              'Blog | MCI Eyelashes: Wholesale Lash Industry Guides',
      description:        'Expert guides for wholesale lash buyers, salon owners, and beauty entrepreneurs, from MOQ and pricing to private label manufacturing and brand building.',
      canonical:          `${BASE_URL}/blog`,
      ogTitle:            'Wholesale Lash Industry Guides | MCI Eyelashes Blog',
      ogDescription:      'Practical guides on starting a lash business, choosing a manufacturer, private label OEM, pricing strategy, and more.',
      ogUrl:              `${BASE_URL}/blog`,
      ogImage:            `${BASE_URL}/hero-lashes.jpg`,
      twitterTitle:       'Wholesale Lash Industry Guides | MCI Eyelashes Blog',
      twitterDescription: 'Expert guides on private label lashes, wholesale pricing, MOQ, and lash business strategy.',
    })
    return () => setMeta(HOME_META)
  }, [])

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Resources</p>
          <h1>Wholesale Lash <em>Industry Guides</em></h1>
          <p className="lede">
            Practical guides for salon owners, distributors, and beauty entrepreneurs, from pricing and MOQ to private label manufacturing.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="post-list">
            {blogPosts.map((post) => (
              <article key={post.slug} className="post-row">
                <div className="post-row-meta">
                  <span className="chip">{post.category}</span>
                  <span>{fmtDate(post.date)} · {post.readTime}</span>
                </div>
                <div>
                  <h2><Link to={`/blog/${post.slug}`}>{post.title}</Link></h2>
                  <p>{post.excerpt}</p>
                </div>
                <Link to={`/blog/${post.slug}`} className="arrow-link" aria-label={`Read guide: ${post.title}`}>Read Guide</Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
