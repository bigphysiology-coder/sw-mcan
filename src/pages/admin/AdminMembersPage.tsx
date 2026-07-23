import { useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useMembers } from '@/features/members/hooks/useMembers'
import type { Member } from '@/types'

const statusBadge: Record<string, { bg: string; fg: string }> = {
  active: { bg: '#ECFDF5', fg: '#065F46' },
  pending: { bg: '#FFFBEB', fg: '#D97706' },
  suspended: { bg: '#FEF2F2', fg: '#DC2626' },
  deactivated: { bg: '#F3F4F6', fg: '#6B7280' },
}

export default function AdminMembersPage() {
  const { members, isLoading, updateMember, deleteMember, isUpdating, isDeleting } = useMembers()
  const [search, setSearch] = useState('')
  const [editing, setEditing] = useState<Member | null>(null)
  const [editForm, setEditForm] = useState({ firstName: '', lastName: '', email: '', phone: '', state: '', nyscCallUpNumber: '', role: '' as Member['role'], membershipType: '' as Member['membershipType'] | '', occupation: '', chapter: '' })
  const [deleteTarget, setDeleteTarget] = useState<Member | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const filtered = members.filter((m) => {
    if (!search) return true
    const q = search.toLowerCase()
    return (`${m.firstName} ${m.lastName}`.toLowerCase().includes(q) || m.state?.toLowerCase().includes(q) || m.nyscCallUpNumber?.toLowerCase().includes(q) || m.email.toLowerCase().includes(q) || m.role?.toLowerCase().includes(q))
  })

  function getInitials(first: string, last: string) {
    return ((first?.[0] ?? '') + (last?.[0] ?? '')).toUpperCase()
  }

  function exportCSV() {
    const headers = ['Name', 'Email', 'Phone', 'State', 'Call-up Number', 'Status', 'Role']
    const rows = filtered.map((m) => [
      `${m.firstName} ${m.lastName}`, m.email, m.phone || '', m.state || '', m.nyscCallUpNumber || '', m.status, m.role,
    ])
    const csv = [headers.join(','), ...rows.map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = 'mcan-members.csv'; a.click()
    URL.revokeObjectURL(url)
  }

  async function handleEditSave() {
    if (!editing) return
    setError(null)
    try {
      const { membershipType: mt, ...rest } = editForm
      await updateMember({ id: editing.id, data: mt ? { ...rest, membershipType: mt } : rest })
      setEditing(null)
      setSuccess('Member updated')
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update member')
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return
    setError(null)
    try {
      await deleteMember(deleteTarget.id)
      setDeleteTarget(null)
      setSuccess('Member deleted')
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete member')
    }
  }

  async function handleStatusChange(member: Member, status: 'active' | 'suspended' | 'deactivated') {
    setError(null)
    try {
      await updateMember({ id: member.id, data: { status } })
      setSuccess(`Member ${status === 'active' ? 'approved' : status}`)
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update status')
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', border: '1px solid #E5E7EB', borderRadius: '8px',
    padding: '8px 12px', fontSize: '14px', fontFamily: 'inherit', boxSizing: 'border-box',
  }

  return (
    <div>
      {success && (
        <div style={{ marginBottom: '16px', padding: '12px 16px', background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '8px', color: '#065F46', fontSize: '14px', fontWeight: 500 }}>{success}</div>
      )}
      {error && (
        <div style={{ marginBottom: '16px', padding: '12px 16px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '8px', color: '#DC2626', fontSize: '14px' }}>{error}</div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#111827', margin: 0 }}>Members</h1>
            <p style={{ fontSize: '14px', color: '#1a4731', marginTop: '4px' }}>Search and manage registered corps members across all six states.</p>
          </div>
          <button onClick={exportCSV} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: '#1a4731', color: '#fff', fontSize: '14px', fontWeight: 600, border: 'none', borderRadius: '8px', cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>
            <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Export CSV
          </button>
        </div>
      </div>

      <div style={{ position: 'relative', marginBottom: '16px' }}>
        <svg style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: '#9CA3AF' }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
        <input
          type="text" placeholder="Search by name, state, email or call-up number"
          value={search} onChange={(e) => setSearch(e.target.value)}
          style={{ width: '100%', padding: '10px 16px 10px 40px', border: '1px solid #E5E7EB', borderRadius: '12px', fontSize: '14px', color: '#374151', outline: 'none', background: '#fff', fontFamily: 'inherit', boxSizing: 'border-box' }}
        />
      </div>

      <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        <div className="hidden sm:grid" style={{ gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1.2fr', padding: '12px 18px', background: '#F9FAFB', borderBottom: '1px solid #E5E7EB', fontSize: '12px', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          <div>Member</div>
          <div>Email</div>
          <div>Call-up</div>
          <div>Status</div>
          <div>Actions</div>
        </div>

        {isLoading ? (
          <div style={{ padding: '32px', textAlign: 'center', color: '#6B7280', fontSize: '14px' }}>Loading...</div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: '32px', textAlign: 'center', color: '#6B7280', fontSize: '14px' }}>No members found</div>
        ) : (
          filtered.map((m) => {
            const badge = statusBadge[m.status] || statusBadge.deactivated
            const actions = (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                <button onClick={() => { setEditing(m); setEditForm({ firstName: m.firstName, lastName: m.lastName, email: m.email, phone: m.phone || '', state: m.state || '', nyscCallUpNumber: m.nyscCallUpNumber || '', role: m.role, membershipType: m.membershipType || '', occupation: m.occupation || '', chapter: m.chapter || '' }) }} disabled={isUpdating} style={{ padding: '4px 10px', background: '#F3F4F6', color: '#374151', fontSize: '12px', fontWeight: 600, border: 'none', borderRadius: '6px', cursor: 'pointer', fontFamily: 'inherit' }}>
                  Edit
                </button>
                {m.status === 'pending' && (
                  <button onClick={() => handleStatusChange(m, 'active')} disabled={isUpdating} style={{ padding: '4px 10px', background: '#ECFDF5', color: '#065F46', fontSize: '12px', fontWeight: 600, border: 'none', borderRadius: '6px', cursor: 'pointer', fontFamily: 'inherit' }}>
                    Approve
                  </button>
                )}
                {m.status === 'active' && (
                  <button onClick={() => handleStatusChange(m, 'suspended')} disabled={isUpdating} style={{ padding: '4px 10px', background: '#FFFBEB', color: '#D97706', fontSize: '12px', fontWeight: 600, border: 'none', borderRadius: '6px', cursor: 'pointer', fontFamily: 'inherit' }}>
                    Suspend
                  </button>
                )}
                {(m.status === 'active' || m.status === 'suspended') && (
                  <button onClick={() => handleStatusChange(m, 'deactivated')} disabled={isUpdating} style={{ padding: '4px 10px', background: '#FEF2F2', color: '#DC2626', fontSize: '12px', fontWeight: 600, border: 'none', borderRadius: '6px', cursor: 'pointer', fontFamily: 'inherit' }}>
                    Deactivate
                  </button>
                )}
                <button onClick={() => setDeleteTarget(m)} disabled={isDeleting} style={{ padding: '4px 10px', background: 'transparent', color: '#DC2626', fontSize: '12px', fontWeight: 600, border: '1px solid #FECACA', borderRadius: '6px', cursor: 'pointer', fontFamily: 'inherit' }}>
                  Delete
                </button>
              </div>
            )

            return (
              <div key={m.id}>
                <div className="hidden sm:grid" style={{ gridTemplateColumns: '2fr 1.5fr 1fr 1fr 1.2fr', alignItems: 'center', padding: '14px 18px', fontSize: '14px', color: '#374151', borderBottom: '1px solid #F3F4F6' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--admin-brand-light)', color: 'var(--admin-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, flexShrink: 0 }}>
                        {getInitials(m.firstName, m.lastName)}
                      </div>
                      <div>
                        <p style={{ fontWeight: 500, margin: 0, color: '#111827' }}>{m.firstName} {m.lastName}</p>
                        <p style={{ fontSize: '12px', color: '#9CA3AF', margin: 0 }}>{m.state || '—'}</p>
                      </div>
                    </div>
                  </div>
                  <div style={{ fontSize: '13px' }}>{m.email}</div>
                  <div style={{ fontSize: '13px', color: '#6B7280' }}>{m.nyscCallUpNumber || '—'}</div>
                  <div>
                    <span style={{ display: 'inline-flex', alignItems: 'center', padding: '2px 10px', borderRadius: '9999px', fontSize: '12px', fontWeight: 500, background: badge.bg, color: badge.fg }}>
                      {m.status.charAt(0).toUpperCase() + m.status.slice(1)}
                    </span>
                  </div>
                  <div>{actions}</div>
                </div>

                <div className="sm:hidden" style={{ padding: '14px 18px', borderBottom: '1px solid #F3F4F6' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                    <div>
                      <div style={{ fontWeight: 600, color: '#111827' }}>{m.firstName} {m.lastName}</div>
                      <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '2px' }}>{m.state || '—'}</div>
                    </div>
                    <span style={{ display: 'inline-flex', alignItems: 'center', padding: '2px 10px', borderRadius: '9999px', fontSize: '12px', fontWeight: 500, background: badge.bg, color: badge.fg }}>
                      {m.status.charAt(0).toUpperCase() + m.status.slice(1)}
                    </span>
                  </div>
                  <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '2px' }}>{m.email}</div>
                  <div style={{ fontSize: '13px', color: '#9CA3AF', marginBottom: '8px' }}>{m.nyscCallUpNumber || '—'}</div>
                  {actions}
                </div>
              </div>
            )
          })
        )}
      </div>

      <Modal isOpen={!!editing} onClose={() => setEditing(null)} title={`Edit ${editForm.firstName} ${editForm.lastName}`} size="md">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <Input label="First name" value={editForm.firstName} onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })} />
            <Input label="Last name" value={editForm.lastName} onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })} />
          </div>
          <Input label="Email" type="email" value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} />
          <Input label="Phone" value={editForm.phone} onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })} />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: 600, color: '#111827' }}>Role</label>
              <select value={editForm.role} onChange={(e) => setEditForm({ ...editForm, role: e.target.value as Member['role'] })} style={{ width: '100%', padding: '12px 16px', border: '1.5px solid var(--border-default)', borderRadius: 'var(--radius-button)', background: 'var(--white)', fontSize: '14px', color: 'var(--text-heading)', outline: 'none', boxSizing: 'border-box' }}>
                <option value="member">Member</option>
                <option value="admin">Admin</option>
                <option value="superadmin">Superadmin</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: 600, color: '#111827' }}>Membership Type</label>
              <select value={editForm.membershipType} onChange={(e) => setEditForm({ ...editForm, membershipType: e.target.value as Member['membershipType'] | '' })} style={{ width: '100%', padding: '12px 16px', border: '1.5px solid var(--border-default)', borderRadius: 'var(--radius-button)', background: 'var(--white)', fontSize: '14px', color: 'var(--text-heading)', outline: 'none', boxSizing: 'border-box' }}>
                <option value="">—</option>
                <option value="full">Full</option>
                <option value="associate">Associate</option>
                <option value="student">Student</option>
                <option value="corporate">Corporate</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <Input label="State" value={editForm.state} onChange={(e) => setEditForm({ ...editForm, state: e.target.value })} />
            <Input label="Chapter" value={editForm.chapter} onChange={(e) => setEditForm({ ...editForm, chapter: e.target.value })} />
          </div>
          <Input label="Occupation" value={editForm.occupation} onChange={(e) => setEditForm({ ...editForm, occupation: e.target.value })} />
          <Input label="NYSC Call-up Number" value={editForm.nyscCallUpNumber} onChange={(e) => setEditForm({ ...editForm, nyscCallUpNumber: e.target.value })} />

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <Button variant="ghost" onClick={() => setEditing(null)}>Cancel</Button>
            <button onClick={handleEditSave} disabled={isUpdating} style={{ padding: '10px 20px', background: isUpdating ? '#9CA3AF' : '#1a4731', color: '#fff', border: 'none', borderRadius: '8px', fontFamily: 'inherit', fontSize: '14px', fontWeight: 600, cursor: isUpdating ? 'not-allowed' : 'pointer' }}>
              {isUpdating ? 'Saving…' : 'Save'}
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Delete Member" size="sm">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ fontSize: '14px', color: '#374151', margin: 0 }}>Delete member <strong>{deleteTarget?.firstName} {deleteTarget?.lastName}</strong>? This cannot be undone.</p>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <Button variant="ghost" onClick={() => setDeleteTarget(null)}>Cancel</Button>
            <button onClick={handleDelete} disabled={isDeleting} style={{ padding: '10px 20px', background: isDeleting ? '#9CA3AF' : '#DC2626', color: '#fff', border: 'none', borderRadius: '8px', fontFamily: 'inherit', fontSize: '14px', fontWeight: 600, cursor: isDeleting ? 'not-allowed' : 'pointer' }}>
              {isDeleting ? 'Deleting…' : 'Delete'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
