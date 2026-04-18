import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, CreditCard, Truck, Tag, AlertTriangle } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { formatPrice } from '../../data/mockData';

const VALID_COUPONS = {
  'ORIGIN10': 0.10,
  'SAVE15':   0.15,
  'WELCOME20': 0.20,
};

const Checkout = () => {
  const { cart, currency, setCart } = useAppContext();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  // Step 1 — delivery form state
  const [delivery, setDelivery] = useState({
    firstName: '', lastName: '', address: '', city: '', postal: '', phone: ''
  });

  // Step 2 — payment state
  const [payment, setPayment] = useState({
    method: 'card', cardNumber: '', expiry: '', cvv: ''
  });

  // Coupon
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');

  if (cart.length === 0 && step === 1) {
    navigate('/cart');
    return null;
  }

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = appliedCoupon ? subtotal * VALID_COUPONS[appliedCoupon] : 0;
  const total = subtotal - discount;

  const handleApplyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (VALID_COUPONS[code]) {
      setAppliedCoupon(code);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code. Try ORIGIN10, SAVE15, or WELCOME20.');
      setAppliedCoupon(null);
    }
  };

  const handlePlaceOrder = () => {
    // Simulate 20% payment failure
    const failed = Math.random() < 0.2;
    setCart([]);
    if (failed) {
      navigate('/payment-failed');
    } else {
      navigate('/confirmation');
    }
  };

  const cardLast4 = payment.cardNumber.replace(/\s/g, '').slice(-4) || '????';
  const fullName = `${delivery.firstName} ${delivery.lastName}`.trim() || 'Not provided';

  const renderStepIndicator = () => (
    <div className="flex justify-between items-center" style={{ marginBottom: '3rem', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '50%', left: 0, width: '100%', height: '2px', backgroundColor: 'var(--border-color)', zIndex: 0 }} />
      <div style={{ position: 'absolute', top: '50%', left: 0, width: step === 1 ? '0%' : step === 2 ? '50%' : '100%', height: '2px', backgroundColor: 'var(--primary-blue)', zIndex: 1, transition: 'width 0.4s ease' }} />
      {[
        { num: 1, label: 'Delivery', icon: <Truck size={16} /> },
        { num: 2, label: 'Payment', icon: <CreditCard size={16} /> },
        { num: 3, label: 'Review', icon: <Check size={16} /> }
      ].map(s => (
        <div key={s.num} style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: step > s.num ? 'pointer' : 'default' }} onClick={() => step > s.num && setStep(s.num)}>
          <div style={{
            width: '44px', height: '44px', borderRadius: '50%',
            backgroundColor: step >= s.num ? 'var(--primary-blue)' : 'var(--bg-surface)',
            color: step >= s.num ? 'white' : 'var(--text-muted)',
            border: step >= s.num ? 'none' : '2px solid var(--border-color)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: '0.5rem', transition: 'all 0.3s ease',
            boxShadow: step >= s.num ? '0 4px 12px rgba(37,99,235,0.3)' : 'none'
          }}>
            {step > s.num ? <Check size={20} /> : s.icon}
          </div>
          <span style={{ fontSize: '0.85rem', fontWeight: step >= s.num ? 600 : 400, color: step >= s.num ? 'var(--text-main)' : 'var(--text-muted)' }}>{s.label}</span>
        </div>
      ))}
    </div>
  );

  const inputStyle = {
    width: '100%', padding: '0.75rem 1rem',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--border-color)',
    background: 'var(--bg-main)',
    color: 'var(--text-main)',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'border-color 0.2s'
  };

  const labelStyle = { display: 'block', marginBottom: '0.5rem', fontSize: '0.88rem', fontWeight: 500, color: 'var(--text-muted)' };

  return (
    <div style={{ backgroundColor: 'var(--bg-main)', minHeight: '100vh', padding: '3rem 1rem' }}>
      <div className="container">
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, textAlign: 'center', marginBottom: '2.5rem', color: 'var(--text-main)' }}>Checkout</h1>

        <div style={{ maxWidth: '820px', margin: '0 auto' }}>
          {renderStepIndicator()}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '2rem', alignItems: 'flex-start' }}>

            {/* Main Step Panel */}
            <div className="card" style={{ padding: '2rem' }}>

              {/* ── STEP 1: DELIVERY ── */}
              {step === 1 && (
                <form onSubmit={e => { e.preventDefault(); setStep(2); }}>
                  <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1.5rem' }}>Delivery Details</h2>
                  <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <label style={labelStyle}>First Name</label>
                      <input required style={inputStyle} value={delivery.firstName} onChange={e => setDelivery({ ...delivery, firstName: e.target.value })} placeholder="John" />
                    </div>
                    <div>
                      <label style={labelStyle}>Last Name</label>
                      <input required style={inputStyle} value={delivery.lastName} onChange={e => setDelivery({ ...delivery, lastName: e.target.value })} placeholder="Doe" />
                    </div>
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={labelStyle}>Street Address</label>
                    <input required style={inputStyle} value={delivery.address} onChange={e => setDelivery({ ...delivery, address: e.target.value })} placeholder="123 Main Street" />
                  </div>
                  <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <label style={labelStyle}>City</label>
                      <input required style={inputStyle} value={delivery.city} onChange={e => setDelivery({ ...delivery, city: e.target.value })} placeholder="Colombo" />
                    </div>
                    <div>
                      <label style={labelStyle}>Postal Code</label>
                      <input required style={inputStyle} value={delivery.postal} onChange={e => setDelivery({ ...delivery, postal: e.target.value })} placeholder="00100" />
                    </div>
                  </div>
                  <div style={{ marginBottom: '2rem' }}>
                    <label style={labelStyle}>Phone Number</label>
                    <input required style={inputStyle} value={delivery.phone} onChange={e => setDelivery({ ...delivery, phone: e.target.value })} placeholder="+94 77 123 4567" type="tel" />
                  </div>
                  <button type="submit" className="btn-primary" style={{ width: '100%', padding: '1rem', fontSize: '1rem', fontWeight: 600 }}>
                    Continue to Payment →
                  </button>
                </form>
              )}

              {/* ── STEP 2: PAYMENT ── */}
              {step === 2 && (
                <div>
                  <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1.5rem' }}>Payment Method</h2>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    {[
                      { key: 'card', label: 'Credit / Debit Card', icon: 'card' },
                      { key: 'paypal', label: 'PayPal', icon: 'pp' },
                      { key: 'cod', label: 'Cash on Delivery', icon: 'cod' },
                    ].map(m => (
                      <label key={m.key} style={{
                        display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.9rem 1.25rem',
                        border: `2px solid ${payment.method === m.key ? 'var(--primary-blue)' : 'var(--border-color)'}`,
                        borderRadius: 'var(--radius-md)', cursor: 'pointer',
                        background: payment.method === m.key ? 'rgba(37,99,235,0.05)' : 'var(--bg-surface)',
                        transition: 'all 0.2s'
                      }}>
                        <input type="radio" name="payment" checked={payment.method === m.key} onChange={() => setPayment({ ...payment, method: m.key })} />
                        <span style={{ fontSize: '1.2rem' }}>{m.icon}</span>
                        <span style={{ fontWeight: 600 }}>{m.label}</span>
                      </label>
                    ))}
                  </div>

                  {payment.method === 'card' && (
                    <div style={{ padding: '1.5rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', background: 'var(--bg-surface)' }}>
                      <div style={{ marginBottom: '1rem' }}>
                        <label style={labelStyle}>Card Number</label>
                        <input
                          style={inputStyle}
                          placeholder="0000 0000 0000 0000"
                          maxLength={19}
                          value={payment.cardNumber}
                          onChange={e => {
                            const val = e.target.value.replace(/\D/g, '').slice(0, 16);
                            const formatted = val.match(/.{1,4}/g)?.join(' ') || val;
                            setPayment({ ...payment, cardNumber: formatted });
                          }}
                        />
                      </div>
                      <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                          <label style={labelStyle}>Expiry Date</label>
                          <input style={inputStyle} placeholder="MM/YY" maxLength={5} value={payment.expiry}
                            onChange={e => {
                              let val = e.target.value.replace(/\D/g, '').slice(0, 4);
                              if (val.length > 2) val = val.slice(0, 2) + '/' + val.slice(2);
                              setPayment({ ...payment, expiry: val });
                            }} />
                        </div>
                        <div>
                          <label style={labelStyle}>CVV</label>
                          <input style={inputStyle} placeholder="123" maxLength={3} type="password" value={payment.cvv}
                            onChange={e => setPayment({ ...payment, cvv: e.target.value.replace(/\D/g, '').slice(0, 3) })} />
                        </div>
                      </div>
                    </div>
                  )}

                  {payment.method === 'paypal' && (
                    <div style={{ padding: '1.5rem', textAlign: 'center', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
                      You'll be redirected to PayPal to complete payment securely.
                    </div>
                  )}

                  {payment.method === 'cod' && (
                    <div style={{ padding: '1.5rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', color: 'var(--text-muted)', background: 'var(--bg-surface)' }}>
                      Pay with cash when your order is delivered. Additional COD fee may apply.
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button className="btn-primary" style={{ flex: 1, background: 'var(--bg-surface)', color: 'var(--text-main)', border: '1px solid var(--border-color)' }} onClick={() => setStep(1)}>← Back</button>
                    <button className="btn-primary" style={{ flex: 2, padding: '1rem', fontWeight: 600 }} onClick={() => setStep(3)}>Review Order →</button>
                  </div>
                </div>
              )}

              {/* ── STEP 3: REVIEW ── */}
              {step === 3 && (
                <div>
                  <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1.5rem' }}>Review & Place Order</h2>

                  {/* Order Items */}
                  <div style={{ backgroundColor: 'var(--bg-soft)', padding: '1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem', border: '1px solid var(--border-color)' }}>
                    <h3 style={{ fontSize: '0.9rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)', marginBottom: '1rem' }}>Order Items</h3>
                    {cart.map(item => (
                      <div key={item.cartId} className="flex justify-between items-center" style={{ marginBottom: '0.6rem' }}>
                        <div style={{ fontSize: '0.95rem' }}>
                          <span style={{ fontWeight: 600 }}>{item.quantity}×</span> {item.name}
                          {item.selectedColor && <span style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}> · {item.selectedColor}</span>}
                          {item.selectedStorage && <span style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}> · {item.selectedStorage}</span>}
                        </div>
                        <div style={{ fontWeight: 600 }}>{formatPrice(item.price * item.quantity, currency)}</div>
                      </div>
                    ))}
                  </div>

                  {/* Delivery + Payment summary — from real form state */}
                  <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                    <div style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', background: 'var(--bg-surface)' }}>
                      <div className="flex justify-between items-center" style={{ marginBottom: '0.5rem' }}>
                        <h4 style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Delivery</h4>
                        <button onClick={() => setStep(1)} style={{ color: 'var(--primary-blue)', fontSize: '0.82rem', fontWeight: 600 }}>Edit</button>
                      </div>
                      <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text-main)' }}>
                        {fullName}<br />
                        {delivery.address || '—'}<br />
                        {delivery.city}{delivery.postal ? `, ${delivery.postal}` : ''}<br />
                        {delivery.phone || '—'}
                      </p>
                    </div>
                    <div style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', background: 'var(--bg-surface)' }}>
                      <div className="flex justify-between items-center" style={{ marginBottom: '0.5rem' }}>
                        <h4 style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>Payment</h4>
                        <button onClick={() => setStep(2)} style={{ color: 'var(--primary-blue)', fontSize: '0.82rem', fontWeight: 600 }}>Edit</button>
                      </div>
                      <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: 'var(--text-main)' }}>
                        {payment.method === 'card' && `Visa ending in ${cardLast4}`}
                        {payment.method === 'paypal' && 'PayPal'}
                        {payment.method === 'cod' && 'Cash on Delivery'}
                      </p>
                    </div>
                  </div>

                  {/* Price Breakdown */}
                  <div style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', background: 'var(--bg-surface)' }}>
                    <div className="flex justify-between" style={{ marginBottom: '0.5rem', fontSize: '0.95rem' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Subtotal</span>
                      <span>{formatPrice(subtotal, currency)}</span>
                    </div>
                    {appliedCoupon && (
                      <div className="flex justify-between" style={{ marginBottom: '0.5rem', fontSize: '0.95rem', color: '#10B981' }}>
                        <span>Coupon ({appliedCoupon}) -{Math.round(VALID_COUPONS[appliedCoupon] * 100)}%</span>
                        <span>-{formatPrice(discount, currency)}</span>
                      </div>
                    )}
                    <div className="flex justify-between" style={{ marginBottom: '0.5rem', fontSize: '0.95rem' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Delivery</span>
                      <span style={{ color: '#10B981', fontWeight: 600 }}>FREE</span>
                    </div>
                    <div className="flex justify-between" style={{ fontSize: '1.25rem', fontWeight: 800, paddingTop: '0.75rem', borderTop: '2px solid var(--border-color)', marginTop: '0.5rem' }}>
                      <span>Total</span>
                      <span style={{ color: 'var(--primary-blue)' }}>{formatPrice(total, currency)}</span>
                    </div>
                  </div>

                  <button
                    className="btn-primary"
                    style={{ width: '100%', padding: '1.1rem', fontSize: '1.05rem', fontWeight: 700 }}
                    onClick={handlePlaceOrder}
                  >
                    Place Order — {formatPrice(total, currency)}
                  </button>
                  <p style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.75rem' }}>
                    Your payment is secured with 256-bit SSL encryption
                  </p>
                </div>
              )}
            </div>

            {/* ── ORDER SUMMARY SIDEBAR ── */}
            <div style={{ position: 'sticky', top: '6rem' }}>
              <div className="card" style={{ padding: '1.5rem', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
                  Order Summary
                </h3>
                {cart.map(item => (
                  <div key={item.cartId} className="flex justify-between items-center" style={{ marginBottom: '0.75rem', fontSize: '0.88rem' }}>
                    <div style={{ flex: 1, paddingRight: '0.5rem' }}>
                      <div style={{ fontWeight: 600 }}>{item.name}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Qty: {item.quantity}</div>
                    </div>
                    <div style={{ fontWeight: 600 }}>{formatPrice(item.price * item.quantity, currency)}</div>
                  </div>
                ))}

                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', marginTop: '0.5rem' }}>
                  <div className="flex justify-between" style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                    <span>Subtotal</span><span>{formatPrice(subtotal, currency)}</span>
                  </div>
                  {appliedCoupon && (
                    <div className="flex justify-between" style={{ fontSize: '0.88rem', color: '#10B981', marginBottom: '0.4rem' }}>
                      <span>Discount</span><span>-{formatPrice(discount, currency)}</span>
                    </div>
                  )}
                  <div className="flex justify-between" style={{ fontSize: '1.05rem', fontWeight: 700, marginTop: '0.5rem' }}>
                    <span>Total</span><span style={{ color: 'var(--primary-blue)' }}>{formatPrice(total, currency)}</span>
                  </div>
                </div>
              </div>

              {/* Coupon Code */}
              <div className="card" style={{ padding: '1.25rem' }}>
                <div className="flex items-center gap-2" style={{ marginBottom: '0.75rem' }}>
                  <Tag size={16} style={{ color: 'var(--primary-blue)' }} />
                  <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Coupon Code</span>
                </div>
                {appliedCoupon ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.6rem 0.9rem', backgroundColor: '#F0FDF4', border: '1px solid #86EFAC', borderRadius: 'var(--radius-md)' }}>
                    <span style={{ color: '#16A34A', fontWeight: 600, fontSize: '0.88rem' }}>✓ {appliedCoupon} applied!</span>
                    <button onClick={() => { setAppliedCoupon(null); setCouponInput(''); }} style={{ color: '#EF4444', fontSize: '0.8rem', fontWeight: 500 }}>Remove</button>
                  </div>
                ) : (
                  <>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter code..."
                        value={couponInput}
                        onChange={e => { setCouponInput(e.target.value); setCouponError(''); }}
                        onKeyDown={e => e.key === 'Enter' && handleApplyCoupon()}
                        style={{ ...inputStyle, flex: 1, padding: '0.6rem 0.8rem', fontSize: '0.88rem' }}
                      />
                      <button
                        onClick={handleApplyCoupon}
                        className="btn-primary"
                        style={{ padding: '0.6rem 1rem', fontSize: '0.85rem', whiteSpace: 'nowrap' }}
                      >
                        Apply
                      </button>
                    </div>
                    {couponError && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#EF4444', fontSize: '0.78rem', marginTop: '0.5rem' }}>
                        <AlertTriangle size={13} /> {couponError}
                      </div>
                    )}
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                      Try: ORIGIN10, SAVE15, WELCOME20
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
