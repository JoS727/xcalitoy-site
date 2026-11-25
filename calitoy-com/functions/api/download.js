// GET /api/download?t=<signed token>  -> streams the file from the private R2 bucket.
// Tokens are HMAC-signed, bound to one SKU + Stripe session, and expire after 15 minutes.
import { ITEMS, verifyToken } from "../../functions-lib/works.js";

export async function onRequestGet({ request, env }) {
  const data = await verifyToken(env, new URL(request.url).searchParams.get("t"));
  if (!data) return new Response("This download link is invalid or has expired. Reopen your order page to get a fresh link.", { status: 403 });
  const item = ITEMS.get(data.sku);
  if (!item || !env.DOWNLOADS) return new Response("Not available.", { status: 404 });
  const obj = await env.DOWNLOADS.get(item.direct.download_key);
  if (!obj) return new Response("File not found. Contact books@calitoy.com with your receipt.", { status: 404 });
  const name = item.direct.filename || item.direct.download_key.split("/").pop();
  return new Response(obj.body, {
    headers: {
      "content-type": item.direct.content_type || "application/octet-stream",
      "content-disposition": `attachment; filename="${name.replace(/[^\x20-\x7E]|"/g, "")}"`,
      "content-length": String(obj.size),
      "cache-control": "private, no-store",
      "x-robots-tag": "noindex",
    },
  });
}
