export default function Merch() {
  return (
    <div className="store-page">
      <section className="store-hero section">
        <div className="container store-hero__grid">
          <div>
            <span className="section__label">Merch</span>
            <h1 className="store-hero__title">Love Calitoy Louder—across every format.</h1>
            <p className="store-hero__copy">
              The Love Calitoy Louder rose artwork now anchors the dedicated merch lane: apparel, accessories, prints, and small goods, separate from the custom skateboard work.
            </p>
            <div className="store-hero__actions">
              <a href="https://soundcloud.com/calitoy" target="_blank" rel="noreferrer" className="btn btn--kill">Open SoundCloud</a>
              <a href="#/boards" className="btn">View Custom Boards</a>
            </div>
            <div className="store-trustbar">
              <span>Separate from custom boards</span>
              <span>Built for Printful fulfillment</span>
              <span>Apparel, prints, and future drops</span>
            </div>
          </div>

          <aside className="store-hero__panel">
            <div className="store-hero__card love-louder-feature">
              <img src="/love-calityoy-louder-mark.png" alt="Love Calitoy Louder rose-and-wordmark badge" />
              <div>
                <div className="store-hero__eyebrow">New design capsule</div>
                <h2>Love Calitoy Louder</h2>
                <p>
                  The Love Calitoy Louder rose-and-wordmark badge is now the shared imprint for apparel, accessories, wall art, and small goods.
                </p>
                <span className="love-louder-status">Design lineup · not yet a checkout listing</span>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="section love-louder-section">
        <div className="container">
          <span className="section__label">Love Calitoy Louder capsule</span>
          <h2 className="section__title">One artwork. Every kind of merch.</h2>
          <p className="section__subtitle">This design is now staged across the complete merch format lineup. These are product directions ready for artwork placement and Printful setup—not live inventory or checkout claims.</p>
          <div className="love-louder-products">
            {['Classic tee', 'Heavyweight tee', 'Hoodie', 'Crewneck', 'Tank top', 'Tote bag', 'Dad hat', 'Beanie', 'Art print', 'Sticker sheet', 'Phone case', 'Mug'].map((product) => (
              <article className="love-louder-product" key={product}>
                <img src="/love-calityoy-louder-mark.png" alt="" aria-hidden="true" />
                <span>Love Calitoy Louder</span>
                <h3>{product}</h3>
                <small>Artwork placement ready</small>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <span className="section__label">Store structure</span>
          <h2 className="section__title">Merch and boards now split cleanly.</h2>
          <p className="section__subtitle">
            Custom skateboards live in their own experience. Merch gets a separate buildout for Printful integration, product organization, and future drops.
          </p>
          <div className="process-grid">
            <article className="process-card">
              <div className="process-card__step">01</div>
              <h3>Printful catalog</h3>
              <p>Set up apparel, accessories, and art-product inventory that can be fulfilled cleanly.</p>
            </article>
            <article className="process-card">
              <div className="process-card__step">02</div>
              <h3>Drop structure</h3>
              <p>Organize merch by capsule, collection, or album-era release instead of mixing it into board ordering.</p>
            </article>
            <article className="process-card">
              <div className="process-card__step">03</div>
              <h3>Conversion flow</h3>
              <p>Build product pages and cart flow specifically for merch buyers while boards keep their inquiry-based path.</p>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
}
