import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ShieldCheck, ArrowLeft, Package, Check, Star, Truck, ArrowRight, Gift, Zap } from 'lucide-react';
import { mockBundles, mockProducts, formatPrice } from '../../data/mockData';
import { useAppContext } from '../../context/AppContext';

const BundleDetail = () => {
  const { id } = useParams();
  const { currency, addBundleToCart } = useAppContext();
  const [added, setAdded] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const bundle = mockBundles.find(b => b.id === id);

  if (!bundle) {
    return (
      <div style={{
        minHeight: '60vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', gap: '1.5rem',
        backgroundColor: 'var(--bg-main)',
      }}>
        <Gift size={48} style={{ color: 'var(--text-muted)' }} />
        <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: 'var(--text-main)' }}>Bundle not found</h2>
        <p style={{ color: 'var(--text-muted)' }}>This bundle may have been removed or the link is incorrect.</p>
        <Link to="/bundles" className="btn-primary" style={{ padding: '0.9rem 2.2rem', borderRadius: 13, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <ArrowLeft size={16} /> View All Bundles
        </Link>
      </div>
    );
  }

  const products     = bundle.productIds.map(pid => mockProducts.find(p => p.id === pid)).filter(Boolean);
  const originalTotal   = products.reduce((sum, p) => sum + p.price, 0);
  const savings         = Math.round(originalTotal * bundle.discountPct / 100);
  const discountedTotal = originalTotal - savings;
  const inStock         = products.every(p => p.inStock);

  const handleAdd = () => {
    if (!inStock) return;
    addBundleToCart(bundle, products);
    setAdded(true);
    setTimeout(() => setAdded(false), 2800);
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-main)', minHeight: '100vh' }}>

      {/* ── Hero ── */}
      <section style={{
        background: `linear-gradient(135deg, #001028 0%, ${bundle.color}cc 60%, ${bundle.color} 100%)`,
        color: '#fff', position: 'relative', overflow: 'hidden',
      }}>
        {/* atmosphere orbs */}
        <div style={{ position:'absolute', top:'-20%', right:'-10%', width:600, height:600, borderRadius:'50%',
          background:`radial-gradient(circle,${bundle.color}44 0%,transparent 65%)`, pointerEvents:'none' }}/>
        <div style={{ position:'absolute', bottom:'-30%', left:'-8%', width:500, height:500, borderRadius:'50%',
          background:'radial-gradient(circle,rgba(0,20,80,.4) 0%,transparent 60%)', pointerEvents:'none' }}/>

        <div className="container" style={{ padding: 'clamp(4rem,8vh,6rem) 1.5rem clamp(3rem,6vh,5rem)', position: 'relative', zIndex: 1 }}>
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '2rem' }}>
            <Link to="/bundles" style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              color: 'rgba(255,255,255,.6)', fontSize: '.82rem', fontWeight: 500,
              textDecoration: 'none', transition: 'color .18s',
            }}
              onMouseOver={e => e.currentTarget.style.color = '#fff'}
              onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,.6)'}
            >
              <ArrowLeft size={14} /> All Bundles
            </Link>
            <span style={{ color: 'rgba(255,255,255,.25)', fontSize: '.8rem' }}>/</span>
            <span style={{ color: 'rgba(255,255,255,.75)', fontSize: '.82rem' }}>{bundle.name}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap', marginBottom: '1.2rem' }}>
            <span style={{
              background: bundle.color, color: '#fff',
              padding: '.35rem 1rem', borderRadius: 20,
              fontSize: '.75rem', fontWeight: 700, letterSpacing: '.5px',
              boxShadow: `0 4px 16px ${bundle.color}55`,
            }}>{bundle.badge}</span>
            <span style={{
              background: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.18)',
              color: 'rgba(255,255,255,.85)', padding: '.35rem 1rem', borderRadius: 20,
              fontSize: '.75rem', fontWeight: 600,
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <Zap size={12} /> {bundle.discountPct}% Bundle Saving
            </span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.2rem,5vw,3.8rem)', fontWeight: 800,
            lineHeight: 1.05, letterSpacing: '-.03em',
            marginBottom: '1rem',
          }}>{bundle.name}</h1>

          <p style={{
            fontSize: 'clamp(.95rem,1.8vw,1.12rem)', color: 'rgba(255,255,255,.72)',
            maxWidth: 640, lineHeight: 1.75, marginBottom: '2rem',
          }}>{bundle.tagline}</p>

          {/* Trust micro-strip */}
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            {[
              { icon: <ShieldCheck size={14} />, text: 'Authenticity Verified' },
              { icon: <Truck size={14} />,       text: 'Free Delivery Included' },
              { icon: <Star size={14} />,         text: '12-Month Warranty' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '.78rem', color: 'rgba(255,255,255,.6)', fontWeight: 500 }}>
                <span style={{ color: 'rgba(255,255,255,.5)' }}>{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Main Content ── */}
      <div className="container" style={{ padding: 'clamp(3rem,6vh,5rem) 1.5rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0,1.6fr) minmax(0,1fr)',
          gap: 'clamp(2rem,4vw,3.5rem)',
          alignItems: 'start',
        }}>

          {/* ── LEFT: Product Image Showcase ── */}
          <div>
            <p style={{ fontSize: '.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.2px', color: 'var(--text-muted)', marginBottom: '1.2rem' }}>
              Products in this Bundle
            </p>

            {/* Centrepiece */}
            {products[0] && (
              <div style={{
                background: 'var(--bg-surface)', border: `2px solid ${bundle.color}44`,
                borderRadius: 20, overflow: 'hidden',
                boxShadow: `0 8px 40px ${bundle.color}18`,
                marginBottom: '1rem',
              }}>
                <div style={{
                  background: `linear-gradient(135deg, ${bundle.color}0a 0%, var(--bg-soft) 100%)`,
                  padding: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 260,
                }}>
                  <img src={products[0].image} alt={products[0].name}
                    style={{ maxWidth: '55%', maxHeight: 220, objectFit: 'contain',
                      filter: 'drop-shadow(0 16px 32px rgba(0,0,0,.15))' }} />
                </div>
                <div style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                  <div>
                    <div style={{ fontSize: '.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 4 }}>{products[0].brand}</div>
                    <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-main)', marginBottom: 2 }}>{products[0].name}</div>
                    <div style={{ fontSize: '.78rem', background: `${bundle.color}18`, color: bundle.color, borderRadius: 6, padding: '2px 10px', display: 'inline-block', fontWeight: 700 }}>★ Centrepiece</div>
                  </div>
                  <div style={{ fontWeight: 800, fontSize: '1.2rem', color: bundle.color }}>{formatPrice(products[0].price, currency)}</div>
                </div>
              </div>
            )}

            {/* Remaining products row */}
            {products.length > 1 && (
              <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(products.length - 1, 3)}, 1fr)`, gap: '1rem' }}>
                {products.slice(1).map(p => (
                  <div key={p.id} style={{
                    background: 'var(--bg-surface)', border: '1px solid var(--border-color)',
                    borderRadius: 16, overflow: 'hidden',
                    transition: 'box-shadow .2s, border-color .2s',
                  }}
                    onMouseOver={e => { e.currentTarget.style.boxShadow = `0 8px 24px ${bundle.color}22`; e.currentTarget.style.borderColor = `${bundle.color}55`; }}
                    onMouseOut={e => { e.currentTarget.style.boxShadow = ''; e.currentTarget.style.borderColor = 'var(--border-color)'; }}
                  >
                    <div style={{ background: 'var(--bg-soft)', padding: '1.4rem', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 140 }}>
                      <img src={p.image} alt={p.name} style={{ maxWidth: '80%', maxHeight: 110, objectFit: 'contain' }} />
                    </div>
                    <div style={{ padding: '1rem' }}>
                      <div style={{ fontSize: '.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.8px', marginBottom: 3 }}>{p.brand}</div>
                      <div style={{ fontWeight: 700, fontSize: '.88rem', color: 'var(--text-main)', marginBottom: 6, lineHeight: 1.3 }}>{p.name}</div>
                      <div style={{ fontWeight: 800, fontSize: '.95rem', color: bundle.color }}>{formatPrice(p.price, currency)}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ── RIGHT: Sidebar ── */}
          <div style={{ position: 'sticky', top: '6rem' }}>
            {/* Description */}
            {bundle.description && (
              <div style={{
                background: 'var(--bg-surface)', border: '1px solid var(--border-color)',
                borderRadius: 18, padding: '1.6rem', marginBottom: '1.25rem',
              }}>
                <p style={{ fontSize: '.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.2px', color: 'var(--text-muted)', marginBottom: '.75rem' }}>About this Bundle</p>
                <p style={{ fontSize: '.9rem', color: 'var(--text-secondary)', lineHeight: 1.78, margin: 0 }}>{bundle.description}</p>
              </div>
            )}

            {/* Price breakdown */}
            <div style={{
              background: 'var(--bg-surface)', border: `1px solid ${bundle.color}30`,
              borderRadius: 18, padding: '1.6rem', marginBottom: '1.25rem',
              boxShadow: `0 4px 24px ${bundle.color}10`,
            }}>
              <p style={{ fontSize: '.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.2px', color: 'var(--text-muted)', marginBottom: '1rem' }}>Price Breakdown</p>

              {products.map(p => (
                <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '.6rem' }}>
                  <span style={{ fontSize: '.86rem', color: 'var(--text-secondary)', maxWidth: '65%', lineHeight: 1.3 }}>{p.name}</span>
                  <span style={{ fontSize: '.86rem', color: 'var(--text-muted)', fontWeight: 600, flexShrink: 0 }}>{formatPrice(p.price, currency)}</span>
                </div>
              ))}

              <div style={{ height: 1, background: 'var(--border-color)', margin: '.9rem 0' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '.5rem' }}>
                <span style={{ fontSize: '.85rem', color: 'var(--text-muted)' }}>Total value</span>
                <span style={{ fontSize: '.85rem', textDecoration: 'line-through', color: 'var(--text-muted)' }}>{formatPrice(originalTotal, currency)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ fontSize: '.85rem', color: '#10B981', fontWeight: 700 }}>Bundle saving ({bundle.discountPct}%)</span>
                <span style={{ fontSize: '.85rem', color: '#10B981', fontWeight: 700 }}>−{formatPrice(savings, currency)}</span>
              </div>

              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                paddingTop: '1rem', borderTop: `2px solid ${bundle.color}30`,
              }}>
                <span style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-main)' }}>Bundle Price</span>
                <span style={{ fontWeight: 900, fontSize: '1.55rem', color: bundle.color, lineHeight: 1 }}>{formatPrice(discountedTotal, currency)}</span>
              </div>
            </div>

            {/* CTA */}
            <button
              onClick={handleAdd}
              disabled={!inStock}
              style={{
                width: '100%', padding: '1.1rem', borderRadius: 14, border: 'none',
                background: added ? '#10B981' : !inStock ? 'var(--bg-soft)' : bundle.color,
                color: inStock ? '#fff' : 'var(--text-muted)',
                fontWeight: 800, fontSize: '1rem', cursor: inStock ? 'pointer' : 'not-allowed',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                transition: 'all .22s cubic-bezier(.16,1,.3,1)',
                boxShadow: inStock && !added ? `0 8px 28px ${bundle.color}40` : 'none',
                marginBottom: '.85rem',
              }}
              onMouseOver={e => { if (inStock && !added) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 14px 36px ${bundle.color}55`; } }}
              onMouseOut={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = inStock && !added ? `0 8px 28px ${bundle.color}40` : 'none'; }}
            >
              {added
                ? <><Check size={20} /> Added to Cart!</>
                : !inStock
                  ? 'Currently Unavailable'
                  : <><Package size={20} /> Add Bundle to Cart</>
              }
            </button>

            {!inStock && (
              <p style={{ textAlign: 'center', fontSize: '.75rem', color: '#EF4444', marginBottom: '.85rem' }}>
                One or more items are currently out of stock.
              </p>
            )}

            {/* Auth note */}
            <div style={{
              display: 'flex', alignItems: 'flex-start', gap: 10,
              padding: '.95rem 1.1rem',
              background: 'rgba(16,185,129,.06)', border: '1px solid rgba(16,185,129,.2)',
              borderRadius: 12,
            }}>
              <ShieldCheck size={17} style={{ color: '#10B981', flexShrink: 0, marginTop: 1 }} />
              <span style={{ fontSize: '.8rem', color: '#047857', lineHeight: 1.65 }}>
                Every product in this bundle is 100% authenticity-verified and covered by a 12-month OriginTech warranty.
              </span>
            </div>
          </div>
        </div>

        {/* ── What's Included ── */}
        <div style={{ marginTop: 'clamp(3rem,6vh,5rem)' }}>
          <div style={{ marginBottom: '2rem' }}>
            <span style={{ fontSize: '.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.2px', color: 'var(--text-muted)' }}>Full breakdown</span>
            <h2 style={{ fontSize: 'clamp(1.6rem,3vw,2.2rem)', fontWeight: 800, color: 'var(--text-main)', marginTop: 4 }}>What's Included</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {products.map((p, i) => (
              <div key={p.id} style={{
                background: 'var(--bg-surface)', border: `1px solid ${i === 0 ? bundle.color + '40' : 'var(--border-color)'}`,
                borderRadius: 18, padding: '1.5rem',
                display: 'grid', gridTemplateColumns: '80px 1fr auto',
                gap: '1.5rem', alignItems: 'center',
                transition: 'box-shadow .2s',
              }}
                onMouseOver={e => e.currentTarget.style.boxShadow = '0 8px 28px rgba(0,0,0,.07)'}
                onMouseOut={e => e.currentTarget.style.boxShadow = ''}
              >
                <div style={{
                  width: 80, height: 80, borderRadius: 14,
                  background: 'var(--bg-soft)', border: '1px solid var(--border-color)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '.6rem', flexShrink: 0,
                }}>
                  <img src={p.image} alt={p.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
                    <span style={{ fontSize: '.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.8px', fontWeight: 600 }}>{p.brand}</span>
                    {i === 0 && (
                      <span style={{ fontSize: '.65rem', background: `${bundle.color}18`, color: bundle.color, borderRadius: 5, padding: '1px 8px', fontWeight: 700 }}>★ Centrepiece</span>
                    )}
                    {!p.inStock && (
                      <span style={{ fontSize: '.65rem', background: '#FEE2E2', color: '#DC2626', borderRadius: 5, padding: '1px 8px', fontWeight: 700 }}>Out of Stock</span>
                    )}
                  </div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '.4rem' }}>{p.name}</h3>
                  {p.description && (
                    <p style={{
                      fontSize: '.82rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: 0,
                      overflow: 'hidden', display: '-webkit-box',
                      WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                    }}>{p.description}</p>
                  )}
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <div style={{ fontWeight: 800, fontSize: '1.08rem', color: bundle.color }}>{formatPrice(p.price, currency)}</div>
                  <Link to={`/product/${p.id}`}
                    style={{ fontSize: '.75rem', color: 'var(--primary-blue)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 3, marginTop: 4 }}>
                    View <ArrowRight size={11} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom Trust Strip ── */}
        <div style={{
          marginTop: 'clamp(3rem,6vh,5rem)',
          background: 'var(--bg-surface)', border: '1px solid var(--border-color)',
          borderRadius: 20, padding: '2rem',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: '1.5rem',
        }}>
          {[
            { icon: <ShieldCheck size={22} style={{ color: '#10B981' }} />, title: 'Authenticity Guaranteed', sub: 'Every item 100% verified' },
            { icon: <Truck size={22} style={{ color: 'var(--primary-blue)' }} />,       title: 'Free Delivery',            sub: 'Included with every bundle' },
            { icon: <Star size={22} style={{ color: '#F59E0B' }} />,         title: '12-Month Warranty',       sub: 'Premium coverage on all items' },
            { icon: <Package size={22} style={{ color: bundle.color }} />,   title: `Save ${bundle.discountPct}% Today`,       sub: 'Best value, guaranteed' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ flexShrink: 0 }}>{item.icon}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '.88rem', color: 'var(--text-main)' }}>{item.title}</div>
                <div style={{ fontSize: '.75rem', color: 'var(--text-muted)', marginTop: 2 }}>{item.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Back link ── */}
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <Link to="/bundles" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            color: 'var(--primary-blue)', fontWeight: 600, fontSize: '.9rem',
            border: '1px solid var(--primary-blue)', padding: '.7rem 1.75rem',
            borderRadius: 999, transition: 'all .2s',
          }}
            onMouseOver={e => { e.currentTarget.style.background = 'var(--primary-blue)'; e.currentTarget.style.color = '#fff'; }}
            onMouseOut={e => { e.currentTarget.style.background = ''; e.currentTarget.style.color = 'var(--primary-blue)'; }}
          >
            <ArrowLeft size={15} /> Browse All Bundles
          </Link>
        </div>
      </div>

      {/* Responsive fix */}
      <style>{`
        @media (max-width: 860px) {
          .bd-main-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default BundleDetail;
