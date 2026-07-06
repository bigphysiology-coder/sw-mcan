import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ROUTES } from '@/constants'
import { ProtectedRoute } from '@/router/ProtectedRoute'
import { PublicRoute } from '@/router/PublicRoute'
import { Loader } from '@/components/common/Loader'

const HomePage = lazy(() => import('@/pages/public/HomePage'))
const AboutPage = lazy(() => import('@/pages/public/AboutPage'))
const NewsPage = lazy(() => import('@/pages/public/NewsPage'))
const EventsPage = lazy(() => import('@/pages/public/EventsPage'))
const MembershipPage = lazy(() => import('@/pages/public/MembershipPage'))
const ContactPage = lazy(() => import('@/pages/public/ContactPage'))
const DigitalIdPage = lazy(() => import('@/pages/public/DigitalIdPage'))
const LoginPage = lazy(() => import('@/pages/auth/LoginPage'))
const SignupPage = lazy(() => import('@/pages/auth/SignupPage'))

function SiteRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<Suspense fallback={<Loader fullScreen />}><HomePage /></Suspense>} />
      <Route path={ROUTES.ABOUT} element={<Suspense fallback={<Loader fullScreen />}><AboutPage /></Suspense>} />
      <Route path={ROUTES.NEWS} element={<Suspense fallback={<Loader fullScreen />}><NewsPage /></Suspense>} />
      <Route path={ROUTES.EVENTS} element={<Suspense fallback={<Loader fullScreen />}><EventsPage /></Suspense>} />
      <Route path={ROUTES.MEMBERSHIP} element={<Suspense fallback={<Loader fullScreen />}><MembershipPage /></Suspense>} />
      <Route path={ROUTES.CONTACT} element={<Suspense fallback={<Loader fullScreen />}><ContactPage /></Suspense>} />
      <Route path={ROUTES.DIGITAL_ID} element={<ProtectedRoute><Suspense fallback={<Loader fullScreen />}><DigitalIdPage /></Suspense></ProtectedRoute>} />
      <Route path={ROUTES.LOGIN} element={<PublicRoute><Suspense fallback={<Loader fullScreen />}><LoginPage /></Suspense></PublicRoute>} />
      <Route path={ROUTES.SIGNUP} element={<PublicRoute><Suspense fallback={<Loader fullScreen />}><SignupPage /></Suspense></PublicRoute>} />
    </Routes>
  )
}

export { SiteRoutes }
