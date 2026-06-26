import { useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { SiteHeader } from '@/components/SiteHeader'
import { Footer } from '@/components/Footer'
import Home from '@/pages/Home'
import About from '@/pages/About'
import Contact from '@/pages/Contact'
import Donate from '@/pages/Donate'
import Faq from '@/pages/Faq'
import Gallery from '@/pages/Gallery'
import Leadership from '@/pages/Leadership'
import Lodges from '@/pages/Lodges'
import News from '@/pages/News'
import Portal from '@/pages/Portal'
import Programs from '@/pages/Programs'
import Projects from '@/pages/Projects'

function Layout() {
  const { pathname } = useLocation()
  const scrollRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0
  }, [pathname])
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', paddingTop: '70px', overflow: 'hidden' }}>
      <SiteHeader />
      <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto' }}>
        <main>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/leadership" element={<Leadership />} />
              <Route path="/lodges" element={<Lodges />} />
              <Route path="/news" element={<News />} />
              <Route path="/portal" element={<Portal />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/projects" element={<Projects />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  )
}
