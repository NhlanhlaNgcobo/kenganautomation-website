import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Building, MapPin, TrendingUp } from 'lucide-react';

const cases = [
  {
    id: 1,
    name: 'Coastal Edge Properties',
    industry: 'Estate Agency',
    location: 'Cape Town',
    metrics: [
      { label: 'Avg. Lead Response Time', before: '4–10 hours', after: '4 minutes' },
      { label: 'Close Rate (Property24)', before: '9%', after: '22%' },
      { label: 'Monthly Leads', before: '68', after: '68 (same)' },
      { label: 'Commissions Earned', before: 'R84,000', after: 'R196,000' },
      { label: 'Additional Revenue', before: '—', after: 'R112,000/month', highlight: true }
    ],
    story: "Boutique agency in Bloubergstrand, Cape Town. 5 agents, R18,000/month on lead generation. Agents were manually checking a shared Gmail inbox — leads arriving at 10pm on a Friday got replies Monday morning. Kengan built a Speed to Lead automation on n8n that fired a personalised WhatsApp from the responsible agent within 4 minutes of any Property24 or Private Property enquiry. Hosted on Hetzner SA, fully POPIA-compliant.",
    quote: "I genuinely thought our agents were just slow. Turns out the process was the problem. Kengan fixed it in 5 days, and we closed an extra R112k in commissions last month.",
    author: "Nadine O., Principal, Coastal Edge Properties"
  },
  {
    id: 2,
    name: 'Sandton Smile Studio',
    industry: 'Dental',
    location: 'Johannesburg',
    metrics: [
      { label: 'Google Ads Leads/Month', before: '54 enquiries', after: '54 (same spend)' },
      { label: 'Booking Conversion', before: '18%', after: '41%' },
      { label: 'No-Show Rate', before: '31%', after: '12%' },
      { label: 'Monthly Revenue (new patients)', before: 'R62,000', after: 'R138,000', highlight: true },
      { label: 'Setup Investment', before: '—', after: 'R8,000 once-off' }
    ],
    story: "General and cosmetic dental practice in Bryanston, spending R9,500/month on Google Ads. Receptionist handling replies manually between calls — average response time 5–7 hours. Kengan deployed a two-part automation: Speed to Lead WhatsApp with Calendly booking link within 60 seconds of form submission, plus 48-hour and 2-hour appointment reminders. Chair utilisation jumped from 61% to 89%.",
    quote: "Lerato now spends zero time chasing appointment confirmations. The WhatsApp does it. Our chair utilisation went from 61% to 89% in one month.",
    author: "Dr. Sipho M., Practice Owner, Sandton Smile Studio"
  },
  {
    id: 3,
    name: 'PeakCover Brokers',
    industry: 'Insurance',
    location: 'Durban',
    metrics: [
      { label: 'Facebook Leads/Month', before: '120', after: '120 (same)' },
      { label: 'Quote Conversion Rate', before: '11%', after: '27%' },
      { label: 'Avg. Response Time', before: '6.2 hours', after: '55 seconds' },
      { label: 'Policies Written (Month)', before: '13', after: '32', highlight: true },
      { label: 'Gross Commission', before: 'R31,200', after: 'R76,800' }
    ],
    story: "3-person brokerage in Umhlanga, Durban. Facebook ads spending R6,500/month. Leads were received by email and called back 4–8 hours later — by which point prospects had already spoken to competitors. Kengan built a Facebook Lead Ad webhook to WhatsApp pipeline with reply-menu booking. Lead details auto-pushed to CRM.",
    quote: "I always thought I needed more leads. I didn't. I needed to stop losing the ones I already had. Kengan fixed that in 5 days.",
    author: "Thandeka N., Principal Broker, PeakCover Brokers"
  },
  {
    id: 4,
    name: 'IronVault Fitness',
    industry: 'Fitness',
    location: 'Pretoria',
    metrics: [
      { label: 'Dormant Members in CRM', before: '1,840 contacts', after: '1,840 (same list)' },
      { label: 'Reactivation Campaign Revenue', before: 'R0 (not attempted)', after: 'R44,200' },
      { label: 'Active Members', before: '187', after: '241' },
      { label: 'Monthly Recurring Revenue', before: 'R89,000', after: 'R126,400', highlight: true },
      { label: 'Campaign Cost', before: '—', after: 'R8,000 once-off' }
    ],
    story: "Functional training gym in Centurion, Pretoria. Owner Kobus had 1,840 dormant contacts sitting in a spreadsheet — never contacted. Kengan ran a 3-message WhatsApp reactivation sequence over 14 days. 54 members reactivated, 8 converted to full membership. Campaign ROI: 452% in 60 days.",
    quote: "Kobus literally sent us a voice note at 9pm on a Tuesday saying 'bru, 11 people have already responded and it's day one.' That message is the case study.",
    author: "KenganAutomation team"
  },
  {
    id: 5,
    name: 'KasiKit',
    industry: 'E-commerce',
    location: 'Johannesburg',
    metrics: [
      { label: 'Abandoned Cart Rate', before: '73%', after: '73% (unchanged)' },
      { label: 'Abandoned Cart Recovery', before: 'R0 (no system)', after: 'R58,400/month', highlight: true },
      { label: 'WhatsApp Recovery Rate', before: '—', after: '21% of abandoned carts' },
      { label: 'Avg. Cart Value', before: 'R890', after: 'R890' },
      { label: 'Klaviyo Cost Saved', before: 'R3,800/month', after: 'R0 (replaced)' }
    ],
    story: "Shopify brand selling African-inspired streetwear. Email recovery via Klaviyo was producing 2% recovery at R3,800/month. Kengan built a Shopify webhook → n8n → WhatsApp sequence: 45-minute trigger with product photo + checkout link, 24-hour message with 10% discount code, 72-hour final notice. Klaviyo subscription cancelled.",
    quote: "I cannot believe I was paying Klaviyo R3,800 a month for 2% recovery when my customers are literally on WhatsApp all day. This was embarrassingly obvious in hindsight.",
    author: "Amahle D., Founder, KasiKit"
  }
];

