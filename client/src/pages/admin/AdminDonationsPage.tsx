import { useDonations } from '@/features/donations/hooks/useDonations'
import { useState } from 'react'

const formatNaira = (v: number) => '₦' + (v / 1000).toFixed(1) + (v >= 1000 ? 'M' : 'K')

export default function AdminDonationsPage() {
  const { donations, stats, isLoading, createDonation } = useDonations()
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ donor: '', amount: '', purpose: '' })

  const raisedYear = stats ? formatNaira(stats.raisedYear) : '—'
  const raisedMonth = stats ? formatNaira(stats.raisedMonth) : '—'
  const pendingReview = stats ? String(stats.pendingReview) : '—'
  const monthlyPartners = stats ? String(stats.monthlyPartners) : '—'

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const amountNum = parseFloat(form.amount) || 0
    const amountStr = '₦' + amountNum.toLocaleString()
    await createDonation({
      donor: form.donor, amount: amountStr, amountValue: amountNum,
      purpose: form.purpose, date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }),
      status: 'Pending',
    })
    setForm({ donor: '', amount: '', purpose: '' })
    setShowForm(false)
  }

  if (isLoading) return <div style={{ padding: '40px', textAlign: 'center', color: '#9CA3AF' }}>Loading donations…</div>

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#111827', margin: 0 }}>Donations</h1>
          <p style={{ fontSize: '14px', color: '#1a4731', marginTop: '4px' }}>Track contributions, confirm transfers and manage monthly partners.</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: '#1a4731', color: '#fff', fontSize: '14px', fontWeight: 600, border: 'none', borderRadius: '8px', cursor: 'pointer', fontFamily: 'inherit' }}>
          <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
          Record donation
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="resp-grid-2" style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '18px', marginBottom: '24px', display: 'grid', gap: '12px', gridTemplateColumns: '1fr 1fr 1fr auto', alignItems: 'end' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>Donor</label>
            <input required value={form.donor} onChange={(e) => setForm({ ...form, donor: e.target.value })} style={{ width: '100%', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '8px 12px', fontSize: '14px', fontFamily: 'inherit', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>Amount (₦)</label>
            <input required type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} style={{ width: '100%', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '8px 12px', fontSize: '14px', fontFamily: 'inherit', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>Purpose</label>
            <input required value={form.purpose} onChange={(e) => setForm({ ...form, purpose: e.target.value })} style={{ width: '100%', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '8px 12px', fontSize: '14px', fontFamily: 'inherit', boxSizing: 'border-box' }} />
          </div>
          <button type="submit" style={{ padding: '8px 16px', background: '#1a4731', color: '#fff', fontSize: '14px', fontWeight: 600, border: 'none', borderRadius: '8px', cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>Save</button>
        </form>
      )}

      <div className="admin-stats" style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: '24px' }}>
        {[{ label: 'Raised this year', value: raisedYear }, { label: 'This month', value: raisedMonth }, { label: 'Pending review', value: pendingReview }, { label: 'Monthly partners', value: monthlyPartners }].map((s) => (
          <div key={s.label} style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '18px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#111827' }}>{s.value}</div>
            <div style={{ fontSize: '14px', color: '#6B7280', marginTop: '4px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        <div className="resp-grid-2" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', padding: '12px 18px', background: '#F9FAFB', borderBottom: '1px solid #E5E7EB', fontSize: '12px', fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          <div>Donor</div>
          <div>Amount</div>
          <div>Purpose</div>
          <div>Date</div>
        </div>
        <div style={{ borderBottom: '1px solid #E5E7EB' }}>
          {donations.map((d) => (
            <div key={d.id} className="resp-grid-2" style={{
              display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', alignItems: 'center', padding: '14px 18px',
              fontSize: '14px', color: '#374151', borderBottom: '1px solid #F3F4F6',
              transition: 'background 140ms',
            }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#F9FAFB'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
            >
              <div style={{ fontWeight: 500 }}>{d.donor}</div>
              <div style={{ fontWeight: 600 }}>{d.amount}</div>
              <div style={{ color: '#9CA3AF' }}>{d.purpose}</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ color: '#9CA3AF' }}>{d.date}</span>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', padding: '2px 10px', borderRadius: '9999px',
                  fontSize: '12px', fontWeight: 500,
                  background: d.status === 'Confirmed' ? 'var(--admin-brand-light)' : '#FFFBEB',
                  color: d.status === 'Confirmed' ? 'var(--admin-brand)' : '#D97706',
                }}>
                  {d.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
