import { Section } from '@/components/ui/Section'
import { profile } from '@/data/profile'
import { t } from '@/i18n'

export function About() {
  const facts = [
    { label: t.about.facts.location, value: profile.location },
    { label: t.about.facts.education, value: t.about.facts.educationValue },
    { label: t.about.facts.company, value: t.about.facts.companyValue },
  ]

  return (
    <Section id="sobre" title={t.about.title}>
      <div className="grid gap-10 lg:grid-cols-[3fr_2fr] lg:gap-16">
        <div className="max-w-prose space-y-4">
          {t.about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <dl className="self-start text-sm">
          {facts.map((fact) => (
            <div key={fact.label} className="grid grid-cols-[6rem_1fr] gap-4 border-t border-line py-3 last:border-b">
              <dt className="text-muted">{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  )
}
