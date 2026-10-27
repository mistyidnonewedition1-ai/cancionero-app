# ⭐ Activer l’abonnement Premium (Stripe + Vercel)

> **État actuel : MIS EN PAUSE.** Le code est conservé mais l’onglet Premium est masqué et tout est gratuit.
> Pour le réactiver, mets `premium: true` dans `config.js` après avoir fait les étapes ci-dessous.

Tant que ces étapes ne sont pas faites, **tout reste gratuit** et aucune limite n’est appliquée.

## 1. Créer le compte et les prix Stripe
1. Crée un compte sur https://dashboard.stripe.com (commence en **mode test**).
2. **Produits → Ajouter un produit** : « Cancionero · Chansonnier Premium ».
3. Ajoute **deux prix récurrents** : un mensuel et un annuel (tu choisis les montants).
4. Note l’identifiant de chaque prix (il commence par `price_…`).
5. **Paramètres → Facturation → Portail client** : active le portail (pour que les abonnés puissent résilier).

## 2. Variables d’environnement sur Vercel
Projet Vercel → **Settings → Environment Variables**, puis redéploie :

| Nom | Valeur |
|---|---|
| `STRIPE_SECRET_KEY` | clé secrète Stripe (`sk_test_…` puis `sk_live_…`) |
| `STRIPE_PRICE_MONTH` | identifiant du prix mensuel (`price_…`) |
| `STRIPE_PRICE_YEAR` | identifiant du prix annuel (`price_…`) |
| `TOKEN_SECRET` | une longue phrase aléatoire (au moins 32 caractères), gardée secrète |
| `TRIAL_DAYS` | (facultatif) nombre de jours d’essai gratuit, par ex. `7` |
| `SITE_URL` | (facultatif) l’adresse de ton site, par ex. `https://cancionero-app-nu.vercel.app` |

Ne mets **jamais** ces valeurs dans le code ni sur GitHub.

## 3. Tester
- En mode test, paie avec la carte `4242 4242 4242 4242`, une date future et un code quelconque.
- Après le paiement, tu reviens dans l’appli et l’onglet **Premium** affiche « Tu es Premium ».
- Passe en mode live seulement quand tout fonctionne (nouvelle clé `sk_live_…` et nouveaux prix en live).

## Ce que fait le plan gratuit / Premium
- **Gratuit** : 3 chansons, test de niveau, leçons, prononciation, trous, mots, révision, QCM.
- **Premium** : chansons illimitées, thèmes festifs, dictée, remise en ordre, enregistrement vocal, traductions de toute la chanson.
- Pour changer ce partage, modifie les contrôles à la fin de `premium.js` (fonction `init`).

## À savoir
- L’abonnement est lié à l’appareil (il est stocké dans le navigateur) et revérifié à chaque ouverture quand il y a du réseau.
- Les limites sont appliquées côté appli : une personne experte peut les contourner. C’est suffisant pour une appli de ce type, mais ce n’est pas une protection à toute épreuve.
- Dans une appli publiée sur l’App Store, les abonnements numériques passent en général par les achats intégrés d’Apple et non par Stripe (voir les règles en vigueur avant de publier).
- Pense à ajouter des mentions légales, des CGV et une politique de confidentialité avant d’encaisser de l’argent réel.
