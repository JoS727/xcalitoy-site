// ============================================================
// LIFESTYLE PHOTOGRAPHY PROMPTS
// Models wearing products in real-world settings
// ============================================================

const LIFESTYLE_PHOTOGRAPHY = {
  // Brand-specific model casting
  casting: {
    lovelouder: {
      models: "Diverse, emotionally expressive individuals, ages 20-35",
      vibe: "Authentic, vulnerable, premium",
      looks: "Tattoos welcome, natural beauty, genuine smiles",
      locations: "Sunset beaches, cozy coffee shops, urban rooftops"
    },
    kurced: {
      models: "Alt/goth scene, dyed hair, piercings, ages 18-30",
      vibe: "Dark, mysterious, confident",
      looks: "Black clothing, dramatic makeup, edgy style",
      locations: "Nightclubs, industrial warehouses, neon-lit streets"
    },
    tarosyn: {
      models: "Spiritual, ethereal, diverse, ages 22-40",
      vibe: "Mystical, serene, cosmic",
      looks: "Flowing fabrics, natural hair, minimal makeup",
      locations: "Desert at twilight, crystal shops, meditation spaces"
    },
    wickedyouth: {
      models: "Gen Z streetwear enthusiasts, ages 16-28",
      vibe: "Bold, confident, rebellious",
      looks: "Urban fashion, statement accessories, attitude",
      locations: "City streets, skateparks, graffiti walls"
    },
    endof8: {
      models: "Surfers, skaters, beach locals, ages 18-35",
      vibe: "Laid-back, authentic, coastal",
      looks: "Sun-kissed, casual, beach hair",
      locations: "Ocean Beach pier, sunset cliffs, bonfire nights"
    }
  },
  
  // Lifestyle prompt templates
  prompts: {
    lovelouder: [
      {
        id: "ll-lifestyle-001",
        title: "Golden Hour Connection",
        prompt: "Cinematic lifestyle photography, diverse couple wearing Love Louder matching tees, golden hour sunset on California beach, genuine emotional connection, warm orange and gold tones, film grain, 35mm aesthetic, romantic but not cheesy, authentic love, shot on Canon R5 with 85mm lens, f/1.4, shallow depth of field",
        products: ["ll-001", "ll-003"],
        setting: "beach",
        time: "sunset",
        mood: "romantic"
      },
      {
        id: "ll-lifestyle-002",
        title: "Creative Studio Session",
        prompt: "Lifestyle photography, tattooed artist in their studio wearing Love Louder hoodie, painting on canvas, natural window light, creative mess, art supplies everywhere, gold accents in the space, authentic creative process, shot on Sony A7IV, 35mm lens, documentary style",
        products: ["ll-008"],
        setting: "art studio",
        time: "day",
        mood: "creative"
      },
      {
        id: "ll-lifestyle-003",
        title: "Morning Coffee Ritual",
        prompt: "Lifestyle photography, person holding Love Louder mug with steam rising, cozy morning light through window, comfortable sweater, peaceful expression, warm tones, hygge aesthetic, shot on film camera, Portra 400, soft focus",
        products: ["ll-010"],
        setting: "home",
        time: "morning",
        mood: "peaceful"
      },
      {
        id: "ll-lifestyle-004",
        title: "Group Love",
        prompt: "Cinematic group shot, 5 diverse friends wearing Love Louder tees, laughing together at rooftop party, city skyline at blue hour, string lights, genuine joy, community feeling, shot on Canon R5, 24mm lens, wide angle, warm color grading",
        products: ["ll-001", "ll-002", "ll-003"],
        setting: "rooftop",
        time: "blue hour",
        mood: "joyful"
      },
      {
        id: "ll-lifestyle-005",
        title: "Healing Journey",
        prompt: "Lifestyle photography, person wearing Love Louder long sleeve during yoga session, peaceful expression, natural light studio, plants in background, mindfulness moment, wellness aesthetic, shot on Sony A7IV, 50mm lens, soft and serene",
        products: ["ll-006"],
        setting: "yoga studio",
        time: "day",
        mood: "peaceful"
      }
    ],
    
    kurced: [
      {
        id: "kur-lifestyle-001",
        title: "Neon Night Out",
        prompt: "Cinematic night photography, alt model wearing Kurced hoodie under neon lights, urban alleyway, purple and pink neon glow, confident pose, cyber gothic aesthetic, film noir lighting, shot on Sony A7S III, 35mm lens, high ISO, grainy, Blade Runner vibes",
        products: ["kur-006"],
        setting: "neon alley",
        time: "night",
        mood: "edgy"
      },
      {
        id: "kur-lifestyle-002",
        title: "Dark Romance",
        prompt: "Moody portrait photography, couple wearing Kurced matching tees, gothic cathedral background, dramatic lighting, dark romantic aesthetic, holding hands, intense connection, shot on Canon R5, 85mm lens, chiaroscuro lighting",
        products: ["kur-001", "kur-002"],
        setting: "cathedral",
        time: "twilight",
        mood: "romantic dark"
      },
      {
        id: "kur-lifestyle-003",
        title: "Club Energy",
        prompt: "Dynamic club photography, group wearing Kurced in underground nightclub, laser lights, dancing, motion blur, high energy, electronic music scene, purple lighting, shot on Sony A7S III, 24mm lens, slow shutter",
        products: ["kur-001", "kur-010"],
        setting: "nightclub",
        time: "night",
        mood: "energetic"
      },
      {
        id: "kur-lifestyle-004",
        title: "Industrial Portrait",
        prompt: "Portrait photography, model wearing Kurced long sleeve in abandoned warehouse, industrial background, dramatic shadows, confident stance, alternative fashion, shot on Canon R5, 50mm lens, moody color grading",
        products: ["kur-003", "kur-007"],
        setting: "warehouse",
        time: "day",
        mood: "confident"
      },
      {
        id: "kur-lifestyle-005",
        title: "Midnight Reflection",
        prompt: "Cinematic photography, person wearing Kurced hoodie looking at reflection in rain-soaked window, neon signs reflected, contemplative mood, urban night, shot on Sony A7IV, 85mm lens, anamorphic feel",
        products: ["kur-006"],
        setting: "urban night",
        time: "midnight",
        mood: "contemplative"
      }
    ],
    
    tarosyn: [
      {
        id: "tar-lifestyle-001",
        title: "Desert Stargazing",
        prompt: "Cinematic astrophotography, person wearing Tarosyn hoodie sitting in desert at night, milky way visible, crystal cluster nearby, spiritual moment, cosmic connection, long exposure, shot on Canon R5 with astro mod, 14mm lens, starry sky",
        products: ["tar-006"],
        setting: "desert night",
        time: "night",
        mood: "cosmic"
      },
      {
        id: "tar-lifestyle-002",
        title: "Crystal Shop Moment",
        prompt: "Lifestyle photography, person browsing crystals while wearing Tarosyn tee, mystical shop interior, warm lighting, amethyst and quartz displays, spiritual aesthetic, shot on Sony A7IV, 35mm lens, documentary style",
        products: ["tar-001", "tar-002"],
        setting: "crystal shop",
        time: "day",
        mood: "mystical"
      },
      {
        id: "tar-lifestyle-003",
        title: "Moon Ritual",
        prompt: "Cinematic photography, group wearing Tarosyn during full moon ritual, candles, sacred geometry, flowing fabrics, mystical atmosphere, shot on Canon R5, 50mm lens, warm and ethereal",
        products: ["tar-001", "tar-012"],
        setting: "outdoor ritual",
        time: "night",
        mood: "spiritual"
      },
      {
        id: "tar-lifestyle-004",
        title: "Morning Meditation",
        prompt: "Peaceful lifestyle photography, person meditating wearing Tarosyn, sunrise through window, plants, incense, calm energy, wellness aesthetic, shot on film camera, Portra 400, soft light",
        products: ["tar-002"],
        setting: "home",
        time: "sunrise",
        mood: "peaceful"
      },
      {
        id: "tar-lifestyle-005",
        title: "Tarot Reading",
        prompt: "Intimate photography, tarot reader wearing Tarosyn, cards spread on velvet cloth, candlelight, mysterious atmosphere, close-up of hands, shot on Sony A7IV, 85mm lens, shallow depth of field",
        products: ["tar-008"],
        setting: "reading room",
        time: "evening",
        mood: "mysterious"
      }
    ],
    
    wickedyouth: [
      {
        id: "wy-lifestyle-001",
        title: "Street Attitude",
        prompt: "Urban street photography, Gen Z model wearing Wicked Youth, graffiti wall background, confident pose, bold attitude, streetwear aesthetic, golden hour light, shot on Canon R5, 35mm lens, gritty color grading",
        products: ["wy-001", "wy-002"],
        setting: "graffiti wall",
        time: "golden hour",
        mood: "confident"
      },
      {
        id: "wy-lifestyle-002",
        title: "Skatepark Session",
        prompt: "Action photography, skater wearing Wicked Youth hoodie at skatepark, mid-trick, dynamic movement, urban environment, concrete and steel, shot on Sony A7IV, 24mm lens, fast shutter, freeze motion",
        products: ["wy-006"],
        setting: "skatepark",
        time: "day",
        mood: "energetic"
      },
      {
        id: "wy-lifestyle-003",
        title: "Crew Shot",
        prompt: "Group photography, diverse crew wearing Wicked Youth, urban rooftop, city skyline, confident poses, streetwear culture, sunset lighting, shot on Canon R5, 24mm lens, wide angle, bold colors",
        products: ["wy-001", "wy-002", "wy-003"],
        setting: "rooftop",
        time: "sunset",
        mood: "bold"
      },
      {
        id: "wy-lifestyle-004",
        title: "Night Out",
        prompt: "Nightlife photography, model wearing Wicked Youth entering club, neon lights, motion blur, urban night, street style, shot on Sony A7S III, 35mm lens, high ISO, grainy",
        products: ["wy-004"],
        setting: "city street",
        time: "night",
        mood: "cool"
      },
      {
        id: "wy-lifestyle-005",
        title: "Studio Portrait",
        prompt: "Studio portrait, model wearing Wicked Youth crown snapback, dramatic lighting, confident expression, clean background, fashion photography, shot on Canon R5, 85mm lens, high fashion aesthetic",
        products: ["wy-009"],
        setting: "studio",
        time: "day",
        mood: "confident"
      }
    ],
    
    endof8: [
      {
        id: "e8-lifestyle-001",
        title: "OB Pier Sunset",
        prompt: "Cinematic coastal photography, surfer wearing Endof8 tee walking on Ocean Beach pier, golden sunset, waves crashing, authentic California vibes, film grain, shot on Canon R5, 35mm lens, warm tones",
        products: ["e8-002"],
        setting: "OB pier",
        time: "sunset",
        mood: "authentic"
      },
      {
        id: "e8-lifestyle-002",
        title: "Bonfire Nights",
        prompt: "Night photography, group wearing Endof8 around beach bonfire, sparks flying, warm glow, friends laughing, authentic OB culture, shot on Sony A7S III, 35mm lens, warm color grading",
        products: ["e8-001", "e8-003"],
        setting: "beach bonfire",
        time: "night",
        mood: "community"
      },
      {
        id: "e8-lifestyle-003",
        title: "Sunset Cliffs",
        prompt: "Landscape portrait, person wearing Endof8 hoodie at Sunset Cliffs, dramatic coastal view, golden hour, wind in hair, contemplative, shot on Canon R5, 24mm lens, wide angle",
        products: ["e8-006"],
        setting: "sunset cliffs",
        time: "golden hour",
        mood: "contemplative"
      },
      {
        id: "e8-lifestyle-004",
        title: "Dog Beach Morning",
        prompt: "Lifestyle photography, local wearing Endof8 at Dog Beach morning, dogs running, happy energy, authentic OB community, natural light, shot on Sony A7IV, 50mm lens, documentary style",
        products: ["e8-005", "e8-010"],
        setting: "dog beach",
        time: "morning",
        mood: "joyful"
      },
      {
        id: "e8-lifestyle-005",
        title: "Skate Wreck",
        prompt: "Urban photography, skater wearing Endof8 with broken board, OB culture, gritty aesthetic, concrete, authentic street scene, shot on Canon R5, 35mm lens, raw and real",
        products: ["e8-007"],
        setting: "street",
        time: "day",
        mood: "authentic"
      }
    ]
  },
  
  // Video motion prompts
  video: {
    lovelouder: "Cinematic brand film, slow motion shots of diverse couples wearing Love Louder, golden hour beach walks, emotional connections, warm color grading, film grain, 4K, shot on RED camera",
    kurced: "Dark electronic music video style, fast cuts, models wearing Kurced in neon-lit warehouse, purple and pink lighting, cyber gothic aesthetic, 4K, high energy editing",
    tarosyn: "Spiritual documentary style, slow movements, cosmic visuals, crystals, moon phases, mystical atmosphere, ethereal music, 4K, cinematic",
    wickedyouth: "Streetwear campaign video, dynamic skateboarding shots, urban exploration, bold graphics, fast-paced editing, hip hop soundtrack, 4K, gritty",
    endof8: "Coastal lifestyle film, surfing, bonfires, OB pier sunsets, authentic California culture, warm film stock aesthetic, 4K, documentary style"
  }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = LIFESTYLE_PHOTOGRAPHY;
}

// Console output
console.log('=== LIFESTYLE PHOTOGRAPHY PROMPTS ===\n');
console.log('Total lifestyle scenarios: 25 (5 per brand)');
console.log('\nSample prompts ready for:');
console.log('- AI image generation (Midjourney/DALL-E)');
console.log('- Photographer briefs');
console.log('- Video production');
console.log('\nEach includes:');
console.log('- Detailed prompt');
console.log('- Camera settings');
console.log('- Lighting direction');
console.log('- Mood/atmosphere');
console.log('- Product placement');
