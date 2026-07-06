import { useState } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Eyebrow } from '@/components/ui/Eyebrow';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { CountUp } from '@/components/ui/CountUp';
import { Reveal } from '@/components/ui/Reveal';
import { JoinModal } from '@/components/ui/JoinModal';

const TIERS = [
  { amount: '₦5,000', title: 'Feed a soul', desc: 'Provides iftar meals for fasting Muslims during Ramadan.', tone: 'green' as const },
  { amount: '₦25,000', title: 'Ease logistics', desc: 'Supports interstate transport for a member attending zonal programs.', tone: 'gold' as const, featured: true },
  { amount: '₦100,000', title: 'Build with us', desc: 'Contributes to the central mosque & da\u2019wah centre project.', tone: 'green' as const },
];

const ACCOUNT = { name: 'MCAN Southwest Zone', number: '0123456789', bank: 'Jaiz Bank PLC' };

function CopyRow({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    try { if (navigator.clipboard) navigator.clipboard.writeText(value); } catch {}
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '14px', padding: '15px 18px', background: 'var(--gray-50)', borderRadius: 'var(--radius-card)', border: '1px solid var(--border-subtle)' }}>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)' }}>{label}</div>
        <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '19px', color: 'var(--text-heading)', marginTop: '3px', letterSpacing: label === 'Account number' ? '0.04em' : 'normal' }}>{value}</div>
      </div>
      <button onClick={copy} style={{
        display: 'inline-flex', alignItems: 'center', gap: '7px', flexShrink: 0, cursor: 'pointer',
        padding: '8px 14px', borderRadius: 'var(--radius-button)', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '13px',
        border: '1.5px solid ' + (copied ? 'var(--green-primary)' : 'var(--border-default)'),
        background: copied ? 'var(--green-50)' : 'var(--white)', color: copied ? 'var(--green-primary)' : 'var(--text-body)',
        transition: 'all var(--dur-base) var(--ease-standard)',
      }}>
        {copied ? (
          <><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>Copied</>
        ) : (
          <><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>Copy</>
        )}
      </button>
    </div>
  );
}

