// ── Mock Users (replace with real auth: Firebase / Supabase / Auth0) ──
export const MOCK_USERS = [
  { id: 1, email: 'demo@reelgen.ai', password: 'demo123', name: 'Studio Account', plan: 'Pro' },
];

// ── Reel gradient color pairs ──
export const REEL_COLORS = [
  ['rgba(124,106,255,0.3)', 'rgba(244,114,182,0.2)'],
  ['rgba(34,211,160,0.25)', 'rgba(124,106,255,0.2)'],
  ['rgba(245,158,11,0.25)', 'rgba(244,114,182,0.2)'],
  ['rgba(59,130,246,0.25)', 'rgba(34,211,160,0.2)'],
  ['rgba(244,114,182,0.25)', 'rgba(245,158,11,0.2)'],
  ['rgba(168,85,247,0.25)', 'rgba(59,130,246,0.2)'],
];

// ── Sample reels library ──
export const SAMPLE_REELS = [
  {
    id: 1,
    title: 'Morning Routine Motivation',
    style: 'Cinematic',
    platform: 'Instagram Reels',
    status: 'done',
    views: 12400,
    date: '2d ago',
    colorIdx: 0,
  },
  {
    id: 2,
    title: 'Product Launch Teaser',
    style: 'Corporate',
    platform: 'LinkedIn',
    status: 'done',
    views: 3800,
    date: '3d ago',
    colorIdx: 1,
  },
  {
    id: 3,
    title: 'Sunset Timelapse Vibe',
    style: 'Aesthetic',
    platform: 'TikTok',
    status: 'done',
    views: 28100,
    date: '5d ago',
    colorIdx: 2,
  },
  {
    id: 4,
    title: 'Workout Highlights Reel',
    style: 'Energetic',
    platform: 'YouTube Shorts',
    status: 'done',
    views: 4100,
    date: '6d ago',
    colorIdx: 3,
  },
];

// ── AI Generation pipeline steps ──
export const GEN_STEPS = [
  { label: '🧠 Parsing prompt',     dur: 900 },
  { label: '✍️ Writing script',     dur: 1200 },
  { label: '🎬 Generating scenes',  dur: 2000 },
  { label: '🎵 Adding music',       dur: 1000 },
  { label: '📝 Captions & text',    dur: 900 },
  { label: '🎞️ Rendering video',   dur: 1800 },
  { label: '✅ Finalizing',         dur: 700 },
];

// ── Analytics data ──
export const ANALYTICS_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
export const ANALYTICS_VIEWS = [3200, 5800, 4100, 7600, 6200, 12400, 8900];

export const PLATFORM_STATS = [
  { name: 'Instagram', pct: 48, color: '#7c6aff' },
  { name: 'TikTok',    pct: 31, color: '#f472b6' },
  { name: 'YouTube',   pct: 14, color: '#22d3a0' },
  { name: 'LinkedIn',  pct: 7,  color: '#f59e0b' },
];

// ── Reel options ──
export const STYLE_OPTIONS = ['Cinematic', 'Minimalist', 'Energetic', 'Corporate', 'Aesthetic', 'Documentary'];
export const PLATFORM_OPTIONS = ['Instagram Reels', 'TikTok', 'YouTube Shorts', 'LinkedIn'];
export const VOICE_OPTIONS = ['No voiceover', 'Male (Professional)', 'Female (Warm)', 'AI Narrator'];