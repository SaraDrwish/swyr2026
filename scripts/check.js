const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
 
const root = path.join(__dirname, "..");
const errors = [];
const warnings = [];
const err = m => errors.push(m);
const warn = m => warnings.push(m);
 
// 1) catalog.json must be valid JSON
let C;
try {
  C = JSON.parse(fs.readFileSync(path.join(root, "catalog.json"), "utf8"));
} catch (e) {
  console.error("✗ ملف catalog.json فيه غلطة في الكتابة (غالبًا فاصلة ناقصة أو زيادة، أو علامة \" ناقصة).");
  console.error("  التفاصيل: " + e.message);
  process.exit(1);
}
 
// 2) settings
const S = C.settings || {};
if (!S.instagramDM && !S.messenger && !S.whatsapp) err("لازم يبقى فيه طريقة واحدة على الأقل لاستقبال الطلبات: instagramDM أو messenger أو whatsapp.");
if (S.whatsapp && !/^20\d{10}$/.test(S.whatsapp)) err(`رقم الواتساب "${S.whatsapp}" مش بالصيغة الصح — لازم يبدأ بـ 20 وبعده 10 أرقام، زي 201012345678.`);
if (S.instagramDM && /[@\s/]/.test(S.instagramDM)) err(`اسم الإنستجرام "${S.instagramDM}" لازم يكون من غير @ ومن غير مسافات أو لينك.`);
const PX = S.pixels || {};
if (PX.meta && !/^\d{10,20}$/.test(String(PX.meta).trim())) err(`بيكسل ميتا "${PX.meta}" مش صح — لازم يكون أرقام بس (الـ Pixel ID، مش الكود كله).`);
if (PX.tiktok && !/^[A-Z0-9]{8,30}$/i.test(String(PX.tiktok).trim())) err(`بيكسل تيك توك "${PX.tiktok}" مش صح — حطي الـ Pixel ID بس (حروف وأرقام من غير مسافات).`);
if (PX.snap && !/^[0-9a-f-]{30,40}$/i.test(String(PX.snap).trim())) err(`بيكسل سناب "${PX.snap}" مش صح — حطي الـ Pixel ID بس (الكود الطويل اللي فيه شرط -).`);
if (S.instapay === "swyr@instapay" || S.wallet === "01000000000") err("عنوان إنستاباي أو رقم المحفظة لسه تجريبي — حطي بياناتك أو سيبيهم فاضيين \"\".");
if (typeof S.freeShippingOver !== "number") err("freeShippingOver لازم يكون رقم (من غير علامات تنصيص).");
 
// 3) price lists
const PL = C.priceList || {};
const checkSizes = (sizes, where) => {
  if (!Array.isArray(sizes) || !sizes.length) return err(`${where}: مفيش أحجام.`);
  const seen = new Set();
  sizes.forEach(s => {
    if (typeof s.ml !== "number") err(`${where}: الحجم لازم يكون رقم.`);
    if (typeof s.price !== "number" || !(s.price > 0)) err(`${where}: سعر حجم ${s.ml} مل لازم يكون رقم أكبر من صفر (من غير علامات تنصيص).`);
    if (seen.has(s.ml)) err(`${where}: حجم ${s.ml} مل متكرر.`);
    seen.add(s.ml);
  });
};
Object.entries(PL).filter(([k]) => !k.startsWith("_")).forEach(([k, v]) => checkSizes(v, `priceList.${k}`));
 
// 4) products
const ids = new Set();
const cats = new Set((C.categories || []).map(c => c.id));
(C.products || []).forEach((p, i) => {
  const where = `المنتج رقم ${i + 1} (${p.name && p.name.ar || p.id || "بدون اسم"})`;
  if (!p.id) err(`${where}: ناقصه id.`);
  else if (ids.has(p.id)) err(`${where}: الـ id "${p.id}" متكرر مع منتج تاني.`);
  ids.add(p.id);
  if (!p.name || !p.name.ar || !p.name.en) err(`${where}: لازم يبقى له اسم عربي وإنجليزي.`);
  if (!cats.has(p.category)) err(`${where}: التصنيف "${p.category}" مش موجود في categories.`);
  if (typeof p.sizes === "string") { if (!PL[p.sizes]) err(`${where}: قائمة الأسعار "${p.sizes}" مش موجودة في priceList.`); }
  else checkSizes(p.sizes, where);
  if (p.image && !fs.existsSync(path.join(root, p.image))) err(`${where}: الصورة "${p.image}" مش موجودة في فولدر img.`);
  Object.keys(p.notes || {}).forEach(k => { if (!C.notes[k]) warn(`${where}: النوتة "${k}" مش متعرّفة في notes.`); });
});
if (!ids.size) err("مفيش ولا منتج في الموقع.");
 
