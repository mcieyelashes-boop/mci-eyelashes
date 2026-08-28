// Single source of truth for the blog byline — used by both the client
// (src/pages/BlogPost.jsx) and the build-time prerender script
// (scripts/prerender-blog.mjs) so the two never drift.
export const AUTHOR = {
  name: 'Denis',
  jobTitle: 'Founder, MCI Eyelashes',
  email: 'denis@mci-eyelashes.com',
  url: 'https://www.mci-eyelashes.com/blog',
}
