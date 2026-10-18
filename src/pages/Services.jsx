import React from 'react';
import { Link } from 'react-router-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import {
  MessageCircle, Zap, Target, Users, ShoppingCart, Star,
  Receipt, FileText, BarChart3, ScanLine,
  CalendarClock, Package, Clock, MapPin, Truck,
  MessageSquare, Calendar, Settings, ArrowRight,
} from 'lucide-react';

// Catalogue grouped the way a business owner thinks about their week — not all
// lead-gen. Grounded in what SA SMEs most often automate: WhatsApp support,
// invoicing & late-payment chasing, appointment reminders, reporting, stock.
const categories = [
  {
    name: 'Customer service & sales',
    note: 'Answer every customer in seconds and never lose a lead to a slow reply.',
    items: [
      { icon: MessageCircle, title: 'WhatsApp AI Chatbot & Receptionist', body: 'A Claude-powered assistant that answers, qualifies and books 24/7 — where 96% of South Africans already chat.' },
      { icon: Zap, title: 'Speed to Lead', body: 'Webhook automation that replies to any new enquiry on WhatsApp in under 60 seconds.' },
      { icon: Target, title: 'Lead Nurture Sequences', body: '14-day follow-up journeys that bring back the leads who didn’t buy the first time.' },
      { icon: Users, title: 'Database Reactivation', body: 'Turn a dead spreadsheet of old contacts into booked revenue with a timed WhatsApp campaign.' },
      { icon: ShoppingCart, title: 'Abandoned Cart Recovery', body: 'Shopify/WooCommerce → WhatsApp nudges that recover checkouts email never reaches.' },
      { icon: Star, title: 'Review & Reputation', body: 'Auto-request Google reviews after a sale, and catch unhappy customers privately first.' },
    ],
  },
  {
    name: 'Finance & admin',
    note: 'The quickest money to recover: get invoices out and get paid on time.',
    items: [
      { icon: Receipt, title: 'Invoicing & Payment Follow-Up', body: 'Auto-send invoices and chase late payers on WhatsApp and email until they settle — 46% of SA firms are paid late.' },
      { icon: FileText, title: 'Payroll & SARS Filing Prep', body: 'Generate payslips, calculate PAYE and prep SARS submissions from your payroll data, on schedule.' },
      { icon: BarChart3, title: 'Reporting & Dashboards', body: 'Daily sales, cash-flow and ops numbers pulled together automatically into your inbox or a live dashboard.' },
      { icon: ScanLine, title: 'Document & Data Entry', body: 'Pull data off quotes, POs and receipts and push it straight into your sheets or accounting tool.' },
    ],
  },
  {
    name: 'Operations',
    note: 'Keep the day running — bookings, stock and deliveries handle themselves.',
    items: [
      { icon: CalendarClock, title: 'Appointment Reminders & Booking', body: 'Confirmations plus 48-hour and 2-hour reminders that cut no-shows by up to half. The highest-ROI automation for service businesses.' },
      { icon: Package, title: 'Inventory & Stock Alerts', body: 'Low-stock and reorder alerts, supplier nudges and stock synced across your sales channels.' },
      { icon: Clock, title: 'After-Hours & Weekend Capture', body: '24/7 capture with Calendly booking — never miss a lead during load-shedding or over the weekend.' },
      { icon: Truck, title: 'Order & Delivery Notifications', body: 'Automatic order, dispatch and delivery updates to customers — fewer "where’s my order?" messages.' },
      { icon: MapPin, title: 'Multi-Branch Routing', body: 'Route enquiries to the right agent or branch by city or region. Built for franchises and multi-location teams.' },
    ],
  },
];

const agents = [
  { icon: MessageSquare, title: 'AI Sales Agent', body: 'Qualifies leads, answers product and service questions, and captures contact details 24/7 — straight into your CRM.' },
  { icon: Calendar, title: 'Appointment Booking Agent', body: 'Checks live availability and books into your calendar (Calendly, Google Calendar) with no human in the loop.' },
  { icon: Settings, title: 'Custom Business Agent', body: 'A bespoke agent built around your workflow: quote calculators, intake, onboarding, support triage.' },
];

