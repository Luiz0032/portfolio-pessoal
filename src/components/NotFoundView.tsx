import { Link } from 'react-router'
import { t } from '@/i18n'

export function NotFoundView() {
  return (
    <section className="container-page py-section" aria-labelledby="nf-title">
      <p className="text-sm font-semibold text-accent">404</p>
      <h1 id="nf-title" className="mt-2 text-3xl font-bold">
        {t.notFound.title}
      </h1>
      <p className="mt-4 max-w-prose text-muted">{t.notFound.body}</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link to="/" className="inline-flex rounded-control bg-accent px-5 py-3 text-sm font-semibold text-accent-ink">
          {t.notFound.back}
        </Link>
        <Link
          to={{ pathname: '/', hash: '#projetos' }}
          className="inline-flex rounded-control border border-line-strong bg-surface px-5 py-3 text-sm font-semibold"
        >
          {t.notFound.projects}
        </Link>
      </div>
    </section>
  )
}
