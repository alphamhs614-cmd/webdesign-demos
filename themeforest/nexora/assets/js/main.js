/*!
 * Nexora – SaaS & AI Startup HTML Template
 * File: assets/js/main.js (un-minified, safe to edit)
 *
 * Contents
 *   1. Core interactions: theme toggle, smooth scrolling, sticky header, mobile menu,
 *      in-page anchors, toast messages, forms (mailto / WhatsApp), tabs, marquee,
 *      split-text headlines, scroll reveals, counters, parallax, magnetic buttons
 *   2. Template interactions: pricing toggle, AI typing effect, bento spotlight, hero mock animation
 *
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

/* ===== 2. TEMPLATE INTERACTIONS ===== */
(function () {
  // pricing toggle (monthly / yearly)
  site.$$("[data-bill]").forEach(function (b) {
    b.addEventListener("click", function () {
      var k = b.getAttribute("data-bill");
      site.$$("[data-bill]").forEach(function (x) {
        x.classList.toggle("on", x === b);
        x.setAttribute("aria-pressed", x === b);
      });
      site.$$(".amt").forEach(function (a) {
        var to = +a.getAttribute("data-" + k);
        if (site.hasGsap && !site.reduce) {
          var o = { v: +a.textContent };
          gsap.to(o, {
            v: to,
            duration: 0.5,
            ease: "power2.out",
            onUpdate: function () {
              a.textContent = Math.round(o.v);
            },
          });
        } else a.textContent = to;
      });
      site.$$(".billed").forEach(function (s) {
        s.textContent = s.getAttribute("data-" + k);
      });
    });
  });
  // typing effect in the AI prompt
  var t = site.$(".typed");
  if (t && !site.reduce && "IntersectionObserver" in window) {
    var full = t.getAttribute("data-typed");
    t.textContent = "";
    var io = new IntersectionObserver(
      function (es) {
        if (!es[0].isIntersecting) return;
        io.disconnect();
        var i = 0;
        (function tick() {
          t.textContent = full.slice(0, ++i);
          if (i < full.length) setTimeout(tick, 32);
          else t.classList.add("done");
        })();
      },
      { threshold: 0.5 },
    );
    io.observe(t);
  }
  // spotlight on bento cards
  site.$$(".b").forEach(function (c) {
    c.addEventListener("pointermove", function (e) {
      var r = c.getBoundingClientRect();
      c.style.setProperty("--mx", e.clientX - r.left + "px");
      c.style.setProperty("--my", e.clientY - r.top + "px");
    });
  });
  if (!site.hasGsap || site.reduce) return;
  // product mock tilts into place on scroll (only on pages that have the mock)
  if (site.$(".mock")) {
    gsap.fromTo(
      ".mock",
      { rotateX: 22, scale: 0.92, y: 40 },
      {
        rotateX: 0,
        scale: 1,
        y: 0,
        ease: "none",
        scrollTrigger: { trigger: ".mock-wrap", start: "top 95%", end: "top 25%", scrub: true },
      },
    );
    gsap.from(".mchart .bars i", { scaleY: 0, duration: 1.1, ease: "power3.out", stagger: 0.05, delay: 0.6 });
    gsap.from(".mchart .line path", { strokeDashoffset: 600, duration: 2, ease: "power2.out", delay: 0.8 });
  }
  // hero glow drifts on scroll
  var heroGlow = site.$("[data-hero] .glow");
  if (heroGlow) {
    gsap.to(heroGlow, {
      yPercent: 30,
      ease: "none",
      scrollTrigger: { trigger: heroGlow.parentElement, start: "top top", end: "bottom top", scrub: true },
    });
  }
})();
