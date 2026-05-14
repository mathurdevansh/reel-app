import React from 'react';
import ReelCard from '../components/ReelCard';
import { ANALYTICS_DAYS, ANALYTICS_VIEWS, PLATFORM_STATS } from '../data/constants';

/* ─────────────────── LIBRARY ─────────────────── */
export const Library = ({ reels, onToast }) => (
  <div style={{ padding: '2rem 2.2rem' }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
      <div>
        <h2 style={{ fontFamily: 'Syne', fontSize: '1.4rem' }}>My Library</h2>
        <p style={{ color: 'var(--text2)', fontSize: 13, marginTop: 2 }}>{reels.length} reels created</p>
      </div>
      <button onClick={() => onToast('Export all coming soon!')} style={{
        padding: '8px 14px', borderRadius: 8, fontSize: 13, fontFamily: 'DM Sans',
        cursor: 'pointer', border: '0.5px solid var(--border2)', background: 'var(--bg3)', color: 'var(--text)',
      }}>⬇ Export All</button>
    </div>
    {reels.length === 0 ? (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem 1rem', color: 'var(--text3)', gap: '0.7rem' }}>
        <p style={{ fontSize: 13 }}>No reels yet. Create your first!</p>
      </div>
    ) : (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '1rem' }}>
        {reels.map(r => <ReelCard key={r.id} reel={r} onToast={onToast} />)}
      </div>
    )}
  </div>
);

/* ─────────────────── ANALYTICS ─────────────────── */
const StatCard = ({ label, value, sub, upDown }) => (
  <div style={{ background: 'var(--bg2)', border: '0.5px solid var(--border)', borderRadius: 'var(--r2)', padding: '1.1rem 1.3rem' }}>
    <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text3)', marginBottom: 8 }}>{label}</div>
    <div style={{ fontFamily: 'Syne', fontSize: '1.8rem', fontWeight: 700 }}>{value}</div>
    <div style={{ fontSize: 11, color: upDown === 'up' ? '#22d3a0' : '#ff4d6a', marginTop: 4 }}>{sub}</div>
  </div>
);

