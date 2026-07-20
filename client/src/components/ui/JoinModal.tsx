import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { useModalEntrance } from '@/hooks/useModalEntrance';
import { useMembers } from '@/features/members/hooks/useMembers';

interface JoinModalProps {
  onClose: () => void;
}

export function JoinModal({ onClose }: JoinModalProps) {
  const overlayRef = useModalEntrance();
  const { createMember, isCreating } = useMembers();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', state: 'Lagos', code: '' });
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const inputStyle: React.CSSProperties = {
    fontFamily: 'var(--font-body)', fontSize: '15px', padding: '12px 14px',
    borderRadius: 'var(--radius-button)', border: '1.5px solid var(--border-default)',
    background: 'var(--white)', color: 'var(--text-heading)', outline: 'none', width: '100%',
  };

  const field = (label: string, node: React.ReactNode) => (
    <label style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-heading)' }}>{label}</span>
      {node}
    </label>
  );

  return (
    <div ref={overlayRef} onClick={onClose} className="modal-overlay" style={{
      position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(13,36,24,0.55)',
      backdropFilter: 'blur(3px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px',
    }}>
      <div onClick={(e) => e.stopPropagation()} className="modal-card" style={{
        width: '100%', maxWidth: '460px', background: 'var(--surface-card)', borderRadius: 'var(--radius-section)',
        boxShadow: 'var(--shadow-lg)', overflow: 'hidden',
      }}>
        <div style={{ background: 'linear-gradient(135deg, var(--green-emerald), var(--green-primary))', color: '#fff', padding: '26px 28px' }}>
          <Eyebrow tone="light">Membership</Eyebrow>
          <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '24px', margin: '8px 0 4px' }}>
            {step === 1 ? 'Join MCAN Southwest' : step === 2 ? 'You\u2019re almost there' : 'Registration received'}
          </h3>
          <p style={{ margin: 0, fontSize: '14px', color: 'rgba(255,255,255,0.82)' }}>
            {step === 1 ? 'Register in under a minute — connect the day you arrive.' : step === 2 ? 'Confirm your service details to finish.' : 'Jazakumullahu khayran!'}
          </p>
        </div>

        <div style={{ padding: '26px 28px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {step === 1 ? (
            <>
              {field('First name', <input style={inputStyle} value={form.firstName} onChange={set('firstName')} placeholder="e.g. Aisha" />)}
              {field('Last name', <input style={inputStyle} value={form.lastName} onChange={set('lastName')} placeholder="e.g. Bello" />)}
              {field('Email address', <input style={inputStyle} type="email" value={form.email} onChange={set('email')} placeholder="you@example.com" />)}
              {field('State of deployment', (
                <select style={inputStyle} value={form.state} onChange={set('state')}>
                  {['Lagos', 'Ogun', 'Oyo', 'Osun', 'Ondo', 'Ekiti'].map((s) => <option key={s}>{s}</option>)}
                </select>
              ))}
            </>
          ) : step === 2 ? (
            <>
              {field('NYSC call-up number', <input style={inputStyle} value={form.code} onChange={set('code')} placeholder="SW/24A/1234" />)}
              {submitError && (
                <div style={{ background: '#FEF2F2', borderRadius: 'var(--radius-card)', padding: '12px 16px', fontSize: '13px', color: '#B91C1C', lineHeight: 1.5 }}>
                  {submitError}
                </div>
              )}
              <div style={{ background: 'var(--green-50)', borderRadius: 'var(--radius-card)', padding: '14px 16px', fontSize: '14px', color: 'var(--green-700)', lineHeight: 1.5 }}>
                Welcome, {form.firstName || 'corps member'}. Your {form.state} State chapter will reach out within 48 hours, insha&rsquo;Allah.
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '6px 0 0' }}>
              <div style={{ width: '64px', height: '64px', margin: '0 auto 16px', borderRadius: '50%', background: 'var(--green-50)', color: 'var(--green-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '30px', fontFamily: 'var(--font-heading)', fontWeight: 700 }}>
                &#10003;
              </div>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '20px', color: 'var(--text-heading)', margin: '0 0 8px' }}>Registration received</h4>
              <p style={{ margin: '0 0 18px', fontSize: '15px', color: 'var(--text-body)', lineHeight: 1.6 }}>
                Jazakumullahu khayran, {form.firstName || 'corps member'}. Your final step: join the community on WhatsApp to connect right away.
              </p>
              <a href="#" target="_blank" rel="noopener noreferrer" style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', textDecoration: 'none',
                background: '#1FA855', color: '#fff', borderRadius: 'var(--radius-button)', padding: '14px 20px',
                fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '16px', boxShadow: '0 10px 24px rgba(31,168,85,0.28)',
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35zM12 2A10 10 0 0 0 3.5 17.2L2 22l4.9-1.28A10 10 0 1 0 12 2zm0 18.2c-1.5 0-2.96-.4-4.24-1.16l-.3-.18-2.9.76.77-2.83-.2-.31A8.2 8.2 0 1 1 12 20.2z" /></svg>
                Join the WhatsApp group
              </a>
              <p style={{ margin: '12px 0 0', fontSize: '13px', color: 'var(--text-muted)' }}>Program updates, lodge info and your state chapter — all in one place.</p>
            </div>
          )}
        </div>

        <div style={{ padding: '0 28px 26px', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          {step < 3 ? (
            <>
              <Button variant="ghost" onClick={onClose}>Cancel</Button>
              <Button
                onClick={async () => {
                  if (step === 1) { setStep(2); return }
                  setSubmitError(null)
                  try {
                    await createMember({
                      firstName: form.firstName,
                      lastName: form.lastName,
                      email: form.email,
                      state: form.state,
                    })
                    setStep(3)
                  } catch {
                    setSubmitError('Something went wrong. Please try again.')
                  }
                }}
                disabled={step === 2 && isCreating}
              >
                {step === 1 ? 'Continue' : isCreating ? 'Submitting...' : 'Submit'}
              </Button>
            </>
          ) : (
            <Button variant="secondary" fullWidth onClick={onClose}>Done for now</Button>
          )}
        </div>
      </div>
    </div>
  );
}
