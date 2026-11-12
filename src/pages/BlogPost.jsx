import { useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { blogPosts } from '../data/blogPosts'
import { AUTHOR } from '../data/author'
import { renderBody } from '../utils/renderMarkdown'
import { setMeta, HOME_META } from '../utils/setMeta'
import { ogImageFor } from '../data/ogImages'

const BASE_URL = 'https://www.mci-eyelashes.com'

export default function BlogPost() {
  const { slug } = useParams()
  const post = blogPosts.find(p => p.slug === slug)

  useEffect(() => {
    if (post) {
      window.scrollTo(0, 0)
      const url = `${BASE_URL}/blog/${post.slug}`

      // Update all head meta tags for this article
      setMeta({
        title:               post.seoTitle ?? post.title,
        description:         post.metaDescription,
        canonical:           url,
        ogTitle:             post.title,
        ogDescription:       post.metaDescription,
        ogUrl:               url,
        ogImage:             ogImageFor(post.slug, BASE_URL),
        twitterTitle:        post.title,
        twitterDescription:  post.metaDescription,
      })

      // Inject BlogPosting + BreadcrumbList JSON-LD
      const existing = document.getElementById('blog-ld')
      if (existing) existing.remove()
      const script = document.createElement('script')
      script.id = 'blog-ld'
      script.type = 'application/ld+json'
      script.text = JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'BlogPosting',
            '@id': url,
            headline: post.title,
            description: post.metaDescription,
            image: ogImageFor(post.slug, BASE_URL),
            datePublished: post.date,
            dateModified: post.date,
            author: {
              '@type': 'Person',
              name: AUTHOR.name,
              jobTitle: AUTHOR.jobTitle,
              url: AUTHOR.url,
              worksFor: { '@type': 'Organization', name: 'MCI Eyelashes', url: BASE_URL },
            },
            publisher: {
              '@type': 'Organization',
              name: 'MCI Eyelashes',
              logo: { '@type': 'ImageObject', url: `${BASE_URL}/favicon.svg` },
            },
            mainEntityOfPage: { '@type': 'WebPage', '@id': url },
            ...(post.faq && {
              mainEntity: post.faq.map(({ q, a }) => ({
                '@type': 'Question',
                name: q,
                acceptedAnswer: { '@type': 'Answer', text: a },
              })),
            }),
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home',  item: `${BASE_URL}/` },
              { '@type': 'ListItem', position: 2, name: 'Blog',  item: `${BASE_URL}/blog` },
              { '@type': 'ListItem', position: 3, name: post.title, item: url },
            ],
          },
        ],
      })
      document.head.appendChild(script)
    }

    return () => {
      // Restore homepage defaults when navigating away
      setMeta(HOME_META)
      const el = document.getElementById('blog-ld')
      if (el) el.remove()
    }
  }, [post])

  if (!post) return <Navigate to="/blog" replace />

  const otherPosts = blogPosts.filter(p => p.slug !== slug).slice(0, 2)

  return (
    <main>
      <section className="page-hero page-hero--long">
        <div className="container">
          <p className="eyebrow">
            <Link to="/">Home</Link> <span aria-hidden="true">/</span> <Link to="/blog">Blog</Link> <span aria-hidden="true">/</span> {post.category}
          </p>
          <div className="page-meta">
            <span className="chip">{post.category}</span>
            <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' })}</span>
            <span>{post.readTime}</span>
            <span>By {AUTHOR.name}, {AUTHOR.jobTitle.replace(', MCI Eyelashes', '')}</span>
          </div>
          <h1>{post.title}</h1>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="article-layout">
            <article>
              <p className="article-lede">{post.excerpt}</p>

              <div className="prose">
                {post.sections.map((section, i) => (
                  <section key={i}>
                    <h2>{section.heading}</h2>
                    <div>{renderBody(section.body)}</div>
                  </section>
                ))}
              </div>

              {post.faq && (
                <div style={{ marginTop: 'clamp(48px, 6vw, 72px)' }}>
                  <h2 className="sub-title">Frequently Asked Questions</h2>
                  <div className="qa-list">
                    {post.faq.map(({ q, a }, i) => (
                      <div key={i} className="qa">
                        <h3>{q}</h3>
                        <p>{a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </article>

            <aside className="article-aside">
              <div className="aside-card">
                <p className="aside-title">Wholesale Inquiry</p>
                <h2>Ready to order wholesale?</h2>
                <p>Get a catalog, pricing sheet, and sample kit. Our team responds within 24 hours.</p>
                <Link to="/#contact" className="btn">Get Wholesale Pricing</Link>
              </div>

              <p className="aside-title">More Guides</p>
              {otherPosts.map((other) => (
                <Link key={other.slug} to={`/blog/${other.slug}`} className="aside-link">
                  <span>{other.category}</span>
                  <strong>{other.title}</strong>
                </Link>
              ))}
            </aside>
          </div>
        </div>
      </section>
    </main>
  )
}
