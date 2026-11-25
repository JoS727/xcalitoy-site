const brandConfig = {
  'Kurced': {
    name: 'Kurced',
    tagline: 'Neon Goth. Cursed Hearts.',
    colors: { primary: '#FF00AA', secondary: '#1A1A2E', accent: '#00FF88' },
    fonts: { display: 'Orbitron', body: 'Inter' },
    logo: 'assets/logos/All_Brand_Logos_SVG/Kurced/Brand_Color/Primary_Crest.svg',
    wordmark: 'assets/logos/All_Brand_Logos_SVG/Kurced/Brand_Color/Wordmark.svg',
    style: 'neon-goth'
  },
  'Tarosyn': {
    name: 'Tarosyn',
    tagline: 'Mystical. Celestial. Aligned.',
    colors: { primary: '#6B4EE6', secondary: '#1A1A2E', accent: '#FFD700' },
    fonts: { display: 'Cinzel', body: 'Inter' },
    logo: 'assets/logos/All_Brand_Logos_SVG/Tarosyn/Brand_Color/Primary_Crest.svg',
    wordmark: 'assets/logos/All_Brand_Logos_SVG/Tarosyn/Brand_Color/Wordmark.svg',
    style: 'mystical'
  },
  'LoveLouder': {
    name: 'Love Louder',
    tagline: 'Luxury. Gold. Love.',
    colors: { primary: '#D4AF37', secondary: '#0A0A0A', accent: '#FFFFFF' },
    fonts: { display: 'Playfair Display', body: 'Inter' },
    logo: 'assets/logos/All_Brand_Logos_SVG/Calitoy_Love_Louder/Brand_Color/Primary_Crest.svg',
    wordmark: 'assets/logos/All_Brand_Logos_SVG/Calitoy_Love_Louder/Brand_Color/Love_Louder_Wordmark.svg',
    style: 'luxury'
  },
  'Endof8': {
    name: 'Endof8',
    tagline: 'Surf. Punk. California.',
    colors: { primary: '#FF6B35', secondary: '#1A1A2E', accent: '#00CED1' },
    fonts: { display: 'Bebas Neue', body: 'Inter' },
    logo: 'assets/logos/All_Brand_Logos_SVG/Endof8/Brand_Color/Primary_Badge.svg',
    wordmark: 'assets/logos/All_Brand_Logos_SVG/Endof8/Brand_Color/Wordmark.svg',
    style: 'surf-punk'
  },
  'WickedYouth': {
    name: 'Wicked Youth',
    tagline: 'Beauty. Streetwear. Chaos.',
    colors: { primary: '#FF3366', secondary: '#0A0A0A', accent: '#00FFFF' },
    fonts: { display: 'Montserrat', body: 'Inter' },
    logo: 'assets/logos/All_Brand_Logos_SVG/Wicked_Youth/Brand_Color/WY_Circle.svg',
    wordmark: 'assets/logos/All_Brand_Logos_SVG/Wicked_Youth/Brand_Color/Primary_Wordmark.svg',
    style: 'beauty-street'
  }
};

