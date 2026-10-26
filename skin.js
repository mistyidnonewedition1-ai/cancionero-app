/* Skin vif : icônes de la barre d'onglets */
(function(){
const IC={songs:'🎵',tr:'✍️',cl:'🧩',voc:'📖',rev:'🔁',pro:'🗣️',les:'🎓',niv:'🎯',thm:'🎨',ju:'🎮',pg:'📈',log:'📜',lg:'📰'};
window.SKIN={init(){
 if(typeof TABS==='undefined')return;
 TABS.forEach(t=>{if(IC[t[0]]&&t[1].indexOf('class="ni"')<0)t[1]='<span class="ni">'+IC[t[0]]+'</span><span>'+t[1]+'</span>'});
 if(typeof head==='function')head();
}};
})();
