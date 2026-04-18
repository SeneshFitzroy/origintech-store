import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, Eye, Type, Palette, RotateCcw } from 'lucide-react';

const VISION_MODES = [
  { id: 'normal', label: 'Normal Vision' },
  { id: 'protanopia', label: 'Protanopia (Red)' },
  { id: 'deuteranopia', label: 'Deuteranopia (Green)' },
  { id: 'tritanopia', label: 'Tritanopia (Blue)' },
];

const AccessibilityWidget = () => {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);

  // State — persisted in localStorage
  const [highContrast, setHighContrast] = useState(() => localStorage.getItem('a11y-hc') === 'true');
  const [fontScale, setFontScale] = useState(() => Number(localStorage.getItem('a11y-fs') || 100));
  const [colorVision, setColorVision] = useState(() => localStorage.getItem('a11y-cv') || 'normal');

  // Apply high contrast
  useEffect(() => {
    document.documentElement.setAttribute('data-high-contrast', highContrast);
    localStorage.setItem('a11y-hc', highContrast);
  }, [highContrast]);

  // Apply font scale
  useEffect(() => {
    const scale = fontScale / 100;
    document.documentElement.style.setProperty('--a11y-font-scale', scale);
    document.documentElement.setAttribute('data-font-scale', fontScale);
    localStorage.setItem('a11y-fs', fontScale);
  }, [fontScale]);

  // Apply color vision
  useEffect(() => {
    if (colorVision === 'normal') {
      document.documentElement.removeAttribute('data-color-vision');
    } else {
      document.documentElement.setAttribute('data-color-vision', colorVision);
    }
    localStorage.setItem('a11y-cv', colorVision);
  }, [colorVision]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open]);

  const reset = useCallback(() => {
    setHighContrast(false);
    setFontScale(100);
    setColorVision('normal');
  }, []);

  const isDefault = !highContrast && fontScale === 100 && colorVision === 'normal';

  return (
    <>
      {/* SVG Filters for color vision simulation */}
      <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
        <defs>
          <filter id="protanopia-filter">
            <feColorMatrix type="matrix" values="0.567,0.433,0,0,0  0.558,0.442,0,0,0  0,0.242,0.758,0,0  0,0,0,1,0" />
          </filter>
          <filter id="deuteranopia-filter">
            <feColorMatrix type="matrix" values="0.625,0.375,0,0,0  0.7,0.3,0,0,0  0,0.3,0.7,0,0  0,0,0,1,0" />
          </filter>
          <filter id="tritanopia-filter">
            <feColorMatrix type="matrix" values="0.95,0.05,0,0,0  0,0.433,0.567,0,0  0,0.475,0.525,0,0  0,0,0,1,0" />
          </filter>
        </defs>
      </svg>

      {/* Floating trigger button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Accessibility settings"
        style={{
          position: 'fixed',
          bottom: 32,
          left: 24,
          zIndex: 9998,
          width: 48,
          height: 48,
          borderRadius: '50%',
          background: '#3D5A3A',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(0,0,0,.2)',
          transition: 'transform .2s, box-shadow .2s',
        }}
        onMouseOver={e => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 6px 28px rgba(0,0,0,.3)'; }}
        onMouseOut={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,.2)'; }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="10" r="1.5" fill="currentColor" stroke="none" />
          <path d="M7 13.5C7 13.5 8.5 12 12 12C15.5 12 17 13.5 17 13.5" />
          <path d="M9 16.5L10.5 13.5" />
          <path d="M15 16.5L13.5 13.5" />
        </svg>
      </button>

      {/* Panel */}
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Accessibility settings"
          aria-modal="true"
          style={{
            position: 'fixed',
            bottom: 90,
            left: 24,
            zIndex: 9999,
            width: 340,
            maxHeight: 'calc(100vh - 120px)',
            overflowY: 'auto',
            background: '#fff',
            borderRadius: 20,
            boxShadow: '0 20px 60px rgba(0,0,0,.18), 0 0 0 1px rgba(0,0,0,.06)',
            padding: '1.5rem',
            animation: 'a11ySlideUp .3s cubic-bezier(.16,1,.3,1) both',
          }}
        >
          <style>{`
            @keyframes a11ySlideUp {
              from { opacity:0; transform:translateY(16px) scale(.96); }
              to { opacity:1; transform:translateY(0) scale(1); }
            }
          `}</style>

          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 42, height: 42, borderRadius: 12,
                background: '#3D5A3A', color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="10" r="1.5" fill="currentColor" stroke="none" />
                  <path d="M7 13.5C7 13.5 8.5 12 12 12C15.5 12 17 13.5 17 13.5" />
                  <path d="M9 16.5L10.5 13.5" />
                  <path d="M15 16.5L13.5 13.5" />
                </svg>
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1.05rem', color: '#1a1a1a' }}>Accessibility</div>
                <div style={{ fontSize: '.78rem', color: '#3D5A3A', fontWeight: 500 }}>Customize your experience</div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close accessibility panel"
              style={{
                width: 32, height: 32, borderRadius: '50%',
                background: '#f5f5f5', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#666',
              }}
            >
              <X size={16} />
            </button>
          </div>

          {/* ── High Contrast ── */}
          <div style={{
            background: '#f8f8f8', borderRadius: 14, padding: '1rem 1.2rem',
            marginBottom: '.75rem',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 38, height: 38, borderRadius: 10,
                background: '#e8e8e8',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#555',
              }}>
                <Eye size={18} />
              </div>
              <div>
                <div style={{ fontWeight: 650, fontSize: '.92rem', color: '#1a1a1a' }}>High Contrast</div>
                <div style={{ fontSize: '.75rem', color: '#888' }}>Enhanced visibility</div>
              </div>
            </div>
            <button
              role="switch"
              aria-checked={highContrast}
              onClick={() => setHighContrast(!highContrast)}
              style={{
                width: 48, height: 26, borderRadius: 13,
                background: highContrast ? '#3D5A3A' : '#ddd',
                border: 'none', cursor: 'pointer',
                position: 'relative', transition: 'background .2s',
                flexShrink: 0,
              }}
            >
              <div style={{
                width: 20, height: 20, borderRadius: '50%',
                background: '#fff',
                position: 'absolute', top: 3,
                left: highContrast ? 25 : 3,
                transition: 'left .2s',
                boxShadow: '0 1px 4px rgba(0,0,0,.2)',
              }} />
            </button>
          </div>

          {/* ── Font Size ── */}
          <div style={{
            background: '#f8f8f8', borderRadius: 14, padding: '1rem 1.2rem',
            marginBottom: '.75rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div style={{
                width: 38, height: 38, borderRadius: 10,
                background: '#3D5A3A', color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.1rem', fontWeight: 800,
              }}>
                T
              </div>
              <div>
                <div style={{ fontWeight: 650, fontSize: '.92rem', color: '#1a1a1a' }}>Font Size</div>
                <div style={{ fontSize: '.75rem', color: '#888' }}>{fontScale}% — adjust to any amount</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: '.75rem', color: '#999', fontWeight: 600, flexShrink: 0 }}>75%</span>
              <input
                type="range"
                min="75"
                max="200"
                step="5"
                value={fontScale}
                onChange={e => setFontScale(Number(e.target.value))}
                aria-label={`Font size: ${fontScale}%`}
                style={{
                  flex: 1, height: 6, appearance: 'none', WebkitAppearance: 'none',
                  borderRadius: 3, outline: 'none', cursor: 'pointer',
                  background: `linear-gradient(to right, #3D5A3A 0%, #3D5A3A ${((fontScale - 75) / 125) * 100}%, #ddd ${((fontScale - 75) / 125) * 100}%, #ddd 100%)`,
                  accentColor: '#3D5A3A',
                }}
              />
              <span style={{ fontSize: '.75rem', color: '#999', fontWeight: 600, flexShrink: 0 }}>200%</span>
            </div>
          </div>

          {/* ── Color Vision ── */}
          <div style={{
            background: '#f8f8f8', borderRadius: 14, padding: '1rem 1.2rem',
            marginBottom: '.75rem',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <div style={{
                width: 38, height: 38, borderRadius: 10,
                background: '#e8e8e8',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#555',
              }}>
                <Palette size={18} />
              </div>
              <div>
                <div style={{ fontWeight: 650, fontSize: '.92rem', color: '#1a1a1a' }}>Color Vision</div>
                <div style={{ fontSize: '.75rem', color: '#888' }}>Adjust for color blindness</div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {VISION_MODES.map(v => (
                <button
                  key={v.id}
                  onClick={() => setColorVision(v.id)}
                  aria-pressed={colorVision === v.id}
                  style={{
                    padding: '10px 8px',
                    borderRadius: 10,
                    border: colorVision === v.id ? '2px solid #3D5A3A' : '2px solid transparent',
                    background: colorVision === v.id ? '#3D5A3A' : '#fff',
                    color: colorVision === v.id ? '#fff' : '#555',
                    fontWeight: 600,
                    fontSize: '.8rem',
                    cursor: 'pointer',
                    transition: 'all .2s',
                    textAlign: 'center',
                    lineHeight: 1.3,
                    minHeight: 'auto',
                  }}
                >
                  {v.label}
                </button>
              ))}
            </div>
          </div>

          {/* ── Reset ── */}
          <button
            onClick={reset}
            disabled={isDefault}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: 12,
              border: '1.5px solid',
              borderColor: isDefault ? '#eee' : '#FEE2E2',
              background: isDefault ? '#fafafa' : '#FFF5F5',
              color: isDefault ? '#ccc' : '#DC2626',
              fontWeight: 650,
              fontSize: '.88rem',
              cursor: isDefault ? 'default' : 'pointer',
              transition: 'all .2s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              minHeight: 'auto',
            }}
          >
            <RotateCcw size={15} />
            Reset All to Default
          </button>
        </div>
      )}
    </>
  );
};

export default AccessibilityWidget;
