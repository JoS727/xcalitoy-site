const PRODUCTS = [
  // Calitoy Merch (Printful store 18518390)
  { name: 'Heartbeats & Music', brand: 'Calitoy', type: 'Black Tee', price: '$36', art: '/calitoy-heartbeats.png', priceId: 'price_1U4xwpISCKHDtOuF4V6JEHW4', sizes: ['S','M','L','XL','2XL'], desc: 'Black cotton tee with Heartbeats & Music artwork. Unisex.' },
  { name: 'Create or Die', brand: 'Calitoy', type: 'Black Hoodie', price: '$64', art: '/calitoy-create-or-die.png', priceId: 'price_1U4xwqISCKHDtOuF7SjCBJQK', sizes: ['S','M','L','XL','2XL'], desc: 'Heavyweight black hoodie with Create or Die artwork. Unisex.' },
  { name: 'CY/M', brand: 'Calitoy', type: 'Eco Tote', price: '$30', art: '/calitoy-cym.png', priceId: 'price_1U4xwqISCKHDtOuFlmHREl9Q', sizes: ['One size'], desc: 'Black eco tote with CY/M monogram.' },
  { name: 'Calitoy Signature', brand: 'Calitoy', type: 'White Tee', price: '$30', art: '/calitoy-signature.png', priceId: 'price_1U4xwqISCKHDtOuFCSmkA8LW', sizes: ['S','M','L','XL','2XL'], desc: 'White cotton tee with Calitoy Signature wordmark. Unisex.' },
  { name: 'Create or Die', brand: 'Calitoy', type: '8x10 Poster', price: '$22', art: '/calitoy-create-or-die.png', priceId: 'price_1U4xwrISCKHDtOuFyqvN28Bt', sizes: ['8x10'], desc: '8x10 matte poster with Create or Die artwork. Frame-ready.' },
  // Kurced Merch (Printful store 18520025)
  { name: 'Locked Out', brand: 'Kurced', type: 'Black Tee', price: '$32', art: '/kurced-locked-out.jpg', priceId: 'price_1U4xwrISCKHDtOuFf9uj4gR5', sizes: ['S','M','L','XL','2XL'], desc: 'Black cotton tee with Locked Out cover art. Unisex.' },
  { name: 'All-American Boys', brand: 'Kurced', type: 'Black Tee', price: '$32', art: '/kurced-all-american-boys.jpg', priceId: 'price_1U4xwrISCKHDtOuFwJP3dlNz', sizes: ['S','M','L','XL','2XL'], desc: 'Black cotton tee with All-American Boys cover art. Unisex.' },
  { name: 'Overdose', brand: 'Kurced', type: '10x10 Poster', price: '$24', art: '/kurced-overdose.jpg', priceId: 'price_1U4xwsISCKHDtOuFD4VzB0UD', sizes: ['10x10'], desc: '10x10 matte poster with Overdose cover art. Frame-ready.' },
  { name: 'Last Seen', brand: 'Kurced', type: 'Black Hoodie', price: '$62', art: '/kurced-last-seen.jpg', priceId: 'price_1U4xwsISCKHDtOuFbnReedWh', sizes: ['S','M','L','XL','2XL'], desc: 'Heavyweight black hoodie with Last Seen cover art. Unisex.' },
  { name: 'Medicine', brand: 'Kurced', type: 'Black Tote', price: '$30', art: '/kurced-medicine.jpg', priceId: 'price_1U4xwsISCKHDtOuFgCWSJ5d5', sizes: ['One size'], desc: 'Black canvas tote with Medicine cover art.' },
];

const LIONESS_URL = 'https://elasticstage.com/soundcloud/releases/calitoy-lioness-album';

export default function Merch() {
  return (
    <div className="store-page">
      <section className="store-hero section">
        <div className="container store-hero__grid">
          <div>
            <span className="section__label">XCalitoy store / official goods</span>
            <h1 className="store-hero__title">Wear the music.</h1>
            <p className="store-hero__copy">
              Official Calitoy and Kurced merchandise. Printed and shipped via Printful. Stripe checkout with auto-fulfillment. Every order goes straight to production.
            </p>
            <div className="store-trustbar" aria-label="Store status">
              <span>10 products live</span><span>Stripe checkout</span><span>Printful fulfillment</span>
            </div>
            <div className="store-hero__actions">
              <a href="#products" className="btn btn--kill">Shop now</a>
              <a href={LIONESS_URL} target="_blank" rel="noreferrer" className="btn">Get Lioness on vinyl</a>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="products">
        <div className="container">
          <span className="section__label">Official merchandise</span>
          <h2 className="section__title">All products</h2>
          <p className="section__subtitle">Every item is printed on demand and shipped directly from Printful. Tap any product to choose size and checkout.</p>

          <div className="design-family-grid">
            {PRODUCTS.map((product, index) => (
              <article
                className="design-family-card"
                key={`${product.name}-${index}`}
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  const event = new CustomEvent('open-merch-modal', {
                    detail: {
                      name: product.name,
                      brand: product.brand,
                      type: product.type,
                      price: product.price,
                      art: product.art,
                      priceId: product.priceId,
                      sizes: product.sizes,
                      desc: product.desc,
                    }
                  });
                  window.dispatchEvent(event);
                }}
              >
                <div className="design-family-card__art">
                  <img src={product.art} alt={`${product.name} artwork`} loading="lazy" />
                  <span>{String(index + 1).padStart(2, '0')}</span>
                </div>
                <div className="design-family-card__copy">
                  <div className="design-family-card__status" style={{ color: '#c9a96e' }}>{product.brand.toUpperCase()} / {product.type.toUpperCase()}</div>
                  <h3>{product.name}</h3>
                  <p>{product.desc}</p>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '8px' }}>
                    <strong style={{ fontSize: '1.1rem', color: '#c9a96e' }}>{product.price}</strong>
                    <span style={{ fontSize: '0.7rem', color: '#8a7e6f', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Tap to buy</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div style={{ marginTop: '32px', padding: '20px', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.6rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#8a7e6f', marginBottom: '8px' }}>Payment options</div>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <span style={{ padding: '8px 16px', background: 'rgba(201,169,110,0.15)', border: '1px solid rgba(201,169,110,0.3)', borderRadius: '4px', fontSize: '0.7rem', color: '#c9a96e', fontWeight: 600 }}>STRIPE CARD</span>
              <span style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', fontSize: '0.7rem', color: '#8a7e6f' }}>Cash App</span>
              <span style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', fontSize: '0.7rem', color: '#8a7e6f' }}>Venmo</span>
              <span style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '4px', fontSize: '0.7rem', color: '#8a7e6f' }}>Zelle</span>
            </div>
            <p style={{ fontSize: '0.65rem', color: '#8a7e6f', marginTop: '8px' }}>All card payments auto-fulfill through Printful. Manual payments (Cash App, Venmo, Zelle) require product name and size in the note.</p>
          </div>
        </div>
      </section>

      <div id="merch-modal-root"></div>
    </div>
  );
}