const CaseStudies = () => {
  useScrollReveal();
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div style={{ paddingTop: '100px' }}>
      <div className="container fade-up" style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 className="heading-xl text-navy">Client Results</h1>
        <p className="body-lg text-navy" style={{ maxWidth: '800px', margin: '0 auto', color: 'var(--color-secondary)', opacity: 0.8 }}>
          Real South African businesses. Real revenue recovered. Here is exactly what happens when you fix your speed to lead.
        </p>
      </div>

      <section className="section bg-light" style={{ minHeight: '800px' }}>
        <div className="container">

          <div className="fade-up" style={{ display: 'flex', gap: '15px', overflowX: 'auto', paddingBottom: '20px', marginBottom: '40px', scrollbarWidth: 'none' }}>
            {cases.map((c, idx) => (
              <button
                key={c.id}
                onClick={() => setActiveTab(idx)}
                style={{
                  padding: '12px 24px',
                  borderRadius: '30px',
                  border: 'none',
                  background: activeTab === idx ? 'var(--color-secondary)' : 'var(--paper-2)',
                  color: activeTab === idx ? '#FFF' : 'var(--color-secondary)',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.3s ease'
                }}
              >
                {c.industry}
              </button>
            ))}
          </div>

          <div className="card fade-up delay-100" style={{ padding: '0', overflow: 'hidden', border: 'none', boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }}>
            <div style={{
              padding: '100px 60px',
              borderBottom: '1px solid rgba(0,0,0,0.05)',
              position: 'relative',
              overflow: 'hidden',
              backgroundColor: 'var(--color-secondary)'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: `url('/images/case-studies/case-${cases[activeTab].id}.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center 20%',
                opacity: 0.6,
                transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                transform: 'scale(1.05)'
              }}></div>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(90deg, rgba(10,22,40,0.95) 0%, rgba(10,22,40,0.7) 50%, rgba(10,22,40,0.2) 100%)'
              }}></div>
              <div style={{ position: 'relative', zIndex: 1, maxWidth: '600px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '24px' }}>
                  <span style={{ 
                    background: 'var(--color-accent-2)', 
                    color: 'var(--color-secondary)', 
                    padding: '6px 16px', 
                    borderRadius: '30px', 
                    fontSize: '0.85rem', 
                    fontWeight: 'bold',
                    boxShadow: '0 4px 12px rgba(23, 184, 119, 0.35)'
                  }}>
                    {cases[activeTab].industry}
                  </span>
                  <span style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '6px', 
                    fontSize: '0.95rem', 
                    color: '#FFF', 
                    opacity: 0.9,
                    fontWeight: '500'
                  }}>
                    <MapPin size={18} /> {cases[activeTab].location}
                  </span>
                </div>
                <h2 className="heading-lg text-white" style={{ 
                  textShadow: '0 4px 20px rgba(0,0,0,0.4)', 
                  margin: 0,
                  fontSize: '3rem',
                  lineHeight: '1.1'
                }}>
                  {cases[activeTab].name}
                </h2>
              </div>
            </div>

            <div className="grid grid-2" style={{ gap: '0' }}>
              <div style={{ padding: '40px', borderRight: '1px solid rgba(0,0,0,0.05)' }}>
                <h3 className="heading-sm text-navy" style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}><TrendingUp size={20} className="text-accent-2" /> Before vs After</h3>
                <div style={{ width: '100%', overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid rgba(0,0,0,0.1)' }}>
                        <th style={{ padding: '12px', color: 'var(--color-secondary)' }}>Metric</th>
                        <th style={{ padding: '12px', color: 'var(--color-secondary)' }}>Before</th>
                        <th style={{ padding: '12px', color: 'var(--color-accent-1)' }}>After</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cases[activeTab].metrics.map((m, i) => (
                        <tr key={i} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)', backgroundColor: m.highlight ? 'rgba(23, 184, 119, 0.1)' : 'transparent' }}>
                          <td style={{ padding: '15px 12px', fontWeight: '500' }}>{m.label}</td>
                          <td style={{ padding: '15px 12px', opacity: 0.7 }}>{m.before}</td>
                          <td style={{ padding: '15px 12px', fontWeight: 'bold', color: 'var(--color-accent-1)' }}>{m.after}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div style={{ padding: '40px', background: 'var(--color-bg-light)' }}>
                <h3 className="heading-sm text-navy" style={{ marginBottom: '20px' }}>The Story</h3>
                <p style={{ opacity: 0.8, lineHeight: '1.8', marginBottom: '40px' }}>
                  {cases[activeTab].story}
                </p>

                <div style={{ borderLeft: '4px solid var(--color-accent-2)', paddingLeft: '20px' }}>
                  <p style={{ fontStyle: 'italic', fontSize: '1.1rem', marginBottom: '15px', color: 'var(--color-secondary)' }}>
                    "{cases[activeTab].quote}"
                  </p>
                  <p style={{ fontWeight: 'bold', fontSize: '0.9rem', color: 'var(--color-accent-1)' }}>— {cases[activeTab].author}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default CaseStudies;
