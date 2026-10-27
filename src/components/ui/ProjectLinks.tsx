import { Link } from 'react-router'
import type { Project } from '@/data/types'
import { t } from '@/i18n'
import { ExternalLink } from './ExternalLink'
import { textLink } from './styles'

/** Links de um projeto. O nome do projeto vai em texto oculto para leitores de tela. */
export function ProjectLinks({ project, caseStudy = true }: { project: Project; caseStudy?: boolean }) {
  const hidden = <span className="sr-only"> de {project.title}</span>
  return (
    <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
      {caseStudy && project.caseStudy && (
        <li>
          <Link to={`/projetos/${project.slug}`} className={textLink}>
            {t.projects.caseStudyLink}
            {hidden}
          </Link>
        </li>
      )}
      {project.links.code && (
        <li>
          <ExternalLink href={project.links.code} className={textLink}>
            {t.projects.codeLink}
            {hidden}
          </ExternalLink>
        </li>
      )}
      {project.links.demo && (
        <li>
          <ExternalLink href={project.links.demo} className={textLink}>
            {t.projects.demoLink}
            {hidden}
          </ExternalLink>
        </li>
      )}
    </ul>
  )
}
