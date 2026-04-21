import React, { createContext, useState, useEffect, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Theme State (Light, Dark, System)
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'system');
  
  // Language State
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'EN');
  
  // Currency State
  const [currency, setCurrency] = useState(() => localStorage.getItem('currency') || 'LKR');

  // Auth/User State
  const [user, setUser] = useState(null); // null = guest

  // Cart State
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Trade-In Credit
  const [tradeInCredit, setTradeInCredit] = useState(() => {
    return Number(localStorage.getItem('tradeInCredit') || 0);
  });

  // Wishlist State
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  // Order History (persisted)
  const [orderHistory, setOrderHistory] = useState(() => {
    const saved = localStorage.getItem('orderHistory');
    return saved ? JSON.parse(saved) : [];
  });

  // Derived Theme Calculation
  useEffect(() => {
    const root = document.documentElement;
    localStorage.setItem('theme', theme);
    
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
    } else if (theme === 'light') {
      root.removeAttribute('data-theme');
    } else {
      // System
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        root.setAttribute('data-theme', 'dark');
      } else {
        root.removeAttribute('data-theme');
      }
    }
  }, [theme]);

  // Persist settings
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('currency', currency);
  }, [currency]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('tradeInCredit', tradeInCredit);
  }, [tradeInCredit]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
  }, [orderHistory]);

  const addBundleToCart = (bundle, resolvedProducts) => {
    const bundleId = `${bundle.id}-${Date.now()}`;
    const newItems = resolvedProducts.map(product => ({
      ...product,
      cartId: `${product.id}-${bundleId}`,
      selectedColor: product.colors?.[0] || null,
      selectedStorage: product.storage?.[0] || null,
      quantity: 1,
      isBundleItem: true,
      bundleId,
      bundleName: bundle.name,
      bundleDiscountPct: bundle.discountPct,
    }));
    setCart(prev => [...prev, ...newItems]);
  };

  const value = {
    theme, setTheme,
    language, setLanguage,
    currency, setCurrency,
    user, setUser,
    cart, setCart,
    tradeInCredit, setTradeInCredit,
    wishlist, setWishlist,
    orderHistory, setOrderHistory,
    addBundleToCart,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
