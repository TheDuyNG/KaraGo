import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { bookingService, validateBooking } from '../../services/bookingService'
import { catalogService } from '../../services/catalogService'
import { LoadingState } from '../../components/ui/AsyncState'
import { Icon } from '../../components/ui/Icon'
import { formatCurrency, formatDate, toLocalDateInputValue } from '../../utils/formatters'
import { getLocalizedText } from '../../utils/localizedText'

export default function BookingPage() {
  const { roomId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const today = toLocalDateInputValue()
  const [room, setRoom] = useState(null)
  const [venue, setVenue] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState({
    roomId, bookingDate: location.state?.date ?? today,
    startTime: location.state?.time ?? '19:00', durationHours: location.state?.duration ?? 2,
    guestCount: 2, customerName: '', customerPhone: '', specialRequests: '',
  })

  useEffect(() => {
    const load = async () => {
      const selectedRoom = await catalogService.getRoomById(roomId)
      const selectedVenue = selectedRoom ? await catalogService.getVenueById(selectedRoom.venueId) : null
      setRoom(selectedRoom); setVenue(selectedVenue); setIsLoading(false)
      if (selectedRoom && !location.state?.duration) setForm((current) => ({ ...current, durationHours: selectedRoom.minimumHours }))
    }
    load()
  }, [roomId, location.state])

  const total = useMemo(() => (room?.pricePerHour ?? 0) * Number(form.durationHours), [room, form.durationHours])
  const updateField = (field, value) => { setForm((current) => ({ ...current, [field]: value })); setErrors((current) => ({ ...current, [field]: undefined })) }
  const fieldError = (field) => errors[field] ? t(`booking.validation.${errors[field]}`) : ''

  const handleSubmit = async (event) => {
    event.preventDefault(); setSubmitError('')
    const validationErrors = validateBooking(form, room)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length) return
    setIsSubmitting(true)
    try {
      const booking = await bookingService.createBooking(form)
      navigate(`/booking-confirmation/${booking.id}`, { state: { booking } })
    } catch { setSubmitError(t('booking.createError')); setIsSubmitting(false) }
  }

  if (isLoading) return <section className="section"><div className="container"><LoadingState/></div></section>
  if (!room) return <section className="section"><div className="container state-card"><h1>{t('room.notFound')}</h1><Link className="button button-primary" to="/explore">{t('common.explore')}</Link></div></section>

  return <section className="section booking-page"><div className="container"><Link className="text-link back-link" to={`/rooms/${room.id}`}><Icon name="arrowLeft"/>{t('common.back')}</Link><div className="booking-page-heading"><p className="eyebrow"><span/>{t('booking.eyebrow')}</p><h1>{t('booking.title')}</h1><p>{t('booking.subtitle')}</p></div><div className="checkout-grid"><form className="checkout-form" onSubmit={handleSubmit} noValidate>
    {submitError && <div className="alert" role="alert"><strong>{t('booking.errorTitle')}</strong><span>{submitError}</span></div>}
    <div className="form-grid"><div className="field"><label htmlFor="customer-name">{t('booking.customerName')}</label><input id="customer-name" value={form.customerName} onChange={(event) => updateField('customerName', event.target.value)} placeholder={t('booking.customerNamePlaceholder')} aria-invalid={Boolean(errors.customerName)}/>{fieldError('customerName') && <span className="field-error">{fieldError('customerName')}</span>}</div><div className="field"><label htmlFor="customer-phone">{t('booking.customerPhone')}</label><input id="customer-phone" type="tel" value={form.customerPhone} onChange={(event) => updateField('customerPhone', event.target.value)} placeholder={t('booking.customerPhonePlaceholder')} aria-invalid={Boolean(errors.customerPhone)}/>{fieldError('customerPhone') && <span className="field-error">{fieldError('customerPhone')}</span>}</div><div className="field"><label htmlFor="guest-count">{t('booking.guestCount')}</label><input id="guest-count" type="number" min="1" max={room.capacity} value={form.guestCount} onChange={(event) => updateField('guestCount', Number(event.target.value))}/>{fieldError('guestCount') && <span className="field-error">{fieldError('guestCount')}</span>}</div><div className="field"><label htmlFor="special-requests">{t('booking.specialRequests')} <small>({t('common.optional')})</small></label><textarea id="special-requests" value={form.specialRequests} onChange={(event) => updateField('specialRequests', event.target.value)} placeholder={t('booking.specialRequestsPlaceholder')}/></div></div>
    <button className="button button-primary button-large button-full checkout-submit" type="submit" disabled={isSubmitting}>{isSubmitting ? <><span className="button-spinner"/>{t('booking.submitting')}</> : <>{t('booking.submit')}<Icon name="arrowRight"/></>}</button><p className="terms-note"><Icon name="shield" size={16}/>{t('booking.terms')}</p>
  </form><aside className="checkout-summary"><img src={room.images[0]} alt=""/><div className="summary-content"><p className="eyebrow"><span/>{t('booking.details')}</p><h2>{getLocalizedText(room.name, i18n.language)}</h2><p className="summary-location"><Icon name="location"/>{venue.name}, {venue.district}</p><dl><div><dt>{t('booking.date')}</dt><dd>{formatDate(form.bookingDate, i18n.language)}</dd></div><div><dt>{t('booking.time')}</dt><dd>{form.startTime}</dd></div><div><dt>{t('booking.duration')}</dt><dd>{form.durationHours} {t('common.hours')}</dd></div><div><dt>{t('booking.guestCount')}</dt><dd>{form.guestCount} {t('common.guests')}</dd></div><div><dt>{t('booking.roomPrice')}</dt><dd>{formatCurrency(total, i18n.language)}</dd></div><div><dt>{t('booking.serviceFee')}</dt><dd>{t('booking.serviceFeeValue')}</dd></div><div className="summary-total"><dt>{t('booking.total')}</dt><dd>{formatCurrency(total, i18n.language)}</dd></div></dl></div></aside></div></div></section>
}
