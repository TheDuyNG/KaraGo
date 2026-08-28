import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Icon } from '../../components/ui/Icon'
import heroImage from '../../assets/images/karaoke-suite.png'

export default function AboutPage() {
  const { t } = useTranslation()
  return <><section className="page-hero about-hero"><img src={heroImage} alt=""/><div className="page-hero-overlay"/><div className="container"><p className="eyebrow light"><span/>{t('about.eyebrow')}</p><h1>{t('about.title')}</h1><p>{t('about.story')}</p></div></section><section className="section"><div className="container values-grid">{[1,2,3].map((value) => <article key={value}><span>0{value}</span><Icon name={value === 1 ? 'sparkle' : value === 2 ? 'shield' : 'clock'} size={28}/><h2>{t(`about.value${value}Title`)}</h2><p>{t(`about.value${value}Text`)}</p></article>)}</div><div className="center-action"><Link className="button button-primary button-large" to="/explore">{t('home.primaryCta')}<Icon name="arrowRight"/></Link></div></section></>
}
