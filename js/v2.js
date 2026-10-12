(()=>{const root=document.documentElement,RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
requestAnimationFrame(()=>requestAnimationFrame(()=>root.classList.add('ready')));
const ph=document.querySelector('#h9photo img');
if(ph&&matchMedia('(pointer:fine)').matches&&!RM){addEventListener('pointermove',e=>{const x=e.clientX/innerWidth-.5,y=e.clientY/innerHeight-.5;ph.style.transform=`rotateY(${x*6}deg) rotateX(${-y*6}deg)`},{passive:true})}
const c=document.getElementById('dust');if(!c||RM)return;const g=c.getContext('2d');let W,H,ds=[],mx=0,my=0;
function rs(){W=c.width=innerWidth*devicePixelRatio;H=c.height=innerHeight*devicePixelRatio}rs();addEventListener('resize',rs);
for(let i=0;i<28;i++)ds.push({x:Math.random(),y:Math.random(),r:.6+Math.random()*1.6,v:.00015+Math.random()*.0004,a:.15+Math.random()*.35});
addEventListener('pointermove',e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5},{passive:true});
(function f(){g.clearRect(0,0,W,H);for(const d of ds){d.y-=d.v;if(d.y<-.02){d.y=1.02;d.x=Math.random()}g.beginPath();g.arc((d.x+mx*.02)*W,(d.y+my*.02)*H,d.r*devicePixelRatio,0,7);g.fillStyle=`rgba(241,226,190,${d.a})`;g.fill()}requestAnimationFrame(f)})()})();
