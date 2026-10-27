/* Soutien libre · Cancionero (es) & Chansonnier (fr)
   Le lien de don se règle dans config.js (donateUrl). Un don ne débloque aucune fonction. */
(function(){
const T={
es:{tab:'Soutien',title:'💛 Soutenir l’appli',
 intro:'Cancionero est gratuit, sans publicité et sans compte. Si elle t’aide à apprendre, tu peux soutenir le projet : un don est libre, facultatif et ne débloque rien de plus. Tout reste gratuit pour tout le monde.',
 use:'Ton soutien aide à continuer : nouvelles leçons, nouvelles langues, nouvelles fonctions.',
 don:'💛 Faire un don',soon:'Le lien de soutien arrive bientôt. Merci d’y penser !',other:'Autres façons d’aider',
 tip:'Parle de l’appli à un ami qui apprend l’espagnol ou le français : c’est déjà un super coup de pouce.',
 share:'📤 Partager l’appli',copy:'🔗 Copier le lien',copied:'Lien copié !',st:'J’apprends l’espagnol avec des chansons : essaie Cancionero !',
 thanks:'Merci du fond du cœur ! 💛',legal:'Les dons passent par une plateforme externe : ses conditions s’appliquent.'},
fr:{tab:'Apoyo',title:'💛 Apoyar la app',
 intro:'Chansonnier es gratis, sin publicidad y sin cuenta. Si te ayuda a aprender, puedes apoyar el proyecto: una donación es libre, opcional y no desbloquea nada más. Todo sigue siendo gratis para todos.',
 use:'Tu apoyo ayuda a seguir: nuevas lecciones, nuevos idiomas, nuevas funciones.',
 don:'💛 Hacer una donación',soon:'El enlace de apoyo llegará pronto. ¡Gracias por pensarlo!',other:'Otras formas de ayudar',
 tip:'Habla de la app a un amigo que aprenda francés o español: ya es una gran ayuda.',
 share:'📤 Compartir la app',copy:'🔗 Copiar el enlace',copied:'¡Enlace copiado!',st:'Aprendo francés con canciones: ¡prueba Chansonnier!',
 thanks:'¡Muchas gracias de corazón! 💛',legal:'Las donaciones pasan por una plataforma externa: se aplican sus condiciones.'}};
let L='fr';
const E=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const cfg=()=>window.APPCFG||{};
const u=()=>T[L];
function url(){return cfg().donateUrl||''}
function safe(x){return /^https?:\/\//i.test(x)}
function view(){const x=u(),d=url();
 return `<div class="card" style="text-align:center"><div class="big" style="padding:10px">💛</div><b class="ttl">${x.title}</b><p>${x.intro}</p><p class="mu">${x.use}</p>${d&&safe(d)?`<a class="b" style="display:inline-block;text-decoration:none;color:#fff" href="${E(d)}" target="_blank" rel="noopener" onclick="DON.thx()">${x.don}</a><p class="mu" style="margin-top:8px">${x.legal}</p>`:`<p class="mu">${x.soon}</p>`}</div>
<div class="card"><b>${x.other}</b><p class="mu">${x.tip}</p><div class="row"><button class="b g" onclick="DON.share()">${x.share}</button><button class="b g" onclick="DON.copy()">${x.copy}</button></div><div id="donm" class="mu" style="margin-top:6px"></div></div>`}
function thx(){setTimeout(()=>{if(window.mas)window.mas(u().thanks);if(typeof boom==='function')boom(12)},600)}
function link(){return location.origin+'/'}
async function share(){const x=u();
 try{if(navigator.share){await navigator.share({title:document.title,text:x.st,url:link()});return}}catch(e){return}
 copy()}
async function copy(){const x=u(),m=document.getElementById('donm');
 try{await navigator.clipboard.writeText(link());if(m)m.textContent=x.copied}catch(e){if(m)m.textContent=link()}}
function init(lang){L=lang}
window.DON={init,view,thx,share,copy};
})();
