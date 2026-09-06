import path from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { staticFiles } from './scripts/static-assets.mjs'

const root = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'static-preview',
      configurePreviewServer(server) {
        server.middlewares.use(staticFiles(path.join(root, 'dist')))
      },
    },
  ],
  build: { cssCodeSplit: false, sourcemap: false },
  server: { host: '127.0.0.1', strictPort: true },
  preview: { host: '127.0.0.1', strictPort: true },
})
