import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Icon } from '../components/ui/Icon'

export default function NotFoundPage() {
  const { t } = useTranslation()
  return <section className="section"><div className="container state-card not-found"><span>404</span><h1>{t('errors.pageNotFound')}</h1><Link className="button button-primary" to="/">{t('errors.goHome')}<Icon name="arrowRight"/></Link></div></section>
}
