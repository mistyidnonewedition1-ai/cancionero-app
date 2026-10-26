/* Visite guidée par la mascotte + conseils · Cancionero (Lolo) & Chansonnier (Coco) */
(function(){
const E=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const T={
es:{ui:{skip:'Passer',next:'Suivant',add:'🎵 Ajouter une chanson',test:'🎯 Faire le test',tour:'Revoir la visite guidée',fin:'Je suis là si tu as besoin d’un conseil : touche-moi !'},
steps:[
{t:null,h:'Bienvenue ! 🦜',p:'Je suis Lolo, ta mascotte. Je te fais visiter l’appli en une minute : tu vas apprendre l’espagnol avec de vraies chansons.',s:'¡Hola! Soy Lolo.'},
{t:'songs',h:'🎵 Chansons',p:'Colle un lien YouTube ou Spotify, ou tape « Artiste - Titre ». Je cherche les paroles et tu écoutes la musique sans quitter l’appli.'},
{t:'tr',h:'✍️ Traduire',p:'Touche un mot pour le garder, traduis chaque vers à ta façon, puis compare avec la traduction automatique. Tu peux même t’enregistrer 🎤.'},
{t:'cl',h:'🧩 Trous',p:'Retrouve les mots qui manquent dans les paroles. Le curseur règle la difficulté.'},
{t:'voc',h:'📖 Mots',p:'Tous les mots que tu as gardés, avec leur prononciation 🔊.'},
{t:'rev',h:'🔁 Réviser',p:'Des cartes qui reviennent au bon moment pour que tu retiennes vraiment.'},
{t:'les',h:'🎓 Leçons',p:'De courtes leçons : argot, verbes, faux amis… avec des exemples à écouter.'},
{t:'pro',h:'🗣️ Prononciation',p:'Écoute chaque son, choisis ton accent (Espagne, Mexique…) et entraîne le R roulé.'},
{t:'niv',h:'🎯 Niveau',p:'Un test de 20 questions pour connaître ton niveau, de A1 à C1.'},
{t:'ju',h:'🎮 Jeux',p:'QCM de mots, dictée et phrases à remettre dans l’ordre.'},
{t:'pg',h:'📈 Progrès',p:'Ton objectif du jour, tes points d’expérience et tes badges.'},
{t:'thm',h:'🎨 Thèmes',p:'Noël, Día de Muertos, Halloween… chaque fête change l’ambiance et t’apprend une tradition.'},
{t:'log',h:'📜 Log',p:'Les nouveautés de l’appli et la sauvegarde de tes données.'},
{t:null,h:'C’est parti ! 🚀',p:'Je te conseille de commencer par le test de niveau, ou d’ajouter directement ta première chanson. Touche-moi à tout moment pour un conseil !',s:'¡Vamos a cantar!'}],
hints:{songs:'Ajoute ta première chanson : colle un lien ou tape « Artiste - Titre ». Je m’occupe des paroles !',tr:'Touche un mot pour le garder. Traduis un vers, puis compare avec « Voir la traduction ».',cl:'Écoute la chanson puis complète les trous. Les accents sont facultatifs !',voc:'Ici, tes mots. Touche 🔊 pour les écouter.',rev:'Reviens chaque jour : les cartes arrivent juste avant que tu oublies.',pro:'Choisis ton accent et active « Lent » pour mieux entendre.',les:'Ouvre une leçon, écoute les exemples et coche quand c’est acquis.',ju:'Il te faut 4 mots pour le QCM. La dictée marche avec tes chansons.',pg:'Fixe ton objectif du jour : 5, 10 ou 20 exercices.',thm:'Choisis une fête : tu découvres sa tradition et son vocabulaire.',log:'Tu peux sauvegarder tes données ici.',v4:'Tu as déjà 4 mots ! Essaie le QCM dans l’onglet Jeux 🎮'}},
fr:{ui:{skip:'Saltar',next:'Siguiente',add:'🎵 Añadir canción',test:'🎯 Hacer la prueba',tour:'Repetir la visita guiada',fin:'Estoy aquí si necesitas un consejo: ¡tócame!'},
steps:[
{t:null,h:'¡Bienvenido! 🐓',p:'Soy Coco, tu mascota. Te enseño la app en un minuto: vas a aprender francés con canciones de verdad.',s:'Bonjour, je suis Coco !'},
{t:'songs',h:'🎵 Canciones',p:'Pega un enlace de YouTube o Spotify, o escribe «Artista - Título». Busco la letra y escuchas la música sin salir de la app.'},
{t:'tr',h:'✍️ Traducir',p:'Toca una palabra para guardarla, traduce cada verso a tu manera y compáralo con la traducción automática. También puedes grabarte 🎤.'},
{t:'cl',h:'🧩 Huecos',p:'Encuentra las palabras que faltan en la letra. El deslizador ajusta la dificultad.'},
{t:'voc',h:'📖 Palabras',p:'Todas las palabras que has guardado, con su pronunciación 🔊.'},
{t:'rev',h:'🔁 Repaso',p:'Tarjetas que vuelven en el momento justo para que lo recuerdes de verdad.'},
{t:'pro',h:'🗣️ Pronunciación',p:'Escucha cada sonido, elige tu acento (Francia, Canadá…) y practica la «r» francesa.'},
{t:'les',h:'🎓 Lecciones',p:'Lecciones cortas: argot, verlan, falsos amigos… con ejemplos para escuchar.'},
{t:'niv',h:'🎯 Nivel',p:'Una prueba de 20 preguntas para conocer tu nivel, de A1 a C1.'},
{t:'thm',h:'🎨 Temas',p:'Navidad, Reyes, Chandeleur, 14 de julio… cada fiesta cambia el ambiente y te enseña una tradición.'},
{t:'ju',h:'🎮 Juegos',p:'Test de palabras, dictado y frases para ordenar.'},
{t:'pg',h:'📈 Progreso',p:'Tu objetivo del día, tus puntos de experiencia y tus insignias.'},
{t:'lg',h:'📰 Novedades',p:'Las novedades de la app y la copia de seguridad de tus datos.'},
{t:null,h:'¡Vamos allá! 🚀',p:'Te aconsejo empezar por la prueba de nivel, o añadir directamente tu primera canción. ¡Tócame cuando quieras un consejo!',s:'Allons chanter !'}],
hints:{songs:'Añade tu primera canción: pega un enlace o escribe «Artista - Título». ¡Yo me encargo de la letra!',tr:'Toca una palabra para guardarla. Traduce un verso y compáralo con «Ver traducción».',cl:'Escucha la canción y completa los huecos. ¡Los acentos son opcionales!',voc:'Aquí están tus palabras. Toca 🔊 para escucharlas.',rev:'Vuelve cada día: las tarjetas llegan justo antes de que las olvides.',pro:'Elige tu acento y activa «Lento» para oír mejor.',les:'Abre una lección, escucha los ejemplos y marca cuando la domines.',ju:'Necesitas 4 palabras para el test. El dictado funciona con tus canciones.',pg:'Fija tu objetivo del día: 5, 10 o 20 ejercicios.',thm:'Elige una fiesta: descubrirás su tradición y su vocabulario.',lg:'Aquí puedes guardar una copia de tus datos.',v4:'¡Ya tienes 4 palabras! Prueba el test en la pestaña Juegos 🎮'}}};
let L='fr',idx=0,steps=[],on=false;
const fk=()=>'tour_'+L,ck=()=>'coach_'+L;
function isDone(){try{return localStorage.getItem(fk())==='1'}catch(e){return false}}
function seen(){try{return JSON.parse(localStorage.getItem(ck())||'{}')}catch(e){return{}}}
function mark(o){try{localStorage.setItem(ck(),JSON.stringify(o))}catch(e){}}
function place(btn){const s=document.getElementById('tspot');if(!s)return;
 if(!btn){s.style.cssText='left:50%;top:38%;width:0;height:0';return}
 const r=btn.getBoundingClientRect();s.style.cssText='left:'+(r.left-5)+'px;top:'+(r.top-5)+'px;width:'+(r.width+10)+'px;height:'+(r.height+10)+'px'}
function show(i){idx=i;const s=steps[i],x=T[L].ui;
 if(s.t&&typeof go==='function')go(s.t);
 const bi=TABS.findIndex(t=>t[0]===s.t),btn=s.t?document.querySelectorAll('#nav button')[bi]:null;
 if(btn)btn.scrollIntoView({inline:'center',block:'nearest'});
 setTimeout(()=>place(btn),90);
 const last=i===steps.length-1,tb=document.querySelector('#tcard .tb');if(!tb)return;
 tb.style.animation='none';void tb.offsetHeight;tb.style.animation='';
 tb.innerHTML='<b class="tt">'+E(s.h)+'</b><p class="tp">'+E(s.p)+'</p>'+(s.s?'<button class="ib" onclick="TOUR.say('+i+')">🔊 '+E(s.s)+'</button>':'')+
  '<div class="tdots">'+steps.map((_,k)=>'<i class="'+(k===i?'on':'')+'"></i>').join('')+'</div>'+
  '<div class="trow">'+(last?'<button class="b g sm" onclick="TOUR.end(\'songs\')">'+x.add+'</button><button class="b sm" onclick="TOUR.end(\'niv\')">'+x.test+'</button>':
   '<button class="b g sm" onclick="TOUR.end()">'+x.skip+'</button><span class="row" style="gap:6px">'+(i?'<button class="b g sm" onclick="TOUR.go('+(i-1)+')">‹</button>':'')+'<button class="b sm" onclick="TOUR.go('+(i+1)+')">'+x.next+'</button></span>')+'</div>'}
function start(){if(on)return;steps=T[L].steps.filter(s=>!s.t||TABS.some(x=>x[0]===s.t));idx=0;on=true;
 const mb=document.getElementById('mb');if(mb)mb.hidden=true;
 const svg=document.querySelector('#mm svg'),o=document.createElement('div');o.id='tour';
 o.innerHTML='<div id="tblk"></div><div id="tspot"></div><div id="tcard"><div class="tm">'+(svg?svg.outerHTML:'')+'</div><div class="tb"></div></div>';
 document.body.append(o);show(0)}
function end(dest){const o=document.getElementById('tour');if(o)o.remove();on=false;try{localStorage.setItem(fk(),'1')}catch(e){}
 const d=dest||((typeof S!=='undefined'&&(S.level||S.skip))?'songs':'niv');if(typeof go==='function')go(d);
 if(d==='songs')setTimeout(()=>{const n=document.getElementById('nl');if(n)n.focus()},350);
 if(window.mas)setTimeout(()=>window.mas(T[L].ui.fin),700)}
function hint(t){if(!isDone()||on)return;const h=T[L].hints[t];if(!h)return;const sn=seen();if(sn[t])return;
 if(t==='songs'&&typeof S!=='undefined'&&S.songs.filter(s=>s.lines.length).length>1)return;
 sn[t]=1;mark(sn);setTimeout(()=>{if(!on&&window.mas)window.mas(h)},700)}
function init(lang){L=lang;
 if(!document.getElementById('tourcss')){const s=document.createElement('style');s.id='tourcss';s.textContent='#tblk{position:fixed;inset:0;z-index:200}#tspot{position:fixed;z-index:201;border-radius:16px;pointer-events:none;box-shadow:0 0 0 9999px rgba(6,3,24,.8),0 0 0 3px var(--ac2),0 0 24px 6px color-mix(in srgb,var(--ac2) 60%,transparent);transition:all .35s ease;left:50%;top:38%;width:0;height:0}#tcard{position:fixed;left:10px;right:10px;bottom:calc(10px + env(safe-area-inset-bottom,0px));z-index:202;max-width:560px;margin:0 auto;display:flex;gap:8px;align-items:flex-end}#tcard .tm{width:88px;flex:none;animation:flt 3.4s ease-in-out infinite}#tcard .tm svg{width:100%;height:auto;overflow:visible;filter:drop-shadow(0 8px 12px rgba(0,0,0,.55))}#tcard .eye{transform-box:fill-box;transform-origin:center;animation:blink 5s infinite}#tcard .tb{flex:1;background:linear-gradient(135deg,#fff,#ffe9f4);color:#1a1a2e;border:2px solid var(--ac);border-radius:20px 20px 20px 6px;padding:12px 14px;box-shadow:0 14px 40px -8px #000;animation:pop .3s}#tcard .tt{font:800 18px Fraunces,Georgia,serif;display:block}#tcard .tp{margin:4px 0 8px;font-size:14px;line-height:1.4}#tcard .tb .ib{color:#1a1a2e;border-color:#c8cce0;height:30px;font-size:12.5px;margin:0 0 8px}#tcard .tb button.b.g{color:#1a1a2e;border-color:#c8cce0;background:transparent}.tdots{display:flex;gap:4px;margin-bottom:10px}.tdots i{width:7px;height:7px;border-radius:50%;background:#d9d2ef}.tdots i.on{background:var(--ac);width:18px;border-radius:4px}.trow{display:flex;gap:8px;justify-content:space-between;align-items:center;flex-wrap:wrap}';document.head.append(s)}
 const r=document.querySelector('header .row');
 if(r&&!document.getElementById('tourbtn')){const b=document.createElement('button');b.id='tourbtn';b.className='stats';b.title=T[L].ui.tour;b.style.cssText='cursor:pointer;color:#fff;font:inherit;font-size:12px';b.textContent='🧭';b.onclick=start;r.insertBefore(b,r.lastElementChild)}
 const g0=window.go;if(typeof g0==='function')window.go=function(t){const x=g0.apply(this,arguments);try{if(!on)hint(t)}catch(e){}return x};
 const a0=window.addv;if(typeof a0==='function')window.addv=function(){const x=a0.apply(this,arguments);try{if(typeof S!=='undefined'&&S.vocab.length===4&&isDone()){const sn=seen();if(!sn.v4){sn.v4=1;mark(sn);setTimeout(()=>{if(window.mas)window.mas(T[L].hints.v4)},900)}}}catch(e){}return x};
 if(!isDone())setTimeout(start,2700)}
window.TOUR={init,start,end,go:show,say:i=>{if(typeof say==='function')say(steps[i].s)}};
})();
