// scripts/agent_heartbeat.ts
import { writeAll } from "https://deno.land/std@0.224.0/streams/write_all.ts";
import { ensureDir } from "https://deno.land/std@0.224.0/fs/mod.ts";
import { join } from "https://deno.land/std@0.224.0/path/mod.ts";
import { load } from "https://deno.land/std@0.224.0/dotenv/mod.ts";

const env = await load();
const now = new Date().toISOString();
const logDir = "log";
const logFile = join(logDir, "heartbeat.md");

await ensureDir(logDir);
await Deno.writeTextFile(logFile, `💓 Heartbeat: ${now}\n`, { append: true });
console.log(`💓 Heartbeat at ${now}`);

if (env.SUPABASE_EDGE_URL) {
    const url = `${env.SUPABASE_EDGE_URL}/f/agent/heartbeat`;
    try {
        const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ time: now }),
        });
        console.log("📡 Sent heartbeat to:", url, res.status);
    } catch (e) {
        console.error("❌ Failed to send heartbeat:", e.message);
    }
}
