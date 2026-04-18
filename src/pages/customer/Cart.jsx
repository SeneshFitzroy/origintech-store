import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ArrowRight, ShoppingBag, ShoppingCart, Tag, CheckCircle, ChevronRight, Shield } from 'lucide-react';
import { formatPrice, mockProducts } from '../../data/mockData';
import { useAppContext } from '../../context/AppContext';

const VALID_COUPONS = { 'SAVE10': 0.10, 'ORIGIN10': 0.10, 'SAVE15': 0.15, 'WELCOME20': 0.20 };

const Cart = () => {
  const { cart, setCart, currency, user, tradeInCredit } = useAppContext();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');
  const [removingIds, setRemovingIds] = useState([]);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = appliedCoupon ? subtotal * VALID_COUPONS[appliedCoupon] : 0;
  const creditApplied = Math.min(tradeInCredit, subtotal - discount);
  const total = subtotal - discount - creditApplied;

  const updateQuantity = (cartId, newQty) => {
    if (newQty < 1) return;
    setCart(cart.map(item => item.cartId === cartId ? { ...item, quantity: newQty } : item));
  };

  const removeItem = (cartId) => {
    setRemovingIds(prev => [...prev, cartId]);
    setTimeout(() => {
      setCart(cart.filter(item => item.cartId !== cartId));
      setRemovingIds(prev => prev.filter(id => id !== cartId));
    }, 320);
  };

  const handleApplyCoupon = () => {
    const code = couponCode.trim().toUpperCase();
    if (VALID_COUPONS[code]) {
      setAppliedCoupon(code);
      setCouponError('');
    } else {
      setCouponError('Invalid code. Try SAVE10, SAVE15, or WELCOME20.');
      setAppliedCoupon(null);
    }
  };

  const handleCheckout = () => {
    if (!user) navigate('/login?redirect=/checkout');
    else navigate('/checkout');
  };

  const recommended = mockProducts.filter(p => !cart.some(c => c.id === p.id)).slice(0, 4);

  if (cart.length === 0) {
    return (
      <div style={{ backgroundColor: 'var(--bg-main)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 1rem' }}>
        <div style={{ textAlign: 'center', maxWidth: 420 }}>
          <div style={{
            width: 100, height: 100, borderRadius: '50%',
            background: 'var(--bg-surface)', border: '2px dashed var(--border-color)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 2rem',
          }}>
            <ShoppingBag size={44} stroke="var(--text-muted)" strokeWidth={1.5}/>
          </div>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '.75rem', color: 'var(--text-main)' }}>Your cart is empty</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', lineHeight: 1.6 }}>You haven't added anything yet. Explore our latest products!</p>
          <Link to="/browse" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '1rem 2rem', borderRadius: 999 }}>
            Start Shopping <ArrowRight size={18}/>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: 'var(--bg-main)', minHeight: '100vh' }}>
      <style dangerouslySetInnerHTML={{__html:`
        .cart-item-exit { transform: translateX(-20px); opacity: 0; transition: all .32s ease; }
        .cart-item { transition: opacity .32s, transform .32s; }
        .qty-btn:hover { background: var(--bg-main) !important; }
        .remove-btn:hover { color: #EF4444 !important; }
      `}}/>

      <div className="container" style={{ padding: '3rem 1rem 5rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: 'var(--color-info-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShoppingCart size={22} style={{ color: 'var(--primary-blue)' }}/>
            </div>
            <div>
              <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '.15rem' }}>Shopping Cart</h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '.88rem' }}>{cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart</p>
            </div>
          </div>
          <Link to="/browse" style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--primary-blue)', fontWeight: 600, fontSize: '.9rem', textDecoration: 'none', padding: '.55rem 1.15rem', borderRadius: 10, border: '1px solid var(--primary-blue)', transition: 'all .2s' }}
            onMouseOver={e=>{e.currentTarget.style.background='var(--primary-blue)';e.currentTarget.style.color='#fff';}}
            onMouseOut={e=>{e.currentTarget.style.background='';e.currentTarget.style.color='var(--primary-blue)';}}
          >
            ← Continue Shopping
          </Link>
        </div>

        <div className="cart-layout" style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>

          {/* ── Cart Items ── */}
          <div className="cart-items-col" style={{ flex: '1 1 580px', minWidth: 0 }}>
            <div style={{ background: 'var(--bg-surface)', borderRadius: 20, border: '1px solid var(--border-color)', overflow: 'hidden' }}>
              {cart.map((item, index) => (
                <div key={item.cartId} className={`cart-item ${removingIds.includes(item.cartId) ? 'cart-item-exit' : ''}`}
                  style={{
                    display: 'flex', gap: '1.25rem', padding: '1.5rem',
                    borderBottom: index < cart.length - 1 ? '1px solid var(--border-color)' : 'none',
                    alignItems: 'flex-start',
                  }}>
                  {/* Image */}
                  <Link to={`/product/${item.id}`}>
                    <div style={{ width: 90, height: 90, borderRadius: 12, background: 'var(--bg-soft)', border: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '.5rem', flexShrink: 0 }}>
                      <img src={item.image} alt={item.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}/>
                    </div>
                  </Link>

                  {/* Details */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                      <div>
                        <Link to={`/product/${item.id}`} style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-main)', textDecoration: 'none', display: 'block', marginBottom: '.3rem' }}>{item.name}</Link>
                        <div style={{ fontSize: '.8rem', color: 'var(--text-muted)' }}>
                          {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                          {item.selectedColor && item.selectedStorage && <span> · </span>}
                          {item.selectedStorage && <span>Storage: {item.selectedStorage}</span>}
                        </div>
                        {item.verified && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: '.4rem', color: '#10B981', fontSize: '.75rem', fontWeight: 600 }}>
                            <Shield size={11}/> Authenticity Verified
                          </div>
                        )}
                      </div>
                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-main)' }}>{formatPrice(item.price * item.quantity, currency)}</div>
                        <div style={{ fontSize: '.78rem', color: 'var(--text-muted)', marginTop: 2 }}>{formatPrice(item.price, currency)} each</div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '1rem', flexWrap: 'wrap', gap: '.5rem' }}>
                      {/* Qty */}
                      <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid var(--border-color)', borderRadius: 8, overflow: 'hidden' }}>
                        <button className="qty-btn" onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                          style={{ padding: '.4rem .85rem', background: 'var(--bg-surface)', border: 'none', cursor: 'pointer', color: 'var(--text-main)', fontSize: '1rem' }}>−</button>
                        <span style={{ padding: '.4rem .85rem', fontWeight: 700, background: 'var(--bg-soft)', fontSize: '.9rem', minWidth: 36, textAlign: 'center' }}>{item.quantity}</span>
                        <button className="qty-btn" onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                          style={{ padding: '.4rem .85rem', background: 'var(--bg-surface)', border: 'none', cursor: 'pointer', color: 'var(--text-main)', fontSize: '1rem' }}>+</button>
                      </div>
                      {/* Remove */}
                      <button className="remove-btn" onClick={() => removeItem(item.cartId)}
                        style={{ display: 'flex', alignItems: 'center', gap: 5, color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '.82rem', fontWeight: 600, transition: 'color .2s', padding: '.3rem .5rem' }}>
                        <Trash2 size={14}/> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Order Summary ── */}
          <div className="cart-summary-col" style={{ flex: '0 0 340px' }}>
            <div style={{ background: 'var(--bg-surface)', borderRadius: 20, border: '1px solid var(--border-color)', padding: '1.75rem', position: 'sticky', top: '6rem' }}>
              <h2 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--text-main)' }}>Order Summary</h2>

              {/* Line items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '.9rem', marginBottom: '1.25rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.9rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Subtotal ({cart.length} items)</span>
                  <span style={{ fontWeight: 600 }}>{formatPrice(subtotal, currency)}</span>
                </div>
                {discount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.9rem', color: '#10B981' }}>
                    <span>Coupon ({appliedCoupon})</span>
                    <span>−{formatPrice(discount, currency)}</span>
                  </div>
                )}
                {creditApplied > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.9rem', color: '#10B981' }}>
                    <span>Trade-In Credit</span>
                    <span>−{formatPrice(creditApplied, currency)}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.9rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Delivery</span>
                  <span style={{ color: '#10B981', fontWeight: 600 }}>FREE</span>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.75rem' }}>
                <span style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-main)' }}>Total</span>
                <span style={{ fontWeight: 800, fontSize: '1.3rem', color: 'var(--text-main)' }}>{formatPrice(total, currency)}</span>
              </div>

              {/* Coupon */}
              <div style={{ marginBottom: '1.5rem' }}>
                {appliedCoupon ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '.85rem 1rem', background: '#F0FDF4', border: '1px solid #86EFAC', borderRadius: 10 }}>
                    <CheckCircle size={18} color="#10B981"/>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: '.88rem', color: '#065F46' }}>{appliedCoupon} applied!</div>
                      <div style={{ fontSize: '.78rem', color: '#047857' }}>{Math.round(VALID_COUPONS[appliedCoupon]*100)}% discount</div>
                    </div>
                    <button onClick={() => { setAppliedCoupon(null); setCouponCode(''); }} style={{ color: '#EF4444', fontSize: '.75rem', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 700 }}>Remove</button>
                  </div>
                ) : (
                  <div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <div style={{ flex: 1, position: 'relative' }}>
                        <Tag size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}/>
                        <input type="text" placeholder="Coupon code" value={couponCode} onChange={e => setCouponCode(e.target.value)}
                          onKeyDown={e => e.key === 'Enter' && handleApplyCoupon()}
                          style={{ width: '100%', padding: '.75rem .75rem .75rem 2.2rem', borderRadius: 10, border: '1.5px solid var(--border-color)', background: 'var(--bg-main)', color: 'var(--text-main)', fontSize: '.88rem', outline: 'none', boxSizing: 'border-box' }}
                          onFocus={e => e.target.style.borderColor='var(--primary-blue)'}
                          onBlur={e => e.target.style.borderColor='var(--border-color)'}/>
                      </div>
                      <button onClick={handleApplyCoupon} className="btn-primary" style={{ padding: '.75rem 1rem', fontSize: '.85rem', borderRadius: 10, whiteSpace: 'nowrap' }}>Apply</button>
                    </div>
                    {couponError && <div style={{ color: '#EF4444', fontSize: '.78rem', marginTop: '.4rem' }}>{couponError}</div>}
                    <div style={{ color: 'var(--text-muted)', fontSize: '.75rem', marginTop: '.4rem' }}>Try: SAVE10 · SAVE15 · WELCOME20</div>
                  </div>
                )}
              </div>

              <button className="btn-primary" onClick={handleCheckout}
                style={{ width: '100%', padding: '1.1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, fontSize: '1rem', fontWeight: 700, borderRadius: 12 }}>
                Proceed to Checkout <ArrowRight size={18}/>
              </button>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: '1rem', color: 'var(--text-muted)', fontSize: '.78rem' }}>
                <Shield size={13}/> Secure SSL encrypted checkout
              </div>
            </div>
          </div>
        </div>

        {/* ── Recommended ── */}
        {recommended.length > 0 && (
          <div style={{ marginTop: '4rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-main)' }}>You may also like</h2>
              <Link to="/browse" style={{ color: 'var(--primary-blue)', fontWeight: 600, fontSize: '.88rem', display: 'flex', alignItems: 'center', gap: 4, textDecoration: 'none' }}>View all <ChevronRight size={14}/></Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px,1fr))', gap: '1.25rem' }}>
              {recommended.map(p => (
                <Link key={p.id} to={`/product/${p.id}`} style={{ textDecoration: 'none' }}>
                  <div style={{ background: 'var(--bg-surface)', borderRadius: 16, border: '1px solid var(--border-color)', overflow: 'hidden', transition: 'transform .2s, box-shadow .2s' }}
                    onMouseOver={e => { e.currentTarget.style.transform='translateY(-5px)'; e.currentTarget.style.boxShadow='0 12px 32px rgba(0,0,0,0.1)'; }}
                    onMouseOut={e => { e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow=''; }}>
                    <div style={{ height: 140, background: 'var(--bg-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
                      <img src={p.image} alt={p.name} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}/>
                    </div>
                    <div style={{ padding: '1rem' }}>
                      <div style={{ fontWeight: 700, fontSize: '.85rem', color: 'var(--text-main)', marginBottom: '.3rem', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{p.name}</div>
                      <div style={{ fontWeight: 800, color: 'var(--primary-blue)', fontSize: '.95rem' }}>{formatPrice(p.price, currency)}</div>
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

export default Cart;
