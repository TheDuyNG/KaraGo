import { useEffect, useMemo, useState } from 'react'
import { getSession, initializeStore, login as loginUser, logout as logoutUser, register as registerUser, subscribeToStore } from '../services/localStore'
import { AuthContext } from './auth-context'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    initializeStore()
    return getSession()
  })

  useEffect(() => {
    const unsubscribe = subscribeToStore(() => setUser(getSession()))
    return () => unsubscribe()
  }, [])

  const value = useMemo(() => ({
    user,
    login: (email, password) => {
      const nextUser = loginUser(email, password)
      setUser(nextUser)
      return nextUser
    },
    register: (details) => {
      const nextUser = registerUser(details)
      setUser(nextUser)
      return nextUser
    },
    logout: () => {
      logoutUser()
      setUser(null)
    },
  }), [user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
