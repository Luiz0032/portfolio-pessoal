import { ProjectLinks } from '@/components/ui/ProjectLinks'
import { Section } from '@/components/ui/Section'
import { Shot } from '@/components/ui/Shot'
import { TagList } from '@/components/ui/TagList'
import { projectsByTier } from '@/data/projects'
import { t } from '@/i18n'

export function WebProjects() {
  const projects = projectsByTier('featured')

  return (
    <Section id="projetos-web" title={t.projects.featuredTitle}>
      <ul className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <li key={project.slug}>
            <article aria-labelledby={`web-${project.slug}`} className="flex h-full flex-col gap-5">
              <Shot shot={project.image ?? { alt: `Página principal de ${project.title}` }} />
              <div className="flex flex-1 flex-col gap-3">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 id={`web-${project.slug}`} className="text-lg font-bold">
                    {project.title}
                  </h3>
                  {project.year && <span className="text-xs text-muted tabular-nums">{project.year}</span>}
                </div>
                <p className="text-sm text-muted">{project.summary}</p>
                <TagList items={project.stack} />
                <div className="mt-auto pt-2">
                  <ProjectLinks project={project} />
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </Section>
  )
}
