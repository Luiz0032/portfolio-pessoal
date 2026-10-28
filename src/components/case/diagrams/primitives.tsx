// Primitivas dos diagramas de arquitetura. Cores vêm dos tokens, então funcionam nos dois temas.

type BoxProps = {
  x: number
  y: number
  w: number
  h: number
  title: string
  lines?: string[]
  /** Destaca o elemento central do mecanismo. */
  accent?: boolean
  /** Armazenamento (lista, tabela, biblioteca): borda dupla no topo. */
  store?: boolean
}

export function Box({ x, y, w, h, title, lines = [], accent, store }: BoxProps) {
  const top = y + h / 2 - ((lines.length + 1) * 17) / 2 + 13
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={8}
        className={accent ? 'fill-accent-soft stroke-accent' : 'fill-surface stroke-line-strong'}
        strokeWidth={accent ? 1.5 : 1}
      />
      {store && <line x1={x + 8} x2={x + w - 8} y1={y + 6} y2={y + 6} className="stroke-line-strong" />}
      <text x={x + w / 2} y={top} textAnchor="middle" className="fill-ink text-[13px] font-semibold">
        {title}
      </text>
      {lines.map((line, i) => (
        <text key={line} x={x + w / 2} y={top + 17 * (i + 1)} textAnchor="middle" className="fill-muted text-[11.5px]">
          {line}
        </text>
      ))}
    </g>
  )
}

export function Arrow({ d, id, both, dashed }: { d: string; id: string; both?: boolean; dashed?: boolean }) {
  return (
    <path
      d={d}
      className="fill-none stroke-muted"
      strokeWidth={1.25}
      strokeDasharray={dashed ? '4 4' : undefined}
      markerEnd={`url(#${id})`}
      markerStart={both ? `url(#${id})` : undefined}
    />
  )
}

export function ArrowMarker({ id, accent }: { id: string; accent?: boolean }) {
  return (
    <marker id={id} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
      <path d="M0 0 L10 5 L0 10 z" className={accent ? 'fill-accent' : 'fill-muted'} />
    </marker>
  )
}

export function Label({ x, y, children, anchor = 'middle', rotate }: { x: number; y: number; children: string; anchor?: 'start' | 'middle' | 'end'; rotate?: number }) {
  return (
    <text
      x={rotate ? 0 : x}
      y={rotate ? 0 : y}
      transform={rotate ? `translate(${x} ${y}) rotate(${rotate})` : undefined}
      textAnchor={anchor}
      className="fill-muted text-[11px] italic"
    >
      {children}
    </text>
  )
}
