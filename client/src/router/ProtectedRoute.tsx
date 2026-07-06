import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { ROUTES } from '@/constants'

interface ProtectedRouteProps {
  requireAdmin?: boolean
  children?: React.ReactNode
}

function ProtectedRoute({ requireAdmin = false, children }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuthStore()

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />
  }

  if (requireAdmin && user?.role !== 'admin') {
    return <Navigate to={ROUTES.HOME} replace />
  }

  return children ? <>{children}</> : <Outlet />
}

export { ProtectedRoute }
