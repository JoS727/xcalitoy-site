import { useParams } from 'wouter';
import { getSong, songs, links } from '../data';

export default function SongPage() {
  const { slug } = useParams<{ slug: string }>();
  const song = slug ? getSong(slug) : undefined;

  if (!song) {
    return (
      <div className="container section" style={{ textAlign: 'center' }}>
        <h1>Song not found</h1>
        <p style={{ color: 'var(--muted)', marginTop: '1rem' }}>This release isn't in the current archive.</p>
        <a href="#/" className="btn" style={{ marginTop: '2rem' }}>← Back to music hub</a>
      </div>
    );
  }

  const related = songs.filter((item) => item.slug !== song.slug).slice(0, 3);
  const sourceHref = song.soundcloudUrl || links.soundcloud;
  const lyrics = song.lyrics?.trim() || 'Lyrics coming soon.';

  return (
    <div className="container section">
      <a href="#/" className="back-link">← Back to music hub</a>

      <div className="grid grid--sidebar" style={{ alignItems: 'start' }}>
        <div className="card">
          <img src={song.coverArt} alt={song.title} className="cover-img" />
          <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <span className="badge badge--accent">{song.era}</span>
              <h1 style={{ fontSize: '2rem', marginTop: '.75rem' }}>{song.title}</h1>
            </div>
            <p style={{ fontSize: '.92rem', color: 'var(--muted)', lineHeight: 1.8 }}>{song.summary}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '.4rem' }}>
              {song.themes.map((theme) => <span key={theme} className="badge">{theme}</span>)}
            </div>
            <div className="badge" style={{ alignSelf: 'flex-start' }}>{song.status.replace('-', ' ')}</div>
            <div style={{ display: 'grid', gap: '.5rem' }}>
              <a href={sourceHref} target="_blank" rel="noreferrer" className="btn btn--accent" style={{ justifyContent: 'space-between' }}>
                <span>Open on SoundCloud</span><span>↗</span>
              </a>
              <a href={links.book} className="btn" style={{ justifyContent: 'space-between' }}>
                <span>Booking / Collaborate</span><span>↗</span>
              </a>
              <a href="#/merch" className="btn" style={{ justifyContent: 'space-between' }}>
                <span>Merchandise</span><span>↗</span>
              </a>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card" style={{ padding: '1.5rem' }}>
            <p className="badge badge--accent" style={{ marginBottom: '1rem' }}>Lyrics</p>
            <pre className="lyrics-pre">{lyrics}</pre>
          </div>

          <div className="card" style={{ padding: '1.5rem' }}>
            <p className="badge" style={{ marginBottom: '1rem' }}>Related tracks</p>
            <div className="grid grid--2">
              {related.map((relatedSong) => (
                <a key={relatedSong.slug} href={`#/music/${relatedSong.slug}`} className="link-card">
                  <div className="link-card__title">{relatedSong.title}</div>
                  <div className="link-card__sub">{relatedSong.era}</div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
