import { Eyebrow } from '@/components/Eyebrow';
import { SectionHeading } from '@/components/SectionHeading';
import { LeaderCard } from '@/components/LeaderCard';
import { Reveal } from '@/components/Reveal';

const EXECS = [
  { name: 'Abdulmalik Mahmud', role: 'President (Ameer)', state: 'MCAN', photo: '/photos/exec-abdulmalik.jpg' },
  { name: 'Ahmad Deedat Zakari, Esq.', role: 'Secretary General', state: 'MCAN', photo: '/photos/exec-ahmad.jpg' },
  { name: 'Aminah O. Abdurrahman', role: 'Ameerah (Sisters\u2019 Affairs)', state: 'MCAN', photo: '/photos/exec-aminah.jpg' },
  { name: 'Abdulkudus Shehu Ghazali', role: "Da'wah Chairman", state: 'MCAN', photo: '/photos/exec-abdulkudus.jpg' },
  { name: 'Fadlullah O. Shittu', role: 'Business & Assets Officer', state: 'MCAN', photo: '/photos/exec-fadlullah.jpg' },
  { name: 'Hadi-Almu Umar Faruk', role: 'Public Relations Officer', state: 'MCAN', photo: '/photos/exec-hadi.jpg' },
  { name: 'Sameer A. Babayo', role: 'Director of Welfare', state: 'MCAN', photo: '/photos/exec-sameer.jpg' },
  { name: 'Sodiq Balogun Olabamiji', role: 'Financial Secretary', state: 'MCAN', photo: '/photos/exec-sodiq.jpg' },
];

export default function Leadership() {
  return (
    <div>
      <section style={{ background: 'linear-gradient(135deg, var(--green-emerald), var(--green-primary))', color: '#fff' }}>
        <div className="container" style={{ padding: '76px var(--container-pad)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }}>
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
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '22px' }}>
          {EXECS.map((e, i) => <Reveal key={e.name} delay={(i % 4) * 0.08}><LeaderCard {...e} /></Reveal>)}
        </div>
      </section>
    </div>
  );
}
