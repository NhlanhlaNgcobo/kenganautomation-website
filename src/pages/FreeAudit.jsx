import React, { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Target, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const FreeAudit = () => {
  useScrollReveal();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    email: '',
    phone: '',
    industry: '',
    contactMethod: 'WhatsApp',
    leadVolume: 'Under 50',
    responseTime: 'Under 1 hour',
    adSpend: 'Under R5k',
    bottleneck: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Relative path hits the Vercel serverless function (/api/audit) in
      // production. Override with VITE_AUDIT_ENDPOINT for local dev if needed.
      const endpoint = import.meta.env.VITE_AUDIT_ENDPOINT || '/api/audit';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          submittedAt: new Date().toISOString()
        })
      });

      if (response.ok) {
        setSubmitted(true);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error('Submission error:', error);
      alert("Could not connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ paddingTop: '100px' }}>
      <div className="container fade-up" style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 className="heading-xl text-navy">Book Your Free Automation Audit</h1>
        <p className="body-lg text-navy" style={{ maxWidth: '800px', margin: '0 auto', color: 'var(--color-secondary)', opacity: 0.8 }}>
          We'll analyse your current lead process, identify where you're losing revenue, and show you exactly what automation can fix — at no cost.
        </p>
      </div>

      <section className="section bg-light" style={{ padding: '60px 0' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          
          {submitted ? (
            <div className="card fade-up" style={{ textAlign: 'center', padding: '60px 40px' }}>
              <CheckCircle size={60} style={{ color: 'var(--color-accent-2)', margin: '0 auto 20px auto' }} />
              <h2 className="heading-lg text-navy">Audit Request Received!</h2>
              <p className="body-lg" style={{ opacity: 0.8, color: 'var(--color-secondary)' }}>
                Thanks! A member of the KenganAutomation team will be in touch within 1 business day.
              </p>
              <button 
                onClick={() => setSubmitted(false)} 
                className="btn btn-outline-dark mt-4"
              >
                Submit another request
              </button>
            </div>
          ) : (
            <div className="card fade-up">
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                <div className="grid grid-2">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Full Name *</label>
                    <input 
                      required 
                      type="text" 
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      style={{ padding: '12px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '6px', fontSize: '1rem' }} 
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Business Name *</label>
                    <input 
                      required 
                      type="text" 
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      style={{ padding: '12px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '6px', fontSize: '1rem' }} 
                    />
                  </div>
                </div>

                <div className="grid grid-2">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Email Address *</label>
                    <input 
                      required 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      style={{ padding: '12px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '6px', fontSize: '1rem' }} 
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Phone Number *</label>
                    <input 
                      required 
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      style={{ padding: '12px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '6px', fontSize: '1rem' }} 
                    />
                  </div>
                </div>

                <div className="grid grid-2">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Industry / Vertical *</label>
                    <select 
                      required 
                      name="industry"
                      value={formData.industry}
                      onChange={handleChange}
                      style={{ padding: '12px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '6px', fontSize: '1rem', backgroundColor: 'white' }}
                    >
                      <option value="">Select industry</option>
                      <option value="Estate Agency">Estate Agency</option>
                      <option value="Medical / Dental">Medical / Dental</option>
                      <option value="Insurance">Insurance</option>
                      <option value="Fitness / Gym">Fitness / Gym</option>
                      <option value="E-Commerce">E-Commerce</option>
                      <option value="Coaching / Consulting">Coaching / Consulting</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Preferred Contact Method *</label>
                    <select 
                      required 
                      name="contactMethod"
                      value={formData.contactMethod}
                      onChange={handleChange}
                      style={{ padding: '12px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '6px', fontSize: '1rem', backgroundColor: 'white' }}
                    >
                      <option value="WhatsApp">WhatsApp</option>
                      <option value="Email">Email</option>
                      <option value="Phone Call">Phone Call</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Monthly Lead Volume</label>
                    <select 
                      name="leadVolume"
                      value={formData.leadVolume}
                      onChange={handleChange}
                      style={{ padding: '12px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '6px', fontSize: '1rem', backgroundColor: 'white' }}
                    >
                      <option>Under 50</option>
                      <option>50–150</option>
                      <option>150–500</option>
                      <option>500+</option>
                    </select>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Current Avg. Response Time</label>
                    <select 
                      name="responseTime"
                      value={formData.responseTime}
                      onChange={handleChange}
                      style={{ padding: '12px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '6px', fontSize: '1rem', backgroundColor: 'white' }}
                    >
                      <option>Under 1 hour</option>
                      <option>1–6 hours</option>
                      <option>6–24 hours</option>
                      <option>24+ hours</option>
                    </select>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>Monthly Ad Spend</label>
                    <select 
                      name="adSpend"
                      value={formData.adSpend}
                      onChange={handleChange}
                      style={{ padding: '12px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '6px', fontSize: '1rem', backgroundColor: 'white' }}
                    >
                      <option>Under R5k</option>
                      <option>R5k–R15k</option>
                      <option>R15k–R50k</option>
                      <option>R50k+</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>What's your biggest sales bottleneck?</label>
                  <textarea 
                    rows="4" 
                    name="bottleneck"
                    value={formData.bottleneck}
                    onChange={handleChange}
                    style={{ padding: '12px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '6px', fontSize: '1rem', fontFamily: 'inherit', resize: 'vertical' }}
                  ></textarea>
                </div>

                <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start', marginTop: '10px' }}>
                  <input required type="checkbox" id="consent" style={{ marginTop: '4px' }} />
                  <label htmlFor="consent" style={{ fontSize: '0.85rem', opacity: 0.8, lineHeight: '1.4' }}>
                    I consent to KenganAutomation contacting me about my audit. My data will be handled in accordance with POPIA. View our <Link to="/privacy-policy" style={{ textDecoration: 'underline' }}>Privacy Policy</Link>.
                  </label>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="btn btn-primary" 
                  style={{ marginTop: '20px', padding: '18px', fontSize: '1.1rem', width: '100%', opacity: loading ? 0.7 : 1 }}
                >
                  {loading ? 'Sending...' : 'Submit Request Form'}
                </button>
              </form>
            </div>
          )}

        </div>
      </section>
    </div>
  );
};

export default FreeAudit;
