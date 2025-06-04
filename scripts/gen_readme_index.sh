#!/bin/bash

echo "📚 Генерація README.md по всій фрактальній структурі…"

ROOT_DIR="."
OUTPUT="$ROOT_DIR/README.md"

# Очистити головний README
echo "# 🧬 S0FRACTAL INDEX" > "$OUTPUT"
echo "" >> "$OUTPUT"

# Функція для генерації README в кожній папці і формування глобального індексу
generate_index() {
  local DIR=$1
  local LEVEL=$2
  local PREFIX=$(printf "%*s" $((LEVEL * 2)) "")

  for ITEM in "$DIR"/*; do
    if [[ -d "$ITEM" ]]; then
      local NAME=$(basename "$ITEM")
      local REL_PATH=$(realpath --relative-to="$ROOT_DIR" "$ITEM")

      # Створити README.md якщо його нема
      if [[ ! -f "$ITEM/README.md" ]]; then
        echo "# 📂 $NAME" > "$ITEM/README.md"
        echo "_Автоматично згенеровано для фрактальної навігації._" >> "$ITEM/README.md"
      fi

      # Додати до головного README з відступами
      echo "${PREFIX}- [$NAME]($REL_PATH/README.md)" >> "$OUTPUT"

      # Рекурсивно пройтись по вкладеним
      generate_index "$ITEM" $((LEVEL + 1))
    fi
  done
}

generate_index "$ROOT_DIR" 1

echo -e "\n✅ README-файли згенеровано. Перевір s0fractal/README.md"