import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// A live-feeling WhatsApp conversation: the customer asks, the AI "types", then
// answers and books. Shows what an AI chatbot actually does, not just claims it.
const messages = [
  { ai: false, text: 'Hi 👋 Do you have 2-bed apartments in Sandton under R15k?' },
  { ai: true, text: 'Yes — 3 available right now. Want to view one this week?' },
  { ai: false, text: 'Saturday morning works 🙌' },
  { ai: true, text: 'Done — booked you for Sat 10:00. I’ll send a reminder the day before. ✓' },
];

export default function ChatbotDemo() {
  const root = useRef(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();

    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set(el.querySelectorAll('.cb-msg'), { opacity: 1, y: 0, scale: 1 });
      gsap.set(el.querySelector('.cb-typing'), { display: 'none' });
    });

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const ctx = gsap.context(() => {
        const msgs = gsap.utils.toArray('.cb-msg');
        const typing = el.querySelector('.cb-typing');
        gsap.set(msgs, { opacity: 0, y: 12, scale: 0.96 });
        gsap.set(typing, { opacity: 0, display: 'none' });

        const tl = gsap.timeline({
          repeat: -1,
          repeatDelay: 2.2,
          scrollTrigger: { trigger: el, start: 'top 78%' },
        });

        messages.forEach((m, i) => {
          if (m.ai) {
            tl.set(typing, { display: 'inline-flex' })
              .to(typing, { opacity: 1, duration: 0.2 })
              .to({}, { duration: 0.95 })
              .to(typing, { opacity: 0, duration: 0.15 })
              .set(typing, { display: 'none' });
          }
          tl.to(msgs[i], {
            opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'back.out(1.5)',
          }, m.ai ? '>' : '>+0.5');
        });

        tl.to({}, { duration: 1.8 });                       // let it be read
        tl.to(msgs, { opacity: 0, duration: 0.4 }, '>');    // reset for the loop
      }, el);
      return () => ctx.revert();
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={root} className="cb" aria-label="Example WhatsApp conversation handled by the AI chatbot">
      <div className="cb-head">
        <span className="cb-avatar" aria-hidden="true">K</span>
        <div>
          <div className="cb-name">Kengan AI</div>
          <div className="cb-status"><span className="pulse-dot cb-online" /> online · replies instantly</div>
        </div>
      </div>
      <div className="cb-body">
        {messages.map((m, i) => (
          <div key={i} className={'cb-msg ' + (m.ai ? 'ai' : 'me')}>{m.text}</div>
        ))}
        <div className="cb-typing" aria-hidden="true"><span /><span /><span /></div>
      </div>
    </div>
  );
}
