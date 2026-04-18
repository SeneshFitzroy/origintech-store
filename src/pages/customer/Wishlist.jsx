import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, ArrowRight, Star, ShieldCheck, Tag, BookmarkCheck } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { mockProducts, formatPrice } from '../../data/mockData';

const Wishlist = () => {
  const { user, currency, cart, setCart } = useAppContext();
  const navigate = useNavigate();
  const [removed, setRemoved] = useState([]);
  const [addedToCart, setAddedToCart] = useState([]);

  if (!user) {
    navigate('/login');
    return null;
  }

  const allWishlistItems = mockProducts.slice(0, 2);
  const wishlistItems = allWishlistItems.filter(p => !removed.includes(p.id));

  const handleRemove = (id) => setRemoved(prev => [...prev, id]);

  const handleMoveToCart = (product) => {
    if (addedToCart.includes(product.id)) return;
    const item = {
      ...product,
      cartId: `${product.id}-wishlist-${Date.now()}`,
      selectedColor: product.colors?.[0],
      selectedStorage: product.storage?.[0],
      quantity: 1
    };
    setCart([...cart, item]);
    setAddedToCart(prev => [...prev, product.id]);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={13}
        fill={i < Math.floor(rating) ? '#F59E0B' : 'none'}
        stroke={i < Math.floor(rating) ? '#F59E0B' : '#CBD5E1'}
      />
    ));
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-main)', minHeight: '100vh' }}>

      {/* Premium Page Header */}
      <div className="page-header">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="ph-icon"><BookmarkCheck size={24}/></div>
          <h1>My Wishlist</h1>
          <p>Your curated collection of saved products, ready when you are</p>
        </div>
      </div>
      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .wishlist-card {
          animation: fadeSlideIn 0.4s ease forwards;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .wishlist-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        .remove-btn:hover { background: #FEE2E2 !important; color: #DC2626 !important; }
        .cart-btn:hover { opacity: 0.9; transform: scale(1.02); }
      `}</style>

      <div className="container" style={{ padding: '3rem 1rem', maxWidth: '1100px', margin: '0 auto' }}>

        {/* Item count */}
        <div style={{ marginBottom: '1.5rem' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
            {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved for later
          </p>
        </div>

        {/* Empty State */}
        {wishlistItems.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '6rem 2rem',
            backgroundColor: 'var(--bg-surface)',
            borderRadius: '24px',
            border: '1px dashed var(--border-color)'
          }}>
            <div style={{
              width: '80px', height: '80px', borderRadius: '50%',
              background: 'var(--bg-main)',
              border: '2px dashed var(--border-color)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 1.5rem'
            }}>
              <BookmarkCheck size={36} stroke="var(--text-muted)" />
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-main)' }}>
              Your wishlist is empty
            </h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', maxWidth: '380px', margin: '0 auto 2rem' }}>
              Tap the heart icon on any product to save it here for quick access later.
            </p>
            <Link to="/browse" className="btn-primary" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.85rem 2rem', borderRadius: '999px'
            }}>
              Explore Products <ArrowRight size={18} />
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.75rem' }}>
            {wishlistItems.map((product, idx) => {
              const discount = product.originalPrice
                ? Math.round((1 - product.price / product.originalPrice) * 100)
                : null;
              const inCart = addedToCart.includes(product.id);

              return (
                <div
                  key={product.id}
                  className="wishlist-card"
                  style={{
                    backgroundColor: 'var(--bg-surface)',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    border: '1px solid var(--border-color)',
                    display: 'flex',
                    flexDirection: 'column',
                    animationDelay: `${idx * 0.08}s`,
                  }}
                >
                  {/* Image Area */}
                  <div style={{
                    position: 'relative',
                    backgroundColor: '#F1F5F9',
                    height: '220px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden'
                  }}>
                    {/* Discount Badge */}
                    {discount && (
                      <div style={{
                        position: 'absolute', top: '1rem', left: '1rem',
                        backgroundColor: '#EF4444', color: 'white',
                        padding: '0.3rem 0.75rem', borderRadius: '999px',
                        fontSize: '0.78rem', fontWeight: 700,
                        display: 'flex', alignItems: 'center', gap: '4px'
                      }}>
                        <Tag size={11} /> -{discount}%
                      </div>
                    )}

                    {/* Remove Button */}
                    <button
                      className="remove-btn"
                      onClick={() => handleRemove(product.id)}
                      title="Remove from wishlist"
                      style={{
                        position: 'absolute', top: '1rem', right: '1rem',
                        backgroundColor: 'white', color: '#94A3B8',
                        border: 'none', borderRadius: '50%',
                        width: '36px', height: '36px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', transition: 'all 0.2s',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                      }}
                    >
                      <Trash2 size={16} />
                    </button>

                    <img
                      src={product.image}
                      alt={product.name}
                      style={{
                        width: '75%', height: '75%', objectFit: 'contain',
                        transition: 'transform 0.3s ease',
                        mixBlendMode: 'multiply'
                      }}
                    />
                  </div>

                  {/* Product Info */}
                  <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    {/* Brand + Authentic */}
                    <div className="flex items-center justify-between" style={{ marginBottom: '0.4rem' }}>
                      <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--primary-blue)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        {product.brand}
                      </span>
                      {product.isAuthentic && (
                        <span style={{
                          display: 'flex', alignItems: 'center', gap: '3px',
                          fontSize: '0.72rem', color: '#10B981', fontWeight: 600
                        }}>
                          <ShieldCheck size={12} /> Verified
                        </span>
                      )}
                    </div>

                    {/* Name */}
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-main)', lineHeight: 1.3 }}>
                      {product.name}
                    </h3>

                    {/* Stars */}
                    <div className="flex items-center gap-2" style={{ marginBottom: '1rem' }}>
                      <div className="flex">{renderStars(product.rating)}</div>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        {product.rating} ({product.reviews} reviews)
                      </span>
                    </div>

                    {/* Price */}
                    <div style={{ marginBottom: '1.25rem' }}>
                      <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)' }}>
                        {formatPrice(product.price, currency)}
                      </div>
                      {product.originalPrice && (
                        <div className="flex items-center gap-2" style={{ marginTop: '0.25rem' }}>
                          <span style={{ textDecoration: 'line-through', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                            {formatPrice(product.originalPrice, currency)}
                          </span>
                          <span style={{ fontSize: '0.78rem', color: '#10B981', fontWeight: 600 }}>
                            You save {formatPrice(product.originalPrice - product.price, currency)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Stock Status */}
                    <div style={{ marginBottom: '1.25rem' }}>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: '5px',
                        fontSize: '0.8rem', fontWeight: 600,
                        color: product.inStock ? '#10B981' : '#EF4444',
                        backgroundColor: product.inStock ? '#F0FDF4' : '#FEF2F2',
                        padding: '0.3rem 0.75rem', borderRadius: '999px'
                      }}>
                        <span style={{
                          width: '7px', height: '7px', borderRadius: '50%',
                          backgroundColor: product.inStock ? '#10B981' : '#EF4444'
                        }} />
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2" style={{ marginTop: 'auto' }}>
                      <Link
                        to={`/product/${product.id}`}
                        style={{
                          flex: 1, padding: '0.75rem',
                          border: '1px solid var(--border-color)',
                          borderRadius: '10px', textAlign: 'center',
                          fontSize: '0.9rem', fontWeight: 500,
                          color: 'var(--text-main)',
                          textDecoration: 'none',
                          transition: 'all 0.2s',
                          backgroundColor: 'var(--bg-main)'
                        }}
                      >
                        View Details
                      </Link>
                      <button
                        className="cart-btn"
                        onClick={() => handleMoveToCart(product)}
                        disabled={!product.inStock}
                        style={{
                          flex: 1.5, padding: '0.75rem',
                          borderRadius: '10px', border: 'none',
                          backgroundColor: inCart ? '#10B981' : product.inStock ? 'var(--primary-blue)' : '#CBD5E1',
                          color: 'white', fontWeight: 600, fontSize: '0.9rem',
                          cursor: product.inStock ? 'pointer' : 'not-allowed',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                          transition: 'all 0.2s'
                        }}
                      >
                        <ShoppingCart size={16} />
                        {inCart ? 'Added ✓' : 'Add to Cart'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Continue Shopping */}
        {wishlistItems.length > 0 && (
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/browse" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              color: 'var(--primary-blue)', fontWeight: 600, fontSize: '0.95rem',
              textDecoration: 'none'
            }}>
              Continue Shopping <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
