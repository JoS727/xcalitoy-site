# calitoy.com/works — operator guide (for future bots and humans)

This page lists every Calitoy work and, for each one, where to buy it, ordered by how much reaches us.
Everything is driven by one file: **`calitoy-com/works/works-catalog.json`**.
The page (`works/index.html`) is **generated** from it, and the checkout Pages Function imports the **same** file.
Never hand-edit `works/index.html`.

```
calitoy-com/
  works/works-catalog.json   <- single source of truth (edit this)
  works/template.html        <- page shell + CSS + small JS (buttons, checkout)
  works/build_works.py       <- validates the catalog, writes works/index.html
  works/index.html           <- GENERATED
  works/success/index.html   <- post-payment page (verifies session, shows download)
  works/img/*.jpg            <- covers (compressed: 400px q78; hero 800px)
  functions/api/availability.js  GET  -> which SKUs can be bought right now
  functions/api/checkout.js      POST -> Stripe Checkout Session (inline price_data)
  functions/api/verify.js        GET  -> confirms the session is PAID, issues signed link
  functions/api/download.js      GET  -> streams the file from private R2 (15-minute token)
  functions-lib/works.js         shared gates, Stripe call, HMAC tokens
author-calitoy-com/index.html    PAUSE shelf posts to the same /api/checkout
```

## 1. Section order (fixed)

1. Featured work (hero): the item with `"featured": true` (currently **XCalitoy**). Exactly one item should be featured.
2. Music: albums, then singles (newest first)
3. Digital Downloads: every item whose `direct.eligible` is true
4. Vinyl: items with `"vinyl": true` (the elasticStage link)
5. CD on Demand: no CD is live yet; this shows a note until one exists
6. Books
7. Graphic Novels
8. TV: episodes and seasons
9. Merch: links to calitoy.com/merch/ and merch.calitoy.com

The order is set by `sections` in the catalog. Keep it.

## 2. Item schema (`items[]`)

| field | required | meaning |
|---|---|---|
| `sku` | yes | unique, kebab-case: `album-<slug>`, `single-<slug>`, `book-<slug>`, `gn-<slug>`, `tv-<show>-s01e01`, `tv-<show>-s01` |
| `title` | yes | display title |
| `type` | yes | `album` · `single` · `book` · `graphic_novel` · `tv_episode` · `tv_season` |
| `status` | yes | `available` · `coming_soon` · `not_for_sale` · `embargoed`. Only `available` items can be bought; anything else shows "Coming soon" with no buy button. |
| `release_date`, `tracks`, `subtitle`, `note`, `blurb` | no | display text |
| `cover` | no | site path, e.g. `/works/img/<slug>.jpg` |
| `featured` | no | `true` on exactly one item (the hero) |
| `vinyl` | no | `true` to list the item in the Vinyl section |
| `literary` | books, graphic novels, scripts | `true` turns on the founder-approval gate |
| `founder_approved` | if `literary` | must be literally `true` before it can be sold |
| `retail_reference` | if sold direct | `lowest_retail`, `highest_payout` (plus `_source` text). Used by the price check. |
| `direct.eligible` | yes | `true` only when we sell it ourselves |
| `direct.price_cents` | if eligible | integer cents, e.g. `899` |
| `direct.currency` | if eligible | `usd` |
| `direct.download_key` | if eligible | object key in the R2 bucket `calitoy-downloads`, e.g. `music/xcalitoy/Calitoy-xcalitoy.zip` |
| `direct.filename`, `direct.content_type`, `direct.format` | if eligible | what the buyer receives and sees |
| `direct.reason` | if not eligible | shown and logged, e.g. why singles aren't sold direct |
| `links[]` | no | `{tier, store, kind, label, url, price?}`; `kind` is `purchase` · `physical` · `stream` · `search` |

**Links must be real.** If you can't confirm a product URL, use the store's search URL with `kind: "search"` and a label that says "search". Never make up product IDs.

## 3. Where-to-buy order (`tier`, by what reaches us)

