import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'gold' | 'hero' | 'heroWhite';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: ReactNode;
}

const variants: Record<string, React.CSSProperties> = {
  primary: { background: 'var(--green-primary)', color: '#fff', border: '1.5px solid var(--green-primary)' },
  secondary: { background: 'transparent', color: 'var(--text-body)', border: '1.5px solid var(--border-default)' },
  ghost: { background: 'transparent', color: 'var(--text-body)', border: '1.5px solid transparent' },
  gold: { background: 'var(--gold-400)', color: '#fff', border: '1.5px solid var(--gold-400)', boxShadow: 'var(--shadow-brand)' },
  hero: { background: 'var(--gold-400)', color: 'var(--navy-800)', border: '1.5px solid var(--gold-400)', boxShadow: 'var(--shadow-md)' },
  heroWhite: { background: '#fff', color: 'var(--navy-800)', border: '1.5px solid #fff', boxShadow: 'var(--shadow-md)' },
};

const sizes: Record<string, React.CSSProperties> = {
  sm: { padding: '8px 16px', fontSize: '13px' },
  md: { padding: '10px 20px', fontSize: '15px' },
  lg: { padding: '14px 26px', fontSize: '16px' },
};

export function Button({ variant = 'primary', size = 'md', fullWidth, children, style, ...props }: ButtonProps) {
  return (
    <button
      style={{
        fontFamily: 'var(--font-body)', fontWeight: 600, cursor: 'pointer',
        borderRadius: 'var(--radius-button)',
        transition: 'all var(--dur-fast) var(--ease-standard)',
        width: fullWidth ? '100%' : undefined,
        ...variants[variant], ...sizes[size], ...style,
      } as React.CSSProperties}
      {...props}
    >
      {children}
    </button>
  );
}
