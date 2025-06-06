#!/bin/bash
set -e

echo "🌱 Welcome to s0fractal bootstrap"

# Check for git
if ! command -v git &> /dev/null; then
  echo "❌ Git is not installed. Please install Git and retry."
  exit 1
fi

cd ~

# Clone or pull latest
if [ -d ".s0fractal/.git" ]; then
  echo "📦 Repo exists. Syncing..."
  cd .s0fractal
  git pull origin main
else
  echo "📥 Cloning repository..."
  git clone https://github.com/s0fractal/s0fractal .s0fractal
  cd .s0fractal
fi

# ENV fallback
if [ ! -f .fractal.env ] && [ -f fallback/.fractal.env ]; then
  cp fallback/.fractal.env .fractal.env
  echo "✅ Default .fractal.env applied"
fi

# Install Deno if missing
if ! command -v deno &> /dev/null; then
  echo "📦 Installing Deno..."
  curl -fsSL https://deno.land/x/install/install.sh | sh
  export PATH="$HOME/.deno/bin:$PATH"
  echo "🔁 You may need to reload your shell: source ~/.zshrc or ~/.bashrc"
else
  echo "✅ Deno already installed"
fi
chmod +x "$0"
echo "⚙️ Running fractal.ts init..."
deno run -A fractal/fractal.ts init

echo "🎉 Installation complete. Try running: fractal pulse"