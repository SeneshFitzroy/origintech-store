import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Send, ArrowLeft, CheckCircle2, AlertCircle, ArrowUpCircle,
  User, Bot, Clock, Tag, Phone, Mail, Package
} from 'lucide-react';

const TICKETS = {
  'TKT-99234': {
    id: 'TKT-99234', subject: 'Device not authenticating',
    customer: { name: 'John Doe', email: 'john@example.com', phone: '+94 77 123 4567', orders: 3 },
    priority: 'High', sla: '2 hrs remaining', created: 'Apr 15, 2026 · 9:00 AM', status: 'Open',
    messages: [
      { sender: 'customer', name: 'John Doe',    text: "Hi, I bought an Origin Pro Max yesterday but when I try to verify it on the Authenticity Check page it says 'Serial not found'. My serial is OT-2026-PRO-00999. Please help!", time: '9:01 AM' },
      { sender: 'agent',    name: 'Agent Sarah', text: "Hello John! I'm sorry to hear that. Let me look into this right away. Could you confirm whether the serial number is printed on the box or inside the device settings?", time: '9:14 AM' },
      { sender: 'customer', name: 'John Doe',    text: "It's printed on the box. The sticker shows OT-2026-PRO-00999.", time: '9:16 AM' },
    ],
  },
  'TKT-99235': {
    id: 'TKT-99235', subject: 'Lost package refund request',
    customer: { name: 'Alice Kim', email: 'alice@example.com', phone: '+94 71 987 6543', orders: 7 },
    priority: 'High', sla: '3 hrs remaining', created: 'Apr 14, 2026 · 2:30 PM', status: 'In Progress',
    messages: [
      { sender: 'customer', name: 'Alice Kim',   text: "My order ORD-88421 was marked as delivered 3 days ago but I never received it. The tracking shows it was left at the door but nothing is there.", time: '2:31 PM' },
      { sender: 'agent',    name: 'Agent Sarah', text: "Hi Alice, I completely understand your concern. I've flagged this as a priority case and contacted the courier. They'll conduct an investigation within 24–48 hours. In the meantime, I'll submit a replacement order for you. Is that alright?", time: '2:45 PM' },
    ],
  },
};

const PRIORITY_CFG = {
  High:   { bg: '#FEE2E2', text: '#991B1B', dot: '#EF4444' },
  Medium: { bg: '#FEF3C7', text: '#92400E', dot: '#F59E0B' },
  Low:    { bg: '#e6f0ff', text: '#003a9d', dot: '#004AC6' },
};

const QUICK_REPLIES = [
  "I've flagged this as a priority case and will respond within 30 minutes.",
  "Could you please provide your order number so I can look into this?",
  "I've escalated this to our technical team. You'll hear back within 24 hours.",
  "I'm happy to process a full refund for you. It'll appear within 5–7 business days.",
];

const AgentTicketDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const ticket = TICKETS[id] || TICKETS['TKT-99234'];

  const [messages, setMessages] = useState(ticket.messages);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState(ticket.status);
  const [showEscalate, setShowEscalate] = useState(false);
  const [escalated, setEscalated] = useState(false);
  const [resolved, setResolved] = useState(false);
  const messagesEndRef = useRef(null);

  const now = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (text) => {
    const msg = text || input;
    if (!msg.trim()) return;
    setMessages(prev => [...prev, { sender: 'agent', name: 'Agent Sarah', text: msg, time: now() }]);
    setInput('');
  };

  const handleResolve = () => {
    setResolved(true);
    setStatus('Resolved');
    setMessages(prev => [...prev, {
      sender: 'system', text: `✓ Ticket marked as Resolved by Agent Sarah at ${now()}`, time: now()
    }]);
  };

  const handleEscalate = () => {
    setEscalated(true);
    setShowEscalate(false);
    setStatus('Escalated');
    setMessages(prev => [...prev, {
      sender: 'system', text: `⚠ Ticket escalated to Level 3 Support by Agent Sarah at ${now()}. Customer will be notified.`, time: now()
    }]);
  };

  const pcfg = PRIORITY_CFG[ticket.priority] || PRIORITY_CFG.Medium;

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <button onClick={() => navigate('/agent')} style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '0.5rem 0.9rem', border: '1px solid var(--border-color)', borderRadius: '10px', background: 'var(--bg-surface)', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>
          <ArrowLeft size={15} /> Back
        </button>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)' }}>{ticket.subject}</h1>
            <code style={{ fontSize: '0.8rem', color: 'var(--text-muted)', background: 'var(--bg-soft)', padding: '2px 8px', borderRadius: '6px' }}>{ticket.id}</code>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '3px 8px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700, background: pcfg.bg, color: pcfg.text }}>
              <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: pcfg.dot }} />
              {ticket.priority} Priority
            </span>
            <span style={{ padding: '3px 8px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 700, background: status === 'Resolved' ? '#D1FAE5' : status === 'Escalated' ? '#FEE2E2' : '#b3d1ff', color: status === 'Resolved' ? '#065F46' : status === 'Escalated' ? '#991B1B' : '#003a9d' }}>
              {status}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '4px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={12} /> {ticket.created}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#EF4444', fontWeight: 600 }}><AlertCircle size={12} /> SLA: {ticket.sla}</span>
          </div>
        </div>

        {/* Action Buttons */}
        {!resolved && !escalated && (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={() => setShowEscalate(true)} style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '0.55rem 1rem', borderRadius: '10px', border: '1px solid #FECACA', background: '#FEF2F2', color: '#DC2626', cursor: 'pointer', fontWeight: 600, fontSize: '0.85rem' }}>
              <ArrowUpCircle size={15} /> Escalate
            </button>
            <button onClick={handleResolve} style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '0.55rem 1rem', borderRadius: '10px', border: 'none', background: '#10B981', color: 'white', cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem' }}>
              <CheckCircle2 size={15} /> Mark Resolved
            </button>
          </div>
        )}
        {(resolved || escalated) && (
          <div style={{ padding: '0.5rem 1rem', borderRadius: '10px', background: resolved ? '#D1FAE5' : '#FEF2F2', color: resolved ? '#065F46' : '#DC2626', fontWeight: 700, fontSize: '0.85rem' }}>
            {resolved ? '✓ Resolved' : '⚠ Escalated'}
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '1.5rem', alignItems: 'flex-start' }}>

        {/* Chat Panel */}
        <div className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '620px' }}>
          {/* Chat Header */}
          <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-soft)', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg,#6366F1,#8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ color: 'white', fontWeight: 700, fontSize: '0.85rem' }}>{ticket.customer.name[0]}</span>
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{ticket.customer.name}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{ticket.customer.email}</div>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, padding: '1.25rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem', background: 'var(--bg-main)' }}>
            {messages.map((msg, idx) => {
              if (msg.sender === 'system') {
                return (
                  <div key={idx} style={{ textAlign: 'center', padding: '0.4rem 1rem', fontSize: '0.78rem', color: 'var(--text-muted)', background: 'var(--bg-soft)', borderRadius: '999px', border: '1px solid var(--border-color)', alignSelf: 'center' }}>
                    {msg.text}
                  </div>
                );
              }
              const isAgent = msg.sender === 'agent';
              return (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: isAgent ? 'flex-end' : 'flex-start' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', flexDirection: isAgent ? 'row-reverse' : 'row' }}>
                    <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: isAgent ? 'linear-gradient(135deg,#10B981,#059669)' : 'linear-gradient(135deg,#6366F1,#8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ color: 'white', fontWeight: 700, fontSize: '0.75rem' }}>{msg.name[0]}</span>
                    </div>
                    <div style={{
                      background: isAgent ? 'linear-gradient(135deg,#10B981,#059669)' : 'var(--bg-surface)',
                      color: isAgent ? 'white' : 'var(--text-main)',
                      padding: '0.75rem 1rem', borderRadius: '14px',
                      borderBottomRightRadius: isAgent ? '4px' : '14px',
                      borderBottomLeftRadius: isAgent ? '14px' : '4px',
                      border: isAgent ? 'none' : '1px solid var(--border-color)',
                      maxWidth: '75%', fontSize: '0.88rem', lineHeight: 1.6,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                    }}>
                      {msg.text}
                    </div>
                  </div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '3px', paddingLeft: isAgent ? '0' : '38px', paddingRight: isAgent ? '38px' : '0' }}>
                    {msg.name} · {msg.time}
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {!resolved && !escalated && (
            <div style={{ padding: '0.6rem 1rem', borderTop: '1px solid var(--border-color)', background: 'var(--bg-surface)', display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {QUICK_REPLIES.map((qr, i) => (
                <button key={i} onClick={() => sendMessage(qr)} style={{ padding: '0.3rem 0.6rem', borderRadius: '999px', border: '1px solid var(--border-color)', background: 'var(--bg-main)', color: 'var(--text-muted)', fontSize: '0.72rem', cursor: 'pointer', transition: 'all 0.15s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary-blue)'; e.currentTarget.style.color = 'var(--primary-blue)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.color = 'var(--text-muted)'; }}>
                  {qr.slice(0, 38)}…
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{ padding: '0.85rem 1rem', borderTop: '1px solid var(--border-color)', background: 'var(--bg-surface)', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <input
              type="text"
              placeholder={resolved || escalated ? 'Ticket is closed.' : 'Type your reply...'}
              disabled={resolved || escalated}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              style={{ flex: 1, padding: '0.65rem 1rem', borderRadius: '999px', border: '1px solid var(--border-color)', outline: 'none', background: resolved || escalated ? 'var(--bg-soft)' : 'var(--bg-main)', color: 'var(--text-main)', fontSize: '0.88rem', cursor: resolved || escalated ? 'not-allowed' : 'text' }}
            />
            <button
              onClick={() => sendMessage()}
              disabled={resolved || escalated || !input.trim()}
              aria-label="Send reply"
              style={{ width: '40px', height: '40px', borderRadius: '50%', background: resolved || escalated ? 'var(--bg-soft)' : 'linear-gradient(135deg,#10B981,#059669)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: resolved || escalated ? 'not-allowed' : 'pointer', boxShadow: !resolved && !escalated ? '0 4px 12px rgba(16,185,129,0.35)' : 'none' }}
            >
              <Send size={16} color="white" />
            </button>
          </div>
        </div>

        {/* Customer Info Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Customer */}
          <div className="card" style={{ padding: '1.25rem' }}>
            <h4 style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)', marginBottom: '1rem' }}>Customer Info</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg,#6366F1,#8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ color: 'white', fontWeight: 700 }}>{ticket.customer.name[0]}</span>
              </div>
              <div>
                <div style={{ fontWeight: 700 }}>{ticket.customer.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{ticket.customer.orders} previous orders</div>
              </div>
            </div>
            {[
              { icon: Mail,  label: ticket.customer.email },
              { icon: Phone, label: ticket.customer.phone },
              { icon: Package, label: `${ticket.customer.orders} orders` },
            ].map((row, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.6rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <row.icon size={14} style={{ flexShrink: 0 }} />
                {row.label}
              </div>
            ))}
          </div>

          {/* Ticket Details */}
          <div className="card" style={{ padding: '1.25rem' }}>
            <h4 style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)', marginBottom: '1rem' }}>Ticket Details</h4>
            {[
              { label: 'ID', value: ticket.id },
              { label: 'Status', value: status },
              { label: 'Priority', value: ticket.priority },
              { label: 'SLA', value: ticket.sla },
              { label: 'Created', value: ticket.created },
              { label: 'Assigned', value: 'Agent Sarah' },
            ].map(row => (
              <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0', borderBottom: '1px solid var(--border-color)', fontSize: '0.82rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>{row.label}</span>
                <span style={{ fontWeight: 600, color: 'var(--text-main)', maxWidth: '140px', textAlign: 'right' }}>{row.value}</span>
              </div>
            ))}
          </div>

          {/* Internal Note */}
          <div className="card" style={{ padding: '1.25rem' }}>
            <h4 style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>Internal Note</h4>
            <textarea rows={3} placeholder="Add private agent note..." style={{ width: '100%', padding: '0.65rem', border: '1px solid var(--border-color)', borderRadius: '10px', background: 'var(--bg-main)', color: 'var(--text-main)', fontSize: '0.82rem', resize: 'vertical', outline: 'none' }} />
            <button style={{ marginTop: '0.5rem', width: '100%', padding: '0.55rem', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-surface)', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              Save Note
            </button>
          </div>
        </div>
      </div>

      {/* Escalate Modal */}
      {showEscalate && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999 }}>
          <div className="card" style={{ width: '420px', padding: '2rem', borderRadius: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
              <ArrowUpCircle size={24} color="#EF4444" />
              <h2 style={{ fontSize: '1.15rem', fontWeight: 700 }}>Escalate Ticket</h2>
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.25rem', lineHeight: 1.6 }}>
              This will escalate <strong>{ticket.id}</strong> to Level 3 Support. The customer will be notified and an urgent flag will be set.
            </p>
            <div style={{ marginBottom: '1.25rem' }}>
              <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-muted)' }}>Reason for escalation</label>
              <textarea rows={3} style={{ width: '100%', padding: '0.65rem', border: '1px solid var(--border-color)', borderRadius: '10px', background: 'var(--bg-main)', color: 'var(--text-main)', fontSize: '0.88rem', resize: 'none', outline: 'none' }} placeholder="Describe why this needs Level 3 support..." />
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button onClick={() => setShowEscalate(false)} style={{ flex: 1, padding: '0.85rem', border: '1px solid var(--border-color)', borderRadius: '10px', background: 'transparent', cursor: 'pointer', fontWeight: 600 }}>Cancel</button>
              <button onClick={handleEscalate} style={{ flex: 2, padding: '0.85rem', borderRadius: '10px', border: 'none', background: '#EF4444', color: 'white', cursor: 'pointer', fontWeight: 700, fontSize: '0.9rem' }}>
                Confirm Escalation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentTicketDetail;
