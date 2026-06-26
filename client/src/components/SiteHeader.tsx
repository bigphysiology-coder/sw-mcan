import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Programs', href: '/programs' },
  { label: 'Lodges', href: '/lodges' },
  { label: 'Projects', href: '/projects' },
  { label: 'Donate', href: '/donate' },
];

const moreItems = [
  { label: 'Leadership', href: '/leadership' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'News', href: '/news' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact us', href: '/contact' },
  { label: 'Executive portal', href: '/portal' },
];

export function SiteHeader() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) setMoreOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const linkStyle = (href: string) => ({
    fontFamily: 'var(--font-body)' as const, fontSize: '14.5px', background: 'none', border: 'none', cursor: 'pointer',
    fontWeight: pathname === href ? 600 : 500,
    color: pathname === href ? 'var(--green-primary)' : 'var(--text-body)',
    display: 'flex', alignItems: 'center',
    paddingBottom: '3px',
    paddingInline: '6px',
    borderBottom: pathname === href ? '2px solid var(--green-primary)' : '2px solid transparent',
    whiteSpace: 'nowrap' as const,
    textDecoration: 'none',
  });

  const iconBtn = {
    width: '38px', height: '38px', borderRadius: '999px', border: '1px solid var(--border-default)',
    background: 'var(--white)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
    color: 'var(--text-body)', position: 'relative' as const, flexShrink: 0,
  };

  const moreActive = moreItems.some((i) => i.href === pathname);

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      background: scrolled ? 'rgba(255,255,255,0.9)' : 'var(--white)',
      backdropFilter: scrolled ? 'blur(10px)' : 'none',
      borderBottom: '1px solid var(--border-subtle)',
      transition: 'background var(--dur-base) var(--ease-standard)',
    }}>
      <div className="container" style={{ padding: '12px var(--container-pad)', display: 'flex', alignItems: 'center', gap: '18px' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '11px', textDecoration: 'none', flexShrink: 0 }}>
          <img src="/photos/logo-mcan.png" alt="MCAN Southwest" style={{ width: '44px', height: '44px', objectFit: 'contain' }} />
          <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.05, textAlign: 'left' }}>
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '17px', color: 'var(--text-heading)' }}>MCAN Southwest</span>
            <span style={{ fontFamily: 'var(--font-body)', fontSize: '10.5px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gold-500)' }}>
              Serving Islam through the nation
            </span>
          </span>
        </Link>

        <nav style={{ display: 'flex', alignItems: 'center', gap: '24px', marginLeft: 'auto' }}>
          {navItems.map((item) => (
            <Link key={item.href} to={item.href} style={linkStyle(item.href) as React.CSSProperties}>
              {item.label}
            </Link>
          ))}

          <div ref={moreRef} style={{ position: 'relative' }}>
            <button onClick={() => setMoreOpen((o) => !o)} style={{
              ...linkStyle(moreActive ? '#more' : '#'),
              display: 'flex', alignItems: 'center', gap: '5px',
            } as React.CSSProperties}>
              More
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{
                transform: moreOpen ? 'rotate(180deg)' : 'none',
                transition: 'transform var(--dur-fast) var(--ease-standard)',
              }}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {moreOpen && (
              <div style={{
                position: 'absolute', top: 'calc(100% + 12px)', right: 0, minWidth: '180px', zIndex: 100,
                background: 'var(--white)', borderRadius: 'var(--radius-card)', boxShadow: 'var(--shadow-lg)',
                border: '1px solid var(--border-subtle)', padding: '8px', display: 'flex', flexDirection: 'column', gap: '2px',
              }}>
                {moreItems.map((item) => (
                  <Link key={item.href} to={item.href} onClick={() => setMoreOpen(false)} style={{
                    textAlign: 'left', padding: '10px 12px', borderRadius: 'var(--radius-sm)', border: 'none', cursor: 'pointer', textDecoration: 'none',
                    background: pathname === item.href ? 'var(--green-50)' : 'transparent',
                    color: pathname === item.href ? 'var(--green-primary)' : 'var(--text-body)',
                    fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: pathname === item.href ? 600 : 500,
                  }}>
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            border: '1px solid var(--border-default)', borderRadius: '999px',
            background: 'var(--gray-50)', padding: '0 6px 0 12px',
            width: searchOpen ? '210px' : '38px', height: '38px',
            transition: 'width var(--dur-base) var(--ease-standard)', overflow: 'hidden',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, cursor: 'pointer' }} onClick={() => setSearchOpen((o) => !o)}>
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input placeholder="Search the site" style={{
              border: 'none', outline: 'none', background: 'transparent', flex: 1, minWidth: 0,
              fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text-heading)',
              opacity: searchOpen ? 1 : 0, transition: 'opacity var(--dur-fast) var(--ease-standard)',
            }} />
          </div>

          <button style={iconBtn} title="Updates" aria-label="Updates">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
            <span style={{ position: 'absolute', top: '7px', right: '8px', width: '8px', height: '8px', borderRadius: '999px', background: 'var(--gold)', border: '2px solid var(--white)' }} />
          </button>
        </div>
      </div>
    </header>
  );
}
