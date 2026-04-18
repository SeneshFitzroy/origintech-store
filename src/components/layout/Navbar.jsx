import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, Moon, Sun, Globe, X, ArrowRight, Menu } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { translationStrings, mockProducts, formatPrice } from '../../data/mockData';

const Navbar = () => {
  const { theme, setTheme, language, setLanguage, currency, setCurrency, cart, user } = useAppContext();
  const navigate = useNavigate();
  const t = translationStrings[language] || translationStrings.EN;

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const searchRef = useRef(null);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Scroll state for blur effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close search results on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim().length > 1) {
      const filtered = mockProducts.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) || 
        p.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5); // Limit to 5 suggestions
      setSearchResults(filtered);
      setIsSearchFocused(true);
    } else {
      setSearchResults([]);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setIsSearchFocused(false);
  };

  const handleResultClick = (productId) => {
    navigate(`/product/${productId}`);
    clearSearch();
  };

  return (
    <header style={{ 
      position: 'sticky', top: 0, zIndex: 100,
      backgroundColor: scrolled ? (theme === 'dark' ? 'rgba(28,28,30,0.72)' : 'rgba(255,255,255,0.72)') : 'var(--bg-surface)',
      backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
      borderBottom: '1px solid var(--border-color)',
      boxShadow: scrolled ? '0 1px 0 rgba(0,0,0,0.08)' : 'none',
      transition: 'all 0.3s ease',
    }}>
      {/* Top Banner (Settings) */}
      <div style={{ backgroundColor: '#1D1D1F', color: 'rgba(255,255,255,0.8)', padding: '0.3rem 0', fontSize: '0.75rem' }}>
        <div className="container flex justify-between items-center">
          <div>Free shipping on orders over {currency === 'LKR' ? 'Rs. 100,000' : '$300'}</div>
          <div className="flex gap-4 items-center">
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
              style={{ background: 'transparent', color: 'white', border: 'none', outline: 'none', cursor: 'pointer' }}
            >
              <option value="EN" style={{color: 'black'}}>English</option>
              <option value="SI" style={{color: 'black'}}>Sinhala</option>
              <option value="TA" style={{color: 'black'}}>Tamil</option>
            </select>
            <select 
              value={currency} 
              onChange={(e) => setCurrency(e.target.value)}
              style={{ background: 'transparent', color: 'white', border: 'none', outline: 'none', cursor: 'pointer' }}
            >
              <option value="LKR" style={{color: 'black'}}>LKR</option>
              <option value="USD" style={{color: 'black'}}>USD</option>
              <option value="GBP" style={{color: 'black'}}>GBP</option>
              <option value="EUR" style={{color: 'black'}}>EUR</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="container flex justify-between items-center" style={{ padding: '1rem' }}>
        <div className="flex items-center gap-4">
          <button 
            className="mobile-only" 
            onClick={() => setIsMobileMenuOpen(true)}
            style={{ color: 'var(--text-main)' }}
          >
            <Menu size={24} />
          </button>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            <svg width="28" height="28" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="40" rx="10" fill="var(--primary-blue)"/>
              <path d="M20 8L28 14V26L20 32L12 26V14L20 8Z" stroke="#fff" strokeWidth="1.8" fill="none"/>
              <circle cx="20" cy="20" r="5" stroke="#fff" strokeWidth="1.8" fill="none"/>
              <path d="M20 15V25M15 20H25" stroke="#fff" strokeWidth="1.2" opacity=".5"/>
            </svg>
            <span style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--text-main)', letterSpacing: '-0.03em' }}>OriginTech</span>
          </Link>
        </div>

        {/* Search Bar (Desktop) */}
        <div ref={searchRef} className="desktop-only" style={{ flex: 1, maxWidth: '400px', margin: '0 2rem', position: 'relative' }}>
          <input 
            type="text" 
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={handleSearch}
            onFocus={() => searchQuery.trim().length > 1 && setIsSearchFocused(true)}
            style={{
              width: '100%', padding: '0.65rem 1rem 0.65rem 2.6rem',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-main)',
              color: 'var(--text-main)',
              outline: 'none',
              transition: 'border-color 0.2s',
              borderColor: isSearchFocused ? 'var(--primary-blue)' : 'var(--border-color)'
            }}
          />
          <Search size={18} style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          
          {searchQuery && (
            <X 
              size={16} 
              onClick={clearSearch}
              style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', cursor: 'pointer' }} 
            />
          )}

          {/* Search Suggestions Dropdown */}
          {isSearchFocused && searchResults.length > 0 && (
            <div style={{
              position: 'absolute', top: '110%', left: 0, right: 0,
              backgroundColor: 'var(--bg-surface)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-lg)',
              border: '1px solid var(--border-color)',
              overflow: 'hidden',
              animation: 'fadeUp 0.2s ease-out'
            }}>
              <div style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', borderBottom: '1px solid var(--border-color)', backgroundColor: 'var(--bg-soft)' }}>
                Suggestions
              </div>
              {searchResults.map(result => (
                <div 
                  key={result.id}
                  onClick={() => handleResultClick(result.id)}
                  style={{
                    padding: '0.75rem 1rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--bg-soft)'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <div style={{ width: '40px', height: '40px', borderRadius: '8px', background: 'var(--bg-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-color)' }}>
                    <img src={result.image} alt={result.name} style={{ width: '30px', height: '30px', objectFit: 'contain' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-main)' }}>{result.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{result.category}</div>
                  </div>
                  <div style={{ fontWeight: 700, color: 'var(--primary-blue)', fontSize: '0.9rem' }}>
                    {formatPrice(result.price, currency)}
                  </div>
                </div>
              ))}
              <Link 
                to="/browse" 
                onClick={clearSearch}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  padding: '0.75rem', borderTop: '1px solid var(--border-color)',
                  color: 'var(--primary-blue)', fontWeight: 600, fontSize: '0.85rem',
                  textDecoration: 'none', backgroundColor: 'var(--bg-soft)'
                }}
              >
                View all results <ArrowRight size={14} />
              </Link>
            </div>
          )}
        </div>

        {/* Categories (Desktop) */}
        <nav className="desktop-only flex gap-8" style={{ fontWeight: 400, fontSize: '0.88rem' }}>
          <Link to="/browse?category=phones" style={{ color: 'var(--text-main)', textDecoration: 'none', transition: 'color 0.2s' }}>{t.phones}</Link>
          <Link to="/browse?category=tablets" style={{ color: 'var(--text-main)', textDecoration: 'none' }}>{t.tablets}</Link>
          <Link to="/browse?category=accessories" style={{ color: 'var(--text-main)', textDecoration: 'none' }}>{t.accessories}</Link>
        </nav>

        {/* Actions */}
        <div className="flex gap-4 items-center">
          <button className="desktop-only" onClick={toggleTheme} style={{ color: 'var(--text-main)', background: 'none', border: 'none', cursor: 'pointer' }}>
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <Link to={user ? "/dashboard" : "/login"} style={{ color: 'var(--text-main)' }}>
            <User size={20} />
          </Link>
          
          <Link to="/cart" style={{ color: 'var(--text-main)', position: 'relative' }}>
            <ShoppingCart size={20} />
            {cart.length > 0 && (
              <span style={{
                position: 'absolute', top: '-8px', right: '-8px',
                backgroundColor: 'var(--primary-blue)', color: 'white',
                fontSize: '0.7rem', fontWeight: 'bold', width: '16px', height: '16px',
                borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                {cart.length}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Menu Sidebar */}
      {isMobileMenuOpen && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)',
          animation: 'fadeIn 0.2s ease-out'
        }} onClick={() => setIsMobileMenuOpen(false)}>
          <div 
            style={{
              width: '80%', maxWidth: '320px', height: '100%',
              backgroundColor: 'var(--bg-surface)',
              padding: '2rem',
              animation: 'slideIn 0.3s ease-out',
              overflowY: 'auto',
              display: 'flex', flexDirection: 'column',
            }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex justify-between items-center" style={{ marginBottom: '2.5rem' }}>
              <span style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '1.1rem', letterSpacing: '-.02em' }}>Menu</span>
              <button onClick={() => setIsMobileMenuOpen(false)} style={{ color: 'var(--text-main)', background: 'none', border: 'none', cursor: 'pointer' }}><X size={22} /></button>
            </div>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1 }}>
              {[
                { to: '/', label: t.home || 'Home' },
                { to: '/browse?category=phones', label: t.phones },
                { to: '/browse?category=tablets', label: t.tablets },
                { to: '/browse?category=accessories', label: t.accessories },
              ].map((link, i) => (
                <Link key={i} to={link.to} onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    padding: '0.85rem 0.75rem', borderRadius: 'var(--radius-md)',
                    fontSize: '1rem', fontWeight: 500, color: 'var(--text-main)',
                    textDecoration: 'none', transition: 'background 0.15s',
                  }}
                  onMouseOver={e => e.currentTarget.style.background = 'var(--bg-soft)'}
                  onMouseOut={e => e.currentTarget.style.background = ''}
                >
                  {link.label}
                </Link>
              ))}
              
              <div style={{ height: '1px', backgroundColor: 'var(--border-color)', margin: '0.75rem 0' }} />
              
              <Link to="/support" onClick={() => setIsMobileMenuOpen(false)}
                style={{ padding: '0.85rem 0.75rem', borderRadius: 'var(--radius-md)', fontSize: '1rem', fontWeight: 500, color: 'var(--text-main)', textDecoration: 'none' }}
              >Support</Link>
              <Link to="/tracking" onClick={() => setIsMobileMenuOpen(false)}
                style={{ padding: '0.85rem 0.75rem', borderRadius: 'var(--radius-md)', fontSize: '1rem', fontWeight: 500, color: 'var(--text-main)', textDecoration: 'none' }}
              >Order Tracking</Link>
              
              <div style={{ marginTop: 'auto', paddingTop: '1.5rem' }}>
                <button onClick={toggleTheme} className="flex items-center gap-2" style={{ 
                  width: '100%', padding: '0.85rem', borderRadius: 'var(--radius-md)', 
                  background: 'var(--bg-soft)', border: '1px solid var(--border-color)',
                  color: 'var(--text-main)', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 500,
                }}>
                  {theme === 'dark' ? <><Sun size={18} /> Light Mode</> : <><Moon size={18} /> Dark Mode</>}
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from { transform: translateX(-100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
