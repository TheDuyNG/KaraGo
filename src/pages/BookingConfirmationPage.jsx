import { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { bookingService } from '../services/bookingService'
import { Icon } from '../components/ui/Icon'
import { formatCurrency, formatDate } from '../utils/formatters'

export default function BookingConfirmationPage() {
  const { bookingId } = useParams()
  const location = useLocation()
  const { t, i18n } = useTranslation()
  const [booking, setBooking] = useState(location.state?.booking ?? null)
  const [isLoading, setIsLoading] = useState(!location.state?.booking)
  useEffect(() => { if (!booking) bookingService.getBooking(bookingId).then((result) => { setBooking(result); setIsLoading(false) }) }, [booking, bookingId])
  if (isLoading) return null
  if (!booking) return <section className="section"><div className="container state-card"><h1>{t('confirmation.notFound')}</h1><Link className="button button-primary" to="/explore">{t('common.explore')}</Link></div></section>
  return <section className="section confirmation-page"><div className="container confirmation-card"><div className="success-mark"><Icon name="check" size={38}/></div><p className="eyebrow"><span/>{t('confirmation.eyebrow')}</p><h1>{t('confirmation.title')}</h1><p className="confirmation-lead">{t('confirmation.subtitle', { room: booking.roomName, venue: booking.venueName })}</p><div className="reference-box"><span>{t('confirmation.reference')}</span><strong>{booking.reference}</strong><small>{t('confirmation.saveNote')}</small></div><dl className="confirmation-details"><div><dt>{t('booking.date')}</dt><dd>{formatDate(booking.bookingDate, i18n.language)}</dd></div><div><dt>{t('booking.time')}</dt><dd>{booking.startTime}</dd></div><div><dt>{t('booking.duration')}</dt><dd>{booking.durationHours} {t('common.hours')}</dd></div><div><dt>{t('booking.total')}</dt><dd>{formatCurrency(booking.totalAmount, i18n.language)}</dd></div></dl><div className="confirmation-actions"><Link className="button button-primary button-large" to="/bookings">{t('confirmation.viewBookings')}</Link><Link className="button button-secondary button-large" to="/">{t('confirmation.backHome')}</Link></div></div></section>
}
