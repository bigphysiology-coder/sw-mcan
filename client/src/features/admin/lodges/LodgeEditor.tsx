import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { uploadApi } from '@/api'
import type { Lodge } from '@/types'

interface LodgeEditorProps {
  existingLodge?: Lodge | null
  onSave: (data: Partial<Lodge>) => void | Promise<void>
  onCancel: () => void
  isSaving?: boolean
}

const STATUS_OPTIONS: Lodge['status'][] = ['Available', 'Limited', 'Full']

function toFormValues(lodge?: Lodge | null) {
  return {
    name: lodge?.name ?? '',
    photo: lodge?.photo ?? '',
    address: lodge?.address ?? '',
    state: lodge?.state ?? '',
    capacity: lodge?.capacity?.toString() ?? '',
    status: lodge?.status ?? 'Available',
    coordinator: lodge?.coordinator ?? '',
    phone: lodge?.phone ?? '',
    map: lodge?.map ?? '',
  }
}

function LodgeEditor({ existingLodge, onSave, onCancel, isSaving = false }: LodgeEditorProps) {
  const [form, setForm] = useState(() => toFormValues(existingLodge))
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    setForm(toFormValues(existingLodge))
  }, [existingLodge])

  function updateField<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((current) => ({ ...current, [key]: value }))
  }

  async function handlePhotoUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const { url } = await uploadApi.uploadImage(formData)
      updateField('photo', url)
    } catch {
      // upload failed, keep existing photo
    } finally {
      setUploading(false)
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const data: Partial<Lodge> = {
      name: form.name.trim(),
      photo: form.photo.trim(),
      address: form.address.trim(),
      state: form.state.trim(),
      capacity: Number(form.capacity) || 0,
      status: form.status,
      coordinator: form.coordinator.trim(),
      phone: form.phone.trim(),
    }
    // Only include map if it has a value; backend rejects empty string as invalid URL
    const mapValue = form.map.trim()
    if (mapValue) {
      data.map = mapValue
    }
    void onSave(data)
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '16px' }}>
      <div>
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: 600, color: 'var(--text-heading)' }}>
          Lodge photo
        </label>
        <div style={{ display: 'grid', gap: '12px' }}>
          {form.photo ? (
            <div style={{ height: '180px', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--border-subtle)', background: '#f3f4f6' }}>
              <img src={form.photo} alt={form.name || 'Lodge preview'} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          ) : (
            <div style={{ height: '180px', borderRadius: '16px', border: '1px dashed var(--border-default)', background: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: '14px' }}>
              No photo selected yet
            </div>
          )}
          <Input label="Photo URL" value={form.photo} onChange={(e) => updateField('photo', e.target.value)} placeholder="Paste an image URL or upload a file" />
          <Input label="Upload photo" type="file" accept="image/*" disabled={uploading} onChange={handlePhotoUpload} />
{uploading && <span style={{ fontSize: '12px', color: 'var(--admin-brand)', marginTop: '4px', display: 'block' }}>Uploading...</span>}
        </div>
      </div>

      <Input label="Lodge name" value={form.name} onChange={(e) => updateField('name', e.target.value)} placeholder="Lodge name" />

      <Input label="Address" value={form.address} onChange={(e) => updateField('address', e.target.value)} placeholder="Street, city, state" />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '16px' }}>
        <Input label="State" value={form.state} onChange={(e) => updateField('state', e.target.value)} placeholder="Lagos" />
        <Input label="Capacity" type="number" min="0" value={form.capacity} onChange={(e) => updateField('capacity', e.target.value)} placeholder="24" />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: 600, color: 'var(--text-heading)' }}>
          Live availability
        </label>
        <select
          value={form.status}
          onChange={(e) => updateField('status', e.target.value as Lodge['status'])}
          style={{
            width: '100%', border: '1.5px solid var(--border-default)', borderRadius: 'var(--radius-button)',
            background: '#fff', padding: '12px 16px', fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text-heading)',
          }}
        >
          {STATUS_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '16px' }}>
        <Input label="Coordinator" value={form.coordinator} onChange={(e) => updateField('coordinator', e.target.value)} placeholder="Name of lodge coordinator" />
        <Input label="Phone" value={form.phone} onChange={(e) => updateField('phone', e.target.value)} placeholder="0800 000 0000" />
      </div>

      <Input label="Google Maps URL" value={form.map} onChange={(e) => updateField('map', e.target.value)} placeholder="https://maps.google.com/?q=Ikeja+Lagos" />

      <p style={{ margin: 0, fontSize: '13px', lineHeight: 1.5, color: 'var(--text-muted)' }}>
        Changes are saved to the same lodge store used by the public Lodges page, so updates appear live after save.
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '4px' }}>
        <Button type="submit" variant="primary" disabled={isSaving || uploading}>
          {uploading ? 'Uploading...' : existingLodge ? 'Save changes' : 'Create lodge'}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel} disabled={isSaving || uploading}>
          Cancel
        </Button>
      </div>
    </form>
  )
}

export { LodgeEditor }
