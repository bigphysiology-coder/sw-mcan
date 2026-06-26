import { useState } from 'react';
import { Badge } from './Badge';

interface ProgramCardProps {
  badge: string;
  badgeTone?: 'green' | 'gold' | 'neutral';
  image: string;
  meta: string;
  title: string;
  description: string;
  onClick?: () => void;
}

export function ProgramCard({ badge, badgeTone = 'neutral', image, meta, title, description, onClick }: ProgramCardProps) {
  const [hover, setHover] = useState(false);
  return (
    <article
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: 'var(--surface-card)', borderRadius: 'var(--radius-card)', overflow: 'hidden',
        boxShadow: hover ? 'var(--shadow-lg)' : 'var(--shadow-sm)', border: '1px solid var(--border-subtle)',
        cursor: onClick ? 'pointer' : undefined,
        transform: hover ? 'translateY(-4px)' : 'none',
        transition: 'transform var(--dur-base) var(--ease-standard), box-shadow var(--dur-base) var(--ease-standard)',
        display: 'flex', flexDirection: 'column',
      }}
    >
      <div style={{ position: 'relative', height: '190px', background: `center/cover no-repeat url(${image})` }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11,19,14,0.55), rgba(11,19,14,0) 55%)' }} />
        <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
          <Badge tone={badgeTone}>{badge}</Badge>
        </div>
      </div>
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
        <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--gold-500)', letterSpacing: '0.04em' }}>{meta}</div>
        <h3 style={{ margin: 0, fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '19px', lineHeight: 1.25, color: 'var(--text-heading)' }}>
          {title}
        </h3>
        <p style={{ margin: 0, fontSize: '14.5px', lineHeight: 1.6, color: 'var(--text-body)', flex: 1 }}>{description}</p>
      </div>
    </article>
  );
}
