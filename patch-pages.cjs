/**
 * Professional polish — adds premium page headers & consistent theme to all pages
 */
const fs = require('fs');
const path = require('path');

const base = path.join(__dirname, 'src', 'pages', 'customer');

function patchFile(filename, patches) {
  const fp = path.join(base, filename);
  let src = fs.readFileSync(fp, 'utf8');
  for (const p of patches) {
    if (p.find) {
      const idx = src.indexOf(p.find);
      if (idx === -1) { console.warn(`  SKIP: "${p.find.slice(0,50)}…" not found in ${filename}`); continue; }
      src = src.replace(p.find, p.replace);
      console.log(`  ✓ Replaced in ${filename}`);
    }
  }
  fs.writeFileSync(fp, src, 'utf8');
  console.log(`✓ ${filename} saved`);
}

// ═══════════════════════════════════════════
// 1. Browse.jsx — Add premium page header
// ═══════════════════════════════════════════
console.log('\n─── Browse.jsx ───');
patchFile('Browse.jsx', [
  // Add Filter icon import (already has it), add Laptop import
  {
    find: `import { Search, Filter, Heart, ShieldCheck, Star, SlidersHorizontal, X } from 'lucide-react';`,
    replace: `import { Search, Filter, Heart, ShieldCheck, Star, SlidersHorizontal, X, Smartphone, Laptop, Monitor } from 'lucide-react';`
  },
  // Replace simple page header with premium banner
  {
    find: `    <div style={{ backgroundColor: 'var(--bg-main)', minHeight: '100vh' }}>`,
    replace: `    <div style={{ backgroundColor: 'var(--bg-main)', minHeight: '100vh' }}>

      {/* Premium Page Header */}
      <div className="page-header">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: '1.25rem' }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(59,130,246,.1)', border: '1px solid rgba(59,130,246,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Smartphone size={18} style={{ color: '#60A5FA' }}/>
            </div>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(59,130,246,.1)', border: '1px solid rgba(59,130,246,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Laptop size={18} style={{ color: '#60A5FA' }}/>
            </div>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(59,130,246,.1)', border: '1px solid rgba(59,130,246,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Monitor size={18} style={{ color: '#60A5FA' }}/>
            </div>
          </div>
          <h1>Browse Products</h1>
          <p>Discover verified smartphones, laptops, and accessories with authenticity guaranteed</p>
        </div>
      </div>`
  },
  // Remove the old plain header
  {
    find: `        {/* Page header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: 'clamp(1.8rem,5vw,2.5rem)', fontWeight: 800, marginBottom: '.5rem' }}>
            {CATEGORIES.find(c => c.key === selectedCategory)?.label || 'All Products'}
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '.95rem' }}>
            {filteredProducts.length} {t.results || 'result'}{filteredProducts.length !== 1 ? 's' : ''} found
          </p>
        </div>`,
    replace: `        {/* Results count */}
        <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '.25rem' }}>
              {CATEGORIES.find(c => c.key === selectedCategory)?.label || 'All Products'}
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '.88rem' }}>
              {filteredProducts.length} {t.results || 'result'}{filteredProducts.length !== 1 ? 's' : ''} found
            </p>
          </div>
        </div>`
  }
]);

// ═══════════════════════════════════════════
// 2. Cart.jsx — Add premium page header
// ═══════════════════════════════════════════
console.log('\n─── Cart.jsx ───');
patchFile('Cart.jsx', [
  // Add ShoppingCart import
  {
    find: `import { Trash2, ArrowRight, ShoppingBag, Tag, CheckCircle, ChevronRight, Shield } from 'lucide-react';`,
    replace: `import { Trash2, ArrowRight, ShoppingBag, ShoppingCart, Tag, CheckCircle, ChevronRight, Shield } from 'lucide-react';`
  },
  // Replace the Cart header with a premium banner
  {
    find: `        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '.25rem' }}>Shopping Cart</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '.9rem' }}>{cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart</p>
          </div>
          <Link to="/browse" style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--primary-blue)', fontWeight: 600, fontSize: '.9rem', textDecoration: 'none' }}>
            ← Continue Shopping
          </Link>
        </div>`,
    replace: `        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 48, height: 48, borderRadius: 14, background: 'var(--color-info-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShoppingCart size={22} style={{ color: 'var(--primary-blue)' }}/>
            </div>
            <div>
              <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '.15rem' }}>Shopping Cart</h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '.88rem' }}>{cart.length} {cart.length === 1 ? 'item' : 'items'} in your cart</p>
            </div>
          </div>
          <Link to="/browse" style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--primary-blue)', fontWeight: 600, fontSize: '.9rem', textDecoration: 'none', padding: '.55rem 1.15rem', borderRadius: 10, border: '1px solid var(--primary-blue)', transition: 'all .2s' }}
            onMouseOver={e=>{e.currentTarget.style.background='var(--primary-blue)';e.currentTarget.style.color='#fff';}}
            onMouseOut={e=>{e.currentTarget.style.background='';e.currentTarget.style.color='var(--primary-blue)';}}
          >
            ← Continue Shopping
          </Link>
        </div>`
  }
]);

