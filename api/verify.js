// GET /api/verify?session_id=... -> jeton Premium après un paiement réussi
const L = require('./_lib');
module.exports = async (req, res) => {
  try {
    const id = (req.query && req.query.session_id) || new URL(req.url, 'http://x').searchParams.get('session_id');
    if (!id || !/^cs_[A-Za-z0-9_]+$/.test(id)) return res.status(400).json({ error: 'id' });
    const s = await L.stripe('/checkout/sessions/' + id + '?expand[]=subscription');
    const sub = s.subscription;
    if (s.status !== 'complete' || !sub || typeof sub !== 'object' || !L.isActive(sub)) return res.status(402).json({ error: 'not_paid' });
    res.status(200).json(L.fresh(sub));
  } catch (e) { res.status(500).json({ error: 'verify' }); }
};
