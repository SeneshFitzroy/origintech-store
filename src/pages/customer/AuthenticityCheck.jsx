import React, { useState } from 'react';
import { ShieldAlert, ShieldCheck, Search, Info, Lock, Download, QrCode } from 'lucide-react';

const KNOWN_DEVICES = {
  '1234': { name: 'Origin Pro 15 Max', sku: 'OT-PRO-15-MAX', warranty: '2 Years', origin: 'Sri Lanka' },
  'OT2025': { name: 'OriginBook Pro 16"', sku: 'OT-BK-PRO-16', warranty: '1 Year', origin: 'Sri Lanka' },
  'VISION1': { name: 'Origin Vision AR', sku: 'OT-VIS-AR-01', warranty: '2 Years', origin: 'Sri Lanka' },
};

const AuthenticityCheck = () => {
  const [imei, setImei] = useState('');
  const [result, setResult] = useState(null);
  const [deviceData, setDeviceData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = (e) => {
    e.preventDefault();
    setResult(null);
    setDeviceData(null);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const key = imei.trim().toUpperCase().replace('1234','1234');
      const found = KNOWN_DEVICES[imei.trim()] || KNOWN_DEVICES[imei.trim().toUpperCase()];
      if (found) {
        setResult('success');
        setDeviceData(found);
      } else {
        setResult('warning');
      }
    }, 2200);
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-main)', minHeight: '100vh' }}>
      <style dangerouslySetInnerHTML={{__html:`
        @keyframes scanLine { 0%{top:0%} 100%{top:100%} }
        @keyframes shieldPop { 0%{transform:scale(0.3) rotate(-15deg);opacity:0} 60%{transform:scale(1.1) rotate(3deg)} 100%{transform:scale(1) rotate(0);opacity:1} }
        @keyframes fadeSlideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes spin { to{transform:rotate(360deg)} }
        .scan-result { animation: fadeSlideUp .5s ease both; }
        .shield-anim { animation: shieldPop .6s cubic-bezier(.22,1,.36,1) both; }
        .spin { animation: spin 1s linear infinite; }
      `}}/>

      <div className="container" style={{ padding: '4rem 1rem 6rem', maxWidth: 780 }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'linear-gradient(135deg,#EFF6FF,#DBEAFE)', border: '2px solid #BFDBFE', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
            <ShieldCheck size={34} color="#2563EB"/>
          </div>
          <h1 style={{ fontSize: '2.3rem', fontWeight: 900, letterSpacing: '-.02em', color: 'var(--text-main)', marginBottom: '.75rem' }}>Authenticity Verification</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', maxWidth: 520, margin: '0 auto', lineHeight: 1.7 }}>
            Enter your device's IMEI or serial number to verify it's a genuine OriginTech product and view its digital certificate.
          </p>
        </div>

        {/* Search card */}
        <div style={{ background: 'var(--bg-surface)', borderRadius: 22, border: '1px solid var(--border-color)', padding: '2.5rem', marginBottom: '2rem', boxShadow: 'var(--shadow-card)' }}>
          <form onSubmit={handleVerify}>
            <label style={{ display: 'block', fontWeight: 700, fontSize: '.82rem', textTransform: 'uppercase', letterSpacing: 1, color: 'var(--text-muted)', marginBottom: '.75rem' }}>
              IMEI or Serial Number
            </label>
            <div style={{ display: 'flex', gap: '.75rem', flexWrap: 'wrap' }}>
              <div style={{ flex: 1, position: 'relative', minWidth: 240 }}>
                <QrCode size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }}/>
                <input type="text" required placeholder="e.g. 1234 · OT2025 · VISION1" value={imei}
                  onChange={e => { setImei(e.target.value); setResult(null); }}
                  style={{ width: '100%', padding: '1.05rem 1rem 1.05rem 2.7rem', borderRadius: 12, border: '2px solid var(--border-color)', background: 'var(--bg-main)', color: 'var(--text-main)', fontSize: '1rem', letterSpacing: 2, outline: 'none', boxSizing: 'border-box', transition: 'border-color .2s', fontFamily: 'monospace' }}
                  onFocus={e => e.target.style.borderColor='var(--primary-blue)'}
                  onBlur={e => e.target.style.borderColor='var(--border-color)'}/>
              </div>
              <button className="btn-primary" disabled={loading} style={{ padding: '1rem 2rem', borderRadius: 12, fontSize: '.95rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8, whiteSpace: 'nowrap' }}>
                {loading ? (
                  <><div style={{ width: 18, height: 18, border: '2.5px solid rgba(255,255,255,.3)', borderTopColor: '#fff', borderRadius: '50%' }} className="spin"/> Scanning...</>
                ) : (
                  <><Search size={17}/> Verify Device</>
                )}
              </button>
            </div>
          </form>

          {/* Scanning animation */}
          {loading && (
            <div style={{ marginTop: '2rem', borderRadius: 16, overflow: 'hidden', height: 6, background: 'var(--bg-soft)', position: 'relative' }}>
              <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', background: 'linear-gradient(90deg,transparent,var(--primary-blue),transparent)', animation: 'scanLine 1.4s ease-in-out infinite', width: '40%' }}/>
            </div>
          )}

          <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', gap: 6, fontSize: '.82rem', color: 'var(--text-muted)' }}>
            <Lock size={13}/> Secure encrypted lookup · Demo serials: <strong>1234</strong>, <strong>OT2025</strong>, <strong>VISION1</strong>
          </div>
        </div>

        {/* Success result */}
        {result === 'success' && deviceData && (
          <div className="scan-result" style={{ background: 'var(--bg-surface)', borderRadius: 22, border: '2px solid #10B981', padding: '2.5rem', boxShadow: '0 12px 40px rgba(16,185,129,0.12)' }}>
            {/* Certificate header */}
            <div style={{ textAlign: 'center', marginBottom: '2rem', paddingBottom: '2rem', borderBottom: '1px solid var(--border-color)' }}>
              <div className="shield-anim" style={{ width: 90, height: 90, borderRadius: '50%', background: 'linear-gradient(135deg,#10B981,#059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem', boxShadow: '0 16px 40px rgba(16,185,129,0.3)' }}>
                <ShieldCheck size={46} color="#fff" strokeWidth={2}/>
              </div>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#059669', marginBottom: '.4rem' }}>Verified Authentic</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '.9rem' }}>This device is registered in the official OriginTech Authenticity Database</p>
            </div>

            {/* Certificate grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '1rem', marginBottom: '2rem' }}>
              {[
                { label: 'Device Model', value: deviceData.name },
                { label: 'SKU / Part No.', value: deviceData.sku },
                { label: 'IMEI / Serial', value: imei.trim(), mono: true },
                { label: 'Verification Date', value: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) },
                { label: 'Warranty Period', value: deviceData.warranty },
                { label: 'Certificate Authority', value: 'OriginTech Global' },
                { label: 'Country of Origin', value: deviceData.origin },
                { label: 'Status', value: 'ACTIVE', green: true },
              ].map(({ label, value, mono, green }, i) => (
                <div key={i} style={{ background: 'var(--bg-soft)', borderRadius: 12, padding: '1rem 1.25rem', border: '1px solid var(--border-color)' }}>
                  <div style={{ fontSize: '.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: .5, color: 'var(--text-muted)', marginBottom: '.35rem' }}>{label}</div>
                  <div style={{ fontWeight: 700, color: green ? '#10B981' : 'var(--text-main)', fontFamily: mono ? 'monospace' : 'inherit', fontSize: mono ? '.9rem' : '.95rem' }}>{value}</div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => {
                const txt = `OriginTech Authenticity Certificate\n====================================\nDevice: ${deviceData.name}\nSKU: ${deviceData.sku}\nIMEI/Serial: ${imei.trim()}\nVerified: ${new Date().toLocaleDateString()}\nWarranty: ${deviceData.warranty}\nAuthority: OriginTech Global\nStatus: VERIFIED AUTHENTIC\n`;
                const a = document.createElement('a');
                a.href = URL.createObjectURL(new Blob([txt],{type:'text/plain'}));
                a.download = `cert-${imei.trim()}.txt`;
                a.click();
              }} className="btn-primary" style={{ padding: '.9rem 2rem', borderRadius: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 7 }}>
                <Download size={16}/> Download Certificate
              </button>
              <button onClick={() => { setResult(null); setImei(''); }} style={{ padding: '.9rem 2rem', borderRadius: 12, fontWeight: 700, border: '1.5px solid var(--border-color)', background: 'var(--bg-surface)', color: 'var(--text-main)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7 }}>
                <Search size={16}/> Verify Another
              </button>
            </div>
          </div>
        )}

        {/* Warning result */}
        {result === 'warning' && (
          <div className="scan-result" style={{ background: 'var(--bg-surface)', borderRadius: 22, border: '2px solid #EF4444', padding: '2.5rem', textAlign: 'center', boxShadow: '0 12px 40px rgba(239,68,68,0.12)' }}>
            <div style={{ width: 90, height: 90, borderRadius: '50%', background: '#FEF2F2', border: '2px solid #FECACA', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
              <ShieldAlert size={46} color="#EF4444"/>
            </div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 900, color: '#DC2626', marginBottom: '.75rem' }}>Verification Failed</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '.95rem', maxWidth: 460, margin: '0 auto 2rem', lineHeight: 1.7 }}>
              We could not find <strong style={{ fontFamily:'monospace', color:'var(--text-main)' }}>{imei}</strong> in the OriginTech Authenticity Database. This device may be counterfeit, or you may have entered an incorrect serial number.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => { setResult(null); setImei(''); }} style={{ padding: '.9rem 1.75rem', borderRadius: 12, fontWeight: 700, border: '1.5px solid var(--border-color)', background: 'var(--bg-surface)', color: 'var(--text-main)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7 }}>
                <Search size={16}/> Try Again
              </button>
              <button style={{ padding: '.9rem 1.75rem', borderRadius: 12, fontWeight: 700, border: '1.5px solid #EF4444', background: '#FEF2F2', color: '#DC2626', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 7 }}>
                <ShieldAlert size={16}/> Report Counterfeit
              </button>
            </div>
          </div>
        )}

        {/* How it works */}
        {!result && !loading && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '1rem', marginTop: '2rem' }}>
            {[
              { n: '01', title: 'Find Your Serial', desc: 'Located on your device box or under Settings → About.' },
              { n: '02', title: 'Enter & Verify', desc: 'Type your IMEI or serial number and click Verify Device.' },
              { n: '03', title: 'View Certificate', desc: 'Download your digital certificate as proof of authenticity.' },
            ].map(({ n, title, desc }) => (
              <div key={n} style={{ background: 'var(--bg-surface)', borderRadius: 16, border: '1px solid var(--border-color)', padding: '1.5rem' }}>
                <div style={{ fontWeight: 900, fontSize: '1.5rem', color: 'var(--primary-blue)', opacity: .3, marginBottom: '.5rem', fontFamily: 'monospace' }}>{n}</div>
                <div style={{ fontWeight: 700, fontSize: '.95rem', color: 'var(--text-main)', marginBottom: '.4rem' }}>{title}</div>
                <div style={{ fontSize: '.83rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{desc}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthenticityCheck;
