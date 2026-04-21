import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, Moon, Sun, Globe, X, ArrowRight, Menu, SlidersHorizontal, ShieldCheck, Zap, Truck, Gift, Tag, Sparkles, Shield } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { translationStrings, mockProducts, formatPrice } from '../../data/mockData';

const PROMO_ITEMS = [
  { icon: Truck,     text: 'Free Shipping on orders over Rs. 100,000', highlight: 'FREE SHIPPING' },
  { icon: Zap,       text: 'Flash Sale — Up to 24% off OriginBook Pro', highlight: '24% OFF' },
  { icon: Shield,    text: '100% Authenticity Guaranteed on every product', highlight: 'VERIFIED' },
  { icon: Gift,      text: 'Trade-In your old device — Get instant credit', highlight: 'TRADE-IN' },
  { icon: Tag,       text: 'New Arrivals — Origin Spark 5G now available', highlight: 'NEW' },
  { icon: Sparkles,  text: '12-Month Premium Warranty included free', highlight: 'WARRANTY' },
];

const CATEGORIES = [
  { key: 'all',         label: 'All Products' },
  { key: 'phones',      label: 'Phones' },
  { key: 'tablets',     label: 'Tablets' },
  { key: 'accessories', label: 'Accessories' },
];
const PRICE_MAX_GLOBAL = Math.max(...mockProducts.map(p => p.price));
const SORT_OPTIONS = [
  { value: 'featured',   label: 'Featured' },
  { value: 'price-asc',  label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
  { value: 'rating',     label: 'Top Rated' },
];

const Navbar = () => {
  const { theme, setTheme, language, currency, cart, user } = useAppContext();
  const navigate = useNavigate();
  const t = translationStrings[language] || translationStrings.EN;

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const searchRef = useRef(null);
  const filterRef = useRef(null);

  // Filter states
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterPriceMax, setFilterPriceMax] = useState(PRICE_MAX_GLOBAL);
  const [filterSort, setFilterSort] = useState('featured');
  const [filterInStock, setFilterInStock] = useState(false);
  const [filterVerified, setFilterVerified] = useState(false);

  const activeFilterCount = [
    filterCategory !== 'all',
    filterPriceMax < PRICE_MAX_GLOBAL,
    filterSort !== 'featured',
    filterInStock,
    filterVerified,
  ].filter(Boolean).length;

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
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
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

  const applyFilters = () => {
    const params = new URLSearchParams();
    if (filterCategory !== 'all') params.set('category', filterCategory);
    if (filterPriceMax < PRICE_MAX_GLOBAL) params.set('maxPrice', filterPriceMax);
    if (filterSort !== 'featured') params.set('sort', filterSort);
    if (filterInStock) params.set('inStock', '1');
    if (filterVerified) params.set('verified', '1');
    if (searchQuery.trim()) params.set('q', searchQuery.trim());
    navigate(`/browse${params.toString() ? '?' + params.toString() : ''}`);
    setIsFilterOpen(false);
    clearSearch();
  };

  const resetFilters = () => {
    setFilterCategory('all');
    setFilterPriceMax(PRICE_MAX_GLOBAL);
    setFilterSort('featured');
    setFilterInStock(false);
    setFilterVerified(false);
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
      {/* Promotional Ticker Strip */}
      <div style={{
        background: 'linear-gradient(90deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)',
        overflow: 'hidden', position: 'relative',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        {/* Shimmer overlay */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'linear-gradient(90deg, transparent 0%, rgba(0,74,198,.05) 50%, transparent 100%)',
          animation: 'promoShimmer 4s ease-in-out infinite',
        }}/>
        <div style={{
          display: 'flex', animation: 'promoScroll 35s linear infinite',
          width: 'max-content', alignItems: 'center',
        }}
          onMouseEnter={e => e.currentTarget.style.animationPlayState = 'paused'}
          onMouseLeave={e => e.currentTarget.style.animationPlayState = 'running'}
        >
          {[...PROMO_ITEMS, ...PROMO_ITEMS, ...PROMO_ITEMS].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '7px 32px', whiteSpace: 'nowrap', fontSize: '.76rem',
                color: 'rgba(255,255,255,0.7)', letterSpacing: '.02em',
              }}>
                <Icon size={13} style={{ color: 'rgba(0,150,255,.8)', flexShrink: 0 }}/>
                <span style={{
                  background: 'linear-gradient(90deg, #0070F3, #00C6FF)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                  fontWeight: 700, fontSize: '.68rem', letterSpacing: '.08em',
                  marginRight: 6,
                }}>{item.highlight}</span>
                <span>{item.text}</span>
                <span style={{ margin: '0 12px', color: 'rgba(255,255,255,.15)', fontSize: '.6rem' }}>✦</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top Bar (Language / Currency) */}
      <div style={{ backgroundColor: '#1D1D1F', color: 'rgba(255,255,255,0.8)', padding: '0.3rem 0', fontSize: '0.75rem' }}>
        <div className="container flex justify-between items-center">
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Truck size={13} style={{ opacity: .6 }}/>
            <span>Free shipping on orders over {currency === 'LKR' ? 'Rs. 100,000' : '$300'}</span>
          </div>
          <div className="flex gap-4 items-center">
            <div id="google_translate_element" style={{ lineHeight: 1, display: 'flex', alignItems: 'center' }} />
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

        {/* Search Bar + Filter (Desktop) */}
        <div className="desktop-only" style={{ flex: 1, maxWidth: '480px', margin: '0 2rem', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div ref={searchRef} style={{ flex: 1, position: 'relative' }}>
            <input 
              type="text" 
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={handleSearch}
              onFocus={() => searchQuery.trim().length > 1 && setIsSearchFocused(true)}
              onKeyDown={e => { if (e.key === 'Enter') applyFilters(); }}
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

          {/* Filter Button */}
          <div ref={filterRef} style={{ position: 'relative' }}>
            <button
              onClick={() => setIsFilterOpen(prev => !prev)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                width: 40, height: 40, borderRadius: 'var(--radius-xl)',
                border: isFilterOpen ? '1.5px solid var(--primary-blue)' : '1px solid var(--border-color)',
                backgroundColor: isFilterOpen ? 'rgba(0,74,198,.08)' : 'var(--bg-main)',
                color: isFilterOpen ? 'var(--primary-blue)' : 'var(--text-muted)',
                cursor: 'pointer', position: 'relative', transition: 'all .2s',
              }}
              title="Filters"
            >
              <SlidersHorizontal size={18} />
              {activeFilterCount > 0 && (
                <span style={{
                  position: 'absolute', top: -4, right: -4,
                  width: 18, height: 18, borderRadius: '50%',
                  background: 'var(--primary-blue)', color: '#fff',
                  fontSize: '.65rem', fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>{activeFilterCount}</span>
              )}
            </button>

            {/* Filter Dropdown Panel */}
            {isFilterOpen && (
              <div style={{
                position: 'absolute', top: 'calc(100% + 10px)', right: 0,
                width: 340, backgroundColor: 'var(--bg-surface)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: '0 12px 40px rgba(0,0,0,.15)',
                border: '1px solid var(--border-color)',
                zIndex: 200, animation: 'fadeUp 0.2s ease-out',
                overflow: 'hidden',
              }}>
                {/* Header */}
                <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-main)' }}>Filters</span>
                  <button onClick={resetFilters} style={{ background: 'none', border: 'none', color: 'var(--primary-blue)', fontSize: '.82rem', fontWeight: 600, cursor: 'pointer' }}>Reset all</button>
                </div>

                <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {/* Category */}
                  <div>
                    <label style={{ fontWeight: 700, fontSize: '.78rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', marginBottom: 8, display: 'block' }}>Category</label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {CATEGORIES.map(cat => (
                        <button key={cat.key} onClick={() => setFilterCategory(cat.key)} style={{
                          padding: '6px 14px', borderRadius: 20, cursor: 'pointer',
                          border: filterCategory === cat.key ? '1.5px solid var(--primary-blue)' : '1px solid var(--border-color)',
                          background: filterCategory === cat.key ? 'rgba(0,74,198,.08)' : 'transparent',
                          color: filterCategory === cat.key ? 'var(--primary-blue)' : 'var(--text-main)',
                          fontWeight: filterCategory === cat.key ? 700 : 500, fontSize: '.84rem',
                          transition: 'all .15s',
                        }}>{cat.label}</button>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <label style={{ fontWeight: 700, fontSize: '.78rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', marginBottom: 8, display: 'block' }}>Price Range</label>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.82rem', color: 'var(--text-muted)', marginBottom: 6 }}>
                      <span>{formatPrice(0, currency)}</span>
                      <span style={{ fontWeight: 700, color: 'var(--primary-blue)' }}>{formatPrice(filterPriceMax, currency)}</span>
                    </div>
                    <input type="range" min={0} max={PRICE_MAX_GLOBAL} step={5000} value={filterPriceMax}
                      onChange={e => setFilterPriceMax(Number(e.target.value))}
                      style={{ width: '100%', accentColor: 'var(--primary-blue)', cursor: 'pointer' }}
                    />
                    {/* Quick price chips */}
                    <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                      {[50000, 100000, 200000].map(v => (
                        <button key={v} onClick={() => setFilterPriceMax(v)} style={{
                          padding: '4px 10px', borderRadius: 14, fontSize: '.75rem', cursor: 'pointer',
                          border: filterPriceMax === v ? '1.5px solid var(--primary-blue)' : '1px solid var(--border-color)',
                          background: filterPriceMax === v ? 'rgba(0,74,198,.08)' : 'transparent',
                          color: filterPriceMax === v ? 'var(--primary-blue)' : 'var(--text-muted)',
                          fontWeight: 600,
                        }}>Under {formatPrice(v, currency)}</button>
                      ))}
                    </div>
                  </div>

                  {/* Sort By */}
                  <div>
                    <label style={{ fontWeight: 700, fontSize: '.78rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', marginBottom: 8, display: 'block' }}>Sort By</label>
                    <select value={filterSort} onChange={e => setFilterSort(e.target.value)} style={{
                      width: '100%', padding: '.6rem .9rem', borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-main)',
                      color: 'var(--text-main)', outline: 'none', fontSize: '.88rem', cursor: 'pointer',
                    }}>
                      {SORT_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                    </select>
                  </div>

                  {/* Toggles */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: '.9rem' }}>
                      <input type="checkbox" checked={filterInStock} onChange={e => setFilterInStock(e.target.checked)}
                        style={{ accentColor: 'var(--primary-blue)', width: 16, height: 16 }}/>
                      In Stock Only
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: '.9rem' }}>
                      <input type="checkbox" checked={filterVerified} onChange={e => setFilterVerified(e.target.checked)}
                        style={{ accentColor: 'var(--primary-blue)', width: 16, height: 16 }}/>
                      <ShieldCheck size={14} style={{ color: '#10B981' }}/> Verified Authentic
                    </label>
                  </div>
                </div>

                {/* Apply Button */}
                <div style={{ padding: '1rem 1.25rem', borderTop: '1px solid var(--border-color)', display: 'flex', gap: 10 }}>
                  <button onClick={() => { resetFilters(); setIsFilterOpen(false); }} style={{
                    flex: 1, padding: '.7rem', borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)', background: 'var(--bg-main)',
                    color: 'var(--text-main)', fontSize: '.9rem', fontWeight: 600, cursor: 'pointer',
                  }}>Clear</button>
                  <button onClick={applyFilters} style={{
                    flex: 2, padding: '.7rem', borderRadius: 'var(--radius-md)',
                    border: 'none', background: 'var(--primary-blue)',
                    color: '#fff', fontSize: '.9rem', fontWeight: 700, cursor: 'pointer',
                  }}>Apply Filters{activeFilterCount > 0 ? ` (${activeFilterCount})` : ''}</button>
                </div>
              </div>
            )}
          </div>
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
        @keyframes promoScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes promoShimmer {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
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
