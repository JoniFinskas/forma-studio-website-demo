import { Link } from 'react-router'

export function NotFound() {
  return (
    <section className="container not-found">
      <h1 tabIndex={-1}>
        <span className="error-code">404</span>
        This page is
        <br />
        off the plan.
      </h1>
      <p>The address may have changed. Explore the work or head back home.</p>
      <div className="actions">
        <Link className="button primary" to="/">
          Back to home
        </Link>
        <Link className="button outline" to="/work">
          View the work
        </Link>
      </div>
    </section>
  )
}
