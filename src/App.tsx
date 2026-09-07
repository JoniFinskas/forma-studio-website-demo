import { lazy, Suspense } from 'react'
import { Route, Routes, useLocation } from 'react-router'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { RouteEffects } from './components/RouteEffects'
import { PhotoCredits } from './components/PhotoCredits'
import { Home } from './pages/Home'
import { Work } from './pages/Work'
import { ProjectDetail } from './pages/ProjectDetail'
import { Studio } from './pages/Studio'
import { NotFound } from './pages/NotFound'

const Contact = lazy(() => import('./pages/Contact').then((page) => ({ default: page.Contact })))

export function App() {
  const location = useLocation()
  return (
    <>
      <Header />
      <main id="main">
        <Suspense fallback={null}>
          <RouteEffects />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/work" element={<Work />} />
            <Route path="/work/:slug" element={<ProjectDetail />} />
            <Route path="/studio" element={<Studio />} />
            <Route path="/contact" element={<Contact key={location.search} />} />
            <Route path="/credits" element={<PhotoCredits />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  )
}
