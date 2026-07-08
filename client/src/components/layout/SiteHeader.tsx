import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { newsApi } from '@/features/news/services/newsApi';
import { eventsApi } from '@/features/events/services/eventsApi';

interface SearchItem {
  label: string;
  href: string;
  category: string;
  description: string;
}

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
  { label: 'Events', href: '/events' },
  { label: 'MCAN Southwest ID', href: '/digital-id' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact us', href: '/contact' },
  { label: 'Executive portal', href: '/portal' },
];

const allLinks = [...navItems, ...moreItems];

const pageSearchItems: SearchItem[] = [
  { label: 'Home', href: '/', category: 'Page', description: 'Welcome to MCAN Southwest' },
  { label: 'About', href: '/about', category: 'Page', description: 'Learn about the zone and mission' },
  { label: 'Programs', href: '/programs', category: 'Page', description: 'View programs, lectures and outreach' },
  { label: 'Lodges', href: '/lodges', category: 'Page', description: 'Find lodge locations and updates' },
  { label: 'Projects', href: '/projects', category: 'Page', description: 'See ongoing and completed projects' },
  { label: 'Donate', href: '/donate', category: 'Page', description: 'Support welfare and outreach work' },
  { label: 'Leadership', href: '/leadership', category: 'Page', description: 'Meet the executive team' },
  { label: 'Gallery', href: '/gallery', category: 'Page', description: 'Browse photos from events and programs' },
  { label: 'News', href: '/news', category: 'Page', description: 'Latest announcements and stories' },
  { label: 'Events', href: '/events', category: 'Page', description: 'Upcoming seminars and activities' },
  { label: 'Contact', href: '/contact', category: 'Page', description: 'Get in touch with the secretariat' },
  { label: 'Membership', href: '/membership', category: 'Page', description: 'Join MCAN Southwest' },
  { label: 'Digital ID', href: '/digital-id', category: 'Page', description: 'Request your MCAN identity card' },
];

