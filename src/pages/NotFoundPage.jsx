import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Icon from '../components/ui/Icon'

export default function NotFoundPage() { const { t } = useTranslation(); return <main className="not-found"><span>404</span><h1>{t('notFound.title')}</h1><p>{t('notFound.text')}</p><Link className="button button-primary" to="/">{t('notFound.back')} <Icon name="arrow" size={17} /></Link></main> }
