import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { rooms, timeSlots } from '../../data/catalog'
import { createBooking, getBookings, getRoomStatus } from '../../services/localStore'
import { useAuth } from '../../context/useAuth'
import Icon from '../../components/ui/Icon'

function toLocalDateString(date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

const today = toLocalDateString(new Date())

export default function BookingPage() {
  const { t, i18n } = useTranslation()
  const { user } = useAuth()
  const [searchParams] = useSearchParams()
  const requestedRoom = searchParams.get('room')
  const availableRooms = rooms.filter((room) => getRoomStatus()[room.id] !== false)
  const [step, setStep] = useState(1)
  const [error, setError] = useState('')
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  const [completedBooking, setCompletedBooking] = useState(null)
  const [form, setForm] = useState({
    roomId: availableRooms.some((room) => room.id === requestedRoom) ? requestedRoom : availableRooms[0]?.id || '',
    date: today,
    time: '',
    duration: 2,
    guests: 4,
    customerName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    note: '',
  })

  const selectedRoom = rooms.find((room) => room.id === form.roomId)
  const total = (selectedRoom?.price || 0) * Number(form.duration)
  const formatter = useMemo(() => new Intl.NumberFormat(i18n.resolvedLanguage === 'vi' ? 'vi-VN' : 'en-US'), [i18n.resolvedLanguage])

  const isSlotUnavailable = (roomId, date, time) => {
    const isPastTime = date === today && time <= new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
    const isBooked = getBookings().some((booking) => booking.roomId === roomId && booking.date === date && booking.time === time && booking.status !== 'cancelled')
    return isPastTime || isBooked
  }

  const update = (field, value) => {
    setError('')
    setForm((current) => ({ ...current, [field]: value }))
  }
  const selectRoom = (roomId) => {
    setError('')
    setForm((current) => ({ ...current, roomId, time: isSlotUnavailable(roomId, current.date, current.time) ? '' : current.time }))
  }
  const selectDate = (date) => {
    setError('')
    setForm((current) => ({ ...current, date, time: isSlotUnavailable(current.roomId, date, current.time) ? '' : current.time }))
  }
  const nextStep = () => {
    setError('')
    if (step === 1 && (!form.roomId || !form.date || !form.time)) return setError(t('booking.selectScheduleError'))
    if (step === 1 && isSlotUnavailable(form.roomId, form.date, form.time)) return setError(t('booking.slotUnavailable'))
    const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    const phoneIsValid = form.phone.replace(/\D/g, '').length >= 9
    if (step === 2 && (!form.customerName.trim() || !emailIsValid || !phoneIsValid || Number(form.guests) < 1 || Number(form.guests) > selectedRoom.capacity)) return setError(t('booking.contactError'))
    setStep((current) => Math.min(current + 1, 3))
  }
  const submit = () => {
    setError('')
    if (!acceptedTerms) return setError(t('booking.acceptTermsError'))
    if (isSlotUnavailable(form.roomId, form.date, form.time)) {
      setStep(1)
      setForm((current) => ({ ...current, time: '' }))
      return setError(t('booking.slotUnavailable'))
    }
    const booking = createBooking({ ...form, duration: Number(form.duration), guests: Number(form.guests), total })
    setCompletedBooking(booking)
    setStep(4)
  }

  if (step === 4) {
    return (
      <main className="booking-page">
        <section className="shell booking-success" aria-live="polite">
          <span className="success-icon"><Icon name="check" size={34} /></span>
          <span className="eyebrow">{t('booking.confirmedEyebrow')}</span>
          <h1>{t('booking.thankYou', { name: completedBooking.customerName.split(' ')[0] })}</h1>
          <p>{t('booking.successText')}</p>
          <div className="confirmation-card">
            <div><small>{t('booking.reference')}</small><strong>{completedBooking.id}</strong></div>
            <div><small>{t('booking.room')}</small><strong>{t(selectedRoom.nameKey)}</strong></div>
            <div><small>{t('booking.dateTime')}</small><strong>{completedBooking.date} · {completedBooking.time}</strong></div>
            <div><small>{t('booking.total')}</small><strong>{formatter.format(completedBooking.total)}₫</strong></div>
          </div>
          <div className="success-actions">
            <Link className="button button-dark" to={user ? '/account' : '/'}>{user ? t('nav.myBookings') : t('nav.home')}</Link>
            <Link className="button button-secondary" to="/rooms">{t('rooms.viewRooms')}</Link>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="booking-page">
      <section className="booking-heading shell">
        <span className="eyebrow">{t('booking.eyebrow')}</span>
        <h1>{t('booking.title')}</h1>
        <p>{t('booking.subtitle')}</p>
        <div className="stepper" aria-label={t('booking.progress')}>
          {[1, 2, 3].map((number) => (
            <button className={step >= number ? 'active' : ''} key={number} type="button" disabled={number > step} onClick={() => number < step && setStep(number)} aria-current={step === number ? 'step' : undefined}>
              <span>{step > number ? <Icon name="check" size={15} /> : number}</span>
              <small>{t(`booking.step${number}`)}</small>
            </button>
          ))}
        </div>
      </section>

      <section className="shell booking-layout">
        <div className="booking-form card-panel">
          {step === 1 && (
            <div className="form-step">
              <div className="form-title"><span>01</span><div><h2>{t('booking.chooseRoomAndTime')}</h2><p>{t('booking.chooseRoomHelp')}</p></div></div>
              <div className="room-options">
                {availableRooms.map((room) => (
                  <button type="button" aria-pressed={form.roomId === room.id} className={form.roomId === room.id ? 'selected' : ''} key={room.id} onClick={() => selectRoom(room.id)}>
                    <img src={room.image} alt="" />
                    <span><strong>{t(room.nameKey)}</strong><small><Icon name="people" size={14} /> {t('rooms.upTo', { count: room.capacity })}</small></span>
                    <b>{formatter.format(room.price)}₫<small>/{t('common.hour')}</small></b>
                  </button>
                ))}
              </div>
              <div className="form-grid schedule-grid">
                <label>{t('booking.date')}<input type="date" min={today} value={form.date} onChange={(event) => selectDate(event.target.value)} /></label>
                <label>{t('booking.duration')}<select value={form.duration} onChange={(event) => update('duration', event.target.value)}><option value="2">2 {t('common.hours')}</option><option value="3">3 {t('common.hours')}</option><option value="4">4 {t('common.hours')}</option></select></label>
              </div>
              <fieldset className="time-field">
                <legend>{t('booking.startTime')}</legend>
                <div className="time-options">
                  {timeSlots.map((time) => {
                    const unavailable = isSlotUnavailable(form.roomId, form.date, time)
                    return <button className={form.time === time ? 'selected' : ''} type="button" key={time} disabled={unavailable} onClick={() => update('time', time)} aria-pressed={form.time === time}><strong>{time}</strong>{unavailable && <small>{t('booking.unavailable')}</small>}</button>
                  })}
                </div>
              </fieldset>
            </div>
          )}

          {step === 2 && (
            <div className="form-step">
              <div className="form-title"><span>02</span><div><h2>{t('booking.yourDetails')}</h2><p>{t('booking.detailsHelp')}</p></div></div>
              <div className="form-grid">
                <label>{t('form.fullName')}<input required value={form.customerName} onChange={(event) => update('customerName', event.target.value)} autoComplete="name" /></label>
                <label>{t('form.email')}<input required type="email" value={form.email} onChange={(event) => update('email', event.target.value)} autoComplete="email" /></label>
                <label>{t('form.phone')}<input required inputMode="tel" value={form.phone} onChange={(event) => update('phone', event.target.value)} autoComplete="tel" /></label>
                <label>{t('booking.guests')}<input required min="1" max={selectedRoom?.capacity} type="number" value={form.guests} onChange={(event) => update('guests', event.target.value)} /><small className="field-hint">{t('booking.capacityHint', { count: selectedRoom?.capacity })}</small></label>
              </div>
              <label>{t('booking.specialRequest')}<textarea rows="4" value={form.note} onChange={(event) => update('note', event.target.value)} placeholder={t('booking.requestPlaceholder')} /></label>
            </div>
          )}

          {step === 3 && (
            <div className="form-step">
              <div className="form-title"><span>03</span><div><h2>{t('booking.reviewBooking')}</h2><p>{t('booking.reviewHelp')}</p></div></div>
              <div className="review-list">
                <div><span>{t('booking.room')}</span><strong>{t(selectedRoom.nameKey)}</strong></div>
                <div><span>{t('booking.dateTime')}</span><strong>{form.date} · {form.time}</strong></div>
                <div><span>{t('booking.duration')}</span><strong>{form.duration} {t('common.hours')}</strong></div>
                <div><span>{t('booking.guests')}</span><strong>{form.guests}</strong></div>
                <div><span>{t('form.fullName')}</span><strong>{form.customerName}</strong></div>
                <div><span>{t('form.contact')}</span><strong>{form.phone}<br />{form.email}</strong></div>
                {form.note && <div><span>{t('booking.specialRequest')}</span><strong>{form.note}</strong></div>}
              </div>
              <label className="checkbox-label"><input type="checkbox" checked={acceptedTerms} onChange={(event) => setAcceptedTerms(event.target.checked)} /><span>{t('booking.terms')}</span></label>
            </div>
          )}

          {error && <div className="error-banner" role="alert">{error}</div>}
          <div className="form-actions">
            {step > 1 && <button className="button button-secondary" type="button" onClick={() => { setError(''); setStep((current) => current - 1) }}>{t('common.back')}</button>}
            <button className="button button-primary" type="button" onClick={step === 3 ? submit : nextStep}>{step === 3 ? t('booking.confirmBooking') : t('common.continue')} <Icon name="arrow" size={17} /></button>
          </div>
        </div>

        <aside className="booking-summary">
          <img src={selectedRoom?.image} alt={selectedRoom ? t(selectedRoom.nameKey) : ''} />
          <div><span className="eyebrow">{t('booking.yourSelection')}</span><h2>{selectedRoom ? t(selectedRoom.nameKey) : t('booking.chooseRoom')}</h2><p>{selectedRoom ? t(selectedRoom.descriptionKey) : ''}</p><div className="summary-line"><span>{t('booking.roomRate')}</span><strong>{formatter.format(selectedRoom?.price || 0)}₫</strong></div><div className="summary-line"><span>{t('booking.duration')}</span><strong>× {form.duration}</strong></div><div className="summary-total"><span>{t('booking.estimatedTotal')}</span><strong>{formatter.format(total)}₫</strong></div><small className="summary-note"><Icon name="shield" size={15} /> {t('booking.paymentNote')}</small></div>
        </aside>
      </section>
    </main>
  )
}
