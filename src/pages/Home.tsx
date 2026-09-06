import { Link } from 'react-router'
import { Photo } from '../components/Photo'
import { ProjectCard } from '../components/ProjectCard'
import { ContactCta } from '../components/ContactCta'
import { projects } from '../data/projects'

export function Home() {
  return (
    <>
      <section className="home-hero">
        <Photo name="pavilion" className="hero-background" priority sizes="100vw" />
        <div className="hero-shade" aria-hidden="true" />
        <div className="container hero-content">
          <div className="hero-copy">
            <h1 tabIndex={-1}>
              Architecture for
              <br />
              <span className="hero-emphasis">everyday life.</span>
            </h1>
            <p>Buildings and interiors shaped around the people who use them.</p>
            <div className="hero-actions">
              <Link className="button primary" to="/work">
                Explore the work
              </Link>
              <Link className="button hero-secondary" to="/contact">
                Start a project
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="container section home-work">
        <div className="section-heading">
          <div>
            <h2>
              Different places.
              <br />A considered approach.
            </h2>
          </div>
          <Link className="text-link" to="/work">
            View all projects
          </Link>
        </div>
        <div className="project-grid">
          {projects.slice(0, 2).map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
      <section className="studio-band">
        <div className="container studio-split section">
          <div className="studio-copy">
            <h2>
              A clear idea,
              <br />
              carried through.
            </h2>
            <p>
              We start with how a space will be used. The drawings, materials and details follow
              from that.
            </p>
            <p>
              Our interests sit where the practical meets the personal: good daylight, a comfortable
              seat, a room that works a little harder.
            </p>
            <Link className="button secondary" to="/studio">
              Meet the approach
            </Link>
          </div>
          <div className="studio-photo">
            <Photo name="detail" sizes="(max-width: 700px) 90vw, 45vw" />
          </div>
        </div>
      </section>
      <ContactCta />
    </>
  )
}
