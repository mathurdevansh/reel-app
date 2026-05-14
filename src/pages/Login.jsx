import React, { useState } from 'react';
import { MOCK_USERS } from '../data/constants';

const Login = ({ onLogin }) => {
  const [email, setEmail]     = useState('demo@reelgen.ai');
  const [password, setPassword] = useState('demo123');
  const [error, setError]     = useState('');

  const handleSubmit = () => {
    const user = MOCK_USERS.find(u => u.email === email && u.password === password);
    if (!user) {
      setError('Incorrect email or password. Try demo@reelgen.ai / demo123');
      return;
    }
    setError('');
    onLogin(user);
  };

  const handleGoogle = () => {
    setEmail('demo@reelgen.ai');
    setPassword('demo123');
    const user = MOCK_USERS[0];
    onLogin(user);
  };

  const inputStyle = {
    width: '100%',
    background: 'var(--bg3)',
    border: '0.5px solid var(--border2)',
    borderRadius: 'var(--r)',
    padding: '10px 14px',
    color: 'var(--text)',
    fontSize: 14,
    fontFamily: 'DM Sans, sans-serif',
    outline: 'none',
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: '2rem',
      padding: '2rem',
      background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(124,106,255,0.18) 0%, transparent 70%), var(--bg)',
    }}>
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 38, height: 38, borderRadius: '50%',
          background: 'linear-gradient(135deg, #7c6aff, #f472b6)',
          display: 'grid', placeItems: 'center',
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
        <span style={{ fontFamily: 'Syne', fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.5px' }}>
          Reel<span style={{ color: '#a78bfa' }}>Gen</span> AI
        </span>
      </div>

      {/* Box */}
      <div style={{
        background: 'var(--bg2)',
        border: '0.5px solid var(--border2)',
        borderRadius: 'var(--r2)',
        padding: '2.2rem 2.4rem',
        width: '100%',
        maxWidth: 400,
        boxShadow: '0 0 60px rgba(124,106,255,0.08)',
      }}>
        <h2 style={{ fontFamily: 'Syne', fontSize: '1.4rem', marginBottom: '0.3rem' }}>Welcome back</h2>
        <p style={{ color: 'var(--text2)', fontSize: 13, marginBottom: '1.6rem' }}>Sign in to your creative studio</p>

        {error && (
          <div style={{
            background: 'rgba(255,77,106,0.1)',
            border: '0.5px solid rgba(255,77,106,0.3)',
            borderRadius: 8, padding: '8px 12px',
            fontSize: 13, color: '#ff4d6a', marginBottom: '1rem',
          }}>{error}</div>
        )}

        {/* Email */}
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--text2)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
            style={inputStyle}
            onFocus={e => { e.target.style.borderColor = '#7c6aff'; }}
            onBlur={e => { e.target.style.borderColor = 'var(--border2)'; }}
          />
        </div>

        {/* Password */}
        <div style={{ marginBottom: '0.5rem' }}>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: 'var(--text2)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            style={inputStyle}
            onFocus={e => { e.target.style.borderColor = '#7c6aff'; }}
            onBlur={e => { e.target.style.borderColor = 'var(--border2)'; }}
            onKeyDown={e => { if (e.key === 'Enter') handleSubmit(); }}
          />
        </div>

        {/* Sign in button */}
        <button
          onClick={handleSubmit}
          style={{
            width: '100%', marginTop: '0.8rem',
            background: 'linear-gradient(135deg, #7c6aff, #9f5bff)',
            border: 'none', borderRadius: 'var(--r)',
            padding: 11, color: '#fff',
            fontFamily: 'Syne, sans-serif', fontSize: 14, fontWeight: 600,
            cursor: 'pointer', letterSpacing: '0.02em',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
        >
          Sign in →
        </button>

        <div style={{ textAlign: 'center', color: 'var(--text3)', fontSize: 12, margin: '1rem 0' }}>or</div>

        {/* Google button */}
        <button
          onClick={handleGoogle}
          style={{
            width: '100%', background: 'var(--bg3)',
            border: '0.5px solid var(--border2)', borderRadius: 'var(--r)',
            padding: 10, color: 'var(--text)', fontSize: 13,
            cursor: 'pointer', display: 'flex', alignItems: 'center',
            justifyContent: 'center', gap: 8,
            fontFamily: 'DM Sans, sans-serif', transition: 'background 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg4)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg3)'; }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        <p style={{ color: 'var(--text3)', fontSize: 12, textAlign: 'center', marginTop: '1.2rem' }}>
          Don't have an account?{' '}
          <span style={{ color: '#a78bfa', cursor: 'pointer' }}>Create one free</span>
        </p>
      </div>
    </div>
  );
};

export default Login;