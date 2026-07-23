import { useState } from 'react'
import { NewsEditor } from '@/features/admin/news/NewsEditor'
import { Modal } from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { useNews } from '@/hooks/useNews'
import { ApiClientError } from '@/api/client'
import type { NewsItem } from '@/types'

export default function AdminNewsPage() {
  const { adminNews: news, isAdminLoading: isLoading, createNews, updateNews, deleteNews, publishNews, unpublishNews } = useNews()
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<NewsItem | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)

  async function handleSave(data: Partial<NewsItem>) {
    setSubmitError(null)
    try {
      if (editingNews) {
        await updateNews({ id: editingNews.id, data })
        setSuccessMsg('News updated successfully')
      } else {
        const { slug: _, coverImage, ...rest } = data
        const createData = coverImage ? { ...rest, coverImage } : rest
        await createNews(createData as Parameters<typeof createNews>[0])
        setSuccessMsg('News created successfully')
      }
      setIsCreateOpen(false)
      setEditingNews(null)
      setTimeout(() => setSuccessMsg(null), 3000)
    } catch (err) {
      if (err instanceof ApiClientError && err.errors) {
        const msgs = Object.entries(err.errors).map(([field, list]) =>
          `${field}: ${list.join(', ')}`
        ).join('\n')
        setSubmitError(msgs)
      } else {
        setSubmitError(err instanceof Error ? err.message : 'Failed to save news')
      }
    }
  }

  function handleCancel() {
    setIsCreateOpen(false)
    setEditingNews(null)
  }

  async function handleDelete() {
    if (!deleteTarget) return
    await deleteNews(deleteTarget.id)
    setDeleteTarget(null)
  }

  return (
    <div>
      {successMsg && (
        <div style={{ marginBottom: '16px', padding: '12px 16px', background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '8px', color: '#065F46', fontSize: '14px', fontWeight: 500 }}>
          {successMsg}
        </div>
      )}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#111827', margin: 0 }}>News &amp; updates</h1>
          <p style={{ fontSize: '14px', color: '#1a4731', marginTop: '4px' }}>Publish announcements, events and impact stories to the website.</p>
        </div>
        <button onClick={() => setIsCreateOpen(true)} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: '#1a4731', color: '#fff', fontSize: '14px', fontWeight: 600, border: 'none', borderRadius: '8px', cursor: 'pointer', fontFamily: 'inherit' }}>
          <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
          Upload news
        </button>
      </div>

      {isLoading ? (
        <div style={{ padding: '32px', textAlign: 'center', color: '#6B7280', fontSize: '14px' }}>Loading...</div>
      ) : (
        <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
          <div style={{ borderBottom: '1px solid #E5E7EB' }}>
            {news.map((item) => {
              const isDraft = !item.publishedAt || item.publishedAt === new Date(0).toISOString()
              return (
                <div key={item.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 18px', borderBottom: '1px solid #F3F4F6' }}>
                  <div>
                    <p style={{ fontWeight: 600, color: '#1F2937', margin: 0, fontSize: '14px' }}>{item.title}</p>
                    <p style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '2px', margin: '2px 0 0 0' }}>
                      {item.tags?.[0] || 'News'} &middot; {item.publishedAt ? new Date(item.publishedAt).toLocaleDateString() : 'Draft'}
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', padding: '2px 10px', borderRadius: '9999px',
                      fontSize: '12px', fontWeight: 500,
                      background: isDraft ? '#FFFBEB' : 'var(--admin-brand-light)',
                      color: isDraft ? '#D97706' : 'var(--admin-brand)',
                    }}>
                      {isDraft ? 'Draft' : 'Published'}
                    </span>
                    {isDraft ? (
                      <button onClick={async () => { try { await publishNews(item.id); setSuccessMsg('Published'); setTimeout(() => setSuccessMsg(null), 3000) } catch { setSubmitError('Failed to publish') } }} style={{ padding: '6px 12px', borderRadius: '8px', border: 'none', background: '#1a4731', color: '#fff', cursor: 'pointer', fontSize: '12px', fontWeight: 600, fontFamily: 'inherit' }}>
                        Publish
                      </button>
                    ) : (
                      <button onClick={async () => { try { await unpublishNews(item.id); setSuccessMsg('Unpublished'); setTimeout(() => setSuccessMsg(null), 3000) } catch { setSubmitError('Failed to unpublish') } }} style={{ padding: '6px 12px', borderRadius: '8px', border: 'none', background: '#FEF3C7', color: '#D97706', cursor: 'pointer', fontSize: '12px', fontWeight: 600, fontFamily: 'inherit' }}>
                        Unpublish
                      </button>
                    )}
                    <button onClick={() => setEditingNews(item)} style={{ padding: '6px', borderRadius: '8px', border: 'none', background: 'transparent', cursor: 'pointer', color: '#9CA3AF' }}>
                      <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                    </button>
                    <button onClick={() => setDeleteTarget(item)} style={{ padding: '6px', borderRadius: '8px', border: 'none', background: 'transparent', cursor: 'pointer', color: '#9CA3AF' }}>
                      <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      <Modal isOpen={isCreateOpen || !!editingNews} onClose={() => { handleCancel(); setSubmitError(null) }} title={editingNews ? 'Edit News' : 'Create News'} size="lg">
        {submitError && (
          <div style={{ marginBottom: '16px', padding: '12px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '8px', color: '#DC2626', fontSize: '13px', whiteSpace: 'pre-line' }}>
            {submitError}
          </div>
        )}
        <NewsEditor existingNews={editingNews} onSave={handleSave} onCancel={() => { handleCancel(); setSubmitError(null) }} />
      </Modal>

      <Modal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Delete News" size="sm">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ fontSize: '14px', color: '#374151' }}>Are you sure you want to delete &ldquo;{deleteTarget?.title}&rdquo;? This action cannot be undone.</p>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <Button variant="ghost" onClick={() => setDeleteTarget(null)}>Cancel</Button>
            <button onClick={handleDelete} style={{ padding: '10px 20px', background: '#DC2626', color: '#fff', border: 'none', borderRadius: '8px', fontFamily: 'inherit', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>Delete</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
