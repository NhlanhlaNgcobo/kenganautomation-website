import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { ArrowRight, Zap, Target, Database, Bot, Clock, BarChart } from 'lucide-react';

const AnimatedCounter = ({ end, duration = 2000, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;
    let animationFrame;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <span>{prefix}{count}{suffix}</span>;
};

const Home = () => {
  useScrollReveal();

  return (
    <div style={{ paddingTop: '80px' }}>
      {/* Hero Section */}
      <section className="section bg-navy flex items-center" style={{ minHeight: '90vh', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.1, background: 'radial-gradient(circle at center, var(--color-accent-2) 0%, transparent 70%)', pointerEvents: 'none' }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '800px' }}>
            <h1 className="heading-xl text-white fade-up">
              We Fix The Leak.<br />
              <span className="text-baby-blue">You Keep The Revenue.</span>
            </h1>
            <p className="body-lg fade-up delay-100" style={{ maxWidth: '700px' }}>
              KenganAutomation builds AI-powered automation systems for South African businesses — using Claude AI, n8n, and Zapier — so your leads get answered in under 60 seconds, your follow-ups run on autopilot, and your revenue stops leaking.
            </p>
            <div className="flex gap-4 fade-up delay-200" style={{ flexWrap: 'wrap' }}>
              <Link to="/free-audit" className="btn btn-primary">
                Get a Free Audit <ArrowRight size={20} />
              </Link>
              <Link to="/case-studies" className="btn btn-outline">
                See Case Studies
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
          <div className="text-center fade-up" style={{ marginBottom: '60px' }}>
            <h2 className="heading-lg text-navy">Our Automation Systems</h2>
            <p className="body-lg text-navy" style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--color-secondary)', opacity: 0.8 }}>
              We build custom pipelines to capture, nurture, and convert your leads immediately.
            </p>
          </div>

          <div className="grid grid-3">
            <div className="card fade-up delay-100">
              <Zap size={40} className="text-baby-blue" style={{ marginBottom: '20px' }} />
              <h3 className="heading-sm text-navy">Speed to Lead Automation</h3>
              <p style={{ opacity: 0.8 }}>Contact every new lead under 60 seconds. Instant, personalized WhatsApp and email outreach.</p>
            </div>
            <div className="card fade-up delay-200">
              <Target size={40} className="text-baby-blue" style={{ marginBottom: '20px' }} />
              <h3 className="heading-sm text-navy">Lead Nurture Sequences</h3>
              <p style={{ opacity: 0.8 }}>Multi-touch follow-up systems that run on autopilot, ensuring no lead falls through the cracks.</p>
            </div>
            <div className="card fade-up delay-300">
              <Database size={40} className="text-baby-blue" style={{ marginBottom: '20px' }} />
              <h3 className="heading-sm text-navy">Database Reactivation</h3>
              <p style={{ opacity: 0.8 }}>Turn dormant contacts into active sales with targeted SMS and WhatsApp campaigns.</p>
            </div>
          </div>

          <div className="card fade-up mt-8" style={{ marginTop: '30px', borderTop: '4px solid var(--color-accent-1)' }}>
            <div className="flex gap-8 items-center" style={{ flexWrap: 'wrap' }}>
              <Bot size={60} className="text-accent-1" />
              <div style={{ flex: 1 }}>
                <h3 className="heading-sm text-navy">AI Chatbot & Agent Builds</h3>
                <p style={{ opacity: 0.8 }}>Intelligent AI assistants that qualify leads, book appointments, and answer complex questions 24/7 on your website.</p>
              </div>
              <Link to="/services" className="btn btn-outline-dark">Explore AI Agents</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mini Case Study Teaser */}
      <section className="section">
        <div className="container">
          <h2 className="heading-lg text-navy text-center fade-up" style={{ marginBottom: '60px' }}>Real Results in 30 Days</h2>
          <div className="grid grid-2">
            <div className="card fade-up delay-100" style={{ backgroundColor: 'var(--color-secondary)', color: 'white', borderTop: 'none' }}>
              <div style={{ color: 'var(--color-accent-2)', marginBottom: '15px', fontWeight: 'bold' }}>ESTATE AGENCY</div>
              <h3 className="heading-md">"9% → 22% close rate. R112,000 extra in commissions. Month one."</h3>
              <p style={{ opacity: 0.8, marginBottom: '20px' }}>Cape Town boutique agency fixed their weekend lead leak.</p>
              <Link to="/case-studies" style={{ color: 'var(--color-accent-2)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}>Read Full Case Study <ArrowRight size={16} /></Link>
            </div>
            <div className="card fade-up delay-200" style={{ backgroundColor: 'var(--color-accent-1)', color: 'white', borderTop: 'none' }}>
              <div style={{ color: 'var(--color-accent-2)', marginBottom: '15px', fontWeight: 'bold' }}>INSURANCE BROKER</div>
              <h3 className="heading-md">"13 → 32 policies written. Same ad spend. 30 days."</h3>
              <p style={{ opacity: 0.8, marginBottom: '20px' }}>Durban broker stopped losing leads to competitors' faster response times.</p>
              <Link to="/case-studies" style={{ color: 'var(--color-accent-2)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}>Read Full Case Study <ArrowRight size={16} /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="section bg-light" style={{ padding: '60px 0' }}>
        <div className="container text-center fade-up">
          <p style={{ fontWeight: 'bold', marginBottom: '20px', color: 'var(--color-secondary)' }}>BUILT WITH INDUSTRY-LEADING TOOLS</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '30px', opacity: 0.6, fontSize: '1.2rem', fontWeight: 'bold', fontFamily: 'var(--font-heading)' }}>
            <span>Claude AI</span>
            <span>n8n</span>
            <span>Zapier</span>
            <span>WhatsApp API</span>
            <span>HubSpot</span>
            <span>Airtable</span>
          </div>
          <div style={{ marginTop: '30px', padding: '15px', background: 'rgba(27, 58, 107, 0.1)', borderRadius: '8px', display: 'inline-block' }}>
            <p style={{ color: 'var(--color-accent-1)', fontWeight: 'bold', margin: 0 }}>Self-hosted on Hetzner South Africa — POPIA Compliant by Design</p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section" style={{ background: 'linear-gradient(135deg, var(--color-secondary) 0%, var(--color-accent-1) 100%)', color: 'white', textAlign: 'center' }}>
        <div className="container fade-up">
          <h2 className="heading-lg">Is Your Business Losing Revenue to Slow Responses?</h2>
          <p className="body-lg" style={{ maxWidth: '600px', margin: '0 auto 40px auto' }}>Book a free automation audit. We'll show you exactly where the leak is — and what it's costing you every month.</p>
          <Link to="/free-audit" className="btn btn-accent" style={{ fontSize: '1.2rem', padding: '20px 40px' }}>
            Book Your Free Audit <ArrowRight size={24} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
