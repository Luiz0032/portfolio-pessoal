import type { CaseStudy } from '@/data/types'

export function BeforeAfter({ rows }: { rows: CaseStudy['beforeAfter'] }) {
  return (
    <div className="overflow-x-auto rounded-card border border-line">
      <table className="w-full min-w-[34rem] border-collapse text-left text-sm">
        <caption className="sr-only">Como o processo era antes do app e como ficou depois</caption>
        <thead className="bg-bg">
          <tr>
            <th scope="col" className="w-1/2 px-4 py-3 font-semibold text-muted">
              Antes
            </th>
            <th scope="col" className="w-1/2 px-4 py-3 font-semibold text-accent">
              Depois
            </th>
          </tr>
        </thead>
        <tbody className="bg-surface">
          {rows.map((row) => (
            <tr key={row.before} className="border-t border-line align-top">
              <td className="px-4 py-3 text-muted">{row.before}</td>
              <td className="px-4 py-3">{row.after}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
