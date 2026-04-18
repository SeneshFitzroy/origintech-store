import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp, Package, Search, ShoppingCart, RotateCcw, Truck } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { formatPrice } from '../../data/mockData';

const mockOrders = [
  {
    id: 'ORD-99231', date: 'Apr 10, 2026', status: 'Processing', total: 120000,
    items: [{ id: 'origin-pro-max', name: 'Origin Pro Max', qty: 1, price: 120000 }]
  },
  {
    id: 'ORD-88421', date: 'Mar 15, 2026', status: 'Delivered', total: 85000,
    items: [{ id: 'sonic-buds-pro', name: 'Sonic Buds Pro', qty: 1, price: 85000 }]
  },
  {
    id: 'ORD-77312', date: 'Feb 28, 2026', status: 'Delivered', total: 65000,
    items: [{ id: 'origin-watch-x', name: 'Origin Watch X', qty: 1, price: 65000 }]
  },
  {
    id: 'ORD-66100', date: 'Jan 05, 2026', status: 'Cancelled', total: 25000,
    items: [{ id: 'sonic-buds', name: 'Sonic Buds', qty: 1, price: 25000 }]
  },
];

const STATUS_COLOURS = {
  Processing: { bg: '#FEF3C7', text: '#92400E', dot: '#F59E0B' },
  Delivered:  { bg: '#D1FAE5', text: '#065F46', dot: '#10B981' },
  Cancelled:  { bg: '#FEE2E2', text: '#991B1B', dot: '#EF4444' },
  Shipped:    { bg: '#b3d1ff', text: '#003a9d', dot: '#004AC6' },
};

