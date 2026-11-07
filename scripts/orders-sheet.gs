/**
 * SWYR — استقبال طلبات الموقع في Google Sheet + إيميل لكل طلب.
 * الطريقة: انسخ الملف ده كله في Extensions → Apps Script جوه الشيت، وغيّر SECRET تحت.
 * الشرح الكامل في README.md (قسم «استقبال الطلبات»).
 */
 
// 1) كلمة سر طويلة من اختيارك — لازم تكون نفس قيمة ORDERS_SECRET في Vercel بالظبط
const SECRET = 'غيّر-الكلمة-دي-لكلمة-سر-طويلة-2026';
 
// 2) الإيميل اللي هيوصله إشعار بكل طلب
const EMAIL = 'swyrperfumes@gmail.com';
 
const STATUSES = ['جديد', 'تم التأكيد', 'تم الشحن', 'تم التسليم', 'ملغي'];
const ORDER_HEADERS = ['التاريخ', 'رقم الطلب', 'الحالة', 'الاسم', 'الموبايل', 'رقم آخر', 'المحافظة', 'المنطقة', 'العنوان',
  'المنتجات', 'عدد القطع', 'المجموع', 'الخصم', 'الشحن', 'الإجمالي', 'طريقة الدفع', 'ملاحظات', 'المصدر'];
const REVIEW_HEADERS = ['التاريخ', 'الاسم', 'الموبايل', 'التقييم', 'العطر', 'التعليق', 'منشور؟', 'المصدر'];
const REQUEST_HEADERS = ['التاريخ', 'النوع', 'الحالة', 'الاسم', 'الموبايل', 'الكمية', 'الموعد', 'الميزانية', 'التفاصيل', 'المصدر'];
 
function doPost(e) {
  let d;
  try { d = JSON.parse(e.postData.contents); } catch (err) { return out_({ ok: false, error: 'bad json' }); }
  if (!d || d.secret !== SECRET) return out_({ ok: false, error: 'unauthorized' });
 
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const isReq = d.kind === 'request';
  const isRev = d.kind === 'review';
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    if (isRev) {
      const sr = sheet_(ss, 'التقييمات', REVIEW_HEADERS);
      sr.appendRow([new Date(), d.name, d.phone ? "'" + d.phone : '', d.rating, d.product, d.comment, 'لا', d.source]);
      sr.getRange(sr.getLastRow(), 1, 1, REVIEW_HEADERS.length).setVerticalAlignment('top').setWrap(true);
    } else {
    const sh = sheet_(ss, isReq ? 'الطلبات الخاصة' : 'الطلبات', isReq ? REQUEST_HEADERS : ORDER_HEADERS);
    const phone = v => (v ? "'" + v : '');
    const row = isReq
      ? [new Date(), d.type, 'جديد', d.name, phone(d.phone), d.qty, d.date, d.budget, d.details, d.source]
      : [new Date(), d.orderId, d.status || 'جديد', d.name, phone(d.phone), phone(d.phone2), d.gov, d.area, d.address,
         d.items, d.count, d.sub, d.discount, d.shipping, d.total, d.pay, d.notes, d.source];
    sh.appendRow(row);
    const r = sh.getLastRow();
    sh.getRange(r, 3).setDataValidation(SpreadsheetApp.newDataValidation().requireValueInList(STATUSES, true).build());
    sh.getRange(r, 1, 1, row.length).setVerticalAlignment('top').setWrap(true);
    }
  } finally {
    lock.releaseLock();
  }
 
  try {
    MailApp.sendEmail({ to: EMAIL, subject: d.subject || 'طلب جديد من موقع SWYR', body: (d.text || '') + '\n\nكل الطلبات: ' + ss.getUrl() });
  } catch (err) { /* لو الإيميل فشل الطلب برضه اتسجّل في الشيت */ }
 
  return out_({ ok: true });
}
 
function sheet_(ss, name, headers) {
  let sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    sh.setRightToLeft(true);
    sh.appendRow(headers);
    sh.getRange(1, 1, 1, headers.length).setFontWeight('bold').setBackground('#FCD3C4');
    sh.setFrozenRows(1);
  }
  return sh;
}
 
function out_(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
 
// شغّل الدالة دي مرة واحدة من فوق (Run) عشان تدّي الصلاحيات وتتأكد إن الإيميل والشيت شغالين
function test() {
  const e = { postData: { contents: JSON.stringify({
    secret: SECRET, kind: 'order', orderId: 'SW-000000-0000', status: 'تجربة', name: 'طلب تجريبي', phone: '01000000000',
    gov: 'القاهرة', area: 'تجربة', address: 'تجربة', items: 'عطر تجريبي — 50 مل × 1', count: 1, sub: 350, discount: 0,
    shipping: 120, total: 470, pay: 'الدفع عند الاستلام', notes: '', source: 'test',
    subject: 'تجربة — طلب من موقع SWYR', text: 'لو وصلتك الرسالة دي يبقى استقبال الطلبات شغال.' }) } };
  Logger.log(doPost(e).getContent());
}