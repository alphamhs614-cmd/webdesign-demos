/* BuildPro Business – interactions. Set your form e-mail in index.html (data-mail on the <form>). */
const lenis = new Lenis({ lerp: .1 });
function raf(t){ lenis.raf(t); requestAnimationFrame(raf) } requestAnimationFrame(raf);
gsap.registerPlugin(ScrollTrigger); lenis.on('scroll', ScrollTrigger.update);
document.querySelectorAll('.yr').forEach(e => e.textContent = new Date().getFullYear());
document.querySelectorAll('.rv').forEach(el => gsap.from(el, { y: 36, opacity: 0, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' } }));
// animated counters
document.querySelectorAll('[data-count]').forEach(el => { const n = +el.dataset.count, o = { v: 0 };
  ScrollTrigger.create({ trigger: el, start: 'top 92%', once: true, onEnter: () => gsap.to(o, { v: n, duration: 1.6, ease: 'power2.out', onUpdate: () => el.textContent = Math.round(o.v) + (el.dataset.suf || '') }) }) });
// smooth anchor scrolling
document.addEventListener('click', e => { const a = e.target.closest('a[href^="#s-"]'); if (!a) return; const t = document.querySelector(a.getAttribute('href'));
  if (t){ e.preventDefault(); document.body.classList.remove('nav-open'); if (document.body.classList.contains('l-on')) { location.hash = ''; setTimeout(() => lenis.scrollTo(t, { offset: -72 }), 50) } else lenis.scrollTo(t, { offset: -72 }) } });
document.querySelector('.menu-btn').addEventListener('click', () => document.body.classList.toggle('nav-open'));
function toast(msg){ const t = document.createElement('div'); t.className = 'toast'; t.textContent = msg; document.body.appendChild(t);
  gsap.fromTo(t, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: .4 }); setTimeout(() => gsap.to(t, { opacity: 0, duration: .4, onComplete: () => t.remove() }), 3200) }
// contact form -> opens visitor's e-mail app with the request (no server needed). See README to use Formspree/Netlify Forms instead.
const form = document.getElementById('cf');
form.addEventListener('submit', e => { e.preventDefault(); const f = new FormData(form); let body = '';
  for (const [k, v] of f.entries()) if (k !== 'consent') body += `${k}: ${v}\n`;
  location.href = `mailto:${form.dataset.mail}?subject=${encodeURIComponent(form.dataset.subject)}&body=${encodeURIComponent(body)}`;
  toast(form.dataset.toast) });
// legal pages (#imprint / #privacy)
function route(){ const h = location.hash.slice(1); document.querySelectorAll('.legal').forEach(l => l.classList.toggle('on', l.id === h));
  const on = !!document.querySelector('.legal.on'); document.body.classList.toggle('l-on', on);
  if (on){ lenis.scrollTo(0, { immediate: true }); gsap.from('.legal.on>*', { y: 20, opacity: 0, stagger: .04, duration: .5 }) } ScrollTrigger.refresh() }
addEventListener('hashchange', route); route();
gsap.from('.hc>*', { y: 50, opacity: 0, duration: 1.1, stagger: .12, ease: 'power4.out' });
gsap.to('#hi', { yPercent: -12, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
