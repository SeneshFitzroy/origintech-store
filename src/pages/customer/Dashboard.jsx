import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Package, Heart, User as UserIcon, RefreshCw, LifeBuoy,
  LogOut, ShoppingBag, Star, TrendingUp, ArrowRight,
  Bell, Settings, ChevronRight, Zap, Shield, Clock
} from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { formatPrice } from '../../data/mockData';

const mockRecentOrders = [
  { id: 'ORD-4821', product: 'Origin Pro Max', date: 'Apr 10, 2026', status: 'Delivered', statusColor: '#10B981', amount: 120000 },
  { id: 'ORD-4756', product: 'Sonic Buds Pro', date: 'Mar 28, 2026', status: 'In Transit', statusColor: '#3B82F6', amount: 25000 },
  { id: 'ORD-4690', product: 'Origin Watch X', date: 'Mar 15, 2026', status: 'Processing', statusColor: '#F59E0B', amount: 65000 },
];

const Dashboard = () => {
  const { user, setUser, currency, tradeInCredit, wishlist } = useAppContext();
  const navigate = useNavigate();

  if (!user) { navigate('/login'); return null; }

  const handleLogout = () => { setUser(null); navigate('/'); };

  const firstName = user.name.split(' ')[0];
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  const quickLinks = [
    { to: '/orders',   icon: Package,   label: 'My Orders',   sub: '3 orders',  gradient: 'linear-gradient(135deg,#3B82F6,#1D4ED8)' },
    { to: '/wishlist', icon: Heart,     label: 'Wishlist',    sub: '2 saved',   gradient: 'linear-gradient(135deg,#EC4899,#BE185D)' },
    { to: '/profile',  icon: UserIcon,  label: 'Profile',     sub: 'Edit info', gradient: 'linear-gradient(135deg,#8B5CF6,#6D28D9)' },
    { to: '/trade-in', icon: RefreshCw, label: 'Trade-In',    sub: tradeInCredit > 0 ? `${formatPrice(tradeInCredit, currency)} credit` : 'Get credit', gradient: 'linear-gradient(135deg,#10B981,#047857)' },
    { to: '/support',  icon: LifeBuoy,  label: 'Support',     sub: 'Get help',  gradient: 'linear-gradient(135deg,#F59E0B,#B45309)' },
    { to: '/browse',   icon: ShoppingBag,label: 'Shop Now',   sub: 'Browse all',gradient: 'linear-gradient(135deg,#06B6D4,#0E7490)' },
  ];

  const stats = [
    { label: 'Total Orders', value: '3', icon: Package, color: '#3B82F6', bg: '#EFF6FF' },
    { label: 'Wishlist Items', value: '2', icon: Heart, color: '#EC4899', bg: '#FDF2F8' },
    { label: 'Loyalty Points', value: '1,240', icon: Star, color: '#F59E0B', bg: '#FFFBEB' },
    { label: 'Trade-In Credit', value: formatPrice(tradeInCredit, currency), icon: TrendingUp, color: '#10B981', bg: '#F0FDF4' },
  ];

  return (
    <div style={{ backgroundColor: 'var(--bg-main)', minHeight: '100vh' }}>
      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
        .dash-card { animation: fadeUp 0.4s ease forwards; transition: transform 0.2s, box-shadow 0.2s; }
        .dash-card:hover { transform: translateY(-3px); box-shadow: 0 12px 28px rgba(0,0,0,0.08); }
        .quick-link:hover .ql-arrow { transform: translateX(4px); }
        .ql-arrow { transition: transform 0.2s; }
        .order-row:hover { background: var(--bg-main) !important; }
        @media (max-width: 1024px) {
          .dash-main-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          .dash-quick-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .dash-quick-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>

      {/* Top Hero Banner */}
      <div style={{
        background: 'linear-gradient(160deg, #04101E 0%, #0B1D36 35%, #0F2847 65%, #132F52 100%)',
        padding: '3rem 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background decoration */}
        <div style={{ position:'absolute', top:'-60px', right:'-60px', width:'380px', height:'380px', borderRadius:'50%', background:'rgba(59,130,246,0.08)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:'-80px', left:'10%', width:'260px', height:'260px', borderRadius:'50%', background:'rgba(139,92,246,0.07)', pointerEvents:'none' }} />

        <div className="container" style={{ position:'relative', zIndex:1 }}>
          <div className="flex justify-between items-center">
            <div>
              <p style={{ color:'#93C5FD', fontSize:'0.95rem', marginBottom:'0.4rem', letterSpacing:'0.5px' }}>{greeting},</p>
              <h1 style={{ fontSize:'2.8rem', fontWeight:800, color:'white', marginBottom:'0.5rem', letterSpacing:'-0.02em' }}>
                Welcome back, <span style={{ color:'#60A5FA' }}>{firstName}</span>
              </h1>
              <p style={{ color:'#94A3B8', fontSize:'1rem' }}>Here's what's happening with your account today.</p>
            </div>
            <div className="flex items-center gap-2">
              <button style={{ display:'flex', alignItems:'center', justifyContent:'center', width:'42px', height:'42px', background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.12)', borderRadius:'12px', cursor:'pointer', color:'rgba(255,255,255,0.8)', transition:'all 0.2s' }}>
                <Bell size={18} />
              </button>
              <Link to="/profile" style={{ display:'flex', alignItems:'center', justifyContent:'center', width:'42px', height:'42px', borderRadius:'12px', background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.12)', color:'rgba(255,255,255,0.8)', transition:'all 0.2s' }}>
                <Settings size={18} />
              </Link>
              <button onClick={handleLogout} style={{
                display:'flex', alignItems:'center', gap:'6px', height:'42px',
                background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.12)',
                color:'rgba(255,255,255,0.8)', borderRadius:'12px', padding:'0 1.1rem',
                cursor:'pointer', fontSize:'0.88rem', fontWeight:500, transition:'all 0.2s'
              }}>
                <LogOut size={16} /> Logout
              </button>
            </div>
          </div>
        </div>
      </div>


      <div className="container" style={{ padding:'2rem 1rem 4rem' }}>
        {/* Quick Access Links */}
        <h2 style={{ fontSize:'1.25rem', fontWeight:700, color:'var(--text-main)', marginBottom:'1.25rem', marginTop:'0.5rem' }}>Quick Access</h2>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:'1rem', marginBottom:'2.5rem' }} className="dash-quick-grid">
          {quickLinks.map((ql, i) => (
            <Link key={i} to={ql.to} className="dash-card quick-link" style={{
              borderRadius:'16px', padding:'1.5rem 1rem', textAlign:'center',
              textDecoration:'none', border:'1px solid var(--border-color)',
              background:'var(--bg-surface)', display:'flex', flexDirection:'column',
              alignItems:'center', gap:'0.75rem', animationDelay:`${0.28 + i*0.06}s`,
              position:'relative', overflow:'hidden'
            }}>
              <div style={{
                width:'52px', height:'52px', borderRadius:'14px',
                background:ql.gradient, display:'flex', alignItems:'center', justifyContent:'center',
                boxShadow:`0 8px 20px rgba(0,0,0,0.18)`
              }}>
                <ql.icon size={24} color="white" />
              </div>
              <div>
                <div style={{ fontWeight:700, fontSize:'0.92rem', color:'var(--text-main)' }}>{ql.label}</div>
                <div style={{ fontSize:'0.75rem', color:'var(--text-muted)', marginTop:'2px' }}>{ql.sub}</div>
              </div>
              <ChevronRight size={14} className="ql-arrow" style={{ position:'absolute', bottom:'0.75rem', right:'0.75rem', color:'var(--text-muted)' }} />
            </Link>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="dash-main-grid" style={{ display:'grid', gridTemplateColumns:'1fr 350px', gap:'1.75rem' }}>

          {/* Recent Orders */}
          <div className="dash-card" style={{
            background:'var(--bg-surface)', borderRadius:'20px',
            border:'1px solid var(--border-color)', overflow:'hidden',
            animationDelay:'0.55s'
          }}>
            <div className="flex justify-between items-center" style={{ padding:'1.5rem 1.75rem', borderBottom:'1px solid var(--border-color)' }}>
              <div>
                <h2 style={{ fontSize:'1.1rem', fontWeight:700, color:'var(--text-main)' }}>Recent Orders</h2>
                <p style={{ fontSize:'0.8rem', color:'var(--text-muted)', marginTop:'2px' }}>Track your latest purchases</p>
              </div>
              <Link to="/orders" style={{
                display:'flex', alignItems:'center', gap:'4px',
                fontSize:'0.85rem', color:'var(--primary-blue)', fontWeight:600, textDecoration:'none'
              }}>
                View All <ArrowRight size={14} />
              </Link>
            </div>

            {mockRecentOrders.length === 0 ? (
              <div style={{ padding:'4rem', textAlign:'center', color:'var(--text-muted)' }}>
                <Package size={40} style={{ marginBottom:'1rem', opacity:0.3 }} />
                <p>No orders yet. Start shopping!</p>
              </div>
            ) : (
              <table style={{ width:'100%', borderCollapse:'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor:'var(--bg-main)' }}>
                    {['Order ID','Product','Date','Amount','Status'].map(col => (
                      <th key={col} style={{ padding:'0.85rem 1.75rem', textAlign:'left', fontSize:'0.75rem', fontWeight:600, color:'var(--text-muted)', textTransform:'uppercase', letterSpacing:'0.5px' }}>
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {mockRecentOrders.map((order, i) => (
                    <tr key={order.id} className="order-row" style={{ borderTop:'1px solid var(--border-color)', cursor:'pointer', transition:'background 0.15s' }}>
                      <td style={{ padding:'1.1rem 1.75rem', fontSize:'0.88rem', fontWeight:600, color:'var(--primary-blue)' }}>{order.id}</td>
                      <td style={{ padding:'1.1rem 1.75rem', fontSize:'0.9rem', color:'var(--text-main)' }}>{order.product}</td>
                      <td style={{ padding:'1.1rem 1.75rem', fontSize:'0.85rem', color:'var(--text-muted)' }}>{order.date}</td>
                      <td style={{ padding:'1.1rem 1.75rem', fontSize:'0.9rem', fontWeight:600, color:'var(--text-main)' }}>{formatPrice(order.amount, currency)}</td>
                      <td style={{ padding:'1.1rem 1.75rem' }}>
                        <span style={{
                          display:'inline-flex', alignItems:'center', gap:'5px',
                          padding:'0.3rem 0.8rem', borderRadius:'999px', fontSize:'0.78rem', fontWeight:600,
                          backgroundColor:`${order.statusColor}18`, color:order.statusColor
                        }}>
                          <span style={{ width:'6px', height:'6px', borderRadius:'50%', backgroundColor:order.statusColor }} />
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Right Column */}
          <div style={{ display:'flex', flexDirection:'column', gap:'1.25rem' }}>

            {/* Loyalty Card */}
            <div className="dash-card" style={{
              borderRadius:'20px', padding:'1.5rem',
              background:'linear-gradient(135deg,#1E3A5F,#2563EB)',
              color:'white', position:'relative', overflow:'hidden',
              animationDelay:'0.6s'
            }}>
              <div style={{ position:'absolute', top:'-30px', right:'-30px', width:'180px', height:'180px', borderRadius:'50%', background:'rgba(255,255,255,0.05)' }} />
              <div style={{ position:'absolute', bottom:'-50px', left:'-20px', width:'150px', height:'150px', borderRadius:'50%', background:'rgba(255,255,255,0.04)' }} />
              <div style={{ position:'relative', zIndex:1 }}>
                <div className="flex items-center gap-2" style={{ marginBottom:'1.25rem' }}>
                  <Star size={18} fill="#FCD34D" stroke="#FCD34D" />
                  <span style={{ fontSize:'0.85rem', fontWeight:600, color:'#FCD34D' }}>Loyalty Rewards</span>
                </div>
                <div style={{ fontSize:'2.5rem', fontWeight:800, marginBottom:'0.25rem' }}>1,240</div>
                <div style={{ fontSize:'0.82rem', color:'rgba(255,255,255,0.65)', marginBottom:'1.5rem' }}>Points available to redeem</div>
                <div style={{ background:'rgba(255,255,255,0.1)', borderRadius:'10px', padding:'0.85rem', marginBottom:'1rem' }}>
                  <div className="flex justify-between" style={{ marginBottom:'0.5rem' }}>
                    <span style={{ fontSize:'0.78rem', color:'rgba(255,255,255,0.7)' }}>Progress to Gold</span>
                    <span style={{ fontSize:'0.78rem', color:'#FCD34D', fontWeight:600 }}>62%</span>
                  </div>
                  <div style={{ background:'rgba(255,255,255,0.15)', borderRadius:'999px', height:'6px' }}>
                    <div style={{ width:'62%', background:'linear-gradient(90deg,#FCD34D,#F59E0B)', borderRadius:'999px', height:'100%' }} />
                  </div>
                </div>
                <Link to="/browse" style={{
                  display:'flex', alignItems:'center', justifyContent:'center', gap:'6px',
                  padding:'0.75rem', borderRadius:'10px', background:'rgba(255,255,255,0.15)',
                  color:'white', fontWeight:600, fontSize:'0.88rem', textDecoration:'none',
                  border:'1px solid rgba(255,255,255,0.2)'
                }}>
                  Redeem Points <ArrowRight size={15} />
                </Link>
              </div>
            </div>

            {/* Security Card */}
            <div className="dash-card" style={{
              background:'var(--bg-surface)', borderRadius:'20px',
              border:'1px solid var(--border-color)', padding:'1.5rem',
              animationDelay:'0.68s'
            }}>
              <div className="flex items-center gap-3" style={{ marginBottom:'1rem' }}>
                <div style={{ width:'40px', height:'40px', borderRadius:'10px', background:'#F0FDF4', display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <Shield size={20} color="#10B981" />
                </div>
                <div>
                  <div style={{ fontWeight:700, fontSize:'0.95rem', color:'var(--text-main)' }}>Account Security</div>
                  <div style={{ fontSize:'0.78rem', color:'#10B981', fontWeight:500 }}>✓ All systems secure</div>
                </div>
              </div>
              {[
                { label:'Email Verified', done:true },
                { label:'2FA Enabled', done:false },
                { label:'ID Authenticated', done:true },
              ].map((item, i) => (
                <div key={i} className="flex justify-between items-center" style={{
                  padding:'0.65rem 0',
                  borderTop: i > 0 ? '1px solid var(--border-color)' : 'none'
                }}>
                  <span style={{ fontSize:'0.85rem', color:'var(--text-muted)' }}>{item.label}</span>
                  <span style={{
                    fontSize:'0.75rem', fontWeight:600, padding:'0.25rem 0.6rem', borderRadius:'999px',
                    backgroundColor: item.done ? '#F0FDF4' : '#FEF3C7',
                    color: item.done ? '#10B981' : '#D97706'
                  }}>
                    {item.done ? '✓ Done' : '! Pending'}
                  </span>
                </div>
              ))}
            </div>

            {/* AI Teaser */}
            <div className="dash-card" style={{
              background:'linear-gradient(135deg,#1A1D24,#0F172A)',
              borderRadius:'20px', padding:'1.5rem',
              border:'1px solid rgba(99,102,241,0.2)',
              animationDelay:'0.75s'
            }}>
              <div className="flex items-center gap-2" style={{ marginBottom:'0.75rem' }}>
                <Zap size={18} color="#818CF8" />
                <span style={{ fontSize:'0.85rem', fontWeight:700, color:'#818CF8', letterSpacing:'0.5px' }}>COMING SOON</span>
              </div>
              <div style={{ fontSize:'1.2rem', fontWeight:800, color:'white', marginBottom:'0.5rem' }}>OriginTech AI Advisor</div>
              <p style={{ fontSize:'0.82rem', color:'#64748B', marginBottom:'1.25rem', lineHeight:1.6 }}>
                Personalized product recommendations, smart price alerts, and trade-in predictions — powered by AI.
              </p>
              <div style={{
                padding:'0.6rem 1rem', borderRadius:'8px',
                border:'1px solid rgba(99,102,241,0.3)',
                background:'rgba(99,102,241,0.08)',
                fontSize:'0.8rem', color:'#A5B4FC', textAlign:'center', fontWeight:500
              }}>
                <Clock size={13} style={{ marginRight:'5px', verticalAlign:'middle' }} />
                Launching in Stage 2
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
