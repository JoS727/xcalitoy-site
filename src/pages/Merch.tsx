export default function Merch() {
  return (
    <div className="store-page">
      <section className="store-hero section">
        <div className="container store-hero__grid">
          <div>
            <span className="section__label">Merch</span>
            <h1 className="store-hero__title">Wear the world.</h1>
            <p className="store-hero__copy">
              Apparel, accessories, prints, and small goods—separate from the custom skateboard work and built for Printful fulfillment.
            </p>
            <div className="store-hero__actions">
              <a href="https://soundcloud.com/calitoy" target="_blank" rel="noreferrer" className="btn btn--kill">Open SoundCloud</a>
              <a href="#/boards" className="btn">View Custom Boards</a>
            </div>
          </div>

          <aside className="store-hero__panel">
            <div className="store-hero__card love-louder-feature">
              <img src="/love-calitoy-louder.jpg" alt="Love Calitoy Louder campaign artwork" />
              <div>
                <div className="store-hero__eyebrow">Current capsule</div>
                <h2>Love Calitoy Louder</h2>
                <p>Rose badge across apparel, wall art, and accessories.</p>
                <span className="love-louder-status">Design lineup · not yet purchasable</span>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="section love-louder-section">
        <div className="container">
          <span className="section__label">Capsule lineup</span>
          <h2 className="section__title">Product directions</h2>
          <p className="section__subtitle">Formats staged for artwork placement and fulfillment setup. Not live inventory.</p>
          <div className="love-louder-products">
            {[
              { name: 'Classic tee', note: 'Front badge' },
              { name: 'Heavyweight tee', note: 'Back print' },
              { name: 'Hoodie', note: 'Chest + hood' },
              { name: 'Crewneck', note: 'Center placement' },
              { name: 'Tote bag', note: 'Full-panel print' },
              { name: 'Dad hat', note: 'Embroidered badge' },
              { name: 'Art print', note: '18×24 matte' },
              { name: 'Sticker sheet', note: 'Die-cut set' },
            ].map((item, index) => (
              <article className={`love-louder-product love-louder-product--${index + 1}`} key={item.name}>
                <div className="love-louder-product__art" aria-hidden="true" />
                <span>{item.note}</span>
                <h3>{item.name}</h3>
                <small>Artwork placement ready</small>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <span className="section__label">How it works</span>
          <h2 className="section__title">Merch and boards live apart.</h2>
          <div className="process-grid">
            <article className="process-card">
              <div className="process-card__step">01</div>
              <h3>Printful catalog</h3>
              <p>Apparel and art-product inventory fulfilled cleanly through Printful.</p>
            </article>
            <article className="process-card">
              <div className="process-card__step">02</div>
              <h3>Capsule drops</h3>
              <p>Organized by campaign or era—not mixed into board ordering.</p>
            </article>
            <article className="process-card">
              <div className="process-card__step">03</div>
              <h3>Checkout flow</h3>
              <p>Product pages and cart for merch buyers; boards keep their inquiry path.</p>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
