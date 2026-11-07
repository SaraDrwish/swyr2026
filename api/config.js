
module.exports = (req, res) => {
  const online = Boolean(
    process.env.PAYMOB_SECRET_KEY &&
    process.env.PAYMOB_PUBLIC_KEY &&
    process.env.PAYMOB_INTEGRATION_ID
  );
  const orders = Boolean(
    (process.env.ORDERS_WEBHOOK_URL && process.env.ORDERS_SECRET) ||
    (process.env.WHATSAPP_PHONE && process.env.CALLMEBOT_APIKEY) ||
    /^[A-Za-z0-9_-]{8,64}$/.test((process.env.NTFY_TOPIC || "").trim())
  );
  res.setHeader("Cache-Control", "no-store");
  res.status(200).json({ online, orders });
};
 