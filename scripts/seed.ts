// scripts/seed.ts

import { config } from "https://deno.land/std@0.224.0/dotenv/mod.ts";
// await config({ allowEmptyValues: true });

import "https://deno.land/std@0.224.0/dotenv/load.ts";
import { Client } from "https://deno.land/x/postgres@v0.19.3/mod.ts";

// Читаємо SQL з файла
const sql = await Deno.readTextFile("supabase/seed.sql");

// Отримуємо URL з .env або змінної оточення
const url = Deno.env.get("SUPABASE_POSTGRES_URL");

if (!url) {
    console.error("❌ SUPABASE_POSTGRES_URL не знайдено в оточенні");
    Deno.exit(1);
}

const client = new Client(url);

try {
    await client.connect();
    console.log("✅ Підключено до бази даних");

    await client.queryArray(sql);
    console.log("🌱 Сіди застосовано успішно");
} catch (err) {
    console.error("❌ Помилка при виконанні seed.sql:", err);
} finally {
    await client.end();
    console.log("🔌 З'єднання з базою закрито");
}
