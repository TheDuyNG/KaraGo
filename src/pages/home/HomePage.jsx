import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { catalogService } from '../../services/catalogService'
import { RoomCard } from '../../components/rooms/RoomCard'
import { ErrorState, LoadingState } from '../../components/ui/AsyncState'
import { Icon } from '../../components/ui/Icon'
import heroImage from '../../assets/images/karaoke-suite.png'
import { toLocalDateInputValue } from '../../utils/formatters'

export default function HomePage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [catalog, setCatalog] = useState({ rooms: [], venues: [], isLoading: true, hasError: false })
  const today = toLocalDateInputValue()
  const [search, setSearch] = useState({ date: today, guests: 6 })

  const loadCatalog = async () => {
    setCatalog((current) => ({ ...current, isLoading: true, hasError: false }))
    try {
      const [rooms, venues] = await Promise.all([catalogService.getRooms(), catalogService.getVenues()])
      setCatalog({ rooms, venues, isLoading: false, hasError: false })
    } catch {
      setCatalog({ rooms: [], venues: [], isLoading: false, hasError: true })
    }
  }

  useEffect(() => { loadCatalog() }, [])

  const handleSearch = (event) => {
    event.preventDefault()
    navigate(`/explore?date=${search.date}&guests=${search.guests}`)
  }

  return <>
    <section className="hero-section">
      <img className="hero-image" src={heroImage} alt="" fetchPriority="high"/>
      <div className="hero-overlay"/>
      <div className="container hero-content">
        <div className="hero-copy">
          <p className="eyebrow light"><span/><Icon name="sparkle" size={15}/>{t('home.eyebrow')}</p>
          <h1>{t('home.title').split('\n').map((line) => <span key={line}>{line}</span>)}</h1>
          <p className="hero-lead">{t('home.subtitle')}</p>
          <div className="hero-buttons"><Link className="button button-primary button-large" to="/explore">{t('home.primaryCta')}<Icon name="arrowRight"/></Link><a className="text-link light" href="#how-it-works">{t('home.secondaryCta')}<Icon name="arrowRight" size={17}/></a></div>
        </div>
        <form className="search-panel" onSubmit={handleSearch}>
          <div className="search-field"><Icon name="location"/><label>{t('home.searchLocation')}</label><strong>{t('home.searchLocationValue')}</strong></div>
          <div className="search-field"><Icon name="calendar"/><label htmlFor="home-date">{t('home.searchDate')}</label><input id="home-date" type="date" min={today} value={search.date} onChange={(event) => setSearch({ ...search, date: event.target.value })}/></div>
          <div className="search-field"><Icon name="users"/><label htmlFor="home-guests">{t('home.searchGuests')}</label><select id="home-guests" value={search.guests} onChange={(event) => setSearch({ ...search, guests: event.target.value })}>{[2,4,6,8,10,12,16,20].map((count) => <option key={count} value={count}>{count} {t('common.guests')}</option>)}</select></div>
          <button className="button button-primary search-submit" type="submit"><Icon name="search"/>{t('home.searchAction')}</button>
        </form>
      </div>
    </section>

    <section className="section featured-section">
      <div className="container">
        <div className="section-heading heading-row"><div><p className="eyebrow"><span/>{t('home.featuredEyebrow')}</p><h2>{t('home.featuredTitle')}</h2><p>{t('home.featuredSubtitle')}</p></div><Link className="text-link" to="/explore">{t('home.viewAll')}<Icon name="arrowRight" size={17}/></Link></div>
        {catalog.isLoading ? <LoadingState/> : catalog.hasError ? <ErrorState onRetry={loadCatalog}/> : <div className="room-grid">{catalog.rooms.slice(0, 3).map((room, index) => <RoomCard key={room.id} room={room} venue={catalog.venues.find((venue) => venue.id === room.venueId)} priority={index === 0}/>)}</div>}
      </div>
    </section>

    <section className="section how-section" id="how-it-works"><div className="container"><div className="section-heading centered"><p className="eyebrow"><span/>{t('home.howEyebrow')}</p><h2>{t('home.howTitle')}</h2></div><div className="steps-grid">{[1,2,3].map((step) => <article key={step} className="step-card"><span className="step-number">0{step}</span><div className="step-icon"><Icon name={step === 1 ? 'search' : step === 2 ? 'clock' : 'check'}/></div><h3>{t(`home.step${step}Title`)}</h3><p>{t(`home.step${step}Text`)}</p></article>)}</div></div></section>

    <section className="section promise-section"><div className="container promise-card"><div><Icon name="microphone" size={30}/><h2>{t('home.promiseTitle')}</h2><p>{t('home.promiseText')}</p></div><Link className="button button-light button-large" to="/explore">{t('home.promiseCta')}<Icon name="arrowRight"/></Link></div></section>
  </>
}
