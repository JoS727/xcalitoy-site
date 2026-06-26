import { artistProfile, galleryImages, links } from '../data';

export default function About() {
  return (
    <div className="container section">
      <a href="#/" className="back-link">← Home</a>
      <div className="eyebrow-row" style={{ marginBottom: '1.5rem' }}>
        <span className="badge badge--accent">About</span>
        <span className="section-rule" />
      </div>

      <div className="grid grid--sidebar" style={{ alignItems: 'start' }}>
        <div className="card" style={{ overflow: 'hidden' }}>
          <img src="/calitoy-cover.jpg" alt="Calitoy cover art" className="cover-img" />
          <div style={{ padding: '1.75rem' }}>
          <p className="statement-kicker">Joseph Calitoy / CaliToy</p>
          <h1 style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', marginBottom: '1rem' }}>{artistProfile.name}</h1>
          <p style={{ color: 'var(--muted)', lineHeight: 1.9, marginBottom: '1.25rem' }}>
            Joseph Calitoy is a California artist, songwriter, and world-builder making music that lives in the space between pressure and
            vulnerability. Under the CaliToy name, he leans into mood, melody, and narrative — records that feel personal enough to whisper in
            your ear and widescreen enough to fill the whole night.
          </p>
          <p style={{ color: 'var(--muted)', lineHeight: 1.9 }}>
            His catalog moves through ambition, memory, tension, devotion, and escape without locking itself into one lane. The throughline is
            voice: intimate writing, cinematic atmosphere, and a point of view that treats every song like a scene with consequences.
          </p>
          </div>
        </div>

        <div style={{ display: 'grid', gap: '1rem' }}>

          <div className="card" style={{ padding: '1.5rem' }}>
            <p className="badge badge--accent" style={{ marginBottom: '.9rem' }}>Live gallery</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '.75rem' }}>
              {galleryImages.slice(0, 4).map((image) => (
                <img key={image.src} src={image.src} alt={image.alt} style={{ width: '100%', aspectRatio: '3 / 4', objectFit: 'cover', borderRadius: '1rem', border: '1px solid var(--border)' }} />
              ))}
            </div>
          </div>
          <div className="card" style={{ padding: '1.5rem' }}>
            <p className="badge badge--accent" style={{ marginBottom: '.9rem' }}>The world</p>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '.75rem' }}>More than a discography</h3>
            <p style={{ color: 'var(--muted)', fontSize: '.92rem', lineHeight: 1.8 }}>
              xcalitoy.com is the home for the music and everything around it — lyrics, visual language, archive pieces, future drops, and the
              shape of the larger story still unfolding.
            </p>
          </div>

          <div className="card" style={{ padding: '1.5rem' }}>
            <p className="badge badge--accent" style={{ marginBottom: '.9rem' }}>Links</p>
            <div className="links-grid" style={{ gridTemplateColumns: '1fr' }}>
              <a href={links.spotifyAlbum} target="_blank" rel="noreferrer" className="link-card">
                <div className="link-card__title">Spotify · Lioness Lost</div>
                <div className="link-card__sub">Open the featured album</div>
              </a>
              <a href={links.soundcloud} target="_blank" rel="noreferrer" className="link-card">
                <div className="link-card__title">SoundCloud</div>
                <div className="link-card__sub">soundcloud.com/calitoy</div>
              </a>
              <a href={links.instagram} target="_blank" rel="noreferrer" className="link-card">
                <div className="link-card__title">Instagram</div>
                <div className="link-card__sub">@josephcalitoy</div>
              </a>
              <a href="https://www.tiktok.com/@that.joemad" target="_blank" rel="noreferrer" className="link-card">
                <div className="link-card__title">TikTok</div>
                <div className="link-card__sub">@that.joemad</div>
              </a>
              <a href={links.book} className="link-card">
                <div className="link-card__title">Booking / Contact</div>
                <div className="link-card__sub">joseph@tarosyn.com</div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
