import type { IncomingMessage, ServerResponse } from 'node:http'
export function compressAssets(directory: string): { before: number; after: number }
export function staticFiles(
  directory: string,
): (req: IncomingMessage, res: ServerResponse, next: () => void) => void
