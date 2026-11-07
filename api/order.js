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
  const WA_PHONE = process.env.WHATSAPP_PHONE, WA_KEY = process.env.CALLMEBOT_APIKEY;
  const sheetOn = Boolean(URL_ && SECRET), waOn = Boolean(WA_PHONE && WA_KEY);
  if (!sheetOn && !waOn) return res.status(503).json({ ok: false, error: "not configured" });
 
  let b = req.body;
  if (typeof b === "string") { try { b = JSON.parse(b); } catch { b = {}; } }
  b = b || {};
  const c = b.customer || {};
  const phone = String(c.phone || "").replace(/[^\d]/g, "");
  if (b.kind !== "review" && !/^01[0125]\d{8}$/.test(phone)) return res.status(400).json({ ok: false, error: "phone" });
  const name = clean(c.name, 80);
  if (name.length < 2) return res.status(400).json({ ok: false, error: "name" });
  const source = clean(b.source, 40);
  const line = "────────────";
  let payload;
 
  if (b.kind === "review") {
    const r = b.review || {};
    const rating = Math.max(1, Math.min(5, Math.round(Number(r.rating) || 0)));
    const prod = catalog.products.find(x => x.id === r.product);
    const text = clean(r.text, 800);
    if (text.length < 3) return res.status(400).json({ ok: false, error: "text" });
    const body = [
      "تقييم جديد من موقع SWYR (راجعه قبل النشر)",
      `الاسم: ${name}`,
      phone ? `الموبايل: ${phone}` : null,
      `التقييم: ${"★".repeat(rating)}${"☆".repeat(5 - rating)} (${rating}/5)`,
      prod ? `العطر: ${prod.name.ar} (${prod.id})` : null,
      `التعليق: ${text}`,
      "",
      "للنشر انسخ السطر ده في reviews داخل catalog.json:",
      JSON.stringify({ name, rating, text, product: prod ? prod.id : undefined, date: new Date().toISOString().slice(0, 10) })
    ].filter(x => x !== null).join("\n");
    payload = { kind: "review", name, phone, rating, product: prod ? `${prod.name.ar} (${prod.id})` : "", comment: text, source,
      subject: `تقييم جديد ${rating}/5 — ${name}`, text: body };
  } else if (b.kind === "request") {
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
      priced.bundle ? `عرض اشترِ 2 والثالث هدية (${priced.freeUnits} مجانًا): -${money(priced.bundle)}` : null,
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
      sub: priced.sub, discount: priced.dis + priced.bundle, shipping: priced.ship, total: priced.total, pay: PAY[pay],
      notes: clean(c.notes, 500), source, text,
      subject: `طلب جديد ${orderId} — ${money(priced.total)} — ${name}`
    };
  }
 
  const withTimeout = (ms) => { const c = new AbortController(); const t = setTimeout(() => c.abort(), ms); return { signal: c.signal, done: () => clearTimeout(t) }; };
 
  // 1) Google Sheet + email (Apps Script)
  const toSheet = async () => {
    if (!sheetOn) return false;
    const tm = withTimeout(9000);
    try {
      const r = await fetch(URL_, {
        method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ ...payload, secret: SECRET }), redirect: "follow", signal: tm.signal
      });
      const out = await r.json().catch(() => ({}));
      if (!r.ok || !out.ok) { console.error("orders webhook failed", r.status, JSON.stringify(out).slice(0, 300)); return false; }
      return true;
    } catch (e) { console.error("orders webhook error", e && e.message); return false; }
    finally { tm.done(); }
  };
 
  // 2) WhatsApp message to the shop owner (CallMeBot — free, personal use)
  const toWhatsApp = async () => {
    if (!waOn) return false;
    const tm = withTimeout(9000);
    try {
      const msg = payload.text.length > 1500 ? payload.text.slice(0, 1500) + "…" : payload.text;
      const u = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(WA_PHONE)}&text=${encodeURIComponent(msg)}&apikey=${encodeURIComponent(WA_KEY)}`;
      const r = await fetch(u, { signal: tm.signal });
      const body = await r.text().catch(() => "");
      if (!r.ok || /error|invalid|not\s+allowed/i.test(body.slice(0, 400))) { console.error("whatsapp failed", r.status, body.slice(0, 200)); return false; }
      return true;
    } catch (e) { console.error("whatsapp error", e && e.message); return false; }
    finally { tm.done(); }
  };
 
  const [sheet, wa] = await Promise.all([toSheet(), toWhatsApp()]);
  if (!sheet && !wa) return res.status(502).json({ ok: false, error: "delivery" });
  return res.status(200).json({ ok: true, total: payload.total, sheet, whatsapp: wa });
};