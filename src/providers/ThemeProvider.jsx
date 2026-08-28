import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { appConfig, storageKeys } from '../config/appConfig'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    const savedTheme = localStorage.getItem(storageKeys.theme)
    return appConfig.supportedThemes.includes(savedTheme) ? savedTheme : appConfig.defaultTheme
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
    localStorage.setItem(storageKeys.theme, theme)
  }, [theme])

  const value = useMemo(() => ({
    theme,
    setTheme: (nextTheme) => {
      if (appConfig.supportedThemes.includes(nextTheme)) setThemeState(nextTheme)
    },
    toggleTheme: () => setThemeState((current) => (current === 'dark' ? 'light' : 'dark')),
  }), [theme])

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used inside ThemeProvider')
  return context
}
