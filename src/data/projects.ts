export const projects = [
  {
    slug: 'the-atrium',
    number: '01',
    title: 'The atrium',
    category: 'Workspaces',
    photo: 'atrium',
    subtitle: 'A shared center for the working day.',
    area: '1,200 m²',
    year: '2026',
    description:
      'A workplace study organized around daylight and a shared central space. Open circulation makes room for informal conversations, while smaller rooms offer somewhere to concentrate.',
    brief:
      'Make a large workplace feel easy to understand. The proposal brings the shared spaces together around an open atrium, with clear routes to the quieter work areas.',
    detail:
      'A restrained material palette keeps attention on the light. Deep window reveals create shade, and a simple structural rhythm gives each floor a familiar orientation.',
    material: 'Glass, pale stone and dark metal',
  },
  {
    slug: 'terrace-study',
    number: '02',
    title: 'Terrace study',
    category: 'Housing',
    photo: 'terrace',
    subtitle: 'A little more life at the edge.',
    area: '840 m²',
    year: '2026',
    description:
      'A housing concept that treats the balcony as an outdoor room. Repeated terraces create a legible facade and give each home a sheltered connection to the street.',
    brief:
      'Give compact homes a useful outdoor space without losing privacy. The study explores deep balconies, planting and simple screens as an extension of everyday living.',
    detail:
      'Warm mineral colors distinguish the shared exterior from the calmer interiors. The facade is composed from a small number of repeatable details.',
    material: 'Terracotta tones and powder-coated metal',
  },
  {
    slug: 'common-ground',
    number: '03',
    title: 'Common ground',
    category: 'Interiors',
    photo: 'common-room',
    subtitle: 'Somewhere to work, somewhere to pause.',
    area: '180 m²',
    year: '2025',
    description:
      'A shared interior with comfortable places to meet, read and work. Furniture does the organizing, leaving the room open to different uses throughout the day.',
    brief:
      'Create a welcoming common room within an existing footprint. The layout needs to support a conversation, an afternoon of reading and a small group working together.',
    detail:
      'Timber, upholstery and planting soften the room. A mix of seats lets people choose how they use the space, rather than prescribing a single arrangement.',
    material: 'Timber, linen and planted surfaces',
  },
] as const

export type Project = (typeof projects)[number]

export const services = [
  {
    value: 'architecture',
    label: 'Architecture',
    description: 'Early feasibility, concept design and planning proposals for new spaces.',
  },
  {
    value: 'interiors',
    label: 'Interior design',
    description: 'Layouts, materials and considered details for the spaces already around us.',
  },
  {
    value: 'renovation',
    label: 'Renovation',
    description: 'A practical next chapter for existing buildings, with their character intact.',
  },
] as const
