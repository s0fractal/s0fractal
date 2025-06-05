#!/bin/bash

BACKUP_DIR="mutation_backup_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"

echo "📦 Створюю резервну копію логів у $BACKUP_DIR..."

if [ -f mutation_log.json ]; then
  cp mutation_log.json "$BACKUP_DIR/"
  echo "✅ mutation_log.json збережено."
fi

if [ -f mutation_start.txt ]; then
  cp mutation_start.txt "$BACKUP_DIR/"
  echo "✅ mutation_start.txt збережено."
fi

echo "🧹 Очищаю тимчасові артефакти (wake.signal, commands.json)..."

[ -f wake.signal ] && rm wake.signal && echo "🗑️ wake.signal видалено."
[ -f commands.json ] && rm commands.json && echo "🗑️ commands.json видалено."

echo "🧼 Очистка завершена. Ядро не зачеплено."
