import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from './providers/ThemeProvider'
import { AppShell } from './components/layout/AppShell'
import HomePage from './pages/home/HomePage'
import ExplorePage from './pages/ExplorePage'
import RoomDetailsPage from './pages/RoomDetailsPage'
import BookingPage from './pages/booking/BookingPage'
import BookingConfirmationPage from './pages/BookingConfirmationPage'
import AuthPage from './pages/AuthPage'
import MyBookingsPage from './pages/MyBookingsPage'
import AboutPage from './pages/about/AboutPage'
import NotFoundPage from './pages/NotFoundPage'
import './i18n'
import './styles/app.css'

export default function App() {
  return <ThemeProvider><BrowserRouter><Routes><Route element={<AppShell/>}><Route index element={<HomePage/>}/><Route path="explore" element={<ExplorePage/>}/><Route path="rooms/:roomId" element={<RoomDetailsPage/>}/><Route path="booking/:roomId" element={<BookingPage/>}/><Route path="booking-confirmation/:bookingId" element={<BookingConfirmationPage/>}/><Route path="bookings" element={<MyBookingsPage/>}/><Route path="about" element={<AboutPage/>}/><Route path="*" element={<NotFoundPage/>}/></Route><Route path="login" element={<AuthPage mode="login"/>}/><Route path="register" element={<AuthPage mode="register"/>}/></Routes></BrowserRouter></ThemeProvider>
}
