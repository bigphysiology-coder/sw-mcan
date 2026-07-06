import { useState, useEffect, type FormEvent } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
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
  const [image, setImage] = useState(existingNews?.image ?? '')
  const [tags, setTags] = useState(existingNews?.tags.join(', ') ?? '')

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

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    onSave({
      title,
      slug,
      excerpt,
      content,
      image,
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

      <Input
        label="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        placeholder="https://example.com/image.jpg"
      />

      <Input
        label="Tags"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="tag1, tag2, tag3"
      />

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '8px' } as React.CSSProperties}>
        <Button type="submit" variant="primary">
          {existingNews ? 'Update' : 'Save'}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  )
}

export { NewsEditor }
