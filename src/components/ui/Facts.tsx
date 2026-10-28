/** Números de um projeto (telas, fluxos, listas...). */
export function Facts({ facts }: { facts: { label: string; value: string }[] }) {
  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
      {facts.map((fact) => (
        <div key={fact.label} className="flex flex-col-reverse">
          <dt className="text-xs text-muted">{fact.label}</dt>
          <dd className="text-2xl font-bold tabular-nums">{fact.value}</dd>
        </div>
      ))}
    </dl>
  )
}
