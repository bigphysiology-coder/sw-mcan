import { useState } from 'react'
import { IdCardRequest } from '@/features/digital-id/components/IdCardRequest'

export default function DigitalIdPage() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <>
      <section style={{
        background: 'linear-gradient(135deg, var(--green-primary) 0%, var(--green-emerald) 50%, var(--green-800) 100%)',
        padding: '96px 24px',
        color: 'var(--white)'
      } as React.CSSProperties}>
        <div className="container">
          <p style={{
            marginBottom: '12px',
            fontSize: '13px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            color: 'var(--gold-300)',
            fontFamily: 'var(--font-body)'
          } as React.CSSProperties}>Identity</p>
          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '36px',
            fontWeight: 800,
            color: 'var(--white)',
            margin: 0
          } as React.CSSProperties}>MCAN Southwest ID</h1>
          <p style={{
            marginTop: '16px',
            maxWidth: '576px',
            fontSize: '18px',
            color: 'rgba(255,255,255,0.85)',
            fontFamily: 'var(--font-body)',
            lineHeight: 1.6
          } as React.CSSProperties}>
            Your official MCAN Southwest identity card for identification and member benefits.
          </p>
        </div>
      </section>

      <section style={{
        background: 'var(--surface-page)',
        padding: '64px 0'
      } as React.CSSProperties}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' } as React.CSSProperties}>
          {submitted ? (
            <div style={{
              maxWidth: '448px',
              borderRadius: 'var(--radius-card)',
              border: '1px solid var(--green-300)',
              background: 'var(--green-50)',
              padding: '32px',
              textAlign: 'center'
            } as React.CSSProperties}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' } as React.CSSProperties}>
                <svg style={{ width: '48px', height: '48px', color: 'var(--green-primary)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '20px', fontWeight: 700,
                color: 'var(--green-800)', margin: 0
              } as React.CSSProperties}>Request Submitted</h2>
              <p style={{ marginTop: '12px', fontSize: '14px', color: 'var(--green-700)', fontFamily: 'var(--font-body)', lineHeight: 1.6 } as React.CSSProperties}>
                Your MCAN Southwest ID request has been received. The executive team will review and process it. Your printed ID card will be issued once approved.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                style={{
                  marginTop: '20px',
                  fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
                  padding: '10px 24px', borderRadius: 'var(--radius-pill)',
                  border: '1px solid var(--green-primary)',
                  background: 'transparent', color: 'var(--green-primary)',
                }}
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <IdCardRequest onSuccess={() => setSubmitted(true)} />
          )}

          <div style={{ margin: '64px auto 0', maxWidth: '672px' } as React.CSSProperties}>
            <div style={{
              borderRadius: 'var(--radius-section)',
              border: '1px solid var(--border-subtle)',
              background: 'var(--surface-card)',
              padding: '32px',
              boxShadow: 'var(--shadow-sm)'
            } as React.CSSProperties}>
              <h3 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '20px', fontWeight: 700,
                color: 'var(--text-heading)',
                marginBottom: '16px', marginTop: 0
              } as React.CSSProperties}>What is the MCAN Southwest ID?</h3>
              <div style={{
                display: 'flex', flexDirection: 'column', gap: '12px',
                fontSize: '14px', lineHeight: 1.7, color: 'var(--text-body)',
                fontFamily: 'var(--font-body)'
              } as React.CSSProperties}>
                <p style={{ margin: 0 }}>
                  The MCAN Southwest ID is your official identity card as a registered member of the association.
                  It serves as proof of membership and grants you access to member-exclusive benefits.
                </p>
                <ul style={{
                  display: 'flex', flexDirection: 'column', gap: '8px',
                  margin: 0, padding: 0, listStyle: 'none'
                } as React.CSSProperties}>
                  {[
                    'Official identification at MCAN events and activities',
                    'Access to welfare and support programmes',
                    'Digital verification of your membership status',
                    'Easy sharing via mobile device',
                  ].map((text) => (
                    <li key={text} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                      <svg style={{ marginTop: '2px', width: '16px', height: '16px', flexShrink: 0, color: 'var(--green-primary)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
