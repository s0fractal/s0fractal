
import "https://deno.land/std@0.224.0/dotenv/load.ts";
import { Bot } from "https://deno.land/x/grammy@v1.19.2/mod.ts";

const bot = new Bot(Deno.env.get("TELEGRAM_BOT_TOKEN")!);

bot.command("start", (ctx) => ctx.reply("Привіт! Я твій ItogiBot"));
bot.command("itogi", (ctx) => ctx.reply("✅ Ітог зафіксовано"));
bot.command("turba", (ctx) => ctx.reply("🫂 Турботу прийнято"));
bot.on("message:text", (ctx) => {
  console.log(`[${ctx.from?.username}] ${ctx.message.text}`);
});

await bot.start();
