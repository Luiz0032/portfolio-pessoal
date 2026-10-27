import { buttonPrimary } from '@/components/ui/styles'
import { t } from '@/i18n'

export function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()} className={`${buttonPrimary} print:hidden`}>
      {t.resume.print}
    </button>
  )
}
