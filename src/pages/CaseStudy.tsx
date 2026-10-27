import { useParams } from 'react-router'
import { findCaseStudy } from '@/data/projects'
import { t } from '@/i18n'
import { Todo } from '@/components/ui/Todo'
import { NotFound } from './NotFound'

export default function CaseStudy() {
  const { slug } = useParams()
  const project = findCaseStudy(slug)
  if (!project) return <NotFound />

  return (
    <article className="container-page py-section" aria-labelledby="case-title">
      <title>{`${project.title} · ${t.meta.titleSuffix}`}</title>
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
