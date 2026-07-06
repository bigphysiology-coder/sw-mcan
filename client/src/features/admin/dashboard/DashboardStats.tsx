interface StatCard {
  label: string
  value: string
  change: string
  icon: React.ReactNode
  iconBg: string
  iconColor: string
}

const stats: StatCard[] = [
  {
    label: 'Total Members',
    value: '1,284',
    change: '+12% this month',
    icon: (
      <svg style={{ height: '24px', width: '24px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    iconBg: 'rgba(14, 122, 72, 0.1)',
    iconColor: 'var(--green-primary)',
  },
  {
    label: 'Pending Approvals',
    value: '23',
    change: '+5 new today',
    icon: (
      <svg style={{ height: '24px', width: '24px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    iconBg: 'rgba(212, 160, 23, 0.15)',
    iconColor: 'var(--gold-600)',
  },
  {
    label: 'News Published',
    value: '47',
    change: '+3 this week',
    icon: (
      <svg style={{ height: '24px', width: '24px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>
    ),
    iconBg: 'rgba(14, 122, 72, 0.1)',
    iconColor: 'var(--green-primary)',
  },
  {
    label: 'Upcoming Events',
    value: '8',
    change: 'Next: Dec 15',
    icon: (
      <svg style={{ height: '24px', width: '24px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    iconBg: 'rgba(14, 122, 72, 0.1)',
    iconColor: 'var(--green-primary)',
  },
]

function DashboardStats() {
  return (
    <div style={{
      display: 'grid', gap: '16px',
      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    } as React.CSSProperties}>
      {stats.map((stat) => (
        <div
          key={stat.label}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            borderRadius: 'var(--radius-card)',
            border: '1px solid var(--border-subtle)',
            background: 'var(--surface-card)',
            padding: '20px', boxShadow: 'var(--shadow-sm)',
          } as React.CSSProperties}
        >
          <div>
            <p style={{ fontSize: '14px', color: 'var(--text-muted)', margin: 0 }}>{stat.label}</p>
            <p style={{
              fontFamily: 'var(--font-heading)', fontSize: '30px', fontWeight: 700,
              color: 'var(--text-heading)', margin: 0,
            } as React.CSSProperties}>{stat.value}</p>
            <p style={{
              marginTop: '2px', fontSize: '12px', color: 'var(--green-primary)', margin: '2px 0 0 0',
            } as React.CSSProperties}>{stat.change}</p>
          </div>
          <div style={{
            display: 'flex', height: '48px', width: '48px',
            flexShrink: 0, alignItems: 'center', justifyContent: 'center',
            borderRadius: '50%', background: stat.iconBg, color: stat.iconColor,
          } as React.CSSProperties}>
            {stat.icon}
          </div>
        </div>
      ))}
    </div>
  )
}

export { DashboardStats }