export function SiteHeader() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [recentContent, setRecentContent] = useState<SearchItem[]>([]);
  const moreRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const searchItems = [...pageSearchItems, ...recentContent];
  const filteredSearchResults = searchQuery.trim()
    ? searchItems.filter((item) => {
        const query = searchQuery.toLowerCase();
        return (
          item.label.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.category.toLowerCase().includes(query)
        );
      })
    : [];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (!query) return;

    const firstMatch = filteredSearchResults[0];
    if (firstMatch) {
      navigate(firstMatch.href);
    } else {
      navigate('/news');
    }

    setSearchQuery('');
    setSearchOpen(false);
    setMobileOpen(false);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) setMoreOpen(false);
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) setSearchOpen(false);
      if (notificationRef.current && !notificationRef.current.contains(e.target as Node)) setNotificationsOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    let active = true;
    async function loadRecentContent() {
      try {
        const [newsData, eventData] = await Promise.all([newsApi.getNews(), eventsApi.getEvents()]);
        if (!active) return;

        const items: SearchItem[] = [
          ...newsData.slice(0, 3).map((item) => ({
            label: item.title,
            href: `/news/${item.slug}`,
            category: 'News',
            description: item.excerpt,
          })),
          ...eventData.slice(0, 3).map((item) => ({
            label: item.title,
            href: '/events',
            category: 'Event',
            description: item.description,
          })),
        ];

        setRecentContent(items);
      } catch {
        setRecentContent([]);
      }
    }

    loadRecentContent();
    return () => { active = false; };
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

  const mobileLinkStyle = (href: string) => ({
    fontFamily: 'var(--font-body)' as const,
    fontSize: '16px',
    textDecoration: 'none',
    padding: '14px 20px',
    borderRadius: 'var(--radius-sm)',
    color: pathname === href ? 'var(--green-primary)' : 'var(--text-body)',
    fontWeight: pathname === href ? 600 : 500,
    background: pathname === href ? 'var(--green-50)' : 'transparent',
    display: 'block',
    transition: 'background var(--dur-fast) var(--ease-standard)',
  });

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

        <nav style={{ display: isMobile ? 'none' : 'flex', alignItems: 'center', gap: '24px', marginLeft: 'auto' }}>
          {navItems.map((item) => (
            <Link key={item.href} to={item.href} style={linkStyle(item.href) as React.CSSProperties}>
              {item.label}
            </Link>
          ))}

          <div ref={moreRef} style={{ position: 'relative' }}>
            <button onClick={() => setMoreOpen((o) => !o)} style={{
              ...linkStyle(moreActive ? '#more' : '#'),
              display: 'flex', alignItems: 'center', gap: '5px',
              transform: 'none', boxShadow: 'none',
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

        <div style={{ display: isMobile ? 'none' : 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
          <div ref={searchRef} style={{ position: 'relative' }}>
            <form onSubmit={handleSearch} style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              border: '1px solid var(--border-default)', borderRadius: '999px',
              background: 'var(--gray-50)', padding: '0 6px 0 12px',
              width: searchOpen ? '240px' : '38px', height: '38px',
              transition: 'width var(--dur-base) var(--ease-standard)', overflow: 'hidden',
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, cursor: 'pointer' }} onClick={() => setSearchOpen((o) => !o)}>
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                placeholder="Search the site"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  if (e.target.value.trim()) setSearchOpen(true);
                }}
                onFocus={() => setSearchOpen(true)}
                style={{
                  border: 'none', outline: 'none', background: 'transparent', flex: 1, minWidth: 0,
                  fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--text-heading)',
                  opacity: searchOpen ? 1 : 0, transition: 'opacity var(--dur-fast) var(--ease-standard)',
                }}
              />
            </form>

            {searchOpen && searchQuery.trim() && filteredSearchResults.length > 0 && (
              <div style={{
                position: 'absolute', top: 'calc(100% + 8px)', right: 0, width: '280px', background: 'var(--white)',
                borderRadius: 'var(--radius-card)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-lg)', zIndex: 120,
              }}>
                {filteredSearchResults.slice(0, 6).map((item) => (
                  <Link
                    key={`${item.href}-${item.label}`}
                    to={item.href}
                    onClick={() => {
                      setSearchQuery('');
                      setSearchOpen(false);
                    }}
                    style={{
                      display: 'block', padding: '10px 12px', borderBottom: '1px solid var(--border-subtle)', textDecoration: 'none',
                      color: 'var(--text-body)', background: 'var(--white)',
                    }}
                  >
                    <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-heading)' }}>{item.label}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>{item.description}</div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div ref={notificationRef} style={{ position: 'relative' }}>
            <button onClick={() => setNotificationsOpen((o) => !o)} style={iconBtn} title="Updates" aria-label="Updates">
              <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
              <span style={{ position: 'absolute', top: '7px', right: '8px', width: '8px', height: '8px', borderRadius: '999px', background: 'var(--gold)', border: '2px solid var(--white)' }} />
            </button>

            {notificationsOpen && (
              <div style={{
                position: 'absolute', top: 'calc(100% + 8px)', right: 0, width: '280px', background: 'var(--white)',
                borderRadius: 'var(--radius-card)', border: '1px solid var(--border-subtle)', boxShadow: 'var(--shadow-lg)', zIndex: 120,
              }}>
                <div style={{ padding: '12px 12px 8px', fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                  Recent updates
                </div>
                {recentContent.length > 0 ? recentContent.map((item) => (
                  <Link
                    key={`${item.href}-${item.label}`}
                    to={item.href}
                    onClick={() => setNotificationsOpen(false)}
                    style={{ display: 'block', padding: '10px 12px', borderTop: '1px solid var(--border-subtle)', textDecoration: 'none', color: 'var(--text-body)' }}
                  >
                    <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-heading)' }}>{item.label}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>{item.category}</div>
                  </Link>
                )) : (
                  <div style={{ padding: '10px 12px', fontSize: '13px', color: 'var(--text-muted)' }}>No updates yet.</div>
                )}
              </div>
            )}
          </div>
        </div>

        {isMobile && (
          <button
            onClick={() => setMobileOpen(true)}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '38px', height: '38px', borderRadius: '999px',
              border: '1px solid var(--border-default)',
              background: 'var(--white)', cursor: 'pointer',
              color: 'var(--text-body)', flexShrink: 0,
              marginLeft: 'auto',
            }}
            aria-label="Open menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        )}
      </div>

      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(0,0,0,0.5)', zIndex: 100,
          }}
        />
      )}

      <div
        ref={drawerRef}
        style={{
          position: 'fixed', top: 0, right: 0, bottom: 0,
          width: '300px', maxWidth: '80vw',
          background: 'var(--white)',
          zIndex: 110,
          display: 'flex', flexDirection: 'column',
          transform: mobileOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform var(--dur-base) var(--ease-standard)',
          boxShadow: mobileOpen ? '0 10px 40px rgba(0,0,0,0.2)' : 'none',
          overflowY: 'auto',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '12px 16px', borderBottom: '1px solid var(--border-subtle)' }}>
          <button
            onClick={() => setMobileOpen(false)}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '38px', height: '38px', borderRadius: '999px',
              border: '1px solid var(--border-default)',
              background: 'var(--white)', cursor: 'pointer',
              color: 'var(--text-body)',
            }}
            aria-label="Close menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSearch} style={{ padding: '16px' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            border: '1px solid var(--border-default)', borderRadius: '999px',
            background: 'var(--gray-50)', padding: '0 16px',
            width: '100%', height: '44px',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input placeholder="Search the site" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{
              border: 'none', outline: 'none', background: 'transparent', flex: 1, minWidth: 0,
              fontFamily: 'var(--font-body)', fontSize: '15px', color: 'var(--text-heading)',
            }} />
          </div>
        </form>

        <nav style={{ display: 'flex', flexDirection: 'column', padding: '0 12px', gap: '2px' }}>
          {allLinks.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setMobileOpen(false)}
              style={mobileLinkStyle(item.href)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
