import { useState, useEffect, useRef, type SyntheticEvent } from 'react';
import { links, songs } from '../data';

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

// The one pre-generated mix that actually exists today (public/night_drive_mix.*).
const DEMO_MIX = {
  name: 'Night Drive Mix',
  mode: 'night-drive' as ModeId,
  bpm: 95,
  sourceTitle: 'Locked Out',
  sourceCredit: 'Kurced · SoundCloud',
  sourceUrl: 'https://soundcloud.com/calitoy/locked-out-wav',
  files: [
    { src: '/night_drive_mix.mp3', type: 'audio/mpeg' },
    { src: '/night_drive_mix.wav', type: 'audio/wav' },
  ],
};

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

export default function DJ() {
  const [scheduledIndex, setScheduledIndex] = useState(() => scheduleIndexForHour(new Date().getHours()));
  const [selectedMode, setSelectedMode] = useState<ModeId>(() => SCHEDULE[scheduledIndex].mode);
  const [isLive, setIsLive] = useState(false);
  const [status, setStatus] = useState<PlaybackStatus>('idle');
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const isPlaying = status === 'playing';
  const scheduledSlot = SCHEDULE[scheduledIndex];

  // Keep the "scheduled now" marker accurate if the page stays open across an hour boundary.
  useEffect(() => {
    const id = window.setInterval(() => setScheduledIndex(scheduleIndexForHour(new Date().getHours())), 60_000);
    return () => window.clearInterval(id);
  }, []);

  // Stop audio if the user navigates away from the page.
  useEffect(() => () => audioRef.current?.pause(), []);

  const startPreview = () => {
    const audio = audioRef.current;
    setIsLive(true);
    if (!audio) return;
    setStatus('loading');
    // play() is called synchronously inside the click handler so mobile browsers treat it as user-initiated.
    audio.play().catch((err: unknown) => {
      const name = err instanceof DOMException ? err.name : '';
      if (name === 'AbortError') return; // stopped before playback began
      setStatus(name === 'NotAllowedError' ? 'blocked' : 'error');
    });
  };

  const stopPreview = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setIsLive(false);
    setStatus('idle');
    setElapsed(0);
  };

  const handleTimeUpdate = (event: SyntheticEvent<HTMLAudioElement>) => {
    const audio = event.currentTarget;
    setElapsed(audio.currentTime);
    if (Number.isFinite(audio.duration)) setDuration(audio.duration);
  };

  const handleDuration = (event: SyntheticEvent<HTMLAudioElement>) => {
    const d = event.currentTarget.duration;
    if (Number.isFinite(d)) setDuration(d);
  };

  const handlePause = (event: SyntheticEvent<HTMLAudioElement>) => {
    // A pause fired by stopPreview() resets to idle there; only mark "paused" while the panel is open.
    if (isLive && !event.currentTarget.ended) setStatus('paused');
  };

  const handleError = () => setStatus('error');

  const togglePreview = () => (isLive ? stopPreview() : startPreview());

  const mixMode = DJ_SET_MODES.find((m) => m.id === DEMO_MIX.mode) ?? DJ_SET_MODES[0];
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
              <strong>DEMO MODE</strong> — One pre-generated Night Drive mix is available to preview.
              The 24/7 stream and YouTube channel are coming soon.
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

        {/* Now Playing — kept mounted so the <audio> element exists when Play is clicked */}
        <div className="dj-now-playing" hidden={!isLive} aria-live="polite">
          <div className="dj-np__header">
            <span className={`dj-np__live-dot ${isPlaying ? '' : 'paused'}`} />
            <span className={`dj-np__live-text ${isPlaying ? '' : 'is-idle'}`}>{STATUS_LABEL[status]}</span>
            <span className="dj-np__time">
              {formatTime(elapsed)}{duration ? ` / ${formatTime(duration)}` : ''}
            </span>
          </div>
          <div className="dj-np__content">
            <div className="dj-np__mode">
              <span className="dj-np__mode-label">Now Previewing</span>
              <span className="dj-np__mode-name">{DEMO_MIX.name}</span>
              <span className="dj-np__mode-desc">{mixMode.desc}</span>
              <span className="dj-np__mode-bpm">{DEMO_MIX.bpm} BPM · {mixMode.name} mode</span>
            </div>
            <div className="dj-np__track">
              <span className="dj-np__track-label">Repurposed from</span>
              <a className="dj-np__track-title" href={DEMO_MIX.sourceUrl} target="_blank" rel="noreferrer">
                {DEMO_MIX.sourceTitle}
              </a>
              <span className="dj-np__track-era">{DEMO_MIX.sourceCredit}</span>
              <p className="dj-np__track-note">
                A {DEMO_MIX.bpm} BPM Night Drive remix of {DEMO_MIX.sourceTitle}, generated as the first
                AI DJ demo. It loops until you stop it.
              </p>
            </div>
          </div>
          <div className="dj-np__player">
            <div className="dj-stream-live">
              <audio
                ref={audioRef}
                controls
                loop
                preload="none"
                onPlaying={() => setStatus('playing')}
                onWaiting={() => setStatus('loading')}
                onPause={handlePause}
                onTimeUpdate={handleTimeUpdate}
                onDurationChange={handleDuration}
                onLoadedMetadata={handleDuration}
                onError={handleError}
              >
                {DEMO_MIX.files.map((file, i) => (
                  <source
                    key={file.src}
                    src={file.src}
                    type={file.type}
                    onError={i === DEMO_MIX.files.length - 1 ? handleError : undefined}
                  />
                ))}
                Your browser does not support HTML audio.
              </audio>
              {status === 'error' ? (
                <p className="dj-stream-note dj-stream-note--error">
                  The demo mix could not be loaded. Please refresh and try again.
                </p>
              ) : (
                <p className="dj-stream-note">
                  Demo preview: this single mix loops on repeat. The full site stream and YouTube channel are launching soon.
                </p>
              )}
              <a href={DEMO_MIX.sourceUrl} target="_blank" rel="noreferrer" className="dj-stream-link">
                Hear the original on SoundCloud →
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
            Only Night Drive has a demo mix today.
          </p>
          <div className="dj-modes-grid">
            {DJ_SET_MODES.map((m) => (
              <button
                type="button"
                key={m.id}
                className={`dj-mode-card ${selectedMode === m.id ? 'active' : ''}`}
                onClick={() => setSelectedMode(m.id)}
                aria-pressed={selectedMode === m.id}
              >
                <span className="dj-mode-card__tags">
                  {scheduledSlot.mode === m.id && <span className="dj-tag dj-tag--now">Scheduled now</span>}
                  {DEMO_MIX.mode === m.id && <span className="dj-tag">Demo available</span>}
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
                >
                  <span className="dj-schedule__time">{s.time}</span>
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
              <p>A looping Night Drive demo is available now. The full site stream and live set display are launching soon.</p>
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
    </div>
  );
}
