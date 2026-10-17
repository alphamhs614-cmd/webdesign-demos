/* Bistro Elegance – interactions (GSAP + Lenis). You normally don't need to edit this file. */
const lenis = new Lenis({ lerp: .1 });
function raf(t){ lenis.raf(t); requestAnimationFrame(raf) } requestAnimationFrame(raf);
gsap.registerPlugin(ScrollTrigger); lenis.on('scroll', ScrollTrigger.update);
document.getElementById('yr').textContent = new Date().getFullYear();

// reveal on scroll
document.querySelectorAll('.rv').forEach(el => gsap.from(el, { y: 36, opacity: 0, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' } }));

// mobile menu
document.querySelector('.menu-btn').addEventListener('click', () => document.body.classList.toggle('nav-open'));

function toast(msg){ const t = document.createElement('div'); t.className = 'toast'; t.textContent = msg; document.body.appendChild(t);
  gsap.fromTo(t, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: .4 }); setTimeout(() => gsap.to(t, { opacity: 0, duration: .4, onComplete: () => t.remove() }), 3200) }

// menu tabs
const tabs = document.getElementById('tabs');
tabs.innerHTML = MENU.map((c, i) => `<button class="${i ? '' : 'on'}" data-t="${i}">${c.name}</button>`).join('');
function renderMenu(t){ document.getElementById('mlist').innerHTML = '<div class="mc">' + MENU[t].items.map(i => `<div class="it"><div><b>${i[0]}</b><span>${i[1]}</span></div><em>${CURRENCY}${i[2]}</em></div>`).join('') + '</div>';
  gsap.from('#mlist .it', { y: 20, opacity: 0, stagger: .08, duration: .6 }) }
tabs.onclick = e => { const b = e.target.closest('button'); if (!b) return; tabs.querySelectorAll('button').forEach(x => x.classList.remove('on')); b.classList.add('on'); renderMenu(+b.dataset.t) };
renderMenu(0);

// simple hash router: #home, #menu, #about
const hd = document.getElementById('hd');
function route(){ let p = location.hash.slice(1) || 'home'; if (!['home', 'menu', 'about'].includes(p)) p = 'home';
  document.querySelectorAll('.page').forEach(x => x.classList.toggle('on', x.id === 'p-' + p));
  document.querySelectorAll('nav a').forEach(a => a.classList.toggle('on', a.dataset.p === p));
  hd.classList.toggle('dark', p === 'home'); document.body.classList.remove('nav-open');
  lenis.scrollTo(0, { immediate: true }); ScrollTrigger.refresh();
  if (p === 'home'){ gsap.from('.hc .ln>span', { yPercent: 110, duration: 1.3, stagger: .12, ease: 'power4.out' }); gsap.from('.hc p,.hc small', { opacity: 0, y: 20, duration: 1, delay: .4 }) }
  else gsap.from('#p-' + p + ' .ph>*', { y: 30, opacity: 0, stagger: .1, duration: 1, ease: 'power3.out' }) }
addEventListener('hashchange', route); route();
lenis.on('scroll', ({ scroll }) => hd.classList.toggle('s', scroll > 60));
function goBook(){ lenis.scrollTo('#book') }

// parallax
gsap.to('#hi', { yPercent: -10, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
document.querySelectorAll('.px').forEach(i => gsap.fromTo(i, { yPercent: -8 }, { yPercent: 0, ease: 'none', scrollTrigger: { trigger: i.parentNode, scrub: true } }));

// testimonials slider
let qi = 0; const qs = document.querySelectorAll('.q'), ds = document.querySelectorAll('.dots i');
function showQ(n){ gsap.to(qs[qi], { opacity: 0, duration: .6 }); ds[qi].classList.remove('on'); qi = n; gsap.to(qs[qi], { opacity: 1, duration: .8, delay: .3 }); ds[qi].classList.add('on') }
ds.forEach((d, i) => d.onclick = () => showQ(i)); setInterval(() => showQ((qi + 1) % qs.length), 5500);

// reservation form -> opens e-mail with all details
document.getElementById('rf').addEventListener('submit', e => { e.preventDefault(); const f = new FormData(e.target);
  const body = `Reservation request\n\nName: ${f.get('name')}\nDate: ${f.get('date')}\nTime: ${f.get('time')}\nGuests: ${f.get('guests')}`;
  location.href = `mailto:${RESERVATION_EMAIL}?subject=${encodeURIComponent('Table reservation')}&body=${encodeURIComponent(body)}`;
  toast('Opening your e-mail app…') });
