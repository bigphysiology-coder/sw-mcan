import { useState, useEffect } from 'react';
import { Eyebrow } from '@/components/Eyebrow';
import { Button } from '@/components/Button';
import { StatCard } from '@/components/StatCard';
import { SectionHeading } from '@/components/SectionHeading';
import { ProgramCard } from '@/components/ProgramCard';
import { Badge } from '@/components/Badge';
import { CountUp } from '@/components/CountUp';
import { Reveal } from '@/components/Reveal';
import { JoinModal } from '@/components/JoinModal';
import { Link } from 'react-router-dom';

const pillars = [
  { t: 'Spiritual growth', d: 'Weekly halaqah, tafsir circles, and the Online Madrasah keep faith at the centre of the service year.' },
  { t: 'Welfare & support', d: 'Logistics, accommodation guidance and emergency welfare for members across all six states.' },
  { t: 'Leadership & community', d: 'Training, the Zonal Convention and outreach projects that build capable, service-minded leaders.' },
];

const programs = [
  { badge: 'Upcoming', badgeTone: 'green' as const, image: '/photos/corps-group.jpg', meta: '21 Dec \u00b7 Google Meet', title: 'Southwest Lecture: Islamic perspective on the festive period', description: 'A guided session with Ustadh Abdulfatah Akanni Adigun.' },
  { badge: 'Ramadan', badgeTone: 'gold' as const, image: '/photos/correctional-visit.jpg', meta: 'Annual \u00b7 all states', title: 'Feed a Soul — Ramadan relief project', description: 'Providing iftar meals and relief packages to fasting Muslims.' },
  { badge: 'Education', badgeTone: 'neutral' as const, image: '/photos/lecture-hall.jpg', meta: 'Rolling admission', title: 'MCAN Online Madrasah', description: "Qur'an recitation, memorization, Tajweed and Arabic — at your convenient time." },
];

const states = ['Lagos', 'Ogun', 'Oyo', 'Osun', 'Ondo', 'Ekiti'];
const stateMembers = [1200, 2400, 3100, 1800, 900, 700];

