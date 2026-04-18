import React, { useState, useEffect } from 'react';
import { Package, Truck, CheckCircle2, MapPin, MessageSquare, RefreshCw, ChevronRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const STEPS = [
  { name: 'Order Placed',      sub: 'Order received and confirmed',          time: 'Oct 25, 9:41 AM',  done: true  },
  { name: 'Payment Confirmed', sub: 'Payment processed successfully',        time: 'Oct 25, 10:15 AM', done: true  },
  { name: 'Packed',            sub: 'Items packed & quality checked',        time: 'Oct 26, 8:30 AM',  done: true  },
  { name: 'Dispatched',        sub: 'Handed to FastCourier Express',         time: 'Oct 26, 4:45 PM',  done: true  },
  { name: 'Out for Delivery',  sub: 'Your package is on the way',            time: 'Expected today',   done: false },
  { name: 'Delivered',         sub: 'Package delivered to your address',     time: 'Pending',          done: false },
];

const ACTIVE_IDX = 4; // next step index

const Tracking = () => {
  const [fillPct, setFillPct] = useState(0);

  useEffect(() => {
    // Animate the progress line fill on mount
    const t = setTimeout(() => setFillPct((4 / (STEPS.length - 1)) * 100), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ backgroundColor: 'var(--bg-main)', minHeight: '100vh' }}>
      <style dangerouslySetInnerHTML={{__html:`
        @keyframes pulseRing { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.25);opacity:.5} }
        .pulse-ring { animation: pulseRing 1.6s ease infinite; }
        @keyframes slideUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        .track-card { animation: slideUp .45s ease both; }
      `}}/>

      <div className="container" style={{ padding: '3rem 1rem 5rem', maxWidth: 860 }}>

        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 900, color: 'var(--text-main)', letterSpacing: '-.02em', marginBottom: '.25rem' }}>Order Tracking</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '.9rem' }}>Real-time delivery updates for your order</p>
        </div>

        {/* Status banner */}
        <div style={{ background: 'linear-gradient(135deg,var(--primary-blue),#1D4ED8)', borderRadius: 20, padding: '1.75rem 2rem', marginBottom: '2rem', color: '#fff', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '.8rem', opacity: .75, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: '.4rem' }}>Tracking ID</div>
            <div style={{ fontWeight: 800, fontSize: '1.4rem', fontFamily: 'monospace', letterSpacing: 2 }}>ORD-99231</div>
            <div style={{ opacity: .8, fontSize: '.85rem', marginTop: '.35rem', display: 'flex', alignItems: 'center', gap: 6 }}><Truck size={14}/> FastCourier Express · EN123456789LK</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '.8rem', opacity: .75, marginBottom: '.25rem' }}>Estimated Delivery</div>
            <div style={{ fontWeight: 800, fontSize: '1.3rem' }}>Today by 8:00 PM</div>
            <div style={{ fontSize: '.8rem', opacity: .75, display: 'flex', alignItems: 'center', gap: 5, justifyContent: 'flex-end', marginTop: '.25rem' }}><MapPin size={12}/> Colombo, LK</div>
          </div>
        </div>

        {/* Timeline card */}
        <div className="track-card" style={{ background: 'var(--bg-surface)', borderRadius: 20, border: '1px solid var(--border-color)', padding: '2rem', marginBottom: '1.5rem' }}>
          <h2 style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '2rem', color: 'var(--text-main)' }}>Delivery Timeline</h2>

          {/* Vertical track */}
          <div style={{ position: 'relative', paddingLeft: '3rem' }}>
            {/* bg line */}
            <div style={{ position: 'absolute', left: '1rem', top: 8, bottom: 8, width: 2, background: 'var(--border-color)' }}/>
            {/* fill line */}
            <div style={{ position: 'absolute', left: '1rem', top: 8, width: 2, background: 'var(--primary-blue)', height: `${fillPct}%`, transition: 'height .9s cubic-bezier(.22,1,.36,1)' }}/>

            {STEPS.map((step, i) => {
              const isActive = i === ACTIVE_IDX;
              const isPast   = step.done;
              const isFuture = !step.done && i > ACTIVE_IDX;

              return (
                <div key={i} style={{ position: 'relative', marginBottom: i < STEPS.length - 1 ? '2.25rem' : 0, display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                  {/* Dot */}
                  <div style={{ position: 'absolute', left: '-1.95rem', top: 2, zIndex: 2 }}>
                    {isPast ? (
                      <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--primary-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 0 4px var(--bg-surface)' }}>
                        <CheckCircle2 size={15} color="#fff" strokeWidth={2.5}/>
                      </div>
                    ) : isActive ? (
                      <div style={{ position: 'relative', width: 28, height: 28 }}>
                        <div className="pulse-ring" style={{ position: 'absolute', inset: -4, borderRadius: '50%', border: '2px solid var(--primary-blue)', opacity: .5 }}/>
                        <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#EFF6FF', border: '2.5px solid var(--primary-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 0 4px var(--bg-surface)' }}>
                          <Truck size={13} color="var(--primary-blue)" strokeWidth={2.5}/>
                        </div>
                      </div>
                    ) : (
                      <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--bg-soft)', border: '2px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 0 4px var(--bg-surface)' }}>
                        <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--border-color)' }}/>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div>
                    <div style={{ fontWeight: isActive || isPast ? 700 : 500, fontSize: '1rem', color: isFuture ? 'var(--text-muted)' : 'var(--text-main)', marginBottom: '.2rem' }}>{step.name}</div>
                    <div style={{ fontSize: '.83rem', color: 'var(--text-muted)', marginBottom: '.2rem' }}>{step.sub}</div>
                    <div style={{ fontSize: '.78rem', fontWeight: 600, color: isActive ? 'var(--primary-blue)' : 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Clock size={11}/> {step.time}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '1.25rem' }}>

          {/* Delivery address */}
          <div className="track-card" style={{ animationDelay: '.1s', background: 'var(--bg-surface)', borderRadius: 16, border: '1px solid var(--border-color)', padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>
              <MapPin size={16} color="var(--primary-blue)"/> Delivery Address
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '.88rem', lineHeight: 1.7 }}>
              John Doe<br/>123 Tech Lane, Apt 4B<br/>Colombo 03, 00300<br/>Sri Lanka
            </p>
          </div>

          {/* Courier info */}
          <div className="track-card" style={{ animationDelay: '.2s', background: 'var(--bg-surface)', borderRadius: 16, border: '1px solid var(--border-color)', padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1rem', fontWeight: 700, color: 'var(--text-main)' }}>
              <Truck size={16} color="var(--primary-blue)"/> Courier Details
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.6rem', fontSize: '.88rem' }}>
              {[['Courier','FastCourier Express'],['Tracking No','EN123456789LK'],['Contact','0112 456 789']].map(([l,v],i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>{l}</span>
                  <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Help */}
          <div className="track-card" style={{ animationDelay: '.3s', background: 'var(--bg-surface)', borderRadius: 16, border: '1px solid var(--border-color)', padding: '1.5rem' }}>
            <div style={{ fontWeight: 700, fontSize: '.95rem', marginBottom: '1rem', color: 'var(--text-main)' }}>Need Help?</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.75rem' }}>
              <Link to="/support" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '.75rem 1rem', background: 'var(--bg-soft)', border: '1px solid var(--border-color)', borderRadius: 10, color: 'var(--text-main)', textDecoration: 'none', fontWeight: 600, fontSize: '.85rem', transition: 'border-color .2s' }}
                onMouseOver={e => e.currentTarget.style.borderColor='var(--primary-blue)'}
                onMouseOut={e => e.currentTarget.style.borderColor='var(--border-color)'}>
                <MessageSquare size={16} color="var(--primary-blue)"/> Contact Support
              </Link>
              <Link to="/orders" style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '.75rem 1rem', background: 'var(--primary-blue)', borderRadius: 10, color: '#fff', textDecoration: 'none', fontWeight: 600, fontSize: '.85rem', justifyContent: 'center' }}>
                <Package size={16}/> All Orders <ChevronRight size={14}/>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tracking;
