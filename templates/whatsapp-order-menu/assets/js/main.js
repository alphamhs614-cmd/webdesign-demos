/* WhatsApp Order Menu – app logic. All content comes from config.js / config-ar.js. */
(() => {
const C = CONFIG, T = C.TEXT, $ = id => document.getElementById(id);
const money = v => { const n = (Math.round(v * 100) / 100).toString(); return C.CURRENCY_BEFORE ? C.CURRENCY + n : n + ' ' + C.CURRENCY };
const ICONS = {
  drink: '<svg viewBox="0 0 60 60"><path d="M18 14h24l-3 38H21z" fill="#ffb703"/><rect x="16" y="10" width="28" height="6" rx="2" fill="#fff7ee"/><path d="M33 4l-2 10" stroke="#e63946" stroke-width="3"/></svg>',
  fries: '<svg viewBox="0 0 60 60"><g fill="#ffcc33"><rect x="18" y="6" width="5" height="30" rx="2"/><rect x="25" y="4" width="5" height="32" rx="2"/><rect x="32" y="7" width="5" height="29" rx="2"/><rect x="39" y="9" width="5" height="27" rx="2"/></g><path d="M14 26h34l-4 28H18z" fill="#e63946"/></svg>',
  burger: '<svg viewBox="0 0 60 60"><path d="M8 26Q30 2 52 26Z" fill="#e9a23b"/><rect x="7" y="28" width="46" height="5" rx="2" fill="#7ac74f"/><rect x="8" y="33" width="44" height="8" rx="4" fill="#5a2e1a"/><path d="M8 43h44q0 10-22 10T8 43z" fill="#e0952f"/></svg>' };

// static texts
document.title = C.NAME + ' – ' + T.add;
$('brand').innerHTML = C.NAME.replace('.', '<span>.</span>');
$('open').textContent = T.open; $('h1').innerHTML = T.title; $('sub').textContent = T.sub;
$('info').innerHTML = T.info.map(i => `<span>${i}</span>`).join(''); $('foot').textContent = '© ' + new Date().getFullYear() + ' ' + C.NAME + ' · ' + T.footer;
$('cartLbl').textContent = T.cart; $('itemsLbl').textContent = T.items;

// menu
const ALL = []; C.CATEGORIES.forEach((c, ci) => c.items.forEach(x => { x.ci = ci; ALL.push(x) }));
$('cats').innerHTML = C.CATEGORIES.map((c, i) => `<button class="cat ${i ? '' : 'on'}" data-c="${i}">${c.name}</button>`).join('');
$('menu').innerHTML = C.CATEGORIES.map((c, ci) => `<section id="c-${ci}" data-c="${ci}"><h2>${c.name} <small>${c.sub || ''}</small></h2><div class="grid">${c.items.map(x =>
  `<div class="item" data-i="${ALL.indexOf(x)}"><div class="pic">${ICONS[c.icon] || ICONS.burger}</div><div style="flex:1"><h3>${x.n}${x.hot ? `<span class="hot">${T.popular}</span>` : ''}</h3><p>${x.d}</p><div class="row"><span class="pr">${money(x.p)}</span><button class="plus" aria-label="${T.add}">+</button></div></div></div>`).join('')}</div></section>`).join('');
$('menu').addEventListener('click', e => { const it = e.target.closest('.item'); if (it) pick(+it.dataset.i) });

let cart = [], cur = null, q = 1, mode = 'delivery';
const sin = $('sin');
function pick(i){ cur = ALL[i]; q = 1; const cat = C.CATEGORIES[cur.ci], S = cat.sizes || [], A = cat.extras || [];
  sin.innerHTML = `<h3 style="font-size:1.4rem">${cur.n}</h3><p style="color:var(--mut)">${cur.d}</p>`
  + (S.length ? `<div class="grp"><h4>${T.size}</h4>${S.map((s, j) => `<label class="op"><span><input type="radio" name="sz" value="${j}" ${j ? '' : 'checked'}>${s[0]}</span><span>${s[1] ? '+' + money(s[1]) : ''}</span></label>`).join('')}</div>` : '')
  + (A.length ? `<div class="grp"><h4>${T.extras}</h4>${A.map((a, j) => `<label class="op"><span><input type="checkbox" name="ad" value="${j}">${a[0]}</span><span>${a[1] ? '+' + money(a[1]) : ''}</span></label>`).join('')}</div>` : '')
  + `<div class="grp"><h4>${T.note}</h4><input class="fld" id="note" placeholder="${T.notePh}"></div><div class="qty"><button data-q="-1">−</button><b id="qv">1</b><button data-q="1">+</button></div><button class="big" id="addBtn">${T.add} · <span id="pt"></span></button>`;
  sin.querySelectorAll('input').forEach(e => e.onchange = tot);
  sin.querySelectorAll('[data-q]').forEach(b => b.onclick = () => { q = Math.max(1, q + +b.dataset.q); $('qv').textContent = q; tot() });
  $('addBtn').onclick = addC; tot(); openS() }
function sel(){ const cat = C.CATEGORIES[cur.ci], sz = sin.querySelector('[name=sz]:checked');
  return { sz: sz ? cat.sizes[sz.value] : null, ad: [...sin.querySelectorAll('[name=ad]:checked')].map(e => cat.extras[e.value]) } }
function unit(){ const s = sel(); return cur.p + (s.sz ? s.sz[1] : 0) + s.ad.reduce((a, b) => a + b[1], 0) }
function tot(){ $('pt').textContent = money(unit() * q) }
function addC(){ const s = sel(); cart.push({ n: cur.n, q, u: unit(), opt: [s.sz && s.sz[1] ? s.sz[0] : '', ...s.ad.map(a => a[0])].filter(Boolean).join(', '), note: $('note').value });
  closeS(); upd(); gsap.fromTo('#bar button', { scale: 1.06 }, { scale: 1, duration: .4 }) }
function upd(){ const n = cart.reduce((a, b) => a + b.q, 0), t = cart.reduce((a, b) => a + b.q * b.u, 0); $('cn').textContent = n; $('ct').textContent = money(t); $('bar').classList.toggle('on', n > 0) }
function msg(){ const t = cart.reduce((a, b) => a + b.q * b.u, 0), name = ($('nm') || {}).value || '', addr = ($('ad') || {}).value || '';
  return `${T.newOrder} – ${C.NAME}\n` + cart.map(c => `• ${c.q}× ${c.n}${c.opt ? ' (' + c.opt + ')' : ''}${c.note ? ' – ' + c.note : ''} = ${money(c.q * c.u)}`).join('\n')
   + `\n\n${T.total}: ${money(t)}\n${T.method}: ${mode === 'delivery' ? T.delivery : T.pickup}\n${T.nameL}: ${name}\n${mode === 'delivery' ? T.addrL + ': ' + addr : ''}` }
function openCart(){ sin.innerHTML = `<h3 style="font-size:1.4rem">${T.yourCart}</h3>` + cart.map((c, i) => `<div class="line"><div><b>${c.q}× ${c.n}</b><small>${c.opt || ''} ${c.note || ''}</small></div><div>${money(c.q * c.u)} <button class="plus" style="width:28px;height:28px;font-size:.9rem;background:var(--line);color:var(--ink)" data-rm="${i}">✕</button></div></div>`).join('')
  + `<div class="seg"><button data-m="delivery" class="${mode === 'delivery' ? 'on' : ''}">🛵 ${T.delivery}</button><button data-m="pickup" class="${mode === 'pickup' ? 'on' : ''}">🏃 ${T.pickup}</button></div>`
  + `<input class="fld" id="nm" placeholder="${T.name}">` + (mode === 'delivery' ? `<input class="fld" id="ad" placeholder="${T.address}">` : '')
  + `<h4 style="margin-top:.8rem">${T.preview}</h4><pre id="pv"></pre><button class="big wa" id="sendBtn">${T.send}</button>`;
  sin.querySelectorAll('[data-rm]').forEach(b => b.onclick = () => { cart.splice(+b.dataset.rm, 1); upd(); cart.length ? openCart() : closeS() });
  sin.querySelectorAll('[data-m]').forEach(b => b.onclick = () => { mode = b.dataset.m; openCart() });
  sin.querySelectorAll('.fld').forEach(f => f.oninput = () => $('pv').textContent = msg());
  $('sendBtn').onclick = () => window.open('https://wa.me/' + C.WHATSAPP + '?text=' + encodeURIComponent(msg()), '_blank');
  $('pv').textContent = msg(); openS() }
function openS(){ $('sheet').classList.add('on'); $('shade').classList.add('on'); $('sheet').scrollTop = 0 }
function closeS(){ $('sheet').classList.remove('on'); $('shade').classList.remove('on') }
$('shade').onclick = closeS; $('bar').querySelector('button').onclick = openCart;

// animation + smooth scroll
gsap.registerPlugin(ScrollTrigger); const lenis = new Lenis(); lenis.on('scroll', ScrollTrigger.update); gsap.ticker.add(t => lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0);
$('cats').onclick = e => { const b = e.target.closest('.cat'); if (b) lenis.scrollTo('#c-' + b.dataset.c, { offset: -70 }) };
document.querySelectorAll('main section').forEach(s => ScrollTrigger.create({ trigger: s, start: 'top 120', end: 'bottom 120', onToggle: st => { if (st.isActive) document.querySelectorAll('.cat').forEach(b => b.classList.toggle('on', b.dataset.c == s.dataset.c)) } }));
gsap.from('.rv', { y: 30, opacity: 0, stagger: .1, duration: .8, ease: 'power3.out' });
gsap.from('#bg .l1,#bg .l2,#bg .l3,#bg .l4,#bg .l5,#bg .l6', { y: -220, opacity: 0, stagger: { each: .12, from: 'end' }, duration: .7, ease: 'bounce.out', delay: .2 });
gsap.to('#bg', { y: -10, repeat: -1, yoyo: true, duration: 2, ease: 'sine.inOut', delay: 1.6 });
gsap.utils.toArray('.item').forEach(el => gsap.from(el, { scrollTrigger: { trigger: el, start: 'top 92%' }, y: 30, opacity: 0, duration: .5 }));
})();
