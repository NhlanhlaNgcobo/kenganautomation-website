import { useEffect } from 'react';

const SELECTOR = '.reveal, .reveal-left, .reveal-right, .reveal-scale, .fade-up';

// Scroll reveals: add `.visible` once an element's top enters the viewport (CSS
// runs the eased transition). Position-based and checked on scroll via rAF, so
// it can't be skipped by a fast scroll the way IntersectionObserver can.
// Reduced-motion users get the final state immediately. Tears down once done.
export const useScrollReveal = (deps = []) => {
  useEffect(() => {
    let pending = Array.from(document.querySelectorAll(SELECTOR));
    if (!pending.length) return;

    const reduce =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      pending.forEach((el) => el.classList.add('visible'));
      return;
    }

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(reveal);
    };
    const teardown = () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };

    function reveal() {
      ticking = false;
      const trigger = window.innerHeight * 0.9;
      pending = pending.filter((el) => {
        if (el.getBoundingClientRect().top < trigger) {
          el.classList.add('visible');
          return false;
        }
        return true;
      });
      if (!pending.length) teardown();
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    reveal(); // reveal whatever is already in view on mount

    return teardown;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
