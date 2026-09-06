import { useState } from 'react'
import { ProjectCard } from '../components/ProjectCard'
import { ContactCta } from '../components/ContactCta'
import { projects } from '../data/projects'

const filters = ['All work', 'Workspaces', 'Housing', 'Interiors'] as const

export function Work() {
  const [filter, setFilter] = useState<string>('All work')
  const visible = projects.filter((project) => filter === 'All work' || project.category === filter)
  return (
    <>
      <section className="container page-intro">
        <p className="eyebrow">The portfolio</p>
        <h1 tabIndex={-1}>Selected work.</h1>
        <p className="intro-copy">
          Three concept studies exploring daylight, shared space and the edges between inside and
          out.
        </p>
      </section>
      <section className="container work-section" aria-label="Project collection">
        <div className="filter-bar" role="group" aria-label="Filter projects">
          {filters.map((item) => (
            <button key={item} aria-pressed={filter === item} onClick={() => setFilter(item)}>
              {item}
            </button>
          ))}
        </div>
        <p className="result-count" role="status">
          {visible.length} {visible.length === 1 ? 'project' : 'projects'}
        </p>
        <div className="work-grid">
          {visible.map((project) => (
            <ProjectCard key={project.slug} project={project} headingLevel={2} compact />
          ))}
        </div>
      </section>
      <ContactCta />
    </>
  )
}
