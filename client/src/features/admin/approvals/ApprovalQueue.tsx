import { useState } from 'react'
import { membersApi } from '@/features/members/services/membersApi'
import { formatDate } from '@/utils/formatDate'
import type { Member } from '@/types'

interface ApprovalQueueProps {
  members: Member[]
  onUpdate: () => void
}

function ApprovalQueue({ members, onUpdate }: ApprovalQueueProps) {
  const [rejectingId, setRejectingId] = useState<string | null>(null)
  const [rejectReason, setRejectReason] = useState('')
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  async function handleApprove(member: Member) {
    setActionLoading(member.id)
    try {
      await membersApi.approveMember(member.id)
      onUpdate()
    } catch {
      // error handled by parent
    } finally {
      setActionLoading(null)
    }
  }

  async function handleReject(member: Member) {
    setActionLoading(member.id)
    try {
      await membersApi.rejectMember(member.id, rejectReason)
      setRejectingId(null)
      setRejectReason('')
      onUpdate()
    } catch {
      // error handled by parent
    } finally {
      setActionLoading(null)
    }
  }

  async function handleDelete(member: Member) {
    if (!window.confirm('Delete this member?')) return
    setActionLoading(member.id)
    try {
      await membersApi.deleteMember(member.id)
      onUpdate()
    } catch {
      // error handled by parent
    } finally {
      setActionLoading(null)
    }
  }

  if (members.length === 0) {
    return (
      <div style={{
        borderRadius: 'var(--radius-card)',
        border: '1px solid var(--border-subtle)',
        background: 'var(--surface-card)',
        padding: '32px', textAlign: 'center', color: 'var(--text-muted)',
      } as React.CSSProperties}>
        No members in this category
      </div>
    )
  }

  return (
    <div style={{
      display: 'grid', gap: '16px',
      gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
    } as React.CSSProperties}>
      {members.map((member) => {
        const initials = (member.firstName[0] + (member.lastName?.[0] ?? '')).toUpperCase()

        return (
          <div key={member.id} style={{
            borderRadius: 'var(--radius-card)',
            border: '1px solid var(--border-subtle)',
            background: 'var(--surface-card)',
            padding: '20px',
          } as React.CSSProperties}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' } as React.CSSProperties}>
              <div style={{
                display: 'flex', height: '48px', width: '48px', flexShrink: 0,
                alignItems: 'center', justifyContent: 'center',
                borderRadius: '50%', background: 'rgba(14, 122, 72, 0.1)',
                fontWeight: 700, color: 'var(--green-primary)', fontSize: '16px',
              } as React.CSSProperties}>
                {initials}
              </div>
              <div style={{ minWidth: 0, flex: 1 } as React.CSSProperties}>
                <h3 style={{
                  fontFamily: 'var(--font-heading)', fontWeight: 600,
                  color: 'var(--text-heading)', margin: 0,
                } as React.CSSProperties}>{member.firstName} {member.lastName}</h3>
                <p style={{
                  fontSize: '14px', color: 'var(--text-muted)', margin: 0,
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                } as React.CSSProperties}>{member.email}</p>
              </div>
            </div>

            <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '14px' } as React.CSSProperties}>
              <div style={{ display: 'flex', justifyContent: 'space-between' } as React.CSSProperties}>
                <span style={{ color: 'var(--text-muted)' }}>State</span>
                <span style={{ fontWeight: 500, color: 'var(--text-heading)' }}>{member.state ?? '—'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' } as React.CSSProperties}>
                <span style={{ color: 'var(--text-muted)' }}>Call-up No</span>
                <span style={{ fontWeight: 500, color: 'var(--text-heading)' }}>{member.nyscCallUpNumber ?? '—'}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' } as React.CSSProperties}>
                <span style={{ color: 'var(--text-muted)' }}>Joined</span>
                <span style={{ fontWeight: 500, color: 'var(--text-heading)' }}>{formatDate(member.createdAt)}</span>
              </div>
            </div>

            <div style={{ marginTop: '16px' } as React.CSSProperties}>
              {member.status === 'pending' ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' } as React.CSSProperties}>
                  <div style={{ display: 'flex', gap: '8px' } as React.CSSProperties}>
                    <button
                      onClick={() => handleApprove(member)}
                      disabled={actionLoading === member.id}
                      style={{
                        flex: 1, borderRadius: 'var(--radius-button)',
                        background: 'var(--green-primary)', color: '#fff',
                        padding: '8px 16px', fontSize: '14px', fontWeight: 600,
                        border: 'none', cursor: actionLoading === member.id ? 'not-allowed' : 'pointer',
                        fontFamily: 'var(--font-body)',
                        opacity: actionLoading === member.id ? 0.5 : 1,
                      } as React.CSSProperties}
                    >
                      {actionLoading === member.id ? 'Processing...' : 'Accept'}
                    </button>
                    <button
                      onClick={() => setRejectingId(rejectingId === member.id ? null : member.id)}
                      disabled={actionLoading === member.id}
                      style={{
                        flex: 1, borderRadius: 'var(--radius-button)',
                        background: '#DC2626', color: '#fff',
                        padding: '8px 16px', fontSize: '14px', fontWeight: 600,
                        border: 'none', cursor: actionLoading === member.id ? 'not-allowed' : 'pointer',
                        fontFamily: 'var(--font-body)',
                        opacity: actionLoading === member.id ? 0.5 : 1,
                      } as React.CSSProperties}
                    >
                      Reject
                    </button>
                  </div>
                  {rejectingId === member.id && (
                    <div style={{
                      borderRadius: 'var(--radius-button)',
                      border: '1px solid #FECACA', background: '#FEF2F2',
                      padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px',
                    } as React.CSSProperties}>
                      <textarea
                        placeholder="Reason for rejection..."
                        value={rejectReason}
                        onChange={(e) => setRejectReason(e.target.value)}
                        rows={3}
                        style={{
                          width: '100%', borderRadius: 'var(--radius-button)',
                          border: '1px solid #FECACA', background: '#fff',
                          padding: '8px 12px', fontSize: '14px', color: 'var(--text-heading)',
                          outline: 'none', fontFamily: 'var(--font-body)',
                          boxSizing: 'border-box', resize: 'vertical',
                        } as React.CSSProperties}
                      />
                      <button
                        onClick={() => handleReject(member)}
                        disabled={!rejectReason.trim() || actionLoading === member.id}
                        style={{
                          width: '100%', borderRadius: 'var(--radius-button)',
                          background: '#DC2626', color: '#fff',
                          padding: '8px 16px', fontSize: '14px', fontWeight: 600,
                          border: 'none', cursor: (!rejectReason.trim() || actionLoading === member.id) ? 'not-allowed' : 'pointer',
                          fontFamily: 'var(--font-body)',
                          opacity: (!rejectReason.trim() || actionLoading === member.id) ? 0.5 : 1,
                        } as React.CSSProperties}
                      >
                        {actionLoading === member.id ? 'Rejecting...' : 'Confirm Rejection'}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: '4px', width: '100%',
                  padding: '8px 16px', borderRadius: 'var(--radius-button)',
                  background: '#D1FAE5', color: '#065F46', fontSize: '14px', fontWeight: 600,
                  fontFamily: 'var(--font-body)',
                } as React.CSSProperties}>
                  <svg style={{ width: '14px', height: '14px' }} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
                  Approved
                </span>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export { ApprovalQueue }
