import { useAuth as useAuthContext } from '@/context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '@/constants'
import { useAuthStore } from '@/store/authStore'
import type { LoginPayload, RegisterPayload } from '@/types'

function useAuth() {
  const navigate = useNavigate()
  const { user, isAuthenticated, login: ctxLogin, register: ctxRegister, logout: ctxLogout, isLoading } = useAuthContext()

  async function login(payload: LoginPayload) {
    await ctxLogin(payload)
    const updatedUser = useAuthStore.getState().user
    if (updatedUser?.role === 'admin' || updatedUser?.role === 'superadmin') {
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
