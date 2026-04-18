import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, ArrowRight, Headphones } from 'lucide-react';

const BOT_RESPONSES = {
  order:    "To track your order, go to Order History from your Dashboard, or visit the Tracking page and enter your order ID. Orders usually ship within 1-2 business days.",
  track:    "You can track your order at /tracking. Enter your Order ID (e.g. ORD-99231) to see real-time status including dispatched, out-for-delivery, and delivered steps.",
  return:   "We offer a 14-day hassle-free return policy for unopened items. Visit the Support page and submit a ticket with topic 'Returns & Refunds' to begin the process.",
  refund:   "Refunds are processed within 5-7 business days to your original payment method. If it's been longer, submit a support ticket and we'll investigate immediately.",
  tradein:  "Our Trade-In program gives you store credit for your old device. Visit the Trade-In page, complete the 3-step valuation form, and accept your offer to get credit applied instantly.",
  preorder: "You can pre-order the Origin Vision X on our Pre-Order page. Choose between a deposit (Rs. 100,000) or full payment (Rs. 950,000). Ships Dec 15, 2026.",
  price:    "All our prices are displayed in your chosen currency. You can switch between LKR, USD, GBP, and EUR using the currency selector in the top navigation bar.",
  authentic:"Every OriginTech product comes with a digital Certificate of Authenticity. Visit the Authenticity Check page and enter your serial number to verify your device.",
  payment:  "We accept Credit/Debit Cards, PayPal, and Cash on Delivery. All card payments are secured with 256-bit SSL encryption.",
  default:  "Thanks for reaching out! I can help with orders, tracking, returns, trade-ins, pre-orders, authenticity checks, and payments. What do you need help with?",
};

const getResponse = (text) => {
  const t = text.toLowerCase();
  if (t.includes('order') || t.includes('buy again')) return BOT_RESPONSES.order;
  if (t.includes('track')) return BOT_RESPONSES.track;
  if (t.includes('refund')) return BOT_RESPONSES.refund;
  if (t.includes('return')) return BOT_RESPONSES.return;
  if (t.includes('trade') || t.includes('credit')) return BOT_RESPONSES.tradein;
  if (t.includes('preorder') || t.includes('pre-order') || t.includes('vision')) return BOT_RESPONSES.preorder;
  if (t.includes('price') || t.includes('currency') || t.includes('lkr')) return BOT_RESPONSES.price;
  if (t.includes('authentic') || t.includes('genuine') || t.includes('verify')) return BOT_RESPONSES.authentic;
  if (t.includes('payment') || t.includes('card') || t.includes('paypal')) return BOT_RESPONSES.payment;
  return BOT_RESPONSES.default;
};

