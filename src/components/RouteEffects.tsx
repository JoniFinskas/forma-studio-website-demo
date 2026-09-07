import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'
import { pageMeta } from '../lib/routes'

export function RouteEffects() {
  const location = useLocation()
  const previousLocation = useRef(location)

  useEffect(() => {
    const meta = pageMeta(location.pathname)
    document.title = meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description)
    const pathChanged = previousLocation.current.pathname !== location.pathname
    const returnedHome = location.pathname === '/' && previousLocation.current.key !== location.key
    previousLocation.current = location
    if (pathChanged || returnedHome) {
      if (location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView()
      else {
        window.scrollTo({ top: 0, behavior: 'instant' })
        document.querySelector<HTMLElement>('main h1')?.focus({ preventScroll: true })
      }
    }
  }, [location])

  return null
}
