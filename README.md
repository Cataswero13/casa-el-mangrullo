# Casa el Mangrullo · sitio web

Sitio estático (HTML + CSS + JS sin dependencias) para Casa el Mangrullo, Tlalpan, CDMX.
Lo elegí porque carga instantáneo en celular, no tiene nada que actualizar ni que se rompa, y cualquier hosting lo sirve.

## Dónde se edita cada cosa

| Quiero cambiar… | Archivo |
|---|---|
| WhatsApp, precios, textos, reseñas, horarios, reglas, alrededores, mensajes prellenados | `contenido/sitio.mjs` (todo está ahí, comentado) |
| Videos (portada, recorrido, shorts) | Sube el archivo a `assets/video/` y escribe la ruta en `contenido/sitio.mjs` → `videos` (ver `assets/video/LEEME.md`) |
| Fotos | `assets/img/*.src.jpg` → corre `bash scripts/fotos.sh` (genera los WebP en `assets/img/web/`) |
| Diseño | `src/estilos.css`, `src/main.js`, `build.mjs` |

**Número de WhatsApp:** una sola constante, `WHATSAPP` al inicio de `contenido/sitio.mjs` (y `WHATSAPP_VISIBLE` para cómo se muestra).

## Probar en tu compu

```bash
npm run dev      # genera dist/ y abre http://localhost:3000
```

## Publicar

Cada `git push` a la rama principal se publica solo en Vercel (corre `node build.mjs` y sirve `dist/`).
No hay que instalar nada: el build solo usa Node.

## Dominio propio (ej. casaelmangrullo.com)

1. Compra el dominio (Namecheap, GoDaddy, Google/Squarespace, Cloudflare…).
2. En Vercel → proyecto `casa-el-mangrullo` → **Settings → Domains → Add** → escribe `casaelmangrullo.com` y también `www.casaelmangrullo.com`.
3. Vercel te muestra los registros DNS; en el panel de tu dominio crea:
   - `A` · nombre `@` · valor `76.76.21.21`
   - `CNAME` · nombre `www` · valor `cname.vercel-dns.com`
4. Espera unos minutos (hasta 24 h). Vercel pone el candado HTTPS solo.
5. Cambia `SITIO_URL` en `contenido/sitio.mjs` al dominio nuevo y sube el cambio (para que Open Graph, sitemap y Google usen la URL correcta).
