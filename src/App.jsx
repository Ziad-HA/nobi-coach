import { useCallback, useEffect, useState } from 'react'
import { MotionConfig, AnimatePresence } from 'framer-motion'
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import Footer from './components/Footer'
import CursorGlow from './components/CursorGlow'
import Intro from './components/Intro'
import Nav from './components/Nav'
import ScrollProgress from './components/ScrollProgress'
import Terms from './components/Terms'
import About from './pages/About'
import Faq from './pages/Faq'
import Home from './pages/Home'
import Transformations from './pages/Transformations'


function introAlreadySeen() {
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true
    return sessionStorage.getItem('nobi-intro') === '1'
  } catch {
    return false
  }
}

function termsAlreadyAccepted() {
  try {
    return localStorage.getItem('nobi-terms') === '1'
  } catch {
    return false
  }
}

// Scrolls to #hash targets (even after switching pages) or back to the top.
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      return undefined
    }
    let tries = 0
    let timer
    const go = () => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (el) el.scrollIntoView()
      else if (tries++ < 20) timer = setTimeout(go, 50)
    }
    go()
    return () => clearTimeout(timer)
  }, [pathname, hash])
  return null
}

function Layout() {
  const [ready, setReady] = useState(introAlreadySeen)
  const [agreed, setAgreed] = useState(termsAlreadyAccepted)

  const accept = useCallback(() => {
    try {
      localStorage.setItem('nobi-terms', '1')
    } catch {
      /* storage unavailable */
    }
    setAgreed(true)
  }, [])

  const finish = useCallback(() => {
    try {
      sessionStorage.setItem('nobi-intro', '1')
    } catch {
      /* storage unavailable */
    }
    setReady(true)
  }, [])

  return (
    <div className={ready ? 'site ready' : 'site'}>
      <AnimatePresence>{!agreed ? <Terms key="terms" onAccept={accept} /> : null}</AnimatePresence>
      <AnimatePresence>{agreed && !ready ? <Intro key="intro" onDone={finish} /> : null}</AnimatePresence>
      <CursorGlow />
      <ScrollProgress />
      <Nav />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <ScrollManager />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="faq" element={<Faq />} />
          <Route path="transformations" element={<Transformations />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </MotionConfig>
  )
}
