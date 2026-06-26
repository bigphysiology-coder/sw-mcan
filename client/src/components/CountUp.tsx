import { useCountUp } from '@/hooks/useCountUp';

interface CountUpProps {
  value: number;
  prefix?: string;
  suffix?: string;
}

export function CountUp({ value, prefix = '', suffix = '' }: CountUpProps) {
  const { ref, display } = useCountUp(value);
  return <span ref={ref}>{prefix}{display.toLocaleString()}{suffix}</span>;
}
