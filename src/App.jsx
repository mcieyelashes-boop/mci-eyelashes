import { Suspense, lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Products from './components/Products'
import About from './components/About'
import Services from './components/Services'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'

// Lazy-loaded pages (unchanged)
const Catalogue  = lazy(() => import('./pages/Catalogue'))
const BlogList   = lazy(() => import('./pages/BlogList'))
const BlogPost   = lazy(() => import('./pages/BlogPost'))

// Keep existing components that don't need restyling
const Process    = lazy(() => import('./components/Process'))
const Gallery    = lazy(() => import('./components/Gallery'))
const FAQ        = lazy(() => import('./components/FAQ'))
const Booking    = lazy(() => import('./components/Booking'))

function Home() {
  return (
    <>
      <Hero />
      <Products />
      <About />
      <Services />
      <Testimonials />
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
        </Routes>
      </Suspense>
      <Footer />
    </BrowserRouter>
  )
}
