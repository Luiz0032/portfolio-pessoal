import { ProjectLinks } from '@/components/ui/ProjectLinks'
import { Section } from '@/components/ui/Section'
import { Todo } from '@/components/ui/Todo'
import { projectsByTier } from '@/data/projects'
import { t } from '@/i18n'

export function OtherProjects() {
  const projects = projectsByTier('other')

  return (
    <Section id="outros-projetos" title={t.projects.otherTitle}>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <li key={project.slug} className="flex flex-col gap-2 rounded-card border border-line bg-surface p-5">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="font-bold">{project.title}</h3>
              {project.year && <span className="text-xs text-muted tabular-nums">{project.year}</span>}
            </div>
            <p className="text-sm text-muted">{project.summary}</p>
            <p className="text-xs text-muted">{project.stack.join(', ')}</p>
            {project.todo && <Todo>{project.todo}</Todo>}
            <div className="mt-auto pt-2">
              <ProjectLinks project={project} />
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}
