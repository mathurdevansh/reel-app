import React from 'react';

const Toast = ({ message, visible }) => {
  return (
    <div style={{
      position: 'fixed',
      bottom: 24,
      right: 24,
      background: 'var(--bg2)',
      border: '0.5px solid var(--border2)',
      borderRadius: 10,
      padding: '10px 16px',
      fontSize: 13,
      color: 'var(--text)',
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      zIndex: 9999,
      transform: visible ? 'translateY(0)' : 'translateY(80px)',
      opacity: visible ? 1 : 0,
      transition: 'all 0.3s ease',
      pointerEvents: 'none',
      boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
    }}>
      <div style={{
        width: 7, height: 7, borderRadius: '50%', background: 'var(--green)', flexShrink: 0,
      }} />
      {message}
    </div>
  );
};

export default Toast;