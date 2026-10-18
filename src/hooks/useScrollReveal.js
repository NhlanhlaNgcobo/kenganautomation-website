import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SELECTOR = '.reveal, .reveal-left, .reveal-right, .reveal-scale, .fade-up';

// Scroll reveals via GSAP ScrollTrigger.batch — items in the same row animate
// together with a small stagger, once, then settle. Reduced-motion users get the
// final state instantly (no motion). Each page calls this hook; re-runs on deps.
export const useScrollReveal = (deps = []) => {
  useEffect(() => {
    const els = gsap.utils.toArray(SELECTOR);
    if (!els.length) return;

    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set(els, { clearProps: 'all', opacity: 1, x: 0, y: 0, scale: 1 });
    });

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const triggers = ScrollTrigger.batch(SELECTOR, {
        start: 'top 90%',
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1, x: 0, y: 0, scale: 1,
            duration: 0.7, ease: 'power3.out', stagger: 0.08, overwrite: true,
          }),
      });
      // reveal anything already in view on load
      ScrollTrigger.refresh();
      return () => triggers.forEach((t) => t.kill());
    });

    return () => mm.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