const merchCatalog = [
  // Kurced - Neon Goth
  { brand: 'Kurced', name: 'Neon Logo Tee', type: 'apparel', price: 45, image: 'assets/mockups/kurced/tee-black.jpg', description: 'Black tee with neon Kurced mark' },
  { brand: 'Kurced', name: 'Cursed Heart Hoodie', type: 'apparel', price: 85, image: 'assets/mockups/kurced/hoodie-black.jpg', description: 'Oversized hoodie with cracked-heart emblem' },
  { brand: 'Kurced', name: 'Afterglow Mesh Top', type: 'apparel', price: 55, image: 'assets/mockups/kurced/mesh-top.jpg', description: 'Layering piece with gothic type' },
  { brand: 'Kurced', name: 'Chrome Thorn Choker', type: 'accessory', price: 35, image: 'assets/mockups/kurced/choker.jpg', description: 'Dark-metal choker with thorn charm' },
  { brand: 'Kurced', name: 'Blacklight Sticker Pack', type: 'accessory', price: 12, image: 'assets/mockups/kurced/stickers.jpg', description: 'Broken halos, thorns, warped lettering' },
  { brand: 'Kurced', name: 'Nightclub Ruin Poster', type: 'art', price: 30, image: 'assets/mockups/kurced/poster.jpg', description: 'Neon-goth club-light print' },
  { brand: 'Kurced', name: 'Neon Tears Phone Case', type: 'accessory', price: 25, image: 'assets/mockups/kurced/phone-case.jpg', description: 'Dark case with neon-drip art' },
  { brand: 'Kurced', name: 'Dead Signal Tote', type: 'accessory', price: 38, image: 'assets/mockups/kurced/tote.jpg', description: 'Black canvas with glitch graphics' },

  // Tarosyn - Mystical
  { brand: 'Tarosyn', name: 'Major Arcana Candle Set', type: 'home', price: 68, image: 'assets/mockups/tarosyn/candles.jpg', description: 'Twelve dark-glass archetype candles' },
  { brand: 'Tarosyn', name: 'Birth Chart Journal', type: 'stationery', price: 32, image: 'assets/mockups/tarosyn/journal.jpg', description: 'Midnight linen with constellation mapping' },
  { brand: 'Tarosyn', name: 'Moon Phase Silk Scarf', type: 'accessory', price: 55, image: 'assets/mockups/tarosyn/scarf.jpg', description: 'Tonal lunar-cycle square' },
  { brand: 'Tarosyn', name: 'Seeker Tarot Cloth', type: 'home', price: 42, image: 'assets/mockups/tarosyn/tarot-cloth.jpg', description: 'Velvet reading cloth with embroidered edge' },
  { brand: 'Tarosyn', name: 'Celestial Transit Tee', type: 'apparel', price: 40, image: 'assets/mockups/tarosyn/tee.jpg', description: 'Washed black with transit diagram' },
  { brand: 'Tarosyn', name: 'Tarot Symbol Pin Set', type: 'accessory', price: 28, image: 'assets/mockups/tarosyn/pins.jpg', description: 'Moon, tower, sun, star icons' },
  { brand: 'Tarosyn', name: 'Zodiac Art Print Set', type: 'art', price: 45, image: 'assets/mockups/tarosyn/prints.jpg', description: 'Twelve moody zodiac illustrations' },
  { brand: 'Tarosyn', name: 'Night Sky Hoodie', type: 'apparel', price: 78, image: 'assets/mockups/tarosyn/hoodie.jpg', description: 'Charcoal with constellation work' },

  // Love Louder - Luxury
  { brand: 'LoveLouder', name: 'Gold Crest Tee', type: 'apparel', price: 65, image: 'assets/mockups/lovelouder/tee-gold.jpg', description: 'Premium black tee with gold crest' },
  { brand: 'LoveLouder', name: 'Love Signature Hoodie', type: 'apparel', price: 95, image: 'assets/mockups/lovelouder/hoodie.jpg', description: 'Luxury fleece with rose signature' },
  { brand: 'LoveLouder', name: 'Gold Foil Journal', type: 'stationery', price: 48, image: 'assets/mockups/lovelouder/journal.jpg', description: 'Embossed leather with gold accents' },
  { brand: 'LoveLouder', name: 'Rose Icon Tote', type: 'accessory', price: 58, image: 'assets/mockups/lovelouder/tote.jpg', description: 'Canvas with embroidered rose' },
  { brand: 'LoveLouder', name: 'Love Letter Print', type: 'art', price: 55, image: 'assets/mockups/lovelouder/print.jpg', description: 'Gold foil typography art' },
  { brand: 'LoveLouder', name: 'Embroidered Cap', type: 'accessory', price: 42, image: 'assets/mockups/lovelouder/cap.jpg', description: 'Black wool with gold embroidery' },
  { brand: 'LoveLouder', name: 'Luxury Sticker Set', type: 'accessory', price: 18, image: 'assets/mockups/lovelouder/stickers.jpg', description: 'Gold foil brand marks' },
  { brand: 'LoveLouder', name: 'Crest Pin', type: 'accessory', price: 22, image: 'assets/mockups/lovelouder/pin.jpg', description: 'Enamel pin with gold plating' },

  // Endof8 - Surf/Punk
  { brand: 'Endof8', name: 'Pier Logo Tee', type: 'apparel', price: 38, image: 'assets/mockups/endof8/tee.jpg', description: 'Washed tee with pier badge' },
  { brand: 'Endof8', name: 'Seagull Hoodie', type: 'apparel', price: 72, image: 'assets/mockups/endof8/hoodie.jpg', description: 'Pullover with seagull icon back' },
  { brand: 'Endof8', name: 'Eight Icon Long Sleeve', type: 'apparel', price: 48, image: 'assets/mockups/endof8/long-sleeve.jpg', description: 'Graphic with eight ball detail' },
  { brand: 'Endof8', name: 'Beach Tote', type: 'accessory', price: 35, image: 'assets/mockups/endof8/tote.jpg', description: 'Canvas with wave graphics' },
  { brand: 'Endof8', name: 'Surf Sticker Pack', type: 'accessory', price: 15, image: 'assets/mockups/endof8/stickers.jpg', description: 'Seagulls, waves, punk type' },
  { brand: 'Endof8', name: 'Pier Sunset Poster', type: 'art', price: 28, image: 'assets/mockups/endof8/poster.jpg', description: 'California pier photography' },
  { brand: 'Endof8', name: 'Trucker Cap', type: 'accessory', price: 32, image: 'assets/mockups/endof8/cap.jpg', description: 'Mesh back with embroidered badge' },
  { brand: 'Endof8', name: 'Keychain Set', type: 'accessory', price: 20, image: 'assets/mockups/endof8/keychain.jpg', description: 'Metal seagull and eight icons' },

  // Wicked Youth - Beauty/Street
  { brand: 'WickedYouth', name: 'WY Circle Tee', type: 'apparel', price: 42, image: 'assets/mockups/wickedyouth/tee.jpg', description: 'Black tee with circle logo' },
  { brand: 'WickedYouth', name: 'Crown Hoodie', type: 'apparel', price: 75, image: 'assets/mockups/wickedyouth/hoodie.jpg', description: 'Oversized with crown icon' },
  { brand: 'WickedYouth', name: 'WY Monogram Cap', type: 'accessory', price: 38, image: 'assets/mockups/wickedyouth/cap.jpg', description: 'Structured with monogram' },
  { brand: 'WickedYouth', name: 'Beauty Pouch', type: 'accessory', price: 28, image: 'assets/mockups/wickedyouth/pouch.jpg', description: 'Zipper pouch with neon trim' },
  { brand: 'WickedYouth', name: 'Crown Pin', type: 'accessory', price: 16, image: 'assets/mockups/wickedyouth/pin.jpg', description: 'Gold crown enamel pin' },
  { brand: 'WickedYouth', name: 'Street Sticker Pack', type: 'accessory', price: 14, image: 'assets/mockups/wickedyouth/stickers.jpg', description: 'Crown, WY marks, neon accents' },
  { brand: 'WickedYouth', name: 'Mirror Compact', type: 'accessory', price: 24, image: 'assets/mockups/wickedyouth/mirror.jpg', description: 'Pocket mirror with logo' },
  { brand: 'WickedYouth', name: 'Canvas Tote', type: 'accessory', price: 36, image: 'assets/mockups/wickedyouth/tote.jpg', description: 'Natural canvas with wordmark' }
];

