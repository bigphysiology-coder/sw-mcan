import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import type { EventItem } from '@/types'

interface EventEditorProps {
  existingEvent?: EventItem | null
  onSave: (data: Partial<EventItem>) => void
  onCancel: () => void
}

const EVENT_CATEGORIES: EventItem['category'][] = ['meeting', 'conference', 'seminar', 'workshop', 'social', 'other']

function EventEditor({ existingEvent, onSave, onCancel }: EventEditorProps) {
  const [title, setTitle] = useState(existingEvent?.title ?? '')
  const [description, setDescription] = useState(existingEvent?.description ?? '')
  const [startDate, setStartDate] = useState(existingEvent?.startDate ?? '')
  const [venue, setVenue] = useState(existingEvent?.location?.venue ?? '')
  const [category, setCategory] = useState<EventItem['category']>(existingEvent?.category ?? 'meeting')
  const [coverImage, setCoverImage] = useState(existingEvent?.coverImage ?? '')
  const [imagePreview, setImagePreview] = useState(existingEvent?.coverImage ?? '')

  useEffect(() => {
    setTitle(existingEvent?.title ?? '')
    setDescription(existingEvent?.description ?? '')
    setStartDate(existingEvent?.startDate ?? '')
    setVenue(existingEvent?.location?.venue ?? '')
    setCategory(existingEvent?.category ?? 'meeting')
    setCoverImage(existingEvent?.coverImage ?? '')
    setImagePreview(existingEvent?.coverImage ?? '')
  }, [existingEvent])

  function handleImageFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : ''
      setCoverImage(result)
      setImagePreview(result)
    }
    reader.readAsDataURL(file)
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    onSave({
      title,
      description,
      startDate,
      location: { venue: venue || undefined },
      category,
      coverImage: coverImage || undefined,
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

      <Input
        label="Date"
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />

      <Input
        label="Location"
        value={venue}
        onChange={(e) => setVenue(e.target.value)}
        placeholder="Event venue"
      />

      <div>
        <label style={{
          display: 'block', marginBottom: '4px', fontSize: '14px',
          fontWeight: 600, color: 'var(--text-heading)',
        } as React.CSSProperties}>Category</label>
        <select
          id="event-category"
          value={category}
          onChange={(e) => setCategory(e.target.value as EventItem['category'])}
          style={fieldStyle}
        >
          {EVENT_CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c.charAt(0).toUpperCase() + c.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div style={{ display: 'grid', gap: '12px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: 600, color: 'var(--text-heading)' }}>
            Image upload
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageFileChange}
            style={{
              width: '100%', border: '1.5px dashed var(--border-default)', borderRadius: 'var(--radius-button)',
              background: 'var(--gray-50)', padding: '12px 16px', fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text-body)',
            }}
          />
        </div>

        <Input
          label="Or image URL"
          value={coverImage}
          onChange={(e) => {
            setCoverImage(e.target.value)
            setImagePreview(e.target.value)
          }}
          placeholder="https://example.com/image.jpg"
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-card)', padding: '12px', background: 'var(--gray-50)' }}>
          <div
            style={{
              width: '72px', height: '72px', borderRadius: '12px', flexShrink: 0,
              background: imagePreview ? `center/cover no-repeat url(${imagePreview})` : 'linear-gradient(135deg, #D1D5DB, #9CA3AF)',
            }}
          />
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            Upload a file or paste an image URL. The selected image will be saved with the event.
          </div>
        </div>
      </div>

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
