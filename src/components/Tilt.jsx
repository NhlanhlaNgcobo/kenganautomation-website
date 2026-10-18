import React, { useRef } from 'react';

// Pointer-driven 3D tilt. Adds depth/engagement on hover (transform only, 60fps).
// Disabled for touch and prefers-reduced-motion. `max` = max tilt in degrees.
export default function Tilt({ max = 8, className = '', style, children }) {
  const ref = useRef(null);
  const raf = useRef(0);

  const reduce =
    typeof window !== 'undefined' && window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const onMove = (e) => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      el.style.transform = `perspective(900px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg) translateZ(0)`;
    });
  };

  const reset = () => {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(raf.current);
    el.style.transform = 'perspective(900px) rotateX(0) rotateY(0)';
  };

  return (
    <div
      ref={ref}
      className={'tilt ' + className}
      style={style}
      onMouseMove={onMove}
      onMouseLeave={reset}
    >
      {children}
    </div>
  );
}
