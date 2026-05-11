import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Products from './components/Products'
import About from './components/About'
import Services from './components/Services'
import Gallery from './components/Gallery'
import Process from './components/Process'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CTABanner from './components/CTABanner'
import WhatsAppButton from './components/WhatsAppButton'

// Lazy-loaded pages
const Catalogue  = lazy(() => import('./pages/Catalogue'))
const BlogList   = lazy(() => import('./pages/BlogList'))
const BlogPost   = lazy(() => import('./pages/BlogPost'))
const FAQ        = lazy(() => import('./components/FAQ'))
const NotFound   = lazy(() => import('./pages/NotFound'))

function Home() {
  return (
    <>
      <Hero />
      <Products />
      <Gallery />
      <Process />
      <About />
      <Services />
      <Testimonials />
      <FAQ />
      <CTABanner />
      <Contact />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Suspense fallback={<div style={{ minHeight: '100vh', background: '#0a1720' }} />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
      <WhatsAppButton />
    </BrowserRouter>
  )
}