export default function Donate() {
  const [amount, setAmount] = useState('₦25,000');
  const [showAccount, setShowAccount] = useState(false);
  const [joinOpen, setJoinOpen] = useState(false);

  return (
    <div>
      <section style={{ background: 'linear-gradient(135deg, var(--green-emerald), var(--green-primary))', color: '#fff' }}>
        <div className="container resp-grid-2" style={{ padding: '76px var(--container-pad)', display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '48px', alignItems: 'center' }}>
          <div>
            <Eyebrow tone="light">Support the work</Eyebrow>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: 'clamp(34px, 4.5vw, 52px)', lineHeight: 1.08, letterSpacing: '-0.02em', margin: '16px 0 16px' }}>
              Your sadaqah keeps a corps member supported
            </h1>
            <p style={{ fontSize: '18px', lineHeight: 1.7, color: 'rgba(255,255,255,0.85)', maxWidth: '480px', margin: 0 }}>
              Every contribution funds welfare, transport, learning and mosque projects across the six Southwest states.<br />
              <span style={{ color: 'rgba(255,255,255,0.7)' }}>Give once or partner with us monthly.</span>
            </p>
          </div>
          <div className="resp-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 'var(--radius-section)', padding: '24px', border: '1px solid rgba(255,255,255,0.16)' }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '40px', lineHeight: 1, color: 'var(--gold-300)' }}><CountUp value={15} prefix="₦" suffix="M" /></div>
              <div style={{ fontSize: '14px', color: '#fff', marginTop: '6px' }}>Raised for welfare</div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 'var(--radius-section)', padding: '24px', border: '1px solid rgba(255,255,255,0.16)' }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '40px', lineHeight: 1, color: 'var(--gold-300)' }}><CountUp value={12000} suffix="+" /></div>
              <div style={{ fontSize: '14px', color: '#fff', marginTop: '6px' }}>Members supported</div>
            </div>
          </div>
        </div>
      </section>

      <section className="container" style={{ padding: '88px var(--container-pad) 40px' }}>
        <Reveal><SectionHeading eyebrow="Choose an amount" title="Pick a tier that works for you" align="center" /></Reveal>
        <div className="resp-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginTop: '44px' }}>
          {TIERS.map((tier, i) => {
            const selected = amount === tier.amount;
            return (
              <Reveal key={tier.title} delay={i * 0.1} onClick={() => setAmount(tier.amount)} style={{
                cursor: 'pointer', background: 'var(--surface-card)', borderRadius: 'var(--radius-card)',
                padding: '30px', boxShadow: selected ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
                border: '2px solid ' + (selected ? 'var(--green-primary)' : 'var(--border-subtle)'),
                display: 'flex', flexDirection: 'column', gap: '10px',
              }}>
                {tier.featured && <Badge tone="gold" solid>Most popular</Badge>}
                <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '34px', color: 'var(--text-heading)', letterSpacing: '-0.02em' }}>{tier.amount}</div>
                <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '18px', color: 'var(--green-primary)' }}>{tier.title}</div>
                <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.6, color: 'var(--text-body)' }}>{tier.desc}</p>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="container" style={{ padding: '0 var(--container-pad) 96px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
        <p style={{ fontSize: '16px', color: 'var(--text-body)', margin: 0 }}>You selected <strong>{amount}</strong>. Click below for our account details.</p>
        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Button variant="primary" size="lg" onClick={() => setShowAccount(true)}>Donate {amount}</Button>
          <Button variant="secondary" size="lg" onClick={() => setJoinOpen(true)}>Become a monthly partner</Button>
        </div>
      </section>

      {showAccount && (
        <div onClick={() => setShowAccount(false)} style={{
          position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(13,36,24,0.55)', backdropFilter: 'blur(3px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px',
        }}>
          <div onClick={(e) => e.stopPropagation()} style={{
            width: '100%', maxWidth: '470px', background: 'var(--surface-card)', borderRadius: 'var(--radius-section)',
            boxShadow: 'var(--shadow-lg)', overflow: 'hidden',
          }}>
            <div style={{ background: 'linear-gradient(135deg, var(--green-emerald), var(--green-primary))', color: '#fff', padding: '26px 28px', position: 'relative' }}>
              <button onClick={() => setShowAccount(false)} aria-label="Close" style={{ position: 'absolute', top: '18px', right: '18px', width: '34px', height: '34px', borderRadius: '50%', border: 'none', background: 'rgba(255,255,255,0.16)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
              </button>
              <Eyebrow tone="light">Bank transfer</Eyebrow>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '23px', margin: '8px 0 4px' }}>Send your {amount} donation</h3>
              <p style={{ margin: 0, fontSize: '14px', color: 'rgba(255,255,255,0.82)' }}>Transfer to the MCAN Southwest account below, then keep your receipt.</p>
            </div>
            <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <CopyRow label="Account name" value={ACCOUNT.name} />
              <CopyRow label="Account number" value={ACCOUNT.number} />
              <CopyRow label="Bank name" value={ACCOUNT.bank} />
              <div style={{ display: 'flex', gap: '11px', alignItems: 'flex-start', background: 'var(--green-50)', borderRadius: 'var(--radius-card)', padding: '14px 16px', marginTop: '4px' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--green-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '1px' }}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                <p style={{ margin: 0, fontSize: '13.5px', lineHeight: 1.55, color: 'var(--green-700)' }}>
                  Use your full name as the transfer reference. For zakat or a specific project, send the details to <strong>mcansouthwestzone@gmail.com</strong>.
                </p>
              </div>
              <Button fullWidth onClick={() => setShowAccount(false)}>I&rsquo;ve sent my donation</Button>
            </div>
          </div>
        </div>
      )}

      {joinOpen && <JoinModal onClose={() => setJoinOpen(false)} />}
    </div>
  );
}
