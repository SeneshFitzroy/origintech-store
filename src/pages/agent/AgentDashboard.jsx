import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, Clock, CheckCircle2, MessageSquare, Search, Filter } from 'lucide-react';

const MOCK_TICKETS = [
  { id: 'TKT-99234', subject: 'Device not authenticating', customer: 'John Doe', priority: 'High', sla: '2 hrs', status: 'Open' },
  { id: 'TKT-99235', subject: 'Lost package', customer: 'Alice Kim', priority: 'High', sla: '3 hrs', status: 'In Progress' },
  { id: 'TKT-99236', subject: 'Trade-in valuation question', customer: 'Mike T.', priority: 'Medium', sla: '12 hrs', status: 'Open' },
  { id: 'TKT-99237', subject: 'Refund delay', customer: 'Sarah Lin', priority: 'Low', sla: '24 hrs', status: 'Open' },
  { id: 'TKT-88122', subject: 'Battery overheating issue', customer: 'David W.', priority: 'High', sla: '45 mins', status: 'Open' },
  { id: 'TKT-88123', subject: 'Screen flickering on laptop', customer: 'Emma S.', priority: 'Medium', sla: '5 hrs', status: 'In Progress' },
];

const AgentDashboard = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filteredTickets = MOCK_TICKETS.filter(t => {
    const matchSearch = t.id.toLowerCase().includes(search.toLowerCase()) || 
                       t.subject.toLowerCase().includes(search.toLowerCase()) ||
                       t.customer.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' || t.status === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div className="flex justify-between items-center" style={{ marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)' }}>Support Queue</h1>
          <p style={{ color: 'var(--text-muted)' }}>Manage incoming customer support requests</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button 
            onClick={() => setFilter('All')}
            style={{ 
              padding: '0.6rem 1.25rem', 
              background: filter === 'All' ? 'var(--primary-blue)' : 'var(--bg-surface)', 
              color: filter === 'All' ? 'white' : 'var(--text-main)',
              border: '1px solid var(--border-color)', 
              borderRadius: 'var(--radius-md)', 
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            All Tickets
          </button>
          <button 
            onClick={() => setFilter('In Progress')}
            style={{ 
              padding: '0.6rem 1.25rem', 
              background: filter === 'In Progress' ? 'var(--primary-blue)' : 'var(--bg-surface)', 
              color: filter === 'In Progress' ? 'white' : 'var(--text-main)',
              border: '1px solid var(--border-color)', 
              borderRadius: 'var(--radius-md)', 
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Assigned to me
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
        {[
          { label: 'My Open Tickets', value: '12', icon: MessageSquare, color: 'var(--primary-blue)', bg: 'rgba(0,74,198, 0.1)' },
          { label: 'Urgent / SLA Risk', value: '3', icon: AlertCircle, color: '#EF4444', bg: 'rgba(239, 68, 68, 0.1)' },
          { label: 'Avg Response Time', value: '14m', icon: Clock, color: '#10B981', bg: 'rgba(16, 185, 129, 0.1)' },
          { label: 'Resolved Today', value: '28', icon: CheckCircle2, color: '#10B981', bg: 'rgba(16, 185, 129, 0.1)' },
        ].map((stat, i) => (
          <div key={i} className="card" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div className="flex justify-between items-center">
              <div style={{ color: 'var(--text-muted)', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{stat.label}</div>
              <div style={{ padding: '0.5rem', backgroundColor: stat.bg, color: stat.color, borderRadius: '10px' }}>
                <stat.icon size={20} />
              </div>
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)' }}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Filter & Search Bar */}
      <div className="card" style={{ padding: '1.25rem', marginBottom: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Search tickets, customers, or subjects..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '0.75rem 1rem 0.75rem 3rem', 
              borderRadius: '12px', 
              border: '1px solid var(--border-color)', 
              background: 'var(--bg-main)', 
              color: 'var(--text-main)',
              fontSize: '0.95rem',
              outline: 'none'
            }}
          />
        </div>
        <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0.75rem 1.25rem', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-surface)', color: 'var(--text-main)', fontWeight: 600, cursor: 'pointer' }}>
          <Filter size={18} />
          Filters
        </button>
      </div>

      {/* Ticket Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: 'var(--bg-soft)', borderBottom: '1px solid var(--border-color)' }}>
            <tr style={{ color: 'var(--text-muted)' }}>
              <th style={{ padding: '1.25rem 1.5rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Ticket ID</th>
              <th style={{ padding: '1.25rem 1.5rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Customer & Subject</th>
              <th style={{ padding: '1.25rem 1.5rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>Priority</th>
              <th style={{ padding: '1.25rem 1.5rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>SLA Status</th>
              <th style={{ padding: '1.25rem 1.5rem', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', textAlign: 'right' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredTickets.map(t => (
              <tr key={t.id} className="order-row" style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.2s' }}>
                <td style={{ padding: '1.25rem 1.5rem' }}>
                  <div style={{ fontWeight: 700, color: 'var(--primary-blue)', fontFamily: 'monospace', fontSize: '1rem' }}>{t.id}</div>
                </td>
                <td style={{ padding: '1.25rem 1.5rem' }}>
                  <div style={{ fontWeight: 600, color: 'var(--text-main)', fontSize: '0.95rem' }}>{t.subject}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>{t.customer}</div>
                </td>
                <td style={{ padding: '1.25rem 1.5rem' }}>
                  <span style={{ 
                    padding: '0.4rem 0.75rem', 
                    backgroundColor: t.priority === 'High' ? 'rgba(239, 68, 68, 0.1)' : t.priority === 'Medium' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(100, 116, 139, 0.1)', 
                    color: t.priority === 'High' ? '#EF4444' : t.priority === 'Medium' ? '#D97706' : 'var(--text-muted)', 
                    borderRadius: '999px', 
                    fontSize: '0.75rem', 
                    fontWeight: 700,
                    textTransform: 'uppercase'
                  }}>
                    {t.priority}
                  </span>
                </td>
                <td style={{ padding: '1.25rem 1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: t.priority === 'High' ? '#EF4444' : 'var(--text-main)', fontWeight: 600, fontSize: '0.9rem' }}>
                    <Clock size={16} />
                    {t.sla}
                  </div>
                </td>
                <td style={{ padding: '1.25rem 1.5rem', textAlign: 'right' }}>
                  <button 
                    onClick={() => navigate(`/agent/ticket/${t.id}`)}
                    className="btn-primary" 
                    style={{ padding: '0.6rem 1.25rem', fontSize: '0.85rem', fontWeight: 700, borderRadius: '10px' }}
                  >
                    Open Chat
                  </button>
                </td>
              </tr>
            ))}
            {filteredTickets.length === 0 && (
              <tr>
                <td colSpan="5" style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                  <Search size={48} style={{ margin: '0 auto 1rem', opacity: 0.2 }} />
                  <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>No tickets found matching your search.</div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AgentDashboard;
