import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createServer } from 'vite'

const root = fileURLToPath(new URL('..', import.meta.url))
const dist = path.join(root, 'dist')
const escape = (value) =>
  value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('"', '&quot;')
const server = await createServer({
  root,
  server: { middlewareMode: true, hmr: false },
  appType: 'custom',
})

try {
  const { render, routes } = await server.ssrLoadModule('/src/entry-prerender.tsx')
  const assets = await fs.readdir(path.join(dist, 'assets'))
  // Discover hashed fonts at build time so first-screen text need not wait for CSS discovery.
  const fontPrefixes = ['inter-latin-400-normal-']
  const fontHints = fontPrefixes
    .map((prefix) => {
      const file = assets.find((name) => name.startsWith(prefix) && name.endsWith('.woff2'))
      if (!file) throw new Error(`Missing required font: ${prefix}`)
      return `<link rel="preload" href="/assets/${file}" as="font" type="font/woff2" crossorigin>`
    })
    .join('')
  const stylesheets = assets.filter((name) => name.endsWith('.css'))
  if (stylesheets.length !== 1) throw new Error('Expected one shared stylesheet')
  const css = await fs.readFile(path.join(dist, 'assets', stylesheets[0]), 'utf8')
  // The small shared stylesheet fits in the HTML response and avoids a blocking round trip.
  const shell = (await fs.readFile(path.join(dist, 'index.html'), 'utf8'))
    .replace(/<link rel="stylesheet"[^>]*>/, () => `<style>${css}</style>`)
    .replace('</head>', `${fontHints}</head>`)
  for (const route of routes) {
    const { html, title, description } = await render(route)
    const formChunk = assets.find((name) => name.startsWith('Contact-') && name.endsWith('.js'))
    if (!formChunk) throw new Error('Missing deferred form bundle')
    const routeShell =
      route === '/contact'
        ? shell.replace('</head>', `<link rel="modulepreload" href="/assets/${formChunk}"></head>`)
        : shell
    const page = routeShell
      .replace(/<title>.*?<\/title>/, `<title>${escape(title)}</title>`)
      .replace(
        'name="description" content=""',
        `name="description" content="${escape(description)}"`,
      )
      .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
    const file = path.join(
      dist,
      route === '/' ? 'index.html' : route === '/404' ? '404.html' : route.slice(1) + '/index.html',
    )
    await fs.mkdir(path.dirname(file), { recursive: true })
    await fs.writeFile(file, page)
    console.log(`Rendered ${route}`)
  }
} finally {
  await server.close()
}
