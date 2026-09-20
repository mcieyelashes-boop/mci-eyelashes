import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Products from './components/Products'
import About from './components/About'
import Services from './components/Services'
import Gallery from './components/Gallery'
import Process from './components/Process'
import FactoryProof from './components/FactoryProof'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CTABanner from './components/CTABanner'
import WhatsAppButton from './components/WhatsAppButton'

// Lazy-loaded pages
const Catalogue    = lazy(() => import('./pages/Catalogue'))
const BlogList     = lazy(() => import('./pages/BlogList'))
const BlogPost     = lazy(() => import('./pages/BlogPost'))
const LandingPage  = lazy(() => import('./pages/LandingPage'))
const FAQ          = lazy(() => import('./components/FAQ'))
const NotFound     = lazy(() => import('./pages/NotFound'))

function Home() {
  return (
    <>
      <Hero />
      <Products />
      <Gallery />
      <Process />
      <About />
      <Services />
      <FactoryProof />
      <FAQ />
      <CTABanner />
      <Contact />
    </>
  )
}

// The routes and page chrome, without the router around them, so the build can
// render this same tree on the server (entry-server.jsx wraps it in a
// StaticRouter) and the browser can wrap it in BrowserRouter (App below).
export function AppRoutes() {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div style={{ minHeight: '100vh', background: '#0a1720' }} />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          {/* Every commercial landing page is a src/data/landingPages.js entry,
              so a new page needs no route here. LandingPage renders NotFound
              itself for a slug that is not in the data. */}
          <Route path="/:slug" element={<LandingPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
      <WhatsAppButton />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
