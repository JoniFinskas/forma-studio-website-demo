import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { App } from './App'
import { pageMeta, routes } from './lib/routes'

export { routes }

export function render(route: string) {
  return {
    html: renderToString(
      <StaticRouter location={route}>
        <App />
      </StaticRouter>,
    ),
    ...pageMeta(route),
  }
}
