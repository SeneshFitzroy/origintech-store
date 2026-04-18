import React, { useState, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import SplashScreen from './components/common/SplashScreen';

// Layouts
import CustomerLayout from './components/layout/CustomerLayout';
import AdminLayout from './components/layout/AdminLayout';
import AgentLayout from './components/layout/AgentLayout';

// Pages - Customer View
import Home from './pages/customer/Home';
import Browse from './pages/customer/Browse';
import ProductDetail from './pages/customer/ProductDetail';
import Cart from './pages/customer/Cart';
import Checkout from './pages/customer/Checkout';
import Auth from './pages/customer/Auth';
import Dashboard from './pages/customer/Dashboard';
import Profile from './pages/customer/Profile';
import Confirmation from './pages/customer/Confirmation';
import Support from './pages/customer/Support';
import AuthenticityCheck from './pages/customer/AuthenticityCheck';
import TradeIn from './pages/customer/TradeIn';
import PreOrder from './pages/customer/PreOrder';
import Tracking from './pages/customer/Tracking';
import Orders from './pages/customer/Orders';
import Wishlist from './pages/customer/Wishlist';
import PaymentFailed from './pages/customer/PaymentFailed';

// Pages - Admin
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminUsers from './pages/admin/AdminUsers';
import AdminCertificates from './pages/admin/AdminCertificates';
import AdminPromotions from './pages/admin/AdminPromotions';
import AdminTradeIn from './pages/admin/AdminTradeIn';
import AdminTickets from './pages/admin/AdminTickets';
import AdminAnalytics from './pages/admin/AdminAnalytics';
import AdminLogin from './pages/admin/AdminLogin';

// Pages - Support Agent
import AgentDashboard from './pages/agent/AgentDashboard';
import AgentTicketDetail from './pages/agent/AgentTicketDetail';
import AgentLogin from './pages/agent/AgentLogin';

function App() {
  const [showSplash, setShowSplash] = useState(() => !sessionStorage.getItem('splash-shown'));
  const onSplashComplete = useCallback(() => {
    setShowSplash(false);
    sessionStorage.setItem('splash-shown', '1');
  }, []);

  return (
    <AppProvider>
      {showSplash && <SplashScreen onComplete={onSplashComplete} />}
      <BrowserRouter>
        <Routes>
          {/* Customer Routes */}
          <Route path="/" element={<CustomerLayout />}>
            <Route index element={<Home />} />
            <Route path="browse" element={<Browse />} />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="login" element={<Auth />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="confirmation" element={<Confirmation />} />
            <Route path="support" element={<Support />} />
            <Route path="authenticity" element={<AuthenticityCheck />} />
            <Route path="trade-in" element={<TradeIn />} />
            <Route path="pre-order" element={<PreOrder />} />
            <Route path="tracking" element={<Tracking />} />
            <Route path="orders" element={<Orders />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="payment-failed" element={<PaymentFailed />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="certificates" element={<AdminCertificates />} />
            <Route path="promotions" element={<AdminPromotions />} />
            <Route path="trade-in" element={<AdminTradeIn />} />
            <Route path="tickets" element={<AdminTickets />} />
            <Route path="analytics" element={<AdminAnalytics />} />
          </Route>

          {/* Support Agent Routes */}
          <Route path="/agent/login" element={<AgentLogin />} />
          <Route path="/agent" element={<AgentLayout />}>
            <Route index element={<AgentDashboard />} />
            <Route path="ticket/:id" element={<AgentTicketDetail />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
