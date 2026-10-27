/* Design v3 : icônes, barre de navigation basse et menu « Plus » */
(function(){
const IC={songs:'🎵',tr:'✍️',cl:'🧩',voc:'📖',rev:'🔁',pro:'🗣️',les:'🎓',niv:'🎯',thm:'🎨',ju:'🎮',pg:'📈',log:'📜',lg:'📰',prem:'⭐',don:'💛'};
const MAIN=['songs','tr','ju','pg'];
let open=false;
const more=()=>((document.documentElement.lang||'fr').slice(0,2)==='es'?'Más':'Plus');
function build(){
 const nav=document.getElementById('nav');if(!nav||typeof TABS==='undefined')return;
 if(nav.parentNode!==document.body)document.body.append(nav);
 const has=id=>TABS.some(t=>t[0]===id),main=MAIN.filter(has),rest=TABS.filter(t=>main.indexOf(t[0])<0),cur=typeof tab!=='undefined'?tab:'';
 const lab=id=>TABS.find(t=>t[0]===id)[1];
 nav.innerHTML=main.map(id=>'<button data-t="'+id+'" class="'+(cur===id?'on':'')+'" onclick="go(\''+id+'\')">'+lab(id)+'</button>').join('')+
  '<button data-more="1" class="'+(rest.some(t=>t[0]===cur)?'on':'')+'" onclick="SKIN.sheet()"><span class="ni">⋯</span><span>'+more()+'</span></button>';
 let sh=document.getElementById('sheet');if(!sh){sh=document.createElement('div');sh.id='sheet';document.body.append(sh)}
 sh.innerHTML='<div class="sbk" onclick="SKIN.sheet(false)"></div><div class="sp"><div class="sgrab"></div><div class="sgrid">'+
  rest.map(t=>'<button data-t="'+t[0]+'" class="'+(cur===t[0]?'on':'')+'" onclick="SKIN.sheet(false);go(\''+t[0]+'\')">'+t[1]+'</button>').join('')+'</div></div>';
 sh.className=open?'open':''}
window.SKIN={
 init(){
  if(typeof TABS==='undefined')return;
  TABS.forEach(t=>{if(IC[t[0]]&&t[1].indexOf('class="ni"')<0)t[1]='<span class="ni">'+IC[t[0]]+'</span><span>'+t[1]+'</span>'});
  const h0=window.head;if(typeof h0==='function')window.head=function(){h0();try{build()}catch(e){}};
  if(typeof window.head==='function')window.head()},
 sheet(v){open=(v===undefined)?!open:!!v;const s=document.getElementById('sheet');if(s)s.classList.toggle('open',open)}};
})();
