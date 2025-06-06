#!/bin/bash

set -e

REPO="https://github.com/s0fractal/s0fractal.git"
DEST="$HOME/.s0fractal"

echo "🌱 Welcome to s0fractal bootstrap"

if [ -d "$DEST/.git" ]; then
  echo "📦 Repo exists. Syncing..."
  cd "$DEST"
  git pull origin main
else
  echo "📥 Cloning..."
  git clone "$REPO" "$DEST"
fi

cd "$DEST"

<<<<<<< HEAD
echo "✅ Boot complete. Run: deno run -A ~/.s0fractal/fractal/fractal.ts init"

echo "🧠 Initializing fractal CLI..."
deno run -A ~/.s0fractal/fractal/fractal.ts init
=======
echo "⚙️ Running 'fractal.ts init'"
deno run -A fractal/fractal.ts init

echo "✅ Done. Try: fractal pulse"
>>>>>>> 165bdad (feat: оновлено 2025-06-06 — зміни в .fractal.env, cellar/whisper/README.md, install.sh)
