export const mapCreateBookingRequest = (booking) => ({
  room_id: booking.roomId,
  booking_date: booking.bookingDate,
  start_time: booking.startTime,
  duration_hours: Number(booking.durationHours),
  guest_count: Number(booking.guestCount),
  customer_name: booking.customerName,
  customer_phone: booking.customerPhone,
  special_requests: booking.specialRequests || undefined,
})

export const mapBookingResponse = (booking) => ({
  id: String(booking.booking_id ?? booking.id ?? booking._id),
  reference: booking.reference ?? booking.booking_code,
  roomId: String(booking.room_id ?? booking.roomId),
  roomName: booking.room_name ?? booking.roomName,
  venueName: booking.venue_name ?? booking.venueName,
  bookingDate: booking.booking_date ?? booking.bookingDate,
  startTime: booking.start_time ?? booking.startTime,
  durationHours: Number(booking.duration_hours ?? booking.durationHours),
  guestCount: Number(booking.guest_count ?? booking.guestCount ?? booking.guests),
  customerName: booking.customer_name ?? booking.customerName,
  customerPhone: booking.customer_phone ?? booking.customerPhone,
  status: booking.status,
  totalAmount: Number(booking.total_amount ?? booking.totalAmount ?? 0),
  createdAt: booking.created_at ?? booking.createdAt,
})
