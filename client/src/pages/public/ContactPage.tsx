import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';

export default function Contact() {
  const inputStyle: React.CSSProperties = {
    fontFamily: 'var(--font-body)', fontSize: '15px', padding: '13px 15px',
    borderRadius: 'var(--radius-button)', border: '1.5px solid var(--border-default)',
    background: 'var(--white)', color: 'var(--text-heading)', outline: 'none', width: '100%',
  };
  const states = ['Lagos', 'Ogun', 'Oyo', 'Osun', 'Ondo', 'Ekiti'];

  return (
    <section className="container resp-grid-2" style={{ padding: '76px var(--container-pad) 96px', display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: '56px', alignItems: 'start' }}>
      <Reveal>
        <SectionHeading eyebrow="Contact" title="Reach the zonal secretariat" intro="Questions about membership, partnerships or projects? Send a note and the team will respond." />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginTop: '28px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gold-500)' }}>Email</span>
            <span style={{ fontSize: '16px', color: 'var(--text-heading)' }}>mcansouthwestzone@gmail.com</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gold-500)' }}>Phone</span>
            <span style={{ fontSize: '16px', color: 'var(--text-heading)' }}>0903 044 6741 &middot; 0802 569 7328</span>
          </div>
        </div>
      </Reveal>
      <Reveal delay={0.1} style={{ background: 'var(--surface-card)', borderRadius: 'var(--radius-section)', padding: '32px', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div className="resp-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          <input style={inputStyle} placeholder="Full name" />
          <input style={inputStyle} placeholder="Email address" />
        </div>
        <select style={inputStyle} defaultValue="Lagos">
          {states.map((s) => <option key={s}>{s} State</option>)}
        </select>
        <textarea style={{ ...inputStyle, minHeight: '120px', resize: 'vertical' }} placeholder="How can we help?" />
        <Button variant="primary" size="lg">Send message</Button>
      </Reveal>
    </section>
  );
}
