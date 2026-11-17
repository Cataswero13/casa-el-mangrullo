// Genera dist/ a partir de contenido/sitio.mjs + src/.
// Uso: node build.mjs   (Vercel lo corre solo en cada push)
import { readFileSync, writeFileSync, mkdirSync, cpSync, rmSync, existsSync } from "node:fs";
import * as D from "./contenido/sitio.mjs";
import { sprite, ico } from "./src/iconos.mjs";

const OUT = "dist";
const VERSION = Date.now().toString(36);

// ---------- utilidades ----------
const esc = (s = "") => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const money = (n) => "$" + n.toLocaleString("es-MX");
const wa = (key) => `https://wa.me/${D.WHATSAPP}?text=${encodeURIComponent(D.mensajes[key])}`;
const waAttrs = (key, label) =>
  `data-wa="${key}" data-wa-href="${esc(wa(key))}" data-wa-label="${esc(label || D.botonFlotante[key] || D.botonFlotante.general)}"`;

// tamaños reales de cada foto (assets/img/web/sizes.txt: "nombre ancho alto")
const sizes = Object.fromEntries(
  readFileSync("assets/img/web/sizes.txt", "utf8").trim().split("\n").map((l) => {
    const [n, w, h] = l.split(/\s+/);
    return [n, { w: +w, h: +h }];
  })
);
const src = (n, w) => `assets/img/web/${n}-${w}.webp`;
const srcset = (n) => `${src(n, 480)} 480w, ${src(n, sizes[n].w)} ${sizes[n].w}w`;
const alt = (n) => {
  if (!D.fotos[n]) throw new Error(`Falta el texto alternativo de la foto "${n}" en contenido/sitio.mjs`);
  if (!sizes[n]) throw new Error(`No existe la foto "${n}" en assets/img/web/`);
  return D.fotos[n];
};
function img(n, { sz = "100vw", cls = "", lazy = true, prio = false } = {}) {
  const { w, h } = sizes[n];
  return `<img class="${cls}" src="${src(n, w)}" srcset="${srcset(n)}" sizes="${sz}" width="${w}" height="${h}" alt="${esc(alt(n))}"${lazy ? ' loading="lazy"' : ""} decoding="async"${prio ? ' fetchpriority="high"' : ""}>`;
}
// Foto que abre la vista a pantalla completa
function fotoLb(n, grupo, sz, cls = "") {
  return `<button type="button" class="ph ${cls}" data-lb="${grupo}" data-full="${src(n, sizes[n].w)}" data-w="${sizes[n].w}" data-h="${sizes[n].h}" aria-label="Ver foto en grande: ${esc(alt(n))}">${img(n, { sz })}</button>`;
}
const btnWa = (key, texto, cls = "btn btn-wa") =>
  `<a class="${cls}" href="${esc(wa(key))}" target="_blank" rel="noopener">${ico("whatsapp")}<span>${texto}</span></a>`;

// ---------- secciones ----------
const H = D.historia;

function momento(id, icono, extra = "", fotosCls = "") {
  const m = H[id];
  const g = D.galerias[id];
  return `
<section id="${id}" class="momento m-${id}" data-momento="${esc(m.etiqueta)}" ${waAttrs("general")}>
  ${extra}
  <div class="wrap momento-grid">
    <header class="m-head reveal">
      <p class="hora">${ico(icono)} <span>${m.hora}</span> · ${m.etiqueta}</p>
      <h2>${m.titulo}</h2>
      ${m.parrafos.map((p) => `<p class="story">${p}</p>`).join("")}
    </header>
    <div class="carril ${fotosCls}" role="list" aria-label="Fotos: ${esc(m.etiqueta)}">
      ${g.map((n, i) => `<div class="carril-item reveal" role="listitem" style="--d:${i}">${fotoLb(n, id, "(min-width: 900px) 30vw, 78vw")}</div>`).join("")}
    </div>
  </div>
</section>`;
}

const sellosHtml = `<ul class="sellos reveal">${D.sellos
  .map((s) => `<li class="sello">${ico(s.icono, "ico ico-lg")}<div><strong>${s.titulo}</strong><span>${s.texto}</span></div></li>`)
  .join("")}</ul>`;

const petalos = `<div class="petalos" aria-hidden="true">${Array.from({ length: 9 }, (_, i) => `<i style="--i:${i}"></i>`).join("")}</div>`;

