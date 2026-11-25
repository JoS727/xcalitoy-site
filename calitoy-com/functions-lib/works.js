// Shared helpers for the Works direct-download Pages Functions.
// Single source of truth for products: ../works/works-catalog.json
import catalog from "../works/works-catalog.json";

export const ITEMS = new Map(catalog.items.map((i) => [i.sku, i]));
const LINK_TTL_SECONDS = 15 * 60;

const ALLOWED_ORIGIN = /^https:\/\/([a-z0-9-]+\.)?(calitoy\.com|calitoy\.pages\.dev|calitoy-author\.pages\.dev)$/;

export function cors(request) {
  const o = request.headers.get("origin") || "";
  return ALLOWED_ORIGIN.test(o) ? { "access-control-allow-origin": o, vary: "origin" } : {};
}

export function json(data, status = 200, extra = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store", ...extra },
  });
}

/** An item can be sold direct only if every gate passes. Returns {ok, reason}. */
export function sellable(item) {
  if (!item) return { ok: false, status: "unknown", reason: "Unknown product." };
  const d = item.direct || {};
  if (item.status !== "available" || !d.eligible) return { ok: false, status: "not_for_sale", reason: d.reason || "Not sold direct." };
  if (item.literary && item.founder_approved !== true) return { ok: false, status: "not_for_sale", reason: "Awaiting founder approval." };
  if (!d.download_key || !Number.isInteger(d.price_cents) || d.price_cents < 100) return { ok: false, status: "not_for_sale", reason: "Catalog entry incomplete." };
  return { ok: true };
}

/** True only when the deliverable file is actually in the private R2 bucket. */
export async function hasFile(env, item) {
  if (!env.DOWNLOADS) return false;
  try {
    return !!(await env.DOWNLOADS.head(item.direct.download_key));
  } catch {
    return false;
  }
}

export async function stripe(env, method, path, form) {
  const res = await fetch(`https://api.stripe.com/v1/${path}`, {
    method,
    headers: {
      authorization: `Bearer ${env.STRIPE_SECRET_KEY}`,
      ...(form ? { "content-type": "application/x-www-form-urlencoded" } : {}),
    },
    body: form ? new URLSearchParams(form).toString() : undefined,
  });
  const body = await res.json();
  if (!res.ok) throw new Error(body?.error?.message || `Stripe HTTP ${res.status}`);
  return body;
}

// ---- signed, short-lived download tokens (HMAC-SHA256) ----
const enc = new TextEncoder();
const b64u = (buf) => btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
const unb64u = (s) => Uint8Array.from(atob(s.replace(/-/g, "+").replace(/_/g, "/")), (c) => c.charCodeAt(0));

async function hmacKey(env) {
  if (!env.DOWNLOAD_SIGNING_SECRET || env.DOWNLOAD_SIGNING_SECRET.length < 32) throw new Error("DOWNLOAD_SIGNING_SECRET missing");
  return crypto.subtle.importKey("raw", enc.encode(env.DOWNLOAD_SIGNING_SECRET), { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);
}

export async function signToken(env, sku, sessionId) {
  const payload = b64u(enc.encode(JSON.stringify({ sku, sid: sessionId, exp: Math.floor(Date.now() / 1000) + LINK_TTL_SECONDS })));
  const sig = await crypto.subtle.sign("HMAC", await hmacKey(env), enc.encode(payload));
  return { token: `${payload}.${b64u(sig)}`, expiresIn: LINK_TTL_SECONDS };
}

export async function verifyToken(env, token) {
  const [payload, sig] = String(token || "").split(".");
  if (!payload || !sig) return null;
  try {
    const ok = await crypto.subtle.verify("HMAC", await hmacKey(env), unb64u(sig), enc.encode(payload));
    if (!ok) return null;
    const data = JSON.parse(new TextDecoder().decode(unb64u(payload)));
    return data.exp > Math.floor(Date.now() / 1000) ? data : null;
  } catch {
    return null;
  }
}
