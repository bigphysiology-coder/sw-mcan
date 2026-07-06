import { useState } from 'react';
import { Link } from 'react-router-dom';

const SOCIALS = [
  { label: 'WhatsApp', href: '#', path: 'M17.5 14.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35zM12 2A10 10 0 0 0 3.5 17.2L2 22l4.9-1.28A10 10 0 1 0 12 2z' },
  { label: 'Instagram', href: '#', path: 'M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zM12 4C8.86 4 8.5 4.01 7.26 4.07c-.96.04-1.48.2-1.83.34-.46.18-.79.39-1.13.74-.35.34-.56.67-.74 1.13-.14.35-.3.87-.34 1.83C2.84 9.5 2.83 9.86 2.83 13s.01 3.5.07 4.74c.04.96.2 1.48.34 1.83.18.46.39.79.74 1.13.34.35.67.56 1.13.74.35.14.87.3 1.83.34 1.24.06 1.6.07 4.74.07s3.5-.01 4.74-.07c.96-.04 1.48-.2 1.83-.34.46-.18.79-.39 1.13-.74.35-.34.56-.67.74-1.13.14-.35.3-.87.34-1.83.06-1.24.07-1.6.07-4.74s-.01-3.5-.07-4.74c-.04-.96-.2-1.48-.34-1.83a3.05 3.05 0 0 0-.74-1.13 3.05 3.05 0 0 0-1.13-.74c-.35-.14-.87-.3-1.83-.34C15.5 4.01 15.14 4 12 4zm0 3.38a4.62 4.62 0 1 0 0 9.24 4.62 4.62 0 0 0 0-9.24zm0 7.62a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm5.88-7.84a1.08 1.08 0 1 1-2.16 0 1.08 1.08 0 0 1 2.16 0z' },
  { label: 'Facebook', href: '#', path: 'M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.78-3.89 1.09 0 2.23.2 2.23.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z' },
  { label: 'X', href: '#', path: 'M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.22-6.82-5.97 6.82H1.65l7.73-8.84L1.23 2.25h6.83l4.71 6.23 5.47-6.23zm-1.16 17.52h1.83L7.01 4.13H5.04l12.04 15.64z' },
  { label: 'YouTube', href: '#', path: 'M23 12s0-3.16-.4-4.68a2.52 2.52 0 0 0-1.77-1.78C19.31 5.13 12 5.13 12 5.13s-7.31 0-8.83.41A2.52 2.52 0 0 0 1.4 7.32C1 8.84 1 12 1 12s0 3.16.4 4.68a2.52 2.52 0 0 0 1.77 1.78c1.52.41 8.83.41 8.83.41s7.31 0 8.83-.41a2.52 2.52 0 0 0 1.77-1.78C23 15.16 23 12 23 12zm-13 3.02V8.98L15.5 12 10 15.02z' },
];

function SocialIcon({ s }: { s: typeof SOCIALS[0] }) {
  const [h, setH] = useState(false);
  return (
    <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: h ? 'var(--gold-400)' : 'rgba(255,255,255,0.1)', color: h ? 'var(--navy-900)' : '#fff',
        border: '1px solid rgba(255,255,255,0.16)', transform: h ? 'translateY(-2px)' : 'none',
        transition: 'all var(--dur-base) var(--ease-standard)', textDecoration: 'none', flexShrink: 0,
      }}>
      <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor"><path d={s.path} /></svg>
    </a>
  );
}

export function Footer() {
  const cols = [
    { h: 'Explore', links: [{ l: 'Home', h: '/' }, { l: 'About', h: '/about' }, { l: 'Programs', h: '/programs' }, { l: 'Lodges', h: '/lodges' }] },
    { h: 'Community', links: [{ l: 'Leadership', h: '/leadership' }, { l: 'Gallery', h: '/gallery' }, { l: 'News', h: '/news' }, { l: 'FAQ', h: '/faq' }] },
    { h: 'Get involved', links: [{ l: 'Donate', h: '/donate' }, { l: 'Contact us', h: '/contact' }, { l: 'Executive portal', h: '/portal' }] },
  ];
  return (
    <footer style={{ background: 'linear-gradient(160deg, var(--green-900), #042b1a)', color: 'rgba(255,255,255,0.78)' }}>
      <div className="container resp-grid-4" style={{ padding: '64px var(--container-pad) 32px', display: 'grid', gridTemplateColumns: '1.6fr 1fr 1fr 1fr', gap: '40px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <img src="/photos/logo-mcan.png" alt="MCAN" style={{ width: '52px', height: '52px', objectFit: 'contain', background: '#fff', borderRadius: '50%', padding: '3px' }} />
            <div style={{ lineHeight: 1.15 }}>
              <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '18px', color: '#fff' }}>MCAN Southwest</div>
              <div style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gold-300)' }}>
                Serving Islam through the nation
              </div>
            </div>
          </div>
          <p style={{ fontSize: '14px', lineHeight: 1.7, maxWidth: '320px', margin: '0 0 16px' }}>
            The regional coordinating body of the Muslim Corpers&apos; Association of Nigeria across Lagos, Ogun, Oyo, Osun, Ondo and Ekiti.
          </p>
          <div style={{ fontSize: '13px', lineHeight: 1.8, marginBottom: '18px' }}>
            <div>mcansouthwestzone@gmail.com</div>
            <div>0903 044 6741 &middot; 0802 569 7328</div>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            {SOCIALS.map((s) => <SocialIcon key={s.label} s={s} />)}
          </div>
        </div>
        {cols.map((c) => (
          <div key={c.h}>
            <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: '15px', color: '#fff', marginBottom: '14px' }}>{c.h}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'flex-start' }}>
              {c.links.map((link) => (
                <Link key={link.h} to={link.h} style={{ textDecoration: 'none', fontFamily: 'var(--font-body)', fontSize: '14px', color: 'rgba(255,255,255,0.72)' }}>
                  {link.l}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <div className="container" style={{ padding: '20px var(--container-pad)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', fontSize: '13px', color: 'rgba(255,255,255,0.55)' }}>
          <span>&copy; {new Date().getFullYear()} MCAN Southwest Zone. All rights reserved.</span>
          <span style={{ fontStyle: 'italic' }}>Al-An&rsquo;am 6:162</span>
        </div>
      </div>
    </footer>
  );
}
