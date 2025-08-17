// agent.ts — локальний Deno-агент 🌱

import { readJson, writeJson } from "https://deno.land/x/jsonfile/mod.ts";

const COMMANDS_FILE = "./commands.json";
const RESULT_FILE = "./result.json";

async function main() {
  console.log("🧠 Myco-Agent listening for commands...");

  while (true) {
    try {
      const commands = await readJson(COMMANDS_FILE) as any[];

      const results = [];

      for (const cmd of commands) {
        console.log("⚙️ Executing:", cmd.type);

        if (cmd.type === "create_file") {
          await Deno.writeTextFile(cmd.path, cmd.content);
          results.push({ status: "created", path: cmd.path });

        } else if (cmd.type === "run_command") {
          const p = Deno.run({
            cmd: cmd.command.split(" "),
            stdout: "piped",
            stderr: "piped"
          });

          const [status, stdout, stderr] = await Promise.all([
            p.status(),
            p.output(),
            p.stderrOutput()
          ]);

          p.close();

          results.push({
            command: cmd.command,
            success: status.success,
            output: new TextDecoder().decode(stdout),
            error: new TextDecoder().decode(stderr),
          });

        } else {
          results.push({ error: "Unknown command", command: cmd });
        }
      }

      await writeJson(RESULT_FILE, results, { spaces: 2 });
    } catch (err) {
      console.error("❌ Error processing commands:", err.message);
    }

    await new Promise((r) => setTimeout(r, 2000));
  }
}

main();
