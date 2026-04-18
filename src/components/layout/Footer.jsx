import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer style={{ backgroundColor: '#060E1F', color: '#fff', marginTop: 'auto' }}>

      {/* ── Main Footer ── */}
      <div className="container footer-main" style={{
        padding: '3.5rem 1rem 2.5rem',
        display: 'grid',
        gridTemplateColumns: '1.5fr 1fr 1fr 1fr',
        gap: '2.5rem',
      }}>
        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1rem' }}>
            <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
              <rect width="40" height="40" rx="10" fill="var(--primary-blue)"/>
              <path d="M20 8L28 14V26L20 32L12 26V14L20 8Z" stroke="#fff" strokeWidth="1.8" fill="none"/>
              <circle cx="20" cy="20" r="5" stroke="#fff" strokeWidth="1.8" fill="none"/>
            </svg>
            <span style={{ fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-.02em' }}>OriginTech</span>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '.82rem', lineHeight: 1.7, marginBottom: '1.25rem', maxWidth: 260 }}>
            Sri Lanka's premium electronics marketplace. Verified authenticity, instant trade-in & 12-month warranty.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {[
              { icon: <Phone size={12}/>, text: '+94 11 234 5678' },
              { icon: <Mail size={12}/>, text: 'support@origintech.lk' },
              { icon: <MapPin size={12}/>, text: 'Colombo, Sri Lanka' },
            ].map((c, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 7, color: 'rgba(255,255,255,0.4)', fontSize: '.78rem' }}>
                <span style={{ color: 'var(--primary-blue)', flexShrink: 0 }}>{c.icon}</span>
                {c.text}
              </div>
            ))}
          </div>
        </div>

        {/* Shop */}
        <div>
          <h4 style={{ fontWeight: 600, marginBottom: '1rem', fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'rgba(255,255,255,0.3)' }}>Shop</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '.6rem' }}>
            {[
              { to: '/browse?category=phones', label: 'Phones' },
              { to: '/browse?category=tablets', label: 'Laptops & Tablets' },
              { to: '/browse?category=accessories', label: 'Accessories' },
              { to: '/trade-in', label: 'Trade-In' },
              { to: '/pre-order', label: 'Pre-Order' },
            ].map((link, i) => (
              <li key={i}>
                <Link to={link.to} className="footer-link">{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 style={{ fontWeight: 600, marginBottom: '1rem', fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'rgba(255,255,255,0.3)' }}>Support</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '.6rem' }}>
            {[
              { to: '/support', label: 'Help Center' },
              { to: '/tracking', label: 'Order Tracking' },
              { to: '/authenticity', label: 'Verify Product' },
              { to: '/support', label: 'Returns & Refunds' },
            ].map((link, i) => (
              <li key={i}>
                <Link to={link.to} className="footer-link">{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 style={{ fontWeight: 600, marginBottom: '1rem', fontSize: '.72rem', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'rgba(255,255,255,0.3)' }}>Company</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '.6rem' }}>
            {[
              { to: '/about', label: 'About Us' },
              { to: '/careers', label: 'Careers' },
              { to: '/press', label: 'Press' },
            ].map((link, i) => (
              <li key={i}>
                <Link to={link.to} className="footer-link">{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container footer-bottom" style={{
          padding: '1.25rem 1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '.75rem',
        }}>
          <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '.78rem' }}>
            \u00A9 2026 OriginTech (Pvt) Ltd.
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            {['Privacy', 'Terms', 'Cookies'].map((l, i) => (
              <Link key={i} to={`/${l.toLowerCase()}`}
                className="footer-link" style={{ fontSize: '.75rem' }}>
                {l}
              </Link>
            ))}
            <button onClick={scrollTop} aria-label="Back to top"
              style={{
                width: 32, height: 32, borderRadius: 8,
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'rgba(255,255,255,0.5)', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all .2s',
              }}
              onMouseOver={e => { e.currentTarget.style.background = 'var(--primary-blue)'; e.currentTarget.style.color = '#fff'; }}
              onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}>
              <ArrowUp size={14}/>
            </button>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .footer-link {
          color: rgba(255,255,255,0.45);
          font-size: .82rem;
          text-decoration: none;
          transition: color .2s;
        }
        .footer-link:hover {
          color: #4d94ff;
        }
        @media (max-width: 768px) {
          .footer-main {
            grid-template-columns: 1fr 1fr !important;
            gap: 2rem !important;
            padding: 2.5rem 1rem 2rem !important;
          }
        }
        @media (max-width: 480px) {
          .footer-main {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
            padding: 2rem 1rem 1.5rem !important;
          }
          .footer-bottom {
            flex-direction: column;
            align-items: flex-start !important;
            gap: .5rem !important;
          }
        }
      `}} />
    </footer>
  );
};

export default Footer;
