// POST /api/checkout  { sku }  (JSON from the Works page, or an HTML form post from author.calitoy.com)
// Creates a Stripe Checkout Session from inline price_data in works-catalog.json.
// Refuses (status "coming_soon") when the file is not in R2, so money is never taken for nothing.
import { ITEMS, sellable, hasFile, stripe, json, cors } from "../../functions-lib/works.js";

export async function onRequestPost({ request, env }) {
  const isForm = (request.headers.get("content-type") || "").includes("form");
  let sku = "";
  try {
    sku = isForm ? String((await request.formData()).get("sku") || "") : String((await request.json()).sku || "");
  } catch {
    /* fall through to unknown product */
  }
  const origin = new URL(request.url).origin;
  const item = ITEMS.get(sku);
  const reply = (data, status) => {
    if (!isForm) return json(data, status, cors(request));
    const to = data.url || `${origin}/works/?${data.status === "coming_soon" ? "soon" : "unavailable"}=${encodeURIComponent(sku)}#${encodeURIComponent(sku)}`;
    return Response.redirect(to, 303);
  };

  const gate = sellable(item);
  if (!gate.ok) return reply({ status: gate.status, message: gate.reason }, gate.status === "unknown" ? 404 : 403);
  if (!(await hasFile(env, item))) {
    return reply({ status: "coming_soon", message: `Direct download of ${item.title} is coming soon — nothing was charged. Store links on this page work today.` }, 409);
  }
  if (!env.STRIPE_SECRET_KEY) return reply({ status: "unavailable", message: "Checkout is not configured." }, 503);

  const d = item.direct;
  try {
    const session = await stripe(env, "POST", "checkout/sessions", {
      mode: "payment",
      "line_items[0][quantity]": "1",
      "line_items[0][price_data][currency]": d.currency || "usd",
      "line_items[0][price_data][unit_amount]": String(d.price_cents),
      "line_items[0][price_data][product_data][name]": `${item.title} — ${d.format || "Digital download"}`,
      "line_items[0][price_data][product_data][description]": "Digital download from calitoy.com. Delivered right after payment.",
      "metadata[sku]": item.sku,
      "payment_intent_data[metadata][sku]": item.sku,
      "payment_intent_data[description]": `Direct digital: ${item.title}`,
      success_url: `${origin}/works/success/?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/works/?canceled=1#${encodeURIComponent(item.sku)}`,
    });
    return reply({ status: "ok", url: session.url, id: session.id }, 200);
  } catch (err) {
    return reply({ status: "error", message: "Could not start checkout. Please try again." }, 502);
  }
}

export function onRequestOptions({ request }) {
  return new Response(null, {
    status: 204,
    headers: { ...cors(request), "access-control-allow-methods": "POST", "access-control-allow-headers": "content-type" },
  });
}
