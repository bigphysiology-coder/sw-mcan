import { RegisterForm } from '@/features/auth/components/RegisterForm'
import { Link } from 'react-router-dom'
import { ROUTES, APP_NAME } from '@/constants'

export default function SignupPage() {
  return (
    <div style={{
      minHeight: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, var(--green-50) 0%, var(--surface-card) 50%, var(--gray-50) 100%)',
      padding: '80px 24px'
    } as React.CSSProperties}>
      <div style={{
        width: '100%',
        maxWidth: '420px',
        background: 'var(--white)',
        borderRadius: 'var(--radius-card)',
        boxShadow: 'var(--shadow-lg)',
        padding: '40px 32px',
        border: '1px solid var(--border-subtle)'
      } as React.CSSProperties}>
        <div style={{ marginBottom: '24px', textAlign: 'center' as const }}>
          <div style={{
            margin: '0 auto 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '56px',
            height: '56px',
            borderRadius: 'var(--radius-button)',
            background: 'var(--green-50)'
          } as React.CSSProperties}>
            <svg style={{ width: '28px', height: '28px', color: 'var(--green-primary)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '24px',
            fontWeight: 700,
            color: 'var(--text-heading)',
            marginBottom: '8px',
            textAlign: 'center' as const
          } as React.CSSProperties}>Create Account</h1>
          <p style={{
            marginTop: '4px',
            fontSize: '14px',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-body)'
          } as React.CSSProperties}>Join the {APP_NAME} community</p>
        </div>
        <RegisterForm />
        <p style={{
          marginTop: '24px',
          textAlign: 'center' as const,
          fontSize: '14px',
          color: 'var(--text-muted)',
          fontFamily: 'var(--font-body)'
        } as React.CSSProperties}>
          Already have an account?{' '}
          <Link to={ROUTES.LOGIN} style={{ fontWeight: 600, color: 'var(--green-primary)', textDecoration: 'underline' }}>Sign in</Link>
        </p>
      </div>
    </div>
  )
}
