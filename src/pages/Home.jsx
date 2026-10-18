import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { ArrowRight, Zap, Target, Database, Bot, MessageCircle, ShoppingCart, BellRing } from 'lucide-react';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Counts up only once it scrolls into view, and respects reduced-motion.
const AnimatedCounter = ({ end, duration = 1800, suffix = '', prefix = '' }) => {
  // If motion is reduced or IO is unavailable, start at the final value.
  const [count, setCount] = useState(() =>
    prefersReducedMotion() || !('IntersectionObserver' in window) ? end : 0
  );
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) return;

    const run = () => {
      let startTime = null;
      const step = (now) => {
        if (!startTime) startTime = now;
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        setCount(Math.floor(eased * end));
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started.current) {
            started.current = true;
            run();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
};

const techStack = ['Claude AI', 'n8n', 'Zapier', 'WhatsApp API', 'HubSpot', 'Airtable', 'Calendly', 'Shopify'];

const Home = () => {
  useScrollReveal();

  return (
    <div style={{ paddingTop: '80px' }}>
      {/* Hero Section */}
      <section className="section bg-navy flex items-center" style={{ minHeight: '90vh', position: 'relative', overflow: 'hidden' }}>
        <div className="hero-glow" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.14, background: 'radial-gradient(circle at center, var(--color-accent-2) 0%, transparent 70%)', pointerEvents: 'none' }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '820px' }}>
            <div className="hero-in" style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(137,196,244,0.12)', border: '1px solid rgba(137,196,244,0.3)', color: 'var(--color-accent-2)', padding: '8px 16px', borderRadius: '30px', fontSize: '0.85rem', fontWeight: 600, marginBottom: '24px' }}>
              <span className="pulse-dot" style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--color-accent-2)' }}></span>
              AI automation for South African business
            </div>
            <h1 className="heading-xl text-white hero-in d1">
              We Fix The Leak.<br />
              <span className="text-baby-blue">You Keep The Revenue.</span>
            </h1>
            <p className="body-lg hero-in d2" style={{ maxWidth: '700px' }}>
              KenganAutomation builds AI-powered automation systems for South African businesses — using Claude AI, n8n, and Zapier — so your leads get answered in under 60 seconds, your follow-ups run on autopilot, and your revenue stops leaking.
            </p>
            <div className="flex gap-4 hero-in d3" style={{ flexWrap: 'wrap' }}>
              <Link to="/free-audit" className="btn btn-primary">
                <span>Get a Free Audit <ArrowRight size={20} style={{ verticalAlign: 'middle' }} /></span>
              </Link>
              <Link to="/case-studies" className="btn btn-outline">
                <span>See Case Studies</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Stats Bar */}
      <section style={{ backgroundColor: 'var(--color-accent-1)', padding: '40px 0' }}>
        <div className="container">
          <div className="grid grid-4 fade-up">
            <div className="text-center" style={{ borderRight: '1px solid rgba(255,255,255,0.1)' }}>
              <h2 className="heading-md text-white" style={{ marginBottom: '5px' }}>
                &lt; <AnimatedCounter end={60} />s
              </h2>
              <p style={{ color: 'var(--color-accent-2)' }}>Average Lead Response Time</p>
            </div>
            <div className="text-center" style={{ borderRight: '1px solid rgba(255,255,255,0.1)' }}>
              <h2 className="heading-md text-white" style={{ marginBottom: '5px' }}>
                <AnimatedCounter end={1200} suffix="%" />
              </h2>
              <p style={{ color: 'var(--color-accent-2)' }}>Average Database Reactivation Return</p>
            </div>
            <div className="text-center" style={{ borderRight: '1px solid rgba(255,255,255,0.1)' }}>
              <h2 className="heading-md text-white" style={{ marginBottom: '5px' }}>
                <AnimatedCounter end={80} suffix="%" />
              </h2>
              <p style={{ color: 'var(--color-accent-2)' }}>Of Sales Require 5+ Follow-Ups</p>
            </div>
            <div className="text-center">
              <h2 className="heading-md text-white" style={{ marginBottom: '5px' }}>
                <AnimatedCounter end={94} suffix="%" />
              </h2>
              <p style={{ color: 'var(--color-accent-2)' }}>WhatsApp Penetration in SA</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Snapshot */}
      <section className="section bg-light">
        <div className="container">
          <div className="text-center reveal" style={{ marginBottom: '60px' }}>
            <h2 className="heading-lg text-navy">Our Automation Systems</h2>
            <p className="body-lg text-navy" style={{ maxWidth: '640px', margin: '0 auto', color: 'var(--color-secondary)', opacity: 0.8 }}>
              We build custom pipelines to capture, nurture, and convert your leads immediately — then keep them coming back.
            </p>
          </div>

          <div className="grid grid-3">
            <div className="card reveal delay-100">
              <Zap size={40} className="text-baby-blue" style={{ marginBottom: '20px' }} />
              <h3 className="heading-sm text-navy">Speed to Lead Automation</h3>
              <p style={{ opacity: 0.8 }}>Contact every new lead under 60 seconds. Instant, personalized WhatsApp and email outreach.</p>
            </div>
            <div className="card reveal delay-200">
              <Target size={40} className="text-baby-blue" style={{ marginBottom: '20px' }} />
              <h3 className="heading-sm text-navy">Lead Nurture Sequences</h3>
              <p style={{ opacity: 0.8 }}>Multi-touch follow-up systems that run on autopilot, ensuring no lead falls through the cracks.</p>
            </div>
            <div className="card reveal delay-300">
              <Database size={40} className="text-baby-blue" style={{ marginBottom: '20px' }} />
              <h3 className="heading-sm text-navy">Database Reactivation</h3>
              <p style={{ opacity: 0.8 }}>Turn dormant contacts into active sales with targeted SMS and WhatsApp campaigns.</p>
            </div>
            <div className="card reveal delay-100">
              <MessageCircle size={40} className="text-baby-blue" style={{ marginBottom: '20px' }} />
              <h3 className="heading-sm text-navy">WhatsApp AI Chatbot</h3>
              <p style={{ opacity: 0.8 }}>A 24/7 AI receptionist that answers, qualifies and books — right inside WhatsApp, where SA already is.</p>
            </div>
            <div className="card reveal delay-200">
              <ShoppingCart size={40} className="text-baby-blue" style={{ marginBottom: '20px' }} />
              <h3 className="heading-sm text-navy">Abandoned Cart Recovery</h3>
              <p style={{ opacity: 0.8 }}>Win back checkout drop-offs with automated WhatsApp nudges — far cheaper than email, far higher recovery.</p>
            </div>
            <div className="card reveal delay-300">
              <BellRing size={40} className="text-baby-blue" style={{ marginBottom: '20px' }} />
              <h3 className="heading-sm text-navy">Reminders &amp; Payment Follow-Up</h3>
              <p style={{ opacity: 0.8 }}>Cut no-shows with appointment reminders and chase unpaid invoices automatically until they settle.</p>
            </div>
          </div>

          <div className="card reveal mt-8" style={{ marginTop: '30px', borderTop: '4px solid var(--color-accent-1)' }}>
            <div className="flex gap-8 items-center" style={{ flexWrap: 'wrap' }}>
              <Bot size={60} className="text-accent-1" />
              <div style={{ flex: 1, minWidth: '240px' }}>
                <h3 className="heading-sm text-navy">AI Chatbot &amp; Agent Builds</h3>
                <p style={{ opacity: 0.8 }}>Intelligent AI assistants that qualify leads, book appointments, and answer complex questions 24/7 on your website.</p>
              </div>
              <Link to="/services" className="btn btn-outline-dark"><span>Explore AI Agents</span></Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mini Case Study Teaser */}
      <section className="section">
        <div className="container">
          <h2 className="heading-lg text-navy text-center reveal" style={{ marginBottom: '60px' }}>Real Results in 30 Days</h2>
          <div className="grid grid-2">
            <div className="card reveal-left delay-100" style={{ backgroundColor: 'var(--color-secondary)', color: 'white', borderTop: 'none' }}>
              <div style={{ color: 'var(--color-accent-2)', marginBottom: '15px', fontWeight: 'bold' }}>ESTATE AGENCY</div>
              <h3 className="heading-md">"9% → 22% close rate. R112,000 extra in commissions. Month one."</h3>
              <p style={{ opacity: 0.8, marginBottom: '20px' }}>Cape Town boutique agency fixed their weekend lead leak.</p>
              <Link to="/case-studies" style={{ color: 'var(--color-accent-2)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}>Read Full Case Study <ArrowRight size={16} /></Link>
            </div>
            <div className="card reveal-right delay-200" style={{ backgroundColor: 'var(--color-accent-1)', color: 'white', borderTop: 'none' }}>
              <div style={{ color: 'var(--color-accent-2)', marginBottom: '15px', fontWeight: 'bold' }}>INSURANCE BROKER</div>
              <h3 className="heading-md">"13 → 32 policies written. Same ad spend. 30 days."</h3>
              <p style={{ opacity: 0.8, marginBottom: '20px' }}>Durban broker stopped losing leads to competitors' faster response times.</p>
              <Link to="/case-studies" style={{ color: 'var(--color-accent-2)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}>Read Full Case Study <ArrowRight size={16} /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack — animated marquee */}
      <section className="section bg-light" style={{ padding: '60px 0' }}>
        <div className="container text-center reveal">
          <p style={{ fontWeight: 'bold', marginBottom: '28px', color: 'var(--color-secondary)' }}>BUILT WITH INDUSTRY-LEADING TOOLS</p>
        </div>
        <div className="marquee">
          <div className="marquee__track" style={{ color: 'var(--color-secondary)', opacity: 0.55, fontSize: '1.3rem', fontWeight: 700, fontFamily: 'var(--font-heading)' }}>
            {[...techStack, ...techStack].map((t, i) => (
              <span key={i} style={{ whiteSpace: 'nowrap' }}>{t}</span>
            ))}
          </div>
        </div>
        <div className="container text-center reveal" style={{ marginTop: '36px' }}>
          <div style={{ padding: '15px', background: 'rgba(27, 58, 107, 0.1)', borderRadius: '8px', display: 'inline-block' }}>
            <p style={{ color: 'var(--color-accent-1)', fontWeight: 'bold', margin: 0 }}>Self-hosted on Hetzner South Africa — POPIA Compliant by Design</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section" style={{ background: 'linear-gradient(135deg, var(--color-secondary) 0%, var(--color-accent-1) 100%)', color: 'white', textAlign: 'center' }}>
        <div className="container reveal-scale">
          <h2 className="heading-lg">Is Your Business Losing Revenue to Slow Responses?</h2>
          <p className="body-lg" style={{ maxWidth: '600px', margin: '0 auto 40px auto' }}>Book a free automation audit. We'll show you exactly where the leak is — and what it's costing you every month.</p>
          <Link to="/free-audit" className="btn btn-accent" style={{ fontSize: '1.2rem', padding: '20px 40px' }}>
            <span>Book Your Free Audit <ArrowRight size={24} style={{ verticalAlign: 'middle' }} /></span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
