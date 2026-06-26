import { artistProfile, galleryImages, links, songs, playlists } from '../data';

export default function EPK() {
  return (
    <div className="container section">
      <a href="#/" className="back-link">← Home</a>
      <div className="eyebrow-row" style={{ marginBottom: '1.5rem' }}>
        <span className="badge badge--accent">EPK</span>
        <span className="section-rule" />
      </div>

      <div className="grid" style={{ gap: '1rem' }}>
        <div className="card" style={{ padding: '1.75rem' }}>
          <p className="statement-kicker">Electronic press kit</p>
          <h1 style={{ fontSize: 'clamp(2rem,5vw,3.4rem)', marginBottom: '1rem' }}>{artistProfile.name}</h1>
          <p style={{ color: 'var(--muted)', maxWidth: '44rem', lineHeight: 1.9 }}>
            Joseph Calitoy is a California recording artist and world-builder creating moody, melodic records under the CaliToy name. His music
            blends confession, tension, ambition, and atmosphere into songs that feel both intimate and cinematic.
          </p>
        </div>


        <div className="card" style={{ padding: '1.5rem' }}>
          <p className="badge badge--accent" style={{ marginBottom: '.9rem' }}>Press photos</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '.75rem' }}>
            {galleryImages.slice(0, 6).map((image) => (
              <img key={image.src} src={image.src} alt={image.alt} style={{ width: '100%', aspectRatio: '3 / 4', objectFit: 'cover', borderRadius: '.9rem', border: '1px solid var(--border)' }} />
            ))}
          </div>
        </div>

        <div className="grid grid--2">
          <div className="card" style={{ padding: '1.5rem' }}>
            <p className="badge badge--accent" style={{ marginBottom: '.9rem' }}>Short bio</p>
            <p style={{ color: 'var(--muted)', lineHeight: 1.85 }}>
              Calitoy builds songs like scenes: emotionally direct, sonically immersive, and grounded in a strong visual identity. xcalitoy.com
              serves as the official home for releases, lyrics, archive material, and future drops.
            </p>
          </div>
          <div className="card" style={{ padding: '1.5rem' }}>
            <p className="badge badge--accent" style={{ marginBottom: '.9rem' }}>Contact</p>
            <div className="links-grid" style={{ gridTemplateColumns: '1fr' }}>
              <a href={links.book} className="link-card">
                <div className="link-card__title">Booking / Collaboration</div>
                <div className="link-card__sub">{artistProfile.contactEmail}</div>
              </a>
              <a href={links.spotifyAlbum} target="_blank" rel="noreferrer" className="link-card">
                <div className="link-card__title">Spotify · Lioness Lost</div>
                <div className="link-card__sub">Official album link</div>
              </a>
              <a href={links.soundcloud} target="_blank" rel="noreferrer" className="link-card">
                <div className="link-card__title">SoundCloud</div>
                <div className="link-card__sub">soundcloud.com/calitoy</div>
              </a>
              <a href={links.instagram} target="_blank" rel="noreferrer" className="link-card">
                <div className="link-card__title">Instagram</div>
                <div className="link-card__sub">@josephcalitoy</div>
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid--2">
          <div className="card" style={{ padding: '1.5rem' }}>
            <p className="badge badge--accent" style={{ marginBottom: '.9rem' }}>Selected tracks</p>
            <div className="archive-list">
              {songs.map((song) => (
                <a key={song.slug} href={song.soundcloudUrl} target="_blank" rel="noreferrer" className="archive-row card" style={{ boxShadow: 'none' }}>
                  <div>
                    <p className="archive-row__title">{song.title}</p>
                    <p className="archive-row__summary">{song.summary}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="card" style={{ padding: '1.5rem' }}>
            <p className="badge badge--accent" style={{ marginBottom: '.9rem' }}>Playlists</p>
            <div className="archive-list">
              {playlists.map((playlist) => (
                <a key={playlist.slug} href={playlist.soundcloudUrl} target="_blank" rel="noreferrer" className="archive-row card" style={{ boxShadow: 'none' }}>
                  <div>
                    <p className="archive-row__title">{playlist.title}</p>
                    <p className="archive-row__summary">{playlist.summary}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
