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
  var $ = site.$, $$ = site.$$, form = $('#booking-form'), chosen = $('#chosen'), bar = $('#book-bar'), lang = document.documentElement.lang;
  var money = function (v) { return new Intl.NumberFormat(lang, { style: 'currency', currency: form.dataset.currency || 'EUR', maximumFractionDigits: 0 }).format(v); };
  var sel = new Map(), waTo = form.dataset.to;
  function render() {
    chosen.innerHTML = '';
    if (!sel.size) chosen.innerHTML = '<span class="empty">' + chosen.dataset.empty + '</span>';
    sel.forEach(function (v, id) {
      var c = document.createElement('span'); c.className = 'chip'; c.textContent = v.name + ' ';
      var x = document.createElement('button'); x.type = 'button'; x.setAttribute('aria-label', 'Remove'); x.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6l12 12M18 6 6 18"/></svg>';
      x.onclick = function () { toggle(id); }; c.appendChild(x); chosen.appendChild(c);
    });
    var sum = 0; sel.forEach(function (v) { sum += v.price; });
    $('#total').textContent = sel.size ? money(sum) : '–';
    $('#bar-text').textContent = sel.size + ' ' + (sel.size === 1 ? bar.dataset.one : bar.dataset.many) + ' · ' + money(sum);
    bar.classList.toggle('show', sel.size > 0);
  }
  function toggle(id) {
    var row = $('.svc[data-id="' + id + '"]');
    if (sel.has(id)) sel.delete(id); else sel.set(id, { name: row.dataset.name, price: +row.dataset.price });
    row.classList.toggle('on', sel.has(id)); render();
  }
  $$('.svc .add').forEach(function (b) { b.addEventListener('click', function () { toggle(b.closest('.svc').dataset.id); }); });
  // hide the floating bar while the booking form is visible
  if (window.IntersectionObserver) new IntersectionObserver(function (e) { bar.classList.toggle('in-form', e[0].isIntersecting); }).observe($('#book'));
  // bento tiles open the matching price tab
  $$('[data-cat]').forEach(function (t) { t.addEventListener('click', function () { var b = $('[data-tab="' + t.dataset.cat + '"]'); if (b) b.click(); }); });
  // earliest date = today
  var dt = $('#b-date'); dt.min = new Date().toISOString().slice(0, 10);
  form.addEventListener('submit', function (e) {
    var via = (e.submitter && e.submitter.dataset.via) || 'whatsapp';
    form.dataset.send = via; form.dataset.to = via === 'mail' ? form.dataset.mail : waTo;
    form.dataset.toast = via === 'mail' ? form.dataset.toastMail : form.dataset.toastWa;
    var extra = [], sum = 0, names = [];
    sel.forEach(function (v) { names.push(v.name); sum += v.price; });
    if (names.length) { extra.push(form.dataset.lTr + ': ' + names.join(', ')); extra.push(form.dataset.lTotal + ': ' + money(sum)); }
    site.send(form, extra);
  });
  // highlight today's opening hours
  var today = new Date().getDay(); $$('.hours tr').forEach(function (r) { if (+r.dataset.day === today) r.classList.add('today'); });
  // statement: words light up while scrolling
  var st = $('[data-highlight]');
  if (st && site.hasGsap && !site.reduce) {
    var words = [];
    (function walk(n) { Array.prototype.slice.call(n.childNodes).forEach(function (c) {
      if (c.nodeType === 3) { var f = document.createDocumentFragment(); c.textContent.split(/(\s+)/).forEach(function (p) { if (!p) return; if (/^\s+$/.test(p)) { f.appendChild(document.createTextNode(' ')); return; } var s = document.createElement('span'); s.className = 'hl-word'; s.textContent = p; words.push(s); f.appendChild(s); }); c.parentNode.replaceChild(f, c); }
      else if (c.nodeType === 1) walk(c); }); })(st);
    gsap.to(words, { opacity: 1, stagger: 0.1, ease: 'none', scrollTrigger: { trigger: st, start: 'top 80%', end: 'bottom 45%', scrub: true } });
  }
})();
