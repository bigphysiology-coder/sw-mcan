import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { authApi } from '@/features/auth/services/authApi'
import { ROUTES } from '@/constants'
import type { LoginPayload, RegisterPayload } from '@/types'

function useAuth() {
  const navigate = useNavigate()
  const { user, isAuthenticated, setAuth, logout: storeLogout } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function login(payload: LoginPayload) {
    setIsLoading(true)
    setError(null)
    try {
      const res = await authApi.login(payload)
      setAuth(res.user, res.token)
      if (res.user.role === 'admin') {
        navigate(ROUTES.ADMIN.DASHBOARD, { replace: true })
      } else {
        navigate(ROUTES.HOME, { replace: true })
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Login failed'
      setError(message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  async function register(payload: RegisterPayload) {
    setIsLoading(true)
    setError(null)
    try {
      const res = await authApi.register(payload)
      setAuth(res.user, res.token)
      navigate(ROUTES.HOME, { replace: true })
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Registration failed'
      setError(message)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  function logout() {
    storeLogout()
    navigate(ROUTES.HOME, { replace: true })
  }

  return { user, isAuthenticated, login, register, logout, isLoading, error }
}

export { useAuth }
