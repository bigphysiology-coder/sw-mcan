import { useNavigate, Navigate } from 'react-router-dom'
import { ROUTES, APP_NAME } from '@/constants'
import { useAuthStore } from '@/store/authStore'

export default function WelcomePage() {
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuthStore()

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.HOME} replace />
  }

  return (
    <div
      style={{
        minHeight: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, var(--green-50) 0%, var(--surface-card) 50%, var(--gray-50) 100%)',
        padding: '80px 24px',
      } as React.CSSProperties}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '440px',
          overflow: 'hidden',
          borderRadius: 'var(--radius-section)',
          boxShadow: 'var(--shadow-lg)',
        } as React.CSSProperties}
      >
        <div
          style={{
            background: 'linear-gradient(135deg, var(--green-emerald), var(--green-primary))',
            color: '#fff',
            padding: '40px 28px 32px',
            textAlign: 'center',
          } as React.CSSProperties}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              margin: '0 auto 16px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            } as React.CSSProperties}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h1
            style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: '24px',
              margin: '0 0 6px',
            } as React.CSSProperties}
          >
            Account created!
          </h1>
          <p
            style={{
              margin: 0,
              fontSize: '15px',
              color: 'rgba(255,255,255,0.85)',
            } as React.CSSProperties}
          >
            Welcome to {APP_NAME}, {user?.firstName ?? 'Member'}.
          </p>
        </div>

        <div
          style={{
            background: 'var(--surface-card)',
            padding: '28px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          } as React.CSSProperties}
        >
          <p
            style={{
              margin: 0,
              fontSize: '14px',
              color: 'var(--text-body)',
              lineHeight: 1.7,
              textAlign: 'center',
            } as React.CSSProperties}
          >
            Your account is ready. You can now explore the portal — view events, connect with other members, request your digital ID, and more.
          </p>

          <button
            onClick={() => navigate(ROUTES.HOME, { replace: true })}
            style={{
              width: '100%',
              padding: '12px',
              background: 'var(--green-primary)',
              color: '#fff',
              border: 'none',
              borderRadius: 'var(--radius-button)',
              fontSize: '15px',
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
            } as React.CSSProperties}
          >
            Go to home
          </button>

          <button
            onClick={() => navigate(ROUTES.DIGITAL_ID, { replace: true })}
            style={{
              width: '100%',
              padding: '12px',
              background: 'transparent',
              color: 'var(--green-primary)',
              border: '1px solid var(--green-primary)',
              borderRadius: 'var(--radius-button)',
              fontSize: '15px',
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'var(--font-body)',
            } as React.CSSProperties}
          >
            Request Digital ID
          </button>
        </div>
      </div>
    </div>
  )
}

