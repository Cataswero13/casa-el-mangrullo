/* Casa el Mangrullo · interacciones. Todo es opcional: sin JS el sitio se lee completo. */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const quieto = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const io = (cb, opt) => ("IntersectionObserver" in window ? new IntersectionObserver(cb, opt) : null);

  /* ---------- encabezado sólido al bajar ---------- */
  const top = $(".top");
  const hero = $(".hero");
  const onScroll = () => {
    const lim = hero ? hero.offsetHeight * 0.55 : 40;
    top.classList.toggle("solid", scrollY > lim);
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- menú ---------- */
  const burger = $(".burger");
  const menu = $("#menu");
  const abrir = () => {
    menu.hidden = false;
    requestAnimationFrame(() => menu.classList.add("abierto"));
    burger.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
    $("a", menu).focus();
  };
  const cerrar = (devolverFoco = true) => {
    menu.classList.remove("abierto");
    menu.hidden = true;
    burger.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
    if (devolverFoco) burger.focus();
  };
  burger.addEventListener("click", abrir);
  $(".menu-cerrar").addEventListener("click", () => cerrar());
  $$("#menu nav a").forEach((a) => a.addEventListener("click", () => cerrar(false)));
  menu.addEventListener("keydown", (e) => {
    if (e.key === "Escape") cerrar();
    if (e.key === "Tab") {
      const f = $$("a, button", menu);
      if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && document.activeElement === f[f.length - 1]) { e.preventDefault(); f[0].focus(); }
    }
  });

  /* ---------- aparición al hacer scroll ---------- */
  const rev = io((ents) => ents.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); rev.unobserve(en.target); } }), { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
  $$(".reveal").forEach((el) => (rev ? rev.observe(el) : el.classList.add("in")));

  /* ---------- momento del día + botón de WhatsApp según la sección ---------- */
  const fab = $(".wa-fab");
  const fabTxt = $(".wa-fab-txt");
  const reloj = $(".reloj-txt");
  let actual = null;
  const aplicar = (el) => {
    if (!el || el === actual) return;
    actual = el;
    if (el.dataset.momento) reloj.textContent = el.dataset.momento;
    const href = el.dataset.waHref;
    if (href && fab.getAttribute("href") !== href) {
      fab.setAttribute("href", href);
      fabTxt.textContent = el.dataset.waLabel;
      if (!quieto) { fab.classList.remove("pulso"); void fab.offsetWidth; fab.classList.add("pulso"); }
    }
  };
  // la sección (o tarjeta de habitación) que cruza la línea a 45% de la pantalla
  const zonas = $$("[data-wa]").filter((el) => !el.matches("a"));
  const mo = io((ents) => {
    ents.forEach((en) => { en.target._vis = en.isIntersecting; });
    // la más interna gana (tarjeta de habitación sobre su sección)
    const vis = zonas.filter((z) => z._vis);
    aplicar(vis[vis.length - 1]);
  }, { rootMargin: "-45% 0px -54% 0px" });
  zonas.forEach((z) => mo && mo.observe(z));

  /* ---------- parallax suave de la portada ---------- */
  const media = $("[data-parallax]");
  if (media && !quieto) {
    let tick = false;
    addEventListener("scroll", () => {
      if (tick) return;
      tick = true;
      requestAnimationFrame(() => {
        const y = scrollY;
        if (y < innerHeight * 1.2) media.style.transform = `translate3d(0, ${y * 0.28}px, 0) scale(${1 + y * 0.00012})`;
        tick = false;
      });
    }, { passive: true });
  }
  const hv = $(".hero-video");
  if (hv && quieto) hv.pause();

  /* ---------- luces colgantes (canvas ligero) ---------- */
  if (!quieto) {
    $$("canvas.luces").forEach((cv) => {
      const ctx = cv.getContext("2d");
      const esNoche = cv.classList.contains("luces-noche");
      let W, H, dpr, pts = [], vivo = false, raf;
      const crear = () => {
        dpr = Math.min(devicePixelRatio || 1, 2);
        W = cv.clientWidth; H = cv.clientHeight;
        cv.width = W * dpr; cv.height = H * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        const n = Math.round(Math.min(46, (W * H) / (esNoche ? 26000 : 16000)));
        pts = Array.from({ length: n }, () => ({
          x: Math.random() * W,
          y: (esNoche ? 0.25 + Math.random() * 0.75 : Math.random() * 0.7) * H,
          r: 0.8 + Math.random() * 2.2,
          a: Math.random() * Math.PI * 2,
          v: 0.004 + Math.random() * 0.012,
          dx: (Math.random() - 0.5) * 0.12,
          dy: -0.04 - Math.random() * 0.1,
        }));
      };
      const dibujar = () => {
        ctx.clearRect(0, 0, W, H);
        for (const p of pts) {
          p.a += p.v; p.x += p.dx; p.y += p.dy;
          if (p.y < -10) { p.y = H * (esNoche ? 1 : 0.75); p.x = Math.random() * W; }
          if (p.x < -10) p.x = W + 10; else if (p.x > W + 10) p.x = -10;
          const al = 0.35 + 0.45 * Math.sin(p.a);
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
          g.addColorStop(0, `rgba(255,214,140,${al})`);
          g.addColorStop(0.25, `rgba(255,190,100,${al * 0.35})`);
          g.addColorStop(1, "rgba(255,180,90,0)");
          ctx.fillStyle = g;
          ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 6, 0, 6.283); ctx.fill();
        }
        if (vivo) raf = requestAnimationFrame(dibujar);
      };
      const o = io(([en]) => {
        vivo = en.isIntersecting;
        if (vivo) { if (!pts.length) crear(); cancelAnimationFrame(raf); raf = requestAnimationFrame(dibujar); }
      });
      o && o.observe(cv);
      let t; addEventListener("resize", () => { clearTimeout(t); t = setTimeout(crear, 200); });
    });
  }

  /* ---------- fotos a pantalla completa ---------- */
  const lb = $(".lb");
  if (lb && typeof lb.showModal === "function") {
    const lbImg = $("img", lb), lbCap = $("figcaption", lb), lbN = $(".lb-cuenta", lb);
    let grupo = [], i = 0, origen = null;
    const mostrar = (k) => {
      i = (k + grupo.length) % grupo.length;
      const b = grupo[i];
      const im = $("img", b);
      lbImg.style.opacity = 0;
      lbImg.onload = () => (lbImg.style.opacity = 1);
      lbImg.src = b.dataset.full;
      lbImg.width = +b.dataset.w; lbImg.height = +b.dataset.h;
      lbImg.alt = im.alt;
      lbCap.textContent = im.alt;
      lbN.textContent = `${i + 1} / ${grupo.length}`;
      const multi = grupo.length > 1;
      $(".lb-prev", lb).hidden = !multi; $(".lb-next", lb).hidden = !multi;
    };
    document.addEventListener("click", (e) => {
      const b = e.target.closest("[data-lb]");
      if (!b) return;
      origen = b;
      grupo = $$(`[data-lb="${b.dataset.lb}"]`);
      mostrar(grupo.indexOf(b));
      lb.showModal();
      document.body.style.overflow = "hidden";
    });
    lb.addEventListener("close", () => { document.body.style.overflow = ""; origen && origen.focus(); });
    $(".lb-close", lb).addEventListener("click", () => lb.close());
    $(".lb-prev", lb).addEventListener("click", () => mostrar(i - 1));
    $(".lb-next", lb).addEventListener("click", () => mostrar(i + 1));
    lb.addEventListener("click", (e) => { if (e.target === lb || e.target.tagName === "FIGURE") lb.close(); });
    lb.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") mostrar(i - 1);
      if (e.key === "ArrowRight") mostrar(i + 1);
    });
    let x0 = null;
    lb.addEventListener("pointerdown", (e) => (x0 = e.clientX));
    lb.addEventListener("pointerup", (e) => {
      if (x0 === null) return;
      const dx = e.clientX - x0; x0 = null;
      if (Math.abs(dx) > 45) mostrar(dx < 0 ? i + 1 : i - 1);
    });
  } else {
    // navegador viejo: abre la foto en una pestaña
    document.addEventListener("click", (e) => { const b = e.target.closest("[data-lb]"); if (b) open(b.dataset.full, "_blank"); });
  }

  /* ---------- pestañas de alrededores ---------- */
  $$("[data-tabs]").forEach((box) => {
    const tabs = $$('[role="tab"]', box);
    const elegir = (t, foco) => {
      tabs.forEach((x) => {
        const on = x === t;
        x.setAttribute("aria-selected", on);
        x.tabIndex = on ? 0 : -1;
        $("#" + x.getAttribute("aria-controls")).hidden = !on;
      });
      if (foco) t.focus();
    };
    tabs.forEach((t, k) => {
      t.addEventListener("click", () => elegir(t));
      t.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") elegir(tabs[(k + 1) % tabs.length], true);
        if (e.key === "ArrowLeft") elegir(tabs[(k - 1 + tabs.length) % tabs.length], true);
      });
    });
    elegir(tabs[0]);
  });

  /* ---------- mapa bajo demanda (no frena la carga) ---------- */
  $$("[data-mapa]").forEach((m) => {
    const b = $(".mapa-btn", m);
    b && b.addEventListener("click", () => {
      m.innerHTML = `<iframe src="${m.dataset.mapa}" title="Mapa de Casa el Mangrullo en Google Maps" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>`;
    });
  });

  /* ---------- YouTube bajo demanda ---------- */
  $$("[data-yt]").forEach((b) => b.addEventListener("click", () => {
    b.outerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${b.dataset.yt}?autoplay=1&rel=0" title="Recorrido por Casa el Mangrullo" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen style="width:100%;height:100%;border:0"></iframe>`;
  }));

  /* ---------- shorts: se reproducen solos al verse (sin sonido) ---------- */
  const vids = $$("video[data-short]");
  const vo = io((ents) => ents.forEach((en) => {
    const v = en.target;
    if (en.isIntersecting && !quieto) { v.preload = "auto"; v.play().catch(() => {}); } else v.pause();
  }), { threshold: 0.6 });
  vids.forEach((v) => {
    vo && vo.observe(v);
    const b = v.parentElement.querySelector(".short-sonido");
    b && b.addEventListener("click", () => { v.muted = !v.muted; if (v.paused) v.play(); b.setAttribute("aria-label", v.muted ? "Activar sonido" : "Quitar sonido"); });
  });
})();
