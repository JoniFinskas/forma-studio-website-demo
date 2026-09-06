import { Link } from 'react-router'
import { Photo } from '../components/Photo'
import { ProjectCard } from '../components/ProjectCard'
import { ContactCta } from '../components/ContactCta'
import { projects } from '../data/projects'

export function Home() {
  return (
    <>
      <section className="home-hero container">
        <div className="hero-intro">
          <div>
            <p className="eyebrow">Independent architecture & interiors</p>
            <h1 tabIndex={-1}>
              Spaces that make
              <br />
              room for life.
            </h1>
          </div>
          <div className="hero-summary">
            <p>Thoughtful buildings and interiors, shaped around the people who use them.</p>
            <Link className="text-link" to="/work">
              Explore the work <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
        <div className="hero-image">
          <Photo name="atrium" priority sizes="(max-width: 1280px) 94vw, 1200px" />
        </div>
        <div className="image-caption">
          <span>The atrium / Workplace concept</span>
          <span>Selected study, 2026</span>
        </div>
      </section>
      <section className="container section home-work">
        <div className="section-heading">
          <div>
            <p className="eyebrow">01 / Selected work</p>
            <h2>
              Different places.
              <br />A considered approach.
            </h2>
          </div>
          <Link className="text-link" to="/work">
            View all projects <span aria-hidden="true">↗</span>
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
            <p className="eyebrow">02 / The studio</p>
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
