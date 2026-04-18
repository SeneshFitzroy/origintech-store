import React, { useState } from 'react';
import { Search, Ban, CheckCircle2, Mail, Shield, MoreVertical } from 'lucide-react';

const MOCK_USERS = [
  { id: 'USR-001', name: 'John Doe',    email: 'john@example.com',   joined: 'Jan 10, 2026', orders: 3,  status: 'Active',    role: 'Customer' },
  { id: 'USR-002', name: 'Sarah Lin',   email: 'sarah@example.com',  joined: 'Feb 3, 2026',  orders: 7,  status: 'Active',    role: 'Customer' },
  { id: 'USR-003', name: 'Mike Torres', email: 'mike@example.com',   joined: 'Feb 28, 2026', orders: 1,  status: 'Suspended', role: 'Customer' },
  { id: 'USR-004', name: 'Alice Kim',   email: 'alice@example.com',  joined: 'Mar 5, 2026',  orders: 12, status: 'Active',    role: 'Customer' },
  { id: 'USR-005', name: 'Dev Patel',   email: 'dev@example.com',    joined: 'Mar 20, 2026', orders: 0,  status: 'Active',    role: 'Customer' },
  { id: 'USR-006', name: 'Agent Sarah', email: 'sagent@origin.com',  joined: 'Jan 1, 2026',  orders: 0,  status: 'Active',    role: 'Agent' },
];

const AdminUsers = () => {
  const [users, setUsers] = useState(MOCK_USERS);
  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState('All');

  const toggleStatus = (id) => {
    setUsers(prev => prev.map(u => u.id === id
      ? { ...u, status: u.status === 'Active' ? 'Suspended' : 'Active' }
      : u));
  };

  const filtered = users.filter(u => {
    const matchRole = filterRole === 'All' || u.role === filterRole;
    const q = search.toLowerCase();
    const matchSearch = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
    return matchRole && matchSearch;
  });

  return (
    <div>
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>User Management</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '2px' }}>{users.length} registered users</p>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem', marginBottom: '1.75rem' }}>
        {[
          { label: 'Total Users', value: users.length, color: '#004AC6', bg: '#e6f0ff' },
          { label: 'Active', value: users.filter(u => u.status === 'Active').length, color: '#10B981', bg: '#F0FDF4' },
          { label: 'Suspended', value: users.filter(u => u.status === 'Suspended').length, color: '#EF4444', bg: '#FEF2F2' },
          { label: 'Agents', value: users.filter(u => u.role === 'Agent').length, color: '#8B5CF6', bg: '#F5F3FF' },
        ].map((s, i) => (
          <div key={i} className="card" style={{ padding: '1.25rem' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.5rem' }}>{s.label}</div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: s.color }}>{s.value}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-3 items-center" style={{ marginBottom: '1.25rem' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={15} style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input type="text" placeholder="Search by name or email..." value={search} onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', padding: '0.65rem 1rem 0.65rem 2.4rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', background: 'var(--bg-surface)', color: 'var(--text-main)', fontSize: '0.9rem', outline: 'none' }} />
        </div>
        {['All', 'Customer', 'Agent'].map(r => (
          <button key={r} onClick={() => setFilterRole(r)} style={{ padding: '0.45rem 1rem', borderRadius: '999px', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', background: filterRole === r ? 'var(--primary-blue)' : 'var(--bg-surface)', color: filterRole === r ? 'white' : 'var(--text-muted)', border: filterRole === r ? 'none' : '1px solid var(--border-color)' }}>
            {r}
          </button>
        ))}
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--bg-soft)', borderBottom: '1px solid var(--border-color)' }}>
              {['User', 'Role', 'Joined', 'Orders', 'Status', 'Actions'].map(h => (
                <th key={h} style={{ padding: '0.85rem 1.25rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(u => (
              <tr key={u.id} style={{ borderBottom: '1px solid var(--border-color)' }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-soft)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                <td style={{ padding: '1rem 1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg,#6366F1,#8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ color: 'white', fontWeight: 700, fontSize: '0.85rem' }}>{u.name[0]}</span>
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{u.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{u.email}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '1rem 1.25rem' }}>
                  <span style={{ padding: '3px 10px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700, background: u.role === 'Agent' ? '#F5F3FF' : '#f0f5ff', color: u.role === 'Agent' ? '#7C3AED' : '#003a9d' }}>
                    {u.role}
                  </span>
                </td>
                <td style={{ padding: '1rem 1.25rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{u.joined}</td>
                <td style={{ padding: '1rem 1.25rem', fontWeight: 700, fontSize: '0.9rem', textAlign: 'center' }}>{u.orders}</td>
                <td style={{ padding: '1rem 1.25rem' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 8px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700, background: u.status === 'Active' ? '#D1FAE5' : '#FEE2E2', color: u.status === 'Active' ? '#065F46' : '#991B1B' }}>
                    <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: u.status === 'Active' ? '#10B981' : '#EF4444' }} />
                    {u.status}
                  </span>
                </td>
                <td style={{ padding: '1rem 1.25rem' }}>
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    <button title="Email user" style={{ padding: '0.4rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-surface)', cursor: 'pointer', color: 'var(--primary-blue)' }}>
                      <Mail size={14} />
                    </button>
                    <button onClick={() => toggleStatus(u.id)} title={u.status === 'Active' ? 'Suspend' : 'Activate'}
                      style={{ padding: '0.4rem', borderRadius: '8px', border: u.status === 'Active' ? '1px solid #FECACA' : '1px solid #BBF7D0', background: u.status === 'Active' ? '#FEF2F2' : '#F0FDF4', cursor: 'pointer', color: u.status === 'Active' ? '#EF4444' : '#10B981' }}>
                      {u.status === 'Active' ? <Ban size={14} /> : <CheckCircle2 size={14} />}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;
