import { useState, useLayoutEffect, useRef } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { JoinModal } from '@/components/ui/JoinModal';
import { Link } from 'react-router-dom';

const FAQS = [
  {
    q: 'What is MCAN?',
    a: ['MCAN is the Muslim Corpers\u2019 Association of Nigeria \u2014 the body that gathers Muslim members of the National Youth Service Corps (NYSC) during their service year. The Southwest Zone coordinates chapters across Lagos, Ogun, Oyo, Osun, Ondo and Ekiti.', 'We exist to support Muslim corps members spiritually, socially, intellectually and professionally \u2014 promoting Islamic values and community development under the slogan \u201cServing Islam through the nation.\u201d'],
  },
  {
    q: 'How do I join MCAN?',
    a: ['Membership is open to every Muslim corps member from camp onwards. Register on this site in under a minute \u2014 your state chapter is notified and reaches out within 48 hours, insha\u2019Allah.', 'After you submit, you can join the official WhatsApp group to connect with members immediately, get program updates and find your nearest lodge and masjid.'],
    cta: true,
  },
  {
    q: 'What are the MCAN rules?',
    a: ['Members uphold the pristine teachings of Islam in all affairs \u2014 honouring the five daily prayers, modest dress and conduct, and respect for fellow members and leadership.', 'Amanah (trust) guides everything: keep commitments, handle association funds and property responsibly, resolve disputes through consultation (shura), and follow the guidance of your chapter executives and lodge coordinators.'],
  },
  {
    q: 'What welfare support does MCAN offer?',
    a: ['The zone runs emergency welfare, accommodation guidance through our vetted lodges, and interstate transport support so members can attend regional programs.', 'During Ramadan, the Feed a Soul project provides iftar meals and relief packages. Members facing hardship can reach their chapter Welfare Officer in confidence at any time.'],
  },
  {
    q: 'What should I expect at camp?',
    a: ['On arrival at the NYSC orientation camp, look for the MCAN desk or banner \u2014 our camp executives help you settle in, find the camp mosque, and connect with other Muslim corps members from day one.', 'Expect daily congregational prayers, a welcome orientation, guidance on lodges and posting, and an invitation to the WhatsApp group. You never serve alone.'],
  },
];

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"
      style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform var(--dur-base) var(--ease-standard)', flexShrink: 0 }}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function FAQItem({ item, open, onToggle, onJoin }: { item: typeof FAQS[0]; open: boolean; onToggle: () => void; onJoin: () => void }) {
  const bodyRef = useRef<HTMLDivElement>(null);
  const [h, setH] = useState(0);
  useLayoutEffect(() => { if (bodyRef.current) setH(bodyRef.current.scrollHeight); }, [open]);
  return (
    <div style={{
      background: 'var(--surface-card)', borderRadius: 'var(--radius-card)',
      border: '1px solid ' + (open ? 'var(--green-200)' : 'var(--border-subtle)'),
      boxShadow: open ? 'var(--shadow-md)' : 'var(--shadow-xs)',
      overflow: 'hidden', transition: 'border-color var(--dur-base) var(--ease-standard), box-shadow var(--dur-base) var(--ease-standard)',
    }}>
      <button onClick={onToggle} style={{
        width: '100%', display: 'flex', alignItems: 'center', gap: '16px', textAlign: 'left',
        padding: '22px 24px', background: 'none', border: 'none', cursor: 'pointer',
        color: open ? 'var(--green-primary)' : 'var(--text-heading)',
        fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '19px',
        transition: 'color var(--dur-base) var(--ease-standard)',
      }}>
        <span style={{ flex: 1 }}>{item.q}</span>
        <ChevronIcon open={open} />
      </button>
      <div style={{
        maxHeight: open ? h + 'px' : '0px', opacity: open ? 1 : 0,
        transition: 'max-height var(--dur-base) var(--ease-standard), opacity var(--dur-base) var(--ease-standard)',
      }}>
        <div ref={bodyRef} style={{ padding: '0 24px 24px' }}>
          {item.a.map((p, i) => (
            <p key={i} style={{ margin: i === 0 ? '0 0 12px' : '0 0 12px', fontSize: '15.5px', lineHeight: 1.7, color: 'var(--text-body)' }}>{p}</p>
          ))}
          {item.cta && (
            <button onClick={onJoin} style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '4px',
              background: 'var(--green-primary)', color: '#fff', border: 'none', cursor: 'pointer',
              padding: '11px 20px', borderRadius: 'var(--radius-button)', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '15px',
            }}>
              Register now
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Faq() {
  const [open, setOpen] = useState(0);
  const [joinOpen, setJoinOpen] = useState(false);
  return (
    <div>
      <section style={{ background: 'var(--white)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div className="container" style={{ padding: '72px var(--container-pad) 48px', textAlign: 'center', maxWidth: '820px' }}>
          <Eyebrow>Frequently asked questions</Eyebrow>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(32px, 4.2vw, 48px)', lineHeight: 1.1, letterSpacing: '-0.02em', color: 'var(--text-heading)', margin: '14px 0 14px' }}>
            Everything you need before you serve
          </h1>
          <p style={{ fontSize: '18px', lineHeight: 1.6, color: 'var(--text-body)', margin: 0 }}>
            New to MCAN Southwest? Here are the questions corps members ask us most.
          </p>
        </div>
      </section>

      <section className="container" style={{ padding: '56px var(--container-pad)', maxWidth: '820px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {FAQS.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.06}>
              <FAQItem item={f} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} onJoin={() => setJoinOpen(true)} />
            </Reveal>
          ))}
        </div>
      </section>

      <section style={{ background: 'linear-gradient(135deg, var(--green-emerald), var(--green-900))', color: '#fff' }}>
        <div className="container" style={{ padding: '64px var(--container-pad)', textAlign: 'center' }}>
          <Reveal style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <Eyebrow tone="light">Still have a question?</Eyebrow>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(26px, 3.4vw, 38px)', lineHeight: 1.15, margin: 0, maxWidth: '620px' }}>
              The zonal secretariat is one message away
            </h2>
            <div style={{ display: 'flex', gap: '14px', marginTop: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <Button variant="gold" size="lg" onClick={() => setJoinOpen(true)}>Join MCAN</Button>
              <Link to="/contact">
                <Button variant="ghost" size="lg" style={{ color: '#fff', border: '1.5px solid rgba(255,255,255,0.4)' }}>Contact us</Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {joinOpen && <JoinModal onClose={() => setJoinOpen(false)} />}
    </div>
  );
}
