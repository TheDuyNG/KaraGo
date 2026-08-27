import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Icon from '../ui/Icon'

export default function Footer() {
  const { t } = useTranslation()
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <Link className="brand brand-light" to="/">
            <span className="brand-mark"><span /><span /><span /><span /></span>
            <span className="brand-copy"><strong>booking</strong><small>NHANH</small></span>
          </Link>
          <p>{t('footer.description')}</p>
          <div className="footer-socials"><a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">ig</a><a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">f</a><a href="https://tiktok.com" target="_blank" rel="noreferrer" aria-label="TikTok">tk</a></div>
        </div>
        <div>
          <h3>{t('footer.explore')}</h3>
          <Link to="/rooms">{t('nav.rooms')}</Link>
          <Link to="/booking">{t('nav.bookNow')}</Link>
          <Link to="/about">{t('nav.about')}</Link>
        </div>
        <div>
          <h3>{t('footer.support')}</h3>
          <Link to="/contact">{t('nav.contact')}</Link>
          <Link to="/account">{t('nav.myBookings')}</Link>
          <Link to="/contact">{t('footer.policy')}</Link>
        </div>
        <div className="footer-contact">
          <h3>{t('footer.visit')}</h3>
          <p>12 Nguyen Hue, District 1<br />Ho Chi Minh City</p>
          <a href="tel:+842873073999"><Icon name="phone" size={16} /> +84 28 7307 3999</a>
          <span>{t('announcement.hours')}</span>
        </div>
      </div>
      <div className="shell footer-bottom"><span>© 2026 Booking Nhanh.</span><span>{t('footer.madeFor')}</span></div>
    </footer>
  )
}
