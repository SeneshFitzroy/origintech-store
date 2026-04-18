import React, { useState, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import { LifeBuoy, MapPin, Mail, Phone, MessageCircle, Search, ChevronDown, ChevronUp, CheckCircle, AlertCircle } from 'lucide-react';

const mockTickets = {
  'TKT-99238': { status: 'In Progress', topic: 'Order Tracking/Issue', lastUpdate: 'Apr 15, 2026 09:45 AM', agent: 'Agent Sarah' },
  'TKT-99100': { status: 'Resolved',    topic: 'Returns & Refunds',    lastUpdate: 'Apr 10, 2026 02:30 PM', agent: 'Agent Mike' },
  'TKT-88500': { status: 'Open',        topic: 'Technical Support',    lastUpdate: 'Apr 14, 2026 11:00 AM', agent: 'Unassigned' },
};

const TICKET_STATUS_COLOURS = {
  Open:        { bg: '#b3d1ff', text: '#003a9d' },
  'In Progress':{ bg: '#FEF3C7', text: '#92400E' },
  Resolved:    { bg: '#D1FAE5', text: '#065F46' },
};

const FAQs = [
  { q: 'How long does delivery take?', a: `Standard delivery takes 1–3 business days depending on your location. You'll receive a tracking link once your order is dispatched.` },
  { q: 'What is your return policy?', a: `We offer a 14-day hassle-free return policy for unopened items in original packaging. Submit a ticket with topic "Returns & Refunds" to start the process.` },
  { q: 'How does the Trade-In program work?', a: `Complete the 3-step online valuation on our Trade-In page, send your device using the prepaid kit, and receive store credit applied to your next purchase.` },
  { q: 'Are all products authentic?', a: `Yes. Every OriginTech product comes with a digital Certificate of Authenticity. Visit the Authenticity Check page and enter your serial number to verify.` },
  { q: 'Can I cancel or modify my order?', a: `Orders can be modified or cancelled within 30 minutes of placement. After that, please contact support and we'll do our best to assist before dispatch.` },
  { q: 'How do I apply a coupon code?', a: `Enter your coupon code in the dedicated field on the Cart page or during Checkout Step 3. Valid codes: ORIGIN10 (10%), SAVE15 (15%), WELCOME20 (20%).` },
];

const Support = () => {
  const { openChat } = useOutletContext() || {};
  const [ticketSent, setTicketSent] = useState(false);
  const [submittedTicketId, setSubmittedTicketId] = useState('');
  const [trackInput, setTrackInput] = useState('');
  const [trackedTicket, setTrackedTicket] = useState(null);
  const [trackError, setTrackError] = useState('');
  const [openFaq, setOpenFaq] = useState(null);
  const formRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = `TKT-${Math.floor(10000 + Math.random() * 90000)}`;
    setSubmittedTicketId(id);
    setTicketSent(true);
  };

  const handleTrackTicket = () => {
    const key = trackInput.trim().toUpperCase();
    if (!key) return setTrackError('Please enter a ticket ID.');
    const found = mockTickets[key];
    if (found) {
      setTrackedTicket({ id: key, ...found });
      setTrackError('');
    } else {
      setTrackedTicket(null);
      setTrackError(`Ticket "${key}" not found. Try TKT-99238, TKT-99100, or TKT-88500.`);
    }
  };

  const inputStyle = {
    width: '100%', padding: '0.75rem 1rem',
    borderRadius: 'var(--radius-md)',
    border: '1px solid var(--border-color)',
    background: 'var(--bg-main)',
    color: 'var(--text-main)',
    fontSize: '0.95rem', outline: 'none'
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-main)', minHeight: '100vh' }}>

      {/* Premium Page Header */}
      <div className="page-header" style={{ padding: '4rem 1rem' }}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="ph-icon"><LifeBuoy size={24}/></div>
          <h1>Help & Support</h1>
          <p>We're here to help. Find answers fast or reach a real person in minutes.</p>
        </div>
      </div>

      <div className="container" style={{ padding: '3rem 1rem 5rem' }}>

        {/* Contact Options */}
        <div className="grid support-cards-grid" style={{ gridTemplateColumns: 'repeat(3,1fr)', gap: '1.5rem', marginBottom: '4rem' }}>
          {[
            {
              icon: <MessageCircle size={32} color="#004AC6" />, bg: '#e6f0ff', title: 'Live Chat',
              desc: 'Available 24/7 via OriginTech AI, or connect with a specialist.',
              btn: 'Start Chat', btnAction: () => openChat?.(),
              btnStyle: { background: '#004AC6', color: 'white' }
            },
            {
              icon: <Phone size={32} color="#10B981" />, bg: '#F0FDF4', title: 'Call Us',
              desc: '+94 11 234 5678 · Mon–Fri: 9AM–6PM',
              btn: 'Copy Number', btnAction: () => navigator.clipboard.writeText('+94112345678'),
              btnStyle: { background: '#F0FDF4', color: '#10B981', border: '1px solid #86EFAC' }
            },
            {
              icon: <MapPin size={32} color="#F59E0B" />, bg: '#FFFBEB', title: 'Service Center',
              desc: '123 Tech Avenue, Colombo 00100\nMon–Sat: 9AM–5PM',
              btn: 'Get Directions', btnAction: () => window.open('https://maps.google.com', '_blank'),
              btnStyle: { background: '#FFFBEB', color: '#D97706', border: '1px solid #FCD34D' }
            },
          ].map((c, i) => (
            <div key={i} className="card" style={{ padding: '2rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                {c.icon}
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-main)' }}>{c.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.5rem', textAlign: 'center', whiteSpace: 'pre-line', flex: 1 }}>{c.desc}</p>
              <button onClick={c.btnAction} style={{ ...c.btnStyle, border: c.btnStyle.border || 'none', padding: '0.65rem 1.5rem', borderRadius: 'var(--radius-md)', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', width: '100%' }}>
                {c.btn}
              </button>
            </div>
          ))}
        </div>

        {/* Ticket Tracker + Submit Form */}
        <div className="grid support-main-grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '3rem', marginBottom: '4rem', alignItems: 'flex-start' }}>

          {/* Left: Submit Ticket */}
          <div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '1.5rem', color: 'var(--text-main)' }}>Submit a Ticket</h2>
            {ticketSent ? (
              <div style={{ padding: '2rem', borderRadius: 'var(--radius-lg)', textAlign: 'center', background: '#F0FDF4', border: '1px solid #86EFAC' }}>
                <CheckCircle size={48} color="#10B981" style={{ margin: '0 auto 1rem' }} />
                <h3 style={{ color: '#10B981', fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>Ticket Submitted!</h3>
                <p style={{ marginBottom: '0.75rem', color: 'var(--text-main)' }}>
                  Your ticket ID is <strong style={{ fontFamily: 'monospace', background: '#DCFCE7', padding: '2px 8px', borderRadius: '6px' }}>{submittedTicketId}</strong>
                </p>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>We'll respond within 24 hours. Use your ticket ID to track progress below.</p>
                <button className="btn-primary" onClick={() => { setTicketSent(false); setSubmittedTicketId(''); }}>Submit another ticket</button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label htmlFor="support-topic" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.88rem', fontWeight: 500 }}>Topic</label>
                  <select id="support-topic" required style={{ ...inputStyle, background: 'var(--bg-surface)' }}>
                    <option value="">Select a topic...</option>
                    <option value="order">Order Tracking/Issue</option>
                    <option value="return">Returns & Refunds</option>
                    <option value="tech">Technical Support</option>
                    <option value="tradein">Trade-In Query</option>
                    <option value="other">Other Inquiry</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="support-name" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.88rem', fontWeight: 500 }}>Full Name</label>
                  <input id="support-name" type="text" required style={inputStyle} placeholder="John Doe" />
                </div>
                <div>
                  <label htmlFor="support-email" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.88rem', fontWeight: 500 }}>Email</label>
                  <input id="support-email" type="email" required style={inputStyle} placeholder="john@email.com" />
                </div>
                <div>
                  <label htmlFor="support-message" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.88rem', fontWeight: 500 }}>Message</label>
                  <textarea id="support-message" required rows={5} style={{ ...inputStyle, resize: 'vertical' }} placeholder="Describe your issue in detail..." />
                </div>
                <div>
                  <label htmlFor="support-file" style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.88rem', fontWeight: 500 }}>Attachment (Optional)</label>
                  <input id="support-file" type="file" style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }} />
                </div>
                <button type="submit" className="btn-primary" style={{ padding: '1rem', fontSize: '1rem', fontWeight: 600 }}>Submit Ticket</button>
              </form>
            )}
          </div>

          {/* Right: Ticket Tracker + FAQ */}
          <div>
            {/* Ticket Tracker */}
            <div className="card" style={{ padding: '1.75rem', marginBottom: '2rem' }}>
              <div className="flex items-center gap-2" style={{ marginBottom: '1rem' }}>
                <Search size={18} color="var(--primary-blue)" />
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-main)' }}>Track Your Ticket</h3>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>Enter your ticket ID to check its current status.</p>
              <div className="flex gap-2" style={{ marginBottom: '0.75rem' }}>
                <input
                  type="text"
                  placeholder="e.g. TKT-99238"
                  value={trackInput}
                  onChange={e => { setTrackInput(e.target.value); setTrackError(''); setTrackedTicket(null); }}
                  onKeyDown={e => e.key === 'Enter' && handleTrackTicket()}
                  style={{ ...inputStyle, flex: 1, padding: '0.65rem 0.9rem', fontSize: '0.9rem' }}
                />
                <button onClick={handleTrackTicket} className="btn-primary" style={{ padding: '0.65rem 1.1rem', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>
                  Check
                </button>
              </div>
              {trackError && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#EF4444', fontSize: '0.82rem' }}>
                  <AlertCircle size={14} /> {trackError}
                </div>
              )}
              {trackedTicket && (
                <div style={{ padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', background: 'var(--bg-soft)', marginTop: '0.5rem' }}>
                  <div className="flex justify-between items-center" style={{ marginBottom: '0.5rem' }}>
                    <span style={{ fontWeight: 700, fontFamily: 'monospace', fontSize: '0.95rem' }}>{trackedTicket.id}</span>
                    <span style={{ padding: '0.2rem 0.7rem', borderRadius: '999px', fontSize: '0.78rem', fontWeight: 700, ...TICKET_STATUS_COLOURS[trackedTicket.status] }}>
                      {trackedTicket.status}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    <div>Topic: <strong>{trackedTicket.topic}</strong></div>
                    <div>Assigned: <strong>{trackedTicket.agent}</strong></div>
                    <div>Last update: {trackedTicket.lastUpdate}</div>
                  </div>
                </div>
              )}
            </div>

            {/* FAQ */}
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-main)' }}>Frequently Asked Questions</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {FAQs.map((faq, i) => (
                <div key={i} style={{ border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', overflow: 'hidden', background: 'var(--bg-surface)' }}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    style={{ width: '100%', padding: '1rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-main)', textAlign: 'left', fontWeight: 600, fontSize: '0.92rem' }}
                  >
                    {faq.q}
                    {openFaq === i ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                  {openFaq === i && (
                    <div style={{ padding: '0 1.25rem 1rem', fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.65 }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
