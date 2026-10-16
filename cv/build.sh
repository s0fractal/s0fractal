#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

TARGET="${1:-all}"

build_pdf() {
  echo "==> Building cv.pdf with pandoc (typst engine)..."
  if ! command -v pandoc >/dev/null 2>&1; then
    echo "Error: pandoc is not installed." >&2
    exit 1
  fi
  if ! command -v typst >/dev/null 2>&1; then
    echo "Error: typst is not installed. Run: brew install typst" >&2
    exit 1
  fi
  pandoc cv.md -o cv.pdf --pdf-engine=typst
  echo "✔ Successfully generated cv.pdf ($(du -h cv.pdf | cut -f1))"
}

build_html() {
  echo "==> Building cv.html with pandoc..."
  if ! command -v pandoc >/dev/null 2>&1; then
    echo "Error: pandoc is not installed." >&2
    exit 1
  fi
  pandoc cv.md -o cv.html --standalone --css=style.css --embed-resources
  echo "✔ Successfully generated cv.html ($(du -h cv.html | cut -f1))"
}

clean() {
  echo "==> Cleaning generated files..."
  rm -f cv.pdf cv.html
  echo "✔ Cleaned."
}

case "$TARGET" in
  pdf)
    build_pdf
    ;;
  html)
    build_html
    ;;
  all)
    build_pdf
    build_html
    ;;
  clean)
    clean
    ;;
  *)
    echo "Usage: $0 [all|pdf|html|clean]" >&2
    exit 1
    ;;
esac
