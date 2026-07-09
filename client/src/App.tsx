import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { Footer } from '@/components/layout/Footer'
import { AdminLayout } from '@/components/layout/AdminLayout'
import { ProtectedRoute } from '@/router/ProtectedRoute'
import { PublicRoute } from '@/router/PublicRoute'
import { SplashScreen } from '@/components/SplashScreen'

const HomePage = lazy(() => import('@/pages/public/HomePage'))
const AboutPage = lazy(() => import('@/pages/public/AboutPage'))
const ContactPage = lazy(() => import('@/pages/public/ContactPage'))
const NewsPage = lazy(() => import('@/pages/public/NewsPage'))
const NewsDetailPage = lazy(() => import('@/pages/public/NewsDetailPage'))
const EventsPage = lazy(() => import('@/pages/public/EventsPage'))
const EventDetailPage = lazy(() => import('@/pages/public/EventDetailPage'))
const MembershipPage = lazy(() => import('@/pages/public/MembershipPage'))
const DigitalIdPage = lazy(() => import('@/pages/public/DigitalIdPage'))
const ProgramsPage = lazy(() => import('@/pages/public/ProgramsPage'))
const ProjectsPage = lazy(() => import('@/pages/public/ProjectsPage'))
const LodgesPage = lazy(() => import('@/pages/public/LodgesPage'))
const LeadershipPage = lazy(() => import('@/pages/public/LeadershipPage'))
const GalleryPage = lazy(() => import('@/pages/public/GalleryPage'))
const DonatePage = lazy(() => import('@/pages/public/DonatePage'))
const FaqPage = lazy(() => import('@/pages/public/FaqPage'))
const PortalPage = lazy(() => import('@/pages/public/PortalPage'))
const LoginPage = lazy(() => import('@/pages/auth/LoginPage'))

const AdminDashboard = lazy(() => import('@/pages/admin/AdminDashboard'))
const AdminMembersPage = lazy(() => import('@/pages/admin/AdminMembersPage'))
const AdminApprovalsPage = lazy(() => import('@/pages/admin/AdminApprovalsPage'))
const AdminNewsPage = lazy(() => import('@/pages/admin/AdminNewsPage'))
const AdminEventsPage = lazy(() => import('@/pages/admin/AdminEventsPage'))
const AdminDonationsPage = lazy(() => import('@/pages/admin/AdminDonationsPage'))
const AdminLodgesPage = lazy(() => import('@/pages/admin/AdminLodgesPage'))
const AdminGalleryPage = lazy(() => import('@/pages/admin/AdminGalleryPage'))
const AdminExecutivesPage = lazy(() => import('@/pages/admin/AdminExecutivesPage'))
const AdminWebContentPage = lazy(() => import('@/pages/admin/AdminWebContentPage'))
const AdminDigitalIdsPage = lazy(() => import('@/pages/admin/AdminDigitalIdsPage'))
const AdminMessagesPage = lazy(() => import('@/pages/admin/AdminMessagesPage'))

function Layout() {
  const { pathname } = useLocation()
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo(0, 0)
  }, [pathname])

  const fallback = <div style={{ padding: '48px 0' }}>Loading...</div>

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', paddingTop: '70px', overflow: 'hidden' }}>
      <SiteHeader />
      <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto' }}>
        <main>
          <Routes>
            <Route path="/" element={<Suspense fallback={fallback}><HomePage /></Suspense>} />
            <Route path="/about" element={<Suspense fallback={fallback}><AboutPage /></Suspense>} />
            <Route path="/contact" element={<Suspense fallback={fallback}><ContactPage /></Suspense>} />
            <Route path="/news" element={<Suspense fallback={fallback}><NewsPage /></Suspense>} />
            <Route path="/news/:slug" element={<Suspense fallback={fallback}><NewsDetailPage /></Suspense>} />
            <Route path="/events" element={<Suspense fallback={fallback}><EventsPage /></Suspense>} />
            <Route path="/events/:id" element={<Suspense fallback={fallback}><EventDetailPage /></Suspense>} />
            <Route path="/membership" element={<Suspense fallback={fallback}><MembershipPage /></Suspense>} />
            <Route path="/programs" element={<Suspense fallback={fallback}><ProgramsPage /></Suspense>} />
            <Route path="/projects" element={<Suspense fallback={fallback}><ProjectsPage /></Suspense>} />
            <Route path="/lodges" element={<Suspense fallback={fallback}><LodgesPage /></Suspense>} />
            <Route path="/leadership" element={<Suspense fallback={fallback}><LeadershipPage /></Suspense>} />
            <Route path="/gallery" element={<Suspense fallback={fallback}><GalleryPage /></Suspense>} />
            <Route path="/donate" element={<Suspense fallback={fallback}><DonatePage /></Suspense>} />
            <Route path="/faq" element={<Suspense fallback={fallback}><FaqPage /></Suspense>} />
            <Route path="/portal" element={<Suspense fallback={fallback}><PortalPage /></Suspense>} />
            <Route path="/digital-id" element={<Suspense fallback={fallback}><DigitalIdPage /></Suspense>} />
            <Route element={<PublicRoute />}>
              <Route path="/login" element={<Suspense fallback={fallback}><LoginPage /></Suspense>} />
            </Route>
            <Route element={<ProtectedRoute requireAdmin />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Suspense fallback={fallback}><AdminDashboard /></Suspense>} />
                <Route path="members" element={<Suspense fallback={fallback}><AdminMembersPage /></Suspense>} />
                <Route path="approvals" element={<Suspense fallback={fallback}><AdminApprovalsPage /></Suspense>} />
                <Route path="news" element={<Suspense fallback={fallback}><AdminNewsPage /></Suspense>} />
                <Route path="events" element={<Suspense fallback={fallback}><AdminEventsPage /></Suspense>} />
                <Route path="donations" element={<Suspense fallback={fallback}><AdminDonationsPage /></Suspense>} />
                <Route path="lodges" element={<Suspense fallback={fallback}><AdminLodgesPage /></Suspense>} />
                <Route path="gallery" element={<Suspense fallback={fallback}><AdminGalleryPage /></Suspense>} />
                <Route path="executives" element={<Suspense fallback={fallback}><AdminExecutivesPage /></Suspense>} />
                <Route path="webcontent" element={<Suspense fallback={fallback}><AdminWebContentPage /></Suspense>} />
                <Route path="digital-ids" element={<Suspense fallback={fallback}><AdminDigitalIdsPage /></Suspense>} />
                <Route path="messages" element={<Suspense fallback={fallback}><AdminMessagesPage /></Suspense>} />
              </Route>
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isFading, setIsFading] = useState(false)

  useEffect(() => {
    const fadeTimer = setTimeout(() => setIsFading(true), 2000)
    const unmountTimer = setTimeout(() => setIsLoading(false), 2500)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(unmountTimer)
    }
  }, [])

  return (
    <>
      {isLoading && <SplashScreen isFading={isFading} />}
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </>
  )
}
