import { NotFoundView } from '@/components/NotFoundView'
import { t } from '@/i18n'
import { pageMeta } from '@/seo/meta'

export const meta = () =>
  pageMeta({
    title: `${t.notFound.title} · ${t.meta.titleSuffix}`,
    description: t.notFound.body,
    path: '/404',
    noindex: true,
  })

export default function NotFound() {
  return <NotFoundView />
}
