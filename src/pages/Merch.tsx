export default function Merch() {
  return (
    <div className="store-page">
      <section className="store-hero section">
        <div className="container store-hero__grid">
          <div>
            <span className="section__label">Merch</span>
            <h1 className="store-hero__title">Wearables, prints, and drops are getting their own lane.</h1>
            <p className="store-hero__copy">
              XCalitoy merch is being split out from the custom skateboard work. This page is the start of the dedicated merch storefront, built to support Printful-powered drops, apparel, posters, and limited-run pieces.
            </p>
            <div className="store-hero__actions">
              <a href="https://printful.com" target="_blank" rel="noreferrer" className="btn btn--kill">Printful integration in progress</a>
              <a href="mailto:joseph@xcalitoy.com?subject=XCalitoy%20Merch" className="btn">Ask about merch drops</a>
            </div>
            <div className="store-trustbar">
              <span>Separate from custom boards</span>
              <span>Built for Printful fulfillment</span>
              <span>Apparel, prints, and future drops</span>
            </div>
          </div>

          <aside className="store-hero__panel">
            <div className="store-hero__card">
              <div className="store-hero__eyebrow">Coming next</div>
              <h2>Printful-powered merch</h2>
              <p>
                The merch side is being built as its own storefront so apparel and accessories can live separately from the custom board workflow.
              </p>
              <ul>
                <li>Apparel and wearable drops</li>
                <li>Poster and print runs</li>
                <li>Printful product syncing</li>
              </ul>
            </div>
          </aside>
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
