import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Icon from '../components/ui/Icon'

export default function ContactPage() {
  const { t } = useTranslation()
  const [sent, setSent] = useState(false)
  const submit = (event) => { event.preventDefault(); setSent(true); event.currentTarget.reset() }
  return <main>
    <section className="page-hero compact-hero"><div className="shell"><span className="eyebrow light">{t('contact.eyebrow')}</span><h1>{t('contact.title')}</h1><p>{t('contact.subtitle')}</p></div></section>
    <section className="section shell contact-grid">
      <div className="contact-details"><span className="eyebrow">{t('contact.visitUs')}</span><h2>{t('contact.dropBy')}</h2><p>{t('contact.intro')}</p><div className="contact-cards"><div><Icon name="phone" /><span><small>{t('contact.phone')}</small><a href="tel:+842873073999">+84 28 7307 3999</a></span></div><div><Icon name="clock" /><span><small>{t('contact.hours')}</small><strong>{t('announcement.hours')}</strong></span></div><div><Icon name="music" /><span><small>{t('contact.address')}</small><strong>12 Nguyen Hue, District 1, HCMC</strong></span></div></div></div>
      <form className="contact-form card-panel" onSubmit={submit}><h2>{t('contact.sendMessage')}</h2><div className="form-grid"><label>{t('form.fullName')}<input required name="name" /></label><label>{t('form.email')}<input required type="email" name="email" /></label></div><label>{t('contact.subject')}<input required name="subject" /></label><label>{t('contact.message')}<textarea required rows="5" name="message" /></label>{sent && <div className="success-banner"><Icon name="check" size={18} /> {t('contact.sent')}</div>}<button className="button button-primary" type="submit">{t('contact.send')} <Icon name="arrow" size={17} /></button></form>
    </section>
  </main>
}
