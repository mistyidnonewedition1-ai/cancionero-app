// POST /api/portal {token, lang} -> {url} : portail Stripe pour gérer ou résilier l'abonnement
const L = require('./_lib');
module.exports = async (req, res) => {
  try {
    if (req.method !== 'POST') return res.status(405).json({ error: 'method' });
    const b = L.body(req), t = L.readToken(b.token), lang = b.lang === 'fr' ? 'fr' : 'es';
    if (!t || !t.cid) return res.status(401).json({ error: 'token' });
    const s = await L.stripe('/billing_portal/sessions', 'POST', { customer: t.cid, return_url: `${L.site(req)}/${lang}/` });
    res.status(200).json({ url: s.url });
  } catch (e) { res.status(500).json({ error: 'portal' }); }
};
