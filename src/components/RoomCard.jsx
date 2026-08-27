import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Icon from './ui/Icon'

export default function RoomCard({ room }) {
  const { t, i18n } = useTranslation()
  return (
    <article className="room-card">
      <div className="room-image-wrap">
        <img src={room.image} alt={t(room.nameKey)} loading="lazy" />
        {room.popular && <span className="room-badge">{t('rooms.mostPopular')}</span>}
        <span className="room-rating"><Icon name="star" size={14} /> {room.rating}</span>
      </div>
      <div className="room-card-content">
        <div className="room-card-heading"><div><span className="eyebrow">{room.size} M²</span><h3>{t(room.nameKey)}</h3></div><div className="room-price"><strong>{new Intl.NumberFormat(i18n.resolvedLanguage === 'vi' ? 'vi-VN' : 'en-US').format(room.price)}₫</strong><span>/{t('common.hour')}</span></div></div>
        <p>{t(room.descriptionKey)}</p>
        <div className="room-meta"><span><Icon name="people" size={17} /> {t('rooms.upTo', { count: room.capacity })}</span><span><Icon name="music" size={17} /> {t(room.features[0])}</span></div>
        <Link className="text-button" to={`/booking?room=${room.id}`}>{t('rooms.reserve')} <Icon name="arrow" size={17} /></Link>
      </div>
    </article>
  )
}
