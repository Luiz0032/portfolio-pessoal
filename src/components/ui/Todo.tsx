import type { ReactNode } from 'react'

/** Marcador visível de conteúdo pendente. Some quando o conteúdo real entrar. */
export function Todo({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-control border border-dashed border-line-strong bg-accent-soft px-4 py-3 text-sm text-muted">
      <strong className="font-semibold text-ink">TODO:</strong> {children}
    </p>
  )
}
