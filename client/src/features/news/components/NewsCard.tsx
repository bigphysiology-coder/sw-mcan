import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/Badge'
import { formatDate } from '@/utils/formatDate'
import type { NewsItem } from '@/types'

interface NewsCardProps {
  news: NewsItem
}

function NewsCard({ news }: NewsCardProps) {
  return (
    <div className="overflow-hidden rounded-card border border-border-subtle bg-surface-card shadow-sm">
      {news.coverImage ? (
        <img src={news.coverImage} alt={news.title} className="h-44 w-full object-cover" />
      ) : (
        <div className="flex h-44 w-full items-center justify-center bg-gray-200 text-gray-400">
          <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        </div>
      )}

      <div className="p-5">
        {news.tags && news.tags.length > 0 && (
          <div className="mb-3">
            <Badge tone="neutral">{news.tags[0]}</Badge>
          </div>
        )}

        <h3 className="font-heading text-lg font-semibold text-text-heading">{news.title}</h3>

        <p className="mt-1 text-xs text-text-muted">{formatDate(news.publishedAt)}</p>

        <p className="mt-3 text-sm leading-relaxed text-text-body">{news.excerpt}</p>

        <Link
          to={`/news/${news.slug}`}
          className="mt-4 inline-block text-sm font-semibold text-brand hover:underline"
        >
          Read more
        </Link>
      </div>
    </div>
  )
}

export { NewsCard }
