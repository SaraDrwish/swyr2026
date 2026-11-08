 
(() => {
  "use strict";
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }
  };
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  let lang = store.get("swyr_lang", "ar");
  const params = new URLSearchParams(location.search);
  if (params.get("lang") === "en" || params.get("lang") === "ar") lang = params.get("lang");
  const L = o => o == null ? "" : typeof o === "string" ? o : (o[lang] ?? o.ar ?? "");
 
  /* ---------------- text ---------------- */
  const T = {
    ar: {
      "nav.shop": "العطور", "nav.offers": "العروض", "nav.quiz": "اختبار سوير", cart: "السلة", back: "السابق",
      eyebrow: "Scent Finder", title: "ما العطر الذي يشبهك؟",
      lead: "أجب عن سبعة أسئلة قصيرة، ونمزج لك عطرك أمام عينيك: شخصيتك العطرية، والعطر الأقرب لك من عطور سوير.",
      start: "ابدأ الاختبار", facts: ["7 أسئلة", "أقل من دقيقة", "مبني على مكونات كل عطر"],
      again: "نتيجتك السابقة: {p}", againLink: "اعرض العطر",
      step: "{n} من {t}", next: "التالي", seeResult: "اعرض نتيجتي", upTo: "اختر حتى {n}",
      blendEmpty: "اختياراتك ستلوّن المزيج", blend: "<span>مزيجك:</span> {x}",
      mixing: "نمزج إجاباتك…",
      you: "شخصيتك العطرية", yourPick: "الأقرب إليك", match: "تطابق {n}%", inspired: "مستوحى من {x}",
      top: "الافتتاحية", heart: "القلب", base: "القاعدة", from: "يبدأ من",
      add: "أضف إلى السلة", added: "أُضيف ✓", ml: "مل",
      dealText: "أضف العطور الثلاثة إلى السلة — وبعرض 2+1 يكون الأرخص هدية، فوق خصم 34%.", dealBtn: "أضف الثلاثة",
      dealDone: "أُضيفت الثلاثة إلى السلة — الأرخص هدية",
      alts: "عطور أخرى تناسب ذوقك", story: "حمّل بطاقة نتيجتك للستوري", ig: "أرسل النتيجة على إنستجرام", fb: "أرسل على ماسنجر",
      shareQuiz: "شارك الاختبار مع صديق", restart: "أعد الاختبار",
      note: "إجاباتك لا تُحفظ إلا على جهازك، ولا تصلنا إلا إذا أرسلتها.",
      gocart: "إتمام الطلب ({n})", copied: "نسخنا نتيجتك — الصقها في المحادثة وأرسلها.", openChat: "افتح المحادثة واكتب لنا اسم العطر.",
      addedToast: "أُضيف {x} إلى السلة", storyMy: "شخصيتي العطرية", storyPerfume: "عطري من سوير", storyCta: "اكتشف عطرك",
      shareText: "أنا «{p}» في اختبار سوير للعطور، وأنت؟", none: "لم نجد عطرًا مطابقًا — جرّب إجابات مختلفة.",
      msgHead: "نتيجة اختبار سوير ✨", msgPersona: "شخصيتي العطرية: {x}", msgTop: "العطر الأقرب لي: {x} — تطابق {n}%", msgOthers: "عطور أخرى: {x}", msgAns: "إجاباتي:", msgEnd: "أريد المساعدة في الطلب 🌸"
    },
    en: {
      "nav.shop": "Perfumes", "nav.offers": "Offers", "nav.quiz": "SWYR quiz", cart: "Cart", back: "Back",
      eyebrow: "Scent Finder", title: "Which scent is you?",
      lead: "Answer seven quick questions and watch your blend come to life: your scent personality and the SWYR perfume closest to you.",
      start: "Start the quiz", facts: ["7 questions", "Under a minute", "Built on each perfume's notes"],
      again: "Your last result: {p}", againLink: "View perfume",
      step: "{n} of {t}", next: "Next", seeResult: "See my result", upTo: "Pick up to {n}",
      blendEmpty: "Your choices will colour the blend", blend: "<span>Your blend:</span> {x}",
      mixing: "Blending your answers…",
      you: "Your scent personality", yourPick: "Your closest match", match: "{n}% match", inspired: "Inspired by {x}",
      top: "Top", heart: "Heart", base: "Base", from: "From",
      add: "Add to cart", added: "Added ✓", ml: "ml",
      dealText: "Add all three to your cart — with Buy 2 Get 1 the cheapest is free, on top of 34% off.", dealBtn: "Add all three",
      dealDone: "All three added — the cheapest is free",
      alts: "More scents for your taste", story: "Download your story card", ig: "Send result on Instagram", fb: "Send on Messenger",
      shareQuiz: "Share the quiz with a friend", restart: "Retake the quiz",
      note: "Your answers stay on your device and reach us only if you send them.",
      gocart: "Checkout ({n})", copied: "Result copied — paste it in the chat and send.", openChat: "Open the chat and tell us the perfume name.",
      addedToast: "{x} added to cart", storyMy: "My scent personality", storyPerfume: "My SWYR scent", storyCta: "Find your scent",
      shareText: "I'm “{p}” on the SWYR scent quiz — what are you?", none: "No match found — try different answers.",
      msgHead: "SWYR quiz result ✨", msgPersona: "My scent personality: {x}", msgTop: "My closest perfume: {x} — {n}% match", msgOthers: "Others: {x}", msgAns: "My answers:", msgEnd: "I'd like help ordering 🌸"
    }
  };
  const t = (k, v = {}) => String(T[lang][k] ?? T.ar[k] ?? k).replace(/\{(\w+)\}/g, (_, x) => v[x] ?? "");
 
  /* ---------------- questions ----------------
     Each answer adds points to notes (the same notes as the shop's "Find your scent").
     A perfume's score = how close its notes are to your points + whether it suits your season
     (from each perfume's "seasons" in catalog.json) − the notes you said you dislike. */
  const Q = [
    { id: "for", t: { ar: "لمن تبحث عن عطر؟", en: "Who is the perfume for?" },
      h: { ar: "العطر ليس له جنس علميًا — هذا التقسيم يتبع تصنيف الدار الأصلية.", en: "Scent has no gender — this follows the original house's category." }, opts: [
      { ic: "🌸", t: { ar: "عطر نسائي", en: "Women's" }, s: { ar: "ومعه عطور للجنسين", en: "Plus unisex scents" }, cat: ["women", "unisex"] },
      { ic: "🌿", t: { ar: "عطر رجالي", en: "Men's" }, s: { ar: "ومعه عطور للجنسين", en: "Plus unisex scents" }, cat: ["men", "unisex"] },
      { ic: "🤍", t: { ar: "للجنسين فقط", en: "Unisex only" }, s: { ar: "عطر يناسب أي شخص", en: "Made for anyone" }, cat: ["unisex"] },
      { ic: "✨", t: { ar: "لا يهم", en: "Doesn't matter" }, s: { ar: "أريد الأنسب لي من كل العطور", en: "Show me the best match" }, cat: ["women", "men", "unisex"] } ] },
    { id: "season", t: { ar: "في أي فصل ستستخدم العطر أكثر؟", en: "Which season will you wear it most?" },
      h: { ar: "الحرارة تضاعف فوحان العطر والبرد يبطئه، لذلك يختلف الاختيار.", en: "Heat amplifies a scent and cold quiets it — so the choice changes." }, opts: [
      { ic: "☀️", t: { ar: "الصيف", en: "Summer" }, s: { ar: "حمضيات، نوتات مائية، مسك نظيف", en: "Citrus, aquatic, clean musk" }, season: "summer", w: { fresh: 3, citrus: 3, aquatic: 2, aromatic: 1, musk: 1, lavender: 1 } },
      { ic: "❄️", t: { ar: "الشتاء", en: "Winter" }, s: { ar: "عنبر، فانيليا، عود، توابل", en: "Amber, vanilla, oud, spice" }, season: "winter", w: { amber: 3, vanilla: 2, oud: 2, warm_spicy: 2, sweet: 2, coffee: 1, leather: 1 } },
      { ic: "🌷", t: { ar: "الربيع", en: "Spring" }, s: { ar: "ورد، زهور بيضاء، فواكه", en: "Rose, white flowers, fruit" }, season: "spring", w: { floral: 3, rose: 2, fruity: 2, white_flowers: 2, jasmine: 1 } },
      { ic: "🍂", t: { ar: "الخريف", en: "Autumn" }, s: { ar: "أخشاب، عنبر، حلاوة معتدلة", en: "Woods, amber, soft sweetness" }, season: "autumn", w: { woody: 3, amber: 2, patchouli: 1, leather: 1, iris: 1, sweet: 1 } },
      { ic: "🔁", t: { ar: "كل الفصول", en: "All year" }, s: { ar: "عطر واحد متوازن طوال العام", en: "One balanced scent" }, season: "all", w: { musk: 2, woody: 1, fresh: 1, floral: 1 } } ] },
    { id: "when", t: { ar: "متى ستضع هذا العطر غالبًا؟", en: "When will you wear it most?" }, opts: [
      { ic: "💼", t: { ar: "العمل والجامعة", en: "Work & uni" }, s: { ar: "حضور هادئ لا يزعج من حولك", en: "Quiet, close to skin" }, w: { fresh: 2, citrus: 2, musk: 2, soft: 1, iris: 1 } },
      { ic: "☕", t: { ar: "كل يوم", en: "Every day" }, s: { ar: "مريح ولا يُمَل", en: "Easy, never tiring" }, w: { musk: 2, fresh: 1, fruity: 1, floral: 1, soft: 1 } },
      { ic: "🌙", t: { ar: "السهرات والخروجات", en: "Nights out" }, s: { ar: "عطر يُلاحَظ", en: "Gets noticed" }, w: { sweet: 2, vanilla: 2, amber: 2, warm_spicy: 1 } },
      { ic: "❤️", t: { ar: "موعد رومانسي", en: "A date" }, s: { ar: "دفء وقرب", en: "Warm and close" }, w: { vanilla: 2, rose: 2, amber: 1, musk: 1, sweet: 1 } },
      { ic: "💍", t: { ar: "المناسبات والأعراس", en: "Weddings & events" }, s: { ar: "فخامة وثبات", en: "Rich and lasting" }, w: { oud: 2, rose: 2, amber: 2, oriental: 2 } },
      { ic: "🏃", t: { ar: "الرياضة والنشاط", en: "Sport & active days" }, s: { ar: "انتعاش سريع", en: "Instant freshness" }, w: { fresh: 3, citrus: 2, aquatic: 2, aromatic: 1 } },
      { ic: "✈️", t: { ar: "السفر والإجازات", en: "Travel & holidays" }, s: { ar: "خفيف ومشرق", en: "Light and bright" }, w: { citrus: 2, fruity: 2, aquatic: 1, fresh: 1 } } ] },
    { id: "place", t: { ar: "أين تشعر بأنك على طبيعتك؟", en: "Where do you feel most yourself?" }, opts: [
      { ic: "🌊", t: { ar: "على شاطئ البحر", en: "By the sea" }, w: { aquatic: 3, citrus: 2, fresh: 2 } },
      { ic: "🌹", t: { ar: "في حديقة ورد", en: "In a rose garden" }, w: { rose: 3, floral: 2, white_flowers: 1, jasmine: 1 } },
      { ic: "☕", t: { ar: "في مقهى دافئ", en: "In a cosy café" }, w: { coffee: 3, vanilla: 2, sweet: 2 } },
      { ic: "🌲", t: { ar: "في غابة أو جبل", en: "In a forest" }, w: { woody: 3, aromatic: 2, earthy: 1, lavender: 1 } },
      { ic: "🕌", t: { ar: "في مجلس شرقي", en: "In an Arabian majlis" }, w: { oud: 3, amber: 2, warm_spicy: 2, oriental: 1 } },
      { ic: "🍑", t: { ar: "في بستان فواكه", en: "In an orchard" }, w: { fruity: 3, citrus: 1, sweet: 1 } },
      { ic: "🧺", t: { ar: "في غرفة مشمسة بملابس نظيفة", en: "In a sunny room, fresh laundry" }, w: { musk: 3, soft: 2, iris: 1 } } ] },
    { id: "notes", t: { ar: "أي هذه النوتات تحبها؟", en: "Which notes do you love?" },
      h: { ar: "نفس نوتات «اكتشف عطرك» في المتجر.", en: "The same notes as “Find your scent” in the shop." }, multi: 3, notes: true, opts: [] },
    { id: "you", t: { ar: "أي وصف يشبهك أكثر؟", en: "Which sounds most like you?" },
      h: { ar: "سؤال للمتعة — علاقة الشخصية بالعطر غير مثبتة علميًا، لذلك تأثيره صغير.", en: "Just for fun — personality and scent aren't scientifically linked, so it counts little." }, opts: [
      { ic: "🤍", t: { ar: "هادئ وأنيق", en: "Calm & elegant" }, w: { soft: 1, iris: 1, musk: 1 } },
      { ic: "🎉", t: { ar: "اجتماعي ومنطلق", en: "Social & outgoing" }, w: { citrus: 1, fresh: 1, fruity: 1 } },
      { ic: "🔥", t: { ar: "جريء وواثق", en: "Bold & confident" }, w: { sweet: 1, amber: 1, warm_spicy: 1 } },
      { ic: "🖤", t: { ar: "غامض وعميق", en: "Deep & mysterious" }, w: { oud: 1, leather: 1, woody: 1 } },
      { ic: "🌙", t: { ar: "رومانسي حالم", en: "Romantic dreamer" }, w: { rose: 1, floral: 1, vanilla: 1 } },
      { ic: "🌈", t: { ar: "عفوي ومرح", en: "Playful & spontaneous" }, w: { fruity: 1, citrus: 1, sweet: 1 } } ] },
    { id: "avoid", t: { ar: "هل هناك روائح لا تحبها؟", en: "Anything you don't like?" },
      h: { ar: "سنستبعدها من النتيجة.", en: "We'll leave these out." }, multi: 3, opts: [
      { ic: "👌", t: { ar: "لا، أحب التجربة", en: "No, I'm open" }, avoid: [], only: true },
      { ic: "🍬", t: { ar: "الحلو الثقيل", en: "Heavy sweet" }, s: { ar: "فانيليا وسكر", en: "Vanilla & sugar" }, avoid: ["sweet", "vanilla"] },
      { ic: "🪵", t: { ar: "العود والجلد", en: "Oud & leather" }, avoid: ["oud", "leather"] },
      { ic: "💐", t: { ar: "الزهور القوية", en: "Strong florals" }, s: { ar: "ياسمين وزهور بيضاء", en: "Jasmine, white flowers" }, avoid: ["white_flowers", "jasmine", "floral"] },
      { ic: "🌶️", t: { ar: "التوابل", en: "Spices" }, avoid: ["warm_spicy", "soft_spicy"] },
      { ic: "☕", t: { ar: "القهوة", en: "Coffee" }, avoid: ["coffee"] },
      { ic: "🍋", t: { ar: "الحمضيات والمنعش", en: "Citrus & fresh" }, avoid: ["citrus", "fresh", "aquatic"] } ] }
  ];
  const SEASON_OPP = { summer: ["winter"], winter: ["summer"] };
 
  const PERSONAS = [
    { keys: ["sweet", "vanilla", "coffee"], n: { ar: "الدافئ الساحر", en: "The Warm Charmer" },
      d: { ar: "تحب الروائح التي تشبه العناق: فانيليا وحلاوة ودفء يبقى في المكان بعد أن تغادره.", en: "You love scents that feel like a hug — vanilla, sweetness and warmth that lingers after you leave." } },
    { keys: ["floral", "rose", "jasmine", "white_flowers"], n: { ar: "الرومانسي الأنيق", en: "The Romantic" },
      d: { ar: "ذوقك ناعم وراقٍ؛ تجذبك باقات الورد والزهور البيضاء، وتختار الأناقة بلا مبالغة.", en: "Soft and refined — roses and white flowers, elegance without excess." } },
    { keys: ["fresh", "citrus", "aquatic", "aromatic", "lavender"], n: { ar: "المنعش الحيوي", en: "The Free Spirit" },
      d: { ar: "طاقتك عالية وتحب الانتعاش: حمضيات ونسمة بحر ورائحة نظيفة تناسب يومك كله.", en: "High energy and fresh — citrus, sea breeze and a clean scent for the whole day." } },
    { keys: ["woody", "oud", "leather", "patchouli", "earthy"], n: { ar: "الفخم الغامض", en: "The Mysterious" },
      d: { ar: "حضورك قوي وهادئ معًا؛ تميل إلى الأخشاب والعود والروائح العميقة التي تُتذكَّر.", en: "Quiet but powerful — woods, oud and deep scents that people remember." } },
    { keys: ["fruity"], n: { ar: "المرح المشرق", en: "The Radiant" },
      d: { ar: "تحب البهجة والألوان؛ الروائح الفاكهية تعبّر عن خفة روحك وتفاؤلك.", en: "Joyful and bright — fruity scents match your light, optimistic spirit." } },
    { keys: ["musk", "soft", "iris"], n: { ar: "الناعم الهادئ", en: "The Soft Soul" },
      d: { ar: "تفضّل العطر القريب من البشرة: مسك ناعم وبودرة، رائحة نظافة تشبهك ولا تزاحم أحدًا.", en: "Close to the skin — soft musk and powder, a clean scent that never crowds anyone." } },
    { keys: ["amber", "warm_spicy", "oriental", "soft_spicy"], n: { ar: "الشرقي الجذاب", en: "The Oriental" },
      d: { ar: "تميل إلى العنبر والتوابل الدافئة؛ ذوق شرقي أصيل بلمسة جذابة.", en: "Amber and warm spice — a true oriental taste with magnetic charm." } }
  ];
 
  /* ---------------- state ---------------- */
  let C = null, P = [], step = -1, answers = [], result = null;
  let cart = store.get("swyr_cart", []);
  const px = {};
  const product = id => P.find(p => p.id === id);
  const sizeOf = (p, ml) => p.sizes.find(s => s.ml === ml) || p.sizes[0];
  const sel = {};
  const cur = () => L(C.settings.currency) || (lang === "ar" ? "ج.م" : "EGP");
  const fmt = n => Math.round(n).toLocaleString("en-US");
 
  /* ---------------- pixels (same IDs as the shop, from catalog.json) ---------------- */
  function loadPixels() {
    const X = (C.settings && C.settings.pixels) || {};
    const add = src => { const el = document.createElement("script"); el.async = true; el.src = src; document.head.appendChild(el); };
    if (/^\d{10,20}$/.test(String(X.meta || "").trim())) {
      const n = window.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
      if (!window._fbq) window._fbq = n; n.push = n; n.loaded = true; n.version = "2.0"; n.queue = [];
      add("https://connect.facebook.net/en_US/fbevents.js"); fbq("init", String(X.meta).trim()); fbq("track", "PageView"); px.meta = true;
    }
    if (/^[A-Z0-9]{8,30}$/i.test(String(X.tiktok || "").trim())) {
      const id = String(X.tiktok).trim(), ttq = window.ttq = window.ttq || [];
      ttq.methods = ["page", "track", "identify", "instances", "debug", "on", "off", "once", "ready", "alias", "group", "enableCookie", "disableCookie"];
      ttq.setAndDefer = (o, m) => { o[m] = function () { o.push([m].concat([].slice.call(arguments, 0))); }; };
      ttq.methods.forEach(m => ttq.setAndDefer(ttq, m));
      ttq.load = e => { const u = "https://analytics.tiktok.com/i18n/pixel/events.js"; ttq._i = ttq._i || {}; ttq._i[e] = []; ttq._i[e]._u = u; ttq._t = ttq._t || {}; ttq._t[e] = +new Date(); ttq._o = ttq._o || {}; ttq._o[e] = {}; add(`${u}?sdkid=${e}&lib=ttq`); };
      window.TiktokAnalyticsObject = "ttq"; ttq.load(id); ttq.page(); px.tiktok = true;
    }
    if (/^[0-9a-f-]{30,40}$/i.test(String(X.snap || "").trim())) {
      const a = window.snaptr = function () { a.handleRequest ? a.handleRequest.apply(a, arguments) : a.queue.push(arguments); };
      a.queue = []; add("https://sc-static.net/scevent.min.js"); snaptr("init", String(X.snap).trim(), {}); snaptr("track", "PAGE_VIEW"); px.snap = true;
    }
  }
  function track(ev, d = {}) {
    try {
      const ids = d.ids || [];
      if (px.meta) {
        if (ev === "Quiz") fbq("trackCustom", "QuizComplete", { persona: d.name });
        else fbq("track", ev, { currency: "EGP", value: d.value || 0, content_ids: ids, content_type: "product", content_name: d.name });
      }
      if (px.tiktok && ev !== "Quiz") ttq.track({ ViewContent: "ViewContent", AddToCart: "AddToCart", Lead: "SubmitForm" }[ev], { currency: "EGP", value: d.value || 0, content_type: "product", contents: ids.map(id => ({ content_id: id })) });
      if (px.snap && ev !== "Quiz") snaptr("track", { ViewContent: "VIEW_CONTENT", AddToCart: "ADD_CART", Lead: "SIGN_UP" }[ev], { currency: "EGP", price: d.value || 0, item_ids: ids });
    } catch {}
  }
 
  /* ---------------- shared UI ---------------- */
  const toast = m => { const el = $("#toast"); el.textContent = m; el.classList.add("is-on"); clearTimeout(toast.h); toast.h = setTimeout(() => el.classList.remove("is-on"), 2600); };
  function badge() {
    const n = cart.reduce((a, i) => a + i.qty, 0);
    $("#cartCount").textContent = n;
    const g = $("#gocart");
    if (g) { g.textContent = t("gocart", { n }); g.classList.toggle("on", n > 0); }
  }
  function addToCart(id, ml, quiet) {
    cart = store.get("swyr_cart", []);
    const p = product(id); if (!p) return;
    const line = cart.find(i => i.id === id && i.ml === ml);
    if (line) line.qty += 1; else cart.push({ id, ml, qty: 1 });
    store.set("swyr_cart", cart);
    const cb = $("#cartBtn"); cb.classList.remove("bump"); void cb.offsetWidth; cb.classList.add("bump");
    badge();
    track("AddToCart", { ids: [id], value: sizeOf(p, ml).price, name: p.name.en });
    if (!quiet) toast(t("addedToast", { x: L(p.name) }));
  }
 
  function artHTML(p, mini) {
    const no = (p.code || "").replace(/\D/g, "");
    return `<span class="art art--${p.category}${mini ? " art--mini" : ""}" role="img" aria-label="${esc(L(p.name))}">
      ${!mini && no ? `<span class="art__no">N° ${esc(no)}</span>` : ""}
      <span class="art__disc"><span class="art__mark"></span><span class="art__brand">SWYR</span>
      ${mini ? "" : `<span class="art__rule"></span><span class="art__en">${esc(p.name.en)}</span>`}</span></span>`;
  }
 
  /* ---------------- orb ---------------- */
  const DEFAULT_ORB = ["#F8B7D5", "#FCD3C4", "#FDE7A3", "#F6D5E2"];
  function prefs(upto = Q.length) {
    const pref = {};
    Q.slice(0, upto).forEach((q, qi) => (answers[qi] || []).forEach(k => Object.entries(q.opts[k].w || {}).forEach(([n, v]) => pref[n] = (pref[n] || 0) + v)));
    return pref;
  }
  const soften = hex => { // mix 25% white so the orb stays in SWYR's soft palette
    const m = /^#?([0-9a-f]{6})$/i.exec(hex || ""); if (!m) return hex;
    const n = parseInt(m[1], 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255, f = c => Math.round(c + (255 - c) * .25);
    return `rgb(${f(r)},${f(g)},${f(b)})`;
  };
  function topNotes(pref, n = 4) {
    return Object.entries(pref).filter(([k]) => C.notes[k]).sort((a, b) => b[1] - a[1]).slice(0, n).map(([k]) => k);
  }
  function paintOrb(pref, el = $("#orb"), pulse = true) {
    const keys = topNotes(pref);
    const cols = keys.map(k => soften(C.notes[k].color));
    while (cols.length < 4) cols.push(DEFAULT_ORB[cols.length]);
    $$(".blob", el).forEach((b, i) => b.style.backgroundColor = cols[i]);
    if (pulse) { el.classList.remove("pulse"); void el.offsetWidth; el.classList.add("pulse"); }
    if (el.id === "orb") $("#blend").innerHTML = keys.length ? t("blend", { x: keys.slice(0, 3).map(k => `<b>${esc(L(C.notes[k]))}</b>`).join(" · ") }) : esc(t("blendEmpty"));
    return { keys, cols };
  }
  const orbHTML = (id = "") => `<div class="orb"${id ? ` id="${id}"` : ""}><i class="blob b1"></i><i class="blob b2"></i><i class="blob b3"></i><i class="blob b4"></i><span class="orb__glass"></span><span class="orb__word">SWYR</span></div>`;
 
  /* ---------------- screens ---------------- */
  const stage = $("#stage");
  function swap(html, after) {
    const old = stage.firstElementChild;
    const put = () => { stage.innerHTML = html; if (after) after(); };
    if (old) { old.classList.add("out"); setTimeout(put, 170); } else put();
  }
  function mode(m) {
    const qz = $("#qz");
    qz.classList.toggle("is-intro", m === "intro");
    qz.classList.toggle("is-result", m === "result");
    $("#top").hidden = m !== "q";
  }
 
  function intro() {
    step = -1; answers = []; mode("intro"); paintOrb({}, $("#orb"), false);
    const last = store.get("swyr_quiz", null), lp = last && product(last.top);
    swap(`<div class="scr intro">
      <p class="eyebrow">${t("eyebrow")}</p>
      <h1>${t("title")}</h1>
      <p class="lead">${t("lead")}</p>
      <button type="button" class="btn btn--dark" data-start>${t("start")}</button>
      <div class="facts">${T[lang].facts.map(f => `<span>${esc(f)}</span>`).join("")}</div>
      ${lp ? `<p class="again">${t("again", { p: esc(L(lp.name)) })} — <a href="/?p=${esc(lp.id)}">${t("againLink")}</a></p>` : ""}
    </div>`);
    window.scrollTo({ top: 0 });
  }
 
  function question() {
    mode("q");
    const q = Q[step];
    if (q.notes && !q.opts.length) q.opts = (C.finderNotes || []).filter(k => C.notes[k]).map(k => ({ c: C.notes[k].color, t: C.notes[k], w: { [k]: 5 } }));
    const a = answers[step] || [], multi = q.multi || 1;
    $("#prog").style.width = `${(step / Q.length) * 100}%`;
    $("#step").textContent = t("step", { n: step + 1, t: Q.length });
    const long = q.opts.some(o => o.s && L(o.s).length > 22) && !q.notes;
    swap(`<div class="scr q">
      <h2>${esc(L(q.t))}</h2>
      <p class="hint">${esc(L(q.h) || "")}${multi > 1 ? `${q.h ? " " : ""}${t("upTo", { n: multi })}.` : ""}</p>
      <div class="opts${q.notes ? " opts--notes" : ""}${long ? " opts--one" : ""}" role="group" aria-label="${esc(L(q.t))}">
        ${q.opts.map((o, i) => `<button type="button" class="opt" data-opt="${i}" aria-pressed="${a.includes(i)}" style="animation-delay:${i * 35}ms${o.c ? `;--c:${o.c}` : ""}">
          ${o.c ? `<span class="dot"></span>` : `<span class="ic" aria-hidden="true">${o.ic}</span>`}
          <span class="tx"><b>${esc(L(o.t))}</b>${o.s ? `<small>${esc(L(o.s))}</small>` : ""}</span>
          <span class="tick"></span>
        </button>`).join("")}
      </div>
      ${multi > 1 ? `<div class="qfoot"><button type="button" class="btn btn--dark" data-next ${a.length ? "" : "disabled"}>${step === Q.length - 1 ? t("seeResult") : t("next")}</button></div>` : ""}
    </div>`);
    paintOrb(prefs(step), $("#orb"), false);
  }
 
  function pick(i) {
    const q = Q[step], multi = q.multi || 1;
    let a = answers[step] || [];
    if (multi === 1) a = [i];
    else if (a.includes(i)) a = a.filter(x => x !== i);
    else if (q.opts[i].only) a = [i];
    else { a = [...a.filter(x => !q.opts[x].only), i]; if (a.length > multi) a.shift(); }
    answers[step] = a;
    $$(".opt", stage).forEach(b => b.setAttribute("aria-pressed", a.includes(+b.dataset.opt)));
    paintOrb(prefs(step + 1));
    if (multi === 1) setTimeout(next, 320);
    else $("[data-next]", stage).disabled = !a.length;
  }
  function next() {
    if (step < Q.length - 1) { step++; question(); return; }
    step = Q.length; mode("result");
    const pref = prefs();
    swap(`<div class="scr mixing-scr">${orbHTML("mixOrb")}<p>${t("mixing")}</p></div>`, () => {
      const o = $("#mixOrb"); o.classList.add("mixing"); paintOrb(pref, o, false);
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(showResult, 1700);
  }
  function back() {
    if (step >= Q.length) { step = Q.length - 1; question(); }
    else if (step > 0) { step--; question(); }
    else intro();
  }
 
  /* ---------------- scoring ---------------- */
  function compute() {
    const opt = id => { const i = Q.findIndex(q => q.id === id); return (answers[i] || []).map(k => Q[i].opts[k]); };
    const pref = prefs();
    const cats = (opt("for")[0] || {}).cat || ["women", "men", "unisex"];
    const avoid = opt("avoid").flatMap(o => o.avoid || []);
    const season = (opt("season")[0] || {}).season;
    const norm = v => Math.sqrt(Object.values(v).reduce((a, x) => a + x * x, 0)) || 1;
    const pn = norm(pref);
    const list = P.filter(p => cats.includes(p.category) && p.notes).map(p => {
      const dot = Object.entries(p.notes).reduce((a, [k, v]) => a + (pref[k] || 0) * v, 0);
      let s = dot / (pn * norm(p.notes));
      s -= avoid.reduce((a, k) => a + (p.notes[k] || 0), 0) / 100 * 0.9;
      const ps = p.seasons || [];
      if (season && ps.length) {
        if (ps.includes(season) || (season !== "all" && ps.includes("all"))) s += 0.12;
        else if (season === "all" && ps.length >= 3) s += 0.08;
        else if (ps.every(x => (SEASON_OPP[season] || []).includes(x))) s -= 0.2;
        else s -= 0.05;
      }
      return { p, s };
    }).sort((a, b) => b.s - a.s);
    const top = list[0] ? list[0].s : 1;
    list.forEach(x => x.pct = Math.max(55, Math.min(98, Math.round(62 + 36 * (x.s / (top || 1))))));
    avoid.forEach(k => delete pref[k]);
    const persona = PERSONAS.map(Pe => ({ Pe, v: Pe.keys.reduce((a, k) => a + (pref[k] || 0), 0) })).sort((a, b) => b.v - a.v)[0].Pe;
    const total = Object.values(pref).reduce((a, b) => a + b, 0) || 1;
    const bars = topNotes(pref, 3).map(k => ({ k, pct: Math.round((pref[k] / total) * 100) }));
    return { list: list.slice(0, 4), persona, bars, pref };
  }
 
  /* ---------------- result ---------------- */
  function sizeButtons(p) {
    if (p.sizes.length < 2) return "";
    return `<div class="sizesel" role="group">${p.sizes.map(z => `<button type="button" data-size="${z.ml}" data-pid="${p.id}" aria-pressed="${z.ml === sel[p.id]}">${z.ml}<span class="u"> ${t("ml")}</span></button>`).join("")}</div>`;
  }
  function priceHTML(p) {
    const s = sizeOf(p, sel[p.id]);
    return `<span class="price" data-price="${p.id}">${fmt(s.price)}<small>${esc(cur())}</small>${s.compare > s.price ? `<s>${fmt(s.compare)}</s>` : ""}</span>`;
  }
  function showResult() {
    result = compute();
    const [first, ...alts] = result.list;
    if (!first) { swap(`<div class="scr intro"><p class="lead">${t("none")}</p><button class="btn btn--dark" data-restart>${t("restart")}</button></div>`); return; }
    result.list.forEach(x => sel[x.p.id] = sel[x.p.id] || (x.p.sizes.find(s => s.ml === 50) || x.p.sizes[0]).ml);
    const p = first.p, Pe = result.persona;
    store.set("swyr_quiz", { top: p.id, persona: Pe.n.en, at: Date.now() });
    track("ViewContent", { ids: [p.id], value: sizeOf(p, sel[p.id]).price, name: p.name.en });
    track("Quiz", { name: Pe.n.en });
    const bundle = C.bundle && C.bundle.enabled && result.list.length >= 3;
    const pyr = p.pyramid || {};
    swap(`<div class="scr res">
      <section class="persona">
        ${orbHTML("resOrb")}
        <div>
          <p class="eyebrow">${esc(Pe.n.en)}</p>
          <p class="pick__label">${t("you")}</p>
          <h1>${esc(L(Pe.n))}</h1>
          <p>${esc(L(Pe.d))}</p>
          <div class="qbars">${result.bars.map(b => `<div class="qbar"><span>${esc(L(C.notes[b.k]))}</span><i><b style="--c:${C.notes[b.k].color}" data-w="${b.pct}"></b></i><em>${b.pct}%</em></div>`).join("")}</div>
        </div>
      </section>
 
      <article class="pick">
        <a class="pick__media" href="/?p=${esc(p.id)}">${artHTML(p)}<span class="pick__match">${t("match", { n: first.pct })}</span></a>
        <div class="pick__body">
          <p class="pick__label">${t("yourPick")}</p>
          <div class="pick__latin">${esc(p.name.en)}</div>
          ${lang === "ar" ? `<h2>${esc(p.name.ar)}</h2>` : ""}
          ${p.inspiredBy ? `<p class="insp">${t("inspired", { x: esc(p.name.en + (p.inspiredBy !== p.name.en ? " — " + p.inspiredBy : "")) })}</p>` : ""}
          ${(p.seasons || []).length && C.seasons ? `<div class="ssn">${p.seasons.map(s => C.seasons[s] ? `<span>${esc(L(C.seasons[s]))}</span>` : "").join("")}</div>` : ""}
          ${pyr.top || pyr.heart || pyr.base ? `<div class="pyr">
            ${pyr.top ? `<div><span>${t("top")}</span><b>${esc(pyr.top)}</b></div>` : ""}
            ${pyr.heart ? `<div><span>${t("heart")}</span><b>${esc(pyr.heart)}</b></div>` : ""}
            ${pyr.base ? `<div><span>${t("base")}</span><b>${esc(pyr.base)}</b></div>` : ""}</div>` : ""}
          ${sizeButtons(p)}
          <div class="buy">${priceHTML(p)}<button type="button" class="addbtn" data-add="${p.id}">${t("add")}</button></div>
        </div>
      </article>
 
      ${bundle ? `<div class="deal"><strong>2+1</strong><p>${t("dealText")}</p><button type="button" class="btn" data-deal>${t("dealBtn")}</button></div>` : ""}
 
      ${alts.length ? `<section class="alts"><h3>${t("alts")}</h3><div class="alts__grid">${alts.map(x => `
        <article class="mini">
          <a class="mini__media" href="/?p=${esc(x.p.id)}">${artHTML(x.p, true)}<span class="mini__match">${x.pct}%</span></a>
          <div class="mini__body">
            <b>${esc(L(x.p.name))}</b><small>${esc(x.p.name.en)}${x.p.inspiredBy && x.p.inspiredBy !== x.p.name.en ? " — " + esc(x.p.inspiredBy) : ""}</small>
            <div class="mini__foot">${priceHTML(x.p)}<button type="button" class="addbtn" data-add="${x.p.id}">${t("add")}</button></div>
          </div>
        </article>`).join("")}</div></section>` : ""}
 
      <div class="share">
        <button type="button" class="btn btn--grad btn--full" data-story>${t("story")}</button>
        <button type="button" class="btn btn--line" data-send="ig">${t("ig")}</button>
        <button type="button" class="btn btn--line" data-send="fb">${t("fb")}</button>
        <button type="button" class="btn btn--line" data-share>${t("shareQuiz")}</button>
        <button type="button" class="btn btn--line" data-restart>${t("restart")}</button>
      </div>
      <p class="note">${t("note")}</p>
    </div>`, () => {
      paintOrb(result.pref, $("#resOrb"), false);
      setTimeout(() => $$(".qbar b", stage).forEach(b => b.style.width = b.dataset.w + "%"), 200);
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
 
  /* ---------------- sending & sharing ---------------- */
  function resultText() {
    const r = result;
    const ans = Q.map((q, i) => `${i + 1}. ${L(q.t)} ← ${(answers[i] || []).map(k => L(q.opts[k].t)).join(" + ")}`);
    return [t("msgHead"), t("msgPersona", { x: L(r.persona.n) }), "",
      t("msgTop", { x: `${L(r.list[0].p.name)} (${r.list[0].p.name.en})`, n: r.list[0].pct }),
      t("msgOthers", { x: r.list.slice(1).map(x => L(x.p.name)).join(lang === "ar" ? "، " : ", ") }), "",
      t("msgAns"), ...ans, "", t("msgEnd")].join("\n");
  }
  async function copy(text) {
    try { await navigator.clipboard.writeText(text); return true; } catch {
      const ta = document.createElement("textarea"); ta.value = text; ta.style.cssText = "position:fixed;opacity:0"; document.body.appendChild(ta); ta.select();
      let ok = false; try { ok = document.execCommand("copy"); } catch {} ta.remove(); return ok;
    }
  }
  async function send(where) {
    const text = resultText(), ok = await copy(text), S = C.settings || {};
    track("Lead", { name: "quiz_result" });
    const url = where === "ig" && S.instagramDM ? `https://ig.me/m/${S.instagramDM}` : `https://m.me/${S.messenger || ""}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener");
    toast(ok ? t("copied") : t("openChat"));
  }
  async function shareQuiz() {
    const url = `${location.origin}/quiz`, text = t("shareText", { p: L(result.persona.n) });
    if (navigator.share) { try { await navigator.share({ title: "SWYR", text, url }); return; } catch (e) { if (e.name === "AbortError") return; } }
    window.open(`https://wa.me/?text=${encodeURIComponent(text + "\n" + url)}`, "_blank", "noopener");
  }
 
  // 1080×1920 story card drawn on a canvas — the customer can post it on Instagram/WhatsApp status
  async function storyCard() {
    const W = 1080, H = 1920, cv = document.createElement("canvas"); cv.width = W; cv.height = H;
    const x = cv.getContext("2d"), r = result, p = r.list[0].p;
    try { await Promise.all(["300 60px Tajawal", "500 60px Tajawal", "400 60px Italiana"].map(f => document.fonts.load(f))); } catch {}
    const bg = x.createLinearGradient(0, 0, W, H); bg.addColorStop(0, "#FDE6F0"); bg.addColorStop(.5, "#FEEEE6"); bg.addColorStop(1, "#FFF6D9");
    x.fillStyle = bg; x.fillRect(0, 0, W, H);
    // orb
    const cx = W / 2, cy = 640, R = 330, { cols } = paintOrb(r.pref, document.createElement("div"), false);
    x.save(); x.beginPath(); x.arc(cx, cy, R, 0, Math.PI * 2); x.clip();
    const base = x.createLinearGradient(cx - R, 0, cx + R, 0); base.addColorStop(0, "#F8B7D7"); base.addColorStop(.5, "#FCD3C4"); base.addColorStop(1, "#FDE8A2");
    x.fillStyle = base; x.fillRect(cx - R, cy - R, R * 2, R * 2);
    [[-.42, -.38], [.45, -.2], [-.15, .5], [.4, .45]].forEach(([dx, dy], i) => {
      const g = x.createRadialGradient(cx + dx * R, cy + dy * R, 0, cx + dx * R, cy + dy * R, R * .95);
      g.addColorStop(0, cols[i]); g.addColorStop(1, "rgba(255,255,255,0)");
      x.fillStyle = g; x.fillRect(cx - R, cy - R, R * 2, R * 2);
    });
    const gl = x.createRadialGradient(cx - R * .35, cy - R * .45, 0, cx - R * .35, cy - R * .45, R * .8);
    gl.addColorStop(0, "rgba(255,255,255,.7)"); gl.addColorStop(1, "rgba(255,255,255,0)"); x.fillStyle = gl; x.fillRect(cx - R, cy - R, R * 2, R * 2);
    x.restore();
    x.strokeStyle = "rgba(255,255,255,.8)"; x.lineWidth = 3; x.beginPath(); x.arc(cx, cy, R - 18, 0, Math.PI * 2); x.stroke();
    x.textAlign = "center"; x.direction = lang === "ar" ? "rtl" : "ltr";
    x.fillStyle = "rgba(62,47,47,.75)"; x.font = "400 110px Italiana"; x.letterSpacing = "20px"; x.fillText("SWYR", cx + 10, cy + 38); x.letterSpacing = "0px";
    x.fillStyle = "#8E7A76"; x.font = "400 40px Italiana"; x.fillText("A BREATH OF PURE LUXURY", cx, 170);
    x.fillStyle = "#C25A84"; x.font = "500 44px Tajawal"; x.fillText(t("storyMy"), cx, 1100);
    x.fillStyle = "#3E2F2F"; x.font = "300 104px Tajawal"; x.fillText(L(r.persona.n), cx, 1225);
    x.fillStyle = "#6A504E"; x.font = "400 40px Tajawal";
    x.fillText(r.bars.map(b => L(C.notes[b.k])).join("  ·  "), cx, 1305);
    // perfume
    x.fillStyle = "rgba(255,255,255,.75)"; const bx = 120, by = 1400, bw = W - 240, bh = 250;
    x.beginPath(); x.roundRect ? x.roundRect(bx, by, bw, bh, 40) : x.rect(bx, by, bw, bh); x.fill();
    x.fillStyle = "#8E7A76"; x.font = "500 36px Tajawal"; x.fillText(t("storyPerfume"), cx, by + 70);
    x.fillStyle = "#3E2F2F"; x.font = "500 64px Tajawal"; x.fillText(L(p.name), cx, by + 150);
    x.fillStyle = "#8E7A76"; x.font = "400 38px Italiana"; x.fillText(`${p.name.en.toUpperCase()}  ·  ${r.list[0].pct}%`, cx, by + 210);
    x.fillStyle = "#3E2F2F"; x.font = "500 42px Tajawal"; x.fillText(`${t("storyCta")} ←  ${location.host}/quiz`, cx, 1780);
    const blob = await new Promise(res => cv.toBlob(res, "image/png"));
    const file = new File([blob], "swyr-scent.png", { type: "image/png" });
    if (navigator.canShare && navigator.canShare({ files: [file] })) { try { await navigator.share({ files: [file], title: "SWYR" }); return; } catch (e) { if (e.name === "AbortError") return; } }
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "swyr-scent.png"; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  }
 
  /* ---------------- events ---------------- */
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-start],[data-opt],[data-next],[data-restart],[data-add],[data-size],[data-deal],[data-send],[data-share],[data-story]");
    if (!b) return;
    const d = b.dataset;
    if (d.start !== undefined) { step = 0; answers = []; question(); window.scrollTo({ top: 0, behavior: "smooth" }); }
    else if (d.opt !== undefined) pick(+d.opt);
    else if (d.next !== undefined) next();
    else if (d.restart !== undefined) intro();
    else if (d.size) {
      sel[d.pid] = +d.size;
      $$(`[data-size][data-pid="${d.pid}"]`).forEach(x => x.setAttribute("aria-pressed", x.dataset.size === d.size));
      $$(`[data-price="${d.pid}"]`).forEach(x => x.outerHTML = priceHTML(product(d.pid)));
    }
    else if (d.add) {
      addToCart(d.add, sel[d.add] || 50);
      b.textContent = t("added"); b.classList.add("is-added");
      setTimeout(() => { b.textContent = t("add"); b.classList.remove("is-added"); }, 1600);
    }
    else if (d.deal !== undefined) {
      cart = store.get("swyr_cart", []);
      // add only the ones not already in the cart
      result.list.slice(0, 3).filter(x => !cart.some(i => i.id === x.p.id)).forEach(x => addToCart(x.p.id, sel[x.p.id] || 50, true));
      toast(t("dealDone")); b.disabled = true;
    }
    else if (d.send) send(d.send);
    else if (d.share !== undefined) shareQuiz();
    else if (d.story !== undefined) storyCard();
  });
  $("#back").addEventListener("click", back);
  $("#langBtn").addEventListener("click", () => {
    lang = lang === "ar" ? "en" : "ar"; store.set("swyr_lang", lang); applyLang();
    if (step < 0) intro(); else if (step < Q.length) question(); else if (result) showResult();
  });
  window.addEventListener("storage", e => { if (e.key === "swyr_cart") { cart = store.get("swyr_cart", []); badge(); } });
 
  function applyLang() {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    $$("[data-t]").forEach(el => el.textContent = t(el.dataset.t));
    $$("[data-t-aria]").forEach(el => el.setAttribute("aria-label", t(el.dataset.tAria)));
    $("#langBtn").textContent = lang === "ar" ? "English" : "العربية";
    document.title = lang === "ar" ? "اختبار سوير — اكتشف عطرك في دقيقة" : "SWYR quiz — find your scent in a minute";
    badge();
  }
 
  /* ---------------- start ---------------- */
  (async function boot() {
    try { C = await (await fetch("/catalog.json", { cache: "no-cache" })).json(); }
    catch { stage.innerHTML = `<p class="lead">catalog.json could not be loaded</p>`; return; }
    C.products.forEach(p => { if (typeof p.sizes === "string") p.sizes = (C.priceList && C.priceList[p.sizes]) || []; });
    P = C.products.filter(p => ["women", "men", "unisex"].includes(p.category) && p.sizes.length);
    cart = cart.filter(i => C.products.some(p => p.id === i.id));
    document.body.insertAdjacentHTML("beforeend", `<a class="btn btn--dark gocart" id="gocart" href="/?cart=1"></a>`);
    applyLang();
    loadPixels();
    intro();
  })();
})();