import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { useScrollReveal } from '../hooks/useScrollReveal';
import WorkflowDemo from '../components/WorkflowDemo';
import ChatbotDemo from '../components/ChatbotDemo';
import {
  ArrowRight, Zap, Target, Database, Bot,
  MessageCircle, ShoppingCart, BellRing, Calendar, UserCheck, Inbox,
} from 'lucide-react';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Counts up once in view; mono telemetry styling. Respects reduced-motion.
const Counter = ({ end, duration = 1600, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(() =>
    prefersReducedMotion() || !('IntersectionObserver' in window) ? end : 0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !('IntersectionObserver' in window)) return;
    const run = () => {
      let t0 = null;
      const step = (now) => {
        if (!t0) t0 = now;
        const p = Math.min((now - t0) / duration, 1);
        setCount(Math.floor((1 - Math.pow(1 - p, 4)) * end));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) { started.current = true; run(); io.unobserve(e.target); }
      });
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [end, duration]);

  return <span ref={ref} className="telemetry">{prefix}{count}{suffix}</span>;
};

const services = [
  { icon: Zap, title: 'Speed to Lead', body: 'Every new enquiry gets a personal WhatsApp reply in under 60 seconds — before a competitor even opens their inbox.' },
  { icon: Target, title: 'Lead Nurture Sequences', body: 'Multi-touch follow-ups that run for 14 days on autopilot, so the leads who didn’t buy the first time still come back.' },
  { icon: Database, title: 'Database Reactivation', body: 'Turn a dead spreadsheet of old contacts into booked revenue with a timed WhatsApp campaign.' },
  { icon: MessageCircle, title: 'WhatsApp AI Chatbot', body: 'A Claude-powered receptionist that answers, qualifies and books 24/7 — right where South Africa already chats.' },
  { icon: ShoppingCart, title: 'Abandoned Cart Recovery', body: 'Win back checkout drop-offs with WhatsApp nudges that reach people email never will.' },
  { icon: BellRing, title: 'Reminders & Payment Follow-Up', body: 'Cut no-shows with appointment reminders, and chase unpaid invoices automatically until they settle.' },
];

const stack = ['Claude AI', 'n8n', 'Zapier', 'WhatsApp API', 'HubSpot', 'Airtable', 'Calendly', 'Shopify'];

