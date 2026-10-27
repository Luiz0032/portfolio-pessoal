import { profile } from '@/data/profile'
import { t } from '@/i18n'
import { Todo } from '@/components/ui/Todo'

export default function Curriculo() {
  return (
    <section className="container-page py-section" aria-labelledby="cv-title">
      <title>{`${t.nav.resume} · ${t.meta.titleSuffix}`}</title>
      <h1 id="cv-title" className="text-3xl font-bold">
        {t.nav.resume}
      </h1>
      <p className="mt-4 text-lg text-muted">{profile.name}</p>
      <div className="mt-10">
        <Todo>currículo para impressão, com botão de imprimir e salvar em PDF, entra na Fase 4.</Todo>
      </div>
    </section>
  )
}
