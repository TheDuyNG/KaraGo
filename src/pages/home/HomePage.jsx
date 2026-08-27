import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { galleryImages, rooms, testimonials } from '../../data/catalog'
import RoomCard from '../../components/RoomCard'
import Icon from '../../components/ui/Icon'

export default function HomePage() {
  const { t } = useTranslation()
  return (
    <main>
      <section className="hero-section">
        <div className="hero-image" aria-hidden="true" />
        <div className="hero-overlay" />
        <div className="shell hero-content">
          <div className="hero-copy">
            <span className="eyebrow light"><span /> {t('home.eyebrow')}</span>
            <h1>{t('home.title')} <em>{t('home.titleAccent')}</em></h1>
            <p>{t('home.subtitle')}</p>
            <div className="hero-actions">
              <Link className="button button-primary large" to="/booking">{t('home.primaryCta')} <Icon name="arrow" size={18} /></Link>
              <Link className="button button-ghost large" to="/rooms">{t('home.secondaryCta')}</Link>
            </div>
            <div className="hero-proof">
              <div className="avatar-stack"><span>MA</span><span>DL</span><span>NH</span></div>
              <div><div className="stars">★★★★★</div><small>{t('home.proof')}</small></div>
            </div>
          </div>
          <aside className="availability-card">
            <span className="availability-label"><i /> {t('home.openTonight')}</span>
            <h2>{t('home.planTonight')}</h2>
            <p>{t('home.planDescription')}</p>
            <div className="availability-features">
              <span><Icon name="check" size={16} /> {t('home.instantConfirmation')}</span>
              <span><Icon name="check" size={16} /> {t('home.noBookingFee')}</span>
            </div>
            <Link className="button button-dark full" to="/booking">{t('home.checkAvailability')} <Icon name="calendar" size={17} /></Link>
          </aside>
        </div>
      </section>

      <section className="trust-strip">
        <div className="shell trust-grid">
          <div><strong>4.9<span>/5</span></strong><small>{t('home.averageRating')}</small></div>
          <div><strong>12k<span>+</span></strong><small>{t('home.happyGuests')}</small></div>
          <div><strong>50k<span>+</span></strong><small>{t('home.songsReady')}</small></div>
          <div><strong>4</strong><small>{t('home.signatureRooms')}</small></div>
        </div>
      </section>

      <section className="section shell">
        <div className="section-heading split">
          <div><span className="eyebrow">{t('home.roomsEyebrow')}</span><h2>{t('home.roomsTitle')}</h2></div>
          <div><p>{t('home.roomsIntro')}</p><Link className="inline-link" to="/rooms">{t('home.viewAllRooms')} <Icon name="arrow" size={17} /></Link></div>
        </div>
        <div className="room-grid">{rooms.slice(0, 3).map((room) => <RoomCard room={room} key={room.id} />)}</div>
      </section>

      <section className="experience-section">
        <div className="shell experience-grid">
          <div className="experience-image"><img src={galleryImages[0]} alt="Live music experience" loading="lazy" /><div className="image-note"><Icon name="music" size={22} /><span><strong>50,000+</strong>{t('home.songsForEveryMood')}</span></div></div>
          <div className="experience-copy"><span className="eyebrow">{t('home.experienceEyebrow')}</span><h2>{t('home.experienceTitle')}</h2><p>{t('home.experienceText')}</p>
            <div className="feature-list">
              <div><span><Icon name="music" /></span><div><h3>{t('home.featureSoundTitle')}</h3><p>{t('home.featureSoundText')}</p></div></div>
              <div><span><Icon name="shield" /></span><div><h3>{t('home.featurePrivacyTitle')}</h3><p>{t('home.featurePrivacyText')}</p></div></div>
              <div><span><Icon name="wallet" /></span><div><h3>{t('home.featurePriceTitle')}</h3><p>{t('home.featurePriceText')}</p></div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section shell">
        <div className="section-heading centered"><span className="eyebrow">{t('home.reviewsEyebrow')}</span><h2>{t('home.reviewsTitle')}</h2><p>{t('home.reviewsIntro')}</p></div>
        <div className="testimonial-grid">{testimonials.map((item) => <article className="testimonial-card" key={item.name}><div className="stars">★★★★★</div><blockquote>“{t(item.quoteKey)}”</blockquote><div className="reviewer"><span>{item.initials}</span><div><strong>{item.name}</strong><small>{t(item.roleKey)}</small></div></div></article>)}</div>
      </section>

      <section className="cta-section"><div className="cta-image" /><div className="cta-overlay" /><div className="shell cta-content"><span className="eyebrow light">{t('home.ctaEyebrow')}</span><h2>{t('home.ctaTitle')}</h2><p>{t('home.ctaText')}</p><Link className="button button-primary large" to="/booking">{t('home.primaryCta')} <Icon name="arrow" size={18} /></Link></div></section>
    </main>
  )
}