1. **Buy Direct (Stripe):** ~96% kept (2.9% + $0.30). The button is made from `direct`; don't add it as a link.
2. **Bandcamp:** ~82%. None exists today. Add it only if a real Bandcamp page exists.
3. **Digital purchase:** iTunes (~70%) and Amazon digital (~70%).
4. **Physical on demand:** elasticStage vinyl/CD (~20–50% royalty) and Kunaki CD. Amazon paperback for books also goes here.
5. **Streaming:** Apple Music, Spotify, Amazon Music, SoundCloud, and others (fractions of a cent per play).

The generator sorts by `tier`, so list order in the JSON doesn't matter.

## 4. Pricing formula for Buy Direct

The direct price must be **above our highest payout anywhere else** and **below the lowest retail price anywhere else**.
We are also strict about one more thing: **what we keep after Stripe** (`price − (2.9% × price + $0.30)`) must also beat that payout.
`build_works.py` refuses to build if any direct item breaks this rule.

- **Music albums:** `price = floor(lowest_retail − 0.50) − 0.01` (ends in .99)
  - XCalitoy: iTunes $9.99 pays ~$7.00, so direct is **$8.99** (we keep ~$8.43)
  - Two Light / That JO3MAD / Paper Boy: iTunes $8.91 pays ~$6.24, so direct is **$7.99**
  - Roses / CaliTOY: iTunes $7.92 pays ~$5.54, so direct is **$6.99**
  - Dance And Play: iTunes $6.93 pays ~$4.85, so direct is **$5.99**
  - A flat $8.99 would cost more than iTunes for the shorter albums. That's why each album has its own price.
- **Books (ebook):** keep the "27" brand ending. Use the highest `$X.27` that fits the rule.
  - PAUSE: Kindle $7.27 pays ~$5.09 (KDP 70%), so direct is **$6.27** (we keep ~$5.79)
- **Singles exception:** singles are **not** sold direct. At $0.99, Stripe's $0.30 fee means we'd keep ~$0.66, which is less than iTunes pays (~$0.70). Singles point buyers to the album (direct) or to stores. The validator blocks `type: single` with `direct.eligible: true`.
- **Graphic novels and TV:** use the same rule against the lowest real retail price once one exists (e.g. Amazon/Apple TV episode price). Without a retail reference, don't sell direct.

Get retail prices from the real store, e.g. the Apple lookup API:
`https://itunes.apple.com/lookup?id=1765144369&entity=album&limit=50` (`collectionPrice`).

## 5. Founder-approval rule (hard rule)

- **No literary work** (books, graphic novels, scripts, stories) goes on sale without the founder's (Joseph Calitoy's) explicit OK. Record it as `"founder_approved": true` in the same change, and name the approval in the commit message or PR.
- **Malice P.D. is embargoed.** Don't list it, mention it, or create a SKU for it until the founder lifts the embargo.
- **SPIDER** (book and graphic novel) and **WOLF MOON** are **not for sale**. They show "Coming soon" only.
- The gate is enforced three times: in `build_works.py` (build fails), in `functions-lib/works.js` `sellable()` (checkout refuses), and in `verify.js` (no download).

## 6. Adding a new completed digital product

1. **Confirm it's done and allowed.** Literary works need founder approval (section 5).
2. **Upload the file to the private R2 bucket** `calitoy-downloads`. Don't make it public, and never turn on r2.dev or a custom domain for this bucket.
   ```
   npx wrangler r2 object put calitoy-downloads/<download_key> --file <local file> --content-type <mime> --remote
   ```
   Key layout: `music/<slug>/…zip`, `books/<slug>/…epub`, `graphic-novels/<slug>/…pdf|cbz`, `tv/<show>/s01e01/…mp4`, `tv/<show>/s01/…zip`.
3. **Add a catalog item:**
   - Album (music): `type: "album"`, cover in `works/img/<slug>.jpg` (≤400px, JPEG q≈78), `retail_reference` from iTunes, `direct.price_cents` from the formula, links for tiers 3–5.
   - Book: `type: "book"`, `literary: true`, `founder_approved: true` (only after the OK), ebook EPUB/PDF key, Kindle/Paperback links (tiers 3–4).
   - Graphic novel: `type: "graphic_novel"`, otherwise the same as a book.
   - TV episode / season: `type: "tv_episode"` / `"tv_season"`, one SKU per episode and one per season bundle. Price each against its own retail reference.
