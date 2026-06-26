import { journalEntries } from '../data';

export default function Blog() {
  return (
    <div className="container section">
      <a href="#/" className="back-link">← Home</a>
      <div className="eyebrow-row" style={{ marginBottom: '1.5rem' }}>
        <span className="badge badge--accent">Journal</span>
        <span className="section-rule" />
      </div>
      <h1 style={{ marginBottom: '1rem' }}>Journal</h1>
      <p style={{ color: 'var(--muted)', maxWidth: '42rem', marginBottom: '2.5rem', lineHeight: 1.8 }}>
        Writing from Joseph Calitoy — release notes, reflections, atmosphere pieces, and the thoughts that belong beside the records.
      </p>
      <div className="grid grid--2">
        {journalEntries.map((entry) => (
          <article key={entry.slug} className="card journal-entry">
            <span className="badge badge--accent">{entry.date}</span>
            <h3>{entry.title}</h3>
            <p className="journal-entry__excerpt">{entry.excerpt}</p>
            {entry.body.map((paragraph) => (
              <p key={paragraph} className="journal-entry__body">{paragraph}</p>
            ))}
          </article>
        ))}
      </div>
    </div>
  );
}
