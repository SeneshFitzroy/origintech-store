import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { User, Mail, Phone, MapPin, Lock, Bell, ShieldAlert, Camera, CheckCircle, Eye, EyeOff } from 'lucide-react';

const Section = ({ title, children }) => (
  <div style={{ background: 'var(--bg-surface)', borderRadius: 20, border: '1px solid var(--border-color)', padding: '1.75rem', marginBottom: '1.5rem' }}>
    <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>{title}</h2>
    {children}
  </div>
);

const Field = ({ label, icon: Icon, ...props }) => (
  <div>
    <label style={{ display: 'block', fontSize: '.82rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '.4rem', textTransform: 'uppercase', letterSpacing: .5 }}>{label}</label>
    <div style={{ position: 'relative' }}>
      {Icon && <Icon size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }}/>}
      <input {...props} style={{ width: '100%', padding: Icon ? '.8rem .85rem .8rem 2.4rem' : '.8rem .85rem', borderRadius: 10, border: '1.5px solid var(--border-color)', background: 'var(--bg-main)', color: 'var(--text-main)', fontSize: '.9rem', outline: 'none', boxSizing: 'border-box', transition: 'border-color .2s', ...(props.style||{}) }}
        onFocus={e => e.target.style.borderColor='var(--primary-blue)'}
        onBlur={e => e.target.style.borderColor='var(--border-color)'}/>
    </div>
  </div>
);

const Toggle = ({ label, sub, checked, onChange }) => (
  <label style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', padding: '1rem 0', borderBottom: '1px solid var(--border-color)' }}>
    <div>
      <div style={{ fontWeight: 600, fontSize: '.9rem', color: 'var(--text-main)' }}>{label}</div>
      <div style={{ fontSize: '.8rem', color: 'var(--text-muted)', marginTop: 2 }}>{sub}</div>
    </div>
    <div onClick={onChange} style={{
      width: 46, height: 26, borderRadius: 999, cursor: 'pointer',
      background: checked ? 'var(--primary-blue)' : 'var(--border-color)',
      position: 'relative', transition: 'background .25s', flexShrink: 0,
    }}>
      <div style={{ position: 'absolute', top: 3, left: checked ? 22 : 3, width: 20, height: 20, borderRadius: '50%', background: '#fff', transition: 'left .25s', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }}/>
    </div>
  </label>
);

