import { useState } from 'react'
import { EventEditor } from '@/features/admin/events/EventEditor'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useEvents } from '@/features/events/hooks/useEvents'
import type { EventItem } from '@/types'

export default function AdminEventsPage() {
  const { events, isLoading, createEvent, updateEvent, deleteEvent, isCreating, isUpdating } = useEvents()
  const [filter, setFilter] = useState<'upcoming' | 'past'>('upcoming')
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<EventItem | null>(null)

  const now = new Date()
  const filtered = events.filter((e) => {
    const eventDate = new Date(e.startDate)
    return filter === 'upcoming' ? eventDate >= now : eventDate < now
  })

  function handleSave(data: Partial<EventItem>) {
    if (editingEvent) {
      updateEvent({ id: editingEvent.id, data })
    } else {
      createEvent(data as Omit<EventItem, 'id'>)
    }
    setIsCreateOpen(false)
    setEditingEvent(null)
  }

  function handleCancel() {
    setIsCreateOpen(false)
    setEditingEvent(null)
  }

  async function handleDelete() {
    if (!deleteTarget) return
    await deleteEvent(deleteTarget.id)
    setDeleteTarget(null)
  }

  return (
    <div>
      <div style={{
        display: 'flex', flexWrap: 'wrap', alignItems: 'center',
        justifyContent: 'space-between', gap: '16px', marginBottom: '24px'
      } as React.CSSProperties}>
        <h1 style={{
          fontFamily: 'var(--font-heading)', fontSize: '24px', fontWeight: 700,
          color: 'var(--text-heading)', margin: 0
        } as React.CSSProperties}>Events</h1>
        <Button variant="primary" onClick={() => setIsCreateOpen(true)}>Create Event</Button>
      </div>

      <div style={{
        display: 'flex', gap: '8px', marginBottom: '24px'
      } as React.CSSProperties}>
        <Button variant={filter === 'upcoming' ? 'primary' : 'secondary'} size="sm" onClick={() => setFilter('upcoming')}>Upcoming</Button>
        <Button variant={filter === 'past' ? 'primary' : 'secondary'} size="sm" onClick={() => setFilter('past')}>Past</Button>
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' } as React.CSSProperties}>
          {filtered.map((event) => (
            <div key={event.id} style={{
              display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start',
              justifyContent: 'space-between', gap: '16px',
              borderRadius: 'var(--radius-card)',
              border: '1px solid var(--border-subtle)',
              background: 'var(--surface-card)',
              padding: '20px', boxShadow: 'var(--shadow-sm)'
            } as React.CSSProperties}>
              <div style={{ flex: 1 } as React.CSSProperties}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px'
                } as React.CSSProperties}>
                  <Badge tone="neutral">{event.category}</Badge>
                </div>
                <h3 style={{
                  fontFamily: 'var(--font-heading)', fontWeight: 600,
                  color: 'var(--text-heading)', margin: 0
                } as React.CSSProperties}>{event.title}</h3>
                <p style={{
                  marginTop: '4px', fontSize: '14px', color: 'var(--text-body)',
                  display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                } as React.CSSProperties}>{event.description}</p>
                <div style={{
                  marginTop: '8px', display: 'flex', flexWrap: 'wrap', gap: '16px',
                  fontSize: '12px', color: 'var(--text-muted)'
                } as React.CSSProperties}>
                  <span>{new Date(event.startDate).toLocaleDateString()}</span>
                  {event.endDate && <span>to {new Date(event.endDate).toLocaleDateString()}</span>}
                  <span>{event.location.venue || event.location.city || event.location.address || ''}</span>
                </div>
              </div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '8px'
              } as React.CSSProperties}>
                <Badge tone={new Date(event.startDate) >= now ? 'green' : 'neutral'}>
                  {new Date(event.startDate) >= now ? 'Upcoming' : 'Past'}
                </Badge>
                <Button variant="ghost" size="sm" onClick={() => setEditingEvent(event)}>Edit</Button>
                <Button variant="ghost" size="sm" onClick={() => setDeleteTarget(event)}>Delete</Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={isCreateOpen || !!editingEvent} onClose={handleCancel} title={editingEvent ? 'Edit Event' : 'Create Event'} size="lg">
        <EventEditor existingEvent={editingEvent} onSave={handleSave} onCancel={handleCancel} />
      </Modal>

      <Modal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Delete Event" size="sm">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' } as React.CSSProperties}>
          <p style={{ fontSize: '14px', color: 'var(--text-body)' }}>
            Are you sure you want to delete &ldquo;{deleteTarget?.title}&rdquo;? This action cannot be undone.
          </p>
          <div style={{
            display: 'flex', justifyContent: 'flex-end', gap: '12px'
          } as React.CSSProperties}>
            <Button variant="ghost" onClick={() => setDeleteTarget(null)}>Cancel</Button>
            <button onClick={handleDelete} style={{
              padding: '10px 20px', background: 'var(--red-500)', color: '#fff',
              border: 'none', borderRadius: 'var(--radius-button)',
              fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600, cursor: 'pointer'
            } as React.CSSProperties}>Delete</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
