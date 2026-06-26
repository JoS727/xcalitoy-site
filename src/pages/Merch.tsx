export default function Merch() {
  return (
    <div className="container section">
      <a href="#/" className="back-link">← Home</a>
      <div className="eyebrow-row" style={{ marginBottom: '1.5rem' }}>
        <span className="badge badge--accent">Merch</span>
        <span className="section-rule" />
      </div>
      <h1 style={{ marginBottom: '1rem' }}>Merchandise</h1>
      <p style={{ color: 'var(--muted)', maxWidth: '42rem', marginBottom: '2.5rem', lineHeight: 1.8 }}>
        Future drops from Wicked Youth Goods are taking shape — pieces tied to the music, the mood, and the wider Calitoy world.
      </p>
      <div className="grid grid--3">
        <div className="card utility-card utility-card--center">
          <h3>Apparel</h3>
          <p>Tees, hoodies, and wearable pieces designed to feel like part of the catalog.</p>
        </div>
        <div className="card utility-card utility-card--center">
          <h3>Accessories</h3>
          <p>Small objects, prints, and details that carry the visual language forward.</p>
        </div>
        <div className="card utility-card utility-card--center">
          <h3>Limited Drops</h3>
          <p>Collector-style releases connected to songs, eras, and special moments.</p>
        </div>
      </div>
      <p style={{ marginTop: '2.5rem', fontSize: '.9rem', color: 'var(--muted)', lineHeight: 1.8 }}>
        Want first word when it lands? Reach out at{' '}
        <a href="mailto:joseph@tarosyn.com" style={{ color: 'var(--accent)' }}>joseph@tarosyn.com</a>.
      </p>
    </div>
  );
}
