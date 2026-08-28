import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Icon } from '../ui/Icon'
import { formatCurrency } from '../../utils/formatters'
import { getLocalizedText } from '../../utils/localizedText'

export function RoomCard({ room, venue, priority = false }) {
  const { t, i18n } = useTranslation()
  return (
    <article className="room-card">
      <Link className="room-card-media" to={`/rooms/${room.id}`} aria-label={`${t('common.viewRoom')}: ${getLocalizedText(room.name, i18n.language)}`}>
        <img src={room.images[0]} alt="" loading={priority ? 'eager' : 'lazy'} />
        {room.isPopular && <span className="room-badge"><Icon name="sparkle" size={14}/>{t('common.popular')}</span>}
      </Link>
      <div className="room-card-body">
        <div className="room-card-kicker"><Icon name="location" size={15}/><span>{venue?.district}</span><span className="dot">•</span><Icon name="star" size={14}/><span>{venue?.rating}</span></div>
        <h3><Link to={`/rooms/${room.id}`}>{getLocalizedText(room.name, i18n.language)}</Link></h3>
        <div className="room-card-meta"><span><Icon name="users" size={16}/>{t('room.capacity', { count: room.capacity })}</span><span><Icon name="sparkle" size={16}/>{t('room.size', { count: room.sizeSquareMeters })}</span></div>
        <div className="room-card-footer"><p><small>{t('common.from')}</small>{formatCurrency(room.pricePerHour, i18n.language)} <span>{t('common.perHour')}</span></p><Link className="circle-link" to={`/rooms/${room.id}`} aria-label={t('common.viewRoom')}><Icon name="arrowRight"/></Link></div>
      </div>
    </article>
  )
}
