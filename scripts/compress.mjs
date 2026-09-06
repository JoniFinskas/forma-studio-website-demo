import { fileURLToPath } from 'node:url'
import { compressAssets } from './static-assets.mjs'

const { before, after } = compressAssets(fileURLToPath(new URL('../dist', import.meta.url)))
console.log(
  `Text assets: ${before} bytes before compression, ${after} bytes with Brotli. Gzip alternatives included.`,
)
