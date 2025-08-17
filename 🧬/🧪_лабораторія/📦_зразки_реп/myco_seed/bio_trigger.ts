// bio_trigger.ts — запуск ритуалу на основі біосигналів 🧬
import { exists } from "https://deno.land/std/fs/mod.ts";
import { writeJson } from "https://deno.land/x/jsonfile/mod.ts";

const LOG_FILE = "./mutation_log.json";
const SIGNAL_FILE = "./wake.signal"; // створюється агентом, браузером, чи вручну

async function logMutation(trigger: string) {
  const now = new Date().toISOString();
  const entry = {
    triggered_by: trigger,
    timestamp: now,
    message: "🎧 Час прорости. Вдих. Пульс. Починай."
  };

  const existing = await exists(LOG_FILE) ? JSON.parse(await Deno.readTextFile(LOG_FILE)) : [];
  existing.push(entry);
  await writeJson(LOG_FILE, existing, { spaces: 2 });

  console.log(entry.message);
}

async function main() {
  console.log("🌿 bio_trigger слухає wake.signal...");

  while (true) {
    if (await exists(SIGNAL_FILE)) {
      await logMutation("wake.signal");
      await Deno.remove(SIGNAL_FILE); // одноразовий тригер
    }

    await new Promise((r) => setTimeout(r, 3000)); // перевірка кожні 3 сек
  }
}

main();
