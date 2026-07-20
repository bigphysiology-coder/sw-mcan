import { useState } from 'react'
import { useDigitalIdRequests } from '@/features/digital-id/hooks/useDigitalId'
import { IdCardPreview } from '@/features/digital-id/components/IdCardPreview'
import type { DigitalIdRequest } from '@/types'
import { useAuthStore } from '@/store/authStore'

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

function printCard(req: { fullName: string; state: string; nyscCallUpNumber: string; photo?: string; createdAt: string; phone?: string; postHeld?: string; validityBegin?: string; validityEnd?: string; holderSignature?: string }) {
  const win = window.open('', '_blank')
  if (!win) return

  const baseUrl = window.location.origin
  const GREEN  = '#1a5c2e'
  const GOLD   = '#c8a84b'
  const RED    = '#cc1f1f'
  const CREAM  = '#f5f3ee'
  const WMARK  = '#e8e4dc'

  const field = (label: string, value: string) => `
<div style="display:flex;align-items:flex-end;gap:4px;margin-bottom:3px;position:relative;z-index:1">
  <span style="font-size:10px;font-weight:700;color:#111;white-space:nowrap;min-width:100px;font-family:serif">${label}:</span>
  <div style="flex:1;border-bottom:1.5px solid #333;min-height:18px;display:flex;align-items:flex-end;padding-bottom:2px">
    <span style="font-size:10px;color:#1a1a1a;font-family:serif">${value || ''}</span>
  </div>
</div>`

  const passportHtml = req.photo
    ? `<img src="${req.photo}" alt="passport" style="width:100%;height:100%;object-fit:cover" />`
    : `<span style="font-size:7px;color:#888;text-align:center;padding:4px">Passport Photo</span>`

  const watermark = `<p style="color:${WMARK};font-size:7px;font-weight:700;letter-spacing:0.12em;line-height:1.6;word-break:break-all;padding:4px;white-space:normal;margin:0">${'MUSLIM CORPERS ASSOCIATION OF NIGERIA MCAN '.repeat(120)}</p>`

  const validityStr = req.validityBegin || req.validityEnd
    ? (req.validityBegin || '…') + ' – ' + (req.validityEnd || '…')
    : ''

  const backRules = `
<ol style="margin:0 0 10px;padding-left:18px;font-size:10px;font-weight:700;color:#111;line-height:1.8">
  <li>The bearer of this identity Card is a member of the association</li>
  <li>This card is not transferable to another person</li>
  <li>It expires as indicated overleaf</li>
  <li>If found, please return it to</li>
</ol>`

  const sigSvg = (name: string) => `
<svg width="80" height="28" viewBox="0 0 80 28" style="display:block;margin:0 auto">
  <path d="M5 22 C10 10 15 6 25 14 C30 18 32 8 40 10 C48 12 50 20 58 16 C64 13 68 18 75 14" stroke="#111" stroke-width="1.8" fill="none" stroke-linecap="round"/>
  <line x1="5" y1="26" x2="75" y2="26" stroke="#111" stroke-width="1"/>
</svg>
<p style="font-size:9px;font-weight:700;color:#111;margin:4px 0 0">${name}</p>`

  win.document.write(`
<!DOCTYPE html>
<html><head>
<title>MCAN Southwest ID Card - ${req.fullName}</title>
<style>
  @page { margin: 0; size: auto; }
  * { margin:0; padding:0; box-sizing:border-box; }
  body { display:flex; flex-direction:column; align-items:center; gap:24px; padding:24px; font-family:serif; background:#e5e5e5; }
  .card { width:340px; height:240px; border-radius:8px; border:10px solid ${GREEN}; background:${CREAM}; position:relative; overflow:hidden; box-shadow:0 4px 24px rgba(0,0,0,0.22); }
  .watermark { position:absolute; inset:0; overflow:hidden; user-select:none; pointer-events:none; z-index:0; }
  .content { position:relative; z-index:1; }
  .label { font-size:9px; font-weight:700; color:#111; margin:0; }
  @media print { body { -webkit-print-color-adjust:exact; print-color-adjust:exact; } }
</style>
</head><body>
<!-- FRONT -->
<div class="card">
  <div class="watermark">${watermark}</div>
  <div class="content">
    <div style="text-align:center;padding-top:6px">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;padding:0 8px">
        <img src="${baseUrl}/photos/nysc-logo.svg" alt="NYSC" style="width:46px;height:46px;object-fit:contain" />
        <div style="flex:1;padding:0 6px">
          <p style="margin:0;font-size:11px;font-weight:900;color:${GREEN};font-family:serif;line-height:1.2;letter-spacing:0.02em">MUSLIM CORPERS' ASSOCIATION OF NIGERIA<br />(MCAN SOUTHWEST)</p>
          <p style="margin:1px 0 0;font-size:6.5px;color:#333;font-family:serif">The regional coordinating body of the Muslim Corpers' Association of Nigeria across Lagos, Ogun, Oyo, Osun, Ondo and Ekiti</p>
        </div>
        <img src="${baseUrl}/photos/logo-mcan.png" alt="MCAN" style="width:46px;height:46px;object-fit:contain" />
      </div>
      <div style="background:${RED};border-radius:20px;display:inline-block;padding:2px 18px;margin:4px auto 4px">
        <span style="color:white;font-weight:900;font-size:9px;letter-spacing:0.08em;font-family:sans-serif">MEMBERSHIP IDENTITY CARD</span>
      </div>
    </div>
    <div style="display:flex;gap:8px;padding:0 10px">
      <div style="flex:1">
        ${field('Name', req.fullName)}
        ${field('State Code', req.nyscCallUpNumber)}
        ${field('State Branch', req.state)}
        ${field('Post Held', req.postHeld || '')}
        ${field('Validity', validityStr)}
        ${field("Holder's Phone No", req.phone || '')}
      </div>
      <div style="width:62px;height:76px;border:1.5px solid #888;background:${req.photo ? 'transparent' : '#e0ddd6'};flex-shrink:0;align-self:flex-start;margin-top:2px;display:flex;align-items:center;justify-content:center;overflow:hidden">${passportHtml}</div>
    </div>
  </div>
</div>
<!-- BACK -->
<div class="card">
  <div class="watermark">${watermark}</div>
  <div class="content" style="padding:14px 16px 10px">
    <p style="text-align:center;font-weight:900;font-size:18px;color:${RED};margin:0 0 8px;letter-spacing:0.06em">NOTE</p>
    ${backRules}
    <p style="text-align:center;font-size:10px;color:#222;margin:0 0 12px;line-height:1.6">
      The regional coordinating body of the Muslim Corpers'<br />
      Association of Nigeria across Lagos, Ogun, Oyo,<br />
      Osun, Ondo and Ekiti
    </p>
    <div style="display:flex;justify-content:space-between;align-items:flex-end">
      <div style="text-align:center;flex:1">${sigSvg('Nat. Secretary General')}</div>
      <div style="text-align:center;flex:1">${sigSvg('National Ameer (President)')}</div>
    </div>
  </div>
</div>
<script>window.onload=function(){window.print();};<\/script>
</body></html>`)
  win.document.close()
}