function habitacion(h) {
  return `
  <article class="hab reveal" id="hab-${h.id}" ${waAttrs(h.id, `Reservar ${h.nombre}`)}>
    <div class="hab-fotos">
      <div class="hab-carril" role="list" aria-label="Fotos de ${h.nombre}">
        ${h.fotos.map((n) => `<div class="hab-slide" role="listitem">${fotoLb(n, h.id, "(min-width: 900px) 45vw, 100vw")}</div>`).join("")}
      </div>
      <p class="hab-cuenta" aria-hidden="true">${ico("cine", "ico ico-sm")} ${h.fotos.length} fotos · desliza</p>
    </div>
    <div class="hab-body">
      <p class="hab-tag">Habitación</p>
      <h3>${h.nombre}</h3>
      <p class="hab-frase">${h.frase}</p>
      <ul class="hab-datos">
        <li>${ico("personas")}<span>Hasta <strong>${h.personas} personas</strong></span></li>
        <li>${ico("cama")}<span>${h.camas}</span></li>
        <li>${ico("bano")}<span>${h.bano}</span></li>
      </ul>
      <ul class="hab-detalles">${h.detalles.map((d) => `<li>${ico("check", "ico ico-sm")}${d}</li>`).join("")}</ul>
      <div class="hab-precio">
        <p><span class="precio">${money(h.precio)}</span> <span class="por">MXN por noche</span></p>
        <p class="nota">Habitación completa · reserva directa</p>
      </div>
      ${btnWa(h.id, `Reservar ${h.nombre}`, "btn btn-wa btn-block")}
      <a class="link-sec" href="${h.airbnb}" target="_blank" rel="noopener">También está en Airbnb · ★ ${h.calificacion} (${h.resenas})</a>
    </div>
  </article>`;
}

function ahorroHtml() {
  const a = D.ahorro;
  const dif = a.airbnbNoche - a.directoNoche;
  const total = a.airbnbTotal - a.directoNoche * a.noches;
  const pct = Math.round((a.directoNoche / a.airbnbNoche) * 100);
  return `
<section id="ahorro" class="ahorro" data-momento="Reserva directo" ${waAttrs("general", "Reserva directo")}>
  <div class="wrap ahorro-grid">
    <div class="reveal">
      <p class="kicker">Reserva directo y ahorra</p>
      <h2>Lo mismo, pero <em>más barato</em></h2>
      <p class="lead">Cuando reservas por WhatsApp no pagas comisiones de plataforma. Hablas directo con Hugo y el ahorro se queda contigo.</p>
    </div>
    <div class="comparador reveal" aria-label="Comparación de precio por noche para ${a.habitacion}">
      <p class="comp-hab">${a.habitacion}, precio por noche</p>
      <div class="barra barra-airbnb"><span class="barra-l">En Airbnb, con cargos</span><span class="barra-v">≈ ${money(a.airbnbNoche)}</span><i style="--w:100%"></i></div>
      <div class="barra barra-directo"><span class="barra-l">Directo con Hugo</span><span class="barra-v">${money(a.directoNoche)}</span><i style="--w:${pct}%"></i></div>
      <p class="comp-total">Ahorras ≈ <strong>${money(dif)}</strong> por noche: <strong>${money(total)}</strong> en ${a.noches} noches.</p>
      <p class="comp-nota">${a.nota}</p>
    </div>
    <ul class="ventajas reveal">
      <li>${ico("check")}<span>Trato directo con el anfitrión, sin intermediarios</span></li>
      <li>${ico("check")}<span>Descuento en estancias de más de una semana o por mes</span></li>
      <li>${ico("check")}<span>Pagas en efectivo, transferencia o tarjeta</span></li>
      <li>${ico("check")}<span>Apartas con el 50% y el resto al llegar</span></li>
    </ul>
    <div class="cta-pila reveal">
      ${btnWa("general", "Reservar directo")}
      ${btnWa("descuento", "Pedir descuento por estancia larga", "btn btn-line")}
    </div>
  </div>
</section>`;
}

