import React from 'react';
import { REEL_COLORS } from '../data/constants';

const ReelCard = ({ reel, onToast }) => {
  const [c1, c2] = REEL_COLORS[reel.colorIdx % REEL_COLORS.length];
  const badgeStyle = {
    done: { bg: 'rgba(34,211,160,0.18)', color: '#22d3a0', text: 'Ready' },
    gen:  { bg: 'rgba(124,106,255,0.2)', color: '#a78bfa', text: 'Generating' },
    err:  { bg: 'rgba(255,77,106,0.15)', color: '#ff4d6a', text: 'Error' },
  }[reel.status] || { bg: 'rgba(34,211,160,0.18)', color: '#22d3a0', text: 'Ready' };

  const formatViews = (v) =>
    v > 999 ? (v / 1000).toFixed(1) + 'K' : v > 0 ? String(v) : '';

  return (
    <div
      onClick={() => onToast(`Opening "${reel.title}"...`)}
      style={{
        background: 'var(--bg2)',
        border: '0.5px solid var(--border)',
        borderRadius: 'var(--r2)',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'border-color 0.2s, transform 0.15s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--border2)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Thumbnail */}
      <div style={{ aspectRatio: '9/16', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          width: '100%',
          height: '100%',
          background: `linear-gradient(160deg, ${c1} 0%, ${c2} 100%)`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
        }}>
          <div style={{
            width: 34, height: 34, borderRadius: '50%',
            background: 'rgba(255,255,255,0.15)',
            display: 'grid', placeItems: 'center',
            border: '1.5px solid rgba(255,255,255,0.25)',
          }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="#fff">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </div>
          <div style={{
            fontSize: 10, color: 'rgba(255,255,255,0.6)',
            background: 'rgba(0,0,0,0.4)', padding: '2px 6px', borderRadius: 4,
          }}>0:30</div>
        </div>
        {/* Badge */}
        <div style={{
          position: 'absolute', top: 6, right: 6,
          fontSize: 9, padding: '2px 7px', borderRadius: 99,
          fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em',
          background: badgeStyle.bg, color: badgeStyle.color,
        }}>
          {badgeStyle.text}
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: '8px 10px 10px' }}>
        <p style={{
          fontSize: 12, fontWeight: 500,
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
          marginBottom: 2, color: 'var(--text)',
        }}>{reel.title}</p>
        <span style={{ fontSize: 10.5, color: 'var(--text3)' }}>
          {reel.style} · {reel.date}
          {reel.views > 0 ? ` · ${formatViews(reel.views)} views` : ''}
        </span>
      </div>
    </div>
  );
};

export default ReelCard;