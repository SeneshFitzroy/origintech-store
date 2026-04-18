import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Lock, User, ArrowRight, Server } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const AdminLogin = () => {
  const { setUser } = useAppContext();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState({ id: '', pin: '' });

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate high-security admin login sequence
    setTimeout(() => {
      setUser({ 
        name: 'System Administrator', 
        email: 'admin@origintech.com', 
        role: 'admin',
        level: 'SuperAdmin'
      });
      setLoading(false);
      navigate('/admin');
    }, 1500);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'radial-gradient(circle at center, #0F172A 0%, #020617 100%)',
      padding: '2rem'
    }}>
      {/* Decorative Elements */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, var(--primary-blue), transparent)', opacity: 0.3 }} />
      
      <div className="card" style={{ 
        width: '100%', 
        maxWidth: '400px', 
        padding: '2.5rem', 
        backgroundColor: 'rgba(30, 41, 59, 0.5)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ 
            width: '60px', height: '60px', 
            borderRadius: '16px', 
            background: 'linear-gradient(135deg, #004AC6 0%, #003a9d 100%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1.5rem',
            boxShadow: '0 0 20px rgba(0,74,198, 0.4)'
          }}>
            <ShieldCheck size={32} color="white" />
          </div>
          <h1 style={{ color: 'white', fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.5px' }}>Admin Console</h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.85rem', marginTop: '0.5rem' }}>Secure Infrastructure Access</p>
        </div>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.5rem' }}>
              Admin Identifier
            </label>
            <div style={{ position: 'relative' }}>
              <input 
                type="text" 
                placeholder="ID-8829-X"
                required
                style={{ 
                  width: '100%', padding: '0.85rem 1rem 0.85rem 2.75rem', 
                  backgroundColor: 'rgba(15, 23, 42, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '10px', color: 'white', fontSize: '0.95rem',
                  outline: 'none'
                }} 
              />
              <User size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }} />
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.5rem' }}>
              Security PIN
            </label>
            <div style={{ position: 'relative' }}>
              <input 
                type="password" 
                placeholder="••••••••"
                required
                style={{ 
                  width: '100%', padding: '0.85rem 1rem 0.85rem 2.75rem', 
                  backgroundColor: 'rgba(15, 23, 42, 0.6)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '10px', color: 'white', fontSize: '0.95rem',
                  outline: 'none'
                }} 
              />
              <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.3)' }} />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              width: '100%', padding: '1rem', 
              backgroundColor: '#004AC6', color: 'white', 
              borderRadius: '10px', fontWeight: 700, fontSize: '0.95rem',
              border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              boxShadow: '0 4px 12px rgba(0,74,198, 0.3)',
              transition: 'all 0.2s',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? (
              'Authenticating...'
            ) : (
              <>Authorize Access <ArrowRight size={18} /></>
            )}
          </button>
        </form>

        <div style={{ marginTop: '2rem', textAlign: 'center' }}>
          <button 
            onClick={() => navigate('/')}
            style={{ 
              background: 'none', border: 'none', 
              color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', 
              cursor: 'pointer', textDecoration: 'underline' 
            }}
          >
            Return to Public Store
          </button>
        </div>

        {/* Footer Info */}
        <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center', color: 'rgba(255,255,255,0.2)', fontSize: '0.7rem' }}>
          <Server size={12} />
          Node Cluster: US-EAST-1
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
