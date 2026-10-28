import type { ReactNode } from 'react'
import { Link, useParams } from 'react-router'
import { BeforeAfter } from '@/components/case/BeforeAfter'
import { StatusFlow } from '@/components/case/StatusFlow'
import { architectureDiagrams } from '@/components/case/diagrams'
import { NotFoundView } from '@/components/NotFoundView'
import { Facts } from '@/components/ui/Facts'
import { ProjectLinks } from '@/components/ui/ProjectLinks'
import { ScrollRegion } from '@/components/ui/ScrollRegion'
import { Shot } from '@/components/ui/Shot'
import { TagList } from '@/components/ui/TagList'
import { showTodos } from '@/components/ui/showTodos'
import { Todo } from '@/components/ui/Todo'
import { textLink } from '@/components/ui/styles'
import { hasMedia } from '@/data/media'
import { caseStudyPath, findCaseStudy, nextCaseStudy } from '@/data/projects'
import { ogImageKey } from '@/data/site'
import { t } from '@/i18n'
import { notFoundMeta, pageMeta } from '@/seo/meta'
import { caseStudySchema } from '@/seo/schema'
import type { Route } from './+types/CaseStudy'

export const meta = ({ params }: Route.MetaArgs) => {
  const project = findCaseStudy(params.slug)
  if (!project) return notFoundMeta()
  return pageMeta({
    title: `${project.title}, ${t.meta.caseStudySuffix} · ${t.meta.titleSuffix}`,
    description: project.metaDescription ?? project.summary,
    path: caseStudyPath(project.slug),
    type: 'article',
    ogImage: ogImageKey.caseStudy(project.slug),
    jsonLd: [caseStudySchema(project)],
  })
}

/** Bloco do estudo de caso: título na coluna da esquerda em telas largas. */
function Block({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="grid gap-6 border-t border-line py-12 lg:grid-cols-[13rem_1fr] lg:gap-12">
      <h2 id={id} className="text-xl font-bold">
        {title}
      </h2>
      <div className="min-w-0">{children}</div>
    </section>
  )
}

export default function CaseStudy() {
  const { slug } = useParams()
  const project = findCaseStudy(slug)
  if (!project?.caseStudy) return <NotFoundView />

  const study = project.caseStudy
  const [cover, ...allScreens] = study.gallery
  // Na galeria de produção entram só os prints reais; os que faltam aparecem como TODO em desenvolvimento.
  const screens = showTodos ? allScreens : allScreens.filter(hasMedia)
  const architecture = architectureDiagrams[project.slug]
  const next = nextCaseStudy(project)

  return (
    <article aria-labelledby="case-title" className="container-page pb-8">
      <header className="pt-10 pb-12 md:pt-14">
        <Link to={{ pathname: '/', hash: '#projetos' }} className="text-sm text-muted underline-offset-4 hover:text-accent hover:underline">
          {t.caseStudy.back}
        </Link>
        <h1 id="case-title" className="mt-6 text-3xl font-bold md:text-4xl">
          {project.title}
        </h1>
        {project.context && <p className="mt-2 text-muted">{project.context}</p>}
        <p className="mt-6 max-w-prose text-lg">{project.summary}</p>
        <div className="mt-6">
          <ProjectLinks project={project} caseStudy={false} />
        </div>
        <div className="mt-10 grid gap-8 lg:grid-cols-[2fr_3fr] lg:items-start">
          <div className="space-y-6">
            {project.facts && <Facts facts={project.facts} />}
            <TagList items={project.stack} />
          </div>
          {cover && <Shot shot={cover} cover={project} priority sizes="(min-width: 1024px) 40rem, 92vw" />}
        </div>
      </header>

      {/* Sem conteúdo, a seção inteira só aparece em desenvolvimento (com o TODO). */}
      {(study.problem || showTodos) && (
        <Block id="problema" title={t.caseStudy.problem}>
          {study.problem ? <p className="max-w-prose">{study.problem}</p> : <Todo>{t.caseStudy.problemTodo}</Todo>}
        </Block>
      )}

      {(study.beforeAfter.length > 0 || showTodos) && (
        <Block id="antes-depois" title={t.caseStudy.beforeAfter}>
          {study.beforeAfter.length > 0 ? <BeforeAfter rows={study.beforeAfter} /> : <Todo>{t.caseStudy.beforeAfterTodo}</Todo>}
        </Block>
      )}

      <Block id="quem-usa" title={t.caseStudy.roles}>
        <dl className="grid gap-6 sm:grid-cols-2">
          {study.roles.map((role) => (
            <div key={role.role}>
              <dt className="font-semibold">{role.role}</dt>
              <dd className="mt-1 text-sm text-muted">{role.does}</dd>
            </div>
          ))}
        </dl>
      </Block>

      <Block id="fluxo" title={t.caseStudy.flow}>
        <StatusFlow steps={study.statusFlow} branch={study.statusBranch} />
      </Block>

      {architecture && (
        <Block id="arquitetura" title={t.caseStudy.architecture}>
          <figure className="m-0">
            <ScrollRegion label={t.caseStudy.diagramRegion} className="rounded-card border border-line bg-bg p-4">
              <architecture.Diagram />
            </ScrollRegion>
            <figcaption className="mt-4 max-w-prose text-sm text-muted">
              {architecture.caption} <span className="lg:hidden">{t.caseStudy.diagramHint}</span>
            </figcaption>
          </figure>
        </Block>
      )}

      <Block id="destaques" title={t.caseStudy.highlights}>
        <ul className="grid gap-x-10 gap-y-8 md:grid-cols-2">
          {study.highlights.map((item) => (
            <li key={item.title}>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="mt-1 text-sm text-muted">{item.body}</p>
            </li>
          ))}
        </ul>
      </Block>

      {screens.length > 0 && (
        <Block id="telas" title={t.caseStudy.gallery}>
          <p className="mb-6 text-sm text-muted">{t.caseStudy.galleryNote}</p>
          <ul className="grid gap-6 md:grid-cols-2">
            {screens.map((shot) => (
              <li key={shot.alt}>
                <Shot shot={shot} sizes="(min-width: 1024px) 28rem, (min-width: 768px) 46vw, 92vw" />
              </li>
            ))}
          </ul>
        </Block>
      )}

      {next && next !== project && (
        <nav aria-label={t.caseStudy.next} className="border-t border-line pt-10">
          <p className="text-sm text-muted">{t.caseStudy.next}</p>
          <Link to={caseStudyPath(next.slug)} className={`${textLink} mt-1 inline-block text-xl`}>
            {next.title}
          </Link>
        </nav>
      )}
    </article>
  )
}
