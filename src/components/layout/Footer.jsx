import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowUp, Mail, Smartphone, Laptop, Headphones, RefreshCw, HelpCircle, MapPin, Phone, ExternalLink } from 'lucide-react';

const SocialIcon = ({ href, label, children }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
    style={{
      width: 38, height: 38, borderRadius: 10,
      background: 'rgba(255,255,255,0.08)',
      border: '1px solid rgba(255,255,255,0.12)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: 'rgba(255,255,255,0.65)', transition: 'all .22s', textDecoration: 'none',
      fontSize: '1rem',
    }}
    onMouseOver={e => { e.currentTarget.style.background = 'var(--primary-blue)'; e.currentTarget.style.borderColor = 'var(--primary-blue)'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
    onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.color = 'rgba(255,255,255,0.65)'; e.currentTarget.style.transform = ''; }}>
    {children}
  </a>
);

const FooterLink = ({ to, children }) => (
  <li>
    <Link to={to} style={{ color: 'rgba(255,255,255,0.55)', fontSize: '.9rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6, transition: 'color .2s, gap .2s' }}
      onMouseOver={e => { e.currentTarget.style.color = '#60A5FA'; e.currentTarget.style.gap = '10px'; }}
      onMouseOut={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.55)'; e.currentTarget.style.gap = '6px'; }}>
      <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--primary-blue)', flexShrink: 0 }}/>
      {children}
    </Link>
  </li>
);

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subOk, setSubOk] = useState(false);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const handleSub = (e) => {
    e.preventDefault();
    if (email) { setSubOk(true); setEmail(''); }
  };

  return (
    <footer style={{ backgroundColor: '#060E1F', color: '#fff', marginTop: 'auto', position: 'relative' }}>

      {/* Newsletter band */}
      <div style={{
        background: 'linear-gradient(135deg, #1E3A5F 0%, #162D4A 100%)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        padding: '3rem 1rem',
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}>
          <div>
            <h3 style={{ fontWeight: 800, fontSize: '1.4rem', marginBottom: '.4rem' }}>Stay in the loop</h3>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '.92rem' }}>Drops, deals & tech news — straight to your inbox.</p>
          </div>
          {subOk ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#4ADE80', fontWeight: 700, fontSize: '.95rem' }}>
              <ShieldCheck size={20}/> Subscribed! Thanks for joining.
            </div>
          ) : (
            <form onSubmit={handleSub} style={{ display: 'flex', gap: 10, flex: '0 0 auto', flexWrap: 'wrap' }}>
              <input type="email" required placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)}
                style={{
                  padding: '.75rem 1.1rem', borderRadius: 10,
                  border: '1px solid rgba(255,255,255,0.18)',
                  background: 'rgba(255,255,255,0.08)',
                  color: '#fff', outline: 'none', fontSize: '.9rem',
                  minWidth: 220,
                }}
                onFocus={e => e.target.style.borderColor = 'var(--primary-blue)'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.18)'}
              />
              <button type="submit" style={{
                padding: '.75rem 1.5rem', borderRadius: 10,
                background: 'var(--primary-blue)', color: '#fff',
                border: 'none', fontWeight: 700, cursor: 'pointer', fontSize: '.9rem',
                transition: 'opacity .2s',
              }}
                onMouseOver={e => e.currentTarget.style.opacity = '.85'}
                onMouseOut={e => e.currentTarget.style.opacity = '1'}>
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Main grid */}
      <div className="container" style={{ padding: '4rem 1rem 3rem', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '3rem' }}>

        {/* Brand column */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '1.1rem' }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--primary-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck size={20} color="#fff"/>
            </div>
            <span style={{ fontWeight: 800, fontSize: '1.35rem', letterSpacing: '-.02em' }}>OriginTech</span>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '.88rem', lineHeight: 1.75, marginBottom: '1.5rem', maxWidth: 280 }}>
            Sri Lanka's premium electronics marketplace with blockchain-verified authenticity, unbeatable trade-in values, and 12-month premium warranty.
          </p>

          {/* Social */}
          <div style={{ display: 'flex', gap: 8, marginBottom: '2rem' }}>
            <SocialIcon href="https://facebook.com" label="Facebook">f</SocialIcon>
            <SocialIcon href="https://instagram.com" label="Instagram">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>
            </SocialIcon>
            <SocialIcon href="https://twitter.com" label="X / Twitter">𝕏</SocialIcon>
            <SocialIcon href="https://youtube.com" label="YouTube">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M23 7s-.3-2-1.2-2.7c-1.1-1.2-2.4-1.2-3-1.3C16.4 3 12 3 12 3s-4.4 0-6.8.2c-.6.1-1.9.1-3 1.3C1.3 5 1 7 1 7S.7 9.1.7 11.3v2c0 2.2.3 4.3.3 4.3s.3 2 1.2 2.7c1.1 1.2 2.6 1.1 3.3 1.2C7.3 21.7 12 21.7 12 21.7s4.4 0 6.8-.3c.6-.1 1.9-.1 3-1.3.9-.7 1.2-2.7 1.2-2.7s.3-2.1.3-4.3v-2C23.3 9 23 7 23 7zm-13.5 8.8V8.2l8.1 3.8-8.1 3.8z"/></svg>
            </SocialIcon>
          </div>

          {/* Contact mini */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { icon: <Phone size={13}/>, text: '+94 11 234 5678' },
              { icon: <Mail size={13}/>, text: 'support@origintech.lk' },
              { icon: <MapPin size={13}/>, text: '123 Tech Ave, Colombo 00100' },
            ].map((c, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.45)', fontSize: '.8rem' }}>
                <span style={{ color: 'var(--primary-blue)' }}>{c.icon}</span>
                {c.text}
              </div>
            ))}
          </div>
        </div>

        {/* Shop */}
        <div>
          <h4 style={{ fontWeight: 700, marginBottom: '1.25rem', fontSize: '.8rem', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'rgba(255,255,255,0.35)' }}>Shop</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
            <FooterLink to="/browse?category=phones"><Smartphone size={12}/> Phones</FooterLink>
            <FooterLink to="/browse?category=tablets"><Laptop size={12}/> Laptops & Tablets</FooterLink>
            <FooterLink to="/browse?category=accessories"><Headphones size={12}/> Accessories</FooterLink>
            <FooterLink to="/trade-in"><RefreshCw size={12}/> Trade-In Programme</FooterLink>
            <FooterLink to="/pre-order">Pre-Order</FooterLink>
            <FooterLink to="/authenticity">Authenticity Check</FooterLink>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 style={{ fontWeight: 700, marginBottom: '1.25rem', fontSize: '.8rem', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'rgba(255,255,255,0.35)' }}>Support</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
            <FooterLink to="/support"><HelpCircle size={12}/> Help Center</FooterLink>
            <FooterLink to="/tracking">Order Tracking</FooterLink>
            <FooterLink to="/support">Contact Us</FooterLink>
            <FooterLink to="/support">Returns & Refunds</FooterLink>
            <FooterLink to="/support">Warranty Claims</FooterLink>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 style={{ fontWeight: 700, marginBottom: '1.25rem', fontSize: '.8rem', textTransform: 'uppercase', letterSpacing: '1.5px', color: 'rgba(255,255,255,0.35)' }}>Company</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
            <FooterLink to="/about">About Us</FooterLink>
            <FooterLink to="/careers">Careers</FooterLink>
            <FooterLink to="/press">Press & Media</FooterLink>
            <FooterLink to="/admin/login">Admin Portal</FooterLink>
            <FooterLink to="/agent/login">Agent Portal</FooterLink>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div className="container" style={{
          padding: '1.5rem 1rem',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '1rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '.82rem' }}>© 2026 OriginTech (Pvt) Ltd. All rights reserved.</span>
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((l, i) => (
              <Link key={i} to={`/${l.toLowerCase().replace(/ /g, '-')}`}
                style={{ color: 'rgba(255,255,255,0.35)', fontSize: '.8rem', textDecoration: 'none', transition: 'color .2s' }}
                onMouseOver={e => e.currentTarget.style.color = '#60A5FA'}
                onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.35)'}>
                {l}
              </Link>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Payment icons */}
            {['VISA', 'MC', 'PayPal'].map(p => (
              <span key={p} style={{
                padding: '.3rem .6rem', border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 5, fontSize: '.65rem', fontWeight: 700,
                color: 'rgba(255,255,255,0.45)', letterSpacing: '1px',
              }}>{p}</span>
            ))}
            <button onClick={scrollTop}
              aria-label="Back to top"
              style={{
                width: 36, height: 36, borderRadius: 9,
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.15)',
                color: 'rgba(255,255,255,0.6)', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all .2s',
              }}
              onMouseOver={e => { e.currentTarget.style.background = 'var(--primary-blue)'; e.currentTarget.style.borderColor = 'var(--primary-blue)'; e.currentTarget.style.color = '#fff'; }}
              onMouseOut={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}>
              <ArrowUp size={15}/>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile responsive */}
      <style dangerouslySetInnerHTML={{__html:`
        @media(max-width:900px){
          .footer-grid{ grid-template-columns:1fr 1fr!important; }
        }
        @media(max-width:580px){
          .footer-grid{ grid-template-columns:1fr!important; }
        }
      `}}/>
    </footer>
  );
};

export default Footer;