// 5) shipping, offers, coupons
const zones = C.shippingZones || {};
(C.governorates || []).forEach(g => { if (typeof zones[g.zone] !== "number") err(`محافظة ${g.ar}: منطقة الشحن "${g.zone}" ملهاش سعر في shippingZones.`); });
(C.offers || []).forEach(o => { if (o.product && !ids.has(o.product)) err(`العرض "${o.title && o.title.ar}": المنتج "${o.product}" مش موجود.`); });
Object.entries(C.coupons || {}).filter(([k]) => !k.startsWith("_")).forEach(([k, c]) => {
  if (!["percent", "fixed"].includes(c.type)) err(`كود ${k}: النوع لازم يكون percent أو fixed.`);
  if (typeof c.value !== "number" || c.value <= 0 || (c.type === "percent" && c.value > 90)) err(`كود ${k}: القيمة مش منطقية.`);
});
 
// 5b) bundle, reviews, reels
const Bn = C.bundle;
if (Bn && Bn.enabled && !(Number.isInteger(Bn.buy) && Bn.buy > 0 && Number.isInteger(Bn.get) && Bn.get > 0)) err("bundle: buy و get لازم يكونوا أرقام صحيحة أكبر من صفر.");
(C.reviews || []).forEach((r, i) => {
  const w = `التقييم رقم ${i + 1}`;
  if (!r.name || !r.text) err(`${w}: لازم يكون فيه name و text.`);
  if (!Number.isInteger(r.rating) || r.rating < 1 || r.rating > 5) err(`${w}: rating لازم يكون رقم من 1 لـ 5.`);
  if (r.product && !ids.has(r.product)) err(`${w}: العطر "${r.product}" مش موجود.`);
});
(C.videos || []).forEach((v, i) => {
  if (!/instagram\.com\/(?:[\w.]+\/)?(?:reel|reels|p|tv)\/[A-Za-z0-9_-]+/.test(String(v))) err(`الفيديو رقم ${i + 1}: "${v}" مش لينك ريل إنستجرام صحيح.`);
});
 
(C.bestSellers || []).forEach((b, i) => {
  const p = (C.products || []).find(x => x.id === b.id);
  if (!p) return err(`الأكثر مبيعًا رقم ${i + 1}: العطر "${b.id}" مش موجود.`);
  const sizes = typeof p.sizes === "string" ? PL[p.sizes] : p.sizes;
  if (b.ml != null && !(sizes || []).some(s => s.ml === b.ml)) err(`الأكثر مبيعًا رقم ${i + 1} (${p.name.ar}): حجم ${b.ml} مل مش موجود.`);
});
(C.products || []).forEach(p => (p.seasons || []).forEach(s => { if (!["summer", "winter", "spring", "autumn", "all"].includes(s)) err(`العطر ${p.name && p.name.ar}: الفصل "${s}" مش صح — المسموح: summer / winter / spring / autumn / all.`); }));
if (C.marquee && !Array.isArray(C.marquee.ar)) err("marquee.ar لازم يكون قائمة نصوص بين [ ].");
 
// 6) server pricing works for a sample order
try {
  const { priceOrder } = require(path.join(root, "api/_pricing.js"));
  const first = C.products[0];
  const sizes = typeof first.sizes === "string" ? PL[first.sizes] : first.sizes;
  const r = priceOrder(C, [{ id: first.id, ml: sizes[0].ml, qty: 1 }], "", (C.governorates[0] || {}).id);
  if (r.error || !(r.total > 0)) err("حساب سعر الطلب على السيرفر فيه مشكلة: " + (r.error || "total"));
} catch (e) { err("حساب الأسعار على السيرفر وقع: " + e.message); }
 
// 7) JavaScript files have no syntax errors
["app.js", "quiz.js", "api/pay.js", "api/config.js", "api/_pricing.js", "api/order.js"].filter(f => fs.existsSync(path.join(root, f))).forEach(f => {
  try { execFileSync(process.execPath, ["--check", path.join(root, f)], { stdio: "pipe" }); }
  catch (e) { err(`الملف ${f} فيه غلطة في الكود:\n${String(e.stderr || e.message).split("\n").slice(0, 5).join("\n")}`); }
});
 
// report
warnings.forEach(w => console.warn("! " + w));
if (errors.length) {
  console.error(`\n✗ لقيت ${errors.length} مشكلة — الموقع ما اتحدّثش، والنسخة القديمة لسه شغالة:\n`);
  errors.forEach((e, i) => console.error(`  ${i + 1}. ${e}`));
  process.exit(1);
}
console.log(`✓ كله تمام — ${ids.size} منتج، والموقع جاهز يتنشر.`);
 