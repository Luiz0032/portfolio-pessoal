import type { Shot as ShotData } from '@/data/types'

type Props = {
  shot: ShotData
  /** Proporção do quadro. O placeholder ocupa o mesmo espaço que a imagem final. */
  ratio?: '16/10' | '4/3'
  className?: string
  priority?: boolean
}

const ratios = { '16/10': 'aspect-[16/10]', '4/3': 'aspect-[4/3]' }

/** Print de projeto. Sem `src`, mostra um placeholder com TODO no tamanho final. */
export function Shot({ shot, ratio = '16/10', className = '', priority }: Props) {
  const frame = `${ratios[ratio]} w-full max-w-full overflow-hidden rounded-card border border-line ${className}`

  if (shot.src) {
    return (
      <div className={`${frame} bg-surface`}>
        <img
          src={shot.src}
          alt={shot.alt}
          width={shot.width}
          height={shot.height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className="size-full object-cover object-top"
        />
      </div>
    )
  }

  return (
    <div
      role="img"
      aria-label={`Print ainda não disponível: ${shot.alt}`}
      className={`${frame} relative grid place-items-center border-dashed bg-[repeating-linear-gradient(135deg,var(--surface)_0_14px,var(--bg)_14px_28px)] p-6`}
    >
      <div className="max-w-xs rounded-control bg-surface/95 px-4 py-3 text-center text-xs text-muted shadow-sm">
        <span className="font-semibold text-ink">TODO: print</span>
        <span className="mt-1 block">{shot.alt}</span>
      </div>
    </div>
  )
}
