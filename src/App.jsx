import './index.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Products from './components/Products'
import Process from './components/Process'
import Gallery from './components/Gallery'
import About from './components/About'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Products />
        <Process />
        <Gallery />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
