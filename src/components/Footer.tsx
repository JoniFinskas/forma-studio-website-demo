import { Link } from 'react-router'

export function Footer() {
  return (
    <footer className="site-footer container">
      <div className="footer-main">
        <Link className="wordmark" to="/">
          forma.
        </Link>
        <p>
          Architecture & interiors.
          <br />
          Spaces for the way we live.
        </p>
        <nav aria-label="Footer navigation">
          <Link to="/work">Work</Link>
          <Link to="/studio">Studio</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </div>
      <div className="footer-bottom">
        <p>Fictional studio. Projects are concept studies; photography is illustrative.</p>
        <Link to="/credits">Photo credits</Link>
        <span>© 2026 Joni Finskas</span>
      </div>
    </footer>
  )
}
