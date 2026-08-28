const localeMap = { vi: 'vi-VN', en: 'en-US' }

export const getIntlLocale = (language) => localeMap[language] ?? localeMap.vi

export const formatCurrency = (value, language = 'vi') =>
  new Intl.NumberFormat(getIntlLocale(language), {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(value)

export const formatDate = (value, language = 'vi', options = {}) =>
  new Intl.DateTimeFormat(getIntlLocale(language), {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    ...options,
  }).format(typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) ? new Date(`${value}T00:00:00`) : new Date(value))

export const formatTime = (value, language = 'vi') => {
  const date = value instanceof Date ? value : new Date(`2000-01-01T${value}`)
  return new Intl.DateTimeFormat(getIntlLocale(language), {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date)
}

export const formatNumber = (value, language = 'vi') =>
  new Intl.NumberFormat(getIntlLocale(language)).format(value)

export const toLocalDateInputValue = (date = new Date()) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}
