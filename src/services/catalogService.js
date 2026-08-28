import { apiClient } from '../api/client'
import { API_ENDPOINTS } from '../api/endpoints'
import { mapRoomResponse, mapVenueResponse } from '../api/mappers/roomMappers'
import { appConfig } from '../config/appConfig'
import { mockAvailability, mockRooms, mockVenues } from '../mocks/catalog'

const delay = (milliseconds = 220) => new Promise((resolve) => setTimeout(resolve, milliseconds))

export const catalogService = {
  async getVenues() {
    if (appConfig.useMockApi) {
      await delay()
      return mockVenues
    }
    const response = await apiClient.get(API_ENDPOINTS.venues.list)
    return (response.items ?? response.data ?? response).map(mapVenueResponse)
  },

  async getRooms(filters = {}) {
    if (appConfig.useMockApi) {
      await delay()
      return mockRooms.filter((room) => {
        if (filters.venueId && room.venueId !== filters.venueId) return false
        if (filters.guestCount && room.capacity < Number(filters.guestCount)) return false
        return true
      })
    }
    const query = new URLSearchParams(filters).toString()
    const response = await apiClient.get(`${API_ENDPOINTS.rooms.list}${query ? `?${query}` : ''}`)
    return (response.items ?? response.data ?? response).map(mapRoomResponse)
  },

  async getRoomById(roomId) {
    if (appConfig.useMockApi) {
      await delay(140)
      return mockRooms.find((room) => room.id === roomId) ?? null
    }
    return mapRoomResponse(await apiClient.get(API_ENDPOINTS.rooms.details(roomId)))
  },

  async getVenueById(venueId) {
    if (appConfig.useMockApi) {
      await delay(100)
      return mockVenues.find((venue) => venue.id === venueId) ?? null
    }
    return mapVenueResponse(await apiClient.get(API_ENDPOINTS.venues.details(venueId)))
  },

  async getRoomAvailability(roomId, date) {
    if (appConfig.useMockApi) {
      await delay(180)
      return { roomId, date, slots: mockAvailability }
    }
    const response = await apiClient.get(`${API_ENDPOINTS.rooms.availability(roomId)}?date=${encodeURIComponent(date)}`)
    return { roomId, date, slots: response.slots ?? [] }
  },
}
