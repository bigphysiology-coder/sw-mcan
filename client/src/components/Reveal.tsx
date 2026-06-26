import type { ReactNode, HTMLAttributes } from 'react';
import { useReveal } from '@/hooks/useReveal';

interface RevealProps extends HTMLAttributes<HTMLDivElement> {
  delay?: number;
  as?: 'div' | 'section' | 'article';
  children: ReactNode;
}

export function Reveal({ delay = 0, as: Tag = 'div', children, style, ...rest }: RevealProps) {
  const { ref, style: revealStyle } = useReveal(delay);
  return (
    <Tag ref={ref} style={{ ...revealStyle, ...style } as React.CSSProperties} {...rest}>
      {children}
    </Tag>
  );
}
