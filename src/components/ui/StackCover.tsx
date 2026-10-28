import {
  siAlpinedotjs,
  siElectron,
  siJavascript,
  siLaravel,
  siNodedotjs,
  siPhp,
  siReact,
  siTailwindcss,
  siTypescript,
  siVite,
  siVuedotjs,
  type SimpleIcon,
} from 'simple-icons'

// Só frameworks e linguagens principais; bibliotecas de apoio (Pinia, Prisma...) ficam de fora da capa.
const stackIcons: Record<string, SimpleIcon> = {
  'Vue 3': siVuedotjs,
  React: siReact,
  Electron: siElectron,
  Laravel: siLaravel,
  TypeScript: siTypescript,
  JavaScript: siJavascript,
  PHP: siPhp,
  'Node.js': siNodedotjs,
  'Tailwind CSS': siTailwindcss,
  'Tailwind CSS v4': siTailwindcss,
  'Alpine.js': siAlpinedotjs,
  Vite: siVite,
}

const MAX_ICONS = 3

function BrandIcon({ icon, className }: { icon: SimpleIcon; className: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className={`fill-current ${className}`}>
      <path d={icon.path} />
    </svg>
  )
}

/**
 * Capa gerada para projeto sem print: nome e ícones da stack sobre as cores do site, em 16:10.
 * Decorativa (aria-hidden): o título e a stack já aparecem em texto ao lado.
 */
export function StackCover({ title, stack, frame, className = '' }: { title: string; stack: string[]; frame: string; className?: string }) {
  const icons = stack.flatMap((item) => (stackIcons[item] ? [stackIcons[item]] : [])).slice(0, MAX_ICONS)

  return (
    <div
      aria-hidden="true"
      className={`${frame} @container relative bg-surface bg-[radial-gradient(circle_at_85%_10%,var(--accent-soft),transparent_60%),radial-gradient(var(--line)_1px,transparent_1px)] [background-size:auto,18px_18px] ${className}`}
    >
      {/* Medidas em cqi (largura da capa) ficam nos filhos: no próprio container elas usariam a tela. */}
      {icons[0] && <BrandIcon icon={icons[0]} className="absolute -right-[6cqi] -bottom-[10cqi] size-[48cqi] text-accent opacity-[0.07]" />}
      <div className="relative flex h-full flex-col justify-between p-[6cqi]">
        <ul className="flex flex-wrap gap-2">
          {icons.map((icon) => (
            <li key={icon.slug} className="flex items-center gap-2 rounded-control border border-line bg-bg/80 px-2.5 py-1.5 text-xs font-medium text-muted">
              <BrandIcon icon={icon} className="size-4 text-accent" />
              {icon.title}
            </li>
          ))}
        </ul>
        <p className="max-w-[80%] text-[clamp(1.25rem,8cqi,3rem)] leading-[1.05] font-bold tracking-tight text-ink">{title}</p>
      </div>
    </div>
  )
}
