import { artistProfile, links } from '../data';

const members = [
  { name: 'Kurced', role: ' vocalist / lyricist', bio: 'Female alternative artist, visual consistency, social content and music videos.' },
  { name: 'JDx', role: ' contributor', bio: 'Joining the Desmu5 collective.' },
  { name: 'xCalitoy', role: ' producer / composer', bio: 'Dark pop, night-drive confessionals, pressure-heavy records built to linger.' },
  { name: 'KingTrx', role: ' vocalist / lyricist', bio: 'California is home. Music is life. Ready to cook and inspire.' },
  { name: 'xPi', role: ' contributor', bio: 'Joining the Desmu5 collective.' },
];

export default function Desmu5() {
  return (
    <div className="section">
      <div className="container">
        <a href="#/" className="back-link">
          ← Home
        </a>
        <span className="section__label">Desmu5</span>

        <div className="desmu5-hero">
          <p className="statement-kicker">Collective announcement</p>
          <h1>Five. <em>Joined.</em></h1>
          <p className="desmu5-sub">
            Kurced, PieZ, xCalitoy, KingTrx, and JDx — five announcing they joined Desmu5.
            The collective is live — the music is next.
          </p>
        </div>

        <div className="desmu5-grid">
          {members.map((m) => (
            <div key={m.name} className="card desmu5-card">
              <span className="badge badge--accent">{m.name}</span>
              <p className="desmu5-role">{m.role}</p>
              <p className="desmu5-bio">{m.bio}</p>
            </div>
          ))}
        </div>

        <div className="desmu5-actions">
          <a href="https://orbiiit.com/en/participants/0d31d7de-98a9-4dad-a0fe-0c05f5332cb3?contestId=f85717be-ba9b-4857-b885-ccbbb9a45757" target="_blank" rel="noopener noreferrer" className="btn btn--kill">
            Vote King Cobretti on Orbiiit →
          </a>
          <a href={links.book} className="btn">
            Contact Desmu5
          </a>
        </div>
      </div>
    </div>
  );
}