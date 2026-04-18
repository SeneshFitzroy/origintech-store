import React, { useState } from 'react';
import { RefreshCw, Camera, CheckCircle, ChevronRight, Info } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { formatPrice } from '../../data/mockData';

// Valuation logic: brand × storage × condition multipliers
const BASE_VALUES = { Origin: 50000, Samsung: 35000, Apple: 45000, Other: 20000 };
const STORAGE_MULTIPLIERS = { '64GB': 1.0, '128GB': 1.15, '256GB': 1.3, '512GB': 1.45 };
const SCREEN_BONUS  = { Flawless: 12000, Minor: 6000, Cracked: 0 };
const BODY_BONUS    = { Flawless: 8000, Dents: 2000 };
const BATTERY_BONUS = { 'Good (>80%)': 6000, 'Poor (<80%)': 0 };

const calcValuation = (d) => {
  const base = BASE_VALUES[d.brand] || 0;
  const storageMult = STORAGE_MULTIPLIERS[d.storage] || 1;
  const screenB  = SCREEN_BONUS[d.screen]   || 0;
  const bodyB    = BODY_BONUS[d.body]        || 0;
  const batteryB = BATTERY_BONUS[d.battery] || 0;
  return Math.round((base * storageMult) + screenB + bodyB + batteryB);
};

