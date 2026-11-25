// ============================================================
// CALITOY MERCH ADMIN SYSTEM
// Combined approval dashboard + Printful integration
// ============================================================

const BRANDS = {
  calitoy: {
    name: 'Calitoy',
    tagline: 'California Crafted. Globally Worn.',
    audience: '18-35, streetwear enthusiasts, California culture',
    aesthetic: 'Minimal, coastal, modern streetwear',
    storeId: null, // Will be created
    colors: { primary: '#1a1a1a', accent: '#f4a261', text: '#ffffff' }
  },
  kurced: {
    name: 'Kurced',
    tagline: 'Neon Goth. Digital Darkness.',
    audience: '16-28, alt/goth scene, electronic music fans',
    aesthetic: 'Neon gothic, glitch, dark club aesthetic',
    storeId: null,
    colors: { primary: '#0a0a0a', accent: '#ff006e', text: '#ffffff' }
  },
  tarosyn: {
    name: 'Tarosyn',
    tagline: 'Mystical Objects. Modern Rituals.',
    audience: '22-40, spiritual seekers, witchy aesthetic',
    aesthetic: 'Celestial, mystical, ritual objects',
    storeId: 18056870, // Existing: Tarosyn Reliquary
    colors: { primary: '#1a1a2e', accent: '#c9b037', text: '#e8e8e8' }
  },
  endof8: {
    name: 'Endof8',
    tagline: 'OB Lore. Coastal Legends.',
    audience: '18-35, surf/skate culture, Ocean Beach locals',
    aesthetic: 'Coastal grunge, surf punk, beach gothic',
    storeId: null,
    colors: { primary: '#2d3436', accent: '#00cec9', text: '#dfe6e9' }
  },
  wickedyouth: {
    name: 'Wicked Youth',
    tagline: 'Glow With Teeth.',
    audience: '16-30, beauty enthusiasts, Gen Z trendsetters',
    aesthetic: 'Bold beauty, glossy, high-contrast',
    storeId: null,
    colors: { primary: '#000000', accent: '#ff7675', text: '#ffffff' }
  }
};

