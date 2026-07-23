import { useDonations } from '@/features/donations/hooks/useDonations'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { useState } from 'react'
import type { Donation } from '@/types'

const formatNaira = (v: number) => '₦' + (v / 1000).toFixed(1) + (v >= 1000 ? 'M' : 'K')

export default function AdminDonationsPage() {
  const { donations, stats, isLoading, createDonation, updateDonation, deleteDonation } = useDonations()
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ donor: '', amount: '', purpose: '' })
  const [editing, setEditing] = useState<Donation | null>(null)
  const [editForm, setEditForm] = useState({ donor: '', amount: '', purpose: '' })
  const [deleteTarget, setDeleteTarget] = useState<Donation | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const raisedYear = stats ? formatNaira(stats.raisedYear) : '—'
  const raisedMonth = stats ? formatNaira(stats.raisedMonth) : '—'
  const pendingReview = String(donations.filter((d) => d.status === 'Pending').length)
  const monthlyPartners = '—'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    const amountNum = parseFloat(form.amount) || 0
    if (!amountNum) { setError('Enter a valid amount'); return }
    setSubmitting(true)
    try {
      await createDonation({
        donor: form.donor, amount: String(amountNum), amountValue: amountNum,
        purpose: form.purpose, date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }),
        status: 'Confirmed',
      })
      setForm({ donor: '', amount: '', purpose: '' })
      setShowForm(false)
      setSuccess('Donation recorded')
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save donation')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleEditSave() {
    if (!editing) return
    setError(null)
    const amountNum = parseFloat(editForm.amount) || 0
    if (!amountNum) { setError('Enter a valid amount'); return }
    setSubmitting(true)
    try {
      await updateDonation({ id: editing.id, data: { donor: editForm.donor, amount: String(amountNum), amountValue: amountNum, purpose: editForm.purpose } })
      setEditing(null)
      setSuccess('Donation updated')
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update donation')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleConfirm(d: Donation) {
    try {
      await updateDonation({ id: d.id, data: { status: 'Confirmed' } })
      setSuccess('Donation confirmed')
      setTimeout(() => setSuccess(null), 3000)
    } catch {
      setError('Failed to confirm donation')
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return
    try {
      await deleteDonation(deleteTarget.id)
      setDeleteTarget(null)
      setSuccess('Donation deleted')
      setTimeout(() => setSuccess(null), 3000)
    } catch {
      setError('Failed to delete donation')
    }
  }

  if (isLoading) return <div style={{ padding: '40px', textAlign: 'center', color: '#9CA3AF' }}>Loading donations…</div>

  const inputStyle: React.CSSProperties = {
    width: '100%', border: '1px solid #E5E7EB', borderRadius: '8px',
    padding: '8px 12px', fontSize: '14px', fontFamily: 'inherit', boxSizing: 'border-box',
  }

  return (
    <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 16px' }}>
      {success && (
        <div style={{ marginBottom: '16px', padding: '12px 16px', background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '8px', color: '#065F46', fontSize: '14px', fontWeight: 500 }}>{success}</div>
      )}
      {error && (
        <div style={{ marginBottom: '16px', padding: '12px 16px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '8px', color: '#DC2626', fontSize: '14px' }}>{error}</div>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#111827', margin: 0 }}>Donations</h1>
            <p style={{ fontSize: '14px', color: '#1a4731', marginTop: '4px' }}>Track contributions, confirm transfers and manage monthly partners.</p>
          </div>
          <button onClick={() => setShowForm(!showForm)} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: '#1a4731', color: '#fff', fontSize: '14px', fontWeight: 600, border: 'none', borderRadius: '8px', cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>
            <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
            Record donation
          </button>
        </div>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '18px', marginBottom: '24px', display: 'grid', gap: '12px', gridTemplateColumns: '1fr', '@media (min-width: 640px)': { gridTemplateColumns: '1fr 1fr 1fr auto' } } as React.CSSProperties}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>Donor</label>
            <input required value={form.donor} onChange={(e) => setForm({ ...form, donor: e.target.value })} style={inputStyle} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>Amount (₦)</label>
            <input required type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} style={inputStyle} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>Purpose</label>
            <input required value={form.purpose} onChange={(e) => setForm({ ...form, purpose: e.target.value })} style={inputStyle} />
          </div>
          <button type="submit" disabled={submitting} style={{ padding: '8px 16px', background: submitting ? '#9CA3AF' : '#1a4731', color: '#fff', fontSize: '14px', fontWeight: 600, border: 'none', borderRadius: '8px', cursor: submitting ? 'not-allowed' : 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap', height: 'fit-content', alignSelf: 'end' }}>{submitting ? 'Saving…' : 'Save'}</button>
        </form>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4" style={{ gap: '16px', marginBottom: '24px' }}>
        {[{ label: 'Raised this year', value: raisedYear }, { label: 'This month', value: raisedMonth }, { label: 'Pending review', value: pendingReview }, { label: 'Monthly partners', value: monthlyPartners }].map((s) => (
          <div key={s.label} style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '18px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#111827' }}>{s.value}</div>
            <div style={{ fontSize: '14px', color: '#6B7280', marginTop: '4px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        <div className="hidden sm:grid" style={{ gridTemplateColumns: '2fr 1fr 1fr 1fr 120px', padding: '12px 18px', background: '#F9FAFB', borderBottom: '1px solid #E5E7EB', fontSize: '12px', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          <div>Donor</div>
          <div>Amount</div>
          <div>Purpose</div>
          <div>Date</div>
          <div>Actions</div>
        </div>
        <div>
          {donations.map((d) => (
            <div key={d.id}>
              <div className="hidden sm:grid" style={{
                gridTemplateColumns: '2fr 1fr 1fr 1fr 120px', alignItems: 'center', padding: '14px 18px',
                fontSize: '14px', color: '#374151', borderBottom: '1px solid #F3F4F6',
              }}>
                <div style={{ fontWeight: 500 }}>{d.donor}</div>
                <div style={{ fontWeight: 600 }}>{d.amount}</div>
                <div style={{ color: '#9CA3AF' }}>{d.purpose}</div>
                <div style={{ color: '#9CA3AF' }}>{d.date}</div>
                <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
                  {d.status === 'Pending' && (
                    <button onClick={() => handleConfirm(d)} style={{ padding: '4px 8px', background: '#059669', color: '#fff', fontSize: '11px', fontWeight: 600, border: 'none', borderRadius: '6px', cursor: 'pointer', fontFamily: 'inherit' }}>
                      Confirm
                    </button>
                  )}
                  <button onClick={() => { setEditing(d); setEditForm({ donor: d.donor, amount: d.amount.replace(/[₦,]/g, ''), purpose: d.purpose }) }} style={{ padding: '4px 8px', background: 'transparent', color: '#6B7280', fontSize: '11px', fontWeight: 600, border: '1px solid #D1D5DB', borderRadius: '6px', cursor: 'pointer', fontFamily: 'inherit' }}>
                    Edit
                  </button>
                  <button onClick={() => setDeleteTarget(d)} style={{ padding: '4px 8px', background: 'transparent', color: '#DC2626', fontSize: '11px', fontWeight: 600, border: '1px solid #FECACA', borderRadius: '6px', cursor: 'pointer', fontFamily: 'inherit' }}>
                    Del
                  </button>
                </div>
              </div>

              <div className="sm:hidden" style={{ padding: '14px 18px', borderBottom: '1px solid #F3F4F6' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                  <div style={{ fontWeight: 600 }}>{d.donor}</div>
                  <div style={{ fontWeight: 700, color: '#1a4731' }}>{d.amount}</div>
                </div>
                <div style={{ fontSize: '13px', color: '#9CA3AF', marginBottom: '4px' }}>{d.purpose}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', color: '#9CA3AF' }}>{d.date}</span>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', padding: '2px 10px', borderRadius: '9999px',
                    fontSize: '12px', fontWeight: 500,
                    background: d.status === 'Confirmed' ? 'var(--admin-brand-light)' : '#FFFBEB',
                    color: d.status === 'Confirmed' ? 'var(--admin-brand)' : '#D97706',
                  }}>{d.status}</span>
                </div>
                <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                  {d.status === 'Pending' && (
                    <button onClick={() => handleConfirm(d)} style={{ padding: '4px 12px', background: '#059669', color: '#fff', fontSize: '12px', fontWeight: 600, border: 'none', borderRadius: '6px', cursor: 'pointer', fontFamily: 'inherit' }}>
                      Confirm
                    </button>
                  )}
                  <button onClick={() => { setEditing(d); setEditForm({ donor: d.donor, amount: d.amount.replace(/[₦,]/g, ''), purpose: d.purpose }) }} style={{ padding: '4px 12px', background: 'transparent', color: '#6B7280', fontSize: '12px', fontWeight: 600, border: '1px solid #D1D5DB', borderRadius: '6px', cursor: 'pointer', fontFamily: 'inherit' }}>
                    Edit
                  </button>
                  <button onClick={() => setDeleteTarget(d)} style={{ padding: '4px 12px', background: 'transparent', color: '#DC2626', fontSize: '12px', fontWeight: 600, border: '1px solid #FECACA', borderRadius: '6px', cursor: 'pointer', fontFamily: 'inherit' }}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal isOpen={!!editing} onClose={() => setEditing(null)} title="Edit Donation" size="sm">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#6B7280', marginBottom: '4px' }}>Donor</label>
            <input value={editForm.donor} onChange={(e) => setEditForm({ ...editForm, donor: e.target.value })} style={inputStyle} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#6B7280', marginBottom: '4px' }}>Amount (₦)</label>
            <input type="number" value={editForm.amount} onChange={(e) => setEditForm({ ...editForm, amount: e.target.value })} style={inputStyle} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#6B7280', marginBottom: '4px' }}>Purpose</label>
            <input value={editForm.purpose} onChange={(e) => setEditForm({ ...editForm, purpose: e.target.value })} style={inputStyle} />
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <Button variant="ghost" onClick={() => setEditing(null)}>Cancel</Button>
            <button onClick={handleEditSave} disabled={submitting} style={{ padding: '10px 20px', background: '#1a4731', color: '#fff', border: 'none', borderRadius: '8px', fontFamily: 'inherit', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>{submitting ? 'Saving…' : 'Save'}</button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Delete Donation" size="sm">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ fontSize: '14px', color: '#374151' }}>Delete donation from <strong>{deleteTarget?.donor}</strong>?</p>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <Button variant="ghost" onClick={() => setDeleteTarget(null)}>Cancel</Button>
            <button onClick={handleDelete} style={{ padding: '10px 20px', background: '#DC2626', color: '#fff', border: 'none', borderRadius: '8px', fontFamily: 'inherit', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>Delete</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
