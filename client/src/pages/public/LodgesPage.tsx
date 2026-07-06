import { useState, useMemo } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { CountUp } from '@/components/ui/CountUp';
import { Reveal } from '@/components/ui/Reveal';
import { JoinModal } from '@/components/ui/JoinModal';
import { useLodges } from '@/features/lodges/hooks/useLodges';
import type { Lodge } from '@/types';

const STATUS: Record<string, { bg: string; fg: string; dot: string }> = {
  Available: { bg: 'var(--green-50)', fg: 'var(--green-700)', dot: 'var(--green-primary)' },
  Limited: { bg: 'var(--gold-100)', fg: 'var(--gold-600)', dot: 'var(--gold-400)' },
  Full: { bg: '#FBEAE8', fg: '#9B2C20', dot: '#C0392B' },
};

const RULES = [
  'Lodges are gender-segregated — brothers and sisters are housed separately, always.',
  'Observe the five daily prayers in congregation; maintain modest dress and conduct.',
  'Keep shared spaces clean; cooking, lights-out and quiet hours follow the lodge roster.',
  'No unapproved guests overnight. Visitors sign in and leave before Maghrib.',
  'Report faults, security concerns or disputes to the lodge coordinator promptly.',
];

const BOOKING = [
  { n: 1, t: 'Register as a member', d: 'Complete MCAN Southwest membership so the chapter can verify your NYSC posting.' },
  { n: 2, t: 'Request a bed', d: 'Contact the lodge coordinator for your state with your call-up details and arrival date.' },
  { n: 3, t: 'Confirm & move in', d: 'Once a space is confirmed, pay the welfare levy and collect your lodge access on arrival.' },
];

function StatusPill({ status, big }: { status: string; big?: boolean }) {
  const s = STATUS[status];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '7px',
      padding: big ? '7px 14px' : '5px 11px', borderRadius: 'var(--radius-pill)',
      background: s.bg, color: s.fg, fontFamily: 'var(--font-body)',
      fontSize: big ? '14px' : '12.5px', fontWeight: 700,
    }}>
      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: s.dot, boxShadow: status === 'Available' ? '0 0 0 3px ' + s.bg : 'none' }} />
      {status}
    </span>
  );
}

