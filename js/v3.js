(()=>{const RM=matchMedia('(prefers-reduced-motion: reduce)').matches,fine=matchMedia('(pointer:fine)').matches;
const sp=document.getElementById('spot');
if(sp&&fine&&!RM)addEventListener('pointermove',e=>{sp.style.transform=`translate(${e.clientX}px,${e.clientY}px)`},{passive:true});
const ph=document.getElementById('h8photo');if(!ph||!fine||RM)return;let down=false,x=0,y=0;
const set=()=>{ph.style.transform=`rotate(${3+(down?x*14:x*4)}deg) perspective(900px) rotateX(${-y*8}deg) rotateY(${x*8}deg)`};
ph.addEventListener('pointermove',e=>{const r=ph.getBoundingClientRect();x=(e.clientX-r.left)/r.width-.5;y=(e.clientY-r.top)/r.height-.5;set()});
ph.addEventListener('pointerdown',()=>{down=true;set()});addEventListener('pointerup',()=>{down=false;set()});
ph.addEventListener('pointerleave',()=>{x=y=0;down=false;ph.style.transform=''})})();
