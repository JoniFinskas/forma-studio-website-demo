import { Link } from 'react-router'
import { Photo } from '../components/Photo'
import { ContactCta } from '../components/ContactCta'
import { services } from '../data/projects'

export function Studio() {
  return (
    <>
      <section className="container page-intro">
        <h1 tabIndex={-1}>
          Good spaces begin
          <br />
          with good questions.
        </h1>
        <p className="intro-copy">
          What needs to change? What deserves to stay? How should a place feel on an ordinary
          Tuesday?
        </p>
      </section>
      <section className="container studio-about">
        <Photo name="common-room" priority sizes="(max-width: 700px) 100vw, 60vw" />
        <div>
          <h2>
            Useful first.
            <br />
            Personal always.
          </h2>
          <p>
            Forma is a small architecture and interiors practice built around a simple belief:
            spaces work best when their purpose is clear.
          </p>
          <p>
            We look closely at what is already there, test the layout early and keep materials
            honest. A good result should feel natural to use.
          </p>
          <p className="small">
            Forma is a fictional studio created as an independent portfolio concept.
          </p>
        </div>
      </section>
      <section className="container section services-section">
        <div className="section-heading">
          <div>
            <h2>
              From the building
              <br />
              to the smallest detail.
            </h2>
          </div>
        </div>
        <div className="service-list">
          {services.map((service) => (
            <article key={service.value}>
              <h3>{service.label}</h3>
              <p>{service.description}</p>
              <Link className="text-link" to={`/contact?service=${service.value}`}>
                Discuss {service.label.toLowerCase()}
              </Link>
            </article>
          ))}
        </div>
      </section>
      <section className="process-band">
        <div className="container section">
          <h2>
            Clear steps.
            <br />
            Room for conversation.
          </h2>
          <ol className="process-list">
            <li>
              <h3>Understand the brief</h3>
              <p>
                A conversation about the place, the practical limits and what a good outcome means
                to you.
              </p>
            </li>
            <li>
              <h3>Test the possibilities</h3>
              <p>
                Layouts and early material ideas make the options tangible before detailed decisions
                begin.
              </p>
            </li>
            <li>
              <h3>Resolve the details</h3>
              <p>
                Drawings and specifications bring the design together, with regular reviews along
                the way.
              </p>
            </li>
          </ol>
        </div>
      </section>
      <ContactCta />
    </>
  )
}
