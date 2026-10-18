import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { whatsappLink } from './config';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Services from './pages/Services';
import CaseStudies from './pages/CaseStudies';
import ROICalculator from './pages/ROICalculator';
import Blog from './pages/Blog';
import FreeAudit from './pages/FreeAudit';
import PrivacyPolicy from './pages/PrivacyPolicy';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Cookie Banner Component
const CookieBanner = () => {
  // Decide visibility once, from storage, during init — wrapped for private mode.
  const [isVisible, setIsVisible] = useState(() => {
    try {
      return !localStorage.getItem('cookieConsent');
    } catch {
      return true;
    }
  });

  const setConsent = (value) => {
    try {
      localStorage.setItem('cookieConsent', value);
    } catch {
      // storage blocked (private mode) — just dismiss for this session
    }
    setIsVisible(false);
  };

  const acceptCookies = () => setConsent('true');
  const declineCookies = () => setConsent('false');

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      left: '20px',
      right: '20px',
      backgroundColor: 'var(--color-secondary)',
      color: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: '20px',
      zIndex: 1000,
      maxWidth: '1200px',
      margin: '0 auto'
    }}>
      <div>
        <p style={{ margin: 0, fontSize: '0.95rem', opacity: 0.9 }}>
          We use cookies to improve your experience and for analytics. Read our <a href="/privacy-policy" style={{ textDecoration: 'underline', color: 'var(--color-accent-2)' }}>Privacy Policy</a> for more information.
        </p>
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button onClick={declineCookies} className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>Decline</button>
        <button onClick={acceptCookies} className="btn btn-accent" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>Accept</button>
      </div>
    </div>
  );
};

// Floating WhatsApp Button
const WhatsAppFloat = () => {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with KenganAutomation on WhatsApp"
      className="wa-float"
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        width: '60px',
        height: '60px',
        backgroundColor: '#25D366',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 6px 20px rgba(37, 211, 102, 0.4)',
        zIndex: 999,
        transition: 'transform 0.3s ease'
      }}
      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
    >
      <svg width="30" height="30" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.031 21.144C10.468 21.144 8.956 20.73 7.618 19.957L7.332 19.789L3.456 20.781L4.475 16.994L4.29 16.697C3.411 15.297 2.946 13.684 2.946 12.022C2.946 6.969 7.02 2.895 12.073 2.895C14.526 2.895 16.822 3.856 18.558 5.603C20.294 7.34 21.25 9.646 21.25 12.096C21.241 17.149 17.167 21.144 12.026 21.144H12.031ZM7.886 18.2C9.13 18.946 10.553 19.349 12.026 19.349C16.182 19.349 19.559 15.972 19.559 11.816C19.559 9.8 18.775 7.896 17.348 6.469C15.922 5.042 14.027 4.258 12.005 4.258C7.848 4.258 4.471 7.635 4.471 11.791C4.471 13.336 4.908 14.823 5.727 16.126L6.082 16.697L5.385 19.262L8.031 18.55L8.577 18.892L7.886 18.2ZM17.159 14.41C17.11 14.331 16.98 14.282 16.719 14.152C16.458 14.022 15.176 13.389 14.948 13.307C14.72 13.226 14.557 13.185 14.394 13.447C14.231 13.708 13.758 14.282 13.611 14.462C13.465 14.642 13.318 14.664 13.057 14.533C12.796 14.403 11.954 14.129 10.957 13.242C10.168 12.544 9.642 11.688 9.495 11.427C9.348 11.166 9.478 11.026 9.61 10.893C9.73 10.774 9.878 10.584 10.01 10.435C10.141 10.286 10.19 10.188 10.288 10.024C10.386 9.86 10.337 9.712 10.272 9.582C10.207 9.451 9.685 8.169 9.473 7.646C9.261 7.124 9.049 7.202 8.902 7.195C8.775 7.188 8.611 7.188 8.448 7.188C8.285 7.188 8.024 7.253 7.796 7.514C7.568 7.775 6.948 8.356 6.948 9.535C6.948 10.714 7.828 11.844 7.958 12.024C8.089 12.204 9.642 14.606 12.036 15.654C13.619 16.348 14.254 16.486 15.021 16.398C15.649 16.326 17.009 15.589 17.288 14.811C17.566 14.033 17.566 13.389 17.484 13.259L17.159 14.41Z" />
      </svg>
    </a>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/roi-calculator" element={<ROICalculator />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/free-audit" element={<FreeAudit />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          </Routes>
        </main>
        <Footer />
        <CookieBanner />
        <WhatsAppFloat />
      </div>
    </Router>
  );
}

export default App;
