import { useTranslation } from 'react-i18next'
import Icon from './Icon'

export default function LanguageToggle({ showLabel = false, className = '' }) {
  const { t, i18n } = useTranslation()
  const isVietnamese = i18n.resolvedLanguage === 'vi'
  const changeLanguage = () => {
    const language = isVietnamese ? 'en' : 'vi'
    i18n.changeLanguage(language)
    localStorage.setItem('bookingNhanh.language', language)
  }

  return (
    <button className={`language-button ${className}`} type="button" onClick={changeLanguage} aria-label={t('nav.changeLanguage')} title={t('nav.changeLanguage')}>
      <Icon name="globe" size={17} /> {showLabel ? (isVietnamese ? 'Tiếng Việt' : 'English') : (isVietnamese ? 'VI' : 'EN')}
    </button>
  )
}
