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
  var $ = site.$, $$ = site.$$, grid = $('#grid'); if (!grid || !window.LISTINGS) return;
  var lang = document.documentElement.lang, D = grid.dataset, AREAS = JSON.parse(D.areas);
  var ICONS = { bed: $('#tpl-bed') };
  var st = { status: '', type: '', area: '', max: 0, sort: 'featured' };
  var favs = []; try { favs = JSON.parse(localStorage.getItem('haven-favs') || '[]'); } catch (e) {}
  var money = function (v) { return new Intl.NumberFormat(lang, { style: 'currency', currency: window.CURRENCY || 'EUR', maximumFractionDigits: 0 }).format(v); };
  var priceHTML = function (l) { return money(l.price) + (l.status === 'rent' ? ' <small>' + D.month + '</small>' : ''); };
  var I = {
    bed: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18V6M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5"/><circle cx="7" cy="11" r="2"/></svg>',
    bath: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-3ZM6 12V5a2 2 0 0 1 3.5-1.3M7 19l-1 2M17 19l1 2"/></svg>',
    size: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9V4h5M20 15v5h-5M4 4l6 6M20 20l-6-6"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-6.1-7-11.5a7 7 0 0 1 14 0C19 14.9 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
    heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z"/></svg>'
  };
  var specs = function (l) { return '<span>' + I.bed + l.beds + ' ' + D.beds + '</span><span>' + I.bath + l.baths + ' ' + D.baths + '</span><span>' + I.size + l.size + ' m²</span>'; };
  function render() {
    var list = LISTINGS.filter(function (l) { return (!st.status || l.status === st.status) && (!st.type || l.type === st.type) && (!st.area || l.area === st.area) && (!st.max || l.price <= st.max); });
    if (st.sort === 'low') list.sort(function (a, b) { return a.price - b.price; });
    if (st.sort === 'high') list.sort(function (a, b) { return b.price - a.price; });
    if (st.sort === 'size') list.sort(function (a, b) { return b.size - a.size; });
    $('#count').textContent = $('#count').dataset.tpl.replace('{n}', list.length);
    grid.innerHTML = list.length ? list.map(function (l) {
      return '<article class="card" data-id="' + l.id + '" tabindex="0" role="button" aria-label="' + l.title + '"><div class="ph"><img src="assets/img/' + l.img + '.jpg" alt="' + l.title + '" loading="lazy"><div class="badges"><span>' + (l.status === 'rent' ? D.rent : D.sale) + '</span>' + (l.badge ? '<span class="new">' + l.badge + '</span>' : '') + '</div><button class="fav' + (favs.indexOf(l.id) > -1 ? ' on' : '') + '" aria-label="' + D.fav + '">' + I.heart + '</button></div><div><div class="price">' + priceHTML(l) + '</div><h3>' + l.title + '</h3><div class="loc">' + I.pin + (AREAS[l.area] || l.area) + '</div></div><div class="specs">' + specs(l) + '</div></article>';
    }).join('') : '<div class="empty-state">' + D.none + '</div>';
    if (site.hasGsap && !site.reduce) gsap.from('#grid .card', { y: 30, opacity: 0, duration: 0.7, stagger: 0.06, ease: 'power3.out', clearProps: 'all' });
    if (site.hasGsap) ScrollTrigger.refresh();
  }
  // filters
  $$('.chipf').forEach(function (b) { b.addEventListener('click', function () { $$('.chipf').forEach(function (x) { x.classList.toggle('is-active', x === b); }); st.status = b.dataset.status; render(); }); });
  $('#sort').addEventListener('change', function (e) { st.sort = e.target.value; render(); });
  // hero search
  var mode = 'sale', priceSel = $('#s-price');
  $$('.seg button').forEach(function (b) { b.addEventListener('click', function () {
    $$('.seg button').forEach(function (x) { x.classList.toggle('is-active', x === b); }); mode = b.dataset.mode;
    var first = priceSel.options[0].outerHTML; priceSel.innerHTML = first + priceSel.dataset[mode]; }); });
  $('#search').addEventListener('submit', function (e) {
    e.preventDefault(); st.status = mode; st.area = $('#s-loc').value; st.type = $('#s-type').value; st.max = +priceSel.value || 0;
    $$('.chipf').forEach(function (x) { x.classList.toggle('is-active', x.dataset.status === mode); }); render(); site.scrollTo($('#listings'));
  });
  // favourites + open modal
  grid.addEventListener('click', function (e) {
    var card = e.target.closest('.card'); if (!card) return;
    if (e.target.closest('.fav')) { e.stopPropagation(); var id = card.dataset.id, i = favs.indexOf(id); if (i > -1) favs.splice(i, 1); else favs.push(id);
      try { localStorage.setItem('haven-favs', JSON.stringify(favs)); } catch (x) {} e.target.closest('.fav').classList.toggle('on'); return; }
    open(card.dataset.id);
  });
  grid.addEventListener('keydown', function (e) { if (e.key === 'Enter' && e.target.classList.contains('card')) open(e.target.dataset.id); });
  var modal = $('#modal'), cur = null, lastFocus = null;
  function open(id) {
    cur = LISTINGS.find(function (l) { return l.id === id; }); if (!cur) return; lastFocus = document.activeElement;
    $('#m-img').src = 'assets/img/' + cur.gallery[0] + '.jpg'; $('#m-img').alt = cur.title;
    $('#m-thumbs').innerHTML = cur.gallery.map(function (g, i) { return '<button type="button" class="' + (i ? '' : 'on') + '" data-g="' + g + '"><img src="assets/img/' + g + '.jpg" alt=""></button>'; }).join('');
    $('#m-price').innerHTML = priceHTML(cur); $('#m-title').textContent = cur.title; $('#m-specs').innerHTML = specs(cur) + '<span>' + I.pin + (AREAS[cur.area] || '') + '</span>';
    $('#m-desc').textContent = cur.desc; $('#m-feat').innerHTML = cur.features.map(function (f) { return '<span>' + f + '</span>'; }).join('');
    modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; if (site.lenis) site.lenis.stop();
    setTimeout(function () { $('.sheet .x').focus(); }, 50);
  }
  function close() { modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; if (site.lenis) site.lenis.start(); if (lastFocus) lastFocus.focus(); }
  $$('[data-close]', modal).forEach(function (b) { b.addEventListener('click', close); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && modal.classList.contains('open')) close(); });
  $('#m-thumbs').addEventListener('click', function (e) { var b = e.target.closest('button'); if (!b) return; $$('#m-thumbs button').forEach(function (x) { x.classList.toggle('on', x === b); }); $('#m-img').src = 'assets/img/' + b.dataset.g + '.jpg'; });
  var mf = $('#m-form'), waTo = mf.dataset.to;
  mf.addEventListener('submit', function (e) {
    var via = (e.submitter && e.submitter.dataset.via) || 'whatsapp';
    mf.dataset.send = via; mf.dataset.to = via === 'mail' ? mf.dataset.mail : waTo; mf.dataset.toast = via === 'mail' ? mf.dataset.toastMail : mf.dataset.toastWa;
    site.send(mf, [mf.dataset.lProp + ': ' + cur.title + ' (#' + cur.id + ')', mf.dataset.lPrice + ': ' + money(cur.price)]);
  });
  // valuation wizard
  var vf = $('#vform'), steps = $$('.vstep', vf), si = 0;
  function show(i) { si = i; steps.forEach(function (s, k) { s.classList.toggle('on', k === i); }); $('#prog').style.width = ((i + 1) / steps.length * 100) + '%';
    $('#vback').hidden = i === 0; $('#vnext').hidden = i === steps.length - 1; $('#vsend').hidden = i !== steps.length - 1;
    if (site.hasGsap && !site.reduce) gsap.from(steps[i], { x: 20, opacity: 0, duration: 0.4 }); }
  $('#vnext').addEventListener('click', function () { var ok = $$('input,select', steps[si]).every(function (f) { return f.reportValidity(); }); if (ok) show(si + 1); });
  $('#vback').addEventListener('click', function () { show(si - 1); });
  vf.addEventListener('submit', function () { site.send(vf); });
  // reviews arrows
  var revs = $('#revs');
  $('#rnext').addEventListener('click', function () { revs.scrollBy({ left: revs.clientWidth * 0.8, behavior: 'smooth' }); });
  $('#rprev').addEventListener('click', function () { revs.scrollBy({ left: -revs.clientWidth * 0.8, behavior: 'smooth' }); });
  render();
})();