function PinIcon({ size = 16 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>;
}
function PhoneIcon({ size = 16 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" /></svg>;
}
function BedIcon({ size = 16 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 4v16" /><path d="M2 8h18a2 2 0 0 1 2 2v10" /><path d="M2 17h20" /><path d="M6 8v9" /></svg>;
}

function LodgeCard({ lodge, onOpen, delay }: { lodge: Lodge; onOpen: (l: Lodge) => void; delay: number }) {
  const [hover, setHover] = useState(false);
  return (
    <Reveal delay={delay}>
      <article onClick={() => onOpen(lodge)} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)} style={{
        background: 'var(--surface-card)', borderRadius: 'var(--radius-card)', overflow: 'hidden',
        boxShadow: hover ? 'var(--shadow-lg)' : 'var(--shadow-sm)', border: '1px solid var(--border-subtle)',
        cursor: 'pointer', transform: hover ? 'translateY(-4px)' : 'none',
        transition: 'transform var(--dur-base) var(--ease-standard), box-shadow var(--dur-base) var(--ease-standard)',
        display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ position: 'relative', height: '172px', background: `center/cover no-repeat url(${lodge.photo})` }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11,19,14,0.55), rgba(11,19,14,0) 55%)' }} />
          <div style={{ position: 'absolute', top: '12px', left: '12px' }}><StatusPill status={lodge.status} /></div>
          <div style={{ position: 'absolute', right: '12px', bottom: '12px', display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(4px)', padding: '5px 10px', borderRadius: 'var(--radius-pill)', fontSize: '12.5px', fontWeight: 700, color: 'var(--text-heading)' }}>
            <BedIcon size={14} />{lodge.capacity} beds
          </div>
        </div>
        <div style={{ padding: '18px 20px 20px', display: 'flex', flexDirection: 'column', gap: '9px', flex: 1 }}>
          <h3 style={{ margin: 0, fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '19px', lineHeight: 1.25, color: 'var(--text-heading)' }}>{lodge.name}</h3>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', color: 'var(--text-body)', fontSize: '14px', lineHeight: 1.5 }}>
            <span style={{ marginTop: '2px', color: 'var(--gold-500)' }}><PinIcon size={15} /></span>{lodge.address}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '13.5px', marginTop: 'auto', paddingTop: '6px' }}>
            <PhoneIcon size={14} />{lodge.coordinator}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--green-primary)', fontSize: '14px', fontWeight: 600, marginTop: '2px' }}>
            View details &amp; map
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: hover ? 'translateX(3px)' : 'none', transition: 'transform var(--dur-base) var(--ease-standard)' }}><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function LodgeModal({ lodge, onClose, onJoin }: { lodge: Lodge; onClose: () => void; onJoin?: () => void }) {
  const mapSrc = 'https://www.google.com/maps?q=' + encodeURIComponent(lodge.map) + '&output=embed';
  const row = (icon: React.ReactNode, label: string, val: string) => (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
      <div style={{ width: '34px', height: '34px', borderRadius: '10px', background: 'var(--green-50)', color: 'var(--green-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{icon}</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
        <span style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)' }}>{label}</span>
        <span style={{ fontSize: '15px', color: 'var(--text-heading)', fontWeight: 500 }}>{val}</span>
      </div>
    </div>
  );

  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(13,36,24,0.55)', backdropFilter: 'blur(3px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px',
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        width: '100%', maxWidth: '760px', maxHeight: '88vh', overflowY: 'auto', background: 'var(--surface-card)',
        borderRadius: 'var(--radius-section)', boxShadow: 'var(--shadow-lg)',
      }}>
        <div style={{ position: 'relative', height: '180px', background: `center/cover no-repeat url(${lodge.photo})` }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11,19,14,0.78), rgba(11,19,14,0.05))' }} />
          <button onClick={onClose} aria-label="Close" style={{ position: 'absolute', top: '14px', right: '14px', width: '36px', height: '36px', borderRadius: '50%', border: 'none', background: 'rgba(255,255,255,0.92)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-heading)' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
          <div style={{ position: 'absolute', left: '24px', bottom: '18px', color: '#fff' }}>
            <StatusPill status={lodge.status} big />
            <h2 style={{ margin: '10px 0 0', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '27px', lineHeight: 1.1 }}>{lodge.name}</h2>
          </div>
        </div>
        <div className="resp-grid-2" style={{ padding: '26px 28px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px 28px' }}>
          {row(<PinIcon size={17} />, 'Address', lodge.address)}
          {row(<BedIcon size={17} />, 'Capacity', lodge.capacity + ' beds')}
          {row(<PhoneIcon size={17} />, 'Lodge coordinator', lodge.coordinator)}
          {row(<PhoneIcon size={17} />, 'Contact', lodge.phone)}
        </div>
        <div style={{ padding: '0 28px 8px' }}>
          <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gold-500)', marginBottom: '10px' }}>Location</div>
          <div style={{ borderRadius: 'var(--radius-card)', overflow: 'hidden', border: '1px solid var(--border-subtle)' }}>
            <iframe title={'Map of ' + lodge.name} src={mapSrc} width="100%" height="240" style={{ border: 0, display: 'block' }} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
        <div style={{ padding: '20px 28px 26px' }}>
          <div style={{ background: 'var(--green-50)', borderRadius: 'var(--radius-card)', padding: '18px 20px' }}>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '16px', color: 'var(--green-700)', marginBottom: '6px' }}>Booking this lodge</div>
            <p style={{ margin: 0, fontSize: '14.5px', lineHeight: 1.6, color: 'var(--text-body)' }}>
              Register as a member, then call <strong>{lodge.coordinator}</strong> on <strong>{lodge.phone}</strong> with your call-up details and arrival date to confirm a bed.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px', marginTop: '18px', flexWrap: 'wrap' }}>
            <Button variant="primary" onClick={() => { onClose(); onJoin?.(); }}>Register to book</Button>
            <Button variant="secondary" onClick={onClose}>Close</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

const STATE_ORDER = ['Lagos', 'Ogun', 'Oyo', 'Osun', 'Ondo', 'Ekiti'];

