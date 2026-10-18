import { useEffect, useRef, useState, type FormEvent } from 'react';
import CardBack, { ENERGIES, getEnergy, type Aesthetic, type EnergyId } from '../components/CardBack';
import '../tarosyn.css';

/** Waitlist entries live in localStorage until a backend exists. */
const STORAGE_KEY = 'tarosyn-card-back-waitlist-v1';
const TAROSYN_JOIN_URL =
  'https://tarosyn.app/join?utm_source=xcalitoy&utm_medium=referral&utm_campaign=card_back';

const STEPS = ['Energy', 'Preview', 'Claim', 'Sealed'] as const;

const SLIDERS: { key: keyof Aesthetic; label: string; low: string; high: string; levels: string[] }[] = [
  { key: 'style', label: 'Style', low: '🪞 Accurate', high: '🌀 Chaos', levels: ['Accurate', 'Grounded', 'Balanced', 'Unruly', 'Chaos'] },
  { key: 'brightness', label: 'Brightness', low: '🌑 Dark', high: '☀️ Light', levels: ['Midnight', 'Dusk', 'Twilight', 'Dawn', 'Daylight'] },
  { key: 'detail', label: 'Detail', low: '📷 Detailed', high: '🎨 Abstract', levels: ['Intricate', 'Fine', 'Balanced', 'Loose', 'Abstract'] },
];

export interface CardBackSubmission {
  name: string;
  email: string;
  energy: EnergyId;
  aesthetic: Aesthetic;
  intention: string;
  createdAt: string;
  source: 'xcalitoy.com';
}

function readSubmissions(): CardBackSubmission[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? (parsed as CardBackSubmission[]) : [];
  } catch {
    return [];
  }
}

