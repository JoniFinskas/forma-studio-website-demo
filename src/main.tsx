import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { App } from './App'
import './fonts.css'
import './styles.css'

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// Built pages contain the same route tree that the browser hydrates.
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
