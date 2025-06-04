// scripts/build.ts

import { walk } from "https://deno.land/std/fs/mod.ts";
import { basename, join } from "https://deno.land/std/path/mod.ts";
import { ensureDir } from "https://deno.land/std/fs/ensure_dir.ts";

const DIST_DIR = "dist";
await ensureDir(DIST_DIR);

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

function dirname(path: string): string {
  return path.split("/").slice(0, -1).join("/") || ".";
}

const links: string[] = [];

for await (
  const entry of walk(".", {
    includeDirs: false,
    exts: [".md"],
    match: [/README\.md$/],
  })
) {
  const relPath = entry.path.replace(/\/?README\.md$/, ".html").replace(
    /^\.\/?/,
    "",
  );
  const outPath = join(DIST_DIR, relPath);

  links.push(`<li><a href="${relPath}">${relPath}</a></li>`);

  await ensureDir(join(DIST_DIR, dirname(relPath)));
  const content = await Deno.readTextFile(entry.path);
  const html = renderHTML(relPath, `<pre>${content}</pre>`);
  await Deno.writeTextFile(outPath, html);
  console.log("✅ Built", outPath);
}

const indexHTML = renderHTML(
  "s0fractal map",
  `<h1>🧬 s0fractal map</h1><ul>${links.join("\n")}</ul>`,
);
await Deno.writeTextFile(join(DIST_DIR, "index.html"), indexHTML);
console.log("🌐 Created index.html with", links.length, "links.");
