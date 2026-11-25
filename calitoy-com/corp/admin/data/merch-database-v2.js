// ============================================================
// CALITOY MERCH DATABASE v2.0
// Complete brand packages with Printful-ready products
// ============================================================

const BRANDS = {
  lovelouder: {
    name: 'Love Louder',
    tagline: 'Love Louder. Live Louder. Feel Louder. Heal Louder. Create Louder.',
    audience: '18-35, emotionally conscious, premium streetwear',
    aesthetic: 'Premium gold luxury, emotional depth, rose symbolism',
    storeId: null,
    colors: { primary: '#C9A227', accent: '#8B7355', text: '#1A1A1A', bg: '#0A0A0A' },
    social: { instagram: '@lovelouder', tiktok: '@lovelouder', website: 'lovelouder.com' },
    pillars: ['LOVE LOUDER', 'LIVE LOUDER', 'FEEL LOUDER', 'HEAL LOUDER', 'CREATE LOUDER'],
    logo: {
      crest: 'lovelouder_crest_gold.svg',
      wordmark: 'lovelouder_wordmark.svg',
      rose: 'lovelouder_rose.svg',
      signature: 'calitoy_signature.svg'
    }
  },
  kurced: {
    name: 'Kurced',
    tagline: 'Fall Louder. Rise Darker. Live Cursed. Love Deeper. Leave A Mark.',
    audience: '16-28, alt/goth scene, electronic music, dark romance',
    aesthetic: 'Neon gothic, electric purple, rose + cross symbolism',
    storeId: null,
    colors: { primary: '#6B2C91', accent: '#FF00FF', text: '#FFFFFF', bg: '#0A0A0A' },
    social: { instagram: '@kurced', tiktok: '@kurced', website: 'kurced.com' },
    pillars: ['FALL LOUDER', 'RISE DARKER', 'LIVE CURSED', 'LOVE DEEPER', 'LEAVE A MARK'],
    logo: {
      crest: 'kurced_crest_purple.svg',
      wordmark: 'kurced_wordmark.svg',
      rose: 'kurced_rose.svg',
      monogram: 'kurced_k.svg'
    }
  },
  tarosyn: {
    name: 'Tarosyn',
    tagline: 'You\'re A Star. Design Your Destiny. Know Your Story. Trust The Cosmos. Leave Your Mark.',
    audience: '22-40, spiritual seekers, witchy aesthetic, cosmic consciousness',
    aesthetic: 'Celestial luxury, purple nebula, gold stars, moon phases',
    storeId: 18056870, // Tarosyn Reliquary
    colors: { primary: '#4A1A6B', accent: '#C9A227', text: '#E8E8E8', bg: '#0A0A0A' },
    social: { instagram: '@tarosyn', tiktok: '@tarosyn', website: 'tarosyn.com' },
    pillars: ['YOU\'RE A STAR', 'DESIGN YOUR DESTINY', 'KNOW YOUR STORY', 'TRUST THE COSMOS', 'LEAVE YOUR MARK'],
    logo: {
      crest: 'tarosyn_crest_cosmic.svg',
      wordmark: 'tarosyn_wordmark.svg',
      compass: 'tarosyn_compass.svg',
      moon: 'tarosyn_moon.svg'
    }
  },
  wickedyouth: {
    name: 'Wicked Youth',
    tagline: 'Create. Disrupt. Elevate. Built By The Wicked. For The Awakened.',
    audience: '16-30, streetwear enthusiasts, Gen Z, urban culture',
    aesthetic: 'Street royalty, graffiti brush, crown symbol, purple accent',
    storeId: null,
    colors: { primary: '#000000', accent: '#8B5CF6', text: '#FFFFFF', bg: '#0A0A0A' },
    social: { instagram: '@wickedyth', tiktok: '@wickedyth', website: 'wickedyth.com' },
    pillars: ['CREATE', 'DISRUPT', 'ELEVATE'],
    logo: {
      wordmark: 'wickedyouth_wordmark.svg',
      monogram: 'wy_monogram.svg',
      crown: 'wy_crown.svg'
    }
  },
  endof8: {
    name: 'Endof8',
    tagline: 'Live Free. Ride Hard. End Of 8. Ocean Beach, CA',
    audience: '18-35, surf/skate culture, Ocean Beach locals, coastal rebels',
    aesthetic: 'Coastal grunge, OB pier, seagull, enso circle, burnt orange',
    storeId: null,
    colors: { primary: '#D2691E', accent: '#1A1A1A', text: '#F5F5DC', bg: '#0A0A0A' },
    social: { instagram: '@endof8.co', tiktok: '@endof8', website: 'endof8.com' },
    pillars: ['LIVE FREE', 'RIDE HARD', 'END OF 8'],
    logo: {
      wordmark: 'endof8_wordmark.svg',
      circle: 'endof8_enso.svg',
      pier: 'endof8_pier.svg',
      seagull: 'endof8_seagull.svg'
    }
  },
  calitoycorp: {
    name: 'CalitoyCorp',
    tagline: 'California Crafted. Globally Worn.',
    audience: '18-40, portfolio investors, brand enthusiasts',
    aesthetic: 'Corporate seal, heart + lightning, black and white',
    storeId: null,
    colors: { primary: '#1A1A1A', accent: '#C9A227', text: '#FFFFFF', bg: '#0A0A0A' },
    social: { instagram: '@calitoycorp', website: 'calitoycorp.com' },
    logo: {
      seal: 'calitoycorp_seal.svg',
      wordmark: 'calitoycorp_wordmark.svg'
    }
  }
};

