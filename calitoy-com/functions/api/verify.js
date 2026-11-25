// GET /api/verify?session_id=cs_...
// Confirms with Stripe that the session is PAID, then issues a 15-minute signed download link.
import { ITEMS, sellable, stripe, signToken, json } from "../../functions-lib/works.js";

export async function onRequestGet({ request, env }) {
  const sid = new URL(request.url).searchParams.get("session_id") || "";
  if (!/^cs_(live|test)_[A-Za-z0-9]+$/.test(sid)) return json({ status: "invalid", message: "Missing or invalid order reference." }, 400);
  if (!env.STRIPE_SECRET_KEY) return json({ status: "unavailable", message: "Checkout is not configured." }, 503);

  let session;
  try {
    session = await stripe(env, "GET", `checkout/sessions/${encodeURIComponent(sid)}`);
  } catch {
    return json({ status: "invalid", message: "We couldn't find that order." }, 404);
  }
  if (session.payment_status !== "paid") return json({ status: "unpaid", message: "Payment not completed yet." }, 402);

  const item = ITEMS.get(session.metadata?.sku);
  if (!sellable(item).ok) return json({ status: "unavailable", message: "This product is not available for download. Contact books@calitoy.com with your receipt." }, 410);

  const { token, expiresIn } = await signToken(env, item.sku, sid);
  return json({
    status: "paid",
    title: item.title,
    format: item.direct.format,
    download_url: `/api/download?t=${token}`,
    expires_in: expiresIn,
  });
}
