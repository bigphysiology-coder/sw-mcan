import { useNews } from '@/features/news/hooks/useNews'
import { NewsCard } from '@/features/news/components/NewsCard'
import { Loader } from '@/components/common/Loader'
import { EmptyState } from '@/components/common/EmptyState'

export default function News() {
  const { news, isLoading } = useNews()

  if (isLoading) {
    return <div style={{ padding: '96px 0', textAlign: 'center' }}><Loader text="Loading news…" /></div>
  }

  return (
    <>
      <section className="bg-gradient-to-br from-brand-strong via-brand to-green-800 py-24 text-white">
        <div className="container">
          <p className="mb-3 text-[13px] font-bold uppercase tracking-[0.12em] text-gold-300">Updates</p>
          <h1 className="font-heading text-4xl font-extrabold sm:text-5xl">News</h1>
          <p className="mt-4 max-w-xl text-lg text-white/85">
            Read the latest stories, announcements, and updates from across MCAN Southwest.
          </p>
        </div>
      </section>

      <section className="bg-surface-page py-12">
        <div className="container">
          {news.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {news.map((item) => <NewsCard key={item.id} news={item} />)}
            </div>
          ) : (
            <EmptyState title="No news available" description="Check back soon for new stories and announcements." />
          )}
        </div>
      </section>
    </>
  )
}
