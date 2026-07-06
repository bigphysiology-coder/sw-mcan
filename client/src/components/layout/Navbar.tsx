import { useState, useRef, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { ROUTES } from '@/constants'

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const moreRef = useRef<HTMLDivElement>(null)
  const userRef = useRef<HTMLDivElement>(null)
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const { user, isAuthenticated, logout } = useAuthStore()

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) setMoreOpen(false)
      if (userRef.current && !userRef.current.contains(e.target as Node)) setUserMenuOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const navLinks = [
    { label: 'Home', path: ROUTES.HOME },
    { label: 'About', path: ROUTES.ABOUT },
    { label: 'News', path: ROUTES.NEWS },
    { label: 'Events', path: ROUTES.EVENTS },
  ]

  const moreLinks = [
    { label: 'Membership', path: ROUTES.MEMBERSHIP },
    { label: 'MCAN Southwest ID', path: ROUTES.DIGITAL_ID },
    { label: 'Contact', path: ROUTES.CONTACT },
  ]

  function isActive(p: string) {
    if (p === ROUTES.HOME) return pathname === p
    return pathname.startsWith(p)
  }

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`${ROUTES.NEWS}?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  function handleLogout() {
    logout()
    setUserMenuOpen(false)
    navigate(ROUTES.HOME)
  }

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-50 border-b border-border-subtle bg-white/90 backdrop-blur-md">
        <div className="container flex h-[70px] items-center justify-between">
          <Link to={ROUTES.HOME} className="flex items-center gap-3">
            <img src="/logo.png" alt="MCAN Southwest" className="h-11 w-11 object-contain" />
            <div>
              <div className="font-heading text-base font-bold text-text-heading">MCAN Southwest</div>
              <div className="text-[10.5px] font-semibold uppercase tracking-widest text-gold-500">Serving Islam</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {navLinks.map((l) => (
              <Link
                key={l.path}
                to={l.path}
                className={`pb-0.5 text-sm font-semibold transition-colors ${
                  isActive(l.path)
                    ? 'border-b-2 border-brand text-brand'
                    : 'text-text-body hover:text-brand'
                }`}
              >
                {l.label}
              </Link>
            ))}

            <div ref={moreRef} className="relative">
              <button
                onClick={() => setMoreOpen((o) => !o)}
                className={`flex items-center gap-1 pb-0.5 text-sm font-semibold transition-colors ${
                  moreLinks.some((l) => isActive(l.path))
                    ? 'border-b-2 border-brand text-brand'
                    : 'text-text-body hover:text-brand'
                }`}
              >
                More
                <svg className={`h-3.5 w-3.5 transition-transform ${moreOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {moreOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 rounded-card border border-border-subtle bg-surface-card py-2 shadow-lg">
                  {moreLinks.map((l) => (
                    <Link
                      key={l.path}
                      to={l.path}
                      onClick={() => setMoreOpen(false)}
                      className={`block px-4 py-2.5 text-sm font-semibold transition-colors ${
                        isActive(l.path) ? 'text-brand' : 'text-text-body hover:text-brand'
                      }`}
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          <div className="flex items-center gap-3">
            {searchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search news..."
                  autoFocus
                  className="w-44 rounded-button border border-border-default bg-white px-3 py-1.5 text-sm text-text-heading outline-none focus:border-brand"
                />
                <button
                  type="button"
                  onClick={() => { setSearchOpen(false); setSearchQuery('') }}
                  className="text-text-muted hover:text-text-heading"
                  aria-label="Close search"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </form>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="text-text-muted hover:text-text-heading"
                aria-label="Open search"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            )}

            <button className="relative text-text-muted hover:text-text-heading" aria-label="Notifications">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-gold-400" />
            </button>

            {isAuthenticated && user ? (
              <div ref={userRef} className="relative">
                <button
                  onClick={() => setUserMenuOpen((o) => !o)}
                  className="flex items-center gap-2"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-xs font-bold text-white">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden text-sm font-semibold text-text-body md:inline">{user.name.split(' ')[0]}</span>
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 rounded-card border border-border-subtle bg-surface-card py-2 shadow-lg">
                    {user.role === 'admin' && (
                      <Link
                        to={ROUTES.ADMIN.DASHBOARD}
                        onClick={() => setUserMenuOpen(false)}
                        className="block px-4 py-2.5 text-sm font-semibold text-text-body transition-colors hover:text-brand"
                      >
                        Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full px-4 py-2.5 text-left text-sm font-semibold text-text-body transition-colors hover:text-brand"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to={ROUTES.LOGIN}
                className="rounded-button bg-brand px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-strong"
              >
                Login
              </Link>
            )}

            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden"
              aria-label="Open menu"
            >
              <svg className="h-6 w-6 text-text-heading" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="absolute inset-y-0 right-0 w-72 bg-white shadow-lg">
            <div className="flex items-center justify-between border-b border-border-subtle px-5 py-4">
              <span className="font-heading text-base font-bold text-text-heading">Menu</span>
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu">
                <svg className="h-5 w-5 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="flex flex-col gap-1 px-4 py-4">
              {[...navLinks, ...moreLinks].map((l) => (
                <Link
                  key={l.path}
                  to={l.path}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-button px-4 py-3 text-sm font-semibold transition-colors ${
                    isActive(l.path)
                      ? 'bg-brand-soft text-brand'
                      : 'text-text-body hover:bg-gray-50 hover:text-brand'
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  )
}

export { Navbar }
