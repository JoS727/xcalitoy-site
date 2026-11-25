// ============================================================
// AI PRODUCT IMAGE GENERATION PROMPTS
// Generate realistic product photos for all 75 products
// ============================================================

const AI_GENERATION_PROMPTS = {
  // Love Louder - Gold luxury, emotional
  lovelouder: {
    style: "Premium streetwear product photography, gold foil print on black heavyweight cotton, tattooed model, soft studio lighting, 4K, photorealistic",
    crest: "Black t-shirt with gold foil Love Louder crest, center chest print, rose and Calitoy signature, tattooed male model, studio lighting, white background, product photography",
    rose: "Black t-shirt with gold foil rose, left chest placement, minimal design, tattooed model, soft lighting, premium streetwear aesthetic",
    wordmark: "White t-shirt with gold foil LOVE LOUDER text, stacked typography, center print, tattooed model, studio photography, 4K",
    necklace: "Gold guitar pick pendant necklace, engraved with Love Louder crest, macro photography, black velvet background, luxury jewelry aesthetic",
    feel: "Black long sleeve with FEEL LOUDER down sleeve, gold foil, heart accent, tattooed model, studio lighting",
    heal: "Black dad hat with HEAL LOUDER embroidered in gold, front view, tattooed model, streetwear photography",
    create: "Black hoodie with large CREATE LOUDER back print, gold foil, tattooed model wearing, studio lighting",
    tote: "Natural canvas tote bag with gold foil Love Louder crest, lifestyle photography, beach background",
    mug: "White ceramic mug with gold foil rose print, steam rising, coffee, morning light, product photography"
  },
  
  // Kurced - Neon gothic, dark
  kurced: {
    style: "Dark gothic streetwear, neon purple glow, black heavyweight cotton, alt model, moody lighting, cyber aesthetic",
    crest: "Black t-shirt with Kurced crest, purple neon ring, rose with cross, center chest, alt model with dyed hair, dark studio, purple rim lighting",
    rose: "Black t-shirt with gothic rose, purple neon glow, center print, alt model, moody lighting, club aesthetic",
    protege: "Black long sleeve with PROTÉGÉ down left sleeve, purple neon text, alt model, cyber gothic aesthetic",
    icon: "Black dad hat with Kurced rose icon embroidered, purple thread, front view, alt model",
    fall: "Black hoodie with FALL LOUDER back print, thorn vines, purple neon glow, alt model, dark studio",
    rise: "Black long sleeve with RISE DARKER text, glitch effect, purple and black, alt model",
    cursed: "Black beanie with LIVE CURSED embroidered, purple thread, cuffed style, alt model",
    love: "Black t-shirt with anatomical heart, barbed wire, neon red glow, dark romance aesthetic",
    mark: "Black snapback with Kurced crest, purple neon, front view, street gothic",
    neon: "Black t-shirt with neon cross, gothic style, purple glow, center chest"
  },
  
  // Tarosyn - Celestial, mystical
  tarosyn: {
    style: "Celestial streetwear, cosmic aesthetic, purple nebula, gold foil, spiritual model, ethereal lighting",
    crest: "Black t-shirt with Tarosyn cosmic crest, purple nebula ring, gold star compass, center chest, spiritual model, soft ethereal lighting",
    compass: "Black t-shirt with rose compass, crescent moon, gold foil, center print, mystical aesthetic",
    moon: "Navy t-shirt with moon seal, crescent and stars, gold foil, left chest, celestial aesthetic",
    star: "Black hoodie with YOU'RE A STAR back print, large star constellation, gold foil, spiritual model",
    destiny: "Black t-shirt with Design Your Destiny, zodiac wheel with hands, gold foil, mystical",
    story: "Black long sleeve with Know Your Story, tarot cards, moon phases, gold foil",
    cosmos: "Black beanie with Trust The Cosmos, crescent moon embroidered, gold thread",
    sacred: "Matte poster with Sacred Geometry, Flower of Life, gold lines on black, wall art",
    eye: "Black t-shirt with Third Eye, all-seeing eye, cosmic iris, gold foil"
  },
  
  // Wicked Youth - Street royalty, bold
  wickedyouth: {
    style: "Streetwear photography, bold graphics, crown symbol, graffiti aesthetic, urban model, dramatic lighting",
    wordmark: "Black t-shirt with WICKED YOUTH brush script, drips, center chest, streetwear model, urban background",
    crown: "Black t-shirt with WY crown circle, purple accent, center print, streetwear model",
    cde: "Black hoodie with CREATE DISRUPT ELEVATE, three pillars, crown, back print, streetwear model",
    xmark: "Black hoodie with large X mark, WY monogram, back print, bold graphic",
    built: "Black hoodie with BUILT BY THE WICKED back print, crown, streetwear model",
    awakened: "Black t-shirt with FOR THE AWAKENED, eye with crown, center print",
    movement: "Black long sleeve with WY MOVEMENT down sleeve, purple accent",
    crown_hat: "Black snapback with 5-point crown, purple embroidery, front view",
    script: "Black crewneck with WICKED brush script, center chest, streetwear model",
    block: "White t-shirt with YOUTH block letters, bold graphic, center print"
  },
  
  // Endof8 - Coastal, surf
  endof8: {
    style: "Coastal lifestyle photography, surf culture, OB aesthetic, natural lighting, beach backgrounds",
    circle: "Black t-shirt with Endof8 enso circle, seagull, center chest, surfer model, beach background",
    pier: "Black t-shirt with OB Pier sunset, orange sun, center print, coastal aesthetic",
    wordmark: "White t-shirt with Endof8 brush script, orange 8, center chest, beach lifestyle",
    seagull: "Black hoodie with large 8 and seagull, back print, surf culture",
    local: "Navy t-shirt with Ocean Beach Local, pier graphic, center chest, OB local",
    free: "Black hoodie with LIVE FREE and waves, back print, surfer model",
    ride: "Black t-shirt with RIDE HARD, skateboard graphic, center print",
    eight: "Grey long sleeve with large 8 on back, Endof8, surf style",
    sunset: "Orange t-shirt with Sunset Cliffs, coastal graphic, center chest",
    dog: "Sand dad hat with Dog Beach, seagull, front view, beach lifestyle"
  }
};

