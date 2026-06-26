import type { ReactNode } from 'react';

interface EyebrowProps {
  tone?: 'dark' | 'light' | 'green';
  children: ReactNode;
}

export function Eyebrow({ tone = 'dark', children }: EyebrowProps) {
  return (
    <div style={{
      fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '13px',
      letterSpacing: '0.12em', textTransform: 'uppercase',
      color: tone === 'light' ? '#fff' : tone === 'green' ? 'var(--green-primary)' : 'var(--gold-500)',
      marginBottom: '0',
    }}>
      {children}
    </div>
  );
}
