import { lyricAlbums } from '../lyricsData';

const PROFILE = 'https://soundcloud.com/calitoy';

export default function Lyrics() {
  const withWords = lyricAlbums.reduce(
    (n, a) => n + a.songs.filter((s) => s.lyrics).length,
    0,
  );
  const total = lyricAlbums.reduce((n, a) => n + a.songs.length, 0);

  return (
    <div className="container section">
      <p className="eyebrow">The catalog</p>
      <h1>Lyrics</h1>
      <p style={{ color: 'var(--muted)', maxWidth: '44rem', marginTop: '1rem' }}>
        {withWords} of {total} songs, grouped by release. Every sheet here is Joseph Calitoy&apos;s
        own writing. Instrumental releases are marked as such, and the handful still being
        transcribed are listed but collapsed.
      </p>

      {lyricAlbums.map((album) => (
        <section key={album.title} style={{ marginTop: '3rem' }}>
          <h2 style={{ marginBottom: '1.25rem' }}>{album.title}</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {album.songs.map((song) => {
              const hasLink = song.soundcloud && song.soundcloud !== PROFILE;
              if (song.lyrics) {
                return (
                  <details
                    key={song.slug}
                    style={{
                      border: '1px solid var(--line, rgba(255,255,255,.12))',
                      borderRadius: '12px',
                      padding: '1rem 1.25rem',
                    }}
                  >
                    <summary style={{ cursor: 'pointer', fontWeight: 600 }}>
                      {song.title}
                      {hasLink && (
                        <a
                          href={song.soundcloud}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          style={{
                            marginLeft: '.75rem',
                            fontWeight: 400,
                            fontSize: '.85em',
                            color: 'var(--muted)',
                          }}
                        >
                          listen ↗
                        </a>
                      )}
                    </summary>
                    <p
                      style={{
                        whiteSpace: 'pre-line',
                        marginTop: '1rem',
                        color: 'var(--muted)',
                        lineHeight: 1.7,
                      }}
                    >
                      {song.lyrics}
                    </p>
                  </details>
                );
              }
              return (
                <div
                  key={song.slug}
                  style={{
                    border: '1px dashed var(--line, rgba(255,255,255,.12))',
                    borderRadius: '12px',
                    padding: '1rem 1.25rem',
                    color: 'var(--muted)',
                  }}
                >
                  {song.title}
                  <span style={{ fontSize: '.85em', marginLeft: '.75rem' }}>
                    {song.instrumental ? 'instrumental' : 'transcribing'}
                  </span>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}