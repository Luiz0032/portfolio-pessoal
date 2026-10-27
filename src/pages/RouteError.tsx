import { Link } from 'react-router'
import { t } from '@/i18n'

/** Erro inesperado ao renderizar uma rota. */
export function RouteError() {
  return (
    <section className="container-page py-section" aria-labelledby="erro-title">
      <title>{`${t.error.title} · ${t.meta.titleSuffix}`}</title>
      <h1 id="erro-title" className="text-2xl font-bold">
        {t.error.title}
      </h1>
      <p className="mt-4 text-muted">{t.error.body}</p>
      <Link to="/" className="mt-6 inline-block font-semibold text-accent underline underline-offset-4">
        {t.notFound.back}
      </Link>
    </section>
  )
}
