/* Abonnement Premium · Cancionero (es) & Chansonnier (fr)
   Paiement par Stripe via les fonctions /api/* (voir PREMIUM_SETUP.md).
   Tant que le serveur n’est pas configuré, tout reste gratuit et aucune limite n’est appliquée.
   MIS EN PAUSE : pour réactiver, mets premium: true dans config.js. */
(function(){
const FREE_SONGS=3;
const ON=!!(window.APPCFG&&window.APPCFG.premium===true);
const T={
es:{loc:'fr-FR',tab:'Premium',title:'Passe à Premium',sub:'Débloque tout l’apprentissage par la musique.',
 ben:['🎵 Chansons illimitées (3 en version gratuite)','🎨 Tous les thèmes festifs, avec la mascotte déguisée','🎧 Dictée et phrases à remettre dans l’ordre','🎤 Enregistrement de ta voix pour t’entraîner','🌐 Traductions de toute la chanson d’un coup'],
 free:'Gratuit',pro:'Premium',rows:[['Chansons','3','∞'],['Test de niveau, leçons, prononciation','✓','✓'],['Trous, mots, révision, QCM','✓','✓'],['Thèmes festifs','—','✓'],['Dictée et remise en ordre','—','✓'],['Enregistrement vocal','—','✓'],['Traduction de toute la chanson','—','✓']],
 month:'Mensuel',year:'Annuel',per:{month:'/ mois',year:'/ an'},save:'Économise',trial:'jours d’essai gratuit',choose:'Choisir',later:'Plus tard',
 legal:'Paiement sécurisé par Stripe. Résiliable à tout moment depuis « Gérer mon abonnement ». L’abonnement est lié à cet appareil.',
 soon:'Le Premium sera bientôt disponible. En attendant, tout est gratuit !',on:'Tu es Premium ⭐',thanks:'Merci de soutenir l’appli !',plan:{month:'Abonnement mensuel',year:'Abonnement annuel'},renews:'Prochaine échéance',ends:'Fin de l’abonnement',manage:'Gérer mon abonnement',
 err:'Paiement indisponible pour l’instant. Réessaie plus tard.',ok:'Bienvenue dans Premium ! ⭐ Merci pour ton soutien !',
 why:{songs:'Tu as atteint la limite de 3 chansons gratuites.',themes:'Les thèmes festifs sont réservés aux membres Premium.',games:'Ce jeu est réservé aux membres Premium.',rec:'L’enregistrement vocal est réservé aux membres Premium.',mt:'Préparer toutes les traductions est réservé aux membres Premium.'}},
fr:{loc:'es-ES',tab:'Premium',title:'Pásate a Premium',sub:'Desbloquea todo el aprendizaje con música.',
 ben:['🎵 Canciones ilimitadas (3 en la versión gratuita)','🎨 Todos los temas festivos, con la mascota disfrazada','🎧 Dictado y frases para ordenar','🎤 Grabación de tu voz para practicar','🌐 Traducción de toda la canción de una vez'],
 free:'Gratis',pro:'Premium',rows:[['Canciones','3','∞'],['Prueba de nivel, lecciones, pronunciación','✓','✓'],['Huecos, palabras, repaso, test','✓','✓'],['Temas festivos','—','✓'],['Dictado y ordenar frases','—','✓'],['Grabación de voz','—','✓'],['Traducción de toda la canción','—','✓']],
 month:'Mensual',year:'Anual',per:{month:'/ mes',year:'/ año'},save:'Ahorra',trial:'días de prueba gratis',choose:'Elegir',later:'Más tarde',
 legal:'Pago seguro con Stripe. Puedes cancelar cuando quieras desde «Gestionar mi suscripción». La suscripción está vinculada a este dispositivo.',
 soon:'Premium estará disponible pronto. ¡Mientras tanto, todo es gratis!',on:'Eres Premium ⭐',thanks:'¡Gracias por apoyar la app!',plan:{month:'Suscripción mensual',year:'Suscripción anual'},renews:'Próximo cobro',ends:'Fin de la suscripción',manage:'Gestionar mi suscripción',
 err:'Pago no disponible por ahora. Inténtalo más tarde.',ok:'¡Bienvenido a Premium! ⭐ ¡Gracias por tu apoyo!',
 why:{songs:'Has alcanzado el límite de 3 canciones gratis.',themes:'Los temas festivos son solo para miembros Premium.',games:'Este juego es solo para miembros Premium.',rec:'La grabación de voz es solo para miembros Premium.',mt:'Preparar todas las traducciones es solo para miembros Premium.'}}};
let L='fr',CFG={enabled:false},P=null;
const K='premium',E=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const u=()=>T[L];
function load(){try{P=JSON.parse(localStorage.getItem(K)||'null')}catch(e){P=null}}
function save(o){P=o;try{o?localStorage.setItem(K,JSON.stringify(o)):localStorage.removeItem(K)}catch(e){}}
const isPro=()=>!!(P&&P.token&&P.exp>Date.now());
const locked=()=>CFG.enabled&&!isPro();
async function api(path,opt){const r=await fetch(path,opt);if(!r.ok)throw new Error('api');return r.json()}
const post=(path,b)=>api(path,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(b)});
const money=p=>{try{return new Intl.NumberFormat(u().loc,{style:'currency',currency:p.currency.toUpperCase()}).format(p.amount/100)}catch(e){return (p.amount/100)+' '+p.currency}};
const saving=()=>Math.max(0,Math.round((1-CFG.year.amount/(CFG.month.amount*12))*100));
function say2(m){if(window.mas)window.mas(m)}
async function buy(plan){try{const j=await post('/api/checkout',{plan,lang:L});if(j.url)location.href=j.url;else throw 0}catch(e){say2(u().err)}}
async function manage(){try{const j=await post('/api/portal',{token:P&&P.token,lang:L});if(j.url)location.href=j.url;else throw 0}catch(e){say2(u().err)}}
async function verify(sid){try{const j=await api('/api/verify?session_id='+encodeURIComponent(sid));save({token:j.token,exp:j.exp,plan:j.plan,renews:j.renews,cancels:j.cancels});
 if(typeof boom==='function')boom(30);setTimeout(()=>say2(u().ok),500);if(typeof draw==='function')draw(true)}catch(e){say2(u().err)}}
async function refresh(){if(!P)return;try{const j=await post('/api/status',{token:P.token});if(j.active)save({token:j.token,exp:j.exp,plan:j.plan,renews:j.renews,cancels:j.cancels});else save(null)}catch(e){}if(typeof draw==='function')draw(true)}
function plans(){const x=u(),tr=CFG.trial>0?`<div class="mu" style="text-align:center">🎁 ${CFG.trial} ${x.trial}</div>`:'';
 return tr+`<div class="plans"><button class="plan" data-p="month" onclick="PREM.buy(this.dataset.p)"><b>${x.month}</b><span class="pr">${money(CFG.month)}</span><span class="mu">${x.per.month}</span></button><button class="plan best" data-p="year" onclick="PREM.buy(this.dataset.p)">${saving()>0?`<i class="sv">${x.save} ${saving()} %</i>`:''}<b>${x.year}</b><span class="pr">${money(CFG.year)}</span><span class="mu">${x.per.year}</span></button></div>`}
function view(){const x=u();
 if(!CFG.enabled)return `<div class="card"><b class="ttl">⭐ ${x.title}</b><p>${x.soon}</p></div>`;
 if(isPro()){const d=P.renews?new Date(P.renews).toLocaleDateString(x.loc,{day:'numeric',month:'long',year:'numeric'}):'';
  return `<div class="card" style="text-align:center"><div class="big" style="padding:10px">⭐</div><b class="ttl">${x.on}</b><p>${x.thanks}</p><p class="mu">${x.plan[P.plan]||''}${d?' · '+(P.cancels?x.ends:x.renews)+' : '+d:''}</p><button class="b" onclick="PREM.manage()">${x.manage}</button></div><div class="card"><b>${x.pro}</b><ul class="pul">${x.ben.map(b=>`<li>${b}</li>`).join('')}</ul></div>`}
 return `<div class="card pwh"><b class="ttl">⭐ ${x.title}</b><p>${x.sub}</p><ul class="pul">${x.ben.map(b=>`<li>${b}</li>`).join('')}</ul>${plans()}<p class="mu" style="margin-top:10px">${x.legal}</p></div>
 <div class="card"><table class="ptb"><tr><th></th><th>${x.free}</th><th>${x.pro}</th></tr>${x.rows.map(r=>`<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join('')}</table></div>`}
function paywall(why){const x=u();closePw();const o=document.createElement('div');o.id='pw';
 o.innerHTML=`<div class="p" role="dialog" aria-modal="true"><div class="top"><b class="ttl">⭐ ${x.title}</b><button class="x" onclick="PREM.close()" aria-label="X">✕</button></div><p>${E(x.why[why]||'')}</p><ul class="pul">${x.ben.map(b=>`<li>${b}</li>`).join('')}</ul>${plans()}<div class="row" style="margin-top:10px;justify-content:space-between"><button class="b g sm" onclick="PREM.close()">${x.later}</button><button class="b g sm" onclick="PREM.close();go('prem')">${x.tab} ›</button></div><p class="mu" style="margin-top:8px">${x.legal}</p></div>`;
 o.addEventListener('click',e=>{if(e.target===o)closePw()});document.body.append(o)}
function closePw(){const o=document.getElementById('pw');if(o)o.remove()}
function wrap(obj,name,gate){const o=obj&&obj[name];if(typeof o!=='function')return;obj[name]=function(){if(locked()){const w=gate.apply(null,arguments);if(w){paywall(w);return}}return o.apply(this,arguments)}}
async function init(lang){if(!ON)return;L=lang;load();
 if(!document.getElementById('premcss')){const s=document.createElement('style');s.id='premcss';s.textContent='#pw{position:fixed;inset:0;z-index:150;background:rgba(5,2,20,.82);display:grid;place-items:center;padding:14px}#pw .p{width:100%;max-width:480px;max-height:100%;overflow:auto;background:linear-gradient(150deg,rgba(255,255,255,.12),rgba(255,255,255,.03)),var(--sf);border:1px solid rgba(255,255,255,.22);border-top:3px solid var(--ac2);border-radius:22px;padding:16px;animation:up .3s}#pw .top{display:flex;justify-content:space-between;align-items:center}#pw .x{border:1px solid rgba(255,255,255,.25);background:rgba(255,255,255,.07);color:var(--tx);border-radius:12px;padding:6px 12px;cursor:pointer}.pul{padding-left:0;list-style:none;margin:8px 0}.pul li{margin:6px 0;font-size:14.5px}.plans{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:10px}.plan{position:relative;display:flex;flex-direction:column;align-items:center;gap:2px;padding:16px 8px 12px;border:2px solid rgba(255,255,255,.2);border-radius:18px;background:rgba(255,255,255,.06);color:var(--tx);font:inherit;cursor:pointer;transition:transform .2s}.plan:hover{transform:translateY(-3px)}.plan.best{border-color:var(--ac2);background:linear-gradient(135deg,color-mix(in srgb,var(--ac) 30%,transparent),color-mix(in srgb,var(--ac2) 22%,transparent))}.plan .pr{font:800 22px Fraunces,Georgia,serif}.sv{position:absolute;top:-10px;background:var(--ac2);color:#2a1300;font-style:normal;font-weight:700;font-size:11px;padding:2px 9px;border-radius:99px}.ptb{width:100%;border-collapse:collapse;font-size:13.5px}.ptb th,.ptb td{padding:8px 4px;border-bottom:1px solid rgba(255,255,255,.12);text-align:center}.ptb td:first-child{text-align:left}.ptb th:last-child,.ptb td:last-child{color:var(--ac2);font-weight:700}';document.head.append(s)}
 wrap(window,'addl',()=>S.songs.filter(s=>s.id!==1).length>=FREE_SONGS?'songs':'');
 wrap(window.TH,'set',id=>id!=='classic'?'themes':'');
 wrap(window.EX,'start',m=>(m==='dic'||m==='ord')?'games':'');
 wrap(window.EX,'rec',()=> 'rec');
 wrap(window,'allmt',()=> 'mt');
 try{CFG=await api('/api/config')}catch(e){CFG={enabled:false}}
 const sid=new URLSearchParams(location.search).get('session_id');
 if(sid){try{history.replaceState(null,'',location.pathname)}catch(e){}if(CFG.enabled)verify(sid)}
 else if(CFG.enabled&&P)refresh();
 if(typeof draw==='function')draw(true)}
window.PREM={init,view,buy,manage,close:closePw,isPro,on:ON};
})();
