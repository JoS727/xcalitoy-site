#!/usr/bin/env python3
"""Generate calitoy-com/works/index.html from works-catalog.json.

Usage:  python3 calitoy-com/works/build_works.py
The catalog is the single source of truth (the /api/checkout Pages Function
imports the same file). Never hand-edit index.html — edit the catalog and rerun.
"""
import html
import json
import pathlib
import sys

HERE = pathlib.Path(__file__).resolve().parent
CAT = json.loads((HERE / "works-catalog.json").read_text(encoding="utf-8"))
ITEMS = CAT["items"]
e = html.escape

TIER_NAMES = {1: "Buy Direct", 2: "Bandcamp", 3: "Digital purchase", 4: "Physical on demand", 5: "Streaming"}


def validate():
    """Fail loudly on catalog mistakes that could take money incorrectly."""
    errs, skus = [], set()
    for it in ITEMS:
        sku = it.get("sku")
        if not sku or sku in skus:
            errs.append(f"missing/duplicate sku: {sku}")
        skus.add(sku)
        d = it.get("direct", {})
        if d.get("eligible"):
            if it.get("status") != "available":
                errs.append(f"{sku}: direct-eligible but status={it.get('status')}")
            if it.get("literary") and it.get("founder_approved") is not True:
                errs.append(f"{sku}: literary work without founder approval cannot be sold")
            if it.get("type") == "single":
                errs.append(f"{sku}: singles are not sold direct")
            p = d.get("price_cents", 0) / 100
            rr = it.get("retail_reference", {})
            lo, hi = rr.get("lowest_retail"), rr.get("highest_payout")
            net = p - (p * 0.029 + 0.30)
            if lo is None or hi is None or not (hi < p < lo) or net <= hi:
                errs.append(f"{sku}: price {p:.2f} breaks rule (payout {hi} < price < retail {lo}; net after Stripe {net:.2f} must beat payout)")
            if not d.get("download_key"):
                errs.append(f"{sku}: direct-eligible without download_key")
    if errs:
        sys.exit("Catalog errors:\n  " + "\n  ".join(errs))


def money(cents):
    return f"${cents / 100:.2f}"


def buy_form(it, compact=False):
    d = it.get("direct", {})
    if not d.get("eligible"):
        return ""
    label = f"Buy Direct — Digital {money(d['price_cents'])}"
    return (
        f'<form class="buy" method="POST" action="/api/checkout" data-sku="{e(it["sku"])}" data-label="{e(label)}">'
        f'<input type="hidden" name="sku" value="{e(it["sku"])}">'
        f'<button type="submit" class="buy-btn" disabled>Direct download coming soon</button>'
        f'<span class="buy-note">{e(d.get("format", "Digital download"))} · most of your money goes straight to the artist</span></form>'
    )


def where_to_buy(it):
    rows = []
    d = it.get("direct", {})
    if d.get("eligible"):
        rows.append(f'<li class="t1"><span class="tier">1</span>{buy_form(it)}</li>')
    for ln in sorted(it.get("links", []), key=lambda x: x["tier"]):
        tag = ' <span class="tag">search</span>' if ln.get("kind") == "search" else ""
        rows.append(
            f'<li><span class="tier" title="{e(TIER_NAMES[ln["tier"]])}">{ln["tier"]}</span>'
            f'<a href="{e(ln["url"])}" target="_blank" rel="noopener">{e(ln["label"])}</a>{tag}</li>'
        )
    if not rows:
        return ""
    return f'<div class="wtb"><span class="wtb-h">Where to buy</span><ol>{"".join(rows)}</ol></div>'


def card(it):
    cover = f'<img class="cover" src="{e(it["cover"])}" alt="{e(it["title"])} cover" loading="lazy" width="400" height="400">' if it.get("cover") else '<div class="cover cover-blank" aria-hidden="true">C</div>'
    meta = []
    if it.get("type") in ("album", "single"):
        meta.append("Album" if it["type"] == "album" else "Single")
        meta.append(it["release_date"][:4])
        if it.get("tracks"):
            meta.append(f'{it["tracks"]} track' + ("s" if it["tracks"] != 1 else ""))
    elif it.get("subtitle"):
        meta.append(it["subtitle"])
    if it.get("status") != "available":
        return (
            f'<article class="item soon" id="{e(it["sku"])}">{cover}<div class="item-body">'
            f'<span class="badge">Coming soon</span><h3>{e(it["title"])}</h3>'
            f'<p class="meta">{e(it.get("note", ""))}</p><p class="nfs">Not for sale yet.</p></div></article>'
        )
    single_note = ""
    if it.get("type") == "single":
        single_note = '<p class="single-note">Singles aren\'t sold direct — grab the album direct, or buy the single in a store below.</p>'
    return (
        f'<article class="item" id="{e(it["sku"])}">{cover}<div class="item-body">'
        f'<h3>{e(it["title"])}</h3><p class="meta">{e(" · ".join(meta))}</p>{single_note}{where_to_buy(it)}</div></article>'
    )


def section(sid, n, title, body, lede=""):
    lede_html = f'<p class="sec-lede">{lede}</p>' if lede else ""
    return f'<section class="sec" id="{sid}"><h2 class="row-title"><span class="n">{n:02d}</span> {e(title)}</h2>{lede_html}{body}</section>'


