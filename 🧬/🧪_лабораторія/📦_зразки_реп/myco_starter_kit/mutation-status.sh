#!/bin/bash

echo "🔎 Перевіряю статус агента та сліди мутації..."

if [ -f mutation_start.txt ]; then
  echo "✅ Ритуал активовано: mutation_start.txt існує."
  head -n 1 mutation_start.txt
else
  echo "⚠️  Ритуал ще не запущений або файл відсутній."
fi

if [ -f wake.signal ]; then
  echo "📡 Wake-сигнал все ще активний. Видаляю..."
  rm wake.signal
else
  echo "✅ Wake-сигнал вже очищено."
fi

if [ -f mutation_log.json ]; then
  echo "📘 mutation_log.json знайдено:"
  tail -n 2 mutation_log.json
else
  echo "⚠️  mutation_log.json ще не створено."
fi

if [ -f commands.json ]; then
  echo "🧾 commands.json знайдено."
else
  echo "⚠️  commands.json відсутній."
fi

echo "🧹 Якщо треба — можу створити скрипт для повного очищення шару (крім твого ядра)."
