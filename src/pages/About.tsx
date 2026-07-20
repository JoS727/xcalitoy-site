import { artistProfile, links } from '../data';

export default function About() {
  return (
    <div className="section">
      <div className="container">
        <a href="#/" className="back-link">
          ← Home
        </a>
        <span className="section__label">About</span>
        <div className="about-grid">
          <div>
            <img src="/xcalitoy-hero.jpg" alt="Joseph Calitoy performance portrait" className="about-photo" />
          </div>

          <div className="about-text">
            <h1>{artistProfile.name}</h1>
            <p>
              Joseph Calitoy makes records like scenes from a crime romance: dark pop confessionals, pressure-heavy melodies,
              and lyrics that stay intimate even when the world around them widens into cinema.
            </p>
            <p>
              Under the CaliToy name, he moves through ambition, obsession, devotion, fallout, and survival without sanding the
              edges down. The point is mood with consequence — songs that feel bruised, dressed up, and dangerous enough to keep.
            </p>
            <p>
              This site exists as the real home for the catalog: music, visuals, lyrics, press materials, and the larger world
              that keeps unfolding around the releases. Nothing here is meant to feel polite. It is built to feel lived in.
            </p>
            <div className="hero__actions">
              <a href={links.spotifyAlbum} target="_blank" rel="noreferrer" className="btn btn--kill">
                Hear {artistProfile.featuredRelease}
              </a>
              <a href={links.book} className="btn">
                Contact
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
