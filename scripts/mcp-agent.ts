import * as wmill from "npm:windmill-client";

const MCP_URL = await wmill.getResource("f/test/MCP_URL");
console.log("🔗 MCP_URL:", MCP_URL);

// далі — логіка MCP агента
const response = await fetch(MCP_URL);
const reader = response.body?.getReader();

if (!reader) throw new Error("SSE stream not available");

const decoder = new TextDecoder();
let buffer = "";

console.log("👂 MCP агент слухає...");

while (true) {
  const { value, done } = await reader.read();
  if (done) break;

  buffer += decoder.decode(value, { stream: true });
  const lines = buffer.split("\n");

  for (const line of lines) {
    if (line.startsWith("data: ")) {
      const json = line.slice(6);
      try {
        const command = JSON.parse(json);

        // 🔧 Обробка команд
        console.log("📦 Отримано команду:", command);

        if (command.cmd === "git.pull") {
          const command = new Deno.Command("git", {
            args: ["pull"],
            stdout: "piped",
            stderr: "piped",
          });
          const { stdout } = await command.output();
          console.log("✅ git pull:", new TextDecoder().decode(stdout));
        }

        if (command.cmd === "echo") {
          console.log("🗯", command.msg || "echo received");
        }

        // додай ще команди сюди
      } catch (e) {
        console.error("❌ Помилка обробки команди:", e);
      }
    }
  }
}
