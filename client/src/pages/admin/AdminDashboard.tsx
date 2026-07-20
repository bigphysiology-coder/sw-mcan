import { useMemo, useState, useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'
import { useNavigate } from 'react-router-dom'
import { useMembers } from '@/features/members/hooks/useMembers'
import { useDonations } from '@/features/donations/hooks/useDonations'
import { useLodges } from '@/features/lodges/hooks/useLodges'
import { useGallery } from '@/features/gallery/hooks/useGallery'
import { useEvents } from '@/features/events/hooks/useEvents'
import { contactApi } from '@/features/contact/services/contactApi'
import type { ContactMessage } from '@/types'

export default function AdminDashboard() {
  const user = useAuthStore((s) => s.user)
  const navigate = useNavigate()
  const { members } = useMembers()
  const { donations, stats: donationStats } = useDonations()
  const { lodges } = useLodges()
  const { events } = useEvents()
  const { photos } = useGallery()

  const [messages, setMessages] = useState<ContactMessage[]>([])

  useEffect(() => {
    contactApi.getAll().then(setMessages)
  }, [])

  const activeMembers = useMemo(() => members.filter((m) => m.status === 'active').length, [members])
  const pendingMembers = useMemo(() => members.filter((m) => m.status === 'pending').length, [members])
  const pendingDonations = useMemo(() => donations.filter((d) => d.status === 'Pending').length, [donations])
  const availableLodges = useMemo(() => lodges.filter((l) => l.status === 'Available').length, [lodges])
  const totalLodges = lodges.length
  const totalPhotos = photos.length
  const totalEvents = events.length
  const unreadMessages = useMemo(() => messages.filter((m) => !m.read), [messages])

  const stats = [
    { label: 'Total members', value: String(members.length), subtitle: `+${activeMembers} active, ${pendingMembers} pending`, icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z', path: '/admin/members' },
    { label: 'Donations (YTD)', value: donationStats ? '₦' + (donationStats.raisedYear / 1000).toFixed(1) + 'M' : '—', subtitle: `${pendingDonations} pending review`, icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', path: '/admin/donations' },
    { label: 'Messages', value: String(messages.length), subtitle: `${unreadMessages.length} unread`, icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', path: '/admin/messages' },
    { label: 'Events', value: String(totalEvents), subtitle: 'Create, edit and publish events', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', path: '/admin/events' },
  ]

  const pendingApprovals = useMemo(() => members.filter((m) => m.status === 'pending'), [members])

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#111827', margin: 0 }}>Welcome back, {user?.firstName || 'Admin'}</h1>
        <p style={{ fontSize: '14px', color: '#6B7280', marginTop: '4px' }}>Here&rsquo;s what&rsquo;s happening across the Southwest zone today.</p>
      </div>

      <div className="admin-stats" style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: '24px' }}>
        {stats.map((s) => (
          <button key={s.label} onClick={() => navigate(s.path)} style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '18px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', textAlign: 'left', cursor: 'pointer', transition: 'all 0.15s' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--admin-brand-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
              <svg style={{ width: '16px', height: '16px', color: 'var(--admin-brand)' }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d={s.icon} />
              </svg>
            </div>
            <div style={{ fontSize: '30px', fontWeight: 700, color: '#111827' }}>{s.value}</div>
            <div style={{ fontSize: '14px', color: '#6B7280', marginTop: '2px' }}>{s.label}</div>
            <div style={{ fontSize: '12px', color: '#1a4731', fontWeight: 500, marginTop: '4px' }}>{s.subtitle}</div>
          </button>
        ))}
      </div>

      <div className="resp-grid-2" style={{ display: 'grid', gap: '16px', gridTemplateColumns: '1fr 1fr' }}>
        <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '18px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#374151', margin: '0 0 16px 0' }}>
            Pending approvals
            {pendingApprovals.length > 0 && (
              <span style={{ marginLeft: '8px', background: '#FEF3C7', color: '#D97706', fontSize: '12px', fontWeight: 700, padding: '2px 8px', borderRadius: '9999px' }}>{pendingApprovals.length}</span>
            )}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {pendingApprovals.length > 0 ? pendingApprovals.slice(0, 5).map((m) => (
              <div key={m.id} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--admin-brand-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, color: 'var(--admin-brand)', flexShrink: 0 }}>
                  {(m.firstName?.[0] ?? '') + (m.lastName?.[0] ?? '')}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#374151' }}>{m.firstName} {m.lastName}</p>
                  <p style={{ margin: 0, fontSize: '12px', color: '#9CA3AF' }}>{m.state} &middot; {m.nyscCallUpNumber}</p>
                </div>
                <span style={{ fontSize: '12px', color: '#F59E0B' }}>Pending</span>
              </div>
            )) : (
              <p style={{ fontSize: '14px', color: '#9CA3AF', margin: 0 }}>No pending approvals.</p>
            )}
          </div>
          {pendingApprovals.length > 0 && (
            <button onClick={() => navigate('/admin/approvals')} style={{ marginTop: '12px', padding: 0, border: 'none', background: 'none', color: 'var(--admin-brand)', fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
              Review all &rarr;
            </button>
          )}
        </div>

        <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '18px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#374151', margin: '0 0 16px 0' }}>
            Recent messages
            {unreadMessages.length > 0 && (
              <span style={{ marginLeft: '8px', background: '#FEF3C7', color: '#D97706', fontSize: '12px', fontWeight: 700, padding: '2px 8px', borderRadius: '9999px' }}>{unreadMessages.length} new</span>
            )}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {unreadMessages.length > 0 ? unreadMessages.slice(0, 5).map((msg) => (
              <div key={msg.id} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--admin-brand-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, color: 'var(--admin-brand)', flexShrink: 0 }}>
                  {(msg.firstName?.[0] ?? '') + (msg.lastName?.[0] ?? '')}
                </div>
                <div style={{ flex: 1, overflow: 'hidden' }}>
                  <p style={{ margin: 0, fontSize: '14px', fontWeight: 600, color: '#374151' }}>{msg.firstName} {msg.lastName}</p>
                  <p style={{ margin: 0, fontSize: '12px', color: '#9CA3AF', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{msg.message}</p>
                </div>
                <span style={{ fontSize: '12px', color: '#F59E0B', whiteSpace: 'nowrap' }}>New</span>
              </div>
            )) : (
              <p style={{ fontSize: '14px', color: '#9CA3AF', margin: 0 }}>No new messages.</p>
            )}
          </div>
          {unreadMessages.length > 0 && (
            <button onClick={() => navigate('/admin/messages')} style={{ marginTop: '12px', padding: 0, border: 'none', background: 'none', color: 'var(--admin-brand)', fontSize: '14px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>
              View all messages &rarr;
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
