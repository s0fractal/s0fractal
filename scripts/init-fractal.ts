// Генератор структури фракталу
import { ensureDirSync } from "https://deno.land/std@0.224.0/fs/mod.ts";

const dirs = [
  "me",
  "i",
  "mi",
  "iam",
  "src/час",
  "src/медіа",
  "src/функції",
  "src/лінзи",
  "scripts",
];

for (const dir of dirs) {
  ensureDirSync(dir);
  console.log(`✅ ${dir}/ створено`);
}
