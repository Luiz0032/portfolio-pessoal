import { t } from '@/i18n'

export function SkipLink() {
  return (
    <a
      href="#conteudo"
      className="sr-only print:hidden rounded-control bg-accent px-4 py-2 font-semibold text-accent-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50"
    >
      {t.skipLink}
    </a>
  )
}
