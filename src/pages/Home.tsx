import { artistProfile, playlists, songs, links, highlights, journalEntries } from '../data';

const featuredSongs = songs.slice(0, 3);
const archiveSongs = songs.slice(3);

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero__photo-veil" aria-hidden="true" />
        <div className="container hero__grid">
          <div>
            <p className="hero__label">{artistProfile.siteName}</p>
            <h1>Joseph Calitoy</h1>
            <p>
              {artistProfile.tagline} {artistProfile.bio}
            </p>
            <div className="hero__actions">
              <a href={links.spotifyAlbum} target="_blank" rel="noreferrer" className="btn btn--accent">
                Stream Lioness Lost
              </a>
              <a href="#featured" className="btn">Featured tracks</a>
              <a href={links.epk} className="btn">Press kit</a>
            </div>
          </div>

          <div className="hero-panel card hero-panel--photo">
            <div className="hero-panel__image-wrap">
              <img src="/calitoy-cover.jpg" alt="Joseph Calitoy portrait" className="hero-panel__image" />
            </div>
            <div className="hero-panel__content">
              <span className="badge badge--accent" style={{ marginBottom: '1rem' }}>Current mood</span>
              <h3 style={{ fontSize: '1.7rem', marginBottom: '.8rem' }}>{artistProfile.intro}</h3>
              <p style={{ color: 'var(--accent)', fontSize: '.95rem', marginBottom: '.8rem', fontWeight: 600 }}>
                {artistProfile.featuredReleaseNote}
              </p>
              <p style={{ color: 'var(--muted)', fontSize: '.94rem', marginBottom: '1rem', lineHeight: 1.8 }}>
                {artistProfile.knownSourceNote}
              </p>
              <div style={{ display: 'grid', gap: '.85rem' }}>
                {highlights.map((item) => (
                  <div key={item.title} className="mini-stat">
                    <strong>{item.title}</strong>
                    <span>{item.description}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--tight" id="featured">
        <div className="container">
          <div className="eyebrow-row">
            <span className="badge badge--accent">Featured</span>
            <span className="section-rule" />
          </div>
          <h2 className="section-title">Start here</h2>
          <p className="section-copy">
            The records that open the door fastest: intimate, nocturnal, and built to stay with you after the first play.
          </p>

          <div className="grid grid--3">
            {featuredSongs.map((song, index) => (
              <a key={song.slug} href={`#/music/${song.slug}`} className={`card feature-card ${index === 0 ? 'feature-card--primary' : ''}`}>
                <img src={song.coverArt} alt={song.title} className="feature-card__image" />
                <div className="feature-card__body">
                  <div className="feature-card__meta">
                    <span className="badge badge--accent">{song.era}</span>
                    <span className="badge">{song.status.replace('-', ' ')}</span>
                  </div>
                  <h3>{song.title}</h3>
                  <p>{song.summary}</p>
                  <div className="feature-card__tags">
                    {song.themes.map((theme) => (
                      <span key={theme} className="badge">{theme}</span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container grid grid--2 section-split">
          <div className="card statement-card">
            <p className="statement-kicker">Artist statement</p>
            <h2>Built like songs, not filler</h2>
            <p>
              xcalitoy.com is meant to feel authored. Not just links, not just uploads — a proper home for the records, the writing,
              the imagery, and the atmosphere around them.
            </p>
          </div>
          <div className="card statement-card">
            <p className="statement-kicker">For listeners and bookers</p>
            <h2>Everything important is one click away</h2>
            <p>
              Start with the music, open the press kit, read the journal, or reach out directly for collaborations, performances,
              and serious inquiries.
            </p>
            <div className="hero__actions" style={{ marginTop: '1.5rem' }}>
              <a href={links.book} className="btn btn--accent">Book Joseph</a>
              <a href={links.about} className="btn">Read bio</a>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="archive" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className="eyebrow-row">
            <span className="badge badge--accent">Archive</span>
            <span className="section-rule" />
          </div>
          <h2 className="section-title">Catalog</h2>
          <p className="section-copy">
            Singles, story pieces, and fragments from the wider Calitoy universe.
          </p>

          <div className="archive-list">
            {archiveSongs.map((song) => (
              <a key={song.slug} href={`#/music/${song.slug}`} className="archive-row card">
                <div>
                  <p className="archive-row__title">{song.title}</p>
                  <p className="archive-row__summary">{song.summary}</p>
                </div>
                <div className="archive-row__meta">
                  <span className="badge badge--accent">{song.era}</span>
                  <span className="badge">{song.status.replace('-', ' ')}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="playlists" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className="eyebrow-row">
            <span className="badge badge--accent">Playlists</span>
            <span className="section-rule" />
          </div>
          <h2 className="section-title">Selected worlds</h2>
          <p className="section-copy">
            Mood boards in audio form — different doors into the same universe.
          </p>

          <div className="grid grid--2">
            {playlists.map((playlist) => (
              <a key={playlist.slug} href={playlist.soundcloudUrl} target="_blank" rel="noreferrer" className="card playlist-card">
                <div className="badge badge--accent" style={{ marginBottom: '.85rem' }}>SoundCloud playlist</div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '.5rem' }}>{playlist.title}</h3>
                <p style={{ fontSize: '.88rem', color: 'var(--muted)', lineHeight: 1.7 }}>{playlist.summary}</p>
                {playlist.note ? (
                  <p style={{ fontSize: '.8rem', color: 'var(--muted)', marginTop: '.8rem' }}>{playlist.note}</p>
                ) : null}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div className="eyebrow-row">
            <span className="badge badge--accent">Journal</span>
            <span className="section-rule" />
          </div>
          <h2 className="section-title">Notes from the world around the songs</h2>
          <p className="section-copy">
            Short entries that make the site feel lived in, not parked.
          </p>
          <div className="grid grid--2">
            {journalEntries.map((entry) => (
              <a key={entry.slug} href={links.blog} className="card journal-card">
                <span className="badge">{entry.date}</span>
                <h3>{entry.title}</h3>
                <p>{entry.excerpt}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ borderTop: '1px solid var(--border)' }}>
        <div className="container grid grid--3">
          <a href={links.blog} className="card utility-card">
            <h3>Journal</h3>
            <p>Writing, reflections, release notes, and whatever belongs beside the songs.</p>
          </a>
          <a href={links.merch} className="card utility-card">
            <h3>Merch</h3>
            <p>Future drops from Wicked Youth Goods — apparel, accessories, and collector pieces.</p>
          </a>
          <a href={links.book} className="card utility-card">
            <h3>Booking</h3>
            <p>For collaborations, performances, and serious inquiries, reach out directly.</p>
          </a>
        </div>
      </section>
    </>
  );
}
