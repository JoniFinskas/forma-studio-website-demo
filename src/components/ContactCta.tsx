import { Link } from 'react-router'

export function ContactCta() {
  return (
    <section className="contact-cta container section">
      <div>
        <p className="eyebrow">A place to begin</p>
        <h2>
          Tell us what
          <br />
          you have in mind.
        </h2>
      </div>
      <div>
        <p>A new building, a room that needs rethinking, or an idea still on paper.</p>
        <Link className="button primary" to="/contact">
          Start a project
        </Link>
      </div>
    </section>
  )
}
