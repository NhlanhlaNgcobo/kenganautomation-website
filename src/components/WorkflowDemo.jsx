import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Inbox, Bot, GitBranch, CalendarCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// An automation, drawn as it runs: a trigger fires, the AI qualifies, the lead is
// routed, the booking is made. The path lights up node by node, on a loop, so a
// visitor can *see* what "we build you a workflow" actually means.
const steps = [
  { icon: Inbox, title: 'Trigger', sub: 'New lead arrives' },
  { icon: Bot, title: 'AI qualifies', sub: 'budget · area · intent' },
  { icon: GitBranch, title: 'Route', sub: 'hot → agent now' },
  { icon: CalendarCheck, title: 'Book', sub: 'calendar synced', done: true },
];

export default function WorkflowDemo() {
  const root = useRef(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set(el.querySelectorAll('.wf-ring'), { opacity: 1 });
      gsap.set(el.querySelectorAll('.wf-fill'), { opacity: 1 });
    });

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        const rings = gsap.utils.toArray('.wf-ring');
        const fills = gsap.utils.toArray('.wf-fill');
        gsap.set(rings, { opacity: 0, scale: 0.6 });
        gsap.set(fills, { opacity: 0 });

        const tl = gsap.timeline({
          repeat: -1,
          repeatDelay: 1.4,
          scrollTrigger: { trigger: el, start: 'top 82%' },
        });

        rings.forEach((ring, i) => {
          tl.to(ring, { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(2)' }, i === 0 ? 0 : '>');
          if (fills[i]) tl.to(fills[i], { opacity: 1, duration: 0.45, ease: 'power1.inOut' }, '>-0.05');
        });
        tl.to({}, { duration: 1 }); // hold the finished state
        tl.to([...rings, ...fills], { opacity: 0, duration: 0.5, ease: 'power1.in' }, '>');
        tl.set(rings, { scale: 0.6 });
      }, el);
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={root} className="wf" role="img" aria-label="Automation workflow: a new lead triggers AI qualification, routing, and an automatic booking.">
      {steps.map((s, i) => {
        const Icon = s.icon;
        return (
          <React.Fragment key={s.title}>
            <div className="wf-node">
              <span className={'wf-icon' + (s.done ? ' wf-icon-done' : '')}>
                <span className="wf-ring" aria-hidden="true" />
                <Icon size={22} />
              </span>
              <div className="wf-title">{s.title}</div>
              <div className="wf-sub">{s.sub}</div>
            </div>
            {i < steps.length - 1 && (
              <div className="wf-link" aria-hidden="true"><span className="wf-fill" /></div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
