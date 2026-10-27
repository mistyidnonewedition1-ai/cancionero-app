// POST /api/status {token} -> renouvelle le jeton si l'abonnement est toujours actif
const L = require('./_lib');
module.exports = async (req, res) => {
  try {
    if (req.method !== 'POST') return res.status(405).json({ error: 'method' });
    const t = L.readToken(L.body(req).token);
    if (!t || !t.sid) return res.status(200).json({ active: false });
    const sub = await L.stripe('/subscriptions/' + t.sid);
    if (!L.isActive(sub)) return res.status(200).json({ active: false });
    res.status(200).json(Object.assign({ active: true }, L.fresh(sub)));
  } catch (e) { res.status(500).json({ error: 'status' }); }
};
