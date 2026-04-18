import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Filter, Heart, ShieldCheck, Star, SlidersHorizontal, X, Smartphone, Laptop, Monitor } from 'lucide-react';
import { mockProducts, formatPrice, translationStrings } from '../../data/mockData';
import { useAppContext } from '../../context/AppContext';

const CATEGORIES = [
  { key: 'all',        label: 'All Products' },
  { key: 'phones',     label: 'Phones' },
  { key: 'tablets',    label: 'Tablets' },
  { key: 'accessories',label: 'Accessories' },
];

const PRICE_MIN_GLOBAL = 0;
const PRICE_MAX_GLOBAL = Math.max(...mockProducts.map(p => p.price));

const Browse = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');
  const { currency, language } = useAppContext();
  const t = translationStrings[language] || translationStrings.EN;

  const [searchTerm, setSearchTerm]           = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'all');
  const [sortBy, setSortBy]                   = useState('featured');
  const [priceMax, setPriceMax]               = useState(PRICE_MAX_GLOBAL);
  const [inStockOnly, setInStockOnly]         = useState(false);
  const [verifiedOnly, setVerifiedOnly]       = useState(false);
  const [wishlist, setWishlist]               = useState([]);
  const [sidebarOpen, setSidebarOpen]         = useState(false);

  useEffect(() => { setSelectedCategory(categoryParam || 'all'); }, [categoryParam]);

  const toggleWishlist = (id) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const filteredProducts = useMemo(() => {
    const base = mockProducts.filter(p => {
      if (!p.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
      if (selectedCategory !== 'all' && p.category.toLowerCase() !== selectedCategory.toLowerCase()) return false;
      if (p.price > priceMax) return false;
      if (inStockOnly && !p.inStock) return false;
      if (verifiedOnly && !p.isAuthentic) return false;
      return true;
    });
    return [...base].sort((a, b) => {
      if (sortBy === 'price-asc')  return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating')     return b.rating - a.rating;
      return 0;
    });
  }, [searchTerm, selectedCategory, sortBy, priceMax, inStockOnly, verifiedOnly]);

  const SidebarContent = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Category */}
      <div>
        <h4 style={{ fontWeight: 700, marginBottom: '0.85rem', display: 'flex', alignItems: 'center', gap: 6, fontSize: '.88rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)' }}>
          <Filter size={14}/> {t.category || 'Category'}
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {CATEGORIES.map(cat => (
            <button key={cat.key} onClick={() => setSelectedCategory(cat.key)} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '.65rem .9rem', borderRadius: 10, cursor: 'pointer', border: 'none',
              fontWeight: selectedCategory === cat.key ? 700 : 400,
              background: selectedCategory === cat.key ? 'var(--primary-blue)' : 'transparent',
              color: selectedCategory === cat.key ? '#fff' : 'var(--text-main)',
              transition: 'all .2s', textAlign: 'left', fontSize: '.92rem',
            }}
              onMouseOver={e=>{ if (selectedCategory !== cat.key) e.currentTarget.style.background='var(--bg-main)'; }}
              onMouseOut={e=>{ if (selectedCategory !== cat.key) e.currentTarget.style.background='transparent'; }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 style={{ fontWeight: 700, marginBottom: '.85rem', fontSize: '.88rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)' }}>
          {t.priceRange || 'Price Range'}
        </h4>
        <div style={{ fontSize: '.83rem', color: 'var(--text-muted)', marginBottom: '.65rem', display: 'flex', justifyContent: 'space-between' }}>
          <span>{formatPrice(PRICE_MIN_GLOBAL, currency)}</span>
          <span style={{ fontWeight: 700, color: 'var(--primary-blue)' }}>{formatPrice(priceMax, currency)}</span>
        </div>
        <input type="range"
          min={PRICE_MIN_GLOBAL} max={PRICE_MAX_GLOBAL} step={5000}
          value={priceMax}
          onChange={e => setPriceMax(Number(e.target.value))}
          style={{ width: '100%', accentColor: 'var(--primary-blue)', cursor: 'pointer' }}
        />
        <button onClick={() => setPriceMax(PRICE_MAX_GLOBAL)}
          style={{ marginTop: '0.5rem', background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '.78rem', cursor: 'pointer', padding: 0 }}>
          Reset
        </button>
      </div>

      {/* Status */}
      <div>
        <h4 style={{ fontWeight: 700, marginBottom: '.85rem', fontSize: '.88rem', textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)' }}>
          {t.status || 'Status'}
        </h4>
        <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', marginBottom: '0.6rem', fontSize: '.92rem' }}>
          <input type="checkbox" checked={inStockOnly} onChange={e => setInStockOnly(e.target.checked)}
            style={{ accentColor: 'var(--primary-blue)', width: 16, height: 16 }}/>
          {t.inStockOnly || 'In Stock Only'}
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: '.92rem' }}>
          <input type="checkbox" checked={verifiedOnly} onChange={e => setVerifiedOnly(e.target.checked)}
            style={{ accentColor: 'var(--primary-blue)', width: 16, height: 16 }}/>
          <ShieldCheck size={14} style={{ color: '#10B981' }}/> {t.verifiedOnly || 'Verified Authentic'}
        </label>
      </div>
    </div>
  );

  return (
    <div style={{ backgroundColor: 'var(--bg-main)', minHeight: '100vh' }}>

      {/* Premium Page Header */}
      <div className="page-header">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: '1.25rem' }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(59,130,246,.1)', border: '1px solid rgba(59,130,246,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Smartphone size={18} style={{ color: '#60A5FA' }}/>
            </div>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(59,130,246,.1)', border: '1px solid rgba(59,130,246,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Laptop size={18} style={{ color: '#60A5FA' }}/>
            </div>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(59,130,246,.1)', border: '1px solid rgba(59,130,246,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Monitor size={18} style={{ color: '#60A5FA' }}/>
            </div>
          </div>
          <h1>Browse Products</h1>
          <p>Discover verified smartphones, laptops, and accessories with authenticity guaranteed</p>
        </div>
      </div>
      {/* Mobile filter drawer */}
      {sidebarOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex' }}>
          <div style={{ flex: 1, background: 'rgba(0,0,0,.45)', backdropFilter: 'blur(4px)' }}
            onClick={() => setSidebarOpen(false)}/>
          <div style={{
            width: 300, background: 'var(--bg-surface)', padding: '2rem 1.5rem',
            overflowY: 'auto', boxShadow: '-8px 0 40px rgba(0,0,0,.2)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>Filters</span>
              <button onClick={() => setSidebarOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                <X size={16}/>
              </button>
            </div>
            <SidebarContent/>
          </div>
        </div>
      )}

      <div className="container" style={{ padding: 'clamp(1.5rem,5vw,3rem) 1rem' }}>
        {/* Results count */}
        <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '.2rem', color: 'var(--text-main)' }}>
              {CATEGORIES.find(c => c.key === selectedCategory)?.label || 'All Products'}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '.88rem' }}>
              {filteredProducts.length} {t.results || 'result'}{filteredProducts.length !== 1 ? 's' : ''} found
            </p>
          </div>
        </div>

        {/* Top bar: search + mobile filter + sort */}
        <div style={{ display: 'flex', gap: 12, marginBottom: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: '1 1 220px' }}>
            <input type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{
                width: '100%', padding: '.75rem 1rem .75rem 2.5rem',
                borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-surface)', color: 'var(--text-main)',
                fontSize: '.95rem', outline: 'none', transition: 'border-color .2s',
              }}
              onFocus={e=>e.target.style.borderColor='var(--primary-blue)'}
              onBlur={e=>e.target.style.borderColor='var(--border-color)'}
            />
            <Search size={16} style={{ position: 'absolute', left: '.8rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}/>
          </div>

          <button onClick={() => setSidebarOpen(true)}
            style={{
              display: 'none', /* shown via media query below */
              alignItems: 'center', gap: 6,
              padding: '.75rem 1.15rem', borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)', background: 'var(--bg-surface)',
              color: 'var(--text-main)', fontWeight: 600, fontSize: '.9rem', cursor: 'pointer',
            }}
            className="browse-filter-btn">
            <SlidersHorizontal size={15}/> Filters
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '.85rem', whiteSpace: 'nowrap' }}>Sort by:</span>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={{
              padding: '.6rem .9rem', borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-surface)', color: 'var(--text-main)',
              outline: 'none', fontSize: '.88rem', cursor: 'pointer',
            }}>
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        <style dangerouslySetInnerHTML={{__html:`
          @media(max-width:768px){
            .browse-filter-btn{ display:flex!important; }
            .browse-sidebar-desktop{ display:none!important; }
          }
        `}}/>

        <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
          {/* Desktop Sidebar */}
          <aside className="browse-sidebar-desktop" style={{
            width: 230, flexShrink: 0,
            background: 'var(--bg-surface)',
            padding: '1.75rem 1.5rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-color)',
            position: 'sticky', top: 90,
          }}>
            <SidebarContent/>
          </aside>

          {/* Product Grid */}
          <div style={{ flex: '1 1 280px', minWidth: 0 }}>
            {filteredProducts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '6rem 0', color: 'var(--text-muted)' }}>
                <Search size={48} style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}/>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '.75rem' }}>
                  {t.noProducts || 'No products found'}
                </h3>
                <p>{t.adjustFilters || 'Try adjusting your filters or search term.'}</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(230px,1fr))', gap: '1.5rem' }}>
                {filteredProducts.map(product => (
                  <div key={product.id}
                    style={{
                      background: 'var(--bg-surface)',
                      borderRadius: 18,
                      border: '1px solid var(--border-color)',
                      overflow: 'hidden',
                      display: 'flex', flexDirection: 'column',
                      transition: 'transform .3s ease, box-shadow .3s ease',
                    }}
                    onMouseOver={e=>{ e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='0 12px 28px rgba(0,0,0,.08)'; }}
                    onMouseOut={e=>{ e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow=''; }}
                  >
                    {/* image area */}
                    <div style={{
                      position: 'relative',
                      background: 'var(--bg-soft)',
                      padding: '1.5rem',
                      height: 210,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {/* badge */}
                      {product.badges[0] && (
                        <span style={{
                          position: 'absolute', top: 10, left: 10,
                          background: 'var(--primary-blue)', color: '#fff',
                          padding: '.2rem .55rem', borderRadius: 6,
                          fontSize: '.62rem', fontWeight: 700,
                          textTransform: 'uppercase', letterSpacing: '.5px',
                        }}>{product.badges[0]}</span>
                      )}

                      {/* wishlist */}
                      <button onClick={() => toggleWishlist(product.id)} style={{
                        position: 'absolute', top: 10, right: 10,
                        background: wishlist.includes(product.id) ? '#EF4444' : 'var(--bg-surface)',
                        border: `1px solid ${wishlist.includes(product.id) ? '#EF4444' : 'var(--border-color)'}`,
                        borderRadius: '50%', width: 34, height: 34,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', transition: 'all .2s', zIndex: 1,
                      }}>
                        <Heart size={15} fill={wishlist.includes(product.id) ? '#fff' : 'none'}
                          stroke={wishlist.includes(product.id) ? '#fff' : 'var(--text-muted)'}/>
                      </button>

                      {!product.inStock && (
                        <div style={{
                          position: 'absolute', inset: 0,
                          background: 'rgba(0,0,0,.35)', borderRadius: 0,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: '#fff', fontWeight: 700, fontSize: '.85rem',
                        }}>{t.outOfStock || 'Out of Stock'}</div>
                      )}

                      <img src={product.image} alt={product.name}
                        style={{
                          maxWidth: '90%', maxHeight: '90%', objectFit: 'contain',
                          opacity: product.inStock ? 1 : .5,
                          transition: 'transform .35s ease',
                        }}
                        onMouseOver={e=>e.currentTarget.style.transform='scale(1.07)'}
                        onMouseOut={e=>e.currentTarget.style.transform=''}
                      />
                    </div>

                    {/* info */}
                    <div style={{ flex: 1, padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: 'var(--primary-blue)', fontSize: '.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>{product.brand}</span>
                        {product.isAuthentic && (
                          <span style={{ display: 'flex', alignItems: 'center', gap: 3, color: '#10B981', fontSize: '.68rem', fontWeight: 700 }}>
                            <ShieldCheck size={11}/> Verified
                          </span>
                        )}
                      </div>
                      <h3 style={{ fontSize: '1rem', fontWeight: 600, lineHeight: 1.35 }}>{product.name}</h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                        <div style={{ display: 'flex', color: '#F59E0B' }}>
                          {[...Array(5)].map((_, j) => (
                            <Star key={j} size={11}
                              fill={j < Math.floor(product.rating) ? 'currentColor' : 'none'}
                              stroke="currentColor"/>
                          ))}
                        </div>
                        <span style={{ fontSize: '.74rem', color: 'var(--text-muted)' }}>({product.reviews})</span>
                      </div>
                      <div style={{ marginTop: 4 }}>
                        <span style={{ fontWeight: 700, fontSize: '1.08rem' }}>{formatPrice(product.price, currency)}</span>
                        {product.originalPrice && (
                          <span style={{ marginLeft: 8, textDecoration: 'line-through', color: 'var(--text-muted)', fontSize: '.84rem' }}>
                            {formatPrice(product.originalPrice, currency)}
                          </span>
                        )}
                      </div>
                    </div>

                    <Link to={`/product/${product.id}`}
                      className="btn-primary"
                      style={{ textAlign: 'center', padding: '.85rem', borderRadius: '0 0 18px 18px', fontSize: '.92rem' }}>
                      {t.viewDetails || 'View Details'}
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Browse;
