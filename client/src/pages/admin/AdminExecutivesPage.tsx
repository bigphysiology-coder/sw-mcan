import { useExecutives } from '@/features/executives/hooks/useExecutives'

export default function AdminExecutivesPage() {
  const { executives, isLoading, createExecutive, deleteExecutive, isCreating } = useExecutives()

  async function handleAdd() {
    const name = prompt('Full name:')
    if (!name) return
    const role = prompt('Title / role:')
    if (!role) return
    await createExecutive({ name, role, photo: '', state: 'MCAN' })
  }

  async function handleRemove(id: string, name: string) {
    if (!window.confirm(`Remove ${name}?`)) return
    await deleteExecutive(id)
  }

  if (isLoading) return <div style={{ padding: '40px', textAlign: 'center', color: '#9CA3AF' }}>Loading executives…</div>

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#111827', margin: 0 }}>Executives</h1>
          <p style={{ fontSize: '14px', color: '#1a4731', marginTop: '4px' }}>Add or remove members of the zonal executive council shown on the Leadership page.</p>
        </div>
        <button
          onClick={handleAdd}
          disabled={isCreating}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: '#1a4731', color: '#fff', fontSize: '14px', fontWeight: 600, border: 'none', borderRadius: '8px', cursor: isCreating ? 'not-allowed' : 'pointer', opacity: isCreating ? 0.6 : 1, fontFamily: 'inherit' }}
        >
          <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
          Add executive
        </button>
      </div>

      <div style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
        {executives.map((exec) => {
          const initials = exec.name.split(' ').map((s) => s[0]).join('').slice(0, 3)
          return (
            <div key={exec.id} style={{
              background: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px',
              padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center',
              textAlign: 'center', position: 'relative', boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            }}>
              <button onClick={() => handleRemove(exec.id, exec.name)} style={{
                position: 'absolute', top: '12px', right: '12px', color: '#F87171',
                border: 'none', background: 'transparent', cursor: 'pointer', padding: 0,
              }}>
                <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"/></svg>
              </button>
              <div style={{ position: 'relative' }}>
                <div style={{
                  width: '80px', height: '80px', borderRadius: '50%',
                  background: exec.photo ? `center/cover no-repeat url(${exec.photo})` : 'linear-gradient(135deg, #D1D5DB, #9CA3AF)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '14px', fontWeight: 600, color: exec.photo ? 'transparent' : '#6B7280', marginBottom: '12px',
                }}>
                  {exec.photo ? '' : initials}
                </div>
              </div>
              <p style={{ fontWeight: 600, color: '#1F2937', fontSize: '14px', margin: 0 }}>{exec.name}</p>
              <p style={{ fontSize: '12px', color: '#1a4731', fontWeight: 500, marginTop: '2px', margin: '2px 0 0 0' }}>{exec.role}</p>
            </div>
          )
        })}

        <button
          onClick={handleAdd}
          disabled={isCreating}
          style={{
            border: '2px dashed #E5E7EB', borderRadius: '12px', padding: '20px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            textAlign: 'center', cursor: isCreating ? 'not-allowed' : 'pointer', background: 'transparent',
            opacity: isCreating ? 0.6 : 1,
            transition: 'border-color 140ms, background 140ms',
          }}
          onMouseEnter={(e) => { if (!isCreating) { e.currentTarget.style.borderColor = 'rgba(26,71,49,0.4)'; e.currentTarget.style.background = 'rgba(232,245,238,0.3)' } }}
          onMouseLeave={(e) => { if (!isCreating) { e.currentTarget.style.borderColor = '#E5E7EB'; e.currentTarget.style.background = 'transparent' } }}
        >
          <div style={{
            width: '48px', height: '48px', borderRadius: '50%', background: '#F3F4F6',
            display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px',
          }}>
            <svg style={{ width: '20px', height: '20px', color: '#9CA3AF' }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
          </div>
          <p style={{ fontSize: '14px', fontWeight: 500, color: '#9CA3AF', margin: 0 }}>Add executive</p>
        </button>
      </div>
    </div>
  )
}