function resenasHtml() {
  return `
<section id="resenas" class="resenas" data-momento="Reseñas" ${waAttrs("general")}>
  <div class="wrap">
    <div class="res-top reveal">
      <p class="kicker">Lo que dicen quienes ya vinieron</p>
      <p class="nota-grande"><span class="num">${D.casa.calificacion}</span> ${ico("estrella", "ico ico-star")}</p>
      <p class="res-total">${D.casa.totalResenas} reseñas de huéspedes en Airbnb</p>
      <ul class="cats">${D.categorias.map((c) => `<li><span>${c.nombre}</span><b>${c.valor}</b><i style="--v:${(+c.valor / 5) * 100}%"></i></li>`).join("")}</ul>
    </div>
    <blockquote class="frase-xl reveal"><p>“${D.frasesDestacadas[0]}”</p></blockquote>
  </div>
  <div class="res-carril" aria-label="Reseñas de huéspedes" role="region" tabindex="0">
    ${D.resenas
      .map(
        (r) => `<figure class="res">
      <p class="res-stars" role="img" aria-label="5 estrellas">${ico("estrella", "ico ico-star")}${ico("estrella", "ico ico-star")}${ico("estrella", "ico ico-star")}${ico("estrella", "ico ico-star")}${ico("estrella", "ico ico-star")}</p>
      <blockquote><p>${esc(r.texto)}</p></blockquote>
      <figcaption><strong>${esc(r.nombre)}</strong>${r.origen ? ` · ${esc(r.origen)}` : ""}<span>${[r.tipo, r.fecha].filter(Boolean).join(" · ")}</span></figcaption>
    </figure>`
      )
      .join("")}
  </div>
  <p class="wrap res-hint" aria-hidden="true">Desliza para leer más ${ico("der", "ico ico-sm")}</p>
</section>`;
}

function videoHtml() {
  const V = D.videos;
  let player;
  if (V.recorridoYouTube) {
    player = `<button type="button" class="yt" data-yt="${esc(V.recorridoYouTube)}" aria-label="Reproducir el recorrido en video">${img(V.recorridoPoster, { sz: "(min-width: 1100px) 1040px, 100vw" })}<span class="play">${ico("play")}</span></button>`;
  } else if (V.recorridoMp4) {
    player = `<video controls playsinline preload="none" poster="${src(V.recorridoPoster, sizes[V.recorridoPoster].w)}" width="1600" height="900"><source src="${V.recorridoMp4}" type="video/mp4">Tu navegador no puede reproducir este video.</video>`;
  } else {
    // <!-- VIDEO DEL RECORRIDO: sube el MP4 a assets/video/recorrido.mp4 y escribe la ruta en contenido/sitio.mjs → videos.recorridoMp4 -->
    player = `<div class="video-pendiente">${img(V.recorridoPoster, { sz: "(min-width: 1100px) 1040px, 100vw" })}<p class="vp-label">${ico("play", "ico ico-sm")} Recorrido en video · muy pronto</p></div>`;
  }
  return `
<section id="recorrido" class="recorrido" data-momento="Recorrido" ${waAttrs("general")}>
  <div class="wrap">
    <div class="reveal">
      <p class="kicker">Antes de llegar</p>
      <h2>Date una vuelta por la casa</h2>
    </div>
    <!-- VIDEO DEL RECORRIDO (horizontal 16:9). Archivo: assets/video/recorrido.mp4 → contenido/sitio.mjs: videos.recorridoMp4 -->
    <div class="player reveal">${player}</div>
  </div>
  <!-- SHORTS VERTICALES (9:16). Archivos: assets/video/short-1.mp4, short-2.mp4… → contenido/sitio.mjs: videos.shorts[n].mp4 -->
  <div class="shorts" role="region" aria-label="Momentos en video">
    ${V.shorts
      .map((s, i) =>
        s.mp4
          ? `<figure class="short"><video muted loop playsinline preload="none" poster="${src(s.poster, 480)}" data-short><source src="${s.mp4}" type="video/mp4"></video><figcaption>${esc(s.titulo)}</figcaption><button type="button" class="short-sonido" aria-label="Activar sonido">${ico("play", "ico ico-sm")}</button></figure>`
          : `<figure class="short">${fotoLb(s.poster, "shorts", "(min-width: 900px) 240px, 58vw")}<figcaption>${esc(s.titulo)}</figcaption></figure>`
      )
      .join("")}
  </div>
</section>`;
}

