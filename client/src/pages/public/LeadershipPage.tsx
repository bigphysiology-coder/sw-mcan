import { Eyebrow } from '@/components/ui/Eyebrow';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { LeaderCard } from '@/components/ui/LeaderCard';
import { Reveal } from '@/components/ui/Reveal';
import { useExecutives } from '@/features/executives/hooks/useExecutives';

export default function Leadership() {
  const { executives, isLoading } = useExecutives();

  if (isLoading) return <div style={{ padding: '96px 0', textAlign: 'center', color: 'var(--text-muted)' }}>Loading leadership…</div>;

  return (
    <div>
      <section style={{ background: 'linear-gradient(135deg, var(--green-emerald), var(--green-primary))', color: '#fff' }}>
        <div className="container resp-grid-2" style={{ padding: '76px var(--container-pad)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }}>
          <div>
            <Eyebrow tone="light">Leadership</Eyebrow>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(34px, 4.5vw, 52px)', lineHeight: 1.08, letterSpacing: '-0.02em', margin: '16px 0 16px' }}>
              The executive council serving the zone
            </h1>
            <p style={{ fontSize: '18px', lineHeight: 1.6, color: 'rgba(255,255,255,0.85)', maxWidth: '480px', margin: 0 }}>
              An elected committee handling welfare, spiritual development and community outreach for corps members through the service year — built on Amanah and consultation.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', background: 'rgba(255,255,255,0.08)', borderRadius: 'var(--radius-section)', padding: '28px', border: '1px solid rgba(255,255,255,0.14)' }}>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '19px' }}>Amanah — trust &amp; accountability</div>
            <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.6, color: 'rgba(255,255,255,0.82)' }}>
              Leadership is a trust. Our executives are accountable to members and to Allah in every decision — guided by consultation (shura) and service to humanity.
            </p>
          </div>
        </div>
      </section>

      <section className="container" style={{ padding: '76px var(--container-pad) 40px' }}>
        <SectionHeading eyebrow="Zonal executive council" title="Meet the team coordinating six states" align="center" />
      </section>
      <section className="container" style={{ padding: '0 var(--container-pad) 96px' }}>
        <div className="resp-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '22px' }}>
          {executives.map((e, i) => <Reveal key={e.id} delay={(i % 4) * 0.08}><LeaderCard name={e.name} role={e.role} state={e.state} photo={e.photo} /></Reveal>)}
        </div>
        {executives.length === 0 && (
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '15px', marginTop: '48px' }}>No executives listed yet.</p>
        )}
      </section>
    </div>
  );
}
