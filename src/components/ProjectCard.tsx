import { Link } from 'react-router'
import type { Project } from '../data/projects'
import { Photo } from './Photo'

export function ProjectCard({
  project,
  compact = false,
  headingLevel = 3,
}: {
  project: Project
  compact?: boolean
  headingLevel?: 2 | 3
}) {
  const Heading = headingLevel === 2 ? 'h2' : 'h3'
  return (
    <article className="project-card">
      <Link
        to={`/work/${project.slug}`}
        className="project-link"
        aria-label={`View ${project.title}`}
      >
        <div className="project-image">
          <Photo
            name={project.photo}
            sizes={compact ? '(max-width: 700px) 100vw, 33vw' : '(max-width: 700px) 100vw, 55vw'}
          />
          <span className="image-label">
            View project <span aria-hidden="true">↗</span>
          </span>
        </div>
        <div className="project-caption">
          <div>
            <p className="eyebrow">
              {project.category} / Concept {project.number}
            </p>
            <Heading>{project.title}</Heading>
          </div>
          <span className="project-year">{project.year}</span>
        </div>
      </Link>
    </article>
  )
}
