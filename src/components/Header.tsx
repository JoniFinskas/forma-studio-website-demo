import { useRef } from 'react'
import { Link, NavLink } from 'react-router'

const links = [
  { to: '/work', label: 'Work' },
  { to: '/studio', label: 'Studio' },
  { to: '/contact', label: 'Contact' },
]

export function Header() {
  const menu = useRef<HTMLDialogElement>(null)
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <Link className="wordmark" to="/" aria-label="Forma Studio home">
          forma
          <span className="brand-dot" aria-hidden="true">
            .
          </span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
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
          className="menu-toggle"
          aria-haspopup="dialog"
          onClick={() => menu.current?.showModal()}
        >
          Menu <span aria-hidden="true">+</span>
        </button>
      </header>
      <dialog
        ref={menu}
        className="mobile-menu"
        aria-labelledby="menu-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) menu.current?.close()
        }}
      >
        <div className="menu-panel">
          <div className="menu-top">
            <span id="menu-title">Explore Forma</span>
            <button autoFocus onClick={() => menu.current?.close()}>
              Close <span aria-hidden="true">×</span>
            </button>
          </div>
          <nav aria-label="Mobile navigation">
            <Link to="/" onClick={() => menu.current?.close()}>
              Home
            </Link>
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} onClick={() => menu.current?.close()}>
                {link.label}
              </NavLink>
            ))}
          </nav>
          <p>Architecture & interiors</p>
        </div>
      </dialog>
    </>
  )
}
