import { artistProfile, galleryImages, links, songs, playlists } from '../data';

export default function EPK() {
  return (
    <div className="container section epk-page">
      <a href="#/" className="back-link">← Home</a>
      <div className="eyebrow-row epk-page__eyebrow">
        <span className="badge badge--accent">EPK</span>
        <span className="section-rule" />
      </div>

      <section className="epk-hero card">
        <div className="epk-hero__copy">
          <p className="statement-kicker">Electronic press kit</p>
          <h1 className="epk-hero__title">{artistProfile.name}</h1>
          <p className="epk-hero__text">
            Calitoy is a California recording artist and world-builder creating moody, melodic records with a dark, melodic pulse. His music
            blends confession, tension, ambition, and atmosphere into songs that feel both intimate and cinematic.
          </p>
        </div>
        <div className="epk-hero__media">
          {galleryImages[0] && <img src={galleryImages[0].src} alt={galleryImages[0].alt} className="epk-hero__image" />}
        </div>
      </section>

      <div className="grid epk-page__grid">
        <div className="card epk-card">
          <p className="badge badge--accent epk-card__badge">Short bio</p>
          <p className="epk-copy">
            Calitoy builds songs like scenes: emotionally direct, sonically immersive, and grounded in a strong visual identity. xcalitoy.com
            serves as the official home for releases, lyrics, archive material, and future drops.
          </p>
        </div>

        <div className="card epk-card">
          <p className="badge badge--accent epk-card__badge">Contact</p>
          <div className="links-grid epk-links">
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
              <div className="link-card__sub">@XCalitoy</div>
            </a>
          </div>
        </div>
      </div>

      <div className="grid grid--2 epk-page__grid">
        <div className="card epk-card">
          <p className="badge badge--accent epk-card__badge">Selected tracks</p>
          <div className="archive-list">
            {songs.map((song) => (
              <a key={song.slug} href={song.soundcloudUrl} target="_blank" rel="noreferrer" className="archive-row card epk-row">
                <div>
                  <p className="archive-row__title">{song.title}</p>
                  <p className="archive-row__summary">{song.summary}</p>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="card epk-card">
          <p className="badge badge--accent epk-card__badge">Playlists</p>
          <div className="archive-list">
            {playlists.map((playlist) => (
              <a key={playlist.slug} href={playlist.soundcloudUrl} target="_blank" rel="noreferrer" className="archive-row card epk-row">
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
  );
}
