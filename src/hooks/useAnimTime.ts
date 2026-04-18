'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * RAF-driven animation clock. Returns elapsed seconds, looping at `duration`.
 * SSR-safe: returns 0 until mounted. Respects prefers-reduced-motion.
 */
export function useAnimTime(
  duration: number,
  loop = true,
  autoplay = true,
): number {
  const [time, setTime] = useState(0);
  const rafRef = useRef<number>(0);
  const lastTsRef = useRef<number | null>(null);

  useEffect(() => {
    if (!autoplay) return;

    // Respect prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const step = (ts: number) => {
      if (lastTsRef.current == null) lastTsRef.current = ts;
      const dt = Math.min((ts - lastTsRef.current) / 1000, 0.1); // cap dt
      lastTsRef.current = ts;
      setTime((t) => {
        let next = t + dt;
        if (next >= duration) {
          next = loop ? next % duration : duration;
        }
        return next;
      });
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(rafRef.current);
      lastTsRef.current = null;
    };
  }, [duration, loop, autoplay]);

  return time;
}
