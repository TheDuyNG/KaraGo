import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import vi from './locales/vi.json'
import { appConfig, storageKeys } from './config/appConfig'

const savedLanguage = localStorage.getItem(storageKeys.language) ?? localStorage.getItem('language')
const initialLanguage = appConfig.supportedLanguages.includes(savedLanguage)
  ? savedLanguage
  : appConfig.defaultLanguage

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    vi: { translation: vi },
  },
  lng: initialLanguage,
  fallbackLng: 'vi',
  supportedLngs: appConfig.supportedLanguages,
  interpolation: { escapeValue: false },
})

document.documentElement.lang = initialLanguage
i18n.on('languageChanged', (language) => {
  document.documentElement.lang = language
})

export default i18n
