const supportedLanguages = ['vi', 'en']
const supportedThemes = ['dark', 'light']

const configuredLanguage = import.meta.env.VITE_DEFAULT_LANGUAGE
const configuredTheme = import.meta.env.VITE_DEFAULT_THEME

export const appConfig = Object.freeze({
  appName: import.meta.env.VITE_APP_NAME ?? 'KaraGo',
  apiBaseUrl: (import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:5000').replace(/\/+$/, ''),
  useMockApi: import.meta.env.VITE_USE_MOCK_API !== 'false',
  defaultLanguage: supportedLanguages.includes(configuredLanguage) ? configuredLanguage : 'vi',
  defaultTheme: supportedThemes.includes(configuredTheme) ? configuredTheme : 'dark',
  supportedLanguages,
  supportedThemes,
})

export const storageKeys = Object.freeze({
  language: 'karago.language',
  theme: 'karago.theme',
  authToken: 'karago.authToken',
  user: 'karago.user',
  bookings: 'karago.mockBookings',
})
