import { projects } from '../data/projects'

const pages: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Forma Studio | Architecture & interiors',
    description:
      'An independent architecture and interiors concept exploring useful spaces, daylight and lasting materials.',
  },
  '/work': {
    title: 'Selected work | Forma Studio',
    description: 'Explore three architecture and interior concept studies by Forma Studio.',
  },
  '/studio': {
    title: 'The studio | Forma Studio',
    description: 'A clear, practical approach to architecture, interiors and renovation.',
  },
  '/contact': {
    title: 'Start a project | Forma Studio',
    description:
      'Explore a local project inquiry form. Forma Studio is a fictional design practice.',
  },
  '/credits': {
    title: 'Photo credits | Forma Studio',
    description: 'Photograph sources, creators and licenses for the Forma Studio concept.',
  },
}

for (const project of projects)
  pages[`/work/${project.slug}`] = {
    title: `${project.title} | Forma Studio`,
    description: project.description,
  }

export const routes = [...Object.keys(pages), '/404']

export function pageMeta(pathname: string) {
  const path = pathname.replace(/\/+$/, '') || '/'
  return (
    pages[path] ?? {
      title: '404 · Page not found | Forma Studio',
      description: 'Find your way back to Forma Studio.',
    }
  )
}