const Profile = () => {
  const { user, setUser } = useAppContext();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '+94 7X XXX XXXX');
  const [address, setAddress] = useState('123 Tech Lane, Colombo 03');
  const [notifyEmail, setNotifyEmail] = useState(true);
  const [notifySms, setNotifySms] = useState(false);
  const [notifyPromo, setNotifyPromo] = useState(true);
  const [notifyOrder, setNotifyOrder] = useState(true);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!user) { navigate('/login'); return null; }

  const initials = name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || 'U';

  const handleSave = () => {
    setUser({ ...user, name, email, phone });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-main)', minHeight: '100vh' }}>
      <style dangerouslySetInnerHTML={{__html:`
        @keyframes checkPop { 0%{transform:scale(0)} 70%{transform:scale(1.15)} 100%{transform:scale(1)} }
        .check-pop { animation: checkPop .35s ease both; }
      `}}/>

      <div className="container" style={{ padding: '3rem 1rem 5rem', maxWidth: 720 }}>

        {/* Hero banner */}
        <div style={{ background: 'linear-gradient(160deg, #04101E 0%, #0B1D36 35%, #0F2847 65%, #132F52 100%)', borderRadius: 24, padding: '2.5rem 2rem', marginBottom: '2.5rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
          {/* Avatar */}
          <div style={{ position: 'relative' }}>
            <div style={{ width: 90, height: 90, borderRadius: '50%', background: 'linear-gradient(135deg,var(--primary-blue),#7C3AED)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 900, color: '#fff', flexShrink: 0, border: '3px solid rgba(255,255,255,0.2)' }}>
              {initials}
            </div>
            <div style={{ position: 'absolute', bottom: 0, right: 0, width: 28, height: 28, background: 'var(--primary-blue)', border: '2px solid #fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
              <Camera size={13} color="#fff"/>
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 900, fontSize: '1.6rem', marginBottom: '.25rem' }}>{name || 'Your Name'}</div>
            <div style={{ opacity: .75, fontSize: '.88rem', marginBottom: '.75rem' }}>{email}</div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '.35rem .9rem', background: 'rgba(0,74,198,.4)', borderRadius: 999, fontSize: '.78rem', fontWeight: 700, border: '1px solid rgba(0,74,198,.5)' }}>
              OriginTech Member
            </div>
          </div>
        </div>

        {/* Personal info */}
        <Section title="Personal Information">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '1rem', marginBottom: '1rem' }}>
            <Field label="Full Name" icon={User} type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your full name"/>
            <Field label="Email Address" icon={Mail} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="email@example.com"/>
            <Field label="Phone Number" icon={Phone} type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+94 7X XXX XXXX"/>
            <Field label="Delivery Address" icon={MapPin} type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="Street, City"/>
          </div>

          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <button className="btn-primary" onClick={handleSave} style={{ padding: '.9rem 2.5rem', borderRadius: 12, fontWeight: 700, fontSize: '.95rem' }}>Save Changes</button>
            {saved && (
              <div className="check-pop" style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#10B981', fontWeight: 700, fontSize: '.88rem' }}>
                <CheckCircle size={16}/> Saved successfully!
              </div>
            )}
          </div>
        </Section>

        {/* Change password */}
        <Section title="Change Password">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '.82rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '.4rem', textTransform: 'uppercase', letterSpacing: .5 }}>Current Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}/>
                <input type={showCurrent ? 'text' : 'password'} placeholder="••••••••" style={{ width: '100%', padding: '.8rem 2.8rem .8rem 2.4rem', borderRadius: 10, border: '1.5px solid var(--border-color)', background: 'var(--bg-main)', color: 'var(--text-main)', fontSize: '.9rem', outline: 'none', boxSizing: 'border-box' }}
                  onFocus={e => e.target.style.borderColor='var(--primary-blue)'} onBlur={e => e.target.style.borderColor='var(--border-color)'}/>
                <button onClick={() => setShowCurrent(!showCurrent)} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                  {showCurrent ? <EyeOff size={15}/> : <Eye size={15}/>}
                </button>
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '.82rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '.4rem', textTransform: 'uppercase', letterSpacing: .5 }}>New Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}/>
                <input type={showNew ? 'text' : 'password'} placeholder="••••••••" style={{ width: '100%', padding: '.8rem 2.8rem .8rem 2.4rem', borderRadius: 10, border: '1.5px solid var(--border-color)', background: 'var(--bg-main)', color: 'var(--text-main)', fontSize: '.9rem', outline: 'none', boxSizing: 'border-box' }}
                  onFocus={e => e.target.style.borderColor='var(--primary-blue)'} onBlur={e => e.target.style.borderColor='var(--border-color)'}/>
                <button onClick={() => setShowNew(!showNew)} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                  {showNew ? <EyeOff size={15}/> : <Eye size={15}/>}
                </button>
              </div>
            </div>
          </div>
          <button className="btn-primary" style={{ padding: '.9rem 2rem', borderRadius: 12, fontWeight: 700, fontSize: '.9rem' }}>Update Password</button>
        </Section>

        {/* Notifications */}
        <Section title="Notification Preferences">
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Toggle label="Email Notifications" sub="Order updates and account alerts" checked={notifyEmail} onChange={() => setNotifyEmail(!notifyEmail)}/>
            <Toggle label="SMS Notifications" sub="Delivery tracking via SMS" checked={notifySms} onChange={() => setNotifySms(!notifySms)}/>
            <Toggle label="Promotional Emails" sub="Deals, flash sales, and new arrivals" checked={notifyPromo} onChange={() => setNotifyPromo(!notifyPromo)}/>
            <div style={{ paddingTop: '1rem' }}>
              <Toggle label="Order Status Updates" sub="Shipped, out for delivery, delivered" checked={notifyOrder} onChange={() => setNotifyOrder(!notifyOrder)}/>
            </div>
          </div>
        </Section>

        {/* Danger zone */}
        <div style={{ background: 'var(--bg-surface)', borderRadius: 20, border: '1px solid #FCA5A5', padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1rem', color: '#EF4444', fontWeight: 800 }}>
            <ShieldAlert size={18}/> Danger Zone
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '.88rem', marginBottom: '1.25rem', lineHeight: 1.6 }}>
            Deleting your account is permanent and irreversible. All your orders, preferences, and data will be removed.
          </p>
          <button style={{ padding: '.8rem 1.75rem', background: 'transparent', color: '#EF4444', border: '1.5px solid #EF4444', borderRadius: 10, fontWeight: 700, fontSize: '.88rem', cursor: 'pointer', transition: 'background .2s' }}
            onMouseOver={e => { e.target.style.background='#FEF2F2'; }}
            onMouseOut={e => { e.target.style.background='transparent'; }}>
            Delete My Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
