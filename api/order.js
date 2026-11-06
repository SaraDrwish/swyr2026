// Receives every order / special request from the site and forwards it to the
// Google Apps Script web app (Google Sheet + email to the shop owner).
// Prices are recalculated here from catalog.json — the browser's totals are never trusted.
//
// Vercel environment variables:
//   ORDERS_WEBHOOK_URL   the Apps Script "Web app URL" (ends with /exec)
//   ORDERS_SECRET        the same secret word written at the top of the Apps Script code
 
const catalog = require("../catalog.json");
const { priceOrder } = require("./_pricing");
 
const clean = (s, n = 300) => String(s ?? "").replace(/[\u0000-\u0008\u000b-\u001f]/g, " ").trim().slice(0, n);
const money = n => `${Math.round(n).toLocaleString("en-US")} ج.م`;
const PAY = { cod: "الدفع عند الاستلام", transfer: "تحويل إنستاباي / محفظة", card: "فيزا أونلاين (Paymob)" };
 
module.exports = async (req, res) => {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") return res.status(405).json({ ok: false, error: "method" });
  const URL_ = process.env.ORDERS_WEBHOOK_URL, SECRET = process.env.ORDERS_SECRET;
  if (!URL_ || !SECRET) return res.status(503).json({ ok: false, error: "not configured" });
 
  let b = req.body;
  if (typeof b === "string") { try { b = JSON.parse(b); } catch { b = {}; } }
  b = b || {};
  const c = b.customer || {};
  const phone = String(c.phone || "").replace(/[^\d]/g, "");
  if (!/^01[0125]\d{8}$/.test(phone)) return res.status(400).json({ ok: false, error: "phone" });
  const name = clean(c.name, 80);
  if (name.length < 2) return res.status(400).json({ ok: false, error: "name" });
  const source = clean(b.source, 40);
  const line = "────────────";
  let payload;
 
  if (b.kind === "request") {
    const r = b.request || {};
    const text = [
      "طلب خاص من موقع SWYR",
      `النوع: ${clean(r.type, 60)}`,
      `الاسم: ${name}`,
      `الموبايل: ${phone}`,
      r.qty ? `الكمية: ${clean(r.qty, 20)}` : null,
      r.date ? `مطلوب يوم: ${clean(r.date, 20)}` : null,
      r.budget ? `الميزانية للقطعة: ${clean(r.budget, 30)}` : null,
      r.details ? `التفاصيل: ${clean(r.details, 1000)}` : null,
      source ? `المصدر: ${source}` : null
    ].filter(Boolean).join("\n");
    payload = {
      kind: "request", name, phone, type: clean(r.type, 60), qty: clean(r.qty, 20), date: clean(r.date, 20),
      budget: clean(r.budget, 30), details: clean(r.details, 1000), source, text,
      subject: `طلب خاص جديد — ${clean(r.type, 60)} — ${name}`
    };
  } else {
    const orderId = clean(b.orderId, 40);
    if (!/^SW-\d{6}-\d{4}$/.test(orderId)) return res.status(400).json({ ok: false, error: "order id" });
    const priced = priceOrder(catalog, b.items, b.coupon, b.gov);
    if (priced.error) return res.status(400).json({ ok: false, error: priced.error });
    const pay = PAY[b.pay] ? b.pay : "cod";
    const status = b.paid ? `مدفوع أونلاين${b.txn ? ` — رقم العملية ${clean(b.txn, 40)}` : ""} (راجع Paymob)` : "جديد";
    const items = priced.lines.map(l => `${l.ar} (${l.en}) — ${l.size} × ${l.qty} = ${money(l.total)}`);
    const phone2 = String(c.phone2 || "").replace(/[^\d]/g, "");
    const text = [
      "طلب جديد من موقع SWYR",
      `رقم الطلب: ${orderId}`,
      line, ...items.map(x => "• " + x), line,
      `المجموع: ${money(priced.sub)}`,
      priced.dis ? `خصم: -${money(priced.dis)}` : null,
      `الشحن (${priced.gov.ar}): ${priced.ship === 0 ? "مجاني" : money(priced.ship)}`,
      `الإجمالي: ${money(priced.total)}`,
      `الدفع: ${PAY[pay]}`,
      b.paid ? `حالة الدفع: ${status}` : null,
      line,
      `الاسم: ${name}`,
      `الموبايل: ${phone}`,
      phone2 ? `رقم آخر: ${phone2}` : null,
      `المحافظة: ${priced.gov.ar}`,
      `المنطقة: ${clean(c.area, 100)}`,
      `العنوان: ${clean(c.address, 300)}`,
      c.notes ? `ملاحظات: ${clean(c.notes, 500)}` : null,
      source ? `المصدر: ${source}` : null
    ].filter(Boolean).join("\n");
    payload = {
      kind: "order", orderId, status, name, phone, phone2, gov: priced.gov.ar, area: clean(c.area, 100),
      address: clean(c.address, 300), items: items.join("\n"), count: priced.lines.reduce((a, l) => a + l.qty, 0),
      sub: priced.sub, discount: priced.dis, shipping: priced.ship, total: priced.total, pay: PAY[pay],
      notes: clean(c.notes, 500), source, text,
      subject: `طلب جديد ${orderId} — ${money(priced.total)} — ${name}`
    };
  }
 
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 9000);
    const r = await fetch(URL_, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ ...payload, secret: SECRET }),
      redirect: "follow",
      signal: ctrl.signal
    });
    clearTimeout(timer);
    const out = await r.json().catch(() => ({}));
    if (!r.ok || !out.ok) {
      console.error("orders webhook failed", r.status, JSON.stringify(out).slice(0, 300));
      return res.status(502).json({ ok: false, error: "webhook" });
    }
    return res.status(200).json({ ok: true, total: payload.total });
  } catch (e) {
    console.error("orders webhook error", e && e.message);
    return res.status(502).json({ ok: false, error: "webhook" });
  }
};
 