import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <Link to="/" className="logo">
          Kengan<span>Automation</span>
        </Link>
        
        <div className="nav-links">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
          <Link to="/services" className={`nav-link ${location.pathname === '/services' ? 'active' : ''}`}>Services</Link>
          <Link to="/case-studies" className={`nav-link ${location.pathname === '/case-studies' ? 'active' : ''}`}>Case Studies</Link>
          <Link to="/roi-calculator" className={`nav-link ${location.pathname === '/roi-calculator' ? 'active' : ''}`}>ROI Calculator</Link>
          <Link to="/blog" className={`nav-link ${location.pathname === '/blog' ? 'active' : ''}`}>Blog</Link>
          <Link to="/free-audit" className="btn btn-primary">Book Free Audit</Link>
        </div>

        <button 
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: 'var(--color-primary)',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
        }}>
          <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link to="/services" onClick={() => setMobileMenuOpen(false)}>Services</Link>
          <Link to="/case-studies" onClick={() => setMobileMenuOpen(false)}>Case Studies</Link>
          <Link to="/roi-calculator" onClick={() => setMobileMenuOpen(false)}>ROI Calculator</Link>
          <Link to="/blog" onClick={() => setMobileMenuOpen(false)}>Blog</Link>
          <Link to="/free-audit" onClick={() => setMobileMenuOpen(false)} style={{ color: 'var(--color-accent-1)', fontWeight: 'bold' }}>Book Free Audit</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