export default function Home() {
  const [animate, setAnimate] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setAnimate(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div data-animate={animate ? 'on' : undefined}>
      {/* Hero */}
      <section style={{ position: 'relative', overflow: 'hidden', color: '#fff' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'center/cover no-repeat url(/photos/parade.jpg)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(7,93,55,0.94) 0%, rgba(11,104,64,0.82) 42%, rgba(7,93,55,0.34) 100%)' }} />
        <div style={{ position: 'absolute', right: '-160px', top: '-120px', width: '520px', height: '520px', borderRadius: '50%', border: '60px solid rgba(255,255,255,0.06)' }} />
        <div className="container" style={{ position: 'relative', padding: '92px var(--container-pad) 80px', display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: '56px', alignItems: 'center' }}>
          <div>
            <span className="anim-rise"><Eyebrow tone="light">Serving Islam through the nation</Eyebrow></span>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(40px, 5.2vw, 64px)', lineHeight: 1.05, letterSpacing: '-0.02em', margin: '16px 0 18px' }}>
              {'The home of Muslim corps members across Southwest Nigeria'.split(' ').map((w, i) => (
                <span key={i} className="anim-word" style={{ '--anim-delay': `${i * 0.06}s` } as React.CSSProperties}>{w}&nbsp;</span>
              ))}
            </h1>
            <p className="anim-rise" style={{ '--anim-delay': '0.12s', fontSize: '18px', lineHeight: 1.6, color: 'rgba(255,255,255,0.9)', maxWidth: '520px', margin: '0 0 28px' } as React.CSSProperties}>
              We support corps members spiritually, socially and professionally through their service year — across Lagos, Ogun, Oyo, Osun, Ondo and Ekiti.
            </p>
            <div className="anim-rise" style={{ '--anim-delay': '0.18s', display: 'flex', gap: '14px', flexWrap: 'wrap' } as React.CSSProperties}>
              <Button variant="hero" size="lg" onClick={() => setJoinOpen(true)}>Join MCAN</Button>
              <Link to="/programs">
                <Button variant="heroWhite" size="lg">Explore programs</Button>
              </Link>
            </div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.18)', borderRadius: 'var(--radius-section)', padding: '30px 30px 28px' }}>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '15px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gold-300)', marginBottom: '14px' }}>Our motto</div>
            <p style={{ margin: 0, fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '20px', lineHeight: 1.5 }}>
              &ldquo;Indeed, my prayer, my rites of sacrifice, my living and my dying are for All&#257;h, Lord of the worlds.&rdquo;
            </p>
            <p style={{ margin: '14px 0 0', fontSize: '14px', color: 'rgba(255,255,255,0.78)' }}>Al-An&rsquo;am 6:162</p>
          </div>
        </div>
        <div style={{ position: 'relative', zIndex: 1, borderTop: '1px solid rgba(255,255,255,0.15)' }}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', padding: '28px var(--container-pad)' }}>
            <StatCard value={<CountUp value={6} />} label="States coordinated" light />
            <StatCard value={<CountUp value={12000} suffix="+" />} label="Corps members served" light />
            <StatCard value={<CountUp value={40} suffix="+" />} label="Programs a year" light />
            <StatCard value={<CountUp value={15} prefix="₦" suffix="M" />} label="Raised for welfare" light />
          </div>
        </div>
      </section>

      {/* Value Pillars */}
      <section className="container" style={{ padding: '96px var(--container-pad)' }}>
        <Reveal><SectionHeading eyebrow="What we do" title="Built around members, not bureaucracy" intro="Three pillars shape every program we run across the Southwest zone." align="center" /></Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginTop: '48px' }}>
          {pillars.map((p, i) => (
            <Reveal key={p.t} delay={i * 0.1} style={{ background: 'var(--surface-card)', borderRadius: 'var(--radius-card)', padding: '30px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'var(--green-50)', color: 'var(--green-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '20px', marginBottom: '18px' }}>{i + 1}</div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '21px', color: 'var(--text-heading)', margin: '0 0 10px' }}>{p.t}</h3>
              <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.6, color: 'var(--text-body)' }}>{p.d}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Programs Preview */}
      <section style={{ background: 'var(--white)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container" style={{ padding: '96px var(--container-pad)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '24px', flexWrap: 'wrap' }}>
            <SectionHeading eyebrow="Programs & events" title="What&apos;s happening across the zone" />
            <Link to="/programs"><Button variant="secondary">View all programs</Button></Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginTop: '40px' }}>
            {programs.map((it, i) => <Reveal key={it.title} delay={i * 0.1}><ProgramCard {...it} /></Reveal>)}
          </div>
        </div>
      </section>

      {/* States Band */}
      <section className="container" style={{ padding: '96px var(--container-pad)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '56px', alignItems: 'center' }}>
        <Reveal>
          <SectionHeading eyebrow="State chapters" title="One zone, six coordinated chapters" intro="Each state chapter runs local welfare and spiritual programs under one regional body — so no member serves alone." />
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '26px' }}>
            {states.map((s) => <Badge key={s} tone="green">{s} State</Badge>)}
          </div>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {states.map((s, i) => (
            <Reveal key={s} delay={i * 0.07} style={{ background: 'var(--surface-card)', borderRadius: 'var(--radius-card)', padding: '20px 22px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '17px', color: 'var(--text-heading)' }}>{s}</span>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{stateMembers[i].toLocaleString()}+ members</span>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'linear-gradient(135deg, var(--green-emerald), var(--green-900))', color: '#fff' }}>
        <div className="container" style={{ padding: '80px var(--container-pad)', textAlign: 'center' }}>
          <Reveal style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '18px' }}>
            <Eyebrow tone="light">Join the community</Eyebrow>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(30px, 4vw, 44px)', lineHeight: 1.1, margin: 0, maxWidth: '720px' }}>
              Make your service year count — spiritually and beyond
            </h2>
            <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.82)', maxWidth: '560px', margin: 0 }}>
              Register with MCAN Southwest and connect with thousands of Muslim corps members the day you arrive.
            </p>
            <div style={{ display: 'flex', gap: '14px', marginTop: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Button variant="gold" size="lg" onClick={() => setJoinOpen(true)}>Join MCAN</Button>
              <Link to="/donate">
                <Button variant="ghost" size="lg" style={{ color: '#fff', border: '1.5px solid rgba(255,255,255,0.4)' }}>Donate</Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {joinOpen && <JoinModal onClose={() => setJoinOpen(false)} />}
    </div>
  );
}
