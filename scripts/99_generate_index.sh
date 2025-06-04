#!/bin/bash

echo "🧭 Генерація індексу для всіх файлів і директорій…"

INDEX_FILE="README_INDEX.md"
echo "# 🧭 Індекс репозиторію s0fractal" > $INDEX_FILE
echo "" >> $INDEX_FILE

find . -type d | sort | while read dir; do
  echo "- 📁 \`${dir#./}/\`" >> $INDEX_FILE
  find "$dir" -maxdepth 1 -type f | sort | while read file; do
    [[ "$file" == *"$INDEX_FILE" ]] && continue
    echo "  - 📄 [${file#./}](./${file#./})" >> $INDEX_FILE
  done
done

echo "✅ Індекс збережено у $INDEX_FILE"