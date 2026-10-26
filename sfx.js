/* Bruitages · Cancionero & Chansonnier : sons synthétisés avec Web Audio (aucun fichier audio) */
(function(){
let AC=null,on=true,last=0;
try{on=localStorage.getItem('sfx')!=='0'}catch(e){}
function ctx(){if(!AC){const C=window.AudioContext||window.webkitAudioContext;if(!C)return null;AC=new C()}if(AC.state==='suspended')AC.resume();return AC}
function tone(f,d,type,v,t0,f2){const c=ctx();if(!c||!on)return;const o=c.createOscillator(),g=c.createGain(),t=c.currentTime+(t0||0);
 o.type=type||'sine';o.frequency.setValueAtTime(f,t);if(f2)o.frequency.exponentialRampToValueAtTime(f2,t+d);
 g.gain.setValueAtTime(0.0001,t);g.gain.exponentialRampToValueAtTime(v||.1,t+.01);g.gain.exponentialRampToValueAtTime(0.0001,t+d);
 o.connect(g);g.connect(c.destination);o.start(t);o.stop(t+d+.03)}
const vib=p=>{try{if(on&&navigator.vibrate)navigator.vibrate(p)}catch(e){}};
const SND={
 click(){tone(720,.05,'sine',.09,0,520);vib(8)},
 tick(){tone(1200,.03,'sine',.06)},
 tab(){tone(520,.07,'triangle',.1);tone(780,.09,'triangle',.1,.06);vib(10)},
 pop(){tone(520,.12,'sine',.13,0,980);vib(12)},
 ok(){[523,659,784].forEach((f,i)=>tone(f,.16,'triangle',.12,i*.07));vib(15)},
 ko(){tone(220,.22,'sawtooth',.08,0,130);vib([30,40,30])},
 win(){[523,659,784,1047,1319].forEach((f,i)=>tone(f,.2,'triangle',.11,i*.08));tone(2093,.3,'sine',.05,.4);vib([20,30,20,30,60])},
 chirp(){tone(900,.07,'sine',.1,0,1500);tone(1300,.08,'sine',.1,.09,1900)},
 rec(){tone(880,.1,'square',.05)},
 sparkle(){[1568,2093,1760,2349,1976].forEach((f,i)=>tone(f,.12,'sine',.06,i*.05))}};
function snd(n){if(!on)return;const t=Date.now();if(n==='click'&&t-last<40)return;last=t;try{SND[n]&&SND[n]()}catch(e){}}
function wrap(name,fn){const o=window[name];if(typeof o==='function')window[name]=function(){const r=o.apply(this,arguments);try{fn.apply(null,arguments)}catch(e){}return r}}
function wrapObj(obj,name,fn){const o=obj&&obj[name];if(typeof o==='function')obj[name]=function(){const r=o.apply(this,arguments);try{fn.apply(null,arguments)}catch(e){}return r}}
function ui(){const r=document.querySelector('header .row');if(!r||document.getElementById('snd'))return;
 const b=document.createElement('button');b.id='snd';b.className='stats';b.title='Sons';b.style.cssText='cursor:pointer;color:#fff;font:inherit;font-size:12px';b.textContent=on?'🔊':'🔇';
 b.onclick=()=>{on=!on;try{localStorage.setItem('sfx',on?'1':'0')}catch(e){}b.textContent=on?'🔊':'🔇';if(on){ctx();snd('pop')}};r.insertBefore(b,r.lastElementChild)}
function init(){
 ui();
 document.addEventListener('pointerdown',e=>{const t=e.target;if(!t||!t.closest)return;ctx();
  if(t.closest('#snd'))return;
  if(t.closest('nav button'))return snd('tab');
  if(t.closest('#mm'))return snd('chirp');
  if(t.closest('.w'))return snd('tick');
  const b=t.closest('button,a.ib,.chips a');if(!b||b.disabled)return;
  if(b.hasAttribute('data-t'))return;
  if(b.matches('[onclick*="EX.rec"]')){if(b.textContent.indexOf('⏹')<0)snd('rec');return}
  snd('click')},true);
 wrap('boom',()=>snd('win'));
 wrap('chk',()=>setTimeout(()=>{if(document.querySelector('.cl input.ko'))snd('ko')},30));
 wrap('rt',(i,r)=>snd(r==='ok'?'ok':r==='ko'?'ko':'click'));
 wrap('ans',k=>{if(!k)snd('ko')});
 wrap('addv',()=>snd('pop'));
 wrap('mas',()=>snd('chirp'));
 wrapObj(window.EX,'pickq',()=>snd(document.querySelector('.kok')?'ko':'ok'));
 wrapObj(window.EX,'dcheck',()=>{if(document.querySelector('#v .ref span[style*="ff5a6e"]'))snd('ko')});
 wrapObj(window.EX,'ocheck',()=>{const r=document.querySelector('#v .ref');if(!r||r.textContent.indexOf('✅')<0)snd('ko')});
 wrapObj(window.TH,'set',()=>snd('sparkle'));
 const d0=window.draw;if(typeof d0==='function')window.draw=function(k){d0(k);try{ui()}catch(e){}}}
window.SFX={init,play:snd};
})();
