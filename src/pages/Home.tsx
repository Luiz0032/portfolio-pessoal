import { Link } from 'react-router'
import { ExternalLink } from '@/components/ui/ExternalLink'
import { Todo } from '@/components/ui/Todo'
import { profile } from '@/data/profile'
import { skills } from '@/data/skills'
import { t } from '@/i18n'
import { pageMeta } from '@/seo/meta'

export const meta = () =>
  pageMeta({ title: t.meta.homeTitle, description: t.meta.homeDescription, path: '/', type: 'profile' })

// Textos da Fase 3 com marcação simples. O layout final das seções entra na Fase 4.
export default function Home() {
  return (
    <>
      <section className="container-page py-section" aria-labelledby="hero-title">
        <h1 id="hero-title" className="text-3xl font-bold md:text-4xl">
          {profile.name}
        </h1>
        <p className="mt-4 text-lg font-medium text-accent">{profile.role}</p>
        <p className="mt-4 max-w-prose text-muted">{t.hero.lede}</p>
      </section>

      <Section id="sobre" title={t.about.title}>
        <div className="max-w-prose space-y-4">
          {t.about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <dl className="mt-8 grid gap-4 text-sm sm:grid-cols-3">
          <div>
            <dt className="text-muted">{t.about.facts.location}</dt>
            <dd>{profile.location}</dd>
          </div>
          <div>
            <dt className="text-muted">{t.about.facts.education}</dt>
            <dd>{t.about.facts.educationValue}</dd>
          </div>
          <div>
            <dt className="text-muted">{t.about.facts.company}</dt>
            <dd>{t.about.facts.companyValue}</dd>
          </div>
        </dl>
      </Section>

      <Section id="projetos" title={t.projects.title}>
        <Todo>cards de projetos, seção Power Platform e outros projetos entram na Fase 4.</Todo>
      </Section>

      <Section id="habilidades" title={t.skills.title}>
        <p className="mb-6 text-muted">{t.skills.intro}</p>
        <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group) => (
            <div key={group.area}>
              <dt className="font-semibold">{group.area}</dt>
              <dd className="mt-1 text-muted">{group.items.join(', ')}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section id="contato" title={t.contact.title}>
        <p className="max-w-prose">{t.contact.body}</p>
        <ul className="mt-6 flex flex-col gap-2 sm:flex-row sm:gap-6">
          <li>
            <a className="font-semibold text-accent underline underline-offset-4" href={`mailto:${profile.contacts.email}`}>
              {profile.contacts.email}
            </a>
          </li>
          <li>
            <ExternalLink className="font-semibold text-accent underline underline-offset-4" href={profile.contacts.linkedin}>
              LinkedIn
            </ExternalLink>
          </li>
          <li>
            <Link className="font-semibold text-accent underline underline-offset-4" to="/curriculo">
              {t.contact.resume}
            </Link>
          </li>
        </ul>
      </Section>
    </>
  )
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="container-page">
      <div className="border-t border-line py-section">
        <h2 id={`${id}-title`} className="mb-6 text-2xl font-bold">
          {title}
        </h2>
        {children}
      </div>
    </section>
  )
}