/** Upserts by email; returns false if storage is unavailable (private mode, quota). */
function saveSubmission(entry: CardBackSubmission): boolean {
  try {
    const rest = readSubmissions().filter((s) => s.email !== entry.email);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...rest, entry]));
    return true;
  } catch {
    return false;
  }
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default function Tarosyn() {
  const [step, setStep] = useState(0);
  const [energyId, setEnergyId] = useState<EnergyId | null>(null);
  const [aesthetic, setAesthetic] = useState<Aesthetic>({ style: 2, brightness: 3, detail: 2 });
  const [intention, setIntention] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; consent?: string }>({});
  const [storageFailed, setStorageFailed] = useState(false);
  const [returning, setReturning] = useState(false);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const flowRef = useRef<HTMLDivElement | null>(null);
  const firstRender = useRef(true);

  // Returning visitors land straight on their sealed card.
  useEffect(() => {
    const saved = readSubmissions();
    const last = saved[saved.length - 1];
    if (last && getEnergy(last.energy)) {
      setEnergyId(last.energy);
      setAesthetic(last.aesthetic);
      setIntention(last.intention);
      setName(last.name);
      setEmail(last.email);
      setConsent(true);
      setReturning(true);
      setStep(3);
    }
  }, []);

  // Move focus + scroll to the flow when the step changes (not on first paint).
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    flowRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    headingRef.current?.focus({ preventScroll: true });
  }, [step]);

  const energy = getEnergy(energyId);

  const pickEnergy = (id: EnergyId) => {
    setEnergyId(id);
    const picked = getEnergy(id);
    if (picked) setAesthetic(picked.defaults);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const next: typeof errors = {};
    if (name.trim().length < 2) next.name = 'Tell us what to call you.';
    if (!EMAIL_RE.test(email.trim())) next.email = 'Enter a valid email address.';
    if (!consent) next.consent = 'Please confirm so we can send your early-access invite.';
    setErrors(next);
    if (Object.keys(next).length || !energyId) return;

    const ok = saveSubmission({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      energy: energyId,
      aesthetic,
      intention: intention.trim(),
      createdAt: new Date().toISOString(),
      source: 'xcalitoy.com',
    });
    setStorageFailed(!ok);
    setReturning(false);
    setStep(3);
  };

  const restart = () => {
    setEnergyId(null);
    setIntention('');
    setErrors({});
    setReturning(false);
    setStep(0);
  };

  const cardPreview = energy && (
    <div className="tsn-card-stage">
      <div className="tsn-card-float" style={{ ['--tsn-glow' as string]: energy.primary }}>
        <CardBack className="tsn-card" energy={energy} aesthetic={aesthetic} name={step >= 2 ? name.trim() : undefined} />
      </div>
    </div>
  );

  return (
    <div className="tsn">
      <div className="tsn-bg" aria-hidden="true">
        <span className="tsn-orb tsn-orb--cyan" />
        <span className="tsn-orb tsn-orb--violet" />
      </div>

      <div className="container tsn-container">
        <a href="#/" className="back-link">← Home</a>

        {/* Campaign hero */}
        <header className="tsn-hero">
          <span className="tsn-eyebrow">
            <span className="tsn-eyebrow__dot" /> Tarosyn × Calitoy · Early access
          </span>
          <h1 className="tsn-title">
            Create your <span className="tsn-gradient-text">Tarosyn</span> Card Back
          </h1>
          <p className="tsn-lede">
            Every reading in Tarosyn is dealt from your own deck. Your Card Back is the face it shows the
            world: a one-of-one design shaped by your energy, your aesthetic, and your intention.
            Design yours here, then claim it on tarosyn.app.
          </p>
        </header>

        <div className="tsn-flow" ref={flowRef}>
          {/* Progress */}
          <ol className="tsn-steps" aria-label="Progress">
            {STEPS.map((label, i) => (
              <li
                key={label}
                className={`tsn-steps__item ${i === step ? 'is-current' : ''} ${i < step ? 'is-done' : ''}`}
                aria-current={i === step ? 'step' : undefined}
              >
                <span className="tsn-steps__num">{i < step ? '✓' : String(i + 1).padStart(2, '0')}</span>
                <span className="tsn-steps__label">{label}</span>
              </li>
            ))}
          </ol>

          {/* STEP 1 — Energy */}
          {step === 0 && (
            <section className="tsn-panel" aria-labelledby="tsn-step-heading">
              <span className="tsn-kicker">Step 1 of 4</span>
              <h2 id="tsn-step-heading" ref={headingRef} tabIndex={-1} className="tsn-heading">
                Which energy do you carry?
              </h2>
              <p className="tsn-sub">Pick the one that feels like you on your most honest day. It sets the palette, the sigil, and the starting aesthetic.</p>

              <div className="tsn-energy-grid" role="radiogroup" aria-label="Card energy">
                {ENERGIES.map((e) => {
                  const selected = energyId === e.id;
                  return (
                    <button
                      key={e.id}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      className={`tsn-energy ${selected ? 'is-selected' : ''}`}
                      style={{ ['--tsn-c1' as string]: e.primary, ['--tsn-c2' as string]: e.secondary }}
                      onClick={() => pickEnergy(e.id)}
                    >
                      <span className="tsn-energy__thumb" aria-hidden="true">
                        <CardBack energy={e} aesthetic={e.defaults} title="" />
                      </span>
                      <span className="tsn-energy__body">
                        <span className="tsn-energy__name">{e.name}</span>
                        <span className="tsn-energy__tagline">{e.tagline}</span>
                        <span className="tsn-energy__desc">{e.desc}</span>
                        <span className="tsn-energy__traits">
                          {e.traits.map((t) => (
                            <span key={t}>{t}</span>
                          ))}
                        </span>
                      </span>
                      <span className="tsn-energy__check" aria-hidden="true">{selected ? '✓' : ''}</span>
                    </button>
                  );
                })}
              </div>

              <div className="tsn-actions">
                <button type="button" className="tsn-btn tsn-btn--primary" disabled={!energy} onClick={() => setStep(1)}>
                  {energy ? `Continue with ${energy.name} →` : 'Choose an energy to continue'}
                </button>
              </div>
            </section>
          )}

          {/* STEP 2 — Preview + tune */}
          {step === 1 && energy && (
            <section className="tsn-panel tsn-split" aria-labelledby="tsn-step-heading">
              {cardPreview}
              <div className="tsn-split__controls">
                <span className="tsn-kicker">Step 2 of 4</span>
                <h2 id="tsn-step-heading" ref={headingRef} tabIndex={-1} className="tsn-heading">
                  Shape your aesthetic.
                </h2>
                <p className="tsn-sub">
                  These are the same three dials the Tarosyn forge uses. Tune them and watch your {energy.name} back respond.
                </p>

                <div className="tsn-sliders">
                  {SLIDERS.map((s) => (
                    <div key={s.key} className="tsn-slider">
                      <div className="tsn-slider__top">
                        <label htmlFor={`tsn-${s.key}`}>{s.label}</label>
                        <span className="tsn-slider__value">{s.levels[aesthetic[s.key] - 1]}</span>
                      </div>
                      <input
                        id={`tsn-${s.key}`}
                        type="range"
                        min={1}
                        max={5}
                        step={1}
                        value={aesthetic[s.key]}
                        aria-valuetext={s.levels[aesthetic[s.key] - 1]}
                        onChange={(ev) => setAesthetic((a) => ({ ...a, [s.key]: Number(ev.target.value) }))}
                        style={{ ['--tsn-fill' as string]: `${((aesthetic[s.key] - 1) / 4) * 100}%` }}
                      />
                      <div className="tsn-slider__ends">
                        <span>{s.low}</span>
                        <span>{s.high}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <label className="tsn-field">
                  <span className="tsn-field__label">
                    Your intention <em>optional</em>
                  </span>
                  <input
                    type="text"
                    maxLength={120}
                    value={intention}
                    placeholder="e.g. Trust the next move."
                    onChange={(ev) => setIntention(ev.target.value)}
                  />
                  <span className="tsn-field__hint">Blank is perfectly valid. In the app, your intention guides the forge.</span>
                </label>

                <div className="tsn-actions">
                  <button type="button" className="tsn-btn tsn-btn--ghost" onClick={() => setStep(0)}>← Energy</button>
                  <button type="button" className="tsn-btn tsn-btn--primary" onClick={() => setStep(2)}>Lock in aesthetic →</button>
                </div>
              </div>
            </section>
          )}

          {/* STEP 3 — Claim */}
          {step === 2 && energy && (
            <section className="tsn-panel tsn-split" aria-labelledby="tsn-step-heading">
              {cardPreview}
              <form className="tsn-split__controls" onSubmit={handleSubmit} noValidate>
                <span className="tsn-kicker">Step 3 of 4</span>
                <h2 id="tsn-step-heading" ref={headingRef} tabIndex={-1} className="tsn-heading">
                  Put your name on it.
                </h2>
                <p className="tsn-sub">Join the early-access list. Your name is engraved on the preview as you type.</p>

                <label className="tsn-field">
                  <span className="tsn-field__label">Name</span>
                  <input
                    type="text"
                    autoComplete="name"
                    maxLength={60}
                    value={name}
                    onChange={(ev) => setName(ev.target.value)}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'tsn-err-name' : undefined}
                  />
                  {errors.name && <span id="tsn-err-name" className="tsn-field__error">{errors.name}</span>}
                </label>

                <label className="tsn-field">
                  <span className="tsn-field__label">Email</span>
                  <input
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    maxLength={120}
                    value={email}
                    onChange={(ev) => setEmail(ev.target.value)}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'tsn-err-email' : undefined}
                  />
                  {errors.email && <span id="tsn-err-email" className="tsn-field__error">{errors.email}</span>}
                </label>

                <label className="tsn-check">
                  <input type="checkbox" checked={consent} onChange={(ev) => setConsent(ev.target.checked)} />
                  <span>Send me my Tarosyn early-access invite and campaign updates. Unsubscribe anytime.</span>
                </label>
                {errors.consent && <span className="tsn-field__error">{errors.consent}</span>}

                <div className="tsn-summary">
                  <span><strong>{energy.name}</strong></span>
                  {SLIDERS.map((s) => (
                    <span key={s.key}>{s.label}: {s.levels[aesthetic[s.key] - 1]}</span>
                  ))}
                </div>

                <div className="tsn-actions">
                  <button type="button" className="tsn-btn tsn-btn--ghost" onClick={() => setStep(1)}>← Preview</button>
                  <button type="submit" className="tsn-btn tsn-btn--primary">Seal my Card Back ✦</button>
                </div>
              </form>
            </section>
          )}

          {/* STEP 4 — Sealed */}
          {step === 3 && energy && (
            <section className="tsn-panel tsn-split tsn-sealed" aria-labelledby="tsn-step-heading">
              {cardPreview}
              <div className="tsn-split__controls">
                <span className="tsn-kicker">{returning ? 'Welcome back' : 'Step 4 of 4'}</span>
                <h2 id="tsn-step-heading" ref={headingRef} tabIndex={-1} className="tsn-heading">
                  Your Card Back is sealed{name.trim() ? `, ${name.trim().split(' ')[0]}` : ''}.
                </h2>
                <p className="tsn-sub">
                  You're on the list with a <strong>{energy.name}</strong> design. The last step happens inside
                  Tarosyn: claim your account and the Sanctuary forge turns this blueprint into your one-of-one
                  Card Back.
                </p>
                {intention.trim() && <blockquote className="tsn-intention">“{intention.trim()}”</blockquote>}

                <ul className="tsn-perks">
                  <li><span>✦</span> Free to start: upgrade only if you want more</li>
                  <li><span>✦</span> Daily readings from 8 guides, a reading vault and your birth chart</li>
                  <li><span>✦</span> Your Card Back becomes part of your Soul Passport</li>
                </ul>

                <div className="tsn-actions">
                  <a className="tsn-btn tsn-btn--primary" href={TAROSYN_JOIN_URL} target="_blank" rel="noreferrer">
                    Claim it on tarosyn.app →
                  </a>
                  <button type="button" className="tsn-btn tsn-btn--ghost" onClick={restart}>Design another</button>
                </div>

                <p className="tsn-fineprint">
                  {storageFailed
                    ? 'Heads up: your browser blocked local storage, so this design wasn’t saved on this device. Claim it on tarosyn.app to keep it.'
                    : 'Your design is saved on this device. Claim it on tarosyn.app to keep it with your account.'}
                </p>
              </div>
            </section>
          )}
        </div>

        {/* How it works */}
        <section className="tsn-how" aria-label="How the Card Back works">
          {[
            ['01', 'Choose your energy', 'Four archetypal energies set the palette and sigil at the centre of your back.'],
            ['02', 'Shape the aesthetic', 'Style, Brightness and Detail: the same dials the in-app forge reads.'],
            ['03', 'Seal the pattern', 'Your name and intention lock the blueprint to you.'],
            ['04', 'Forge in Tarosyn', 'Claim your account and the Sanctuary forge renders your final Card Back.'],
          ].map(([num, title, copy]) => (
            <div key={num} className="tsn-how__item">
              <span className="tsn-how__num">{num}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
