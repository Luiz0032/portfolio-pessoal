import { useEffect, useRef, useState } from 'react'
import { fallbackSrc, getImage, getVideo, srcSet, type ImageEntry, type VideoEntry } from '@/data/media'
import type { Shot as ShotData } from '@/data/types'
import { useReducedMotion } from '@/hooks/useReducedMotion'

type Props = {
  shot: ShotData
  /** Largura ocupada na tela, para o navegador escolher o arquivo certo do srcset. */
  sizes?: string
  className?: string
  /** Acima da dobra: carrega já, com prioridade alta. */
  priority?: boolean
}

// Todos os quadros usam 16:10; o placeholder ocupa o mesmo espaço que a imagem final.
const frame = 'aspect-[16/10] w-full max-w-full overflow-hidden rounded-card border border-line'

function Picture({ name, entry, alt, sizes, priority }: { name: string; entry: ImageEntry; alt: string; sizes: string; priority?: boolean }) {
  return (
    <picture>
      <source type="image/avif" srcSet={srcSet(name, entry, 'avif')} sizes={sizes} />
      <source type="image/webp" srcSet={srcSet(name, entry, 'webp')} sizes={sizes} />
      <img
        src={fallbackSrc(name, entry)}
        alt={alt}
        width={entry.width}
        height={entry.height}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding="async"
        className="size-full object-cover object-top"
      />
    </picture>
  )
}

/** Vídeo curto em loop. Mostra o pôster até chegar perto da tela; com movimento reduzido, fica só no pôster. */
function LoopVideo({ video, alt, sizes, priority }: { video: VideoEntry; alt: string; sizes: string; priority?: boolean }) {
  const poster = getImage(video.poster)!
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const [near, setNear] = useState(false)

  useEffect(() => {
    if (reduced || near || !ref.current) return
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting && setNear(true), { rootMargin: '200px' })
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [reduced, near])

  return (
    <div ref={ref} className="size-full">
      {near && !reduced ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          aria-label={alt}
          width={video.width}
          height={video.height}
          poster={fallbackSrc(video.poster, poster)}
          className="size-full object-cover object-top"
        >
          <source src={video.webm} type="video/webm" />
          <source src={video.mp4} type="video/mp4" />
        </video>
      ) : (
        <Picture name={video.poster} entry={poster} alt={alt} sizes={sizes} priority={priority} />
      )}
    </div>
  )
}

/** Print ou vídeo de projeto. Sem arquivo gerado, mostra um placeholder com TODO no tamanho final. */
export function Shot({ shot, sizes = '100vw', className = '', priority }: Props) {
  const video = getVideo(shot.video)
  const image = getImage(shot.image)
  const media = { alt: shot.alt, sizes, priority }

  if (video || (image && shot.image)) {
    return (
      <div className={`${frame} bg-surface ${className}`}>
        {video ? <LoopVideo video={video} {...media} /> : <Picture name={shot.image!} entry={image!} {...media} />}
      </div>
    )
  }

  return (
    <div
      role="img"
      aria-label={`Print ainda não disponível: ${shot.alt}`}
      className={`${frame} relative grid place-items-center border-dashed bg-[repeating-linear-gradient(135deg,var(--surface)_0_14px,var(--bg)_14px_28px)] p-6 ${className}`}
    >
      <div className="max-w-xs rounded-control bg-surface/95 px-4 py-3 text-center text-xs text-muted shadow-sm">
        <span className="font-semibold text-ink">TODO: print</span>
        <span className="mt-1 block">{shot.alt}</span>
        {shot.image && <code className="mt-2 block text-[11px]">media/shots/{shot.image}.png</code>}
      </div>
    </div>
  )
}