// ═══════════════════════════════════════════
// 3. Orders.jsx — Add premium page header
// ═══════════════════════════════════════════
console.log('\n─── Orders.jsx ───');
patchFile('Orders.jsx', [
  {
    find: `    <div style={{ backgroundColor: 'var(--bg-main)', minHeight: '100vh', padding: '3rem 1rem' }}>`,
    replace: `    <div style={{ backgroundColor: 'var(--bg-main)', minHeight: '100vh' }}>

      {/* Premium Page Header */}
      <div className="page-header">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="ph-icon"><Package size={24}/></div>
          <h1>Order History</h1>
          <p>Track, manage, and reorder from your complete purchase history</p>
        </div>
      </div>

      <div style={{ padding: '0 1rem 3rem' }}>`
  },
  // Replace old header
  {
    find: `        {/* Header */}
        <div className="flex justify-between items-end" style={{ marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--text-main)' }}>Order History</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              {filteredOrders.length} order{filteredOrders.length !== 1 ? 's' : ''} found
            </p>
          </div>`,
    replace: `        {/* Search Bar */}
        <div className="flex justify-between items-end" style={{ marginBottom: '2rem' }}>
          <div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              {filteredOrders.length} order{filteredOrders.length !== 1 ? 's' : ''} found
            </p>
          </div>`
  }
]);

// ═══════════════════════════════════════════
// 4. Wishlist.jsx — Add premium page header
// ═══════════════════════════════════════════
console.log('\n─── Wishlist.jsx ───');
patchFile('Wishlist.jsx', [
  {
    find: `    <div style={{ backgroundColor: 'var(--bg-main)', minHeight: '100vh' }}>`,
    replace: `    <div style={{ backgroundColor: 'var(--bg-main)', minHeight: '100vh' }}>

      {/* Premium Page Header */}
      <div className="page-header">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="ph-icon"><BookmarkCheck size={24}/></div>
          <h1>My Wishlist</h1>
          <p>Your curated collection of saved products, ready when you are</p>
        </div>
      </div>`
  },
  // Replace old header
  {
    find: `        {/* Header */}
        <div style={{ marginBottom: '2.5rem' }}>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '0.4rem' }}>My Wishlist</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved for later
          </p>
        </div>`,
    replace: `        {/* Item count */}
        <div style={{ marginBottom: '1.5rem' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
            {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved for later
          </p>
        </div>`
  }
]);

// ═══════════════════════════════════════════
// 5. TradeIn.jsx — Add premium page header
// ═══════════════════════════════════════════
console.log('\n─── TradeIn.jsx ───');
patchFile('TradeIn.jsx', [
  {
    find: `    <div style={{ backgroundColor: 'var(--bg-main)', minHeight: '100vh', padding: '4rem 1rem' }}>
      <div className="container" style={{ maxWidth: '820px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg,#3B82F6,#1D4ED8)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
            <RefreshCw size={28} color="white" />
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text-main)' }}>Device Trade-In</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>Turn your old device into credit towards your next OriginTech purchase.</p>`,
    replace: `    <div style={{ backgroundColor: 'var(--bg-main)', minHeight: '100vh' }}>

      {/* Premium Page Header */}
      <div className="page-header">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="ph-icon"><RefreshCw size={24}/></div>
          <h1>Device Trade-In</h1>
          <p>Turn your old device into credit towards your next OriginTech purchase</p>`
  },
  // Close the new header and re-open the container
  {
    find: `          {tradeInCredit > 0 && (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginTop: '1rem', padding: '0.5rem 1.25rem', background: '#F0FDF4', border: '1px solid #86EFAC', borderRadius: '999px', color: '#16A34A', fontWeight: 700, fontSize: '0.9rem' }}>
              <CheckCircle size={16} /> You have {formatPrice(tradeInCredit, currency)} store credit available
            </div>
          )}
        </div>

        <div className="card" style={{ padding: '2.5rem' }}>`,
    replace: `          {tradeInCredit > 0 && (
            <div className="ph-badge">
              <CheckCircle size={14} /> You have {formatPrice(tradeInCredit, currency)} store credit available
            </div>
          )}
        </div>
      </div>

      <div style={{ padding: '0 1rem 4rem' }}>
      <div className="container" style={{ maxWidth: '820px' }}>
        <div className="card" style={{ padding: '2.5rem' }}>`
  }
]);

