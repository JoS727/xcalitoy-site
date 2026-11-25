# CalitoyCorp Merch Admin System

A comprehensive design approval and product management system for the CalitoyCorp portfolio of brands.

## 🎯 Overview

This admin system manages **50 designs across 5 brands**, with **10 core products** per design, creating **500+ product variants** ready for Printful integration.

### Brands Covered
- **Calitoy** - California streetwear (coastal, minimal, modern)
- **Kurced** - Neon goth aesthetic (dark, glitch, club culture)
- **Tarosyn** - Mystical objects (celestial, tarot, spiritual)
- **Endof8** - Ocean Beach lore (surf punk, coastal, OB culture)
- **Wicked Youth** - Beauty meets streetwear (glossy, bold, Gen Z)

## 📁 Structure

```
admin/
├── index.html              # Main approval dashboard
├── new-design.html         # Design creation interface
├── data/
│   └── merch-database.js   # 50 designs + products data
└── api/
    └── printful-integration.js  # Printful API wrapper
```

## 🚀 Quick Start

1. **Open the Admin Dashboard**
   ```
   https://jos727.github.io/CalitoyCorp/admin/
   ```

2. **Create New Design**
   ```
   https://jos727.github.io/CalitoyCorp/admin/new-design.html
   ```

## 🎨 Design Library (50 Designs)

### Calitoy (10 Designs)
1. Coastal Minimal - Line art California coast
2. Golden State Script - Hand-lettered logo
3. Pacific Wave - Geometric wave forms
4. Desert Bloom - Joshua tree silhouette
5. Cali Bear Modern - Geometric state bear
6. Venice Vibes - Skate/palm composition
7. Highway 1 - Coastal highway aerial
8. Citrus & Sun - Orange slice fusion
9. Redwood Roots - Tree cross-section
10. Cali Toy Block - Building block letters

### Kurced (10 Designs)
1. Neon Cross - Gothic cross with glow
2. Digital Thorns - Glitch vine wrap
3. Broken Halo - Cracked halo floating
4. Cursed Heart - Anatomical heart
5. Ghost Signal - Static TV horror
6. Neon Cathedral - Stained glass club
7. Toxic Love - Snake heart formation
8. Digital Roses - Pixel dissolving
9. Midnight Mass - Occult ritual
10. KURCED Wordmark - Gothic blackletter

### Tarosyn (10 Designs)
1. The Moon Card - Tarot reimagined
2. Celestial Hand - Palmistry reading
3. Zodiac Wheel - Astrological chart
4. Third Eye - Cosmic iris
5. Sacred Geometry - Flower of Life
6. Moon Phases - Lunar cycle
7. Crystal Cluster - Amethyst formation
8. Raven Messenger - Norse symbolism
9. Pentacle Garden - Witch garden
10. Tarosyn Wordmark - Constellation type

### Endof8 (10 Designs)
1. OB Pier - Pier silhouette
2. End of 8 - Number in waves
3. Dog Beach Sunset - Running dogs
4. Skate Wreck - Broken board
5. Volcano Cliffs - Sunset Cliffs
6. Hodads Nation - Retro diner
7. Pacific Grit - Weathered sign
8. Tide Pools - Marine ecosystem
9. Bonfire Nights - Beach fire
10. OB Forever - Vintage surf font

### Wicked Youth (10 Designs)
1. Lip Service - Glossy lips
2. Glow Getter - Highlighter beam
3. Wicked Script - Flame typography
4. Beauty Ritual - Skincare altar
5. Sparkle Eye - Glitter makeup
6. Youthquake - Product explosion
7. Glass Skin - Dewy surface
8. Baddie Energy - Lightning polish
9. Mirror Selfie - Phone frame
10. Wicked Youth Block - Stacked letters

## 👕 Core Products (10 per Design)

Each design can be applied to:
1. **Unisex Heavy Cotton Tee** - $31.25 (7 sizes, 5 colors)
2. **Premium Pullover Hoodie** - $60.00 (5 sizes, 5 colors)
3. **Classic Crewneck Sweatshirt** - $50.00 (4 sizes, 4 colors)
4. **Long Sleeve Tee** - $37.50 (3 sizes, 3 colors)
5. **Dad Hat / Baseball Cap** - $35.00 (4 colors)
6. **Cuffed Beanie** - $30.00 (4 colors)
7. **Canvas Tote Bag** - $27.50 (2 colors)
8. **Ceramic Mug 11oz** - $20.00 (2 colors)
9. **Art Print Poster** - $25.00 (3 sizes)
10. **Vinyl Sticker Pack** - $15.00 (5 stickers)

## ⚡ Workflow

```
Design Created → Pending Review → Approved → Sync to Printful → Live in Store
     ↓                ↓              ↓            ↓              ↓
  New Design      Admin Review   Auto-sync    Mockups       Store Live
  Interface       Dashboard      Products     Generated     Available
```

## 🔗 Printful Integration

The system connects to your Printful account and automatically:
- Creates products in the correct brand store
- Generates mockups for each product
- Sets retail pricing (2.5x markup)
- Syncs inventory and variants

### Store Mapping
- Tarosyn → Tarosyn Reliquary (ID: 18056870) ✓
- Calitoy → (Create new store)
- Kurced → (Create new store)
- Endof8 → (Create new store)
- Wicked Youth → (Create new store)

## 🛠️ Features

### Admin Dashboard
- Filter by brand and status
- Quick approve/reject actions
- Bulk operations
- Real-time sync status

### Design Builder
- Brand selection with aesthetic guides
- AI prompt builder with suggestions
- Product configuration
- Live preview generation

### Approval System
- 5 status states: Pending → In Review → Approved → Synced → Live
- Revision requests with notes
- Rejection tracking
- Audit trail

## 📊 Stats

- **Total Designs:** 50 (10 per brand)
- **Total Products:** 500 (10 products × 50 designs)
- **Total Variants:** ~17,500 (35 variants per product)
- **Brands:** 5
- **API Integration:** Printful

## 🔐 Security

- API key stored in `printful-integration.js`
- No server required - runs client-side
- Can be password-protected via GitHub Pages

## 📝 Next Steps

1. **Create Printful stores** for remaining brands
2. **Generate AI images** for all 50 designs
3. **Set up automated sync** between approval and Printful
4. **Add analytics** dashboard for sales tracking
5. **Integrate with Shopify** for additional sales channels

---

Built for CalitoyCorp by Joseph Calitoy
