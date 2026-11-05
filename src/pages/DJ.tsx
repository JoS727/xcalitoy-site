import { useState, useEffect, useRef } from 'react';
import { links, songs } from '../data';
import { loadSoundCloudApi, soundCloudEmbedUrl, type SCProgress, type SCSound, type SCWidget } from '../lib/soundcloudWidget';

type ModeId = 'night-drive' | 'warehouse' | 'after-hours' | 'come-down' | 'turn-up' | 'golden-hour';

const DJ_SET_MODES: { id: ModeId; name: string; desc: string; bpms: string }[] = [
  { id: 'night-drive', name: 'Night Drive', desc: 'Dark, moody, slow-burn. The late-night set.', bpms: '85-105' },
  { id: 'warehouse', name: 'Warehouse', desc: 'Industrial, heavy, distorted. The 2am set.', bpms: '125-140' },
  { id: 'after-hours', name: 'After Hours', desc: 'Trip-hop, atmospheric, intimate. The 4am set.', bpms: '90-110' },
  { id: 'come-down', name: 'Come Down', desc: 'Ambient, piano, strings. The 6am set.', bpms: '70-90' },
  { id: 'turn-up', name: 'Turn Up', desc: 'Hard, fast, confrontational. The 8pm set.', bpms: '140-160' },
  { id: 'golden-hour', name: 'Golden Hour', desc: 'Warm, nostalgic, cinematic. The sunset set.', bpms: '100-115' },
];

// Planned rotation. `start` is the local hour (0-23) each slot begins; a slot runs until the next one.
const SCHEDULE: { start: number; time: string; mode: ModeId; label: string }[] = [
  { start: 18, time: '6:00 PM', mode: 'golden-hour', label: 'Golden Hour' },
  { start: 20, time: '8:00 PM', mode: 'turn-up', label: 'Turn Up' },
  { start: 22, time: '10:00 PM', mode: 'night-drive', label: 'Night Drive' },
  { start: 2, time: '2:00 AM', mode: 'warehouse', label: 'Warehouse' },
  { start: 4, time: '4:00 AM', mode: 'after-hours', label: 'After Hours' },
  { start: 6, time: '6:00 AM', mode: 'come-down', label: 'Come Down' },
  { start: 10, time: '10:00 AM', mode: 'night-drive', label: 'Night Drive (Daybreak)' },
  { start: 14, time: '2:00 PM', mode: 'golden-hour', label: 'Golden Hour (Afternoon)' },
  { start: 16, time: '4:00 PM', mode: 'turn-up', label: 'Turn Up (Pre-Game)' },
];

// Preview audio streams from the real SoundCloud catalog through a hidden Widget API embed.
const CATALOG_URL = links.soundcloud;
const CATALOG_EMBED_SRC = soundCloudEmbedUrl(CATALOG_URL);

// Rough mood hints per set mode, matched against SoundCloud genre / tags / title.
// Tracks with more hits are queued first; the rest follow in a stable per-mode shuffle,
// so every mode can play the whole catalog but each opens with a different feel.
const MODE_KEYWORDS: Record<ModeId, string[]> = {
  'night-drive': ['night', 'drive', 'dark', 'synth', 'r&b', 'rnb', 'moody', 'slow', 'alone', 'shadow'],
  warehouse: ['industrial', 'techno', 'electronic', 'edm', 'house', 'heavy', 'distort', 'bass', 'dance'],
  'after-hours': ['trip', 'lofi', 'lo-fi', 'atmospheric', 'chill', 'soul', 'jazz', 'late', 'dream'],
  'come-down': ['ambient', 'piano', 'acoustic', 'strings', 'ballad', 'classical', 'soft', 'sad', 'home'],
  'turn-up': ['hip hop', 'hip-hop', 'rap', 'trap', 'drill', 'hard', 'rock', 'punk', 'metal', 'rich'],
  'golden-hour': ['pop', 'indie', 'sun', 'gold', 'happy', 'love', 'summer', 'warm', 'world', 'cinematic'],
};

