import { useEffect, useState, type ChangeEvent, type FormEvent } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { uploadApi } from '@/api'
import type { Executive } from '@/types'

interface ExecutiveEditorProps {
  existingExecutive?: Executive | null
  onSave: (data: Partial<Executive>) => void | Promise<void>
  onCancel: () => void
  isSaving?: boolean
}

const STATE_OPTIONS = ['MCAN SOUTH WEST', 'Lagos', 'Ogun', 'Oyo', 'Osun', 'Ondo', 'Ekiti', 'Other']

function normalizeExecutiveState(state?: string) {
  return state === 'MCAN' ? 'MCAN SOUTH WEST' : state || 'MCAN SOUTH WEST'
}

function ExecutiveEditor({ existingExecutive, onSave, onCancel, isSaving = false }: ExecutiveEditorProps) {
  const [name, setName] = useState(existingExecutive?.name ?? '')
  const [role, setRole] = useState(existingExecutive?.role ?? '')
  const [state, setState] = useState(normalizeExecutiveState(existingExecutive?.state))
  const [photo, setPhoto] = useState(existingExecutive?.photo ?? '')
  const [photoPreview, setPhotoPreview] = useState(existingExecutive?.photo ?? '')
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    setName(existingExecutive?.name ?? '')
    setRole(existingExecutive?.role ?? '')
    setState(normalizeExecutiveState(existingExecutive?.state))
    setPhoto(existingExecutive?.photo ?? '')
    setPhotoPreview(existingExecutive?.photo ?? '')
  }, [existingExecutive])

  async function handleImageFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      const { url } = await uploadApi.uploadImage(formData)
      setPhoto(url)
      setPhotoPreview(url)
    } catch {
      // upload failed, keep existing photo
    } finally {
      setUploading(false)
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    void onSave({
      name,
      role,
      state,
      photo,
    })
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '16px' }}>
      <Input
        label="Full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Executive name"
      />

      <Input
        label="Title / role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
        placeholder="Secretary General"
      />

      <div>
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: 600, color: 'var(--text-heading)' }}>
          State / zone
        </label>
        <select
          value={state}
          onChange={(e) => setState(e.target.value)}
          style={{
            width: '100%', border: '1.5px solid var(--border-default)', borderRadius: 'var(--radius-button)',
            background: '#fff', padding: '12px 16px', fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text-heading)',
          }}
        >
          {STATE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div style={{ display: 'grid', gap: '12px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: 600, color: 'var(--text-heading)' }}>
            Photo upload
          </label>
          <input
            type="file"
            accept="image/*"
            disabled={uploading}
            onChange={handleImageFileChange}
            style={{
              width: '100%', border: '1.5px dashed var(--border-default)', borderRadius: 'var(--radius-button)',
              background: 'var(--gray-50)', padding: '12px 16px', fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text-body)',
            }}
          />
          {uploading && <span style={{ fontSize: '12px', color: 'var(--admin-brand)', marginTop: '4px', display: 'block' }}>Uploading…</span>}
        </div>

        <Input
          label="Or image URL"
          value={photo}
          onChange={(e) => {
            setPhoto(e.target.value)
            setPhotoPreview(e.target.value)
          }}
          placeholder="https://example.com/photo.jpg"
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-card)', padding: '12px', background: 'var(--gray-50)' }}>
          <div
            style={{
              width: '72px', height: '72px', borderRadius: '50%', flexShrink: 0,
              background: photoPreview ? `center/cover no-repeat url(${photoPreview})` : 'linear-gradient(135deg, #D1D5DB, #9CA3AF)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: photoPreview ? 'transparent' : '#6B7280', fontWeight: 700,
            }}
          >
            {!photoPreview ? (name ? name.split(' ').map((part) => part[0]).join('').slice(0, 3) : 'EXE') : ''}
          </div>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            Upload a file or paste an image URL. The selected image will be stored with the executive record.
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '4px' }}>
        <Button type="submit" variant="primary" disabled={isSaving || uploading}>
          {uploading ? 'Uploading…' : existingExecutive ? 'Update executive' : 'Save executive'}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel} disabled={isSaving || uploading}>
          Cancel
        </Button>
      </div>
    </form>
  )
}

export { ExecutiveEditor }