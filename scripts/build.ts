// scripts/build.ts

import { walk } from "https://deno.land/std/fs/mod.ts";
import { dirname, join, relative } from "https://deno.land/std/path/mod.ts";
import { ensureDir } from "https://deno.land/std/fs/ensure_dir.ts";

const ROOT = ".";
const OUT = "dist";

const decoder = new TextDecoder("utf-8");
const encoder = new TextEncoder();

function renderHTML(title: string, body: string): string {
  return `<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8">
  <title>${title}</title>
  <style>
    body { font-family: sans-serif; padding: 2em; max-width: 800px; margin: auto; }
    a { text-decoration: none; color: #1a0dab; }
  </style>
</head>
<body>
${body}
</body>
</html>`;
}

async function convertReadmeToHTML(filePath: string, outPath: string) {
  const raw = await Deno.readFile(filePath);
  const text = decoder.decode(raw);
  const htmlBody = `
    <h1>${filePath}</h1>
    <pre>${text.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</pre>
  `;
  const html = renderHTML(filePath, htmlBody);
  await ensureDir(dirname(outPath));
  await Deno.writeFile(outPath, encoder.encode(html));
}

async function build() {
  for await (const entry of walk(ROOT, { includeDirs: false, exts: [".md"] })) {
    if (!entry.name.toLowerCase().includes("readme.md")) continue;

    const rel = relative(ROOT, entry.path);
    const target = join(OUT, rel.replace(/\.md$/, ".html"));
    await convertReadmeToHTML(entry.path, target);
  }

  const indexHTML = renderHTML(
    "s0fractal",
    `<h1>🧬 s0fractal map</h1><p>README файли відрендерені як HTML.</p>`,
  );
  await ensureDir(OUT);
  await Deno.writeFile(join(OUT, "index.html"), encoder.encode(indexHTML));
}

await build();
