import { Link } from 'react-router'
import { t } from '@/i18n'

/** Erro inesperado ao carregar uma rota (ex.: falha ao baixar o chunk de uma página lazy). */
export function RouteError() {
  return (
    <main className="container-page py-section">
      <title>{`${t.error.title} · ${t.meta.titleSuffix}`}</title>
      <h1 className="text-2xl font-bold">{t.error.title}</h1>
      <p className="mt-4 text-muted">{t.error.body}</p>
      <Link to="/" className="mt-6 inline-block font-semibold text-accent underline underline-offset-4">
        {t.notFound.back}
      </Link>
    </main>
  )
}
