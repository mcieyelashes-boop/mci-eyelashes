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
          <Route path="/eyelashes-factory-indonesia" element={<LandingPage slug="eyelashes-factory-indonesia" />} />
          <Route path="/eyelash-manufacturer-indonesia" element={<LandingPage slug="eyelash-manufacturer-indonesia" />} />
          <Route path="/private-label-eyelashes" element={<LandingPage slug="private-label-eyelashes" />} />
          <Route path="/eyelash-oem-indonesia" element={<LandingPage slug="eyelash-oem-indonesia" />} />
          <Route path="/custom-eyelashes" element={<LandingPage slug="custom-eyelashes" />} />
          <Route path="/wholesale-eyelashes" element={<LandingPage slug="wholesale-eyelashes" />} />
          <Route path="/eyelash-manufacturer-purbalingga" element={<LandingPage slug="eyelash-manufacturer-purbalingga" />} />
          <Route path="/handmade-eyelashes" element={<LandingPage slug="handmade-eyelashes" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Footer />
      <WhatsAppButton />
    </BrowserRouter>
  )
}
