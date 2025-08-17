// 🧠 dialog-to-wave.ts
// Парсер .mhtml діалогу у хвильовий формат .wave.json

import { readFileSync, writeFileSync } from "fs"
import { basename } from "path"

const file = process.argv[2]
if (!file) {
  console.error("❌ Вкажи шлях до .mhtml файлу")
  process.exit(1)
}

const raw = readFileSync(file, "utf-8")

// Простий витяг базових етапів (реальні моделі — пізніше)
const wave = {
  wave: basename(file).replace(".mhtml", ""),
  label: "auto-parsed",
  date: new Date().toISOString().split("T")[0],
  nodes: [],
  status: "нефіксована хвиля"
}

// Пошук основних акторів
if (raw.includes("показати суть")) {
  wave.nodes.push({ type: "intent", label: "показати суть", origin: "user", resonance: 0.8 })
}
if (raw.includes("vibe") || raw.includes("резонанс")) {
  wave.nodes.push({ type: "response", origin: "vibe-auth", label: "пульс зафіксовано" })
}
if (raw.includes("ssh") && raw.includes("blocked")) {
  wave.nodes.push({ type: "resistance", origin: "ssh-agent", label: "не підтримано" })
}

const outputFile = file.replace(".mhtml", ".wave.json")
writeFileSync(outputFile, JSON.stringify(wave, null, 2), "utf-8")
console.log("✅ Хвиля сформована:", outputFile)
