import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ROUTES } from '@/constants'
import { useAuthStore } from '@/store/authStore'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const navItems = [
  {
    label: 'Dashboard',
    path: ROUTES.ADMIN.DASHBOARD,
    icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
  },
  {
    label: 'Members',
    path: ROUTES.ADMIN.MEMBERS,
    icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
  },
  {
    label: 'Donors',
    path: '/admin/donors',
    icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.337 2.828.894M17.828 16.894C18.542 17.552 19 18.32 19 19.158V21a1 1 0 01-1 1h-4a1 1 0 01-1-1v-1.158c0-.838.458-1.606 1.172-2.264M12 14a3 3 0 00-3 3 3 3 0 006 0 3 3 0 00-3-3z',
  },
  {
    label: 'Programs',
    path: '/admin/programs',
    icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
  },
  {
    label: 'Lodge Units',
    path: '/admin/lodges',
    icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
  },
  {
    label: 'Projects',
    path: '/admin/projects',
    icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  },
  {
    label: 'News & Updates',
    path: ROUTES.ADMIN.NEWS,
    icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z',
  },
  {
    label: 'Messages',
    path: '/admin/messages',
    icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
  },
  {
    label: 'Settings',
    path: '/admin/settings',
    icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
  },
]

function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { logout } = useAuthStore()

  function isActive(p: string) {
    if (p === ROUTES.ADMIN.DASHBOARD) return pathname === p
    return pathname.startsWith(p)
  }

  const linkActiveStyle: React.CSSProperties = {
    background: 'linear-gradient(90deg, rgba(14,122,72,0.42), rgba(14,122,72,0.22))',
    color: '#fff',
    border: '1px solid rgba(255,255,255,0.1)',
    boxShadow: '0 8px 18px rgba(0,0,0,0.16)',
  }

  const linkInactiveStyle: React.CSSProperties = {
    color: 'rgba(255,255,255,0.72)',
  }

  const sidebarContent = (
    <div style={{
      display: 'flex', height: '100%', flexDirection: 'column',
      background: 'var(--navy-800)', width: '256px',
    } as React.CSSProperties}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: '12px',
        borderBottom: '1px solid rgba(255,255,255,0.12)',
        padding: '24px 20px',
      } as React.CSSProperties}>
        <img src="/photos/logo-mcan.png" alt="MCAN Southwest"
             style={{ height: '40px', width: '40px', borderRadius: '50%', background: '#fff', padding: '4px', objectFit: 'contain' } as React.CSSProperties} />
        <div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '16px', color: '#fff' } as React.CSSProperties}>MCAN Admin</div>
          <div style={{ fontSize: '12px', color: 'var(--gold-300)' } as React.CSSProperties}>Southwest Zone</div>
        </div>
      </div>

      <div style={{ padding: '16px 16px 8px', color: 'rgba(255,255,255,0.78)', fontSize: '11px', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase' } as React.CSSProperties}>Executive Menu</div>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: '5px', padding: '0 12px 16px' } as React.CSSProperties}>
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={onClose}
            style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              borderRadius: '10px', padding: '11px 13px',
              fontSize: '14px', fontWeight: 600, textDecoration: 'none',
              transition: 'all var(--dur-fast) var(--ease-standard)',
              ...(isActive(item.path) ? linkActiveStyle : linkInactiveStyle),
            } as React.CSSProperties}
            onMouseEnter={(e) => {
              if (!isActive(item.path)) {
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                e.currentTarget.style.color = '#fff'
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive(item.path)) {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = 'rgba(255,255,255,0.6)'
              }
            }}
          >
            <svg style={{ height: '20px', width: '20px', flexShrink: 0 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
            </svg>
            {item.label}
          </Link>
        ))}
      </nav>

      <div style={{
        marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.1)', padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px',
      } as React.CSSProperties}>
        <Link
          to={ROUTES.HOME}
          onClick={onClose}
          style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            borderRadius: '10px', padding: '12px 14px',
            fontSize: '14px', fontWeight: 600, textDecoration: 'none',
            color: 'rgba(255,255,255,0.6)',
            transition: 'all var(--dur-fast) var(--ease-standard)',
          } as React.CSSProperties}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
            e.currentTarget.style.color = '#fff'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = 'rgba(255,255,255,0.6)'
          }}
        >
          <svg style={{ height: '20px', width: '20px', flexShrink: 0 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Site
        </Link>
        <button
          onClick={() => {
            logout()
            navigate(ROUTES.LOGIN)
            onClose()
          }}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            borderRadius: '10px', padding: '12px 14px', border: '1px solid rgba(255,255,255,0.12)',
            fontSize: '14px', fontWeight: 600, color: '#fff', background: 'rgba(14,122,72,0.18)', cursor: 'pointer',
          } as React.CSSProperties}
        >
          <svg style={{ height: '18px', width: '18px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
          </svg>
          Logout
        </button>
      </div>
    </div>
  )

  return (
    <>
      <aside style={{ display: 'none', height: '100vh' } as React.CSSProperties} className="lg:block">{sidebarContent}</aside>

      {isOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 40 } as React.CSSProperties} className="lg:hidden">
          <div style={{
            position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)',
          } as React.CSSProperties} onClick={onClose} />
          <aside style={{
            position: 'absolute', left: 0, top: 0, height: '100%',
          } as React.CSSProperties}>{sidebarContent}</aside>
        </div>
      )}
    </>
  )
}

export { Sidebar }
