const API_PREFIX = '/api'

export const API_ENDPOINTS = Object.freeze({
  auth: {
    login: `${API_PREFIX}/auth/login`,
    register: `${API_PREFIX}/auth/register`,
    me: `${API_PREFIX}/auth/me`,
    refresh: `${API_PREFIX}/auth/refresh`,
    logout: `${API_PREFIX}/auth/logout`,
    changePassword: `${API_PREFIX}/auth/change-password`,
  },
  venues: {
    list: `${API_PREFIX}/venues`,
    details: (venueId) => `${API_PREFIX}/venues/${venueId}`,
  },
  rooms: {
    list: `${API_PREFIX}/rooms`,
    details: (roomId) => `${API_PREFIX}/rooms/${roomId}`,
    availability: (roomId) => `${API_PREFIX}/rooms/${roomId}/availability`,
  },
  bookings: {
    create: `${API_PREFIX}/bookings`,
    details: (bookingId) => `${API_PREFIX}/bookings/${bookingId}`,
    mine: `${API_PREFIX}/bookings/me`,
    cancel: (bookingId) => `${API_PREFIX}/bookings/${bookingId}/cancel`,
  },
  users: { me: `${API_PREFIX}/users/me` },
})