// ═══════════════════════════════════════════
// 6. Support.jsx — Update gradient to match
// ═══════════════════════════════════════════
console.log('\n─── Support.jsx ───');
patchFile('Support.jsx', [
  {
    find: `      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg,#0A1128,#163A62)', padding: '4rem 1rem', textAlign: 'center' }}>
        <div className="container">
          <LifeBuoy size={40} color="#60A5FA" style={{ margin: '0 auto 1rem' }} />
          <h1 style={{ fontSize: '2.8rem', fontWeight: 800, color: 'white', marginBottom: '0.75rem' }}>Help & Support</h1>
          <p style={{ color: '#94A3B8', fontSize: '1.05rem', maxWidth: '520px', margin: '0 auto' }}>
            We're here to help. Find answers fast or reach a real person in minutes.
          </p>
        </div>
      </div>`,
    replace: `      {/* Premium Page Header */}
      <div className="page-header" style={{ padding: '4rem 1rem' }}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="ph-icon"><LifeBuoy size={24}/></div>
          <h1>Help & Support</h1>
          <p>We're here to help. Find answers fast or reach a real person in minutes.</p>
        </div>
      </div>`
  }
]);

// ═══════════════════════════════════════════
// 7. Auth.jsx — Update gradient to match hero theme
// ═══════════════════════════════════════════
console.log('\n─── Auth.jsx ───');
patchFile('Auth.jsx', [
  {
    find: `flex: '0 0 45%', background: 'linear-gradient(145deg, #0A1628 0%, #0F2040 50%, #1a3557 100%)',`,
    replace: `flex: '0 0 45%', background: 'linear-gradient(160deg, #04101E 0%, #0B1D36 35%, #0F2847 65%, #132F52 100%)',`
  }
]);

// ═══════════════════════════════════════════
// 8. Dashboard.jsx — Update gradient to match hero theme
// ═══════════════════════════════════════════
console.log('\n─── Dashboard.jsx ───');
patchFile('Dashboard.jsx', [
  {
    find: `background: 'linear-gradient(135deg, #0A1128 0%, #163A62 60%, #1E4D8C 100%)',`,
    replace: `background: 'linear-gradient(160deg, #04101E 0%, #0B1D36 35%, #0F2847 65%, #132F52 100%)',`
  }
]);

// ═══════════════════════════════════════════
// 9. Profile.jsx — Update gradient to match hero theme
// ═══════════════════════════════════════════
console.log('\n─── Profile.jsx ───');
patchFile('Profile.jsx', [
  {
    find: `background: 'linear-gradient(135deg,var(--premium-navy),#0F2040,#1a3557)',`,
    replace: `background: 'linear-gradient(160deg, #04101E 0%, #0B1D36 35%, #0F2847 65%, #132F52 100%)',`
  }
]);

// ═══════════════════════════════════════════
// 10. ProductDetail.jsx — Add breadcrumb polish
// ═══════════════════════════════════════════
console.log('\n─── ProductDetail.jsx ───');

// Read ProductDetail to find the return statement
const pdFile = path.join(base, 'ProductDetail.jsx');
let pdSrc = fs.readFileSync(pdFile, 'utf8');

// Add a subtle top bar with breadcrumbs
const pdOld = `  return (
    <div style={{ backgroundColor: 'var(--bg-main)', minHeight: '100vh' }}>`;
const pdNew = `  return (
    <div style={{ backgroundColor: 'var(--bg-main)', minHeight: '100vh' }}>

      {/* Breadcrumb Bar */}
      <div style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-color)', padding: '.8rem 1rem' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '.85rem', color: 'var(--text-muted)' }}>
          <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
          <span style={{ color: 'var(--border-color)' }}>›</span>
          <Link to="/browse" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Products</Link>
          <span style={{ color: 'var(--border-color)' }}>›</span>
          <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{product.name}</span>
        </div>
      </div>`;

if (pdSrc.includes(pdOld)) {
  pdSrc = pdSrc.replace(pdOld, pdNew);
  fs.writeFileSync(pdFile, pdSrc, 'utf8');
  console.log('  ✓ Breadcrumb added');
  console.log('✓ ProductDetail.jsx saved');
} else {
  console.warn('  SKIP: ProductDetail return not found');
}

