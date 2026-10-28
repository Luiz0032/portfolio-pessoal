import { Facts } from '@/components/ui/Facts'
import { ProjectLinks } from '@/components/ui/ProjectLinks'
import { Section } from '@/components/ui/Section'
import { Shot } from '@/components/ui/Shot'
import { TagList } from '@/components/ui/TagList'
import { projectsByTier } from '@/data/projects'
import { t } from '@/i18n'

export function PowerPlatform() {
  const projects = projectsByTier('powerPlatform')

  return (
    <Section id="projetos" title={t.projects.powerPlatformTitle} intro={t.projects.powerPlatformIntro}>
      <div className="grid gap-8">
        {projects.map((project, index) => (
          <article
            key={project.slug}
            aria-labelledby={`pp-${project.slug}`}
            className="grid gap-8 rounded-card border border-line bg-surface p-5 md:p-8 lg:grid-cols-2 lg:items-center lg:gap-12"
          >
            <Shot
              shot={project.image ?? { alt: `Tela inicial do app ${project.title}, com dados fictícios` }}
              sizes="(min-width: 1024px) 34rem, 92vw"
              className={index % 2 === 1 ? 'lg:order-2' : ''}
            />
            <div className="min-w-0">
              <h3 id={`pp-${project.slug}`} className="text-xl font-bold md:text-2xl">
                {project.title}
              </h3>
              {project.context && <p className="mt-1 text-sm text-muted">{project.context}</p>}
              <p className="mt-4">{project.summary}</p>
              {project.facts && (
                <div className="mt-6">
                  <Facts facts={project.facts} />
                </div>
              )}
              <div className="mt-6">
                <TagList items={project.stack} />
              </div>
              <div className="mt-6">
                <ProjectLinks project={project} />
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}
