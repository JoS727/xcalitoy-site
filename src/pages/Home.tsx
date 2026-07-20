import { artistProfile, highlights, links, playlists, songs } from '../data';

const statement = highlights[1]?.description ?? artistProfile.intro;

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero__bg" aria-hidden="true">
          <img src={artistProfile.featuredReleaseArt} alt="" />
        </div>
        <div className="hero__content container">
          <span className="hero__tagline">{artistProfile.siteName}</span>
          <h1>{artistProfile.name}</h1>
          <p className="hero__sub">
            {artistProfile.tagline} {artistProfile.bio} Lioness Lost and Two Shirts are the SoundCloud bookends for the new album XCalitoy coming in August.
          </p>
          <div className="hero__actions">
            <a href="#tracks" className="btn btn--kill">
              Enter the music
            </a>
            <a href={links.spotifyAlbum} target="_blank" rel="noreferrer" className="btn">
              Stream {artistProfile.featuredRelease}
            </a>
            <a href={links.epk} className="btn">
              Open press kit
            </a>
          </div>
          <div className="hero__scroll">Scroll for the evidence</div>
        </div>
      </section>

      <section className="section store-feature">
        <div className="container store-feature__grid">
          <div>
            <span className="section__label">New storefront</span>
            <h2 className="section__title">Custom skateboards for every occasion.</h2>
            <p className="section__subtitle">
              We built the merch side into a real gift-first store: birthdays, weddings, memorials, baby gifts, event runs, and one-off decks that hit harder than flowers.
            </p>
            <div className="store-feature__actions">
              <a href="#/merch" className="btn btn--kill">Enter the board shop</a>
              <a href="mailto:joseph@tarosyn.com?subject=Custom%20Skateboard%20Order" className="btn">Start a custom order</a>
            </div>
          </div>
          <div className="store-feature__panel">
            <div className="store-feature__card">
              <div className="store-feature__eyebrow">What it feels like</div>
              <h3>1800Flowers energy. Custom board execution.</h3>
              <p>
                Occasion-led gifting, but with something people actually keep: personalized decks built around names, photos, milestones, and story.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="tracks">
        <div className="container">
          <span className="section__label">Track list</span>
          <h2 className="section__title">Lioness Lost and Two Shirts lead the August rollout.</h2>
          <p className="section__subtitle">
            The new SoundCloud highlights now frame XCalitoy from both ends — then the rest of the catalog fills in the pressure between them.
          </p>

          <div className="tracks">
            {songs.map((song, index) => (
              <a
                key={song.slug}
                href={song.soundcloudUrl ?? `#/music/${song.slug}`}
                target={song.soundcloudUrl ? '_blank' : undefined}
                rel={song.soundcloudUrl ? 'noreferrer' : undefined}
                className="track"
              >
                <div className="track__number">{String(index + 1).padStart(2, '0')}</div>
                <div className="track__info">
                  <div className="track__title">{song.title}</div>
                  <div className="track__desc">{song.summary}</div>
                  <div className="track__tags">
                    <span className="track__tag">{song.era}</span>
                    {song.themes.slice(0, 2).map((theme) => (
                      <span key={theme} className="track__tag">
                        {theme}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="track__play">Play / Read</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="statement">
        <div className="container">
          <div className="statement__text">
            {statement} Every release belongs to the same bruised universe — romance, ambition, fallout, and whatever survives the morning.
          </div>
          <div className="statement__credit">{artistProfile.name} / {artistProfile.alias}</div>
        </div>
      </section>

      <section className="section" id="playlists">
        <div className="container">
          <span className="section__label">Playlists</span>
          <h2 className="section__title">Curated like a getaway car.</h2>
          <p className="section__subtitle">
            Different entry points into the same blood-warm atmosphere: romantic wreckage, hustle smoke, dance-floor danger.
          </p>
          <div>
            {playlists.map((playlist) => (
              <a
                key={playlist.slug}
                href={playlist.soundcloudUrl}
                target="_blank"
                rel="noreferrer"
                className="playlist-row"
              >
                <div>
                  <div className="playlist-row__title">{playlist.title}</div>
                  <div className="playlist-row__desc">{playlist.note ? `${playlist.summary} ${playlist.note}` : playlist.summary}</div>
                </div>
                <div className="playlist-row__cta">Play it loud</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="contact">
        <div className="container">
          <span className="section__label">Contact</span>
          <h2 className="section__title">If it matters, reach out directly.</h2>
          <p className="section__subtitle">
            Booking, press, playlists, collaborations, or just following the trail — everything important stays stripped and clear.
          </p>
          <div className="contact-grid">
            <a href={links.book} className="contact-item">
              <div className="contact-item__label">Booking</div>
              <div className="contact-item__value">{artistProfile.contactEmail}</div>
              <div className="contact-item__sub">Serious inquiries, performances, and collaborations.</div>
            </a>
            <a href={links.soundcloud} target="_blank" rel="noreferrer" className="contact-item">
              <div className="contact-item__label">SoundCloud</div>
              <div className="contact-item__value">CaliToy</div>
              <div className="contact-item__sub">Full catalog, playlist worlds, and loose transmissions.</div>
            </a>
            <a href={links.instagram} target="_blank" rel="noreferrer" className="contact-item">
              <div className="contact-item__label">Instagram</div>
              <div className="contact-item__value">@josephcalitoy</div>
              <div className="contact-item__sub">Visual fragments, drops, and the dark romance in motion.</div>
            </a>
            <a href={links.spotifyAlbum} target="_blank" rel="noreferrer" className="contact-item">
              <div className="contact-item__label">Featured release</div>
              <div className="contact-item__value">{artistProfile.featuredRelease}</div>
              <div className="contact-item__sub">Start with the record that opens the door fastest.</div>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
