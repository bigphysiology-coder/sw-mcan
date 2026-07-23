'use client';
import { useRef, useLayoutEffect } from 'react';

export function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;
    el.setAttribute('data-fade', 'armed');
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => el.setAttribute('data-fade', 'in')));
    const t = setTimeout(() => el.setAttribute('data-fade', 'in'), 120);
    return () => { cancelAnimationFrame(raf); clearTimeout(t); };
  }, []);
  return ref;
}
