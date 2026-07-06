import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { ROUTES } from '@/constants'

interface PublicRouteProps {
  children?: React.ReactNode
}

function PublicRoute({ children }: PublicRouteProps) {
  const { isAuthenticated } = useAuthStore()

  if (isAuthenticated) {
    return <Navigate to={ROUTES.HOME} replace />
  }

  return children ? <>{children}</> : <Outlet />
}

export { PublicRoute }
