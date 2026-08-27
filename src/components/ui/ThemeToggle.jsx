import { useTranslation } from 'react-i18next'
import { useTheme } from '../../context/useTheme'
import Icon from './Icon'

export default function ThemeToggle({ showLabel = false, className = '' }) {
  const { t } = useTranslation()
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      className={`theme-toggle ${className}`}
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? t('nav.useLightMode') : t('nav.useDarkMode')}
      title={isDark ? t('nav.useLightMode') : t('nav.useDarkMode')}
    >
      <Icon name={isDark ? 'sun' : 'moon'} size={17} />
      {showLabel && <span>{isDark ? t('nav.lightMode') : t('nav.darkMode')}</span>}
    </button>
  )
}
