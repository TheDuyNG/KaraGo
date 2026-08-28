import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { bookingService } from '../services/bookingService'
import { EmptyState, ErrorState, LoadingState } from '../components/ui/AsyncState'
import { Icon } from '../components/ui/Icon'
import { formatCurrency, formatDate } from '../utils/formatters'

export default function MyBookingsPage() {
  const { t, i18n } = useTranslation()
  const [state, setState] = useState({ bookings: [], isLoading: true, hasError: false })
  const load = async () => {
    setState((current) => ({ ...current, isLoading: true, hasError: false }))
    try { setState({ bookings: await bookingService.getMyBookings(), isLoading: false, hasError: false }) }
    catch { setState({ bookings: [], isLoading: false, hasError: true }) }
  }
  useEffect(() => { load() }, [])
  const cancel = async (bookingId) => {
    if (!window.confirm(t('bookings.cancelConfirm'))) return
    await bookingService.cancelBooking(bookingId); load()
  }
  return <section className="section account-page"><div className="container"><div className="page-heading"><p className="eyebrow"><span/>{t('bookings.eyebrow')}</p><h1>{t('bookings.title')}</h1><p>{t('bookings.subtitle')}</p></div>{state.isLoading ? <LoadingState/> : state.hasError ? <ErrorState onRetry={load}/> : state.bookings.length ? <div className="bookings-list">{state.bookings.map((booking) => <article className="booking-list-card" key={booking.id}><div className={`status-badge ${booking.status}`}>{t(`bookings.status.${booking.status}`)}</div><div><span className="booking-reference">{booking.reference}</span><h2>{booking.roomName}</h2><p><Icon name="location"/>{booking.venueName}</p></div><dl><div><dt>{t('booking.date')}</dt><dd>{formatDate(booking.bookingDate, i18n.language)}</dd></div><div><dt>{t('booking.time')}</dt><dd>{booking.startTime}</dd></div><div><dt>{t('booking.guestCount')}</dt><dd>{booking.guestCount} {t('common.guests')}</dd></div><div><dt>{t('booking.total')}</dt><dd>{formatCurrency(booking.totalAmount, i18n.language)}</dd></div></dl>{booking.status === 'confirmed' && <button className="text-button danger" onClick={() => cancel(booking.id)}>{t('bookings.cancelAction')}</button>}</article>)}</div> : <EmptyState title={t('bookings.emptyTitle')} text={t('bookings.emptyText')} action={<Link className="button button-primary" to="/explore">{t('bookings.exploreCta')}</Link>}/>}</div></section>
}