export default function Lodges() {
  const { lodges, isLoading } = useLodges();
  const [filter, setFilter] = useState('All');
  const [activeLodge, setActiveLodge] = useState<Lodge | null>(null);
  const [joinOpen, setJoinOpen] = useState(false);

  const grouped = useMemo(() => {
    const map = new Map<string, Lodge[]>();
    for (const l of lodges) {
      const arr = map.get(l.state) || [];
      arr.push(l);
      map.set(l.state, arr);
    }
    return STATE_ORDER.filter((s) => map.has(s)).map((state) => ({ state, lodges: map.get(state)! }));
  }, [lodges]);

  const allStates = grouped.map((s) => s.state);
  const total = lodges.length;
  const available = lodges.filter((l) => l.status === 'Available').length;
  const shown = filter === 'All' ? grouped : grouped.filter((s) => s.state === filter);

  if (isLoading) return <div style={{ padding: '96px 0', textAlign: 'center', color: 'var(--text-muted)' }}>Loading lodges…</div>;

  return (
    <div>
      <section style={{ position: 'relative', overflow: 'hidden', color: '#fff' }}>
        <div style={{ position: 'absolute', inset: 0, background: `center/cover no-repeat url(/photos/mosque-block.jpg)` }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(7,93,55,0.95) 0%, rgba(11,104,64,0.85) 45%, rgba(7,93,55,0.45) 100%)' }} />
        <div style={{ position: 'absolute', right: '-150px', top: '-110px', width: '460px', height: '460px', borderRadius: '50%', border: '54px solid rgba(255,255,255,0.06)' }} />
        <div className="container resp-grid-2" style={{ position: 'relative', padding: '78px var(--container-pad)', display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '48px', alignItems: 'center' }}>
          <div>
            <Eyebrow tone="light">MCAN Lodges</Eyebrow>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(34px, 4.5vw, 52px)', lineHeight: 1.08, letterSpacing: '-0.02em', margin: '16px 0 16px' }}>
              A safe place to stay in every Southwest state
            </h1>
            <p style={{ fontSize: '18px', lineHeight: 1.6, color: 'rgba(255,255,255,0.88)', maxWidth: '500px', margin: 0 }}>
              Vetted, gender-segregated lodges for Muslim corps members — close to camp, community and the masjid.
            </p>
          </div>
          <div className="resp-grid-3" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
            {[{ v: total, l: 'Lodges' }, { v: 6, l: 'States' }, { v: available, l: 'Available now' }].map((s) => (
              <div key={s.l} style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 'var(--radius-card)', padding: '20px 16px', border: '1px solid rgba(255,255,255,0.16)', textAlign: 'center' }}>
                <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '34px', lineHeight: 1, color: 'var(--gold-300)' }}><CountUp value={s.v} /></div>
                <div style={{ fontSize: '12.5px', color: 'rgba(255,255,255,0.82)', marginTop: '6px' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container resp-grid-2" style={{ padding: '80px var(--container-pad) 40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'start' }}>
        <Reveal style={{ background: 'var(--surface-card)', borderRadius: 'var(--radius-section)', padding: '32px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-subtle)' }}>
          <Eyebrow>Rules &amp; guidelines</Eyebrow>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '26px', color: 'var(--text-heading)', margin: '12px 0 20px' }}>Living in an MCAN lodge</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {RULES.map((r, i) => (
              <div key={i} style={{ display: 'flex', gap: '13px', alignItems: 'flex-start' }}>
                <span style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--green-50)', color: 'var(--green-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                </span>
                <span style={{ fontSize: '15px', lineHeight: 1.55, color: 'var(--text-body)' }}>{r}</span>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <Eyebrow>Booking procedure</Eyebrow>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '26px', color: 'var(--text-heading)', margin: '12px 0 20px' }}>How to reserve a bed</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {BOOKING.map((b) => (
              <div key={b.n} style={{ display: 'flex', gap: '16px', background: 'var(--surface-card)', borderRadius: 'var(--radius-card)', padding: '18px 20px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--green-primary), var(--green-emerald))', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '17px', flexShrink: 0 }}>{b.n}</div>
                <div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '17px', color: 'var(--text-heading)', marginBottom: '3px' }}>{b.t}</div>
                  <p style={{ margin: 0, fontSize: '14.5px', lineHeight: 1.55, color: 'var(--text-body)' }}>{b.d}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="container" style={{ padding: '40px var(--container-pad) 30px' }}>
        <SectionHeading eyebrow="Lodge directory" title="Find a lodge, state by state" intro="Tap any lodge to see its coordinator, capacity, live availability and an embedded map." />
        <div style={{ display: 'flex', gap: '10px', marginTop: '26px', flexWrap: 'wrap' }}>
          {['All', ...allStates].map((c) => (
            <button key={c} onClick={() => setFilter(c)} style={{
              fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600, cursor: 'pointer',
              padding: '9px 18px', borderRadius: 'var(--radius-pill)',
              border: '1.5px solid ' + (filter === c ? 'var(--green-primary)' : 'var(--border-default)'),
              background: filter === c ? 'var(--green-primary)' : 'transparent',
              color: filter === c ? '#fff' : 'var(--text-body)',
              transition: 'all var(--dur-fast) var(--ease-standard)',
            }}>{c === 'All' ? 'All states' : c}</button>
          ))}
        </div>
      </section>

      {shown.map((s) => (
        <section key={s.state} className="container" style={{ padding: '14px var(--container-pad) 30px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '22px' }}>
            <h3 style={{ margin: 0, fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '24px', color: 'var(--text-heading)' }}>{s.state} State</h3>
            <span style={{ height: '1px', flex: 1, background: 'var(--border-subtle)' }} />
            <Badge tone="green">{s.lodges.length} lodges</Badge>
          </div>
          <div className="resp-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {s.lodges.map((l, i) => <LodgeCard key={l.id} lodge={l} onOpen={setActiveLodge} delay={(i % 3) * 0.08} />)}
          </div>
        </section>
      ))}

      <div style={{ height: '64px' }} />
      {activeLodge && <LodgeModal lodge={activeLodge} onClose={() => setActiveLodge(null)} onJoin={() => setJoinOpen(true)} />}
      {joinOpen && <JoinModal onClose={() => setJoinOpen(false)} />}
    </div>
  );
}
