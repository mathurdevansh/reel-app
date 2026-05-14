import React, { useState, useCallback } from 'react';
import './styles/global.css';

import Login      from './pages/Login';
import Home       from './pages/Home';
import CreateReel from './pages/CreateReel';
import { Library, Analytics, Settings } from './pages/OtherPages';
import Sidebar    from './components/Sidebar';
import Toast      from './components/Toast';

import { SAMPLE_REELS } from './data/constants';

function App() {
  /* ── Auth state ── */
  const [user, setUser]         = useState(null);

  /* ── App state ── */
  const [section, setSection]   = useState('home');
  const [reels, setReels]       = useState(SAMPLE_REELS);
  const [credits, setCredits]   = useState(24);

  /* ── Toast state ── */
  const [toast, setToast]       = useState({ msg: '', visible: false });
  const toastTimerRef           = React.useRef(null);

  const showToast = useCallback((msg) => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast({ msg, visible: true });
    toastTimerRef.current = setTimeout(() => setToast(t => ({ ...t, visible: false })), 2800);
  }, []);

  /* ── Handlers ── */
  const handleLogin  = (userData) => { setUser(userData); showToast('Welcome back! Studio loaded 🎬'); };
  const handleLogout = () => { setUser(null); setSection('home'); };

  const handleReelCreated = (newReel) => {
    setReels(prev => [newReel, ...prev]);
    setCredits(prev => Math.max(0, prev - 1));
  };

  /* ── Not logged in → show Login ── */
  if (!user) {
    return (
      <>
        <Login onLogin={handleLogin} />
        <Toast message={toast.msg} visible={toast.visible} />
      </>
    );
  }

  /* ── Dashboard ── */
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar
        activeSection={section}
        onNavigate={setSection}
        user={user}
        onLogout={handleLogout}
      />

      <main style={{ flex: 1, overflowY: 'auto', background: 'var(--bg)' }}>
        {section === 'home'      && <Home reels={reels} credits={credits} onNavigate={setSection} onToast={showToast} />}
        {section === 'create'    && <CreateReel credits={credits} onReelCreated={handleReelCreated} onToast={showToast} />}
        {section === 'library'   && <Library reels={reels} onToast={showToast} />}
        {section === 'analytics' && <Analytics />}
        {section === 'settings'  && <Settings user={user} credits={credits} onToast={showToast} />}
      </main>

      <Toast message={toast.msg} visible={toast.visible} />
    </div>
  );
}

export default App;