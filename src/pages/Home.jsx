import React from 'react';
import ReelCard from '../components/ReelCard';

const StatCard = ({ label, value, sub, upDown }) => (
  <div style={{
    background: 'var(--bg2)', border: '0.5px solid var(--border)',
    borderRadius: 'var(--r2)', padding: '1.1rem 1.3rem',
  }}>
    <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text3)', marginBottom: 8 }}>{label}</div>
    <div style={{ fontFamily: 'Syne', fontSize: '1.8rem', fontWeight: 700 }}>{value}</div>
    <div style={{ fontSize: 11, color: 'var(--text3)', marginTop: 4 }}>
      <span style={{ color: upDown === 'up' ? '#22d3a0' : '#ff4d6a' }}>{sub}</span>
    </div>
  </div>
);

const Home = ({ reels, credits, onNavigate, onToast }) => {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';

  return (
    <div style={{ padding: '2rem 2.2rem' }}>
      {/* Top bar */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            padding: '4px 10px',
            background: 'rgba(124,106,255,0.1)', border: '0.5px solid rgba(124,106,255,0.25)',
            borderRadius: 99, fontSize: 11, color: '#a78bfa', marginBottom: '0.6rem',
          }}>
            ⚡ Quick overview
          </div>
          <h2 style={{ fontFamily: 'Syne', fontSize: '1.4rem' }}>{greeting} 👋</h2>
          <p style={{ color: 'var(--text2)', fontSize: 13, marginTop: 2 }}>Here's your creative studio at a glance</p>
        </div>
        <button
          onClick={() => onNavigate('create')}
          style={{
            background: 'linear-gradient(135deg, #7c6aff, #9f5bff)',
            border: 'none', borderRadius: 'var(--r)',
            padding: '9px 18px', color: '#fff',
            fontFamily: 'Syne', fontSize: 14, fontWeight: 700,
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8,
          }}
        >
          + New Reel
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
        <StatCard label="Reels Created" value={reels.length} sub="↑ 4 this week" upDown="up" />
        <StatCard label="Total Views" value="48.2K" sub="↑ 18% vs last week" upDown="up" />
        <StatCard label="Credits Left" value={credits} sub="of 30 monthly" upDown="up" />
        <StatCard label="Avg Engagement" value="6.8%" sub="↓ 0.4% vs last week" upDown="down" />
      </div>

      {/* Recent Reels */}
      <div style={{ background: 'var(--bg2)', border: '0.5px solid var(--border2)', borderRadius: 'var(--r2)', padding: '1.6rem' }}>
        <h3 style={{ fontFamily: 'Syne', fontSize: '1rem', marginBottom: '1.2rem', display: 'flex', alignItems: 'center', gap: 8 }}>
          🎬 Recent Reels
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem' }}>
          {reels.slice(0, 6).map(r => <ReelCard key={r.id} reel={r} onToast={onToast} />)}
        </div>
      </div>
    </div>
  );
};

export default Home;