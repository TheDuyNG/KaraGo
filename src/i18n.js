import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import vi from './locales/vi.json'

const savedLanguage = localStorage.getItem('bookingNhanh.language')

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    vi: { translation: vi },
  },
  lng: savedLanguage === 'vi' ? 'vi' : 'en',
  fallbackLng: 'en',
  supportedLngs: ['en', 'vi'],
  interpolation: { escapeValue: false },
})

i18n.on('languageChanged', (language) => {
  document.documentElement.lang = language
})

export default i18n
