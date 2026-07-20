import { useState, useEffect } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { ROUTES } from '@/constants'

const navItems = [
  { label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', path: ROUTES.ADMIN.DASHBOARD, pages: ['dashboard'] },
  { label: 'News & updates', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', path: ROUTES.ADMIN.NEWS, pages: ['news'] },
  { label: 'Events', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', path: ROUTES.ADMIN.EVENTS, pages: ['events'] },
  { label: 'Donations', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', path: '/admin/donations', pages: ['donations'] },
  { label: 'Lodges', icon: 'M3 21h18M3 7l9-4 9 4M4 11v10M20 11v10M8 11v4m4-4v4m4-4v4', path: '/admin/lodges', pages: ['lodges'] },
  { label: 'Gallery', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z', path: '/admin/gallery', pages: ['gallery'] },
  { label: 'Executives', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z', path: '/admin/executives', pages: ['executives'] },
  { label: 'Membership', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z', path: ROUTES.ADMIN.MEMBERS, pages: ['members', 'membership'] },
  { label: 'MCAN Southwest IDs', icon: 'M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a3 3 0 006 0m-3 0a1 1 0 10-2 0m2 0a1 1 0 10-2 0m-1-4h.01M12 12h.01M16 12h.01M16 8h.01', path: '/admin/digital-ids', pages: ['digital-ids'] },
  { label: 'Web content', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z', path: '/admin/webcontent', pages: ['webcontent'] },
]

function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)
  const { user, logout } = useAuthStore()
  const { pathname } = useLocation()

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      if (!mobile) setMobileOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const currentPage = pathname.split('/')[2] || 'dashboard'
  const isActive = (pages: string[]) => pages.some(p => pathname.includes(p))

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB', fontFamily: "'Inter', system-ui, sans-serif", display: 'flex', flexDirection: 'column' }}>
      {/* Admin bar */}
      <div style={{ background: 'var(--admin-brand-dark)', padding: isMobile ? '10px 0' : '16px 0' }}>
        <div className="max-w-screen-xl mx-auto" style={{ color: '#fff', fontSize: isMobile ? '14px' : '15px', paddingLeft: isMobile ? '16px' : '64px', paddingRight: isMobile ? '16px' : '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '6px' : '8px', minWidth: 0 }}>
            {isMobile && (
              <button
                onClick={() => setMobileOpen(prev => !prev)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'none', border: 'none', color: '#fff', cursor: 'pointer',
                  padding: '2px', flexShrink: 0,
                }}
                aria-label="Toggle navigation sidebar"
              >
                <svg style={{ width: '22px', height: '22px' }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  {mobileOpen
                    ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  }
                </svg>
              </button>
            )}
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ADE80', display: 'inline-block', flexShrink: 0 }} />
            <span style={{ fontWeight: 700, whiteSpace: 'nowrap' }}>Executive Portal</span>
            {!isMobile && <span style={{ color: '#9CA3AF', fontSize: '12px' }}>Internal &middot; admin access</span>}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '6px' : '12px', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '4px' : '8px' }}>
              <div style={{ width: isMobile ? '24px' : '28px', height: isMobile ? '24px' : '28px', borderRadius: '50%', background: '#0E7A48', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: isMobile ? '10px' : '11px', fontWeight: 700 }}>
                AD
              </div>
              {!isMobile && <span style={{ fontWeight: 500 }}>{user?.firstName || 'Admin'}</span>}
            </div>
            {isMobile ? (
              <button onClick={logout} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: '4px' }}>
                <svg style={{ width: '18px', height: '18px' }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
              </button>
            ) : (
              <button onClick={logout} style={{ display: 'flex', alignItems: 'center', gap: '6px', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '8px', padding: '4px 12px', fontSize: '13px', fontWeight: 700, background: 'transparent', color: '#fff', cursor: 'pointer', transform: 'none', boxShadow: 'none' }}>
                <svg style={{ width: '14px', height: '14px' }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                Exit
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main layout */}
      <div style={{
        maxWidth: '1280px', margin: '0 auto',
        padding: isMobile ? '16px' : '24px 64px',
        display: 'flex', gap: isMobile ? '0' : '32px',
        flex: 1, width: '100%',
      }}>
        {/* Backdrop overlay for mobile */}
        {isMobile && mobileOpen && (
          <div
            onClick={() => setMobileOpen(false)}
            style={{
              position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
              zIndex: 40,
            }}
          />
        )}

        {/* Sidebar */}
        <aside style={
          isMobile
            ? {
                position: 'fixed', top: 0, left: 0, bottom: 0, width: '260px',
                zIndex: 50, background: '#F9FAFB', padding: '20px 0 20px 12px',
                transform: mobileOpen ? 'translateX(0)' : 'translateX(-100%)',
                transition: 'transform 280ms cubic-bezier(0.22, 0.61, 0.36, 1)',
                overflowY: 'auto',
              }
            : { width: '200px', flexShrink: 0 }
        }>
          <nav style={{
            background: '#fff', borderRadius: '12px', border: '1px solid #E5E7EB',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)', padding: '8px',
            display: 'flex', flexDirection: 'column', gap: '4px',
            position: isMobile ? 'static' : 'sticky', top: '100px',
          }}>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 16px',
                  borderRadius: '8px', fontSize: '14px', fontWeight: 500, textDecoration: 'none',
                  background: isActive(item.pages) ? 'var(--admin-brand-light)' : 'transparent',
                  color: isActive(item.pages) ? 'var(--admin-brand)' : '#6B7280',
                  transition: 'all 140ms cubic-bezier(0.22, 0.61, 0.36, 1)',
                }}
                onMouseEnter={(e) => { if (!isActive(item.pages)) { e.currentTarget.style.background = '#F3F4F6'; e.currentTarget.style.color = '#374151'; } }}
                onMouseLeave={(e) => { if (!isActive(item.pages)) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#6B7280'; } }}
              >
                <svg style={{ width: '16px', height: '16px', flexShrink: 0 }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                </svg>
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Content */}
        <main style={{ flex: 1, minWidth: 0 }}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export { AdminLayout }
