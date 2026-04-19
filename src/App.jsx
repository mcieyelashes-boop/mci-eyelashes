import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import './index.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { setMeta, HOME_META } from './utils/setMeta'

import Hero from './components/Hero'
import Products from './components/Products'
import About from './components/About'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import FAQ from './components/FAQ'

import BlogList from './pages/BlogList'
import BlogPost from './pages/BlogPost'
import Catalogue from './pages/Catalogue'

function Home() {
  useEffect(() => {
    setMeta(HOME_META)
    window.scrollTo(0, 0)
  }, [])

  return (
    <main>
      <Hero />
      <Products />
      <About />
      <Testimonials />
      <FAQ />
      <Contact />
    </main>
  )
}

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalogue" element={<Catalogue />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
