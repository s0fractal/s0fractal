// scripts/build.ts
import { copy } from "https://deno.land/std@0.224.0/fs/copy.ts";
import { ensureDir } from "https://deno.land/std@0.224.0/fs/ensure_dir.ts";
import { walk } from "https://deno.land/std@0.224.0/fs/walk.ts";
import {
  extname,
  join,
  relative,
} from "https://deno.land/std@0.224.0/path/mod.ts";

const PUBLIC_DIR = "dist";
const SOURCE_DIR = "."; // корінь проекту
const EXCLUDE_DIRS = ["node_modules", "dist", ".git"];

console.log("📦 Починаю білд...");

await ensureDir(PUBLIC_DIR);

// Копіюємо все з кореня, окрім виключених директорій
for await (const entry of Deno.readDir(SOURCE_DIR)) {
  if (EXCLUDE_DIRS.includes(entry.name)) continue;
  const from = join(SOURCE_DIR, entry.name);
  const to = join(PUBLIC_DIR, entry.name);
  await copy(from, to, { overwrite: true });
  console.log(`✅ Скопійовано: ${entry.name}`);
}

// Генерація index.html
console.log("🧠 Генерую index.html...");
const readmes: string[] = [];
const markdowns: string[] = [];
const others: string[] = [];

for await (const entry of walk(PUBLIC_DIR, { includeDirs: false })) {
  const relPath = relative(PUBLIC_DIR, entry.path);
  if (relPath.endsWith("README.md")) {
    readmes.push(relPath);
  } else if (extname(entry.name) === ".md") {
    markdowns.push(relPath);
  } else {
    others.push(relPath);
  }
}

const indexContent = `<!DOCTYPE html>
<html lang="uk">
<head>
  <meta charset="UTF-8" />
  <title>s0fractal – індекс</title>
  <style>
    body { font-family: sans-serif; padding: 2rem; }
    h1, h2 { margin-top: 2rem; }
    ul { line-height: 1.6; }
  </style>
</head>
<body>
  <h1>🧬 s0fractal — публічний індекс</h1>
  <p>GitHub: <a href="https://github.com/s0fractal/s0fractal">s0fractal/s0fractal</a></p>

  <section>
    <h2>📄 README-файли</h2>
    <ul>
      ${readmes.map((p) => `<li><a href="${p}">${p}</a></li>`).join("\n")}
    </ul>
  </section>

  <section>
    <h2>📝 Markdown-файли</h2>
    <ul>
      ${markdowns.map((p) => `<li><a href="${p}">${p}</a></li>`).join("\n")}
    </ul>
  </section>

  <section>
    <h2>📂 Інші файли</h2>
    <ul>
      ${others.map((p) => `<li><a href="${p}">${p}</a></li>`).join("\n")}
    </ul>
  </section>
</body>
</html>`;

await Deno.writeTextFile(join(PUBLIC_DIR, "index.html"), indexContent);

console.log("✅ Білд завершено з index.html");
