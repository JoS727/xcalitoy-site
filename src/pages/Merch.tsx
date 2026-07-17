import { useMemo, useState } from 'react';

type Product = {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  priceLabel: string;
  copy: string;
  details: string[];
};

type CartItem = Product & { quantity: number };

const occasionTiles = [
  {
    title: 'Birthday Boards',
    copy: 'Decks built like a surprise drop — bold graphics, names, dates, and colors tuned to the person you are celebrating.',
    badge: 'Most gifted',
  },
  {
    title: 'Wedding & Anniversary',
    copy: 'Custom keepsake boards for wedding weekends, vow renewals, anniversaries, and relationship milestones with cleaner art direction.',
    badge: 'Premium',
  },
  {
    title: 'Baby & Family',
    copy: 'Birth stats, family crests, nursery palettes, and playful illustrations that turn a board into wall art with story behind it.',
    badge: 'New',
  },
  {
    title: 'Memorial & Tribute',
    copy: 'Respectful remembrance boards with photo collage, handwriting, dates, symbols, and space for the person being honored.',
    badge: 'Meaningful',
  },
];

const featuredBoards: Product[] = [
  {
    id: 'signature-photo-board',
    name: 'Signature Photo Board',
    subtitle: 'Best seller',
    price: 189,
    priceLabel: 'From $189',
    copy: 'Full custom deck with one hero photo, custom name lockup, event line, and gift-ready layout.',
    details: ['3 design directions', '48-hour mockup', 'wall-ready or skate-ready'],
  },
  {
    id: 'story-collage-deck',
    name: 'Story Collage Deck',
    subtitle: 'For milestones',
    price: 229,
    priceLabel: 'From $229',
    copy: 'A richer composition with multiple images, message copy, layered texture, and a more editorial treatment.',
    details: ['up to 6 images', 'custom back story panel', 'premium print finish'],
  },
  {
    id: 'event-party-run',
    name: 'Event Party Run',
    subtitle: 'For groups',
    price: 690,
    priceLabel: 'From $690',
    copy: 'Small-batch board run for birthdays, brand events, bachelor weekends, or launches where everyone gets one.',
    details: ['minimum 4 boards', 'shared art system', 'quantity pricing'],
  },
];

const steps = [
  {
    step: '1',
    title: 'Pick the occasion',
    copy: 'Start with birthday, wedding, memorial, baby, holiday, brand event, or just “make something legendary.”',
  },
  {
    step: '2',
    title: 'Send the story',
    copy: 'Upload photos, names, dates, inside jokes, colors, references, or the exact vibe you want the board to carry.',
  },
  {
    step: '3',
    title: 'Approve the mockup',
    copy: 'We turn your idea into a polished board concept before production, so the final piece feels intentional instead of generic.',
  },
  {
    step: '4',
    title: 'Gift it or hang it',
    copy: 'Use it as a real deck, display it as art, or make it the one gift that nobody throws in a drawer.',
  },
];

const useCases = [
  {
    title: 'For people who are hard to buy for',
    copy: 'This lands when candles, flowers, and generic personalized gifts feel too safe or too forgettable.',
  },
  {
    title: 'For moments with emotional weight',
    copy: 'Memorials, anniversaries, births, retirements, and milestones deserve something that can actually hold memory.',
  },
  {
    title: 'For brands, events, and teams',
    copy: 'Launches, activations, artist gifts, team prizes, and party runs work better when the object feels collectible.',
  },
];

const proofs = [
  { stat: '48 hrs', label: 'Typical first mockup window' },
  { stat: '1 of 1', label: 'Personalized design direction per order' },
  { stat: '4+', label: 'Occasion types already productized' },
  { stat: '∞', label: 'Ways to make the story feel personal' },
];

const faqs = [
  {
    question: 'Do I need to know exactly what I want?',
    answer: 'No. Send the occasion, the person, and a few references. The design direction can be shaped with you from there.',
  },
  {
    question: 'Can these be hung as art instead of ridden?',
    answer: 'Yes. A lot of these are ordered as keepsakes or wall pieces, not just skate decks for riding.',
  },
  {
    question: 'Can you do group orders or event runs?',
    answer: 'Yes. Birthdays, launches, wedding parties, brand activations, and team gifts are all in scope.',
  },
  {
    question: 'How fast can a mockup happen?',
    answer: 'Fast-turn projects are possible. Send the deadline up front so the right board format can be recommended.',
  },
];

const assurances = [
  'Designed for gifting, display, or actual riding',
  'Fast-turn mockups for event deadlines',
  'Human-led design, not a clip-art template machine',
  'Built for birthdays, weddings, memorials, baby showers, holidays, and brand moments',
];

