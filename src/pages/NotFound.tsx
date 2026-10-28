import { NotFoundView } from '@/components/NotFoundView'
import { notFoundMeta } from '@/seo/meta'

export const meta = notFoundMeta

export default function NotFound() {
  return <NotFoundView />
}
