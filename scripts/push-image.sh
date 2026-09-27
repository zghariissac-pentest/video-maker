#!/usr/bin/env bash
set -e
# push-image.sh — copy any image to public/aura-group.jpg unedited, clear cache, verify
# Usage: ./scripts/push-image.sh /path/to/your/image.jpg
#        ./scripts/push-image.sh  (then it looks for ~/Downloads/aura.jpg or newest jpg)

SRC="${1:-}"
PUBLIC="public/aura-group.jpg"
PLACEHOLDER="public/aura-group.placeholder.jpg"

# backup placeholder once
if [ -f "$PUBLIC" ] && [ ! -f "$PLACEHOLDER" ]; then
  cp "$PUBLIC" "$PLACEHOLDER"
  echo "Backup placeholder -> $PLACEHOLDER"
fi

if [ -z "$SRC" ]; then
  # try common locations
  for c in "$HOME/Downloads/aura.jpg" "$HOME/Downloads/aura-group.jpg" "$HOME/Downloads/[Image 1].jpg" "$HOME/Downloads/Image 1.jpg"; do
    if [ -f "$c" ]; then SRC="$c"; break; fi
  done
  if [ -z "$SRC" ]; then
    # newest jpg in Downloads
    SRC=$(ls -t "$HOME/Downloads"/*.jpg "$HOME/Downloads"/*.png "$HOME/Downloads"/*.jpeg 2>/dev/null | head -n1 || true)
  fi
fi

if [ -z "$SRC" ] || [ ! -f "$SRC" ]; then
  echo "ERROR: No source image found."
  echo "Usage: $0 /path/to/image.jpg"
  echo "Or save your GTA image as ~/Downloads/aura.jpg then run $0"
  exit 1
fi

echo "Source: $SRC"
echo "Size: $(du -h "$SRC" | cut -f1)  Type: $(file -b "$SRC")"

# copy unedited (binary)
cp -f "$SRC" "$PUBLIC"
echo "Copied -> $PUBLIC ($(du -h "$PUBLIC" | cut -f1))"

# verify
if command -v identify >/dev/null 2>&1; then
  identify "$PUBLIC" | head -n1
fi
ls -lh "$PUBLIC"

# clear webpack cache (stale staticFile)
if [ -d "node_modules/.cache/webpack" ]; then
  echo "Clearing webpack cache..."
  rm -rf node_modules/.cache/webpack
fi

# also clear .remotion cache if exists
if [ -d ".remotion" ]; then rm -rf .remotion; fi

echo "Done. Reload Remotion Studio (Aura) — image shows unedited, contain."
echo "MD5: $(md5sum "$PUBLIC" | cut -d' ' -f1)"
