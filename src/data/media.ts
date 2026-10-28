import manifest from './media-manifest.json'

// Manifesto gerado por `npm run images` (scripts/images.mjs). Não editar à mão.
export type ImageEntry = { kind: 'image'; width: number; height: number; widths: number[] }
export type VideoEntry = { kind: 'video'; width: number; height: number; mp4: string; webm: string; poster: string }

const entries = manifest as Record<string, ImageEntry | VideoEntry>

export function getImage(key: string | undefined): ImageEntry | undefined {
  const entry = key ? entries[key] : undefined
  return entry?.kind === 'image' ? entry : undefined
}

export function getVideo(key: string | undefined): VideoEntry | undefined {
  const entry = key ? entries[key] : undefined
  return entry?.kind === 'video' ? entry : undefined
}

export const srcSet = (key: string, entry: ImageEntry, format: 'avif' | 'webp') =>
  entry.widths.map((w) => `/img/${key}-${w}.${format} ${w}w`).join(', ')

export const fallbackSrc = (key: string, entry: ImageEntry) => `/img/${key}-${entry.widths.at(-1)}.webp`
