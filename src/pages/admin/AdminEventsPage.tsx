import { useState } from 'react'
import { EventEditor } from '@/features/admin/events/EventEditor'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useEvents } from '@/hooks/useEvents'
import { ApiClientError } from '@/api/client'
import type { EventItem } from '@/types'

export default function AdminEventsPage() {
  const { adminEvents: events, isAdminLoading: isLoading, createEvent, updateEvent, deleteEvent, publishEvent } = useEvents()
  const [filter, setFilter] = useState<'upcoming' | 'past'>('upcoming')
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<EventItem | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)

  const now = new Date()
  const filtered = events.filter((e) => {
    const eventDate = new Date(e.startDate)
    return filter === 'upcoming' ? eventDate >= now : eventDate < now
  })

  const statusColors: Record<string, string> = {
    draft: '#D97706',
    published: '#059669',
    cancelled: '#DC2626',
  }
  const statusBgs: Record<string, string> = {
    draft: '#FFFBEB',
    published: '#ECFDF5',
    cancelled: '#FEF2F2',
  }

  async function handleSave(data: Partial<EventItem>) {
    setSubmitError(null)
    try {
      if (editingEvent) {
        await updateEvent({ id: editingEvent.id, data })
        setSuccessMsg('Event updated successfully')
      } else {
        await createEvent(data as Omit<EventItem, 'id'>)
        setSuccessMsg('Event created successfully')
      }
      setIsCreateOpen(false)
      setEditingEvent(null)
      setTimeout(() => setSuccessMsg(null), 3000)
    } catch (err) {
      if (err instanceof ApiClientError && err.errors) {
        const msgs = Object.entries(err.errors).map(([field, list]) =>
          `${field}: ${list.join(', ')}`
        ).join('\n')
        setSubmitError(msgs)
      } else {
        setSubmitError(err instanceof Error ? err.message : 'Failed to save event')
      }
    }
  }

  function handleCancel() {
    setIsCreateOpen(false)
    setEditingEvent(null)
    setSubmitError(null)
  }

  async function handleDelete() {
    if (!deleteTarget) return
    try {
      await deleteEvent(deleteTarget.id)
      setSuccessMsg('Event deleted')
      setTimeout(() => setSuccessMsg(null), 3000)
    } catch {
      setSubmitError('Failed to delete event')
    }
    setDeleteTarget(null)
  }

  return (
    <div>
      {successMsg && (
        <div style={{ marginBottom: '16px', padding: '12px 16px', background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '8px', color: '#065F46', fontSize: '14px', fontWeight: 500 }}>
          {successMsg}
        </div>
      )}
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
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', padding: '2px 10px', borderRadius: '9999px',
                    fontSize: '12px', fontWeight: 500,
                    background: statusBgs[event.status] || '#F3F4F6',
                    color: statusColors[event.status] || '#6B7280',
                  }}>
                    {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                  </span>
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
                  <span>{event.location?.venue || event.location?.city || event.location?.address || ''}</span>
                </div>
              </div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: '8px'
              } as React.CSSProperties}>
                <Badge tone={new Date(event.startDate) >= now ? 'green' : 'neutral'}>
                  {new Date(event.startDate) >= now ? 'Upcoming' : 'Past'}
                </Badge>
                {event.status === 'draft' && (
                  <Button variant="primary" size="sm" onClick={async () => { try { await publishEvent(event.id); setSuccessMsg('Event published'); setTimeout(() => setSuccessMsg(null), 3000) } catch (e) { setSubmitError(e instanceof Error ? e.message : 'Failed to publish') } }}>Publish</Button>
                )}
                {event.status === 'published' && (
                  <Button variant="secondary" size="sm" onClick={async () => { try { const { id, title, description, startDate, endDate, category, coverImage, location, capacity, isFree, slug, organizerContact } = event; await updateEvent({ id, data: { title, description, startDate, endDate: endDate || undefined, category, coverImage: coverImage || undefined, location: { venue: location?.venue || undefined, address: location?.address || undefined, city: location?.city || undefined, state: location?.state || undefined, isOnline: location?.isOnline || undefined, onlineLink: location?.onlineLink || undefined }, capacity: capacity || undefined, isFree: isFree || undefined, slug, organizerContact: organizerContact || undefined, status: 'draft' } }); setSuccessMsg('Event unpublished'); setTimeout(() => setSuccessMsg(null), 3000) } catch (e) { setSubmitError(e instanceof Error ? e.message : 'Failed to unpublish') } }}>Unpublish</Button>
                )}
                <Button variant="ghost" size="sm" onClick={() => setEditingEvent(event)}>Edit</Button>
                <Button variant="ghost" size="sm" onClick={() => setDeleteTarget(event)}>Delete</Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={isCreateOpen || !!editingEvent} onClose={handleCancel} title={editingEvent ? 'Edit Event' : 'Create Event'} size="lg">
        {submitError && (
          <div style={{ marginBottom: '16px', padding: '12px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '8px', color: '#DC2626', fontSize: '13px', whiteSpace: 'pre-line' }}>
            {submitError}
          </div>
        )}
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
              padding: '10px 20px', background: '#DC2626', color: '#fff',
              border: 'none', borderRadius: 'var(--radius-button)',
              fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600, cursor: 'pointer'
            } as React.CSSProperties}>Delete</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
