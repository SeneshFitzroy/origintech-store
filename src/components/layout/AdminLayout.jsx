import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Package, ShieldCheck, ShoppingBag,
  Users, Tag, RefreshCw, Headphones, BarChart2, LogOut, ChevronRight, Store, Menu, X
} from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { Navigate } from 'react-router-dom';

const navItems = [
  { to: '/admin',              label: 'Overview',        icon: LayoutDashboard, end: true },
  { to: '/admin/products',     label: 'Products',        icon: Package },
  { to: '/admin/orders',       label: 'Orders',          icon: ShoppingBag },
  { to: '/admin/users',        label: 'Users',           icon: Users },
  { to: '/admin/certificates', label: 'Certificates',    icon: ShieldCheck },
  { to: '/admin/promotions',   label: 'Promotions',      icon: Tag },
  { to: '/admin/trade-in',     label: 'Trade-In',        icon: RefreshCw },
  { to: '/admin/tickets',      label: 'Support Tickets', icon: Headphones },
  { to: '/admin/analytics',    label: 'Analytics',       icon: BarChart2 },
];

const AdminLayout = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAppContext();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Route protection
  if (!user || user.role !== 'admin') {
    return <Navigate to="/admin/login" replace />;
  }

  const handleSignOut = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--bg-main)' }}>
      <style>{`
        .admin-nav-link { display:flex; align-items:center; gap:10px; padding:0.65rem 1rem; border-radius:10px; text-decoration:none; font-size:0.9rem; font-weight:500; color:rgba(255,255,255,0.65); transition:all 0.2s; }
        .admin-nav-link:hover { background:rgba(255,255,255,0.1); color:white; }
        .admin-nav-link.active { background:rgba(255,255,255,0.15); color:white; font-weight:700; }
        .admin-nav-link.active svg { opacity:1; }
      `}</style>

      {/* Sidebar Overlay (Mobile Only) */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          className="mobile-only"
          style={{ position: 'fixed', inset: 0, zIndex: 100, backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(2px)' }} 
        />
      )}

      {/* Sidebar */}
      <aside style={{
        width: '240px', flexShrink: 0,
        background: 'linear-gradient(180deg,#001028 0%,#002566 100%)',
        display: 'flex', flexDirection: 'column',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        position: 'fixed', top: 0, left: 0, height: '100vh', 
        overflowY: 'auto', zIndex: 101,
        transition: 'transform 0.3s ease-out',
        transform: `translateX(${isSidebarOpen ? '0' : '-100%'})`,
      }} className="admin-sidebar">
        <style>{`
          @media (min-width: 1025px) {
            .admin-sidebar { position: sticky !important; transform: none !important; }
            .admin-main { margin-left: 0; }
          }
        `}</style>
        {/* Logo */}
        <div style={{ padding: '1.5rem 1.25rem', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="flex-column">
            <div className="flex items-center gap-2" style={{ marginBottom: '0.25rem' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(135deg,#004AC6,#003a9d)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Store size={18} color="white" />
              </div>
              <span style={{ color: 'white', fontWeight: 800, fontSize: '1.05rem' }}>OriginTech</span>
            </div>
            <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.5px', textTransform: 'uppercase', paddingLeft: '2px' }}>Admin Portal</div>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="mobile-only" style={{ color: 'white' }}>
            <X size={20} />
          </button>
        </div>

        {/* Nav */}
        <nav style={{ padding: '1rem 0.75rem', flex: 1 }}>
          <div style={{ fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.8px', color: 'rgba(255,255,255,0.3)', padding: '0 0.5rem', marginBottom: '0.5rem' }}>Main Menu</div>
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `admin-nav-link${isActive ? ' active' : ''}`}
              onClick={() => setIsSidebarOpen(false)}
            >
              <item.icon size={17} style={{ opacity: 0.7, flexShrink: 0 }} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* User Footer */}
        <div style={{ padding: '1rem 1.25rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex items-center gap-2" style={{ marginBottom: '0.75rem' }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: '#004AC6', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ color: 'white', fontWeight: 700, fontSize: '0.85rem' }}>A</span>
            </div>
            <div>
              <div style={{ color: 'white', fontSize: '0.85rem', fontWeight: 600 }}>{user.name}</div>
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.72rem' }}>{user.level || 'Super Admin'}</div>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '8px', padding: '0.55rem 0.75rem', borderRadius: '8px', background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.25)', color: '#FCA5A5', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600 }}
          >
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh', overflow: 'auto' }}>
        {/* Top Bar */}
        <div style={{ padding: '1rem 2rem', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-surface)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 10 }}>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="mobile-only"
              style={{ padding: '0.25rem', color: 'var(--text-main)' }}
            >
              <Menu size={20} />
            </button>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }} className="desktop-only">
              OriginTech &nbsp;/&nbsp; <span style={{ color: 'var(--text-main)', fontWeight: 500 }}>Admin</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" target="_blank" style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.82rem', color: 'var(--primary-blue)', fontWeight: 600, textDecoration: 'none' }}>
              <Store size={14} /> View Store
            </a>
          </div>
        </div>
        <div style={{ padding: '2rem', flex: 1 }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
