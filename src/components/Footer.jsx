import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MessageCircle } from 'lucide-react';
import { CONTACT_EMAIL, whatsappLink } from '../config';

const Footer = () => {
  return (
    <footer className="section bg-navy" style={{ paddingBottom: '30px', paddingTop: '80px' }}>
      <div className="container">
        <div className="grid grid-3" style={{ marginBottom: '60px' }}>
          <div>
            <h3 className="heading-sm text-white">Kengan<span className="text-baby-blue">Automation</span></h3>
            <p style={{ opacity: 0.8, marginBottom: '20px' }}>We Fix The Leak. You Keep The Revenue.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '10px', opacity: 0.85 }}>
                <MessageCircle size={18} className="text-baby-blue" /> 063 519 0807
              </a>
              <a href={`mailto:${CONTACT_EMAIL}`} style={{ display: 'flex', alignItems: 'center', gap: '10px', opacity: 0.85 }}>
                <Mail size={18} className="text-baby-blue" /> {CONTACT_EMAIL}
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="heading-sm text-white" style={{ fontSize: '1.2rem' }}>Quick Links</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', opacity: 0.8 }}>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/case-studies">Case Studies</Link></li>
              <li><Link to="/roi-calculator">ROI Calculator</Link></li>
              <li><Link to="/blog">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="heading-sm text-white" style={{ fontSize: '1.2rem' }}>Legal</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', opacity: 0.8 }}>
              <li><Link to="/privacy-policy">Privacy Policy (POPIA)</Link></li>
              <li><Link to="/privacy-policy">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div style={{ padding: '20px 0', borderTop: '1px solid rgba(255,255,255,0.1)', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '20px', textAlign: 'center' }}>
          <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '0.9rem', color: 'var(--color-accent-2)' }}>
            <span style={{ display: 'inline-block', width: '8px', height: '8px', background: 'var(--color-accent-2)', borderRadius: '50%' }}></span>
            POPIA Compliant · Data Hosted in South Africa · Hetzner SA
          </p>
        </div>

        <div style={{ textAlign: 'center', opacity: 0.6, fontSize: '0.9rem' }}>
          © 2026 KenganAutomation. All rights reserved. South Africa.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
