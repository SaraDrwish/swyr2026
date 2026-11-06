// Tells the storefront which server features are switched on.
// They turn on automatically once the matching keys are added in Vercel → Settings → Environment Variables.
module.exports = (req, res) => {
  const online = Boolean(
    process.env.PAYMOB_SECRET_KEY &&
    process.env.PAYMOB_PUBLIC_KEY &&
    process.env.PAYMOB_INTEGRATION_ID
  );
  const orders = Boolean(process.env.ORDERS_WEBHOOK_URL && process.env.ORDERS_SECRET);
  res.setHeader("Cache-Control", "no-store");
  res.status(200).json({ online, orders });
};
 