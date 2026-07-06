import { Eyebrow } from './Eyebrow';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: 'left' | 'center';
}

export function SectionHeading({ eyebrow, title, intro, align = 'left' }: SectionHeadingProps) {
  return (
    <div style={{
      textAlign: align,
      maxWidth: align === 'center' ? '720px' : undefined,
      margin: align === 'center' ? '0 auto' : undefined,
    } as React.CSSProperties}>
      {eyebrow && <Eyebrow tone="green">{eyebrow}</Eyebrow>}
      <h2 style={{
        fontFamily: 'var(--font-heading)', fontWeight: 800,
        fontSize: 'clamp(28px, 3.8vw, 42px)', lineHeight: 1.1,
        letterSpacing: '-0.02em', color: 'var(--text-heading)',
        margin: '12px 0 14px',
      } as React.CSSProperties}>
        {title}
      </h2>
      {intro && (
        <p style={{ fontSize: '18px', lineHeight: 1.6, color: 'var(--text-body)', margin: 0, maxWidth: align === 'center' ? undefined : '580px' } as React.CSSProperties}>
          {intro}
        </p>
      )}
    </div>
  );
}
