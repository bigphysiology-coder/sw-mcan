import { useState } from 'react'
import { useLodges } from '@/features/lodges/hooks/useLodges'
import { LodgeEditor } from '@/features/admin/lodges/LodgeEditor'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import type { Lodge } from '@/types'

export default function AdminLodgesPage() {
  const { lodges, isLoading, createLodge, updateLodge, deleteLodge, isCreating, isUpdating, isDeleting } = useLodges()
  const [editingLodge, setEditingLodge] = useState<Lodge | null>(null)
  const [creatingLodge, setCreatingLodge] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState<Lodge | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  function openEdit(lodge: Lodge) {
    setCreatingLodge(false)
    setEditingLodge(lodge)
  }

  function openCreate() {
    setEditingLodge(null)
    setCreatingLodge(true)
  }

  function handleCancel() {
    setEditingLodge(null)
    setCreatingLodge(false)
  }

  async function handleSave(data: Partial<Lodge>) {
    setError(null)
    try {
      if (creatingLodge) {
        await createLodge(data as Omit<Lodge, 'id'>)
        setCreatingLodge(false)
        setSuccess('Lodge created')
      } else if (editingLodge) {
        await updateLodge({ id: editingLodge.id, data })
        setEditingLodge(null)
        setSuccess('Lodge updated')
      }
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save lodge')
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return
    setError(null)
    try {
      await deleteLodge(deleteTarget.id)
      setDeleteTarget(null)
      setSuccess('Lodge deleted')
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete lodge')
    }
  }

  if (isLoading) return <div style={{ padding: '40px', textAlign: 'center', color: '#9CA3AF' }}>Loading lodges…</div>

  return (
    <div>
      {success && (
        <div style={{ marginBottom: '16px', padding: '12px 16px', background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '8px', color: '#065F46', fontSize: '14px', fontWeight: 500 }}>{success}</div>
      )}
      {error && (
        <div style={{ marginBottom: '16px', padding: '12px 16px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '8px', color: '#DC2626', fontSize: '14px' }}>{error}</div>
      )}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#111827', margin: 0 }}>Lodges</h1>
          <p style={{ fontSize: '14px', color: '#1a4731', marginTop: '4px' }}>Edit addresses and update live availability shown on the Lodges page.</p>
        </div>
        <Button
          variant="primary"
          onClick={openCreate}
          disabled={isCreating || isUpdating}
          style={{ background: 'var(--admin-brand-dark)', borderColor: 'var(--admin-brand-dark)' }}
        >
          New lodge
        </Button>
      </div>

      <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        {lodges.map((lodge) => (
          <div key={lodge.id} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 18px', borderBottom: '1px solid #F3F4F6' }}>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: 600, color: '#1F2937', margin: 0, fontSize: '14px' }}>{lodge.name}</p>
              <p style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '2px', margin: '2px 0 0 0' }}>{lodge.address}</p>
            </div>
            <span style={{ fontSize: '14px', color: '#4a7c5e', fontWeight: 500, width: '80px', textAlign: 'center' }}>{lodge.state}</span>
            <span style={{ fontSize: '14px', color: '#374151', fontWeight: 600, minWidth: '96px', textAlign: 'center' }}>{lodge.status}</span>
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              <Button variant="secondary" size="sm" onClick={() => openEdit(lodge)} disabled={isUpdating}>
                Edit
              </Button>
              <button onClick={() => setDeleteTarget(lodge)} style={{ padding: '6px 12px', background: 'transparent', color: '#DC2626', fontSize: '13px', fontWeight: 600, border: '1px solid #FECACA', borderRadius: '8px', cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Delete lodge" size="sm">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ fontSize: '14px', color: '#374151', margin: 0 }}>Delete <strong>{deleteTarget?.name}</strong>? This cannot be undone.</p>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <Button variant="ghost" onClick={() => setDeleteTarget(null)} disabled={isDeleting}>Cancel</Button>
            <button onClick={handleDelete} disabled={isDeleting} style={{ padding: '10px 20px', background: isDeleting ? '#9CA3AF' : '#DC2626', color: '#fff', border: 'none', borderRadius: '8px', fontFamily: 'inherit', fontSize: '14px', fontWeight: 600, cursor: isDeleting ? 'not-allowed' : 'pointer' }}>
              {isDeleting ? 'Deleting…' : 'Delete'}
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={creatingLodge || !!editingLodge} onClose={handleCancel} title={creatingLodge ? 'Create lodge' : editingLodge ? `Edit ${editingLodge.name}` : 'Edit lodge'} size="lg">
        <LodgeEditor existingLodge={editingLodge} onSave={handleSave} onCancel={handleCancel} isSaving={isCreating || isUpdating} />
      </Modal>
    </div>
  )
}
