import { Link, useParams } from 'react-router'
import { projects } from '../data/projects'
import { Photo } from '../components/Photo'
import { NotFound } from './NotFound'

export function ProjectDetail() {
  const { slug } = useParams()
  const index = projects.findIndex((project) => project.slug === slug)
  if (index === -1) return <NotFound />
  const project = projects[index]
  const next = projects[(index + 1) % projects.length]
  return (
    <>
      <section className="container page-intro project-intro">
        <Link className="back-link" to="/work">
          ← All projects
        </Link>
        <p className="eyebrow">
          {project.category} / Concept {project.number}
        </p>
        <h1 tabIndex={-1}>{project.title}.</h1>
        <p className="intro-copy">{project.subtitle}</p>
      </section>
      <div className={`container case-photo case-${project.slug}`}>
        <Photo name={project.photo} priority sizes="(max-width: 1280px) 94vw, 1200px" />
      </div>
      <section className="container section case-description">
        <dl className="project-facts">
          <div>
            <dt>Study</dt>
            <dd>{project.category}</dd>
          </div>
          <div>
            <dt>Example area</dt>
            <dd>{project.area}</dd>
          </div>
          <div>
            <dt>Year</dt>
            <dd>{project.year}</dd>
          </div>
          <div>
            <dt>Material direction</dt>
            <dd>{project.material}</dd>
          </div>
        </dl>
        <div>
          <p className="eyebrow">The idea</p>
          <h2>{project.subtitle}</h2>
          <p>{project.brief}</p>
          <p>{project.detail}</p>
          <p className="small study-note">
            This is a fictional concept study. The reference photograph depicts an independent
            property, not a completed Forma project.
          </p>
        </div>
      </section>
      <section className="container next-project">
        <p className="eyebrow">Next study</p>
        <Link to={`/work/${next.slug}`}>
          {next.title} <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </>
  )
}
