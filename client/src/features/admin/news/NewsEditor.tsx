import { useState, useEffect, type ChangeEvent, type FormEvent } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { uploadApi } from '@/api'
import type { NewsItem } from '@/types'

interface NewsEditorProps {
  existingNews?: NewsItem | null
  onSave: (data: Partial<NewsItem>) => void
  onCancel: () => void
}

function NewsEditor({ existingNews, onSave, onCancel }: NewsEditorProps) {
  const [title, setTitle] = useState(existingNews?.title ?? '')
  const [slug, setSlug] = useState(existingNews?.slug ?? '')
  const [excerpt, setExcerpt] = useState(existingNews?.excerpt ?? '')
  const [content, setContent] = useState(existingNews?.content ?? '')
  const [coverImage, setCoverImage] = useState(existingNews?.coverImage ?? '')
  const [imagePreview, setImagePreview] = useState(existingNews?.coverImage ?? '')
  const [category, setCategory] = useState(existingNews?.category ?? 'news')
  const [tags, setTags] = useState(existingNews?.tags.join(', ') ?? '')
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (!existingNews && title) {
      setSlug(
        title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, ''),
      )
    }
  }, [title, existingNews])

  useEffect(() => {
    setCoverImage(existingNews?.coverImage ?? '')
    setImagePreview(existingNews?.coverImage ?? '')
  }, [existingNews])

  async function handleImageFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const reader = new FileReader()
    reader.onload = (ev) => {
      setImagePreview(typeof ev.target?.result === 'string' ? ev.target.result : '')
    }
    reader.readAsDataURL(file)

    try {
      const formData = new FormData()
      formData.append('file', file)
      const { url } = await uploadApi.uploadImage(formData)
      setCoverImage(url)
    } catch {
      setImagePreview('')
    } finally {
      setUploading(false)
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    onSave({
      title,
      slug,
      category,
      excerpt,
      content,
      coverImage,
      tags: tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    })
  }

  const fieldStyle: React.CSSProperties = {
    fontFamily: 'var(--font-body)', fontSize: '14px', padding: '12px 16px',
    borderRadius: 'var(--radius-button)', border: '1.5px solid var(--border-default)',
    background: 'var(--white)', color: 'var(--text-heading)', outline: 'none', width: '100%',
    boxSizing: 'border-box',
    transition: 'border-color var(--dur-fast) var(--ease-standard)',
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '16px' } as React.CSSProperties}>
      <Input
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="News article title"
      />

      <Input
        label="Slug"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
        placeholder="article-slug"
      />

      <Input
        label="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value as NewsItem['category'])}
        placeholder="e.g. News, Event, Announcement"
      />

      <div>
        <label style={{
          display: 'block', marginBottom: '4px', fontSize: '14px',
          fontWeight: 600, color: 'var(--text-heading)',
        } as React.CSSProperties}>Excerpt</label>
        <textarea
          id="excerpt"
          rows={3}
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="Brief summary of the article"
          style={fieldStyle}
        />
      </div>

      <div>
        <label style={{
          display: 'block', marginBottom: '4px', fontSize: '14px',
          fontWeight: 600, color: 'var(--text-heading)',
        } as React.CSSProperties}>Content</label>
        <textarea
          id="content"
          rows={8}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Full article content..."
          style={fieldStyle}
        />
      </div>

      <div style={{ display: 'grid', gap: '12px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: 600, color: 'var(--text-heading)' }}>
            Image upload
          </label>
          <input
            type="file"
            accept="image/*"
            disabled={uploading}
            onChange={handleImageFileChange}
            style={{
              width: '100%', border: '1.5px dashed var(--border-default)', borderRadius: 'var(--radius-button)',
              background: 'var(--gray-50)', padding: '12px 16px', fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text-body)',
            }}
          />
          {uploading && <span style={{ fontSize: '12px', color: 'var(--admin-brand)', marginTop: '4px', display: 'block' }}>Uploading…</span>}
        </div>

        <Input
          label="Or image URL"
          value={coverImage}
          onChange={(e) => {
            setCoverImage(e.target.value)
            setImagePreview(e.target.value)
          }}
          placeholder="https://example.com/image.jpg"
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-card)', padding: '12px', background: 'var(--gray-50)' }}>
          <div
            style={{
              width: '72px', height: '72px', borderRadius: '12px', flexShrink: 0,
              background: imagePreview ? `center/cover no-repeat url(${imagePreview})` : 'linear-gradient(135deg, #D1D5DB, #9CA3AF)',
            }}
          />
          <div style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            {uploading ? 'Uploading image…' : 'Select a file to upload, or paste an image URL above.'}
          </div>
        </div>
      </div>

      <Input
        label="Tags"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="tag1, tag2, tag3"
      />

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '8px' } as React.CSSProperties}>
        <Button type="submit" variant="primary" disabled={uploading}>
          {uploading ? 'Uploading…' : existingNews ? 'Update' : 'Save'}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  )
}

export { NewsEditor }