const Orders = () => {
  const { user, currency, setCart, cart } = useAppContext();
  const navigate = useNavigate();
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [buyAgainFeedback, setBuyAgainFeedback] = useState({});

  if (!user) { navigate('/login'); return null; }

  const filters = ['All', 'Processing', 'Delivered', 'Cancelled'];

  const filteredOrders = mockOrders.filter(order => {
    const matchesStatus = filterStatus === 'All' || order.status === filterStatus;
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q ||
      order.id.toLowerCase().includes(q) ||
      order.items.some(i => i.name.toLowerCase().includes(q));
    return matchesStatus && matchesSearch;
  });

  const handleBuyAgain = (order) => {
    const newItems = order.items.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.qty,
      image: '/images/laptop.png',
      cartId: `${item.id}-${Date.now()}`,
    }));
    setCart([...cart, ...newItems]);
    setBuyAgainFeedback({ ...buyAgainFeedback, [order.id]: true });
    setTimeout(() => setBuyAgainFeedback(prev => ({ ...prev, [order.id]: false })), 2000);
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-main)', minHeight: '100vh' }}>

      {/* Premium Page Header */}
      <div className="page-header">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="ph-icon"><Package size={24}/></div>
          <h1>Order History</h1>
          <p>Track, manage, and reorder from your complete purchase history</p>
        </div>
      </div>

      <div style={{ padding: '0 1rem 3rem' }}>
      <style>{`
        .order-row { transition: background 0.15s; }
        .order-row:hover { background: var(--bg-soft) !important; }
        @keyframes fadeIn { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        .order-card { animation: fadeIn 0.3s ease forwards; }
      `}</style>

      <div className="container" style={{ maxWidth: '960px' }}>

        {/* Search Bar */}
        <div className="flex justify-between items-end" style={{ marginBottom: '2rem' }}>
          <div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              {filteredOrders.length} order{filteredOrders.length !== 1 ? 's' : ''} found
            </p>
          </div>
          <div style={{ position: 'relative', width: '280px' }}>
            <Search size={16} style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }} />
            <input
              type="text"
              placeholder="Search by order ID or product..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                width: '100%', padding: '0.6rem 1rem 0.6rem 2.5rem',
                borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)',
                background: 'var(--bg-surface)', color: 'var(--text-main)', fontSize: '0.88rem', outline: 'none'
              }}
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.75rem' }}>
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setFilterStatus(f)}
              style={{
                padding: '0.45rem 1.1rem', borderRadius: '999px', fontSize: '0.88rem', fontWeight: 600,
                cursor: 'pointer', transition: 'all 0.2s', border: 'none',
                background: filterStatus === f ? 'var(--primary-blue)' : 'var(--bg-surface)',
                color: filterStatus === f ? 'white' : 'var(--text-muted)',
                border: filterStatus === f ? 'none' : '1px solid var(--border-color)',
                boxShadow: filterStatus === f ? '0 4px 12px rgba(0,74,198,0.25)' : 'none',
              }}
            >
              {f}
              {f !== 'All' && (
                <span style={{
                  marginLeft: '6px', fontSize: '0.75rem', padding: '1px 6px',
                  borderRadius: '999px',
                  background: filterStatus === f ? 'rgba(255,255,255,0.25)' : 'var(--bg-main)',
                  color: filterStatus === f ? 'white' : 'var(--text-muted)'
                }}>
                  {mockOrders.filter(o => o.status === f).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="card" style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            <Package size={48} style={{ margin: '0 auto 1rem', opacity: 0.3 }} />
            <h3 style={{ marginBottom: '0.5rem' }}>No orders found</h3>
            <p style={{ marginBottom: '1.5rem', fontSize: '0.9rem' }}>
              {searchQuery ? `No results for "${searchQuery}"` : `No ${filterStatus.toLowerCase()} orders yet.`}
            </p>
            <Link to="/browse" className="btn-primary" style={{ display: 'inline-block' }}>Start Shopping</Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filteredOrders.map((order, idx) => {
              const colours = STATUS_COLOURS[order.status] || STATUS_COLOURS.Processing;
              return (
                <div key={order.id} className="card order-card" style={{ padding: 0, overflow: 'hidden', animationDelay: `${idx * 0.06}s` }}>
                  {/* Row Header */}
                  <div
                    className="order-row flex justify-between items-center"
                    style={{ padding: '1.25rem 1.75rem', cursor: 'pointer', background: expandedOrder === order.id ? 'var(--bg-soft)' : 'transparent' }}
                    onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                      <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: colours.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Package size={20} color={colours.dot} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-main)' }}>{order.id}</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: '2px' }}>Placed on {order.date}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-main)' }}>{formatPrice(order.total, currency)}</div>
                        <span style={{
                          display: 'inline-flex', alignItems: 'center', gap: '4px',
                          fontSize: '0.78rem', fontWeight: 600, padding: '2px 8px', borderRadius: '999px',
                          background: colours.bg, color: colours.text, marginTop: '4px'
                        }}>
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: colours.dot }} />
                          {order.status}
                        </span>
                      </div>
                      <div style={{ color: 'var(--text-muted)' }}>
                        {expandedOrder === order.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Detail */}
                  {expandedOrder === order.id && (
                    <div style={{ padding: '1.5rem 1.75rem', borderTop: '1px solid var(--border-color)', background: 'var(--bg-soft)' }}>
                      <h4 style={{ fontSize: '0.82rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)', marginBottom: '1rem' }}>Items in this order</h4>
                      {order.items.map((item, i) => (
                        <div key={i} className="flex justify-between items-center" style={{ padding: '0.75rem 0', borderBottom: i < order.items.length - 1 ? '1px dashed var(--border-color)' : 'none' }}>
                          <div className="flex items-center gap-3">
                            <div style={{ width: '44px', height: '44px', backgroundColor: 'var(--bg-surface)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-color)' }}>
                              <Package size={18} style={{ color: 'var(--text-muted)' }} />
                            </div>
                            <div>
                              <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{item.name}</div>
                              <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>Qty: {item.qty}</div>
                            </div>
                          </div>
                          <div style={{ fontWeight: 700 }}>{formatPrice(item.price * item.qty, currency)}</div>
                        </div>
                      ))}

                      <div className="flex justify-between items-center" style={{ marginTop: '1.5rem' }}>
                        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                          <Link to="/support" style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '0.5rem 1rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', color: 'var(--text-muted)', textDecoration: 'none' }}>
                            <RotateCcw size={14} /> Return / Refund
                          </Link>
                          {order.status !== 'Cancelled' && (
                            <Link to="/tracking" style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '0.5rem 1rem', border: '1px solid var(--primary-blue)', color: 'var(--primary-blue)', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}>
                              <Truck size={14} /> Track Order
                            </Link>
                          )}
                        </div>
                        {order.status !== 'Cancelled' && (
                          <button
                            onClick={() => handleBuyAgain(order)}
                            className="btn-primary"
                            style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '0.5rem 1.25rem', fontSize: '0.88rem', background: buyAgainFeedback[order.id] ? '#10B981' : undefined, transition: 'background 0.2s' }}
                          >
                            <ShoppingCart size={15} />
                            {buyAgainFeedback[order.id] ? 'Added to Cart ✓' : 'Buy Again'}
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default Orders;
