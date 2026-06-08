import { useEffect, useRef } from 'react';

/** Returns a ref containing scroll progress (0 at top, 1 at bottom) */
export function useScrollProgress() {
  const progress = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      progress.current = h > 0 ? window.scrollY / h : 0;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return progress;
}
