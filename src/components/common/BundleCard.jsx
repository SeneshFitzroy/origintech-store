import React, { useState, useEffect } from 'react';
import { Package, Check, X, ShieldCheck } from 'lucide-react';
import { mockProducts, formatPrice } from '../../data/mockData';
import { useAppContext } from '../../context/AppContext';

/* ── Modal ───────────────────────────────────────────────────── */
const BundleModal = ({ bundle, products, currency, onClose, onAdd, added }) => {
  const originalTotal = products.reduce((sum, p) => sum + p.price, 0);
  const savings       = Math.round(originalTotal * bundle.discountPct / 100);
  const discountedTotal = originalTotal - savings;
  const inStock       = products.every(p => p.inStock);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(0,0,0,0.78)',
        backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem',
      }}
    >
      <style>{`
        @keyframes bdModalIn { from { opacity:0; transform:translateY(28px) scale(.97) } to { opacity:1; transform:translateY(0) scale(1) } }
        @keyframes bdOverlayIn { from { opacity:0 } to { opacity:1 } }
        .bd-modal { animation: bdModalIn .32s cubic-bezier(.16,1,.3,1) both; }
      `}</style>

      <div
        className="bd-modal"
        onClick={e => e.stopPropagation()}
        style={{
          background: 'var(--bg-surface)',
          borderRadius: 24,
          border: '1px solid var(--border-color)',
          width: '100%', maxWidth: 900,
          maxHeight: '92vh',
          overflow: 'hidden',
          display: 'flex', flexDirection: 'column',
          boxShadow: '0 40px 100px rgba(0,0,0,.45)',
        }}
      >
        {/* ── Header ── */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '1.4rem 2rem',
          borderBottom: '1px solid var(--border-color)',
          background: `linear-gradient(135deg, ${bundle.color}12 0%, transparent 100%)`,
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{
              background: bundle.color, color: '#fff',
              padding: '.28rem .85rem', borderRadius: 20,
              fontSize: '.72rem', fontWeight: 700, letterSpacing: '.5px',
            }}>{bundle.badge}</span>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)', margin: 0 }}>
              {bundle.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'var(--bg-soft)', border: '1px solid var(--border-color)',
              cursor: 'pointer', color: 'var(--text-muted)', transition: 'all .18s',
            }}
            onMouseOver={e => { e.currentTarget.style.background = '#FEE2E2'; e.currentTarget.style.color = '#EF4444'; }}
            onMouseOut={e => { e.currentTarget.style.background = 'var(--bg-soft)'; e.currentTarget.style.color = 'var(--text-muted)'; }}
          >
            <X size={17} />
          </button>
        </div>

        {/* ── Body ── */}
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden', minHeight: 0 }}>

          {/* Left — product images */}
          <div style={{
            flex: '0 0 38%', minWidth: 220,
            padding: '1.25rem',
            borderRight: '1px solid var(--border-color)',
            overflowY: 'auto',
            background: 'var(--bg-soft)',
            display: 'flex', flexDirection: 'column', gap: '.85rem',
          }}>
            {products.map((p, i) => (
              <div key={p.id} style={{
                background: 'var(--bg-surface)',
                borderRadius: 16,
                border: `1.5px solid ${i === 0 ? bundle.color + '44' : 'var(--border-color)'}`,
                padding: '1rem',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '.6rem',
              }}>
                <div style={{
                  width: '100%', height: 130,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'var(--bg-soft)', borderRadius: 12, padding: '.75rem',
                }}>
                  <img src={p.image} alt={p.name}
                    style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                </div>
                <div style={{ textAlign: 'center', width: '100%' }}>
                  <div style={{ fontWeight: 700, fontSize: '.86rem', color: 'var(--text-main)', marginBottom: '.2rem' }}>{p.name}</div>
                  <div style={{ fontSize: '.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: '.35rem' }}>
                    {p.brand} · {p.category}
                  </div>
                  <div style={{ fontWeight: 800, color: bundle.color, fontSize: '.95rem' }}>{formatPrice(p.price, currency)}</div>
                </div>
                {i === 0 && (
                  <div style={{
                    width: '100%', padding: '.3rem .6rem',
                    background: `${bundle.color}14`, border: `1px solid ${bundle.color}2a`,
                    borderRadius: 8, textAlign: 'center',
                    fontSize: '.68rem', color: bundle.color, fontWeight: 700,
                  }}>
                    ★ Centrepiece Product
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right — detail */}
          <div style={{ flex: 1, padding: '1.75rem 2rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* About */}
            {bundle.description && (
              <div>
                <p style={{ fontSize: '.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', marginBottom: '.6rem' }}>About this Bundle</p>
                <p style={{ fontSize: '.92rem', color: 'var(--text-secondary)', lineHeight: 1.72, margin: 0 }}>{bundle.description}</p>
              </div>
            )}

            {/* What's included */}
            <div>
              <p style={{ fontSize: '.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', marginBottom: '.6rem' }}>What's Included</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '.55rem' }}>
                {products.map(p => (
                  <div key={p.id} style={{
                    display: 'flex', alignItems: 'flex-start', gap: 10,
                    padding: '.8rem 1rem',
                    background: 'var(--bg-soft)',
                    borderRadius: 12, border: '1px solid var(--border-color)',
                  }}>
                    <div style={{
                      width: 46, height: 46, flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      background: 'var(--bg-surface)', borderRadius: 10, border: '1px solid var(--border-color)',
                    }}>
                      <img src={p.image} alt={p.name} style={{ maxWidth: '80%', maxHeight: '80%', objectFit: 'contain' }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: '.86rem', color: 'var(--text-main)', marginBottom: '.2rem' }}>{p.name}</div>
                      <div style={{
                        fontSize: '.76rem', color: 'var(--text-muted)', lineHeight: 1.55,
                        overflow: 'hidden', display: '-webkit-box',
                        WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                      }}>{p.description}</div>
                    </div>
                    <div style={{ fontWeight: 700, color: 'var(--text-main)', fontSize: '.88rem', flexShrink: 0, paddingTop: 2 }}>
                      {formatPrice(p.price, currency)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Price breakdown */}
            <div style={{
              padding: '1.2rem 1.4rem',
              background: `${bundle.color}09`,
              border: `1px solid ${bundle.color}22`,
              borderRadius: 16,
            }}>
              <p style={{ fontSize: '.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', marginBottom: '.9rem' }}>Price Breakdown</p>
              {products.map(p => (
                <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.85rem', marginBottom: '.45rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>{p.name}</span>
                  <span style={{ color: 'var(--text-muted)' }}>{formatPrice(p.price, currency)}</span>
                </div>
              ))}
              <div style={{ height: 1, background: 'var(--border-color)', margin: '.7rem 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.86rem', marginBottom: '.4rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Total value</span>
                <span style={{ textDecoration: 'line-through', color: 'var(--text-muted)' }}>{formatPrice(originalTotal, currency)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.86rem', marginBottom: '.7rem', color: '#10B981' }}>
                <span style={{ fontWeight: 700 }}>Bundle saving ({bundle.discountPct}%)</span>
                <span style={{ fontWeight: 700 }}>−{formatPrice(savings, currency)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '.7rem', borderTop: `2px solid ${bundle.color}30` }}>
                <span style={{ fontWeight: 800, fontSize: '.98rem', color: 'var(--text-main)' }}>Bundle Price</span>
                <span style={{ fontWeight: 900, fontSize: '1.28rem', color: bundle.color }}>{formatPrice(discountedTotal, currency)}</span>
              </div>
            </div>

            {/* Auth note */}
            <div style={{
              display: 'flex', alignItems: 'flex-start', gap: 10,
              padding: '.85rem 1rem',
              background: 'rgba(16,185,129,.06)',
              border: '1px solid rgba(16,185,129,.2)',
              borderRadius: 12,
            }}>
              <ShieldCheck size={18} style={{ color: '#10B981', flexShrink: 0, marginTop: 1 }} />
              <span style={{ fontSize: '.82rem', color: '#047857', lineHeight: 1.6 }}>
                All products in this bundle are 100% authenticity-verified and covered by a 12-month OriginTech warranty.
              </span>
            </div>
          </div>
        </div>

        {/* ── Footer ── */}
        <div style={{
          padding: '1.1rem 2rem',
          borderTop: '1px solid var(--border-color)',
          display: 'flex', gap: '1rem', alignItems: 'center',
          background: 'var(--bg-soft)', flexShrink: 0, flexWrap: 'wrap',
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '.75rem', color: 'var(--text-muted)' }}>Bundle total</div>
            <div style={{ fontWeight: 900, fontSize: '1.35rem', color: bundle.color, lineHeight: 1.1 }}>
              {formatPrice(discountedTotal, currency)}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              padding: '.85rem 1.4rem', borderRadius: 12,
              border: '1px solid var(--border-color)', background: 'var(--bg-surface)',
              color: 'var(--text-main)', fontWeight: 600, cursor: 'pointer', fontSize: '.88rem',
            }}
          >Close</button>
          <button
            onClick={onAdd}
            disabled={!inStock}
            style={{
              padding: '.85rem 1.75rem', borderRadius: 12, border: 'none',
              background: added ? '#10B981' : inStock ? bundle.color : 'var(--bg-soft)',
              color: inStock ? '#fff' : 'var(--text-muted)',
              fontWeight: 700, fontSize: '.9rem',
              cursor: inStock ? 'pointer' : 'not-allowed',
              display: 'flex', alignItems: 'center', gap: 8,
              transition: 'all .2s',
            }}
          >
            {added
              ? <><Check size={17} /> Added to Cart!</>
              : <><Package size={17} /> Add Bundle to Cart</>
            }
          </button>
        </div>
      </div>
    </div>
  );
};

/* ── Card ────────────────────────────────────────────────────── */
const BundleCard = ({ bundle }) => {
  const { currency, addBundleToCart } = useAppContext();
  const [added,     setAdded]     = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const products = bundle.productIds
    .map(id => mockProducts.find(p => p.id === id))
    .filter(Boolean);

  const originalTotal   = products.reduce((sum, p) => sum + p.price, 0);
  const savings         = Math.round(originalTotal * bundle.discountPct / 100);
  const discountedTotal = originalTotal - savings;
  const inStock         = products.every(p => p.inStock);

  const handleAdd = () => {
    addBundleToCart(bundle, products);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <>
      {modalOpen && (
        <BundleModal
          bundle={bundle}
          products={products}
          currency={currency}
          onClose={() => setModalOpen(false)}
          onAdd={handleAdd}
          added={added}
        />
      )}

      <div
        style={{
          background: 'var(--bg-surface)',
          borderRadius: 20,
          border: '1px solid var(--border-color)',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform .25s, box-shadow .25s',
          cursor: 'default',
        }}
        onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-6px)'; e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,.12)'; }}
        onMouseOut={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = ''; }}
      >
        {/* ── Hero image collage ── */}
        <div
          onClick={() => setModalOpen(true)}
          style={{
            position: 'relative', height: 190,
            background: 'var(--bg-soft)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '1.5rem', overflow: 'hidden', cursor: 'pointer',
          }}
        >
          <div style={{
            position: 'absolute', inset: 0,
            background: `linear-gradient(135deg, ${bundle.color}12 0%, transparent 60%)`,
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', top: 14, left: 14,
            background: bundle.color, color: '#fff',
            padding: '.3rem .85rem', borderRadius: 20,
            fontSize: '.72rem', fontWeight: 700, letterSpacing: '.5px', zIndex: 1,
          }}>{bundle.badge}</div>

          {/* View details hint */}
          <div style={{
            position: 'absolute', top: 14, right: 14,
            background: 'rgba(0,0,0,.28)', backdropFilter: 'blur(6px)',
            borderRadius: 8, padding: '3px 9px',
            fontSize: '.65rem', color: 'rgba(255,255,255,.85)', fontWeight: 600,
            zIndex: 1, letterSpacing: '.3px',
          }}>View details →</div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', zIndex: 1 }}>
            {products.map((p, i) => (
              <React.Fragment key={p.id}>
                <div style={{
                  width: i === 0 ? 92 : 64, height: i === 0 ? 92 : 64,
                  flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: 'var(--bg-surface)', borderRadius: 12,
                  padding: '.5rem', border: '1px solid var(--border-color)',
                  boxShadow: '0 4px 12px rgba(0,0,0,.06)',
                }}>
                  <img src={p.image} alt={p.name}
                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                </div>
                {i < products.length - 1 && (
                  <span style={{ color: 'var(--text-muted)', fontSize: '1.3rem', fontWeight: 300, lineHeight: 1 }}>+</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* ── Content ── */}
        <div style={{ padding: '1.4rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '1.06rem', fontWeight: 800, marginBottom: '.35rem', color: 'var(--text-main)' }}>
            {bundle.name}
          </h3>
          <p style={{ fontSize: '.82rem', color: 'var(--text-muted)', marginBottom: '1rem', lineHeight: 1.55 }}>
            {bundle.tagline}
          </p>

          {/* Items list */}
          <div style={{ marginBottom: '1.1rem', display: 'flex', flexDirection: 'column', gap: '.45rem' }}>
            {products.map(p => (
              <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '.81rem' }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: bundle.color, flexShrink: 0 }} />
                <span style={{ color: 'var(--text-secondary)', flex: 1 }}>{p.name}</span>
                <span style={{ color: 'var(--text-muted)', fontWeight: 600, flexShrink: 0 }}>
                  {formatPrice(p.price, currency)}
                </span>
              </div>
            ))}
          </div>

          {/* Pricing box */}
          <div style={{
            padding: '.95rem 1rem', borderRadius: 12,
            background: `${bundle.color}0a`, border: `1px solid ${bundle.color}26`,
            marginBottom: '1.1rem',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '.4rem' }}>
              <span style={{ fontSize: '.78rem', color: 'var(--text-muted)' }}>Total value</span>
              <span style={{ fontSize: '.83rem', textDecoration: 'line-through', color: 'var(--text-muted)' }}>
                {formatPrice(originalTotal, currency)}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '.5rem' }}>
              <span style={{ fontSize: '.78rem', color: '#10B981', fontWeight: 700 }}>You save ({bundle.discountPct}%)</span>
              <span style={{ fontSize: '.83rem', color: '#10B981', fontWeight: 700 }}>−{formatPrice(savings, currency)}</span>
            </div>
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              paddingTop: '.5rem', borderTop: '1px solid var(--border-color)',
            }}>
              <span style={{ fontWeight: 800, fontSize: '.9rem', color: 'var(--text-main)' }}>Bundle Price</span>
              <span style={{ fontWeight: 800, fontSize: '1.15rem', color: bundle.color }}>
                {formatPrice(discountedTotal, currency)}
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => setModalOpen(true)}
              style={{
                flex: 1, padding: '.8rem', borderRadius: 12,
                background: 'var(--bg-soft)', border: '1px solid var(--border-color)',
                color: 'var(--text-main)', fontWeight: 600, fontSize: '.84rem',
                cursor: 'pointer', transition: 'all .18s',
              }}
              onMouseOver={e => { e.currentTarget.style.borderColor = bundle.color; e.currentTarget.style.color = bundle.color; }}
              onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.color = 'var(--text-main)'; }}
            >
              View Details
            </button>
            <button
              onClick={handleAdd}
              disabled={!inStock}
              style={{
                flex: 2, padding: '.8rem', borderRadius: 12, border: 'none',
                background: added ? '#10B981' : !inStock ? 'var(--bg-soft)' : bundle.color,
                color: inStock ? '#fff' : 'var(--text-muted)',
                fontWeight: 700, fontSize: '.84rem',
                cursor: inStock ? 'pointer' : 'not-allowed',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
                transition: 'all .2s', opacity: !inStock ? 0.7 : 1,
              }}
            >
              {added
                ? <><Check size={15} /> Added!</>
                : inStock
                  ? <><Package size={15} /> Add to Cart</>
                  : 'Unavailable'
              }
            </button>
          </div>

          {!inStock && (
            <p style={{ textAlign: 'center', fontSize: '.73rem', color: '#EF4444', marginTop: '.5rem' }}>
              One or more items are out of stock.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default BundleCard;
