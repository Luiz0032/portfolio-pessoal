import { Link } from 'react-router'
import { buttonPrimary, buttonSecondary } from '@/components/ui/styles'
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
        <Link to="/" className={buttonPrimary}>
          {t.notFound.back}
        </Link>
        <Link to={{ pathname: '/', hash: '#projetos' }} className={buttonSecondary}>
          {t.notFound.projects}
        </Link>
      </div>
    </section>
  )
}
