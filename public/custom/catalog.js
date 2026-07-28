const merchConcepts = [
  ...[
    ['Major Arcana Candle Set','Candle collection','Twelve dark-glass archetype candles with celestial label art.'],
    ['Birth Chart Ritual Journal','Guided journal','Midnight linen cover with constellation mapping and reflective prompts.'],
    ['Moon Phase Silk Scarf','Accessory','Tonal lunar-cycle square with a star-field border.'],
    ['Seeker Tarot Cloth','Altar accessory','Velvet reading cloth with an embroidered sun and zodiac edge.'],
    ['Celestial Transit Tee','Apparel','Washed black tee with a minimal transit diagram across the back.'],
    ['Tarot Symbol Pin Series','Pin set','Moon, tower, sun, and star icons in metal.'],
    ['Zodiac Art Print Set','Print set','Twelve moody graphic zodiac illustrations for altar walls.'],
    ['Mercury Retrograde Notebook','Stationery','Compact dot-grid notebook with cosmic warning graphics.'],
    ['Cosmic Correspondence Stickers','Sticker pack','Mystical icons, planets, hands, crystals, and type.'],
    ['Night Sky Hoodie','Apparel','Oversized charcoal hoodie with sparse constellation work.']
  ].map(([name,type,direction]) => ({brand:'Tarosyn',name,type,direction})),
  ...[
    ['Xcalitoy World Tee','Apparel','Heavy black tee with a cinematic world-building back graphic.'],
    ['After Hours Hoodie','Apparel','Faded charcoal pullover with nocturnal oversized artwork.'],
    ['Signal From Somewhere Poster','Art print','Grainy transmission-style visual in a minimal layout.'],
    ['Archive Logo Cap','Headwear','Low-profile black cap with tonal embroidered lettering.'],
    ['Night Drive Tote','Accessory','Black canvas with a reflective silver line graphic.'],
    ['Static Sticker Sheet','Sticker pack','Wordmarks, symbols, distorted type, and visual fragments.'],
    ['World Notes Zine','Publication','Printed zine of visuals, notes, and artist-world pieces.'],
    ['Darkroom Long Sleeve','Apparel','Narrow arm type with a back-image treatment.'],
    ['Audio Relic Keychain','Accessory','Matte metal signal, cassette, or X-shaped charm.'],
    ['Midnight Screenprint','Limited art print','Deep-black screenprint with muted chrome ink.']
  ].map(([name,type,direction]) => ({brand:'Xcalitoy',name,type,direction})),
  ...[
    ['Late Hours Tee','Apparel','Washed black tee with a night-road California graphic.'],
    ['California After Dark Hoodie','Apparel','Soft charcoal hoodie with moody California visual cues.'],
    ['Dark Melodic Pulse Poster','Art print','Cinematic artist print with restrained lyric-adjacent text.'],
    ['JC Monogram Cap','Headwear','Minimal black cap with a stitched JC monogram.'],
    ['Studio Notes Journal','Stationery','Matte-black book for lyric drafts, tracklists, and sessions.'],
    ['Passenger Seat Tote','Accessory','Canvas tote with a California-night image treatment.'],
    ['Soundcheck Long Sleeve','Apparel','Song-title-style typography running down the sleeves.'],
    ['Midnight CD Case Tee','Apparel','Graphic inspired by independent physical-release textures.'],
    ['California Signal Sticker Pack','Sticker pack','Palms, studio symbols, handwriting, and artist marks.'],
    ['Night Shift Beanie','Headwear','Black ribbed beanie with a small woven JC label.']
  ].map(([name,type,direction]) => ({brand:'Joseph Calitoy',name,type,direction})),
  ...[
    ['Kurced Neon Logo Tee','Apparel','Black tee built around the supplied neon Kurced mark.'],
    ['Afterglow Mesh Top','Apparel','Layering piece with sharp gothic type and neon accents.'],
    ['Cursed Heart Hoodie','Apparel','Oversized hoodie with a cracked-heart emblem in hot pink.'],
    ['Nightclub Ruin Poster','Art print','Neon-goth club-light print with cathedral silhouettes.'],
    ['Chrome Thorn Choker','Accessory','Dark-metal choker with a minimal thorn charm.'],
    ['Blacklight Sticker Pack','Sticker pack','Broken halos, thorns, symbols, and warped lettering.'],
    ['Neon Tears Phone Case','Accessory','Dark phone case with glossy neon-drip art.'],
    ['Dead Signal Tote','Accessory','Black canvas tote with luminous glitch graphics.'],
    ['Goth Pop Nail Decals','Beauty accessory','Stars, thorns, hearts, and sharp Kurced type.'],
    ['Midnight Veil Beanie','Headwear','Black beanie with a small embroidered neon icon.']
  ].map(([name,type,direction]) => ({brand:'Kurced',name,type,direction})),
  ...[
    ['C7 Cue Sleeve','Cue accessory','Protective black sleeve with clean C7 geometry.'],
    ['C7 Chalk Holder','Cue accessory','Compact magnetic holder in matte black with etched logo.'],
    ['Break Room Tee','Apparel','Graphic tee with an eight ball and C7 cue linework.'],
    ['Precision Shot Hoodie','Apparel','Minimal table-diagram graphic with understated C7 mark.'],
    ['C7 Microfiber Towel','Game accessory','Cue-cleaning towel with tonal dark graphics.'],
    ['Rack ’Em Cap','Headwear','Structured black cap with embroidered C7 logo.'],
    ['Pool Hall Patch Set','Patch set','Balls, cue tips, score marks, and C7 iconography.'],
    ['C7 Scorebook','Stationery','Pocket book for matches, practice goals, and table notes.'],
    ['Cue Case Tag','Travel accessory','Durable identification tag with C7 graphic branding.'],
    ['Corner Pocket Print','Art print','Minimal billiards geometry in black, white, and green.']
  ].map(([name,type,direction]) => ({brand:'Calitoy Cues',name,type,direction})),
  ...[
    ['Custom Deck Art Tee','Apparel','Collage of deck silhouettes and workshop branding.'],
    ['Deck Wall Hanger','Home accessory','Minimal display hardware with branded instructions.'],
    ['Grip Tape Graphic Sheet','Skate accessory','High-contrast printed grip-tape design direction.'],
    ['Skate Shop Hoodie','Apparel','Heavy hoodie with workshop-stamp back graphics.'],
    ['Deck Builder Sketchbook','Stationery','Blank book for board graphics and color studies.'],
    ['Customs Logo Beanie','Headwear','Workwear black beanie with a woven patch.'],
    ['Wheel Mark Sticker Pack','Sticker pack','Board shapes, hardware icons, scribbles, and labels.'],
    ['Skate Tool Pouch','Utility accessory','Compact pouch for hardware and small essentials.'],
    ['Rough Cut Art Print','Art print','Screenprint-style deck graphic with imperfect edges.'],
    ['Workshop Tote','Accessory','Durable canvas marked with a workshop stamp graphic.']
  ].map(([name,type,direction]) => ({brand:'Calitoy Customs',name,type,direction})),
  ...[
    ['Wicked Youth Vanity Tee','Apparel','Clean black tee with glossy beauty-inspired graphics.'],
    ['Glow With Teeth Cosmetic Bag','Beauty accessory','Black zipper pouch with bright flare graphics.'],
    ['Youthful Chaos Mirror','Beauty accessory','Compact mirror with a glossy neon Wicked Youth mark.'],
    ['Flare Face Towel Set','Beauty accessory','Soft towels with high-contrast tabs and graphic trim.'],
    ['Aftercare Hoodie','Apparel','Oversized black hoodie with beauty-lab back graphics.'],
    ['Wicked Youth Headband','Beauty accessory','Stretch headband with a discreet woven mark.'],
    ['Product Ritual Pouch','Beauty accessory','Reusable travel organizer for future skin-product routines.'],
    ['Flare Sticker Sheet','Sticker pack','Glossy lips, stars, flames, and beauty-lab type.'],
    ['Glow Club Keychain','Accessory','Acrylic charm with a bright translucent flare motif.'],
    ['Youth Goods Tote','Accessory','Natural canvas tote with an oversized Wicked Youth wordmark.']
  ].map(([name,type,direction]) => ({brand:'Wicked Youth Goods',name,type,direction})),
  ...[
    ['Camp Crew Tee','Apparel','A field-day tee for builders, mentors, and mentees.'],
    ['Field Notes Workbook','Education tool','Structured workbook for goals, projects, and reflection.'],
    ['Mentor Session Cards','Learning tool','Prompt deck for one-on-one conversations and progress.'],
    ['Ideas Need Reps Hoodie','Apparel','Heavy hoodie with a simple practice-over-perfection message.'],
    ['Roadmap Wall Print','Education tool','Editable-looking visual map for turning an idea into action.'],
    ['Camp Canvas Tote','Accessory','Durable tote for notes, laptops, and workshop materials.'],
    ['Progress Pin Set','Pin set','Small markers for milestones, feedback, and finished work.'],
    ['Future Builder Cap','Headwear','Classic cap with understated CalitoyCamp embroidery.'],
    ['Workshop Sticker Pack','Sticker pack','Prompts, arrows, notes, and positive pressure.'],
    ['The Long Game Journal','Stationery','Guided notebook for mentoring plans and personal progress.']
  ].map(([name,type,direction]) => ({brand:'CalitoyCamp',name,type,direction}))
];

const conceptCatalog = document.getElementById('concept-catalog');
const filterButtons = document.querySelectorAll('[data-filter]');

function renderConcepts(filter = 'all') {
  const concepts = filter === 'all' ? merchConcepts : merchConcepts.filter((concept) => concept.brand === filter);
  conceptCatalog.innerHTML = concepts.map((concept, index) => `<article class="concept-card" data-brand="${concept.brand}"><span>${concept.brand.toUpperCase()} / ${String(index + 1).padStart(2, '0')}</span><h3>${concept.name}</h3><p>${concept.direction}</p><small>${concept.type.toUpperCase()} / PROPOSED DROP</small></article>`).join('');
}

filterButtons.forEach((button) => button.addEventListener('click', () => {
  filterButtons.forEach((item) => item.classList.remove('is-active'));
  button.classList.add('is-active');
  renderConcepts(button.dataset.filter);
}));

renderConcepts();
