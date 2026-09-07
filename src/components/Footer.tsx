import { BrandLogo } from './BrandLogo'
import { Link } from 'react-router'

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div className="footer-identity">
            <Link className="footer-brand" to="/" translate="no" aria-label="Forma Studio home">
              <BrandLogo />
            </Link>
            <p>Architecture and interiors.</p>
          </div>
          <nav className="footer-links" aria-labelledby="footer-group-0">
            <h2 id="footer-group-0">Projects</h2>
            <ul>
              <li>
                <Link to="/work/the-atrium">The atrium</Link>
              </li>
              <li>
                <Link to="/work/terrace-study">Terrace study</Link>
              </li>
              <li>
                <Link to="/work/common-ground">Common ground</Link>
              </li>
              <li>
                <Link to="/work">All work</Link>
              </li>
            </ul>
          </nav>
          <nav className="footer-links" aria-labelledby="footer-group-1">
            <h2 id="footer-group-1">Studio</h2>
            <ul>
              <li>
                <Link to="/studio">About the studio</Link>
              </li>
              <li>
                <Link to="/contact">Start a project</Link>
              </li>
              <li>
                <Link to="/credits">Photo credits</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="footer-bottom">
          <p>Fictional studio. Projects are concept studies; photography is illustrative.</p>
          <span>© 2026 Joni Finskas</span>
        </div>
      </div>
    </footer>
  )
}