export const Analytics = () => {
  const maxViews = Math.max(...ANALYTICS_VIEWS);
  return (
    <div style={{ padding: '2rem 2.2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontFamily: 'Syne', fontSize: '1.4rem' }}>Analytics</h2>
          <p style={{ color: 'var(--text2)', fontSize: 13, marginTop: 2 }}>Performance across all platforms</p>
        </div>
        <select style={{ background: 'var(--bg2)', border: '0.5px solid var(--border2)', borderRadius: 8, padding: '7px 12px', color: 'var(--text)', fontSize: 13, outline: 'none', cursor: 'pointer' }}>
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>All time</option>
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
        <StatCard label="Total Views" value="48.2K" sub="↑ 18%" upDown="up" />
        <StatCard label="Shares" value="1.4K" sub="↑ 32%" upDown="up" />
        <StatCard label="Saves" value="892" sub="↑ 11%" upDown="up" />
        <StatCard label="Follows" value="214" sub="↑ 7%" upDown="up" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
        {/* Bar chart */}
        <div style={{ background: 'var(--bg2)', border: '0.5px solid var(--border)', borderRadius: 'var(--r2)', padding: '1.3rem' }}>
          <div style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text3)', marginBottom: '1rem' }}>Views by day</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, height: 100 }}>
            {ANALYTICS_DAYS.map((day, i) => {
              const h = Math.round((ANALYTICS_VIEWS[i] / maxViews) * 100);
              return (
                <div key={day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div style={{ width: '100%', height: `${h}px`, borderRadius: '4px 4px 0 0', background: 'linear-gradient(180deg, #7c6aff, rgba(124,106,255,0.3))', minHeight: 4 }} />
                  <div style={{ fontSize: 9.5, color: 'var(--text3)' }}>{day}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Platform */}
        <div style={{ background: 'var(--bg2)', border: '0.5px solid var(--border)', borderRadius: 'var(--r2)', padding: '1.3rem' }}>
          <div style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text3)', marginBottom: '1rem' }}>By platform</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {PLATFORM_STATS.map(p => (
              <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: p.color, flexShrink: 0 }} />
                <span style={{ fontSize: 13, flex: 1 }}>{p.name}</span>
                <div style={{ flex: 1, background: 'var(--bg3)', borderRadius: 99, height: 4, overflow: 'hidden' }}>
                  <div style={{ width: `${p.pct}%`, height: '100%', background: p.color, borderRadius: 99 }} />
                </div>
                <span style={{ fontSize: 13, fontWeight: 500 }}>{p.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────── SETTINGS ─────────────────── */
const Toggle = ({ defaultOn }) => {
  const [on, setOn] = React.useState(defaultOn);
  return (
    <div onClick={() => setOn(!on)} style={{
      width: 36, height: 20, borderRadius: 99,
      background: on ? '#7c6aff' : 'var(--bg4)',
      border: '0.5px solid var(--border2)',
      position: 'relative', cursor: 'pointer', transition: 'background 0.2s',
    }}>
      <div style={{
        position: 'absolute', top: 3, left: 3, width: 12, height: 12,
        borderRadius: '50%', background: '#fff',
        transform: on ? 'translateX(16px)' : 'translateX(0)',
        transition: 'transform 0.2s',
      }} />
    </div>
  );
};

export const Settings = ({ user, credits, onToast }) => {
  const cardStyle = { background: 'var(--bg2)', border: '0.5px solid var(--border)', borderRadius: 'var(--r2)', padding: '1.4rem' };
  const rowStyle = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 0', borderBottom: '0.5px solid var(--border)' };

  return (
    <div style={{ padding: '2rem 2.2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontFamily: 'Syne', fontSize: '1.4rem' }}>Settings</h2>
        <p style={{ color: 'var(--text2)', fontSize: 13, marginTop: 2 }}>Manage your account & preferences</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        {/* Account */}
        <div style={cardStyle}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text2)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1rem' }}>Account</div>
          <div style={rowStyle}><div><p style={{ fontSize: 13.5 }}>Email</p><span style={{ fontSize: 11.5, color: 'var(--text3)' }}>{user?.email || 'demo@reelgen.ai'}</span></div></div>
          <div style={rowStyle}>
            <div><p style={{ fontSize: 13.5 }}>Plan</p><span style={{ fontSize: 11.5, color: 'var(--text3)' }}>Pro — resets June 1</span></div>
            <span style={{ padding: '3px 10px', borderRadius: 99, fontSize: 11, background: 'rgba(124,106,255,0.2)', border: '0.5px solid rgba(124,106,255,0.3)', color: '#a78bfa', fontWeight: 600 }}>Pro</span>
          </div>
          <div style={{ ...rowStyle, borderBottom: 'none' }}>
            <div><p style={{ fontSize: 13.5 }}>Credits</p><span style={{ fontSize: 11.5, color: 'var(--text3)' }}>Renews monthly</span></div>
            <span style={{ color: '#a78bfa', fontWeight: 600, fontSize: 13.5 }}>{credits} / 30</span>
          </div>
          <button onClick={() => onToast('Upgrade coming soon!')} style={{ marginTop: '1rem', padding: '7px 13px', borderRadius: 8, fontSize: 12, fontFamily: 'DM Sans', cursor: 'pointer', border: '0.5px solid var(--border2)', background: 'var(--bg3)', color: 'var(--text)' }}>⚡ Upgrade to Business</button>
        </div>

        {/* Notifications */}
        <div style={cardStyle}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text2)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1rem' }}>Notifications</div>
          {[['Reel ready alerts', true], ['Weekly analytics', true], ['Credit warnings', false]].map(([label, def]) => (
            <div key={label} style={rowStyle}><p style={{ fontSize: 13.5 }}>{label}</p><Toggle defaultOn={def} /></div>
          ))}
        </div>

        {/* API Keys */}
        <div style={cardStyle}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text2)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1rem' }}>API Keys</div>
          {[['ElevenLabs (Voiceover)', 'sk-el-••••••••••••'], ['Runway / Pika (Video)', 'rw-••••••••••••']].map(([lbl, ph]) => (
            <div key={lbl}>
              <div style={{ padding: '9px 0', borderBottom: '0.5px solid var(--border)' }}><p style={{ fontSize: 13.5 }}>{lbl}</p></div>
              <div style={{ display: 'flex', gap: 8, marginBottom: '0.8rem', marginTop: 6 }}>
                <input type="password" placeholder={ph} style={{ flex: 1, background: 'var(--bg3)', border: '0.5px solid var(--border2)', borderRadius: 8, padding: '8px 12px', color: 'var(--text)', fontSize: 13, fontFamily: 'monospace', outline: 'none' }} />
                <button onClick={() => onToast('API key saved!')} style={{ padding: '7px 13px', borderRadius: 8, fontSize: 12, fontFamily: 'DM Sans', cursor: 'pointer', border: '0.5px solid var(--border2)', background: 'var(--bg3)', color: 'var(--text)' }}>Save</button>
              </div>
            </div>
          ))}
        </div>

        {/* Preferences */}
        <div style={cardStyle}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text2)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1rem' }}>Preferences</div>
          <div style={rowStyle}>
            <p style={{ fontSize: 13.5 }}>Default platform</p>
            <select style={{ background: 'var(--bg3)', border: '0.5px solid var(--border2)', borderRadius: 6, padding: '5px 10px', color: 'var(--text)', fontSize: 13, outline: 'none' }}>
              <option>Instagram Reels</option><option>TikTok</option><option>YouTube Shorts</option>
            </select>
          </div>
          {[['Auto-add captions', true], ['Auto-publish on ready', false]].map(([label, def]) => (
            <div key={label} style={rowStyle}><p style={{ fontSize: 13.5 }}>{label}</p><Toggle defaultOn={def} /></div>
          ))}
        </div>
      </div>
    </div>
  );
};