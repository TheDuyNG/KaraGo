/**
 * Frontend contract names: User, KaraokeVenue, KaraokeRoom, RoomImage,
 * RoomAmenity, RoomAvailability, Booking, BookingStatus, Payment,
 * Location, and Promotion. Backend snake_case is isolated in API mappers.
 */
export const BOOKING_STATUS = Object.freeze({
  pending: 'pending',
  confirmed: 'confirmed',
  completed: 'completed',
  cancelled: 'cancelled',
})

export const PAYMENT_STATUS = Object.freeze({
  unpaid: 'unpaid',
  depositPaid: 'deposit_paid',
  paid: 'paid',
  refunded: 'refunded',
})
