import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Loader } from '@/components/common/Loader';
import { newsApi } from '@/features/news/services/newsApi';
import type { NewsItem } from '@/types';

export default function NewsDetailPage() {
  const { slug } = useParams();
  const [article, setArticle] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadArticle() {
      setLoading(true);
      const data = await newsApi.getNewsItem(slug ?? '');
      if (!active) return;
      setArticle(data ?? null);
      setLoading(false);
    }

    loadArticle();
    return () => {
      active = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <section style={{ padding: '72px 0 96px' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          <Loader text="Loading article" />
        </div>
      </section>
    );
  }

  if (!article) {
    return (
      <section style={{ padding: '72px 0 96px' }}>
        <div className="container" style={{ maxWidth: '860px' }}>
          <p style={{ color: 'var(--text-muted)' }}>The requested story could not be found.</p>
          <Link to="/news" style={{ display: 'inline-block', marginTop: '16px', color: 'var(--green-primary)', fontWeight: 600 }}>
            Back to news
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section style={{ padding: '72px 0 96px' }}>
      <div className="container" style={{ maxWidth: '860px' }}>
        <Link to="/news" style={{ display: 'inline-block', marginBottom: '16px', color: 'var(--green-primary)', fontWeight: 600 }}>
          ← Back to news
        </Link>

        <p style={{ fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold-500)', fontWeight: 700 }}>
          News update
        </p>
        <h1 style={{ fontSize: '34px', lineHeight: 1.2, margin: '8px 0 12px', color: 'var(--text-heading)' }}>
          {article.title}
        </h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
          Published {new Date(article.publishedAt).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>

        {article.coverImage && (
          <img src={article.coverImage} alt={article.title} style={{ width: '100%', borderRadius: '18px', marginBottom: '24px', objectFit: 'cover', maxHeight: '360px' }} />
        )}

        <p style={{ lineHeight: 1.8, color: 'var(--text-body)', whiteSpace: 'pre-line' }}>{article.content}</p>
      </div>
    </section>
  );
}