// Printful Product Catalog with IDs
const PRINTFUL_PRODUCTS = {
  // Apparel
  unisex_tshirt: { id: 71, name: 'Unisex Heavy Cotton Tee', basePrice: 12.50, category: 'Apparel' },
  premium_hoodie: { id: 77, name: 'Premium Pullover Hoodie', basePrice: 24.00, category: 'Apparel' },
  crewneck: { id: 78, name: 'Classic Crewneck Sweatshirt', basePrice: 20.00, category: 'Apparel' },
  longsleeve: { id: 74, name: 'Long Sleeve Tee', basePrice: 15.00, category: 'Apparel' },
  
  // Headwear
  dad_hat: { id: 131, name: 'Dad Hat / Baseball Cap', basePrice: 14.00, category: 'Headwear' },
  beanie: { id: 132, name: 'Cuffed Beanie', basePrice: 12.00, category: 'Headwear' },
  snapback: { id: 133, name: 'Snapback Cap', basePrice: 15.00, category: 'Headwear' },
  
  // Accessories
  tote: { id: 258, name: 'Canvas Tote Bag', basePrice: 11.00, category: 'Accessories' },
  mug: { id: 19, name: 'Ceramic Mug 11oz', basePrice: 8.00, category: 'Home' },
  sticker: { id: 223, name: 'Vinyl Sticker Pack', basePrice: 6.00, category: 'Accessories' },
  lanyard: { id: 301, name: 'Woven Lanyard', basePrice: 7.00, category: 'Accessories' },
  wristband: { id: 302, name: 'Silicone Wristband', basePrice: 5.00, category: 'Accessories' },
  keychain: { id: 303, name: 'Metal Keychain', basePrice: 8.00, category: 'Accessories' },
  koozie: { id: 304, name: 'Can Cooler', basePrice: 6.00, category: 'Accessories' },
  
  // Posters
  poster: { id: 446, name: 'Art Print Poster', basePrice: 10.00, category: 'Art' }
};

