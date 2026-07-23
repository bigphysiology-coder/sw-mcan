import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { useModalEntrance } from '@/hooks/useModalEntrance';

interface JoinModalProps {
  onClose: () => void;
}

export function JoinModal({ onClose }: JoinModalProps) {
  const navigate = useNavigate();
  const overlayRef = useModalEntrance();
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', state: 'Lagos' });
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
            Join MCAN Southwest
          </h3>
          <p style={{ margin: 0, fontSize: '14px', color: 'rgba(255,255,255,0.82)' }}>
            Register in under a minute — connect the day you arrive.
          </p>
        </div>

        <div style={{ padding: '26px 28px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {field('First name', <input style={inputStyle} value={form.firstName} onChange={set('firstName')} placeholder="e.g. Aisha" />)}
          {field('Last name', <input style={inputStyle} value={form.lastName} onChange={set('lastName')} placeholder="e.g. Bello" />)}
          {field('Email address', <input style={inputStyle} type="email" value={form.email} onChange={set('email')} placeholder="you@example.com" />)}
          {field('State of deployment', (
            <select style={inputStyle} value={form.state} onChange={set('state')}>
              {['Lagos', 'Ogun', 'Oyo', 'Osun', 'Ondo', 'Ekiti'].map((s) => <option key={s}>{s}</option>)}
            </select>
          ))}
        </div>

        <div style={{ padding: '0 28px 26px', display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={() => {
            onClose();
            navigate('/signup');
          }}>
            Create Account
          </Button>
        </div>
      </div>
    </div>
  );
}
