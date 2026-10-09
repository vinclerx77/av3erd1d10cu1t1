document.documentElement.classList.add("js");
const URL_PAY="https://syncpaycheckout.com/checkout/a2ec30fc-fa9a-4e4b-b123-6336ccebab8d+a2df9dd4-3301-413e-b426-64df532ec87e";
function payUrl(){try{const u=new URL(URL_PAY);new URLSearchParams(location.search).forEach((v,k)=>{if(/^(utm_|src|sck|ref)/.test(k))u.searchParams.set(k,v)});return u.toString()}catch(e){return URL_PAY}}
document.querySelectorAll('[data-cta]').forEach(a=>{a.href=payUrl();a.addEventListener('click',()=>{(window.dataLayer=window.dataLayer||[]).push({event:'begin_checkout',currency:'BRL'});if(window.fbq)fbq('track','InitiateCheckout')})});
const bar=document.getElementById('bar'),fc=document.getElementById('fcta'),fin=document.querySelector('.checkout'),pi=document.querySelector('.pimg');
function p(){const m=document.documentElement.scrollHeight-innerHeight,r=scrollY/m;bar.style.transform='scaleX('+r+')';fc.classList.toggle('on',r>.1&&fin.getBoundingClientRect().top>innerHeight*.5);if(scrollY<innerHeight)pi.style.translate='0 '+scrollY*.1+'px'}
addEventListener('scroll',p,{passive:true});p();
const io=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.1});
document.querySelectorAll('.rv,.line').forEach(e=>io.observe(e));
setTimeout(()=>document.querySelectorAll('.rv:not(.in),.line:not(.in)').forEach(e=>e.classList.add('in')),4000);

(function(){const ph=document.querySelector('.ph'),rm=matchMedia('(prefers-reduced-motion:reduce)').matches;let man=0,vis=true;
function set(x,y){ph.style.setProperty('--mx',x+'px');ph.style.setProperty('--my',y+'px')}
function pt(e){const r=ph.getBoundingClientRect(),q=e.touches?e.touches[0]:e;set(q.clientX-r.left,q.clientY-r.top);man=performance.now()}
ph.addEventListener('pointermove',pt);ph.addEventListener('touchmove',pt,{passive:true});
new IntersectionObserver(e=>{vis=e[0].isIntersecting}).observe(ph);
function loop(n){if(vis&&n-man>2500){const r=ph.getBoundingClientRect(),k=n/1800;set(r.width*(.5+.3*Math.sin(k)),r.height*(.5+.25*Math.sin(k*1.7+1)))}requestAnimationFrame(loop)}
if(!rm)requestAnimationFrame(loop);else set(ph.clientWidth*.5,ph.clientHeight*.5);
const px=[...document.querySelectorAll('.black,.checkout')];let tk=0;
function par(){tk=0;px.forEach(e=>{const r=e.getBoundingClientRect();e.style.setProperty('--py',r.top+r.height/2-innerHeight/2)})}
addEventListener('scroll',()=>{if(!tk&&!rm){tk=1;requestAnimationFrame(par)}},{passive:true});par();
const cu=new IntersectionObserver(es=>es.forEach(x=>{if(!x.isIntersecting)return;cu.unobserve(x.target);if(rm)return;const el=x.target,to=+el.dataset.count,from=+el.dataset.from||0,suf=el.dataset.suf||'',s0=performance.now();(function f(n){const k=Math.min((n-s0)/1400,1);el.textContent=Math.round(from+(to-from)*(1-Math.pow(1-k,3)))+suf;if(k<1)requestAnimationFrame(f)})(s0)}),{threshold:.6});
document.querySelectorAll('[data-count]').forEach(e=>cu.observe(e))})();
