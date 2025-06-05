// scripts/build.ts
import { copy } from "https://deno.land/std@0.224.0/fs/copy.ts";
import { ensureDir } from "https://deno.land/std@0.224.0/fs/ensure_dir.ts";

const PUBLIC_DIR = "dist";
const SOURCE_DIR = "public";
const README_SRC = "README.md";
const README_DEST = `${PUBLIC_DIR}/README.md`;

console.log("📦 Починаю білд...");

// Створюємо public/ якщо ще не існує
await ensureDir(PUBLIC_DIR);

// Копіюємо всю структуру з f/ у dist/
console.log("📁 Копіюю папку f/ у dist/...");
await copy(SOURCE_DIR, PUBLIC_DIR, { overwrite: true });

// Копіюємо README.md
try {
    console.log("📄 Копіюю README.md у dist/...");
    await Deno.copyFile(README_SRC, README_DEST);
} catch (err) {
    console.warn(
        "⚠️ README.md не знайдено або не вдалося скопіювати:",
        err.message,
    );
}

console.log("✅ Білд завершено.");
