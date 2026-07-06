interface LeaderCardProps {
  name: string;
  role: string;
  state: string;
  photo: string;
}

export function LeaderCard({ name, role, state, photo }: LeaderCardProps) {
  return (
    <div style={{
      background: 'var(--surface-card)', borderRadius: 'var(--radius-card)',
      boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-subtle)',
      overflow: 'hidden', display: 'flex', flexDirection: 'column',
    } as React.CSSProperties}>
      <div style={{ height: '220px', background: `center/cover no-repeat url(${photo})`, position: 'relative' } as React.CSSProperties}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11,19,14,0.6), rgba(11,19,14,0) 50%)' } as React.CSSProperties} />
      </div>
      <div style={{ padding: '16px 18px 18px', display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 } as React.CSSProperties}>
        <h3 style={{ margin: 0, fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '17px', color: 'var(--text-heading)', lineHeight: 1.2 } as React.CSSProperties}>
          {name}
        </h3>
        <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--green-primary)' } as React.CSSProperties}>{role}</div>
        <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: 'auto', paddingTop: '8px' } as React.CSSProperties}>{state}</div>
      </div>
    </div>
  );
}
