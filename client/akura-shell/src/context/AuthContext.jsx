import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { authAPI } from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  // Keep the user in memory (React state), outside localStorage and cookies
  const [user, setUser] = useState(null)
  const [profileLoading, setProfileLoading] = useState(true)

  // ─── Check the active session via /auth/me ────────────────────────────────────────────
  const checkSession = useCallback(async () => {
    setProfileLoading(true)
    try {
      const res = await authAPI.me()
      const userData = res.data?.data || null
      setUser(userData)
      return userData
    } catch {
      // 401 → session inactive, user remains null
      setUser(null)
      return null
    } finally {
      setProfileLoading(false)
    }
  }, [])

  // Run when the app first loads
  useEffect(() => {
    checkSession()
  }, [checkSession])

  // ─── Login ───────────────────────────────────────────────────────────────────
  const login = useCallback(async (credentials) => {
    const res = await authAPI.login(credentials)
    const userData = res.data?.data?.user || null
    if (!userData) throw new Error('The login response did not include user data.')
    setUser(userData)
    return { user: userData, message: res.data?.message }
  }, [])

  // ─── Logout ──────────────────────────────────────────────────────────────────
  const logout = useCallback(async () => {
    try {
      const res = await authAPI.logout()
      return res.data?.message
    } finally {
      setUser(null)
    }
  }, [])

  const updateProfile = useCallback(async (data) => {
    const res = await authAPI.updateProfile(data)
    const userData = res.data?.data
    if (!userData) throw new Error('The profile update response did not include user data.')
    setUser(userData)
    return { user: userData, message: res.data?.message }
  }, [])

  const changePassword = useCallback(async (data) => {
    const res = await authAPI.changePassword(data)
    const userData = res.data?.data
    if (userData) setUser(userData)
    return { user: userData, message: res.data?.message }
  }, [])

  const isAuthenticated = !!user && !profileLoading

  return (
    <AuthContext.Provider
      value={{
        user,
        loading: profileLoading,
        profileLoading,
        isAuthenticated,
        login,
        logout,
        updateProfile,
        changePassword,
        checkSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export default AuthContext
