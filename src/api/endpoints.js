export const API_ENDPOINTS = Object.freeze({
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    me: '/auth/me',
  },
  venues: {
    list: '/venues',
    details: (venueId) => `/venues/${venueId}`,
  },
  rooms: {
    list: '/rooms',
    details: (roomId) => `/rooms/${roomId}`,
    availability: (roomId) => `/rooms/${roomId}/availability`,
  },
  bookings: {
    create: '/bookings',
    details: (bookingId) => `/bookings/${bookingId}`,
    mine: '/bookings/me',
    cancel: (bookingId) => `/bookings/${bookingId}/cancel`,
  },
  users: { me: '/users/me' },
})
