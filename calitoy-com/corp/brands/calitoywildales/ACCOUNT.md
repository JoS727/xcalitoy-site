# California Wild Ales — Calitoy Core Test Account

> **Status: TEST ACCOUNT** — founder-built onboarding demo. Not a live commercial account. Storefront checkout is disabled; Printful store not provisioned.

## Identity (researched 2026-09)

| Field | Value |
|---|---|
| Brand | California Wild Ales (California Wild Ales LLC) |
| Founded | 2015 — San Diego, CA |
| Founders | Zack Brager, Bill DeWitt, Cameron Pyror (head brewer) |
| Positioning | San Diego's all-barrel-aged sour house, now a full craft lineup |
| Tagline (ours) | *Celebrate the Funk. Wild Fermented. Barrel Aged.* |
| Website | californiawildales.com |
| Instagram | @californiawildales · Twitter/X @caliwildales · FB californiawildales |
| Phone | (855) 945-3253 |

## Locations

- **Ocean Beach Taproom** — 4896 Newport Ave, San Diego, CA 92107 (the original; ~49 capacity, reclaimed materials, 16 taps)
- **Barrelhouse / Production** — 3826 Sherman St, Midway / Point Loma (100+ barrels & foeders, 20-tap taproom)

## Story (the founder's version)

Born 2015 as San Diego's only all-barrel-aged American sour brewery. Golden sours age 9–12 months in American/French/Hungarian oak on Lacto, Brett, and Pedio, then re-ferment 4–8 weeks on local fruit — Carlsbad blueberries from The Flower Fields, Escondido peaches and grapes. The OB room was built from reclaimed and donated neighborhood materials; wild-thing creatures on the walls nod to *Where the Wild Things Are*. Three-peat champions of the OB Chili Cook-Off (currently "taking a victory lap"). Community-giving DNA: Rady Children's Hospital Super Smash Bros tournaments.

## Flagship pours (referenced in collection)

- **Gose Loco** — 12 mo barrel-aged; Hungarian oak soaked 2 mo in añejo tequila; Bearss limes from Escondido; sea salt + agave
- **Fuzzy Peaches / Peach Cobbler** — 12 mo barrel-aged pastry sour, rested 2 mo on peaches, bourbon Madagascar vanilla + cinnamon
- **Ozzy Oz-Orange** — blood orange & cherry sour, 6% ABV
- **Midas Touch** — foeder-aged golden sour × Brett saison blend
- **14 Mile** — West Coast IPA (clean lane)

## What was created in Calitoy Core

| Layer | File | What it is |
|---|---|---|
| Brand registry (v1, admin-live) | `admin/data/merch-database.js` | `BRANDS.calitoywildales` — amber barrelhouse palette |
| Brand registry (v2, full schema) | `admin/data/merch-database-v2.js` | Full profile: pillars, socials, logo refs, test-account notes |
| Design library | `admin/data/merch-database.js` | `DESIGN_LIBRARY.calitoywildales` — 10 beer-true designs (cwa-001…010), all **approved** |
| Storefront | `brands/calitoywildales/index.html` | Amber barrelhouse store, 10-product "Barrel House Collection," cart, test banner, checkout disabled |
| Corp portfolio card | `index.html` | Brand card → Visit Store, stats: 10 Products / TEST Account |
| All-brands hub | `brands/hub/index.html` | Hero link, filter tab, 10 hub products, badge/price/button theming |
| Admin sidebar | `admin/index.html` | CWA filter lane (10 designs), color vars, All-Brands count 50→60 |

## Pending when this goes live

1. **Printful store** — `Create "California Wild Ales Official" store` via `admin/api/create-stores.py` pattern; put the ID in both registries (`storeId`).
2. **Logo assets** — drop `calitoywildales_wordmark/barrel/beast.svg` under `assets/branding/` (emoji placeholders until brand-approved art arrives; ask CWA for their SVGs).
3. **Real product mockups** — replace emoji product tiles with Printful mockups after design sync.
4. **Age gate** — required before any real merch traffic (21+, CA).
5. **Merch lane on merch.html** — add a CWA row to the property-store grid once the account graduates from test.
6. **Approve with CWA** — this account uses their real name, socials, and beer names; the real founders (Zack, Bill, Cameron) should greenlight any public use. For now: test only, no promotion.

## Palette

- Primary bg: `#1a0f04` (barrel dark) · Accent: `#f59e0b` (amber) · Text: `#f5f0e8` (cream) · Oak: `#8b5a2b`