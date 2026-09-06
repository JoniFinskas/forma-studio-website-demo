import photos from '../data/photos.json'

type PhotoProps = {
  name: keyof typeof photos
  className?: string
  sizes?: string
  priority?: boolean
}

export function Photo({ name, className = '', sizes = '100vw', priority = false }: PhotoProps) {
  const photo = photos[name]
  return (
    <img
      className={`photo ${className}`}
      src={`/images/${photo.base}-${photo.width}.webp`}
      srcSet={photo.widths
        .map((width) => `/images/${photo.base}-${width}.webp ${width}w`)
        .join(', ')}
      sizes={sizes}
      width={photo.width}
      height={photo.height}
      alt={photo.alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding="async"
    />
  )
}
