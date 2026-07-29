const DESIGN_FAMILIES = [
  { name: 'Love Calitoy Louder', statement: 'The rose badge turned all the way up.', formats: ['Heavyweight tee', 'Hoodie', 'Dad hat', '18×24 print'], art: '/love-calitoy-louder.jpg' },
  { name: 'X Marks the Calitoy', statement: 'Crossed out, crossed over, impossible to erase.', formats: ['Black tee', 'Zip hoodie', 'Tote', 'Sticker sheet'], art: '/xcalitoy-album-cover.jpg' },
  { name: 'Kill Me Now', statement: 'Dark-pop melodrama in a clean brutal lockup.', formats: ['Washed tee', 'Crewneck', 'Beanie', '12×12 print'], art: '/kill-me-now-cover.png' },
  { name: 'Not You', statement: 'A rejection letter you can wear.', formats: ['Baby tee', 'Long sleeve', 'Cap', 'Mini poster'], art: '/not-you-cover.png' },
  { name: 'Half Gone', statement: 'For the part of you that never came home.', formats: ['Garment-dyed tee', 'Hoodie', 'Tote', 'Art print'], art: '/half-gone-cover.png' },
  { name: 'Stole From', statement: 'Borrowed hearts. Permanent evidence.', formats: ['Classic tee', 'Work jacket', 'Bandana', 'Sticker pack'], art: '/stole-from-cover.png' },
  { name: 'Always There', statement: 'The ghost in every room gets its own uniform.', formats: ['Ringer tee', 'Crewneck', 'Embroidered cap', 'Wall flag'], art: '/always-there-cover.png' },
  { name: 'Home From Your Shadows', statement: 'A little light dragged through the dark.', formats: ['Premium tee', 'Pullover hoodie', 'Tote', '18×24 print'], art: '/home-from-your-shadows-cover.png' },
  { name: 'Inflicted', statement: 'Beauty, damage, and the choice to keep both.', formats: ['Black tee', 'Zip hoodie', 'Beanie', 'Square print'], art: '/inflicted-cover.png' },
  { name: 'Ain’t Proud', statement: 'No apology. No clean ending.', formats: ['Heavy tee', 'Coach jacket', 'Cap', 'Sticker sheet'], art: '/aint-proud-cover.png' },
];

export default function Merch() {
  return (
    <div className="store-page">
      <section className="store-hero section">
        <div className="container store-hero__grid">
          <div>
            <span className="section__label">XCalitoy store / design preview</span>
            <h1 className="store-hero__title">Ten ways to wear the damage.</h1>
            <p className="store-hero__copy">
              Ten original design families built from the XCalitoy music and visual world. Each family spans apparel, accessories, and wall art—not one logo repeated ten times.
            </p>
            <div className="store-trustbar" aria-label="Store status">
              <span>10 design families</span><span>40 product directions</span><span>No placeholder checkout</span>
            </div>
            <div className="store-hero__actions"><a href="#design-families" className="btn btn--kill">Preview the families</a><a href="#/boards" className="btn">Custom boards</a></div>
          </div>
          <aside className="store-hero__panel">
            <div className="store-hero__card love-louder-feature">
              <img src="/love-calitoy-louder.jpg" alt="Love Calitoy Louder campaign artwork" />
              <div><div className="store-hero__eyebrow">Production status</div><h2>Design ready. Printful mapping next.</h2><p>These families are not yet purchasable. Product records, variants, and final retail pricing will appear only after verification.</p><span className="love-louder-status">Coming next · no charge controls</span></div>
            </div>
          </aside>
        </div>
      </section>

      <section className="section design-family-section" id="design-families">
        <div className="container">
          <span className="section__label">The complete ten</span>
          <h2 className="section__title">Design families</h2>
          <p className="section__subtitle">Every family has a distinct visual source and a multi-product plan. All are clearly staged as design previews until production setup is complete.</p>
          <div className="design-family-grid">
            {DESIGN_FAMILIES.map((family, index) => (
              <article className="design-family-card" key={family.name}>
                <div className="design-family-card__art"><img src={family.art} alt={`${family.name} artwork`} loading="lazy" /><span>{String(index + 1).padStart(2, '0')}</span></div>
                <div className="design-family-card__copy"><div className="design-family-card__status">DESIGN READY / COMING NEXT</div><h3>{family.name}</h3><p>{family.statement}</p><ul aria-label={`${family.name} planned formats`}>{family.formats.map(format => <li key={format}>{format}</li>)}</ul><small>Not yet purchasable</small></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section store-readiness">
        <div className="container process-grid">
          <article className="process-card"><div className="process-card__step">01</div><h3>Artwork lock</h3><p>Final print files and safe zones for every product format.</p></article>
          <article className="process-card"><div className="process-card__step">02</div><h3>Printful mapping</h3><p>Real products, colors, sizes, costs, and mockups—not invented SKUs.</p></article>
          <article className="process-card"><div className="process-card__step">03</div><h3>Commerce activation</h3><p>Server-owned pricing, durable orders, Stripe, fulfillment, and tracking.</p></article>
          <article className="process-card"><div className="process-card__step">04</div><h3>Store launch</h3><p>Only verified products receive price, cart, and checkout controls.</p></article>
        </div>
      </section>
    </div>
  );
}
