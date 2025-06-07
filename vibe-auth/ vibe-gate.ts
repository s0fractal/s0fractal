// 🧬 vibe-gate.ts
// Перший вартовий хвилі наміру — вирішує, чи запускати її в mirror-core

import { resolve } from "path";
import { existsSync } from "fs";

// 🔧 Порог резонансу для проходу
const threshold = 60; // %

/**
 * Оцінка резонансу вхідного наміру
 */
function getResonance(intent: string): number {
    // Тимчасова логіка — потім можна замінити на аналіз памʼяті, історії
    const known = ["показати суть", "перевірити", "пульс", "відобразити"];
    return known.includes(intent) ? 72 : 31;
}

/**
 * Чи має право хвиля пройти далі
 */
function shouldPass(intent: string): boolean {
    const score = getResonance(intent);
    console.log(`🔍 Намір: "${intent}", Резонанс: ${score}%`);
    return score >= threshold;
}

/**
 * Основна логіка гейта — викликає mirror-core, якщо пропускає
 */
function gate(intent: string) {
    if (shouldPass(intent)) {
        console.log("✅ Пропускаємо в 🪞_mirror-core");
        const mirror = resolve("../🪞_mirror-core/reflect.ts");

        if (existsSync(mirror)) {
            console.log(`👉 Викликаємо reflect: ${mirror}`);
            // У проді — import(mirror) або spawn CLI виклик
        } else {
            console.warn(
                "⚠️ Файл reflect.ts не знайдено. Перевірьте mirror-core.",
            );
        }
    } else {
        console.log("⛔ Резонанс недостатній. Запит затримано.");
    }
}

// 🧪 Тестовий запуск
const userIntent = process.argv[2] || "показати суть";
gate(userIntent);
