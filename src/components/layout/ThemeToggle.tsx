import { useTheme } from '@/hooks/useTheme'
import { t } from '@/i18n'
import { MoonIcon, SunIcon } from '@/components/ui/Icons'

export function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? t.theme.toLight : t.theme.toDark}
      title={isDark ? t.theme.toLight : t.theme.toDark}
      className="inline-flex size-10 items-center justify-center rounded-full border border-line-strong bg-surface text-ink transition-colors hover:border-accent hover:text-accent"
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  )
}
