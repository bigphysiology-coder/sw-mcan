import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import { authApi } from '@/api'
import { useAuthStore } from '@/store/authStore'
import { AUTH_TOKEN_KEY } from '@/constants'
import type { User, LoginPayload, RegisterPayload } from '@/types'

interface AuthContextValue {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (payload: LoginPayload) => Promise<void>
  register: (payload: RegisterPayload) => Promise<void>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const { user, token, isAuthenticated, setAuth, logout: storeLogout } = useAuthStore()
  const [isLoading, setIsLoading] = useState(true)

  const refreshUser = useCallback(async () => {
    try {
      const me = await authApi.getMe()
      useAuthStore.getState().updateUser(me)
    } catch {
      // ignore
    }
  }, [])

  useEffect(() => {
    if (token) {
      refreshUser().finally(() => setIsLoading(false))
    } else {
      setIsLoading(false)
    }
  }, [token, refreshUser])

  const login = useCallback(async (payload: LoginPayload) => {
    const res = await authApi.login(payload)
    localStorage.setItem(AUTH_TOKEN_KEY, res.accessToken)
    setAuth(res.user, res.accessToken)
  }, [setAuth])

  const register = useCallback(async (payload: RegisterPayload) => {
    const res = await authApi.register(payload)
    localStorage.setItem(AUTH_TOKEN_KEY, res.accessToken)
    setAuth(res.user, res.accessToken)
  }, [setAuth])

  const logout = useCallback(async () => {
    try {
      await authApi.logout()
    } catch {
      // ignore
    }
    storeLogout()
  }, [storeLogout])

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return ctx
}
