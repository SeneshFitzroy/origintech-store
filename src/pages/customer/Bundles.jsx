import React from 'react';
import { Link } from 'react-router-dom';
import { Package, ArrowRight, Tag, Zap } from 'lucide-react';
import { mockBundles } from '../../data/mockData';
import BundleCard from '../../components/common/BundleCard';

const HOW_STEPS = [
  {
    step: '01',
    title: 'Choose a Bundle',
    desc: 'Pick a curated set designed for your lifestyle.',
  },
  {
    step: '02',
    title: 'Add to Cart',
    desc: 'All items land in your cart instantly.',
  },
  {
    step: '03',
    title: 'Save at Checkout',
    desc: 'Bundle discount is applied automatically — no coupon needed.',
  },
];

const Bundles = () => {
  return (
    <div style={{ backgroundColor: 'var(--bg-main)', minHeight: '100vh' }}>

      {/* ── Hero header ── */}
      <div style={{
        background: 'linear-gradient(135deg, #001433 0%, #001f4d 100%)',
        padding: '4rem 1rem 3.5rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Atmosphere */}
        <div style={{ position: 'absolute', top: '-30%', right: '-10%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle,rgba(0,74,198,.15) 0%,transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-20%', left: '-10%', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle,rgba(0,60,157,.12) 0%,transparent 60%)', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(0,74,198,.18)',
            border: '1px solid rgba(0,74,198,.35)',
            borderRadius: 999,
            padding: '.4rem 1.1rem',
            marginBottom: '1.25rem',
            fontSize: '.78rem',
            color: '#80b3ff',
            fontWeight: 700,
            letterSpacing: '.3px',
          }}>
            <Package size={14} /> Exclusive Bundle Deals
          </div>

          <h1 style={{
            fontSize: 'clamp(2.2rem,5vw,3.2rem)',
            fontWeight: 800,
            color: '#F1F5F9',
            marginBottom: '.85rem',
            lineHeight: 1.1,
            letterSpacing: '-.03em',
          }}>
            More value.<br/>
            <span style={{ color: '#4d94ff' }}>One click.</span>
          </h1>
          <p style={{
            color: '#94A3B8',
            maxWidth: 520,
            margin: '0 auto 2rem',
            lineHeight: 1.75,
            fontSize: '1rem',
          }}>
            Curated bundles of devices and accessories with exclusive package discounts applied automatically at checkout. No codes. No fuss.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            {[
              { icon: <Tag size={14} />, text: 'Up to 15% off' },
              { icon: <Zap size={14} />, text: 'Auto-applied discount' },
              { icon: <Package size={14} />, text: 'Free delivery on all bundles' },
            ].map((b, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 6,
                fontSize: '.82rem', color: '#64748B', fontWeight: 500,
              }}>
                <span style={{ color: '#475569' }}>{b.icon}</span>
                {b.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '3rem 1rem 5rem' }}>

        {/* ── How it works ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: '1rem', marginBottom: '3.5rem' }}>
          {HOW_STEPS.map((s, i) => (
            <div key={i} style={{
              padding: '1.5rem',
              background: 'var(--bg-surface)',
              borderRadius: 16,
              border: '1px solid var(--border-color)',
              display: 'flex',
              gap: '1rem',
              alignItems: 'flex-start',
            }}>
              <div style={{
                fontSize: '1.8rem',
                fontWeight: 900,
                color: 'var(--primary-blue)',
                opacity: .15,
                lineHeight: 1,
                flexShrink: 0,
                userSelect: 'none',
              }}>
                {s.step}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '.92rem', marginBottom: '.3rem', color: 'var(--text-main)' }}>{s.title}</div>
                <div style={{ fontSize: '.82rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Bundle grid ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(310px,1fr))', gap: '2rem' }}>
          {mockBundles.map(bundle => (
            <BundleCard key={bundle.id} bundle={bundle} />
          ))}
        </div>

        {/* ── Footer CTA ── */}
        <div style={{
          textAlign: 'center',
          marginTop: '4rem',
          padding: '3rem',
          background: 'var(--bg-surface)',
          borderRadius: 20,
          border: '1px solid var(--border-color)',
        }}>
          <p style={{ color: 'var(--text-muted)', marginBottom: '.75rem', fontSize: '.92rem' }}>
            Looking for individual products instead?
          </p>
          <Link
            to="/browse"
            className="btn-primary"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '1rem 2rem', borderRadius: 12 }}
          >
            Browse All Products <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Bundles;
