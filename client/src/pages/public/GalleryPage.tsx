import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { useGallery } from '@/features/gallery/hooks/useGallery';

export default function Gallery() {
  const { photos, isLoading } = useGallery();

  if (isLoading) return <div style={{ padding: '96px 0', textAlign: 'center', color: 'var(--text-muted)' }}>Loading gallery…</div>;

  return (
    <div>
      <section style={{ background: 'var(--white)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container" style={{ padding: '72px var(--container-pad) 40px' }}>
          <SectionHeading eyebrow="Gallery" title="Moments from across the zone" intro="Events, projects and everyday community life from the six Southwest chapters." />
        </div>
      </section>
      <section className="container" style={{ padding: '48px var(--container-pad) 96px' }}>
        <div className="resp-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridAutoRows: '180px', gap: '16px' }}>
          {photos.map((p, i) => (
            <Reveal key={p.id} delay={(i % 4) * 0.06} style={{
              position: 'relative', borderRadius: 'var(--radius-card)', overflow: 'hidden',
              boxShadow: 'var(--shadow-sm)',
              gridColumn: p.span === 'wide' ? 'span 2' : 'span 1',
              gridRow: p.span === 'tall' ? 'span 2' : 'span 1',
              background: `center/cover no-repeat url(${p.src})`,
            }}>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11,19,14,0.78), rgba(11,19,14,0) 55%)' }} />
              <span style={{ position: 'absolute', left: '14px', bottom: '12px', color: '#fff', fontSize: '13px', fontWeight: 600, fontFamily: 'var(--font-body)' }}>{p.caption}</span>
            </Reveal>
          ))}
        </div>
        {photos.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '15px', marginTop: '48px' }}>No photos in the gallery yet.</p>
        )}
      </section>
    </div>
  );
}