// Complete Product Lines for Each Brand
const BRAND_PRODUCT_LINES = {
  lovelouder: [
    {
      id: 'll-001',
      name: 'Love Louder Crest Tee',
      design: 'Primary crest with rose and Calitoy signature',
      placement: 'center-chest',
      colors: ['Black', 'White'],
      products: ['unisex_tshirt', 'premium_hoodie', 'crewneck', 'longsleeve'],
      price: 32.00,
      status: 'approved'
    },
    {
      id: 'll-002',
      name: 'Rose Signature Tee',
      design: 'Rose with Calitoy script',
      placement: 'left-chest',
      colors: ['Black', 'White', 'Cream'],
      products: ['unisex_tshirt', 'premium_hoodie', 'dad_hat'],
      price: 28.00,
      status: 'approved'
    },
    {
      id: 'll-003',
      name: 'Love Louder Wordmark',
      design: 'Stacked wordmark with pillars',
      placement: 'center-chest',
      colors: ['Black', 'White'],
      products: ['unisex_tshirt', 'longsleeve', 'tote'],
      price: 30.00,
      status: 'approved'
    },
    {
      id: 'll-004',
      name: 'Guitar Pick Necklace',
      design: 'Engraved metal pendant with crest',
      placement: 'accessory',
      colors: ['Gold', 'Silver'],
      products: ['keychain'],
      price: 25.00,
      status: 'approved'
    },
    {
      id: 'll-005',
      name: 'Love Louder Sticker Pack',
      design: '5 sticker set: crest, rose, wordmark, pillars',
      placement: 'sticker',
      colors: ['Vinyl'],
      products: ['sticker'],
      price: 12.00,
      status: 'approved'
    }
  ],
  kurced: [
    {
      id: 'kur-001',
      name: 'Kurced Crest Tee',
      design: 'Purple neon ring with rose and cross',
      placement: 'center-chest',
      colors: ['Black'],
      products: ['unisex_tshirt', 'premium_hoodie', 'crewneck', 'longsleeve'],
      price: 35.00,
      status: 'approved'
    },
    {
      id: 'kur-002',
      name: 'Kurced Rose Signature',
      design: 'Rose above Kurced wordmark',
      placement: 'center-chest',
      colors: ['Black', 'White'],
      products: ['unisex_tshirt', 'dad_hat', 'beanie'],
      price: 32.00,
      status: 'approved'
    },
    {
      id: 'kur-003',
      name: 'Protégé Sleeve Print',
      design: 'PROTÉGÉ running down sleeve',
      placement: 'left-sleeve',
      colors: ['Black'],
      products: ['longsleeve', 'premium_hoodie'],
      price: 38.00,
      status: 'approved'
    },
    {
      id: 'kur-004',
      name: 'Kurced Icon Only',
      design: 'Rose symbol alone',
      placement: 'left-chest',
      colors: ['Black', 'White'],
      products: ['unisex_tshirt', 'dad_hat', 'beanie'],
      price: 28.00,
      status: 'approved'
    },
    {
      id: 'kur-005',
      name: 'Kurced Sticker Pack',
      design: '5 stickers: crest, rose, wordmark, stamp, icon',
      placement: 'sticker',
      colors: ['Vinyl'],
      products: ['sticker'],
      price: 12.00,
      status: 'approved'
    }
  ],
  tarosyn: [
    {
      id: 'tar-001',
      name: 'Tarosyn Cosmic Crest',
      design: 'Purple nebula ring with star compass',
      placement: 'center-chest',
      colors: ['Black'],
      products: ['unisex_tshirt', 'premium_hoodie', 'crewneck'],
      price: 35.00,
      status: 'approved'
    },
    {
      id: 'tar-002',
      name: 'Rose Compass Tee',
      design: 'Crescent moon with directional stars',
      placement: 'center-chest',
      colors: ['Black', 'White'],
      products: ['unisex_tshirt', 'dad_hat', 'beanie'],
      price: 32.00,
      status: 'approved'
    },
    {
      id: 'tar-003',
      name: 'Moon Seal',
      design: 'Crescent with stars icon',
      placement: 'left-chest',
      colors: ['Black', 'White', 'Navy'],
      products: ['unisex_tshirt', 'longsleeve', 'tote'],
      price: 28.00,
      status: 'approved'
    },
    {
      id: 'tar-004',
      name: 'Tarosyn Sleeve Text',
      design: 'TAROSYN down sleeve',
      placement: 'left-sleeve',
      colors: ['Black', 'White'],
      products: ['longsleeve', 'premium_hoodie'],
      price: 36.00,
      status: 'approved'
    },
    {
      id: 'tar-005',
      name: 'Cosmic Pendant',
      design: 'Moon seal charm necklace',
      placement: 'accessory',
      colors: ['Gold', 'Silver'],
      products: ['keychain'],
      price: 28.00,
      status: 'approved'
    }
  ],
  wickedyouth: [
    {
      id: 'wy-001',
      name: 'Wicked Youth Wordmark Tee',
      design: 'Brush script with drips',
      placement: 'center-chest',
      colors: ['Black', 'White', 'Purple'],
      products: ['unisex_tshirt', 'premium_hoodie', 'crewneck'],
      price: 30.00,
      status: 'approved'
    },
    {
      id: 'wy-002',
      name: 'WY Crown Circle',
      design: 'WY monogram with crown in circle',
      placement: 'center-chest',
      colors: ['Black', 'White'],
      products: ['unisex_tshirt', 'premium_hoodie', 'dad_hat', 'beanie'],
      price: 32.00,
      status: 'approved'
    },
    {
      id: 'wy-003',
      name: 'Create Disrupt Elevate',
      design: 'Three pillars text with crown',
      placement: 'center-chest',
      colors: ['Black', 'White'],
      products: ['unisex_tshirt', 'premium_hoodie', 'longsleeve'],
      price: 34.00,
      status: 'approved'
    },
    {
      id: 'wy-004',
      name: 'WY X Mark',
      design: 'Large X with WY monogram',
      placement: 'back-print',
      colors: ['Black'],
      products: ['premium_hoodie', 'unisex_tshirt'],
      price: 36.00,
      status: 'approved'
    },
    {
      id: 'wy-005',
      name: 'Wicked Youth Crown Icon',
      design: 'Crown symbol alone',
      placement: 'left-chest',
      colors: ['Black', 'White', 'Purple'],
      products: ['unisex_tshirt', 'dad_hat', 'beanie'],
      price: 28.00,
      status: 'approved'
    }
  ],
  endof8: [
    {
      id: 'e8-001',
      name: 'Endof8 Circle Logo',
      design: 'Enso circle with seagull',
      placement: 'center-chest',
      colors: ['Black', 'White', 'Cream'],
      products: ['unisex_tshirt', 'premium_hoodie', 'crewneck', 'dad_hat'],
      price: 30.00,
      status: 'approved'
    },
    {
      id: 'e8-002',
      name: 'OB Pier Sunset',
      design: 'Pier silhouette with orange sun',
      placement: 'center-chest',
      colors: ['Black', 'Navy'],
      products: ['unisex_tshirt', 'premium_hoodie', 'longsleeve'],
      price: 32.00,
      status: 'approved'
    },
    {
      id: 'e8-003',
      name: 'Endof8 Wordmark',
      design: 'Brush script with orange 8',
      placement: 'center-chest',
      colors: ['Black', 'White', 'Grey'],
      products: ['unisex_tshirt', 'premium_hoodie', 'tote'],
      price: 30.00,
      status: 'approved'
    },
    {
      id: 'e8-004',
      name: '8 + Seagull',
      design: 'Large 8 with seagull accent',
      placement: 'back-print',
      colors: ['Black', 'White'],
      products: ['premium_hoodie', 'unisex_tshirt'],
      price: 34.00,
      status: 'approved'
    },
    {
      id: 'e8-005',
      name: 'Ocean Beach Local',
      design: 'OB Pier with location text',
      placement: 'center-chest',
      colors: ['Black', 'Navy', 'Sand'],
      products: ['unisex_tshirt', 'dad_hat', 'beanie'],
      price: 30.00,
      status: 'approved'
    }
  ]
};

// Printful API Configuration
const PRINTFUL_CONFIG = {
  apiKey: 'GOrfWurY6n62Lptr07USfIAjBYVU8ZBhouKOmXDX',
  baseUrl: 'https://api.printful.com',
  stores: {
    tarosyn: 18056870, // Confirmed
    lovelouder: null, // To be created
    kurced: null, // To be created
    wickedyouth: null, // To be created
    endof8: null // To be created
  }
};

// Sync status tracker
const SYNC_STATUS = {
  pending: 'pending',
  syncing: 'syncing',
  synced: 'synced',
  live: 'live',
  error: 'error'
};

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { 
    BRANDS, 
    PRINTFUL_PRODUCTS, 
    BRAND_PRODUCT_LINES, 
    PRINTFUL_CONFIG,
    SYNC_STATUS 
  };
}
