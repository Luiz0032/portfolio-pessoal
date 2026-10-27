import { profile } from '@/data/profile'
import { t } from '@/i18n'
import { Todo } from '@/components/ui/Todo'
import { pageMeta } from '@/seo/meta'

// Estrutura da home com as âncoras do menu. Hero e seções ganham conteúdo nas Fases 3 e 4.
const sections = [
  { id: 'sobre', title: t.nav.about },
  { id: 'projetos', title: t.nav.projects },
  { id: 'habilidades', title: t.nav.skills },
  { id: 'contato', title: t.nav.contact },
]

export const meta = () =>
  pageMeta({
    title: `${t.meta.siteTitle} · Desenvolvedor full-stack`,
    description: `Portfólio de ${profile.name}, ${profile.role}, em ${profile.location}.`,
    path: '/',
    type: 'profile',
  })

export default function Home() {
  return (
    <>
      <section className="container-page py-section" aria-labelledby="hero-title">
        <h1 id="hero-title" className="text-3xl font-bold md:text-4xl">
          {profile.name}
        </h1>
        <p className="mt-4 text-lg font-medium text-accent">{profile.role}</p>
      </section>

      {sections.map((section) => (
        <section key={section.id} id={section.id} aria-labelledby={`${section.id}-title`} className="container-page">
          <div className="border-t border-line py-section">
            <h2 id={`${section.id}-title`} className="mb-6 text-2xl font-bold">
              {section.title}
            </h2>
            <Todo>conteúdo desta seção entra nas Fases 3 e 4.</Todo>
          </div>
        </section>
      ))}
    </>
  )
}
