import photos from '../data/photos.json'

export function PhotoCredits() {
  return (
    <section className="container section credits-page">
      <h1 tabIndex={-1}>Photo credits.</h1>
      <p className="intro-copy">
        These photographs illustrate a fictional concept. The photographers and pictured properties
        are independent of this website.
      </p>
      <div className="credits-list">
        {Object.values(photos).map((photo) => (
          <article key={photo.base}>
            <h2>{photo.title.replace(/\.(jpg|jpeg)$/i, '').replace(/ \(Unsplash.*?\)/, '')}</h2>
            <p>Photograph by {photo.creator}.</p>
            <p>
              <a href={photo.source}>Original photograph</a> ·{' '}
              <a href={photo.licenseUrl}>{photo.license}</a>
            </p>
            <p className="small">{photo.changes}</p>
          </article>
        ))}
      </div>
      <p className="small">
        Font licenses and complete asset records are included with the source code.
      </p>
    </section>
  )
}
