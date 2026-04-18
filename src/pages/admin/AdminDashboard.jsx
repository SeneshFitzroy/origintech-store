import React from 'react';
import { Users, ShoppingCart, DollarSign, Package, TrendingUp } from 'lucide-react';
import { formatPrice } from '../../data/mockData';
import { useAppContext } from '../../context/AppContext';

const AdminDashboard = () => {
  const { currency } = useAppContext();

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div className="flex justify-between items-center" style={{ marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <h1 style={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)', fontWeight: 800 }}>Overview</h1>
        <div style={{ padding: '0.5rem 1rem', background: 'var(--bg-surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Last 30 Days
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 lg-grid-cols-2 md-grid-cols-1" style={{ gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="card" style={{ padding: '1.5rem' }}>
          <div className="flex justify-between items-center" style={{ marginBottom: '1rem' }}>
            <div style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Total Revenue</div>
            <div style={{ padding: '0.5rem', backgroundColor: 'rgba(0, 74, 198, 0.1)', color: 'var(--primary-blue)', borderRadius: 'var(--radius-md)' }}>
              <DollarSign size={20} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 700 }}>{formatPrice(4500000, currency)}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#10B981', fontSize: '0.85rem', marginTop: '0.5rem' }}>
            <TrendingUp size={14} /> +12.5% from last month
          </div>
        </div>

        <div className="card" style={{ padding: '1.5rem' }}>
          <div className="flex justify-between items-center" style={{ marginBottom: '1rem' }}>
            <div style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Orders</div>
            <div style={{ padding: '0.5rem', backgroundColor: 'rgba(0, 74, 198, 0.1)', color: 'var(--primary-blue)', borderRadius: 'var(--radius-md)' }}>
              <ShoppingCart size={20} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 700 }}>1,245</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#10B981', fontSize: '0.85rem', marginTop: '0.5rem' }}>
            <TrendingUp size={14} /> +5.2% from last month
          </div>
        </div>

        <div className="card" style={{ padding: '1.5rem' }}>
          <div className="flex justify-between items-center" style={{ marginBottom: '1rem' }}>
            <div style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Active Users</div>
            <div style={{ padding: '0.5rem', backgroundColor: 'rgba(0, 74, 198, 0.1)', color: 'var(--primary-blue)', borderRadius: 'var(--radius-md)' }}>
              <Users size={20} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 700 }}>8,920</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#EF4444', fontSize: '0.85rem', marginTop: '0.5rem' }}>
            <TrendingUp size={14} style={{ transform: 'rotate(180deg)' }} /> -1.1% from last month
          </div>
        </div>

        <div className="card" style={{ padding: '1.5rem' }}>
          <div className="flex justify-between items-center" style={{ marginBottom: '1rem' }}>
            <div style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Low Stock Items</div>
            <div style={{ padding: '0.5rem', backgroundColor: 'rgba(0, 74, 198, 0.1)', color: 'var(--primary-blue)', borderRadius: 'var(--radius-md)' }}>
              <Package size={20} />
            </div>
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 700 }}>24</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#F59E0B', fontSize: '0.85rem', marginTop: '0.5rem' }}>
            Needs attention
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 lg-grid-cols-1" style={{ gap: '1.5rem' }}>
        <div className="card" style={{ gridColumn: 'span 2 / span 2' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', fontWeight: 700 }}>Recent Orders</h2>
          <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                  <th style={{ padding: '1rem 0', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Order ID</th>
                  <th style={{ padding: '1rem 0', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Customer</th>
                  <th style={{ padding: '1rem 0', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Date</th>
                  <th style={{ padding: '1rem 0', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Status</th>
                  <th style={{ padding: '1rem 0', textAlign: 'right', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: 'ORD-98231', customer: 'Sarah L.', date: 'Oct 25', status: 'Processing', total: 120000 },
                  { id: 'ORD-98230', customer: 'John M.', date: 'Oct 25', status: 'Shipped', total: 85000 },
                  { id: 'ORD-98229', customer: 'Alice K.', date: 'Oct 24', status: 'Delivered', total: 250000 }
                ].map(o => (
                  <tr key={o.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '1.25rem 0', fontWeight: 600 }}>{o.id}</td>
                    <td style={{ padding: '1.25rem 0' }}>{o.customer}</td>
                    <td style={{ padding: '1.25rem 0' }}>{o.date}</td>
                    <td style={{ padding: '1.25rem 0' }}>
                      <span style={{ padding: '0.25rem 0.65rem', backgroundColor: o.status === 'Processing' ? '#FEF3C7' : o.status === 'Shipped' ? '#b3d1ff' : '#D1FAE5', color: o.status === 'Processing' ? '#92400E' : o.status === 'Shipped' ? '#003a9d' : '#065F46', borderRadius: 'var(--radius-sm)', fontSize: '0.75rem', fontWeight: 700 }}>{o.status}</span>
                    </td>
                    <td style={{ padding: '1.25rem 0', textAlign: 'right', fontWeight: 700 }}>{formatPrice(o.total, currency)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="card flex flex-column justify-center items-center" style={{ backgroundColor: 'var(--premium-navy)', color: 'var(--pure-white)', textAlign: 'center', gridColumn: 'span 1 / span 1', padding: '2.5rem' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--primary-blue)', fontWeight: 800 }}>AI Analytics Engine</h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--slate-4)', marginBottom: '2rem', lineHeight: 1.6 }}>Predictive stock ordering, automated promotions, and AI segmenting.</p>
          <div style={{ padding: '0.75rem 1.25rem', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', fontWeight: 600 }}>
             Coming in Stage 2
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