export default function AdminDigitalIdsPage() {
  const { requests, isLoading, approveRequest, rejectRequest, deleteRequest, isApproving, isRejecting, isDeleting } = useDigitalIdRequests()
  const user = useAuthStore((s) => s.user)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [rejectModal, setRejectModal] = useState<{ id: string; name: string } | null>(null)
  const [rejectReason, setRejectReason] = useState('')
  const [previewCard, setPreviewCard] = useState<DigitalIdRequest | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  async function handleApprove(id: string) {
    await approveRequest(id)
  }

  async function handleReject(id: string) {
    await rejectRequest({ id, reason: rejectReason || undefined })
    setRejectModal(null)
    setRejectReason('')
  }

  async function handleDelete(id: string) {
    await deleteRequest(id)
    setDeleteConfirm(null)
  }

  const pending = requests.filter((r) => r.status === 'pending')
  const approved = requests.filter((r) => r.status === 'approved')
  const rejected = requests.filter((r) => r.status === 'rejected')

  const detailRow = (label: string, value: string) => (
    <div style={{ display: 'flex', gap: '8px', fontSize: '13px', padding: '4px 0' }}>
      <span style={{ fontWeight: 600, color: '#374151', minWidth: '110px' }}>{label}:</span>
      <span style={{ color: '#6B7280' }}>{value || '—'}</span>
    </div>
  )

  if (isLoading) return <div style={{ padding: '40px', textAlign: 'center', color: '#9CA3AF' }}>Loading MCAN Southwest ID requests…</div>

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#111827', margin: 0 }}>MCAN Southwest ID Requests</h1>
        <p style={{ fontSize: '14px', color: '#1a4731', marginTop: '4px' }}>Approve or reject member MCAN Southwest ID card requests.</p>
      </div>

      {/* Stats */}
      <div className="admin-stats" style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: '24px' }}>
        {[
          { label: 'Total requests', value: String(requests.length) },
          { label: 'Pending', value: String(pending.length) },
          { label: 'Approved', value: String(approved.length) },
          { label: 'Rejected', value: String(rejected.length) },
        ].map((s) => (
          <div key={s.label} style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '18px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize: '24px', fontWeight: 700, color: '#111827' }}>{s.value}</div>
            <div style={{ fontSize: '14px', color: '#6B7280', marginTop: '4px' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Pending requests */}
      <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', overflow: 'hidden', marginBottom: '24px' }}>
        <div style={{ padding: '14px 18px', borderBottom: '1px solid #E5E7EB', fontSize: '16px', fontWeight: 700, color: '#374151', background: '#F9FAFB' }}>
          Pending Review
          {pending.length > 0 && <span style={{ marginLeft: '8px', background: '#FEF3C7', color: '#D97706', fontSize: '12px', fontWeight: 700, padding: '2px 8px', borderRadius: '9999px' }}>{pending.length}</span>}
        </div>
        {pending.length === 0 ? (
          <div style={{ padding: '40px 18px', textAlign: 'center', color: '#9CA3AF', fontSize: '14px' }}>No pending requests.</div>
        ) : (
          <div>
            {pending.map((req) => (
              <div key={req.id}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 18px', borderBottom: expandedId === req.id ? '1px solid #E5E7EB' : '1px solid #F3F4F6', cursor: 'pointer' }} onClick={() => setExpandedId(expandedId === req.id ? null : req.id)}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--admin-brand-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 700, color: 'var(--admin-brand)', flexShrink: 0 }}>
                    {(req.fullName ?? '?').split(' ').map((s) => s[0]).join('').slice(0, 2)}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontWeight: 600, color: '#1F2937', margin: 0, fontSize: '14px' }}>{req.fullName}</p>
                    <p style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '2px', margin: '2px 0 0 0' }}>
                      {req.nyscCallUpNumber} &middot; {req.state}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                    <button
                      onClick={(e) => { e.stopPropagation(); handleApprove(req.id) }}
                      disabled={isApproving}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 14px', background: 'var(--admin-brand)', color: '#fff', fontSize: '13px', fontWeight: 600, border: 'none', borderRadius: '8px', cursor: isApproving ? 'not-allowed' : 'pointer', opacity: isApproving ? 0.6 : 1, fontFamily: 'inherit' }}
                    >
                      <svg style={{ width: '14px', height: '14px' }} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12" /></svg>
                      Approve
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); setRejectModal({ id: req.id, name: req.fullName ?? '' }) }}
                      disabled={isRejecting}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 14px', background: '#DC2626', color: '#fff', fontSize: '13px', fontWeight: 600, border: 'none', borderRadius: '8px', cursor: isRejecting ? 'not-allowed' : 'pointer', opacity: isRejecting ? 0.6 : 1, fontFamily: 'inherit' }}
                    >
                      <svg style={{ width: '14px', height: '14px' }} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                      Reject
                    </button>
                    <svg style={{ width: '16px', height: '16px', color: '#9CA3AF', transition: 'transform 0.2s', transform: expandedId === req.id ? 'rotate(180deg)' : 'rotate(0deg)' }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                  </div>
                </div>
                {expandedId === req.id && (
                  <div style={{ padding: '16px 18px', background: '#F9FAFB', borderBottom: '1px solid #F3F4F6' }}>
                    <div style={{ display: 'flex', gap: '20px' }}>
                      <div style={{ flex: 1 }}>
                        {detailRow('Post Held', req.postHeld ?? '')}
                        {detailRow('Validity Begin', req.validityBegin ?? '')}
                        {detailRow('Validity End', req.validityEnd ?? '')}
                        {detailRow('Phone', req.phone ?? '')}
                        {detailRow('Submitted', formatDate(req.createdAt))}
                      </div>
                      {req.photo && (
                        <div style={{ width: '72px', height: '72px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0, border: '1px solid #E5E7EB' }}>
                          <img src={req.photo} alt="passport" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Approved list */}
      {approved.length > 0 && (
        <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
          <div style={{ padding: '14px 18px', borderBottom: '1px solid #E5E7EB', fontSize: '16px', fontWeight: 700, color: '#374151', background: '#F9FAFB' }}>Approved</div>
            {approved.map((req) => (
            <div key={req.id} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '14px 18px', borderBottom: '1px solid #F3F4F6' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#D1FAE5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, color: '#065F46', flexShrink: 0 }}>
                {(req.fullName ?? '?').split(' ').map((s) => s[0]).join('').slice(0, 2)}
              </div>
              <div style={{ flex: 1, fontSize: '14px', color: '#374151', fontWeight: 500 }}>{req.fullName ?? ''}</div>
              <span style={{ fontSize: '12px', color: '#9CA3AF' }}>{req.nyscCallUpNumber}</span>
              <button
                onClick={() => setPreviewCard(req)}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', background: '#1a4731', color: '#fff', fontSize: '12px', fontWeight: 600, border: 'none', borderRadius: '8px', cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 }}
              >
                <svg style={{ width: '14px', height: '14px' }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                View Card
              </button>
              {deleteConfirm === req.id ? (
                <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                  <button onClick={() => handleDelete(req.id)} disabled={isDeleting} style={{ padding: '6px 12px', background: '#DC2626', color: '#fff', fontSize: '12px', fontWeight: 600, border: 'none', borderRadius: '8px', cursor: isDeleting ? 'not-allowed' : 'pointer', opacity: isDeleting ? 0.6 : 1, fontFamily: 'inherit' }}>Confirm</button>
                  <button onClick={() => setDeleteConfirm(null)} style={{ padding: '6px 12px', background: '#F3F4F6', color: '#374151', fontSize: '12px', fontWeight: 600, border: 'none', borderRadius: '8px', cursor: 'pointer', fontFamily: 'inherit' }}>Cancel</button>
                </div>
              ) : (
                <button onClick={() => setDeleteConfirm(req.id)} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', background: '#FEF2F2', color: '#DC2626', fontSize: '12px', fontWeight: 600, border: '1px solid #FECACA', borderRadius: '8px', cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 }}>
                  <svg style={{ width: '14px', height: '14px' }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Rejected list */}
      {rejected.length > 0 && (
        <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', overflow: 'hidden', marginTop: '24px' }}>
          <div style={{ padding: '14px 18px', borderBottom: '1px solid #E5E7EB', fontSize: '16px', fontWeight: 700, color: '#374151', background: '#F9FAFB' }}>Rejected</div>
            {rejected.map((req) => (
            <div key={req.id} style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '14px 18px', borderBottom: '1px solid #F3F4F6' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, color: '#991B1B', flexShrink: 0 }}>
                {(req.fullName ?? '?').split(' ').map((s) => s[0]).join('').slice(0, 2)}
              </div>
              <div style={{ flex: 1, fontSize: '14px', color: '#374151', fontWeight: 500 }}>{req.fullName ?? ''}</div>
              <span style={{ fontSize: '12px', color: '#9CA3AF' }}>{req.nyscCallUpNumber}</span>
              {req.reason && <span style={{ fontSize: '12px', color: '#DC2626', fontStyle: 'italic', maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{req.reason}</span>}
              <button
                onClick={() => handleDelete(req.id)}
                disabled={isDeleting}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 12px', background: '#DC2626', color: '#fff', fontSize: '12px', fontWeight: 600, border: 'none', borderRadius: '8px', cursor: isDeleting ? 'not-allowed' : 'pointer', opacity: isDeleting ? 0.6 : 1, fontFamily: 'inherit', flexShrink: 0 }}
              >
                <svg style={{ width: '14px', height: '14px' }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Card preview modal */}
      {previewCard && (
        <div onClick={() => setPreviewCard(null)} style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <div onClick={(e) => e.stopPropagation()} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <IdCardPreview idData={{
              fullName: previewCard.fullName ?? '',
              state: previewCard.state ?? '',
              validityBegin: previewCard.validityBegin || '',
              validityEnd: previewCard.validityEnd || '',
              nyscCallUpNumber: previewCard.nyscCallUpNumber ?? '',
              issueDate: previewCard.createdAt,
              photo: previewCard.photo || '',
              phone: previewCard.phone || user?.phone || '',
              postHeld: previewCard.postHeld || '',
              holderSignature: previewCard.holderSignature || '',
            }} />
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => { printCard({ fullName: previewCard.fullName ?? '', state: previewCard.state ?? '', nyscCallUpNumber: previewCard.nyscCallUpNumber ?? '', photo: previewCard.photo, createdAt: previewCard.createdAt, phone: previewCard.phone || user?.phone || '', postHeld: previewCard.postHeld || '', validityBegin: previewCard.validityBegin || '', validityEnd: previewCard.validityEnd || '', holderSignature: previewCard.holderSignature || '' }); setPreviewCard(null); }} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 24px', background: '#1a4731', color: '#fff', fontSize: '14px', fontWeight: 600, border: 'none', borderRadius: '8px', cursor: 'pointer', fontFamily: 'inherit' }}>
                <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 9V3h12v6M6 9H4a2 2 0 00-2 2v5a2 2 0 002 2h16a2 2 0 002-2v-5a2 2 0 00-2-2h-2M6 9h12M6 15h12"/></svg>
                Print Card
              </button>
              <button onClick={() => setPreviewCard(null)} style={{ padding: '10px 24px', background: '#F3F4F6', color: '#374151', fontSize: '14px', fontWeight: 600, border: 'none', borderRadius: '8px', cursor: 'pointer', fontFamily: 'inherit' }}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Reject reason modal */}
      {rejectModal && (
        <div onClick={() => setRejectModal(null)} style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: '#fff', borderRadius: '12px', padding: '24px', maxWidth: '420px', width: '100%', boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}>
            <h3 style={{ margin: '0 0 8px', fontSize: '18px', fontWeight: 700, color: '#111827' }}>Reject ID Request</h3>
            <p style={{ fontSize: '14px', color: '#6B7280', margin: '0 0 16px' }}>Reason for rejecting {rejectModal.name}&rsquo;s MCAN Southwest ID request (optional):</p>
            <textarea
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              rows={3}
              placeholder="Enter reason…"
              style={{ width: '100%', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '10px 12px', fontSize: '14px', fontFamily: 'inherit', resize: 'none', boxSizing: 'border-box', outline: 'none' }}
            />
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end', marginTop: '16px' }}>
              <button onClick={() => setRejectModal(null)} style={{ padding: '8px 16px', background: '#F3F4F6', color: '#374151', fontSize: '14px', fontWeight: 600, border: 'none', borderRadius: '8px', cursor: 'pointer', fontFamily: 'inherit' }}>Cancel</button>
              <button onClick={() => handleReject(rejectModal.id)} disabled={isRejecting} style={{ padding: '8px 16px', background: '#DC2626', color: '#fff', fontSize: '14px', fontWeight: 600, border: 'none', borderRadius: '8px', cursor: isRejecting ? 'not-allowed' : 'pointer', opacity: isRejecting ? 0.6 : 1, fontFamily: 'inherit' }}>Reject</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