// 10 Core Products available for all brands
const CORE_PRODUCTS = [
  {
    id: 'unisex-tshirt',
    name: 'Unisex Heavy Cotton Tee',
    category: 'Apparel',
    printfulId: 71, // Gildan 5000
    basePrice: 12.50,
    colors: ['Black', 'White', 'Navy', 'Heather Grey', 'Red'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'],
    mockupTemplate: 'front-back-flat',
    description: 'Classic fit unisex tee, 100% cotton'
  },
  {
    id: 'premium-hoodie',
    name: 'Premium Pullover Hoodie',
    category: 'Apparel',
    printfulId: 77, // Unisex Heavy Blend Hoodie
    basePrice: 24.00,
    colors: ['Black', 'White', 'Navy', 'Charcoal', 'Red'],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    mockupTemplate: 'front-flat',
    description: 'Heavy blend hoodie with front pouch pocket'
  },
  {
    id: 'crewneck-sweatshirt',
    name: 'Classic Crewneck Sweatshirt',
    category: 'Apparel',
    printfulId: 78,
    basePrice: 20.00,
    colors: ['Black', 'White', 'Grey', 'Navy'],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    mockupTemplate: 'front-flat',
    description: 'Comfortable crewneck for layering'
  },
  {
    id: 'longsleeve-tee',
    name: 'Long Sleeve Tee',
    category: 'Apparel',
    printfulId: 74,
    basePrice: 15.00,
    colors: ['Black', 'White', 'Navy'],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    mockupTemplate: 'front-back-flat',
    description: 'Long sleeve cotton tee'
  },
  {
    id: 'dad-hat',
    name: 'Dad Hat / Baseball Cap',
    category: 'Headwear',
    printfulId: 131,
    basePrice: 14.00,
    colors: ['Black', 'White', 'Navy', 'Red'],
    sizes: ['One Size'],
    mockupTemplate: 'front-angle',
    description: 'Low profile unstructured cap'
  },
  {
    id: 'beanie',
    name: 'Cuffed Beanie',
    category: 'Headwear',
    printfulId: 132,
    basePrice: 12.00,
    colors: ['Black', 'White', 'Grey', 'Navy'],
    sizes: ['One Size'],
    mockupTemplate: 'front-flat',
    description: 'Ribbed knit cuffed beanie'
  },
  {
    id: 'tote-bag',
    name: 'Canvas Tote Bag',
    category: 'Accessories',
    printfulId: 258,
    basePrice: 11.00,
    colors: ['Natural', 'Black'],
    sizes: ['One Size'],
    mockupTemplate: 'front-flat',
    description: 'Heavy canvas tote with bottom gusset'
  },
  {
    id: 'mug',
    name: 'Ceramic Mug 11oz',
    category: 'Home',
    printfulId: 19,
    basePrice: 8.00,
    colors: ['White', 'Black'],
    sizes: ['11oz'],
    mockupTemplate: 'front-angle',
    description: 'White ceramic mug, dishwasher safe'
  },
  {
    id: 'poster',
    name: 'Art Print Poster',
    category: 'Art',
    printfulId: 446,
    basePrice: 10.00,
    colors: ['Matte', 'Glossy'],
    sizes: ['12×16', '18×24', '24×36'],
    mockupTemplate: 'flat-lay',
    description: 'Museum-quality poster prints'
  },
  {
    id: 'sticker-pack',
    name: 'Vinyl Sticker Pack (5pc)',
    category: 'Accessories',
    printfulId: 223,
    basePrice: 6.00,
    colors: ['White Vinyl'],
    sizes: ['3×3 each'],
    mockupTemplate: 'sheet-flat',
    description: 'Weatherproof vinyl stickers, die-cut'
  }
];

// 50 DESIGNS: 10 per brand
const DESIGN_LIBRARY = {
  calitoy: [
    {
      id: 'cal-001',
      name: 'Coastal Minimal',
      prompt: 'Minimal line art of California coastline at sunset, single continuous line drawing style, warm orange and deep navy gradient, modern streetwear aesthetic, centered composition, clean negative space',
      placement: 'center-chest',
      colors: ['navy-shirt-white-ink', 'cream-shirt-navy-ink'],
      status: 'pending'
    },
    {
      id: 'cal-002',
      name: 'Golden State Script',
      prompt: 'Hand-lettered "CALITOY" in flowing script, gold foil effect, California golden poppy accent, vintage sign painter style, slightly weathered texture, luxury streetwear feel',
      placement: 'center-chest',
      colors: ['black-shirt-gold-ink', 'white-shirt-gold-ink'],
      status: 'pending'
    },
    {
      id: 'cal-003',
      name: 'Pacific Wave',
      prompt: 'Abstract wave form in geometric shapes, Japanese woodblock print influence, teal and sand colors, minimal and bold, surf culture meets modern design',
      placement: 'center-chest',
      colors: ['white-shirt-teal-ink', 'sand-shirt-navy-ink'],
      status: 'pending'
    },
    {
      id: 'cal-004',
      name: 'Desert Bloom',
      prompt: 'Joshua tree silhouette with blooming desert flowers, twilight purple sky gradient, Southwest aesthetic, mystical desert vibes, detailed botanical illustration style',
      placement: 'center-chest',
      colors: ['black-shirt-white-ink', 'dusty-rose-shirt-black-ink'],
      status: 'pending'
    },
    {
      id: 'cal-005',
      name: 'Cali Bear Modern',
      prompt: 'California state bear reimagined in geometric low-poly style, walking left, red star accent, contemporary streetwear interpretation, bold and graphic',
      placement: 'center-chest',
      colors: ['navy-shirt-red-ink', 'white-shirt-navy-ink'],
      status: 'pending'
    },
    {
      id: 'cal-006',
      name: 'Venice Vibes',
      prompt: 'Skateboard and palm tree composition, Venice Beach boardwalk energy, 70s sunset colors, laid-back California lifestyle, retro graphic design',
      placement: 'center-chest',
      colors: ['black-shirt-orange-ink', 'cream-shirt-teal-ink'],
      status: 'pending'
    },
    {
      id: 'cal-007',
      name: 'Highway 1',
      prompt: 'Winding coastal highway from aerial view, PCH route, minimalist map aesthetic, adventure travel vibes, clean line work',
      placement: 'center-chest',
      colors: ['white-shirt-black-ink', 'navy-shirt-white-ink'],
      status: 'pending'
    },
    {
      id: 'cal-008',
      name: 'Citrus & Sun',
      prompt: 'Orange slice and sun fusion, California citrus heritage, warm yellow and orange gradient, fresh and vibrant, summer energy',
      placement: 'center-chest',
      colors: ['white-shirt-orange-ink', 'yellow-shirt-black-ink'],
      status: 'pending'
    },
    {
      id: 'cal-009',
      name: 'Redwood Roots',
      prompt: 'Giant redwood tree cross-section showing rings, nature meets longevity concept, earthy brown tones, environmental consciousness',
      placement: 'center-chest',
      colors: ['forest-shirt-cream-ink', 'cream-shirt-forest-ink'],
      status: 'pending'
    },
    {
      id: 'cal-010',
      name: 'Cali Toy Block',
      prompt: 'CALITOY in bold block letters, toy building block aesthetic, primary colors accent, playful but sophisticated, stacked letter composition',
      placement: 'center-chest',
      colors: ['black-shirt-white-ink', 'white-shirt-multi-ink'],
      status: 'pending'
    }
  ],
  kurced: [
    {
      id: 'kur-001',
      name: 'Neon Cross',
      prompt: 'Gothic cross with neon pink glow effect, chrome texture, black background, digital glitch artifacts, cyber goth aesthetic, sharp and angular',
      placement: 'center-chest',
      colors: ['black-shirt-neon-pink', 'black-shirt-neon-green'],
      status: 'pending'
    },
    {
      id: 'kur-002',
      name: 'Digital Thorns',
      prompt: 'Thorn vine wrapped around glitching digital text "KURCED", pixel distortion, dark aesthetic, hot pink and black, vaporwave goth',
      placement: 'center-chest',
      colors: ['black-shirt-pink-ink', 'black-shirt-cyan-ink'],
      status: 'pending'
    },
    {
      id: 'kur-003',
      name: 'Broken Halo',
      prompt: 'Cracked halo floating above empty space, dripping neon paint effect, fallen angel concept, dark and moody, purple and pink gradient',
      placement: 'center-chest',
      colors: ['black-shirt-purple-ink', 'black-shirt-white-ink'],
      status: 'pending'
    },
    {
      id: 'kur-004',
      name: 'Cursed Heart',
      prompt: 'Anatomical heart with barbed wire wrapped around it, neon red glow, dark romance aesthetic, detailed illustration, gothic valentine',
      placement: 'center-chest',
      colors: ['black-shirt-red-ink', 'white-shirt-red-ink'],
      status: 'pending'
    },
    {
      id: 'kur-005',
      name: 'Ghost Signal',
      prompt: 'Static TV screen with ghostly face emerging, analog horror aesthetic, scan lines, black and white with red accent, creepypasta vibes',
      placement: 'center-chest',
      colors: ['black-shirt-white-ink', 'black-shirt-green-ink'],
      status: 'pending'
    },
    {
      id: 'kur-006',
      name: 'Neon Cathedral',
      prompt: 'Gothic cathedral windows with neon light streaming through, stained glass effect in hot pink and cyan, religious iconography meets club aesthetic',
      placement: 'center-chest',
      colors: ['black-shirt-multi-neon', 'navy-shirt-pink-ink'],
      status: 'pending'
    },
    {
      id: 'kur-007',
      name: 'Toxic Love',
      prompt: 'Two snake heads forming heart shape, dripping venom in neon green, dark love aesthetic, detailed scale texture, gothic romance',
      placement: 'center-chest',
      colors: ['black-shirt-green-ink', 'black-shirt-pink-ink'],
      status: 'pending'
    },
    {
      id: 'kur-008',
      name: 'Digital Roses',
      prompt: 'Roses dissolving into pixels, vaporwave aesthetic, pink and purple gradient, beauty in decay concept, glitch art style',
      placement: 'center-chest',
      colors: ['black-shirt-pink-ink', 'white-shirt-black-ink'],
      status: 'pending'
    },
    {
      id: 'kur-009',
      name: 'Midnight Mass',
      prompt: 'Candlelit ritual scene, occult symbols, dark church interior, red and black color scheme, gothic horror aesthetic, atmospheric',
      placement: 'center-chest',
      colors: ['black-shirt-red-ink', 'black-shirt-white-ink'],
      status: 'pending'
    },
    {
      id: 'kur-010',
      name: 'KURCED Wordmark',
      prompt: 'KURCED in custom gothic blackletter font, dripping effect, neon outline, bold and aggressive, street goth typography',
      placement: 'center-chest',
      colors: ['black-shirt-white-ink', 'white-shirt-black-ink'],
      status: 'pending'
    }
  ],
  tarosyn: [
    {
      id: 'tar-001',
      name: 'The Moon Card',
      prompt: 'Tarot moon card reimagined, howling wolf silhouette, two towers, crayfish emerging from water, celestial blue and gold, mystical illustration',
      placement: 'center-chest',
      colors: ['navy-shirt-gold-ink', 'black-shirt-silver-ink'],
      status: 'pending'
    },
    {
      id: 'tar-002',
      name: 'Celestial Hand',
      prompt: 'Victorian style hand reading palmistry lines, floating above clouds, holding crystal ball, mystical fortune teller aesthetic, detailed line art',
      placement: 'center-chest',
      colors: ['black-shirt-white-ink', 'cream-shirt-purple-ink'],
      status: 'pending'
    },
    {
      id: 'tar-003',
      name: 'Zodiac Wheel',
      prompt: 'Circular zodiac wheel with all 12 signs, constellation patterns, antique gold and deep blue, astrological chart aesthetic, detailed border',
      placement: 'center-chest',
      colors: ['black-shirt-gold-ink', 'navy-shirt-cream-ink'],
      status: 'pending'
    },
    {
      id: 'tar-004',
      name: 'Third Eye',
      prompt: 'All-seeing eye with cosmic iris, nebula colors, enlightenment symbolism, spiritual awakening, detailed iris patterns with stars',
      placement: 'center-chest',
      colors: ['black-shirt-multi-ink', 'white-shirt-navy-ink'],
      status: 'pending'
    },
    {
      id: 'tar-005',
      name: 'Sacred Geometry',
      prompt: 'Flower of Life pattern with Metatron cube overlay, gold lines on black, sacred geometry, meditation and mindfulness, precise mathematical beauty',
      placement: 'center-chest',
      colors: ['black-shirt-gold-ink', 'white-shirt-black-ink'],
      status: 'pending'
    },
    {
      id: 'tar-006',
      name: 'Moon Phases',
      prompt: 'Complete lunar cycle in vertical arrangement, waxing to waning, detailed moon surface textures, celestial navigation, mystical cycles',
      placement: 'center-chest',
      colors: ['black-shirt-white-ink', 'navy-shirt-silver-ink'],
      status: 'pending'
    },
    {
      id: 'tar-007',
      name: 'Crystal Cluster',
      prompt: 'Amethyst and quartz crystal formation, magical glowing effect, purple and white tones, witchy aesthetic, detailed mineral textures',
      placement: 'center-chest',
      colors: ['black-shirt-purple-ink', 'white-shirt-purple-ink'],
      status: 'pending'
    },
    {
      id: 'tar-008',
      name: 'Raven Messenger',
      prompt: 'Black raven with spread wings, carrying scroll, Odin symbolism, Norse mythology, detailed feather textures, mystical messenger',
      placement: 'center-chest',
      colors: ['black-shirt-silver-ink', 'white-shirt-black-ink'],
      status: 'pending'
    },
    {
      id: 'tar-009',
      name: 'Pentacle Garden',
      prompt: 'Pentacle symbol surrounded by herbs and flowers, rosemary, lavender, rose, witch garden aesthetic, green witchcraft, botanical illustration',
      placement: 'center-chest',
      colors: ['black-shirt-green-ink', 'cream-shirt-black-ink'],
      status: 'pending'
    },
    {
      id: 'tar-010',
      name: 'Tarosyn Wordmark',
      prompt: 'TAROSYN in mystical serif font, constellation dots forming letter shapes, star connections, celestial typography, magical branding',
      placement: 'center-chest',
      colors: ['black-shirt-gold-ink', 'navy-shirt-silver-ink'],
      status: 'pending'
    }
  ],
  endof8: [
    {
      id: 'end-001',
      name: 'OB Pier',
      prompt: 'Ocean Beach pier silhouette at sunset, waves crashing, seagulls flying, coastal grunge aesthetic, faded vintage colors, surf culture',
      placement: 'center-chest',
      colors: ['black-shirt-orange-ink', 'navy-shirt-white-ink'],
      status: 'pending'
    },
    {
      id: 'end-008',
      name: 'End of 8',
      prompt: 'Number 8 dissolving into ocean waves, tide pool aesthetic, coastal typography, water texture on numbers, OB local reference',
      placement: 'center-chest',
      colors: ['black-shirt-teal-ink', 'white-shirt-navy-ink'],
      status: 'pending'
    },
    {
      id: 'end-003',
      name: 'Dog Beach Sunset',
      prompt: 'Silhouette of dogs running on beach at sunset, Ocean Beach dog beach reference, warm golden light, carefree vibes, pet friendly',
      placement: 'center-chest',
      colors: ['black-shirt-gold-ink', 'orange-shirt-black-ink'],
      status: 'pending'
    },
    {
      id: 'end-004',
      name: 'Skate Wreck',
      prompt: 'Broken skateboard with seaweed wrapped around it, washed up on shore, punk surf aesthetic, grunge texture, beach punk',
      placement: 'center-chest',
      colors: ['black-shirt-white-ink', 'white-shirt-black-ink'],
      status: 'pending'
    },
    {
      id: 'end-005',
      name: 'Volcano Cliffs',
      prompt: 'Sunset Cliffs natural rock formation, waves below, San Diego landmark, dramatic sunset colors, coastal landscape photography style',
      placement: 'center-chest',
      colors: ['black-shirt-orange-ink', 'navy-shirt-cream-ink'],
      status: 'pending'
    },
    {
      id: 'end-006',
      name: 'Hodads Nation',
      prompt: 'Vintage burger and fries with palm tree, Ocean Beach diner culture, retro 70s graphic design, surf rock aesthetic, local legend reference',
      placement: 'center-chest',
      colors: ['black-shirt-red-ink', 'cream-shirt-navy-ink'],
      status: 'pending'
    },
    {
      id: 'end-007',
      name: 'Pacific Grit',
      prompt: 'Weathered beach sign with "LOCALS ONLY", rust and salt damage, gritty texture, coastal rebellion, punk rock attitude',
      placement: 'center-chest',
      colors: ['black-shirt-white-ink', 'white-shirt-black-ink'],
      status: 'pending'
    },
    {
      id: 'end-002',
      name: 'Tide Pools',
      prompt: 'Overhead view of tide pool ecosystem, starfish, anemones, sea urchins, natural history illustration style, marine biology aesthetic',
      placement: 'center-chest',
      colors: ['black-shirt-teal-ink', 'sand-shirt-navy-ink'],
      status: 'pending'
    },
    {
      id: 'end-009',
      name: 'Bonfire Nights',
      prompt: 'Beach bonfire with friends silhouettes, sparks flying up, night beach vibes, warmth and community, orange glow on dark background',
      placement: 'center-chest',
      colors: ['black-shirt-orange-ink', 'navy-shirt-yellow-ink'],
      status: 'pending'
    },
    {
      id: 'end-010',
      name: 'OB Forever',
      prompt: 'Ocean Beach in bold vintage surf font, wave underline, 70s surfboard graphic style, beach town pride, laid back typography',
      placement: 'center-chest',
      colors: ['white-shirt-navy-ink', 'navy-shirt-white-ink'],
      status: 'pending'
    }
  ],
  wickedyouth: [
    {
      id: 'wic-001',
      name: 'Lip Service',
      prompt: 'Bold glossy lips with dripping gloss effect, high fashion beauty aesthetic, pink and red gradient, beauty influencer vibes, glossy texture',
      placement: 'center-chest',
      colors: ['black-shirt-pink-ink', 'white-shirt-red-ink'],
      status: 'pending'
    },
    {
      id: 'wic-002',
      name: 'Glow Getter',
      prompt: 'Highlighter compact with beam of light, glowing rays, makeup product as hero, gold and champagne colors, beauty product photography style',
      placement: 'center-chest',
      colors: ['black-shirt-gold-ink', 'white-shirt-gold-ink'],
      status: 'pending'
    },
    {
      id: 'wic-003',
      name: 'Wicked Script',
      prompt: 'WICKED in flowing script with flame accents, YOUTH below in bold sans, dynamic typography, hot pink and orange, brand wordmark',
      placement: 'center-chest',
      colors: ['black-shirt-pink-ink', 'white-shirt-black-ink'],
      status: 'pending'
    },
    {
      id: 'wic-004',
      name: 'Beauty Ritual',
      prompt: 'Skincare bottles and serums arranged like altar, beauty routine as ritual, pastel pink and white, aesthetic flat lay, self-care vibes',
      placement: 'center-chest',
      colors: ['white-shirt-pink-ink', 'pink-shirt-white-ink'],
      status: 'pending'
    },
    {
      id: 'wic-005',
      name: 'Sparkle Eye',
      prompt: 'Single eye with glitter eyeshadow, dramatic makeup look, beauty editorial style, sparkle and shimmer texture, bold and confident',
      placement: 'center-chest',
      colors: ['black-shirt-multi-ink', 'white-shirt-black-ink'],
      status: 'pending'
    },
    {
      id: 'wic-006',
      name: 'Youthquake',
      prompt: 'Explosion of beauty products, dynamic composition, energy and movement, Gen Z aesthetic, bold colors, beauty revolution',
      placement: 'center-chest',
      colors: ['black-shirt-multi-ink', 'white-shirt-multi-ink'],
      status: 'pending'
    },
    {
      id: 'wic-007',
      name: 'Glass Skin',
      prompt: 'Abstract dewy surface with light refraction, glass skin concept, Korean beauty inspired, dewy and luminous, skincare aesthetic',
      placement: 'center-chest',
      colors: ['black-shirt-iridescent', 'white-shirt-iridescent'],
      status: 'pending'
    },
    {
      id: 'wic-008',
      name: 'Baddie Energy',
      prompt: 'Lightning bolt with nail polish dripping, power and attitude, hot pink and silver, bold graphic, unapologetic energy',
      placement: 'center-chest',
      colors: ['black-shirt-pink-ink', 'black-shirt-silver-ink'],
      status: 'pending'
    },
    {
      id: 'wic-009',
      name: 'Mirror Selfie',
      prompt: 'Hand holding phone taking mirror selfie, frame within frame, Gen Z culture, pink mirror frame, self-expression and confidence',
      placement: 'center-chest',
      colors: ['black-shirt-pink-ink', 'white-shirt-black-ink'],
      status: 'pending'
    },
    {
      id: 'wic-010',
      name: 'Wicked Youth Block',
      prompt: 'WICKED YOUTH in stacked bold letters, beauty brand logo style, clean and modern, black and pink colorway, streetwear meets beauty',
      placement: 'center-chest',
      colors: ['black-shirt-pink-ink', 'pink-shirt-black-ink'],
      status: 'pending'
    }
  ]
};

// Approval workflow states
const WORKFLOW_STATES = {
  PENDING: 'pending',
  IN_REVIEW: 'in-review',
  REVISIONS: 'revisions-needed',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  SYNCED: 'synced-to-printful',
  LIVE: 'live-in-store'
};

// Export for use in admin dashboard
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { BRANDS, CORE_PRODUCTS, DESIGN_LIBRARY, WORKFLOW_STATES };
}
