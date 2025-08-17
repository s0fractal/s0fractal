#!/bin/bash

echo "🔧 Ініціалізація середовища для фрактального агента…"

# Перевірка чи встановлено brew
if ! command -v brew &> /dev/null; then
  echo "🍺 Встановлення Homebrew…"
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
fi

echo "📦 Встановлення CLI-інструментів через brew…"
brew install gh supabase deno windmill op-cli

echo "🔐 Вхід у 1Password CLI (якщо потрібно)…"
eval $(op signin)

echo "📄 Генерація .env.example…"

cat > .env.example <<EOL
# --- Основні змінні середовища ---
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE=

WINDMILL_API_TOKEN=
GH_TOKEN=
DENO_AUTH_TOKEN=

# --- Ідентичність ---
AGENT_NAME="chaoshex"
AGENT_SEED="🧬"
AGENT_ORIGIN="s0fractal"
EOL

echo "✅ Ініціалізація завершена. Готово до запуску ✨"