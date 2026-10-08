const bar=document.getElementById('bar');
function p(){const h=document.documentElement,m=h.scrollHeight-innerHeight;bar.style.transform='scaleX('+(m>0?scrollY/m:0)+')';
}
addEventListener('scroll',p,{passive:true});p();
if(!('IntersectionObserver' in window)){document.querySelectorAll('.rv').forEach(e=>e.classList.add('in'))}
const io=window.IntersectionObserver?new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}}),{threshold:.05}):{observe(){}};
document.querySelectorAll('.rv').forEach(e=>io.observe(e));
setTimeout(()=>{document.querySelectorAll('.rv').forEach(e=>{const r=e.getBoundingClientRect();if(r.top<innerHeight)e.classList.add('in')})},2500);
/* ===== CONFIGURE AQUI ===== */
const CFG={
 url:"https://syncpaycheckout.com/checkout/a2ec30fc-fa9a-4e4b-b123-6336ccebab8d+a2df9dd4-3301-413e-b426-64df532ec87e",   // Hotmart, Kiwify, Stripe, Mercado Pago, etc.
 name: "A Verdade Oculta",
 price:"A Verdade Oculta.",            // preço atual, ex.: 27.90
 priceFrom:0,        // preço "de" (opcional; 0 oculta). Só use se for o preço real anterior.
 installments:0,     // ex.: 12 (0 oculta). Use o número que o seu processador realmente oferece.
 interestFree:false, // true escreve "sem juros"
 offerEnd:"",        // ex.: "2026-10-31T23:59:00-03:00" (vazio = sem contagem)
 guaranteeDays:7,    // 0 oculta
 methods:["Pix","Cartão","Boleto"]
};
/* ========================== */
const $=s=>document.querySelector(s),F=k=>$('[data-f="'+k+'"]');
const brl=n=>n.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
F('name').textContent=CFG.name;document.querySelector('.cover b').textContent=CFG.name;
if(CFG.price>0){F('price').textContent=brl(CFG.price);
 if(CFG.priceFrom>CFG.price){F('from').hidden=false;F('from').querySelector('s').textContent=brl(CFG.priceFrom)}
 if(CFG.installments>1){F('inst').hidden=false;F('inst').textContent='ou '+CFG.installments+'x de '+brl(CFG.price/CFG.installments)+(CFG.interestFree?' sem juros':'')}
 document.querySelectorAll('.offer .price').forEach(e=>e.textContent=brl(CFG.price));
 F('sticky').textContent='Comprar por '+brl(CFG.price)+' →'}
F('meth').innerHTML=CFG.methods.map(m=>'<li>'+m+'</li>').join('');
/* link de pagamento: repassa UTMs e rastreia o clique */
function payUrl(){try{const u=new URL(CFG.url);new URLSearchParams(location.search).forEach((v,k)=>{if(/^(utm_|src|sck|ref)/.test(k))u.searchParams.set(k,v)});return u.toString()}catch(e){return CFG.url}}
const pay=$('#pay');pay.href=CFG.url;
pay.addEventListener('click',e=>{if(!/^https?:/.test(CFG.url)){e.preventDefault();alert('Configure o link de pagamento em CFG.url.');return}
 e.preventDefault();pay.classList.add('load');pay.textContent='Abrindo pagamento seguro…';
 (window.dataLayer=window.dataLayer||[]).push({event:'begin_checkout',value:CFG.price,currency:'BRL'});
 if(window.fbq)fbq('track','InitiateCheckout');
 const go=payUrl();setTimeout(()=>{location.href=go},250);setTimeout(()=>{pay.classList.remove('load');pay.textContent='Comprar agora'},4000)});
/* contagem regressiva real (só aparece se offerEnd estiver no futuro) */
(function(){const el=F('left'),end=Date.parse(CFG.offerEnd);if(!end)return;
 function t(){const d=end-Date.now();if(d<=0){el.classList.remove('on');return clearInterval(i)}
  const h=Math.floor(d/36e5),m=Math.floor(d%36e5/6e4),s=Math.floor(d%6e4/1e3);
  el.innerHTML='Oferta termina em <b>'+(h>=48?Math.floor(h/24)+' dias '+h%24+'h':String(h).padStart(2,'0')+':'+String(m).padStart(2,'0')+':'+String(s).padStart(2,'0'))+'</b>';el.classList.add('on')}
 const i=setInterval(t,1000);t()})();
document.querySelector('.fbg').style.backgroundImage='url('+document.querySelector('.hero-img').src+')';
const fc=document.getElementById('fcta'),fin=document.querySelector('.checkout'),hi=document.querySelector('.hero-img');
function q(){const m=document.documentElement.scrollHeight-innerHeight,r=scrollY/m;const f=fin.getBoundingClientRect().top<innerHeight*.5;fc.classList.toggle('on',r>.22&&!f);
if(!matchMedia('(prefers-reduced-motion:reduce)').matches&&scrollY<innerHeight)hi.style.transform='translateY('+scrollY*.06+'px)'}
addEventListener('scroll',q,{passive:true});q();
