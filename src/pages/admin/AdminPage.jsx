import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { rooms } from '../../data/catalog'
import { getBookings, getRoomStatus, getUsers, toggleRoomStatus, updateBookingStatus } from '../../services/localStore'
import Icon from '../../components/ui/Icon'
import ThemeToggle from '../../components/ui/ThemeToggle'
import LanguageToggle from '../../components/ui/LanguageToggle'
import { useAuth } from '../../context/useAuth'

export default function AdminPage() {
  const { t, i18n } = useTranslation()
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [tab, setTab] = useState('bookings')
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('all')
  const [bookings, setBookings] = useState(getBookings)
  const [roomStatus, setRoomStatus] = useState(getRoomStatus)
  const users = getUsers().filter((user) => user.role === 'customer')
  const formatter = useMemo(() => new Intl.NumberFormat(i18n.resolvedLanguage === 'vi' ? 'vi-VN' : 'en-US'), [i18n.resolvedLanguage])
  const today = new Date().toISOString().slice(0, 10)
  const metrics = {
    today: bookings.filter((booking) => booking.date === today && booking.status !== 'cancelled').length,
    pending: bookings.filter((booking) => booking.status === 'pending').length,
    revenue: bookings.filter((booking) => booking.status === 'confirmed').reduce((sum, booking) => sum + booking.total, 0),
    guests: bookings.filter((booking) => booking.status !== 'cancelled').reduce((sum, booking) => sum + Number(booking.guests), 0),
  }
  const visibleBookings = bookings.filter((booking) => {
    const searchValue = `${booking.id} ${booking.customerName} ${booking.email}`.toLowerCase()
    return (status === 'all' || booking.status === status) && searchValue.includes(query.toLowerCase())
  })
  const changeStatus = (id, nextStatus) => { const next = updateBookingStatus(id, nextStatus); setBookings(next) }
  const toggleRoom = (id) => setRoomStatus(toggleRoomStatus(id))
  const handleLogout = () => {
    logout()
    navigate('/')
  }
  const exportCsv = () => {
    const rows = [['Reference', 'Customer', 'Email', 'Room', 'Date', 'Time', 'Guests', 'Total', 'Status'], ...visibleBookings.map((booking) => [booking.id, booking.customerName, booking.email, booking.roomId, booking.date, booking.time, booking.guests, booking.total, booking.status])]
    const blob = new Blob([rows.map((row) => row.join(',')).join('\n')], { type: 'text/csv' })
    const link = document.createElement('a'); link.href = URL.createObjectURL(blob); link.download = 'booking-nhanh-bookings.csv'; link.click(); URL.revokeObjectURL(link.href)
  }

  return <main className="admin-page"><aside className="admin-sidebar"><Link to="/" className="brand brand-light"><span className="brand-mark"><span /><span /><span /><span /></span><span className="brand-copy"><strong>booking</strong><small>ADMIN</small></span></Link><nav aria-label={t('admin.dashboard')}><button className={tab === 'bookings' ? 'active' : ''} onClick={() => setTab('bookings')}><Icon name="calendar" /> {t('admin.bookings')}</button><button className={tab === 'rooms' ? 'active' : ''} onClick={() => setTab('rooms')}><Icon name="grid" /> {t('admin.rooms')}</button><button className={tab === 'customers' ? 'active' : ''} onClick={() => setTab('customers')}><Icon name="people" /> {t('admin.customers')}</button></nav><div className="admin-sidebar-bottom"><Link to="/"><Icon name="arrowLeft" /> {t('admin.viewSite')}</Link><div className="admin-sidebar-note"><Icon name="shield" /><span><strong>{t('admin.demoMode')}</strong><small>{t('admin.savedLocally')}</small></span></div></div></aside><section className="admin-content"><header className="admin-header"><div><span className="eyebrow">{t('admin.workspace')}</span><h1>{t('admin.dashboard')}</h1></div><div className="admin-header-actions"><LanguageToggle /><ThemeToggle /><button className="admin-logout" type="button" onClick={handleLogout} title={t('nav.logout')} aria-label={t('nav.logout')}><Icon name="logout" size={18} /></button><div className="admin-avatar">AD</div></div></header>
    <div className="metric-grid"><article><span><Icon name="calendar" /></span><div><small>{t('admin.todayBookings')}</small><strong>{metrics.today}</strong></div></article><article><span><Icon name="clock" /></span><div><small>{t('admin.pending')}</small><strong>{metrics.pending}</strong></div></article><article><span><Icon name="wallet" /></span><div><small>{t('admin.confirmedRevenue')}</small><strong>{formatter.format(metrics.revenue)}₫</strong></div></article><article><span><Icon name="people" /></span><div><small>{t('admin.upcomingGuests')}</small><strong>{metrics.guests}</strong></div></article></div>
    {tab === 'bookings' && <div className="admin-panel"><div className="admin-panel-header"><div><h2>{t('admin.allBookings')}</h2><p>{t('admin.manageBookings')}</p></div><button className="button button-secondary" type="button" onClick={exportCsv}>{t('admin.exportCsv')}</button></div><div className="admin-filters"><label><Icon name="search" size={17} /><input placeholder={t('admin.search')} value={query} onChange={(event) => setQuery(event.target.value)} /></label><select value={status} onChange={(event) => setStatus(event.target.value)}><option value="all">{t('admin.allStatuses')}</option><option value="pending">{t('status.pending')}</option><option value="confirmed">{t('status.confirmed')}</option><option value="cancelled">{t('status.cancelled')}</option></select></div><div className="table-wrap"><table><thead><tr><th>{t('admin.customer')}</th><th>{t('booking.room')}</th><th>{t('booking.dateTime')}</th><th>{t('booking.guests')}</th><th>{t('booking.total')}</th><th>{t('admin.status')}</th><th>{t('admin.actions')}</th></tr></thead><tbody>{visibleBookings.map((booking) => { const room = rooms.find((item) => item.id === booking.roomId); return <tr key={booking.id}><td><strong>{booking.customerName}</strong><small>{booking.email}<br />{booking.id}</small></td><td>{room ? t(room.nameKey) : booking.roomId}</td><td>{booking.date}<small>{booking.time} · {booking.duration}h</small></td><td>{booking.guests}</td><td>{formatter.format(booking.total)}₫</td><td><span className={`status status-${booking.status}`}>{t(`status.${booking.status}`)}</span></td><td><select aria-label={t('admin.changeStatus')} value={booking.status} onChange={(event) => changeStatus(booking.id, event.target.value)}><option value="pending">{t('status.pending')}</option><option value="confirmed">{t('status.confirmed')}</option><option value="cancelled">{t('status.cancelled')}</option></select></td></tr>})}</tbody></table></div></div>}
    {tab === 'rooms' && <div className="admin-panel"><div className="admin-panel-header"><div><h2>{t('admin.roomInventory')}</h2><p>{t('admin.roomInventoryText')}</p></div></div><div className="admin-room-grid">{rooms.map((room) => <article key={room.id}><img src={room.image} alt="" /><div><span className={roomStatus[room.id] ? 'availability available' : 'availability unavailable'}>{roomStatus[room.id] ? t('admin.available') : t('admin.unavailable')}</span><h3>{t(room.nameKey)}</h3><p>{room.capacity} {t('booking.guests').toLowerCase()} · {formatter.format(room.price)}₫/{t('common.hour')}</p><button className="button button-secondary" type="button" onClick={() => toggleRoom(room.id)}>{roomStatus[room.id] ? t('admin.markUnavailable') : t('admin.markAvailable')}</button></div></article>)}</div></div>}
    {tab === 'customers' && <div className="admin-panel"><div className="admin-panel-header"><div><h2>{t('admin.customerDirectory')}</h2><p>{t('admin.customerDirectoryText')}</p></div></div><div className="table-wrap"><table><thead><tr><th>{t('admin.customer')}</th><th>{t('form.email')}</th><th>{t('form.phone')}</th><th>{t('admin.totalBookings')}</th></tr></thead><tbody>{users.map((customer) => <tr key={customer.id}><td><strong>{customer.name}</strong></td><td>{customer.email}</td><td>{customer.phone}</td><td>{bookings.filter((booking) => booking.email.toLowerCase() === customer.email.toLowerCase()).length}</td></tr>)}</tbody></table></div></div>}
  </section></main>
}
