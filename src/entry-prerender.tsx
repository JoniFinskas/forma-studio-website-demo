import { renderToReadableStream } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { App } from './App'
import { pageMeta, routes } from './lib/routes'

export { routes }

export async function render(route: string) {
  let renderError: unknown
  const stream = await renderToReadableStream(
    <StaticRouter location={route}>
      <App />
    </StaticRouter>,
    {
      signal: AbortSignal.timeout(15000),
      onError(error) {
        renderError = error
      },
    },
  )
  // Finish deferred route content before writing the static page.
  await stream.allReady
  if (renderError !== undefined) throw renderError
  return { html: await new Response(stream).text(), ...pageMeta(route) }
}
