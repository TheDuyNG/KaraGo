import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Icon from '../../components/ui/Icon'
import { galleryImages } from '../../data/catalog'

export default function AboutPage() {
  const { t } = useTranslation()
  return <main>
    <section className="page-hero"><div className="shell"><span className="eyebrow light">{t('about.eyebrow')}</span><h1>{t('about.title')}</h1><p>{t('about.subtitle')}</p></div></section>
    <section className="section shell story-grid"><div><span className="eyebrow">{t('about.storyEyebrow')}</span><h2>{t('about.storyTitle')}</h2><p>{t('about.storyOne')}</p><p>{t('about.storyTwo')}</p><Link className="button button-dark" to="/booking">{t('nav.bookNow')} <Icon name="arrow" size={17} /></Link></div><div className="story-images"><img src={galleryImages[1]} alt="Private room" /><img src={galleryImages[2]} alt="Live performance" /></div></section>
    <section className="values-section"><div className="shell"><div className="section-heading centered"><span className="eyebrow">{t('about.valuesEyebrow')}</span><h2>{t('about.valuesTitle')}</h2></div><div className="value-grid"><article><span>01</span><h3>{t('about.valueOneTitle')}</h3><p>{t('about.valueOneText')}</p></article><article><span>02</span><h3>{t('about.valueTwoTitle')}</h3><p>{t('about.valueTwoText')}</p></article><article><span>03</span><h3>{t('about.valueThreeTitle')}</h3><p>{t('about.valueThreeText')}</p></article></div></div></section>
  </main>
}
