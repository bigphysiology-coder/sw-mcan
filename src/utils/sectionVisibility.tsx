import { useWebContent } from '@/features/webcontent/hooks/useWebContent'

export function useSectionVisible(sectionLabel: string): boolean {
  const { content, isLoading } = useWebContent()
  if (isLoading || !content?.sections) return true
  return content.sections.find(s => s.label === sectionLabel)?.visible ?? true
}

const hiddenContainer: React.CSSProperties = {
  padding: '120px 24px', textAlign: 'center' as const, maxWidth: '480px', margin: '0 auto',
}
const hiddenTitle: React.CSSProperties = {
  fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '28px', color: '#111827', margin: '0 0 12px',
}
const hiddenText: React.CSSProperties = {
  fontSize: '16px', color: '#6B7280', margin: '0 0 24px', lineHeight: 1.6,
}
const hiddenLink: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 24px',
  background: '#1a4731', color: '#fff', fontSize: '14px', fontWeight: 600,
  border: 'none', borderRadius: '8px', cursor: 'pointer', textDecoration: 'none',
}

export function SectionHidden() {
  return (
    <div style={hiddenContainer}>
      <div style={hiddenTitle}>Section not available</div>
      <p style={hiddenText}>This section has been hidden by the site administrator. Check back later.</p>
      <a href="/" style={hiddenLink}>Go to homepage</a>
    </div>
  )
}

