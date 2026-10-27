import type { CaseStudy } from '@/data/types'

/** Etapas do processo em sequência, com o desvio de volta (quando existe) descrito abaixo. */
export function StatusFlow({ steps, branch }: { steps: string[]; branch?: CaseStudy['statusBranch'] }) {
  return (
    <div>
      <ol className="flex flex-col gap-2 md:flex-row md:flex-wrap md:items-center md:gap-0">
        {steps.map((step, index) => {
          const isBranchPoint = branch && (step === branch.from || step === branch.backTo)
          return (
            <li key={step} className="flex items-center gap-2 md:gap-0">
              <span
                className={`rounded-control border px-3 py-2 text-sm font-medium ${
                  isBranchPoint ? 'border-accent bg-accent-soft' : 'border-line-strong bg-surface'
                }`}
              >
                <span className="mr-2 text-xs text-muted tabular-nums">{index + 1}</span>
                {step}
              </span>
              {index < steps.length - 1 && (
                <span aria-hidden="true" className="hidden px-2 text-muted md:inline">
                  →
                </span>
              )}
            </li>
          )
        })}
      </ol>
      {branch && (
        <p className="mt-4 flex flex-wrap items-center gap-2 text-sm text-muted">
          <span className="rounded-control border border-dashed border-accent px-3 py-1.5 font-medium text-ink">
            {branch.state}
          </span>
          <span>
            Em “{branch.from}”, {branch.label}, e o processo volta para “{branch.backTo}”.
          </span>
        </p>
      )}
    </div>
  )
}
