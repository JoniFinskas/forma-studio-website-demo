import fs from 'node:fs'
import path from 'node:path'
import { brotliCompressSync, gzipSync, constants } from 'node:zlib'

const textTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.json': 'application/json',
}
const types = {
  ...textTypes,
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon',
}

export function compressAssets(directory) {
  let before = 0
  let after = 0
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name)
    if (entry.isDirectory()) {
      const sizes = compressAssets(file)
      before += sizes.before
      after += sizes.after
    } else if (entry.isFile() && textTypes[path.extname(file)]) {
      const body = fs.readFileSync(file)
      const br = brotliCompressSync(body, { params: { [constants.BROTLI_PARAM_QUALITY]: 11 } })
      const gz = gzipSync(body, { level: 9 })
      if (br.length < body.length) fs.writeFileSync(file + '.br', br)
      if (gz.length < body.length) fs.writeFileSync(file + '.gz', gz)
      before += body.length
      after += Math.min(body.length, br.length)
    }
  }
  return { before, after }
}

export function staticFiles(directory) {
  const root = path.resolve(directory)
  return (req, res, next) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      res.writeHead(405, { Allow: 'GET, HEAD' })
      return res.end()
    }
    let file
    try {
      file = path.resolve(
        root,
        '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname),
      )
    } catch {
      res.writeHead(400)
      return res.end()
    }
    if (file !== root && !file.startsWith(root + path.sep)) {
      res.writeHead(400)
      return res.end()
    }
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html')
    const status = fs.existsSync(file) && fs.statSync(file).isFile() ? 200 : 404
    if (status === 404) file = path.join(root, '404.html')
    if (!fs.existsSync(file)) return next()

    const accepted = new Map(
      String(req.headers['accept-encoding'] ?? '')
        .split(',')
        .map((value) => {
          const [name, ...parameters] = value.trim().split(';')
          const quality = parameters.find((item) => item.trim().startsWith('q='))
          return [name.trim(), quality ? Number(quality.trim().slice(2)) : 1]
        }),
    )
    const variants = [
      ['br', '.br'],
      ['gzip', '.gz'],
    ]
      .map(([name, suffix]) => ({
        name,
        suffix,
        quality: accepted.get(name) ?? accepted.get('*') ?? 0,
      }))
      .filter((item) => item.quality > 0 && fs.existsSync(file + item.suffix))
      .sort((a, b) => b.quality - a.quality)
    const variant = variants[0]
    const body = fs.readFileSync(file + (variant?.suffix ?? ''))
    res.writeHead(status, {
      'Content-Type': types[path.extname(file)] ?? 'application/octet-stream',
      'Content-Length': body.length,
      'Cache-Control': 'no-cache',
      Vary: 'Accept-Encoding',
      'X-Content-Type-Options': 'nosniff',
      ...(variant ? { 'Content-Encoding': variant.name } : {}),
    })
    res.end(req.method === 'HEAD' ? undefined : body)
  }
}
