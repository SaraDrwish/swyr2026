// Tells the storefront whether online card payment is switched on.
// It turns on automatically once the Paymob keys are added in Vercel → Settings → Environment Variables.
module.exports = (req, res) => {
  const online = Boolean(
    process.env.PAYMOB_SECRET_KEY &&
    process.env.PAYMOB_PUBLIC_KEY &&
    process.env.PAYMOB_INTEGRATION_ID
  );
  res.setHeader("Cache-Control", "no-store");
  res.status(200).json({ online });
};
