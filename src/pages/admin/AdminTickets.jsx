import React, { useState } from 'react';
import { Search, UserCheck, AlertCircle, CheckCircle2, User } from 'lucide-react';

const MOCK_TICKETS = [
  { id: 'TKT-99238', subject: 'Device not authenticating', customer: 'John Doe',    priority: 'High',   status: 'Open',        agent: 'Agent Sarah', created: 'Apr 15, 2026' },
  { id: 'TKT-99237', subject: 'Lost package refund request', customer: 'Alice Kim', priority: 'High',   status: 'In Progress', agent: 'Agent Sarah', created: 'Apr 14, 2026' },
  { id: 'TKT-99236', subject: 'Trade-in valuation dispute',  customer: 'Mike T.',   priority: 'Medium', status: 'Open',        agent: 'Unassigned',  created: 'Apr 13, 2026' },
  { id: 'TKT-99235', subject: 'Pre-order deposit refund',    customer: 'Dev P.',    priority: 'Low',    status: 'Resolved',    agent: 'Agent Mike',  created: 'Apr 12, 2026' },
  { id: 'TKT-99234', subject: 'Coupon code not working',     customer: 'Sarah Lin', priority: 'Low',    status: 'Resolved',    agent: 'Agent Mike',  created: 'Apr 11, 2026' },
];

const PRIORITY_CFG = {
  High:   { bg: '#FEE2E2', text: '#991B1B', dot: '#EF4444' },
  Medium: { bg: '#FEF3C7', text: '#92400E', dot: '#F59E0B' },
  Low:    { bg: '#f0f5ff', text: '#003a9d', dot: '#004AC6' },
};
const STATUS_CFG = {
  Open:        { bg: '#e6f0ff', text: '#003a9d' },
  'In Progress':{ bg: '#FEF3C7', text: '#92400E' },
  Resolved:    { bg: '#D1FAE5', text: '#065F46' },
};
const AGENTS = ['Agent Sarah', 'Agent Mike', 'Agent Alex', 'Unassigned'];

const AdminTickets = () => {
  const [tickets, setTickets] = useState(MOCK_TICKETS);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filtered = tickets.filter(t => {
    const matchStatus = filter === 'All' || t.status === filter;
    const q = search.toLowerCase();
    const matchSearch = !q || t.id.toLowerCase().includes(q) || t.subject.toLowerCase().includes(q) || t.customer.toLowerCase().includes(q);
    return matchStatus && matchSearch;
  });

  const assignAgent = (id, agent) => setTickets(prev => prev.map(t => t.id === id ? { ...t, agent } : t));
  const resolve = (id) => setTickets(prev => prev.map(t => t.id === id ? { ...t, status: 'Resolved' } : t));

  return (
    <div>
      <div style={{ marginBottom: '1.75rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>Support Ticket Management</h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '2px' }}>Assign agents and track all support tickets</p>
      </div>

      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '1rem', marginBottom: '1.75rem' }}>
        {[
          { label: 'Total Tickets', value: tickets.length, color: '#004AC6' },
          { label: 'Open', value: tickets.filter(t => t.status === 'Open').length, color: '#F59E0B' },
          { label: 'In Progress', value: tickets.filter(t => t.status === 'In Progress').length, color: '#8B5CF6' },
          { label: 'Resolved', value: tickets.filter(t => t.status === 'Resolved').length, color: '#10B981' },
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
          <input type="text" placeholder="Search ticket ID, subject, or customer..." value={search} onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', padding: '0.65rem 1rem 0.65rem 2.4rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', background: 'var(--bg-surface)', color: 'var(--text-main)', fontSize: '0.9rem', outline: 'none' }} />
        </div>
        {['All', 'Open', 'In Progress', 'Resolved'].map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ padding: '0.4rem 0.85rem', borderRadius: '999px', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', background: filter === f ? 'var(--primary-blue)' : 'var(--bg-surface)', color: filter === f ? 'white' : 'var(--text-muted)', border: filter === f ? 'none' : '1px solid var(--border-color)', whiteSpace: 'nowrap' }}>
            {f}
          </button>
        ))}
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--bg-soft)', borderBottom: '1px solid var(--border-color)' }}>
              {['Ticket', 'Customer', 'Priority', 'Status', 'Assigned To', 'Actions'].map(h => (
                <th key={h} style={{ padding: '0.85rem 1.25rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(t => {
              const pcfg = PRIORITY_CFG[t.priority];
              const scfg = STATUS_CFG[t.status] || STATUS_CFG.Open;
              return (
                <tr key={t.id} style={{ borderBottom: '1px solid var(--border-color)' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-soft)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <div style={{ fontWeight: 700, color: 'var(--primary-blue)', fontSize: '0.85rem', marginBottom: '2px' }}>{t.id}</div>
                    <div style={{ fontSize: '0.88rem', color: 'var(--text-main)', maxWidth: '200px' }}>{t.subject}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>{t.created}</div>
                  </td>
                  <td style={{ padding: '1rem 1.25rem', fontSize: '0.88rem', fontWeight: 600 }}>{t.customer}</td>
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 8px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700, background: pcfg.bg, color: pcfg.text }}>
                      <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: pcfg.dot }} />
                      {t.priority}
                    </span>
                  </td>
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <span style={{ padding: '3px 8px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700, background: scfg.bg, color: scfg.text }}>
                      {t.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <select value={t.agent} onChange={e => assignAgent(t.id, e.target.value)}
                      style={{ padding: '0.4rem 0.75rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-surface)', color: 'var(--text-main)', fontSize: '0.82rem', cursor: 'pointer', outline: 'none' }}>
                      {AGENTS.map(a => <option key={a} value={a}>{a}</option>)}
                    </select>
                  </td>
                  <td style={{ padding: '1rem 1.25rem' }}>
                    {t.status !== 'Resolved' && (
                      <button onClick={() => resolve(t.id)} style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '0.4rem 0.8rem', borderRadius: '8px', background: '#F0FDF4', border: '1px solid #BBF7D0', color: '#16A34A', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}>
                        <CheckCircle2 size={13} /> Resolve
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTickets;
