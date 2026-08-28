import { apiClient } from '../api/client'
import { API_ENDPOINTS } from '../api/endpoints'
import { mapBookingResponse, mapCreateBookingRequest } from '../api/mappers/bookingMappers'
import { appConfig, storageKeys } from '../config/appConfig'
import { mockRooms, mockVenues } from '../mocks/catalog'
import { toLocalDateInputValue } from '../utils/formatters'

function readMockBookings() {
  try {
    return JSON.parse(localStorage.getItem(storageKeys.bookings)) ?? []
  } catch {
    return []
  }
}

function writeMockBookings(bookings) {
  localStorage.setItem(storageKeys.bookings, JSON.stringify(bookings))
}

export function validateBooking(booking, room) {
  const errors = {}
  const today = toLocalDateInputValue()
  if (!booking.bookingDate || booking.bookingDate < today) errors.bookingDate = 'invalidDate'
  if (!booking.startTime) errors.startTime = 'required'
  if (!booking.customerName?.trim()) errors.customerName = 'required'
  if (!/^(\+84|0)\d{9}$/.test(booking.customerPhone?.replace(/\s/g, '') ?? '')) errors.customerPhone = 'invalidPhone'
  if (Number(booking.guestCount) < 1 || Number(booking.guestCount) > room.capacity) errors.guestCount = 'invalidGuestCount'
  if (Number(booking.durationHours) < room.minimumHours || Number(booking.durationHours) > 6) errors.durationHours = 'invalidDuration'
  return errors
}

export const bookingService = {
  async createBooking(booking) {
    if (!appConfig.useMockApi) {
      return mapBookingResponse(await apiClient.post(API_ENDPOINTS.bookings.create, mapCreateBookingRequest(booking)))
    }
    const room = mockRooms.find((item) => item.id === booking.roomId)
    if (!room) throw new Error('Room not found')
    const venue = mockVenues.find((item) => item.id === room.venueId)
    const existingBookings = readMockBookings()
    const reference = `KG${String(Date.now()).slice(-6)}`
    const createdBooking = {
      id: crypto.randomUUID(), reference, roomId: room.id,
      roomName: room.name.vi, venueName: venue.name,
      bookingDate: booking.bookingDate, startTime: booking.startTime,
      durationHours: Number(booking.durationHours), guestCount: Number(booking.guestCount),
      customerName: booking.customerName.trim(), customerPhone: booking.customerPhone,
      specialRequests: booking.specialRequests?.trim() ?? '', status: 'confirmed',
      totalAmount: room.pricePerHour * Number(booking.durationHours),
      createdAt: new Date().toISOString(),
    }
    writeMockBookings([createdBooking, ...existingBookings])
    return createdBooking
  },

  async getMyBookings() {
    if (appConfig.useMockApi) return readMockBookings()
    const response = await apiClient.get(API_ENDPOINTS.bookings.mine)
    return (response.items ?? response.data ?? response).map(mapBookingResponse)
  },

  async getBooking(bookingId) {
    if (appConfig.useMockApi) return readMockBookings().find((booking) => booking.id === bookingId) ?? null
    return mapBookingResponse(await apiClient.get(API_ENDPOINTS.bookings.details(bookingId)))
  },

  async cancelBooking(bookingId) {
    if (!appConfig.useMockApi) return mapBookingResponse(await apiClient.patch(API_ENDPOINTS.bookings.cancel(bookingId)))
    const bookings = readMockBookings().map((booking) => (
      booking.id === bookingId ? { ...booking, status: 'cancelled' } : booking
    ))
    writeMockBookings(bookings)
    return bookings.find((booking) => booking.id === bookingId)
  },
}
