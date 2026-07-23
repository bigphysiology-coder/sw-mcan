import { useState, useRef } from 'react'
import { useGallery } from '@/features/gallery/hooks/useGallery'

export default function AdminGalleryPage() {
  const { photos, isLoading, uploadPhoto, deletePhoto, isUploading } = useGallery()
  const [caption, setCaption] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || [])
    for (const f of files) {
      await uploadPhoto({ file: f, caption: caption || f.name })
    }
    setCaption('')
    if (inputRef.current) inputRef.current.value = ''
  }

  async function handleRemove(id: string) {
    await deletePhoto(id)
  }

  if (isLoading) return <div style={{ padding: '40px', textAlign: 'center', color: '#9CA3AF' }}>Loading gallery…</div>

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#111827', margin: 0 }}>Gallery</h1>
          <p style={{ fontSize: '14px', color: '#1a4731', marginTop: '4px' }}>Upload event photos to the public gallery. Drag images here or browse.</p>
        </div>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>Caption (optional)</label>
        <input value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Photo caption…" style={{ width: '100%', maxWidth: '400px', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '8px 12px', fontSize: '14px', fontFamily: 'inherit', boxSizing: 'border-box' }} />
      </div>

      <div
        onClick={() => !isUploading && inputRef.current?.click()}
        style={{
          border: '2px dashed rgba(26, 71, 49, 0.3)', borderRadius: '12px',
          background: 'rgba(232, 245, 238, 0.4)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          padding: '48px 0', marginBottom: '24px', cursor: isUploading ? 'not-allowed' : 'pointer',
          transition: 'background 140ms',
          opacity: isUploading ? 0.6 : 1,
        }}
        onMouseEnter={(e) => { if (!isUploading) e.currentTarget.style.background = 'rgba(232, 245, 238, 0.6)' }}
        onMouseLeave={(e) => { if (!isUploading) e.currentTarget.style.background = 'rgba(232, 245, 238, 0.4)' }}
      >
        <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '12px' }}>
          <svg style={{ width: '24px', height: '24px', color: 'var(--admin-brand)' }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>
        </div>
        <p style={{ fontWeight: 600, color: '#1a4731', fontSize: '14px', margin: 0 }}>{isUploading ? 'Uploading…' : 'Drop images to upload'}</p>
        <p style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '4px' }}>JPG or PNG up to 8MB &middot; or click to browse</p>
        <input ref={inputRef} type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={handleUpload} disabled={isUploading} />
      </div>

      <div style={{ display: 'grid', gap: '12px', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))' }}>
        {photos.map((photo) => (
          <div key={photo.id} style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', background: '#E5E7EB', aspectRatio: '1' }}>
            <img src={photo.src} alt={photo.caption} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            {photo.caption && (
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.5)', color: '#fff', fontSize: '11px', padding: '4px 8px' }}>{photo.caption}</div>
            )}
            <button onClick={() => handleRemove(photo.id)} style={{
              position: 'absolute', top: '8px', right: '8px', width: '24px', height: '24px',
              borderRadius: '50%', background: '#fff', border: 'none', display: 'flex',
              alignItems: 'center', justifyContent: 'center', color: '#DC2626', cursor: 'pointer',
              boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
            }}>
              <svg style={{ width: '12px', height: '12px' }} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
        ))}
      </div>

      {photos.length === 0 && (
        <p style={{ textAlign: 'center', color: '#9CA3AF', fontSize: '14px', marginTop: '24px' }}>No photos yet. Upload some above.</p>
      )}
    </div>
  )
}
