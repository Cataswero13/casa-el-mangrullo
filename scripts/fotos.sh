#!/usr/bin/env bash
# Regenera las versiones WebP de las fotos (requiere ImageMagick).
# Uso: pon una foto nueva como assets/img/nombre-descriptivo.src.jpg y corre: bash scripts/fotos.sh
# Luego agrega su texto alternativo en contenido/sitio.mjs → fotos.
set -e
cd "$(dirname "$0")/../assets/img"
mkdir -p web; : > web/sizes.txt
for f in *.src.jpg; do
  b=${f%.src.jpg}
  convert "$f" -auto-orient -strip -resize '1600x1600>' "/tmp/$b.jpg"
  w=$(identify -format %w "/tmp/$b.jpg"); h=$(identify -format %h "/tmp/$b.jpg")
  convert "/tmp/$b.jpg" -resize 480x -quality 74 "web/$b-480.webp"
  convert "/tmp/$b.jpg" -quality 76 "web/$b-$w.webp"
  echo "$b $w $h" >> web/sizes.txt
done
echo "Listo: $(wc -l < web/sizes.txt) fotos"