4. To make it the hero, move `"featured": true` to the new item.
5. Run `python3 calitoy-com/works/build_works.py`. Fix any validation error; don't bypass it.
6. Deploy to preview and verify (section 8), then production only with the owner's OK.

The buy button turns on **by itself** once the R2 object exists: `/api/availability` runs `head()` on the key. Until then the button reads **"Direct download coming soon"** and `/api/checkout` returns `409 coming_soon`, so no money can be taken for a missing file.

## 7. Merch funnel

The Works page only **links out** to merch. It never sells merch itself.
- `calitoy.com/merch/`: the Merch landing inside the `calitoy` Pages project (Printful + Stripe store).
- `merch.calitoy.com`: the separate `calitoy-merch` Pages project.
To change these links, edit `catalog.merch.links`. Merch products and designs are managed in the merch repos (`JoS727/calitoy-merch`, `JoS727/Calitoy--Love-Louder`), not here.

## 8. Deploy and verify

| site | Pages project | how it's deployed |
|---|---|---|
| calitoy.com, www.calitoy.com | `calitoy` | **direct upload** (no git integration) |
| author.calitoy.com | `calitoy-author` | **direct upload** |
| merch.calitoy.com | `calitoy-merch` | separate |
| xcalitoy.com | `xcalitoy` | git-connected to this repo (root Vite app), not these folders |

**Before you deploy**, the folders here must match live. Both projects are direct upload, so someone may have deployed without committing.
Download the current production deployment's files (`GET /accounts/{acct}/pages/projects/<name>/deployments/<id>` returns `files`; fetch each path from `https://<short-id>.<name>.pages.dev`) and diff them with the repo. Live wins.
HTML on the custom domains differs only by Cloudflare edge injections (email obfuscation, Web Analytics beacon). Those are expected.

**Deploy the `calitoy` project.** Pages Functions are read from `./functions` in the working directory. Static files are staged without the source/tooling files:
```
cd calitoy-com
python3 works/build_works.py
rm -rf ../.deploy-calitoy && rsync -a --exclude functions --exclude functions-lib \
  --exclude works/README.md --exclude works/build_works.py --exclude works/template.html ./ ../.deploy-calitoy/
npx wrangler pages deploy ../.deploy-calitoy --project-name calitoy --branch works-preview   # PREVIEW
# production (owner's OK only): same command with --branch main
```
**Deploy author:** `npx wrangler pages deploy author-calitoy-com --project-name calitoy-author --branch works-preview`

**Bindings and secrets.** These are set per environment in the Pages project settings (API `deployment_configs.<env>`):
- `STRIPE_SECRET_KEY` (secret): the live Stripe account "Calitoy"
- `DOWNLOAD_SIGNING_SECRET` (secret, ≥32 chars): signs the 15-minute download tokens
- `DOWNLOADS` (R2 binding): bucket `calitoy-downloads`

As of 2026-11-25 these are set on the **preview** environment only. Production has none of them, so production checkout answers "not configured" until they're added there on purpose.

**Verify on the deployed URL:**
1. `/works/` returns 200 and shows every section. Check every external link's HTTP status (elasticStage and Amazon may block bots; check those in a real browser).
2. `GET /api/availability` lists every direct SKU, and `true` only where the R2 file exists.
3. `POST /api/checkout {"sku":"…"}` returns `409 coming_soon` with no file, or a `https://checkout.stripe.com/…` URL with one. **Don't complete a payment** unless it's an owner-approved test.
4. `POST /api/checkout {"sku":"single-…"}` and `{"sku":"book-spider"}` return 403.
5. The author shelf shows "Direct download coming soon" (or the live price button) under PAUSE.
6. Take an iPhone-width (390px) screenshot of `/works/`.
