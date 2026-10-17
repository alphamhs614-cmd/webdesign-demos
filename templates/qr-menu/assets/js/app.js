/* QR Digital Menu – app logic (vanilla JS, no libraries).
   Content is loaded from menu.json. When the page is opened directly from disk (file://),
   browsers block fetch(), so the copy in menu.js (window.MENU_DATA) is used instead. */
(function () {
  'use strict';
  var $ = function (id) { return document.getElementById(id); };
  var D, lang, cart = {}, filter = null, ITEMS = {};
  var LS = 'qrmenu-';
  var ICON = {
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
    phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>',
    wa: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.8-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.2-.2-.4-.3z"/></svg>'
  };

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function tr(v) { if (v == null) return ''; if (typeof v === 'string') return v; return v[lang] != null ? v[lang] : (v[D.settings.languages[0]] || ''); }
  function T(k) { var t = D.text[lang] || {}; return t[k] != null ? t[k] : k; }
  function store(k, v) { try { if (v === undefined) return localStorage.getItem(LS + k); localStorage.setItem(LS + k, v); } catch (e) { return null; } }
  function money(v) {
    var s = D.settings, loc = lang === 'ar' ? (s.arabicDigits ? 'ar' : 'ar-u-nu-latn') : (lang === 'de' ? 'de-DE' : lang);
    try { return new Intl.NumberFormat(loc, { style: 'currency', currency: s.currency || 'EUR' }).format(v).replace(/[\u200e\u200f\u061c]/g, ''); }
    catch (e) { return v.toFixed(2) + ' ' + (s.currency || ''); }
  }

  /* ---------- load data ---------- */
  function boot(data) {
    D = data;
    D.settings = D.settings || {}; D.settings.languages = D.settings.languages || ['de', 'ar'];
    var th = D.theme || {}, map = { primary: '--primary', accent: '--accent', background: '--bg', surface: '--surface', text: '--text', muted: '--muted' };
    Object.keys(map).forEach(function (k) { if (th[k]) document.documentElement.style.setProperty(map[k], th[k]); });
    if (th.primary) document.querySelector('meta[name=theme-color]').setAttribute('content', th.primary);
    D.categories.forEach(function (c) { c.items.forEach(function (it) { ITEMS[c.id + '/' + it.id] = it; }); });
    try { cart = JSON.parse(store('cart') || '{}') || {}; } catch (e) { cart = {}; }
    Object.keys(cart).forEach(function (k) { if (!ITEMS[k] || ITEMS[k].available === false) delete cart[k]; });
    var q = (location.search.match(/[?&]lang=([a-z]{2})/) || [])[1];
    var pick = [q, store('lang'), D.settings.defaultLanguage].filter(function (l) { return l && D.settings.languages.indexOf(l) > -1; })[0];
    setLang(pick || D.settings.languages[0], true);
    bind();
  }
  function fail(msg) { $('menu').innerHTML = '<p class="load">' + esc(msg) + '</p>'; if (window.console) console.warn(msg); }
  function start() {
    if (location.protocol === 'file:') {
      // Local preview: load menu.js (a copy of menu.json) via a script tag.
      var s = document.createElement('script'); s.src = 'menu.js';
      s.onload = function () { window.MENU_DATA ? boot(window.MENU_DATA) : fail('menu.js does not define window.MENU_DATA'); };
      s.onerror = function () { fail('menu.js not found – see README.'); };
      document.head.appendChild(s); return;
    }
    fetch('menu.json', { cache: 'no-cache' }).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(boot).catch(function (e) {
        if (window.MENU_DATA) return boot(window.MENU_DATA);
        fail('Could not load menu.json (' + e.message + '). Check the JSON syntax, e.g. with jsonlint.com.');
      });
  }

  /* ---------- render ---------- */
  function setLang(l, first) {
    lang = l; store('lang', l);
    var html = document.documentElement; html.lang = l; html.dir = l === 'ar' ? 'rtl' : 'ltr';
    var others = D.settings.languages.filter(function (x) { return x !== l; });
    $('lang').hidden = !others.length;
    $('langLbl').textContent = T('switchTo');
    $('lang').setAttribute('aria-label', T('switchTo'));
    render();
    if (!first) window.scrollTo(0, 0);
  }
  function render() {
    var R = D.restaurant || {}, name = tr(R.name);
    document.title = name + (tr(R.tagline) ? ' – ' + tr(R.tagline) : '');
    var md = document.querySelector('meta[name=description]'); if (md) md.setAttribute('content', T('intro'));
    $('name').textContent = name; $('tagline').textContent = tr(R.tagline); $('intro').textContent = T('intro');
    if (R.logo) { $('logo').src = R.logo; $('logo').hidden = false; } else $('logo').hidden = true;
    var info = '';
    if (tr(R.hours)) info += '<span>' + ICON.clock + esc(tr(R.hours)) + '</span>';
    if (tr(R.address)) info += (R.mapsUrl ? '<a dir="auto" href="' + esc(R.mapsUrl) + '" target="_blank" rel="noopener">' : '<span dir="auto">') + ICON.pin + esc(tr(R.address)) + (R.mapsUrl ? '</a>' : '</span>');
    if (R.phone) info += '<a href="tel:' + esc(R.phone.replace(/[^+\d]/g, '')) + '" dir="ltr">' + ICON.phone + esc(R.phone) + '</a>';
    $('info').innerHTML = info;

    // filters (dietary tags that are actually used, except "popular")
    var used = {}; D.categories.forEach(function (c) { c.items.forEach(function (it) { (it.tags || []).forEach(function (t) { used[t] = 1; }); }); });
    var tags = D.tags || {};
    var fk = Object.keys(tags).filter(function (k) { return used[k] && k !== 'popular' && k !== 'nuts' && k !== 'spicy'; });
    $('filters').innerHTML = fk.length ? '<button class="flt" type="button" data-f="" aria-pressed="' + (!filter) + '">' + esc(T('filterAll')) + '</button>' + fk.map(function (k) {
      return '<button class="flt" type="button" data-f="' + esc(k) + '" style="--c:' + esc(tags[k].color || '') + '" aria-pressed="' + (filter === k) + '"><i></i>' + esc(tr(tags[k])) + '</button>';
    }).join('') : '';

    $('cats').innerHTML = D.categories.map(function (c, i) { return '<a class="cat' + (i ? '' : ' on') + '" href="#c-' + esc(c.id) + '" data-c="' + esc(c.id) + '">' + esc(tr(c.name)) + '</a>'; }).join('');
    var order = D.settings.ordering !== false && !!(D.restaurant && D.restaurant.whatsapp);
    $('menu').innerHTML = D.categories.map(function (c) {
      return '<section class="sec" id="c-' + esc(c.id) + '" data-c="' + esc(c.id) + '"><h2>' + esc(tr(c.name)) + '</h2>' + (tr(c.description) ? '<p>' + esc(tr(c.description)) + '</p>' : '<p></p>') +
        '<div class="grid">' + c.items.map(function (it) {
          var key = c.id + '/' + it.id, n = cart[key] || 0, off = it.available === false;
          var tg = (it.tags || []).filter(function (t) { return tags[t]; }).map(function (t) { return '<span class="tag" style="--c:' + esc(tags[t].color || '#666') + '">' + esc(tr(tags[t])) + '</span>'; }).join('');
          var ctl = off ? '<span class="sold">' + esc(T('soldOut')) + '</span>' : (order ? '<span class="qty' + (n ? ' has' : '') + '"><button class="minus" type="button" data-k="' + esc(key) + '" data-d="-1" aria-label="' + esc(T('remove') + ' ' + tr(it.name)) + '">−</button><b>' + n + '</b><button class="plus" type="button" data-k="' + esc(key) + '" data-d="1" aria-label="' + esc(T('add') + ' ' + tr(it.name)) + '">+</button></span>' : '');
          return '<article class="item' + (n ? ' sel' : '') + (off ? ' off' : '') + '" data-k="' + esc(key) + '" data-tags=" ' + esc((it.tags || []).join(' ')) + ' ">' +
            (it.image ? '<div class="pic"><img src="' + esc(it.image) + '" alt="' + esc(tr(it.name)) + '" width="104" height="104" loading="lazy" decoding="async"></div>' : '') +
            '<div class="body"><h3>' + esc(tr(it.name)) + '</h3>' + (tr(it.description) ? '<p class="d">' + esc(tr(it.description)) + '</p>' : '') + (tg ? '<div class="tags">' + tg + '</div>' : '') +
            '<div class="row"><span class="price">' + money(+it.price || 0) + '</span>' + ctl + '</div></div></article>';
        }).join('') + '</div></section>';
    }).join('');
    $('noRes').textContent = T('noResults');
    applyFilter();

    var F = '<p><b>' + esc(name) + '</b>' + (tr(R.address) ? ' · ' + esc(tr(R.address)) : '') + '</p>';
    if (tr(R.hours)) F += '<p>' + esc(T('openHours')) + ': ' + esc(tr(R.hours)) + '</p>';
    var links = [];
    if (R.instagram) links.push('<a href="' + esc(R.instagram) + '" target="_blank" rel="noopener">Instagram</a>');
    if (R.imprintUrl) links.push('<a href="' + esc(R.imprintUrl) + '">' + esc(T('imprint')) + '</a>');
    if (R.privacyUrl) links.push('<a href="' + esc(R.privacyUrl) + '">' + esc(T('privacy')) + '</a>');
    if (links.length) F += '<p>' + links.join(' · ') + '</p>';
    F += '<p>' + esc(T('footer')) + '</p><p>© ' + new Date().getFullYear() + ' ' + esc(name) + '</p>';
    $('foot').innerHTML = F;
    $('barLbl').textContent = T('viewOrder');
    updBar();
    spy();
    if ($('sheet').classList.contains('on')) openSheet();
  }
  function applyFilter() {
    var any = false;
    document.querySelectorAll('.sec').forEach(function (s) {
      var vis = 0;
      s.querySelectorAll('.item').forEach(function (el) { var ok = !filter || el.getAttribute('data-tags').indexOf(' ' + filter + ' ') > -1; el.hidden = !ok; if (ok) vis++; });
      s.classList.toggle('hide', !vis); document.querySelectorAll('.cat[data-c="' + s.dataset.c + '"]').forEach(function (a) { a.hidden = !vis; });
      if (vis) any = true;
    });
    $('noRes').style.display = any ? 'none' : 'block';
  }

  /* ---------- cart ---------- */
  function totals() { var n = 0, t = 0; Object.keys(cart).forEach(function (k) { n += cart[k]; t += cart[k] * (+ITEMS[k].price || 0); }); return { n: n, t: t }; }
  function change(k, d) {
    var it = ITEMS[k]; if (!it || it.available === false) return;
    cart[k] = Math.max(0, Math.min(99, (cart[k] || 0) + d)); if (!cart[k]) delete cart[k];
    store('cart', JSON.stringify(cart));
    document.querySelectorAll('.item[data-k="' + k + '"]').forEach(function (el) {
      var n = cart[k] || 0; el.classList.toggle('sel', !!n); var q = el.querySelector('.qty'); if (q) { q.classList.toggle('has', !!n); q.querySelector('b').textContent = n; }
    });
    updBar(); $('live').textContent = tr(it.name) + ': ' + (cart[k] || 0);
    if ($('sheet').classList.contains('on')) openSheet(true);
  }
  function updBar() { var s = totals(); $('cn').textContent = s.n; $('ct').textContent = money(s.t); $('bar').classList.toggle('on', s.n > 0); }
  function message() {
    var R = D.restaurant, s = totals(), L = [T('msgHello') + ' ' + tr(R.name) + ':', ''];
    Object.keys(cart).forEach(function (k) { L.push('• ' + cart[k] + '× ' + tr(ITEMS[k].name) + ' – ' + money(cart[k] * (+ITEMS[k].price || 0))); });
    L.push('', T('msgTotal') + ': ' + money(s.t));
    var nm = ($('fName') || {}).value, tb = ($('fTable') || {}).value, no = ($('fNote') || {}).value;
    if (nm) L.push(T('msgName') + ': ' + nm); if (tb) L.push(T('msgTable') + ': ' + tb); if (no) L.push(T('msgNote') + ': ' + no);
    return L.join('\n');
  }
  function openSheet(keep) {
    var st = D.settings, s = totals(), keepVals = {};
    ['fName', 'fTable', 'fNote'].forEach(function (id) { if ($(id)) keepVals[id] = $(id).value; });
    var h = '<header><h2 id="sheetTitle">' + esc(T('yourOrder')) + '</h2><button class="x" type="button" data-close aria-label="' + esc(T('close')) + '">✕</button></header>';
    if (!s.n) h += '<p class="load">' + esc(T('empty')) + '</p>';
    Object.keys(cart).forEach(function (k) {
      h += '<div class="line"><div class="nm">' + esc(tr(ITEMS[k].name)) + '<small>' + money(+ITEMS[k].price || 0) + '</small></div><span class="qty has"><button class="minus" type="button" data-k="' + esc(k) + '" data-d="-1" aria-label="' + esc(T('remove')) + '">−</button><b>' + cart[k] + '</b><button class="plus" type="button" data-k="' + esc(k) + '" data-d="1" aria-label="' + esc(T('add')) + '">+</button></span></div>';
    });
    h += '<div class="sum"><span>' + esc(T('total')) + '</span><span class="price">' + money(s.t) + '</span></div>';
    if (st.askName !== false) h += '<input class="fld" id="fName" autocomplete="name" placeholder="' + esc(T('name')) + '" aria-label="' + esc(T('name')) + '">';
    if (st.askTable !== false) h += '<input class="fld" id="fTable" placeholder="' + esc(T('table')) + '" aria-label="' + esc(T('table')) + '">';
    h += '<input class="fld" id="fNote" placeholder="' + esc(T('note')) + '" aria-label="' + esc(T('note')) + '">';
    h += '<button class="send" type="button" id="send"' + (s.n ? '' : ' disabled') + '>' + ICON.wa + esc(T('send')) + '</button>';
    $('sheetIn').innerHTML = h;
    Object.keys(keepVals).forEach(function (id) { if ($(id)) $(id).value = keepVals[id]; });
    if (!keep) { $('sheet').classList.add('on'); $('shade').classList.add('on'); $('sheet').scrollTop = 0; document.body.style.overflow = 'hidden'; var x = $('sheetIn').querySelector('.x'); if (x) x.focus({ preventScroll: true }); }
  }
  function closeSheet() { $('sheet').classList.remove('on'); $('shade').classList.remove('on'); document.body.style.overflow = ''; $('barBtn').focus({ preventScroll: true }); }
  function send() {
    var num = String(D.restaurant.whatsapp || '').replace(/\D/g, ''); if (!num || !totals().n) return;
    window.open('https://wa.me/' + num + '?text=' + encodeURIComponent(message()), '_blank', 'noopener');
  }

  /* ---------- events ---------- */
  function bind() {
    $('lang').addEventListener('click', function () { var ls = D.settings.languages; setLang(ls[(ls.indexOf(lang) + 1) % ls.length]); });
    document.addEventListener('click', function (e) {
      var b = e.target.closest('[data-k][data-d]'); if (b) { change(b.getAttribute('data-k'), +b.getAttribute('data-d')); return; }
      var f = e.target.closest('.flt'); if (f) { filter = f.getAttribute('data-f') || null; render(); return; }
      if (e.target.closest('[data-close]')) closeSheet();
      if (e.target.id === 'send' || e.target.closest('#send')) send();
    });
    $('cats').addEventListener('click', function (e) {
      var a = e.target.closest('.cat'); if (!a) return; e.preventDefault();
      var sec = document.getElementById('c-' + a.dataset.c); if (!sec) return;
      var y = sec.getBoundingClientRect().top + window.pageYOffset - $('catsNav').offsetHeight - 4;
      window.scrollTo({ top: y, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      mark(a.dataset.c);
    });
    $('barBtn').addEventListener('click', function () { openSheet(); });
    $('shade').addEventListener('click', closeSheet);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && $('sheet').classList.contains('on')) closeSheet(); });
    window.addEventListener('scroll', onScroll, { passive: true });
  }
  var ticking = false, current = null;
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(function () { ticking = false; spy(); }); } }
  function spy() {
    var off = $('catsNav').offsetHeight + 24, id = null;
    document.querySelectorAll('.sec:not(.hide)').forEach(function (s) { if (!id || s.getBoundingClientRect().top - off <= 0) id = s.dataset.c; });
    if ((window.innerHeight + window.pageYOffset) >= document.body.scrollHeight - 4) { var v = document.querySelectorAll('.sec:not(.hide)'); if (v.length) id = v[v.length - 1].dataset.c; }
    if (id && id !== current) mark(id);
  }
  function mark(id) {
    current = id;
    document.querySelectorAll('.cat').forEach(function (a) {
      var on = a.dataset.c === id; a.classList.toggle('on', on);
      if (on) { a.setAttribute('aria-current', 'true'); var w = $('cats'), r = a.getBoundingClientRect(), wr = w.getBoundingClientRect(); if (r.left < wr.left + 8 || r.right > wr.right - 8) w.scrollBy({ left: (r.left + r.width / 2) - (wr.left + wr.width / 2), behavior: 'smooth' }); }
      else a.removeAttribute('aria-current');
    });
  }

  start();
})();
