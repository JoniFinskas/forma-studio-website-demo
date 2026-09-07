import { BrandLogo } from './BrandLogo'
import { useEffect, useRef, useState } from 'react'
import { Link, NavLink } from 'react-router'

const links = [
  { to: '/work', label: 'Work' },
  { to: '/studio', label: 'Studio' },
  { to: '/contact', label: 'Contact' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const header = useRef<HTMLElement>(null)
  const toggle = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const element = header.current
    if (!element) return
    const measure = () => {
      if (open) return
      const top = parseFloat(getComputedStyle(element).top) || 0
      // Reserve the actual closed header height when text size or viewport changes.
      document.documentElement.style.setProperty(
        '--header-clearance',
        `${Math.ceil(element.getBoundingClientRect().height + top + 24)}px`,
      )
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(element)
    return () => observer.disconnect()
  }, [open])

  useEffect(() => {
    const media = window.matchMedia('(min-width: 900px)')
    const close = () => {
      setOpen(false)
    }
    media.addEventListener('change', close)
    return () => media.removeEventListener('change', close)
  }, [])

  useEffect(() => {
    if (!open) return
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !header.current?.contains(event.target)) setOpen(false)
    }
    document.addEventListener('pointerdown', closeOutside)
    return () => document.removeEventListener('pointerdown', closeOutside)
  }, [open])

  useEffect(() => {
    if (!open) return
    const onScroll = () => {
      if (document.activeElement?.closest('#mobile-menu')) {
        toggle.current?.focus({ preventScroll: true })
      }
      setOpen(false)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [open])

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header
        ref={header}
        className="header-shell"
        onBlur={(event) => {
          if (
            event.relatedTarget instanceof Node &&
            !event.currentTarget.contains(event.relatedTarget)
          )
            setOpen(false)
        }}
        onKeyDown={(event) => {
          if (event.key === 'Escape' && open) {
            setOpen(false)
            toggle.current?.focus()
          }
        }}
      >
        <div className="site-header">
          <Link className="wordmark" translate="no" to="/" aria-label="Forma Studio home">
            <BrandLogo />
          </Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            <NavLink to="/" end>
              Home
            </NavLink>
            {links.map((link) => (
              <NavLink key={link.to} to={link.to}>
                {link.label}
              </NavLink>
            ))}
          </nav>
          <Link className="header-action" to="/contact">
            Start a project
          </Link>
          <button
            ref={toggle}
            type="button"
            className="menu-toggle"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
          >
            <span className="menu-label">{open ? 'Close' : 'Menu'}</span>
            <svg
              className="menu-symbol"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              aria-hidden="true"
              focusable="false"
            >
              <path d={open ? 'M6 6l12 12M6 18 18 6' : 'M4 8h16M4 16h16'} />
            </svg>
          </button>
          <nav
            id="mobile-menu"
            className="mobile-nav"
            aria-label="Mobile navigation"
            hidden={!open}
          >
            <NavLink to="/" end onClick={() => setOpen(false)}>
              Home
            </NavLink>
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} onClick={() => setOpen(false)}>
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
    </>
  )
}
