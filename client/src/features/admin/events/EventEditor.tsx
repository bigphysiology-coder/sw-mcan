import { useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import type { EventItem } from '@/types'

interface EventEditorProps {
  existingEvent?: EventItem | null
  onSave: (data: Partial<EventItem>) => void
  onCancel: () => void
}

const EVENT_TYPES: EventItem['type'][] = ['lecture', 'welfare', 'education', 'outreach', 'convention']

function EventEditor({ existingEvent, onSave, onCancel }: EventEditorProps) {
  const [title, setTitle] = useState(existingEvent?.title ?? '')
  const [description, setDescription] = useState(existingEvent?.description ?? '')
  const [date, setDate] = useState(existingEvent?.date ?? '')
  const [time, setTime] = useState(existingEvent?.time ?? '')
  const [location, setLocation] = useState(existingEvent?.location ?? '')
  const [type, setType] = useState<EventItem['type']>(existingEvent?.type ?? 'lecture')
  const [image, setImage] = useState(existingEvent?.image ?? '')
  const [registrationUrl, setRegistrationUrl] = useState(existingEvent?.registrationUrl ?? '')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    onSave({
      title,
      description,
      date,
      time,
      location,
      type,
      image: image || undefined,
      registrationUrl: registrationUrl || undefined,
    })
  }

  const fieldStyle: React.CSSProperties = {
    fontFamily: 'var(--font-body)', fontSize: '14px', padding: '12px 16px',
    borderRadius: 'var(--radius-button)', border: '1.5px solid var(--border-default)',
    background: 'var(--white)', color: 'var(--text-heading)', outline: 'none', width: '100%',
    boxSizing: 'border-box',
    transition: 'border-color var(--dur-fast) var(--ease-standard)',
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '16px' } as React.CSSProperties}>
      <Input
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Event title"
      />

      <div>
        <label style={{
          display: 'block', marginBottom: '4px', fontSize: '14px',
          fontWeight: 600, color: 'var(--text-heading)',
        } as React.CSSProperties}>Description</label>
        <textarea
          id="event-description"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Event description"
          style={fieldStyle}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' } as React.CSSProperties}>
        <Input
          label="Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <Input
          label="Time"
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
      </div>

      <Input
        label="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Event venue"
      />

      <div>
        <label style={{
          display: 'block', marginBottom: '4px', fontSize: '14px',
          fontWeight: 600, color: 'var(--text-heading)',
        } as React.CSSProperties}>Type</label>
        <select
          id="event-type"
          value={type}
          onChange={(e) => setType(e.target.value as EventItem['type'])}
          style={fieldStyle}
        >
          {EVENT_TYPES.map((t) => (
            <option key={t} value={t}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <Input
        label="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        placeholder="https://example.com/image.jpg"
      />

      <Input
        label="Registration URL (optional)"
        value={registrationUrl}
        onChange={(e) => setRegistrationUrl(e.target.value)}
        placeholder="https://example.com/register"
      />

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '8px' } as React.CSSProperties}>
        <Button type="submit" variant="primary">
          {existingEvent ? 'Update' : 'Save'}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  )
}

export { EventEditor }
