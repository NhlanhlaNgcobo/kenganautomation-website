import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Zap, Mail, Users, Clock, MapPin, MessageSquare, Calendar, Settings } from 'lucide-react';

const Services = () => {
  useScrollReveal();

  return (
    <div style={{ paddingTop: '100px' }}>
      <div className="container fade-up" style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 className="heading-xl text-navy">Our Automation Systems</h1>
        <p className="body-lg text-navy" style={{ maxWidth: '800px', margin: '0 auto', color: 'var(--color-secondary)', opacity: 0.8 }}>
          KenganAutomation builds end-to-end automation workflows using n8n, Zapier, and Claude AI — hosted on South African servers for full POPIA compliance.
        </p>
      </div>

      <section className="section bg-light">
        <div className="container">
          <h2 className="heading-lg text-navy fade-up" style={{ borderBottom: '2px solid var(--color-accent-2)', paddingBottom: '15px', marginBottom: '40px', display: 'inline-block' }}>Category A — Business Automation Systems</h2>
          
          <div className="grid grid-2">
            <div className="card fade-up delay-100">
              <Zap size={32} className="text-baby-blue" style={{ marginBottom: '15px' }} />
              <h3 className="heading-sm text-navy">Speed to Lead Protocol</h3>
              <p style={{ opacity: 0.8, marginBottom: '20px' }}>Webhook automation that responds to new leads via WhatsApp in under 60 seconds.</p>
              <ul style={{ opacity: 0.8, marginBottom: '20px', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>• Integrates with Property24, Facebook Lead Ads, Typeform, Tally, Google Ads.</li>
                <li>• Immediate automated acknowledgment and qualification.</li>
              </ul>
              <div style={{ background: 'var(--color-bg-light)', padding: '15px', borderRadius: '8px', fontSize: '0.9rem', fontWeight: 'bold', color: 'var(--color-accent-1)' }}>
                Setup: R10,000–R15,000 | Retainer: R3,000–R4,000/month
              </div>
            </div>

            <div className="card fade-up delay-200">
              <Mail size={32} className="text-baby-blue" style={{ marginBottom: '15px' }} />
              <h3 className="heading-sm text-navy">Lead Nurture Sequences</h3>
              <p style={{ opacity: 0.8, marginBottom: '20px' }}>14-day automated WhatsApp and email follow-up workflows that convert leads who didn't buy the first time.</p>
              <ul style={{ opacity: 0.8, marginBottom: '20px', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>• Prevents drop-off after the initial contact.</li>
                <li>• Ideal for coaches, brokers, and agencies.</li>
              </ul>
            </div>

            <div className="card fade-up delay-300">
              <Users size={32} className="text-baby-blue" style={{ marginBottom: '15px' }} />
              <h3 className="heading-sm text-navy">Database Reactivation</h3>
              <p style={{ opacity: 0.8, marginBottom: '20px' }}>Multi-message WhatsApp reactivation campaign targeting dormant contacts.</p>
              <ul style={{ opacity: 0.8, marginBottom: '20px', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>• Breathe life back into old spreadsheets.</li>
                <li>• Average ROI of 452%+ in 60 days.</li>
              </ul>
            </div>

            <div className="card fade-up delay-100">
              <Clock size={32} className="text-baby-blue" style={{ marginBottom: '15px' }} />
              <h3 className="heading-sm text-navy">After-Hours & Weekend Lead Capture</h3>
              <p style={{ opacity: 0.8, marginBottom: '20px' }}>24/7 lead capture with Calendly booking integration.</p>
              <ul style={{ opacity: 0.8, marginBottom: '20px', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>• Never miss a lead during load shedding.</li>
                <li>• Keep your calendar filling up while you sleep.</li>
              </ul>
            </div>

            <div className="card fade-up delay-200">
              <MapPin size={32} className="text-baby-blue" style={{ marginBottom: '15px' }} />
              <h3 className="heading-sm text-navy">Multi-Branch Geographic Routing</h3>
              <p style={{ opacity: 0.8, marginBottom: '20px' }}>Automatically route leads to the correct agent or office based on their city or region.</p>
              <ul style={{ opacity: 0.8, marginBottom: '20px', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li>• Instant, accurate assignment.</li>
                <li>• Ideal for franchise groups and multi-location agencies.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-navy text-white">
        <div className="container">
          <div className="fade-up" style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 className="heading-lg" style={{ borderBottom: '2px solid var(--color-accent-2)', paddingBottom: '15px', display: 'inline-block' }}>Category B — AI Chatbot & Agent Builds</h2>
            <p className="body-lg" style={{ maxWidth: '800px', margin: '20px auto 0', opacity: 0.8 }}>
              We design and deploy intelligent AI agents for your website — powered by Claude AI — with fully functional backends. These are not basic FAQ bots. They are autonomous agents that take action.
            </p>
          </div>

          <div className="grid grid-3" style={{ marginBottom: '60px' }}>
            <div className="card fade-up delay-100" style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'var(--color-accent-2)', color: 'white' }}>
              <MessageSquare size={32} className="text-baby-blue" style={{ marginBottom: '15px' }} />
              <h3 className="heading-sm">AI Sales Agent</h3>
              <p style={{ opacity: 0.8 }}>Qualifies leads, answers product/service questions, and captures contact details 24/7. Integrates directly with your inbound CRM.</p>
            </div>

            <div className="card fade-up delay-200" style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'var(--color-accent-2)', color: 'white' }}>
              <Calendar size={32} className="text-baby-blue" style={{ marginBottom: '15px' }} />
              <h3 className="heading-sm">Appointment Booking Agent</h3>
              <p style={{ opacity: 0.8 }}>Checks live availability and books appointments directly into your calendar (Calendly, Google Calendar). No human in the loop required.</p>
            </div>

            <div className="card fade-up delay-300" style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'var(--color-accent-2)', color: 'white' }}>
              <Settings size={32} className="text-baby-blue" style={{ marginBottom: '15px' }} />
              <h3 className="heading-sm">Custom Business Agent</h3>
              <p style={{ opacity: 0.8 }}>Bespoke AI agent built around your specific business workflows. Examples: quote calculators, intake forms, onboarding sequences, support triage.</p>
            </div>
          </div>

          <div className="fade-up delay-200 text-center" style={{ padding: '40px', border: '1px solid var(--color-accent-1)', borderRadius: '12px', background: 'rgba(27, 58, 107, 0.3)' }}>
            <h3 className="heading-sm text-baby-blue" style={{ marginBottom: '20px' }}>How It Works</h3>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: '15px', fontWeight: 'bold' }}>
              <span style={{ padding: '10px 20px', background: 'rgba(255,255,255,0.1)', borderRadius: '30px' }}>User chats on website</span>
              <span className="text-accent-2">→</span>
              <span style={{ padding: '10px 20px', background: 'rgba(255,255,255,0.1)', borderRadius: '30px' }}>AI Agent qualifies & responds</span>
              <span className="text-accent-2">→</span>
              <span style={{ padding: '10px 20px', background: 'rgba(255,255,255,0.1)', borderRadius: '30px' }}>Action triggered (Booking/CRM)</span>
              <span className="text-accent-2">→</span>
              <span style={{ padding: '10px 20px', background: 'var(--color-accent-1)', borderRadius: '30px' }}>You get the warm lead</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
