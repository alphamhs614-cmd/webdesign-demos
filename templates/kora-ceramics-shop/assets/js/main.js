/* ===== CORE interactions (shared). Smooth scroll (Lenis), GSAP animations, theme, nav, forms, legal pages. ===== */
(function () {
  'use strict';
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var root = document.documentElement, body = document.body;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasGsap = !!(window.gsap && window.ScrollTrigger);
  window.__coreReady = true;
  if (!hasGsap || reduce) root.classList.add('no-anim');

  /* ---------- theme (light / dark) ---------- */
  var tKey = 'theme-' + (root.getAttribute('data-key') || 'site');
  $$('[data-theme-toggle]').forEach(function (b) {
    b.addEventListener('click', function () {
      var n = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', n);
      try { localStorage.setItem(tKey, n); } catch (e) {}
      if (hasGsap) ScrollTrigger.refresh();
    });
  });

  /* ---------- smooth scrolling ---------- */
  var lenis = null;
  if (window.Lenis && !reduce) {
    lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    if (hasGsap) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(function (t) { lenis.raf(t * 1000); });
      gsap.ticker.lagSmoothing(0);
    } else {
      (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })(0);
    }
  }
  function scrollToEl(el, off) {
    var o = off == null ? -((parseInt(getComputedStyle(root).getPropertyValue('--header-h')) || 76) + 8) : off;
    if (lenis) lenis.scrollTo(el, { offset: o, duration: 1.2 });
    else window.scrollTo({ top: (typeof el === 'number' ? el : el.getBoundingClientRect().top + window.scrollY + o), behavior: reduce ? 'auto' : 'smooth' });
  }

  /* ---------- header state ---------- */
  var header = $('.site-header'), lastY = 0, mcta = $('.mobile-cta');
  function onScroll() {
    var y = window.scrollY;
    if (header) {
      header.classList.toggle('is-scrolled', y > 24);
      if (!body.classList.contains('nav-open')) header.classList.toggle('is-hidden', y > 400 && y > lastY + 4);
      if (y < lastY - 4) header.classList.remove('is-hidden');
    }
    if (mcta) mcta.classList.toggle('is-visible', y > window.innerHeight * 0.55);
    lastY = y;
  }
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* ---------- mobile nav ---------- */
  $$('[data-nav-toggle]').forEach(function (b) {
    b.addEventListener('click', function () {
      var open = body.classList.toggle('nav-open');
      b.setAttribute('aria-expanded', open);
      if (lenis) open ? lenis.stop() : lenis.start();
    });
  });
  function closeNav() { body.classList.remove('nav-open'); if (lenis) lenis.start(); }

  /* ---------- legal pages (#impressum, #datenschutz, #imprint, #privacy) ---------- */
  function route() {
    var h = decodeURIComponent(location.hash.slice(1));
    var any = false;
    $$('.legal').forEach(function (l) { var on = l.id === h; l.classList.toggle('is-on', on); if (on) any = true; });
    body.classList.toggle('legal-on', any);
    if (any) { window.scrollTo(0, 0); if (lenis) lenis.scrollTo(0, { immediate: true }); }
    if (hasGsap) ScrollTrigger.refresh();
  }
  window.addEventListener('hashchange', route); route();

  /* ---------- in-page anchors ---------- */
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute('href').slice(1);
    if (!id) return;
    var t = document.getElementById(id);
    if (!t || t.classList.contains('legal')) { closeNav(); return; }
    e.preventDefault(); closeNav();
    if (body.classList.contains('legal-on')) { history.pushState('', document.title, location.pathname + location.search); route(); setTimeout(function () { scrollToEl(t); }, 60); }
    else scrollToEl(id === 'top' ? 0 : t);
  });

  /* ---------- toast ---------- */
  function toast(msg) {
    var t = document.createElement('div'); t.className = 'toast'; t.setAttribute('role', 'status'); t.textContent = msg; body.appendChild(t);
    if (hasGsap) gsap.fromTo(t, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out' });
    setTimeout(function () { if (hasGsap) gsap.to(t, { opacity: 0, duration: 0.4, onComplete: function () { t.remove(); } }); else t.remove(); }, 3600);
  }

  /* ---------- forms: data-send="mail" | "whatsapp" ----------
     <form data-send="whatsapp" data-to="491701234567" data-intro="New request" data-toast="...">
     Every named field is added to the message (label = data-label or name).                */
  function serialize(form) {
    var lines = [];
    $$('input,select,textarea', form).forEach(function (f) {
      if (!f.name || f.type === 'submit' || f.dataset.skip !== undefined) return;
      if ((f.type === 'checkbox' || f.type === 'radio') && !f.checked) return;
      var v = (f.value || '').trim(); if (!v) return;
      lines.push((f.dataset.label || f.name) + ': ' + v);
    });
    return lines;
  }
  function send(form, extra) {
    var lines = (extra || []).concat(serialize(form));
    var intro = form.dataset.intro || '';
    var text = (intro ? intro + '\n\n' : '') + lines.join('\n');
    var to = form.dataset.to || '';
    if (form.dataset.send === 'whatsapp') window.open('https://wa.me/' + to.replace(/\D/g, '') + '?text=' + encodeURIComponent(text), '_blank', 'noopener');
    else location.href = 'mailto:' + to + '?subject=' + encodeURIComponent(form.dataset.subject || intro || 'Request') + '&body=' + encodeURIComponent(text);
    if (form.dataset.toast) toast(form.dataset.toast);
  }
  $$('form[data-send]').forEach(function (form) {
    form.addEventListener('submit', function (e) { e.preventDefault(); if (form.dataset.custom === undefined) send(form); });
  });

  /* ---------- tabs ---------- */
  $$('[data-tabs]').forEach(function (wrap) {
    var btns = $$('[data-tab]', wrap);
    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        var k = b.dataset.tab;
        btns.forEach(function (x) { x.classList.toggle('is-active', x === b); x.setAttribute('aria-selected', x === b); });
        $$('[data-panel]', wrap).forEach(function (p) {
          var on = p.dataset.panel === k; p.hidden = !on;
          if (on && hasGsap && !reduce) gsap.fromTo(p.children, { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.04, ease: 'power3.out' });
        });
        if (hasGsap) ScrollTrigger.refresh();
      });
    });
  });

  /* ---------- marquee: duplicate content for a seamless loop ---------- */
  $$('.marquee-track').forEach(function (t) { t.innerHTML += t.innerHTML; $$('[data-reveal]', t).forEach(function (x) { x.removeAttribute('data-reveal'); }); });

  /* ---------- year ---------- */
  $$('[data-year]').forEach(function (e) { e.textContent = new Date().getFullYear(); });

  /* ---------- split text into words ---------- */
  function split(el) {
    var walk = function (node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var parts = n.textContent.split(/(\s+)/), frag = document.createDocumentFragment();
          parts.forEach(function (p) {
            if (!p) return;
            if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(' ')); return; }
            var w = document.createElement('span'); w.className = 'split-w';
            var i = document.createElement('span'); i.textContent = p; w.appendChild(i); frag.appendChild(w);
          });
          n.parentNode.replaceChild(frag, n);
        } else if (n.nodeType === 1 && n.tagName !== 'BR') walk(n);
      });
    };
    walk(el);
    return $$('.split-w>span', el);
  }

  /* ---------- counters ---------- */
  function fmt(v, d) { return v.toLocaleString(root.lang || 'en', { minimumFractionDigits: d, maximumFractionDigits: d }); }

  window.site = { $: $, $$: $$, toast: toast, send: send, lenis: lenis, scrollTo: scrollToEl, reduce: reduce, hasGsap: hasGsap };

  if (!hasGsap || reduce) {
    $$('[data-count]').forEach(function (el) { el.textContent = (el.dataset.prefix || '') + fmt(+el.dataset.count, +(el.dataset.decimals || 0)) + (el.dataset.suffix || ''); });
    return;
  }
  gsap.registerPlugin(ScrollTrigger);

  // split headlines
  $$('[data-split]').forEach(function (el) {
    var words = split(el);
    var inHero = el.closest('[data-hero]');
    gsap.from(words, { yPercent: 110, rotate: 2, duration: 1.1, ease: 'power4.out', stagger: 0.06, delay: inHero ? 0.15 : 0,
      scrollTrigger: inHero ? null : { trigger: el, start: 'top 88%' } });
  });

  // reveals: data-reveal="up|fade|left|right|scale|clip"; parent data-stagger staggers children
  var from = { up: { y: 40, opacity: 0 }, fade: { opacity: 0 }, left: { x: -50, opacity: 0 }, right: { x: 50, opacity: 0 }, scale: { scale: 0.92, opacity: 0 }, clip: { clipPath: 'inset(100% 0 0 0)', opacity: 1 } };
  var groups = new Map();
  $$('[data-reveal]').forEach(function (el) {
    var p = el.parentElement && el.parentElement.hasAttribute('data-stagger') ? el.parentElement : el;
    if (!groups.has(p)) groups.set(p, []); groups.get(p).push(el);
  });
  groups.forEach(function (els, trig) {
    var inHero = trig.closest('[data-hero]');
    els.forEach(function (el) {
      var type = el.dataset.reveal || 'up';
      gsap.set(el, Object.assign({}, from[type] || from.up));
    });
    var to = { y: 0, x: 0, scale: 1, opacity: 1, clipPath: 'inset(0% 0 0 0)', duration: 1, ease: 'power3.out', stagger: 0.09, clearProps: 'transform,clipPath' };
    if (inHero) { to.delay = 0.35; gsap.to(els, to); }
    else { to.scrollTrigger = { trigger: trig, start: 'top 88%', once: true }; gsap.to(els, to); }
  });

  // counters
  $$('[data-count]').forEach(function (el) {
    var n = +el.dataset.count, d = +(el.dataset.decimals || 0), o = { v: 0 };
    el.textContent = (el.dataset.prefix || '') + fmt(0, d) + (el.dataset.suffix || '');
    ScrollTrigger.create({ trigger: el, start: 'top 92%', once: true, onEnter: function () {
      gsap.to(o, { v: n, duration: 1.8, ease: 'power2.out', onUpdate: function () { el.textContent = (el.dataset.prefix || '') + fmt(o.v, d) + (el.dataset.suffix || ''); } });
    } });
  });

  // parallax: data-speed="0.15" (positive = moves slower than scroll)
  $$('[data-speed]').forEach(function (el) {
    var s = parseFloat(el.dataset.speed) || 0.15;
    gsap.fromTo(el, { yPercent: -s * 50 }, { yPercent: s * 50, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
  });

  // magnetic buttons (desktop)
  if (window.matchMedia('(pointer:fine)').matches) {
    $$('[data-magnetic]').forEach(function (b) {
      b.addEventListener('mousemove', function (e) { var r = b.getBoundingClientRect(); gsap.to(b, { x: (e.clientX - r.left - r.width / 2) * 0.25, y: (e.clientY - r.top - r.height / 2) * 0.35, duration: 0.4 }); });
      b.addEventListener('mouseleave', function () { gsap.to(b, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1,.4)' }); });
    });
  }
  window.addEventListener('load', function () { ScrollTrigger.refresh(); });
})();


/* ===== TEMPLATE INTERACTIONS ===== */
(function () {
  // booking / order forms with two submit buttons: WhatsApp or e-mail
  site.$$('form[data-two]').forEach(function (form) {
    var dt = site.$('input[type=date]', form);
    if (dt) { var t = new Date(); t.setMinutes(t.getMinutes() - t.getTimezoneOffset()); dt.min = t.toISOString().slice(0, 10); }
    var wa = form.dataset.to;
    form.addEventListener('submit', function (e) {
      var via = (e.submitter && e.submitter.getAttribute('data-via')) || 'whatsapp';
      form.dataset.send = via; form.dataset.to = via === 'mail' ? form.dataset.mail : wa;
      site.send(form, form.__extra ? form.__extra() : []);
    });
  });
  // cards that preselect a dropdown: <a data-pick="value" data-pick-target="#id">
  site.$$('[data-pick]').forEach(function (a) {
    a.addEventListener('click', function () { var s = site.$(a.getAttribute('data-pick-target') || '#f-s'); if (s) s.value = a.getAttribute('data-pick'); });
  });
  // opening hours: highlight today (rows carry data-days="1,2,3" with 0 = Sunday)
  var d = new Date().getDay();
  site.$$('.hr[data-days]').forEach(function (r) { if (r.dataset.days.split(',').indexOf(String(d)) > -1) r.classList.add('is-today'); });
})();

(function () {
  var dr = site.$('[data-drawer]'); if (!dr) return;
  var de = dr.dataset.lang === 'de', FREE = +dr.dataset.free || 0, KEYC = 'cart-kora';
  function money(v) { var s = v.toFixed(2); if (de) return s.replace('.', ',').replace(',00', '') + ' €'; return '€' + s.replace('.00', ''); }
  var prods = {}; site.$$('.prod').forEach(function (p) { prods[p.dataset.id] = p; });
  var cart = {}; try { cart = JSON.parse(localStorage.getItem(KEYC)) || {}; } catch (e) {}
  Object.keys(cart).forEach(function (k) { if (!prods[k]) delete cart[k]; });
  function save() { try { localStorage.setItem(KEYC, JSON.stringify(cart)); } catch (e) {} }
  function sub() { var s = 0; Object.keys(cart).forEach(function (k) { s += cart[k] * +prods[k].dataset.price; }); return s; }
  function render() {
    var n = 0, box = site.$('[data-lines]'), html = '';
    Object.keys(cart).forEach(function (k) { var p = prods[k], q = cart[k]; n += q;
      html += '<div class="line" data-k="' + k + '"><img src="' + p.dataset.img + '" alt=""><div><b>' + p.dataset.name + '</b><small>' + money(+p.dataset.price) + '</small><div class="qty"><button type="button" data-d="-1" aria-label="−">−</button><span>' + q + '</span><button type="button" data-d="1" aria-label="+">+</button></div></div><button type="button" class="rm" data-rm>' + box.dataset.rm + '</button></div>'; });
    box.innerHTML = html || '<p class="empty">' + box.dataset.empty + '</p>';
    site.$$('[data-count]').forEach(function (c) { c.textContent = n; c.dataset.n = n; });
    var s = sub(); site.$('[data-sub]').textContent = money(s);
    var left = Math.max(0, FREE - s); site.$('[data-left]').textContent = money(left);
    site.$('[data-ship-more]').hidden = left === 0; site.$('[data-ship-ok]').hidden = left > 0;
    site.$('[data-bar]').style.width = Math.min(100, s / FREE * 100) + '%';
    site.$('.df .bk-btns').style.display = n ? '' : 'none';
  }
  function open() { dr.classList.add('is-open'); dr.setAttribute('aria-hidden', 'false'); if (site.lenis) site.lenis.stop(); }
  function close() { dr.classList.remove('is-open'); dr.setAttribute('aria-hidden', 'true'); if (site.lenis) site.lenis.start(); }
  function add(k) { cart[k] = (cart[k] || 0) + 1; save(); render(); site.toast(site.$('[data-added]').dataset.added); var c = site.$('.cart-btn'); if (c && site.hasGsap) gsap.fromTo(c, { scale: 1.25 }, { scale: 1, duration: .5, ease: 'back.out(3)' }); }
  site.$$('[data-cart-open]').forEach(function (b) { b.addEventListener('click', open); });
  site.$$('[data-cart-close]').forEach(function (b) { b.addEventListener('click', close); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  site.$('[data-lines]').addEventListener('click', function (e) {
    var l = e.target.closest('.line'); if (!l) return; var k = l.dataset.k, b = e.target.closest('button'); if (!b) return;
    if (b.hasAttribute('data-rm')) delete cart[k]; else { cart[k] += +b.dataset.d; if (cart[k] < 1) delete cart[k]; }
    save(); render();
  });
  site.$$('.prod [data-add]').forEach(function (b) { b.addEventListener('click', function () { add(b.closest('.prod').dataset.id); }); });
  // filters
  site.$$('[data-cat]').forEach(function (b) { if (b.tagName !== 'BUTTON') return; b.addEventListener('click', function () {
    site.$$('.filters button').forEach(function (x) { x.classList.toggle('is-active', x === b); });
    var c = b.dataset.cat, n = 0;
    site.$$('.prod').forEach(function (p) { var on = c === 'all' || p.dataset.cat === c; p.hidden = !on; if (on) n++; });
    var s = site.$('[data-shown]'); s.textContent = s.dataset.tpl.replace('{n}', n);
    if (site.hasGsap) ScrollTrigger.refresh();
  }); });
  // quick view
  var qv = site.$('.qv'), cur = null;
  site.$$('[data-view]').forEach(function (b) { b.addEventListener('click', function () {
    var p = b.closest('.prod'); cur = p.dataset.id;
    site.$('img', qv).src = p.dataset.img; site.$('[data-qv-name]', qv).textContent = p.dataset.name; site.$('[data-qv-desc]', qv).textContent = p.dataset.desc;
    site.$('[data-qv-price]', qv).innerHTML = site.$('.pr', p).innerHTML; site.$('[data-qv-cat]', qv).textContent = site.$('.cat', p).textContent;
    var a = site.$('[data-qv-add]', qv), out = p.hasAttribute('data-out'); a.disabled = out; a.textContent = site.$('[data-add]', p).textContent;
    if (qv.showModal) qv.showModal();
  }); });
  site.$('.qv-x').addEventListener('click', function () { qv.close(); });
  qv.addEventListener('click', function (e) { if (e.target === qv) qv.close(); });
  site.$('[data-qv-add]').addEventListener('click', function () { if (cur) add(cur); qv.close(); open(); });
  // delivery: hide address for pickup
  var f = site.$('.df');
  site.$$('input[name=delivery]', f).forEach(function (r, i) { r.addEventListener('change', function () { site.$('[data-addr]', f).hidden = i === 1 && r.checked; }); });
  f.__extra = function () {
    var lines = [f.dataset.lItems + ':'];
    Object.keys(cart).forEach(function (k) { lines.push('• ' + cart[k] + ' × ' + prods[k].dataset.name + ' (' + money(cart[k] * prods[k].dataset.price) + ')'); });
    lines.push(f.dataset.lSub + ': ' + money(sub()), ''); return lines;
  };
  render();
})();
