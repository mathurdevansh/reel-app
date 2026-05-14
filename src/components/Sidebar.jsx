import React from 'react';

const NAV_ITEMS = [
  {
    id: 'home', label: 'Dashboard',
    icon: (
      <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="16" height="16">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <path d="M9 22V12h6v10" />
      </svg>
    ),
  },
  {
    id: 'create', label: 'Create Reel', badge: true,
    icon: (
      <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="16" height="16">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="16" />
        <line x1="8" y1="12" x2="16" y2="12" />
      </svg>
    ),
  },
  {
    id: 'library', label: 'My Library',
    icon: (
      <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="16" height="16">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    id: 'analytics', label: 'Analytics',
    icon: (
      <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="16" height="16">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
];

const Sidebar = ({ activeSection, onNavigate, user, onLogout }) => {
  const initials = user?.name?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || 'SA';

  return (
    <aside style={{
      width: 220,
      flexShrink: 0,
      background: 'var(--bg2)',
      borderRight: '0.5px solid var(--border)',
      display: 'flex',
      flexDirection: 'column',
      padding: '1.4rem 0',
      position: 'sticky',
      top: 0,
      height: '100vh',
      overflowY: 'auto',
    }}>
      {/* Logo */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 9,
        padding: '0 1.2rem 1.4rem',
        borderBottom: '0.5px solid var(--border)',
        marginBottom: '1rem',
      }}>
        <div style={{
          width: 28, height: 28, borderRadius: '50%',
          background: 'linear-gradient(135deg, #7c6aff, #f472b6)',
          display: 'grid', placeItems: 'center',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
        <span style={{ fontFamily: 'Syne', fontSize: '1rem', fontWeight: 800 }}>
          Reel<span style={{ color: '#a78bfa' }}>Gen</span>
        </span>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1 }}>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '9px 1.2rem', width: '100%',
              background: 'none', border: 'none', cursor: 'pointer',
              color: activeSection === item.id ? '#a78bfa' : '#8888aa',
              fontSize: 13.5, textAlign: 'left',
              borderLeft: `2px solid ${activeSection === item.id ? '#7c6aff' : 'transparent'}`,
              backgroundColor: activeSection === item.id ? 'rgba(124,106,255,0.07)' : 'transparent',
              transition: 'all 0.15s',
              marginBottom: 2,
            }}
            onMouseEnter={(e) => { if (activeSection !== item.id) { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.04)'; } }}
            onMouseLeave={(e) => { if (activeSection !== item.id) { e.currentTarget.style.color = '#8888aa'; e.currentTarget.style.backgroundColor = 'transparent'; } }}
          >
            {item.icon}
            {item.label}
            {item.badge && (
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#7c6aff', marginLeft: 'auto' }} />
            )}
          </button>
        ))}

        <div style={{ height: '0.5px', background: 'var(--border)', margin: '0.8rem 1.2rem' }} />

        <button
          onClick={() => onNavigate('settings')}
          style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '9px 1.2rem', width: '100%',
            background: 'none', border: 'none', cursor: 'pointer',
            color: activeSection === 'settings' ? '#a78bfa' : '#8888aa',
            fontSize: 13.5, textAlign: 'left',
            borderLeft: `2px solid ${activeSection === 'settings' ? '#7c6aff' : 'transparent'}`,
            backgroundColor: activeSection === 'settings' ? 'rgba(124,106,255,0.07)' : 'transparent',
            transition: 'all 0.15s',
          }}
        >
          <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" width="16" height="16">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
          </svg>
          Settings
        </button>
      </nav>

      {/* User chip */}
      <div style={{ padding: '0 1.2rem' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 9,
          padding: '9px 10px',
          background: 'var(--bg3)', borderRadius: 'var(--r)',
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: '50%',
            background: 'linear-gradient(135deg, #7c6aff, #f472b6)',
            display: 'grid', placeItems: 'center',
            fontFamily: 'Syne', fontSize: 11, fontWeight: 700, color: '#fff',
          }}>{initials}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 12.5, fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {user?.name || 'Studio Account'}
            </div>
            <div style={{ fontSize: 10.5, color: '#a78bfa' }}>Pro Plan</div>
          </div>
          <button
            onClick={onLogout}
            title="Logout"
            style={{
              background: 'none', border: 'none', color: 'var(--text3)',
              cursor: 'pointer', fontSize: 10, padding: 4,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#ff4d6a'; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text3)'; }}
          >✕</button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;