import { useState, useMemo } from 'react'
import { useWebContent } from '@/features/webcontent/hooks/useWebContent'

const ALL_SECTIONS = [
  'Hero', 'Stats', 'Programs', 'About',
  'News', 'Events', 'Gallery', 'Leadership',
  'Contact', 'FAQ', 'Donate', 'Membership',
  'Lodges', 'Portal', 'Digital ID', 'Projects',
]

const cardStyle: React.CSSProperties = {
  background: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px',
  padding: '18px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
}

export default function AdminWebContentPage() {
  const { content, isLoading, error: queryError, createContent, isCreating, updateContent, isUpdating } = useWebContent()
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const displayError = error || (queryError instanceof Error ? queryError.message : null)

  const mergedSections = useMemo(() => {
    if (!content?.sections) return ALL_SECTIONS.map(label => ({ label, visible: true }))
    const stored = content.sections
    return ALL_SECTIONS.map(label => {
      const existing = stored.find(s => s.label === label)
      return existing ?? { label, visible: true }
    })
  }, [content])

  if (isLoading) {
    return <div style={{ padding: '40px', textAlign: 'center', color: '#9CA3AF' }}>Loading web content…</div>
  }

  if (queryError || !content || (typeof content === 'object' && Object.keys(content).length === 0)) {
    return (
      <div>
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#111827', margin: 0 }}>Web content</h1>
          <p style={{ fontSize: '14px', color: '#1a4731', marginTop: '4px' }}>
            {displayError ? 'Error loading web content. Create it fresh to get started.' : 'No web content found. Create it to get started.'}
          </p>
        </div>
        <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '32px', textAlign: 'center', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          {displayError && (
            <p style={{ color: '#DC2626', fontSize: '14px', margin: '0 0 16px', wordBreak: 'break-word' }}>
              {displayError}
            </p>
          )}
          <p style={{ fontSize: '15px', color: '#6B7280', margin: '0 0 20px' }}>
            Web content powers the public site sections. Create default content to begin managing visibility.
          </p>
          <button
            onClick={async () => {
              setError(null)
              try {
                await createContent({ sections: ALL_SECTIONS.map(label => ({ label, visible: true })) })
                setSuccess('Web content created')
                setTimeout(() => setSuccess(null), 3000)
              } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to create web content')
                setTimeout(() => setError(null), 5000)
              }
            }}
            disabled={isCreating}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px',
              background: '#1a4731', color: '#fff', fontSize: '14px', fontWeight: 600,
              border: 'none', borderRadius: '8px', cursor: 'pointer',
              fontFamily: 'inherit', opacity: isCreating ? 0.6 : 1,
            }}
          >
            {isCreating ? 'Creating…' : 'Create default content'}
          </button>
          {error && <p style={{ color: '#DC2626', fontSize: '14px', marginTop: '16px' }}>{error}</p>}
          {success && <p style={{ color: '#16A34A', fontSize: '14px', marginTop: '16px' }}>{success}</p>}
        </div>
      </div>
    )
  }

  async function toggleSection(index: number) {
    setError(null)
    setSuccess(null)
    const updated = mergedSections.map((s, i) =>
      i === index ? { ...s, visible: !s.visible } : s
    )
    try {
      await updateContent({ sections: updated })
      setSuccess(`${updated[index].label} is now ${updated[index].visible ? 'visible' : 'hidden'}`)
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update')
      setTimeout(() => setError(null), 5000)
    }
  }

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#111827', margin: 0 }}>Web content</h1>
        <p style={{ fontSize: '14px', color: '#1a4731', marginTop: '4px' }}>Toggle visibility of public site sections and pages.</p>
      </div>

      {success && (
        <div style={{ marginBottom: '16px', padding: '12px 16px', background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '8px', color: '#065F46', fontSize: '14px', fontWeight: 500 }}>
          {success}
        </div>
      )}
      {error && (
        <div style={{ marginBottom: '16px', padding: '12px 16px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '8px', color: '#DC2626', fontSize: '14px' }}>
          {error}
        </div>
      )}

      <div style={{ ...cardStyle }}>
        <div style={{ borderTop: '1px solid #E5E7EB' }}>
          {mergedSections.map((s, i) => (
            <div key={s.label} style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '12px 0', borderBottom: '1px solid #E5E7EB',
            }}>
              <span style={{ fontSize: '14px', color: '#374151' }}>{s.label}</span>
              <button
                onClick={() => toggleSection(i)}
                disabled={isUpdating}
                role="switch"
                aria-checked={s.visible}
                style={{
                  position: 'relative', display: 'inline-flex', height: '24px', width: '44px',
                  alignItems: 'center', borderRadius: '9999px',
                  background: s.visible ? '#1a4731' : '#D1D5DB',
                  transition: 'background 200ms', border: 'none',
                  cursor: isUpdating ? 'not-allowed' : 'pointer',
                  opacity: isUpdating ? 0.6 : 1,
                }}
              >
                <span style={{
                  display: 'inline-block', height: '16px', width: '16px',
                  transform: s.visible ? 'translateX(24px)' : 'translateX(4px)',
                  borderRadius: '50%', background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
                  transition: 'transform 200ms',
                }} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
