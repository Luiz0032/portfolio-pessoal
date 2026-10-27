import { useParams } from 'react-router'
import { NotFoundView } from '@/components/NotFoundView'
import { Todo } from '@/components/ui/Todo'
import { findCaseStudy } from '@/data/projects'
import { t } from '@/i18n'
import { pageMeta } from '@/seo/meta'
import type { Route } from './+types/CaseStudy'

export const meta = ({ params }: Route.MetaArgs) => {
  const project = findCaseStudy(params.slug)
  if (!project) {
    return pageMeta({
      title: `${t.notFound.title} · ${t.meta.titleSuffix}`,
      description: t.notFound.body,
      path: `/projetos/${params.slug}`,
      noindex: true,
    })
  }
  return pageMeta({
    title: `${project.title}, ${t.meta.caseStudySuffix} · ${t.meta.titleSuffix}`,
    description: project.summary,
    path: `/projetos/${project.slug}`,
    type: 'article',
  })
}

export default function CaseStudy() {
  const { slug } = useParams()
  const project = findCaseStudy(slug)
  if (!project) return <NotFoundView />

  return (
    <article className="container-page py-section" aria-labelledby="case-title">
      <h1 id="case-title" className="text-3xl font-bold md:text-4xl">
        {project.title}
      </h1>
      <p className="mt-4 max-w-prose text-lg text-muted">{project.summary}</p>
      <div className="mt-10">
        <Todo>estudo de caso completo (problema, antes/depois, arquitetura, destaques e prints) entra na Fase 4.</Todo>
      </div>
    </article>
  )
}
