import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { catalogService } from '../services/catalogService'
import { RoomCard } from '../components/rooms/RoomCard'
import { EmptyState, ErrorState, LoadingState } from '../components/ui/AsyncState'
import { Icon } from '../components/ui/Icon'
import heroImage from '../assets/images/karaoke-suite.png'
import { getLocalizedText } from '../utils/localizedText'

export default function ExplorePage() {
  const { t, i18n } = useTranslation()
  const [searchParams] = useSearchParams()
  const [query, setQuery] = useState('')
  const [group, setGroup] = useState(searchParams.get('guests') ? Number(searchParams.get('guests')) : 0)
  const [catalog, setCatalog] = useState({ rooms: [], venues: [], isLoading: true, hasError: false })

  const loadCatalog = async () => {
    setCatalog((current) => ({ ...current, isLoading: true, hasError: false }))
    try {
      const [rooms, venues] = await Promise.all([catalogService.getRooms(), catalogService.getVenues()])
      setCatalog({ rooms, venues, isLoading: false, hasError: false })
    } catch { setCatalog({ rooms: [], venues: [], isLoading: false, hasError: true }) }
  }
  useEffect(() => { loadCatalog() }, [])

  const filteredRooms = useMemo(() => catalog.rooms.filter((room) => {
    const venue = catalog.venues.find((item) => item.id === room.venueId)
    const haystack = `${getLocalizedText(room.name, i18n.language)} ${venue?.name} ${venue?.district}`.toLowerCase()
    const capacityMatches = group === 0 || (group === 8 ? room.capacity <= 8 : group === 14 ? room.capacity >= 9 && room.capacity <= 14 : room.capacity >= 15)
    return haystack.includes(query.toLowerCase()) && capacityMatches
  }), [catalog, query, group, i18n.language])

  return <>
    <section className="page-hero compact"><img src={heroImage} alt=""/><div className="page-hero-overlay"/><div className="container"><p className="eyebrow light"><span/>{t('explore.eyebrow')}</p><h1>{t('explore.title')}</h1><p>{t('explore.subtitle')}</p></div></section>
    <section className="section explore-section"><div className="container">
      <div className="filters-panel"><div className="field search-input"><label htmlFor="room-search">{t('explore.searchLabel')}</label><div><Icon name="search"/><input id="room-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t('explore.searchPlaceholder')}/></div></div><div className="field"><label htmlFor="group-filter">{t('explore.guestLabel')}</label><select id="group-filter" value={group} onChange={(event) => setGroup(Number(event.target.value))}><option value="0">{t('explore.allGuests')}</option><option value="8">{t('explore.smallGroup')}</option><option value="14">{t('explore.mediumGroup')}</option><option value="15">{t('explore.largeGroup')}</option></select></div></div>
      {!catalog.isLoading && !catalog.hasError && <p className="result-count">{t('explore.resultCount', { count: filteredRooms.length })}</p>}
      {catalog.isLoading ? <LoadingState/> : catalog.hasError ? <ErrorState onRetry={loadCatalog}/> : filteredRooms.length ? <div className="room-grid">{filteredRooms.map((room) => <RoomCard key={room.id} room={room} venue={catalog.venues.find((venue) => venue.id === room.venueId)}/>)}</div> : <EmptyState title={t('explore.emptyTitle')} text={t('explore.emptyText')}/>} 
    </div></section>
  </>
}
