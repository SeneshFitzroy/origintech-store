import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Truck, Package, Download, Star, ShieldCheck, ArrowRight } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const CONFETTI_COLORS = ['#2563EB','#10B981','#F59E0B','#8B5CF6','#EC4899','#06B6D4'];

const Confirmation = () => {
  const { setOrderHistory } = useAppContext();
  const canvasRef = useRef(null);
  const [orderNumber] = useState(`ORD-${Math.floor(100000 + Math.random() * 900000)}`);
  const [revealed, setRevealed] = useState(false);

  const launchConfetti = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = Array.from({ length: 110 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      w: Math.random() * 10 + 5,
      h: Math.random() * 5 + 3,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      speed: Math.random() * 3 + 1.5,
      spin: (Math.random() - .5) * 6,
      angle: 0,
      drift: (Math.random() - .5) * 1.5,
    }));

    let frame;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.y += p.speed;
        p.x += p.drift;
        p.angle += p.spin;
        if (p.y > canvas.height) { p.y = -20; p.x = Math.random() * canvas.width; }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle * Math.PI / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = .85;
        ctx.fillRect(-p.w/2, -p.h/2, p.w, p.h);
        ctx.restore();
      });
      frame = requestAnimationFrame(draw);
    };
    draw();
    setTimeout(() => { cancelAnimationFrame(frame); ctx.clearRect(0, 0, canvas.width, canvas.height); }, 4500);
  }, []);

  useEffect(() => {
    const t1 = setTimeout(() => { setRevealed(true); launchConfetti(); }, 150);
    return () => clearTimeout(t1);
  }, [launchConfetti]);

  const estimatedDelivery = new Date(Date.now() + 86400000 * 2).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  const steps = [
    { label: 'Order Confirmed', done: true, icon: '✓' },
    { label: 'Packing', done: false, icon: '📦' },
    { label: 'Dispatched', done: false, icon: '🚚' },
    { label: 'Delivered', done: false, icon: '🎉' },
  ];

  return (
    <div style={{ backgroundColor: 'var(--bg-main)', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1000 }}/>

      <style dangerouslySetInnerHTML={{__html:`
        @keyframes pop { 0%{transform:scale(0.3);opacity:0} 70%{transform:scale(1.15)} 100%{transform:scale(1);opacity:1} }
        @keyframes slideUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        .conf-check { animation: pop .55s cubic-bezier(.22,1,.36,1) .1s both; }
        .conf-card { animation: slideUp .5s ease .35s both; }
        .conf-steps { animation: slideUp .5s ease .55s both; }
        .conf-actions { animation: slideUp .5s ease .75s both; }
      `}}/>

      <div className="container" style={{ padding: '4rem 1rem 6rem', maxWidth: 640, position: 'relative', zIndex: 1 }}>

        {/* Success icon */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div className="conf-check" style={{ width: 100, height: 100, borderRadius: '50%', background: 'linear-gradient(135deg,#10B981,#059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', boxShadow: '0 16px 48px rgba(16,185,129,0.3)' }}>
            <CheckCircle size={52} color="#fff" strokeWidth={2.5}/>
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--text-main)', marginBottom: '.5rem', letterSpacing: '-.02em' }}>Order Confirmed!</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6 }}>
            Thank you for shopping with OriginTech. We're preparing your order now.
          </p>
        </div>

        {/* Order details card */}
        <div className="conf-card" style={{ background: 'var(--bg-surface)', borderRadius: 20, border: '1px solid var(--border-color)', padding: '1.75rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', flexWrap: 'wrap', gap: '.5rem' }}>
            <div>
              <div style={{ fontSize: '.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1, marginBottom: '.25rem' }}>Order Number</div>
              <div style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--text-main)', fontFamily: 'monospace' }}>{orderNumber}</div>
            </div>
            <div style={{ padding: '.35rem 1rem', background: '#D1FAE5', borderRadius: 999, fontSize: '.8rem', fontWeight: 700, color: '#065F46' }}>Confirmed ✓</div>
          </div>

          {[
            { label: 'Order Date', value: today },
            { label: 'Estimated Delivery', value: estimatedDelivery, highlight: true },
            { label: 'Courier', value: 'FastCourier Express' },
            { label: 'Warranty', value: '12 months — OriginTech Certified' },
          ].map((row, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '.65rem 0', borderBottom: i < 3 ? '1px solid var(--border-color)' : 'none' }}>
              <span style={{ color: 'var(--text-muted)', fontSize: '.88rem' }}>{row.label}</span>
              <span style={{ fontWeight: 700, fontSize: '.9rem', color: row.highlight ? 'var(--primary-blue)' : 'var(--text-main)' }}>{row.value}</span>
            </div>
          ))}
        </div>

        {/* Progress steps */}
        <div className="conf-steps" style={{ background: 'var(--bg-surface)', borderRadius: 20, border: '1px solid var(--border-color)', padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '1.25rem', color: 'var(--text-main)' }}>Order Progress</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 18, left: '12%', right: '12%', height: 2, background: 'var(--border-color)', zIndex: 0 }}/>
            <div style={{ position: 'absolute', top: 18, left: '12%', width: '28%', height: 2, background: '#10B981', zIndex: 1, transition: 'width .6s ease' }}/>
            {steps.map((s, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flex: 1, position: 'relative', zIndex: 2 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: s.done ? '#10B981' : 'var(--bg-surface)',
                  border: s.done ? 'none' : '2px solid var(--border-color)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: s.done ? '.9rem' : '1.1rem',
                  color: s.done ? '#fff' : 'var(--text-muted)',
                  fontWeight: 700,
                  boxShadow: s.done ? '0 4px 12px rgba(16,185,129,0.3)' : 'none',
                }}>{s.done ? '✓' : s.icon}</div>
                <span style={{ fontSize: '.7rem', fontWeight: s.done ? 700 : 400, color: s.done ? 'var(--text-main)' : 'var(--text-muted)', textAlign: 'center' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Authenticity badge */}
        <div style={{ background: 'linear-gradient(135deg,#EFF6FF,#DBEAFE)', border: '1px solid #BFDBFE', borderRadius: 16, padding: '1rem 1.5rem', display: 'flex', alignItems: 'center', gap: 12, marginBottom: '2rem' }}>
          <ShieldCheck size={28} color="#2563EB"/>
          <div>
            <div style={{ fontWeight: 700, color: '#1E3A8A', fontSize: '.9rem' }}>Authenticity Certificate Issued</div>
            <div style={{ color: '#3B82F6', fontSize: '.8rem' }}>Your device's digital certificate will be emailed within 24 hours.</div>
          </div>
        </div>

        {/* Actions */}
        <div className="conf-actions" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <Link to="/tracking" className="btn-primary" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '1.1rem', fontSize: '1rem', fontWeight: 700, borderRadius: 14, minWidth: 160 }}>
            <Truck size={18}/> Track Order
          </Link>
          <button onClick={() => {
            const txt = `OriginTech Receipt\n==================\nOrder: ${orderNumber}\nDate: ${today}\nEst. Delivery: ${estimatedDelivery}\nCourier: FastCourier Express\nWarranty: 12 months\n\nThank you for shopping at OriginTech!\nsupport@origintech.lk`;
            const blob = new Blob([txt], { type: 'text/plain' });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob); a.download = `${orderNumber}-receipt.txt`; a.click();
          }} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, padding: '1.1rem', fontSize: '1rem', fontWeight: 700, borderRadius: 14, background: 'var(--bg-surface)', border: '1.5px solid var(--border-color)', color: 'var(--text-main)', cursor: 'pointer', minWidth: 160 }}>
            <Download size={18}/> Receipt
          </button>
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link to="/browse" style={{ color: 'var(--primary-blue)', fontWeight: 600, fontSize: '.9rem', display: 'inline-flex', alignItems: 'center', gap: 5, textDecoration: 'none' }}>
            Continue Shopping <ArrowRight size={14}/>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
