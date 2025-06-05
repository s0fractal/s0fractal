// scripts/build.ts
import { copy } from "https://deno.land/std@0.224.0/fs/copy.ts";
import { emptyDir, ensureDir } from "https://deno.land/std@0.224.0/fs/mod.ts";
import { exists } from "https://deno.land/std@0.224.0/fs/exists.ts";
import { basename, join } from "https://deno.land/std@0.224.0/path/mod.ts";

const ROOT = new URL("..", import.meta.url).pathname;
const DIST = join(ROOT, "dist");
const INCLUDE = [
    "f",
    "docs",
    "media",
    "s0fractal",
    "soul-journal",
    "README.md",
];

// Очистка dist/
console.log("🧹 Очищаю dist/...");
await emptyDir(DIST);

// Копіювання вибраних елементів
for (const item of INCLUDE) {
    const source = join(ROOT, item);
    const dest = join(DIST, basename(item));
    if (await exists(source)) {
        console.log(`📁 Копіюю ${item} → dist/${basename(item)}`);
        await copy(source, dest, { overwrite: true });
    } else {
        console.warn(`⚠️ Пропущено ${item} — не знайдено`);
    }
}

console.log("✅ Публічний білд завершено.");
