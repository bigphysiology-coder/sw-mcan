import { useState, type FormEvent } from 'react';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Button } from '@/components/ui/Button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/features/auth/hooks/useAuth';

export default function Portal() {
  const { login, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const inputStyle: React.CSSProperties = {
    fontFamily: 'var(--font-body)', fontSize: '15px', padding: '13px 15px',
    borderRadius: 'var(--radius-button)', border: '1.5px solid var(--border-default)',
    background: 'var(--white)', color: 'var(--text-heading)', outline: 'none', width: '100%',
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password');
      return;
    }
    try {
      await login({ email: email.trim(), password });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Invalid credentials');
    }
  }

  return (
    <div>
      <section style={{ background: 'linear-gradient(135deg, var(--green-emerald), var(--navy-800))', color: '#fff' }}>
        <div className="container" style={{ padding: '76px var(--container-pad)', textAlign: 'center' }}>
          <Eyebrow tone="light">Executive portal</Eyebrow>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(34px, 4.5vw, 52px)', lineHeight: 1.08, letterSpacing: '-0.02em', margin: '16px 0 16px' }}>
            Zonal executive dashboard
          </h1>
          <p style={{ fontSize: '18px', lineHeight: 1.6, color: 'rgba(255,255,255,0.85)', maxWidth: '520px', margin: '0 auto' }}>
            Secure access for MCAN Southwest executives. Manage members, programs and chapter data.
          </p>
        </div>
      </section>

      <section className="container" style={{ padding: '80px var(--container-pad) 120px', display: 'flex', justifyContent: 'center' }}>
        <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '420px', background: 'var(--surface-card)', borderRadius: 'var(--radius-section)', padding: '36px', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div style={{ textAlign: 'center', marginBottom: '4px' }}>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '22px', color: 'var(--text-heading)' }}>Sign in</div>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: '6px 0 0' }}>Use your executive credentials</p>
          </div>
          {error && (
            <div style={{
              padding: '12px', borderRadius: 'var(--radius-button)', border: '1px solid #F5C6CB',
              background: '#F8D7DA', fontSize: '14px', color: '#721C24', textAlign: 'center',
            }}>
              {error}
            </div>
          )}
          <input
            style={inputStyle}
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            style={inputStyle}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="primary" size="lg" fullWidth type="submit" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', textAlign: 'center', margin: 0 }}>
            Having trouble? <Link to="/contact" style={{ color: 'var(--green-primary)', fontWeight: 600 }}>Contact the secretariat</Link>
          </p>
        </form>
      </section>
    </div>
  );
}