function hashString(input: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** Widget sound indices in play order for a set mode. */
function buildModeQueue(sounds: SCSound[], mode: ModeId): number[] {
  const keywords = MODE_KEYWORDS[mode];
  return sounds
    .map((sound, i) => {
      const hay = `${sound.genre ?? ''} ${sound.tag_list ?? ''} ${sound.title ?? ''}`.toLowerCase();
      const score = keywords.reduce((acc, k) => acc + (hay.includes(k) ? 1 : 0), 0);
      return { i, score, h: hashString(`${mode}:${sound.id ?? i}`) };
    })
    .sort((a, b) => b.score - a.score || a.h - b.h)
    .map((x) => x.i);
}

interface NowTrack {
  title: string;
  artist: string;
  url: string;
  genre?: string;
}

const VISUALIZER_BARS = Array.from({ length: 32 }, (_, i) => ({
  // Negative delays start each bar mid-cycle, so paused bars still show a staggered waveform.
  delay: `-${(i * 0.13).toFixed(2)}s`,
  duration: `${(0.6 + ((i * 7) % 5) * 0.12).toFixed(2)}s`,
}));

type PlaybackStatus = 'idle' | 'loading' | 'playing' | 'paused' | 'blocked' | 'error';

/** Index of the SCHEDULE slot covering the given local hour. */
function scheduleIndexForHour(hour: number): number {
  let best = -1;
  SCHEDULE.forEach((slot, i) => {
    if (slot.start <= hour && (best === -1 || slot.start > SCHEDULE[best].start)) best = i;
  });
  if (best !== -1) return best;
  // Before the earliest slot of the day (00:00-01:59): the latest slot from the previous evening still runs.
  return SCHEDULE.reduce((acc, slot, i) => (slot.start > SCHEDULE[acc].start ? i : acc), 0);
}

/** Slot index that follows `index` in chronological (wrap-around) order. */
function nextScheduleIndex(index: number): number {
  const order = SCHEDULE.map((slot, i) => ({ start: slot.start, i })).sort((a, b) => a.start - b.start);
  const pos = order.findIndex((o) => o.i === index);
  return order[(pos + 1) % order.length].i;
}

function formatHour(hour: number): string {
  const h = hour % 12 === 0 ? 12 : hour % 12;
  return `${h}:00 ${hour < 12 ? 'AM' : 'PM'}`;
}

function formatClock(date: Date): string {
  return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
}

/** "1h 25m" until the given hour (today or tomorrow). */
function timeUntilHour(now: Date, hour: number): string {
  const target = new Date(now);
  target.setHours(hour, 0, 0, 0);
  if (target <= now) target.setDate(target.getDate() + 1);
  const mins = Math.max(1, Math.round((target.getTime() - now.getTime()) / 60_000));
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return h ? `${h}h ${m}m` : `${m}m`;
}

function formatTime(totalSeconds: number): string {
  const safe = Number.isFinite(totalSeconds) && totalSeconds > 0 ? Math.floor(totalSeconds) : 0;
  return `${Math.floor(safe / 60)}:${String(safe % 60).padStart(2, '0')}`;
}

const STATUS_LABEL: Record<PlaybackStatus, string> = {
  idle: 'READY',
  loading: 'LOADING',
  playing: 'PREVIEW PLAYING',
  paused: 'PAUSED',
  blocked: 'TAP PLAY TO START',
  error: 'AUDIO UNAVAILABLE',
};

// If the widget hasn't reported PLAY this long after a play request, the browser most likely blocked it.
const PLAY_TIMEOUT_MS = 8000;

export default function DJ() {
  const [now, setNow] = useState(() => new Date());
  const scheduledIndex = scheduleIndexForHour(now.getHours());
  const [selectedMode, setSelectedMode] = useState<ModeId>(() => SCHEDULE[scheduledIndex].mode);
  const [panelInView, setPanelInView] = useState(true);
  const [isLive, setIsLive] = useState(false);
  const [status, setStatus] = useState<PlaybackStatus>('idle');
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [track, setTrack] = useState<NowTrack | null>(null);
  const [catalogSize, setCatalogSize] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  // Widget callbacks are bound once, so everything they read lives in refs.
  const widgetRef = useRef<SCWidget | null>(null);
  const widgetReadyRef = useRef(false);
  const apiFailedRef = useRef(false);
  const soundsRef = useRef<SCSound[]>([]);
  const queueRef = useRef<number[]>([]);
  const queuePosRef = useRef(0);
  const currentIndexRef = useRef(-1);
  const isLiveRef = useRef(false);
  const modeRef = useRef<ModeId>(selectedMode);
  const pendingPlayRef = useRef(false);
  const playTimerRef = useRef<number | null>(null);

  const isPlaying = status === 'playing';
  const scheduledSlot = SCHEDULE[scheduledIndex];
  const nextSlot = SCHEDULE[nextScheduleIndex(scheduledIndex)];
  const scheduledMode = DJ_SET_MODES.find((m) => m.id === scheduledSlot.mode) ?? DJ_SET_MODES[0];

  // Local clock drives the "on air" block; refresh every 30s so it flips right at the hour.
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 30_000);
    return () => window.clearInterval(id);
  }, []);

  // Show the floating mini-player only while the Now Playing panel is scrolled out of view.
  useEffect(() => {
    const el = panelRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([entry]) => setPanelInView(entry.isIntersecting), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, [isLive]);

  // Lock-screen / notification metadata on supporting browsers.
  useEffect(() => {
    if (!isLive || !('mediaSession' in navigator) || typeof MediaMetadata === 'undefined') return;
    const mode = DJ_SET_MODES.find((m) => m.id === selectedMode) ?? DJ_SET_MODES[0];
    navigator.mediaSession.metadata = new MediaMetadata({
      title: track?.title ?? `${mode.name} set`,
      artist: track?.artist ?? 'XCalitoy AI DJ',
      album: `XCalitoy AI DJ · ${mode.name}`,
      artwork: [{ src: '/xcalitoy-album-cover.jpg', sizes: '512x512', type: 'image/jpeg' }],
    });
  }, [isLive, track, selectedMode]);

  const clearPlayTimer = () => {
    if (playTimerRef.current !== null) window.clearTimeout(playTimerRef.current);
    playTimerRef.current = null;
  };

  const armPlayTimer = () => {
    clearPlayTimer();
    playTimerRef.current = window.setTimeout(() => {
      if (isLiveRef.current) setStatus('blocked');
    }, PLAY_TIMEOUT_MS);
  };

  /** Pull title / artist / duration for whatever the widget is on now. */
  const refreshTrack = () => {
    const w = widgetRef.current;
    if (!w) return;
    w.getCurrentSound((sound) => {
      if (!sound) return;
      setTrack({
        title: sound.title || 'Untitled',
        artist: sound.publisher_metadata?.artist || sound.user?.username || 'Calitoy',
        url: sound.permalink_url || CATALOG_URL,
        genre: sound.genre || undefined,
      });
      if (sound.duration) setDuration(sound.duration / 1000);
    });
    w.getDuration((ms) => ms > 0 && setDuration(ms / 1000));
    w.getCurrentSoundIndex((index) => {
      currentIndexRef.current = index;
      const pos = queueRef.current.indexOf(index);
      if (pos >= 0) queuePosRef.current = pos;
    });
  };

  /** Play the sound at `pos` in the current mode queue. */
  const playQueuePos = (pos: number) => {
    const w = widgetRef.current;
    const queue = queueRef.current;
    if (!w) return;
    armPlayTimer();
    if (!queue.length) {
      w.play();
      return;
    }
    const safePos = ((pos % queue.length) + queue.length) % queue.length;
    queuePosRef.current = safePos;
    const index = queue[safePos];
    setElapsed(0);
    if (index === currentIndexRef.current) {
      w.play();
    } else {
      currentIndexRef.current = index;
      w.skip(index);
      w.play();
    }
  };

  const advanceTrack = () => playQueuePos(queuePosRef.current + 1);

  // Load the Widget API and wire SoundCloud events into React state.
  useEffect(() => {
    let cancelled = false;
    let events: string[] = [];
    let syncTimer: number | undefined;
    loadSoundCloudApi()
      .then((SC) => {
        if (cancelled || !iframeRef.current) return;
        const w = SC.Widget(iframeRef.current);
        widgetRef.current = w;
        const E = SC.Widget.Events;
        events = [E.READY, E.PLAY, E.PAUSE, E.FINISH, E.PLAY_PROGRESS, E.ERROR];

        // A profile URL loads its track list in batches (first ~6 at READY, the rest a few
        // seconds later), so keep re-reading it until the count settles.
        const syncSounds = (attempt: number) => {
          if (cancelled) return;
          w.getSounds((sounds) => {
            if (cancelled) return;
            const list = sounds || [];
            const grew = list.length > soundsRef.current.length;
            if (grew || attempt === 0) {
              soundsRef.current = list;
              setCatalogSize(list.length);
              queueRef.current = buildModeQueue(list, modeRef.current);
              // Keep the queue position on the track that's already playing.
              const pos = queueRef.current.indexOf(currentIndexRef.current);
              queuePosRef.current = isLiveRef.current && pos >= 0 ? pos : 0;
            }
            if (attempt === 0) {
              widgetReadyRef.current = true;
              if (pendingPlayRef.current && isLiveRef.current) {
                pendingPlayRef.current = false;
                playQueuePos(0);
              }
            }
            if (attempt < 10) syncTimer = window.setTimeout(() => syncSounds(attempt + 1), 2000);
          });
        };

        w.bind(E.READY, () => {
          w.getCurrentSoundIndex((i) => { currentIndexRef.current = i; });
          syncSounds(0);
        });
        w.bind(E.PLAY, () => {
          clearPlayTimer();
          if (!isLiveRef.current) {
            w.pause();
            return;
          }
          setStatus('playing');
          refreshTrack();
        });
        w.bind(E.PAUSE, () => {
          // stopPreview() clears isLiveRef first, so its own pause doesn't flip us to "paused".
          if (isLiveRef.current) setStatus('paused');
        });
        w.bind(E.FINISH, () => {
          if (isLiveRef.current) advanceTrack();
        });
        w.bind(E.PLAY_PROGRESS, (data) => {
          const p = data as SCProgress | undefined;
          if (p && Number.isFinite(p.currentPosition)) setElapsed(p.currentPosition / 1000);
        });
        w.bind(E.ERROR, () => {
          if (isLiveRef.current) setStatus('error');
        });
      })
      .catch(() => {
        apiFailedRef.current = true;
        if (!cancelled && isLiveRef.current) setStatus('error');
      });

    return () => {
      cancelled = true;
      clearPlayTimer();
      window.clearTimeout(syncTimer);
      const w = widgetRef.current;
      if (w) {
        try {
          w.pause();
          events.forEach((e) => w.unbind(e));
        } catch {
          /* iframe already gone */
        }
      }
      widgetRef.current = null;
      widgetReadyRef.current = false;
    };
    // Bound once; handlers read refs only.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Changing the set mode rebuilds the rotation; if a preview is running, jump to the new mode's first track.
  useEffect(() => {
    if (modeRef.current === selectedMode) return;
    modeRef.current = selectedMode;
    if (!soundsRef.current.length) return;
    queueRef.current = buildModeQueue(soundsRef.current, selectedMode);
    queuePosRef.current = 0;
    if (isLiveRef.current) playQueuePos(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMode]);

  const startPreview = () => {
    isLiveRef.current = true;
    setIsLive(true);
    setStatus('loading');
    // Bring the panel into view on small screens, where it renders below the fold.
    window.requestAnimationFrame(() => panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }));
    if (apiFailedRef.current) {
      setStatus('error');
      return;
    }
    if (!widgetRef.current || !widgetReadyRef.current) {
      // Widget still loading: start as soon as READY fires.
      pendingPlayRef.current = true;
      armPlayTimer();
      return;
    }
    // play() goes out synchronously inside the click handler so mobile browsers treat it as user-initiated.
    playQueuePos(queuePosRef.current);
  };

  const stopPreview = () => {
    isLiveRef.current = false;
    pendingPlayRef.current = false;
    clearPlayTimer();
    const w = widgetRef.current;
    if (w) {
      w.pause();
      w.seekTo(0);
    }
    setIsLive(false);
    setStatus('idle');
    setElapsed(0);
  };

  const togglePreview = () => (isLive ? stopPreview() : startPreview());

  const togglePause = () => {
    const w = widgetRef.current;
    if (!w) return;
    if (isPlaying) {
      w.pause();
    } else {
      armPlayTimer();
      w.play();
    }
  };

  const mixMode = DJ_SET_MODES.find((m) => m.id === selectedMode) ?? DJ_SET_MODES[0];
  const trackUrl = track?.url ?? CATALOG_URL;
  const progress = duration ? Math.min((elapsed / duration) * 100, 100) : 0;

  const previewButton = (
    <button type="button" className={`btn ${isLive ? 'btn--kill' : ''}`} onClick={togglePreview} aria-pressed={isLive}>
      {isLive ? '■ Stop Preview' : '▶ Play Preview'}
    </button>
  );

  const youtubeComingSoon = (
    <span className="dj-coming-soon" title="Our YouTube channel is launching soon.">
      <button type="button" className="btn" disabled>YouTube — Coming Soon</button>
    </span>
  );

  return (
    <div className="section">
      <div className="container">
        <a href="#/" className="back-link">← Home</a>
        <span className="section__label">XCalitoy AI DJ</span>

        {/* Hero */}
        <div className="dj-hero">
          <div className="dj-hero__visualizer" aria-hidden="true">
            <div className={`dj-visualizer ${isPlaying ? 'live' : ''}`}>
              {VISUALIZER_BARS.map((bar, i) => (
                <span key={i} style={{ animationDelay: bar.delay, animationDuration: bar.duration }} />
              ))}
            </div>
          </div>
          <div className="dj-hero__content">
            <h1 className="dj-title">XCALITOY</h1>
            <p className="dj-subtitle">AI DJ preview. Full stream launching soon.</p>
            <p className="dj-demo-banner">
              <span className="dj-live-soon"><span className="dj-live-soon__dot" aria-hidden="true" />Live soon</span>
              <strong>DEMO MODE</strong> — Preview real tracks from the Kurced SoundCloud catalog,
              rotated by set mode. The 24/7 stream and YouTube channel are coming soon.
            </p>
            <p className="dj-description">
              Calitoy's catalog, repurposed into instrumental sets for parties, late drives,
              and the hours between.
            </p>
            <div className="dj-hero__actions">
              {previewButton}
              {youtubeComingSoon}
            </div>
          </div>
        </div>

        {/* On-air clock: which block of the planned rotation matches the visitor's local time */}
        <div className="dj-onair">
          <div className="dj-onair__block">
            <span className="dj-onair__label">Your local time</span>
            <span className="dj-onair__value">{formatClock(now)}</span>
          </div>
          <div className="dj-onair__block dj-onair__block--main">
            <span className="dj-onair__label">
              <span className="dj-onair__dot" aria-hidden="true" /> Scheduled now
            </span>
            <span className="dj-onair__value dj-onair__value--accent">{scheduledSlot.label}</span>
            <span className="dj-onair__meta">
              {formatHour(scheduledSlot.start)} – {formatHour(nextSlot.start)} · {scheduledMode.bpms} BPM
            </span>
          </div>
          <div className="dj-onair__block">
            <span className="dj-onair__label">Up next</span>
            <span className="dj-onair__value">{nextSlot.label}</span>
            <span className="dj-onair__meta">in {timeUntilHour(now, nextSlot.start)}</span>
          </div>
        </div>

        {/* Hidden SoundCloud player: the actual audio source. Its native UI is never shown;
            the custom controls below drive it through the Widget API. */}
        <iframe
          ref={iframeRef}
          className="dj-sc-frame"
          src={CATALOG_EMBED_SRC}
          title="SoundCloud catalog player"
          allow="autoplay; encrypted-media"
          aria-hidden="true"
          tabIndex={-1}
          height={0}
          width={1}
          style={{ position: 'absolute', left: '-9999px', width: 1, height: 0, border: 0, opacity: 0, pointerEvents: 'none' }}
        />

        {/* Now Playing — kept mounted so the panel can be scrolled into view as soon as Play is clicked */}
        <div className="dj-now-playing" hidden={!isLive} ref={panelRef}>
          <div className="dj-np__header">
            <span className={`dj-np__live-dot ${isPlaying ? '' : 'paused'}`} />
            {/* Only the status is announced — announcing the ticking timer would spam screen readers. */}
            <span className={`dj-np__live-text ${isPlaying ? '' : 'is-idle'}`} role="status" aria-live="polite">
              {STATUS_LABEL[status]}
            </span>
            <span className="dj-np__time">
              {formatTime(elapsed)}{duration ? ` / ${formatTime(duration)}` : ''}
            </span>
          </div>
          <div className="dj-np__content">
            <div className="dj-np__mode">
              <span className="dj-np__mode-label">Now Previewing</span>
              <span className="dj-np__mode-name">{mixMode.name} Set</span>
              <span className="dj-np__mode-desc">{mixMode.desc}</span>
              <span className="dj-np__mode-bpm">{mixMode.bpms} BPM · {mixMode.name} mode</span>
            </div>
            <div className="dj-np__track">
              <span className="dj-np__track-label">Now Playing</span>
              <a className="dj-np__track-title" href={trackUrl} target="_blank" rel="noreferrer">
                {track?.title ?? (status === 'error' ? 'Unavailable' : 'Loading track…')}
              </a>
              <span className="dj-np__track-era">
                {track ? `${track.artist}${track.genre ? ` · ${track.genre}` : ''} · SoundCloud` : 'Kurced · SoundCloud'}
              </span>
              <p className="dj-np__track-note">
                Rotating through {catalogSize ? `${catalogSize} tracks from ` : ''}the catalog for the {mixMode.name} set.
                When a track ends, the next one starts automatically.
              </p>
            </div>
          </div>
          <div className="dj-np__player">
            <div className="dj-stream-live">
              {status === 'error' ? (
                <p className="dj-stream-note dj-stream-note--error">
                  The SoundCloud catalog could not be loaded. Please refresh and try again.
                </p>
              ) : (
                <p className="dj-stream-note">
                  Streaming from the real Kurced SoundCloud catalog. Full 24/7 stream launching soon.
                </p>
              )}
              <a href={trackUrl} target="_blank" rel="noreferrer" className="dj-stream-link">
                {track ? 'Hear this track on SoundCloud →' : 'Open the catalog on SoundCloud →'}
              </a>
            </div>
          </div>
          <div className="dj-np__progress">
            <div className="dj-np__progress-bar" style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Set Modes */}
        <div className="dj-section">
          <span className="section__label">Set Modes</span>
          <h2 className="dj-heading">Six states. One future stream.</h2>
          <p className="dj-section__desc">
            The planned 24-hour rotation spans six mood-based set modes. Each mode will
            reshape the same catalog into a different energy, tempo, and texture.
            Pick a mode to preview it with real tracks from the catalog.
          </p>
          <div className="dj-modes-grid">
            {DJ_SET_MODES.map((m) => (
              <button
                type="button"
                key={m.id}
                className={`dj-mode-card ${selectedMode === m.id ? 'active' : ''} ${scheduledSlot.mode === m.id ? 'is-now' : ''}`}
                onClick={() => setSelectedMode(m.id)}
                aria-pressed={selectedMode === m.id}
              >
                <span className="dj-mode-card__tags">
                  {scheduledSlot.mode === m.id && <span className="dj-tag dj-tag--now">Scheduled now</span>}
                  {isLive && selectedMode === m.id && <span className="dj-tag">Previewing</span>}
                </span>
                <span className="dj-mode-card__name">{m.name}</span>
                <span className="dj-mode-card__desc">{m.desc}</span>
                <span className="dj-mode-card__bpm">{m.bpms} BPM</span>
              </button>
            ))}
          </div>
        </div>

        {/* Schedule */}
        <div className="dj-section">
          <span className="section__label">Planned 24hr Schedule</span>
          <h2 className="dj-heading">The rotation.</h2>
          <p className="dj-section__desc">
            The planned DJ schedule follows a 24-hour cycle in your local time, shifting energy
            with the hours. Peak times hit hard. Off-hours get atmospheric.
          </p>
          <div className="dj-schedule">
            {SCHEDULE.map((s, i) => {
              const isNow = i === scheduledIndex;
              const isSelected = s.mode === selectedMode;
              return (
                <div
                  key={s.time}
                  className={`dj-schedule__row ${isNow ? 'is-now' : ''} ${isSelected ? 'is-selected' : ''}`}
                  aria-current={isNow ? 'time' : undefined}
                >
                  <span className="dj-schedule__time">
                    {s.time}
                    <span className="dj-schedule__until"> – {formatHour(SCHEDULE[nextScheduleIndex(i)].start)}</span>
                  </span>
                  <span className="dj-schedule__mode">
                    {s.label}
                    {isNow && <span className="dj-tag dj-tag--now">Scheduled now</span>}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* How It Works */}
        <div className="dj-section">
          <span className="section__label">How It Works</span>
          <h2 className="dj-heading">Lyrics become texture.</h2>
          <div className="dj-process">
            <div className="dj-process__step">
              <div className="dj-process__num">01</div>
              <div className="dj-process__label">Extract</div>
              <p>Vocal stems from existing Calitoy tracks are isolated and analyzed for tone, pitch, and emotional weight.</p>
            </div>
            <div className="dj-process__step">
              <div className="dj-process__num">02</div>
              <div className="dj-process__label">Chop</div>
              <p>Phrases are cut into fragments. A word, a breath, a held vowel. The pieces become percussive, melodic, or atmospheric.</p>
            </div>
            <div className="dj-process__step">
              <div className="dj-process__num">03</div>
              <div className="dj-process__label">Rebuild</div>
              <p>Fragments are layered over new instrumental beds matching the set mode. Dark synth, heavy drums, cold textures.</p>
            </div>
            <div className="dj-process__step">
              <div className="dj-process__num">04</div>
              <div className="dj-process__label">Stream</div>
              <p>The full 24/7 stream through xcalitoy.com and YouTube is launching soon. No two sets are planned to repeat.</p>
            </div>
          </div>
        </div>

        {/* Catalog */}
        <div className="dj-section">
          <span className="section__label">Source Material</span>
          <h2 className="dj-heading">The catalog.</h2>
          <p className="dj-section__desc">
            {songs.length} key tracks planned for the rotation, with the full SoundCloud catalog
            planned to feed the DJ. Each one can contribute vocal fragments, melodic motifs, and
            lyrical textures to future sets.
          </p>
          <div className="dj-catalog">
            {songs.map((song, i) => (
              <a key={song.slug} href={`#/music/${song.slug}`} className="dj-catalog__item">
                <span className="dj-catalog__num">{String(i + 1).padStart(2, '0')}</span>
                <span className="dj-catalog__title">{song.title}</span>
                <span className="dj-catalog__era">{song.era}</span>
              </a>
            ))}
            <a href={links.soundcloud} target="_blank" rel="noreferrer" className="dj-catalog__all">
              View the full catalog on SoundCloud →
            </a>
          </div>
        </div>

        {/* Distribution */}
        <div className="dj-section">
          <span className="section__label">Distribution</span>
          <h2 className="dj-heading">Where it streams.</h2>
          <div className="dj-distribution">
            <div className="dj-dist-card">
              <div className="dj-dist-card__icon">●</div>
              <div className="dj-dist-card__name">xcalitoy.com</div>
              <p>A preview player streaming the real SoundCloud catalog is available now. The full site stream and live set display are launching soon.</p>
            </div>
            <div className="dj-dist-card">
              <div className="dj-dist-card__icon">▶</div>
              <div className="dj-dist-card__name">YouTube — Coming Soon</div>
              <p>The YouTube channel and 24/7 live stream are launching soon.</p>
            </div>
            <div className="dj-dist-card">
              <div className="dj-dist-card__icon">♪</div>
              <div className="dj-dist-card__name">SoundCloud</div>
              <p>Recorded sets and listenable episodes are planned for SoundCloud.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="dj-cta">
          <h2 className="dj-heading">The DJ is warming up.</h2>
          <p className="dj-cta__desc">
            6 planned set modes. The full SoundCloud catalog as source. Endless recombination.
            The full XCalitoy AI DJ stream is launching soon.
          </p>
          <div className="dj-cta__actions">
            {previewButton}
            {youtubeComingSoon}
            <a href={links.soundcloud} target="_blank" rel="noreferrer" className="btn">
              SoundCloud
            </a>
          </div>
        </div>
      </div>

      {/* Floating mini-player while the Now Playing panel is off-screen */}
      {isLive && !panelInView && (
        <div className="dj-mini" role="region" aria-label="Mini player">
          <span className={`dj-np__live-dot ${isPlaying ? '' : 'paused'}`} aria-hidden="true" />
          <div className="dj-mini__info">
            <span className="dj-mini__title">{track ? `${track.title} — ${track.artist}` : `${mixMode.name} Set`}</span>
            <span className="dj-mini__meta">{STATUS_LABEL[status]} · {formatTime(elapsed)}</span>
          </div>
          <button type="button" className="dj-mini__btn" onClick={togglePause} aria-label={isPlaying ? 'Pause' : 'Play'}>
            {isPlaying ? '❚❚' : '▶'}
          </button>
          <button type="button" className="dj-mini__btn dj-mini__btn--stop" onClick={stopPreview} aria-label="Stop preview">
            ■
          </button>
          <span className="dj-mini__progress" style={{ width: `${progress}%` }} aria-hidden="true" />
        </div>
      )}
    </div>
  );
}
