import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, ShieldCheck, Heart, ShoppingBag, Truck, RefreshCw, ArrowLeft, Check, ZoomIn } from 'lucide-react';
import { mockProducts, formatPrice } from '../../data/mockData';
import { useAppContext } from '../../context/AppContext';

const Toast = ({ show, product }) => (
  <div style={{
    position: 'fixed', bottom: 32, right: 32, zIndex: 9999,
    background: '#10B981', color: '#fff',
    padding: '1rem 1.5rem', borderRadius: 14,
    display: 'flex', alignItems: 'center', gap: 10,
    boxShadow: '0 8px 32px rgba(16,185,129,0.35)',
    transform: show ? 'translateY(0)' : 'translateY(100px)',
    opacity: show ? 1 : 0,
    transition: 'transform .35s cubic-bezier(.22,1,.36,1), opacity .25s',
    pointerEvents: 'none',
    maxWidth: 340,
  }}>
    <Check size={20} style={{ flexShrink: 0 }}/>
    <div>
      <div style={{ fontWeight: 700, fontSize: '.9rem' }}>Added to cart!</div>
      <div style={{ fontSize: '.8rem', opacity: .85 }}>{product?.name}</div>
    </div>
  </div>
);

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currency, cart, setCart, user, wishlist, setWishlist } = useAppContext();

  const product = mockProducts.find(p => p.id === id);

  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]);
  const [selectedStorage, setSelectedStorage] = useState(product?.storage?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('specs');
  const [activeImg, setActiveImg] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => { window.scrollTo(0,0); }, [id]);

  if (!product) return (
    <div style={{ padding: '5rem 1rem', textAlign: 'center' }}>
      <h2>Product not found</h2>
      <Link to="/browse" className="btn-primary" style={{ marginTop: '1.5rem', display: 'inline-block' }}>Browse all products</Link>
    </div>
  );

  const related = mockProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  const handleAddToCart = () => {
    const item = {
      ...product,
      cartId: `${product.id}-${selectedColor}-${selectedStorage}-${Date.now()}`,
      selectedColor, selectedStorage, quantity
    };
    setCart([...cart, item]);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 2800);
  };

  const handleBuyNow = () => { handleAddToCart(); navigate('/checkout'); };

  const toggleWishlist = () => {
    if (!user) { navigate('/login'); return; }
    setWishlisted(w => !w);
  };

  const discountPct = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  const starBar = (rating) => Array.from({ length: 5 }, (_, i) => (
    <Star key={i} size={15}
      fill={i < Math.floor(rating) ? '#F59E0B' : 'none'}
      stroke={i < Math.floor(rating) ? '#F59E0B' : '#CBD5E1'}/>
  ));

  const TABS = [
    { key: 'specs', label: 'Specifications' },
    { key: 'reviews', label: `Reviews (${product.reviews})` },
    { key: 'qa', label: 'Q&A' },
  ];

  const MOCK_REVIEWS = [
    { name: 'Kasun M.', rating: 5, date: 'Mar 2026', text: 'Absolutely amazing product. The build quality is top-tier and delivery was lightning fast.' },
    { name: 'Nimal P.', rating: 4, date: 'Feb 2026', text: "Very happy with the purchase. OriginTech's authenticity certificate gave me full confidence." },
    { name: 'Dilshan A.', rating: 5, date: 'Jan 2026', text: 'Hands down the best device I have owned. The trade-in discount was a great deal too.' },
  ];

  return (
    <div style={{ backgroundColor: 'var(--bg-main)', minHeight: '100vh' }}>
      <Toast show={toastVisible} product={product}/>

      <div className="container" style={{ padding: '2rem 1rem' }}>
        {/* Breadcrumbs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '.85rem', color: 'var(--text-muted)', marginBottom: '2rem', flexWrap: 'wrap' }}>
          <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
          <span>/</span>
          <Link to="/browse" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Browse</Link>
          <span>/</span>
          <Link to={`/browse?category=${product.category.toLowerCase()}`} style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>{product.category}</Link>
          <span>/</span>
          <span style={{ color: 'var(--text-main)', fontWeight: 500 }}>{product.name}</span>
        </div>

        <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap', marginBottom: '4rem' }}>

          {/* ── Gallery ── */}
          <div style={{ flex: '1 1 400px' }}>
            {/* Main image */}
            <div
              onClick={() => setZoomed(!zoomed)}
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderRadius: 20, padding: '2rem',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                height: 460, marginBottom: '1rem',
                border: '1px solid var(--border-color)',
                cursor: 'zoom-in', overflow: 'hidden', position: 'relative',
                transition: 'box-shadow .2s',
                boxShadow: zoomed ? '0 20px 60px rgba(0,0,0,0.2)' : 'none',
              }}>
              <img src={product.image} alt={product.name} style={{
                maxHeight: '100%', maxWidth: '100%', objectFit: 'contain',
                transform: zoomed ? 'scale(1.45)' : 'scale(1)',
                transition: 'transform .4s cubic-bezier(.22,1,.36,1)',
              }}/>
              <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(0,0,0,0.35)', borderRadius: 8, padding: '4px 8px', display: 'flex', alignItems: 'center', gap: 4, color: '#fff', fontSize: '.72rem' }}>
                <ZoomIn size={12}/> {zoomed ? 'Click to zoom out' : 'Click to zoom'}
              </div>
              {product.inStock ? (
                <div style={{ position: 'absolute', top: 12, left: 12, background: '#10B981', color: '#fff', fontSize: '.72rem', fontWeight: 700, padding: '4px 10px', borderRadius: 20 }}>In Stock</div>
              ) : (
                <div style={{ position: 'absolute', top: 12, left: 12, background: '#EF4444', color: '#fff', fontSize: '.72rem', fontWeight: 700, padding: '4px 10px', borderRadius: 20 }}>Out of Stock</div>
              )}
            </div>

            {/* Thumbnails */}
            <div style={{ display: 'flex', gap: 10 }}>
              {[0, 1, 2].map(i => (
                <div key={i} onClick={() => { setActiveImg(i); setZoomed(false); }}
                  style={{
                    width: 80, height: 80, borderRadius: 12,
                    backgroundColor: 'var(--bg-surface)',
                    border: activeImg === i ? '2px solid var(--primary-blue)' : '2px solid transparent',
                    outline: activeImg === i ? '1px solid transparent' : '1px solid var(--border-color)',
                    cursor: 'pointer', padding: '0.5rem',
                    transition: 'border-color .2s',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                  <img src={product.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }}/>
                </div>
              ))}
            </div>
          </div>

          {/* ── Product Info ── */}
          <div style={{ flex: '1 1 400px' }}>
            {/* Badges */}
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: '1rem' }}>
              {product.badges.map(b => (
                <span key={b} style={{ display: 'inline-block', background: b === 'Best Seller' ? 'linear-gradient(90deg,#F59E0B,#D97706)' : 'var(--primary-blue)', color: '#fff', padding: '.2rem .8rem', borderRadius: 20, fontSize: '.72rem', fontWeight: 700 }}>{b}</span>
              ))}
              {discountPct && <span style={{ background: '#FEE2E2', color: '#EF4444', padding: '.2rem .8rem', borderRadius: 20, fontSize: '.72rem', fontWeight: 700 }}>{discountPct}% OFF</span>}
              {product.verified && <span style={{ background: '#F0FDF4', color: '#10B981', padding: '.2rem .8rem', borderRadius: 20, fontSize: '.72rem', fontWeight: 700 }}>✓ Verified</span>}
            </div>

            <h1 style={{ fontSize: '2rem', fontWeight: 800, lineHeight: 1.2, marginBottom: '.75rem', color: 'var(--text-main)' }}>{product.name}</h1>

            {/* Rating row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>{starBar(product.rating)}</div>
              <span style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '.9rem' }}>{product.rating}</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '.85rem' }}>({product.reviews} reviews)</span>
              <span style={{ color: 'var(--border-color)' }}>|</span>
              <span style={{ color: 'var(--primary-blue)', fontWeight: 600, fontSize: '.9rem' }}>{product.brand}</span>
            </div>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '1rem', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-.02em' }}>{formatPrice(product.price, currency)}</span>
              {product.originalPrice && <span style={{ textDecoration: 'line-through', color: 'var(--text-muted)', fontSize: '1.15rem' }}>{formatPrice(product.originalPrice, currency)}</span>}
            </div>

            {/* Auth badge */}
            <div style={{ padding: '1rem 1.25rem', backgroundColor: 'var(--bg-soft)', borderRadius: 12, marginBottom: '1.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem', border: '1px solid var(--border-color)' }}>
              <ShieldCheck size={22} style={{ color: 'var(--primary-blue)', flexShrink: 0 }}/>
              <div>
                <div style={{ fontWeight: 700, fontSize: '.9rem' }}>Authenticity Verified</div>
                <Link to="/authenticity" style={{ fontSize: '.82rem', color: 'var(--primary-blue)', textDecoration: 'underline' }}>View digital certificate →</Link>
              </div>
            </div>

            {/* Color variants */}
            {product.colors?.length > 0 && (
              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ fontWeight: 600, marginBottom: '.5rem', fontSize: '.9rem' }}>Color: <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>{selectedColor}</span></div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {product.colors.map(c => (
                    <button key={c} onClick={() => setSelectedColor(c)} style={{
                      padding: '.45rem 1rem', borderRadius: 8, cursor: 'pointer',
                      border: selectedColor === c ? '2px solid var(--primary-blue)' : '1.5px solid var(--border-color)',
                      backgroundColor: selectedColor === c ? 'rgba(37,99,235,0.06)' : 'var(--bg-surface)',
                      color: 'var(--text-main)', fontWeight: selectedColor === c ? 700 : 400,
                      fontSize: '.88rem', transition: 'all .15s',
                    }}>{c}</button>
                  ))}
                </div>
              </div>
            )}

            {/* Storage variants */}
            {product.storage?.length > 0 && (
              <div style={{ marginBottom: '1.75rem' }}>
                <div style={{ fontWeight: 600, marginBottom: '.5rem', fontSize: '.9rem' }}>Storage: <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>{selectedStorage}</span></div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {product.storage.map(s => (
                    <button key={s} onClick={() => setSelectedStorage(s)} style={{
                      padding: '.45rem 1rem', borderRadius: 8, cursor: 'pointer',
                      border: selectedStorage === s ? '2px solid var(--primary-blue)' : '1.5px solid var(--border-color)',
                      backgroundColor: selectedStorage === s ? 'rgba(37,99,235,0.06)' : 'var(--bg-surface)',
                      color: 'var(--text-main)', fontWeight: selectedStorage === s ? 700 : 400,
                      fontSize: '.88rem', transition: 'all .15s',
                    }}>{s}</button>
                  ))}
                </div>
              </div>
            )}

            {/* Qty + actions */}
            <div style={{ display: 'flex', gap: 12, marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              {/* Qty picker */}
              <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid var(--border-color)', borderRadius: 10, overflow: 'hidden' }}>
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{ padding: '.75rem 1rem', background: 'var(--bg-surface)', color: 'var(--text-main)', border: 'none', cursor: 'pointer', fontSize: '1.1rem', transition: 'background .15s' }}>−</button>
                <span style={{ padding: '.75rem 1.25rem', fontWeight: 700, background: 'var(--bg-soft)', minWidth: '3rem', textAlign: 'center' }}>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}
                  style={{ padding: '.75rem 1rem', background: 'var(--bg-surface)', color: 'var(--text-main)', border: 'none', cursor: 'pointer', fontSize: '1.1rem', transition: 'background .15s' }}>+</button>
              </div>

              <button className="btn-primary" onClick={handleAddToCart} disabled={!product.inStock}
                style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, minWidth: 140 }}>
                <ShoppingBag size={18}/> Add to Cart
              </button>

              <button onClick={handleBuyNow} disabled={!product.inStock}
                style={{ flex: 1, padding: '.85rem 1.5rem', borderRadius: 10, background: 'var(--premium-navy)', color: '#fff', border: 'none', fontWeight: 700, cursor: 'pointer', minWidth: 120, transition: 'opacity .2s' }}
                onMouseOver={e => e.currentTarget.style.opacity='.85'}
                onMouseOut={e => e.currentTarget.style.opacity='1'}>
                Buy Now
              </button>

              <button onClick={toggleWishlist}
                style={{
                  padding: '.75rem', borderRadius: 10, border: '1.5px solid var(--border-color)',
                  background: wishlisted ? '#FFF0F0' : 'var(--bg-surface)', cursor: 'pointer',
                  transition: 'all .2s',
                }}>
                <Heart size={22} fill={wishlisted ? '#EF4444' : 'none'} stroke={wishlisted ? '#EF4444' : 'var(--text-muted)'}/>
              </button>
            </div>

            {/* Delivery info */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
              {[
                { icon: <Truck size={20}/>, title: 'Free Delivery', sub: '1–2 business days' },
                { icon: <RefreshCw size={20}/>, title: 'Free Returns', sub: 'Within 14 days' },
              ].map((d, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ color: 'var(--primary-blue)' }}>{d.icon}</div>
                  <div style={{ fontSize: '.88rem' }}>
                    <div style={{ fontWeight: 700 }}>{d.title}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '.8rem' }}>{d.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Tabs ── */}
        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '2.5rem', marginBottom: '4rem' }}>
          <div style={{ display: 'flex', gap: 0, borderBottom: '1px solid var(--border-color)', marginBottom: '2rem', overflowX: 'auto' }}>
            {TABS.map(tab => (
              <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{
                padding: '1rem 1.75rem', border: 'none', background: 'none', cursor: 'pointer',
                fontSize: '.95rem', fontWeight: activeTab === tab.key ? 700 : 400,
                color: activeTab === tab.key ? 'var(--primary-blue)' : 'var(--text-muted)',
                borderBottom: activeTab === tab.key ? '2.5px solid var(--primary-blue)' : '2.5px solid transparent',
                marginBottom: '-1px', whiteSpace: 'nowrap', transition: 'color .2s',
              }}>{tab.label}</button>
            ))}
          </div>

          {activeTab === 'specs' && (
            <div style={{ maxWidth: 680 }}>
              <div style={{ display: 'grid', gap: 0 }}>
                {Object.entries(product.specs || {}).map(([key, val], i) => (
                  <div key={key} style={{
                    display: 'grid', gridTemplateColumns: '180px 1fr',
                    padding: '1rem 1.25rem', gap: '1rem',
                    background: i % 2 === 0 ? 'var(--bg-surface)' : 'transparent',
                    borderRadius: i === 0 ? '12px 12px 0 0' : i === Object.entries(product.specs || {}).length - 1 ? '0 0 12px 12px' : 0,
                    border: '1px solid var(--border-color)',
                    borderTop: i === 0 ? '1px solid var(--border-color)' : 'none',
                  }}>
                    <span style={{ fontWeight: 600, color: 'var(--text-muted)', fontSize: '.88rem', textTransform: 'capitalize' }}>{key.replace(/([A-Z])/g, ' $1')}</span>
                    <span style={{ color: 'var(--text-main)', fontSize: '.9rem' }}>{val}</span>
                  </div>
                ))}
                {(!product.specs || Object.keys(product.specs).length === 0) && (
                  <div style={{ padding: '2rem', color: 'var(--text-muted)', textAlign: 'center' }}>No specifications available.</div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div style={{ maxWidth: 680, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {MOCK_REVIEWS.map((r, i) => (
                <div key={i} style={{ padding: '1.5rem', background: 'var(--bg-surface)', borderRadius: 14, border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg,#3B82F6,#8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: '.85rem' }}>{r.name[0]}</div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '.9rem' }}>{r.name}</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '.78rem' }}>{r.date}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 2 }}>{starBar(r.rating)}</div>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '.9rem', lineHeight: 1.6, margin: 0 }}>{r.text}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'qa' && (
            <div style={{ maxWidth: 680 }}>
              <div style={{ padding: '2rem', background: 'var(--bg-surface)', borderRadius: 14, border: '1px solid var(--border-color)', marginBottom: '1.5rem' }}>
                <h4 style={{ marginBottom: '1rem', fontWeight: 700 }}>Ask a question about {product.name}</h4>
                <textarea placeholder="Type your question here…" style={{ width: '100%', padding: '1rem', borderRadius: 10, border: '1px solid var(--border-color)', background: 'var(--bg-main)', color: 'var(--text-main)', fontSize: '.9rem', outline: 'none', resize: 'vertical', minHeight: 100, boxSizing: 'border-box' }}/>
                <button className="btn-primary" style={{ marginTop: '1rem' }}>Submit Question</button>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '.88rem', textAlign: 'center' }}>No questions yet. Be the first to ask!</p>
            </div>
          )}
        </div>

        {/* ── Related Products ── */}
        {related.length > 0 && (
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '3rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '2rem', color: 'var(--text-main)' }}>You may also like</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px,1fr))', gap: '1.5rem' }}>
              {related.map(p => (
                <Link key={p.id} to={`/product/${p.id}`} style={{ textDecoration: 'none' }}>
                  <div className="product-card" style={{
                    background: 'var(--bg-surface)', borderRadius: 16, overflow: 'hidden',
                    border: '1px solid var(--border-color)', transition: 'transform .2s, box-shadow .2s',
                  }}
                    onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.12)'; }}
                    onMouseOut={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}>
                    <div style={{ height: 160, background: 'var(--bg-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
                      <img src={p.image} alt={p.name} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}/>
                    </div>
                    <div style={{ padding: '1rem' }}>
                      <div style={{ fontWeight: 700, fontSize: '.9rem', color: 'var(--text-main)', marginBottom: '.3rem', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{p.name}</div>
                      <div style={{ fontWeight: 800, color: 'var(--primary-blue)', fontSize: '1rem' }}>{formatPrice(p.price, currency)}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
