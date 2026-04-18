import React, { useState } from 'react';
import { Tag, Plus, Trash2, ToggleLeft, ToggleRight, Copy, Check } from 'lucide-react';

const MOCK_PROMOS = [
  { id: 1, code: 'ORIGIN10', type: 'Percentage', value: 10, uses: 142, maxUses: 500, expiry: 'May 31, 2026', active: true },
  { id: 2, code: 'SAVE15',   type: 'Percentage', value: 15, uses: 88,  maxUses: 200, expiry: 'Apr 30, 2026', active: true },
  { id: 3, code: 'WELCOME20',type: 'Percentage', value: 20, uses: 35,  maxUses: 100, expiry: 'Jun 15, 2026', active: true },
  { id: 4, code: 'FLASH50',  type: 'Fixed',      value: 50000, uses: 20, maxUses: 50, expiry: 'Apr 20, 2026', active: false },
];

const AdminPromotions = () => {
  const [promos, setPromos] = useState(MOCK_PROMOS);
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(null);
  const [newPromo, setNewPromo] = useState({ code: '', type: 'Percentage', value: '', maxUses: '', expiry: '' });

  const toggleActive = (id) => setPromos(prev => prev.map(p => p.id === id ? { ...p, active: !p.active } : p));
  const deletePromo = (id) => setPromos(prev => prev.filter(p => p.id !== id));
  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(code);
    setTimeout(() => setCopied(null), 1500);
  };
  const addPromo = () => {
    setPromos(prev => [...prev, { ...newPromo, id: Date.now(), uses: 0, active: true, value: Number(newPromo.value), maxUses: Number(newPromo.maxUses) }]);
    setShowModal(false);
    setNewPromo({ code: '', type: 'Percentage', value: '', maxUses: '', expiry: '' });
  };

  return (
    <div>
      <div className="flex justify-between items-center" style={{ marginBottom: '1.75rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>Promotions Engine</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '2px' }}>Manage discount codes and flash sales</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '0.65rem 1.25rem' }}>
          <Plus size={16} /> New Coupon
        </button>
      </div>

      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem', marginBottom: '2rem' }}>
        {[
          { label: 'Active Coupons', value: promos.filter(p => p.active).length, color: '#10B981' },
          { label: 'Total Uses', value: promos.reduce((a, p) => a + p.uses, 0), color: '#004AC6' },
          { label: 'Inactive', value: promos.filter(p => !p.active).length, color: '#EF4444' },
        ].map((s, i) => (
          <div key={i} className="card" style={{ padding: '1.25rem' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.5rem' }}>{s.label}</div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Promo Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1rem' }}>
        {promos.map(p => (
          <div key={p.id} className="card" style={{ padding: '1.5rem', opacity: p.active ? 1 : 0.65, border: p.active ? '1px solid var(--border-color)' : '1px dashed var(--border-color)' }}>
            <div className="flex justify-between items-start" style={{ marginBottom: '1rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <code style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary-blue)', fontFamily: 'monospace', background: '#e6f0ff', padding: '3px 10px', borderRadius: '8px' }}>{p.code}</code>
                  <button onClick={() => copyCode(p.code)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: copied === p.code ? '#10B981' : 'var(--text-muted)' }}>
                    {copied === p.code ? <Check size={15} /> : <Copy size={15} />}
                  </button>
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                  {p.type === 'Percentage' ? `${p.value}% off` : `Rs. ${p.value.toLocaleString()} off`} · Expires {p.expiry}
                </div>
              </div>
              <button onClick={() => toggleActive(p.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: p.active ? '#10B981' : 'var(--text-muted)' }}>
                {p.active ? <ToggleRight size={30} /> : <ToggleLeft size={30} />}
              </button>
            </div>

            {/* Usage Bar */}
            <div style={{ marginBottom: '0.75rem' }}>
              <div className="flex justify-between" style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                <span>{p.uses} / {p.maxUses} uses</span>
                <span>{Math.round((p.uses / p.maxUses) * 100)}%</span>
              </div>
              <div style={{ height: '6px', background: 'var(--bg-main)', borderRadius: '999px' }}>
                <div style={{ width: `${Math.min((p.uses / p.maxUses) * 100, 100)}%`, height: '100%', borderRadius: '999px', background: p.uses / p.maxUses > 0.8 ? '#EF4444' : '#004AC6', transition: 'width 0.4s' }} />
              </div>
            </div>

            <button onClick={() => deletePromo(p.id)} style={{ display: 'flex', alignItems: 'center', gap: '4px', background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}>
              <Trash2 size={13} /> Delete
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999 }}>
          <div className="card" style={{ width: '440px', padding: '2rem', borderRadius: '20px' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.25rem' }}>Create New Coupon</h2>
            {[['Coupon Code', 'code', 'text','BLACKFRIDAY20'], ['Discount Value', 'value', 'number','20'], ['Max Uses', 'maxUses', 'number','500'], ['Expiry Date', 'expiry', 'date','']].map(([label, key, type, ph]) => (
              <div key={key} style={{ marginBottom: '0.85rem' }}>
                <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-muted)' }}>{label}</label>
                <input type={type} placeholder={ph} value={newPromo[key]} onChange={e => setNewPromo({ ...newPromo, [key]: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem 0.9rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', background: 'var(--bg-main)', color: 'var(--text-main)', outline: 'none', fontSize: '0.9rem' }} />
              </div>
            ))}
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-muted)' }}>Type</label>
              <select value={newPromo.type} onChange={e => setNewPromo({ ...newPromo, type: e.target.value })}
                style={{ width: '100%', padding: '0.65rem 0.9rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', background: 'var(--bg-main)', color: 'var(--text-main)', outline: 'none' }}>
                <option value="Percentage">Percentage (%)</option>
                <option value="Fixed">Fixed Amount (LKR)</option>
              </select>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowModal(false)} style={{ flex: 1, padding: '0.85rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', background: 'transparent', cursor: 'pointer', fontWeight: 600 }}>Cancel</button>
              <button onClick={addPromo} className="btn-primary" style={{ flex: 2, padding: '0.85rem' }}>Create Coupon</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPromotions;
