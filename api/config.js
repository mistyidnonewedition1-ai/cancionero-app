// GET /api/config : dit à l'appli si le Premium est configuré et donne les vrais prix Stripe
const L = require('./_lib');
module.exports = async (req, res) => {
  try {
    const m = process.env.STRIPE_PRICE_MONTH, y = process.env.STRIPE_PRICE_YEAR;
    if (!process.env.STRIPE_SECRET_KEY || !process.env.TOKEN_SECRET || !m || !y) return res.status(200).json({ enabled: false });
    const [pm, py] = await Promise.all([L.stripe('/prices/' + m), L.stripe('/prices/' + y)]);
    res.setHeader('Cache-Control', 's-maxage=300');
    res.status(200).json({
      enabled: true,
      trial: parseInt(process.env.TRIAL_DAYS || '0', 10),
      month: { amount: pm.unit_amount, currency: pm.currency },
      year: { amount: py.unit_amount, currency: py.currency }
    });
  } catch (e) { res.status(200).json({ enabled: false }); }
};
