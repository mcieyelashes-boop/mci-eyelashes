import { Routes, Route } from 'react-router-dom'
import './index.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Home page sections
import Hero from './components/Hero'
import Products from './components/Products'
import Process from './components/Process'
import Gallery from './components/Gallery'
import About from './components/About'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import FAQ from './components/FAQ'

// Blog pages
import BlogList from './pages/BlogList'
import BlogPost from './pages/BlogPost'

function Home() {
  return (
    <main>
      <Hero />
      <Products />
      <Process />
      <Gallery />
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
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
