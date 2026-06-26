import type { ReactNode } from 'react';

interface StatCardProps {
  value: ReactNode;
  label: string;
  light?: boolean;
}

export function StatCard({ value, label, light }: StatCardProps) {
  return (
    <div>
      <div style={{
        fontFamily: 'var(--font-heading)', fontWeight: 800,
        fontSize: 'clamp(32px, 3.6vw, 44px)', lineHeight: 1,
        color: light ? '#fff' : 'var(--text-heading)',
      }}>
        {value}
      </div>
      <div style={{
        fontSize: '14px', marginTop: '5px',
        color: light ? '#fff' : 'var(--text-muted)',
      }}>
        {label}
      </div>
    </div>
  );
}