const Services = () => {
  useScrollReveal();

  return (
    <div style={{ paddingTop: '120px' }}>
      <div className="container reveal" style={{ textAlign: 'center', marginBottom: '20px' }}>
        <span className="kicker" style={{ justifyContent: 'center', display: 'inline-flex' }}>What we automate</span>
        <h1 className="heading-xl text-navy">Automations for the whole business — not just leads.</h1>
        <p className="body-lg" style={{ maxWidth: '720px', margin: '0 auto', color: 'var(--stone)' }}>
          End-to-end workflows built on n8n, Zapier and Claude AI, hosted on South African servers for full POPIA compliance.
        </p>
        <p style={{ maxWidth: '680px', margin: '14px auto 0', color: 'var(--stone)' }}>
          Every build is scoped and priced to your business — there&rsquo;s no one-size-fits-all package. Tell us what eats your time and we&rsquo;ll put together a tailored quote.
        </p>
        <div style={{ marginTop: '26px' }}>
          <Link to="/free-audit" className="btn btn-primary"><span>Request a quote <ArrowRight size={18} style={{ verticalAlign: 'middle' }} /></span></Link>
        </div>
      </div>

      {categories.map((cat, ci) => (
        <section key={cat.name} className={'section ' + (ci % 2 === 0 ? 'bg-light' : '')} style={{ paddingTop: ci === 0 ? '70px' : undefined, paddingBottom: '70px' }}>
          <div className="container">
            <div className="reveal" style={{ marginBottom: '36px', maxWidth: '640px' }}>
              <h2 className="heading-md text-navy" style={{ marginBottom: '8px' }}>{cat.name}</h2>
              <p style={{ color: 'var(--stone)', margin: 0 }}>{cat.note}</p>
              <hr className="seam" style={{ marginTop: '18px', width: '90px' }} />
            </div>
            <div className="grid grid-3">
              {cat.items.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={s.title} className={`card reveal delay-${(i % 3 + 1) * 100}`}>
                    <span style={{ display: 'inline-flex', width: '46px', height: '46px', borderRadius: '12px', alignItems: 'center', justifyContent: 'center', background: 'var(--flow-soft)', color: 'var(--flow-deep)', marginBottom: '18px' }}>
                      <Icon size={22} />
                    </span>
                    <h3 className="heading-sm text-navy">{s.title}</h3>
                    <p style={{ color: 'var(--stone)', marginBottom: 0 }}>{s.body}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      ))}

      {/* AI agents */}
      <section className="section bg-navy on-dark">
        <div className="container">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '48px', maxWidth: '760px', marginInline: 'auto' }}>
            <span className="kicker" style={{ justifyContent: 'center', display: 'inline-flex' }}>Claude-powered</span>
            <h2 className="heading-lg text-white">AI agents that take action — not FAQ bots.</h2>
            <p className="body-lg" style={{ margin: '0 auto' }}>
              We design and deploy intelligent agents with real backends. They qualify, answer, and act — booking, updating your CRM, triaging support.
            </p>
          </div>
          <div className="grid grid-3" style={{ marginBottom: '52px' }}>
            {agents.map((a, i) => {
              const Icon = a.icon;
              return (
                <div key={a.title} className={`card reveal delay-${(i % 3 + 1) * 100}`} style={{ background: 'var(--ink-700)', borderColor: 'var(--line-ink)' }}>
                  <span style={{ display: 'inline-flex', width: '46px', height: '46px', borderRadius: '12px', alignItems: 'center', justifyContent: 'center', background: 'var(--ink)', color: 'var(--flow)', marginBottom: '18px' }}>
                    <Icon size={22} />
                  </span>
                  <h3 className="heading-sm text-white">{a.title}</h3>
                  <p style={{ color: 'var(--mist)', marginBottom: 0 }}>{a.body}</p>
                </div>
              );
            })}
          </div>
          <div className="reveal" style={{ textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: '12px', fontWeight: 600, color: 'var(--mist)' }}>
              <span className="chip">Customer chats</span>
              <span className="text-accent-2">→</span>
              <span className="chip">AI qualifies &amp; acts</span>
              <span className="text-accent-2">→</span>
              <span className="chip">Booked / updated / routed</span>
              <span className="text-accent-2">→</span>
              <span className="chip" style={{ background: 'var(--flow)', color: 'var(--ink)', borderColor: 'var(--flow)' }}>You get the warm lead</span>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="section bg-light" style={{ textAlign: 'center' }}>
        <div className="container reveal">
          <h2 className="heading-lg text-navy">Not sure what to automate first?</h2>
          <p className="body-lg" style={{ maxWidth: '560px', margin: '0 auto 32px', color: 'var(--stone)' }}>
            Book a free audit — we&rsquo;ll map where your time and money are leaking and tell you exactly which automation pays back fastest.
          </p>
          <Link to="/free-audit" className="btn btn-primary" style={{ fontSize: '1.05rem', padding: '16px 32px' }}>
            <span>Book your free audit <ArrowRight size={20} style={{ verticalAlign: 'middle' }} /></span>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Services;
