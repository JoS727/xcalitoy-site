import { useState, useEffect, useRef } from 'react';
import { links, songs } from '../data';

const DJ_SET_MODES = [
  { id: 'night-drive', name: 'Night Drive', desc: 'Dark, moody, slow-burn. The 2am set.', bpms: '85-105' },
  { id: 'warehouse', name: 'Warehouse', desc: 'Industrial, heavy, distorted. The 4am set.', bpms: '125-140' },
  { id: 'after-hours', name: 'After Hours', desc: 'Trip-hop, atmospheric, intimate. The 6am set.', bpms: '90-110' },
  { id: 'come-down', name: 'Come Down', desc: 'Ambient, piano, strings. The 8am set.', bpms: '70-90' },
  { id: 'turn-up', name: 'Turn Up', desc: 'Hard, fast, confrontational. The 10pm set.', bpms: '140-160' },
  { id: 'golden-hour', name: 'Golden Hour', desc: 'Warm, nostalgic, cinematic. The sunset set.', bpms: '100-115' },
];

const SCHEDULE = [
  { time: '6:00 PM', mode: 'golden-hour', label: 'Golden Hour' },
  { time: '8:00 PM', mode: 'turn-up', label: 'Turn Up' },
  { time: '10:00 PM', mode: 'night-drive', label: 'Night Drive' },
  { time: '2:00 AM', mode: 'warehouse', label: 'Warehouse' },
  { time: '4:00 AM', mode: 'after-hours', label: 'After Hours' },
  { time: '6:00 AM', mode: 'come-down', label: 'Come Down' },
  { time: '10:00 AM', mode: 'night-drive', label: 'Night Drive (Daybreak)' },
  { time: '2:00 PM', mode: 'golden-hour', label: 'Golden Hour (Afternoon)' },
  { time: '4:00 PM', mode: 'turn-up', label: 'Turn Up (Pre-Game)' },
];

