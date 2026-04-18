import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, ShieldCheck, ChevronRight, Minus, Plus, Zap } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { formatPrice } from '../../data/mockData';

const SHIP_DATE = new Date('2026-12-15T00:00:00');
const FULL_PRICE = 950000;
const DEPOSIT_PRICE = 100000;
const MAX_QTY = 2;

const useCountdown = (targetDate) => {
  const calc = () => {
    const diff = targetDate - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days:    Math.floor(diff / 86400000),
      hours:   Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };
  const [time, setTime] = useState(calc());
  useEffect(() => {
    const t = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(t);
  }, []);
  return time;
};

const PreOrder = () => {
  const navigate = useNavigate();
  const { cart, setCart, currency } = useAppContext();
  const [paymentType, setPaymentType] = useState('deposit');
  const [quantity, setQuantity] = useState(1);
  const countdown = useCountdown(SHIP_DATE);

  const itemPrice = paymentType === 'deposit' ? DEPOSIT_PRICE : FULL_PRICE;
  const totalPrice = itemPrice * quantity;

  const handlePreOrder = () => {
    const item = {
      id: 'vision-x',
      name: `Origin Vision X × ${quantity} — Pre-Order (${paymentType === 'deposit' ? 'Deposit' : 'Full Price'})`,
      price: itemPrice,
      quantity,
      image: '/images/vision.png',
      cartId: `vision-x-${Date.now()}`
    };
    setCart([...cart, item]);
    navigate('/checkout');
  };

  const pad = n => String(n).padStart(2, '0');

  const timeUnits = [
    { label: 'Days',    value: countdown.days },
    { label: 'Hours',   value: countdown.hours },
    { label: 'Minutes', value: countdown.minutes },
    { label: 'Seconds', value: countdown.seconds },
  ];

  return (
    <div style={{ backgroundColor: 'var(--bg-main)', minHeight: '100vh', padding: '3rem 1rem' }}>
      <div className="container">
        <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'flex-start' }}>

          {/* Left — Image & Countdown */}
          <div>
            <div style={{
              width: '100%', height: '460px', backgroundColor: 'var(--premium-navy)',
              borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative', overflow: 'hidden',
              boxShadow: '0 32px 80px rgba(0,0,0,0.2)'
            }}>
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 40%, rgba(0,74,198,0.35) 0%, transparent 70%)' }} />
              <img src="/images/vision.png" alt="Origin Vision X spatial computing headset" style={{ zIndex: 1, objectFit: 'contain', height: '75%', filter: 'drop-shadow(0 20px 40px rgba(0,74,198,0.3))' }} />
              <div style={{ position: 'absolute', top: '1.25rem', left: '1.25rem', background: '#EF4444', color: 'white', padding: '0.4rem 1rem', borderRadius: '999px', fontWeight: 700, fontSize: '0.82rem', zIndex: 2, display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Zap size={13} /> Limited Pre-Order
              </div>
            </div>

            {/* Countdown Timer */}
            <div style={{ marginTop: '1.75rem', padding: '1.5rem', background: 'var(--bg-surface)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
              <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                <div className="flex items-center justify-center gap-2" style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 600 }}>
                  <Clock size={15} /> Ships December 15, 2026
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '0.75rem' }}>
                {timeUnits.map(u => (
                  <div key={u.label} style={{ textAlign: 'center', padding: '1rem 0.5rem', background: 'var(--bg-main)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary-blue)', fontVariantNumeric: 'tabular-nums', lineHeight: 1 }}>
                      {pad(u.value)}
                    </div>
                    <div style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', color: 'var(--text-muted)', marginTop: '0.35rem', letterSpacing: '0.5px' }}>
                      {u.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Details & Order */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#EF4444', fontWeight: 600, marginBottom: '0.75rem', fontSize: '0.9rem' }}>
              <ShieldCheck size={16} /> Authenticity Guaranteed
            </div>
            <h1 style={{ fontSize: '3rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '0.75rem', color: 'var(--text-main)' }}>
              Origin<br />Vision X
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '2rem', lineHeight: 1.65 }}>
              Secure the next generation of spatial computing. Limited quantities available for the inaugural production run.
            </p>

            {/* Pre-Order Options */}
            <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem', border: '2px solid var(--primary-blue)' }}>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)', marginBottom: '1rem' }}>Choose Payment Plan</h3>
              {[
                { key: 'deposit', label: 'Deposit Now', sub: 'Pay the rest before shipping', price: DEPOSIT_PRICE },
                { key: 'full',    label: 'Pay in Full',  sub: 'Guaranteed day-one delivery', price: FULL_PRICE },
              ].map(opt => (
                <label key={opt.key} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '0.9rem 1rem', border: `2px solid ${paymentType === opt.key ? 'var(--primary-blue)' : 'var(--border-color)'}`,
                  borderRadius: 'var(--radius-md)', marginBottom: '0.75rem', cursor: 'pointer',
                  background: paymentType === opt.key ? 'rgba(0,74,198,0.05)' : 'var(--bg-surface)',
                  transition: 'all 0.2s'
                }}>
                  <div className="flex items-center gap-3">
                    <input type="radio" name="paymentType" checked={paymentType === opt.key} onChange={() => setPaymentType(opt.key)} style={{ accentColor: 'var(--primary-blue)' }} />
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{opt.label}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{opt.sub}</div>
                    </div>
                  </div>
                  <div style={{ fontWeight: 700, color: 'var(--primary-blue)' }}>{formatPrice(opt.price, currency)}</div>
                </label>
              ))}
            </div>

            {/* Quantity Selector */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
                Quantity <span style={{ color: '#EF4444', fontSize: '0.8rem' }}>(Max {MAX_QTY} per customer)</span>
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  style={{ width: '40px', height: '40px', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--bg-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: quantity <= 1 ? 'not-allowed' : 'pointer', opacity: quantity <= 1 ? 0.4 : 1 }}
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>
                <span style={{ fontSize: '1.3rem', fontWeight: 700, minWidth: '30px', textAlign: 'center' }}>{quantity}</span>
                <button
                  onClick={() => setQuantity(q => Math.min(MAX_QTY, q + 1))}
                  disabled={quantity >= MAX_QTY}
                  style={{ width: '40px', height: '40px', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--bg-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: quantity >= MAX_QTY ? 'not-allowed' : 'pointer', opacity: quantity >= MAX_QTY ? 0.4 : 1 }}
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>
                <div style={{ marginLeft: '0.5rem', fontSize: '1.3rem', fontWeight: 800, color: 'var(--primary-blue)' }}>
                  {formatPrice(totalPrice, currency)}
                </div>
              </div>
              {quantity >= MAX_QTY && (
                <p style={{ fontSize: '0.78rem', color: '#F59E0B', marginTop: '0.4rem' }}>⚠ Maximum of {MAX_QTY} units per customer reached.</p>
              )}
            </div>

            <button
              onClick={handlePreOrder}
              className="btn-primary"
              style={{ width: '100%', padding: '1.1rem', fontSize: '1.05rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              Pre-Order Now — {formatPrice(totalPrice, currency)} <ChevronRight size={18} />
            </button>

            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {['14-day full refund policy on deposits', 'Limit 2 per customer (enforced)', 'Subject to allocation limits', 'Ships December 15, 2026'].map((item, i) => (
                <li key={i} style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ShieldCheck size={13} color="#10B981" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreOrder;
