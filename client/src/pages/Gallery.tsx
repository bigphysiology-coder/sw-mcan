import { SectionHeading } from '@/components/SectionHeading';
import { Reveal } from '@/components/Reveal';

const PHOTOS = [
  { src: '/photos/parade.jpg', cap: 'NYSC passing-out parade', span: 'tall' as const },
  { src: '/photos/award-presentation.jpg', cap: 'Award presentation' },
  { src: '/photos/corps-group.jpg', cap: 'Corps members, Ekiti chapter' },
  { src: '/photos/lecture-hall.jpg', cap: 'Halaqah in session' },
  { src: '/photos/mcan-bus.jpg', cap: 'MCAN Ekiti transit bus' },
  { src: '/photos/mosque-dome.jpg', cap: 'Central mosque project', span: 'wide' as const },
  { src: '/photos/correctional-visit.jpg', cap: 'Correctional centre da\u2019wah' },
  { src: '/photos/mosque-block.jpg', cap: 'Chapter mosque development' },
  { src: '/photos/member-story.jpg', cap: 'Member story', span: 'tall' as const },
];

export default function Gallery() {
  return (
    <div>
      <section style={{ background: 'var(--white)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container" style={{ padding: '72px var(--container-pad) 40px' }}>
          <SectionHeading eyebrow="Gallery" title="Moments from across the zone" intro="Events, projects and everyday community life from the six Southwest chapters." />
        </div>
      </section>
      <section className="container" style={{ padding: '48px var(--container-pad) 96px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gridAutoRows: '180px', gap: '16px' }}>
          {PHOTOS.map((p, i) => (
            <Reveal key={p.src} delay={(i % 4) * 0.06} style={{
              position: 'relative', borderRadius: 'var(--radius-card)', overflow: 'hidden',
              boxShadow: 'var(--shadow-sm)',
              gridColumn: p.span === 'wide' ? 'span 2' : 'span 1',
              gridRow: p.span === 'tall' ? 'span 2' : 'span 1',
              background: `center/cover no-repeat url(${p.src})`,
            }}>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11,19,14,0.78), rgba(11,19,14,0) 55%)' }} />
              <span style={{ position: 'absolute', left: '14px', bottom: '12px', color: '#fff', fontSize: '13px', fontWeight: 600, fontFamily: 'var(--font-body)' }}>{p.cap}</span>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
