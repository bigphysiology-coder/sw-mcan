import { useState, useEffect } from 'react'
import { contactApi } from '@/features/contact/services/contactApi'
import type { ContactMessage } from '@/types'

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [selected, setSelected] = useState<ContactMessage | null>(null)

  useEffect(() => {
    contactApi.getAll().then(setMessages)
  }, [])

  function refresh() {
    contactApi.getAll().then(setMessages)
    setSelected(null)
  }

  function handleMarkRead(id: string) {
    contactApi.markAsRead(id)
    const updated = messages.map((m) => (m.id === id ? { ...m, read: true } : m))
    setMessages(updated)
    if (selected?.id === id) setSelected({ ...selected, read: true })
  }

  function handleDelete(id: string) {
    contactApi.deleteMessage(id)
    if (selected?.id === id) setSelected(null)
    setMessages((prev) => prev.filter((m) => m.id !== id))
  }

  const unread = messages.filter((m) => !m.read).length

  return (
    <div style={{ display: 'flex', gap: '20px', height: '100%' }}>
      <div style={{ flex: selected ? '0 0 380px' : '1', minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#111827', margin: 0 }}>Messages</h1>
            <p style={{ fontSize: '14px', color: '#6B7280', marginTop: '2px' }}>
              {unread > 0 ? `${unread} unread` : 'No unread messages'} &middot; {messages.length} total
            </p>
          </div>
          <button onClick={refresh} style={{ padding: '8px 16px', border: '1px solid #E5E7EB', borderRadius: '8px', background: '#fff', fontSize: '13px', fontWeight: 600, color: '#374151', cursor: 'pointer' }}>
            Refresh
          </button>
        </div>

        {messages.length === 0 ? (
          <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '48px', textAlign: 'center' }}>
            <p style={{ fontSize: '15px', color: '#9CA3AF', margin: 0 }}>No messages yet.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {messages.map((msg) => (
              <button
                key={msg.id}
                onClick={() => { setSelected(msg); if (!msg.read) handleMarkRead(msg.id) }}
                style={{
                  display: 'flex', flexDirection: 'column', gap: '4px', width: '100%',
                  padding: '14px 16px', border: `1px solid ${selected?.id === msg.id ? 'var(--admin-brand)' : '#E5E7EB'}`,
                  borderRadius: '10px', background: selected?.id === msg.id ? '#F0F7F3' : '#fff',
                  textAlign: 'left', cursor: 'pointer', transition: 'all 0.12s',
                  borderLeft: `4px solid ${msg.read ? 'transparent' : 'var(--admin-brand)'}`,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '15px', fontWeight: msg.read ? 500 : 700, color: '#111827' }}>{msg.firstName} {msg.lastName}</span>
                  <span style={{ fontSize: '12px', color: '#9CA3AF' }}>{new Date(msg.createdAt).toLocaleDateString()}</span>
                </div>
                <span style={{ fontSize: '13px', color: msg.read ? '#6B7280' : '#374151', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{msg.message}</span>
                <div style={{ fontSize: '12px', color: '#9CA3AF' }}>{msg.email}</div>
              </button>
            ))}
          </div>
        )}
      </div>

      {selected && (
        <div style={{ flex: 1, background: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '24px', minWidth: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 700, color: '#111827', margin: 0 }}>{selected.firstName} {selected.lastName}</h2>
              <p style={{ fontSize: '14px', color: '#6B7280', margin: '2px 0 0' }}>{selected.email}</p>
              <p style={{ fontSize: '13px', color: '#9CA3AF', margin: '2px 0 0' }}>{new Date(selected.createdAt).toLocaleString()}</p>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              {!selected.read && (
                <button onClick={() => handleMarkRead(selected.id)} style={{ padding: '6px 14px', border: '1px solid #E5E7EB', borderRadius: '6px', background: '#fff', fontSize: '12px', fontWeight: 600, color: '#374151', cursor: 'pointer' }}>
                  Mark read
                </button>
              )}
              <button onClick={() => handleDelete(selected.id)} style={{ padding: '6px 14px', border: '1px solid #FECACA', borderRadius: '6px', background: '#FEF2F2', fontSize: '12px', fontWeight: 600, color: '#DC2626', cursor: 'pointer' }}>
                Delete
              </button>
            </div>
          </div>
          <div style={{ padding: '16px', background: '#F9FAFB', borderRadius: '8px', whiteSpace: 'pre-wrap', fontSize: '15px', color: '#374151', lineHeight: 1.6 }}>
            {selected.message}
          </div>
        </div>
      )}
    </div>
  )
}
