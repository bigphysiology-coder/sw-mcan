import { useState } from 'react'
import { useLodges } from '@/features/lodges/hooks/useLodges'
import { LodgeEditor } from '@/features/admin/lodges/LodgeEditor'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import type { Lodge } from '@/types'

export default function AdminLodgesPage() {
  const { lodges, isLoading, createLodge, updateLodge, isCreating, isUpdating } = useLodges()
  const [editingLodge, setEditingLodge] = useState<Lodge | null>(null)
  const [creatingLodge, setCreatingLodge] = useState(false)

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
    if (creatingLodge) {
      await createLodge(data as Omit<Lodge, 'id'>)
      setCreatingLodge(false)
      return
    }

    if (!editingLodge) return
    await updateLodge({ id: editingLodge.id, data })
    setEditingLodge(null)
  }

  if (isLoading) return <div style={{ padding: '40px', textAlign: 'center', color: '#9CA3AF' }}>Loading lodges…</div>

  return (
    <div>
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
            <Button variant="secondary" size="sm" onClick={() => openEdit(lodge)} disabled={isUpdating}>
              Edit
            </Button>
          </div>
        ))}
      </div>

      <Modal isOpen={creatingLodge || !!editingLodge} onClose={handleCancel} title={creatingLodge ? 'Create lodge' : editingLodge ? `Edit ${editingLodge.name}` : 'Edit lodge'} size="lg">
        <LodgeEditor existingLodge={editingLodge} onSave={handleSave} onCancel={handleCancel} isSaving={isCreating || isUpdating} />
      </Modal>
    </div>
  )
}
