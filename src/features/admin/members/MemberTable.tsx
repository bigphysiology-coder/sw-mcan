import { useState } from 'react'
import { Badge } from '@/components/ui/Badge'
import { useMembers } from '@/features/members/hooks/useMembers'
import type { Member } from '@/types'

const statusFilters = ['All', 'Active', 'Pending', 'Inactive', 'Completed'] as const
type StatusFilter = (typeof statusFilters)[number]

const statusBadgeVariant: Record<string, 'green' | 'gold' | 'neutral'> = {
  active: 'green',
  pending: 'gold',
  inactive: 'neutral',
  completed: 'neutral',
}

function MemberTable() {
  const { members, isLoading } = useMembers()
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState<StatusFilter>('All')

  const filtered = members.filter((m) => {
    const matchesSearch =
      !search ||
      `${m.firstName} ${m.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase())
    const matchesFilter = activeFilter === 'All' || m.status === activeFilter.toLowerCase()
    return matchesSearch && matchesFilter
  })

  const inputStyle: React.CSSProperties = {
    fontFamily: 'var(--font-body)', fontSize: '14px', padding: '10px 16px',
    borderRadius: 'var(--radius-button)', border: '1px solid var(--border-default)',
    background: 'var(--white)', color: 'var(--text-heading)', outline: 'none', width: '100%',
    maxWidth: '320px', boxSizing: 'border-box',
  }

  const filterBtnActive: React.CSSProperties = {
    background: 'var(--green-primary)', color: '#fff', border: 'none',
    borderRadius: '9999px', padding: '6px 12px', fontSize: '12px', fontWeight: 700,
    cursor: 'pointer', fontFamily: 'var(--font-body)',
    transition: 'all var(--dur-fast) var(--ease-standard)',
  }

  const filterBtnInactive: React.CSSProperties = {
    background: 'var(--gray-100)', color: 'var(--text-muted)', border: 'none',
    borderRadius: '9999px', padding: '6px 12px', fontSize: '12px', fontWeight: 700,
    cursor: 'pointer', fontFamily: 'var(--font-body)',
    transition: 'all var(--dur-fast) var(--ease-standard)',
  }

  const cellStyle: React.CSSProperties = {
    padding: '12px 16px',
  }

  const thStyle: React.CSSProperties = {
    ...cellStyle,
    fontFamily: 'var(--font-heading)', fontSize: '12px', fontWeight: 700,
    color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em',
    background: 'var(--gray-50)',
  }

  return (
    <div>
      <div style={{
        display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '16px',
      } as React.CSSProperties}>
        <input
          type="text"
          placeholder="Search members..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={inputStyle}
        />
        <div style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '8px' } as React.CSSProperties}>
          {statusFilters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={activeFilter === f ? filterBtnActive : filterBtnInactive}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div style={{
        overflowX: 'auto', borderRadius: 'var(--radius-card)',
        border: '1px solid var(--border-subtle)',
      } as React.CSSProperties}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' } as React.CSSProperties}>
          <thead>
            <tr>
              <th style={thStyle}>Name</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>State</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={5} style={{
                  padding: '32px 16px', textAlign: 'center', color: 'var(--text-muted)',
                } as React.CSSProperties}>
                  Loading...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={5} style={{
                  padding: '32px 16px', textAlign: 'center', color: 'var(--text-muted)',
                } as React.CSSProperties}>
                  No members found
                </td>
              </tr>
            ) : (
              filtered.map((member: Member) => (
                <tr
                  key={member.id}
                  style={{
                    borderTop: '1px solid var(--border-subtle)',
                    transition: 'background var(--dur-fast) var(--ease-standard)',
                  } as React.CSSProperties}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--gray-50)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
                >
                  <td style={{ ...cellStyle, fontWeight: 500, color: 'var(--text-heading)' } as React.CSSProperties}>{member.firstName} {member.lastName}</td>
                  <td style={{ ...cellStyle, color: 'var(--text-body)' } as React.CSSProperties}>{member.email}</td>
                  <td style={{ ...cellStyle, color: 'var(--text-body)' } as React.CSSProperties}>{member.state ?? '—'}</td>
                  <td style={cellStyle}>
                    <Badge tone={statusBadgeVariant[member.status]}>{member.status}</Badge>
                  </td>
                  <td style={cellStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' } as React.CSSProperties}>
                      <button style={{
                        borderRadius: 'var(--radius-button)', background: 'var(--gray-100)',
                        padding: '4px 10px', fontSize: '12px', fontWeight: 600,
                        color: 'var(--text-heading)', border: 'none', cursor: 'pointer',
                        fontFamily: 'var(--font-body)',
                        transition: 'background var(--dur-fast) var(--ease-standard)',
                      } as React.CSSProperties}
                      onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--gray-200)' }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--gray-100)' }}>
                        Edit
                      </button>
                      {member.status === 'pending' && (
                        <>
                          <button style={{
                            borderRadius: 'var(--radius-button)', background: 'rgba(14, 122, 72, 0.1)',
                            padding: '4px 10px', fontSize: '12px', fontWeight: 600,
                            color: 'var(--green-primary)', border: 'none', cursor: 'pointer',
                            fontFamily: 'var(--font-body)',
                            transition: 'background var(--dur-fast) var(--ease-standard)',
                          } as React.CSSProperties}
                          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(14, 122, 72, 0.2)' }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(14, 122, 72, 0.1)' }}>
                            Approve
                          </button>
                          <button style={{
                            borderRadius: 'var(--radius-button)', background: 'rgba(220, 38, 38, 0.1)',
                            padding: '4px 10px', fontSize: '12px', fontWeight: 600,
                            color: 'var(--red-500)', border: 'none', cursor: 'pointer',
                            fontFamily: 'var(--font-body)',
                            transition: 'background var(--dur-fast) var(--ease-standard)',
                          } as React.CSSProperties}
                          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(220, 38, 38, 0.2)' }}
                          onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(220, 38, 38, 0.1)' }}>
                            Reject
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div style={{
        marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
      } as React.CSSProperties}>
        <button style={{
          borderRadius: 'var(--radius-button)', border: '1px solid var(--border-default)',
          padding: '6px 12px', fontSize: '14px', color: 'var(--text-muted)',
          background: 'transparent', cursor: 'pointer', fontFamily: 'var(--font-body)',
          transition: 'background var(--dur-fast) var(--ease-standard)',
        } as React.CSSProperties}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--gray-50)' }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}>
          Previous
        </button>
        <button style={{
          borderRadius: 'var(--radius-button)', background: 'var(--green-primary)',
          padding: '6px 12px', fontSize: '14px', fontWeight: 600,
          color: '#fff', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)',
        } as React.CSSProperties}>1</button>
        <button style={{
          borderRadius: 'var(--radius-button)', border: '1px solid var(--border-default)',
          padding: '6px 12px', fontSize: '14px', color: 'var(--text-muted)',
          background: 'transparent', cursor: 'pointer', fontFamily: 'var(--font-body)',
          transition: 'background var(--dur-fast) var(--ease-standard)',
        } as React.CSSProperties}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--gray-50)' }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}>
          2
        </button>
        <button style={{
          borderRadius: 'var(--radius-button)', border: '1px solid var(--border-default)',
          padding: '6px 12px', fontSize: '14px', color: 'var(--text-muted)',
          background: 'transparent', cursor: 'pointer', fontFamily: 'var(--font-body)',
          transition: 'background var(--dur-fast) var(--ease-standard)',
        } as React.CSSProperties}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--gray-50)' }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}>
          3
        </button>
        <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>...</span>
        <button style={{
          borderRadius: 'var(--radius-button)', border: '1px solid var(--border-default)',
          padding: '6px 12px', fontSize: '14px', color: 'var(--text-muted)',
          background: 'transparent', cursor: 'pointer', fontFamily: 'var(--font-body)',
          transition: 'background var(--dur-fast) var(--ease-standard)',
        } as React.CSSProperties}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--gray-50)' }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}>
          12
        </button>
        <button style={{
          borderRadius: 'var(--radius-button)', border: '1px solid var(--border-default)',
          padding: '6px 12px', fontSize: '14px', color: 'var(--text-muted)',
          background: 'transparent', cursor: 'pointer', fontFamily: 'var(--font-body)',
          transition: 'background var(--dur-fast) var(--ease-standard)',
        } as React.CSSProperties}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--gray-50)' }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}>
          Next
        </button>
      </div>
    </div>
  )
}

export { MemberTable }