// Cart functionality
let cart = [];

function addToCart(item) {
  cart.push(item);
  updateCartUI();
}

function updateCartUI() {
  const cartCount = document.getElementById('cart-count');
  if (cartCount) cartCount.textContent = cart.length;
}

function renderCatalog(filter = 'all') {
  const catalog = document.getElementById('catalog');
  if (!catalog) return;
  
  const items = filter === 'all' 
    ? merchCatalog 
    : merchCatalog.filter(item => item.brand === filter);
  
  catalog.innerHTML = items.map(item => {
    const config = brandConfig[item.brand];
    return `
      <article class="product-card" data-brand="${item.brand}">
        <div class="product-image" style="background: ${config.colors.secondary}">
          <img src="${item.image}" alt="${item.name}" loading="lazy">
          <div class="brand-badge" style="background: ${config.colors.primary}">${config.name}</div>
        </div>
        <div class="product-info">
          <h3>${item.name}</h3>
          <p class="product-desc">${item.description}</p>
          <div class="product-meta">
            <span class="price">$${item.price}</span>
            <span class="type">${item.type}</span>
          </div>
          <button onclick="addToCart(${JSON.stringify(item).replace(/"/g, '&quot;')})" 
                  class="add-to-cart" 
                  style="background: ${config.colors.primary}; color: ${config.colors.secondary}">
            Add to Cart
          </button>
        </div>
      </article>
    `;
  }).join('');
}

function renderBrandShowcase() {
  const showcase = document.getElementById('brand-showcase');
  if (!showcase) return;
  
  showcase.innerHTML = Object.values(brandConfig).map(brand => `
    <div class="brand-card" data-brand="${brand.name}" style="--brand-primary: ${brand.colors.primary}; --brand-secondary: ${brand.colors.secondary}">
      <div class="brand-logo">
        <img src="${brand.logo}" alt="${brand.name} logo">
      </div>
      <div class="brand-info">
        <h2>${brand.name}</h2>
        <p class="tagline">${brand.tagline}</p>
        <div class="color-palette">
          <span style="background: ${brand.colors.primary}"></span>
          <span style="background: ${brand.colors.secondary}"></span>
          <span style="background: ${brand.colors.accent}"></span>
        </div>
      </div>
      <a href="#catalog" onclick="filterBrand('${brand.name}')" class="shop-brand">Shop ${brand.name}</a>
    </div>
  `).join('');
}

function filterBrand(brandName) {
  renderCatalog(brandName);
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.filter === brandName);
  });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  renderBrandShowcase();
  renderCatalog();
  
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderCatalog(btn.dataset.filter);
    });
  });
});

// Expose functions globally
window.addToCart = addToCart;
window.filterBrand = filterBrand;
window.renderCatalog = renderCatalog;
