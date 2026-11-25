// GET /api/availability -> { available: { sku: true|false } }
// A SKU is "available" only if it passes every catalog gate AND its file exists in R2.
import { ITEMS, sellable, hasFile, json, cors } from "../../functions-lib/works.js";

export async function onRequestGet({ request, env }) {
  const available = {};
  await Promise.all(
    [...ITEMS.values()].map(async (item) => {
      if (sellable(item).ok) available[item.sku] = await hasFile(env, item);
    })
  );
  return json({ available, stripe_configured: !!env.STRIPE_SECRET_KEY }, 200, cors(request));
}

export function onRequestOptions({ request }) {
  return new Response(null, { status: 204, headers: { ...cors(request), "access-control-allow-methods": "GET" } });
}
