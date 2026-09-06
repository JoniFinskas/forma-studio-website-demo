import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'
import { pageMeta } from '../lib/routes'

export function RouteEffects() {
  const location = useLocation()
  const previousPath = useRef(location.pathname)

  useEffect(() => {
    const meta = pageMeta(location.pathname)
    document.title = meta.title
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description)
    if (previousPath.current !== location.pathname) {
      previousPath.current = location.pathname
      if (location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView()
      else {
        window.scrollTo({ top: 0, behavior: 'instant' })
        document.querySelector<HTMLElement>('main h1')?.focus({ preventScroll: true })
      }
    }
  }, [location])

  return null
}
