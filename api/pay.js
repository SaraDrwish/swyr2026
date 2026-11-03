// Creates a Paymob payment (Intention API) and returns the hosted checkout URL.
// Prices are recalculated here from catalog.json — the amount sent by the browser is never trusted.
//
// Vercel environment variables:
//   PAYMOB_SECRET_KEY       (Paymob dashboard → Settings → Account info → Secret key)
//   PAYMOB_PUBLIC_KEY       (same page → Public key)
//   PAYMOB_INTEGRATION_ID   (Developers → Payment integrations → the Card integration ID)
//   PAYMOB_WALLET_INTEGRATION_ID   optional — adds mobile wallets to the same checkout
//   PAYMOB_API_BASE         optional, default https://accept.paymob.com
//   PAYMOB_CHECKOUT_BASE    optional, default https://eg.checkout.paymob.com

const catalog = require("../catalog.json");
const { priceOrder } = require("./_pricing");

module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") return res.status(405).json({ error: "method" });

  const { PAYMOB_SECRET_KEY, PAYMOB_PUBLIC_KEY, PAYMOB_INTEGRATION_ID, PAYMOB_WALLET_INTEGRATION_ID } = process.env;
  if (!PAYMOB_SECRET_KEY || !PAYMOB_PUBLIC_KEY || !PAYMOB_INTEGRATION_ID) {
    return res.status(503).json({ error: "online payment is not configured" });
  }
  const API = (process.env.PAYMOB_API_BASE || "https://accept.paymob.com").replace(/\/$/, "");
  const CHECKOUT = (process.env.PAYMOB_CHECKOUT_BASE || "https://eg.checkout.paymob.com").replace(/\/$/, "");

  let body = req.body;
  if (typeof body === "string") { try { body = JSON.parse(body); } catch { body = {}; } }
  body = body || {};

  const orderId = String(body.orderId || "").slice(0, 40);
  if (!/^SW-\d{6}-\d{4}$/.test(orderId)) return res.status(400).json({ error: "order id" });

  const priced = priceOrder(catalog, body.items, body.coupon, body.gov);
  if (priced.error) return res.status(400).json({ error: priced.error });

  const c = body.customer || {};
  const phone = String(c.phone || "").replace(/[^\d]/g, "");
  if (!/^01[0125]\d{8}$/.test(phone)) return res.status(400).json({ error: "phone" });
  const clean = (s, n = 120) => String(s || "").replace(/[\u0000-\u001f]/g, " ").trim().slice(0, n) || "NA";
  const nameParts = clean(c.name, 80).split(/\s+/);
  const email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(c.email || "")) ? String(c.email) : (catalog.settings.email || "customer@example.com");

  const host = req.headers["x-forwarded-host"] || req.headers.host;
  const proto = req.headers["x-forwarded-proto"] || "https";
  const origin = `${proto}://${host}`;

  const methods = [Number(PAYMOB_INTEGRATION_ID)];
  if (PAYMOB_WALLET_INTEGRATION_ID) methods.push(Number(PAYMOB_WALLET_INTEGRATION_ID));

  const cents = priced.total * 100;
  const payload = {
    amount: cents,
    currency: "EGP",
    payment_methods: methods,
    // one line for the whole order keeps the item sum equal to the amount (shipping & discounts included)
    items: [{ name: `SWYR order ${orderId}`, amount: cents, description: priced.summary.slice(0, 250), quantity: 1 }],
    billing_data: {
      first_name: nameParts[0] || "NA",
      last_name: nameParts.slice(1).join(" ") || nameParts[0] || "NA",
      phone_number: "+2" + phone,
      email,
      country: "EG",
      state: priced.gov.en,
      city: clean(c.area, 60),
      street: clean(c.address, 200),
      building: "NA", floor: "NA", apartment: "NA"
    },
    special_reference: `${orderId}-${Date.now().toString(36)}`,
    extras: { order_id: orderId },
    redirection_url: `${origin}/?order=${encodeURIComponent(orderId)}`
  };

  try {
    const r = await fetch(`${API}/v1/intention/`, {
      method: "POST",
      headers: { Authorization: `Token ${PAYMOB_SECRET_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await r.json().catch(() => ({}));
    if (!r.ok || !data.client_secret) {
      console.error("paymob error", r.status, JSON.stringify(data).slice(0, 500));
      return res.status(502).json({ error: "payment provider" });
    }
    const url = `${CHECKOUT}/?publicKey=${encodeURIComponent(PAYMOB_PUBLIC_KEY)}&clientSecret=${encodeURIComponent(data.client_secret)}`;
    return res.status(200).json({ url, total: priced.total });
  } catch (e) {
    console.error("paymob fetch failed", e);
    return res.status(502).json({ error: "payment provider" });
  }
};
