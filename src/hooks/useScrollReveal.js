import { useEffect } from 'react';

// Scroll-reveal for elements with `.fade-up` (and the newer `.reveal`, `.reveal-left`,
// `.reveal-right`, `.reveal-scale`). Adds `.visible` once an element scrolls into view.
//
// - Respects prefers-reduced-motion: if the user asked for less motion, everything is
//   shown immediately with no transition.
// - Re-scans on mount, so it works per-page (each page calls this hook) and re-runs
//   when `deps` change (e.g. a filtered list re-renders).
export const useScrollReveal = (deps = []) => {
  useEffect(() => {
    const selector = '.fade-up, .reveal, .reveal-left, .reveal-right, .reveal-scale';
    const elements = Array.from(document.querySelectorAll(selector));

    const prefersReduced =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced || !('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
    );

    elements.forEach((el) => {
      // If already in view on load (e.g. above the fold), reveal on the next frame
      // so the entrance transition still plays.
      observer.observe(el);
    });

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
