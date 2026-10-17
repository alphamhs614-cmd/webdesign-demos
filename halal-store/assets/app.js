(()=>{
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const money=n=>'$'+n.toFixed(2);
// catalogue (placeholder data – in Shopify this comes from collections)
const P=[
 {id:'ribeye',n:'Bone-in Ribeye Steak',c:'beef',w:1.5,p:32.99,img:'ribeye.jpg',best:1,r:4.9,rc:412,unit:'2 steaks · ~1.5 lb'},
 {id:'brisket',n:'Grass-fed Beef Brisket',c:'beef',w:3,p:41.50,img:'brisket.jpg',best:0,r:4.8,rc:188,unit:'~3 lb'},
 {id:'roast',n:'Beef Chuck Roast',c:'beef',w:2.5,p:28.00,img:'beef-roast.jpg',best:1,r:4.9,rc:265,unit:'~2.5 lb'},
 {id:'kofta',n:'Ground Beef 85/15',c:'beef',w:1,p:9.49,img:'kofta.jpg',best:1,r:4.8,rc:530,unit:'1 lb pack'},
 {id:'lamb',n:'Lamb Shoulder Steaks',c:'lamb',w:1.5,p:24.99,img:'lamb.jpg',best:1,r:4.9,rc:301,unit:'4 steaks · ~1.5 lb'},
 {id:'lambleg',n:'Leg of Lamb, Bone-in',c:'lamb',w:4,p:58.00,img:'beef-roast.jpg',best:0,r:4.7,rc:97,unit:'~4 lb'},
 {id:'chicken',n:'Whole Free-range Chicken',c:'poultry',w:3.5,p:17.99,img:'chicken.jpg',best:1,r:4.8,rc:640,unit:'~3.5 lb'},
 {id:'thighs',n:'Boneless Chicken Thighs',c:'poultry',w:2,p:14.50,img:'blog1.jpg',best:0,r:4.9,rc:350,unit:'2 lb pack'},
 {id:'spices',n:'Butcher\'s Spice Set',c:'grocery',w:.5,p:16.00,img:'spices.jpg',best:0,r:4.7,rc:120,unit:'6 blends'},
 {id:'rice',n:'Aged Basmati Rice',c:'grocery',w:4,p:12.99,img:'rice.jpg',best:0,r:4.8,rc:210,unit:'4 lb bag'},
 {id:'oil',n:'Cold-pressed Olive Oil',c:'grocery',w:1,p:18.50,img:'oil.jpg',best:0,r:4.9,rc:144,unit:'750 ml'},
 {id:'bread',n:'Stone-baked Sourdough',c:'grocery',w:1,p:7.50,img:'bread.jpg',best:0,r:4.6,rc:76,unit:'1 loaf'}];
const byId=Object.fromEntries(P.map(p=>[p.id,p]));
// grid
let cat='all',sort='feat';
function renderGrid(){let list=P.filter(p=>cat==='all'||(cat==='best'?p.best:p.c===cat));
 if(sort==='low')list=[...list].sort((a,b)=>a.p-b.p);if(sort==='high')list=[...list].sort((a,b)=>b.p-a.p);
 $('#products').innerHTML=list.map(p=>`<article class="product"><div class="pic"><img src="assets/img/${p.img}" alt="${p.n}" loading="lazy">${p.best?'<span class="badge">Best seller</span>':''}${p.c!=='grocery'?'<span class="badge halal">Halal</span>':''}</div><div class="info"><h3>${p.n}</h3><span class="meta">${p.unit}</span><span class="stars">★★★★★ <span class="meta">${p.r} (${p.rc})</span></span><div class="buy"><span class="price">${money(p.p)}</span><button class="add" data-add="${p.id}">Add to cart</button></div></div></article>`).join('')}
$$('.chips button').forEach(b=>b.addEventListener('click',()=>{cat=b.dataset.cat;$$('.chips button').forEach(x=>x.classList.toggle('on',x===b));renderGrid()}));
$('#sort').addEventListener('change',e=>{sort=e.target.value;renderGrid()});
$$('[data-goto]').forEach(a=>a.addEventListener('click',()=>{const b=$(`.chips button[data-cat="${a.dataset.goto}"]`);b&&b.click()}));
renderGrid();
// cart
let cart=JSON.parse(localStorage.getItem('hc-cart')||'[]');
const save=()=>localStorage.setItem('hc-cart',JSON.stringify(cart));
function renderCart(){const n=cart.reduce((s,l)=>s+l.q,0),sub=cart.reduce((s,l)=>s+l.q*l.p,0);
 const c=$('#cart-count');c.textContent=n;c.classList.remove('bump');void c.offsetWidth;c.classList.add('bump');
 $('#cart-sub').textContent=money(sub);const left=149-sub;
 $('#ship-msg').textContent=left>0?`Add ${money(left)} for free cold-packed shipping`:'🎉 You\'ve unlocked free shipping!';
 $('#ship-bar').style.width=Math.min(100,sub/149*100)+'%';
 $('#cart-lines').innerHTML=cart.length?cart.map((l,i)=>`<li class="cl"><img src="assets/img/${l.img}" alt=""><div><h4>${l.n}</h4><small>${l.d||''}</small><div class="qty" style="width:max-content;margin-top:.3rem"><button data-dec="${i}" aria-label="Decrease">−</button><span>${l.q}</span><button data-inc="${i}" aria-label="Increase">+</button></div></div><div style="text-align:right"><b>${money(l.p*l.q)}</b><br><button class="rm" data-rm="${i}">Remove</button></div></li>`).join(''):'<li class="empty">Your cart is empty.<br>Start with a <a class="link" href="#box">custom box</a>.</li>';
 $('#checkout').disabled=!cart.length;save()}
function add(item){const ex=cart.find(l=>l.key===item.key);ex?ex.q++:cart.push({...item,q:1});renderCart();openCart()}
document.addEventListener('click',e=>{const t=e.target.closest('[data-add],[data-inc],[data-dec],[data-rm]');if(!t)return;
 if(t.dataset.add){const p=byId[t.dataset.add];add({key:p.id,n:p.n,p:p.p,img:p.img,d:p.unit})}
 if(t.dataset.inc){cart[+t.dataset.inc].q++;renderCart()}
 if(t.dataset.dec){const l=cart[+t.dataset.dec];l.q--;if(l.q<1)cart.splice(+t.dataset.dec,1);renderCart()}
 if(t.dataset.rm){cart.splice(+t.dataset.rm,1);renderCart()}});
const openCart=()=>{document.body.classList.add('cart-open');$('#drawer').setAttribute('aria-hidden','false')};
const closeAll=()=>{document.body.classList.remove('cart-open','menu-open');$('#drawer').setAttribute('aria-hidden','true');$('.menu-btn').setAttribute('aria-expanded','false')};
$('.cart-btn').addEventListener('click',openCart);$('.close').addEventListener('click',closeAll);$('#overlay').addEventListener('click',closeAll);
document.addEventListener('keydown',e=>e.key==='Escape'&&closeAll());
$('.menu-btn').addEventListener('click',()=>{document.body.classList.add('menu-open');$('.menu-btn').setAttribute('aria-expanded','true')});
$$('#mnav a').forEach(a=>a.addEventListener('click',closeAll));
const toast=m=>{const t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>t.classList.remove('show'),3800)};
$('#checkout').addEventListener('click',()=>toast('Concept demo – on the live store this opens Shopify\'s secure checkout.'));
$('#news').addEventListener('submit',e=>{e.preventDefault();if(!e.target.reportValidity())return;toast('Thanks! (Demo – no email was stored.)');e.target.reset()});
renderCart();
// Build Your Box
const BOX=['ribeye','roast','kofta','lamb','chicken','thighs','brisket','lambleg'].map(id=>byId[id]);
const bq={};
function boxState(){const cap=+$('input[name=size]:checked').value;let w=0,price=0;BOX.forEach(p=>{const q=bq[p.id]||0;w+=q*p.w;price+=q*p.p});return{cap,w,price}}
function renderBox(){const {cap,w,price}=boxState();
 $('#box-items').innerHTML=BOX.map(p=>{const q=bq[p.id]||0;return `<div class="bi${q?' has':''}"><img src="assets/img/${p.img}" alt="${p.n}" loading="lazy"><div><h4>${p.n}</h4><small>${p.w} lb · ${money(p.p)}</small></div><div class="qty"><button data-bdec="${p.id}" aria-label="Remove one ${p.n}" ${q?'':'disabled'}>−</button><span>${q}</span><button data-binc="${p.id}" aria-label="Add one ${p.n}" ${w+p.w>cap?'disabled':''}>+</button></div></div>`}).join('');
 const sub=$('input[name=plan]:checked').value==='sub',disc=price*.9;
 $('#box-cap').textContent=cap;$('#box-weight').textContent=w.toFixed(1);
 const bar=$('#box-bar');bar.style.width=Math.min(100,w/cap*100)+'%';
 $('#price-once').textContent=money(price);$('#price-sub').textContent=money(disc);
 $('#box-total').textContent=money(sub?disc:price);$('#freq-wrap').hidden=!sub;
 const lines=BOX.filter(p=>bq[p.id]).map(p=>`<li><span>${bq[p.id]} × ${p.n}</span><span>${money(bq[p.id]*p.p)}</span></li>`);
 $('#box-lines').innerHTML=lines.length?lines.join(''):'<li class="muted">Your box is empty – add a few cuts.</li>';
 const min=cap*.6;const btn=$('#add-box');btn.disabled=w<min;
 btn.textContent=w<min?`Add ${(min-w).toFixed(1)} lb more to complete`:'Add box to cart'}
document.addEventListener('click',e=>{const t=e.target.closest('[data-binc],[data-bdec]');if(!t)return;
 if(t.dataset.binc){bq[t.dataset.binc]=(bq[t.dataset.binc]||0)+1}else{bq[t.dataset.bdec]=Math.max(0,(bq[t.dataset.bdec]||0)-1)}renderBox()});
$$('input[name=size]').forEach(r=>r.addEventListener('change',()=>{const {cap}=boxState();// trim if over capacity
 for(const p of [...BOX].reverse()){while(boxState().w>cap&&bq[p.id]>0)bq[p.id]--}renderBox()}));
$$('input[name=plan]').forEach(r=>r.addEventListener('change',renderBox));
$('#add-box').addEventListener('click',()=>{const {cap,w,price}=boxState();const sub=$('input[name=plan]:checked').value==='sub';
 const items=BOX.filter(p=>bq[p.id]).map(p=>`${bq[p.id]}× ${p.n}`).join(', ');
 add({key:'box-'+Date.now(),n:`Custom ${cap} lb Box${sub?' (Subscription)':''}`,p:sub?price*.9:price,img:'hero.jpg',d:(sub?`Every ${$('#freq').value} · save 10% · `:'')+`${w.toFixed(1)} lb: ${items}`});
 Object.keys(bq).forEach(k=>bq[k]=0);renderBox()});
// starter suggestion
bq.ribeye=1;bq.kofta=2;bq.chicken=1;renderBox();
$('#yr').textContent=new Date().getFullYear();
})();
