
// main.ts
import "https://deno.land/std@0.224.0/dotenv/load.ts";
import { Bot } from "https://deno.land/x/grammy@v1.19.2/mod.ts";

const bot = new Bot(Deno.env.get("TELEGRAM_BOT_TOKEN")!);

// --- Функція надсилання в канал ---
async function sendToChannel(text: string) {
  const chatId = -1002282968811; // ← це твій канал @itogipodvedem2
  try {
    await bot.api.sendMessage(chatId, text);
    console.log("✅ Повідомлення відправлено в канал");
  } catch (err) {
    console.error("❌ Помилка при надсиланні:", err);
  }
}

// --- Команди ---
bot.command("start", (ctx) =>
  ctx.reply("Привіт! Я твій ItogiBot. Команди: /itogi /turba")
);

bot.command("itogi", async (ctx) => {
  const text = `📊 Підсумки за ${new Date().toLocaleDateString("uk-UA")}:\n\n— Турбот зібрано: 0\n— Мемів надіслано: 0\n— Потік: стабільний`;
  await sendToChannel(text);
  await ctx.reply("✅ Ітог опубліковано в канал");
});

bot.command("turba", async (ctx) => {
  const user = ctx.from?.username ?? ctx.from?.first_name ?? "невідомий";
  const text = ctx.message?.text?.replace("/turba", "").trim();

  if (!text) {
    return ctx.reply("Щоб вигрузити турботу, напиши після команди: /turba [текст]");
  }

  // Тут можна підключити Supabase пізніше
  console.log(`📥 Турба від ${user}: ${text}`);
  await ctx.reply("🫂 Турботу прийнято. Відпускаємо.");
});

// --- Разова команда для виявлення chat_id (можна видалити пізніше) ---
bot.on("message", (ctx) => {
  if (ctx.message.forward_from_chat) {
    console.log("📡 Channel ID:", ctx.message.forward_from_chat.id);
    ctx.reply("✅ Отримав chat_id, можна писати в канал");
  } else {
    console.log("💬 Chat ID:", ctx.chat.id);
  }
});

await bot.start();
