export function getLocalizedText(value, language = 'vi') {
  if (typeof value === 'string') return value
  return value?.[language] ?? value?.vi ?? value?.en ?? ''
}
