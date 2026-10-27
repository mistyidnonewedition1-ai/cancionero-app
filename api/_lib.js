// Outils partagés pour les fonctions Vercel (Stripe + jetons signés)
const crypto = require('crypto');

const flat = (o, p = '', out = {}) => {
  Object.keys(o).forEach(k => {
    const key = p ? `${p}[${k}]` : k, v = o[k];
    if (v && typeof v === 'object') flat(v, key, out); else if (v !== undefined) out[key] = String(v);
  });
  return out;
};

async function stripe(path, method = 'GET', body) {
  const r = await fetch('https://api.stripe.com/v1' + path, {
    method,
    headers: { Authorization: 'Bearer ' + process.env.STRIPE_SECRET_KEY, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body ? new URLSearchParams(flat(body)).toString() : undefined
  });
  const j = await r.json();
  if (!r.ok) throw new Error((j.error && j.error.message) || 'stripe');
  return j;
}

const secret = () => process.env.TOKEN_SECRET || '';
const hmac = s => crypto.createHmac('sha256', secret()).update(s).digest('base64url');

function sign(payload) {
  const b = Buffer.from(JSON.stringify(payload)).toString('base64url');
  return b + '.' + hmac(b);
}

function readToken(t) {
  if (!t || typeof t !== 'string' || !secret()) return null;
  const [b, s] = t.split('.');
  if (!b || !s) return null;
  const good = Buffer.from(hmac(b)), got = Buffer.from(s);
  if (good.length !== got.length || !crypto.timingSafeEqual(good, got)) return null;
  try { return JSON.parse(Buffer.from(b, 'base64url').toString()); } catch (e) { return null; }
}

const body = req => (typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {}));
const site = req => process.env.SITE_URL || ('https://' + req.headers.host);
const periodEnd = sub => ((sub.current_period_end || (sub.items && sub.items.data[0] && sub.items.data[0].current_period_end) || 0) * 1000);
const planOf = sub => (sub.items && sub.items.data[0] && sub.items.data[0].price && sub.items.data[0].price.recurring && sub.items.data[0].price.recurring.interval) || 'month';
const isActive = sub => ['active', 'trialing'].includes(sub.status);
const fresh = sub => {
  const exp = Date.now() + 7 * 864e5;
  return { token: sign({ cid: sub.customer, sid: sub.id, plan: planOf(sub), exp }), exp, plan: planOf(sub), renews: periodEnd(sub), cancels: !!sub.cancel_at_period_end };
};

module.exports = { stripe, sign, readToken, body, site, isActive, fresh };
