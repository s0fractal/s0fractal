# Sergey Glova — CV

This directory contains the Markdown source and automated Pandoc/Typst build setup for Sergey Glova's CV.

## Files

- **`cv.md`**: Canonical CV source in Markdown with YAML metadata.
- **`build.sh`**: One-command build script to compile to PDF and self-contained HTML.
- **`Makefile`**: Standard build targets (`make`, `make pdf`, `make html`, `make clean`).
- **`style.css`**: Modern styling for standalone HTML output.
- **`cv.pdf`**: Pre-built PDF document (2 pages, A4).
- **`cv.html`**: Pre-built self-contained HTML document.

## Building

Prerequisites:
- [pandoc](https://pandoc.org/) (`brew install pandoc`)
- [typst](https://typst.app/) (`brew install typst`)

To build both PDF and HTML:
```sh
./build.sh
# or
make
```

To build only PDF:
```sh
./build.sh pdf
# or
make pdf
```

To build only HTML:
```sh
./build.sh html
# or
make html
```