const ChatbotWidget = ({ forceOpen = false, onClose }) => {
  const [isOpen, setIsOpen] = useState(forceOpen);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hi! I'm the OriginTech AI Assistant.\nI can help with orders, tracking, returns, trade-ins, and more. What can I help you with?", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [escalated, setEscalated] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => { if (forceOpen) setIsOpen(true); }, [forceOpen]);
  useEffect(() => { if (isOpen) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, isOpen, isTyping]);

  const now = () => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const handleSend = (text) => {
    const msg = text || inputText;
    if (!msg.trim()) return;
    setMessages(prev => [...prev, { sender: 'user', text: msg, time: now() }]);
    setInputText('');
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { sender: 'bot', text: getResponse(msg), time: now() }]);
    }, 900 + Math.random() * 600);
  };

  const handleEscalate = () => {
    setEscalated(true);
    setMessages(prev => [...prev,
      { sender: 'user', text: 'Talk to a human agent', time: now() },
      { sender: 'bot', text: "Connecting you to a live support agent now...\n\n**Ticket created: #TKT-" + (Math.floor(10000 + Math.random() * 90000)) + "**\n\nA human agent will respond within 15 minutes. You can also visit our Support page to track your ticket.", time: now() }
    ]);
  };

  const quickReplies = ['Track my order', 'Return an item', 'Trade-In credit', 'Pre-order info'];

  const close = () => { setIsOpen(false); onClose?.(); };

  return (
    <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 1000 }}>
      {isOpen && (
        <div style={{
          width: '370px', height: '520px', display: 'flex', flexDirection: 'column',
          marginBottom: '1rem', borderRadius: '20px', overflow: 'hidden',
          boxShadow: '0 24px 60px rgba(0,0,0,0.18)', border: '1px solid var(--border-color)',
          background: 'var(--bg-surface)'
        }}>
          {/* Header */}
          <div style={{ background: 'linear-gradient(135deg,#1E3A5F,#2563EB)', color: 'white', padding: '1rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="flex items-center gap-2">
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Bot size={20} />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>OriginTech Assistant</div>
                <div style={{ fontSize: '0.72rem', color: '#93C5FD' }}>● Online · Replies instantly</div>
              </div>
            </div>
            <button onClick={close} style={{ background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '8px', padding: '0.4rem', cursor: 'pointer', color: 'white' }}>
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, padding: '1rem', overflowY: 'auto', background: 'var(--bg-main)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', flexDirection: msg.sender === 'user' ? 'row-reverse' : 'row' }}>
                  {msg.sender === 'bot' && (
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg,#2563EB,#1D4ED8)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Bot size={14} color="white" />
                    </div>
                  )}
                  <div style={{
                    background: msg.sender === 'user' ? 'linear-gradient(135deg,#2563EB,#1D4ED8)' : 'var(--bg-surface)',
                    color: msg.sender === 'user' ? 'white' : 'var(--text-main)',
                    padding: '0.7rem 0.9rem', borderRadius: '14px',
                    borderBottomRightRadius: msg.sender === 'user' ? '4px' : '14px',
                    borderBottomLeftRadius: msg.sender === 'bot' ? '4px' : '14px',
                    border: msg.sender === 'bot' ? '1px solid var(--border-color)' : 'none',
                    maxWidth: '82%', fontSize: '0.88rem', lineHeight: 1.55,
                    whiteSpace: 'pre-wrap', boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                  }}>
                    {msg.text}
                  </div>
                </div>
                {msg.time && <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '2px', paddingLeft: msg.sender === 'bot' ? '34px' : '0' }}>{msg.time}</div>}
              </div>
            ))}

            {isTyping && (
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px' }}>
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'linear-gradient(135deg,#2563EB,#1D4ED8)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Bot size={14} color="white" />
                </div>
                <div style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-color)', borderRadius: '14px', borderBottomLeftRadius: '4px', padding: '0.7rem 1rem', display: 'flex', gap: '4px', alignItems: 'center' }}>
                  {[0,1,2].map(i => <div key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--text-muted)', animation: `bounce 1.2s ${i*0.15}s infinite` }} />)}
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Replies */}
          {messages.length <= 2 && !isTyping && (
            <div style={{ padding: '0.5rem 1rem', background: 'var(--bg-main)', display: 'flex', gap: '0.4rem', flexWrap: 'wrap', borderTop: '1px solid var(--border-color)' }}>
              {quickReplies.map(q => (
                <button key={q} onClick={() => handleSend(q)} style={{ padding: '0.35rem 0.75rem', borderRadius: '999px', border: '1px solid var(--primary-blue)', background: 'transparent', color: 'var(--primary-blue)', fontSize: '0.78rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.15s' }}>
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Human Escalation */}
          {!escalated && messages.length >= 3 && (
            <div style={{ padding: '0.6rem 1rem', background: 'var(--bg-surface)', borderTop: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Need more help?</span>
              <button onClick={handleEscalate} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.78rem', fontWeight: 600, color: 'white', background: '#10B981', border: 'none', borderRadius: '8px', padding: '0.35rem 0.8rem', cursor: 'pointer' }}>
                <Headphones size={13} /> Talk to a human
              </button>
            </div>
          )}

          {/* Input */}
          <div style={{ padding: '0.75rem 1rem', borderTop: '1px solid var(--border-color)', background: 'var(--bg-surface)', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Type a message..."
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              aria-label="Chat message input"
              style={{ flex: 1, padding: '0.6rem 1rem', borderRadius: '999px', border: '1px solid var(--border-color)', outline: 'none', background: 'var(--bg-main)', color: 'var(--text-main)', fontSize: '0.88rem' }}
            />
            <button
              onClick={() => handleSend()}
              aria-label="Send message"
              style={{ width: '38px', height: '38px', borderRadius: '50%', background: 'linear-gradient(135deg,#2563EB,#1D4ED8)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, boxShadow: '0 4px 12px rgba(37,99,235,0.3)' }}
            >
              <Send size={15} color="white" />
            </button>
          </div>
          <style>{`@keyframes bounce { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-5px)} }`}</style>
        </div>
      )}

      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open chat assistant"
          style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'linear-gradient(135deg,#2563EB,#1D4ED8)', border: 'none', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 24px rgba(37,99,235,0.4)', cursor: 'pointer', transition: 'transform 0.2s', float: 'right' }}
          onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          <MessageCircle size={26} />
        </button>
      )}
    </div>
  );
};

export default ChatbotWidget;
