import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, Truck, CheckCircle2, RefreshCw, XCircle } from 'lucide-react';
import { formatPrice } from '../../data/mockData';
import { useAppContext } from '../../context/AppContext';

const STATUS_CONFIG = {
  Processing: { bg: '#FEF3C7', text: '#92400E', dot: '#F59E0B' },
  Shipped:    { bg: '#b3d1ff', text: '#003a9d', dot: '#004AC6' },
  Delivered:  { bg: '#D1FAE5', text: '#065F46', dot: '#10B981' },
  Cancelled:  { bg: '#FEE2E2', text: '#991B1B', dot: '#EF4444' },
};

const MOCK_ORDERS = [
  { id: 'ORD-98231', customer: 'Sarah L.', email: 'sarah@email.com', date: 'Apr 15, 2026', status: 'Processing', total: 120000, items: ['Origin Pro Max × 1'] },
  { id: 'ORD-98230', customer: 'John M.',  email: 'john@email.com',  date: 'Apr 14, 2026', status: 'Shipped',    total: 85000,  items: ['Sonic Buds Pro × 1', 'Case × 1'] },
  { id: 'ORD-98229', customer: 'Alice K.', email: 'alice@email.com', date: 'Apr 13, 2026', status: 'Delivered',  total: 250000, items: ['Origin Laptop Z × 1'] },
  { id: 'ORD-98228', customer: 'Dev P.',   email: 'dev@email.com',   date: 'Apr 12, 2026', status: 'Cancelled',  total: 35000,  items: ['Origin Watch X × 1'] },
  { id: 'ORD-98227', customer: 'Mia T.',   email: 'mia@email.com',   date: 'Apr 11, 2026', status: 'Processing', total: 65000,  items: ['Origin Tablet Z × 1'] },
];

const AdminOrders = () => {
  const { currency } = useAppContext();
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [expanded, setExpanded] = useState(null);

  const statuses = ['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

  const filtered = orders.filter(o => {
    const matchStatus = filterStatus === 'All' || o.status === filterStatus;
    const q = search.toLowerCase();
    const matchSearch = !q || o.id.toLowerCase().includes(q) || o.customer.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  const updateStatus = (id, newStatus) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  const NEXT_STATUS = { Processing: 'Shipped', Shipped: 'Delivered', Delivered: 'Delivered', Cancelled: 'Cancelled' };

  return (
    <div>
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>Order Management</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '2px' }}>{filtered.length} orders shown</p>
      </div>

      {/* Filters */}
      <div className="flex gap-3 items-center" style={{ marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
          <Search size={15} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input type="text" placeholder="Search order ID or customer..." value={search} onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', padding: '0.65rem 1rem 0.65rem 2.4rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', background: 'var(--bg-surface)', color: 'var(--text-main)', fontSize: '0.9rem', outline: 'none' }} />
        </div>
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {statuses.map(s => (
            <button key={s} onClick={() => setFilterStatus(s)} style={{ padding: '0.4rem 0.85rem', borderRadius: '999px', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', background: filterStatus === s ? 'var(--primary-blue)' : 'var(--bg-surface)', color: filterStatus === s ? 'white' : 'var(--text-muted)', border: filterStatus === s ? 'none' : '1px solid var(--border-color)' }}>
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--bg-soft)', borderBottom: '1px solid var(--border-color)' }}>
              {['Order ID', 'Customer', 'Date', 'Total', 'Status', 'Actions', ''].map(h => (
                <th key={h} style={{ padding: '0.85rem 1.25rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(order => {
              const cfg = STATUS_CONFIG[order.status] || STATUS_CONFIG.Processing;
              return (
                <React.Fragment key={order.id}>
                  <tr style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-soft)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                    <td style={{ padding: '1rem 1.25rem', fontWeight: 700, color: 'var(--primary-blue)', fontSize: '0.9rem' }}>{order.id}</td>
                    <td style={{ padding: '1rem 1.25rem' }}>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{order.customer}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{order.email}</div>
                    </td>
                    <td style={{ padding: '1rem 1.25rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{order.date}</td>
                    <td style={{ padding: '1rem 1.25rem', fontWeight: 700, fontSize: '0.9rem' }}>{formatPrice(order.total, currency)}</td>
                    <td style={{ padding: '1rem 1.25rem' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 10px', borderRadius: '999px', fontSize: '0.78rem', fontWeight: 700, background: cfg.bg, color: cfg.text }}>
                        <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: cfg.dot }} />
                        {order.status}
                      </span>
                    </td>
                    <td style={{ padding: '1rem 1.25rem' }}>
                      <div style={{ display: 'flex', gap: '0.4rem' }}>
                        {order.status !== 'Delivered' && order.status !== 'Cancelled' && (
                          <button onClick={() => updateStatus(order.id, NEXT_STATUS[order.status])} style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '0.35rem 0.75rem', borderRadius: '8px', border: 'none', background: 'var(--primary-blue)', color: 'white', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer' }}>
                            <Truck size={12} /> Advance Status
                          </button>
                        )}
                        {order.status === 'Processing' && (
                          <button onClick={() => updateStatus(order.id, 'Cancelled')} style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '0.35rem 0.75rem', borderRadius: '8px', border: '1px solid #FECACA', background: '#FEF2F2', color: '#EF4444', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer' }}>
                            <XCircle size={12} /> Cancel
                          </button>
                        )}
                      </div>
                    </td>
                    <td style={{ padding: '1rem 1.25rem' }}>
                      <button onClick={() => setExpanded(expanded === order.id ? null : order.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                        {expanded === order.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </button>
                    </td>
                  </tr>
                  {expanded === order.id && (
                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td colSpan={7} style={{ padding: '1rem 1.25rem 1.25rem 1.25rem', background: 'var(--bg-soft)' }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-muted)' }}>ORDER ITEMS</div>
                        {order.items.map((item, i) => (
                          <div key={i} style={{ fontSize: '0.9rem', color: 'var(--text-main)', padding: '0.3rem 0' }}>• {item}</div>
                        ))}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>No orders found.</div>}
      </div>
    </div>
  );
};

export default AdminOrders;
