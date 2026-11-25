// ============================================================
// SOCIAL MEDIA CLIP GENERATOR
// 15s, 30s, 60s versions for all platforms
// ============================================================

const SOCIAL_MEDIA_CLIPS = {
  // Platform specs
  platforms: {
    instagram_reels: {
      name: "Instagram Reels",
      aspect_ratio: "9:16",
      resolution: "1080x1920",
      duration_max: 90,
      format: "MP4",
      fps: 30,
      audio: "trending music + voiceover"
    },
    tiktok: {
      name: "TikTok",
      aspect_ratio: "9:16",
      resolution: "1080x1920",
      duration_max: 180,
      format: "MP4",
      fps: 30,
      audio: "trending sounds + original audio"
    },
    youtube_shorts: {
      name: "YouTube Shorts",
      aspect_ratio: "9:16",
      resolution: "1080x1920",
      duration_max: 60,
      format: "MP4",
      fps: 30,
      audio: "music + clear voiceover"
    },
    facebook_reels: {
      name: "Facebook Reels",
      aspect_ratio: "9:16",
      resolution: "1080x1920",
      duration_max: 90,
      format: "MP4",
      fps: 30,
      audio: "trending audio"
    },
    twitter: {
      name: "Twitter/X",
      aspect_ratio: "16:9",
      resolution: "1920x1080",
      duration_max: 140,
      format: "MP4",
      fps: 30,
      audio: "music optional"
    }
  },
  
  // Clip templates by duration
  clips: {
    // 15 SECOND CLIPS - Quick hooks, viral potential
    "15s": {
      lovelouder: [
        {
          id: "ll-15s-001",
          title: "Love Louder - The Drop",
          hook: "POV: You finally found the tee that gets it",
          script: [
            "0-3s: Flash cuts of different people wearing Love Louder",
            "3-8s: Close up of gold foil crest catching light",
            "8-12s: Person smiles, emotional moment",
            "12-15s: Logo + 'Link in bio'"
          ],
          text_overlay: [
            { time: "0-3s", text: "POV: You finally found the tee that gets it", position: "center" },
            { time: "12-15s", text: "Love Louder 💛 Link in bio", position: "bottom" }
          ],
          music: "Emotional indie folk, building to crescendo",
          cta: "Shop now - Link in bio",
          hashtags: "#lovelouder #emotionalstreetwear #goldfoil #calitoy",
          viral_potential: "High - relatable POV format"
        },
        {
          id: "ll-15s-002",
          title: "Love Louder - Unboxing",
          hook: "The packaging is just as beautiful as the product",
          script: [
            "0-2s: Hands opening premium black box",
            "2-7s: Reveal gold tissue paper, rose petals",
            "7-12s: Pulling out the tee, gold foil shining",
            "12-15s: Happy reaction, logo"
          ],
          text_overlay: [
            { time: "0-2s", text: "Unboxing Love Louder 🌹", position: "top" },
            { time: "7-12s", text: "The gold hits different", position: "center" }
          ],
          music: "ASMR unboxing sounds + soft instrumental",
          cta: "Gift someone you love",
          hashtags: "#unboxing #lovelouder #goldfoil #giftideas",
          viral_potential: "High - unboxing content performs well"
        },
        {
          id: "ll-15s-003",
          title: "Love Louder - Before/After",
          hook: "How I went from basic to meaningful fits",
          script: [
            "0-3s: Plain black tee (before)",
            "3-4s: Quick transition swipe",
            "4-12s: Same person in Love Louder, glowing",
            "12-15s: 'Create Louder' text + logo"
          ],
          text_overlay: [
            { time: "0-3s", text: "Before: Just a tee", position: "left" },
            { time: "4-12s", text: "After: A statement", position: "right" }
          ],
          music: "Trending transformation audio",
          cta: "Upgrade your fit",
          hashtags: "#transformation #beforeandafter #lovelouder #streetwear",
          viral_potential: "Very High - transformation trend"
        }
      ],
      
      kurced: [
        {
          id: "kur-15s-001",
          title: "Kurced - Neon Reveal",
          hook: "When the lights go out, the fit comes alive",
          script: [
            "0-2s: Dark room, person barely visible",
            "2-3s: Neon lights flick on (purple/pink)",
            "3-10s: Reveal Kurced hoodie glowing, slow motion",
            "10-15s: Logo with glitch effect"
          ],
          text_overlay: [
            { time: "0-2s", text: "Wait for it...", position: "center" },
            { time: "3-10s", text: "KURCED 💜", position: "center" }
          ],
          music: "Dark electronic drop with bass",
          cta: "Fall louder - Link in bio",
          hashtags: "#kurced #neongoth #darkaesthetic #altfashion",
          viral_potential: "Very High - neon glow trend"
        },
        {
          id: "kur-15s-002",
          title: "Kurced - POV: You're cursed",
          hook: "POV: You just put on the Kurced tee and feel the energy shift",
          script: [
            "0-3s: POV putting on the tee",
            "3-8s: Mirror reflection, dramatic lighting",
            "8-12s: Slow zoom on the crest",
            "12-15s: Glitch transition to logo"
          ],
          text_overlay: [
            { time: "0-3s", text: "POV: You're cursed", position: "center" },
            { time: "8-12s", text: "In the best way", position: "bottom" }
          ],
          music: "Dark phonk, distorted bass",
          cta: "Get cursed",
          hashtags: "#pov #kurced #goth #aesthetic #alt",
          viral_potential: "High - POV format trending"
        }
      ],
      
      tarosyn: [
        {
          id: "tar-15s-001",
          title: "Tarosyn - Cosmic Alignment",
          hook: "When you wear your sign and the universe responds",
          script: [
            "0-3s: Hand holding Tarosyn tee against night sky",
            "3-8s: Stars align with the cosmic crest",
            "8-12s: Person wearing it, mystical glow",
            "12-15s: Logo with star particles"
          ],
          text_overlay: [
            { time: "3-8s", text: "The stars aligned ✨", position: "center" },
            { time: "12-15s", text: "Tarosyn - Design your destiny", position: "bottom" }
          ],
          music: "Ethereal ambient with chimes",
          cta: "Find your cosmic fit",
          hashtags: "#tarosyn #cosmic #zodiac #spiritual #stars",
          viral_potential: "High - spiritual content viral"
        }
      ],
      
      wickedyouth: [
        {
          id: "wy-15s-001",
          title: "Wicked Youth - Crown Check",
          hook: "Crown check 👑 Are you built for this?",
          script: [
            "0-2s: Quick cuts of crowns",
            "2-8s: Person wearing WY with attitude",
            "8-12s: Slow motion crown reveal",
            "12-15s: Logo with crown animation"
          ],
          text_overlay: [
            { time: "0-2s", text: "Crown check 👑", position: "center" },
            { time: "8-12s", text: "Built by the wicked", position: "bottom" }
          ],
          music: "Hard trap beat",
          cta: "Claim your crown",
          hashtags: "#wickedyouth #crown #streetwear #fashion",
          viral_potential: "Very High - crown check trend"
        }
      ],
      
      endof8: [
        {
          id: "e8-15s-001",
          title: "Endof8 - OB Vibes",
          hook: "If you know, you know 🌊",
          script: [
            "0-3s: Ocean Beach pier at sunset",
            "3-8s: Local wearing Endof8, walking the pier",
            "8-12s: Sun setting behind them",
            "12-15s: Logo with wave animation"
          ],
          text_overlay: [
            { time: "0-3s", text: "If you know, you know", position: "center" },
            { time: "12-15s", text: "Endof8 - Ocean Beach", position: "bottom" }
          ],
          music: "Surf rock, California vibes",
          cta: "Rep OB",
          hashtags: "#endof8 #oceanbeach #sandiego #surf #local",
          viral_potential: "High - local pride content"
        }
      ]
    },
    
    // 30 SECOND CLIPS - Story + hook + CTA
    "30s": {
      lovelouder: [
        {
          id: "ll-30s-001",
          title: "Love Louder - The Story",
          hook: "I used to wear basic tees. Then I discovered something that actually means something.",
          script: [
            "0-5s: Flashback to plain tees, boring",
            "5-10s: Discovery moment - seeing Love Louder",
            "10-20s: Unboxing, reaction, wearing it",
            "20-25s: Out in the world, getting compliments",
            "25-30s: Logo + "
          ],
          text_overlay: [
            { time: "0-5s", text: "Before: Just another tee", position: "center" },
            { time: "10-20s", text: "This hits different", position: "center" },
            { time: "25-30s", text: "Love Louder - Link in bio", position: "bottom" }
          ],
          music: "Emotional build-up, acoustic to full band",
          cta: "Find your meaning",
          hashtags: "#lovelouder #meaningful #streetwear #goldfoil #calitoy"
        }
      ],
      
      kurced: [
        {
          id: "kur-30s-001",
          title: "Kurced - The Transformation",
          hook: "They said I couldn't pull off the dark aesthetic. Watch me.",
          script: [
            "0-5s: Before - basic outfit",
            "5-15s: Getting ready, putting on Kurced",
            "15-25s: Reveal with neon lighting, slow motion",
            "25-30s: Logo with glitch"
          ],
          text_overlay: [
            { time: "0-5s", text: "They said I couldn't...", position: "center" },
            { time: "15-25s", text: "Watch me 💜", position: "center" }
          ],
          music: "Dark electronic, building drop",
          cta: "Transform your look",
          hashtags: "#kurced #transformation #goth #neon #alt"
        }
      ],
      
      tarosyn: [
        {
          id: "tar-30s-001",
          title: "Tarosyn - Find Your Path",
          hook: "I was lost until I looked to the stars. Then I found my destiny.",
          script: [
            "0-8s: Feeling lost, searching",
            "8-18s: Discovery of Tarosyn, cosmic connection",
            "18-25s: Wearing it, confident, aligned",
            "25-30s: Logo with constellation animation"
          ],
          text_overlay: [
            { time: "0-8s", text: "Lost...", position: "center" },
            { time: "18-25s", text: "Aligned ✨", position: "center" }
          ],
          music: "Mystical ambient, ethereal vocals",
          cta: "Design your destiny",
          hashtags: "#tarosyn #cosmic #destiny #spiritual #stars"
        }
      ],
      
      wickedyouth: [
        {
          id: "wy-30s-001",
          title: "Wicked Youth - Built Different",
          hook: "Some are born to follow. We were built to disrupt.",
          script: [
            "0-8s: Crowd following trends",
            "8-18s: Standing out in Wicked Youth, confident",
            "18-25s: Crew shot, everyone in WY",
            "25-30s: Logo with crown"
          ],
          text_overlay: [
            { time: "8-18s", text: "Built different 👑", position: "center" },
            { time: "25-30s", text: "Wicked Youth - Join the movement", position: "bottom" }
          ],
          music: "Hard trap, bass heavy",
          cta: "Join the movement",
          hashtags: "#wickedyouth #builtdifferent #streetwear #crown #disrupt"
        }
      ],
      
      endof8: [
        {
          id: "e8-30s-001",
          title: "Endof8 - Local Legend",
          hook: "You can take the kid out of OB, but you can't take OB out of the kid.",
          script: [
            "0-8s: Flashbacks to Ocean Beach",
            "8-18s: Wearing Endof8, repping the culture",
            "18-25s: Sunset at the pier, community",
            "25-30s: Logo with wave"
          ],
          text_overlay: [
            { time: "0-8s", text: "Ocean Beach raised me", position: "center" },
            { time: "18-25s", text: "Endof8 forever 🌊", position: "center" }
          ],
          music: "Surf rock, nostalgic",
          cta: "Rep your coast",
          hashtags: "#endof8 #oceanbeach #sandiego #local #surf"
        }
      ]
    },
    
    // 60 SECOND CLIPS - Full story, multiple scenes
    "60s": {
      lovelouder: [
        {
          id: "ll-60s-001",
          title: "Love Louder - The Documentary",
          hook: "What happens when clothing becomes a conversation about love, healing, and being seen?",
          script: [
            "0-10s: Introduction to problem - superficial fashion",
            "10-25s: Discovery of Love Louder, the meaning",
            "25-40s: Community stories, people sharing",
            "40-50s: The impact, emotional moments",
            "50-60s: Call to action, logo, link"
          ],
          scenes: [
            "Opening: City montage, fast cuts",
            "Middle: Interviews with wearers",
            "Climax: Group shot, everyone in Love Louder",
            "Ending: Sunset, emotional music swell"
          ],
          text_overlay: [
            { time: "0-10s", text: "Fashion lost its meaning", position: "center" },
            { time: "25-40s", text: "Until we decided to Love Louder", position: "center" },
            { time: "50-60s", text: "Join the movement 💛", position: "bottom" }
          ],
          music: "Full song, emotional arc",
          cta: "Be part of something bigger",
          hashtags: "#lovelouder #documentary #meaningful #community #love"
        }
      ],
      
      kurced: [
        {
          id: "kur-60s-001",
          title: "Kurced - Into the Darkness",
          hook: "There's beauty in the darkness. There's power in embracing what others fear.",
          script: [
            "0-10s: Dark intro, mysterious",
            "10-25s: The aesthetic, the culture",
            "25-45s: Transformation, confidence",
            "45-55s: Community, belonging",
            "55-60s: Logo, glitch out"
          ],
          scenes: [
            "Opening: Industrial warehouse, fog",
            "Middle: Individual stories, alt culture",
            "Climax: Group in neon lights",
            "Ending: Dark, powerful, glitch"
          ],
          text_overlay: [
            { time: "0-10s", text: "They fear the dark", position: "center" },
            { time: "25-45s", text: "We find power in it", position: "center" },
            { time: "55-60s", text: "KURCED 💜", position: "center" }
          ],
          music: "Dark electronic, full track",
          cta: "Embrace the darkness",
          hashtags: "#kurced #darkness #power #alt #goth #neon"
        }
      ],
      
      tarosyn: [
        {
          id: "tar-60s-001",
          title: "Tarosyn - Cosmic Journey",
          hook: "Your destiny is written in the stars. But you choose how to read it.",
          script: [
            "0-10s: Night sky, stars, mystery",
            "10-25s: Discovery, cosmic connection",
            "25-45s: Personal journey, alignment",
            "45-55s: Community of seekers",
            "55-60s: Logo, constellation"
          ],
          scenes: [
            "Opening: Desert night, milky way",
            "Middle: Personal transformations",
            "Climax: Group ritual, cosmic energy",
            "Ending: Stars, infinite possibilities"
          ],
          text_overlay: [
            { time: "0-10s", text: "Your story is written", position: "center" },
            { time: "25-45s", text: "Design your destiny", position: "center" },
            { time: "55-60s", text: "TAROSYN ✨", position: "center" }
          ],
          music: "Ambient, cosmic, ethereal",
          cta: "Find your cosmic path",
          hashtags: "#tarosyn #cosmic #destiny #stars #spiritual #universe"
        }
      ],
      
      wickedyouth: [
        {
          id: "wy-60s-001",
          title: "Wicked Youth - The Movement",
          hook: "This isn't just clothing. This is a declaration. A movement. A crown.",
          script: [
            "0-10s: The problem - following trends",
            "10-25s: The awakening, finding WY",
            "25-45s: The movement growing",
            "45-55s: The crown, the power",
            "55-60s: Logo, crown animation"
          ],
          scenes: [
            "Opening: Crowd, conformity",
            "Middle: Individual rebels finding each other",
            "Climax: Massive crew, all in WY",
            "Ending: Crown, power, ownership"
          ],
          text_overlay: [
            { time: "0-10s", text: "They want you to follow", position: "center" },
            { time: "25-45s", text: "We chose to lead", position: "center" },
            { time: "55-60s", text: "WICKED YOUTH 👑", position: "center" }
          ],
          music: "Full trap anthem, bass heavy",
          cta: "Claim your crown",
          hashtags: "#wickedyouth #movement #crown #leadership #streetwear"
        }
      ],
      
      endof8: [
        {
          id: "e8-60s-001",
          title: "Endof8 - Forever OB",
          hook: "Ocean Beach isn't just a place. It's who we are. It's where we end up.",
          script: [
            "0-10s: OB landmarks, memories",
            "10-25s: The culture, the people",
            "25-45s: Wearing Endof8, repping local",
            "45-55s: Community, belonging",
            "55-60s: Logo, sunset"
          ],
          scenes: [
            "Opening: Pier, waves, sunset",
            "Middle: Locals, culture, vibes",
            "Climax: Group at bonfire, sunset",
            "Ending: OB forever, waves"
          ],
          text_overlay: [
            { time: "0-10s", text: "Some places stay with you", position: "center" },
            { time: "25-45s", text: "Ocean Beach forever", position: "center" },
            { time: "55-60s", text: "ENDOF8 🌊", position: "center" }
          ],
          music: "Surf rock, nostalgic, anthem",
          cta: "Rep your home",
          hashtags: "#endof8 #oceanbeach #sandiego #local #forever #surf"
        }
      ]
    }
  },
  
  // Export FFmpeg commands
  ffmpeg_commands: {
    "15s": `ffmpeg -i input.mp4 -t 15 -c copy output_15s.mp4`,
    "30s": `ffmpeg -i input.mp4 -t 30 -c copy output_30s.mp4`,
    "60s": `ffmpeg -i input.mp4 -t 60 -c copy output_60s.mp4`,
    "vertical": `ffmpeg -i input.mp4 -vf "scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2" -c:a copy output_vertical.mp4`,
    "all_platforms": `
# Generate all platform versions
ffmpeg -i master.mp4 -t 15 -c copy reels_15s.mp4
ffmpeg -i master.mp4 -t 30 -c copy reels_30s.mp4
ffmpeg -i master.mp4 -t 60 -c copy reels_60s.mp4
ffmpeg -i reels_15s.mp4 -vf "scale=1080:1920:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2" -c:a copy reels_15s_vertical.mp4
    `.trim()
  }
};

// Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SOCIAL_MEDIA_CLIPS;
}

// Console output
console.log('=== SOCIAL MEDIA CLIP GENERATOR ===\n');
console.log('15 Second Clips:', Object.values(SOCIAL_MEDIA_CLIPS.clips['15s']).flat().length);
console.log('30 Second Clips:', Object.values(SOCIAL_MEDIA_CLIPS.clips['30s']).flat().length);
console.log('60 Second Clips:', Object.values(SOCIAL_MEDIA_CLIPS.clips['60s']).flat().length);
console.log('\nTotal Clips:', 
  Object.values(SOCIAL_MEDIA_CLIPS.clips['15s']).flat().length +
  Object.values(SOCIAL_MEDIA_CLIPS.clips['30s']).flat().length +
  Object.values(SOCIAL_MEDIA_CLIPS.clips['60s']).flat().length
);
console.log('\nPlatform formats:', Object.keys(SOCIAL_MEDIA_CLIPS.platforms).join(', '));
console.log('\nReady to export for:');
console.log('- Instagram Reels');
console.log('- TikTok');
console.log('- YouTube Shorts');
console.log('- Facebook Reels');
console.log('- Twitter/X');
