import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthProvider'
import { ThemeProvider } from './context/ThemeProvider'
import Layout from './components/layout/Layout'
import ProtectedRoute from './auth/ProtectedRoute'
import HomePage from './pages/home/HomePage'
import RoomsPage from './pages/RoomsPage'
import BookingPage from './pages/booking/BookingPage'
import AboutPage from './pages/about/AboutPage'
import ContactPage from './pages/ContactPage'
import Login from './pages/Login'
import Register from './pages/Register'
import AccountPage from './pages/AccountPage'
import AdminPage from './pages/admin/AdminPage'
import NotFoundPage from './pages/NotFoundPage'
import './i18n'
import './App.css'

export default function App() {
  return <ThemeProvider><BrowserRouter><AuthProvider><Routes>
    <Route element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path="rooms" element={<RoomsPage />} />
      <Route path="booking" element={<BookingPage />} />
      <Route path="about" element={<AboutPage />} />
      <Route path="contact" element={<ContactPage />} />
      <Route path="account" element={<ProtectedRoute><AccountPage /></ProtectedRoute>} />
    </Route>
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} />
    <Route path="admin" element={<ProtectedRoute adminOnly><AdminPage /></ProtectedRoute>} />
    <Route path="*" element={<NotFoundPage />} />
  </Routes></AuthProvider></BrowserRouter></ThemeProvider>
}
