import { useTranslation } from 'react-i18next'
import { Icon } from './Icon'

export function LoadingState() {
  const { t } = useTranslation()
  return <div className="state-card" role="status"><span className="loader"/><p>{t('common.loading')}</p></div>
}

export function ErrorState({ onRetry }) {
  const { t } = useTranslation()
  return <div className="state-card"><Icon name="microphone" size={30}/><h2>{t('errors.genericTitle')}</h2><p>{t('errors.genericText')}</p>{onRetry && <button className="button button-secondary" onClick={onRetry}>{t('common.retry')}</button>}</div>
}

export function EmptyState({ title, text, action }) {
  return <div className="state-card"><Icon name="search" size={30}/><h2>{title}</h2><p>{text}</p>{action}</div>
}
