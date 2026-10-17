// لمعة للتنظيف – ديمو
(()=>{
const $=(s,c=document)=>c.querySelector(s),$$=(s,c=document)=>[...c.querySelectorAll(s)];
const WA='0000000000'; // ضع رقم واتساب الشركة هنا (صيغة دولية بدون +)
// menu
const burger=$('.burger');
burger&&burger.addEventListener('click',()=>{const o=document.body.classList.toggle('nav-open');burger.setAttribute('aria-expanded',o)});
$$('.nav-links a').forEach(a=>a.addEventListener('click',()=>document.body.classList.remove('nav-open')));
// reveal
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
$$('[data-reveal]').forEach(el=>io.observe(el));
// counters
const fmt=n=>n.toLocaleString('en-US');
const co=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;co.unobserve(e.target);const el=e.target,to=+el.dataset.count,suf=el.dataset.suffix||'',t0=performance.now(),d=1800;
 const step=t=>{const p=Math.min((t-t0)/d,1),v=Math.round(to*(1-Math.pow(1-p,3)));el.textContent=fmt(v)+suf;if(p<1)requestAnimationFrame(step)};requestAnimationFrame(step)}),{threshold:.5});
$$('[data-count]').forEach(el=>co.observe(el));
// video intro
$$('.video-box').forEach(b=>{const v=$('video',b),p=$('.play',b);p&&p.addEventListener('click',()=>{b.classList.add('playing');v.controls=true;v.play()})});
// gallery filter + lightbox
$$('.filters button').forEach(btn=>btn.addEventListener('click',()=>{$$('.filters button').forEach(x=>x.classList.toggle('on',x===btn));const f=btn.dataset.f;$$('.gallery a').forEach(a=>a.classList.toggle('hide',f!=='all'&&a.dataset.cat!==f))}));
const lb=$('.lightbox');
if(lb){$$('.gallery a').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();$('img',lb).src=a.getAttribute('href');$('img',lb).alt=a.querySelector('img').alt;$('p',lb).textContent=a.querySelector('span')?.textContent||'';lb.classList.add('open')}));
 lb.addEventListener('click',e=>{if(e.target===lb||e.target.tagName==='BUTTON')lb.classList.remove('open')});
 document.addEventListener('keydown',e=>{if(e.key==='Escape')lb.classList.remove('open')})}
// before/after
$$('.ba').forEach(b=>{const r=$('input',b);const set=()=>b.style.setProperty('--pos',r.value+'%');r.addEventListener('input',set);set()});
// calculator
const calc=$('#calc');
if(calc){const out=$('#calc-total'),wa=$('#calc-wa');
 const run=()=>{const fd=new FormData(calc);const base=+fd.get('type'),area=+fd.get('area')||0,freq=+fd.get('freq');let extra=0;$$('input[name=extra]:checked',calc).forEach(x=>extra+=+x.value);
  let total=(base+area*2.5+extra)*(1-freq/100);total=Math.round(total/5)*5;out.textContent=fmt(total);
  const tName=calc.type.options[calc.type.selectedIndex].text;
  wa.href=`https://wa.me/${WA}?text=${encodeURIComponent(`مرحباً، أريد حجز: ${tName}، المساحة ${area} م²، السعر التقديري ${total} ر.س`)}`};
 calc.addEventListener('input',run);run();$('#area-val')&&calc.area.addEventListener('input',()=>$('#area-val').textContent=fmt(+calc.area.value));}
// contact form (demo – no backend)
const toast=$('.toast');
$$('form[data-demo]').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();if(!f.reportValidity())return;toast.textContent='شكراً لك! تم استلام طلبك (نسخة تجريبية – لم يتم إرسال أي بيانات).';toast.classList.add('show');f.reset();setTimeout(()=>toast.classList.remove('show'),4200)}));
// to top
const tt=$('.to-top');addEventListener('scroll',()=>tt&&tt.classList.toggle('show',scrollY>600),{passive:true});
tt&&tt.addEventListener('click',()=>scrollTo({top:0}));
$$('[data-year]').forEach(e=>e.textContent=fmt(new Date().getFullYear()));
})();
