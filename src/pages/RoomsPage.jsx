import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import RoomCard from '../components/RoomCard'
import Icon from '../components/ui/Icon'
import { rooms } from '../data/catalog'

export default function RoomsPage() {
  const { t } = useTranslation()
  const [capacity, setCapacity] = useState('all')
  const [sort, setSort] = useState('recommended')
  const filteredRooms = rooms
    .filter((room) => capacity === 'all' || room.capacity >= Number(capacity))
    .sort((a, b) => sort === 'priceLow' ? a.price - b.price : sort === 'capacity' ? b.capacity - a.capacity : b.rating - a.rating)

  return <main>
    <section className="page-hero compact-hero"><div className="shell"><span className="eyebrow light">{t('rooms.eyebrow')}</span><h1>{t('rooms.title')}</h1><p>{t('rooms.subtitle')}</p></div></section>
    <section className="section shell">
      <div className="filter-bar">
        <div><Icon name="people" size={18} /><label htmlFor="capacity">{t('rooms.capacity')}</label><select id="capacity" value={capacity} onChange={(event) => setCapacity(event.target.value)}><option value="all">{t('common.all')}</option><option value="6">6+</option><option value="12">12+</option><option value="20">20+</option></select></div>
        <div><label htmlFor="sort">{t('rooms.sortBy')}</label><select id="sort" value={sort} onChange={(event) => setSort(event.target.value)}><option value="recommended">{t('rooms.recommended')}</option><option value="priceLow">{t('rooms.priceLow')}</option><option value="capacity">{t('rooms.largest')}</option></select></div>
      </div>
      <div className="room-grid room-grid-wide">{filteredRooms.map((room) => <RoomCard room={room} key={room.id} />)}</div>
      {!filteredRooms.length && <div className="empty-state"><Icon name="search" size={30} /><h2>{t('rooms.noRooms')}</h2></div>}
    </section>
  </main>
}
