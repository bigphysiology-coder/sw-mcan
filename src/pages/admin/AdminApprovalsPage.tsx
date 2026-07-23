import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { ApprovalQueue } from '@/features/admin/approvals/ApprovalQueue'
import { Button } from '@/components/ui/Button'
import { useMembers } from '@/features/members/hooks/useMembers'

const tabs = ['All', 'Pending', 'Approved', 'Rejected'] as const
type Tab = typeof tabs[number]

export default function AdminApprovalsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('Pending')
  const { members, isLoading } = useMembers()
  const queryClient = useQueryClient()

  const handleUpdate = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['members'] })
  }, [queryClient])

  const filteredMembers = members.filter((m) => {
    if (activeTab === 'All') return true
    return m.status === activeTab.toLowerCase()
  })

  const pendingCount = members.filter((m) => m.status === 'pending').length

  return (
    <div>
      <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' } as React.CSSProperties}>
        <div>
          <h1 style={{
            fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 700,
            color: 'var(--text-heading)', margin: 0
          } as React.CSSProperties}>Approvals</h1>
          <p style={{
            marginTop: '4px', fontSize: '14px', color: 'var(--text-muted)'
          } as React.CSSProperties}>
            Pending:{' '}
            <span style={{
              display: 'inline-flex', alignItems: 'center',
              borderRadius: '9999px', background: 'var(--amber-500)',
              padding: '2px 8px', fontSize: '12px', fontWeight: 700,
              color: '#fff'
            } as React.CSSProperties}>
              {pendingCount}
            </span>
          </p>
        </div>
        <Link to="/admin/members" style={{
          display: 'inline-flex', alignItems: 'center', gap: '6px',
          padding: '8px 16px', background: '#1a4731', color: '#fff',
          fontSize: '14px', fontWeight: 600, border: 'none', borderRadius: '8px',
          cursor: 'pointer', fontFamily: 'inherit', textDecoration: 'none',
        }}>
          <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
          View all members
        </Link>
      </div>

      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px'
      } as React.CSSProperties}>
        {tabs.map((tab) => (
          <Button
            key={tab}
            variant={activeTab === tab ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setActiveTab(tab)}
          >
            {tab}
            {tab === 'Pending' && (
              <span style={{
                marginLeft: '4px', display: 'inline-flex',
                height: '20px', width: '20px',
                alignItems: 'center', justifyContent: 'center',
                borderRadius: '50%', background: 'rgba(255,255,255,0.2)',
                fontSize: '12px', fontWeight: 700
              } as React.CSSProperties}>
                {pendingCount}
              </span>
            )}
          </Button>
        ))}
      </div>

      {isLoading ? (
        <div style={{
          borderRadius: 'var(--radius-card)',
          border: '1px solid var(--border-subtle)',
          background: 'var(--surface-card)',
          padding: '32px', textAlign: 'center',
          color: 'var(--text-muted)'
        } as React.CSSProperties}>
          Loading...
        </div>
      ) : (
        <ApprovalQueue members={filteredMembers} onUpdate={handleUpdate} />
      )}
    </div>
  )
}
