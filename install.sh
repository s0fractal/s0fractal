#!/bin/bash
set -e

echo "🌱 Welcome to s0fractal bootstrap"
cd ~
git clone https://github.com/s0fractal/s0fractal .s0fractal || echo "Repo already exists."
cd .s0fractal

# Basic fallback ENV
cp fallback/.fractal.env .fractal.env || echo "Using default .fractal.env"

echo "📦 Installing Deno..."
curl -fsSL https://deno.land/x/install/install.sh | sh

echo "✅ Boot complete. Run: deno run -A fractal/fractal.ts init"
