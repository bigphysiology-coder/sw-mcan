import { useLodges } from '@/features/lodges/hooks/useLodges'

export default function AdminLodgesPage() {
  const { lodges, isLoading, updateLodge, isUpdating } = useLodges()

  async function handleStatusChange(id: string, status: string) {
    await updateLodge({ id, data: { status: status as 'Available' | 'Limited' | 'Full' } })
  }

  if (isLoading) return <div style={{ padding: '40px', textAlign: 'center', color: '#9CA3AF' }}>Loading lodges…</div>

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#111827', margin: 0 }}>Lodges</h1>
          <p style={{ fontSize: '14px', color: '#1a4731', marginTop: '4px' }}>Edit addresses and update live availability shown on the Lodges page.</p>
        </div>
      </div>

      <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        {lodges.map((lodge) => (
          <div key={lodge.id} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 18px', borderBottom: '1px solid #F3F4F6' }}>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 600, color: '#1F2937', margin: 0, fontSize: '14px' }}>{lodge.name}</p>
              <p style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '2px', margin: '2px 0 0 0' }}>{lodge.address}</p>
            </div>
            <span style={{ fontSize: '14px', color: '#4a7c5e', fontWeight: 500, width: '80px', textAlign: 'center' }}>{lodge.state}</span>
            <select
              defaultValue={lodge.status}
              onChange={(e) => handleStatusChange(lodge.id, e.target.value)}
              disabled={isUpdating}
              style={{
                fontSize: '14px', border: '1px solid #E5E7EB', borderRadius: '8px',
                padding: '6px 12px', background: '#fff', color: '#374151',
                outline: 'none', fontFamily: 'inherit', cursor: 'pointer',
              }}
            >
              <option>Available</option>
              <option>Limited</option>
              <option>Full</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}