const TradeIn = () => {
  const [step, setStep] = useState(1);
  const { currency, tradeInCredit, setTradeInCredit } = useAppContext();
  const [accepted, setAccepted] = useState(false);

  const [deviceVal, setDeviceVal] = useState({
    brand: '', model: '', storage: '',
    screen: '', body: '', battery: ''
  });

  const [valuation, setValuation] = useState(0);

  const handleCalculate = (e) => {
    e.preventDefault();
    setValuation(calcValuation(deviceVal));
    setStep(3);
  };

  const handleAccept = () => {
    setTradeInCredit(prev => prev + valuation);
    setAccepted(true);
  };

  const inputStyle = {
    width: '100%', padding: '0.75rem 1rem',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--border-color)',
    background: 'var(--bg-main)',
    color: 'var(--text-main)',
    fontSize: '0.95rem', outline: 'none'
  };
  const labelStyle = { display: 'block', marginBottom: '0.5rem', fontSize: '0.88rem', fontWeight: 500, color: 'var(--text-muted)' };

  const steps = [
    { n: 1, label: 'Device Details' },
    { n: 2, label: 'Condition' },
    { n: 3, label: 'Valuation' },
  ];

  return (
    <div style={{ backgroundColor: 'var(--bg-main)', minHeight: '100vh' }}>

      {/* Premium Page Header */}
      <div className="page-header">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="ph-icon"><RefreshCw size={24}/></div>
          <h1>Device Trade-In</h1>
          <p>Turn your old device into credit towards your next OriginTech purchase</p>
          {tradeInCredit > 0 && (
            <div className="ph-badge">
              <CheckCircle size={14} /> You have {formatPrice(tradeInCredit, currency)} store credit available
            </div>
          )}
        </div>
      </div>

      <div style={{ padding: '0 1rem 4rem' }}>
      <div className="container" style={{ maxWidth: '820px' }}>
        <div className="card" style={{ padding: '2.5rem' }}>

          {/* Step Progress Bar */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2.5rem' }}>
            {steps.map((s, i) => (
              <React.Fragment key={s.n}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                  <div style={{
                    width: '38px', height: '38px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.4rem', transition: 'all 0.3s',
                    background: step > s.n ? '#10B981' : step === s.n ? 'var(--primary-blue)' : 'var(--bg-surface)',
                    color: step >= s.n ? 'white' : 'var(--text-muted)',
                    border: step >= s.n ? 'none' : '2px solid var(--border-color)',
                    boxShadow: step === s.n ? '0 4px 12px rgba(37,99,235,0.3)' : 'none'
                  }}>
                    {step > s.n ? <CheckCircle size={18} /> : s.n}
                  </div>
                  <span style={{ fontSize: '0.78rem', fontWeight: step >= s.n ? 600 : 400, color: step >= s.n ? 'var(--text-main)' : 'var(--text-muted)' }}>{s.label}</span>
                </div>
                {i < steps.length - 1 && (
                  <div style={{ flex: 2, height: '2px', background: step > s.n ? '#10B981' : 'var(--border-color)', transition: 'background 0.4s', marginBottom: '1.5rem' }} />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* ── STEP 1: Device Details ── */}
          {step === 1 && (
            <form onSubmit={e => { e.preventDefault(); setStep(2); }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1.5rem' }}>What device do you have?</h2>
              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="ti-brand" style={labelStyle}>Brand</label>
                <select id="ti-brand" required value={deviceVal.brand} onChange={e => setDeviceVal({ ...deviceVal, brand: e.target.value })} style={{ ...inputStyle, background: 'var(--bg-surface)' }}>
                  <option value="">Select Brand</option>
                  <option value="Origin">OriginTech</option>
                  <option value="Apple">Apple</option>
                  <option value="Samsung">Samsung</option>
                  <option value="Other">Other Major Brand</option>
                </select>
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="ti-model" style={labelStyle}>Model Name</label>
                <input id="ti-model" type="text" required value={deviceVal.model} onChange={e => setDeviceVal({ ...deviceVal, model: e.target.value })} style={inputStyle} placeholder="e.g. iPhone 14 Pro, Galaxy S23" />
              </div>
              <div style={{ marginBottom: '2rem' }}>
                <label htmlFor="ti-storage" style={labelStyle}>Storage Capacity</label>
                <select id="ti-storage" required value={deviceVal.storage} onChange={e => setDeviceVal({ ...deviceVal, storage: e.target.value })} style={{ ...inputStyle, background: 'var(--bg-surface)' }}>
                  <option value="">Select Storage</option>
                  <option value="64GB">64 GB</option>
                  <option value="128GB">128 GB</option>
                  <option value="256GB">256 GB</option>
                  <option value="512GB">512 GB</option>
                </select>
              </div>

              {deviceVal.brand && deviceVal.storage && (
                <div style={{ padding: '0.85rem 1rem', background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#1E40AF' }}>
                  <Info size={15} />
                  Estimated base value: <strong>{formatPrice(Math.round(BASE_VALUES[deviceVal.brand] * (STORAGE_MULTIPLIERS[deviceVal.storage] || 1)), currency)}</strong> — condition will adjust this.
                </div>
              )}

              <button type="submit" className="btn-primary" style={{ width: '100%', padding: '1rem', fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                Next: Condition <ChevronRight size={18} />
              </button>
            </form>
          )}

          {/* ── STEP 2: Condition ── */}
          {step === 2 && (
            <form onSubmit={handleCalculate}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '1.5rem' }}>Assess the condition</h2>

              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="ti-screen" style={labelStyle}>Screen Condition</label>
                <select id="ti-screen" required value={deviceVal.screen} onChange={e => setDeviceVal({ ...deviceVal, screen: e.target.value })} style={{ ...inputStyle, background: 'var(--bg-surface)' }}>
                  <option value="">Select condition</option>
                  <option value="Flawless">Flawless — No scratches (+{formatPrice(SCREEN_BONUS.Flawless, currency)})</option>
                  <option value="Minor">Minor scratches (+{formatPrice(SCREEN_BONUS.Minor, currency)})</option>
                  <option value="Cracked">Cracked (no bonus)</option>
                </select>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label htmlFor="ti-body" style={labelStyle}>Body Condition</label>
                <select id="ti-body" required value={deviceVal.body} onChange={e => setDeviceVal({ ...deviceVal, body: e.target.value })} style={{ ...inputStyle, background: 'var(--bg-surface)' }}>
                  <option value="">Select condition</option>
                  <option value="Flawless">Flawless (+{formatPrice(BODY_BONUS.Flawless, currency)})</option>
                  <option value="Dents">Dents / Scratches (+{formatPrice(BODY_BONUS.Dents, currency)})</option>
                </select>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label htmlFor="ti-battery" style={labelStyle}>Battery Health</label>
                <select id="ti-battery" required value={deviceVal.battery} onChange={e => setDeviceVal({ ...deviceVal, battery: e.target.value })} style={{ ...inputStyle, background: 'var(--bg-surface)' }}>
                  <option value="">Select condition</option>
                  <option value="Good (>80%)">Good — Above 80% (+{formatPrice(BATTERY_BONUS['Good (>80%)'], currency)})</option>
                  <option value="Poor (<80%)">Poor — Below 80% (no bonus)</option>
                </select>
              </div>

              <div style={{ marginBottom: '2rem', padding: '1.25rem', border: '2px dashed var(--border-color)', borderRadius: 'var(--radius-md)', textAlign: 'center', background: 'var(--bg-soft)' }}>
                <Camera size={28} style={{ color: 'var(--text-muted)', margin: '0 auto 0.5rem' }} />
                <div style={{ fontSize: '0.88rem', marginBottom: '0.5rem', fontWeight: 500 }}>Upload optional device photos</div>
                <input type="file" accept="image/*" multiple />
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>Helps us give a more accurate valuation</div>
              </div>

              <div className="flex gap-3">
                <button type="button" onClick={() => setStep(1)} style={{ flex: 1, padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'var(--bg-surface)', cursor: 'pointer', fontWeight: 600 }}>
                  ← Back
                </button>
                <button type="submit" className="btn-primary" style={{ flex: 2, padding: '1rem', fontWeight: 600 }}>
                  Calculate Valuation
                </button>
              </div>
            </form>
          )}

          {/* ── STEP 3: Valuation Result ── */}
          {step === 3 && (
            <div style={{ textAlign: 'center' }}>
              {accepted ? (
                <div style={{ padding: '2rem 0' }}>
                  <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: '#F0FDF4', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
                    <CheckCircle size={40} color="#10B981" />
                  </div>
                  <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem', color: '#10B981' }}>Credit Applied!</h2>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>
                    <strong style={{ color: 'var(--text-main)', fontSize: '1.25rem' }}>{formatPrice(valuation, currency)}</strong> has been added to your store credit.
                  </p>
                  <div style={{ padding: '1rem', background: '#F0FDF4', borderRadius: 'var(--radius-md)', border: '1px solid #86EFAC', marginBottom: '2rem', display: 'inline-block' }}>
                    <div style={{ fontSize: '0.82rem', color: '#16A34A' }}>Total Store Credit</div>
                    <div style={{ fontSize: '2rem', fontWeight: 800, color: '#16A34A' }}>{formatPrice(tradeInCredit, currency)}</div>
                  </div>
                  <div className="flex gap-3" style={{ justifyContent: 'center' }}>
                    <button className="btn-primary" onClick={() => { setStep(1); setAccepted(false); setDeviceVal({ brand:'', model:'', storage:'', screen:'', body:'', battery:'' }); }}>
                      Trade In Another Device
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.5rem' }}>Your Estimated Value</h2>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>Based on device condition and market value</p>

                  <div style={{ fontSize: '4rem', fontWeight: 800, color: 'var(--primary-blue)', marginBottom: '0.5rem', lineHeight: 1 }}>
                    {formatPrice(valuation, currency)}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>Store Credit</div>

                  {/* Breakdown */}
                  <div style={{ background: 'var(--bg-soft)', padding: '1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', textAlign: 'left', border: '1px solid var(--border-color)' }}>
                    <h4 style={{ marginBottom: '0.75rem', fontSize: '0.88rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)' }}>Valuation Breakdown</h4>
                    {[
                      { label: `${deviceVal.brand} ${deviceVal.model} (${deviceVal.storage}) — Base`, value: Math.round(BASE_VALUES[deviceVal.brand] * (STORAGE_MULTIPLIERS[deviceVal.storage] || 1)) },
                      { label: `Screen: ${deviceVal.screen}`, value: SCREEN_BONUS[deviceVal.screen] || 0 },
                      { label: `Body: ${deviceVal.body}`, value: BODY_BONUS[deviceVal.body] || 0 },
                      { label: `Battery: ${deviceVal.battery}`, value: BATTERY_BONUS[deviceVal.battery] || 0 },
                    ].map((row, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', padding: '0.35rem 0', borderBottom: i < 3 ? '1px dashed var(--border-color)' : 'none' }}>
                        <span style={{ color: 'var(--text-muted)' }}>{row.label}</span>
                        <span style={{ fontWeight: 600, color: row.value > 0 ? '#10B981' : 'var(--text-muted)' }}>
                          {row.value > 0 ? '+' : ''}{formatPrice(row.value, currency)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <button className="btn-primary" style={{ width: '100%', padding: '1rem', fontWeight: 700, fontSize: '1rem' }} onClick={handleAccept}>
                      ✓ Accept & Apply {formatPrice(valuation, currency)} Credit
                    </button>
                    <button onClick={() => setStep(1)} style={{ width: '100%', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer', fontWeight: 500 }}>
                      Decline / Recalculate
                    </button>
                  </div>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '1.25rem' }}>
                    *Final value may change after physical inspection. Terms and conditions apply.
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
};

export default TradeIn;
