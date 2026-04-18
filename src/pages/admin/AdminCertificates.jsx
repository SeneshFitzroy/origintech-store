import React, { useState } from 'react';
import { ShieldCheck, Plus, Search, QrCode, Eye, Download } from 'lucide-react';
import { mockProducts } from '../../data/mockData';

const MOCK_CERTS = [
  { id: 'CERT-001', serial: 'OT-2026-PRO-00142', product: 'Origin Pro Max', issued: 'Apr 10, 2026', owner: 'John Doe',    status: 'Valid' },
  { id: 'CERT-002', serial: 'OT-2026-TAB-00088', product: 'Origin Tablet Z', issued: 'Apr 5, 2026',  owner: 'Alice Kim',  status: 'Valid' },
  { id: 'CERT-003', serial: 'OT-2026-BUD-00321', product: 'Sonic Buds Pro',  issued: 'Mar 20, 2026', owner: 'Sarah Lin',  status: 'Valid' },
  { id: 'CERT-004', serial: 'OT-2026-LAP-00011', product: 'Origin Laptop Z', issued: 'Jan 15, 2026', owner: 'Mike T.',   status: 'Revoked' },
];

const AdminCertificates = () => {
  const [certs, setCerts] = useState(MOCK_CERTS);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newCert, setNewCert] = useState({ product: '', owner: '', serial: '' });

  const filtered = certs.filter(c => {
    const q = search.toLowerCase();
    return !q || c.serial.toLowerCase().includes(q) || c.product.toLowerCase().includes(q) || c.owner.toLowerCase().includes(q);
  });

  const revoke = (id) => setCerts(prev => prev.map(c => c.id === id ? { ...c, status: 'Revoked' } : c));
  const restore = (id) => setCerts(prev => prev.map(c => c.id === id ? { ...c, status: 'Valid' } : c));

  const issueCert = () => {
    const cert = {
      id: `CERT-${String(certs.length + 1).padStart(3, '0')}`,
      serial: `OT-2026-NEW-${Math.floor(10000 + Math.random() * 90000)}`,
      product: newCert.product,
      issued: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      owner: newCert.owner,
      status: 'Valid',
    };
    setCerts(prev => [...prev, cert]);
    setShowModal(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center" style={{ marginBottom: '1.75rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>Authenticity Certificates</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '2px' }}>Issue and manage digital certificates of authenticity</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '7px', padding: '0.65rem 1.25rem' }}>
          <Plus size={16} /> Issue Certificate
        </button>
      </div>

      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem', marginBottom: '1.75rem' }}>
        {[
          { label: 'Total Issued', value: certs.length, color: '#004AC6' },
          { label: 'Valid', value: certs.filter(c => c.status === 'Valid').length, color: '#10B981' },
          { label: 'Revoked', value: certs.filter(c => c.status === 'Revoked').length, color: '#EF4444' },
        ].map((s, i) => (
          <div key={i} className="card" style={{ padding: '1.25rem' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.5rem' }}>{s.label}</div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div style={{ position: 'relative', marginBottom: '1.25rem' }}>
        <Search size={15} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        <input type="text" placeholder="Search serial number, product, or owner..." value={search} onChange={e => setSearch(e.target.value)}
          style={{ width: '100%', padding: '0.65rem 1rem 0.65rem 2.4rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', background: 'var(--bg-surface)', color: 'var(--text-main)', fontSize: '0.9rem', outline: 'none' }} />
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--bg-soft)', borderBottom: '1px solid var(--border-color)' }}>
              {['Serial Number', 'Product', 'Owner', 'Issued', 'Status', 'Actions'].map(h => (
                <th key={h} style={{ padding: '0.85rem 1.25rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.id} style={{ borderBottom: '1px solid var(--border-color)' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-soft)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <td style={{ padding: '1rem 1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                    <QrCode size={16} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                    <code style={{ fontSize: '0.82rem', color: 'var(--primary-blue)', fontFamily: 'monospace', fontWeight: 600 }}>{c.serial}</code>
                  </div>
                </td>
                <td style={{ padding: '1rem 1.25rem', fontSize: '0.9rem', fontWeight: 600 }}>{c.product}</td>
                <td style={{ padding: '1rem 1.25rem', fontSize: '0.88rem', color: 'var(--text-muted)' }}>{c.owner}</td>
                <td style={{ padding: '1rem 1.25rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{c.issued}</td>
                <td style={{ padding: '1rem 1.25rem' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 8px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700, background: c.status === 'Valid' ? '#D1FAE5' : '#FEE2E2', color: c.status === 'Valid' ? '#065F46' : '#991B1B' }}>
                    <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: c.status === 'Valid' ? '#10B981' : '#EF4444' }} />
                    {c.status}
                  </span>
                </td>
                <td style={{ padding: '1rem 1.25rem' }}>
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <button title="Download" style={{ padding: '0.4rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-surface)', cursor: 'pointer', color: 'var(--text-muted)' }}>
                      <Download size={14} />
                    </button>
                    {c.status === 'Valid'
                      ? <button onClick={() => revoke(c.id)} style={{ padding: '0.4rem 0.7rem', borderRadius: '8px', border: '1px solid #FECACA', background: '#FEF2F2', cursor: 'pointer', color: '#EF4444', fontSize: '0.78rem', fontWeight: 600 }}>Revoke</button>
                      : <button onClick={() => restore(c.id)} style={{ padding: '0.4rem 0.7rem', borderRadius: '8px', border: '1px solid #BBF7D0', background: '#F0FDF4', cursor: 'pointer', color: '#16A34A', fontSize: '0.78rem', fontWeight: 600 }}>Restore</button>
                    }
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Issue Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999 }}>
          <div className="card" style={{ width: '440px', padding: '2rem', borderRadius: '20px' }}>
            <div className="flex items-center gap-2" style={{ marginBottom: '1.5rem' }}>
              <ShieldCheck size={22} color="var(--primary-blue)" />
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Issue New Certificate</h2>
            </div>
            {[['Product Name', 'product', 'text', 'e.g. Origin Pro Max'], ['Owner Full Name', 'owner', 'text', 'e.g. John Doe']].map(([label, key, type, ph]) => (
              <div key={key} style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-muted)' }}>{label}</label>
                <input type={type} placeholder={ph} value={newCert[key]} onChange={e => setNewCert({ ...newCert, [key]: e.target.value })}
                  style={{ width: '100%', padding: '0.65rem 0.9rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', background: 'var(--bg-main)', color: 'var(--text-main)', outline: 'none', fontSize: '0.9rem' }} />
              </div>
            ))}
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>Serial number will be auto-generated upon issuance.</p>
            <div className="flex gap-3">
              <button onClick={() => setShowModal(false)} style={{ flex: 1, padding: '0.85rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', background: 'transparent', cursor: 'pointer', fontWeight: 600 }}>Cancel</button>
              <button onClick={issueCert} className="btn-primary" style={{ flex: 2, padding: '0.85rem' }}>Issue Certificate</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCertificates;
