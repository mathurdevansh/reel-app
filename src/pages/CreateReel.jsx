import React from 'react';
import { GEN_STEPS, REEL_COLORS, STYLE_OPTIONS, PLATFORM_OPTIONS, VOICE_OPTIONS } from '../data/constants';

const CreateReel = ({ credits, onReelCreated, onToast }) => {
  const [prompt, setPrompt]       = useState('');
  const [style, setStyle]         = useState(STYLE_OPTIONS[0]);
  const [platform, setPlatform]   = useState(PLATFORM_OPTIONS[0]);
  const [voice, setVoice]         = useState(VOICE_OPTIONS[0]);
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress]   = useState(0);
  const [progLabel, setProgLabel] = useState('');
  const [steps, setSteps]         = useState([]);
  const [preview, setPreview]     = useState(null);

  const selectStyle = {
    width: '100%',
    background: 'var(--bg3)',
    border: '0.5px solid var(--border2)',
    borderRadius: 8,
    padding: '8px 12px',
    color: 'var(--text)',
    fontSize: 13,
    fontFamily: 'DM Sans, sans-serif',
    outline: 'none',
    cursor: 'pointer',
    appearance: 'none',
  };

  const startGeneration = () => {
    if (!prompt.trim()) return;
    if (credits <= 0) { onToast('No credits remaining! Upgrade your plan.'); return; }
    setGenerating(true);
    setPreview(null);
    setProgress(0);
    setSteps([]);

    const totalDur = GEN_STEPS.reduce((a, s) => a + s.dur, 0);
    let elapsed = 0;
    let stepIdx = 0;

    const runStep = () => {
      if (stepIdx >= GEN_STEPS.length) {
        finishGeneration();
        return;
      }
      setProgLabel(GEN_STEPS[stepIdx].label);
      setSteps(GEN_STEPS.map((s, i) => ({
        ...s,
        state: i < stepIdx ? 'done' : i === stepIdx ? 'active' : 'pending',
      })));

      const stepDur = GEN_STEPS[stepIdx].dur;
      let stepElapsed = 0;
      const interval = setInterval(() => {
        stepElapsed += 80;
        elapsed += 80;
        const pct = Math.min(Math.round((elapsed / totalDur) * 100), 99);
        setProgress(pct);
        if (stepElapsed >= stepDur) {
          clearInterval(interval);
          stepIdx++;
          runStep();
        }
      }, 80);
    };
    runStep();
  };

  const finishGeneration = () => {
    setProgress(100);
    setProgLabel('✅ Reel ready!');
    setGenerating(false);

    const colorIdx = Math.floor(Math.random() * REEL_COLORS.length);
    const title = prompt.length > 40 ? prompt.slice(0, 40) + '...' : prompt;
    const newReel = {
      id: Date.now(), title, style, platform,
      status: 'done', views: 0, date: 'just now', colorIdx,
    };
    setPreview({ reel: newReel, colors: REEL_COLORS[colorIdx] });
    onReelCreated(newReel);
    onToast('🎬 Reel generated successfully!');
  };

  const [c1, c2] = preview ? preview.colors : ['rgba(124,106,255,0.3)', 'rgba(244,114,182,0.2)'];

  return (
    <div style={{ padding: '2rem 2.2rem' }}>
      <div style={{ marginBottom: '2rem' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '4px 10px', background: 'rgba(124,106,255,0.1)',
          border: '0.5px solid rgba(124,106,255,0.25)', borderRadius: 99,
          fontSize: 11, color: '#a78bfa', marginBottom: '0.6rem',
        }}>🎬 AI Studio</div>
        <h2 style={{ fontFamily: 'Syne', fontSize: '1.4rem' }}>Create a 30-Second Reel</h2>
        <p style={{ color: 'var(--text2)', fontSize: 13, marginTop: 2 }}>Describe your idea — our AI handles the rest</p>
      </div>

      {/* Form card */}
      <div style={{ background: 'var(--bg2)', border: '0.5px solid var(--border2)', borderRadius: 'var(--r2)', padding: '1.6rem', marginBottom: '1.5rem' }}>
        <h3 style={{ fontFamily: 'Syne', fontSize: '1rem', marginBottom: '1.2rem' }}>✍️ Describe your reel</h3>
        <textarea
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          placeholder="E.g. A motivational reel about morning routines with energetic music, bold text overlays and sunrise B-roll footage..."
          style={{
            width: '100%', background: 'var(--bg3)',
            border: '0.5px solid var(--border2)', borderRadius: 'var(--r)',
            padding: '12px 14px', color: 'var(--text)', fontSize: 14,
            fontFamily: 'DM Sans, sans-serif', resize: 'none', outline: 'none',
            minHeight: 90,
          }}
        />

        {/* Options */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.8rem', margin: '1rem 0' }}>
          {[
            { label: 'Style', value: style, setter: setStyle, opts: STYLE_OPTIONS },
            { label: 'Platform', value: platform, setter: setPlatform, opts: PLATFORM_OPTIONS },
            { label: 'Voiceover', value: voice, setter: setVoice, opts: VOICE_OPTIONS },
          ].map(({ label, value, setter, opts }) => (
            <div key={label}>
              <label style={{ display: 'block', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text3)', marginBottom: 5 }}>{label}</label>
              <select value={value} onChange={e => setter(e.target.value)} style={selectStyle}>
                {opts.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          ))}
        </div>

        {/* Generate row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '1rem' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'var(--bg3)', border: '0.5px solid var(--border)',
            borderRadius: 8, padding: '8px 12px', fontSize: 13, color: 'var(--text2)',
          }}>
            ⚡ <span style={{ color: '#a78bfa', fontWeight: 600 }}>{credits}</span> credits left
          </div>
          <button
            onClick={startGeneration}
            disabled={generating || !prompt.trim()}
            style={{
              flex: 1,
              background: generating || !prompt.trim() ? 'rgba(124,106,255,0.3)' : 'linear-gradient(135deg, #7c6aff, #9f5bff)',
              border: 'none', borderRadius: 'var(--r)', padding: 12,
              color: '#fff', fontFamily: 'Syne', fontSize: 14, fontWeight: 700,
              cursor: generating || !prompt.trim() ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}
          >
            {generating ? <><span className="spin">⟳</span> Generating...</> : '▶ Generate Reel (1 credit)'}
          </button>
        </div>
      </div>

      {/* Progress */}
      {(generating || progress > 0) && (
        <div style={{ background: 'var(--bg2)', border: '0.5px solid var(--border2)', borderRadius: 'var(--r2)', padding: '1.4rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: 'var(--text2)', marginBottom: '0.9rem' }}>
            <span style={{ animation: generating ? 'pulse 1.4s ease-in-out infinite' : 'none' }}>{progLabel}</span>
            <span>{progress}%</span>
          </div>
          <div style={{ background: 'var(--bg3)', borderRadius: 99, height: 6, overflow: 'hidden', marginBottom: '0.5rem' }}>
            <div style={{ height: '100%', background: 'linear-gradient(90deg, #7c6aff, #f472b6)', borderRadius: 99, width: `${progress}%`, transition: 'width 0.4s ease' }} />
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.8rem' }}>
            {steps.map((s, i) => (
              <div key={i} style={{
                padding: '4px 10px', borderRadius: 99, fontSize: 11,
                display: 'flex', alignItems: 'center', gap: 5,
                background: s.state === 'done' ? 'rgba(34,211,160,0.1)' : s.state === 'active' ? 'rgba(124,106,255,0.12)' : 'var(--bg3)',
                border: `0.5px solid ${s.state === 'done' ? 'rgba(34,211,160,0.3)' : s.state === 'active' ? 'rgba(124,106,255,0.35)' : 'var(--border)'}`,
                color: s.state === 'done' ? '#22d3a0' : s.state === 'active' ? '#a78bfa' : 'var(--text3)',
              }}>
                <div style={{ width: 5, height: 5, borderRadius: '50%', background: 'currentColor' }} />
                {s.label}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Preview */}
      {preview && (
        <div style={{ background: 'var(--bg2)', border: '0.5px solid var(--border2)', borderRadius: 'var(--r2)', padding: '1.4rem', display: 'flex', gap: '1.4rem' }}>
          <div style={{ width: 140, flexShrink: 0, aspectRatio: '9/16', borderRadius: 10, overflow: 'hidden', border: '0.5px solid var(--border2)', cursor: 'pointer' }}>
            <div style={{
              width: '100%', height: '100%',
              background: `linear-gradient(160deg, ${c1} 0%, ${c2} 100%)`,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>AI Generated</div>
              <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'grid', placeItems: 'center', border: '1.5px solid rgba(255,255,255,0.25)' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#fff"><polygon points="5 3 19 12 5 21 5 3" /></svg>
              </div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', background: 'rgba(0,0,0,0.4)', padding: '2px 6px', borderRadius: 4 }}>0:30</div>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <h4 style={{ fontFamily: 'Syne', fontSize: '1rem', marginBottom: 6 }}>{preview.reel.title}</h4>
            <p style={{ fontSize: 13, color: 'var(--text2)', marginBottom: '1rem', lineHeight: 1.5 }}>
              A 30-second {style.toLowerCase()} reel optimized for {platform}, with AI-generated visuals, music sync, and auto-captions.
            </p>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: '1rem' }}>
              {[style, platform, '30 sec', 'AI voices', '#trending'].map(t => (
                <span key={t} style={{ fontSize: 11, padding: '3px 9px', borderRadius: 99, background: 'rgba(124,106,255,0.12)', border: '0.5px solid rgba(124,106,255,0.3)', color: '#c4b5fd' }}>{t}</span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {[
                { label: '⬇ Download', onClick: () => onToast('Downloading reel...') },
                { label: '🚀 Publish', onClick: () => onToast('Published to platform!'), green: true },
                { label: '🔗 Share',   onClick: () => onToast('Link copied!') },
              ].map(({ label, onClick, green }) => (
                <button key={label} onClick={onClick} style={{
                  padding: '8px 14px', borderRadius: 8, fontSize: 13,
                  fontFamily: 'DM Sans', cursor: 'pointer',
                  border: `0.5px solid ${green ? 'rgba(34,211,160,0.4)' : 'var(--border2)'}`,
                  background: green ? 'rgba(34,211,160,0.07)' : 'var(--bg3)',
                  color: green ? '#22d3a0' : 'var(--text)',
                  transition: 'background 0.15s',
                }}>{label}</button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateReel;