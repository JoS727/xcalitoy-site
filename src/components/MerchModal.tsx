import { useState, useEffect } from 'react';

interface ProductData {
  name: string;
  brand: string;
  type: string;
  price: string;
  art: string;
  priceId: string;
  sizes: string[];
  desc: string;
}

export default function MerchModal() {
  const [product, setProduct] = useState<ProductData | null>(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail as ProductData;
      setProduct(detail);
      setSelectedSize(detail.sizes[0] || '');
      setError('');
    };
    window.addEventListener('open-merch-modal', handler);
    return () => window.removeEventListener('open-merch-modal', handler);
  }, []);

  if (!product) return null;

  const handleBuy = async () => {
    setLoading(true);
    setError('');
    try {
      const r = await fetch('https://email-capture.calitoy.workers.dev', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'checkout',
          priceId: product.priceId,
          productName: `${product.name} (${product.type}) Size: ${selectedSize}`,
          brand: product.brand.toLowerCase(),
        }),
      });
      const d = await r.json();
      if (d.url) {
        window.location.href = d.url;
      } else {
        setError(d.error || 'Checkout failed. Try Cash App or Venmo.');
        setLoading(false);
      }
    } catch {
      setError('Network error. Use Cash App, Venmo, or Zelle.');
      setLoading(false);
    }
  };

  const copyText = (t: string) => {
    navigator.clipboard.writeText(t);
    alert('Copied: ' + t);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.85)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={() => setProduct(null)}
    >
      <div
        style={{
          background: '#0a0908',
          border: '1px solid rgba(201,169,110,0.2)',
          borderRadius: '8px',
          maxWidth: '500px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '28px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setProduct(null)}
          style={{ float: 'right', background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: '1.5rem', cursor: 'pointer' }}
        >
          x
        </button>

        <img
          src={product.art}
          alt={product.name}
          style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', borderRadius: '4px', marginBottom: '16px' }}
        />

        <div style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8a7e6f', marginBottom: '4px' }}>
          {product.brand} / {product.type}
        </div>

        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', color: '#f5f0eb', marginBottom: '8px' }}>
          {product.name}
        </h3>

        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: '1.6rem', color: '#c9a96e', marginBottom: '16px' }}>
          {product.price}
        </div>

        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '16px' }}>
          {product.desc} Printed and shipped via Printful.
        </p>

        {product.sizes.length > 1 && (
          <div style={{ marginBottom: '16px' }}>
            <div style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8a7e6f', marginBottom: '8px' }}>
              Size
            </div>
            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  style={{
                    padding: '8px 14px',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    fontFamily: "'DM Mono', monospace",
                    background: selectedSize === size ? '#c9a96e' : 'rgba(255,255,255,0.05)',
                    color: selectedSize === size ? '#0a0908' : 'rgba(255,255,255,0.6)',
                    border: selectedSize === size ? '1px solid #c9a96e' : '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '2px',
                    cursor: 'pointer',
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        <div style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#8a7e6f', marginBottom: '8px', marginTop: '16px' }}>
          Pay with
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
          <button
            onClick={handleBuy}
            disabled={loading}
            style={{
              padding: '12px 24px',
              background: '#c9a96e',
              color: '#0a0908',
              border: 'none',
              borderRadius: '2px',
              fontFamily: "'DM Mono', monospace",
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              cursor: loading ? 'wait' : 'pointer',
            }}
          >
            {loading ? 'Redirecting...' : 'Card (Stripe)'}
          </button>
          <a
            href="https://cash.app/$Joss3p"
            target="_blank"
            rel="noreferrer"
            style={{
              padding: '12px 24px',
              background: 'rgba(255,255,255,0.05)',
              color: 'rgba(255,255,255,0.7)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '2px',
              fontSize: '0.7rem',
              fontWeight: 600,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            Cash App
          </a>
          <a
            href="https://venmo.com/thatjoemad"
            target="_blank"
            rel="noreferrer"
            style={{
              padding: '12px 24px',
              background: 'rgba(255,255,255,0.05)',
              color: 'rgba(255,255,255,0.7)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '2px',
              fontSize: '0.7rem',
              fontWeight: 600,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            Venmo
          </a>
          <button
            onClick={() => copyText('joseph@xcalitoy.com')}
            style={{
              padding: '12px 24px',
              background: 'rgba(255,255,255,0.05)',
              color: 'rgba(255,255,255,0.7)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '2px',
              fontSize: '0.7rem',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Zelle
          </button>
        </div>

        {error && (
          <p style={{ color: '#c44', fontSize: '0.8rem', marginTop: '8px' }}>{error}</p>
        )}

        <p style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', marginTop: '8px' }}>
          Card payment via Stripe. Printful auto-fulfills and ships. Or pay manually with product name + size in the note.
        </p>
      </div>
    </div>
  );
}
