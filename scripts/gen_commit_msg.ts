const { exec } = await import("node:child_process");

const run = (cmd: string): Promise<string> =>
  new Promise((resolve, reject) => {
    exec(cmd, (err, stdout) => {
      if (err) reject(err);
      else resolve(stdout);
    });
  });

const diff = await run("git diff --cached");
if (!diff.trim()) {
  console.log("🔸 Нема staged змін. Коміт не буде згенерований.");
  Deno.exit(1);
}

console.log("🧬 Зміни знайдено. Генерую commit message...");

const msg = `feat: оновлено ${
  new Date().toISOString().split("T")[0]
} — зміни в ${
  diff
    .split("\n")
    .filter((l) => l.startsWith("+++ b/"))
    .map((l) => l.replace("+++ b/", ""))
    .join(", ")
}`;

console.log("✏️ Generated:", msg);
await Deno.writeTextFile(".git/COMMIT_EDITMSG", msg);
