import { lyricAlbums } from '../lyricsData';

export default function Lyrics() {
  return (
    <div className="container section">
      <p className="eyebrow">The catalog</p>
      <h1>Lyrics</h1>
      <p style={{ color: 'var(--muted)', maxWidth: '42rem', marginTop: '1rem' }}>
        Clean lyric sheets for the released songs, grouped by release. Songs without a lyric sheet
        yet are listed but collapsed — the words are still being collected.
      </p>

      {lyricAlbums.map((album) => (
        <section key={album.title} style={{ marginTop: '3rem' }}>
          <h2 style={{ marginBottom: '1.25rem' }}>{album.title}</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {album.songs.map((song) =>
              song.lyrics ? (
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
              ) : (
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
                    lyrics coming soon
                  </span>
                </div>
              ),
            )}
          </div>
        </section>
      ))}
    </div>
  );
}