export default function DJ() {
  const [currentMode, setCurrentMode] = useState('night-drive');
  const [isLive, setIsLive] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const intervalRef = useRef<number | null>(null);

  // Simulate the 24hr rotation
  useEffect(() => {
    const now = new Date();
    const hour = now.getHours();
    
    // Map hour to current mode based on schedule
    if (hour >= 18 || hour < 2) setCurrentMode('night-drive');
    else if (hour >= 2 && hour < 4) setCurrentMode('warehouse');
    else if (hour >= 4 && hour < 6) setCurrentMode('after-hours');
    else if (hour >= 6 && hour < 10) setCurrentMode('come-down');
    else if (hour >= 10 && hour < 14) setCurrentMode('night-drive');
    else if (hour >= 14 && hour < 16) setCurrentMode('golden-hour');
    else if (hour >= 16 && hour < 18) setCurrentMode('turn-up');
  }, []);

  // Simulate track progression
  useEffect(() => {
    if (!isLive) return;
    intervalRef.current = window.setInterval(() => {
      setElapsed((e) => {
        if (e >= 180) {
          setCurrentTrack((t) => (t + 1) % songs.length);
          return 0;
        }
        return e + 1;
      });
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isLive]);

  const mode = DJ_SET_MODES.find((m) => m.id === currentMode) || DJ_SET_MODES[0];
  const track = songs[currentTrack];
  const minutes = Math.floor(elapsed / 60);
  const seconds = (elapsed % 60).toString().padStart(2, '0');

  return (
    <div className="section">
      <div className="container">
        <a href="#/" className="back-link">← Home</a>
        <span className="section__label">XCalitoy Live DJ</span>

        {/* Hero */}
        <div className="dj-hero">
          <div className="dj-hero__visualizer">
            <div className={`dj-visualizer ${isLive ? 'live' : ''}`}>
              {[...Array(32)].map((_, i) => (
                <span key={i} style={{ animationDelay: `${i * 0.05}s` }} />
              ))}
            </div>
          </div>
          <div className="dj-hero__content">
            <h1 className="dj-title">XCALITOY</h1>
            <p className="dj-subtitle">24/7 AI DJ. Live now.</p>
            <p className="dj-description">
              Calitoy's lyrics, repurposed into instrumental sets for parties, late drives,
              and the hours between. Streaming nonstop through the site and YouTube.
              No two sets are the same.
            </p>
            <div className="dj-hero__actions">
              <button
                className={`btn ${isLive ? 'btn--kill' : ''}`}
                onClick={() => setIsLive(!isLive)}
              >
                {isLive ? '■ Stop Stream' : '▶ Go Live'}
              </button>
              <a
                href="https://www.youtube.com/@thatjoemad"
                target="_blank"
                rel="noreferrer"
                className="btn"
              >
                Watch on YouTube
              </a>
            </div>
          </div>
        </div>

        {/* Now Playing */}
        {isLive && (
          <div className="dj-now-playing">
            <div className="dj-np__header">
              <span className="dj-np__live-dot" />
              <span className="dj-np__live-text">LIVE</span>
              <span className="dj-np__time">{minutes}:{seconds}</span>
            </div>
            <div className="dj-np__content">
              <div className="dj-np__mode">
                <span className="dj-np__mode-label">Current Set</span>
                <span className="dj-np__mode-name">{mode.name}</span>
                <span className="dj-np__mode-desc">{mode.desc}</span>
                <span className="dj-np__mode-bpm">{mode.bpms} BPM</span>
              </div>
              <div className="dj-np__track">
                <span className="dj-np__track-label">Repurposing from</span>
                <span className="dj-np__track-title">{track.title}</span>
                <span className="dj-np__track-era">{track.era}</span>
                <p className="dj-np__track-note">
                  Vocal fragments extracted, chopped, and woven into the instrumental.
                  Lyrics used sparingly. The words become texture, not narrative.
                </p>
              </div>
            </div>
            {/* Real SoundCloud player */}
            <div className="dj-np__player">
              <iframe
                ref={iframeRef}
                width="100%"
                height="166"
                scrolling="no"
                frameBorder="no"
                allow="autoplay"
                src={`https://w.soundcloud.com/player/?url=https%3A%2F%2Fsoundcloud.com%2Fcalitoy%2Ftracks&color=%23c4553a&auto_play=true&buying=false&sharing=false&download=false&show_artwork=true&show_playcount=false&show_user=true&hide_related=true&visual=false`}
                title="XCalitoy Live DJ Stream"
              />
            </div>
            <div className="dj-np__progress">
              <div className="dj-np__progress-bar" style={{ width: `${(elapsed / 180) * 100}%` }} />
            </div>
          </div>
        )}

        {/* Set Modes */}
        <div className="dj-section">
          <span className="section__label">Set Modes</span>
          <h2 className="dj-heading">Six states. One continuous stream.</h2>
          <p className="dj-section__desc">
            The AI rotates through six mood-based set modes across 24 hours. Each mode
            reshapes the same catalog into a different energy, tempo, and texture.
          </p>
          <div className="dj-modes-grid">
            {DJ_SET_MODES.map((m) => (
              <div
                key={m.id}
                className={`dj-mode-card ${currentMode === m.id ? 'active' : ''}`}
                onClick={() => setCurrentMode(m.id)}
              >
                <div className="dj-mode-card__name">{m.name}</div>
                <div className="dj-mode-card__desc">{m.desc}</div>
                <div className="dj-mode-card__bpm">{m.bpms} BPM</div>
              </div>
            ))}
          </div>
        </div>

        {/* Schedule */}
        <div className="dj-section">
          <span className="section__label">24hr Schedule</span>
          <h2 className="dj-heading">The rotation.</h2>
          <p className="dj-section__desc">
            The DJ follows a 24-hour cycle, shifting energy with the hours. Peak times
            hit hard. Off-hours get atmospheric. The schedule runs automatically.
          </p>
          <div className="dj-schedule">
            {SCHEDULE.map((s, i) => (
              <div key={i} className="dj-schedule__row">
                <span className="dj-schedule__time">{s.time}</span>
                <span className="dj-schedule__mode">{s.label}</span>
              </div>
            ))}
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
              <p>Fragments are layered over new instrumental beds matching the current set mode. Dark synth, heavy drums, cold textures.</p>
            </div>
            <div className="dj-process__step">
              <div className="dj-process__num">04</div>
              <div className="dj-process__label">Stream</div>
              <p>The set streams live 24/7 through xcalitoy.com and YouTube. No two sets repeat. The catalog recombines endlessly.</p>
            </div>
          </div>
        </div>

        {/* Catalog */}
        <div className="dj-section">
          <span className="section__label">Source Material</span>
          <h2 className="dj-heading">The catalog.</h2>
          <p className="dj-section__desc">
            {songs.length} tracks in the source pool (86 total on SoundCloud). Each one
            contributes vocal fragments, melodic motifs, and lyrical textures to the live sets.
            The full SoundCloud catalog feeds the DJ. What is listed here are the key tracks
            currently driving the rotation.
          </p>
          <div className="dj-catalog">
            {songs.map((song, i) => (
              <div key={song.slug} className="dj-catalog__item">
                <span className="dj-catalog__num">{String(i + 1).padStart(2, '0')}</span>
                <span className="dj-catalog__title">{song.title}</span>
                <span className="dj-catalog__era">{song.era}</span>
              </div>
            ))}
            <a href={links.soundcloud} target="_blank" rel="noreferrer" className="dj-catalog__all">
              View all 86 tracks on SoundCloud →
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
              <p>Embedded live stream player. The DJ plays directly on the site with the visualizer, current track info, and set mode display.</p>
            </div>
            <div className="dj-dist-card">
              <div className="dj-dist-card__icon">▶</div>
              <div className="dj-dist-card__name">YouTube Live</div>
              <p>24/7 live stream on YouTube. The visualizer runs as a continuous video feed. Viewers can chat, request modes, and share.</p>
            </div>
            <div className="dj-dist-card">
              <div className="dj-dist-card__icon">♪</div>
              <div className="dj-dist-card__name">SoundCloud</div>
              <p>Recorded sets uploaded as continuous mixes. The best moments from each 24-hour cycle get archived as listenable episodes.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="dj-cta">
          <h2 className="dj-heading">The DJ never stops.</h2>
          <p className="dj-cta__desc">
            24 hours. 6 set modes. 86 source tracks. Endless recombination.
            The XCalitoy AI DJ runs nonstop so the party never has to.
          </p>
          <div className="dj-cta__actions">
            <button
              className={`btn ${isLive ? 'btn--kill' : ''}`}
              onClick={() => setIsLive(!isLive)}
            >
              {isLive ? '■ Stop Stream' : '▶ Go Live'}
            </button>
            <a
              href="https://www.youtube.com/@thatjoemad"
              target="_blank"
              rel="noreferrer"
              className="btn"
            >
              YouTube Live
            </a>
            <a
              href={links.soundcloud}
              target="_blank"
              rel="noreferrer"
              className="btn"
            >
              SoundCloud
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
