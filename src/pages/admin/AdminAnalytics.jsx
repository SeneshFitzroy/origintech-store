import React from 'react';
import { TrendingUp, TrendingDown, Users, ShoppingBag, DollarSign, Package, ArrowUpRight } from 'lucide-react';
import { formatPrice } from '../../data/mockData';
import { useAppContext } from '../../context/AppContext';

// Mini bar chart component (pure CSS/divs)
const BarChart = ({ data, color = '#004AC6', height = 80 }) => {
  const max = Math.max(...data.map(d => d.value));
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: `${height}px` }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
          <div style={{ width: '100%', background: color, borderRadius: '4px 4px 0 0', height: `${(d.value / max) * height}px`, opacity: i === data.length - 1 ? 1 : 0.55, transition: 'height 0.4s' }} />
          <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>{d.label}</div>
        </div>
      ))}
    </div>
  );
};

// Mini line chart (SVG)
const LineChart = ({ values, color = '#10B981', width = 200, height = 60 }) => {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;
  const pts = values.map((v, i) => [
    (i / (values.length - 1)) * width,
    height - ((v - min) / range) * (height - 10) - 5,
  ]);
  const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0]} ${p[1]}`).join(' ');
  const area = `${d} L ${pts[pts.length - 1][0]} ${height} L 0 ${height} Z`;
  return (
    <svg width={width} height={height} style={{ overflow: 'visible' }}>
      <defs>
        <linearGradient id={`grad-${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#grad-${color.replace('#','')})`} />
      <path d={d} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r="3.5" fill={color} stroke="white" strokeWidth="1.5" />)}
    </svg>
  );
};

const MONTHLY_REVENUE = [
  { label: 'Nov', value: 3200000 }, { label: 'Dec', value: 4100000 }, { label: 'Jan', value: 2900000 },
  { label: 'Feb', value: 3800000 }, { label: 'Mar', value: 4500000 }, { label: 'Apr', value: 5200000 },
];
const USER_GROWTH = [1200, 1450, 1800, 2200, 2600, 3100, 3800, 4400, 5100, 6200, 7400, 8920];
const ORDER_TREND = [180, 210, 195, 240, 285, 310, 295, 340, 380, 420, 460, 510];

const TOP_PRODUCTS = [
  { name: 'Origin Pro Max', units: 312, revenue: 37440000, pct: 100 },
  { name: 'Origin Laptop Z', units: 198, revenue: 49500000, pct: 85 },
  { name: 'Sonic Buds Pro',  units: 547, revenue: 13675000, pct: 70 },
  { name: 'Origin Tablet Z', units: 224, revenue: 19040000, pct: 55 },
  { name: 'Origin Watch X',  units: 183, revenue: 10980000, pct: 40 },
];

const AdminAnalytics = () => {
  const { currency } = useAppContext();

  const kpis = [
    { label: 'Total Revenue', value: formatPrice(5200000, currency), change: '+12.5%', up: true, icon: DollarSign, color: '#004AC6', bg: '#e6f0ff' },
    { label: 'Total Orders',  value: '1,245', change: '+5.2%', up: true,  icon: ShoppingBag, color: '#10B981', bg: '#F0FDF4' },
    { label: 'Active Users',  value: '8,920', change: '-1.1%', up: false, icon: Users, color: '#F59E0B', bg: '#FFFBEB' },
    { label: 'Low Stock Items', value: '24', change: '+8 items', up: false, icon: Package, color: '#EF4444', bg: '#FEF2F2' },
  ];

  return (
    <div>
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>Analytics Dashboard</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '2px' }}>Business insights for the last 30 days</p>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem', marginBottom: '2rem' }}>
        {kpis.map((k, i) => (
          <div key={i} className="card" style={{ padding: '1.5rem' }}>
            <div className="flex justify-between items-start" style={{ marginBottom: '1rem' }}>
              <div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{k.label}</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '0.25rem' }}>{k.value}</div>
              </div>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: k.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <k.icon size={20} color={k.color} />
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.82rem', fontWeight: 600, color: k.up ? '#10B981' : '#EF4444' }}>
              {k.up ? <TrendingUp size={14} /> : <TrendingDown size={14} />} {k.change} vs last month
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
        {/* Revenue Chart */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <div className="flex justify-between items-center" style={{ marginBottom: '1.5rem' }}>
            <div>
              <h3 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-main)' }}>Monthly Revenue</h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Last 6 months</p>
            </div>
            <div style={{ fontSize: '0.82rem', color: '#10B981', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '3px' }}>
              <ArrowUpRight size={14} /> +15.6%
            </div>
          </div>
          <BarChart data={MONTHLY_REVENUE} color="#004AC6" height={120} />
        </div>

        {/* User Growth */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ marginBottom: '1.25rem' }}>
            <h3 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-main)' }}>User Growth</h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Last 12 months</p>
          </div>
          <div style={{ overflowX: 'hidden' }}>
            <LineChart values={USER_GROWTH} color="#10B981" width={280} height={100} />
          </div>
          <div style={{ marginTop: '0.75rem', fontSize: '1.5rem', fontWeight: 800, color: '#10B981' }}>+8,920</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Total registered users</div>
        </div>
      </div>

      {/* Order Trend + Top Products */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '1.5rem' }}>
        {/* Order Trend */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ marginBottom: '1.25rem' }}>
            <h3 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-main)' }}>Order Volume Trend</h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Monthly orders, last 12 months</p>
          </div>
          <LineChart values={ORDER_TREND} color="#6366F1" width={280} height={100} />
          <div style={{ marginTop: '0.75rem', fontSize: '1.5rem', fontWeight: 800, color: '#6366F1' }}>510</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Orders this month</div>
        </div>

        {/* Top Products */}
        <div className="card" style={{ padding: '1.5rem' }}>
          <div style={{ marginBottom: '1.25rem' }}>
            <h3 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-main)' }}>Top Products by Units Sold</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {TOP_PRODUCTS.map((p, i) => (
              <div key={i}>
                <div className="flex justify-between" style={{ marginBottom: '4px' }}>
                  <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>{p.name}</span>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>{p.units} units</span>
                </div>
                <div style={{ height: '6px', background: 'var(--bg-main)', borderRadius: '999px' }}>
                  <div style={{ width: `${p.pct}%`, height: '100%', borderRadius: '999px', background: `hsl(${220 - i * 30}, 75%, 55%)`, transition: 'width 0.4s' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