function formatPrice(value: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
}

export default function Merch() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) {
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...current, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((current) =>
      current
        .map((item) =>
          item.id === productId ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);
  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);
  const inquiryBody = useMemo(() => {
    if (!cart.length) return 'Hi Joseph,%0D%0A%0D%0AI want to start a custom skateboard order.';
    const lines = cart.map((item) => `- ${item.name} x${item.quantity} (${formatPrice(item.price)} each)`);
    return `Hi Joseph,%0D%0A%0D%0AI want to start a custom skateboard order for:%0D%0A${lines.join('%0D%0A')}%0D%0A%0D%0ASubtotal starting point: ${formatPrice(subtotal)}%0D%0A%0D%0AOccasion:%0D%0ADeadline:%0D%0ANotes:`;
  }, [cart, subtotal]);

  return (
    <div className="store-page">
      <section className="store-hero section">
        <div className="container store-hero__grid">
          <div>
            <span className="section__label">Custom Skateboards for Every Occasion</span>
            <h1 className="store-hero__title">Like 1800Flowers — if the gift was a custom skateboard nobody forgets.</h1>
            <p className="store-hero__copy">
              XCalitoy turns names, photos, milestones, and inside stories into custom skateboard gifts that feel personal, collectible, and built to keep. Birthday boards. Wedding boards. Memorial boards. Baby boards. Holiday boards. Event boards. Same emotional job as flowers — way harder to forget.
            </p>
            <div className="store-hero__actions">
              <a href="mailto:joseph@tarosyn.com?subject=Custom%20Skateboard%20Order" className="btn btn--kill">Start a custom order</a>
              <a href="#collections" className="btn">Shop by occasion</a>
            </div>
            <div className="store-trustbar">
              <span>Custom art-led design</span>
              <span>Mockup before production</span>
              <span>Gift-worthy for real life moments</span>
            </div>
          </div>

          <aside className="store-hero__panel">
            <div className="store-hero__card">
              <div className="store-hero__eyebrow">Most requested</div>
              <h2>Photo + Name + Occasion Board</h2>
              <p>
                A premium personalized deck designed around one person, one milestone, and one strong visual story.
              </p>
              <ul>
                <li>Custom name and event line</li>
                <li>Photo-led artwork</li>
                <li>Gift-ready direction</li>
              </ul>
              <div className="store-hero__price">From $189</div>
            </div>
          </aside>
        </div>
      </section>

      <section className="section store-proofband">
        <div className="container">
          <div className="proof-grid">
            {proofs.map((proof) => (
              <div key={proof.label} className="proof-card">
                <div className="proof-card__stat">{proof.stat}</div>
                <div className="proof-card__label">{proof.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="collections">
        <div className="container">
          <span className="section__label">Shop by occasion</span>
          <h2 className="section__title">The gift finder, but for custom boards.</h2>
          <p className="section__subtitle">
            Instead of sending flowers that fade, send a board that lands like a story. Start with the reason you are giving it.
          </p>
          <div className="occasion-grid">
            {occasionTiles.map((tile) => (
              <article key={tile.title} className="occasion-card">
                <div className="occasion-card__badge">{tile.badge}</div>
                <h3>{tile.title}</h3>
                <p>{tile.copy}</p>
                <a href="mailto:joseph@tarosyn.com?subject=Custom%20Skateboard%20Order" className="occasion-card__link">Build this board →</a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section store-example-section">
        <div className="container store-example-grid">
          <div className="store-example-media">
            <img
              src="/decks/xcalitoy-skateboard-examples-cutout.png"
              alt="Four custom skateboard decks displayed vertically side by side, featuring bold graffiti-style lettering in green, purple, pink, and blue."
            />
          </div>
          <div className="store-example-copy">
            <span className="section__label">Deck examples</span>
            <h2 className="section__title">Use the deck itself as the emotional centerpiece.</h2>
            <p className="section__subtitle">
              These example decks make the idea click fast: bold color systems, strong type, collectible energy, and enough personality that the board feels like the gift — not just the packaging.
            </p>
            <div className="store-example-note">
              Great references for birthdays, artist drops, event runs, memorial pieces, or any custom board that needs to feel graphic and unforgettable.
            </div>
          </div>
        </div>
      </section>

      <section className="section store-band">
        <div className="container store-band__grid">
          <div>
            <span className="section__label">Why this works</span>
            <h2 className="section__title">Flowers say “I thought of you.” These say “I know your story.”</h2>
          </div>
          <div className="store-band__copy">
            <p>
              The whole point is emotional specificity. A custom skateboard can carry photos, dates, colors, hand-written notes, nicknames, symbols, and event energy in a way generic gifts just cannot.
            </p>
            <p>
              That makes it perfect for birthdays, memorials, anniversaries, new babies, graduations, launches, tour gifts, and “I needed this to hit harder than a gift basket.”
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="store-section-head">
            <div>
              <span className="section__label">Featured formats</span>
              <h2 className="section__title">Three easy ways to order.</h2>
              <p className="section__subtitle">
                Keep it simple if you want speed. Go bigger if the moment deserves more weight.
              </p>
            </div>
            <div className="cart-pill" aria-live="polite">
              <span>Cart</span>
              <strong>{cartCount}</strong>
            </div>
          </div>

          <div className="store-shop-grid">
            <div className="product-grid product-grid--shop">
              {featuredBoards.map((board) => (
                <article key={board.id} className="product-card">
                  <div className="product-card__visual">
                    <img
                      src="/decks/xcalitoy-skateboard-examples-cutout.png"
                      alt="Example custom XCalitoy skateboard decks"
                    />
                  </div>
                  <div className="product-card__subtitle">{board.subtitle}</div>
                  <h3>{board.name}</h3>
                  <div className="product-card__price">{board.priceLabel}</div>
                  <p>{board.copy}</p>
                  <ul>
                    {board.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                  <div className="product-card__actions">
                    <button type="button" className="btn btn--kill product-card__cta" onClick={() => addToCart(board)}>
                      Add to cart
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <aside className="cart-card">
              <div className="cart-card__eyebrow">Cart</div>
              <h3>Your custom board draft</h3>
              <p className="cart-card__copy">
                This is the lightweight pre-cart. It lets people build interest and reach a real inquiry with specifics already packed in.
              </p>

              {cart.length ? (
                <div className="cart-list">
                  {cart.map((item) => (
                    <div key={item.id} className="cart-item">
                      <div>
                        <div className="cart-item__name">{item.name}</div>
                        <div className="cart-item__price">{formatPrice(item.price)}</div>
                      </div>
                      <div className="cart-item__controls">
                        <button type="button" onClick={() => updateQuantity(item.id, -1)} aria-label={`Remove one ${item.name}`}>
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button type="button" onClick={() => updateQuantity(item.id, 1)} aria-label={`Add one ${item.name}`}>
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="cart-empty">No boards in cart yet. Add one of the featured formats to start shaping the order.</div>
              )}

              <div className="cart-summary">
                <div>
                  <span>Subtotal</span>
                  <strong>{formatPrice(subtotal)}</strong>
                </div>
                <p>Final pricing still depends on quantity, art complexity, deck format, and turnaround.</p>
              </div>

              <a
                href={`mailto:joseph@tarosyn.com?subject=Custom%20Skateboard%20Cart&body=${inquiryBody}`}
                className={`btn btn--kill cart-card__cta ${cart.length ? '' : 'cart-card__cta--disabled'}`}
                aria-disabled={!cart.length}
                onClick={(event) => {
                  if (!cart.length) event.preventDefault();
                }}
              >
                Continue from cart
              </a>
            </aside>
          </div>
        </div>
      </section>

      <section className="section store-process">
        <div className="container">
          <span className="section__label">How it works</span>
          <h2 className="section__title">A clean four-step flow.</h2>
          <div className="process-grid">
            {steps.map((item) => (
              <article key={item.step} className="process-card">
                <div className="process-card__step">{item.step}</div>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <span className="section__label">Where this wins</span>
          <h2 className="section__title">Built for moments that deserve more than a generic gift.</h2>
          <div className="usecase-grid">
            {useCases.map((item) => (
              <article key={item.title} className="usecase-card">
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section faq-section">
        <div className="container">
          <span className="section__label">FAQ</span>
          <h2 className="section__title">A few useful answers before you order.</h2>
          <div className="faq-grid">
            {faqs.map((item) => (
              <article key={item.question} className="faq-card">
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container store-cta">
          <div>
            <span className="section__label">Need it to feel special?</span>
            <h2 className="section__title">This is the lane.</h2>
            <p className="section__subtitle store-cta__subtitle">
              Tell us the occasion, the person, the deadline, and the energy. We’ll turn it into a board concept that actually feels like them.
            </p>
            <ul className="assurance-list">
              {assurances.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="store-cta__panel">
            <div className="store-cta__card">
              <div className="store-cta__eyebrow">Start here</div>
              <h3>Custom Skateboard Order</h3>
              <p>Email the occasion, delivery date, and whatever references you have. We’ll take it from there.</p>
              <a href="mailto:joseph@tarosyn.com?subject=Custom%20Skateboard%20Order" className="btn btn--kill">Email Joseph</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
