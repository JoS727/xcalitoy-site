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
            <img src="/about-performance.jpg" alt="Calitoy performance portrait" className="about-photo" />
          </div>

          <div className="about-text">
            <h1>{artistProfile.name}</h1>
            <p>
              Calitoy makes records like scenes from a crime romance: dark pop confessionals, pressure-heavy melodies,
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

        {/* Musical Style */}
        <div className="about-section" style={{ marginTop: '4rem' }}>
          <span className="section__label">Musical Style</span>
          <h2 className="about-heading">The sound.</h2>
          <p>
            Calitoy blends dark alternative rock, industrial electronic music, cinematic trip-hop, emo-grunge, and hip-hop.
            The music is emotionally raw but carefully structured, moving quickly between intimate, restrained passages,
            tense rhythmic sections, sharp rap entries, and large cathartic hooks.
          </p>
          <p>
            Production typically features heavy live-feeling drums, deep distorted synth bass, cold electronic textures,
            atmospheric pads, piano, violin or harp accents, and dramatic silence. Arrangements evolve constantly, with
            sudden beat drops, half-time switches, double-time vocal passages, and brief instrumental breaks. The sound
            is dark, romantic, confrontational, spiritual, and wounded without becoming chaotic.
          </p>
          <p>
            The writing is deeply personal and direct. Common themes include loyalty, betrayal, survival, love,
            abandonment, self-destruction, faith, identity, and redemption. Calitoy uses sacred imagery alongside blunt
            everyday language, balancing poetic symbolism with lines that feel like an unfiltered confrontation.
          </p>
        </div>

        {/* Vocal Identity */}
        <div className="about-section" style={{ marginTop: '4rem' }}>
          <span className="section__label">Calitoy's Voice</span>
          <h2 className="about-heading">The voice.</h2>
          <p>
            Calitoy has a deep male baritone with a warm, dark chest tone and a slightly weathered, vulnerable edge.
            His delivery feels human and emotionally exposed, not overly polished or conventionally theatrical.
          </p>
          <p>
            He uses three primary vocal modes:
          </p>
          <div className="voice-modes">
            <div className="voice-mode">
              <div className="voice-mode__label">01 / Restrained Melodic</div>
              <p>Low, intimate singing with long vowels, controlled emotion, and tension beneath the surface.</p>
            </div>
            <div className="voice-mode">
              <div className="voice-mode__label">02 / Rhythmic Spoken-Rap</div>
              <p>Clear, grounded delivery with strong consonants, conversational phrasing, and a heavy pocket.</p>
            </div>
            <div className="voice-mode">
              <div className="voice-mode__label">03 / Accelerated Rap</div>
              <p>Tighter, faster lines that increase pressure and urgency without changing into a different character.</p>
            </div>
          </div>
          <p style={{ marginTop: '1.5rem' }}>
            Choruses rise into a stronger, rougher baritone, but Calitoy sounds like he is struggling to remain composed,
            not simply shouting. Small cracks, breaths, imperfect transitions, and moments of near-speaking strengthen
            the performance.
          </p>
        </div>

        {/* Style Tags */}
        <div className="about-section" style={{ marginTop: '4rem' }}>
          <span className="section__label">Genres & Influences</span>
          <h2 className="about-heading">The DNA.</h2>
          <div className="style-tags">
            <span className="style-tag">Dark Alternative Rock</span>
            <span className="style-tag">Industrial Electronic</span>
            <span className="style-tag">Cinematic Trip-Hop</span>
            <span className="style-tag">Emo-Grunge</span>
            <span className="style-tag">Hip-Hop</span>
            <span className="style-tag">Dark Pop</span>
            <span className="style-tag">Night-Drive Confessional</span>
            <span className="style-tag">Pressure-Heavy</span>
          </div>
          <div className="theme-tags" style={{ marginTop: '1.5rem' }}>
            <span className="theme-tag">Loyalty</span>
            <span className="theme-tag">Betrayal</span>
            <span className="theme-tag">Survival</span>
            <span className="theme-tag">Love</span>
            <span className="theme-tag">Abandonment</span>
            <span className="theme-tag">Self-Destruction</span>
            <span className="theme-tag">Faith</span>
            <span className="theme-tag">Identity</span>
            <span className="theme-tag">Redemption</span>
          </div>
        </div>

        {/* Production DNA */}
        <div className="about-section" style={{ marginTop: '4rem' }}>
          <span className="section__label">Production DNA</span>
          <h2 className="about-heading">The build.</h2>
          <div className="production-grid">
            <div className="production-item">
              <div className="production-item__label">Drums</div>
              <p>Heavy, live-feeling. Hard hits, ghost notes, room sound.</p>
            </div>
            <div className="production-item">
              <div className="production-item__label">Bass</div>
              <p>Deep distorted synth. Sub frequencies that move the chest.</p>
            </div>
            <div className="production-item">
              <div className="production-item__label">Textures</div>
              <p>Cold electronic pads. Atmospheric layers. Dramatic silence.</p>
            </div>
            <div className="production-item">
              <div className="production-item__label">Accents</div>
              <p>Piano, violin, harp. Organic against electronic.</p>
            </div>
            <div className="production-item">
              <div className="production-item__label">Arrangements</div>
              <p>Constant evolution. Beat drops, half-time switches, instrumental breaks.</p>
            </div>
            <div className="production-item">
              <div className="production-item__label">Vocal Layering</div>
              <p>Cracks, breaths, near-speaking. Imperfect transitions as strength.</p>
            </div>
          </div>
        </div>

        <div className="hero__actions" style={{ marginTop: '4rem', justifyContent: 'center' }}>
          <a href={links.spotifyAlbum} target="_blank" rel="noreferrer" className="btn btn--kill">
            Hear {artistProfile.featuredRelease}
          </a>
          <a href={links.soundcloud} target="_blank" rel="noreferrer" className="btn">
            Open SoundCloud
          </a>
        </div>
      </div>
    </div>
  );
}
