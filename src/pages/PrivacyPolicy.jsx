import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Shield } from 'lucide-react';

const PrivacyPolicy = () => {
  useScrollReveal();

  return (
    <div style={{ paddingTop: '100px', paddingBottom: '60px' }}>
      <div className="container fade-up" style={{ textAlign: 'center', marginBottom: '60px' }}>
        <Shield size={48} className="text-accent-1" style={{ margin: '0 auto 20px auto' }} />
        <h1 className="heading-xl text-navy">Privacy Policy & POPIA Disclaimer</h1>
        <p className="body-lg text-navy" style={{ maxWidth: '800px', margin: '0 auto', color: 'var(--color-secondary)', opacity: 0.8 }}>
          Last Updated: April 2026
        </p>
      </div>

      <section className="section bg-light">
        <div className="container">
          <div className="card fade-up" style={{ maxWidth: '900px', margin: '0 auto', padding: '50px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', opacity: 0.85, lineHeight: '1.8' }}>
              
              <div>
                <h3 className="heading-sm text-navy" style={{ marginBottom: '15px' }}>1. Introduction</h3>
                <p>
                  KenganAutomation is a South African entity. We are committed to protecting your privacy and ensuring that your personal information is collected and used properly, lawfully, and transparently, in strict compliance with the Protection of Personal Information Act, 2013 (POPIA).
                </p>
              </div>

              <div>
                <h3 className="heading-sm text-navy" style={{ marginBottom: '15px' }}>2. The Information We Collect</h3>
                <p>
                  We collect and process your personal information mainly to contact you for the purposes of understanding your requirements, and delivering automotive consulting and automation services accordingly. The type of information we collect includes:
                </p>
                <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginTop: '10px' }}>
                  <li>Name and surname</li>
                  <li>Email address</li>
                  <li>Telephone/WhatsApp number</li>
                  <li>Business name and industry</li>
                  <li>Details regarding your business's current lead volume and marketing spend, submitted via our audit form.</li>
                </ul>
              </div>

              <div>
                <h3 className="heading-sm text-navy" style={{ marginBottom: '15px' }}>3. How We Use Your Information</h3>
                <p>
                  We will use your personal information only for the purposes for which it was collected and agreed with you. These purposes include:
                </p>
                <ul style={{ listStyleType: 'disc', paddingLeft: '20px', marginTop: '10px' }}>
                  <li>To provide our automation consulting services to you.</li>
                  <li>To follow up on free audit requests.</li>
                  <li>To confirm and verify your identity or to verify that you are an authorised user for security purposes.</li>
                  <li>For the detection and prevention of fraud, crime, money laundering or other malpractice.</li>
                </ul>
              </div>

              <div>
                <h3 className="heading-sm text-navy" style={{ marginBottom: '15px' }}>4. Data Storage and Security</h3>
                <p>
                  We are legally obliged to provide adequate protection for the personal information we hold and to stop unauthorized access and use of personal information. Our data is stored on secure servers hosted within South Africa via Hetzner SA (xneelo), ensuring full compliance with local data sovereignty requirements under POPIA. We do not transfer your personal data to third parties without your explicit consent.
                </p>
              </div>

              <div>
                <h3 className="heading-sm text-navy" style={{ marginBottom: '15px' }}>5. Your Rights as a Data Subject</h3>
                <p>
                  Under POPIA, you have the right to request a copy of the personal information we hold about you. You also have the right to ask us to update, correct or delete your personal information. To do so, simply contact us at the details provided below and specify what information you require.
                </p>
              </div>

              <div>
                <h3 className="heading-sm text-navy" style={{ marginBottom: '15px' }}>6. Cookies</h3>
                <p>
                  Our website may use cookies to improve user experience and for analytics purposes. You will be prompted with a cookie consent banner upon your first visit to accept or decline the use of non-essential cookies.
                </p>
              </div>

              <div>
                <h3 className="heading-sm text-navy" style={{ marginBottom: '15px' }}>7. Contact Us</h3>
                <p>
                  If you have any queries about this policy, need further information about our privacy practices, wish to withdraw consent, exercise preferences, or access or correct your personal information, please contact us at:
                </p>
                <p style={{ marginTop: '10px', fontWeight: 'bold' }}>privacy@kenganautomation.co.za</p>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
