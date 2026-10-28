import { useTheme } from '@/hooks/useTheme'
import { t } from '@/i18n'
import { MoonIcon, SunIcon } from '@/components/ui/Icons'
import { iconButton } from '@/components/ui/styles'

export function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? t.theme.toLight : t.theme.toDark}
      title={isDark ? t.theme.toLight : t.theme.toDark}
      className={iconButton}
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}
