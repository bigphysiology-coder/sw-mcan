import { useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Badge } from '@/components/ui/Badge'
import { useMembers } from '@/features/members/hooks/useMembers'
import type { Member } from '@/types'

const statusBadge: Record<string, 'green' | 'gold' | 'neutral'> = {
  active: 'green', pending: 'gold', suspended: 'neutral', deactivated: 'neutral',
}

const placeholderMembers: Partial<Member>[] = [
  { firstName: 'Aisha', lastName: 'Bello', state: 'Lagos', nyscCallUpNumber: 'SW/24A/1042', status: 'active' },
  { firstName: 'Yusuf', lastName: 'Adelaja', state: 'Ogun', nyscCallUpNumber: 'SW/24A/2210', status: 'active' },
  { firstName: 'Khadijah', lastName: 'Ogundele', state: 'Oyo', nyscCallUpNumber: 'SW/24B/0931', status: 'pending' },
  { firstName: 'Ismail', lastName: 'Salaudeen', state: 'Osun', nyscCallUpNumber: 'SW/24A/1188', status: 'active' },
  { firstName: 'Maryam', lastName: 'Bankole', state: 'Ondo', nyscCallUpNumber: 'SW/24B/3320', status: 'active' },
]

const initialsStyle: React.CSSProperties = {
  width: '32px', height: '32px', borderRadius: '50%', background: 'var(--admin-brand-light)',
  color: 'var(--admin-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center',
  fontSize: '12px', fontWeight: 700, flexShrink: 0,
}

export default function AdminMembersPage() {
  const { members, isLoading } = useMembers()
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const displayMembers = members.length > 0 ? members : placeholderMembers

  const filtered = displayMembers.filter((m) => {
    if (!search) return true
    const q = search.toLowerCase()
    return (`${m.firstName} ${m.lastName}`.toLowerCase().includes(q) || m.state?.toLowerCase().includes(q) || m.nyscCallUpNumber?.toLowerCase().includes(q))
  })

  function getInitials(name: string) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  function exportCSV() {
    const headers = ['Name', 'State', 'Call-up Number', 'Status']
    const rows = filtered.map((m) => [
      `${m.firstName} ${m.lastName}`,
      m.state || '',
      m.nyscCallUpNumber || '',
      m.status || 'pending',
    ])
    const csv = [headers.join(','), ...rows.map((r) => r.map((c) => `"${c.replace(/"/g, '""')}"`).join(','))].join('\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'mcan-members.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#111827', margin: 0 }}>Membership records</h1>
          <p style={{ fontSize: '14px', color: '#1a4731', marginTop: '4px' }}>Search and manage registered corps members across all six states.</p>
        </div>
        <button onClick={exportCSV} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: '#1a4731', color: '#fff', fontSize: '14px', fontWeight: 600, border: 'none', borderRadius: '8px', cursor: 'pointer', fontFamily: 'inherit' }}>
          <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
          Export CSV
        </button>
      </div>

      <div style={{ position: 'relative', marginBottom: '16px' }}>
        <svg style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', width: '16px', height: '16px', color: '#9CA3AF' }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
        <input
          type="text"
          placeholder="Search by name, state or call-up number"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '100%', padding: '10px 16px 10px 40px', border: '1px solid #E5E7EB',
            borderRadius: '12px', fontSize: '14px', color: '#374151', outline: 'none',
            background: '#fff', fontFamily: 'inherit', boxSizing: 'border-box',
          }}
        />
      </div>

      {isLoading ? (
        <div style={{ padding: '32px', textAlign: 'center', color: '#6B7280', fontSize: '14px' }}>Loading...</div>
      ) : (
        <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
          <div className="resp-grid-2" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', padding: '12px 18px', background: '#F9FAFB', borderBottom: '1px solid #E5E7EB', fontSize: '12px', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <div>Member</div>
            <div>Call-up no.</div>
            <div>Status</div>
          </div>
          <div style={{ borderBottom: '1px solid #E5E7EB' }}>
            {filtered.map((m, i) => (
              <div key={m.id || i} className="resp-grid-2" style={{
                display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', alignItems: 'center',
                padding: '14px 18px', fontSize: '14px', color: '#374151',
                borderBottom: '1px solid #F3F4F6', transition: 'background 140ms',
              }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#F9FAFB'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={initialsStyle}>{getInitials(`${m.firstName} ${m.lastName}`)}</div>
                  <div>
                    <p style={{ fontWeight: 500, margin: 0 }}>{m.firstName} {m.lastName}</p>
                    <p style={{ fontSize: '12px', color: '#9CA3AF', margin: 0 }}>{m.state || '—'}</p>
                  </div>
                </div>
                <div style={{ fontSize: '12px', color: '#6B7280' }}>{m.nyscCallUpNumber || '—'}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Badge tone={statusBadge[m.status || 'pending'] || 'neutral'}>
                    {(m.status || 'pending').charAt(0).toUpperCase() + (m.status || 'pending').slice(1)}
                  </Badge>

                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Member" size="md">
        <form onSubmit={(e) => e.preventDefault()}>
          <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', marginBottom: '16px' }}>
            <Input label="Full Name" placeholder="Enter full name" />
            <Input label="Email" type="email" placeholder="Enter email address" />
          </div>
          <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', marginBottom: '16px' }}>
            <Input label="Phone" type="tel" placeholder="Enter phone number" />
            <div>
              <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: 600, color: '#111827' }}>State</label>
              <select style={{ width: '100%', padding: '12px 16px', border: '1.5px solid var(--border-default)', borderRadius: 'var(--radius-button)', background: 'var(--white)', fontSize: '14px', color: 'var(--text-heading)', outline: 'none', boxSizing: 'border-box' }}>
                <option value="">Select state</option>
                <option value="Lagos">Lagos</option>
                <option value="Ogun">Ogun</option>
                <option value="Oyo">Oyo</option>
                <option value="Osun">Osun</option>
                <option value="Ondo">Ondo</option>
                <option value="Ekiti">Ekiti</option>
              </select>
            </div>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <Input label="NYSC Call-up Number" placeholder="e.g. LA/24A/1234" />
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', paddingTop: '8px' }}>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button variant="primary" type="submit">Save Member</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
