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
  const shell = (await fs.readFile(path.join(dist, 'index.html'), 'utf8')).replace(
    '</head>',
    `${fontHints}</head>`,
  )
  for (const route of routes) {
    const { html, title, description } = render(route)
    const page = shell
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