// ═══════════════════════════════════════════
// 11. Checkout.jsx — Add step progress polish
// ═══════════════════════════════════════════
console.log('\n─── Checkout.jsx ───');

const coFile = path.join(base, 'Checkout.jsx');
let coSrc = fs.readFileSync(coFile, 'utf8');

// Find and update the checkout page wrapper to add a subtle header
const coOld = `  return (
    <div style={{ backgroundColor: 'var(--bg-main)', minHeight: '100vh' }}>`;
const coNew = `  return (
    <div style={{ backgroundColor: 'var(--bg-main)', minHeight: '100vh' }}>

      {/* Secure Checkout Header */}
      <div style={{ background: 'var(--bg-surface)', borderBottom: '1px solid var(--border-color)', padding: '1rem' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Tag size={18} style={{ color: 'var(--primary-blue)' }}/>
            <span style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-main)' }}>Secure Checkout</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '.82rem', color: 'var(--color-success)' }}>
            <Check size={14}/> SSL Encrypted
          </div>
        </div>
      </div>`;

if (coSrc.includes(coOld)) {
  coSrc = coSrc.replace(coOld, coNew);
  fs.writeFileSync(coFile, coSrc, 'utf8');
  console.log('  ✓ Secure checkout header added');
  console.log('✓ Checkout.jsx saved');
} else {
  console.warn('  SKIP: Checkout return not found');
}

// ═══════════════════════════════════════════
// 12. AuthenticityCheck.jsx — Add page header
// ═══════════════════════════════════════════
console.log('\n─── AuthenticityCheck.jsx ───');
const acFile = path.join(base, 'AuthenticityCheck.jsx');
let acSrc = fs.readFileSync(acFile, 'utf8');

// Read for the return pattern
const acReturnMatch = acSrc.match(/return\s*\(\s*\n?\s*<div style=\{\{ backgroundColor: 'var\(--bg-main\)'/);
if (acReturnMatch) {
  const acOld = `<div style={{ backgroundColor: 'var(--bg-main)', minHeight: '100vh'`;
  // Find the specific return
  const idx = acSrc.indexOf(acOld);
  if (idx > -1) {
    // Find the closing of the opening div style
    const endOfLine = acSrc.indexOf('}}>',idx) + 3;
    const original = acSrc.substring(idx, endOfLine);
    const replacement = `<div style={{ backgroundColor: 'var(--bg-main)', minHeight: '100vh' }}>

      {/* Premium Page Header */}
      <div className="page-header">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="ph-icon"><ShieldCheck size={24}/></div>
          <h1>Authenticity Check</h1>
          <p>Verify your product's authenticity with our blockchain-backed certificate system</p>
        </div>
      </div>

      <div style={{ padding: '0 1rem 3rem' }}>`;
    acSrc = acSrc.substring(0, idx) + replacement + acSrc.substring(endOfLine);
    fs.writeFileSync(acFile, acSrc, 'utf8');
    console.log('  ✓ Page header added');
    console.log('✓ AuthenticityCheck.jsx saved');
  }
} else {
  console.warn('  SKIP: return pattern not found');
}

// ═══════════════════════════════════════════
// 13. Tracking.jsx — Add page header  
// ═══════════════════════════════════════════
console.log('\n─── Tracking.jsx ───');
const trFile = path.join(base, 'Tracking.jsx');
let trSrc = fs.readFileSync(trFile, 'utf8');

const trOld = `<div style={{ backgroundColor: 'var(--bg-main)', minHeight: '100vh'`;
const trIdx = trSrc.indexOf(trOld);
if (trIdx > -1) {
  const trEnd = trSrc.indexOf('}}>',trIdx) + 3;
  const trOriginal = trSrc.substring(trIdx, trEnd);
  const trRep = `<div style={{ backgroundColor: 'var(--bg-main)', minHeight: '100vh' }}>

      {/* Premium Page Header */}
      <div className="page-header">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div className="ph-icon"><Truck size={24}/></div>
          <h1>Order Tracking</h1>
          <p>Real-time updates on your order's journey to your doorstep</p>
        </div>
      </div>

      <div style={{ padding: '0 1rem 3rem' }}>`;
  trSrc = trSrc.substring(0, trIdx) + trRep + trSrc.substring(trEnd);
  fs.writeFileSync(trFile, trSrc, 'utf8');
  console.log('  ✓ Page header added');
  console.log('✓ Tracking.jsx saved');
}

console.log('\n═══ All patches applied ═══');