def build():
    validate()
    featured = next(i for i in ITEMS if i.get("featured"))
    albums = [i for i in ITEMS if i["type"] == "album"]
    singles = [i for i in ITEMS if i["type"] == "single"]
    books = [i for i in ITEMS if i["type"] == "book"]
    gns = [i for i in ITEMS if i["type"] == "graphic_novel"]
    tv = [i for i in ITEMS if i["type"] in ("tv_episode", "tv_season")]
    digital = [i for i in ITEMS if i.get("direct", {}).get("eligible")]
    vinyl = [i for i in ITEMS if i.get("vinyl")]

    fl = sorted(featured["links"], key=lambda x: x["tier"])
    hero_links = "".join(
        f'<a class="ghost" href="{e(l["url"])}" target="_blank" rel="noopener">{e(l["label"])}</a>'
        for l in fl if l["store"] in ("elasticStage", "Apple Music", "iTunes")
    )
    hero = f'''<section class="hero" id="featured">
  <img class="hero-cover" src="{e(featured["cover"])}" alt="{e(featured["title"])} album cover" width="800" height="800" fetchpriority="high">
  <div class="hero-copy">
    <span class="eyebrow">Featured work · Latest album</span>
    <h1>{e(featured["title"])}</h1>
    <p class="lede">{e(featured.get("blurb", ""))}</p>
    {buy_form(featured)}
    <div class="hero-links">{hero_links}</div>
    <a class="jump" href="#music">See where to buy, ranked ›</a>
  </div>
</section>'''

    jump = "".join(f'<a href="#{s["id"]}">{e(s["title"].split(" —")[0])}</a>' for s in CAT["sections"])

    music_body = (
        '<h3 class="sub">Albums</h3><div class="grid">' + "".join(card(i) for i in albums) + "</div>"
        '<h3 class="sub">Singles</h3><div class="grid">' + "".join(card(i) for i in singles) + "</div>"
    )
    dig_rows = "".join(
        f'<li class="dl"><img src="{e(i["cover"])}" alt="" loading="lazy" width="64" height="64"><div><strong>{e(i["title"])}</strong>'
        f'<span class="meta">Elsewhere from ${i["retail_reference"]["lowest_retail"]:.2f} ({e(i["retail_reference"]["lowest_retail_source"].split(" (")[0])})</span>'
        f'{buy_form(i)}</div></li>'
        for i in digital
    )
    vin_rows = "".join(
        f'<article class="item">'
        f'<img class="cover" src="{e(i["cover"])}" alt="{e(i["title"])} cover" loading="lazy" width="400" height="400"><div class="item-body">'
        f'<h3>{e(i["title"])}</h3><p class="meta">12" heavyweight vinyl · pressed on demand</p>'
        + "".join(f'<a class="cta" href="{e(l["url"])}" target="_blank" rel="noopener">{e(l["label"])} ›</a>' for l in i["links"] if l["store"] == "elasticStage")
        + "</div></article>"
        for i in vinyl
    )
    cd_body = '''<div class="note-card"><h3>No CD pressing is live yet</h3>
<p>CDs will be made to order, one at a time, with nothing to pay up front. When a CD goes live it will be listed here, under the vinyl option for the same album.</p>
<p class="meta">Options we're looking at: elasticStage (vinyl and CD, also used for our vinyl) and Kunaki (CD on demand, no minimum).</p></div>'''
    soon = '<div class="note-card soon"><span class="badge">Coming soon</span><h3>{t}</h3><p>{p}</p></div>'
    gn_body = '<div class="grid">' + "".join(card(i) for i in gns) + "</div>" if gns else soon.format(t="Graphic novels", p="On the way.")
    tv_body = '<div class="grid">' + "".join(card(i) for i in tv) + "</div>" if tv else soon.format(t="TV — episodes &amp; seasons", p="Episodes and full seasons will be listed here when they're released.")
    merch_body = '<div class="merch">' + '<img src="/assets/cards/merch.jpg" alt="" loading="lazy">' + '<div><h3>Official Calitoy Merch</h3><p>Apparel and goods, printed on demand.</p><div class="merch-links">' + "".join(
        f'<a class="cta" href="{e(l["url"])}">{e(l["label"])} ›</a>' for l in CAT["merch"]["links"]) + "</div></div></div>"

    bodies = {
        "music": (music_body, "Ranked by what reaches the artist: direct first, then stores, then streaming."),
        "digital": (f'<ul class="dl-list">{dig_rows}</ul>', "Paid through Stripe, then downloaded from calitoy.com via a private, time-limited link."),
        "vinyl": (f'<div class="grid">{vin_rows}</div>', ""),
        "cd": (cd_body, ""),
        "books": ('<div class="grid">' + "".join(card(i) for i in books) + "</div>", ""),
        "graphic-novels": (gn_body, ""),
        "tv": (tv_body, ""),
        "merch": (merch_body, ""),
    }
    secs = "".join(section(s["id"], n, s["title"], *bodies[s["id"]]) for n, s in enumerate(CAT["sections"], 1))

    page = TEMPLATE.replace("{{HERO}}", hero).replace("{{JUMP}}", jump).replace("{{SECTIONS}}", secs)
    (HERE / "index.html").write_text(page, encoding="utf-8")
    print(f"wrote works/index.html — {len(ITEMS)} items, {len(digital)} direct-eligible")


TEMPLATE = (HERE / "template.html").read_text(encoding="utf-8")

if __name__ == "__main__":
    build()
