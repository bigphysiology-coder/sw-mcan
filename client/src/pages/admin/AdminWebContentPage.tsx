import { useWebContent } from '@/features/webcontent/hooks/useWebContent'

export default function AdminWebContentPage() {
  const { content, isLoading, updateContent, isUpdating } = useWebContent()

  if (isLoading) {
    return <div style={{ padding: '40px', textAlign: 'center', color: '#9CA3AF' }}>Loading web content…</div>
  }

  if (!content) {
    return <div style={{ padding: '40px', textAlign: 'center', color: '#9CA3AF' }}>No web content available yet.</div>
  }

  const currentContent = content

  async function saveHeadline() {
    const el = document.getElementById('hero-headline') as HTMLTextAreaElement | null
    if (el) await updateContent({ headline: el.value })
  }

  async function toggleSection(index: number) {
    const sections = currentContent.sections ?? []
    const updated = sections.map((s, i) =>
      i === index ? { ...s, visible: !s.visible } : s
    )
    await updateContent({ sections: updated })
  }

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#111827', margin: 0 }}>Web content</h1>
        <p style={{ fontSize: '14px', color: '#1a4731', marginTop: '4px' }}>Edit headline copy and choose which sections appear on the public site.</p>
      </div>

      <div className="resp-grid-2" style={{ display: 'grid', gap: '20px', gridTemplateColumns: '1fr 1fr' }}>
        <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '18px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#374151', margin: '0 0 16px 0' }}>Homepage hero</h2>
          <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Headline</label>
          <textarea
            id="hero-headline"
            rows={3}
            defaultValue={content.headline}
            style={{
              width: '100%', border: '1px solid #E5E7EB', borderRadius: '8px',
              padding: '10px 12px', fontSize: '14px', color: '#1a4731', outline: 'none',
              fontFamily: 'inherit', resize: 'none', boxSizing: 'border-box',
            }}
          />
          <button
            onClick={saveHeadline}
            disabled={isUpdating}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px',
              background: '#1a4731', color: '#fff', fontSize: '14px', fontWeight: 600,
              border: 'none', borderRadius: '8px', cursor: isUpdating ? 'not-allowed' : 'pointer',
              fontFamily: 'inherit', marginTop: '16px', opacity: isUpdating ? 0.6 : 1,
            }}
          >
            <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
            Save changes
          </button>
        </div>

        <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '18px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#374151', margin: '0 0 16px 0' }}>Visible sections</h2>
          <div style={{ borderTop: '1px solid #E5E7EB' }}>
            {content.sections.map((s, i) => (
              <div key={s.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #E5E7EB' }}>
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
                    transition: 'background 200ms', border: 'none', cursor: isUpdating ? 'not-allowed' : 'pointer',
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
    </div>
  )
}
