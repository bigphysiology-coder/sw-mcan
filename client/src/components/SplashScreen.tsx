interface SplashScreenProps {
  isFading: boolean
}

function SplashScreen({ isFading }: SplashScreenProps) {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 50,
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      background: '#1a4731',
      opacity: isFading ? 0 : 1,
      transition: 'opacity 500ms ease-out',
    }}>
      <svg width="120" height="120" viewBox="0 0 120 120" style={{ marginBottom: '24px' }}>
        <path d="M 80 15 A 45 45 0 1 1 30 95 A 48 48 0 1 0 80 15 Z" fill="#c8a84b" />
        <polygon points="48,32 52,46 66,46 55,55 59,69 48,60 37,69 41,55 30,46 44,46" fill="#c8a84b" />
      </svg>
      <h1 style={{
        fontFamily: "'Poppins', sans-serif",
        fontSize: '28px',
        fontWeight: 700,
        color: '#fff',
        margin: 0,
        letterSpacing: '0.02em',
      }}>MCAN Southwest</h1>
      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: '11px',
        fontWeight: 700,
        color: '#c8a84b',
        textTransform: 'uppercase',
        letterSpacing: '0.2em',
        marginTop: '8px',
      }}>SERVING ISLAM THROUGH THE NATION</p>
    </div>
  )
}

export { SplashScreen }
