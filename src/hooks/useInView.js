import { useEffect, useState } from 'react';

// True once the element has scrolled into view (stays true afterwards).
export function useInView(ref, threshold = 0.3) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return undefined;
    if (!('IntersectionObserver' in window)) {
      setInView(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, threshold, inView]);

  return inView;
}

// Reports each element id as it scrolls into view.
export function useSectionTracking(ids, onSeen) {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return undefined;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && onSeen(e.target.id)),
      { threshold: 0.25 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids, onSeen]);
}
