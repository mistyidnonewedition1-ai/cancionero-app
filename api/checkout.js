// POST /api/checkout {plan:'month'|'year', lang:'es'|'fr'} -> {url} (page de paiement Stripe)
const L = require('./_lib');
module.exports = async (req, res) => {
  try {
    if (req.method !== 'POST') return res.status(405).json({ error: 'method' });
    const b = L.body(req), plan = b.plan === 'year' ? 'year' : 'month', lang = b.lang === 'fr' ? 'fr' : 'es';
    const price = plan === 'year' ? process.env.STRIPE_PRICE_YEAR : process.env.STRIPE_PRICE_MONTH;
    if (!price || !process.env.STRIPE_SECRET_KEY) return res.status(500).json({ error: 'not_configured' });
    const site = L.site(req), trial = parseInt(process.env.TRIAL_DAYS || '0', 10);
    const params = {
      mode: 'subscription',
      line_items: [{ price, quantity: 1 }],
      success_url: `${site}/${lang}/?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${site}/${lang}/`,
      allow_promotion_codes: 'true',
      locale: lang === 'es' ? 'fr' : 'es'
    };
    if (trial > 0) params.subscription_data = { trial_period_days: trial };
    const s = await L.stripe('/checkout/sessions', 'POST', params);
    res.status(200).json({ url: s.url });
  } catch (e) { res.status(500).json({ error: 'checkout' }); }
};
