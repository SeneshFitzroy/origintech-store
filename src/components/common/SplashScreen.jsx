import React, { useState, useEffect } from 'react';

const SplashScreen = ({ onComplete }) => {
  const [phase, setPhase] = useState(0); // 0=logo-in, 1=text-in, 2=shimmer, 3=exit

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 400);
    const t2 = setTimeout(() => setPhase(2), 1200);
    const t3 = setTimeout(() => setPhase(3), 2400);
    const t4 = setTimeout(() => onComplete(), 3100);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [onComplete]);

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: 'linear-gradient(160deg, #001028 0%, #001c4a 35%, #002b6b 65%, #003689 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: phase >= 3 ? 0 : 1,
        transition: 'opacity .7s cubic-bezier(.4,0,.2,1)',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @keyframes sp-pulse {
          0%, 100% { transform: scale(1); opacity: .3; }
          50% { transform: scale(1.4); opacity: 0; }
        }
        @keyframes sp-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes sp-logo-in {
          0% { opacity: 0; transform: scale(0.5) rotateY(90deg); }
          60% { opacity: 1; transform: scale(1.08) rotateY(-8deg); }
          100% { opacity: 1; transform: scale(1) rotateY(0deg); }
        }
        @keyframes sp-text-in {
          from { opacity: 0; transform: translateY(20px); letter-spacing: .3em; }
          to { opacity: 1; transform: translateY(0); letter-spacing: -.03em; }
        }
        @keyframes sp-shimmer {
          0% { left: -100%; }
          100% { left: 200%; }
        }
        @keyframes sp-particle {
          0% { opacity: 0; transform: scale(0) translate(0, 0); }
          20% { opacity: .6; }
          100% { opacity: 0; transform: scale(1) translate(var(--tx), var(--ty)); }
        }
        @keyframes sp-ring {
          0% { transform: scale(0.3); opacity: .5; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        @keyframes sp-bar {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>

      {/* Background particles */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * 360;
        const dist = 120 + Math.random() * 80;
        const tx = Math.cos((angle * Math.PI) / 180) * dist;
        const ty = Math.sin((angle * Math.PI) / 180) * dist;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: 4 + Math.random() * 4,
              height: 4 + Math.random() * 4,
              borderRadius: '50%',
              background: `rgba(0,74,198, ${0.15 + Math.random() * 0.2})`,
              top: '50%',
              left: '50%',
              '--tx': `${tx}px`,
              '--ty': `${ty}px`,
              animation: phase >= 1 ? `sp-particle 2s ${i * 0.08}s cubic-bezier(.16,1,.3,1) both` : 'none',
              pointerEvents: 'none',
            }}
          />
        );
      })}

      {/* Expanding rings */}
      {[0, 0.3, 0.6].map((d, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: 100,
            height: 100,
            borderRadius: '50%',
            border: '1px solid rgba(0,74,198, .15)',
            top: '50%',
            left: '50%',
            marginTop: -50,
            marginLeft: -50,
            animation: phase >= 1 ? `sp-ring 2s ${d}s ease-out both` : 'none',
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Rotating orbit ring */}
      <div style={{
        position: 'absolute',
        width: 160,
        height: 160,
        borderRadius: '50%',
        border: '1px dashed rgba(0,74,198,.12)',
        top: '50%',
        left: '50%',
        marginTop: -80,
        marginLeft: -80,
        animation: 'sp-rotate 8s linear infinite',
        pointerEvents: 'none',
      }}>
        <div style={{
          position: 'absolute',
          top: -3,
          left: '50%',
          marginLeft: -3,
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: '#4d94ff',
          boxShadow: '0 0 12px rgba(0,74,198,.5)',
        }} />
      </div>

      {/* Glow behind logo */}
      <div style={{
        position: 'absolute',
        width: 200,
        height: 200,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,74,198,.2) 0%, transparent 70%)',
        animation: 'sp-pulse 3s ease-in-out infinite',
        pointerEvents: 'none',
      }} />

      {/* Logo */}
      <div
        style={{
          perspective: 800,
          animation: phase >= 0 ? 'sp-logo-in .8s cubic-bezier(.16,1,.3,1) both' : undefined,
          marginBottom: 24,
        }}
      >
        <svg width="72" height="72" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"
          style={{ filter: 'drop-shadow(0 0 20px rgba(0,74,198,.4))' }}
        >
          <rect width="40" height="40" rx="10" fill="#004AC6" />
          <path d="M20 8L28 14V26L20 32L12 26V14L20 8Z" stroke="#fff" strokeWidth="1.8" fill="none" />
          <circle cx="20" cy="20" r="5" stroke="#fff" strokeWidth="1.8" fill="none" />
          <path d="M20 15V25M15 20H25" stroke="#fff" strokeWidth="1.2" opacity=".5" />
        </svg>
      </div>

      {/* Text */}
      <div
        style={{
          animation: phase >= 1 ? 'sp-text-in .7s cubic-bezier(.16,1,.3,1) both' : undefined,
          opacity: phase >= 1 ? undefined : 0,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <span style={{
          fontSize: 'clamp(1.6rem, 5vw, 2.2rem)',
          fontWeight: 750,
          color: '#fff',
          letterSpacing: '-.03em',
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", system-ui, sans-serif',
        }}>
          OriginTech
        </span>
        {/* Shimmer sweep */}
        {phase >= 2 && (
          <div style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            width: '60%',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,.25), transparent)',
            animation: 'sp-shimmer .8s ease-out both',
            pointerEvents: 'none',
          }} />
        )}
      </div>

      {/* Tagline */}
      <div style={{
        opacity: phase >= 1 ? 1 : 0,
        transform: phase >= 1 ? 'translateY(0)' : 'translateY(10px)',
        transition: 'all .6s .3s cubic-bezier(.16,1,.3,1)',
        fontSize: '.78rem',
        color: '#64748B',
        marginTop: 8,
        letterSpacing: '.15em',
        textTransform: 'uppercase',
        fontWeight: 500,
      }}>
        Premium Tech Marketplace
      </div>

      {/* Loading bar */}
      <div style={{
        position: 'absolute',
        bottom: 60,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 120,
        height: 2,
        borderRadius: 1,
        background: 'rgba(255,255,255,.08)',
        overflow: 'hidden',
        opacity: phase >= 1 && phase < 3 ? 1 : 0,
        transition: 'opacity .3s',
      }}>
        <div style={{
          height: '100%',
          borderRadius: 1,
          background: 'linear-gradient(90deg, #004AC6, #4d94ff)',
          animation: 'sp-bar 2s cubic-bezier(.4,0,.2,1) both',
        }} />
      </div>
    </div>
  );
};

export default SplashScreen;
