'use client';
import { useRef, useLayoutEffect } from 'react';

export function useModalEntrance() {
  const overlayRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const el = overlayRef.current;
    if (!el) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;
    el.setAttribute('data-modal', 'armed');
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => el.setAttribute('data-modal', 'in')));
    const t = setTimeout(() => el.setAttribute('data-modal', 'in'), 120);
    return () => { cancelAnimationFrame(raf); clearTimeout(t); };
  }, []);
  return overlayRef;
}
