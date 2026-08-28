import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { catalogService } from '../services/catalogService'
import { ErrorState, LoadingState } from '../components/ui/AsyncState'
import { Icon } from '../components/ui/Icon'
import { formatCurrency, toLocalDateInputValue } from '../utils/formatters'
import { getLocalizedText } from '../utils/localizedText'

export default function RoomDetailsPage() {
  const { roomId } = useParams()
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const today = toLocalDateInputValue()
  const [data, setData] = useState({ room: null, venue: null, isLoading: true, hasError: false })
  const [selection, setSelection] = useState({ date: today, time: '', duration: 2 })
  const [availability, setAvailability] = useState({ slots: [], isLoading: true, hasError: false })

  useEffect(() => {
    const load = async () => {
      try {
        const room = await catalogService.getRoomById(roomId)
        const venue = room ? await catalogService.getVenueById(room.venueId) : null
        setData({ room, venue, isLoading: false, hasError: false })
        if (room) setSelection((current) => ({ ...current, duration: room.minimumHours }))
      } catch { setData({ room: null, venue: null, isLoading: false, hasError: true }) }
    }
    load()
  }, [roomId])

  useEffect(() => {
    const loadAvailability = async () => {
      setAvailability({ slots: [], isLoading: true, hasError: false })
      try {
        const result = await catalogService.getRoomAvailability(roomId, selection.date)
        setAvailability({ slots: result.slots, isLoading: false, hasError: false })
        setSelection((current) => ({ ...current, time: result.slots[0] ?? '' }))
      } catch { setAvailability({ slots: [], isLoading: false, hasError: true }) }
    }
    loadAvailability()
  }, [roomId, selection.date])

  const total = useMemo(() => (data.room?.pricePerHour ?? 0) * selection.duration, [data.room, selection.duration])
  const continueBooking = () => navigate(`/booking/${roomId}`, { state: selection })

  if (data.isLoading) return <section className="section"><div className="container"><LoadingState/></div></section>
  if (data.hasError) return <section className="section"><div className="container"><ErrorState/></div></section>
  if (!data.room) return <section className="section"><div className="container state-card"><h1>{t('room.notFound')}</h1><Link className="button button-primary" to="/explore">{t('common.explore')}</Link></div></section>
  const { room, venue } = data

  return <>
    <section className="room-gallery"><img src={room.images[0]} alt={getLocalizedText(room.name, i18n.language)}/><div className="container gallery-back"><Link className="glass-button" to="/explore"><Icon name="arrowLeft"/>{t('common.back')}</Link></div></section>
    <section className="room-details-section"><div className="container room-details-grid"><div className="room-info">
      <p className="eyebrow"><span/>{venue.name} · {venue.district}</p><h1>{getLocalizedText(room.name, i18n.language)}</h1><div className="room-stat-row"><span><Icon name="users"/>{t('room.capacity', { count: room.capacity })}</span><span><Icon name="sparkle"/>{t('room.size', { count: room.sizeSquareMeters })}</span><span><Icon name="clock"/>{t('room.minimum', { count: room.minimumHours })}</span><span><Icon name="star"/>{venue.rating} ({venue.reviewCount} {t('common.reviews')})</span></div>
      <div className="content-block"><h2>{t('room.about')}</h2><p>{getLocalizedText(room.description, i18n.language)}</p></div>
      <div className="content-block"><h2>{t('room.amenities')}</h2><div className="amenities-grid">{room.amenities.map((amenity) => <span key={amenity}><Icon name="check"/>{t(`room.amenity.${amenity}`)}</span>)}</div></div>
      <div className="content-block location-block"><h2>{t('room.location')}</h2><p><Icon name="location"/>{venue.address}, {venue.city}</p></div>
    </div><aside className="booking-widget"><div className="widget-price"><small>{t('common.from')}</small><strong>{formatCurrency(room.pricePerHour, i18n.language)}</strong><span>{t('common.perHour')}</span></div><div className="field"><label htmlFor="booking-date">{t('room.selectDate')}</label><input id="booking-date" type="date" min={today} value={selection.date} onChange={(event) => setSelection({ ...selection, date: event.target.value })}/></div><fieldset><legend>{t('room.selectTime')}</legend>{availability.isLoading ? <span className="mini-loader"/> : availability.hasError ? <p className="field-error">{t('room.availabilityError')}</p> : <div className="time-slots">{availability.slots.map((time) => <button type="button" className={selection.time === time ? 'selected' : ''} onClick={() => setSelection({ ...selection, time })} key={time}>{time}</button>)}</div>}</fieldset><div className="field"><label htmlFor="duration">{t('room.selectDuration')}</label><select id="duration" value={selection.duration} onChange={(event) => setSelection({ ...selection, duration: Number(event.target.value) })}>{Array.from({ length: 7 - room.minimumHours }, (_, index) => room.minimumHours + index).map((hours) => <option key={hours} value={hours}>{hours} {t('common.hours')}</option>)}</select></div><div className="widget-total"><span>{t('room.estimatedTotal')}</span><strong>{formatCurrency(total, i18n.language)}</strong></div><button className="button button-primary button-full button-large" disabled={!selection.time || availability.isLoading} onClick={continueBooking}>{t('common.continue')}<Icon name="arrowRight"/></button></aside></div></section>
  </>
}
