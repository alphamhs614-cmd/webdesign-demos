/*!
 * Haven – Real Estate Agent HTML Template
 * File: assets/js/main.js (un-minified, safe to edit)
 *
 * Contents
 *   1. Core interactions: theme toggle, smooth scrolling, sticky header, mobile menu,
 *      in-page anchors, toast messages, forms (mailto / WhatsApp), split-text headlines,
 *      scroll reveals, counters, parallax, magnetic buttons
 *   2. Template interactions: listings grid & filters, search form, favourites,
 *      quick-view modal, property detail page, viewing requests, valuation wizard, reviews slider
 *
 * Your property data lives in assets/js/listings.js.
 * Depends on (optional): GSAP + ScrollTrigger, Lenis – the page still works without them.
 */

/* ===== 1. CORE INTERACTIONS – smooth scroll (Lenis), GSAP animations, theme, navigation, forms ===== */
(function () {
  "use strict";
  var $ = function (s, c) {
    return (c || document).querySelector(s);
  };
  var $$ = function (s, c) {
    return Array.prototype.slice.call((c || document).querySelectorAll(s));
  };
  var root = document.documentElement,
    body = document.body;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hasGsap = !!(window.gsap && window.ScrollTrigger);
  window.__coreReady = true;
  if (!hasGsap || reduce) root.classList.add("no-anim");

  /* ---------- theme (light / dark) ---------- */
  var tKey = "theme-" + (root.getAttribute("data-key") || "site");
  $$("[data-theme-toggle]").forEach(function (b) {
    b.addEventListener("click", function () {
      var n = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", n);
      try {
        localStorage.setItem(tKey, n);
      } catch (e) {}
      if (hasGsap) ScrollTrigger.refresh();
    });
  });

  /* ---------- smooth scrolling ---------- */
  var lenis = null;
  if (window.Lenis && !reduce) {
    lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    if (hasGsap) {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(function (t) {
        lenis.raf(t * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    } else {
      (function raf(t) {
        lenis.raf(t);
        requestAnimationFrame(raf);
      })(0);
    }
  }
  function scrollToEl(el, off) {
    var o = off == null ? -((parseInt(getComputedStyle(root).getPropertyValue("--header-h")) || 76) + 8) : off;
    if (lenis) lenis.scrollTo(el, { offset: o, duration: 1.2 });
    else
      window.scrollTo({
        top: typeof el === "number" ? el : el.getBoundingClientRect().top + window.scrollY + o,
        behavior: reduce ? "auto" : "smooth",
      });
  }

  /* ---------- header state ---------- */
  var header = $(".site-header"),
    lastY = 0,
    mcta = $(".mobile-cta");
  function onScroll() {
    var y = window.scrollY;
    if (header) {
      header.classList.toggle("is-scrolled", y > 24);
      if (!body.classList.contains("nav-open")) header.classList.toggle("is-hidden", y > 400 && y > lastY + 4);
      if (y < lastY - 4) header.classList.remove("is-hidden");
    }
    if (mcta) mcta.classList.toggle("is-visible", y > window.innerHeight * 0.55);
    lastY = y;
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- mobile nav ---------- */
  $$("[data-nav-toggle]").forEach(function (b) {
    b.addEventListener("click", function () {
      var open = body.classList.toggle("nav-open");
      b.setAttribute("aria-expanded", open);
      if (lenis) open ? lenis.stop() : lenis.start();
    });
  });
  function closeNav() {
    body.classList.remove("nav-open");
    if (lenis) lenis.start();
  }

  /* ---------- in-page anchors (smooth scroll to #id on the same page) ---------- */
  document.addEventListener("click", function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var id = a.getAttribute("href").slice(1);
    if (!id) return;
    var t = document.getElementById(id);
    closeNav();
    if (!t) return;
    e.preventDefault();
    scrollToEl(id === "top" ? 0 : t);
    if (history.replaceState) history.replaceState(null, "", "#" + id);
  });

  /* ---------- jump to #hash after load (links from other pages) ---------- */
  window.addEventListener("load", function () {
    var h = location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (h)
      setTimeout(function () {
        scrollToEl(h);
      }, 80);
  });

  /* ---------- toast ---------- */
  function toast(msg) {
    var t = document.createElement("div");
    t.className = "toast";
    t.setAttribute("role", "status");
    t.textContent = msg;
    body.appendChild(t);
    if (hasGsap) gsap.fromTo(t, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: "power3.out" });
    setTimeout(function () {
      if (hasGsap)
        gsap.to(t, {
          opacity: 0,
          duration: 0.4,
          onComplete: function () {
            t.remove();
          },
        });
      else t.remove();
    }, 3600);
  }

  /* ---------- forms: data-send="mail" | "whatsapp" ----------
     <form data-send="whatsapp" data-to="491701234567" data-intro="New request" data-toast="...">
     Every named field is added to the message (label = data-label or name).                */
  function serialize(form) {
    var lines = [];
    $$("input,select,textarea", form).forEach(function (f) {
      if (!f.name || f.type === "submit" || f.dataset.skip !== undefined) return;
      if ((f.type === "checkbox" || f.type === "radio") && !f.checked) return;
      var v = (f.value || "").trim();
      if (!v) return;
      lines.push((f.dataset.label || f.name) + ": " + v);
    });
    return lines;
  }
  function send(form, extra) {
    var lines = (extra || []).concat(serialize(form));
    var intro = form.dataset.intro || "";
    var text = (intro ? intro + "\n\n" : "") + lines.join("\n");
    var to = form.dataset.to || "";
    if (form.dataset.send === "whatsapp")
      window.open("https://wa.me/" + to.replace(/\D/g, "") + "?text=" + encodeURIComponent(text), "_blank", "noopener");
    else
      location.href =
        "mailto:" +
        to +
        "?subject=" +
        encodeURIComponent(form.dataset.subject || intro || "Request") +
        "&body=" +
        encodeURIComponent(text);
    if (form.dataset.toast) toast(form.dataset.toast);
  }
  $$("form[data-send]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (form.dataset.custom === undefined) send(form);
    });
  });

  /* ---------- tabs ---------- */
  $$("[data-tabs]").forEach(function (wrap) {
    var btns = $$("[data-tab]", wrap);
    btns.forEach(function (b) {
      b.addEventListener("click", function () {
        var k = b.dataset.tab;
        btns.forEach(function (x) {
          x.classList.toggle("is-active", x === b);
          x.setAttribute("aria-selected", x === b);
        });
        $$("[data-panel]", wrap).forEach(function (p) {
          var on = p.dataset.panel === k;
          p.hidden = !on;
          if (on && hasGsap && !reduce)
            gsap.fromTo(
              p.children,
              { y: 16, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.5, stagger: 0.04, ease: "power3.out" },
            );
        });
        if (hasGsap) ScrollTrigger.refresh();
      });
    });
  });

  /* ---------- marquee: duplicate content for a seamless loop ---------- */
  $$(".marquee-track").forEach(function (t) {
    t.innerHTML += t.innerHTML;
    $$("[data-reveal]", t).forEach(function (x) {
      x.removeAttribute("data-reveal");
    });
  });

  /* ---------- year ---------- */
  $$("[data-year]").forEach(function (e) {
    e.textContent = new Date().getFullYear();
  });

  /* ---------- split text into words ---------- */
  function split(el) {
    var walk = function (node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3) {
          var parts = n.textContent.split(/(\s+)/),
            frag = document.createDocumentFragment();
          parts.forEach(function (p) {
            if (!p) return;
            if (/^\s+$/.test(p)) {
              frag.appendChild(document.createTextNode(" "));
              return;
            }
            var w = document.createElement("span");
            w.className = "split-w";
            var i = document.createElement("span");
            i.textContent = p;
            w.appendChild(i);
            frag.appendChild(w);
          });
          n.parentNode.replaceChild(frag, n);
        } else if (n.nodeType === 1 && n.tagName !== "BR") walk(n);
      });
    };
    walk(el);
    return $$(".split-w>span", el);
  }

  /* ---------- counters ---------- */
  function fmt(v, d) {
    return v.toLocaleString(root.lang || "en", { minimumFractionDigits: d, maximumFractionDigits: d });
  }

  window.site = {
    $: $,
    $$: $$,
    toast: toast,
    send: send,
    lenis: lenis,
    scrollTo: scrollToEl,
    reduce: reduce,
    hasGsap: hasGsap,
  };

  if (!hasGsap || reduce) {
    $$("[data-count]").forEach(function (el) {
      el.textContent =
        (el.dataset.prefix || "") + fmt(+el.dataset.count, +(el.dataset.decimals || 0)) + (el.dataset.suffix || "");
    });
    return;
  }
  gsap.registerPlugin(ScrollTrigger);

  // split headlines
  $$("[data-split]").forEach(function (el) {
    var words = split(el);
    var inHero = el.closest("[data-hero]");
    gsap.from(words, {
      yPercent: 110,
      rotate: 2,
      duration: 1.1,
      ease: "power4.out",
      stagger: 0.06,
      delay: inHero ? 0.15 : 0,
      scrollTrigger: inHero ? null : { trigger: el, start: "top 88%" },
    });
  });

  // reveals: data-reveal="up|fade|left|right|scale|clip"; parent data-stagger staggers children
  var from = {
    up: { y: 40, opacity: 0 },
    fade: { opacity: 0 },
    left: { x: -50, opacity: 0 },
    right: { x: 50, opacity: 0 },
    scale: { scale: 0.92, opacity: 0 },
    clip: { clipPath: "inset(100% 0 0 0)", opacity: 1 },
  };
  var groups = new Map();
  $$("[data-reveal]").forEach(function (el) {
    var p = el.parentElement && el.parentElement.hasAttribute("data-stagger") ? el.parentElement : el;
    if (!groups.has(p)) groups.set(p, []);
    groups.get(p).push(el);
  });
  groups.forEach(function (els, trig) {
    var inHero = trig.closest("[data-hero]");
    els.forEach(function (el) {
      var type = el.dataset.reveal || "up";
      gsap.set(el, Object.assign({}, from[type] || from.up));
    });
    var to = {
      y: 0,
      x: 0,
      scale: 1,
      opacity: 1,
      clipPath: "inset(0% 0 0 0)",
      duration: 1,
      ease: "power3.out",
      stagger: 0.09,
      clearProps: "transform,clipPath",
    };
    if (inHero) {
      to.delay = 0.35;
      gsap.to(els, to);
    } else {
      to.scrollTrigger = { trigger: trig, start: "top 88%", once: true };
      gsap.to(els, to);
    }
  });

  // counters
  $$("[data-count]").forEach(function (el) {
    var n = +el.dataset.count,
      d = +(el.dataset.decimals || 0),
      o = { v: 0 };
    el.textContent = (el.dataset.prefix || "") + fmt(0, d) + (el.dataset.suffix || "");
    ScrollTrigger.create({
      trigger: el,
      start: "top 92%",
      once: true,
      onEnter: function () {
        gsap.to(o, {
          v: n,
          duration: 1.8,
          ease: "power2.out",
          onUpdate: function () {
            el.textContent = (el.dataset.prefix || "") + fmt(o.v, d) + (el.dataset.suffix || "");
          },
        });
      },
    });
  });

  // parallax: data-speed="0.15" (positive = moves slower than scroll)
  $$("[data-speed]").forEach(function (el) {
    var s = parseFloat(el.dataset.speed) || 0.15;
    gsap.fromTo(
      el,
      { yPercent: -s * 50 },
      {
        yPercent: s * 50,
        ease: "none",
        scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
      },
    );
  });

  // magnetic buttons (desktop)
  if (window.matchMedia("(pointer:fine)").matches) {
    $$("[data-magnetic]").forEach(function (b) {
      b.addEventListener("mousemove", function (e) {
        var r = b.getBoundingClientRect();
        gsap.to(b, {
          x: (e.clientX - r.left - r.width / 2) * 0.25,
          y: (e.clientY - r.top - r.height / 2) * 0.35,
          duration: 0.4,
        });
      });
      b.addEventListener("mouseleave", function () {
        gsap.to(b, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,.4)" });
      });
    });
  }
  window.addEventListener("load", function () {
    ScrollTrigger.refresh();
  });
})();

