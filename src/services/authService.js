import { apiClient } from '../api/client'
import { API_ENDPOINTS } from '../api/endpoints'
import { appConfig, storageKeys } from '../config/appConfig'

function persistSession(session) {
  localStorage.setItem(storageKeys.authToken, session.token)
  localStorage.setItem(storageKeys.user, JSON.stringify(session.user))
  // Temporary compatibility for the previous backend integration.
  localStorage.setItem('token', session.token)
  localStorage.setItem('user', JSON.stringify(session.user))
  window.dispatchEvent(new Event('karago:auth-changed'))
  return session
}

const mockUser = (values) => ({
  id: 'user-demo', name: values.name ?? 'Minh Anh', email: values.email, role: 'customer',
})

export const authService = {
  async login(credentials) {
    if (appConfig.useMockApi) return persistSession({ token: 'karago-mock-token', user: mockUser(credentials) })
    return persistSession(await apiClient.post(API_ENDPOINTS.auth.login, credentials))
  },
  async register(values) {
    if (appConfig.useMockApi) return persistSession({ token: 'karago-mock-token', user: mockUser(values) })
    return persistSession(await apiClient.post(API_ENDPOINTS.auth.register, values))
  },
  getCurrentUser() {
    try {
      return JSON.parse(localStorage.getItem(storageKeys.user) ?? localStorage.getItem('user'))
    } catch {
      return null
    }
  },
  logout() {
    Object.values({ token: storageKeys.authToken, user: storageKeys.user }).forEach((key) => localStorage.removeItem(key))
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.dispatchEvent(new Event('karago:auth-changed'))
  },
}
