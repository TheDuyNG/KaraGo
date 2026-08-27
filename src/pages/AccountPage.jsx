import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../context/useAuth'
import { rooms } from '../data/catalog'
import { getBookings, updateBookingStatus } from '../services/localStore'
import Icon from '../components/ui/Icon'

export default function AccountPage() {
  const { t, i18n } = useTranslation()
  const { user } = useAuth()
  const [bookings, setBookings] = useState(() => getBookings().filter((booking) => booking.email.toLowerCase() === user.email.toLowerCase()))
  const locale = i18n.resolvedLanguage === 'vi' ? 'vi-VN' : 'en-US'
  const currencyFormatter = useMemo(() => new Intl.NumberFormat(locale), [locale])
  const dateFormatter = useMemo(() => new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short', year: 'numeric' }), [locale])

  const cancelBooking = (id) => {
    if (!window.confirm(t('account.cancelConfirm'))) return
    updateBookingStatus(id, 'cancelled')
    setBookings((current) => current.map((booking) => booking.id === id ? { ...booking, status: 'cancelled' } : booking))
  }

  return (
    <main className="account-page">
      <section className="account-hero"><div className="shell"><span className="eyebrow light">{t('account.eyebrow')}</span><h1>{t('account.greeting', { name: user.name.split(' ')[0] })}</h1><p>{t('account.subtitle')}</p></div></section>
      <section className="section shell">
        <div className="account-toolbar"><div><h2>{t('account.yourBookings')}</h2><p>{t('account.bookingCount', { count: bookings.length })}</p></div><Link className="button button-primary" to="/booking"><Icon name="plus" size={17} /> {t('account.newBooking')}</Link></div>
        {bookings.length ? (
          <div className="account-bookings">
            {bookings.map((booking) => {
              const room = rooms.find((item) => item.id === booking.roomId)
              return (
                <article className="account-booking" key={booking.id}>
                  <img src={room?.image} alt="" />
                  <div className="account-booking-main">
                    <div><span className={`status status-${booking.status}`}>{t(`status.${booking.status}`)}</span><small>{booking.id}</small></div>
                    <h3>{room ? t(room.nameKey) : booking.roomId}</h3>
                    <div className="booking-meta"><span><Icon name="calendar" size={16} /> {dateFormatter.format(new Date(`${booking.date}T00:00:00`))}</span><span><Icon name="clock" size={16} /> {booking.time} · {booking.duration}h</span><span><Icon name="people" size={16} /> {booking.guests}</span></div>
                  </div>
                  <div className="account-booking-price"><small>{t('booking.total')}</small><strong>{currencyFormatter.format(booking.total)}₫</strong>{booking.status === 'pending' && <button type="button" onClick={() => cancelBooking(booking.id)}>{t('account.cancel')}</button>}</div>
                </article>
              )
            })}
          </div>
        ) : <div className="empty-state card-panel"><Icon name="calendar" size={36} /><h2>{t('account.emptyTitle')}</h2><p>{t('account.emptyText')}</p><Link className="button button-primary" to="/booking">{t('nav.bookNow')}</Link></div>}
      </section>
    </main>
  )
}
