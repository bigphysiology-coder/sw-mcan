import { useAuth as useAuthContext } from '@/context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/constants'
import type { LoginPayload, RegisterPayload } from '@/types'

function useAuth() {
  const navigate = useNavigate()
  const { user, isAuthenticated, login: ctxLogin, register: ctxRegister, logout: ctxLogout, isLoading } = useAuthContext()

  async function login(payload: LoginPayload) {
    await ctxLogin(payload)
    if (user?.role === 'admin') {
      navigate(ROUTES.ADMIN.DASHBOARD, { replace: true })
    } else {
      navigate(ROUTES.HOME, { replace: true })
    }
  }

  async function register(payload: RegisterPayload) {
    await ctxRegister(payload)
    navigate(ROUTES.HOME, { replace: true })
  }

  function logout() {
    ctxLogout()
    navigate(ROUTES.HOME, { replace: true })
  }

  return { user, isAuthenticated, login, register, logout, isLoading, error: null }
}

export { useAuth }
