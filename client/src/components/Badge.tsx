import type { ReactNode } from 'react';

interface BadgeProps {
  tone?: 'green' | 'gold' | 'neutral' | 'red';
  solid?: boolean;
  children: ReactNode;
}

const tones: Record<string, { bg: string; fg: string }> = {
  green: { bg: 'var(--green-50)', fg: 'var(--green-700)' },
  gold: { bg: 'var(--gold-100)', fg: 'var(--gold-600)' },
  neutral: { bg: 'var(--gray-100)', fg: 'var(--gray-600)' },
  red: { bg: '#FBEAE8', fg: '#9B2C20' },
};

export function Badge({ tone = 'green', solid, children }: BadgeProps) {
  const t = tones[tone];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap',
      padding: '5px 12px', borderRadius: 'var(--radius-pill)',
      fontFamily: 'var(--font-body)', fontSize: '12.5px', fontWeight: 700,
      background: solid ? t.fg : t.bg,
      color: solid ? '#fff' : t.fg,
    }}>
      {children}
    </span>
  );
}
