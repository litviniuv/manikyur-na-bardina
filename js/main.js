(()=>{
const root=document.documentElement,body=document.body;
const RM=matchMedia('(prefers-reduced-motion: reduce)');
root.classList.add('js');
const topEl=document.getElementById('topbar');if(topEl){const setH=()=>root.style.setProperty('--topH',topEl.offsetHeight+'px');setH();if('ResizeObserver' in window)new ResizeObserver(setH).observe(topEl);addEventListener('resize',setH)}
/* ---- menu ---- */
const burger=document.querySelector('.burger'),menu=document.getElementById('menu');
let open=false,savedY=0;
function jumpTo(y){root.style.scrollBehavior='auto';try{scrollTo({top:y,left:0,behavior:'instant'})}catch(e){scrollTo(0,y)}if(Math.abs(scrollY-y)>1){root.scrollTop=y;body.scrollTop=y}}
function releaseBehavior(){requestAnimationFrame(()=>requestAnimationFrame(()=>{root.style.scrollBehavior=''}))}
function lock(){savedY=scrollY;root.style.scrollBehavior='auto';root.classList.add('is-locked');body.style.position='fixed';body.style.top=-savedY+'px';body.style.left='0';body.style.right='0';body.style.width='100%'}
function unlock(){root.style.scrollBehavior='auto';body.style.position='';body.style.top='';body.style.left='';body.style.right='';body.style.width='';root.classList.remove('is-locked');jumpTo(savedY);releaseBehavior()}
function show(){if(!menu)return;open=true;menu.hidden=false;lock();burger.setAttribute('aria-expanded','true');burger.setAttribute('aria-label','Закрыть меню');requestAnimationFrame(()=>menu.classList.add('is-open'))}
function close(focus){if(!open)return;open=false;menu.classList.remove('is-open');menu.hidden=true;burger.setAttribute('aria-expanded','false');burger.setAttribute('aria-label','Открыть меню');unlock();if(focus)burger.focus({preventScroll:true})}
function goTo(hash,fromMenu){const t=document.querySelector(hash);if(!t)return;history.replaceState(null,'',hash);
 requestAnimationFrame(()=>{if(fromMenu&&Math.abs(scrollY-savedY)>2)jumpTo(savedY);const pad=parseFloat(getComputedStyle(root).scrollPaddingTop)||0;const h=t.querySelector('h2')||t;
 const y=Math.max(0,t.getBoundingClientRect().top+scrollY+(parseFloat(getComputedStyle(t).paddingTop)||0)-pad-(innerWidth>=960?32:16));if(RM.matches)jumpTo(y);else scrollTo({top:y,left:0,behavior:'smooth'});
 h.setAttribute('tabindex','-1');h.focus({preventScroll:true})})}
document.querySelectorAll('.nav a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const h=a.getAttribute('href');if(h.length>1&&document.querySelector(h)){e.preventDefault();goTo(h,false)}}));
if(burger&&menu){burger.addEventListener('click',()=>open?close(false):show());
 menu.addEventListener('click',e=>{const a=e.target.closest('a');if(!a)return;const h=a.getAttribute('href');if(h&&h[0]==='#'){e.preventDefault();close(false);goTo(h,true)}else close(false)});
 addEventListener('keydown',e=>{if(e.key==='Escape'&&open)close(true)});
 matchMedia('(min-width: 960px)').addEventListener('change',m=>{if(m.matches)close(false)})}
/* ---- reveal ---- */
const items=[...document.querySelectorAll('[data-reveal]')];
function on(el){el.classList.add('is-in')}
if(RM.matches||!('IntersectionObserver' in window)){items.forEach(on)}else{
 root.classList.add('rv');
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){const t=e.target;(t.matches('[data-reveal]')?[t]:[...t.querySelectorAll('[data-reveal]')]).forEach(on);io.unobserve(t)}}),{threshold:0,rootMargin:'0px 0px -5% 0px'});
 const groups=new Set();items.forEach(el=>{const g=el.closest('.grid34');if(g)groups.add(g);else io.observe(el)});groups.forEach(g=>io.observe(g));
 const sweep=()=>{const h=innerHeight;items.forEach(el=>{if(el.classList.contains('is-in'))return;const r=(el.closest('.grid34')||el).getBoundingClientRect();if(r.top<h&&r.bottom>0)on(el)})};
 ['scroll','hashchange','load','resize'].forEach(ev=>addEventListener(ev,sweep,{passive:true}));setTimeout(sweep,600);setTimeout(()=>items.forEach(on),4000)}
/* ---- map ---- */
const map=document.getElementById('map');
if(map){const b=map.querySelector('.map__btn');b.hidden=false;b.addEventListener('click',()=>{const f=document.createElement('iframe');f.src=map.dataset.mapSrc;f.title=map.dataset.mapTitle;f.loading='lazy';f.allowFullscreen=true;f.referrerPolicy='no-referrer-when-downgrade';map.querySelector('.map__ph').replaceWith(f);map.classList.add('is-loaded')})}
})();