/* ===== 2. TEMPLATE INTERACTIONS – listings, search, property modal & detail page, valuation wizard, reviews ===== */
(function () {
  "use strict";
  var $ = site.$,
    $$ = site.$$;
  var LIST = window.LISTINGS || [];
  var lang = document.documentElement.lang || "en";
  var AREAS = window.AREAS || {};
  var T = window.LABELS || {};

  /* ---------- helpers ---------- */
  var money = function (v) {
    return new Intl.NumberFormat(lang, {
      style: "currency",
      currency: window.CURRENCY || "EUR",
      maximumFractionDigits: 0,
    }).format(v);
  };
  var img = function (name) {
    return "assets/img/" + name + ".jpg";
  };
  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  var icon = function (name) {
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><use href="#i-' + name + '"></use></svg>';
  };
  var priceHTML = function (l) {
    return money(l.price) + (l.status === "rent" ? " <small>" + T.month + "</small>" : "");
  };
  var specs = function (l) {
    return (
      "<span>" +
      icon("bed") +
      l.beds +
      " " +
      T.beds +
      "</span>" +
      "<span>" +
      icon("bath") +
      l.baths +
      " " +
      T.baths +
      "</span>" +
      "<span>" +
      icon("size") +
      l.size +
      " m²</span>"
    );
  };
  var byId = function (id) {
    return LIST.filter(function (l) {
      return l.id === id;
    })[0];
  };
  var favs = [];
  try {
    favs = JSON.parse(localStorage.getItem("haven-favs") || "[]");
  } catch (e) {}

  /* card markup – used by the listings grid and "similar properties" */
  function card(l) {
    return (
      '<article class="card" data-id="' +
      l.id +
      '">' +
      '<div class="ph"><img src="' +
      img(l.img) +
      '" alt="' +
      esc(l.title) +
      '" loading="lazy" width="800" height="600">' +
      '<div class="badges"><span>' +
      (l.status === "rent" ? T.rent : T.sale) +
      "</span>" +
      (l.badge ? '<span class="new">' + esc(l.badge) + "</span>" : "") +
      "</div>" +
      '<button type="button" class="fav' +
      (favs.indexOf(l.id) > -1 ? " on" : "") +
      '" aria-label="' +
      T.fav +
      '" aria-pressed="' +
      (favs.indexOf(l.id) > -1) +
      '">' +
      icon("heart") +
      "</button></div>" +
      '<div><div class="price">' +
      priceHTML(l) +
      "</div>" +
      '<h3><a class="card-link" href="property.html?id=' +
      encodeURIComponent(l.id) +
      '">' +
      esc(l.title) +
      "</a></h3>" +
      '<div class="loc">' +
      icon("pin") +
      esc(AREAS[l.area] || l.area) +
      "</div></div>" +
      '<div class="specs">' +
      specs(l) +
      "</div></article>"
    );
  }
  function toggleFav(btn, id) {
    var i = favs.indexOf(id);
    if (i > -1) favs.splice(i, 1);
    else favs.push(id);
    try {
      localStorage.setItem("haven-favs", JSON.stringify(favs));
    } catch (x) {}
    btn.classList.toggle("on", i < 0);
    btn.setAttribute("aria-pressed", i < 0);
  }

  /* ---------- listings grid + filters (index.html, index-2.html, listings.html) ---------- */
  var grid = $("#grid");
  var st = { status: "", type: "", area: "", max: 0, sort: "featured" };
  // read filters from the URL, e.g. listings.html?status=rent&area=centre
  var q = new URLSearchParams(location.search);
  ["status", "type", "area"].forEach(function (k) {
    if (q.get(k)) st[k] = q.get(k);
  });
  if (q.get("max")) st.max = +q.get("max") || 0;

  function render() {
    if (!grid) return;
    var list = LIST.filter(function (l) {
      return (
        (!st.status || l.status === st.status) &&
        (!st.type || l.type === st.type) &&
        (!st.area || l.area === st.area) &&
        (!st.max || l.price <= st.max)
      );
    });
    var limit = +grid.dataset.limit || 0;
    if (st.sort === "low")
      list.sort(function (a, b) {
        return a.price - b.price;
      });
    if (st.sort === "high")
      list.sort(function (a, b) {
        return b.price - a.price;
      });
    if (st.sort === "size")
      list.sort(function (a, b) {
        return b.size - a.size;
      });
    if (limit) list = list.slice(0, limit);
    var count = $("#count");
    if (count) count.textContent = count.dataset.tpl.replace("{n}", list.length);
    grid.innerHTML = list.length ? list.map(card).join("") : '<div class="empty-state">' + T.none + "</div>";
    if (site.hasGsap && !site.reduce && list.length)
      gsap.from(grid.children, {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.06,
        ease: "power3.out",
        clearProps: "all",
      });
    if (site.hasGsap) ScrollTrigger.refresh();
  }
  function syncChips() {
    $$(".chipf").forEach(function (x) {
      x.classList.toggle("is-active", x.dataset.status === st.status);
      x.setAttribute("aria-pressed", x.dataset.status === st.status);
    });
  }
  $$(".chipf").forEach(function (b) {
    b.addEventListener("click", function () {
      st.status = b.dataset.status;
      syncChips();
      render();
    });
  });
  var sort = $("#sort");
  if (sort)
    sort.addEventListener("change", function (e) {
      st.sort = e.target.value;
      render();
    });

  /* ---------- search form (hero / listings page) ---------- */
  var search = $("#search");
  if (search) {
    var mode = st.status === "rent" ? "rent" : "sale",
      priceSel = $("#s-price");
    var setMode = function (m) {
      mode = m;
      $$(".seg button", search).forEach(function (x) {
        x.classList.toggle("is-active", x.dataset.mode === m);
        x.setAttribute("aria-pressed", x.dataset.mode === m);
      });
      var first = priceSel.options[0].outerHTML;
      priceSel.innerHTML = first + priceSel.dataset[m];
    };
    $$(".seg button", search).forEach(function (b) {
      b.addEventListener("click", function () {
        setMode(b.dataset.mode);
      });
    });
    setMode(mode);
    if (st.area) $("#s-loc").value = st.area;
    if (st.type) $("#s-type").value = st.type;
    if (st.max) priceSel.value = String(st.max);
    search.addEventListener("submit", function (e) {
      var params = { status: mode, area: $("#s-loc").value, type: $("#s-type").value, max: priceSel.value };
      // no grid on this page (or the grid is only a preview) -> open the listings page with the filters
      if (!grid || search.dataset.target) {
        e.preventDefault();
        var qs = Object.keys(params)
          .filter(function (k) {
            return params[k];
          })
          .map(function (k) {
            return k + "=" + encodeURIComponent(params[k]);
          })
          .join("&");
        location.href = (search.dataset.target || "listings.html") + (qs ? "?" + qs : "");
        return;
      }
      e.preventDefault();
      st.status = params.status;
      st.area = params.area;
      st.type = params.type;
      st.max = +params.max || 0;
      syncChips();
      render();
      site.scrollTo(grid.closest("section") || grid);
    });
  }

  /* ---------- property quick-view modal ---------- */
  var modal = $("#modal"),
    cur = null,
    lastFocus = null;
  function openModal(id) {
    cur = byId(id);
    if (!cur || !modal) return false;
    lastFocus = document.activeElement;
    $("#m-img").src = img(cur.gallery[0]);
    $("#m-img").alt = cur.title;
    $("#m-thumbs").innerHTML = cur.gallery
      .map(function (g, i) {
        return (
          '<button type="button" class="' +
          (i ? "" : "on") +
          '" data-g="' +
          g +
          '" aria-label="Photo ' +
          (i + 1) +
          '"><img src="' +
          img(g) +
          '" alt=""></button>'
        );
      })
      .join("");
    $("#m-price").innerHTML = priceHTML(cur);
    $("#m-title").textContent = cur.title;
    $("#m-specs").innerHTML = specs(cur) + "<span>" + icon("pin") + esc(AREAS[cur.area] || "") + "</span>";
    $("#m-desc").textContent = cur.desc;
    $("#m-feat").innerHTML = cur.features
      .map(function (f) {
        return "<span>" + esc(f) + "</span>";
      })
      .join("");
    $("#m-more").href = "property.html?id=" + encodeURIComponent(cur.id);
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    if (site.lenis) site.lenis.stop();
    setTimeout(function () {
      $(".sheet .x").focus();
    }, 50);
    return true;
  }
  function closeModal() {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (site.lenis) site.lenis.start();
    if (lastFocus) lastFocus.focus();
  }
  if (modal) {
    $$("[data-close]", modal).forEach(function (b) {
      b.addEventListener("click", closeModal);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
    });
    $("#m-thumbs").addEventListener("click", function (e) {
      var b = e.target.closest("button");
      if (!b) return;
      $$("#m-thumbs button").forEach(function (x) {
        x.classList.toggle("on", x === b);
      });
      $("#m-img").src = img(b.dataset.g);
    });
  }

  /* clicks on cards: heart = favourite, title link = quick view (falls back to the detail page) */
  document.addEventListener("click", function (e) {
    var c = e.target.closest(".card[data-id]");
    if (!c) return;
    var fav = e.target.closest(".fav");
    if (fav) {
      e.preventDefault();
      toggleFav(fav, c.dataset.id);
      return;
    }
    if (e.target.closest("a") && modal && openModal(c.dataset.id)) e.preventDefault();
    else if (!e.target.closest("a")) {
      if (!(modal && openModal(c.dataset.id))) location.href = "property.html?id=" + encodeURIComponent(c.dataset.id);
    }
  });

  /* ---------- viewing request form (modal + property page): WhatsApp or e-mail ---------- */
  $$("form[data-viewing]").forEach(function (f) {
    var waTo = f.dataset.to;
    f.addEventListener("submit", function (e) {
      var l = cur || byId(f.dataset.id);
      var via = (e.submitter && e.submitter.dataset.via) || "whatsapp";
      f.dataset.send = via;
      f.dataset.to = via === "mail" ? f.dataset.mail : waTo;
      f.dataset.toast = via === "mail" ? f.dataset.toastMail : f.dataset.toastWa;
      site.send(
        f,
        l ? [f.dataset.lProp + ": " + l.title + " (#" + l.id + ")", f.dataset.lPrice + ": " + money(l.price)] : [],
      );
      f.dataset.to = waTo;
    });
  });

  /* ---------- property detail page (property.html?id=...) ---------- */
  var detail = $("#property");
  if (detail && LIST.length) {
    var p = byId(q.get("id")) || LIST[0];
    cur = p;
    document.title = p.title + " – Haven";
    $("#p-title").textContent = p.title;
    $("#p-crumb").textContent = p.title;
    $("#p-price").innerHTML = priceHTML(p);
    $("#p-loc").innerHTML = icon("pin") + esc(AREAS[p.area] || p.area);
    $("#p-status").textContent = p.status === "rent" ? T.rent : T.sale;
    $("#p-specs").innerHTML = specs(p) + "<span>" + icon("home") + esc((T.types || {})[p.type] || p.type) + "</span>";
    $("#p-desc").textContent = p.desc;
    $("#p-feat").innerHTML = p.features
      .map(function (f) {
        return "<li>" + icon("check") + esc(f) + "</li>";
      })
      .join("");
    var main = $("#p-img");
    main.src = img(p.gallery[0]);
    main.alt = p.title;
    $("#p-thumbs").innerHTML = p.gallery
      .map(function (g, i) {
        return (
          '<button type="button" class="' +
          (i ? "" : "on") +
          '" data-g="' +
          g +
          '" aria-label="Photo ' +
          (i + 1) +
          '"><img src="' +
          img(g) +
          '" alt="" loading="lazy"></button>'
        );
      })
      .join("");
    $("#p-thumbs").addEventListener("click", function (e) {
      var b = e.target.closest("button");
      if (!b) return;
      $$("#p-thumbs button").forEach(function (x) {
        x.classList.toggle("on", x === b);
      });
      main.src = img(b.dataset.g);
    });
    var vf = $("#p-form");
    if (vf) vf.dataset.id = p.id;
    var sim = $("#similar");
    if (sim)
      sim.innerHTML = LIST.filter(function (l) {
        return l.id !== p.id;
      })
        .sort(function (a, b) {
          return (b.status === p.status) - (a.status === p.status);
        })
        .slice(0, 3)
        .map(card)
        .join("");
  }

  /* ---------- free valuation wizard ---------- */
  var vform = $("#vform");
  if (vform) {
    var steps = $$(".vstep", vform),
      si = 0;
    var show = function (i) {
      si = i;
      steps.forEach(function (s, k) {
        s.classList.toggle("on", k === i);
      });
      $("#prog").style.width = ((i + 1) / steps.length) * 100 + "%";
      $("#vback").hidden = i === 0;
      $("#vnext").hidden = i === steps.length - 1;
      $("#vsend").hidden = i !== steps.length - 1;
      if (site.hasGsap && !site.reduce) gsap.from(steps[i], { x: 20, opacity: 0, duration: 0.4 });
    };
    $("#vnext").addEventListener("click", function () {
      var ok = $$("input,select", steps[si]).every(function (f) {
        return f.reportValidity();
      });
      if (ok) show(si + 1);
    });
    $("#vback").addEventListener("click", function () {
      show(si - 1);
    });
    vform.addEventListener("submit", function () {
      site.send(vform);
    });
  }

  /* ---------- reviews slider arrows ---------- */
  var revs = $("#revs");
  if (revs) {
    $("#rnext").addEventListener("click", function () {
      revs.scrollBy({ left: revs.clientWidth * 0.8, behavior: "smooth" });
    });
    $("#rprev").addEventListener("click", function () {
      revs.scrollBy({ left: -revs.clientWidth * 0.8, behavior: "smooth" });
    });
  }

  syncChips();
  render();
})();
