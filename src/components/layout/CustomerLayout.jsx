import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import ChatbotWidget from '../common/ChatbotWidget';
import AccessibilityWidget from '../common/AccessibilityWidget';

const CustomerLayout = () => {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="customer-layout flex" style={{ flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--bg-main)' }}>
      <Navbar />
      <main style={{ flex: 1, position: 'relative' }}>
        {/* Pass openChat down via Outlet context */}
        <Outlet context={{ openChat: () => setChatOpen(true) }} />
      </main>
      <Footer />
      <ChatbotWidget forceOpen={chatOpen} onClose={() => setChatOpen(false)} />
      <AccessibilityWidget />
    </div>
  );
};

export default CustomerLayout;
