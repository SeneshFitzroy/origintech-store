import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { ShieldCheck, Eye, EyeOff, ArrowRight, CheckCircle, Lock, Mail, User } from 'lucide-react';

const inputBase = {
  width: '100%', padding: '.85rem 1rem .85rem 2.75rem',
  borderRadius: 10, border: '1.5px solid var(--border-color)',
  background: 'var(--bg-main)', color: 'var(--text-main)',
  fontSize: '.95rem', outline: 'none', transition: 'border-color .2s, box-shadow .2s',
  boxSizing: 'border-box',
};

const FEATURES = [
  { icon: '🔐', text: 'Blockchain-verified authenticity' },
  { icon: '🔄', text: 'Highest trade-in values in Sri Lanka' },
  { icon: '🛡️', text: '12-month premium warranty on all products' },
  { icon: '🚀', text: 'Free next-day delivery island-wide' },
];

const Auth = () => {
  const [activeTab, setActiveTab] = useState('login');
  const { setUser } = useAppContext();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get('redirect') || '/dashboard';
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);

  // Form fields
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPw, setLoginPw] = useState('');
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPw, setRegPw] = useState('');
  const [regTerms, setRegTerms] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setUser({ name: 'John Doe', email: loginEmail || 'john@example.com', role: 'customer' });
      setLoading(false);
      navigate(redirect);
    }, 900);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setUser({ name: regName || 'New User', email: regEmail || 'user@example.com', role: 'customer' });
      setLoading(false);
      navigate('/dashboard');
    }, 900);
  };

  const handleForgot = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setForgotSent(true); }, 1000);
  };

  const pwStrength = (pw) => {
    if (!pw) return 0;
    let s = 0;
    if (pw.length >= 8) s++;
    if (/[A-Z]/.test(pw)) s++;
    if (/[0-9]/.test(pw)) s++;
    if (/[^A-Za-z0-9]/.test(pw)) s++;
    return s;
  };

  const strength = pwStrength(regPw);
  const strengthLabel = ['', 'Weak', 'Fair', 'Good', 'Strong'][strength];
  const strengthColor = ['', '#EF4444', '#F59E0B', '#3B82F6', '#10B981'][strength];

  const InputWrapper = ({ icon: Icon, children }) => (
    <div style={{ position: 'relative' }}>
      <Icon size={16} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }}/>
      {children}
    </div>
  );

  const Field = ({ label, children }) => (
    <div style={{ marginBottom: '1rem' }}>
      <label style={{ display: 'block', marginBottom: '.45rem', fontSize: '.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>{label}</label>
      {children}
    </div>
  );

  const focusIn = e => { e.target.style.borderColor = 'var(--primary-blue)'; e.target.style.boxShadow = '0 0 0 3px rgba(37,99,235,0.12)'; };
  const focusOut = e => { e.target.style.borderColor = 'var(--border-color)'; e.target.style.boxShadow = 'none'; };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', backgroundColor: 'var(--bg-main)' }}>

      {/* Left branding panel */}
      <div style={{
        flex: '0 0 45%', background: 'linear-gradient(145deg, #0A1628 0%, #0F2040 50%, #1a3557 100%)',
        padding: '4rem 3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* decorative orbs */}
        <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: 300, height: 300, borderRadius: '50%', background: 'rgba(37,99,235,0.15)', pointerEvents: 'none' }}/>
        <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: 240, height: 240, borderRadius: '50%', background: 'rgba(124,58,237,0.1)', pointerEvents: 'none' }}/>

        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: '3.5rem', textDecoration: 'none' }}>
          <div style={{ width: 42, height: 42, borderRadius: 12, background: 'var(--primary-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShieldCheck size={22} color="#fff"/>
          </div>
          <span style={{ color: '#fff', fontWeight: 800, fontSize: '1.5rem', letterSpacing: '-.02em' }}>OriginTech</span>
        </Link>

        <h2 style={{ color: '#fff', fontSize: '2.2rem', fontWeight: 800, lineHeight: 1.25, marginBottom: '1rem', letterSpacing: '-.02em' }}>
          The future of<br/><span style={{ color: '#60A5FA' }}>premium electronics</span><br/>is here.
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '.95rem', lineHeight: 1.7, marginBottom: '3rem', maxWidth: 340 }}>
          Join 15,000+ customers who trust OriginTech for authentic, warranted smart devices.
        </p>

        <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {FEATURES.map((f, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: '1.1rem' }}>{f.icon}</span>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '.88rem' }}>{f.text}</span>
            </li>
          ))}
        </ul>

        <div style={{ marginTop: '3rem', padding: '1.25rem', borderRadius: 16, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '.82rem', fontStyle: 'italic', lineHeight: 1.6 }}>
            "OriginTech gave me full peace of mind — the authenticity certificate is brilliant. My Origin Pro 15 arrived perfectly."
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: '.75rem' }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,#3B82F6,#8B5CF6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '.8rem', fontWeight: 700 }}>A</div>
            <div>
              <div style={{ color: '#fff', fontSize: '.8rem', fontWeight: 700 }}>Ashan P.</div>
              <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '.72rem' }}>Verified Buyer ⭐⭐⭐⭐⭐</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem 2rem', overflowY: 'auto' }}>
        <div style={{ width: '100%', maxWidth: 420 }}>

          {/* Tabs */}
          {activeTab !== 'forgot' && (
            <div style={{ display: 'flex', gap: 4, background: 'var(--bg-soft)', borderRadius: 12, padding: 4, marginBottom: '2rem' }}>
              {['login', 'register'].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} style={{
                  flex: 1, padding: '.7rem', borderRadius: 10, border: 'none',
                  cursor: 'pointer', fontWeight: 700, fontSize: '.9rem',
                  background: activeTab === tab ? 'var(--bg-surface)' : 'transparent',
                  color: activeTab === tab ? 'var(--text-main)' : 'var(--text-muted)',
                  boxShadow: activeTab === tab ? '0 2px 8px rgba(0,0,0,0.1)' : 'none',
                  transition: 'all .2s',
                }}>
                  {tab === 'login' ? 'Log In' : 'Create Account'}
                </button>
              ))}
            </div>
          )}

          {/* LOGIN FORM */}
          {activeTab === 'login' && (
            <>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '.35rem', color: 'var(--text-main)' }}>Welcome back</h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '.9rem', marginBottom: '2rem' }}>Sign in to your OriginTech account.</p>
              <form onSubmit={handleLogin}>
                <Field label="Email address">
                  <InputWrapper icon={Mail}>
                    <input type="email" required placeholder="john@example.com" value={loginEmail} onChange={e => setLoginEmail(e.target.value)}
                      style={inputBase} onFocus={focusIn} onBlur={focusOut}/>
                  </InputWrapper>
                </Field>
                <Field label={
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>Password</span>
                    <button type="button" onClick={() => setActiveTab('forgot')} style={{ color: 'var(--primary-blue)', fontSize: '.82rem', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Forgot password?</button>
                  </div>
                }>
                  <InputWrapper icon={Lock}>
                    <input type={showPw ? 'text' : 'password'} required placeholder="••••••••" value={loginPw} onChange={e => setLoginPw(e.target.value)}
                      style={{ ...inputBase, paddingRight: '2.75rem' }} onFocus={focusIn} onBlur={focusOut}/>
                    <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                      {showPw ? <EyeOff size={16}/> : <Eye size={16}/>}
                    </button>
                  </InputWrapper>
                </Field>

                <button type="submit" disabled={loading} style={{
                  width: '100%', padding: '1rem', borderRadius: 12,
                  background: loading ? 'var(--text-muted)' : 'var(--primary-blue)',
                  color: '#fff', border: 'none', fontWeight: 700, fontSize: '1rem',
                  cursor: loading ? 'wait' : 'pointer', transition: 'opacity .2s',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  marginBottom: '1.25rem',
                }}>
                  {loading ? 'Signing in…' : <><span>Sign In</span><ArrowRight size={16}/></>}
                </button>

                <button type="button" onClick={() => { setUser({ name: 'Guest', email: '', role: 'customer' }); navigate(redirect); }}
                  style={{ width: '100%', padding: '.85rem', borderRadius: 12, background: 'var(--bg-soft)', border: '1px solid var(--border-color)', color: 'var(--text-secondary)', fontWeight: 600, cursor: 'pointer', fontSize: '.9rem' }}>
                  Continue as Guest
                </button>

                <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '.85rem', color: 'var(--text-muted)' }}>
                  New to OriginTech?{' '}
                  <button type="button" onClick={() => setActiveTab('register')} style={{ color: 'var(--primary-blue)', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer' }}>Create an account</button>
                </p>
              </form>
            </>
          )}

          {/* REGISTER FORM */}
          {activeTab === 'register' && (
            <>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '.35rem', color: 'var(--text-main)' }}>Create account</h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '.9rem', marginBottom: '2rem' }}>Join thousands of verified OriginTech customers.</p>
              <form onSubmit={handleRegister}>
                <Field label="Full Name">
                  <InputWrapper icon={User}>
                    <input type="text" required placeholder="John Doe" value={regName} onChange={e => setRegName(e.target.value)}
                      style={inputBase} onFocus={focusIn} onBlur={focusOut}/>
                  </InputWrapper>
                </Field>
                <Field label="Email address">
                  <InputWrapper icon={Mail}>
                    <input type="email" required placeholder="john@example.com" value={regEmail} onChange={e => setRegEmail(e.target.value)}
                      style={inputBase} onFocus={focusIn} onBlur={focusOut}/>
                  </InputWrapper>
                </Field>
                <Field label="Password">
                  <InputWrapper icon={Lock}>
                    <input type={showPw ? 'text' : 'password'} required minLength={8} placeholder="Min 8 characters" value={regPw} onChange={e => setRegPw(e.target.value)}
                      style={{ ...inputBase, paddingRight: '2.75rem' }} onFocus={focusIn} onBlur={focusOut}/>
                    <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                      {showPw ? <EyeOff size={16}/> : <Eye size={16}/>}
                    </button>
                  </InputWrapper>
                  {regPw && (
                    <div style={{ marginTop: '.5rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ flex: 1, height: 4, borderRadius: 4, background: 'var(--bg-soft)', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${(strength/4)*100}%`, background: strengthColor, borderRadius: 4, transition: 'width .3s, background .3s' }}/>
                      </div>
                      <span style={{ fontSize: '.75rem', color: strengthColor, fontWeight: 700, minWidth: 40 }}>{strengthLabel}</span>
                    </div>
                  )}
                </Field>

                <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: '1.5rem', cursor: 'pointer' }}>
                  <input type="checkbox" required checked={regTerms} onChange={e => setRegTerms(e.target.checked)} style={{ marginTop: 2, flexShrink: 0 }}/>
                  <span style={{ fontSize: '.83rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                    I agree to OriginTech's <a href="#" style={{ color: 'var(--primary-blue)' }}>Terms of Service</a> and <a href="#" style={{ color: 'var(--primary-blue)' }}>Privacy Policy</a>.
                  </span>
                </label>

                <button type="submit" disabled={loading} style={{
                  width: '100%', padding: '1rem', borderRadius: 12,
                  background: loading ? 'var(--text-muted)' : 'var(--primary-blue)',
                  color: '#fff', border: 'none', fontWeight: 700, fontSize: '1rem',
                  cursor: loading ? 'wait' : 'pointer', marginBottom: '1.25rem',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                }}>
                  {loading ? 'Creating account…' : <><span>Create Account</span><ArrowRight size={16}/></>}
                </button>

                <p style={{ textAlign: 'center', fontSize: '.85rem', color: 'var(--text-muted)' }}>
                  Already have an account?{' '}
                  <button type="button" onClick={() => setActiveTab('login')} style={{ color: 'var(--primary-blue)', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer' }}>Sign in</button>
                </p>
              </form>
            </>
          )}

          {/* FORGOT PASSWORD */}
          {activeTab === 'forgot' && (
            <>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '.35rem', color: 'var(--text-main)' }}>Reset password</h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '.9rem', marginBottom: '2rem' }}>We'll send a reset link to your email.</p>

              {forgotSent ? (
                <div style={{ padding: '2rem', background: '#F0FDF4', border: '1px solid #86EFAC', borderRadius: 16, textAlign: 'center' }}>
                  <CheckCircle size={44} color="#10B981" style={{ margin: '0 auto 1rem' }}/>
                  <h3 style={{ color: '#065F46', marginBottom: '.5rem' }}>Check your inbox</h3>
                  <p style={{ color: '#047857', fontSize: '.88rem', marginBottom: '1.5rem' }}>A reset link was sent to <strong>{forgotEmail}</strong>. It expires in 15 minutes.</p>
                  <button onClick={() => { setActiveTab('login'); setForgotSent(false); setForgotEmail(''); }} style={{ color: 'var(--primary-blue)', fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer' }}>← Back to sign in</button>
                </div>
              ) : (
                <form onSubmit={handleForgot}>
                  <Field label="Email address">
                    <InputWrapper icon={Mail}>
                      <input type="email" required placeholder="john@example.com" value={forgotEmail} onChange={e => setForgotEmail(e.target.value)}
                        style={inputBase} onFocus={focusIn} onBlur={focusOut}/>
                    </InputWrapper>
                  </Field>
                  <button type="submit" disabled={loading} style={{
                    width: '100%', padding: '1rem', borderRadius: 12,
                    background: loading ? 'var(--text-muted)' : 'var(--primary-blue)',
                    color: '#fff', border: 'none', fontWeight: 700, fontSize: '1rem',
                    cursor: loading ? 'wait' : 'pointer', marginBottom: '1.25rem',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  }}>
                    {loading ? 'Sending…' : 'Send Reset Link'}
                  </button>
                  <button type="button" onClick={() => setActiveTab('login')} style={{ display: 'block', textAlign: 'center', width: '100%', color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '.88rem' }}>
                    ← Back to sign in
                  </button>
                </form>
              )}
            </>
          )}
        </div>
      </div>

      {/* Mobile responsive: stack vertically */}
      <style dangerouslySetInnerHTML={{__html:`
        @media(max-width:768px){
          .auth-panel-left{ display:none!important; }
          .auth-panel-right{ border-left:none!important; }
        }
      `}}/>
    </div>
  );
};

export default Auth;