function casaHtml() {
  return `
<section id="casa" class="casa" data-momento="La casa" ${waAttrs("general")}>
  <div class="wrap">
    <div class="reveal">
      <p class="kicker">Para todos los huéspedes</p>
      <h2>Toda la casa es tuya también</h2>
      <p class="lead">Las dos habitaciones comparten el jardín y las áreas comunes. Úsalas como quieras: para leer, trabajar, jugar o no hacer nada.</p>
    </div>
    <ul class="areas">
      ${D.areas.map((a, i) => `<li class="area reveal" style="--d:${i % 4}">${ico(a.icono, "ico ico-lg")}<h3>${a.titulo}</h3><p>${a.texto}</p></li>`).join("")}
    </ul>
    <div class="casa-bottom">
      <div class="reveal">
        <h3 class="h-sm">Para jugar</h3>
        <ul class="chips">${D.actividades.map((a) => `<li>${a}</li>`).join("")}</ul>
      </div>
      <details class="amen reveal">
        <summary><span>Ver todas las amenidades</span>${ico("abajo")}</summary>
        <ul>${D.amenidades.map((a) => `<li>${ico("check", "ico ico-sm")}${a}</li>`).join("")}</ul>
      </details>
    </div>
    ${sellosHtml}
  </div>
</section>`;
}

function eventosHtml() {
  const E = D.eventos;
  return `
<section id="eventos" class="eventos" data-momento="Eventos" ${waAttrs("evento")}>
  <div class="wrap eventos-grid">
    <div class="reveal">
      <p class="kicker">Eventos en el jardín</p>
      <h2>${E.titulo}</h2>
      <p class="lead">${E.intro}</p>
      <ul class="ev-datos">
        <li><b>${E.capacidad}</b><span>personas máximo</span></li>
        <li><b>2 a.m.</b><span>${E.horario.replace("Hasta las 2:00 a.m., ", "")}</span></li>
      </ul>
    </div>
    <div class="ev-fotos">
      ${E.fotos.map((n, i) => `<div class="ev-foto reveal" style="--d:${i}">${fotoLb(n, "eventos", "(min-width: 900px) 22vw, 45vw")}</div>`).join("")}
    </div>
    <div class="tabla-wrap reveal">
      <table class="tabla">
        <caption>Precio por persona (MXN)</caption>
        <thead><tr><th scope="col">Invitados</th><th scope="col">Por persona</th></tr></thead>
        <tbody>${E.precios.map((p) => `<tr><th scope="row">${p.rango}</th><td>${money(p.precio)}</td></tr>`).join("")}</tbody>
      </table>
      <p class="incluye"><strong>Incluye:</strong> ${E.incluye.join(" · ")}.</p>
      <p class="aparte">${E.aparte}</p>
      <p class="aparte">${E.hospedaje}</p>
      ${btnWa("evento", "Cotizar mi evento", "btn btn-wa btn-block")}
    </div>
  </div>
</section>`;
}

function extrasHtml() {
  const iconoFecha = { halloween: "calabaza", navidad: "regalo", sanvalentin: "corazon" };
  return `
<section id="extras" class="extras" data-momento="Servicios" ${waAttrs("extras")}>
  <div class="wrap">
    <div class="reveal">
      <p class="kicker">Servicios extra</p>
      <h2>Tú descansa, nosotros nos encargamos</h2>
      <p class="lead">Pídelos al reservar o durante tu estancia. Cada uno se cotiza por WhatsApp según lo que necesites.</p>
    </div>
    <div class="extras-grid">
      <figure class="extra-foto reveal">${fotoLb("desayuno-jardin", "extras", "(min-width: 900px) 34vw, 100vw")}<figcaption>Desayuno en el jardín · servicio aparte</figcaption></figure>
      <ul class="extras-lista">
        ${D.extras.map((e, i) => `<li class="reveal" style="--d:${i % 3}">${ico(e.icono, "ico ico-lg")}<div><h3>${e.titulo}</h3><p>${e.texto}</p></div></li>`).join("")}
      </ul>
    </div>
    <div class="cta-centro reveal">${btnWa("extras", "Cotizar un servicio")}</div>
    <h3 class="h-fechas reveal">Fechas especiales</h3>
    <ul class="fechas">
      ${D.fechasEspeciales
        .map(
          (f, i) => `<li class="fecha reveal" style="--d:${i}">${ico(iconoFecha[f.clave] || "estrella", "ico ico-lg")}<h4>${f.titulo}</h4><p>${f.texto}</p><a class="link-wa" href="${esc(wa(f.clave))}" target="_blank" rel="noopener">${ico("whatsapp", "ico ico-sm")} Preguntar fechas</a></li>`
        )
        .join("")}
    </ul>
  </div>
</section>`;
}

