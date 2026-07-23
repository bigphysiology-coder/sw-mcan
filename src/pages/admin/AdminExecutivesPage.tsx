import { useState } from 'react'
import { useExecutives } from '@/features/executives/hooks/useExecutives'
import { ExecutiveEditor } from '@/features/admin/executives/ExecutiveEditor'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import type { Executive } from '@/types'

export default function AdminExecutivesPage() {
  const { executives, isLoading, createExecutive, updateExecutive, deleteExecutive, isCreating, isUpdating } = useExecutives()
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [editingExecutive, setEditingExecutive] = useState<Executive | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Executive | null>(null)

  function openCreate() {
    setEditingExecutive(null)
    setIsCreateOpen(true)
  }

  function openEdit(executive: Executive) {
    setEditingExecutive(executive)
    setIsCreateOpen(true)
  }

  function handleCancel() {
    setIsCreateOpen(false)
    setEditingExecutive(null)
  }

  async function handleSave(data: Partial<Executive>) {
    if (editingExecutive) {
      await updateExecutive({ id: editingExecutive.id, data })
    } else {
      await createExecutive({
        name: data.name || '',
        role: data.role || '',
        state: data.state || 'MCAN',
        photo: data.photo || '',
      })
    }
    handleCancel()
  }

  async function handleRemove() {
    if (!deleteTarget) return
    await deleteExecutive(deleteTarget.id)
    setDeleteTarget(null)
  }

  if (isLoading) return <div style={{ padding: '40px', textAlign: 'center', color: '#9CA3AF' }}>Loading executives…</div>

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#111827', margin: 0 }}>Executives</h1>
          <p style={{ fontSize: '14px', color: '#1a4731', marginTop: '4px' }}>Add, edit, and remove members of the zonal executive council shown on the Leadership page.</p>
        </div>
        <button
          onClick={openCreate}
          disabled={isCreating || isUpdating}
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
              <button onClick={() => setDeleteTarget(exec)} style={{
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
              <p style={{ fontSize: '12px', color: '#6B7280', margin: '4px 0 0 0' }}>{exec.state}</p>
              <div style={{ display: 'flex', gap: '8px', marginTop: '14px' }}>
                <Button variant="secondary" size="sm" onClick={() => openEdit(exec)} disabled={isCreating || isUpdating}>
                  Edit
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setDeleteTarget(exec)} disabled={isCreating || isUpdating}>
                  Delete
                </Button>
              </div>
            </div>
          )
        })}

        <button
          onClick={openCreate}
          disabled={isCreating || isUpdating}
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

      <Modal isOpen={isCreateOpen} onClose={handleCancel} title={editingExecutive ? 'Edit Executive' : 'Add Executive'} size="lg">
        <ExecutiveEditor
          existingExecutive={editingExecutive}
          onSave={handleSave}
          onCancel={handleCancel}
          isSaving={isCreating || isUpdating}
        />
      </Modal>

      <Modal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Delete Executive" size="sm">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ fontSize: '14px', color: '#374151', margin: 0 }}>
            Are you sure you want to delete “{deleteTarget?.name}”? This action cannot be undone.
          </p>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <Button variant="ghost" onClick={() => setDeleteTarget(null)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleRemove} disabled={isCreating || isUpdating}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
