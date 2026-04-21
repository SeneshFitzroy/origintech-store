import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, Check } from 'lucide-react';
import { mockProducts, formatPrice } from '../../data/mockData';
import { useAppContext } from '../../context/AppContext';

const BundleCard = ({ bundle }) => {
  const { currency, addBundleToCart } = useAppContext();
  const [added, setAdded] = useState(false);

  const products = bundle.productIds
    .map(id => mockProducts.find(p => p.id === id))
    .filter(Boolean);

  const originalTotal   = products.reduce((sum, p) => sum + p.price, 0);
  const savings         = Math.round(originalTotal * bundle.discountPct / 100);
  const discountedTotal = originalTotal - savings;
  const inStock         = products.every(p => p.inStock);

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!inStock) return;
    addBundleToCart(bundle, products);
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
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
      {/* ── Hero image collage (links to detail page) ── */}
      <Link
        to={`/bundle/${bundle.id}`}
        style={{
          display: 'block',
          position: 'relative', height: 190,
          background: 'var(--bg-soft)',
          overflow: 'hidden',
          textDecoration: 'none',
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

        <div style={{
          position: 'absolute', top: 14, right: 14,
          background: 'rgba(0,0,0,.28)', backdropFilter: 'blur(6px)',
          borderRadius: 8, padding: '3px 9px',
          fontSize: '.65rem', color: 'rgba(255,255,255,.85)', fontWeight: 600,
          zIndex: 1, letterSpacing: '.3px',
        }}>View details →</div>

        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: '1rem', zIndex: 1, height: '100%', padding: '1.5rem',
        }}>
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
      </Link>

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
          <Link
            to={`/bundle/${bundle.id}`}
            style={{
              flex: 1, padding: '.8rem', borderRadius: 12,
              background: 'var(--bg-soft)', border: '1px solid var(--border-color)',
              color: 'var(--text-main)', fontWeight: 600, fontSize: '.84rem',
              cursor: 'pointer', textDecoration: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all .18s',
            }}
            onMouseOver={e => { e.currentTarget.style.borderColor = bundle.color; e.currentTarget.style.color = bundle.color; }}
            onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.color = 'var(--text-main)'; }}
          >
            View Details
          </Link>
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
  );
};

export default BundleCard;
