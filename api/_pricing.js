// Server-side order pricing. Must give the same result as totals() in app.js.
// (Files starting with "_" inside /api are helpers, not endpoints.)
function priceOrder(catalog, items, couponCode, govId) {
  if (!Array.isArray(items) || !items.length || items.length > 30) return { error: "items" };
  let sub = 0;
  const parts = [];
  for (const it of items) {
    const p = catalog.products.find(x => x.id === it.id);
    if (!p) return { error: "product" };
    const sizes = typeof p.sizes === "string" ? ((catalog.priceList || {})[p.sizes] || []) : p.sizes;
    const s = sizes.find(z => z.ml === Number(it.ml));
    if (!s) return { error: "size" };
    const qty = Math.floor(Number(it.qty));
    if (!(qty >= 1 && qty <= 50)) return { error: "qty" };
    sub += s.price * qty;
    parts.push(`${p.name.en} ${s.ml ? s.ml + "ml" : ""} x${qty}`.replace(/\s+/g, " "));
  }
  let dis = 0;
  const code = String(couponCode || "");
  if (code && !code.startsWith("_")) {
    const key = Object.keys(catalog.coupons || {}).find(k => !k.startsWith("_") && k.toUpperCase() === code.toUpperCase());
    if (key) {
      const cd = catalog.coupons[key];
      dis = cd.type === "percent" ? Math.round(sub * cd.value / 100) : Math.min(sub, cd.value);
    }
  }
  const gov = catalog.governorates.find(g => g.id === govId);
  if (!gov) return { error: "governorate" };
  const freeOver = catalog.settings.freeShippingOver;
  const ship = freeOver && (sub - dis) >= freeOver ? 0 : (catalog.shippingZones[gov.zone] || 0);
  const total = Math.round(sub - dis + ship);
  if (total <= 0) return { error: "total" };
  return { sub, dis, ship, total, gov, summary: parts.join(", ") };
}
module.exports = { priceOrder };
