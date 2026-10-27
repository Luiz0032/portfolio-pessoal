import type { ReactNode } from 'react'
import { PrintButton } from '@/components/PrintButton'
import { Todo } from '@/components/ui/Todo'
import { projects } from '@/data/projects'
import { profile } from '@/data/profile'
import { siteUrl } from '@/data/site'
import { skills } from '@/data/skills'
import { t } from '@/i18n'
import { pageMeta } from '@/seo/meta'

export const meta = () =>
  pageMeta({
    title: `${t.nav.resume} · ${t.meta.titleSuffix}`,
    description: t.meta.resumeDescription,
    path: '/curriculo',
    type: 'profile',
  })

const display = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')

function Part({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="grid gap-3 border-t border-line py-6 break-inside-avoid md:grid-cols-[10rem_1fr] md:gap-8 print:grid-cols-[8rem_1fr] print:py-4">
      <h2 className="text-sm font-bold tracking-tight text-accent">{title}</h2>
      <div className="min-w-0">{children}</div>
    </section>
  )
}

export default function Curriculo() {
  const selected = projects.filter((p) => p.tier === 'powerPlatform' || p.tier === 'featured')
  const contacts = [
    { label: profile.contacts.email, href: `mailto:${profile.contacts.email}` },
    { label: display(profile.contacts.linkedin), href: profile.contacts.linkedin },
    { label: display(profile.contacts.github), href: profile.contacts.github },
    { label: display(siteUrl), href: siteUrl },
  ]

  return (
    <div className="container-page py-10 md:py-14 print:p-0">
      <div className="mb-8 flex flex-wrap items-center gap-4 print:hidden">
        <PrintButton />
        <p className="text-sm text-muted">{t.resume.printHint}</p>
      </div>

      <article aria-labelledby="cv-title" className="mx-auto max-w-[52rem] rounded-card border border-line bg-surface p-6 md:p-10 print:max-w-none print:border-0 print:p-0">
        <header className="pb-6">
          <h1 id="cv-title" className="text-3xl font-bold">
            {profile.name}
          </h1>
          <p className="mt-1 font-medium text-accent">{profile.role}</p>
          <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
            <li>{profile.location}</li>
            {contacts.map((contact) => (
              <li key={contact.href}>
                <a href={contact.href} className="underline-offset-4 hover:text-accent hover:underline">
                  {contact.label}
                </a>
              </li>
            ))}
          </ul>
        </header>

        <Part title={t.resume.summary}>
          <div className="space-y-2 text-sm">
            {t.about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Part>

        <Part title={t.resume.experience}>
          <Todo>{t.resume.experienceTodo}</Todo>
        </Part>

        <Part title={t.resume.projects}>
          <ul className="space-y-4 text-sm">
            {selected.map((project) => (
              <li key={project.slug} className="break-inside-avoid">
                <p className="font-semibold">
                  {project.title}
                  {project.links.code && (
                    <span className="font-normal text-muted"> · {display(project.links.code)}</span>
                  )}
                  {!project.links.code && project.links.demo && (
                    <span className="font-normal text-muted"> · {display(project.links.demo)}</span>
                  )}
                </p>
                <p className="mt-0.5">{project.summary}</p>
                <p className="mt-0.5 text-xs text-muted">{project.stack.join(', ')}</p>
              </li>
            ))}
          </ul>
        </Part>

        <Part title={t.resume.education}>
          <p className="text-sm">
            <span className="font-semibold">{profile.education.course}</span>, {profile.education.school}
            <span className="block text-muted">Conclusão prevista em {profile.education.expectedEnd}</span>
          </p>
        </Part>

        <Part title={t.resume.skills}>
          <dl className="space-y-1.5 text-sm">
            {skills.map((group) => (
              <div key={group.area} className="sm:flex sm:gap-2">
                <dt className="shrink-0 font-semibold">{group.area}:</dt>
                <dd className="text-muted">{group.items.join(', ')}</dd>
              </div>
            ))}
          </dl>
        </Part>
      </article>
    </div>
  )
}
