import React, { useState, useEffect } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Calculator, AlertTriangle, TrendingUp, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

const ROICalculator = () => {
  useScrollReveal();

  const [leads, setLeads] = useState(100);
  const [responseTime, setResponseTime] = useState(4);
  const [closeRate, setCloseRate] = useState(10);
  const [dealValue, setDealValue] = useState(5000);
  const [adSpend, setAdSpend] = useState(10000);

  const [lostLeads, setLostLeads] = useState(0);
  const [lostRevenue, setLostRevenue] = useState(0);
  const [newRevenue, setNewRevenue] = useState(0);
  const [roiX, setRoiX] = useState(0);

  useEffect(() => {
    // Basic heuristics for calculator logic based on industry averages
    // If response time is > 1 hour, conversion drops drastically
    const responsePenalty = responseTime > 1 ? Math.min((responseTime * 0.05), 0.5) : 0;
    
    const leadsActuallyContacted = Math.floor(leads * (1 - responsePenalty));
    const leadsLostNum = leads - leadsActuallyContacted;
    
    const currentRevenue = leadsActuallyContacted * (closeRate / 100) * dealValue;
    const lostRev = leadsLostNum * (closeRate / 100) * dealValue;
    
    // Automation projection: response time < 60s, which bumps close rate by ~30% relatively
    const automatedCloseRate = Math.min((closeRate * 1.3), 100);
    const projectedRevenue = leads * (automatedCloseRate / 100) * dealValue;
    
    // Average Kengan retainer assumed to be R4000
    const retainer = 4000;
    
    const uplift = projectedRevenue - currentRevenue;
    const calculatedRoi = uplift > 0 ? Math.floor(uplift / retainer) : 0;

    setLostLeads(leadsLostNum);
    setLostRevenue(lostRev);
    setNewRevenue(projectedRevenue);
    setRoiX(calculatedRoi);

  }, [leads, responseTime, closeRate, dealValue, adSpend]);

  return (
    <div style={{ paddingTop: '100px' }}>
      <div className="container fade-up" style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 className="heading-xl text-navy">ROI Calculator</h1>
        <p className="body-lg text-navy" style={{ maxWidth: '800px', margin: '0 auto', color: 'var(--color-secondary)', opacity: 0.8 }}>
          See exactly how much revenue you're losing to slow response times — and what our automation systems could recover.
        </p>
      </div>

      <section className="section bg-light" style={{ padding: '60px 0' }}>
        <div className="container">
          <div className="grid grid-2">
            
            {/* Inputs */}
            <div className="card fade-up delay-100">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '30px', borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: '15px' }}>
                <Calculator className="text-accent-2" />
                <h3 className="heading-sm text-navy" style={{ margin: 0 }}>Your Current Metrics</h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                <div>
                  <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontWeight: 'bold' }}>
                    <span>Monthly Leads Received</span>
                    <span className="text-accent-1">{leads} leads</span>
                  </label>
                  <input type="range" min="10" max="1000" step="10" value={leads} onChange={e => setLeads(Number(e.target.value))} style={{ width: '100%' }} />
                </div>

                <div>
                  <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontWeight: 'bold' }}>
                    <span>Current Response Time (Hours)</span>
                    <span className="text-accent-1">{responseTime} hours</span>
                  </label>
                  <input type="range" min="0" max="48" step="1" value={responseTime} onChange={e => setResponseTime(Number(e.target.value))} style={{ width: '100%' }} />
                </div>

                <div>
                  <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontWeight: 'bold' }}>
                    <span>Current Close Rate (%)</span>
                    <span className="text-accent-1">{closeRate}%</span>
                  </label>
                  <input type="range" min="1" max="50" value={closeRate} onChange={e => setCloseRate(Number(e.target.value))} style={{ width: '100%' }} />
                </div>

                <div>
                  <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontWeight: 'bold' }}>
                    <span>Avg. Value per Sale (Rands)</span>
                    <span className="text-accent-1">R{dealValue.toLocaleString()}</span>
                  </label>
                  <input type="range" min="1000" max="100000" step="1000" value={dealValue} onChange={e => setDealValue(Number(e.target.value))} style={{ width: '100%' }} />
                </div>

                <div>
                  <label style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontWeight: 'bold' }}>
                    <span>Monthly Ad Spend (Rands)</span>
                    <span className="text-accent-1">R{adSpend.toLocaleString()}</span>
                  </label>
                  <input type="range" min="0" max="100000" step="1000" value={adSpend} onChange={e => setAdSpend(Number(e.target.value))} style={{ width: '100%' }} />
                </div>
              </div>
            </div>

            {/* Outputs */}
            <div className="flex flex-col gap-4">
              <div className="card fade-up delay-200" style={{ background: 'rgba(255, 59, 48, 0.05)', borderColor: 'rgb(255, 59, 48)', borderLeftWidth: '4px', borderTopWidth: '0' }}>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <AlertTriangle color="rgb(255, 59, 48)" />
                  <div>
                    <p style={{ color: 'rgb(255, 59, 48)', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '5px' }}>THE LEAK</p>
                    <h3 className="heading-md" style={{ color: 'var(--color-navy)', margin: '0' }}>{lostLeads}</h3>
                    <p style={{ opacity: 0.8 }}>Estimated leads lost per month</p>
                    <h4 className="heading-sm mt-4" style={{ marginTop: '10px', color: 'rgb(255, 59, 48)' }}>R{Math.floor(lostRevenue).toLocaleString()}</h4>
                    <p style={{ opacity: 0.8, fontSize: '0.9rem' }}>Revenue lost monthly</p>
                  </div>
                </div>
              </div>

              <div className="card fade-up delay-300" style={{ background: 'var(--color-secondary)', color: 'white', borderLeftWidth: '4px', borderColor: 'var(--color-accent-2)', borderTopWidth: '0' }}>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <TrendingUp className="text-accent-2" />
                  <div>
                    <p style={{ color: 'var(--color-accent-2)', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '5px' }}>THE FIX (AUTOMATION)</p>
                    <h3 className="heading-md" style={{ color: 'white', margin: '0' }}>R{Math.floor(newRevenue).toLocaleString()}</h3>
                    <p style={{ opacity: 0.8 }}>Projected total monthly revenue</p>
                  </div>
                </div>
              </div>

              <div className="card fade-up delay-400" style={{ background: 'var(--color-accent-2)', color: 'var(--color-secondary)', borderLeftWidth: '4px', borderColor: 'var(--color-accent-1)', borderTopWidth: '0' }}>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <DollarSign color="var(--color-secondary)" />
                  <div>
                    <p style={{ fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '5px' }}>KENGANAUTOMATION ROI</p>
                    <h3 className="heading-md" style={{ margin: '0' }}>{roiX}x</h3>
                    <p style={{ opacity: 0.8, fontWeight: '500' }}>Estimated monthly return on retainer</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="text-center fade-up mt-8" style={{ marginTop: '60px' }}>
            <p style={{ opacity: 0.6, fontSize: '0.9rem', marginBottom: '20px' }}>*Projections are based on South African industry benchmarks. Results vary by business.</p>
            <Link to="/free-audit" className="btn btn-primary" style={{ padding: '15px 30px', fontSize: '1.1rem' }}>
              See what automation could do for your business — book a free audit
            </Link>
          </div>
          
        </div>
      </section>
    </div>
  );
};

export default ROICalculator;
