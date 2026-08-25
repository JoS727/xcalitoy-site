import { useState, useEffect } from 'react';

const LIONESS_URL = 'https://elasticstage.com/soundcloud/releases/calitoy-lioness-album';

interface PrintfulVariant {
  id: number;
  name: string;
  retail_price: string;
  product_image: string | null;
  product_name: string;
  variant_id: number;
  color: string;
}

interface PrintfulProduct {
  id: number;
  name: string;
  thumbnail: string;
  image: string;
  variants: PrintfulVariant[];
  variant_count: number;
}

export default function Merch() {
  const [products, setProducts] = useState<PrintfulProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<PrintfulProduct | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<PrintfulVariant | null>(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    setLoading(true);
    setError('');
    try {
      const r = await fetch('https://email-capture.calitoy.workers.dev', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'printful-products', brand: 'calitoy' }),
      });
      const d = await r.json();
      if (d.products) {
        setProducts(d.products);
      } else {
        setError(d.error || 'Failed to load products');
      }
    } catch {
      setError('Failed to connect to Printful');
    }
    setLoading(false);
  }

  function openProduct(product: PrintfulProduct) {
    setSelectedProduct(product);
    setSelectedVariant(product.variants[0] || null);
  }

  async function handleCheckout() {
    if (!selectedVariant || !selectedProduct) return;
    setCheckoutLoading(true);
    try {
      // Find the Stripe price ID for this Printful product
      const priceId = STRIPE_PRICE_MAP[selectedProduct.id] || STRIPE_PRICE_BY_NAME[selectedProduct.name];
      if (!priceId) {
        alert('Checkout not available for this product. Use Cash App or Venmo.');
        setCheckoutLoading(false);
        return;
      }
      const r = await fetch('https://email-capture.calitoy.workers.dev', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'checkout',
          priceId,
          productName: `${selectedProduct.name} (${selectedVariant.name})`,
          brand: 'calitoy',
        }),
      });
      const d = await r.json();
      if (d.url) {
        window.location.href = d.url;
      } else {
        alert(d.error || 'Checkout failed');
        setCheckoutLoading(false);
      }
    } catch {
      alert('Network error. Use Cash.app/$Joss3p or venmo.com/thatjoemad');
      setCheckoutLoading(false);
    }
  }

  function copyText(t: string) {
    navigator.clipboard.writeText(t);
    alert('Copied: ' + t);
  }

  // Map Printful product IDs to Stripe price IDs
  const STRIPE_PRICE_MAP: Record<number, string> = {
    452035936: 'price_1U4xwp4V6JEHW4', // Heartbeats
    452035937: 'price_1U4xwqISCKHDtOuF7SjCBJQK', // Create or Die Hoodie
    452035938: 'price_1U4xwqISCKHDtOuFlmHREl9Q', // CY/M
    452035939: 'price_1U4xwqISCKHDtOuFCSmkA8LW', // Signature
    452035942: 'price_1U4xwrISCKHDtOuFyqvN28Bt', // Create or Die Poster
  };

  const STRIPE_PRICE_BY_NAME: Record<string, string> = {
    'Heartbeats & Music — Black Tee': 'price_1U4xwpISCKHDtOuF4V6JEHW4',
    'Create or Die — Black Hoodie': 'price_1U4xwqISCKHDtOuF7SjCBJQK',
    'CY/M — Black Eco Tote': 'price_1U4xwqISCKHDtOuFlmHREl9Q',
    'Calitoy Signature — White Tee': 'price_1U4xwqISCKHDtOuFCSmkA8LW',
    'Create or Die — 8x10 Matte Poster': 'price_1U4xwrISCKHDtOuFyqvN28Bt',
  };

  if (loading) {
    return (
      <div className="store-page">
        <section className="store-hero section">
          <div className="container">
            <span className="section__label">XCalitoy store</span>
            <h1 className="store-hero__title">Loading products...</h1>
            <p style={{ color: 'var(--muted)' }}>Fetching live Printful catalog.</p>
          </div>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="store-page">
        <section className="store-hero section">
          <div className="container">
            <h1>Store unavailable</h1>
            <p style={{ color: '#c44' }}>{error}</p>
            <button onClick={fetchProducts} className="btn" style={{ marginTop: '1rem' }}>Retry</button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="store-page">
      <section className="store-hero section">
        <div className="container store-hero__grid">
          <div>
            <span className="section__label">XCalitoy store / official goods</span>
            <h1 className="store-hero__title">Wear the music.</h1>
            <p className="store-hero__copy">
              Official Calitoy merchandise. Real Printful product photos, real variants, real checkout. Every order goes straight to Printful for production and shipping.
            </p>
            <div className="store-trustbar" aria-label="Store status">
              <span>{products.length} products live</span><span>Stripe checkout</span><span>Printful fulfillment</span>
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
          <span className="section__label">Official merchandise / Printful catalog</span>
          <h2 className="section__title">All products</h2>
          <p className="section__subtitle">Every item shows real Printful product photos. Tap any product to see all sizes, colors, and checkout options.</p>

          <div className="design-family-grid">
            {products.map((product, index) => (
              <article
                className="design-family-card"
                key={product.id}
                style={{ cursor: 'pointer' }}
                onClick={() => openProduct(product)}
              >
                <div className="design-family-card__art">
                  <img
                    src={product.image || product.thumbnail}
                    alt={product.name}
                    loading="lazy"
                    style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', borderRadius: '4px' }}
                    onError={(e) => { (e.target as HTMLImageElement).src = product.thumbnail; }}
                  />
                  <span>{String(index + 1).padStart(2, '0')}</span>
                </div>
                <div className="design-family-card__copy">
                  <div className="design-family-card__status" style={{ color: '#c9a96e' }}>
                    {product.variant_count} variants
                  </div>
                  <h3>{product.name}</h3>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '8px' }}>
                    <strong style={{ fontSize: '1.1rem', color: '#c9a96e' }}>
                      ${product.variants[0]?.retail_price || '??'}
                    </strong>
                    <span style={{ fontSize: '0.7rem', color: '#8a7e6f', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                      Tap to buy
                    </span>
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
            <p style={{ fontSize: '0.65rem', color: '#8a7e6f', marginTop: '8px' }}>Card payments auto-fulfill through Printful. Manual payments need product name + size in the note.</p>
          </div>
        </div>
      </section>

      {/* Product Modal */}
      {selectedProduct && (
        <div
          style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 9999,
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px',
          }}
          onClick={() => setSelectedProduct(null)}
        >
          <div
            style={{
              background: '#0a0908', border: '1px solid rgba(201,169,110,0.2)', borderRadius: '8px',
              maxWidth: '500px', width: '100%', maxHeight: '90vh', overflowY: 'auto', padding: '28px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedProduct(null)}
              style={{ float: 'right', background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: '1.5rem', cursor: 'pointer' }}
            >
              x
            </button>

            {/* Product image - use artwork thumbnail, not blank Printful product image */}
            <img
              src={selectedProduct.image || selectedProduct.thumbnail}
              alt={selectedProduct.name}
              style={{ width: '100%', borderRadius: '4px', marginBottom: '16px' }}
              onError={(e) => { (e.target as HTMLImageElement).src = selectedProduct.thumbnail; }}
            />

            <div style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8a7e6f', marginBottom: '4px' }}>
              Printful Product #{selectedProduct.id}
            </div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', color: '#f5f0eb', marginBottom: '8px' }}>
              {selectedProduct.name}
            </h3>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '1.6rem', color: '#c9a96e', marginBottom: '16px' }}>
              ${selectedVariant?.retail_price || selectedProduct.variants[0]?.retail_price}
            </div>

            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', marginBottom: '16px' }}>
              {selectedProduct.variants.length} variants available. Printed and shipped by Printful.
            </p>

            {/* Size/variant selector */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8a7e6f', marginBottom: '8px' }}>
                Select size/variant
              </div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {selectedProduct.variants.map((v) => {
                  const sizeLabel = v.name.includes('/') ? v.name.split('/').pop()?.trim() : v.name;
                  return (
                    <button
                      key={v.id}
                      onClick={() => setSelectedVariant(v)}
                      style={{
                        padding: '8px 14px', fontSize: '0.7rem', fontWeight: 600,
                        fontFamily: "'DM Mono', monospace",
                        background: selectedVariant?.id === v.id ? '#c9a96e' : 'rgba(255,255,255,0.05)',
                        color: selectedVariant?.id === v.id ? '#0a0908' : 'rgba(255,255,255,0.6)',
                        border: selectedVariant?.id === v.id ? '1px solid #c9a96e' : '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '2px', cursor: 'pointer',
                      }}
                    >
                      {sizeLabel}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Payment options */}
            <div style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8a7e6f', marginBottom: '8px', marginTop: '16px' }}>
              Pay with
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
              <button
                onClick={handleCheckout}
                disabled={checkoutLoading}
                style={{
                  padding: '12px 24px', background: '#c9a96e', color: '#0a0908', border: 'none',
                  borderRadius: '2px', fontFamily: "'DM Mono', monospace", fontSize: '0.7rem',
                  fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
                  cursor: checkoutLoading ? 'wait' : 'pointer',
                }}
              >
                {checkoutLoading ? 'Redirecting...' : 'Card (Stripe)'}
              </button>
              <a href="https://cash.app/$Joss3p" target="_blank" rel="noreferrer" style={{
                padding: '12px 24px', background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.7)',
                border: '1px solid rgba(255,255,255,0.1)', borderRadius: '2px', fontSize: '0.7rem',
                fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center',
              }}>
                Cash App
              </a>
              <a href="https://venmo.com/thatjoemad" target="_blank" rel="noreferrer" style={{
                padding: '12px 24px', background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.7)',
                border: '1px solid rgba(255,255,255,0.1)', borderRadius: '2px', fontSize: '0.7rem',
                fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center',
              }}>
                Venmo
              </a>
              <button onClick={() => copyText('joseph@xcalitoy.com')} style={{
                padding: '12px 24px', background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.7)',
                border: '1px solid rgba(255,255,255,0.1)', borderRadius: '2px', fontSize: '0.7rem',
                fontWeight: 600, cursor: 'pointer',
              }}>
                Zelle
              </button>
            </div>

            <p style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', marginTop: '8px' }}>
              Card payment via Stripe. Printful auto-fulfills and ships. Or pay manually with product name + size in the note.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