function alrededoresHtml() {
  const A = D.alrededores;
  return `
<section id="alrededores" class="alrededores" data-momento="Alrededores" ${waAttrs("general")}>
  <div class="wrap">
    <div class="reveal">
      <p class="kicker">Alrededores</p>
      <h2>${A.frase}</h2>
      <p class="lead">Estás en San Andrés Totoltepec, pueblo originario de Tlalpan, junto a la carretera a Cuernavaca y la subida al Ajusco.</p>
    </div>
    <div class="tabs reveal" data-tabs>
      <div class="tab-lista" role="tablist" aria-label="Qué hay cerca">
        ${A.grupos.map((g, i) => `<button type="button" role="tab" id="tab-${g.id}" aria-controls="panel-${g.id}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${g.titulo}</button>`).join("")}
      </div>
      ${A.grupos
        .map(
          (g) => `<div class="tab-panel" role="tabpanel" id="panel-${g.id}" aria-labelledby="tab-${g.id}">
        <h3 class="tab-titulo">${g.titulo}</h3>
        <ul class="lugares">${g.lugares.map((l) => `<li><span class="dist">${l.dist}</span><div><strong>${l.nombre}</strong><p>${l.nota}</p></div></li>`).join("")}</ul>
      </div>`
        )
        .join("")}
    </div>
    <p class="nota-pie">Distancias aproximadas en línea recta. ¿Quieres ir a Xochimilco, Six Flags o al Estadio? Pregunta por el servicio de traslado.</p>
  </div>
</section>`;
}

function reglasHtml() {
  return `
<section id="reglas" class="reglas" data-momento="Antes de reservar" ${waAttrs("general")}>
  <div class="wrap reglas-grid">
    <div class="reveal">
      <p class="kicker">Antes de reservar</p>
      <h2>Lo que hay que saber</h2>
      <p class="lead">Pocas reglas, claras, para que todos descansen igual de bien.</p>
      <ul class="horarios">
        <li><span>Llegada</span><b>${D.casa.llegada}</b></li>
        <li><span>Salida</span><b>${D.casa.salida}</b></li>
        <li><span>Silencio</span><b>11 p.m.–8 a.m.</b></li>
      </ul>
    </div>
    <div class="acordeon reveal">
      ${D.reglas.map((r, i) => `<details${i === 0 ? " open" : ""}><summary><span>${r.titulo}</span>${ico("abajo")}</summary><ul>${r.puntos.map((p) => `<li>${p}</li>`).join("")}</ul></details>`).join("")}
    </div>
  </div>
</section>`;
}

function ubicacionHtml() {
  const d = D.casa.direccion;
  const redes = Object.entries(D.casa.redes).filter(([, v]) => v);
  return `
<section id="ubicacion" class="ubicacion" data-momento="Cómo llegar" ${waAttrs("general")}>
  <div class="wrap ubi-grid">
    <div class="reveal">
      <p class="kicker">Ubicación y contacto</p>
      <h2>Te esperamos en Tlalpan</h2>
      <address class="dir">${ico("pin", "ico ico-lg")}<span>${d.calle}, ${d.colonia},<br>${d.alcaldia}, ${d.ciudad}, C.P. ${d.cp}</span></address>
      <div class="cta-pila">
        <a class="btn btn-line" href="${D.casa.mapsUrl}" target="_blank" rel="noopener">${ico("mapa")}<span>Abrir en Google Maps</span></a>
        ${btnWa("general", `WhatsApp ${D.WHATSAPP_VISIBLE}`)}
      </div>
      <p class="anfitrion">Tu anfitrión: <strong>${D.casa.anfitrion}</strong> · identidad verificada.</p>
      ${redes.length ? `<p class="redes">${redes.map(([k, v]) => `<a href="${v}" target="_blank" rel="noopener">${k}</a>`).join(" · ")}</p>` : ""}
    </div>
    <div class="mapa reveal" data-mapa="${esc(D.casa.mapsEmbed)}">
      <div class="mapa-ph">
        ${img("habitaciones-jacaranda", { sz: "(min-width: 900px) 50vw, 100vw" })}
        <button type="button" class="btn btn-claro mapa-btn">${ico("pin")}<span>Ver el mapa aquí</span></button>
      </div>
    </div>
    <div class="airbnb reveal">
      <p>¿Prefieres reservar por Airbnb? También estamos ahí (aunque directo te sale más barato):</p>
      <ul>${D.habitaciones.map((h) => `<li><a href="${h.airbnb}" target="_blank" rel="noopener">${h.nombre} en Airbnb</a></li>`).join("")}</ul>
    </div>
  </div>
</section>`;
}

function cierreHtml() {
  return `
<section id="cierre" class="cierre" data-momento="Vivir despacio" ${waAttrs("general")}>
  ${img("jardin-noche-luces", { sz: "100vw", cls: "cierre-bg" })}
  <div class="cierre-txt wrap reveal">
    ${ico("hoja", "ico ico-lg")}
    <h2>${H.cierre.titulo}</h2>
    ${H.cierre.parrafos.map((p) => `<p>${p}</p>`).join("")}
    <p class="lema-final">Casa el Mangrullo.<br><em>${D.casa.lema}.</em></p>
    ${btnWa("general", "Reservar por WhatsApp")}
  </div>
</section>`;
}

// ---------- portada ----------
function heroHtml() {
  const V = D.videos;
  // <!-- VIDEO DE PORTADA: assets/video/portada.mp4 (horizontal) y opcional portada-vertical.mp4 → contenido/sitio.mjs: videos.portadaMp4 -->
  const pic = `<picture>
      <source media="(min-width: 800px) and (orientation: landscape)" srcset="${srcset("casa-noche-torre")}" sizes="100vw">
      <img class="hero-img" src="${src("picnic-luces-noche", 675)}" srcset="${srcset("picnic-luces-noche")}" sizes="100vw" width="675" height="900" alt="${esc(alt("picnic-luces-noche"))}" fetchpriority="high" decoding="async">
    </picture>`;
  const vid = V.portadaMp4
    ? `<video class="hero-video" autoplay muted loop playsinline preload="metadata" poster="${src("casa-noche-torre", sizes["casa-noche-torre"].w)}" aria-hidden="true">
        ${V.portadaMp4Vertical ? `<source src="${V.portadaMp4Vertical}" type="video/mp4" media="(orientation: portrait)">` : ""}
        <source src="${V.portadaMp4}" type="video/mp4">
      </video>`
    : "";
  return `
<section class="hero" id="inicio" data-momento="Bienvenida" ${waAttrs("general")}>
  <div class="hero-media" data-parallax>
    ${pic}
    ${vid}
  </div>
  <canvas class="luces" aria-hidden="true"></canvas>
  <div class="hero-txt">
    <p class="kicker kicker-claro">Tlalpan · Ciudad de México</p>
    <h1><span class="h1-small">Casa el</span> Mangrullo</h1>
    <p class="lema">Sal de tu rutina<br><em>sin salir de la ciudad</em></p>
    <div class="hero-cta">
      ${btnWa("general", "Reservar por WhatsApp")}
      <p class="desde">Desde <strong>${money(D.habitaciones[0].precio)}</strong> la noche · ★ ${D.casa.calificacion} (${D.casa.totalResenas} reseñas)</p>
    </div>
  </div>
  <a class="scroll-cue" href="#llegada" aria-label="Bajar a conocer la casa"><span>Entra</span>${ico("abajo")}</a>
</section>`;
}

// ---------- página ----------
const css = readFileSync("src/estilos.css", "utf8").replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s*\n\s*/g, "").replace(/\s{2,}/g, " ");
const nav = [
  ["#llegada", "La casa"],
  ["#habitaciones", "Habitaciones"],
  ["#ahorro", "Reserva directo"],
  ["#resenas", "Reseñas"],
  ["#eventos", "Eventos"],
  ["#extras", "Servicios"],
  ["#alrededores", "Alrededores"],
  ["#reglas", "Reglas"],
  ["#ubicacion", "Ubicación"],
];

const torre = `<svg class="logo-torre" viewBox="0 0 32 32" aria-hidden="true"><path d="M11 30V12l5-5 5 5v18z" fill="#E2A93B"/><path d="M9.5 12.5 16 6l6.5 6.5" fill="none" stroke="#B5532F" stroke-width="2" stroke-linejoin="round"/><rect x="14" y="14" width="4" height="4" rx=".5" fill="#141B26"/><path d="M3 30h26" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><circle cx="6" cy="22" r="4" fill="#3E5A3F"/><path d="M6 26v4" stroke="#3E5A3F" stroke-width="1.6"/></svg>`;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  name: D.casa.nombre,
  description: D.casa.descripcionSEO,
  url: D.SITIO_URL,
  image: [`${D.SITIO_URL}/og.jpg`, `${D.SITIO_URL}/${src("fachada-dia-torre-patio", sizes["fachada-dia-torre-patio"].w)}`],
  telephone: "+" + D.WHATSAPP,
  priceRange: `${money(D.habitaciones[0].precio)}–${money(D.habitaciones[1].precio)} MXN por noche`,
  currenciesAccepted: "MXN",
  paymentAccepted: "Efectivo, transferencia, tarjeta",
  checkinTime: "15:00",
  checkoutTime: "12:00",
  petsAllowed: true,
  numberOfRooms: D.habitaciones.length,
  address: {
    "@type": "PostalAddress",
    streetAddress: D.casa.direccion.calle,
    addressLocality: `${D.casa.direccion.colonia}, ${D.casa.direccion.alcaldia}`,
    addressRegion: "Ciudad de México",
    postalCode: D.casa.direccion.cp,
    addressCountry: "MX",
  },
  hasMap: D.casa.mapsUrl,
  aggregateRating: { "@type": "AggregateRating", ratingValue: D.casa.calificacion, reviewCount: D.casa.totalResenas, bestRating: "5" },
  amenityFeature: [
    "Wifi", "Estacionamiento gratuito", "Jardín", "Mesa de billar", "Piano", "Lugar para fogatas", "Parrilla",
    "Gimnasio al aire libre", "Se admiten mascotas", "Cargador para auto eléctrico", "Área para trabajar",
  ].map((n) => ({ "@type": "LocationFeatureSpecification", name: n, value: true })),
  makesOffer: D.habitaciones.map((h) => ({
    "@type": "Offer",
    name: `Habitación ${h.nombre}`,
    price: h.precio,
    priceCurrency: "MXN",
    description: `${h.frase}. Hasta ${h.personas} personas. ${h.bano}.`,
  })),
};

const html = `<!doctype html>
<html lang="es-MX">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${D.casa.nombre} · Hospedaje y jardín para eventos en Tlalpan, CDMX</title>
<meta name="description" content="${esc(D.casa.descripcionSEO)}">
<link rel="canonical" href="${D.SITIO_URL}/">
<meta name="theme-color" content="#141B26">
<link rel="icon" href="favicon.svg" type="image/svg+xml">
<link rel="icon" href="favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="apple-touch-icon.png">
<link rel="manifest" href="site.webmanifest">
<meta property="og:type" content="website">
<meta property="og:locale" content="es_MX">
<meta property="og:site_name" content="${D.casa.nombre}">
<meta property="og:title" content="${D.casa.nombre} · ${D.casa.lema}">
<meta property="og:description" content="Un refugio de bosque en Tlalpan, CDMX. Dos habitaciones, jardín con luces, billar, fogata y animalitos. Reserva directo desde ${money(D.habitaciones[0].precio)} la noche.">
<meta property="og:url" content="${D.SITIO_URL}/">
<meta property="og:image" content="${D.SITIO_URL}/og.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(alt("casa-noche-torre"))}">
<meta name="twitter:card" content="summary_large_image">
<link rel="preload" href="assets/fonts/fraunces-latin-wght-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" as="image" href="${src("picnic-luces-noche", 675)}" imagesrcset="${srcset("picnic-luces-noche")}" imagesizes="100vw" media="(max-width: 799px), (orientation: portrait)" fetchpriority="high">
<style>${css}</style>
<script>document.documentElement.classList.add("js")</script>
<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
</head>
<body>
${sprite}
<a class="skip" href="#contenido">Saltar al contenido</a>

<header class="top" id="top">
  <a class="logo" href="#inicio" aria-label="${D.casa.nombre}, ir al inicio">${torre}<span>Casa el <b>Mangrullo</b></span></a>
  <p class="reloj" aria-hidden="true"><span class="reloj-txt">Bienvenida</span></p>
  <nav class="nav-desk" aria-label="Secciones">
    ${nav.slice(0, 6).map(([h, t]) => `<a href="${h}">${t}</a>`).join("")}
  </nav>
  <button type="button" class="burger" aria-expanded="false" aria-controls="menu" aria-label="Abrir menú">${ico("menu")}</button>
</header>

<div class="menu" id="menu" hidden>
  <nav aria-label="Menú principal">
    <ul>${nav.map(([h, t], i) => `<li style="--d:${i}"><a href="${h}">${t}</a></li>`).join("")}</ul>
  </nav>
  <div class="menu-pie">
    ${btnWa("general", "Reservar por WhatsApp", "btn btn-wa btn-block")}
    <p>${D.casa.direccion.colonia}, ${D.casa.direccion.alcaldia}</p>
  </div>
  <button type="button" class="menu-cerrar" aria-label="Cerrar menú">${ico("cerrar")}</button>
</div>

<main id="contenido">
${heroHtml()}
${momento("llegada", "pin", "", "carril-llegada")}
${momento("manana", "sol", petalos)}
${momento("tarde", "ocaso")}
${momento("noche", "luna", '<canvas class="luces luces-noche" aria-hidden="true"></canvas>')}

<section id="habitaciones" class="dormir" data-momento="${esc(H.dormir.etiqueta)}" ${waAttrs("general")}>
  <div class="wrap">
    <header class="m-head reveal">
      <p class="hora">${ico("luna")} <span>${H.dormir.hora}</span> · ${H.dormir.etiqueta}</p>
      <h2>${H.dormir.titulo}</h2>
      ${H.dormir.parrafos.map((p) => `<p class="story">${p}</p>`).join("")}
    </header>
    <div class="habs">${D.habitaciones.map(habitacion).join("")}</div>
    <p class="hab-comun reveal">Las dos tienen las mismas amenidades y comparten jardín, sala de billar, pórtico y terraza.</p>
  </div>
</section>

${ahorroHtml()}
${resenasHtml()}
${videoHtml()}
${casaHtml()}
${eventosHtml()}
${extrasHtml()}
${alrededoresHtml()}
${reglasHtml()}
${ubicacionHtml()}
${cierreHtml()}
</main>

<footer class="pie">
  <div class="wrap pie-grid">
    <div>
      <a class="logo" href="#inicio">${torre}<span>Casa el <b>Mangrullo</b></span></a>
      <p>${D.casa.lema}.</p>
    </div>
    <nav aria-label="Secciones (pie)"><ul>${nav.map(([h, t]) => `<li><a href="${h}">${t}</a></li>`).join("")}</ul></nav>
    <div>
      <p>${D.casa.direccion.calle}<br>${D.casa.direccion.colonia}, ${D.casa.direccion.alcaldia}, CDMX</p>
      <p><a href="${esc(wa("general"))}" target="_blank" rel="noopener">WhatsApp ${D.WHATSAPP_VISIBLE}</a></p>
    </div>
  </div>
  <p class="wrap pie-legal">© ${new Date().getFullYear()} ${D.casa.nombre} · Pet friendly · Casa ecológica</p>
</footer>

<a class="wa-fab" href="${esc(wa("general"))}" target="_blank" rel="noopener" >${ico("whatsapp", "ico ico-wa")}<span class="wa-fab-txt">Reservar</span><span class="visually-hidden"> por WhatsApp</span></a>

<dialog class="lb" aria-label="Fotos a pantalla completa">
  <figure><img alt=""><figcaption></figcaption></figure>
  <p class="lb-cuenta" aria-live="polite"></p>
  <button type="button" class="lb-btn lb-prev" aria-label="Foto anterior">${ico("izq")}</button>
  <button type="button" class="lb-btn lb-next" aria-label="Foto siguiente">${ico("der")}</button>
  <button type="button" class="lb-btn lb-close" aria-label="Cerrar">${ico("cerrar")}</button>
</dialog>

<script src="main.js?v=${VERSION}" defer></script>
</body>
</html>
`;

// ---------- escribir dist ----------
if (existsSync(OUT)) rmSync(OUT, { recursive: true });
mkdirSync(OUT, { recursive: true });
writeFileSync(`${OUT}/index.html`, html);
cpSync("src/estilos.css", `${OUT}/estilos.css`);
cpSync("src/main.js", `${OUT}/main.js`);
cpSync("assets/img/web", `${OUT}/assets/img/web`, { recursive: true, filter: (s) => !s.endsWith(".txt") });
cpSync("assets/fonts", `${OUT}/assets/fonts`, { recursive: true });
if (existsSync("assets/video")) cpSync("assets/video", `${OUT}/assets/video`, { recursive: true, filter: (s) => !s.endsWith(".md") });
cpSync("public", OUT, { recursive: true });
writeFileSync(`${OUT}/robots.txt`, `User-agent: *\nAllow: /\nSitemap: ${D.SITIO_URL}/sitemap.xml\n`);
writeFileSync(
  `${OUT}/sitemap.xml`,
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${D.SITIO_URL}/</loc></url></urlset>\n`
);
console.log(`Listo: ${OUT}/index.html (${(html.length / 1024).toFixed(1)} KB)`);