const Home = () => {
  useScrollReveal();

  // Hero load timeline (one orchestrated moment): the hero content sequences in,
  // then the pipeline rows trickle like live events. Reduced-motion → shown at rest.
  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.fromTo('.hero-in', { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.09 })
        .fromTo('.pipe-row', { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.5 }, '-=0.15');
    });
    mm.add('(prefers-reduced-motion: reduce)', () => {
      gsap.set('.hero-in, .pipe-row', { opacity: 1, y: 0 });
    });
    return () => mm.revert();
  }, []);

  return (
    <div>
      {/* ───────── Hero: live speed-to-lead pipeline ───────── */}
      <section className="bg-navy on-dark" style={{ position: 'relative', overflow: 'hidden', paddingTop: '140px', paddingBottom: '90px' }}>
        <div className="hero-glow" aria-hidden="true" style={{ position: 'absolute', top: '-10%', right: '-10%', width: '70%', height: '120%', opacity: 0.16, background: 'radial-gradient(circle at center, var(--flow) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.05fr) minmax(0,0.95fr)', gap: '56px', alignItems: 'center' }} className="hero-grid">
            <div>
              <span className="kicker hero-in">Revenue operations, automated</span>
              <h1 className="heading-xl text-white hero-in d1" style={{ marginBottom: '1.25rem' }}>
                The leak isn&rsquo;t your leads. It&rsquo;s the four hours before you reply.
              </h1>
              <p className="body-lg hero-in d2" style={{ maxWidth: '560px' }}>
                KenganAutomation answers every enquiry in under 60 seconds — on WhatsApp, day or night — then follows up until they book. Built and hosted in South Africa.
              </p>
              <div className="flex gap-4 hero-in d3" style={{ flexWrap: 'wrap', marginBottom: '26px' }}>
                <Link to="/free-audit" className="btn btn-primary">Get a free audit <ArrowRight size={18} /></Link>
                <Link to="/case-studies" className="btn btn-outline">See the results</Link>
              </div>
              <p className="telemetry hero-in d4" style={{ fontSize: '0.78rem', color: 'var(--mist)', letterSpacing: '0.02em' }}>
                POPIA-compliant · hosted on Hetzner SA · &lt;60s first response
              </p>
            </div>

            {/* Live pipeline */}
            <div className="hero-in d2" aria-hidden="true">
              <div className="pipeline">
                <div className="pipe-head">
                  <span className="label" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    <span className="pulse-dot" style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--flow)' }} />
                    LIVE · speed-to-lead
                  </span>
                  <span className="label">today 23:14</span>
                </div>
                <div className="pipe-row">
                  <span className="node"><Inbox size={17} /></span>
                  <div><div className="pt">New enquiry</div><div className="ps">Property24 · after hours</div></div>
                  <span className="stamp">0s</span>
                </div>
                <div className="pipe-row">
                  <span className="node"><MessageCircle size={17} /></span>
                  <div><div className="pt">WhatsApp sent</div><div className="ps">personalised, from the agent</div></div>
                  <span className="stamp">41s</span>
                </div>
                <div className="pipe-row">
                  <span className="node"><UserCheck size={17} /></span>
                  <div><div className="pt">Lead qualified</div><div className="ps">AI agent · budget + area</div></div>
                  <span className="stamp">2m</span>
                </div>
                <div className="pipe-row">
                  <span className="node"><Calendar size={17} /></span>
                  <div><div className="pt">Viewing booked</div><div className="ps">synced to the calendar</div></div>
                  <span className="stamp">3m</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── Telemetry band ───────── */}
      <section className="bg-deep-blue on-dark" style={{ padding: '46px 0' }}>
        <div className="container">
          <div className="grid grid-4">
            {[
              { n: <> &lt;<Counter end={60} />s</>, l: 'First response, every time' },
              { n: <Counter end={1200} suffix="%" />, l: 'Avg. database reactivation return' },
              { n: <Counter end={80} suffix="%" />, l: 'Of sales need 5+ follow-ups' },
              { n: <Counter end={94} suffix="%" />, l: 'WhatsApp reach in South Africa' },
            ].map((s, i) => (
              <div key={i} style={{ padding: '4px 20px', borderLeft: i === 0 ? 'none' : '1px solid var(--line-ink)' }}>
                <div className="telemetry text-white" style={{ marginBottom: '6px', fontSize: 'clamp(1.9rem, 3vw, 2.5rem)', fontWeight: 700 }}>{s.n}</div>
                <div style={{ color: 'var(--mist)', fontSize: '0.95rem' }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── Systems ───────── */}
      <section className="section bg-light">
        <div className="container">
          <div className="reveal" style={{ maxWidth: '640px', marginBottom: '56px' }}>
            <span className="kicker">What we build</span>
            <h2 className="heading-lg text-navy">Pipelines that capture, answer, and convert — without you lifting a finger.</h2>
            <hr className="seam" style={{ marginTop: '22px', width: '120px' }} />
          </div>

          <div className="grid grid-3">
            {services.map((s, i) => {
              const Icon = s.icon;
              return (
                <div key={s.title} className={`card reveal delay-${(i % 3 + 1) * 100}`}>
                  <span style={{ display: 'inline-flex', width: '46px', height: '46px', borderRadius: '12px', alignItems: 'center', justifyContent: 'center', background: 'var(--flow-soft)', color: 'var(--flow-deep)', marginBottom: '20px' }}>
                    <Icon size={22} />
                  </span>
                  <h3 className="heading-sm text-navy">{s.title}</h3>
                  <p style={{ color: 'var(--stone)' }}>{s.body}</p>
                </div>
              );
            })}
          </div>

          <div className="reveal" style={{ marginTop: '26px', background: 'var(--ink)', color: '#fff', borderRadius: 'var(--r)', padding: '36px', display: 'flex', gap: '28px', alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ display: 'inline-flex', width: '58px', height: '58px', borderRadius: '14px', alignItems: 'center', justifyContent: 'center', background: 'var(--ink-700)', color: 'var(--flow)', flex: 'none' }}>
              <Bot size={28} />
            </span>
            <div style={{ flex: 1, minWidth: '240px' }}>
              <h3 className="heading-sm text-white">AI agents that take action — not FAQ bots</h3>
              <p style={{ color: 'var(--mist)', marginBottom: 0 }}>Claude-powered agents that qualify leads, answer real questions, and book straight into your calendar, 24/7.</p>
            </div>
            <Link to="/services" className="btn btn-outline">Explore AI agents <ArrowRight size={18} /></Link>
          </div>
        </div>
      </section>

      {/* ───────── See it work: workflow + AI chatbot ───────── */}
      <section className="section bg-navy on-dark">
        <div className="container">
          <div className="reveal" style={{ maxWidth: '640px', marginBottom: '44px' }}>
            <span className="kicker">See it work</span>
            <h2 className="heading-lg text-white">Watch a lead turn into a booking.</h2>
            <p className="body-lg" style={{ marginBottom: 0 }}>
              No dashboards to learn, no new app for your team. The automation runs in the background — this is the whole journey, start to finish.
            </p>
          </div>

          <WorkflowDemo />

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) minmax(0,430px)', gap: '48px', alignItems: 'center', marginTop: '64px' }} className="hero-grid">
            <div className="reveal-left">
              <span className="kicker">The AI, in the open</span>
              <h3 className="heading-md text-white" style={{ marginBottom: '14px' }}>Your receptionist that never sleeps — right inside WhatsApp.</h3>
              <p style={{ color: 'var(--mist)', marginBottom: '22px' }}>
                It answers the real questions, qualifies on budget and intent, and books straight into your calendar. When a lead is hot or a question is tricky, it hands off to a human — mid-conversation.
              </p>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '26px' }}>
                {['Replies in seconds, 24/7 — even over weekends and load-shedding', 'Qualifies and books without a human in the loop', 'POPIA-compliant, hosted in South Africa'].map((t) => (
                  <li key={t} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', color: 'var(--mist)' }}>
                    <span style={{ color: 'var(--flow)', flex: 'none', marginTop: '2px' }}>✓</span> {t}
                  </li>
                ))}
              </ul>
              <Link to="/services" className="btn btn-primary">Explore AI agents <ArrowRight size={18} /></Link>
            </div>
            <div className="reveal-right" style={{ justifySelf: 'center' }}>
              <ChatbotDemo />
            </div>
          </div>
        </div>
      </section>

      {/* ───────── The leak, made literal ───────── */}
      <section className="section">
        <div className="container">
          <div className="reveal" style={{ maxWidth: '640px', marginBottom: '44px' }}>
            <span className="kicker">Real results, 30 days</span>
            <h2 className="heading-lg text-navy">Same leads. Same ad spend. The difference is the reply.</h2>
          </div>
          <div className="grid grid-2">
            <div className="reveal-left card" style={{ background: 'var(--ink)', color: '#fff', border: 'none' }}>
              <div className="telemetry" style={{ color: 'var(--flow)', fontSize: '0.78rem', marginBottom: '14px' }}>ESTATE AGENCY · CAPE TOWN</div>
              <h3 className="heading-md text-white" style={{ marginBottom: '10px' }}>9% &rarr; 22% close rate</h3>
              <p style={{ color: 'var(--mist)', marginBottom: '20px' }}>R112,000 in extra commissions, month one — just by replying to Property24 leads in minutes instead of days.</p>
              <Link to="/case-studies" style={{ color: 'var(--flow)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>Read the case study <ArrowRight size={16} /></Link>
            </div>
            <div className="reveal-right card" style={{ background: 'var(--ink-700)', color: '#fff', border: 'none' }}>
              <div className="telemetry" style={{ color: 'var(--flow)', fontSize: '0.78rem', marginBottom: '14px' }}>INSURANCE BROKER · DURBAN</div>
              <h3 className="heading-md text-white" style={{ marginBottom: '10px' }}>13 &rarr; 32 policies</h3>
              <p style={{ color: 'var(--mist)', marginBottom: '20px' }}>Doubled policies written in a month with the same Facebook spend — by beating competitors to the first message.</p>
              <Link to="/case-studies" style={{ color: 'var(--flow)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>Read the case study <ArrowRight size={16} /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── Tech marquee ───────── */}
      <section style={{ padding: '56px 0', background: 'var(--paper-2)' }}>
        <div className="container reveal" style={{ textAlign: 'center', marginBottom: '26px' }}>
          <span className="telemetry" style={{ color: 'var(--stone)', fontSize: '0.8rem', letterSpacing: '0.08em' }}>BUILT ON TOOLS YOU CAN TRUST</span>
        </div>
        <div className="marquee">
          <div className="marquee__track" style={{ color: 'var(--ink)', opacity: 0.45, fontFamily: 'var(--display)', fontSize: '1.5rem', fontWeight: 700 }}>
            {[...stack, ...stack].map((t, i) => <span key={i} style={{ whiteSpace: 'nowrap' }}>{t}</span>)}
          </div>
        </div>
        <div className="container reveal" style={{ textAlign: 'center', marginTop: '30px' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', padding: '10px 18px', background: 'var(--flow-soft)', color: 'var(--flow-deep)', borderRadius: '999px', fontWeight: 600, fontSize: '0.92rem' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: 'var(--flow-deep)' }} />
            Self-hosted on Hetzner South Africa — POPIA-compliant by design
          </span>
        </div>
      </section>

      {/* ───────── Final CTA ───────── */}
      <section className="section bg-navy on-dark" style={{ textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="hero-glow" aria-hidden="true" style={{ position: 'absolute', inset: 0, opacity: 0.12, background: 'radial-gradient(circle at 50% 30%, var(--flow) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div className="container reveal-scale" style={{ position: 'relative', zIndex: 1 }}>
          <h2 className="heading-lg text-white">Find out exactly what the leak is costing you.</h2>
          <p className="body-lg" style={{ maxWidth: '560px', margin: '0 auto 36px' }}>
            Book a free automation audit. We&rsquo;ll map where leads are slipping through — and what it&rsquo;s worth to seal it.
          </p>
          <Link to="/free-audit" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '18px 36px' }}>
            Book your free audit <ArrowRight size={22} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
