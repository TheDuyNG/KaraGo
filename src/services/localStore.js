import { rooms } from '../data/catalog'

const KEYS = {
  users: 'bookingNhanh.users',
  session: 'bookingNhanh.session',
  bookings: 'bookingNhanh.bookings',
  roomStatus: 'bookingNhanh.roomStatus',
}

const defaultAdmin = {
  id: 'user-admin',
  name: 'Booking Nhanh Admin',
  email: 'admin@bookingnhanh.vn',
  phone: '0900000000',
  password: 'Admin@123',
  role: 'admin',
}

const starterBookings = [
  { id: 'BN-24081', roomId: 'signature', customerName: 'Linh Nguyen', email: 'linh@example.com', phone: '0903123456', guests: 8, date: '2026-08-28', time: '19:30', duration: 2, total: 1180000, status: 'confirmed', createdAt: '2026-08-24T09:00:00.000Z', note: 'Birthday setup' },
  { id: 'BN-24082', roomId: 'studio', customerName: 'James Tran', email: 'james@example.com', phone: '0911222333', guests: 4, date: '2026-08-28', time: '21:00', duration: 3, total: 960000, status: 'pending', createdAt: '2026-08-25T10:30:00.000Z', note: '' },
  { id: 'BN-24083', roomId: 'grand', customerName: 'Mai Pham', email: 'mai@example.com', phone: '0988777666', guests: 16, date: '2026-08-29', time: '18:00', duration: 2, total: 1780000, status: 'confirmed', createdAt: '2026-08-25T15:15:00.000Z', note: 'Company gathering' },
  { id: 'BN-24084', roomId: 'studio', customerName: 'Bao Hoang', email: 'bao@example.com', phone: '0909888777', guests: 5, date: '2026-08-30', time: '22:30', duration: 2, total: 640000, status: 'cancelled', createdAt: '2026-08-26T08:20:00.000Z', note: '' },
]

function read(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key))
    return value ?? fallback
  } catch {
    return fallback
  }
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
  window.dispatchEvent(new CustomEvent('booking-nhanh:storage', { detail: { key } }))
  return value
}

export function initializeStore() {
  const users = read(KEYS.users, [])
  if (!users.some((user) => user.email === defaultAdmin.email)) write(KEYS.users, [defaultAdmin, ...users])
  if (!localStorage.getItem(KEYS.bookings)) write(KEYS.bookings, starterBookings)
  if (!localStorage.getItem(KEYS.roomStatus)) {
    write(KEYS.roomStatus, Object.fromEntries(rooms.map((room) => [room.id, true])))
  }
}

export function getSession() {
  return read(KEYS.session, null)
}

export function login(email, password) {
  const user = read(KEYS.users, []).find((item) => item.email.toLowerCase() === email.trim().toLowerCase() && item.password === password)
  if (!user) throw new Error('INVALID_CREDENTIALS')
  const session = { id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role }
  return write(KEYS.session, session)
}

export function register(details) {
  const users = read(KEYS.users, [])
  if (users.some((user) => user.email.toLowerCase() === details.email.trim().toLowerCase())) throw new Error('EMAIL_EXISTS')
  const user = { id: `user-${Date.now()}`, ...details, email: details.email.trim().toLowerCase(), role: 'customer' }
  write(KEYS.users, [...users, user])
  const session = { id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role }
  return write(KEYS.session, session)
}

export function logout() {
  localStorage.removeItem(KEYS.session)
  window.dispatchEvent(new CustomEvent('booking-nhanh:storage', { detail: { key: KEYS.session } }))
}

export function getBookings() {
  return read(KEYS.bookings, [])
}

export function createBooking(details) {
  const booking = {
    ...details,
    id: `BN-${String(Date.now()).slice(-6)}`,
    status: 'pending',
    createdAt: new Date().toISOString(),
  }
  write(KEYS.bookings, [booking, ...getBookings()])
  return booking
}

export function updateBookingStatus(id, status) {
  return write(KEYS.bookings, getBookings().map((booking) => booking.id === id ? { ...booking, status } : booking))
}

export function getRoomStatus() {
  return read(KEYS.roomStatus, {})
}

export function toggleRoomStatus(id) {
  const current = getRoomStatus()
  return write(KEYS.roomStatus, { ...current, [id]: !current[id] })
}

export function getUsers() {
  return read(KEYS.users, []).map((user) => ({ id: user.id, name: user.name, email: user.email, phone: user.phone, role: user.role }))
}

export function subscribeToStore(callback) {
  const handler = () => callback()
  window.addEventListener('storage', handler)
  window.addEventListener('booking-nhanh:storage', handler)
  return () => {
    window.removeEventListener('storage', handler)
    window.removeEventListener('booking-nhanh:storage', handler)
  }
}