// Generate prompts for specific products
function generateProductPrompt(brand, productId, productType) {
  const brandPrompts = AI_GENERATION_PROMPTS[brand];
  if (!brandPrompts) return null;
  
  // Map product ID to prompt key
  const keyMap = {
    'll-001': 'crest', 'll-002': 'rose', 'll-003': 'wordmark', 'll-004': 'necklace', 'll-005': 'sticker',
    'll-006': 'feel', 'll-007': 'heal', 'll-008': 'create', 'll-009': 'tote', 'll-010': 'mug',
    'kur-001': 'crest', 'kur-002': 'rose', 'kur-003': 'protege', 'kur-004': 'icon', 'kur-005': 'sticker',
    'kur-006': 'fall', 'kur-007': 'rise', 'kur-008': 'cursed', 'kur-009': 'love', 'kur-010': 'mark',
    'tar-001': 'crest', 'tar-002': 'compass', 'tar-003': 'moon', 'tar-004': 'sleeve', 'tar-005': 'pendant',
    'tar-006': 'star', 'tar-007': 'destiny', 'tar-008': 'story', 'tar-009': 'cosmos', 'tar-010': 'sacred',
    'wy-001': 'wordmark', 'wy-002': 'crown', 'wy-003': 'cde', 'wy-004': 'xmark', 'wy-005': 'icon',
    'wy-006': 'built', 'wy-007': 'awakened', 'wy-008': 'movement', 'wy-009': 'crown_hat', 'wy-010': 'script',
    'e8-001': 'circle', 'e8-002': 'pier', 'e8-003': 'wordmark', 'e8-004': 'seagull', 'e8-005': 'local',
    'e8-006': 'free', 'e8-007': 'ride', 'e8-008': 'eight', 'e8-009': 'sunset', 'e8-010': 'dog'
  };
  
  const key = keyMap[productId] || 'style';
  const basePrompt = brandPrompts[key] || brandPrompts.style;
  
  // Adjust for product type
  const typeAdjustments = {
    'premium_hoodie': basePrompt.replace('t-shirt', 'hoodie').replace('tee', 'hoodie'),
    'longsleeve': basePrompt.replace('t-shirt', 'long sleeve shirt').replace('tee', 'long sleeve'),
    'crewneck': basePrompt.replace('t-shirt', 'crewneck sweatshirt').replace('tee', 'crewneck'),
    'dad_hat': basePrompt.replace(/t-shirt.*center.*(chest|print)/, 'dad hat, front embroidery'),
    'beanie': basePrompt.replace(/t-shirt.*center.*(chest|print)/, 'cuffed beanie, front embroidery'),
    'snapback': basePrompt.replace(/t-shirt.*center.*(chest|print)/, 'snapback cap, front patch'),
    'tote': basePrompt.replace(/t-shirt.*center.*(chest|print)/, 'canvas tote bag, center print'),
    'mug': basePrompt.replace(/t-shirt.*center.*(chest|print)/, 'ceramic mug, wrap print')
  };
  
  return typeAdjustments[productType] || basePrompt;
}

// Batch generate all prompts
function generateAllPrompts() {
  const allPrompts = [];
  
  for (const [brand, products] of Object.entries(EXPANDED_PRODUCTS || {})) {
    for (const product of products) {
      for (const productType of product.products) {
        const prompt = generateProductPrompt(brand, product.id, productType);
        if (prompt) {
          allPrompts.push({
            brand,
            productId: product.id,
            productType,
            productName: product.name,
            prompt,
            filename: `${brand}_${product.id}_${productType}.jpg`
          });
        }
      }
    }
  }
  
  return allPrompts;
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { AI_GENERATION_PROMPTS, generateProductPrompt, generateAllPrompts };
}

// Console output for copy-paste
console.log('=== AI IMAGE GENERATION PROMPTS ===\n');
console.log('Copy these prompts into your AI image generator (Midjourney, DALL-E, etc.)\n');

// Generate sample prompts
const samplePrompts = [
  { brand: 'lovelouder', id: 'll-001', type: 'unisex_tshirt', name: 'Love Louder Crest Tee' },
  { brand: 'kurced', id: 'kur-001', type: 'unisex_tshirt', name: 'Kurced Crest Tee' },
  { brand: 'tarosyn', id: 'tar-001', type: 'unisex_tshirt', name: 'Tarosyn Cosmic Crest' },
  { brand: 'wickedyouth', id: 'wy-001', type: 'unisex_tshirt', name: 'Wicked Youth Wordmark Tee' },
  { brand: 'endof8', id: 'e8-001', type: 'unisex_tshirt', name: 'Endof8 Circle Logo' }
];

samplePrompts.forEach(({ brand, id, type, name }) => {
  const prompt = generateProductPrompt(brand, id, type);
  console.log(`\n${brand.toUpperCase()} - ${name}:`);
  console.log(prompt);
});

console.log('\n\n=== TOTAL IMAGES TO GENERATE ===');
console.log('~375 product images (75 products x ~5 variants each)');
console.log('Save to: /assets/products/{brand}/{productId}_{type}.jpg');
