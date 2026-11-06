/* SWYR storefront — vanilla JS, no build step.
   All business data lives in /catalog.json. */
(() => {
  "use strict";
 
  /* ---------------- text ---------------- */
  const T = {
    ar: {
      skip: "انتقل إلى العطور",
      "nav.shop": "العطور", "nav.offers": "العروض", "nav.gifts": "الهدايا والطلبات الخاصة", "nav.faq": "الأسئلة الشائعة",
      "hero.title": "نسمة من<br>الفخامة النقية",
      "hero.lead": "عطور مركّزة بثبات يدوم، نعبّئها يدويًا بعناية — من ١٠ مل للتجربة حتى ١٠٠ مل لمن وجد عطره.",
      "hero.shop": "تسوّق العطور", "hero.finder": "اكتشف عطرك",
      "promise.cod": "الدفع عند الاستلام", "promise.ship": "شحن لجميع المحافظات", "promise.last": "ثبات من ٨ إلى ١٢ ساعة",
      "offers.title": "العروض الحالية", "offer.copy": "انسخ الكود", "offer.copied": "تم نسخ الكود", "offer.shop": "اطلبه الآن",
      "col.title": "عطور سوير",
      "finder.title": "اكتشف عطرك", "finder.text": "اختر النوتات التي تفضّلها، وسنرتّب لك العطور حسب قربها من ذوقك.", "finder.reset": "مسح الاختيارات",
      "finder.match": "يناسب ذوقك بنسبة {n}٪",
      "tab.all": "الكل",
      "search": "ابحث عن عطر… مثلًا: بلاك أوبيوم، فانيلا، Dior", "more": "عرض المزيد ({n})", "results": "{n} عطر",
      "pyr.top": "الافتتاحية", "pyr.heart": "القلب", "pyr.base": "القاعدة",
      "disclaimer": "عطور سوير تركيبات خاصة مستوحاة من روائح عالمية. أسماء العلامات التجارية المذكورة مملوكة لأصحابها، وتُذكر للتعريف بطابع الرائحة فقط، ولا تتبع سوير أيًّا منها.",
      "card.add": "أضف إلى السلة", "card.added": "تمت الإضافة", "card.details": "التفاصيل",
      "empty": "لا توجد منتجات تطابق اختيارك.",
      "sizes.title": "لكل حجم وقته",
      "sizes.10": "للحقيبة وللتجربة الأولى", "sizes.30": "للسفر وللاستخدام الخفيف", "sizes.50": "الحجم المثالي للاستخدام اليومي", "sizes.100": "لعطرك المفضّل — الأوفر سعرًا",
      "gifts.title": "الهدايا والطلبات الخاصة",
      "gifts.text": "توزيعات الأفراح والخطوبة، وهدايا الشركات، وبوكسات باسم صاحب الهدية، والكميات بالجملة. أرسل تفاصيل طلبك وسنرد عليك بعرض سعر خلال يوم.",
      "rq.type": "نوع الطلب", "rq.qty": "الكمية التقريبية", "rq.date": "الموعد المطلوب", "rq.budget": "الميزانية للقطعة (اختياري)",
      "rq.details": "التفاصيل", "rq.detailsPh": "مثلًا: ٥٠ زجاجة ١٠ مل مع بطاقة تحمل اسم العروسين", "rq.send": "أرسل الطلب",
      "rq.types": ["هدية لشخص مميز", "توزيعات فرح أو خطوبة", "هدايا شركات", "جملة / إعادة بيع", "طلب آخر"],
      "faq.title": "الأسئلة الشائعة",
      faq: [
        ["متى يصل الطلب؟", "القاهرة والجيزة خلال يوم إلى ٣ أيام، وباقي المحافظات خلال ٣ إلى ٥ أيام عمل. سنتواصل معك فور خروج الطلب للشحن."],
        ["كيف أدفع؟", "نقدًا عند الاستلام، أو بتحويل إنستاباي أو محفظة إلكترونية قبل الشحن، أو بالبطاقة أونلاين إذا كان الخيار متاحًا في صفحة الطلب."],
        ["ما مدة ثبات العطر؟", "عطورنا مركّزة، ويدوم ثباتها من ٨ إلى ١٢ ساعة على البشرة وأكثر على الملابس، ويختلف ذلك قليلًا حسب طبيعة البشرة."],
        ["لست متأكدًا مما أختار؟", "ابدأ بحجم ١٠ مل، أو استخدم «اكتشف عطرك» في الأعلى، أو راسلنا على إنستجرام وسنساعدك في الاختيار."],
        ["هل يمكنني الاستبدال؟", "إذا وصل المنتج وبه أي مشكلة نستبدله فورًا. ولأن العطور منتج شخصي، يكون الاستبدال على الزجاجات المغلقة خلال ٣ أيام من الاستلام."]
      ],
      "cart.title": "السلة", "cart.checkout": "إتمام الطلب", "cart.continue": "متابعة التسوّق",
      "cart.empty": "السلة فارغة.", "cart.browse": "تصفّح العطور", "cart.remove": "إزالة",
      "cart.items": "{n} منتجات", "cart.item1": "منتج واحد", "cart.item2": "منتجان",
      "ship.free": "رائع! الشحن مجاني لطلبك.", "ship.left": "أضف {x} لتحصل على شحن مجاني.",
      "step.cart": "السلة", "step.details": "البيانات", "step.done": "التأكيد",
      "t.saved": "وفّرت", "t.sub": "المجموع", "t.dis": "خصم", "t.ship": "الشحن", "t.shipPick": "حسب المحافظة", "t.free": "مجاني", "t.total": "الإجمالي",
      "co.title": "بيانات التوصيل", "co.edit": "تعديل", "co.back": "العودة إلى السلة",
      "f.name": "الاسم", "f.phone": "رقم الموبايل", "f.phone2": "رقم آخر (اختياري)", "f.gov": "المحافظة", "f.govPick": "اختر المحافظة",
      "f.area": "المنطقة / المدينة", "f.address": "العنوان بالتفصيل", "f.addressPh": "الشارع، رقم العمارة، الدور، علامة مميزة",
      "f.notes": "ملاحظات (اختياري)", "f.notesPh": "مثلًا: موعد مناسب للتوصيل",
      "f.email": "البريد الإلكتروني (لإيصال الدفع)", "f.coupon": "كود الخصم", "f.apply": "تطبيق",
      "f.remember": "احفظ بياناتي للمرة القادمة",
      "pay.title": "طريقة الدفع",
      "pay.cod": "الدفع عند الاستلام", "pay.codNote": "نقدًا للمندوب عند الاستلام.",
      "pay.transfer": "إنستاباي أو محفظة إلكترونية", "pay.transferNote": "حوّل الإجمالي، وسنتواصل معك لاستلام صورة التحويل.",
      "pay.card": "فيزا / ماستركارد أونلاين", "pay.cardNote": "دفع آمن عبر Paymob. ستنتقل إلى صفحة الدفع ثم تعود إلى هنا.",
      "co.send": "تأكيد الطلب", "co.sending": "جارٍ إرسال الطلب…", "co.pay": "ادفع {x} بأمان", "co.paying": "جارٍ تحويلك إلى صفحة الدفع…",
      "err.name": "اكتب الاسم", "err.phone": "اكتب رقم موبايل مصريًا صحيحًا (١١ رقمًا يبدأ بـ 01)", "err.gov": "اختر المحافظة",
      "err.address": "اكتب العنوان بالتفصيل", "err.area": "اكتب المنطقة", "err.email": "اكتب بريدًا إلكترونيًا صحيحًا",
      "err.coupon": "هذا الكود غير صحيح", "ok.coupon": "تم تطبيق الكود", "err.pay": "تعذّر فتح صفحة الدفع الآن. حاول مرة أخرى أو اختر الدفع عند الاستلام.",
      "err.form": "راجع البيانات المظلّلة باللون الأحمر.", "err.rq": "اكتب الاسم ورقم موبايل صحيحًا.",
      "ok.title": "تم استلام طلبك", "ok.text": "شكرًا لك! وصلنا طلبك، وسنتواصل معك على رقم الموبايل لتأكيده قبل الشحن.",
      "ok.dm": "لتأكيد أسرع، يمكنك مراسلتنا أيضًا:",
      "ok.rqTitle": "تم استلام طلبك الخاص", "ok.rqText": "شكرًا لك! سنتواصل معك خلال يوم بعرض سعر.",
      "done.title": "خطوة أخيرة: أرسل لنا طلبك", "done.text": "نسخنا رسالة طلبك. اختر إنستجرام أو ماسنجر، ثم اضغط مطوّلًا في خانة الكتابة واختر «لصق» وأرسلها. يُؤكَّد الطلب فور وصول الرسالة إلينا.",
      "done.close": "العودة إلى الموقع", "done.num": "رقم الطلب",
      "done.paidTitle": "تم الدفع بنجاح", "done.paidText": "شكرًا لك! وصلنا طلبك ودفعتك، وسنتواصل معك لتأكيد موعد التوصيل.",
      "send.ig": "راسلنا على إنستجرام", "send.ms": "راسلنا على ماسنجر", "send.wa": "راسلنا على واتساب",
      "send.copy": "انسخ الرسالة مرة أخرى", "send.copied": "تم النسخ — الصقها في المحادثة", "send.show": "عرض الرسالة",
      "rq.title": "خطوة أخيرة: أرسل لنا طلبك", "rq.text": "نسخنا تفاصيل طلبك. افتح المحادثة، والصق الرسالة وأرسلها، وسنرد عليك بعرض سعر.",
      "done.failTitle": "لم تكتمل عملية الدفع", "done.failText": "لا تقلق، لم يُخصم أي مبلغ. يمكنك المحاولة مرة أخرى أو اختيار الدفع عند الاستلام.", "done.retry": "العودة إلى الطلب",
      "toast.added": "تمت إضافة «{n}» إلى السلة",
      "pd.notes": "طابع العطر", "pd.size": "الحجم",
      "ml": "مل"
    },
    en: {
      skip: "Skip to perfumes",
      "nav.shop": "Perfumes", "nav.offers": "Offers", "nav.gifts": "Gifts & special orders", "nav.faq": "FAQ",
      "hero.title": "A breath of<br>pure luxury",
      "hero.lead": "Concentrated perfumes that last, hand-filled with care — from a 10 ml discovery size to the 100 ml bottle of the one you love.",
      "hero.shop": "Shop perfumes", "hero.finder": "Find your scent",
      "promise.cod": "Cash on delivery", "promise.ship": "Nationwide shipping", "promise.last": "8–12 hours of wear",
      "offers.title": "Current offers", "offer.copy": "Copy code", "offer.copied": "Code copied", "offer.shop": "Order it",
      "col.title": "The SWYR collection",
      "finder.title": "Find your scent", "finder.text": "Pick the notes you love and we’ll rank the perfumes by how close they are to your taste.", "finder.reset": "Clear selection",
      "finder.match": "{n}% your taste",
      "tab.all": "All",
      "search": "Search a scent… e.g. Black Opium, vanilla, Dior", "more": "Show more ({n})", "results": "{n} perfumes",
      "pyr.top": "Top", "pyr.heart": "Heart", "pyr.base": "Base",
      "disclaimer": "SWYR perfumes are our own blends inspired by well-known scents. Brand names belong to their owners and are mentioned only to describe the scent profile; SWYR is not affiliated with them.",
      "card.add": "Add to bag", "card.added": "Added", "card.details": "Details",
      "empty": "Nothing matches this selection.",
      "sizes.title": "A size for every moment",
      "sizes.10": "For your handbag and a first try", "sizes.30": "For travel and light use", "sizes.50": "The everyday sweet spot", "sizes.100": "For your signature scent — best value",
      "gifts.title": "Gifts & special orders",
      "gifts.text": "Wedding and engagement favours, corporate gifts, personalised boxes or wholesale quantities. Send us the details and we’ll reply with a quote within a day.",
      "rq.type": "Request type", "rq.qty": "Approximate quantity", "rq.date": "Needed by", "rq.budget": "Budget per piece (optional)",
      "rq.details": "Details", "rq.detailsPh": "e.g. 50 × 10 ml bottles with the bride’s name on the card", "rq.send": "Send request",
      "rq.types": ["A gift for someone special", "Wedding / engagement favours", "Corporate gifts", "Wholesale / resale", "Something else"],
      "faq.title": "FAQ",
      faq: [
        ["When will my order arrive?", "Cairo and Giza in 1–3 days, other governorates in 3–5 working days. We’ll message you once it ships."],
        ["How can I pay?", "Cash on delivery, InstaPay or mobile wallet transfer before shipping, or card online when it’s available at checkout."],
        ["How long does it last?", "Our perfumes are concentrated: 8–12 hours on skin and longer on clothes, depending on your skin."],
        ["Not sure what to pick?", "Start with a 10 ml, use “Find your scent” above, or message us on Instagram."],
        ["Can I exchange?", "Anything that arrives damaged is replaced right away. Sealed bottles can be exchanged within 3 days of delivery."]
      ],
      "cart.title": "Bag", "cart.checkout": "Checkout", "cart.continue": "Keep shopping",
      "cart.empty": "Your bag is empty.", "cart.browse": "Browse perfumes", "cart.remove": "Remove",
      "cart.items": "{n} items", "cart.item1": "1 item", "cart.item2": "2 items",
      "ship.free": "You’ve unlocked free shipping.", "ship.left": "{x} more for free shipping.",
      "step.cart": "Bag", "step.details": "Details", "step.done": "Confirm",
      "t.saved": "You save", "t.sub": "Subtotal", "t.dis": "Discount", "t.ship": "Shipping", "t.shipPick": "By governorate", "t.free": "Free", "t.total": "Total",
      "co.title": "Delivery details", "co.edit": "Edit", "co.back": "Back to bag",
      "f.name": "Full name", "f.phone": "Mobile number", "f.phone2": "Second number (optional)", "f.gov": "Governorate", "f.govPick": "Choose governorate",
      "f.area": "Area / city", "f.address": "Full address", "f.addressPh": "Street, building, floor, landmark",
      "f.notes": "Notes (optional)", "f.notesPh": "e.g. a good delivery time",
      "f.email": "Email (for your receipt)", "f.coupon": "Promo code", "f.apply": "Apply",
      "f.remember": "Remember my details",
      "pay.title": "Payment",
      "pay.cod": "Cash on delivery", "pay.codNote": "Pay the courier when it arrives.",
      "pay.transfer": "InstaPay or wallet", "pay.transferNote": "Transfer the total and we’ll contact you to receive the transfer screenshot.",
      "pay.card": "Card online (Visa / Mastercard)", "pay.cardNote": "Secure payment via Paymob. You’ll come back here after paying.",
      "co.send": "Confirm order", "co.sending": "Sending your order…", "co.pay": "Pay {x} securely", "co.paying": "Taking you to secure payment…",
      "err.name": "Enter your name", "err.phone": "Enter a valid Egyptian mobile (11 digits, starts with 01)", "err.gov": "Choose a governorate",
      "err.address": "Enter your full address", "err.area": "Enter your area", "err.email": "Enter a valid email",
      "err.coupon": "That code isn’t valid", "ok.coupon": "Code applied", "err.pay": "We couldn’t open the payment page. Try again or choose cash on delivery.",
      "err.form": "Please check the fields in red.", "err.rq": "Enter your name and a valid mobile number.",
      "done.title": "Last step: send us your order", "done.text": "We copied your order message. Choose Instagram or Messenger, long-press the message box, tap Paste and send. Your order is confirmed once it reaches us.",
      "done.close": "Back to the shop", "done.num": "Order number",
      "ok.title": "Order received", "ok.text": "Thank you! We’ve received your order and will call you on your mobile to confirm it before shipping.",
      "ok.dm": "For a faster confirmation, you can also message us:",
      "ok.rqTitle": "Request received", "ok.rqText": "Thank you! We’ll get back to you with a quote within a day.",
      "done.paidTitle": "Payment successful", "done.paidText": "Thank you! We’ve received your order and payment, and will contact you to arrange delivery.",
      "send.ig": "Message us on Instagram", "send.ms": "Message us on Messenger", "send.wa": "Message us on WhatsApp",
      "send.copy": "Copy the message again", "send.copied": "Copied — paste it in the chat", "send.show": "Show message",
      "rq.title": "Last step: send us your request", "rq.text": "We copied your request. Open the chat, paste the message and send it — we’ll reply with a quote.",
      "done.failTitle": "Payment not completed", "done.failText": "Don’t worry, nothing was charged. Try again or choose cash on delivery.", "done.retry": "Back to checkout",
      "toast.added": "“{n}” added to your bag",
      "pd.notes": "Scent profile", "pd.size": "Size",
      "ml": "ml"
    }
  };
 
  /* ---------------- helpers ---------------- */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
    del(k) { try { localStorage.removeItem(k); } catch {} }
  };
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const toLatinDigits = s => String(s ?? "").replace(/[٠-٩]/g, d => "٠١٢٣٤٥٦٧٨٩".indexOf(d)).replace(/[۰-۹]/g, d => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
  const normPhone = s => {
    let p = toLatinDigits(s).replace(/[^\d]/g, "");
    if (p.startsWith("0020")) p = p.slice(4);
    if (p.startsWith("20") && p.length === 12) p = p.slice(2);
    if (p.length === 10 && p.startsWith("1")) p = "0" + p;
    return p;
  };
  const validPhone = p => /^01[0125]\d{8}$/.test(p);
 
  let C = null;                    // catalog
  let lang = store.get("swyr_lang", "ar");
  let cart = store.get("swyr_cart", []);          // [{id, ml, qty}]
  let coupon = store.get("swyr_coupon", "");
  let form = store.get("swyr_customer", {});
  let view = "cart";
  let onlinePay = false;
  let ordersOn = false;      // true when /api/order is connected to the Google Sheet
  let configReady = null;    // promise for /api/config
  let lastOrder = null;
  const sel = {};                  // selected size per product
  const filt = { cat: "all", notes: new Set(), q: "" };
  const PAGE = 12;
  let limit = PAGE;
 
  const t = (k, vars) => {
    let s = (T[lang] && T[lang][k]) ?? T.ar[k] ?? k;
    if (vars && typeof s === "string") for (const [a, b] of Object.entries(vars)) s = s.replace(`{${a}}`, b);
    return s;
  };
  const L = o => (o && typeof o === "object") ? (o[lang] ?? o.ar ?? "") : (o ?? "");
  const money = n => `${Math.round(n).toLocaleString("en-US")} ${L(C.settings.currency)}`;
  const moneyAr = n => `${Math.round(n).toLocaleString("en-US")} ج.م`;
  const product = id => C.products.find(p => p.id === id);
  const sizeOf = (p, ml) => p.sizes.find(s => s.ml === ml) || p.sizes[0];
  const pctOff = s => s && s.compare > s.price ? Math.round((1 - s.price / s.compare) * 100) : 0;
  const hasCoupons = () => Object.keys(C.coupons || {}).some(k => !k.startsWith("_"));
  const sizeLabel = (s, lg = lang) => s.label ? (s.label[lg] ?? s.label.ar) : `${s.ml} ${lg === "ar" ? "مل" : "ml"}`;
 
  /* ---------------- tracking source (utm) ---------------- */
  const params = new URLSearchParams(location.search);
  const utm = params.get("utm_source");
  if (utm) { try { sessionStorage.setItem("swyr_src", utm); } catch {} }
  const source = () => { try { return sessionStorage.getItem("swyr_src") || ""; } catch { return ""; } };
  if (params.get("lang") === "en" || params.get("lang") === "ar") lang = params.get("lang");
 
  /* ---------------- pricing (mirrors api/pay.js) ---------------- */
  function couponDef(code) {
    if (!code || code.startsWith("_")) return null;
    const key = Object.keys(C.coupons || {}).find(k => !k.startsWith("_") && k.toUpperCase() === code.toUpperCase());
    return key ? { code: key, ...C.coupons[key] } : null;
  }
  function totals(govId) {
    const lines = cart.map(i => {
      const p = product(i.id); if (!p) return null;
      const s = sizeOf(p, i.ml);
      return { p, s, qty: i.qty, total: s.price * i.qty };
    }).filter(Boolean);
    const sub = lines.reduce((a, l) => a + l.total, 0);
    const cd = couponDef(coupon);
    let dis = 0;
    if (cd) dis = cd.type === "percent" ? Math.round(sub * cd.value / 100) : Math.min(sub, cd.value);
    const gov = C.governorates.find(g => g.id === govId);
    const free = C.settings.freeShippingOver && (sub - dis) >= C.settings.freeShippingOver;
    const ship = !gov ? null : (free ? 0 : (C.shippingZones[gov.zone] ?? 0));
    const total = sub - dis + (ship || 0);
    const count = lines.reduce((a, l) => a + l.qty, 0);
    const saved = lines.reduce((a, l) => a + (l.s.compare > l.s.price ? (l.s.compare - l.s.price) * l.qty : 0), 0);
    return { lines, sub, dis, cd, ship, free, total, count, gov, saved };
  }
 
  /* ---------------- language ---------------- */
  function applyLang() {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    $$("[data-i18n]").forEach(el => { el.textContent = t(el.dataset.i18n); });
    $$("[data-i18n-html]").forEach(el => { el.innerHTML = t(el.dataset.i18nHtml); });
    $$("[data-i18n-ph]").forEach(el => { el.placeholder = t(el.dataset.i18nPh); });
    $("#search").placeholder = t("search");
    $("#langBtn").textContent = lang === "ar" ? "English" : "العربية";
    $("#langBtn").lang = lang === "ar" ? "en" : "ar";
    renderAll();
  }
 
  /* ---------------- renderers ---------------- */
  function renderAnnounce() {
    const a = L(C.settings.announcement);
    $("#announce").innerHTML = esc(a).replace(/\b([A-Z0-9]{4,})\b/g, "<b>$1</b>");
  }
 
  function renderOffers() {
    const g = $("#offersGrid");
    g.innerHTML = (C.offers || []).map(o => `
      <article class="offer">
        <h3>${esc(L(o.title))}</h3>
        <p>${esc(L(o.text))}</p>
        ${o.code || o.product ? `<div class="offer__foot">
          ${o.code ? `<span class="code" dir="ltr">${esc(o.code)}</span><button class="code-copy" type="button" data-copy="${esc(o.code)}">${t("offer.copy")}</button>` : ""}
          ${o.product ? `<button class="btn btn--line" type="button" data-open="${esc(o.product)}" style="min-height:40px;padding:0 18px">${t("offer.shop")}</button>` : ""}
        </div>` : ""}
      </article>`).join("");
    $("#offers").hidden = !(C.offers || []).length;
  }
 
  function renderChips() {
    $("#finderChips").innerHTML = (C.finderNotes || []).map(k => {
      const n = C.notes[k]; if (!n) return "";
      return `<button type="button" class="chip" style="--c:${n.color}" data-note="${k}" aria-pressed="${filt.notes.has(k)}">${esc(L(n))}</button>`;
    }).join("");
    $("#finderReset").hidden = filt.notes.size === 0;
  }
 
  function renderTabs() {
    const cats = [{ id: "all", ar: T.ar["tab.all"], en: T.en["tab.all"] }, ...C.categories];
    const count = id => id === "all" ? C.products.length : C.products.filter(p => p.category === id).length;
    $("#tabs").innerHTML = cats.map(c =>
      `<button type="button" class="tab" role="tab" data-cat="${c.id}" aria-selected="${filt.cat === c.id}">${esc(L(c))} <small>${count(c.id)}</small></button>`).join("");
  }
 
  function matchScore(p) {
    if (!filt.notes.size) return null;
    const notes = p.notes || {};
    let s = 0;
    filt.notes.forEach(k => { if (notes[k]) s += notes[k]; });
    return Math.round(s / filt.notes.size);
  }
 
  function noteLine(p, max = 3) {
    return Object.entries(p.notes || {}).sort((a, b) => b[1] - a[1]).slice(0, max)
      .map(([k]) => C.notes[k] ? L(C.notes[k]) : "").filter(Boolean).join(" · ");
  }
 
  function artHTML(p, mini) {
    if (p.image) return `<img src="/${esc(p.image)}" alt="${esc(L(p.name))}" loading="lazy" width="400" height="500">`;
    const no = (p.code || "").replace(/\D/g, "");
    const kind = p.category === "hair" ? (lang === "ar" ? "عطر شعر" : "Hair mist") : p.category === "gifts" ? (lang === "ar" ? "بوكس هدايا" : "Gift set") : "";
    const en = p.name.en.replace(/ (Hair Mist|Gift Set)$/i, "");
    return `<span class="art art--${p.category}${mini ? " art--mini" : ""}" role="img" aria-label="${esc(L(p.name))}">
      ${!mini && no ? `<span class="art__no">N° ${esc(no)}</span>` : ""}
      <span class="art__disc">
        <span class="art__mark"></span>
        <span class="art__brand">SWYR</span>
        ${mini ? "" : `<span class="art__rule"></span><span class="art__en">${esc(en)}</span>${kind ? `<span class="art__kind">${esc(kind)}</span>` : ""}`}
      </span>
    </span>`;
  }
  const inspiredText = p => p.inspiredBy
    ? (lang === "ar" ? `مستوحى من ${p.name.en.replace(/ (Hair Mist|Gift Set)$/i, "")} — ${p.inspiredBy}` : `Inspired by ${p.name.en.replace(/ (Hair Mist|Gift Set)$/i, "")} by ${p.inspiredBy}`)
    : "";
 
  function cardHTML(p, score) {
    const ml = sel[p.id] ?? (p.sizes.find(s => s.ml === 50) || p.sizes[0]).ml;
    sel[p.id] = ml;
    const s = sizeOf(p, ml);
    const multi = p.sizes.length > 1;
    return `
    <article class="pcard" data-id="${p.id}">
      <button type="button" class="pcard__media" data-open="${p.id}" aria-label="${esc(L(p.name))} — ${t("card.details")}">
        ${artHTML(p)}
        ${p.badge ? `<span class="badge">${esc(L(p.badge))}</span>` : ""}
        ${pctOff(s) ? `<span class="off">−${pctOff(s)}%</span>` : ""}
        ${score ? `<span class="match">${t("finder.match", { n: score })}</span>` : ""}
      </button>
      <div class="pcard__body">
        <div class="pcard__latin">${esc(p.name.en)}</div>
        ${lang === "ar" ? `<h3 class="pcard__name"><button type="button" data-open="${p.id}">${esc(p.name.ar)}</button></h3>` : ""}
        <p class="pcard__notes">${esc(noteLine(p) || (p.desc ? L(p.desc).split(/[.،,—]/)[0] : ""))}</p>
        ${multi ? `<div class="sizesel" role="group" aria-label="${t("pd.size")}">${p.sizes.map(z =>
          `<button type="button" data-size="${z.ml}" aria-pressed="${z.ml === ml}" aria-label="${esc(sizeLabel(z))}">${z.label ? esc(sizeLabel(z)) : `${z.ml}<span class="u"> ${t("ml")}</span>`}</button>`).join("")}</div>` : ""}
        <div class="pcard__foot">
          <span class="price">${Math.round(s.price).toLocaleString("en-US")}<small>${esc(L(C.settings.currency))}</small>${pctOff(s) ? `<s class="was">${Math.round(s.compare).toLocaleString("en-US")}</s>` : ""}</span>
          <button type="button" class="addbtn" data-add="${p.id}">${t("card.add")}</button>
        </div>
      </div>
    </article>`;
  }
 
  const norm = x => String(x || "").toLowerCase().replace(/[أإآ]/g, "ا").replace(/ة/g, "ه").replace(/ى/g, "ي").replace(/[\u064B-\u0652]/g, "").replace(/[^\p{L}\p{N}]+/gu, " ").trim();
  function filtered() {
    let list = C.products.filter(p => filt.cat === "all" || p.category === filt.cat);
    if (filt.q) {
      const words = norm(filt.q).split(" ").filter(Boolean);
      list = list.filter(p => {
        const hay = norm([p.name.ar, p.name.en, p.inspiredBy, p.code, p.family, Object.values(p.pyramid || {}).join(" ")].join(" "));
        return words.every(w => hay.includes(w));
      });
    }
    if (filt.notes.size) {
      return list.map(p => ({ p, s: matchScore(p) })).filter(x => x.s > 0).sort((a, b) => b.s - a.s);
    }
    return list.map(p => ({ p, s: null }));
  }
  function renderGrid() {
    const list = filtered();
    const shown = list.slice(0, limit);
    $("#grid").innerHTML = shown.length ? shown.map(x => cardHTML(x.p, x.s)).join("") : `<p class="empty">${t("empty")}</p>`;
    const rest = list.length - shown.length;
    $("#more").innerHTML = rest > 0 ? `<button type="button" class="btn btn--line" data-more>${t("more", { n: rest })}</button>` : "";
    $("#resultCount").textContent = (filt.q || filt.notes.size || filt.cat !== "all") ? t("results", { n: list.length }) : "";
  }
 
  function renderFaq() {
    $("#faqList").innerHTML = t("faq").map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join("");
  }
 
  function renderFooter() {
    const s = C.settings;
    const links = [
      s.instagram && `<a href="${esc(s.instagram)}" target="_blank" rel="noopener">Instagram</a>`,
      s.tiktok && `<a href="${esc(s.tiktok)}" target="_blank" rel="noopener">TikTok</a>`,
      s.facebook && `<a href="${esc(s.facebook)}" target="_blank" rel="noopener">Facebook</a>`,
      s.messenger && `<a href="https://m.me/${esc(s.messenger)}" target="_blank" rel="noopener">Messenger</a>`,
      s.whatsapp && `<a href="https://wa.me/${esc(s.whatsapp)}" target="_blank" rel="noopener">WhatsApp</a>`,
      s.email && `<a href="mailto:${esc(s.email)}" dir="ltr">${esc(s.email)}</a>`
    ].filter(Boolean);
    $("#footerLinks").innerHTML = links.join("");
    $("#year").textContent = new Date().getFullYear();
    $("#disclaimer").textContent = t("disclaimer");
  }
 
  function renderRequestTypes() {
    const v = $("#rq_type").value;
    $("#rq_type").innerHTML = t("rq.types").map((x, i) => `<option value="${i}">${esc(x)}</option>`).join("");
    if (v) $("#rq_type").value = v;
  }
 
  function renderBadge() {
    const tt = totals(form.gov);
    $("#cartCount").textContent = tt.count;
    const sb = $("#stickybar");
    sb.hidden = tt.count === 0;
    document.body.classList.toggle("has-sticky", tt.count > 0);
    $("#stickyCount").textContent = countLabel(tt.count);
    $("#stickyTotal").textContent = money(tt.sub - tt.dis);
  }
  const countLabel = n => n === 1 ? t("cart.item1") : n === 2 ? t("cart.item2") : t("cart.items", { n });
 
  function renderAll() {
    renderAnnounce(); renderOffers(); renderChips(); renderTabs(); renderGrid();
    renderFaq(); renderFooter(); renderRequestTypes(); renderBadge();
    if ($("#drawer").classList.contains("is-open")) renderDrawer();
  }
 
  /* ---------------- product dialog ---------------- */
  function openProduct(id) {
    const p = product(id); if (!p) return;
    track("ViewContent", { ids: [p.id], name: p.name.en, value: sizeOf(p, sel[p.id] ?? p.sizes[0].ml).price });
    const ml = sel[p.id] ?? p.sizes[0].ml;
    let qty = 1;
    const notes = Object.entries(p.notes || {}).sort((a, b) => b[1] - a[1]);
    const dark = c => { const n = parseInt(c.slice(1), 16); return ((n >> 16) * .299 + ((n >> 8) & 255) * .587 + (n & 255) * .114) < 130; };
    const body = $("#pdBody");
    const draw = () => {
      const s = sizeOf(p, sel[p.id] ?? ml);
      body.innerHTML = `
        <div class="pd__media">${artHTML(p)}</div>
        <div class="pd__info">
          <div class="pd__top">
            <div>
              <div class="pcard__latin">${esc(p.name.en)}</div>
              ${lang === "ar" ? `<h2 id="pdName">${esc(p.name.ar)}</h2>` : `<h2 id="pdName" class="sr" style="position:absolute;width:1px;height:1px;overflow:hidden">${esc(p.name.en)}</h2>`}
            </div>
            <button class="x" type="button" data-close aria-label="close">×</button>
          </div>
          ${p.desc ? `<p class="pd__desc">${esc(L(p.desc))}</p>` : ""}
          ${p.inspiredBy ? `<p class="pd__insp">${esc(inspiredText(p))}</p>` : ""}
          ${p.pyramid && Object.keys(p.pyramid).length ? `<dl class="pyr">${["top", "heart", "base"].filter(k => p.pyramid[k]).map(k =>
            `<div><dt>${t("pyr." + k)}</dt><dd>${esc(p.pyramid[k])}</dd></div>`).join("")}</dl>` : ""}
          ${notes.length ? `<p class="pd__label">${t("pd.notes")}</p>
          <div class="bars">${notes.map(([k, v], i) => {
            const n = C.notes[k]; if (!n) return "";
            return `<div class="bar"><span class="${dark(n.color) ? "on-dark" : ""}" style="--c:${n.color};width:${Math.max(30, v)}%;animation-delay:${i * 45}ms">${esc(L(n))}</span></div>`;
          }).join("")}</div>` : ""}
          ${p.sizes.length > 1 ? `<p class="pd__label">${t("pd.size")}</p>
          <div class="sizesel" role="group">${p.sizes.map(z => `<button type="button" data-psize="${z.ml}" aria-pressed="${z.ml === s.ml}">${esc(sizeLabel(z))}</button>`).join("")}</div>` : ""}
          <p class="pd__price"><b>${money(s.price)}</b>${pctOff(s) ? ` <s class="was">${money(s.compare)}</s> <span class="off off--inline">−${pctOff(s)}%</span>` : ""}</p>
          <div class="pd__buy">
            <div class="qty"><button type="button" data-q="-1" aria-label="-">−</button><span>${qty}</span><button type="button" data-q="1" aria-label="+">+</button></div>
            <button class="btn btn--dark" type="button" data-padd>${t("card.add")} · ${money(s.price * qty)}</button>
          </div>
        </div>`;
    };
    draw();
    body.onclick = e => {
      const b = e.target.closest("button"); if (!b) return;
      if (b.dataset.close !== undefined) return $("#pdialog").close();
      if (b.dataset.psize) { sel[p.id] = +b.dataset.psize; draw(); renderGrid(); return; }
      if (b.dataset.q) { qty = Math.max(1, Math.min(20, qty + +b.dataset.q)); draw(); return; }
      if (b.dataset.padd !== undefined) { addToCart(p.id, sel[p.id] ?? ml, qty); $("#pdialog").close(); }
    };
    const d = $("#pdialog");
    if (typeof d.showModal === "function") d.showModal(); else d.setAttribute("open", "");
  }
  $("#pdialog").addEventListener("click", e => { if (e.target.id === "pdialog") e.target.close(); });
 
  /* ---------------- ad pixels (Meta / TikTok / Snapchat) ---------------- */
  // IDs live in catalog.json → settings.pixels. Empty = that pixel is off.
  const px = { meta: false, tiktok: false, snap: false };
  function loadPixels() {
    const P = (C.settings && C.settings.pixels) || {};
    const add = src => { const el = document.createElement("script"); el.async = true; el.src = src; document.head.appendChild(el); };
    if (/^\d{10,20}$/.test(String(P.meta || "").trim())) {
      const id = String(P.meta).trim();
      const n = window.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!window._fbq) window._fbq = n;
      n.push = n; n.loaded = true; n.version = "2.0"; n.queue = [];
      add("https://connect.facebook.net/en_US/fbevents.js");
      fbq("init", id); fbq("track", "PageView");
      px.meta = true;
    }
    if (/^[A-Z0-9]{8,30}$/i.test(String(P.tiktok || "").trim())) {
      const id = String(P.tiktok).trim();
      const ttq = window.ttq = window.ttq || [];
      ttq.methods = ["page", "track", "identify", "instances", "debug", "on", "off", "once", "ready", "alias", "group", "enableCookie", "disableCookie"];
      ttq.setAndDefer = (o, m) => { o[m] = function () { o.push([m].concat([].slice.call(arguments, 0))); }; };
      ttq.methods.forEach(m => ttq.setAndDefer(ttq, m));
      ttq.instance = t => { const e = ttq._i[t] || []; ttq.methods.forEach(m => ttq.setAndDefer(e, m)); return e; };
      ttq.load = (e, o) => {
        const u = "https://analytics.tiktok.com/i18n/pixel/events.js";
        ttq._i = ttq._i || {}; ttq._i[e] = []; ttq._i[e]._u = u; ttq._t = ttq._t || {}; ttq._t[e] = +new Date(); ttq._o = ttq._o || {}; ttq._o[e] = o || {};
        add(`${u}?sdkid=${e}&lib=ttq`);
      };
      window.TiktokAnalyticsObject = "ttq";
      ttq.load(id); ttq.page();
      px.tiktok = true;
    }
    if (/^[0-9a-f-]{30,40}$/i.test(String(P.snap || "").trim())) {
      const id = String(P.snap).trim();
      const a = window.snaptr = function () { a.handleRequest ? a.handleRequest.apply(a, arguments) : a.queue.push(arguments); };
      a.queue = [];
      add("https://sc-static.net/scevent.min.js");
      snaptr("init", id, {}); snaptr("track", "PAGE_VIEW");
      px.snap = true;
    }
  }
  // one call per business event; each platform gets its own standard event name
  function track(ev, d = {}) {
    try {
      const cur = "EGP";
      const ids = d.ids || [];
      if (px.meta) {
        const m = { ViewContent: "ViewContent", AddToCart: "AddToCart", InitiateCheckout: "InitiateCheckout", Purchase: "Purchase", Lead: "Lead" }[ev];
        const params = { currency: cur, value: d.value || 0, content_ids: ids, content_type: "product", num_items: d.num || ids.length || undefined, content_name: d.name || undefined };
        d.eventId ? fbq("track", m, params, { eventID: d.eventId }) : fbq("track", m, params);
      }
      if (px.tiktok) {
        const m = { ViewContent: "ViewContent", AddToCart: "AddToCart", InitiateCheckout: "InitiateCheckout", Purchase: d.paid ? "CompletePayment" : "PlaceAnOrder", Lead: "SubmitForm" }[ev];
        ttq.track(m, { currency: cur, value: d.value || 0, content_type: "product", contents: ids.map(id => ({ content_id: id, content_name: d.name })) }, d.eventId ? { event_id: d.eventId } : undefined);
      }
      if (px.snap) {
        const m = { ViewContent: "VIEW_CONTENT", AddToCart: "ADD_CART", InitiateCheckout: "START_CHECKOUT", Purchase: "PURCHASE", Lead: "SIGN_UP" }[ev];
        snaptr("track", m, { currency: cur, price: d.value || 0, item_ids: ids, number_items: d.num, transaction_id: d.eventId });
      }
    } catch (e) { /* tracking must never break the shop */ }
  }
 
  /* ---------------- cart ops ---------------- */
  function saveCart() { store.set("swyr_cart", cart); renderBadge(); }
  function addToCart(id, ml, qty = 1) {
    const ex = cart.find(i => i.id === id && i.ml === ml);
    if (ex) ex.qty = Math.min(50, ex.qty + qty); else cart.push({ id, ml, qty });
    saveCart();
    const p = product(id);
    track("AddToCart", { ids: [id], name: p.name.en, value: sizeOf(p, ml).price * qty, num: qty });
    toast(t("toast.added", { n: L(p.name) }));
    const cb = $("#cartBtn"); cb.classList.remove("bump"); void cb.offsetWidth; cb.classList.add("bump");
  }
  function setQty(idx, d) {
    const it = cart[idx]; if (!it) return;
    it.qty += d;
    if (it.qty <= 0) cart.splice(idx, 1);
    saveCart(); renderDrawer();
  }
 
  let toastTimer;
  function toast(msg) {
    const el = $("#toast"); el.textContent = msg; el.classList.add("is-on");
    clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove("is-on"), 2200);
  }
 
  /* ---------------- drawer ---------------- */
  let lastFocus = null;
  function openDrawer(v = "cart") {
    view = v; lastFocus = document.activeElement;
    const dr = $("#drawer"), sc = $("#scrim");
    sc.hidden = false; requestAnimationFrame(() => sc.classList.add("is-on"));
    dr.classList.add("is-open"); dr.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    renderDrawer();
    setTimeout(() => $("#drawerClose").focus(), 50);
  }
  function closeDrawer() {
    const dr = $("#drawer"), sc = $("#scrim");
    dr.classList.remove("is-open"); dr.setAttribute("aria-hidden", "true");
    sc.classList.remove("is-on"); setTimeout(() => { sc.hidden = true; }, 250);
    document.body.style.overflow = "";
    if (["done", "paid", "failed", "request", "received", "rqReceived"].includes(view)) view = "cart";
    lastFocus && lastFocus.focus && lastFocus.focus();
  }
 
  function renderSteps() {
    const map = { cart: 0, checkout: 1, done: 2, paid: 2, failed: 1, request: 2, received: 2, rqReceived: 2 };
    $$("#steps span").forEach((s, i) => s.classList.toggle("is-on", i <= map[view]));
  }
 
  function totalsHTML(tt, showShip) {
    return `<div class="totals">
      ${tt.saved ? `<div class="t-dis"><span>${t("t.saved")}</span><span>${money(tt.saved)}</span></div>` : ""}
      <div><span>${t("t.sub")}</span><span>${money(tt.sub)}</span></div>
      ${tt.dis ? `<div class="t-dis"><span>${t("t.dis")} (${esc(tt.cd.code)})</span><span>−${money(tt.dis)}</span></div>` : ""}
      ${showShip ? `<div><span>${t("t.ship")}${tt.gov ? ` · ${esc(L(tt.gov))}` : ""}</span><span>${tt.ship == null ? t("t.shipPick") : tt.ship === 0 ? t("t.free") : money(tt.ship)}</span></div>` : ""}
      <div class="t-total"><span>${t("t.total")}</span><span>${money(showShip ? tt.total : tt.sub - tt.dis)}</span></div>
    </div>`;
  }
 
  function renderDrawer() {
    renderSteps();
    const body = $("#drawerBody"), foot = $("#drawerFoot");
    const tt = totals(form.gov);
    $("#steps").style.display = (cart.length || view !== "cart") ? "" : "none";
 
    if (view === "cart") {
      $("#drawerTitle").textContent = t("cart.title") + (tt.count ? ` (${tt.count})` : "");
      if (!cart.length) {
        body.innerHTML = `<div class="cart-empty"><span class="brand__mark"></span><p>${t("cart.empty")}</p>
          <button class="btn btn--line" type="button" data-browse>${t("cart.browse")}</button></div>`;
        foot.innerHTML = ""; return;
      }
      const thr = C.settings.freeShippingOver;
      const after = tt.sub - tt.dis;
      body.innerHTML = `
        ${thr ? `<div class="ship-meter">${after >= thr ? t("ship.free") : t("ship.left", { x: money(thr - after) })}
          <div class="ship-meter__track"><i style="width:${Math.min(100, after / thr * 100)}%"></i></div></div>` : ""}
        ${tt.lines.map((l, idx) => `
        <div class="citem">
          <span class="citem__img">${artHTML(l.p, true)}</span>
          <div>
            <div class="citem__name">${esc(L(l.p.name))}</div>
            <div class="citem__meta">${esc(sizeLabel(l.s))} · ${money(l.s.price)}${pctOff(l.s) ? ` <s class="was">${money(l.s.compare)}</s>` : ""}</div>
            <button class="citem__rm" type="button" data-rm="${idx}">${t("cart.remove")}</button>
          </div>
          <div class="citem__right">
            <strong>${money(l.total)}</strong>
            <div class="qty qty--sm"><button type="button" data-cq="${idx}" data-d="-1" aria-label="-">−</button><span>${l.qty}</span><button type="button" data-cq="${idx}" data-d="1" aria-label="+">+</button></div>
          </div>
        </div>`).join("")}
        <div class="field" style="margin-top:18px" ${hasCoupons() ? "" : "hidden"}>
          <label for="couponIn">${t("f.coupon")}</label>
          <div class="coupon"><input id="couponIn" dir="ltr" autocomplete="off" value="${esc(coupon)}" placeholder="SWYR10"><button type="button" data-coupon>${t("f.apply")}</button></div>
          <span class="ferr" id="couponMsg"></span>
        </div>`;
      foot.innerHTML = `${totalsHTML(tt, false)}
        <button class="btn btn--dark btn--block" type="button" data-go="checkout">${t("cart.checkout")}</button>`;
      return;
    }
 
    if (view === "checkout" || view === "failed") {
      $("#drawerTitle").textContent = t("co.title");
      const govs = [...C.governorates].sort((a, b) => L(a).localeCompare(L(b), lang));
      const s = C.settings;
      const pay = form.pay && (form.pay !== "card" || onlinePay) && (form.pay !== "transfer" || s.instapay || s.wallet) ? form.pay : "cod";
      body.innerHTML = `
        ${view === "failed" ? `<div class="ship-meter" style="border-color:var(--err)"><b>${t("done.failTitle")}</b><br>${t("done.failText")}</div>` : ""}
        <div class="summary-mini"><span>${countLabel(tt.count)} · <b>${money(tt.sub - tt.dis)}</b></span><button type="button" data-go="cart">${t("co.edit")}</button></div>
        <form class="form" id="coForm" novalidate>
          <div class="field"><label for="c_name">${t("f.name")}</label><input id="c_name" name="name" autocomplete="name" value="${esc(form.name)}" required></div>
          <div class="field"><label for="c_phone">${t("f.phone")}</label><input id="c_phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" dir="ltr" placeholder="01xxxxxxxxx" value="${esc(form.phone)}" required></div>
          <div class="field"><label for="c_phone2">${t("f.phone2")}</label><input id="c_phone2" name="phone2" type="tel" inputmode="tel" dir="ltr" value="${esc(form.phone2)}"></div>
          <div class="row2">
            <div class="field"><label for="c_gov">${t("f.gov")}</label>
              <select id="c_gov" name="gov" required><option value="">${t("f.govPick")}</option>
              ${govs.map(g => `<option value="${g.id}" ${form.gov === g.id ? "selected" : ""}>${esc(L(g))}</option>`).join("")}</select></div>
            <div class="field"><label for="c_area">${t("f.area")}</label><input id="c_area" name="area" autocomplete="address-level2" value="${esc(form.area)}" required></div>
          </div>
          <div class="field"><label for="c_address">${t("f.address")}</label><textarea id="c_address" name="address" rows="2" autocomplete="street-address" placeholder="${esc(t("f.addressPh"))}" required>${esc(form.address)}</textarea></div>
          <div class="field"><label for="c_notes">${t("f.notes")}</label><textarea id="c_notes" name="notes" rows="2" placeholder="${esc(t("f.notesPh"))}">${esc(form.notes)}</textarea></div>
 
          <fieldset class="paym field"><legend style="margin-bottom:8px">${t("pay.title")}</legend>
            <label><input type="radio" name="pay" value="cod" ${pay === "cod" ? "checked" : ""}><span><b>${t("pay.cod")}</b><small>${t("pay.codNote")}</small></span></label>
            ${s.instapay || s.wallet ? `<label><input type="radio" name="pay" value="transfer" ${pay === "transfer" ? "checked" : ""}><span><b>${t("pay.transfer")}</b><small>${t("pay.transferNote")}</small>
              <span class="paym__detail">${s.instapay ? `InstaPay: <b>${esc(s.instapay)}</b><br>` : ""}${s.wallet ? `Wallet: <b>${esc(s.wallet)}</b>` : ""}</span></span></label>` : ""}
            ${onlinePay ? `<label><input type="radio" name="pay" value="card" ${pay === "card" ? "checked" : ""}><span><b>${t("pay.card")}</b><small>${t("pay.cardNote")}</small></span></label>` : ""}
          </fieldset>
          <div class="field" id="emailField" ${pay === "card" ? "" : "hidden"}><label for="c_email">${t("f.email")}</label><input id="c_email" name="email" type="email" dir="ltr" autocomplete="email" value="${esc(form.email)}"></div>
          <label style="display:flex;gap:10px;align-items:center;font-size:.88rem;color:var(--muted)"><input type="checkbox" name="remember" ${form.remember !== false ? "checked" : ""} style="width:18px;height:18px;accent-color:var(--ink)"> ${t("f.remember")}</label>
          <p class="form__err" id="coErr" role="alert"></p>
        </form>`;
      renderCheckoutFoot();
      const f = $("#coForm");
      f.addEventListener("input", () => { readForm(); });
      f.addEventListener("change", e => {
        readForm();
        if (e.target.name === "gov" || e.target.name === "pay") renderCheckoutFoot();
        if (e.target.name === "pay") $("#emailField").hidden = e.target.value !== "card";
      });
      return;
    }
 
    if (view === "received" || view === "rqReceived") {
      const rq = view === "rqReceived", m = lastOrder || { text: "" };
      $("#drawerTitle").textContent = t("step.done");
      $("#steps").style.display = rq ? "none" : "";
      body.innerHTML = `<div class="done">
        <div class="done__disc"><span class="brand__mark"></span></div>
        <h3>${rq ? t("ok.rqTitle") : t("ok.title")}</h3>
        <p>${rq ? t("ok.rqText") : t("ok.text")}</p>
        ${m.id ? `<div><small>${t("done.num")}</small><br><span class="done__id">${esc(m.id)}</span></div>` : ""}
        ${channelButtons() ? `<p class="done__dm">${t("ok.dm")}</p><div class="send send--soft">${channelButtons()}</div>` : ""}
      </div>`;
      foot.innerHTML = `<button class="btn btn--dark btn--block" type="button" data-closeall>${t("done.close")}</button>`;
      return;
    }
    if (view === "done" || view === "paid" || view === "request") {
      const paid = view === "paid", rq = view === "request";
      const m = lastOrder || { text: "" };
      $("#drawerTitle").textContent = paid ? t("done.paidTitle") : t("step.done");
      $("#steps").style.display = rq ? "none" : "";
      body.innerHTML = `<div class="done">
        ${paid ? `<div class="done__disc"><span class="brand__mark"></span></div><h3>${t("done.paidTitle")}</h3>` : `<h3>${rq ? t("rq.title") : t("done.title")}</h3>`}
        <p>${paid ? t("done.paidText") : rq ? t("rq.text") : t("done.text")}</p>
        ${m.id ? `<div><small>${t("done.num")}</small><br><span class="done__id">${esc(m.id)}</span></div>` : ""}
        <div class="send">${channelButtons()}</div>
        <details class="send__msg"><summary>${t("send.show")}</summary><textarea readonly rows="9" dir="rtl">${esc(m.text)}</textarea></details>
        <button class="linkbtn" type="button" data-recopy>${t("send.copy")}</button>
      </div>`;
      foot.innerHTML = `<button class="btn btn--line btn--block" type="button" data-closeall>${t("done.close")}</button>`;
    }
  }
 
  function channelButtons() {
    const s = C.settings, out = [];
    if (s.instagramDM) out.push(`<button class="btn btn--dark btn--block" type="button" data-send="ig">${t("send.ig")}</button>`);
    if (s.messenger) out.push(`<button class="btn ${out.length ? "btn--line" : "btn--dark"} btn--block" type="button" data-send="ms">${t("send.ms")}</button>`);
    if (s.whatsapp) out.push(`<button class="btn ${out.length ? "btn--line" : "btn--dark"} btn--block" type="button" data-send="wa">${t("send.wa")}</button>`);
    return out.join("");
  }
 
  function copyText(text) {
    const fallback = () => {
      const ta = document.createElement("textarea");
      ta.value = text; ta.setAttribute("readonly", ""); ta.style.cssText = "position:fixed;top:-1000px;opacity:0";
      document.body.appendChild(ta); ta.select(); ta.setSelectionRange(0, text.length);
      let ok = false; try { ok = document.execCommand("copy"); } catch {}
      ta.remove(); return ok;
    };
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).then(() => true, () => fallback());
    }
    return Promise.resolve(fallback());
  }
 
  function channelUrl(ch, text) {
    const s = C.settings;
    if (ch === "ig") return `https://ig.me/m/${encodeURIComponent(s.instagramDM)}`;
    if (ch === "ms") return `https://m.me/${encodeURIComponent(s.messenger)}?text=${encodeURIComponent(text)}`;
    return `https://wa.me/${s.whatsapp}?text=${encodeURIComponent(text)}`;
  }
 
  function readForm() {
    const f = $("#coForm"); if (!f) return;
    const fd = new FormData(f);
    form = {
      name: (fd.get("name") || "").trim(), phone: (fd.get("phone") || "").trim(), phone2: (fd.get("phone2") || "").trim(),
      gov: fd.get("gov") || "", area: (fd.get("area") || "").trim(), address: (fd.get("address") || "").trim(),
      notes: (fd.get("notes") || "").trim(), pay: fd.get("pay") || "cod", email: (fd.get("email") || "").trim(),
      remember: !!fd.get("remember")
    };
    if (form.remember) store.set("swyr_customer", { ...form, notes: "" }); else store.del("swyr_customer");
  }
 
  function renderCheckoutFoot() {
    const tt = totals(form.gov);
    const card = form.pay === "card" && onlinePay;
    $("#drawerFoot").innerHTML = `${totalsHTML(tt, true)}
      <button class="btn btn--dark btn--block" type="button" data-submit>${card ? t("co.pay", { x: money(tt.total) }) : t("co.send")}</button>`;
  }
 
  function validate() {
    readForm();
    const f = $("#coForm");
    $$(".field", f).forEach(x => { x.classList.remove("has-err"); const e = x.querySelector(".ferr"); if (e) e.remove(); });
    const errs = [];
    const bad = (name, key) => { const el = f.elements[name]; const fl = el.closest(".field"); fl.classList.add("has-err"); fl.insertAdjacentHTML("beforeend", `<span class="ferr">${t(key)}</span>`); errs.push(el); };
    if (form.name.length < 2) bad("name", "err.name");
    if (!validPhone(normPhone(form.phone))) bad("phone", "err.phone");
    if (!form.gov) bad("gov", "err.gov");
    if (form.area.length < 2) bad("area", "err.area");
    if (form.address.length < 6) bad("address", "err.address");
    if (form.pay === "card" && form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) bad("email", "err.email");
    $("#coErr").textContent = errs.length ? t("err.form") : "";
    if (errs.length) errs[0].focus();
    return !errs.length;
  }
 
  /* ---------------- order message ---------------- */
  function newOrderId() {
    const d = new Date();
    const p = n => String(n).padStart(2, "0");
    return `SW-${String(d.getFullYear()).slice(2)}${p(d.getMonth() + 1)}${p(d.getDate())}-${Math.floor(1000 + Math.random() * 9000)}`;
  }
  const payLabel = { cod: "الدفع عند الاستلام", transfer: "تحويل إنستاباي / محفظة", card: "فيزا أونلاين (Paymob)" };
 
  function orderMessage(id, tt, f, extra) {
    const line = "────────────";
    const rows = tt.lines.map(l => `• ${l.p.name.ar} (${l.p.name.en}) — ${sizeLabel(l.s, "ar")} × ${l.qty} = ${moneyAr(l.total)}`);
    const msg = [
      `*طلب جديد من موقع SWYR*`,
      `رقم الطلب: ${id}`,
      line,
      ...rows,
      line,
      `المجموع: ${moneyAr(tt.sub)}`,
      tt.dis ? `خصم (${tt.cd.code}): -${moneyAr(tt.dis)}` : null,
      `الشحن (${tt.gov ? tt.gov.ar : "-"}): ${tt.ship === 0 ? "مجاني" : moneyAr(tt.ship || 0)}`,
      `*الإجمالي: ${moneyAr(tt.total)}*`,
      `الدفع: ${payLabel[f.pay] || payLabel.cod}`,
      extra || null,
      line,
      `الاسم: ${f.name}`,
      `الموبايل: ${normPhone(f.phone)}`,
      f.phone2 ? `رقم آخر: ${normPhone(f.phone2) || f.phone2}` : null,
      `المحافظة: ${tt.gov ? tt.gov.ar : ""}`,
      `المنطقة: ${f.area}`,
      `العنوان: ${f.address}`,
      f.notes ? `ملاحظات: ${f.notes}` : null,
      source() ? `المصدر: ${source()}` : null
    ].filter(x => x !== null);
    return msg.join("\n");
  }
  function openWA(url) {
    const w = window.open(url, "_blank");
    if (w) { try { w.opener = null; } catch {} } else location.href = url;
  }
 
  async function submitOrder(btn) {
    if (!validate()) return;
    const tt = totals(form.gov);
    if (!tt.lines.length) { view = "cart"; renderDrawer(); return; }
    const id = newOrderId();
 
    if (form.pay === "card" && onlinePay) {
      btn.disabled = true; btn.textContent = t("co.paying");
      try {
        const r = await fetch("/api/pay", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            orderId: id, items: cart.map(i => ({ id: i.id, ml: i.ml, qty: i.qty })), coupon, gov: form.gov,
            customer: { name: form.name, phone: normPhone(form.phone), email: form.email, area: form.area, address: form.address }
          })
        });
        const data = await r.json().catch(() => ({}));
        if (!r.ok || !data.url) throw new Error(data.error || "pay");
        if (data.total !== tt.total) console.warn("server total differs", data.total, tt.total);
        store.set("swyr_pending", { id, form: { ...form }, cart: [...cart], coupon, total: data.total });
        location.href = data.url;
      } catch (e) {
        btn.disabled = false; renderCheckoutFoot();
        $("#coErr").textContent = t("err.pay");
      }
      return;
    }
 
    const text = orderMessage(id, tt, form);
    lastOrder = { id, text };
    btn.disabled = true; btn.textContent = t("co.sending");
    const saved = await postOrder(orderPayload(id));
    track("Purchase", { ids: tt.lines.map(l => l.p.id), value: tt.total, num: tt.count, eventId: id });
    if (!saved) copyText(text);   // no automatic delivery → the customer must send the message
    cart = []; coupon = ""; store.set("swyr_coupon", ""); saveCart();
    view = saved ? "received" : "done"; renderDrawer();
  }
 
  async function postOrder(payload) {
    if (configReady) { try { await configReady; } catch {} }
    if (!ordersOn) return false;
    try {
      const ctrl = new AbortController(); const tm = setTimeout(() => ctrl.abort(), 12000);
      const r = await fetch("/api/order", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload), signal: ctrl.signal });
      clearTimeout(tm);
      const j = await r.json().catch(() => ({}));
      return r.ok && j.ok;
    } catch { return false; }
  }
  const orderPayload = (id, extra = {}) => ({
    kind: "order", orderId: id, items: cart.map(i => ({ id: i.id, ml: i.ml, qty: i.qty })), coupon, gov: form.gov, pay: form.pay,
    customer: { name: form.name, phone: normPhone(form.phone), phone2: normPhone(form.phone2), area: form.area, address: form.address, notes: form.notes },
    source: source(), ...extra
  });
 
  /* returning from Paymob */
  function handlePaymentReturn() {
    const order = params.get("order");
    if (!order) return;
    const pending = store.get("swyr_pending", null);
    history.replaceState(null, "", location.pathname);
    if (!pending || pending.id !== order) return;
    const success = params.get("success") === "true";
    if (success) {
      const txn = params.get("id") || "";
      cart = pending.cart; coupon = pending.coupon; form = pending.form;
      const tt = totals(form.gov);
      const text = orderMessage(order, tt, form, `حالة الدفع: مدفوع أونلاين${txn ? ` — رقم العملية ${txn}` : ""}`);
      lastOrder = { id: order, text };
      track("Purchase", { ids: tt.lines.map(l => l.p.id), value: tt.total, num: tt.count, eventId: order, paid: true });
      postOrder(orderPayload(order, { paid: true, txn, pay: "card" })).then(ok => { if (!ok) copyText(text); });
      cart = []; coupon = ""; store.set("swyr_coupon", ""); saveCart(); store.del("swyr_pending");
      openDrawer("paid");
    } else {
      cart = pending.cart; coupon = pending.coupon; form = pending.form; saveCart();
      openDrawer("failed");
    }
  }
 
  /* ---------------- events ---------------- */
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-send],[data-recopy],[data-open],[data-add],[data-size],[data-note],[data-cat],[data-more],[data-copy],[data-rm],[data-cq],[data-go],[data-coupon],[data-submit],[data-browse],[data-closeall]");
    if (!b) return;
    const d = b.dataset;
    if (d.send) {
      const text = lastOrder ? lastOrder.text : "";
      copyText(text).then(ok => ok && toast(t("send.copied")));
      openWA(channelUrl(d.send, text));
      return;
    }
    if (d.recopy !== undefined) { copyText(lastOrder ? lastOrder.text : "").then(() => toast(t("send.copied"))); return; }
    if (d.open) { if ($("#pdialog").open) $("#pdialog").close(); return openProduct(d.open); }
    if (d.add) {
      addToCart(d.add, sel[d.add]);
      b.classList.add("is-added"); b.textContent = t("card.added");
      setTimeout(() => { b.classList.remove("is-added"); b.textContent = t("card.add"); }, 1400);
      return;
    }
    if (d.size) { const id = b.closest(".pcard").dataset.id; sel[id] = +d.size; renderGrid(); return; }
    if (d.note) {
      filt.notes.has(d.note) ? filt.notes.delete(d.note) : filt.notes.add(d.note);
      limit = PAGE;
      renderChips(); renderGrid(); return;
    }
    if (d.cat) { filt.cat = d.cat; limit = PAGE; renderTabs(); renderGrid(); return; }
    if (d.more !== undefined) { limit += PAGE; renderGrid(); return; }
    if (d.copy) {
      const done = () => toast(t("offer.copied"));
      (navigator.clipboard ? navigator.clipboard.writeText(d.copy) : Promise.reject()).then(done, done);
      coupon = d.copy; store.set("swyr_coupon", coupon); renderBadge();
      return;
    }
    if (d.rm) { cart.splice(+d.rm, 1); saveCart(); renderDrawer(); return; }
    if (d.cq) { setQty(+d.cq, +d.d); return; }
    if (d.go) {
      if (d.go === "checkout" && view === "cart") { const tt = totals(form.gov); track("InitiateCheckout", { ids: tt.lines.map(l => l.p.id), value: tt.sub - tt.dis, num: tt.count }); }
      view = d.go; renderDrawer(); $("#drawerBody").scrollTop = 0; return;
    }
    if (d.coupon !== undefined) {
      const v = $("#couponIn").value.trim();
      const cd = couponDef(v);
      coupon = cd ? cd.code : (v ? coupon : "");
      if (!v) coupon = "";
      store.set("swyr_coupon", coupon);
      renderDrawer(); renderBadge();
      const m = $("#couponMsg");
      if (m) { m.textContent = v ? (cd ? t("ok.coupon") : t("err.coupon")) : ""; m.style.color = cd ? "var(--ok)" : ""; }
      return;
    }
    if (d.submit !== undefined) { submitOrder(b); return; }
    if (d.browse !== undefined || d.closeall !== undefined) { closeDrawer(); if (d.browse !== undefined) location.hash = "#collection"; return; }
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && $("#drawer").classList.contains("is-open")) closeDrawer();
    if (e.key === "Enter" && e.target.id === "couponIn") { e.preventDefault(); $("[data-coupon]").click(); }
  });
  let searchTimer;
  $("#search").addEventListener("input", e => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => { filt.q = e.target.value.trim(); limit = PAGE; renderGrid(); }, 120);
  });
  $("#finderReset").addEventListener("click", () => { filt.notes.clear(); renderChips(); renderGrid(); });
  $("#cartBtn").addEventListener("click", () => openDrawer("cart"));
  $("#stickyBtn").addEventListener("click", () => {
    if (cart.length) { const tt = totals(form.gov); track("InitiateCheckout", { ids: tt.lines.map(l => l.p.id), value: tt.sub - tt.dis, num: tt.count }); }
    openDrawer(cart.length ? "checkout" : "cart");
  });
  $("#drawerClose").addEventListener("click", closeDrawer);
  $("#scrim").addEventListener("click", closeDrawer);
  $("#langBtn").addEventListener("click", () => { lang = lang === "ar" ? "en" : "ar"; store.set("swyr_lang", lang); applyLang(); });
  window.addEventListener("scroll", () => $("#header").classList.toggle("is-scrolled", scrollY > 8), { passive: true });
 
  $("#requestForm").addEventListener("submit", async e => {
    e.preventDefault();
    const f = e.target, fd = new FormData(f);
    const name = (fd.get("name") || "").trim(), phone = normPhone(fd.get("phone"));
    if (name.length < 2 || !validPhone(phone)) { $("#rqErr").textContent = t("err.rq"); return; }
    $("#rqErr").textContent = "";
    const type = T.ar["rq.types"][+fd.get("type")] || "";
    const text = [
      `*طلب خاص من موقع SWYR*`,
      `النوع: ${type}`,
      `الاسم: ${name}`,
      `الموبايل: ${phone}`,
      fd.get("qty") ? `الكمية: ${toLatinDigits(fd.get("qty"))}` : null,
      fd.get("date") ? `مطلوب يوم: ${fd.get("date")}` : null,
      fd.get("budget") ? `الميزانية للقطعة: ${toLatinDigits(fd.get("budget"))}` : null,
      fd.get("details") ? `التفاصيل: ${String(fd.get("details")).trim()}` : null,
      source() ? `المصدر: ${source()}` : null
    ].filter(Boolean).join("\n");
    lastOrder = { id: "", text };
    track("Lead", { value: 0 });
    const sb = f.querySelector('[type=submit]'); sb.disabled = true;
    const saved = await postOrder({
      kind: "request", source: source(), customer: { name, phone },
      request: { type, qty: toLatinDigits(fd.get("qty") || ""), date: fd.get("date") || "", budget: toLatinDigits(fd.get("budget") || ""), details: String(fd.get("details") || "").trim() }
    });
    sb.disabled = false;
    if (saved) { f.reset(); openDrawer("rqReceived"); }
    else { copyText(text); openDrawer("request"); }
  });
 
  /* ---------------- boot ---------------- */
  async function boot() {
    try {
      const r = await fetch("/catalog.json", { cache: "no-cache" });
      C = await r.json();
    } catch (e) {
      document.body.insertAdjacentHTML("afterbegin", `<p style="padding:16px;background:#fee;text-align:center">catalog.json could not be loaded</p>`);
      return;
    }
    C.products.forEach(p => { if (typeof p.sizes === "string") p.sizes = (C.priceList && C.priceList[p.sizes]) || []; });
    C.products = C.products.filter(p => p.sizes.length);
    // drop cart items that no longer exist
    cart = cart.filter(i => { const p = product(i.id); return p && p.sizes.some(s => s.ml === i.ml); });
    if (!C.settings.instagramDM && !C.settings.messenger && !C.settings.whatsapp) console.warn("SWYR: add instagramDM / messenger in catalog.json → settings");
    applyLang();
    loadPixels();
    configReady = fetch("/api/config", { cache: "no-store" })
      .then(r => r.ok ? r.json() : {})
      .then(j => { onlinePay = !!j.online; ordersOn = !!j.orders; if (view === "checkout") renderDrawer(); })
      .catch(() => {});
    await configReady;
    handlePaymentReturn();
  }
  boot();
})();