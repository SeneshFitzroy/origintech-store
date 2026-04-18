import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { XCircle, RefreshCw, CreditCard, LifeBuoy, ArrowRight, ShieldAlert } from 'lucide-react';

const PaymentFailed = () => {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: 'var(--bg-main)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 1rem' }}>
      <style>{`
        @keyframes shake { 0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-8px)} 40%,80%{transform:translateX(8px)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .fail-icon { animation: shake 0.5s ease 0.3s; }
        .fail-card { animation: fadeUp 0.4s ease forwards; }
        .recovery-btn { transition: transform 0.15s, box-shadow 0.15s; }
        .recovery-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.12); }
      `}</style>

      <div style={{ maxWidth: '560px', width: '100%' }}>

        {/* Error Card */}
        <div className="card fail-card" style={{ padding: '3rem 2.5rem', textAlign: 'center', borderTop: '4px solid #EF4444' }}>

          {/* Icon */}
          <div className="fail-icon" style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#FEF2F2', border: '2px solid #FECACA', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
            <XCircle size={44} color="#EF4444" />
          </div>

          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.75rem' }}>
            Payment Failed
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: 1.65, marginBottom: '0.5rem' }}>
            We couldn't process your payment. Your card was not charged.
          </p>

          {/* Error Code Box */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '0.5rem 1.1rem', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '999px', marginBottom: '2.5rem' }}>
            <ShieldAlert size={14} color="#EF4444" />
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#DC2626' }}>
              Error: PAYMENT_DECLINED · Code 4012
            </span>
          </div>

          {/* Common Reasons */}
          <div style={{ background: 'var(--bg-soft)', borderRadius: '12px', padding: '1.25rem 1.5rem', marginBottom: '2rem', textAlign: 'left', border: '1px solid var(--border-color)' }}>
            <p style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>Common Reasons</p>
            {[
              'Insufficient funds or daily limit reached',
              'Incorrect card details entered',
              'Card blocked for online transactions',
              'Temporary bank-side issue',
            ].map((r, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: i < 3 ? '0.5rem' : 0, fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                <span style={{ color: '#EF4444', flexShrink: 0, marginTop: '1px' }}>•</span> {r}
              </div>
            ))}
          </div>

          {/* Recovery Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <button
              className="btn-primary recovery-btn"
              onClick={() => navigate('/checkout')}
              style={{ padding: '0.95rem', fontSize: '1rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              <RefreshCw size={18} /> Try Again
            </button>

            <button
              className="recovery-btn"
              onClick={() => navigate('/checkout')}
              style={{ padding: '0.9rem', fontSize: '0.95rem', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', background: 'var(--bg-surface)', color: 'var(--text-main)', cursor: 'pointer' }}
            >
              <CreditCard size={18} /> Use a Different Card
            </button>

            <Link
              to="/support"
              className="recovery-btn"
              style={{ padding: '0.9rem', fontSize: '0.95rem', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', background: 'var(--bg-surface)', color: 'var(--text-muted)', textDecoration: 'none' }}
            >
              <LifeBuoy size={18} /> Contact Support
            </Link>
          </div>

          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
            Your cart is saved. <Link to="/cart" style={{ color: 'var(--primary-blue)', fontWeight: 600 }}>View Cart</Link> &nbsp;·&nbsp;
            <Link to="/" style={{ color: 'var(--primary-blue)', fontWeight: 600 }}>Go Home</Link>
          </div>
        </div>

        {/* SSL Note */}
        <div style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
          All transactions are secured with 256-bit SSL encryption
        </div>
      </div>
    </div>
  );
};

export default PaymentFailed;
